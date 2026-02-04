import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Copy, Eye, EyeOff, RefreshCw, Shield, AlertTriangle } from 'lucide-react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [strength, setStrength] = useState({ label: 'Medium', color: '#f59e0b', percent: 50 });
  const [entropy, setEntropy] = useState({ bits: 0, poolSize: 0 });
  const [notification, setNotification] = useState('');
  const [secureStatus, setSecureStatus] = useState({ ok: true, message: '' });
  const [lengthWarning, setLengthWarning] = useState('');

  // Memoized password generation function
  const generatePassword = useCallback(() => {
    const BASE_SETS = {
      upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lower: 'abcdefghijklmnopqrstuvwxyz',
      num: '0123456789',
      sym: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };
    
    const LOOK_ALIKES_REGEX = /[O0l1I]/g;
    
    const maybeExcludeLookAlikes = (s) => {
      return (excludeSimilar ? s.replace(LOOK_ALIKES_REGEX, '') : s) || '';
    };
    
    const buildPools = () => {
      const pools = [];
      const u = maybeExcludeLookAlikes(BASE_SETS.upper);
      const l = maybeExcludeLookAlikes(BASE_SETS.lower);
      const n = maybeExcludeLookAlikes(BASE_SETS.num);
      const s = maybeExcludeLookAlikes(BASE_SETS.sym);
      
      if (uppercase && u.length) pools.push(u);
      if (lowercase && l.length) pools.push(l);
      if (numbers && n.length) pools.push(n);
      if (symbols && s.length) pools.push(s);
      
      return pools;
    };
    
    const secureRandomUint32 = () => {
      const u32 = new Uint32Array(1);
      crypto.getRandomValues(u32);
      return u32[0] >>> 0;
    };
    
    const secureRandomIndex = (maxExclusive) => {
      if (maxExclusive <= 0) return 0;
      const limit = Math.floor(0x100000000 / maxExclusive) * maxExclusive;
      let r;
      do {
        r = secureRandomUint32();
      } while (r >= limit);
      return r % maxExclusive;
    };
    
    const secureShuffle = (a) => {
      for (let i = a.length - 1; i > 0; i--) {
        const j = secureRandomIndex(i + 1);
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };
    
    const estimateEntropyBits = (len, pool) => {
      if (len <= 0 || pool <= 1) return 0;
      const b = len * Math.log2(pool);
      return Math.round(b * 10) / 10;
    };
    
    const calculateStrength = (bits) => {
      const capped = Math.min(bits, 120);
      const percent = Math.round((capped / 120) * 100);
      
      let label = 'Weak';
      let color = '#ef4444';
      
      if (percent >= 35 && percent < 60) {
        label = 'Medium';
        color = '#f59e0b';
      } else if (percent >= 60 && percent < 85) {
        label = 'Strong';
        color = '#10b981';
      } else if (percent >= 85) {
        label = 'Very Strong';
        color = '#22c55e';
      }
      
      return { label, color, percent };
    };
    
    try {
      if (!window.isSecureContext) {
        throw new Error('This tool requires HTTPS or localhost for secure randomness.');
      }
      if (!window.crypto || typeof window.crypto.getRandomValues !== 'function') {
        throw new Error('Secure random generator not available in this browser.');
      }
      setSecureStatus({ ok: true, message: 'Secure context detected. Generation uses crypto-strength randomness.' });
    } catch (err) {
      setSecureStatus({ ok: false, message: `${err.message} Password generation is disabled.` });
      setPassword('');
      setStrength({ label: 'Weak', color: '#ef4444', percent: 0 });
      setEntropy({ bits: 0, poolSize: 0 });
      return;
    }

    const pools = buildPools();
    if (pools.length === 0) {
      setPassword('');
      setStrength({ label: 'Weak', color: '#ef4444', percent: 0 });
      setEntropy({ bits: 0, poolSize: 0 });
      setLengthWarning('Select at least one character type.');
      return;
    }

    if (length < pools.length) {
      setPassword('');
      setStrength({ label: 'Weak', color: '#ef4444', percent: 0 });
      setEntropy({ bits: 0, poolSize: 0 });
      setLengthWarning(`Increase length to at least ${pools.length} to include all selected types.`);
      return;
    } else {
      setLengthWarning('');
    }

    const combined = pools.join('');
    const required = pools.map(set => set[secureRandomIndex(set.length)]);
    const remaining = length - required.length;
    const rest = [];
    
    for (let i = 0; i < remaining; i++) {
      rest.push(combined[secureRandomIndex(combined.length)]);
    }
    
    const newPassword = secureShuffle(required.concat(rest)).join('');
    setPassword(newPassword);
    setIsVisible(true);

    const bits = estimateEntropyBits(length, combined.length);
    setEntropy({ bits, poolSize: combined.length });
    setStrength(calculateStrength(bits));
  }, [length, uppercase, lowercase, numbers, symbols, excludeSimilar]);

  const copyToClipboard = async () => {
    if (!password) return;
    
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(password);
        showNotification('Password copied to clipboard');
      } else {
        const t = document.createElement('textarea');
        t.value = password;
        t.style.position = 'fixed';
        t.style.opacity = '0';
        document.body.appendChild(t);
        t.select();
        document.execCommand('copy');
        t.remove();
        showNotification('Password copied to clipboard');
      }
    } catch {
      showNotification('Copy failed');
    }
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 2000);
  };

  // Generate password on mount and when dependencies change
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

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
        
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
                  Security Tool
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  Client-Side
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Secure Password Generator
              </h1>
              <p className="text-slate-400 text-sm">
                Generate strong random passwords directly in your browser. Private, client-side, no data leaves this page.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-3 ml-6">
              <button
                onClick={copyToClipboard}
                disabled={!password}
                className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                title="Copy password to clipboard"
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </button>
              <button
                onClick={() => setIsVisible(!isVisible)}
                className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
                title={isVisible ? "Hide password" : "Show password"}
              >
                {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{isVisible ? 'Hide' : 'Show'}</span>
              </button>
              <button
                onClick={generatePassword}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg text-white font-semibold transition-all shadow-lg shadow-cyan-500/25"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Generate</span>
              </button>
            </div>
          </div>

          {/* Mobile Action Buttons */}
          <div className="flex md:hidden items-center space-x-3 mt-4">
            <button
              onClick={copyToClipboard}
              disabled={!password}
              className="flex items-center justify-center space-x-2 flex-1 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all disabled:opacity-50"
            >
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </button>
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="flex items-center justify-center space-x-2 flex-1 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
            >
              {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{isVisible ? 'Hide' : 'Show'}</span>
            </button>
            <button
              onClick={generatePassword}
              className="flex items-center justify-center space-x-2 flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg text-white font-semibold transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Generate</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Status Message */}
          {secureStatus.message && (
            <div className={`mb-6 p-4 rounded-lg border ${
              secureStatus.ok 
                ? 'bg-green-900/20 border-green-500/30 text-green-300' 
                : 'bg-red-900/20 border-red-500/30 text-red-300'
            }`}>
              <div className="flex items-start space-x-3">
                {secureStatus.ok ? (
                  <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                )}
                <span className="text-sm">{secureStatus.message}</span>
              </div>
            </div>
          )}

          {/* Password Display */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-6">
            <label htmlFor="password" className="block text-sm text-slate-400 mb-3">
              Generated Password
            </label>
            <input
              id="password"
              type={isVisible ? "text" : "password"}
              value={password}
              readOnly
              autoComplete="off"
              spellCheck="false"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-4 text-lg font-mono text-cyan-300 focus:outline-none focus:border-cyan-500 transition-colors"
            />

            {/* Strength Meter */}
            <div className="mt-6">
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full transition-all duration-300 rounded-full"
                  style={{
                    width: `${strength.percent}%`,
                    backgroundColor: strength.color
                  }}
                ></div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300 font-semibold">
                  Password Strength: <span style={{ color: strength.color }}>{strength.label}</span>
                </span>
                {entropy.bits > 0 && (
                  <span className="text-slate-400" title="Higher bits = more unpredictable; each extra bit ≈ double the attack effort.">
                    {entropy.bits} bits entropy
                  </span>
                )}
              </div>
            </div>

            {/* Entropy Help */}
            {entropy.bits > 0 && (
              <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <p className="text-xs text-slate-400 text-center">
                  Entropy estimates how unpredictable a password is, measured in bits.
                  Each extra bit roughly doubles an attacker's work—aim for ≥80 bits for general accounts and ≥100 bits for high-value ones.
                  <span className="block mt-2 text-cyan-400">
                    Pool size: {entropy.poolSize} characters, Length: {length}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Length Slider */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-6">
            <div className="flex items-center justify-between mb-4">
              <label htmlFor="length" className="text-sm text-slate-400">
                Password Length
              </label>
              <span className="text-2xl font-bold text-cyan-400">{length}</span>
            </div>
            <input
              id="length"
              type="range"
              min="8"
              max="128"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>8</span>
              <span>128</span>
            </div>
            
            {lengthWarning && (
              <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                <p className="text-sm text-yellow-300">{lengthWarning}</p>
              </div>
            )}
          </div>

          {/* Character Sets */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-slate-300">Character Sets</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-cyan-400 transition-colors">
                  Include Uppercase (A–Z)
                </span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={lowercase}
                  onChange={(e) => setLowercase(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-cyan-400 transition-colors">
                  Include Lowercase (a–z)
                </span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={numbers}
                  onChange={(e) => setNumbers(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-cyan-400 transition-colors">
                  Include Numbers (0–9)
                </span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={symbols}
                  onChange={(e) => setSymbols(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-cyan-400 transition-colors">
                  Include Symbols (!@#$%^&*()_+-=[]&#123;&#125;|;:,.&lt;&gt;?)
                </span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer group" title="Removes look-alike characters O, 0, l, 1, I">
                <input
                  type="checkbox"
                  checked={excludeSimilar}
                  onChange={(e) => setExcludeSimilar(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-cyan-400 transition-colors">
                  Exclude Look-Alike Characters
                </span>
              </label>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer:</strong> This generator runs entirely in your browser using crypto-strength randomness when available. While designed and
              tested for reliability, no tool can guarantee absolute security. Use unique passwords, a reputable password
              manager, and multi-factor authentication. CyberLifeCoach assumes no liability for outcomes from the use of this page.
            </p>
          </div>
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

      {/* Custom Styles for Range Slider */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(to right, #06b6d4, #3b82f6);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(to right, #06b6d4, #3b82f6);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }

        .slider::-webkit-slider-thumb:hover {
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.8);
        }

        .slider::-moz-range-thumb:hover {
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.8);
        }

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
