import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Key, ArrowLeft, Copy, Eye, EyeOff, RefreshCw, Shield, AlertTriangle, Printer } from 'lucide-react';

// Import the wordlist - you'll need to place eff_short_wordlist_2_0.json in your public folder
// and fetch it, or import it as a module if your build system supports JSON imports

// Fallback wordlist in case the EFF wordlist doesn't load - defined outside component to avoid recreation
const FALLBACK_LIST = [
  'ability', 'able', 'about', 'above', 'accept', 'according', 'account', 'across', 'action', 'activity',
  'actually', 'address', 'administration', 'admit', 'adult', 'affect', 'after', 'again', 'against', 'agency',
  'agent', 'agree', 'agreement', 'ahead', 'allow', 'almost', 'alone', 'along', 'already', 'also',
  'although', 'always', 'among', 'amount', 'analysis', 'animal', 'another', 'answer', 'appear', 'apply',
  'approach', 'area', 'argue', 'around', 'arrive', 'article', 'artist', 'assume', 'attack', 'attention',
  'attorney', 'audience', 'author', 'authority', 'available', 'avoid', 'away', 'baby', 'back', 'ball',
  'bank', 'base', 'beat', 'beautiful', 'because', 'become', 'before', 'begin', 'behavior', 'behind',
  'believe', 'benefit', 'best', 'better', 'between', 'beyond', 'bill', 'billion', 'black', 'blood',
  'blue', 'board', 'body', 'book', 'born', 'both', 'break', 'bring', 'brother', 'budget',
  'build', 'building', 'business', 'call', 'camera', 'campaign', 'cancer', 'candidate', 'capital', 'card',
  'care', 'career', 'carry', 'case', 'catch', 'cause', 'cell', 'center', 'central', 'century'
];

