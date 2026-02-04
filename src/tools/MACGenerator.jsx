import React, { useState, useEffect } from 'react';
import { Cpu, ArrowLeft, Copy, Play, CheckCircle } from 'lucide-react';

export default function MACGenerator() {
  const [count, setCount] = useState(1);
  const [format, setFormat] = useState('colon');
  const [macAddresses, setMacAddresses] = useState([]);
  const [showCopyStatus, setShowCopyStatus] = useState(false);
  const [notification, setNotification] = useState('');

  const hexDigits = "0123456789ABCDEF";
  const localSecondNibble = ["2", "6", "A", "E"];

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const randomHexDigit = () => {
    return hexDigits[Math.floor(Math.random() * hexDigits.length)];
  };

  const generateMac = (outputFormat) => {
    const firstNibble = randomHexDigit();
    const secondNibble = localSecondNibble[Math.floor(Math.random() * localSecondNibble.length)];

    const bytes = [];
    bytes.push(firstNibble + secondNibble);

    for (let i = 0; i < 5; i++) {
      bytes.push(randomHexDigit() + randomHexDigit());
    }

    const sep = outputFormat === "hyphen" ? "-" : ":";
    return bytes.join(sep);
  };

  const handleGenerate = () => {
    const clampedCount = Math.max(1, Math.min(100, count));
    if (clampedCount !== count) {
      setCount(clampedCount);
    }

    const macs = [];
    for (let i = 0; i < clampedCount; i++) {
      macs.push(generateMac(format));
    }

    setMacAddresses(macs);
    showNotification(`Generated ${macs.length} MAC address${macs.length !== 1 ? 'es' : ''}`);
  };

  const handleCopy = async () => {
    const text = macAddresses.join('\n');
    
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setShowCopyStatus(true);
      setTimeout(() => setShowCopyStatus(false), 1800);
      showNotification('Copied to clipboard');
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.top = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setShowCopyStatus(true);
        setTimeout(() => setShowCopyStatus(false), 1800);
        showNotification('Copied to clipboard');
      } catch (e) {
        showNotification('Copy failed');
        console.error('Copy failed', e);
      }
      document.body.removeChild(textarea);
    }
  };

  // Generate initial sample MAC address
  useEffect(() => {
    const sample = generateMac(format);
    setMacAddresses([sample]);
  }, []);

  // Regenerate when format changes
  useEffect(() => {
    if (macAddresses.length > 0) {
      const newMacs = [];
      for (let i = 0; i < macAddresses.length; i++) {
        newMacs.push(generateMac(format));
      }
      setMacAddresses(newMacs);
    }
  }, [format]);

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
        
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center space-x-4">
              <Cpu className="w-12 h-12 text-cyan-400" />
              <div>
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                    Random MAC Address Generator
                  </h1>
                  <span className="flex items-center space-x-2 bg-cyan-500/10 text-cyan-400 px-4 py-1.5 rounded-full text-sm font-semibold border border-cyan-500/30">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                    <span>Client-side privacy tool</span>
                  </span>
                </div>
                <p className="text-slate-400 mt-2">
                  Generate locally administered, unicast-safe MAC addresses for testing and privacy hardening on networks you own
                  or are authorized to use. Everything runs in your browser, nothing is sent to any server.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-6">
          {/* Generator Card */}
          <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
                <h2 className="text-2xl font-bold text-cyan-400">Generate MAC addresses</h2>
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm font-semibold border border-blue-500/30">
                  Locally administered · Unicast
                </span>
              </div>
              <p className="text-slate-400 text-sm">
                This generator sets the correct bits in the first byte so the result is a
                <strong className="text-slate-300"> locally administered</strong>, <strong className="text-slate-300">unicast</strong> address rather than a manufacturer burned-in identifier.
              </p>
            </div>

            {/* Controls */}
            <div className="space-y-6 mb-8">
              {/* Count Input */}
              <div>
                <label className="block text-sm text-slate-400 mb-2 font-semibold">How many addresses?</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                    className="w-32 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors"
                  />
                  <span className="text-sm text-slate-500">max 100</span>
                </div>
              </div>

              {/* Format Selection */}
              <div>
                <label className="block text-sm text-slate-400 mb-3 font-semibold">Output format</label>
                <div className="space-y-2">
                  <label
                    className={`flex items-center space-x-3 p-4 rounded-lg cursor-pointer transition-all border ${
                      format === 'colon'
                        ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400'
                        : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="format"
                      value="colon"
                      checked={format === 'colon'}
                      onChange={(e) => setFormat(e.target.value)}
                      className="w-4 h-4 text-cyan-500 border-slate-600 focus:ring-cyan-500 focus:ring-offset-slate-900"
                    />
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${format === 'colon' ? 'bg-cyan-400' : 'bg-slate-600'}`}></span>
                      <span className="font-medium">Colon separated (AA:BB:CC)</span>
                    </div>
                  </label>
                  
                  <label
                    className={`flex items-center space-x-3 p-4 rounded-lg cursor-pointer transition-all border ${
                      format === 'hyphen'
                        ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400'
                        : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="format"
                      value="hyphen"
                      checked={format === 'hyphen'}
                      onChange={(e) => setFormat(e.target.value)}
                      className="w-4 h-4 text-cyan-500 border-slate-600 focus:ring-cyan-500 focus:ring-offset-slate-900"
                    />
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${format === 'hyphen' ? 'bg-cyan-400' : 'bg-slate-600'}`}></span>
                      <span className="font-medium">Hyphen separated (AA-BB-CC)</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleGenerate}
                  className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                >
                  <Play className="w-5 h-5" />
                  <span>Generate MAC address</span>
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
                >
                  <Copy className="w-5 h-5" />
                  <span>Copy for Sheets</span>
                </button>
              </div>
            </div>

            {/* Output */}
            <div className="bg-slate-950 rounded-xl border border-slate-700 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
                <span className="text-sm text-slate-400 font-semibold">Latest generated address</span>
                {showCopyStatus && (
                  <span className="flex items-center space-x-2 text-green-400 text-sm font-semibold animate-fade-in">
                    <CheckCircle className="w-4 h-4" />
                    <span>Copied to clipboard</span>
                  </span>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl font-bold text-cyan-400 font-mono">
                    {macAddresses[0] || 'C2:7D:F4:A1:33:0B'}
                  </div>
                  <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30">
                    LAA + unicast
                  </span>
                </div>
                
                {macAddresses.length > 1 && (
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <pre className="text-sm text-slate-300 font-mono bg-slate-900 rounded-lg p-4 max-h-48 overflow-y-auto">
                      {macAddresses.join('\n')}
                    </pre>
                  </div>
                )}
              </div>

              <div className="px-6 pb-6">
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-sm text-slate-300">
                    <strong className="text-blue-400">Tip for spreadsheets.</strong> Use the
                    <em className="text-slate-400"> Copy for Sheets</em> button to copy the full list as one value per line. You can paste directly into
                    Excel, Google Sheets, or LibreOffice for bulk testing or lab work.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Explanation Card */}
          <aside className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">How this generator works</h2>
            
            <div className="space-y-6 mb-8">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center text-cyan-400 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200 mb-2">Correct first byte</h3>
                  <p className="text-sm text-slate-400">
                    The first byte of the MAC address decides two key bits. This tool always sets them so the address is
                    <strong className="text-slate-300"> locally administered</strong> (not a vendor address) and <strong className="text-slate-300">unicast</strong> (for a single device).
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center text-cyan-400 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200 mb-2">Locally administered bit</h3>
                  <p className="text-sm text-slate-400">
                    The second hexadecimal character in the first byte is limited to <code className="bg-slate-950 px-1.5 py-0.5 rounded text-cyan-400">2</code>, <code className="bg-slate-950 px-1.5 py-0.5 rounded text-cyan-400">6</code>,
                    <code className="bg-slate-950 px-1.5 py-0.5 rounded text-cyan-400 ml-1">A</code>, or <code className="bg-slate-950 px-1.5 py-0.5 rounded text-cyan-400">E</code>. That combination sets the "locally administered" flag while keeping
                    the multicast bit off.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center text-cyan-400 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200 mb-2">Remaining bytes</h3>
                  <p className="text-sm text-slate-400">
                    The remaining five bytes are chosen from random hexadecimal characters. The result is a valid,
                    randomly generated MAC address you can use in lab environments or for privacy-friendly rotation.
                  </p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 bg-slate-950 rounded-lg p-3 border border-slate-700">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-sm text-slate-300">Runs entirely in your browser</span>
              </div>
              <div className="flex items-center space-x-3 bg-slate-950 rounded-lg p-3 border border-slate-700">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-sm text-slate-300">No logs or telemetry</span>
              </div>
              <div className="flex items-center space-x-3 bg-slate-950 rounded-lg p-3 border border-slate-700">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-sm text-slate-300">Copy and apply in OS settings</span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Legal Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-6">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Legal and Usage Notice:</strong> This Random MAC Address Generator is provided for educational use, lab work, and privacy enhancement on
            networks you own or are explicitly authorized to use. The tool runs entirely in your browser, does not
            discover, store, or transmit any device information, and does not change your system configuration. Generated
            addresses do not leave your computer unless you choose to copy or share them.
          </p>
        </div>

        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-12">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Important:</strong> Using spoofed identifiers to gain unauthorized access, bypass access controls, or
            impersonate another device may be illegal in your jurisdiction and may violate acceptable use policies. You
            are solely responsible for how you use this tool and for complying with all applicable laws, contracts, and
            organizational policies. No warranty is provided and no result from this page should be treated as legal or
            networking advice.
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
            <p className="text-slate-600">Generation happens entirely in your browser. No data is sent anywhere.</p>
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
