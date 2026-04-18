import React, { useState, useRef, useCallback } from 'react';
import { FileText, ArrowLeft, Upload, Download, Trash2, Shield, ChevronRight, BookOpen, X, AlertTriangle, CheckCircle, Loader } from 'lucide-react';

// ─── PDF-lib is loaded via CDN script tag in index.html ──────────────────────
// Add to your index.html <head>:
// <script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>
// <script src="https://unpkg.com/downloadjs@1.4.7/download.js"></script>

function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function getSavingsPct(original, compressed) {
  if (!original || !compressed || compressed >= original) return 0;
  return Math.round((1 - compressed / original) * 100);
}

// Re-compress a raw image Uint8Array through canvas, returns Uint8Array or null
async function recompressImageBytes(bytes, quality) {
  return new Promise((resolve) => {
    try {
      const blob = new Blob([bytes]);
      const url = URL.createObjectURL(blob);
      const img = new window.Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          URL.revokeObjectURL(url);
          canvas.toBlob(
            (outBlob) => {
              if (!outBlob) { resolve(null); return; }
              outBlob.arrayBuffer().then(buf => resolve(new Uint8Array(buf))).catch(() => resolve(null));
            },
            'image/jpeg',
            quality / 100
          );
        } catch { resolve(null); }
      };
      img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
      img.src = url;
    } catch { resolve(null); }
  });
}

// Walk all indirect objects and re-compress image XObjects using pdf-lib public API
async function recompressEmbeddedImages(pdfDoc, quality, onProgress) {
  const { PDFName, PDFRawStream, PDFNumber } = window.PDFLib;
  const context = pdfDoc.context;
  const indirectObjects = context.enumerateIndirectObjects();
  const imageEntries = [];

  for (const [ref, obj] of indirectObjects) {
    try {
      if (!(obj instanceof PDFRawStream)) continue;
      const dict = obj.dict;
      const subtype = dict.get(PDFName.of('Subtype'));
      if (!subtype || subtype.toString() !== '/Image') continue;
      const width = dict.get(PDFName.of('Width'));
      const height = dict.get(PDFName.of('Height'));
      if (!width || !height) continue;
      imageEntries.push({ ref, obj, dict });
    } catch { /* skip */ }
  }

  for (let i = 0; i < imageEntries.length; i++) {
    const { ref, obj, dict } = imageEntries[i];
    try {
      const originalBytes = obj.contents;
      if (originalBytes.length < 4096) continue;
      const recompressed = await recompressImageBytes(originalBytes, quality);
      if (!recompressed || recompressed.length >= originalBytes.length) continue;
      dict.set(PDFName.of('Filter'), PDFName.of('DCTDecode'));
      dict.set(PDFName.of('Length'), PDFNumber.of(recompressed.length));
      dict.delete(PDFName.of('DecodeParms'));
      context.assign(ref, new PDFRawStream(dict, recompressed));
    } catch { /* skip images that fail */ }
    onProgress && onProgress(20 + Math.round(((i + 1) / imageEntries.length) * 60));
  }
}

// Full compression pipeline using pdf-lib public API only
async function runCompression(file, quality, onProgress) {
  const { PDFDocument } = window.PDFLib;
  onProgress(5);
  const arrayBuffer = await file.arrayBuffer();
  onProgress(10);

  const pdfDoc = await PDFDocument.load(arrayBuffer, {
    updateMetadata: false,
  });

  onProgress(20);

  if (quality < 85) {
    await recompressEmbeddedImages(pdfDoc, quality, onProgress);
  }

  onProgress(85);

  const compressedBytes = await pdfDoc.save({
    useObjectStreams: true,
    addDefaultPage: false,
    objectsPerTick: 50,
  });

  onProgress(100);
  return compressedBytes;
}

// ─── Component ────────────────────────────────────────────────────────────────

const QUALITY_PRESETS = [
  { label: 'Maximum Compression', value: 35, desc: 'Smallest file, reduced image quality' },
  { label: 'Balanced', value: 60, desc: 'Good compression, good quality' },
  { label: 'High Quality', value: 80, desc: 'Minimal quality loss, moderate savings' },
];

