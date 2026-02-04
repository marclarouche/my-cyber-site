import React, { useState, useRef, useEffect } from 'react';
import { Shield, ArrowLeft, Download, Printer, Upload, QrCode, AlertTriangle } from 'lucide-react';

export default function QRCodeGenerator() {
  const [activeTab, setActiveTab] = useState('generate');
  const [qrType, setQrType] = useState('url');
  const [qrData, setQrData] = useState({
    url: '',
    text: '',
    wifiSSID: '',
    wifiPassword: '',
    wifiSecurity: 'WPA',
    wifiHidden: 'false',
    email: '',
    phone: '',
    smsPhone: '',
    smsMessage: ''
  });
  const [generatedQR, setGeneratedQR] = useState(null);
  const [scanResult, setScanResult] = useState('');
  const [scanAlert, setScanAlert] = useState({ message: '', isError: false });
  const [notification, setNotification] = useState('');
  const [librariesLoaded, setLibrariesLoaded] = useState(false);
  const librariesLoadedRef = useRef(false);

  const qrCodeRef = useRef(null);
  const fileInputRef = useRef(null);
  const offscreenCanvasRef = useRef(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  useEffect(() => {
    // Check if libraries are loaded
    const checkLibraries = () => {
      if (window.QRCode && window.jsQR && !librariesLoadedRef.current) {
        librariesLoadedRef.current = true;
        setLibrariesLoaded(true);
      }
    };
    
    checkLibraries();
    
    if (!librariesLoadedRef.current) {
      // Wait a bit for scripts to load
      const timer = setTimeout(() => {
        checkLibraries();
        if (!librariesLoadedRef.current) {
          showNotification('Required libraries not loaded. Please refresh the page.');
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleInputChange = (field, value) => {
    setQrData(prev => ({ ...prev, [field]: value }));
  };

  const generateQRCode = () => {
    if (!librariesLoaded) {
      showNotification('QR Code library not loaded yet');
      return;
    }

    let data = '';

    switch (qrType) {
      case 'url':
        if (!qrData.url.trim()) return;
        data = qrData.url.trim();
        break;
      case 'text':
        if (!qrData.text.trim()) return;
        data = qrData.text.trim();
        break;
      case 'wifi':
        if (!qrData.wifiSSID.trim()) return;
        data = `WIFI:T:${qrData.wifiSecurity};S:${qrData.wifiSSID};P:${qrData.wifiPassword};H:${qrData.wifiHidden};;`;
        break;
      case 'email':
        if (!qrData.email.trim()) return;
        data = `mailto:${qrData.email.trim()}`;
        break;
      case 'phone':
        if (!qrData.phone.trim()) return;
        data = `tel:${qrData.phone.trim()}`;
        break;
      case 'sms':
        if (!qrData.smsPhone.trim()) return;
        data = `sms:${qrData.smsPhone.trim()}?body=${encodeURIComponent(qrData.smsMessage.trim())}`;
        break;
      default:
        return;
    }

    // Clear previous QR code
    if (qrCodeRef.current) {
      qrCodeRef.current.innerHTML = '';
      new window.QRCode(qrCodeRef.current, {
        text: data,
        width: 256,
        height: 256,
        correctLevel: window.QRCode.CorrectLevel.H
      });
      setGeneratedQR(true);
      showNotification('QR Code generated successfully');
    }
  };

  const downloadQRCode = () => {
    const canvas = qrCodeRef.current?.querySelector('canvas');
    const img = qrCodeRef.current?.querySelector('img');
    let dataUrl = '';
    
    if (canvas) {
      dataUrl = canvas.toDataURL('image/png');
    } else if (img) {
      dataUrl = img.src;
    }
    
    if (!dataUrl) return;
    
    const a = document.createElement('a');
    a.download = 'qrcode.png';
    a.href = dataUrl;
    a.click();
    showNotification('QR Code downloaded');
  };

  const printQRCode = () => {
    const canvas = qrCodeRef.current?.querySelector('canvas');
    const img = qrCodeRef.current?.querySelector('img');
    let dataUrl = '';
    
    if (canvas) {
      dataUrl = canvas.toDataURL('image/png');
    } else if (img) {
      dataUrl = img.src;
    }
    
    if (!dataUrl) return;
    
    const w = window.open('', '_blank', 'width=600,height=600');
    if (!w) return;
    
    w.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print QR Code</title>
          <style>
            body {
              margin: 0;
              text-align: center;
            }
            img {
              max-width: 100%;
              border: 1px solid #ccc;
              padding: 10px;
              margin: 50px auto;
              display: inline-block;
              border-radius: 8px;
            }
          </style>
        </head>
        <body>
          <img src="${dataUrl}" onload="window.print(); window.close();" />
        </body>
      </html>
    `);
    w.document.close();
    showNotification('Opening print dialog');
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    await decodeFile(file);
    e.target.value = '';
  };

  const decodeFile = async (file) => {
    if (!librariesLoaded || !window.jsQR) {
      showNotification('QR scanning library not loaded yet');
      return;
    }

    setScanResult('');
    setScanAlert({ message: '', isError: false });

    try {
      let bmp;
      if ('createImageBitmap' in window) {
        bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });
      } else {
        const dataURL = await fileToDataURL(file);
        bmp = await loadImageElement(dataURL);
      }

      const MAX_DIM = 1200;
      const { width, height } = fitWithin(bmp.width, bmp.height, MAX_DIM);

      if (!offscreenCanvasRef.current) {
        offscreenCanvasRef.current = document.createElement('canvas');
      }
      const canvas = offscreenCanvasRef.current;
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(bmp, 0, 0, width, height);

      const decoded = tryDecodeAtScales(canvas, [1, 0.75, 0.5]);
      
      if (!decoded) {
        setScanAlert({
          message: 'No QR code detected. Try a clearer image or crop closer.',
          isError: true
        });
        return;
      }

      setScanResult(decoded);
      showNotification('QR Code decoded successfully');
    } catch (err) {
      console.error(err);
      setScanAlert({
        message: 'Error reading image. Use a standard PNG/JPG.',
        isError: true
      });
    }
  };

  const tryDecodeAtScales = (canvas, scales) => {
    const sw = canvas.width;
    const sh = canvas.height;

    for (const s of scales) {
      const w = Math.max(80, Math.round(sw * s));
      const h = Math.max(80, Math.round(sh * s));
      let imgData;

      if (w === sw && h === sh) {
        imgData = canvas.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, sw, sh);
      } else {
        const tmp = document.createElement('canvas');
        tmp.width = w;
        tmp.height = h;
        const tctx = tmp.getContext('2d', { willReadFrequently: true });
        tctx.drawImage(canvas, 0, 0, w, h);
        imgData = tctx.getImageData(0, 0, w, h);
      }

      const code = window.jsQR(imgData.data, imgData.width, imgData.height);
      if (code && code.data) return code.data;
    }

    return null;
  };

  const fitWithin = (w, h, max) => {
    if (w <= max && h <= max) return { width: w, height: h };
    const s = w > h ? max / w : max / h;
    return { width: Math.round(w * s), height: Math.round(h * s) };
  };

  const fileToDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const loadImageElement = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
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
          <div className="flex items-center space-x-4 mb-4">
            <QrCode className="w-12 h-12 text-cyan-400" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                QR Code Security Tool
              </h1>
              <p className="text-slate-400 mt-2">Generate QR codes and scan uploaded QR images for basic indicators. Private, client side, no data leaves this page.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-5xl mx-auto px-4 mb-8">
        <div className="flex space-x-2 bg-slate-900/50 p-2 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('generate')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
              activeTab === 'generate'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <QrCode className="w-5 h-5" />
            <span>Generate QR Code</span>
          </button>
          <button
            onClick={() => setActiveTab('scan')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
              activeTab === 'scan'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Upload className="w-5 h-5" />
            <span>Scan & Analyze</span>
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative max-w-5xl mx-auto px-4 pb-20">
        {/* Generate Tab */}
        {activeTab === 'generate' && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            {/* QR Code Type */}
            <div className="mb-6">
              <label className="block text-sm text-slate-400 mb-2">QR Code Type</label>
              <select
                value={qrType}
                onChange={(e) => setQrType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors"
              >
                <option value="url">Website URL</option>
                <option value="text">Plain Text</option>
                <option value="wifi">WiFi Network</option>
                <option value="email">Email Address</option>
                <option value="phone">Phone Number</option>
                <option value="sms">SMS Message</option>
              </select>
            </div>

            {/* Dynamic Fields */}
            {qrType === 'url' && (
              <div className="mb-6">
                <label className="block text-sm text-slate-400 mb-2">Enter URL</label>
                <input
                  type="text"
                  value={qrData.url}
                  onChange={(e) => handleInputChange('url', e.target.value)}
                  placeholder="https://example.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            )}

            {qrType === 'text' && (
              <div className="mb-6">
                <label className="block text-sm text-slate-400 mb-2">Enter Text</label>
                <textarea
                  value={qrData.text}
                  onChange={(e) => handleInputChange('text', e.target.value)}
                  placeholder="Type your text…"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors min-h-[100px]"
                />
              </div>
            )}

            {qrType === 'wifi' && (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">SSID</label>
                  <input
                    type="text"
                    value={qrData.wifiSSID}
                    onChange={(e) => handleInputChange('wifiSSID', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Password</label>
                  <input
                    type="password"
                    value={qrData.wifiPassword}
                    onChange={(e) => handleInputChange('wifiPassword', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Security</label>
                    <select
                      value={qrData.wifiSecurity}
                      onChange={(e) => handleInputChange('wifiSecurity', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="WPA">WPA/WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">None (Open)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Hidden</label>
                    <select
                      value={qrData.wifiHidden}
                      onChange={(e) => handleInputChange('wifiHidden', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {qrType === 'email' && (
              <div className="mb-6">
                <label className="block text-sm text-slate-400 mb-2">Email Address</label>
                <input
                  type="text"
                  value={qrData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            )}

            {qrType === 'phone' && (
              <div className="mb-6">
                <label className="block text-sm text-slate-400 mb-2">Phone Number</label>
                <input
                  type="text"
                  value={qrData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1234567890"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            )}

            {qrType === 'sms' && (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Phone Number</label>
                  <input
                    type="text"
                    value={qrData.smsPhone}
                    onChange={(e) => handleInputChange('smsPhone', e.target.value)}
                    placeholder="+1234567890"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Message</label>
                  <textarea
                    value={qrData.smsMessage}
                    onChange={(e) => handleInputChange('smsMessage', e.target.value)}
                    placeholder="SMS message text"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors min-h-[100px]"
                  />
                </div>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={generateQRCode}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 mb-6"
            >
              Generate QR Code
            </button>

            {/* QR Code Output */}
            {generatedQR && (
              <div className="bg-slate-950 rounded-xl p-8 border border-slate-700">
                <div ref={qrCodeRef} className="flex justify-center mb-6"></div>
                
                <div className="flex flex-wrap gap-3 justify-center no-print">
                  <button
                    onClick={downloadQRCode}
                    className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={printQRCode}
                    className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
                  >
                    <Printer className="w-5 h-5" />
                    <span>Print</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Scan Tab */}
        {activeTab === 'scan' && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            {/* Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-xl p-12 text-center cursor-pointer transition-all duration-300 mb-6"
            >
              <Upload className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Click to upload a QR code image</h3>
              <p className="text-slate-400">PNG, JPG, or other image formats</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Scan Alert */}
            {scanAlert.message && (
              <div className={`rounded-lg p-4 mb-6 flex items-start space-x-3 ${
                scanAlert.isError 
                  ? 'bg-red-900/20 border border-red-500/40' 
                  : 'bg-green-900/20 border border-green-500/40'
              }`}>
                <AlertTriangle className={`w-6 h-6 flex-shrink-0 ${
                  scanAlert.isError ? 'text-red-400' : 'text-green-400'
                }`} />
                <p className={scanAlert.isError ? 'text-red-200' : 'text-green-200'}>
                  {scanAlert.message}
                </p>
              </div>
            )}

            {/* Scan Results */}
            {scanResult && (
              <div className="bg-slate-950 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold mb-4 text-cyan-400">Scan Results</h3>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                  <p className="text-slate-300 font-mono text-sm break-all">{scanResult}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Legal Disclaimer */}
      <section className="max-w-5xl mx-auto px-4 pb-8">
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-6">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Legal Disclaimer:</strong> This tool is informational. QR content and indicators shown here use basic client-side heuristics
            and should not be relied upon to determine safety, authenticity, identity, or trustworthiness.
            Always verify the destination before scanning or connecting. The creator assumes no responsibility
            for misuse, data loss, or incidents arising from use of this tool.
          </p>
        </div>

        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-12">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Data Privacy:</strong> This application runs as a fully client-side web tool. QR decoding is performed using <strong>jsQR</strong>
            and QR generation uses <strong>QRCode.js</strong>, both executing locally in your browser runtime.
            No remote APIs are contacted, and no QR data is transmitted off-device. If you save this page locally,
            the tool will continue to function completely offline.
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
    </div>
  );
}
