import React, { useState, useRef, useEffect } from 'react';
import { Code, ArrowLeft, Copy, Download, RotateCcw, Plus } from 'lucide-react';

export default function RegexGenerator() {
  const [pattern, setPattern] = useState('');
  const [testText, setTestText] = useState('');
  const [flags, setFlags] = useState({
    i: false,
    g: true,
    m: false,
    s: false,
    u: true
  });
  const [status, setStatus] = useState({ message: 'Enter a pattern to begin.', type: 'warn' });
  const [matches, setMatches] = useState('No matches yet.');
  const [examples, setExamples] = useState([]);
  const [notification, setNotification] = useState('');
  
  const patternRef = useRef(null);

  const tokens = [
    { label: '\\d digit', value: '\\d' },
    { label: '\\w word', value: '\\w' },
    { label: '\\s space', value: '\\s' },
    { label: '\\D non-digit', value: '\\D' },
    { label: '\\W non-word', value: '\\W' },
    { label: '\\S non-space', value: '\\S' },
    { label: '. any char', value: '.' },
    { label: '^ start', value: '^' },
    { label: '$ end', value: '$' },
    { label: '\\b boundary', value: '\\b' },
    { label: '[abc] set', value: '[abc]' },
    { label: '[^abc] not set', value: '[^abc]' },
    { label: '(a|b) group', value: '(a|b)' },
    { label: '? 0 or 1', value: '?' },
    { label: '+ 1 or more', value: '+' },
    { label: '* 0 or more', value: '*' },
    { label: '{n}', value: '{n}' },
    { label: '{n,}', value: '{n,}' },
    { label: '{n,m}', value: '{n,m}' },
    { label: 'alternation', value: '|' }
  ];

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const buildRegex = () => {
    const flagStr = Object.entries(flags)
      .filter(([_, enabled]) => enabled)
      .map(([flag]) => flag)
      .join('');
    return { source: pattern, flags: flagStr };
  };

  const insertAtCursor = (token) => {
    const input = patternRef.current;
    if (!input) return;

    const start = input.selectionStart ?? pattern.length;
    const end = input.selectionEnd ?? pattern.length;
    const before = pattern.slice(0, start);
    const after = pattern.slice(end);
    
    const newPattern = before + token + after;
    setPattern(newPattern);
    
    setTimeout(() => {
      input.focus();
      const caret = start + token.length;
      input.setSelectionRange(caret, caret);
    }, 0);
  };

  const handleCopyRegex = async () => {
    const { source, flags: flagStr } = buildRegex();
    const regexStr = `/${source}/${flagStr}`;
    try {
      await navigator.clipboard.writeText(regexStr);
      showNotification('Copied regex to clipboard');
      updateStatus('Copied regex to clipboard', 'ok');
    } catch (err) {
      showNotification('Copy failed');
      updateStatus('Copy failed', 'err');
    }
  };

  const handleReset = () => {
    setPattern('');
    setTestText('');
    setExamples([]);
    setMatches('No matches yet.');
    updateStatus('Enter a pattern to begin.', 'warn');
  };

  const handleAddExample = () => {
    if (!testText) {
      showNotification('Nothing to add');
      updateStatus('Nothing to add', 'warn');
      return;
    }
    setExamples([...examples, testText]);
    showNotification('Example saved');
    updateStatus('Example saved', 'ok');
  };

  const handleDownload = () => {
    const { source, flags: flagStr } = buildRegex();
    if (!source) {
      showNotification('Pattern is empty');
      updateStatus('Pattern is empty', 'warn');
      return;
    }

    const bundle = {
      regex: `/${source}/${flagStr}`,
      source,
      flags: flagStr,
      examples: [...examples],
      createdAt: new Date().toISOString(),
      notes: 'Generated locally by Regex Generator & Tester'
    };

    // Download JSON
    const jsonBlob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
    const jsonUrl = URL.createObjectURL(jsonBlob);
    const jsonLink = document.createElement('a');
    jsonLink.href = jsonUrl;
    jsonLink.download = `regex-bundle-${Date.now()}.json`;
    jsonLink.click();
    URL.revokeObjectURL(jsonUrl);

    // Download TXT
    const txtContent = `Regex: /${source}/${flagStr}\n\nExamples:\n` +
      (examples.length ? examples.map((e, i) => `[${i + 1}] ${e}`).join('\n') : '(none)') + '\n';
    const txtBlob = new Blob([txtContent], { type: 'text/plain' });
    const txtUrl = URL.createObjectURL(txtBlob);
    const txtLink = document.createElement('a');
    txtLink.href = txtUrl;
    txtLink.download = `regex-bundle-${Date.now()}.txt`;
    txtLink.click();
    URL.revokeObjectURL(txtUrl);

    showNotification('Downloaded JSON and TXT bundles');
    updateStatus('Downloaded JSON and TXT bundles', 'ok');
  };

  const updateStatus = (message, type) => {
    setStatus({ message, type });
  };

  const escapeHTML = (str) => {
    return str.replace(/[&<>"]/g, (c) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;'
    }[c]));
  };

  const updateMatches = () => {
    const { source, flags: flagStr } = buildRegex();
    
    if (!source) {
      updateStatus('Enter a pattern to begin.', 'warn');
      setMatches('No matches yet.');
      return;
    }

    let regex;
    try {
      regex = new RegExp(source, flagStr);
    } catch (err) {
      updateStatus(`Syntax error: ${err.message}`, 'err');
      setMatches('—');
      return;
    }

    updateStatus('Pattern OK', 'ok');

    if (!testText) {
      setMatches('Type sample text to see highlights.');
      return;
    }

    // Highlight matches
    let output = '';
    let lastIndex = 0;
    
    if (flagStr.includes('g')) {
      let match;
      const re = new RegExp(source, flagStr);
      while ((match = re.exec(testText)) !== null) {
        const start = match.index;
        const end = start + match[0].length;
        output += escapeHTML(testText.slice(lastIndex, start));
        output += '<mark>' + escapeHTML(testText.slice(start, end)) + '</mark>';
        lastIndex = end;
        if (match[0].length === 0) {
          re.lastIndex++;
        }
      }
      output += escapeHTML(testText.slice(lastIndex));
    } else {
      const match = testText.match(regex);
      if (!match) {
        setMatches('No matches.');
        return;
      }
      const idx = testText.search(regex);
      output = escapeHTML(testText.slice(0, idx)) +
        '<mark>' + escapeHTML(testText.slice(idx, idx + match[0].length)) + '</mark>' +
        escapeHTML(testText.slice(idx + match[0].length));
    }

    setMatches(output || 'No matches.');
  };

  useEffect(() => {
    updateMatches();
  }, [pattern, testText, flags]);

  const getStatusColor = () => {
    if (status.type === 'ok') return 'text-green-400';
    if (status.type === 'warn') return 'text-yellow-400';
    if (status.type === 'err') return 'text-red-400';
    return 'text-slate-400';
  };

  const getStatusDotColor = () => {
    if (status.type === 'ok') return 'bg-green-400';
    if (status.type === 'warn') return 'bg-yellow-400';
    if (status.type === 'err') return 'bg-red-400';
    return 'bg-slate-400';
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
        
        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
            <div className="flex items-center space-x-4">
              <Code className="w-12 h-12 text-cyan-400" />
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                  Regex Generator & Tester
                </h1>
                <p className="text-slate-400 mt-2">Build patterns, test against sample text, and export your work. Everything runs in your browser.</p>
              </div>
            </div>
            
            <div className="flex gap-3 no-print">
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
              >
                <Download className="w-5 h-5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto px-4 pb-20">
        {/* Pattern Builder and Test Text */}
        <section className="grid lg:grid-cols-[1.1fr,0.9fr] gap-6 mb-6">
          {/* Pattern Builder */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Pattern builder</h3>
            
            <input
              ref={patternRef}
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter your regex pattern (e.g., \d{3}-\d{4})"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 font-mono focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors mb-4"
            />

            <div className="mb-4">
              <span className="inline-block bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-xs font-bold border border-cyan-500/30 mb-3">
                Quick tokens
              </span>
              <div className="flex flex-wrap gap-2">
                {tokens.map((token, idx) => (
                  <button
                    key={idx}
                    onClick={() => insertAtCursor(token.value)}
                    className="px-3 py-2 bg-slate-950 border border-slate-700 text-slate-400 rounded-lg text-sm font-bold hover:bg-cyan-500/15 hover:border-cyan-500 hover:text-cyan-400 transition-all"
                  >
                    {token.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <span className="inline-block bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-xs font-bold border border-cyan-500/30 mb-3">
                Flags
              </span>
              <div className="flex flex-wrap gap-3">
                {Object.entries(flags).map(([flag, checked]) => (
                  <label key={flag} className="flex items-center space-x-2 bg-slate-950 border border-slate-700 px-3 py-2 rounded-lg cursor-pointer hover:border-slate-600 transition-colors">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => setFlags({ ...flags, [flag]: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-600 bg-slate-950 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
                    />
                    <span className="text-slate-300 text-sm font-semibold">
                      {flag} {
                        flag === 'i' ? 'case-insensitive' :
                        flag === 'g' ? 'global' :
                        flag === 'm' ? 'multiline' :
                        flag === 's' ? 'dotall' :
                        flag === 'u' ? 'unicode' : ''
                      }
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-4 no-print">
              <button
                onClick={handleCopyRegex}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
              >
                <Copy className="w-4 h-4" />
                <span>Copy regex</span>
              </button>
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${getStatusDotColor()}`}></div>
              <span className={`text-sm ${getStatusColor()}`}>{status.message}</span>
            </div>
          </div>

          {/* Test Text */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Test text</h3>
            
            <textarea
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              placeholder="Paste or type text to test against your regex."
              rows={10}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 font-mono focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors resize-none mb-3"
            />
            
            <div className="flex items-center justify-between flex-wrap gap-2">
              <button
                onClick={handleAddExample}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add as example</span>
              </button>
              <span className="text-xs text-slate-400">Examples are included in downloads.</span>
            </div>
          </div>
        </section>

        {/* Matches */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6 mb-6">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">Matches</h3>
          <div
            className="bg-slate-950 border border-dashed border-slate-700 rounded-lg p-4 min-h-[100px] whitespace-pre-wrap font-mono text-sm text-slate-300"
            dangerouslySetInnerHTML={{ __html: matches }}
          />
          <p className="text-xs text-slate-400 mt-3">
            Highlighted segments show matches. Toggle the global flag for single or multiple matches.
          </p>
        </section>

        {/* Saved Examples */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">Saved examples</h3>
          {examples.length === 0 ? (
            <p className="text-sm text-slate-400">None yet. Click "Add as example" to collect test strings.</p>
          ) : (
            <div className="space-y-2">
              {examples.map((example, idx) => (
                <p key={idx} className="text-sm text-slate-300 font-mono">
                  [{idx + 1}] {example}
                </p>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Legal Disclaimer */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-6">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Legal Disclosure:</strong> This page runs entirely in your browser and does not send your patterns or text to any server.
            Patterns and example data that you choose to download are created locally and saved to your device.
            Use is your responsibility and must comply with applicable laws and acceptable-use rules.
            Regular expressions can have performance implications on large inputs. Test carefully before using patterns in production.
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
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security.</p>
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
        mark {
          background: rgba(0, 212, 255, 0.25);
          color: rgb(34, 211, 238);
          padding: 0 2px;
          border-radius: 4px;
        }
        
        @media print {
          .no-print {
            display: none !important;
          }
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
