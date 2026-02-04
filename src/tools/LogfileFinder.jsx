import React, { useState, useRef } from 'react';
import { FileSearch, ArrowLeft, Search, Trash2, Upload, Target } from 'lucide-react';

export default function LogfileFinder() {
  const [logText, setLogText] = useState('');
  const [fileName, setFileName] = useState('');
  const [totalLines, setTotalLines] = useState(0);
  const [uniqueIPs, setUniqueIPs] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [summaryNote, setSummaryNote] = useState('Paste a log snippet and select "Analyze log" to populate these fields.');
  const [ipList, setIpList] = useState([]);
  const [failedLines, setFailedLines] = useState([]);
  const [patternInput, setPatternInput] = useState('');
  const [patternError, setPatternError] = useState('');
  const [patternSummary, setPatternSummary] = useState('');
  const [patternResults, setPatternResults] = useState([]);
  const [notification, setNotification] = useState('');
  
  const fileInputRef = useRef(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const resetResults = () => {
    setTotalLines(0);
    setUniqueIPs(0);
    setFailedCount(0);
    setSummaryNote('Paste a log snippet and select "Analyze log" to populate these fields.');
    setIpList([]);
    setFailedLines([]);
    setPatternSummary('');
    setPatternResults([]);
    setPatternError('');
  };

  const getLines = () => {
    const lines = logText.split(/\r?\n/).filter((line) => line.trim().length > 0);
    return lines;
  };

  const analyze = () => {
    const lines = getLines();

    if (!lines.length) {
      resetResults();
      setSummaryNote('No log lines detected. Paste a few lines or upload a log snippet before analyzing.');
      showNotification('No log data to analyze');
      return;
    }

    if (lines.length > 20000) {
      setSummaryNote('This looks like a very large log. Consider trimming to a smaller excerpt (for example the last 500–2000 lines) for more responsive analysis.');
    } else {
      setSummaryNote('Summary based on the current snippet. Add or trim lines and run the analysis again as needed.');
    }

    // Count IPs
    const ipRegex = /\b\d{1,3}(?:\.\d{1,3}){3}\b/g;
    const ipCounts = new Map();

    for (const line of lines) {
      const matches = line.match(ipRegex);
      if (!matches) continue;
      for (const ip of matches) {
        ipCounts.set(ip, (ipCounts.get(ip) || 0) + 1);
      }
    }

    const ipEntries = Array.from(ipCounts.entries()).sort((a, b) => b[1] - a[1]);

    // Failed login candidates
    const failedPatterns = [
      /failed password/i,
      /invalid user/i,
      /authentication failure/i,
      /login failed/i,
      /auth failure/i,
      /denied\s+login/i,
    ];

    const failed = [];
    lines.forEach((line, idx) => {
      for (const pattern of failedPatterns) {
        if (pattern.test(line)) {
          failed.push({ index: idx + 1, text: line });
          break;
        }
      }
    });

    // Update summary
    setTotalLines(lines.length);
    setUniqueIPs(ipEntries.length);
    setFailedCount(failed.length);

    // Populate IP list
    if (!ipEntries.length) {
      setIpList([]);
    } else {
      const top = ipEntries.slice(0, 15);
      setIpList(top.map(([ip, count]) => ({ ip, count })));
    }

    // Set failed lines (limit to 100)
    setFailedLines(failed.slice(0, 100));

    // Clear previous custom pattern results
    setPatternSummary('');
    setPatternResults([]);
    setPatternError('');

    showNotification('Log analysis complete');
  };

  const runPatternSearch = () => {
    setPatternError('');
    setPatternSummary('');
    setPatternResults([]);

    const lines = getLines();
    if (!lines.length) {
      setPatternSummary('No log lines loaded. Paste a snippet or upload a file, then run the analysis first.');
      return;
    }

    const input = patternInput.trim();
    if (!input) {
      setPatternSummary('Enter a search term or a regular expression (without slashes) to look for additional patterns.');
      return;
    }

    let regex;
    try {
      // Heuristic: if input looks like a simple word or phrase without regex meta, use plain text match.
      const looksSimple = !/[.*+?^${}()|[\]\\]/.test(input);
      if (looksSimple) {
        // Escape for regex, case-insensitive
        const escaped = input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        regex = new RegExp(escaped, 'i');
      } else {
        regex = new RegExp(input, 'i');
      }
    } catch (e) {
      setPatternError('The pattern could not be compiled as a regular expression. Try a simpler phrase or adjust your syntax.');
      return;
    }

    const matches = [];
    lines.forEach((line, idx) => {
      if (regex.test(line)) {
        const match = line.match(regex);
        matches.push({
          index: idx + 1,
          text: line,
          matchedText: match ? match[0] : null
        });
      }
    });

    if (!matches.length) {
      setPatternSummary('No matches found for this pattern in the current snippet. Consider adjusting the search term or broadening your regex.');
      return;
    }

    const max = 120;
    const limited = matches.slice(0, max);

    setPatternSummary(
      `Found ${matches.length} matching line${matches.length === 1 ? '' : 's'} in this snippet. Showing up to ${max} below.`
    );
    setPatternResults(limited);

    if (matches.length > max) {
      showNotification(`Showing first ${max} of ${matches.length} matches`);
    } else {
      showNotification(`Found ${matches.length} matches`);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFileName('');
      return;
    }

    setFileName(`${file.name} (${file.size} bytes)`);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result || '';
      setLogText(text);
      resetResults();
    };
    reader.readAsText(file);
  };

  const clearAll = () => {
    setLogText('');
    setFileName('');
    setPatternInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    resetResults();
    showNotification('Cleared all inputs');
  };

  const handlePatternKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      runPatternSearch();
    }
  };

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
            <FileSearch className="w-12 h-12 text-cyan-400" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Log File Pattern Finder
              </h1>
              <p className="text-slate-400 mt-2">
                Paste a small server or application log, or upload a log snippet from your machine, then quickly surface
                suspicious patterns such as failed logins and noisy IP addresses. Everything runs locally in your browser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative max-w-7xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Input */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-cyan-400">1. Add a log snippet</h2>
              <div className="inline-flex items-center space-x-2 bg-green-900/20 border border-green-500/40 rounded-full px-3 py-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-xs text-green-400">Client-side only</span>
              </div>
            </div>

            <p className="text-slate-300 text-sm mb-6">
              Use this tool for small to medium log excerpts you are allowed to inspect locally. Large SIEM exports or
              highly sensitive logs should be handled with your organization's approved tooling and workflows.
            </p>

            <div className="mb-4">
              <label className="block text-sm text-slate-400 mb-2">Paste log lines here</label>
              <textarea
                value={logText}
                onChange={(e) => setLogText(e.target.value)}
                placeholder="[2025-12-10 10:22:15] Failed password for invalid user admin from 192.0.2.13 port 54218 ssh2&#10;[2025-12-10 10:22:20] Accepted password for appuser from 198.51.100.45 port 49211 ssh2&#10;..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors min-h-[300px] resize-y font-mono text-sm"
              />
            </div>

            <div className="flex items-center gap-3 mb-6">
              <label className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all cursor-pointer flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Select log file…</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".log,.txt,text/plain"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              {fileName && (
                <span className="text-sm text-slate-400">{fileName}</span>
              )}
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={analyze}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Analyze log</span>
              </button>
              <button
                onClick={clearAll}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all flex items-center space-x-2"
              >
                <Trash2 className="w-5 h-5" />
                <span>Clear</span>
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div className="bg-cyan-900/10 border border-cyan-500/30 rounded-lg p-3 text-sm text-cyan-300">
                <strong>Tip</strong> · Start with a few hundred lines rather than full-day logs.
              </div>
              <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-3 text-sm text-green-300">
                <strong>Safe</strong> · Files stay in your browser, not sent to CyberLife Coach.
              </div>
            </div>

            <div className="bg-orange-900/10 border border-orange-500/30 rounded-lg p-4 text-sm text-orange-300">
              <strong>Scope & limitations.</strong> This helper is meant for quick, human-in-the-loop triage, not full incident response. It will not detect
              every attack pattern, and it does not replace log retention, SIEM correlation, or professional monitoring.
            </div>
          </div>

          {/* Right: Results */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-2">2. Review the patterns</h2>
              <p className="text-sm text-slate-400">Summaries update after each analysis.</p>
            </div>

            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-slate-950 rounded-xl p-6 border border-slate-700">
                <div className="text-sm font-semibold text-cyan-400 mb-4">
                  SUMMARY <span className="text-slate-500">· Log snapshot</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Total log lines</div>
                    <div className="text-3xl font-bold text-cyan-400">{totalLines}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Unique IP addresses</div>
                    <div className="text-3xl font-bold text-slate-300">{uniqueIPs}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Failed login candidates</div>
                    <div className="text-3xl font-bold text-red-400">{failedCount}</div>
                  </div>
                </div>
                
                <p className="text-xs text-slate-400">{summaryNote}</p>
              </div>

              {/* IP Frequencies */}
              <div className="bg-slate-950 rounded-xl p-6 border border-slate-700">
                <div className="text-sm font-semibold text-cyan-400 mb-4">
                  IP FREQUENCIES <span className="text-slate-500">· Top sources</span>
                </div>
                <p className="text-xs text-slate-400 mb-4">
                  High-frequency sources can hint at brute-force attempts, misbehaving clients, or noisy scanners.
                </p>
                
                {ipList.length === 0 ? (
                  <p className="text-sm text-slate-500">No IP addresses detected in this snippet.</p>
                ) : (
                  <ul className="space-y-2">
                    {ipList.map((item, idx) => (
                      <li key={idx} className="text-sm">
                        <span className="font-mono bg-slate-800 px-2 py-1 rounded text-cyan-400">
                          {item.ip}
                        </span>
                        <span className="text-slate-400 ml-2">
                          · {item.count} occurrence{item.count !== 1 ? 's' : ''}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Failed Logins */}
              <div className="bg-slate-950 rounded-xl p-6 border border-slate-700">
                <div className="text-sm font-semibold text-cyan-400 mb-4">
                  FAILED LOGINS <span className="text-slate-500">· Suspicious lines</span>
                </div>
                <p className="text-xs text-slate-400 mb-4">
                  Uses common text patterns such as{' '}
                  <span className="font-mono bg-red-900/30 text-red-400 px-1.5 py-0.5 rounded text-xs">failed password</span>,{' '}
                  <span className="font-mono bg-red-900/30 text-red-400 px-1.5 py-0.5 rounded text-xs">invalid user</span>,{' '}
                  <span className="font-mono bg-red-900/30 text-red-400 px-1.5 py-0.5 rounded text-xs">authentication failure</span>.
                  Always validate against your environment.
                </p>
                
                <div className="max-h-96 overflow-y-auto bg-slate-900 rounded-lg p-4 border border-slate-700">
                  {failedLines.length === 0 ? (
                    <p className="text-sm text-slate-500">
                      No obvious failed login phrases detected in the current snippet. That does not guarantee the absence of abuse or attacks.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {failedLines.map((entry, idx) => (
                        <div key={idx} className="text-sm font-mono">
                          <span className="text-cyan-400">#{entry.index}:</span>{' '}
                          <span className="text-slate-300">{entry.text}</span>
                        </div>
                      ))}
                      {failedCount > 100 && (
                        <p className="text-xs text-slate-500 mt-4">
                          Showing the first 100 failed login candidates out of {failedCount} matches.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Custom Search */}
              <div className="bg-slate-950 rounded-xl p-6 border border-slate-700">
                <div className="text-sm font-semibold text-cyan-400 mb-4">
                  CUSTOM SEARCH <span className="text-slate-500">· Regex or simple text</span>
                </div>
                <p className="text-xs text-slate-400 mb-4">
                  Search for additional patterns, for example specific usernames, user agents, or paths. Simple text works,
                  or you can use a regular expression.
                </p>
                
                <div className="flex gap-3 mb-4">
                  <input
                    type="text"
                    value={patternInput}
                    onChange={(e) => setPatternInput(e.target.value)}
                    onKeyDown={handlePatternKeyDown}
                    placeholder="Example: 404|500   or   /wp-login.php   or   (?i)sql error"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors font-mono text-sm"
                  />
                  <button
                    onClick={runPatternSearch}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all flex items-center space-x-2"
                  >
                    <Target className="w-4 h-4" />
                    <span>Find matches</span>
                  </button>
                </div>

                {patternError && (
                  <div className="bg-red-900/20 border border-red-500/40 rounded-lg p-3 mb-4 text-sm text-red-300">
                    {patternError}
                  </div>
                )}

                {patternSummary && (
                  <p className="text-xs text-slate-400 mb-4">{patternSummary}</p>
                )}

                {patternResults.length > 0 && (
                  <div className="max-h-96 overflow-y-auto bg-slate-900 rounded-lg p-4 border border-slate-700">
                    <div className="space-y-2">
                      {patternResults.map((entry, idx) => (
                        <div key={idx} className="text-sm font-mono">
                          <span className="text-cyan-400">#{entry.index}:</span>{' '}
                          {entry.matchedText ? (
                            <span className="text-slate-300">
                              {entry.text.split(entry.matchedText).map((part, i) => (
                                <React.Fragment key={i}>
                                  {part}
                                  {i < entry.text.split(entry.matchedText).length - 1 && (
                                    <span className="bg-yellow-500/20 text-yellow-300 px-1 rounded">
                                      {entry.matchedText}
                                    </span>
                                  )}
                                </React.Fragment>
                              ))}
                            </span>
                          ) : (
                            <span className="text-slate-300">{entry.text}</span>
                          )}
                        </div>
                      ))}
                      {patternResults.length >= 120 && (
                        <p className="text-xs text-slate-500 mt-4">
                          Additional matches exist beyond the first 120 lines shown here. Narrow your search if you need a more focused view.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-12">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Important notice & Legal disclaimer:</strong> This Log File Pattern Finder runs entirely in your browser. Your log snippets and any uploaded files are not sent
            to CyberLife Coach, to browser vendors, or to any third party. This tool is provided for educational and
            informational purposes only and is not a SIEM, IDS, or a substitute for professional security monitoring,
            forensics, or compliance tooling.
            <br /><br />
            Always follow your organization's policies before exporting or inspecting logs, avoid pasting highly sensitive
            data, secrets, or regulated personal information, and verify every finding against your own environment and
            threat model. No single view or pattern can guarantee detection of attacks or misconfigurations. By using this
            page, you accept that you are solely responsible for how you review, interpret, and act on the results.
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
