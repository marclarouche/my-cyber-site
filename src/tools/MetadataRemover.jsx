import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Shield, ArrowLeft, Upload, Trash2, Download, Image as ImageIcon, FileText, AlertTriangle, Check } from 'lucide-react';

export default function MetadataRemover() {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [notification, setNotification] = useState('');
  const [options, setOptions] = useState({
    removeExif: true,
    removeAuthor: true,
    removeDates: true,
    removeSoftware: true
  });

  const fileInputRef = useRef(null);

  // Memoize blob URLs to avoid recreating them on each render
  const resultURLs = useMemo(() => {
    return results.map(result => ({
      cleanedURL: URL.createObjectURL(result.cleaned),
      originalURL: result.original ? URL.createObjectURL(result.original) : null
    }));
  }, [results]);

  // Cleanup blob URLs when results change or on unmount
  useEffect(() => {
    const urlsToRevoke = [];
    
    resultURLs.forEach(item => {
      urlsToRevoke.push(item.cleanedURL);
      if (item.originalURL) {
        urlsToRevoke.push(item.originalURL);
      }
    });
    
    return () => {
      urlsToRevoke.forEach(url => {
        try {
          URL.revokeObjectURL(url);
        } catch {
          // URL might have already been revoked or is invalid
        }
      });
    };
  }, [resultURLs]);

  const supportedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  const isSupported = (file) => {
    return supportedTypes.includes(file.type);
  };

  const handleFiles = (fileList) => {
    const validFiles = Array.from(fileList).filter(f => isSupported(f));
    setFiles(validFiles);
    if (validFiles.length === 0) {
      showNotification('No supported files selected');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e) => {
    handleFiles(e.target.files);
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const units = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + units[i];
  };

  const extractMetadataSurface = (file) => {
    const base = [
      { key: 'File', value: file.name },
      { key: 'Size', value: formatSize(file.size) },
      { key: 'Type', value: file.type || 'unknown' },
      { key: 'Modified', value: new Date(file.lastModified).toLocaleString() }
    ];

    if (file.type.startsWith('image/')) {
      base.push({ key: 'EXIF', value: 'Camera, GPS, Date stripped via re-encode' });
    } else if (file.type === 'application/pdf') {
      base.push(
        { key: 'PDF Info', value: 'Title, Author, Subject, Keywords, Creator, Producer cleared' },
        { key: 'XMP', value: 'Metadata packet removed if present' }
      );
    } else {
      base.push(
        { key: 'OOXML Props', value: 'docProps (core/app/custom) removed' },
        { key: 'Creator/Dates', value: 'scrubbed in main part where present' }
      );
    }

    return base;
  };

  const cleanImage = async (originalFile, fileData) => {
    const img = new Image();
    const src = URL.createObjectURL(new Blob([fileData]));
    img.src = src;
    await img.decode();

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(src);

    const blob = await new Promise(res => canvas.toBlob(res, originalFile.type, 0.95));
    const cleanedFile = new File(
      [blob],
      originalFile.name.replace(/(\.\w+)$/, '.clean$1'),
      { type: originalFile.type }
    );
    const previewDataURL = canvas.toDataURL(originalFile.type);

    return { original: originalFile, cleaned: cleanedFile, preview: previewDataURL };
  };

  const cleanPDF = async (originalFile, buf) => {
    if (!window.PDFLib) {
      return { original: originalFile, cleaned: originalFile, warning: 'PDF library not loaded' };
    }

    const pdf = await window.PDFLib.PDFDocument.load(buf, { updateMetadata: false });

    if (options.removeAuthor) {
      pdf.setAuthor('');
      pdf.setCreator('');
      pdf.setProducer('');
    }
    if (options.removeDates) {
      pdf.setCreationDate(undefined);
      pdf.setModificationDate(undefined);
    }

    pdf.setTitle('');
    pdf.setSubject('');
    pdf.setKeywords([]);

    try {
      pdf.catalog.set(window.PDFLib.PDFName.of('Metadata'), undefined);
    } catch {
      console.log('Could not remove XMP metadata');
    }

    const out = await pdf.save({ useObjectStreams: false });
    const cleaned = new File(
      [out],
      originalFile.name.replace(/\.pdf$/i, '.clean.pdf'),
      { type: 'application/pdf' }
    );

    return { original: originalFile, cleaned };
  };

  const cleanOOXML = async (originalFile, buf) => {
    if (!window.JSZip) {
      return { original: originalFile, cleaned: originalFile, warning: 'OOXML library not loaded' };
    }

    const zip = await window.JSZip.loadAsync(buf);

    // Remove docProps directory
    for (const p of ['docProps/core.xml', 'docProps/app.xml', 'docProps/custom.xml']) {
      if (zip.file(p)) zip.remove(p);
    }

    // Scrub _rels/.rels
    const relsPath = '_rels/.rels';
    if (zip.file(relsPath)) {
      const xml = await zip.file(relsPath).async('string');
      const cleaned = xml.replaceAll(/<Relationship[^>]+Target="docProps\/[^"]+"[^>]*\/>/g, '');
      zip.file(relsPath, cleaned);
    }

    // Clean main part XML
    const candidates = ['word/document.xml', 'ppt/presentation.xml', 'xl/workbook.xml'];
    for (const p of candidates) {
      if (zip.file(p)) {
        let xml = await zip.file(p).async('string');
        xml = cleanMainPartXML(xml);
        zip.file(p, xml);
      }
    }

    const outBlob = await zip.generateAsync({ type: 'blob' });
    const cleaned = new File(
      [outBlob],
      originalFile.name.replace(/\.(docx|pptx|xlsx)$/i, '.clean.$1'),
      { type: originalFile.type }
    );

    return { original: originalFile, cleaned };
  };

  const cleanMainPartXML = (xml) => {
    if (options.removeAuthor) {
      xml = xml.replaceAll(/(w:author|dc:creator|cp:lastModifiedBy)="[^"]*"/g, '$1=""');
    }
    if (options.removeDates) {
      xml = xml.replaceAll(/(dcterms:created|dcterms:modified)="[^"]*"/g, '$1=""');
    }
    if (options.removeSoftware) {
      xml = xml.replaceAll(/(cp:revision)="[^"]*"/g, '$1=""');
    }
    return xml;
  };

  const processFile = async (file) => {
    const buf = await file.arrayBuffer();
    const meta = extractMetadataSurface(file);

    if (file.type.startsWith('image/')) {
      const cleaned = await cleanImage(file, buf);
      return { ...cleaned, metadata: meta };
    }

    if (file.type === 'application/pdf') {
      const cleaned = await cleanPDF(file, buf);
      return { ...cleaned, metadata: meta };
    }

    if (/\.(docx|pptx|xlsx)$/i.test(file.name)) {
      const cleaned = await cleanOOXML(file, buf);
      return { ...cleaned, metadata: meta };
    }

    return { original: file, cleaned: file, metadata: meta, warning: 'Unsupported type' };
  };

  const handleProcess = async () => {
    if (files.length === 0) return;

    setProcessing(true);
    const output = [];

    for (const file of files) {
      try {
        const res = await processFile(file);
        output.push(res);
      } catch (err) {
        output.push({
          original: file,
          cleaned: file,
          metadata: [],
          error: err.message
        });
      }
    }

    setProcessing(false);
    setResults(output);
    showNotification('Processing complete');
  };

  const handleClear = () => {
    setFiles([]);
    setResults([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    showNotification('All files cleared');
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center space-x-3 group cursor-pointer">
              <img 
                src="/logo.png" 
                alt="CyberLifeCoach" 
                className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300" 
              />
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-8 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
              Privacy Tool
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Client-Side Only
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Meta-Data Remover
          </h1>
          <p className="text-slate-400 text-lg">
            Strip hidden data from your files to protect your privacy. Runs entirely in your browser, no data leaves your device.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative max-w-5xl mx-auto px-4 pb-20">
        {/* Supported File Types */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6 mb-6">
          <h3 className="text-lg font-semibold mb-3 text-cyan-400">Supported File Types</h3>
          <p className="text-sm text-slate-400 mb-4">Remove EXIF data from images and scrub PDF/Office metadata.</p>
          <div className="flex flex-wrap gap-2">
            {['JPEG', 'PNG', 'PDF', 'DOCX', 'PPTX', 'XLSX'].map(type => (
              <span key={type} className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-cyan-400 text-sm font-semibold">
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Upload Area */}
        <div
          className={`bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border-2 border-dashed transition-all duration-300 p-12 text-center mb-6 cursor-pointer ${
            dragOver ? 'border-cyan-500 bg-cyan-500/10' : 'border-slate-700 hover:border-cyan-500/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-16 h-16 text-slate-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Drop files here or click to browse</h3>
          <p className="text-slate-400 mb-4">Images, PDFs, and Office files. Multiple selection supported.</p>
          
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileInput}
            accept=".jpg,.jpeg,.png,.pdf,.docx,.pptx,.xlsx"
            multiple
            className="hidden"
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
          >
            Choose Files
          </button>

          {files.length > 0 && (
            <p className="text-sm text-cyan-400 mt-4">
              {files.length} file{files.length !== 1 ? 's' : ''} selected
            </p>
          )}
        </div>

        {/* Options */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-cyan-400">Removal Options</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={options.removeExif}
                onChange={(e) => setOptions(prev => ({ ...prev, removeExif: e.target.checked }))}
                className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-slate-300 group-hover:text-cyan-400 transition-colors">
                Remove EXIF data
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={options.removeAuthor}
                onChange={(e) => setOptions(prev => ({ ...prev, removeAuthor: e.target.checked }))}
                className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-slate-300 group-hover:text-cyan-400 transition-colors">
                Remove author info
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={options.removeDates}
                onChange={(e) => setOptions(prev => ({ ...prev, removeDates: e.target.checked }))}
                className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-slate-300 group-hover:text-cyan-400 transition-colors">
                Remove date fields
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={options.removeSoftware}
                onChange={(e) => setOptions(prev => ({ ...prev, removeSoftware: e.target.checked }))}
                className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-slate-300 group-hover:text-cyan-400 transition-colors">
                Remove software info
              </span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={handleProcess}
            disabled={files.length === 0 || processing}
            className="flex-1 min-w-[200px] bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Shield className="w-5 h-5" />
            <span>{processing ? 'Processing...' : 'Remove Metadata'}</span>
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all flex items-center space-x-2"
          >
            <Trash2 className="w-5 h-5" />
            <span>Clear All</span>
          </button>
        </div>

        {/* Loading Indicator */}
        {processing && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8 mb-6 text-center">
            <div className="inline-block w-12 h-12 border-4 border-slate-700 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400">Processing files, this may take a moment.</p>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-6">
            {results.map((result, index) => {
              const urls = resultURLs[index];
              const cleanedURL = urls.cleanedURL;
              const originalURL = urls.originalURL;

              return (
                <div key={index} className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    {result.error ? (
                      <AlertTriangle className="w-6 h-6 text-red-400" />
                    ) : (
                      <Check className="w-6 h-6 text-green-400" />
                    )}
                    <h3 className="text-xl font-semibold">{result.original.name}</h3>
                  </div>

                  {/* Image Preview */}
                  {result.preview && (
                    <div className="grid md:grid-cols-3 gap-4 mb-6 items-center">
                      <div className="text-center">
                        <strong className="block text-sm text-slate-400 mb-2">Original</strong>
                        <img src={originalURL} alt="Original preview" className="rounded-lg border border-slate-700 max-w-full h-auto" />
                      </div>
                      <div className="text-center text-3xl text-cyan-400">→</div>
                      <div className="text-center">
                        <strong className="block text-sm text-slate-400 mb-2">Cleaned</strong>
                        <img src={result.preview} alt="Cleaned preview" className="rounded-lg border border-slate-700 max-w-full h-auto" />
                      </div>
                    </div>
                  )}

                  {/* Error/Warning */}
                  {result.error && (
                    <div className="bg-red-900/20 border border-red-500/40 rounded-lg p-4 mb-4">
                      <strong className="text-red-300">Error:</strong> <span className="text-red-200">{result.error}</span>
                    </div>
                  )}
                  {result.warning && (
                    <div className="bg-yellow-900/20 border border-yellow-500/40 rounded-lg p-4 mb-4">
                      <strong className="text-yellow-300">Note:</strong> <span className="text-yellow-200">{result.warning}</span>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">{result.metadata.length}</div>
                      <div className="text-xs text-slate-500">Metadata fields</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">{formatSize(result.original.size)}</div>
                      <div className="text-xs text-slate-500">Original size</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">{formatSize(result.cleaned.size)}</div>
                      <div className="text-xs text-slate-500">Cleaned size</div>
                    </div>
                  </div>

                  {/* Metadata List */}
                  <h4 className="font-semibold mb-3 text-cyan-400">Metadata Found</h4>
                  <div className="bg-slate-950 rounded-lg p-4 mb-6 space-y-2">
                    {result.metadata.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm border-b border-slate-800 pb-2 last:border-b-0 last:pb-0">
                        <span className="text-slate-400 font-medium">{item.key}</span>
                        <span className="text-slate-300">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Download Button */}
                  <div className="text-center">
                    <a
                      href={cleanedURL}
                      download={result.cleaned.name}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download Cleaned File</span>
                    </a>
                    <p className="text-sm text-slate-500 mt-2">
                      File: {result.cleaned.name} ({formatSize(result.cleaned.size)})
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Privacy Note */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 mt-6">
          <p className="text-sm text-slate-300 leading-relaxed">
            <strong className="text-cyan-400">Privacy:</strong> Everything runs locally in your browser. PDFs are scrubbed by removing Info fields and XMP metadata. Office files are rebuilt without <code className="bg-slate-950 px-1 rounded">docProps/</code>. Images are re-encoded to drop EXIF and GPS data.
          </p>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Legal Disclaimer:</strong> Meta-Data Remover is provided "as-is" without warranty of any kind. It is your responsibility to use this tool legally and ethically.
            While the code is designed to operate locally and not upload your files, it cannot guarantee total metadata removal in every case.
            Always verify results before sharing, and ensure compliance with local laws and organizational data policies.
            CyberLife Coach is not liable for any data loss, security incidents, or misuse.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img 
              src="/logo.png" 
              alt="CyberLifeCoach" 
              className="h-8 w-auto transition-all duration-300 hover:scale-125 hover:brightness-125" 
            />
            <span className="font-bold text-lg transition-all duration-300 hover:text-cyan-400 hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
              CyberLifeCoach
            </span>
          </div>
          <div className="text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} CyberLifeCoach</p>
            <p className="text-slate-600">Analysis happens entirely in your browser. No data is sent anywhere.</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg shadow-cyan-500/50 animate-fade-in z-50">
          {notification}
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
