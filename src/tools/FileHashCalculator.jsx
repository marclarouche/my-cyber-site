import React, { useState, useRef, useEffect } from 'react';
import { Shield, ArrowLeft, Upload, Copy, RefreshCw, FileText, AlertTriangle, Check } from 'lucide-react';

export default function FileHashCalculator() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileBuffer, setFileBuffer] = useState(null);
  const [algorithms, setAlgorithms] = useState({
    'MD5': false,
    'SHA-1': false,
    'SHA-256': true,
    'SHA-512': false
  });
  const [hashes, setHashes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [notification, setNotification] = useState('');
  const [showLargeFileWarning, setShowLargeFileWarning] = useState(false);

  const fileInputRef = useRef(null);

  // Auto-calculate when algorithms change
  useEffect(() => {
    if (selectedFile && fileBuffer) {
      calculateHashes();
    }
  }, [algorithms]);

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
    if (e.dataTransfer.files.length) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files.length) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleFileSelect = async (file) => {
    setSelectedFile(file);
    setShowLargeFileWarning(file.size > 750 * 1024 * 1024);
    
    try {
      const buffer = await file.arrayBuffer();
      setFileBuffer(buffer);
      // Will trigger useEffect to calculate hashes
    } catch (error) {
      showNotification('Error reading file');
      console.error('File read error:', error);
    }
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${units[i]}`;
  };

  const arrayBufferToWordArray = (ab) => {
    const u8 = new Uint8Array(ab);
    const words = [];
    for (let i = 0; i < u8.length; i += 4) {
      const w = ((u8[i] << 24) |
                 ((u8[i + 1] ?? 0) << 16) |
                 ((u8[i + 2] ?? 0) << 8) |
                 ((u8[i + 3] ?? 0))) >>> 0;
      words.push(w);
    }
    return window.CryptoJS.lib.WordArray.create(words, u8.length);
  };

  const md5Fallback = async (arrayBuffer) => {
    if (!window.CryptoJS) {
      throw new Error('CryptoJS not loaded');
    }
    const wa = arrayBufferToWordArray(arrayBuffer);
    return window.CryptoJS.MD5(wa).toString();
  };

  const digestHex = async (alg, buf) => {
    const d = await crypto.subtle.digest(alg, buf);
    const bytes = new Uint8Array(d);
    let hex = '';
    for (const byte of bytes) {
      hex += byte.toString(16).padStart(2, '0');
    }
    return hex;
  };

  const computeOne = async (algo, arrayBuffer) => {
    if (algo === 'MD5') {
      const value = await md5Fallback(arrayBuffer);
      return { name: 'MD5', value };
    }
    try {
      const value = await digestHex(algo, arrayBuffer);
      return { name: algo, value };
    } catch (error) {
      return { name: algo, value: 'Unavailable in this context' };
    }
  };

  const calculateHashes = async () => {
    const selectedAlgos = Object.entries(algorithms)
      .filter(([_, checked]) => checked)
      .map(([algo, _]) => algo);

    if (selectedAlgos.length === 0) {
      showNotification('Please select at least one hash algorithm');
      setHashes([]);
      return;
    }

    if (!fileBuffer) {
      showNotification('Please select a file first');
      return;
    }

    setLoading(true);
    setHashes([]);

    try {
      if (!crypto?.subtle) {
        throw new Error('Web Crypto API not available.');
      }

      const tasks = selectedAlgos.map(a => computeOne(a, fileBuffer));
      const results = await Promise.all(tasks);
      setHashes(results);
    } catch (error) {
      console.error('Hashing error:', error);
      showNotification('Hashing failed. Try a smaller file or a modern browser.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (value, algorithm) => {
    try {
      await navigator.clipboard.writeText(value);
      showNotification(`${algorithm} hash copied to clipboard`);
    } catch (error) {
      showNotification('Failed to copy to clipboard');
    }
  };

  const handleAlgorithmToggle = (algo) => {
    setAlgorithms(prev => ({
      ...prev,
      [algo]: !prev[algo]
    }));
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
              Security Tool
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Client-Side Only
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            File Hash Calculator
          </h1>
          <p className="text-slate-400 text-lg">
            Calculate cryptographic hashes locally in your browser. Nothing is uploaded.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative max-w-5xl mx-auto px-4 pb-20">
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
          <FileText className="w-16 h-16 text-slate-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Drop your file here or click to browse</h3>
          <p className="text-slate-400 mb-4">Any file type. Best under ~750 MB for smooth performance.</p>
          
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileInput}
            className="hidden"
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            Choose File
          </button>
        </div>

        {/* File Info */}
        {selectedFile && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6 mb-6">
            <div className="flex items-center space-x-2 text-slate-300">
              <strong>Selected File:</strong>
              <span>{selectedFile.name}</span>
              <span>•</span>
              <span>{formatSize(selectedFile.size)}</span>
              <span>•</span>
              <span>{selectedFile.type || 'Unknown'}</span>
            </div>
          </div>
        )}

        {/* Large File Warning */}
        {showLargeFileWarning && (
          <div className="bg-yellow-900/20 border border-yellow-500/40 rounded-xl p-4 mb-6 flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="text-yellow-200">
              Large file detected. Hashing very large files can be slow or memory-intensive in the browser.
            </p>
          </div>
        )}

        {/* Algorithm Selection */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-cyan-400">Choose Hash Algorithms</h3>
            <button
              onClick={calculateHashes}
              disabled={!selectedFile || loading}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Recalculate</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {Object.entries(algorithms).map(([algo, checked]) => (
              <label key={algo} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleAlgorithmToggle(algo)}
                  className="hidden"
                />
                <span className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 border ${
                  checked
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50 border-transparent'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
                }`}>
                  {algo}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8 mb-6 text-center">
            <div className="inline-block w-12 h-12 border-4 border-slate-700 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400">Calculating hashes… this may take a moment for large files.</p>
          </div>
        )}

        {/* Hash Results */}
        {hashes.length > 0 && !loading && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">Hash Results</h3>
            <div className="space-y-4">
              {hashes.map((hash, index) => (
                <div key={index} className="bg-slate-950 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-cyan-400 mb-2">{hash.name}:</div>
                      <div className="text-slate-300 font-mono text-sm break-all">{hash.value}</div>
                    </div>
                    <button
                      onClick={() => handleCopy(hash.value, hash.name)}
                      className="flex-shrink-0 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 text-sm font-semibold transition-all flex items-center space-x-2"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-cyan-400">About File Hashes</h3>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              <span><strong>MD5</strong> is common for quick integrity checks, but not collision-resistant for security decisions.</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              <span><strong>SHA-1</strong> is deprecated for security-sensitive use because of known weaknesses.</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              <span><strong>SHA-256</strong> is the current standard for integrity verification.</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              <span><strong>SHA-512</strong> offers a larger output for high-assurance contexts.</span>
            </li>
          </ul>
          <p className="text-slate-400 mt-4">
            All hashing happens locally in your browser, no data leaves your device.
          </p>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Legal Disclaimer:</strong> This tool is provided "as-is" with no warranties, guarantees, or assurances of any kind. All file hashing is performed locally on your device, and no files are uploaded to any server. You are responsible for using this tool appropriately and in accordance with applicable laws and policies. We are not liable for any loss, damage, or misuse arising from its use.
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
            <p className="text-slate-600">Hashing happens entirely in your browser. No data is sent anywhere.</p>
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
