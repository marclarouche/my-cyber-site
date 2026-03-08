import React, { useState } from 'react';
import { Shield, ArrowLeft, Printer, AlertTriangle, Search, CheckCircle, Info } from 'lucide-react';

export default function URLRiskReview() {
  const [urlInput, setUrlInput] = useState('');
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Constants for URL risk analysis
  const SHORTENERS = new Set([
    "bit.ly", "t.co", "tinyurl.com", "goo.gl", "is.gd", "cutt.ly", "ow.ly", 
    "buff.ly", "rebrand.ly", "trib.al", "lnkd.in", "s.id", "rb.gy", "shrtco.de"
  ]);

  const SUSPICIOUS_TLDS = new Set([
    "zip", "mov", "xyz", "top", "gq", "ml", "cf", "tk", "work", "click", "link", "quest"
  ]);

  const BRAND_KEYWORDS = [
    "paypal", "amazon", "microsoft", "google", "apple", "facebook", "meta",
    "instagram", "twitter", "linkedin", "netflix", "dropbox", "adobe",
    "walmart", "target", "ebay", "fedex", "ups", "usps", "irs", "dhl"
  ];

  const SUSPICIOUS_KEYWORDS = [
    "login", "signin", "verify", "secure", "account", "update", "confirm",
    "suspended", "locked", "billing", "payment", "credential", "password"
  ];

  // Legitimate hosts frequently abused to host malware/phishing
  const ABUSED_LEGITIMATE_HOSTS = new Set([
    "storage.googleapis.com",
    "googleapis.com",
    "s3.amazonaws.com",
    "amazonaws.com",
    "blob.core.windows.net",
    "azurewebsites.net",
    "firebasestorage.googleapis.com",
    "web.app",
    "firebaseapp.com",
    "pages.dev",
    "workers.dev",
    "netlify.app",
    "vercel.app",
    "github.io",
    "raw.githubusercontent.com",
    "onedrive.live.com",
    "sharepoint.com",
    "1drv.ms",
    "drive.google.com",
    "docs.google.com",
    "sites.google.com",
    "glitch.me",
    "replit.dev",
    "render.com",
    "surge.sh",
    "weebly.com",
    "wixsite.com",
    "squarespace.com",
    "typeform.com",
    "notion.site",
  ]);

  // Helper functions
  const levenshteinDistance = (a, b) => {
    const m = a.length, n = b.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
        );
      }
    }
    return dp[m][n];
  };

  const containsMixedScripts = (str) => {
    const latin = /[\u0020-\u007E\u00A0-\u00FF\u0100-\u017F\u0180-\u024F]/;
    const cyrillic = /[\u0400-\u04FF]/;
    const hasLatin = latin.test(str);
    const hasCyrillic = cyrillic.test(str);
    return hasLatin && hasCyrillic;
  };

  // Detect dot-separated hex encoding e.g. 6f.64.3d.31.73.79
  const containsHexEncoding = (str) => {
    return /(?:[0-9a-fA-F]{2}\.){2,}[0-9a-fA-F]{2}/.test(str);
  };

  // Detect suspicious Base64 strings (20+ chars, mixed case + digits)
  const containsSuspiciousBase64 = (str) => {
    const b64Pattern = /[A-Za-z0-9+\/]{20,}={0,2}/g;
    const matches = str.match(b64Pattern);
    if (!matches) return false;
    return matches.some(m => /[A-Z]/.test(m) && /[a-z]/.test(m) && /[0-9]/.test(m));
  };

  // Check if host is a known legitimate platform abused for malware hosting
  const isAbusedLegitimateHost = (host) => {
    const h = host.toLowerCase();
    if (ABUSED_LEGITIMATE_HOSTS.has(h)) return true;
    return Array.from(ABUSED_LEGITIMATE_HOSTS).some(abused =>
      h === abused || h.endsWith('.' + abused)
    );
  };

  const parseUrlInfo = (input) => {
    try {
      const urlObj = new URL(input);
      const host = urlObj.hostname || '';
      const tld = host.includes('.') ? host.split('.').pop().toLowerCase() : '';
      
      return {
        ok: true,
        scheme: urlObj.protocol.replace(':', ''),
        host: host,
        hostUnicode: decodeURIComponent(host),
        port: urlObj.port || '',
        path: urlObj.pathname || '',
        query: urlObj.search || '',
        tld: tld,
        username: urlObj.username || '',
        password: urlObj.password || '',
        href: urlObj.href
      };
    } catch (e) {
      return { ok: false, error: 'Invalid URL format' };
    }
  };

  const detectSignals = (parsed) => {
    const signals = [];
    const notes = [];
    
    const checkSignal = (condition, signalName, noteText) => {
      if (condition) {
        if (!signals.includes(signalName)) signals.push(signalName);
        if (noteText && !notes.includes(noteText)) notes.push(noteText);
      }
    };

    const host = parsed.host.toLowerCase();
    const hostUnicode = parsed.hostUnicode.toLowerCase();
    
    // Check for shorteners in the host OR in redirects within the URL
    const isShortener = SHORTENERS.has(host);
    const fullUrl = parsed.href.toLowerCase();
    const hasShortenerInRedirect = Array.from(SHORTENERS).some(shortener => 
      fullUrl.includes(shortener) && !host.includes(shortener)
    );
    
    // Check for IDN/Punycode
    const isIDN = host.startsWith('xn--');
    
    // Check for mixed scripts
    const mixedScripts = containsMixedScripts(hostUnicode);
    
    // Check for homoglyphs (like capital I for lowercase l)
    const hasHomoglyphs = /[IL1O0]/.test(parsed.host);
    
    // Check for IP literal
    const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Pattern = /^\[?[0-9a-fA-F:]+\]?$/;
    const isIPLiteral = ipv4Pattern.test(host) || ipv6Pattern.test(host);
    
    // Check for private IPv4
    const isPrivateIPv4 = /^(10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.)/.test(host);
    
    // Check for IPv6 local
    const isIPv6Local = /^\[?(fe80|::1)/.test(host);
    
    // Check for user info
    const hasUserInfo = !!(parsed.username || parsed.password);
    
    // Check for @ in URL (anywhere, not just authority)
    const hasAt = parsed.href.includes('@');
    
    // Check for uncommon port
    const uncommonPort = parsed.port && !['80', '443', ''].includes(parsed.port);
    
    // Check for suspicious TLD
    const suspiciousTLD = SUSPICIOUS_TLDS.has(parsed.tld);
    
    // Check for keywords in the entire URL (host, path, query)
    const keywordHits = SUSPICIOUS_KEYWORDS.filter(kw => fullUrl.includes(kw));
    
    // Check for brand look-alikes - check against just the brand name, not brand.com
    let looksLikeBrand = false;
    let closestBrand = '';
    let brandDistance = Infinity;
    
    // Extract the main domain part (without subdomains and TLD for better matching)
    const hostParts = host.split('.');
    let mainDomain = host;
    if (hostParts.length >= 2) {
      // Get the second-to-last part (the main domain before the TLD)
      mainDomain = hostParts[hostParts.length - 2];
    }
    
    for (const brand of BRAND_KEYWORDS) {
      // Check if the host contains the brand name
      if (host.includes(brand)) {
        // Check if it's not an exact match (which would be legitimate)
        if (host !== brand + '.com' && host !== 'www.' + brand + '.com') {
          looksLikeBrand = true;
          closestBrand = brand;
          brandDistance = 0;
          break;
        }
      }
      
      // Also check edit distance for typosquatting
      const dist = levenshteinDistance(mainDomain, brand);
      if (dist > 0 && dist <= 2 && dist < brandDistance) {
        brandDistance = dist;
        closestBrand = brand;
        looksLikeBrand = true;
      }
    }
    
    // Check for non-HTTP schemes
    const nonHttp = !['http', 'https'].includes(parsed.scheme);

    // Check for abused legitimate hosting platforms
    const abusedHost = isAbusedLegitimateHost(parsed.host);

    // Check for hex-encoded segments in path or fragment
    const fullUrlWithFragment = parsed.href;
    const hasHexEncoding = containsHexEncoding(fullUrlWithFragment);

    // Check for suspicious Base64 in path/query/fragment
    const pathAndQuery = (parsed.path || '') + (parsed.query || '') + (fullUrlWithFragment.includes('#') ? fullUrlWithFragment.split('#')[1] : '');
    const hasBase64 = containsSuspiciousBase64(pathAndQuery);
    
    // Add signals
    checkSignal(nonHttp, 'non-http', `Non-HTTP scheme: ${parsed.scheme}.`);
    checkSignal(isShortener, 'shortener', 'Known URL shortener. Destination is hidden.');
    checkSignal(hasShortenerInRedirect, 'shortener-redirect', 'URL redirects to a known shortener (bit.ly, etc.).');
    checkSignal(isIDN, 'idn', 'Internationalized domain (punycode). May be spoofing.');
    checkSignal(mixedScripts, 'mixed-scripts', 'Host mixes Latin and Cyrillic. Possible homograph attack.');
    checkSignal(hasHomoglyphs && looksLikeBrand, 'homoglyph', 'Contains look-alike characters (I/l/1, O/0) near brand name. Possible spoofing.');
    checkSignal(isIPLiteral, 'ip-literal', 'Host is an IP address. Unusual for legitimate sites.');
    checkSignal(isPrivateIPv4, 'private-ip', 'Private IPv4 address. Should not be public.');
    checkSignal(isIPv6Local, 'private-ipv6', 'Link-local IPv6. Should not be public.');
    checkSignal(hasUserInfo, 'userinfo', 'URL contains username or password. High phishing risk.');
    checkSignal(hasAt, 'at-authority', '@ symbol in URL. Often used in phishing.');
    checkSignal(uncommonPort, 'uncommon-port', `Non-standard port: ${parsed.port}.`);
    checkSignal(suspiciousTLD, 'tld', `Suspicious TLD: .${parsed.tld}.`);
    checkSignal(keywordHits.length, 'keywords', 'Suspicious keyword: ' + keywordHits.join(', ') + '.');
    checkSignal(looksLikeBrand, 'brand-lookalike', `Host contains or resembles "${closestBrand}"${brandDistance > 0 ? ` (distance ${brandDistance})` : ' but is not the official domain'}.`);
    checkSignal(abusedHost, 'abused-host', `"${parsed.host}" is a legitimate platform frequently abused to host phishing and malware. Treat with extra caution even if the domain looks trusted.`);
    checkSignal(hasHexEncoding, 'hex-encoding', 'URL contains dot-separated hex-encoded segments. This obfuscation technique is used to hide malicious payloads from scanners.');
    checkSignal(hasBase64, 'base64-payload', 'URL contains a suspicious Base64-encoded string. Attackers use Base64 to conceal destination URLs, credentials, or commands.');

    return {
      signals,
      notes,
      keywordHits,
      looksLikeBrand,
      closestBrand,
      isShortener,
      hasShortenerInRedirect,
      isIDN,
      mixedScripts,
      hasHomoglyphs,
      isIPLiteral,
      isPrivateIPv4,
      isIPv6Local,
      hasUserInfo,
      hasAt,
      uncommonPort,
      suspiciousTLD,
      abusedHost,
      hasHexEncoding,
      hasBase64
    };
  };

  const calculateScore = (signalsObj) => {
    let score = 0;
    const add = (cond, pts) => { if (cond) score += pts; };
    
    add(signalsObj.isShortener, 10);
    add(signalsObj.hasShortenerInRedirect, 12);
    add(signalsObj.isIDN, 12);
    add(signalsObj.mixedScripts, 12);
    add(signalsObj.hasHomoglyphs && signalsObj.looksLikeBrand, 15); // Homoglyphs near brand name
    add(signalsObj.isIPLiteral, 15);
    add(signalsObj.isPrivateIPv4, 6);
    add(signalsObj.isIPv6Local, 6);
    add(signalsObj.hasUserInfo, 12);
    add(signalsObj.hasAt, 15);
    add(signalsObj.uncommonPort, 5);
    add(signalsObj.suspiciousTLD, 8);
    add(signalsObj.keywordHits.length > 0, Math.min(12, signalsObj.keywordHits.length * 4));
    add(signalsObj.looksLikeBrand, 12);
    add(signalsObj.abusedHost, 20);
    add(signalsObj.hasHexEncoding, 25);
    add(signalsObj.hasBase64, 20);
    
    if (score > 100) score = 100;

    let verdict = 'ok';
    let verdictText = 'No obvious static risks detected.';
    
    if (score >= 60) {
      verdict = 'bad';
      verdictText = 'High-risk static signals detected. Do not open without deeper checks.';
    } else if (score >= 30) {
      verdict = 'warn';
      verdictText = 'Caution: several static risk signals present.';
    }
    
    return { score, verdict, verdictText };
  };

  const analyzeUrl = () => {
    const trimmed = urlInput.trim();
    
    if (!trimmed) {
      alert('Please paste a URL.');
      return;
    }
    
    if (trimmed.length > 4096) {
      alert('URL too long to analyze safely.');
      return;
    }
    
    // Collapse whitespace
    const cleaned = trimmed.replace(/\s+/g, '');
    
    const parsed = parseUrlInfo(cleaned);
    if (!parsed.ok) {
      alert(parsed.error || 'Unable to parse URL');
      return;
    }
    
    const signalsObj = detectSignals(parsed);
    const scoring = calculateScore(signalsObj);
    
    const report = {
      ok: true,
      input: cleaned,
      parsed: {
        scheme: parsed.scheme,
        host: parsed.host,
        hostUnicode: parsed.hostUnicode,
        port: parsed.port,
        path: parsed.path,
        query: parsed.query,
        tld: parsed.tld
      },
      signals: {
        list: signalsObj.signals,
        notes: signalsObj.notes,
        keywordHits: signalsObj.keywordHits,
        looksLikeBrand: signalsObj.looksLikeBrand,
        closestBrand: signalsObj.closestBrand
      },
      scoring: scoring
    };
    
    setResults(report);
    setShowResults(true);
  };

  const fillDemo = () => {
    setUrlInput('https://paypaI-secure-login.support.example.com:8080/@user?redirect=https%3A%2F%2Fbit.ly%2Fabcd');
    setTimeout(() => analyzeUrl(), 100);
  };

  const clearAll = () => {
    setUrlInput('');
    setShowResults(false);
    setResults(null);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      analyzeUrl();
    }
  };

  const signalMap = {
    'shortener': 'Shortener',
    'shortener-redirect': 'Shortener in Redirect',
    'idn': 'IDN/Punycode',
    'mixed-scripts': 'Mixed scripts',
    'homoglyph': 'Homoglyph Attack',
    'ip-literal': 'IP literal',
    'private-ip': 'Private IPv4',
    'private-ipv6': 'Private IPv6',
    'userinfo': 'Username or password in URL',
    'at-authority': '@ in authority',
    'uncommon-port': 'Uncommon port',
    'tld': 'Suspicious TLD',
    'keywords': 'Suspicious keywords',
    'brand-lookalike': 'Brand look-alike',
    'non-http': 'Non-HTTP scheme',
    'abused-host': 'Abused legitimate platform',
    'hex-encoding': 'Hex-encoded payload',
    'base64-payload': 'Base64-encoded payload'
  };

  const getNextSteps = (verdict) => {
    if (verdict === 'ok') {
      return [
        'Static checks look fine. Still verify the domain, padlock, and content before interacting.',
        'Avoid clicking login links from email; navigate to the site manually.'
      ];
    } else {
      return [
        'Do not proceed or log in. Close the tab.',
        'Open the official site by typing the address yourself.',
        'If you must investigate, use a separate, sandboxed machine or a trusted redirect-tracing tool.'
      ];
    }
  };

  const getBadgeColor = (verdict) => {
    if (verdict === 'bad') return 'bg-red-900/20 border-red-500/30 text-red-300';
    if (verdict === 'warn') return 'bg-yellow-900/20 border-yellow-500/30 text-yellow-300';
    return 'bg-green-900/20 border-green-500/30 text-green-300';
  };

  const getScoreBadgeColor = (verdict) => {
    if (verdict === 'bad') return 'bg-red-500/20 text-red-300 border-red-500/40';
    if (verdict === 'warn') return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
    return 'bg-green-500/20 text-green-300 border-green-500/40';
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
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
                    Security Tool
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    Client-Side Only
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3 text-cyan-300">
                  URL Risk Checker (Client-Side Only)
                </h1>
                <p className="text-slate-400 text-sm">
                  Static analysis of a URL for common phishing and malware signals. No network requests. Nothing is sent anywhere.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg text-white font-semibold transition-all shadow-lg shadow-cyan-500/25"
              >
                <Printer className="w-4 h-4" />
                <span>Print Report</span>
              </button>
              <button
                onClick={fillDemo}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
              >
                Try Demo URL
              </button>
              <button
                onClick={clearAll}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
              >
                Clear
              </button>
            </div>

            {/* Tip Notice */}
            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-cyan-400 font-semibold mb-1">Tip</div>
                  <p className="text-sm text-slate-300">
                    This tool never opens or fetches the target URL. For redirect tracing or content-type checks, use a separate, opt-in server-side tool.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          {/* Input Section */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-6">
            <label htmlFor="urlInput" className="block text-lg font-semibold mb-4 text-slate-200">
              Paste a URL
            </label>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="urlInput"
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="https://example.com/login?redirect=..."
                spellCheck="false"
                autoComplete="off"
                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button
                onClick={analyzeUrl}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg text-white font-semibold transition-all shadow-lg shadow-cyan-500/25"
              >
                <Search className="w-5 h-5" />
                <span>Analyze</span>
              </button>
            </div>

            <p className="text-sm text-slate-400 mt-4">
              We parse the URL and flag static risks such as IDN or punycode, shorteners, IP literal hosts, uncommon ports,
              suspicious keywords, and look-alike brands. All analysis happens locally in your browser.
            </p>
          </div>

          {/* Results Section */}
          {showResults && results && (
            <div className="space-y-6">
              {/* Verdict Badge */}
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-cyan-400">Results</h2>
                  <span className={`px-4 py-2 rounded-lg border font-semibold uppercase text-sm ${getBadgeColor(results.scoring.verdict)}`}>
                    {results.scoring.verdict}
                  </span>
                </div>
              </div>

              {/* Parsed URL Details */}
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-700">
                    <span className="text-slate-400 font-semibold min-w-[160px]">Scheme</span>
                    <span className="font-mono text-slate-300">{results.parsed.scheme || '—'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-700">
                    <span className="text-slate-400 font-semibold min-w-[160px]">Host</span>
                    <span className="font-mono text-slate-300 break-all">{results.parsed.host || '—'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-700">
                    <span className="text-slate-400 font-semibold min-w-[160px]">Host (Unicode)</span>
                    <span className="font-mono text-slate-300 break-all">{results.parsed.hostUnicode || results.parsed.host || '—'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-700">
                    <span className="text-slate-400 font-semibold min-w-[160px]">Port</span>
                    <span className="font-mono text-slate-300">{results.parsed.port || '—'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-700">
                    <span className="text-slate-400 font-semibold min-w-[160px]">Path</span>
                    <span className="font-mono text-slate-300 break-all">{results.parsed.path || '—'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-400 font-semibold min-w-[160px]">Query</span>
                    <span className="font-mono text-slate-300 break-all text-sm">{results.parsed.query || '—'}</span>
                  </div>
                </div>
              </div>

              {/* Signals */}
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Signals</h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {results.signals.list.length === 0 ? (
                    <span className="px-3 py-1 rounded-lg bg-green-900/20 border border-green-500/30 text-green-300 text-sm">
                      No static risks
                    </span>
                  ) : (
                    results.signals.list.map((signal, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-600 text-slate-300 text-sm"
                      >
                        {signalMap[signal] || signal}
                      </span>
                    ))
                  )}
                </div>

                {results.signals.notes.length > 0 && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm text-cyan-400 hover:text-cyan-300 font-semibold">
                      Explain these signals
                    </summary>
                    <ul className="mt-3 space-y-2 ml-6 list-disc text-sm text-slate-400">
                      {results.signals.notes.map((note, index) => (
                        <li key={index}>{note}</li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>

              {/* Score & Guidance */}
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Score & Guidance</h3>
                
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`px-4 py-2 rounded-lg border font-semibold text-sm ${getScoreBadgeColor(results.scoring.verdict)}`}>
                    Risk Score: {results.scoring.score}/100
                  </span>
                  <span className="font-mono text-slate-300 text-sm">
                    {results.scoring.verdictText} (Higher = riskier.)
                  </span>
                </div>

                <ul className="space-y-2 ml-6 list-disc text-sm text-slate-300">
                  {getNextSteps(results.scoring.verdict).map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>

              {/* Raw JSON Report */}
              <details className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden">
                <summary className="cursor-pointer px-6 py-4 hover:bg-slate-800/50 transition-colors text-cyan-400 font-semibold">
                  Raw JSON report
                </summary>
                <pre className="px-6 pb-6 pt-2 text-xs text-slate-300 overflow-x-auto bg-slate-950 font-mono whitespace-pre-wrap">
                  {JSON.stringify(results, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-cyan-400 mb-3">Legal Disclaimer and Responsible Use</h3>
            <p className="text-sm text-slate-500 mb-4">Please read before using the URL Risk Checker.</p>
            <div className="space-y-3 text-sm text-slate-400 leading-relaxed">
              <p>
                The URL Risk Checker has been developed and tested by CyberLifeCoach with careful attention to accuracy and validation.
                While the tool has demonstrated reliable results during testing, no automated or human-assisted analysis can guarantee complete precision.
                Web infrastructure, DNS configurations, redirects, and hosting practices vary widely, and a benign URL can still lead to unsafe destinations
                through redirects or later content changes.
              </p>
              <p>
                This tool is provided to assist with learning and investigation. It should never be your only source of verification.
                Always confirm legitimacy using multiple methods, including typing the official domain yourself, checking certificate and domain details,
                verifying contact information through trusted channels, and reviewing the broader context before interacting with a site.
              </p>
              <p>
                This page performs analysis entirely in your browser. It does not send the URL or report to external servers.
                CyberLifeCoach and its affiliates make no warranties, expressed or implied, regarding completeness or accuracy,
                and are not liable for any action taken or decision made based solely on the output of this tool.
              </p>
            </div>
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
            <p>&copy; {new Date().getFullYear()} CyberLifeCoach Tools</p>
            <p className="text-slate-600">This static analyzer does not determine actual malware presence. Treat high-risk URLs with caution.</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
