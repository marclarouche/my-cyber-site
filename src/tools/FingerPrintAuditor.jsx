import React, { useState, useEffect } from 'react';
import { Fingerprint, ArrowLeft, Shield, Copy } from 'lucide-react';

export default function FingerPrintAuditor() {
  const [notification, setNotification] = useState('');
  const [riskScore, setRiskScore] = useState('?');
  const [riskLevel, setRiskLevel] = useState('Calculating...');
  const [riskDescription, setRiskDescription] = useState("Analyzing your browser's unique identifiers...");
  
  const [basicInfo, setBasicInfo] = useState([]);
  const [screenInfo, setScreenInfo] = useState([]);
  const [fontsInfo, setFontsInfo] = useState([]);
  const [fontsCount, setFontsCount] = useState(0);
  const [canvasInfo, setCanvasInfo] = useState([]);
  const [webglInfo, setWebglInfo] = useState([]);
  const [audioInfo, setAudioInfo] = useState([]);
  const [timeInfo, setTimeInfo] = useState([]);
  const [hardwareInfo, setHardwareInfo] = useState([]);
  const [chartData, setChartData] = useState([]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  useEffect(() => {
    collectFingerprint();
  }, []);

  const collectFingerprint = async () => {
    let uniquenessScore = 0;
    const data = {
      basic: [],
      screen: [],
      fonts: [],
      canvas: [],
      webgl: [],
      audio: [],
      time: [],
      hardware: []
    };

    // Basic Browser Info
    data.basic.push({ label: 'User Agent', value: navigator.userAgent, unique: 3 });
    data.basic.push({ label: 'Platform', value: navigator.platform, unique: 2 });
    data.basic.push({ label: 'Language', value: navigator.language, unique: 2 });
    data.basic.push({ label: 'Languages', value: navigator.languages.join(', '), unique: 3 });
    data.basic.push({ label: 'Cookie Enabled', value: navigator.cookieEnabled ? 'Yes' : 'No', unique: 1 });
    data.basic.push({ label: 'Do Not Track', value: navigator.doNotTrack || 'Not set', unique: 1 });
    uniquenessScore += 12;

    // Screen & Display
    data.screen.push({ label: 'Screen Resolution', value: `${screen.width} × ${screen.height}`, unique: 3 });
    data.screen.push({ label: 'Available Resolution', value: `${screen.availWidth} × ${screen.availHeight}`, unique: 2 });
    data.screen.push({ label: 'Color Depth', value: `${screen.colorDepth}-bit`, unique: 2 });
    data.screen.push({ label: 'Pixel Depth', value: `${screen.pixelDepth}-bit`, unique: 1 });
    data.screen.push({ label: 'Device Pixel Ratio', value: window.devicePixelRatio, unique: 2 });
    uniquenessScore += 10;

    // Fonts Detection
    const testFonts = [
      'Arial', 'Verdana', 'Times New Roman', 'Courier New', 'Georgia',
      'Comic Sans MS', 'Trebuchet MS', 'Impact', 'Arial Black', 'Tahoma',
      'Consolas', 'Monaco', 'Lucida Console', 'Palatino', 'Garamond',
      'Bookman', 'Avant Garde', 'Helvetica', 'Calibri', 'Cambria'
    ];
    const detectedFonts = [];
    const baseFonts = ['monospace', 'sans-serif', 'serif'];
    const testString = 'mmmmmmmmmmlli';
    const testSize = '72px';

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    const baseWidths = {};
    baseFonts.forEach(baseFont => {
      context.font = `${testSize} ${baseFont}`;
      baseWidths[baseFont] = context.measureText(testString).width;
    });

    testFonts.forEach(font => {
      let detected = false;
      baseFonts.forEach(baseFont => {
        context.font = `${testSize} '${font}', ${baseFont}`;
        const width = context.measureText(testString).width;
        if (width !== baseWidths[baseFont]) {
          detected = true;
        }
      });
      if (detected) {
        detectedFonts.push(font);
      }
    });

    data.fonts = detectedFonts.map(font => ({ label: font, value: '✓', unique: 0 }));
    setFontsCount(detectedFonts.length);
    uniquenessScore += Math.min(detectedFonts.length, 15);

    // Canvas Fingerprint
    const canvasFp = generateCanvasFingerprint();
    data.canvas.push({ label: 'Canvas Hash', value: canvasFp.substring(0, 16) + '...', unique: 5 });
    data.canvas.push({ label: 'Full Hash', value: canvasFp, unique: 0 });
    uniquenessScore += 5;

    // WebGL & GPU Info
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        data.webgl.push({ label: 'Vendor', value: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL), unique: 3 });
        data.webgl.push({ label: 'Renderer', value: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL), unique: 4 });
      }
      data.webgl.push({ label: 'WebGL Version', value: gl.getParameter(gl.VERSION), unique: 2 });
      data.webgl.push({ label: 'Shading Language', value: gl.getParameter(gl.SHADING_LANGUAGE_VERSION), unique: 1 });
      uniquenessScore += 10;
    } else {
      data.webgl.push({ label: 'WebGL', value: 'Not supported', unique: 1 });
      uniquenessScore += 1;
    }

    // Audio Context
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const analyser = audioContext.createAnalyser();
      const gainNode = audioContext.createGain();
      const scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);

      gainNode.gain.value = 0;
      oscillator.connect(analyser);
      analyser.connect(scriptProcessor);
      scriptProcessor.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start(0);
      
      const audioHash = await new Promise((resolve) => {
        scriptProcessor.onaudioprocess = (event) => {
          const output = event.outputBuffer.getChannelData(0);
          let hash = 0;
          for (let i = 0; i < output.length; i++) {
            hash += Math.abs(output[i]);
          }
          oscillator.stop();
          audioContext.close();
          resolve(hash.toString(36).substring(0, 16));
        };
      });

      data.audio.push({ label: 'Audio Hash', value: audioHash, unique: 4 });
      data.audio.push({ label: 'Sample Rate', value: `${audioContext.sampleRate} Hz`, unique: 2 });
      uniquenessScore += 6;
    } catch (e) {
      data.audio.push({ label: 'Audio Context', value: 'Not available', unique: 1 });
      uniquenessScore += 1;
    }

    // Time & Language
    data.time.push({ label: 'Timezone', value: Intl.DateTimeFormat().resolvedOptions().timeZone, unique: 3 });
    data.time.push({ label: 'Timezone Offset', value: `${new Date().getTimezoneOffset()} minutes`, unique: 2 });
    data.time.push({ label: 'System Time', value: new Date().toLocaleString(), unique: 0 });
    uniquenessScore += 5;

    // Connection & Hardware
    data.hardware.push({ label: 'CPU Cores', value: navigator.hardwareConcurrency || 'Unknown', unique: 2 });
    data.hardware.push({ label: 'Device Memory', value: navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'Unknown', unique: 2 });
    data.hardware.push({ label: 'Max Touch Points', value: navigator.maxTouchPoints, unique: 2 });
    
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      data.hardware.push({ label: 'Connection Type', value: connection.effectiveType || 'Unknown', unique: 1 });
      data.hardware.push({ label: 'Downlink', value: connection.downlink ? `${connection.downlink} Mbps` : 'Unknown', unique: 1 });
    }
    uniquenessScore += 8;

    // Set all data
    setBasicInfo(data.basic);
    setScreenInfo(data.screen);
    setFontsInfo(data.fonts);
    setCanvasInfo(data.canvas);
    setWebglInfo(data.webgl);
    setAudioInfo(data.audio);
    setTimeInfo(data.time);
    setHardwareInfo(data.hardware);

    // Calculate risk score
    const normalizedScore = Math.min(Math.round((uniquenessScore / 80) * 100), 100);
    setRiskScore(normalizedScore);

    if (normalizedScore < 30) {
      setRiskLevel('Low Uniqueness');
      setRiskDescription('Your browser has common settings. You blend in well with other users.');
    } else if (normalizedScore < 60) {
      setRiskLevel('Moderate Uniqueness');
      setRiskDescription('Your browser has some unique characteristics that could be used for tracking.');
    } else if (normalizedScore < 80) {
      setRiskLevel('High Uniqueness');
      setRiskDescription('Your browser has many unique identifiers. You are easily trackable across sites.');
    } else {
      setRiskLevel('Very High Uniqueness');
      setRiskDescription('Your browser fingerprint is highly unique. You stand out significantly.');
    }

    // Create chart data
    const chart = [
      { category: 'Browser', score: Math.min(data.basic.reduce((a, b) => a + b.unique, 0), 15) },
      { category: 'Screen', score: data.screen.reduce((a, b) => a + b.unique, 0) },
      { category: 'Fonts', score: Math.min(detectedFonts.length, 15) },
      { category: 'Canvas', score: 5 },
      { category: 'WebGL', score: data.webgl.reduce((a, b) => a + b.unique, 0) },
      { category: 'Audio', score: data.audio.reduce((a, b) => a + b.unique, 0) },
    ];
    setChartData(chart);
  };

  const generateCanvasFingerprint = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 50;
    const ctx = canvas.getContext('2d');

    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('Browser Fingerprint 🔍', 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText('Fingerprint Test', 4, 17);

    const dataURL = canvas.toDataURL();
    let hash = 0;
    for (let i = 0; i < dataURL.length; i++) {
      const char = dataURL.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  };

  const copyFingerprint = () => {
    const allData = {
      riskScore,
      riskLevel,
      basicInfo,
      screenInfo,
      fontsDetected: fontsInfo.map(f => f.label),
      canvasInfo,
      webglInfo,
      audioInfo,
      timeInfo,
      hardwareInfo
    };

    const text = JSON.stringify(allData, null, 2);
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => showNotification('Fingerprint data copied to clipboard'),
        () => showNotification('Failed to copy data')
      );
    } else {
      showNotification('Clipboard not available');
    }
  };

  const getRiskColor = () => {
    const score = parseInt(riskScore);
    if (score < 30) return 'text-green-400';
    if (score < 60) return 'text-yellow-400';
    if (score < 80) return 'text-orange-400';
    return 'text-red-400';
  };

  const getChartBarColor = (category) => {
    const colors = {
      'Browser': 'bg-cyan-500',
      'Screen': 'bg-blue-500',
      'Fonts': 'bg-purple-500',
      'Canvas': 'bg-pink-500',
      'WebGL': 'bg-orange-500',
      'Audio': 'bg-green-500',
    };
    return colors[category] || 'bg-slate-500';
  };

  const DataRow = ({ label, value }) => (
    <div className="flex justify-between items-start py-2 border-b border-slate-700/50 last:border-0">
      <span className="text-slate-400 text-sm font-medium">{label}</span>
      <span className="text-slate-300 text-sm text-right ml-4 break-all">{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">
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
        
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <Fingerprint className="w-12 h-12 text-cyan-400" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Browser Fingerprinting Auditor
              </h1>
              <p className="text-slate-400 mt-2">
                This tool reveals what information your browser exposes that can be used to identify you across websites.
                All analysis runs locally on your device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Card */}
      <section className="relative max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8 mb-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">Your Fingerprint Summary</h2>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
            {/* Score Circle */}
            <div className="flex-shrink-0">
              <div className={`w-32 h-32 rounded-full border-4 ${getRiskColor()} border-opacity-30 flex items-center justify-center bg-slate-950`}>
                <div className={`text-5xl font-bold ${getRiskColor()}`}>{riskScore}</div>
              </div>
            </div>

            {/* Risk Description */}
            <div className="flex-1 text-center md:text-left">
              <h3 className={`text-2xl font-bold mb-2 ${getRiskColor()}`}>{riskLevel}</h3>
              <p className="text-slate-400">{riskDescription}</p>
            </div>
          </div>

          {/* Chart */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-300 mb-4">Uniqueness by Category</h3>
            {chartData.map((item) => (
              <div key={item.category} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">{item.category}</span>
                  <span className="text-slate-300">{item.score}/15</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getChartBarColor(item.category)} transition-all duration-1000`}
                    style={{ width: `${(item.score / 15) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Grid */}
      <section className="relative max-w-7xl mx-auto px-4 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Basic Browser Info */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center space-x-2">
              <span>🌐</span>
              <span>Basic Browser Info</span>
            </h3>
            <div className="space-y-1">
              {basicInfo.map((item, idx) => (
                <DataRow key={idx} label={item.label} value={item.value} />
              ))}
            </div>
          </div>

          {/* Screen & Display */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center space-x-2">
              <span>🖥️</span>
              <span>Screen & Display</span>
            </h3>
            <div className="space-y-1">
              {screenInfo.map((item, idx) => (
                <DataRow key={idx} label={item.label} value={item.value} />
              ))}
            </div>
          </div>

          {/* Fonts Available */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center space-x-2">
              <span>🔤</span>
              <span>Fonts Available</span>
            </h3>
            <div className="mb-3">
              <span className="text-sm text-slate-400">Tested fonts: </span>
              <span className="text-sm text-cyan-400 font-semibold">{fontsCount}</span>
            </div>
            <div className="max-h-64 overflow-y-auto space-y-1">
              {fontsInfo.map((item, idx) => (
                <DataRow key={idx} label={item.label} value={item.value} />
              ))}
            </div>
          </div>

          {/* Canvas Fingerprint */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center space-x-2">
              <span>🎨</span>
              <span>Canvas Fingerprint</span>
            </h3>
            <div className="space-y-1">
              {canvasInfo.map((item, idx) => (
                <DataRow key={idx} label={item.label} value={item.value} />
              ))}
            </div>
          </div>

          {/* WebGL & GPU Info */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center space-x-2">
              <span>🎮</span>
              <span>WebGL & GPU Info</span>
            </h3>
            <div className="space-y-1">
              {webglInfo.map((item, idx) => (
                <DataRow key={idx} label={item.label} value={item.value} />
              ))}
            </div>
          </div>

          {/* Audio Context */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center space-x-2">
              <span>📊</span>
              <span>Audio Context</span>
            </h3>
            <div className="space-y-1">
              {audioInfo.map((item, idx) => (
                <DataRow key={idx} label={item.label} value={item.value} />
              ))}
            </div>
          </div>

          {/* Time & Language */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center space-x-2">
              <span>🌍</span>
              <span>Time & Language</span>
            </h3>
            <div className="space-y-1">
              {timeInfo.map((item, idx) => (
                <DataRow key={idx} label={item.label} value={item.value} />
              ))}
            </div>
          </div>

          {/* Connection & Hardware */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center space-x-2">
              <span>📡</span>
              <span>Connection & Hardware</span>
            </h3>
            <div className="space-y-1">
              {hardwareInfo.map((item, idx) => (
                <DataRow key={idx} label={item.label} value={item.value} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Tips */}
      <section className="relative max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-cyan-900/10 border border-cyan-500/30 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center space-x-2">
            <Shield className="w-6 h-6" />
            <span>How to Reduce Your Fingerprint</span>
          </h3>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start space-x-3">
              <span className="text-cyan-400 mt-1">•</span>
              <span>Use privacy-focused browsers like Firefox or Brave.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-cyan-400 mt-1">•</span>
              <span>Enable fingerprinting protection in browser settings.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-cyan-400 mt-1">•</span>
              <span>Use extensions such as uBlock Origin and Privacy Badger.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-cyan-400 mt-1">•</span>
              <span>Disable WebGL and Canvas when practical.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-cyan-400 mt-1">•</span>
              <span>For maximum anonymity, use the Tor Browser.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Copy Button */}
      <section className="relative max-w-7xl mx-auto px-4 pb-8">
        <button
          onClick={copyFingerprint}
          className="w-full md:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 mx-auto"
        >
          <Copy className="w-5 h-5" />
          <span>Copy Fingerprint Data</span>
        </button>
      </section>

      {/* Legal Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-12">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Important notice & Legal disclaimer:</strong> This Browser Fingerprinting Auditor runs entirely within your browser and does not send any data to CyberLife Coach,
            to analytics services, or to any external server. The results provided are for educational and informational use only
            and should not be interpreted as a security guarantee. Always review your browser settings carefully before making
            changes, and avoid applying modifications on employer-managed or school-managed devices without proper authorization.
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
