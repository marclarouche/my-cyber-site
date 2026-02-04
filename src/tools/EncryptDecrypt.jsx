import React, { useState, useEffect } from 'react';
import { Lock, ArrowLeft, Copy, Eye, EyeOff, RefreshCw, Shield, AlertTriangle, Upload, Download, FileText, Key } from 'lucide-react';

export default function EncryptDecrypt() {
  // Text encryption state
  const [textOperation, setTextOperation] = useState('encrypt');
  const [textInput, setTextInput] = useState('');
  const [textKey, setTextKey] = useState('');
  const [textIterations, setTextIterations] = useState(150000);
  const [textResult, setTextResult] = useState('');
  const [textKeyVisible, setTextKeyVisible] = useState(false);
  const [textResultVisible, setTextResultVisible] = useState(false);

  // File encryption state
  const [fileOperation, setFileOperation] = useState('encrypt');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileKey, setFileKey] = useState('');
  const [fileIterations, setFileIterations] = useState(150000);
  const [fileKeyVisible, setFileKeyVisible] = useState(false);
  const [processedBlob, setProcessedBlob] = useState(null);
  const [fileResultVisible, setFileResultVisible] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // UI state
  const [activeTab, setActiveTab] = useState('text');
  const [notification, setNotification] = useState('');
  const [compatError, setCompatError] = useState('');

  const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  
  // Compatibility check
  useEffect(() => {
    if (!window.isSecureContext) {
      setCompatError('This page needs HTTPS or localhost for secure randomness.');
      return;
    }
    if (!window.crypto || typeof window.crypto.getRandomValues !== 'function') {
      setCompatError('Secure random generator not available in this browser.');
      return;
    }
    if (!window.crypto.subtle) {
      setCompatError('Web Crypto API not available in this browser.');
      return;
    }
  }, []);

  // Crypto utility functions
  const te = new TextEncoder();
  const td = new TextDecoder();

  const randUint32 = () => {
    const u = new Uint32Array(1);
    crypto.getRandomValues(u);
    return u[0] >>> 0;
  };

  const randIndex = (maxExclusive) => {
    if (maxExclusive <= 0) return 0;
    const limit = Math.floor(0x100000000 / maxExclusive) * maxExclusive;
    let r;
    do {
      r = randUint32();
    } while (r >= limit);
    return r % maxExclusive;
  };

  const generatePassphrase = () => {
    const words = ['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'golf', 'hotel'];
    const chosen = [];
    for (let i = 0; i < 4; i++) {
      chosen.push(words[randIndex(words.length)]);
    }
    const num = Math.floor(Math.random() * 100);
    const sym = SYMBOLS[randIndex(SYMBOLS.length)];
    return chosen.join('-') + num + sym;
  };

  const arrayBufferToBase64 = (buffer) => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const base64ToArrayBuffer = (base64) => {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const aesGcmEncrypt = async (plainBytes, password, iterations = 150000) => {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      te.encode(password),
      'PBKDF2',
      false,
      ['deriveKey']
    );
    
    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: iterations,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt']
    );
    
    const ciphertext = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      plainBytes
    );
    
    return {
      v: 1,
      a: 'AES-256-GCM',
      i: iterations,
      s: arrayBufferToBase64(salt),
      iv: arrayBufferToBase64(iv),
      ct: arrayBufferToBase64(ciphertext)
    };
  };

  const aesGcmDecrypt = async (envelope, password) => {
    if (!envelope || typeof envelope !== 'object') {
      throw new Error('Invalid envelope format');
    }
    if (envelope.v !== 1 || envelope.a !== 'AES-256-GCM') {
      throw new Error('Unsupported envelope version or algorithm');
    }
    
    const salt = new Uint8Array(base64ToArrayBuffer(envelope.s));
    const iv = new Uint8Array(base64ToArrayBuffer(envelope.iv));
    const ciphertext = new Uint8Array(base64ToArrayBuffer(envelope.ct));
    const iterations = envelope.i || 150000;
    
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      te.encode(password),
      'PBKDF2',
      false,
      ['deriveKey']
    );
    
    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: iterations,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );
    
    const plaintext = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      ciphertext
    );
    
    return new Uint8Array(plaintext);
  };

  // Text encryption handlers
  const handleProcessText = async () => {
    if (!textInput) {
      showNotification('Please enter text to process');
      return;
    }
    if (!textKey) {
      showNotification('Please enter a passphrase');
      return;
    }

    try {
      if (textOperation === 'encrypt') {
        const envelope = await aesGcmEncrypt(te.encode(textInput), textKey, textIterations);
        setTextResult(JSON.stringify(envelope));
      } else {
        let envelope;
        try {
          envelope = JSON.parse(textInput);
        } catch {
          showNotification('Decryption expects the armored JSON produced by this tool');
          return;
        }
        const plaintext = await aesGcmDecrypt(envelope, textKey);
        setTextResult(td.decode(plaintext));
      }
      setTextResultVisible(true);
    } catch (err) {
      showNotification(err.message || 'Operation failed');
    }
  };

  const handleCopyResult = async () => {
    try {
      await navigator.clipboard.writeText(textResult);
      showNotification('Result copied to clipboard');
    } catch {
      showNotification('Failed to copy to clipboard');
    }
  };

  const handleResetText = () => {
    setTextInput('');
    setTextKey('');
    setTextResult('');
    setTextResultVisible(false);
  };

  // File encryption handlers
  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setFileResultVisible(false);
    setProcessedBlob(null);
  };

  const handleProcessFile = async () => {
    if (!selectedFile) {
      showNotification('Please select a file first');
      return;
    }
    if (!fileKey) {
      showNotification('Please enter a passphrase');
      return;
    }

    if (fileOperation === 'encrypt' && selectedFile.size > 250 * 1024 * 1024) {
      const ok = window.confirm('This will load a large file into memory. Continue?');
      if (!ok) return;
    }

    try {
      if (fileOperation === 'encrypt') {
        const data = await selectedFile.arrayBuffer();
        const envelope = await aesGcmEncrypt(new Uint8Array(data), fileKey, fileIterations);
        envelope.name = selectedFile.name;
        envelope.mime = selectedFile.type || 'application/octet-stream';
        const text = JSON.stringify(envelope);
        const blob = new Blob([text], { type: 'application/json' });
        setProcessedBlob(blob);
      } else {
        const text = await selectedFile.text();
        let envelope;
        try {
          envelope = JSON.parse(text);
        } catch {
          throw new Error('Invalid file format. Expected armored JSON.');
        }
        const plain = await aesGcmDecrypt(envelope, fileKey);
        const outName = envelope.name ? envelope.name.replace(/\.enc\.json$|\.le1$|\.encrypted$/i, '') : 'decrypted.bin';
        const blob = new Blob([plain], { type: envelope.mime || 'application/octet-stream' });
        blob.suggestedName = outName;
        setProcessedBlob(blob);
      }
      setFileResultVisible(true);
    } catch (err) {
      showNotification(err.message || 'Error processing file');
    }
  };

  const handleDownloadFile = () => {
    if (!processedBlob) return;
    
    let name;
    if (fileOperation === 'encrypt') {
      const base = (selectedFile.name || 'encrypted').replace(/\.[^/.]+$/, '');
      name = base + '.encrypted.json';
    } else {
      name = processedBlob.suggestedName || 'decrypted.bin';
    }
    
    const url = URL.createObjectURL(processedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleResetFile = () => {
    setSelectedFile(null);
    setFileKey('');
    setFileResultVisible(false);
    setProcessedBlob(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/logo.png" 
              alt="CyberLifeCoach" 
              className="h-10 w-auto transition-all duration-300 hover:scale-110 hover:brightness-125" 
            />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Local Encryption Tool
              </h1>
              <p className="text-xs text-slate-400">Fully Offline • AES-256-GCM</p>
            </div>
          </div>
          <a href="/tools" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Tools Hub</span>
          </a>
        </div>
      </nav>

      {/* Compatibility Error */}
      {compatError && (
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-4 flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
            <p className="text-red-200">{compatError}</p>
          </div>
        </div>
      )}

      {/* Privacy Notice */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <Shield className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-cyan-400 mb-2">Privacy First</h3>
              <p className="text-slate-300 leading-relaxed">
                This tool runs entirely in your browser. No data is sent to any server. A strict Content Security Policy prevents external connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex space-x-2 bg-slate-900/50 p-2 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
              activeTab === 'text'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>Text Encryption</span>
          </button>
          <button
            onClick={() => setActiveTab('file')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
              activeTab === 'file'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Upload className="w-5 h-5" />
            <span>File Encryption</span>
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
              activeTab === 'info'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Key className="w-5 h-5" />
            <span>How It Works</span>
          </button>
        </div>
      </section>

      {/* Text Encryption Tab */}
      {activeTab === 'text' && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            {/* Algorithm Badge */}
            <div className="mb-6">
              <div className="flex items-center space-x-3">
                <label className="text-sm text-slate-400">Encryption Algorithm</label>
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-semibold border border-cyan-500/30">
                  AES-256-GCM
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Authenticated encryption with random salt and IV, PBKDF2-SHA-256 key derivation
              </p>
            </div>

            {/* Operation Select */}
            <div className="mb-6">
              <label className="block text-sm text-slate-400 mb-2">Operation</label>
              <select
                value={textOperation}
                onChange={(e) => setTextOperation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors"
              >
                <option value="encrypt">Encrypt</option>
                <option value="decrypt">Decrypt</option>
              </select>
            </div>

            {/* Text Input */}
            <div className="mb-6">
              <label className="block text-sm text-slate-400 mb-2">Text to Process</label>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Enter text to encrypt or paste the armored JSON to decrypt"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors min-h-[120px] font-mono text-sm"
                spellCheck={false}
              />
            </div>

            {/* Passphrase Input */}
            <div className="mb-6">
              <label className="block text-sm text-slate-400 mb-2">Passphrase</label>
              <div className="flex space-x-2 mb-3">
                <div className="flex-1 relative">
                  <input
                    type={textKeyVisible ? 'text' : 'password'}
                    value={textKey}
                    onChange={(e) => setTextKey(e.target.value)}
                    placeholder="Enter a strong passphrase"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 pr-12 text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors"
                    autoComplete="new-password"
                  />
                  <button
                    onClick={() => setTextKeyVisible(!textKeyVisible)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {textKeyVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <button
                  onClick={() => setTextKey(generatePassphrase())}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-300 border border-slate-700 hover:border-cyan-500/50 flex items-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">Generate</span>
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <label className="text-xs text-slate-500">
                  PBKDF2 iterations:
                  <input
                    type="number"
                    value={textIterations}
                    onChange={(e) => setTextIterations(Math.max(50000, Number(e.target.value)))}
                    min="50000"
                    step="1000"
                    className="ml-2 bg-slate-950 border border-slate-700 rounded px-2 py-1 w-28 text-slate-300 focus:outline-none focus:border-cyan-500"
                  />
                </label>
                <span className="text-xs text-slate-600">(more = slower, stronger)</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                For decryption, use the same passphrase used for encryption
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={handleProcessText}
                className="flex-1 min-w-[200px] bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Lock className="w-5 h-5" />
                <span>Process Text</span>
              </button>
              {textResultVisible && (
                <button
                  onClick={handleCopyResult}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-300 border border-slate-700 hover:border-cyan-500/50 flex items-center space-x-2"
                >
                  <Copy className="w-5 h-5" />
                  <span>Copy Result</span>
                </button>
              )}
              <button
                onClick={handleResetText}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-300 border border-slate-700 hover:border-red-500/50 flex items-center space-x-2"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Result Area */}
            {textResultVisible && (
              <div className="bg-slate-950 border border-cyan-500/30 rounded-xl p-6">
                <h3 className="text-cyan-400 font-semibold mb-3">Result</h3>
                <textarea
                  value={textResult}
                  readOnly
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 font-mono text-sm min-h-[120px]"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* File Encryption Tab */}
      {activeTab === 'file' && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            {/* Algorithm Badge */}
            <div className="mb-6">
              <div className="flex items-center space-x-3">
                <label className="text-sm text-slate-400">Encryption Algorithm</label>
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-semibold border border-cyan-500/30">
                  AES-256-GCM
                </span>
              </div>
            </div>

            {/* Operation Select */}
            <div className="mb-6">
              <label className="block text-sm text-slate-400 mb-2">Operation</label>
              <select
                value={fileOperation}
                onChange={(e) => setFileOperation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors"
              >
                <option value="encrypt">Encrypt</option>
                <option value="decrypt">Decrypt</option>
              </select>
            </div>

            {/* File Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input').click()}
              className={`mb-6 border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
                dragOver
                  ? 'border-cyan-500 bg-cyan-500/10'
                  : 'border-slate-700 hover:border-cyan-500/50 hover:bg-slate-900/50'
              }`}
            >
              <Upload className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Upload a File</h3>
              <p className="text-slate-400">Drag & drop a file here or click to browse</p>
              <input
                id="file-input"
                type="file"
                onChange={(e) => e.target.files.length && handleFileSelect(e.target.files[0])}
                className="hidden"
              />
            </div>

            {/* Selected File Info */}
            {selectedFile && (
              <div className="mb-6 bg-slate-950 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-cyan-400" />
                  <div className="flex-1">
                    <p className="font-semibold text-slate-200">{selectedFile.name}</p>
                    <p className="text-sm text-slate-500">{formatFileSize(selectedFile.size)}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Passphrase Input */}
            <div className="mb-6">
              <label className="block text-sm text-slate-400 mb-2">Passphrase</label>
              <div className="flex space-x-2 mb-3">
                <div className="flex-1 relative">
                  <input
                    type={fileKeyVisible ? 'text' : 'password'}
                    value={fileKey}
                    onChange={(e) => setFileKey(e.target.value)}
                    placeholder="Enter a strong passphrase"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 pr-12 text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors"
                    autoComplete="new-password"
                  />
                  <button
                    onClick={() => setFileKeyVisible(!fileKeyVisible)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {fileKeyVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <button
                  onClick={() => setFileKey(generatePassphrase())}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-300 border border-slate-700 hover:border-cyan-500/50 flex items-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">Generate</span>
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <label className="text-xs text-slate-500">
                  PBKDF2 iterations:
                  <input
                    type="number"
                    value={fileIterations}
                    onChange={(e) => setFileIterations(Math.max(50000, Number(e.target.value)))}
                    min="50000"
                    step="1000"
                    className="ml-2 bg-slate-950 border border-slate-700 rounded px-2 py-1 w-28 text-slate-300 focus:outline-none focus:border-cyan-500"
                  />
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={handleProcessFile}
                className="flex-1 min-w-[200px] bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Lock className="w-5 h-5" />
                <span>Process File</span>
              </button>
              {fileResultVisible && (
                <button
                  onClick={handleDownloadFile}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-300 border border-slate-700 hover:border-cyan-500/50 flex items-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Result</span>
                </button>
              )}
              <button
                onClick={handleResetFile}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-300 border border-slate-700 hover:border-red-500/50 flex items-center space-x-2"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Result Message */}
            {fileResultVisible && (
              <div className="bg-slate-950 border border-cyan-500/30 rounded-xl p-6">
                <div className="flex items-center space-x-3 text-cyan-400">
                  <Shield className="w-6 h-6" />
                  <div>
                    <h3 className="font-semibold">File Processing Complete</h3>
                    <p className="text-sm text-slate-400 mt-1">Your file has been processed. Click "Download Result" to save it.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* How It Works Tab */}
      {activeTab === 'info' && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">About This Tool</h2>
            
            <div className="space-y-6 text-slate-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Technology</h3>
                <p className="leading-relaxed">
                  This tool uses the browser's <strong className="text-cyan-400">Web Crypto API</strong> with AES-256-GCM and PBKDF2-SHA-256. 
                  Salts and IVs are generated with a cryptographically secure PRNG. All work happens locally in your browser.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Format</h3>
                <p className="leading-relaxed mb-3">
                  Outputs are JSON ("armored") with the following fields:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-400">
                  <li><code className="text-cyan-400 bg-slate-950 px-2 py-1 rounded">v</code> - version</li>
                  <li><code className="text-cyan-400 bg-slate-950 px-2 py-1 rounded">a</code> - algorithm</li>
                  <li><code className="text-cyan-400 bg-slate-950 px-2 py-1 rounded">i</code> - iterations</li>
                  <li><code className="text-cyan-400 bg-slate-950 px-2 py-1 rounded">s</code> - base64 salt</li>
                  <li><code className="text-cyan-400 bg-slate-950 px-2 py-1 rounded">iv</code> - base64 IV</li>
                  <li><code className="text-cyan-400 bg-slate-950 px-2 py-1 rounded">ct</code> - base64 ciphertext</li>
                </ul>
                <p className="leading-relaxed mt-3">
                  Files also include <code className="text-cyan-400 bg-slate-950 px-2 py-1 rounded">name</code> and <code className="text-cyan-400 bg-slate-950 px-2 py-1 rounded">mime</code> when encrypting.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Security Notes</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-400">
                  <li>Choose a strong, unique passphrase. Longer is better.</li>
                  <li>If decryption fails, it could be an incorrect passphrase or corrupted input.</li>
                  <li>Large files may use significant memory; this tool processes files in-memory.</li>
                  <li>This tool is designed for personal use and local encryption needs.</li>
                  <li>Always keep a backup of your passphrases in a secure location.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Legal Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Legal Disclaimer:</strong> This tool runs entirely in your browser using 
            cryptographic standards. While designed for security, no encryption tool can guarantee absolute protection. 
            Use strong, unique passphrases and keep them secure. CyberLifeCoach assumes no liability for data loss, 
            security breaches, or any outcomes from using this tool.
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
            <p className="text-slate-600">All encryption happens entirely in your browser. No data is sent anywhere.</p>
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