export default function PDFCompressor() {
  const [files, setFiles] = useState([]);
  const [quality, setQuality] = useState(60);
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef(null);

  const addFiles = useCallback((incoming) => {
    const valid = Array.from(incoming).filter(f => f.type === 'application/pdf');
    if (!valid.length) return;
    const mapped = valid.map(f => ({
      id: crypto.randomUUID(),
      file: f,
      origSize: f.size,
      compBytes: null,
      compSize: null,
      status: 'pending',   // pending | compressing | done | error | encrypted
      progress: 0,
      errorMsg: '',
    }));
    setFiles(prev => [...prev, ...mapped]);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const handleCompressAll = async () => {
    if (processing) return;

    const pending = files.filter(f => f.status === 'pending');
    if (!pending.length) return;

    setProcessing(true);

    // Mark all pending as compressing
    setFiles(prev => prev.map(f =>
      f.status === 'pending' ? { ...f, status: 'compressing', progress: 0 } : f
    ));

    for (const item of pending) {
      try {
        const bytes = await runCompression(
          item.file,
          quality,
          (pct) => {
            setFiles(prev => prev.map(f =>
              f.id === item.id ? { ...f, progress: pct } : f
            ));
          }
        );

        const compSize = bytes.length;
        // Only use compressed if it's actually smaller
        const useCompressed = compSize < item.origSize;

        setFiles(prev => prev.map(f =>
          f.id === item.id
            ? {
                ...f,
                compBytes: useCompressed ? bytes : null,
                compSize: useCompressed ? compSize : item.origSize,
                status: 'done',
                progress: 100,
                noSavings: !useCompressed,
              }
            : f
        ));
      } catch (err) {
        const isEncrypted = err.message?.toLowerCase().includes('encrypt') ||
                            err.message?.toLowerCase().includes('password');
        setFiles(prev => prev.map(f =>
          f.id === item.id
            ? {
                ...f,
                status: isEncrypted ? 'encrypted' : 'error',
                errorMsg: isEncrypted
                  ? 'Password-protected PDFs cannot be compressed'
                  : 'Compression failed — PDF may be malformed',
                progress: 0,
              }
            : f
        ));
      }
    }

    setProcessing(false);
  };

  const handleDownload = (item) => {
    const bytes = item.compBytes || null;
    if (!bytes) return;
    const baseName = item.file.name.replace(/\.pdf$/i, '');
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${baseName}-compressed.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    files.filter(f => f.status === 'done' && f.compBytes).forEach(handleDownload);
  };

  const handleRemove = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleClearAll = () => setFiles([]);

  const doneCount = files.filter(f => f.status === 'done').length;
  const downloadableCount = files.filter(f => f.status === 'done' && f.compBytes).length;
  const totalOrig = files.reduce((s, f) => s + f.origSize, 0);
  const totalComp = files
    .filter(f => f.status === 'done')
    .reduce((s, f) => s + (f.compSize || f.origSize), 0);
  const totalSavings = getSavingsPct(totalOrig, totalComp);

  const activePreset = QUALITY_PRESETS.find(p => p.value === quality);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">

      {/* ── Nav ── */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center space-x-3 group cursor-pointer">
              <img src="/logo.png" alt="CyberLifeCoach"
                className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:brightness-125 transition-all duration-300">
                CyberLifeCoach
              </span>
            </a>
            <a href="/tools" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tools Hub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-10 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute top-40 right-20 w-48 h-48 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
              Privacy
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              100% Client-Side
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              No Upload
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            PDF Compressor
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-3">
            Reduce PDF file sizes directly in your browser. Your documents never leave your device — no uploads, no servers, no tracking.
          </p>
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
            <Shield className="w-4 h-4" />
            <span>A Veteran-Owned Business Committed to Your Digital Privacy</span>
          </div>
        </div>
      </section>

      {/* ── Main Tool ── */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto space-y-6">

          {/* Library notice — only shown if pdf-lib failed to load */}
          {typeof window !== 'undefined' && !window.PDFLib && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-300">
                <strong className="text-yellow-400">Setup required:</strong> Add{' '}
                <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded text-xs">
                  {'<script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>'}
                </code>{' '}
                to your <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded text-xs">index.html</code> before using this tool.
              </p>
            </div>
          )}

          {/* Quality presets */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-6">
            <p className="text-sm font-semibold text-slate-300 mb-4">Compression Level</p>
            <div className="grid sm:grid-cols-3 gap-3 mb-5">
              {QUALITY_PRESETS.map(preset => (
                <button
                  key={preset.value}
                  onClick={() => setQuality(preset.value)}
                  className={`rounded-xl border p-4 text-left transition-all duration-200 ${
                    quality === preset.value
                      ? 'border-cyan-500 bg-gradient-to-br from-cyan-500/15 to-blue-500/15'
                      : 'border-slate-600 hover:border-slate-500 bg-slate-800/50'
                  }`}
                >
                  <p className={`font-semibold text-sm mb-1 ${quality === preset.value ? 'text-cyan-400' : 'text-slate-300'}`}>
                    {preset.label}
                  </p>
                  <p className="text-xs text-slate-400">{preset.desc}</p>
                </button>
              ))}
            </div>

            {/* Fine-tune slider */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">
                Fine-tune image quality: <span className="text-cyan-400">{quality}%</span>
              </label>
              <input
                type="range"
                min="10"
                max="90"
                value={quality}
                onChange={e => setQuality(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-cyan-400 bg-slate-700"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Smallest file</span>
                <span>Best quality</span>
              </div>
            </div>
          </div>

          {/* Drop zone */}
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`relative rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-300 ${
              dragging
                ? 'border-cyan-400 bg-cyan-500/10 scale-[1.01]'
                : 'border-slate-600 hover:border-cyan-500/50 hover:bg-slate-800/30'
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              multiple
              accept="application/pdf"
              className="hidden"
              onChange={e => addFiles(e.target.files)}
            />
            <Upload className={`w-12 h-12 mx-auto mb-4 transition-colors ${dragging ? 'text-cyan-400' : 'text-slate-500'}`} />
            <p className="text-lg font-semibold text-slate-300 mb-1">Drop PDF files here or click to browse</p>
            <p className="text-sm text-slate-500">PDF only · Multiple files supported</p>
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div className="bg-slate-900/50 rounded-2xl border border-slate-700 overflow-hidden">

              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-slate-700">
                <p className="text-sm text-slate-400">
                  <span className="text-white font-semibold">{files.length}</span> file{files.length !== 1 ? 's' : ''}
                  {doneCount > 0 && totalSavings > 0 && (
                    <span className="ml-2 text-cyan-400 font-semibold">
                      · saved {formatBytes(totalOrig - totalComp)} ({totalSavings}% total)
                    </span>
                  )}
                </p>
                <div className="flex gap-2">
                  {downloadableCount > 0 && (
                    <button
                      onClick={handleDownloadAll}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Save All ({downloadableCount})
                    </button>
                  )}
                  <button
                    onClick={handleClearAll}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-300 text-sm font-semibold hover:bg-slate-700 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All
                  </button>
                </div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-slate-800">
                {files.map(item => {
                  const savings = getSavingsPct(item.origSize, item.compSize);
                  return (
                    <div key={item.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-800/30 transition-colors">

                      {/* Icon */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                        {item.status === 'compressing' ? (
                          <Loader className="w-6 h-6 text-cyan-400 animate-spin" />
                        ) : item.status === 'done' ? (
                          <CheckCircle className="w-6 h-6 text-emerald-400" />
                        ) : item.status === 'error' || item.status === 'encrypted' ? (
                          <AlertTriangle className="w-6 h-6 text-red-400" />
                        ) : (
                          <FileText className="w-6 h-6 text-slate-400" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-200 truncate">{item.file.name}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-slate-400">
                          <span>Original: <span className="text-slate-300">{formatBytes(item.origSize)}</span></span>
                          {item.status === 'done' && (
                            <>
                              <span>
                                Compressed:{' '}
                                <span className="text-cyan-400 font-semibold">{formatBytes(item.compSize)}</span>
                              </span>
                              {savings > 0 ? (
                                <span className="text-emerald-400 font-semibold">−{savings}%</span>
                              ) : (
                                <span className="text-slate-500">Already optimized</span>
                              )}
                            </>
                          )}
                          {item.status === 'compressing' && (
                            <span className="text-yellow-400">
                              Compressing… {item.progress > 0 ? `${item.progress}%` : ''}
                            </span>
                          )}
                          {(item.status === 'error' || item.status === 'encrypted') && (
                            <span className="text-red-400">{item.errorMsg}</span>
                          )}
                        </div>

                        {/* Progress bar */}
                        {item.status === 'compressing' && (
                          <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden w-full max-w-xs">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {item.status === 'done' && item.compBytes && (
                          <button
                            onClick={() => handleDownload(item)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-semibold hover:from-cyan-500/30 hover:to-blue-500/30 transition-all"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Save
                          </button>
                        )}
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all"
                          title="Remove"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Compress button */}
              {files.some(f => f.status === 'pending') && (
                <div className="px-6 py-4 border-t border-slate-700">
                  <button
                    onClick={handleCompressAll}
                    disabled={processing}
                    className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  >
                    <FileText className="w-5 h-5" />
                    {processing
                      ? 'Compressing…'
                      : `Compress ${files.filter(f => f.status === 'pending').length} PDF${files.filter(f => f.status === 'pending').length !== 1 ? 's' : ''}`}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* What to expect callout */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-6">
            <p className="font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              What to expect
            </p>
            <div className="grid sm:grid-cols-3 gap-4 text-sm text-slate-400">
              <div>
                <p className="font-semibold text-emerald-400 mb-1">Best results</p>
                <p>PDFs with embedded photos or scanned pages. Savings of 30–70% are common.</p>
              </div>
              <div>
                <p className="font-semibold text-yellow-400 mb-1">Moderate results</p>
                <p>Mixed documents with text and graphics. Expect 10–30% savings from metadata removal.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-400 mb-1">Minimal results</p>
                <p>Text-only or already-optimized PDFs. Browser-side compression has limits without native codecs.</p>
              </div>
            </div>
          </div>

          {/* Privacy callout */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-2xl border border-cyan-500/30 p-6 flex items-start gap-4">
            <Shield className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-cyan-300 mb-1">Your documents never leave your device</p>
              <p className="text-sm text-slate-400 leading-relaxed">
                All processing happens inside your browser using PDF-lib and the Canvas API. No data is uploaded to any server, no accounts required, and nothing is logged or tracked. Sensitive documents stay private.
              </p>
            </div>
          </div>

          {/* About link */}
          <div className="text-center">
            <a href="/tools/about-pdf-compressor"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm">
              <BookOpen className="w-4 h-4" />
              Learn about PDF compression and document privacy
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/logo.png" alt="CyberLifeCoach"
              className="h-8 w-auto transition-all duration-300 hover:scale-125 hover:brightness-125" />
            <span className="font-bold text-lg transition-all duration-300 hover:text-cyan-400 hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
              CyberLifeCoach
            </span>
          </div>
          <div className="text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} CyberLifeCoach</p>
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