export default function PassphraseGenerator() {
  const [passphrase, setPassphrase] = useState('');
  const [wordCount, setWordCount] = useState(6);
  const [separator, setSeparator] = useState('space');
  const [casing, setCasing] = useState('lower');
  const [sprinkleNumber, setSprinkleNumber] = useState(false);
  const [sprinkleSymbol, setSprinkleSymbol] = useState(false);
  const [avoidDuplicates, setAvoidDuplicates] = useState(false);
  const [excludeLookalikes, setExcludeLookalikes] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [strength, setStrength] = useState({ label: 'Medium', color: '#f59e0b', percent: 50 });
  const [entropy, setEntropy] = useState({ bits: 0, wordlistSize: 0, words: 0 });
  const [notification, setNotification] = useState('');
  const [secureStatus, setSecureStatus] = useState({ ok: true, message: '' });
  const [wordlistStatus, setWordlistStatus] = useState({ loaded: false, message: 'Loading wordlist...' });
  const [activeList, setActiveList] = useState([]);

  const SYMBOLS = useMemo(() => "!@#$%^&*()_+-=[]{}|;:,.<>?", []);
  const LOOK_ALIKES = useMemo(() => /[O0l1I]/g, []);

  // Secure RNG functions
  const assertSecureRNG = () => {
    if (!window.isSecureContext) {
      throw new Error('This page needs HTTPS or localhost for secure randomness.');
    }
    if (!window.crypto || typeof window.crypto.getRandomValues !== 'function') {
      throw new Error('Secure random generator not available in this browser.');
    }
  };

  const randUint32 = useCallback(() => {
    const u = new Uint32Array(1);
    crypto.getRandomValues(u);
    return u[0] >>> 0;
  }, []);

  const randIndex = useCallback((maxExclusive) => {
    if (maxExclusive <= 0) return 0;
    const limit = Math.floor(0x100000000 / maxExclusive) * maxExclusive;
    let r;
    do {
      r = randUint32();
    } while (r >= limit);
    return r % maxExclusive;
  }, [randUint32]);

  const randomBool = useCallback(() => (randUint32() & 1) === 1, [randUint32]);

  const titleCase = useCallback((word) => word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : word, []);

  const sentenceCase = useCallback((words) => {
    if (words.length === 0) return words;
    const result = words.map(w => w.toLowerCase());
    result[0] = titleCase(result[0]);
    return result;
  }, [titleCase]);

  const randomCase = useCallback((word) => 
    word.split('').map(ch => randomBool() ? ch.toUpperCase() : ch.toLowerCase()).join(''),
    [randomBool]
  );

  const maybeStripLookalikes = useCallback((word) => 
    excludeLookalikes ? word.replace(LOOK_ALIKES, '') : word,
    [excludeLookalikes, LOOK_ALIKES]
  );

  const normalizeList = useCallback((words) => {
    return words
      .map(w => String(w).trim().toLowerCase())
      .filter(w => w.length > 0 && /^[a-z]+$/.test(w));
  }, []);

  const parseEffJson = useCallback((json) => {
    if (Array.isArray(json)) return json;
    if (typeof json === 'object' && json !== null) {
      return Object.values(json);
    }
    return [];
  }, []);

  // Load EFF wordlist
  useEffect(() => {
    const loadWordlist = async () => {
      try {
        // Try to fetch the wordlist from public folder
        const response = await fetch('/eff_short_wordlist_2_0.json');
        if (!response.ok) {
          throw new Error('Wordlist not found');
        }
        const json = await response.json();
        const words = parseEffJson(json);
        const normalized = normalizeList(words);
        
        if (normalized.length > 0) {
          setActiveList(normalized);
          setWordlistStatus({ 
            loaded: true, 
            message: `EFF short wordlist loaded (${normalized.length.toLocaleString()} words)` 
          });
        } else {
          throw new Error('Wordlist empty after normalization');
        }
      } catch (error) {
        console.debug('EFF wordlist load error:', error);
        setActiveList(FALLBACK_LIST);
        setWordlistStatus({ 
          loaded: true, 
          message: `Using fallback wordlist (${FALLBACK_LIST.length} words)` 
        });
      }
    };

    loadWordlist();
  }, [parseEffJson, normalizeList]);

  const estimateEntropyBits = useCallback((wordCnt, listSize, options = {}) => {
    let bits = wordCnt * Math.log2(listSize);
    if (options.number) bits += Math.log2(10);
    if (options.symbol) bits += Math.log2(SYMBOLS.length);
    return Math.round(bits * 10) / 10;
  }, [SYMBOLS]);

  const calculateStrength = useCallback((bits) => {
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
  }, []);

  const getSeparator = useCallback(() => {
    if (separator === 'space') return ' ';
    if (separator === 'none') return '';
    if (separator === 'random') {
      const pool = [' ', '-', '_', '.'];
      return pool[randIndex(pool.length)];
    }
    return separator;
  }, [separator, randIndex]);

  const applyCasing = useCallback((words) => {
    if (casing === 'lower') return words.map(w => w.toLowerCase());
    if (casing === 'title') return words.map(titleCase);
    if (casing === 'sentence') return sentenceCase(words);
    if (casing === 'random') return words.map(randomCase);
    return words;
  }, [casing, titleCase, sentenceCase, randomCase]);

  const ensureUniqueChoices = useCallback((n, list) => {
    if (n > list.length) n = list.length;
    const chosen = new Set();
    const out = [];
    
    while (out.length < n) {
      const w = list[randIndex(list.length)];
      if (avoidDuplicates) {
        if (chosen.has(w)) continue;
        chosen.add(w);
      }
      out.push(w);
    }
    
    return out;
  }, [avoidDuplicates, randIndex]);

  const generatePassphrase = useCallback(() => {
    if (activeList.length === 0) {
      setPassphrase('');
      return;
    }

    try {
      assertSecureRNG();
      setSecureStatus({ 
        ok: true, 
        message: 'Secure context detected. Selection uses crypto-strength randomness.' 
      });
    } catch (err) {
      setSecureStatus({ 
        ok: false, 
        message: `${err.message} Generation is disabled.` 
      });
      setPassphrase('');
      setStrength({ label: 'Weak', color: '#ef4444', percent: 0 });
      setEntropy({ bits: 0, wordlistSize: 0, words: 0 });
      return;
    }

    let list = [...activeList];
    if (excludeLookalikes) {
      list = list.map(w => maybeStripLookalikes(w)).filter(Boolean);
    }

    let words = ensureUniqueChoices(wordCount, list);
    words = applyCasing(words);

    const sep = getSeparator();
    let phrase = words.join(sep);

    let usedNumber = false;
    let usedSymbol = false;
    
    if (sprinkleNumber) {
      phrase += String(randIndex(10));
      usedNumber = true;
    }
    if (sprinkleSymbol) {
      phrase += SYMBOLS[randIndex(SYMBOLS.length)];
      usedSymbol = true;
    }

    setPassphrase(phrase);
    setIsVisible(true);

    const bits = estimateEntropyBits(wordCount, list.length, { 
      number: usedNumber, 
      symbol: usedSymbol 
    });
    
    setEntropy({ 
      bits, 
      wordlistSize: list.length, 
      words: wordCount 
    });
    setStrength(calculateStrength(bits));
  }, [activeList, excludeLookalikes, maybeStripLookalikes, ensureUniqueChoices, wordCount, applyCasing, getSeparator, sprinkleNumber, sprinkleSymbol, SYMBOLS, estimateEntropyBits, calculateStrength, randIndex]);

  const copyToClipboard = async () => {
    if (!passphrase) return;
    
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(passphrase);
        showNotification('Passphrase copied to clipboard');
      } else {
        const t = document.createElement('textarea');
        t.value = passphrase;
        t.style.position = 'fixed';
        t.style.opacity = '0';
        document.body.appendChild(t);
        t.select();
        document.execCommand('copy');
        t.remove();
        showNotification('Passphrase copied to clipboard');
      }
    } catch {
      showNotification('Copy failed');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 2000);
  };

  // Generate passphrase when dependencies change
  useEffect(() => {
    if (activeList.length > 0) {
      generatePassphrase();
    }
  }, [wordCount, separator, casing, sprinkleNumber, sprinkleSymbol, avoidDuplicates, excludeLookalikes, activeList, generatePassphrase]);

  // Initial security check
  useEffect(() => {
    try {
      assertSecureRNG();
      setSecureStatus({ 
        ok: true, 
        message: 'Secure context detected. Selection uses crypto-strength randomness.' 
      });
    } catch (e) {
      setSecureStatus({ 
        ok: false, 
        message: `${e.message} Use HTTPS or localhost.` 
      });
    }
  }, []);

  const getDetailsChips = () => {
    const chips = [
      `List size: ${activeList.length.toLocaleString()}`,
      `Words: ${wordCount}`,
      `Separator: ${separator}`,
      `Casing: ${casing}`
    ];
    
    if (sprinkleNumber) chips.push('Has number');
    if (sprinkleSymbol) chips.push('Has symbol');
    if (avoidDuplicates) chips.push('No duplicates');
    if (excludeLookalikes) chips.push('No look-alikes');
    
    return chips;
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
                Passphrase Builder
              </h1>
              <p className="text-slate-400 text-sm">
                Creates memorable, high-entropy passphrases with an automatically loaded EFF wordlist. Everything runs locally in your browser.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-3 ml-6">
              <button
                onClick={copyToClipboard}
                disabled={!passphrase}
                className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                title="Copy passphrase to clipboard"
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </button>
              <button
                onClick={() => setIsVisible(!isVisible)}
                className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
                title={isVisible ? "Hide passphrase" : "Show passphrase"}
              >
                {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{isVisible ? 'Hide' : 'Show'}</span>
              </button>
              <button
                onClick={generatePassphrase}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg text-white font-semibold transition-all shadow-lg shadow-cyan-500/25"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Generate</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
                title="Print or save to PDF"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* Mobile Action Buttons */}
          <div className="flex md:hidden items-center space-x-2 mt-4">
            <button
              onClick={copyToClipboard}
              disabled={!passphrase}
              className="flex items-center justify-center space-x-1 flex-1 px-3 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all disabled:opacity-50 text-sm"
            >
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </button>
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="flex items-center justify-center space-x-1 flex-1 px-3 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all text-sm"
            >
              {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{isVisible ? 'Hide' : 'Show'}</span>
            </button>
            <button
              onClick={generatePassphrase}
              className="flex items-center justify-center space-x-1 flex-1 px-3 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg text-white font-semibold transition-all text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Generate</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center justify-center px-3 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all text-sm"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Status Messages */}
          <div className="space-y-4 mb-6">
            {secureStatus.message && (
              <div className={`p-4 rounded-lg border ${
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

            {wordlistStatus.message && (
              <div className="p-4 rounded-lg border bg-yellow-900/20 border-yellow-500/30 text-yellow-300">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{wordlistStatus.message}</span>
                </div>
              </div>
            )}
          </div>

          {/* Passphrase Display */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-6">
            <label htmlFor="passphrase" className="block text-sm text-slate-400 mb-3">
              Generated Passphrase
            </label>
            <input
              id="passphrase"
              type={isVisible ? "text" : "password"}
              value={passphrase}
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
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-slate-300 font-semibold">
                  Passphrase Strength: <span style={{ color: strength.color }}>{strength.label}</span>
                </span>
              </div>
              {entropy.bits > 0 && (
                <p className="text-xs text-slate-400 text-center" title="Higher bits = more unpredictable. Each extra bit roughly doubles attacker effort.">
                  Estimated entropy: {entropy.bits} bits. Wordlist: {entropy.wordlistSize.toLocaleString()} words. Words: {entropy.words}.
                </p>
              )}
            </div>

            {/* Details Chips */}
            {passphrase && (
              <div className="flex flex-wrap gap-2 mt-4">
                {getDetailsChips().map((chip, index) => (
                  <span 
                    key={index}
                    className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-600"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Options */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-6">
            <h2 className="text-xl font-semibold mb-6 text-cyan-400">Options</h2>

            {/* Word Count Slider */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="wordcount" className="text-sm text-slate-400">
                  Word Count
                </label>
                <span className="text-xl font-bold text-cyan-400">{wordCount}</span>
              </div>
              <input
                id="wordcount"
                type="range"
                min="3"
                max="12"
                value={wordCount}
                onChange={(e) => setWordCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>3</span>
                <span>12</span>
              </div>
            </div>

            {/* Separator and Casing */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="separator" className="block text-sm text-slate-400 mb-2">
                  Separator
                </label>
                <select
                  id="separator"
                  value={separator}
                  onChange={(e) => setSeparator(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                >
                  <option value="space">Space</option>
                  <option value="-">Hyphen</option>
                  <option value="_">Underscore</option>
                  <option value=".">Dot</option>
                  <option value="random">Random per join</option>
                  <option value="none">None</option>
                </select>
              </div>

              <div>
                <label htmlFor="casing" className="block text-sm text-slate-400 mb-2">
                  Casing
                </label>
                <select
                  id="casing"
                  value={casing}
                  onChange={(e) => setCasing(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                >
                  <option value="lower">lowercase</option>
                  <option value="title">TitleCase</option>
                  <option value="sentence">Sentence case</option>
                  <option value="random">rANdoM CaSe</option>
                </select>
              </div>
            </div>

            {/* Sprinkles */}
            <div className="mb-6">
              <h3 className="text-sm text-slate-400 mb-3">Sprinkles</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={sprinkleNumber}
                    onChange={(e) => setSprinkleNumber(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-slate-300 group-hover:text-cyan-400 transition-colors">
                    Append number
                  </span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={sprinkleSymbol}
                    onChange={(e) => setSprinkleSymbol(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-slate-300 group-hover:text-cyan-400 transition-colors">
                    Append symbol
                  </span>
                </label>
              </div>
            </div>

            {/* Additional Options */}
            <div className="grid md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={avoidDuplicates}
                  onChange={(e) => setAvoidDuplicates(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-cyan-400 transition-colors">
                  Avoid duplicate words
                </span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={excludeLookalikes}
                  onChange={(e) => setExcludeLookalikes(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-cyan-400 transition-colors">
                  Exclude look-alike letters (O, 0, l, 1, I)
                </span>
              </label>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer:</strong> This tool runs entirely in your browser and uses cryptographic randomness when available. While designed for reliability,
              no generator can guarantee absolute security. Use a reputable password manager, keep unique passphrases per site, and enable
              multi-factor authentication. CyberLifeCoach assumes no liability for outcomes from using this page.
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
