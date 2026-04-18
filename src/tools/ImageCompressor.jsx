import React, { useState, useRef, useCallback } from 'react';
import { Image, ArrowLeft, Upload, Download, Trash2, Shield, ChevronRight, BookOpen, X, ZoomIn } from 'lucide-react';

// ─── Compression helpers (all browser-side, no upload) ───────────────────────

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function getSavings(original, compressed) {
  if (!original || !compressed) return null;
  const pct = Math.round((1 - compressed / original) * 100);
  return pct;
}

async function compressImage(file, quality) {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const isPng = file.type === 'image/png';
      const mimeType = isPng ? 'image/png' : 'image/jpeg';
      // For PNG we do a basic re-encode (canvas strips extra metadata)
      const q = isPng ? 1.0 : quality / 100;

      canvas.toBlob(
        (blob) => {
          if (!blob) { reject(new Error('Compression failed')); return; }
          resolve(blob);
        },
        mimeType,
        q
      );
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Load failed')); };
    img.src = url;
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ImageCompressor() {
  const [files, setFiles] = useState([]);          // { id, file, preview, origSize, compBlob, compSize, quality, status }
  const [quality, setQuality] = useState(75);
  const [dragging, setDragging] = useState(false);
  const [lightbox, setLightbox] = useState(null);  // { original, compressed, name }
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef(null);

  // Accept JPEG, PNG, WebP
  const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];

  const addFiles = useCallback((incoming) => {
    const valid = Array.from(incoming).filter(f => ACCEPTED.includes(f.type));
    if (!valid.length) return;
    const mapped = valid.map(f => ({
      id: crypto.randomUUID(),
      file: f,
      preview: URL.createObjectURL(f),
      origSize: f.size,
      compBlob: null,
      compSize: null,
      quality: quality,
      status: 'pending',   // pending | compressing | done | error
    }));
    setFiles(prev => [...prev, ...mapped]);
  }, [quality]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const handleCompressAll = async () => {
    if (processing) return;
    setProcessing(true);

    setFiles(prev => prev.map(f =>
      f.status === 'pending' ? { ...f, status: 'compressing' } : f
    ));

    // Process sequentially to avoid memory spikes
    setFiles(prev => {
      const updated = [...prev];
      (async () => {
        for (let i = 0; i < updated.length; i++) {
          const item = updated[i];
          if (item.status !== 'compressing') continue;
          try {
            const blob = await compressImage(item.file, quality);
            setFiles(cur => cur.map(f =>
              f.id === item.id
                ? { ...f, compBlob: blob, compSize: blob.size, status: 'done', quality }
                : f
            ));
          } catch {
            setFiles(cur => cur.map(f =>
              f.id === item.id ? { ...f, status: 'error' } : f
            ));
          }
        }
        setProcessing(false);
      })();
      return updated;
    });
  };

  const handleDownload = (item) => {
    if (!item.compBlob) return;
    const ext = item.file.type === 'image/png' ? 'png' : item.file.type === 'image/webp' ? 'webp' : 'jpg';
    const baseName = item.file.name.replace(/\.[^.]+$/, '');
    const url = URL.createObjectURL(item.compBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${baseName}-compressed.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    files.filter(f => f.status === 'done').forEach(handleDownload);
  };

  const handleRemove = (id) => {
    setFiles(prev => {
      const item = prev.find(f => f.id === id);
      if (item?.preview) URL.revokeObjectURL(item.preview);
      return prev.filter(f => f.id !== id);
    });
  };

  const handleClearAll = () => {
    files.forEach(f => { if (f.preview) URL.revokeObjectURL(f.preview); });
    setFiles([]);
  };

  const openLightbox = (item) => {
    if (!item.compBlob) return;
    setLightbox({
      original: item.preview,
      compressed: URL.createObjectURL(item.compBlob),
      name: item.file.name,
    });
  };

  const totalOrig = files.reduce((s, f) => s + f.origSize, 0);
  const totalComp = files.filter(f => f.status === 'done').reduce((s, f) => s + (f.compSize || 0), 0);
  const doneCount = files.filter(f => f.status === 'done').length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">

      {/* ── Nav ── */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center space-x-3 group cursor-pointer">
              <img src="/logo.png" alt="CyberLifeCoach" className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:brightness-125 transition-all duration-300">
                CyberLifeCoach
              </span>
            </a>
            <div className="flex items-center gap-4">
              <a href="/tools/about-image-compressor" className="hidden sm:flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                <BookOpen className="w-4 h-4" />
                <span>About</span>
              </a>
              <a href="/tools" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Tools Hub</span>
              </a>
            </div>
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
            Image Compressor
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-3">
            Compress JPEG, PNG, and WebP images directly in your browser. Your files never leave your device — no uploads, no servers, no tracking.
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

          {/* Quality slider */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  JPEG / WebP Quality: <span className="text-cyan-400">{quality}%</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="95"
                  value={quality}
                  onChange={e => setQuality(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-cyan-400 bg-slate-700"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Smallest file</span>
                  <span>Best quality</span>
                </div>
              </div>
              <div className="text-sm text-slate-400 bg-slate-800 rounded-xl px-4 py-3 border border-slate-700">
                <p className="font-semibold text-slate-300 mb-1">Quality guide</p>
                <p>60–75% — great balance for web</p>
                <p>75–85% — high quality, smaller size</p>
                <p>85–95% — near-lossless</p>
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
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={e => addFiles(e.target.files)}
            />
            <Upload className={`w-12 h-12 mx-auto mb-4 transition-colors ${dragging ? 'text-cyan-400' : 'text-slate-500'}`} />
            <p className="text-lg font-semibold text-slate-300 mb-1">Drop images here or click to browse</p>
            <p className="text-sm text-slate-500">JPEG · PNG · WebP — multiple files supported</p>
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div className="bg-slate-900/50 rounded-2xl border border-slate-700 overflow-hidden">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-slate-700">
                <p className="text-sm text-slate-400">
                  <span className="text-white font-semibold">{files.length}</span> image{files.length !== 1 ? 's' : ''} selected
                  {doneCount > 0 && (
                    <span className="ml-2 text-cyan-400 font-semibold">
                      · {doneCount} compressed · saved {formatBytes(totalOrig - totalComp)} ({getSavings(totalOrig, totalComp) ?? 0}%)
                    </span>
                  )}
                </p>
                <div className="flex gap-2">
                  {doneCount > 0 && (
                    <button
                      onClick={handleDownloadAll}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Save All ({doneCount})
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
                  const savings = getSavings(item.origSize, item.compSize);
                  return (
                    <div key={item.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-800/30 transition-colors">
                      {/* Thumbnail */}
                      <div className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-slate-800 border border-slate-700">
                        <img src={item.preview} alt={item.file.name} className="w-full h-full object-cover" />
                        {item.status === 'done' && (
                          <button
                            onClick={() => openLightbox(item)}
                            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                            title="Compare before/after"
                          >
                            <ZoomIn className="w-5 h-5 text-white" />
                          </button>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-200 truncate">{item.file.name}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-slate-400">
                          <span>Original: <span className="text-slate-300">{formatBytes(item.origSize)}</span></span>
                          {item.status === 'done' && (
                            <>
                              <span>Compressed: <span className="text-cyan-400 font-semibold">{formatBytes(item.compSize)}</span></span>
                              {savings !== null && (
                                <span className={`font-semibold ${savings > 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                                  {savings > 0 ? `−${savings}%` : 'No change'}
                                </span>
                              )}
                            </>
                          )}
                          {item.status === 'compressing' && <span className="text-yellow-400 animate-pulse">Compressing…</span>}
                          {item.status === 'error' && <span className="text-red-400">Error — try a different format</span>}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {item.status === 'done' && (
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
                    <Image className="w-5 h-5" />
                    {processing ? 'Compressing…' : `Compress ${files.filter(f => f.status === 'pending').length} Image${files.filter(f => f.status === 'pending').length !== 1 ? 's' : ''}`}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Privacy callout */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-2xl border border-cyan-500/30 p-6 flex items-start gap-4">
            <Shield className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-cyan-300 mb-1">Your files never leave your device</p>
              <p className="text-sm text-slate-400 leading-relaxed">
                All compression happens inside your browser using the Canvas API. No data is uploaded to any server, no accounts are required, and nothing is logged or tracked.
              </p>
            </div>
          </div>

          {/* About link */}
          <div className="text-center">
            <a href="/tools/about-image-compressor" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm">
              <BookOpen className="w-4 h-4" />
              Learn about image compression best practices
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => { URL.revokeObjectURL(lightbox.compressed); setLightbox(null); }}
        >
          <div className="max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white truncate">{lightbox.name} — Before / After</h3>
              <button
                onClick={() => { URL.revokeObjectURL(lightbox.compressed); setLightbox(null); }}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
                <p className="text-xs font-semibold text-slate-400 px-4 py-2 border-b border-slate-700">Original</p>
                <img src={lightbox.original} alt="Original" className="w-full object-contain max-h-96" />
              </div>
              <div className="bg-slate-900 rounded-xl overflow-hidden border border-cyan-500/30">
                <p className="text-xs font-semibold text-cyan-400 px-4 py-2 border-b border-cyan-500/30">Compressed</p>
                <img src={lightbox.compressed} alt="Compressed" className="w-full object-contain max-h-96" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/logo.png" alt="CyberLifeCoach" className="h-8 w-auto transition-all duration-300 hover:scale-125 hover:brightness-125" />
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
