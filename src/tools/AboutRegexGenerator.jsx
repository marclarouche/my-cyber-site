import React from 'react';
import { Code, ArrowLeft, Shield, CheckCircle, AlertTriangle, FileText, Download, Zap, Search } from 'lucide-react';

export default function AboutRegexGenerator() {
  const handleOpenTool = () => {
    window.location.href = '/tools/regex-generator';
  };

  const handlePrint = () => {
    window.print();
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

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
              Development Tool Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Pattern Matching
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Client-Side Only
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the Regex Generator & Tester
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            Build, test, and validate regular expressions with instant visual feedback.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Overview */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-cyan-300">Overview</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              The Regex Generator & Tester helps you compose regular expressions, toggle flags, and validate patterns against 
              sample text with instant highlighting. Everything runs inside your browser, works offline, and respects your privacy. 
              When you are ready, export your pattern, flags, and examples to files you can share or commit.
            </p>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-4">
              <p className="text-sm font-semibold text-blue-300 mb-3">Quick facts</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>No servers, logins, or analytics. All processing is client-side.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Flags and tokens are selectable, and matches are highlighted in real time.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>One-click export saves JSON and TXT bundles via the browser's download prompt.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Why it matters */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Why it matters
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Regular expressions are powerful, but trial-and-error in code can be slow and risky. A local, visual builder makes 
              patterns easier to understand and safer to refine before deployment. Keeping everything on-device protects sensitive 
              sample data, which is especially important for logs, emails, or personally identifiable information.
            </p>
          </div>

          {/* How it works */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              How it works
            </h2>
            <p className="text-slate-400 leading-relaxed">
              The page uses the browser's native{' '}
              <code className="text-cyan-300 font-mono bg-slate-950 px-2 py-1 rounded text-sm">RegExp</code>
              {' '}engine. As you type or insert tokens, the pattern is compiled with your selected flags. The sample text area 
              is scanned for matches and the tool wraps matches in visual highlights. Downloads are created with the Blob API, 
              so files are generated locally and never uploaded.
            </p>
          </div>

          {/* Quick start */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Quick start
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Step-by-step */}
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Step-by-step</h3>
                <ol className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-bold flex-shrink-0">1.</span>
                    <span className="text-slate-300 text-sm">
                      Open the tool and type your pattern in the Pattern field or click tokens to insert common pieces.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-bold flex-shrink-0">2.</span>
                    <span className="text-slate-300 text-sm">
                      Select flags such as{' '}
                      <code className="text-cyan-300 font-mono bg-slate-900 px-1.5 py-0.5 rounded text-xs">i</code>
                      {' '}for case-insensitive and{' '}
                      <code className="text-cyan-300 font-mono bg-slate-900 px-1.5 py-0.5 rounded text-xs">g</code>
                      {' '}for global matching.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-bold flex-shrink-0">3.</span>
                    <span className="text-slate-300 text-sm">
                      Paste sample text into the Test area. Matches are highlighted as you type.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-bold flex-shrink-0">4.</span>
                    <span className="text-slate-300 text-sm">
                      Click "Add as example" to collect test strings that will be included in downloads.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-bold flex-shrink-0">5.</span>
                    <span className="text-slate-300 text-sm">
                      Use "Copy regex" to copy{' '}
                      <code className="text-cyan-300 font-mono bg-slate-900 px-1.5 py-0.5 rounded text-xs">/pattern/flags</code>
                      {' '}or "Download" to save JSON and TXT bundles.
                    </span>
                  </li>
                </ol>
              </div>

              {/* Flags guide */}
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Flags guide</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <code className="text-cyan-300 font-mono bg-slate-900 px-2 py-1 rounded text-xs mr-3 flex-shrink-0">g</code>
                    <span className="text-slate-300">global, find all matches instead of just the first.</span>
                  </li>
                  <li className="flex items-start">
                    <code className="text-cyan-300 font-mono bg-slate-900 px-2 py-1 rounded text-xs mr-3 flex-shrink-0">i</code>
                    <span className="text-slate-300">case-insensitive, match letters regardless of case.</span>
                  </li>
                  <li className="flex items-start">
                    <code className="text-cyan-300 font-mono bg-slate-900 px-2 py-1 rounded text-xs mr-3 flex-shrink-0">m</code>
                    <span className="text-slate-300">
                      multiline, treat{' '}
                      <code className="text-cyan-300 font-mono bg-slate-900 px-1 py-0.5 rounded text-xs">^</code>
                      {' '}and{' '}
                      <code className="text-cyan-300 font-mono bg-slate-900 px-1 py-0.5 rounded text-xs">$</code>
                      {' '}as start and end of line.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <code className="text-cyan-300 font-mono bg-slate-900 px-2 py-1 rounded text-xs mr-3 flex-shrink-0">s</code>
                    <span className="text-slate-300">
                      dotall, make{' '}
                      <code className="text-cyan-300 font-mono bg-slate-900 px-1 py-0.5 rounded text-xs">.</code>
                      {' '}match newline characters.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <code className="text-cyan-300 font-mono bg-slate-900 px-2 py-1 rounded text-xs mr-3 flex-shrink-0">u</code>
                    <span className="text-slate-300">unicode, enable full Unicode features and escapes.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Common patterns */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Common patterns
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Examples */}
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Examples</h3>
                <ul className="space-y-4 text-sm">
                  <li>
                    <div className="text-slate-400 mb-1">Email (simple):</div>
                    <code className="text-cyan-300 font-mono bg-slate-900 px-2 py-1 rounded text-xs block overflow-x-auto">
                      ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{'{2,}'}$
                    </code>
                  </li>
                  <li>
                    <div className="text-slate-400 mb-1">IPv4 address:</div>
                    <code className="text-cyan-300 font-mono bg-slate-900 px-2 py-1 rounded text-xs block overflow-x-auto">
                      ^(?:25[0-5]|2[0-4]\d|1?\d?\d)(?:\.(?:25[0-5]|2[0-4]\d|1?\d?\d)){'{3}'}$
                    </code>
                  </li>
                  <li>
                    <div className="text-slate-400 mb-1">ISO date:</div>
                    <code className="text-cyan-300 font-mono bg-slate-900 px-2 py-1 rounded text-xs block overflow-x-auto">
                      ^\d{'{4}'}-\d{'{2}'}-\d{'{2}'}$
                    </code>
                  </li>
                  <li>
                    <div className="text-slate-400 mb-1">Trim whitespace:</div>
                    <code className="text-cyan-300 font-mono bg-slate-900 px-2 py-1 rounded text-xs block overflow-x-auto">
                      ^\s+|\s+$ <span className="text-slate-500">(use with replace)</span>
                    </code>
                  </li>
                </ul>
              </div>

              {/* Tips */}
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Tips</h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start">
                    <Zap className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span>
                      Prefer non-greedy quantifiers like{' '}
                      <code className="text-cyan-300 font-mono bg-slate-900 px-1.5 py-0.5 rounded text-xs">+?</code>
                      {' '}and{' '}
                      <code className="text-cyan-300 font-mono bg-slate-900 px-1.5 py-0.5 rounded text-xs">*?</code>
                      {' '}when matching delimited text.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span>
                      Use groups{' '}
                      <code className="text-cyan-300 font-mono bg-slate-900 px-1.5 py-0.5 rounded text-xs">( )</code>
                      {' '}to capture and{' '}
                      <code className="text-cyan-300 font-mono bg-slate-900 px-1.5 py-0.5 rounded text-xs">(?: )</code>
                      {' '}for non-capturing.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span>
                      Escape special characters with{' '}
                      <code className="text-cyan-300 font-mono bg-slate-900 px-1.5 py-0.5 rounded text-xs">\.</code>
                      {' '}<code className="text-cyan-300 font-mono bg-slate-900 px-1.5 py-0.5 rounded text-xs">\?</code>
                      {' '}<code className="text-cyan-300 font-mono bg-slate-900 px-1.5 py-0.5 rounded text-xs">\+</code>
                      {' '}<code className="text-cyan-300 font-mono bg-slate-900 px-1.5 py-0.5 rounded text-xs">\*</code>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Validate performance on large inputs, especially when using backtracking-heavy constructs.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Export and download */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Download className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-cyan-400">Export and download</h2>
                <p className="text-slate-400 leading-relaxed">
                  When you click Download in the tool, two files are generated entirely in your browser. A JSON bundle contains 
                  the pattern, flags, timestamp, and any saved examples. A TXT file includes a human-readable version for quick 
                  sharing. Both files are saved through a standard download prompt with no network requests.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy and safety */}
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Shield className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-blue-300">Privacy and safety</h2>
                <p className="text-slate-300 leading-relaxed">
                  The tool does not transmit your pattern, text, or examples to any server. You can use the page offline. If you 
                  are testing sensitive data, consider redacting or synthesizing examples. Always review patterns for catastrophic 
                  backtracking risks before using them in production systems.
                </p>
              </div>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl border border-yellow-500/30 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-yellow-300">Troubleshooting</h2>
            </div>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">⚠️</span>
                <div>
                  <strong>"Syntax error"</strong> means the engine could not compile your pattern. Check unbalanced brackets or escapes.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">⚠️</span>
                <div>
                  If highlighting seems wrong, verify the{' '}
                  <code className="text-cyan-300 font-mono bg-slate-950 px-1.5 py-0.5 rounded text-xs">g</code>
                  {' '}flag. With global off, only the first match is shown.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">⚠️</span>
                <div>
                  Zero-length matches can loop. The tool advances the index to prevent lockups when{' '}
                  <code className="text-cyan-300 font-mono bg-slate-950 px-1.5 py-0.5 rounded text-xs">g</code>
                  {' '}is enabled.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">⚠️</span>
                <div>
                  For multiline text, try enabling{' '}
                  <code className="text-cyan-300 font-mono bg-slate-950 px-1.5 py-0.5 rounded text-xs">m</code>
                  {' '}so{' '}
                  <code className="text-cyan-300 font-mono bg-slate-950 px-1.5 py-0.5 rounded text-xs">^</code>
                  {' '}and{' '}
                  <code className="text-cyan-300 font-mono bg-slate-950 px-1.5 py-0.5 rounded text-xs">$</code>
                  {' '}match line boundaries.
                </div>
              </li>
            </ul>
          </div>

          {/* Use Cases */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Common Use Cases
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Search className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Data Validation</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Validate user input formats like emails, phone numbers, postal codes, and credit cards in web forms.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <FileText className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Log Parsing</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Extract specific information from server logs, application logs, or system outputs for analysis.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Code className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Code Refactoring</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Find and replace patterns in code during refactoring, migration, or standardization tasks.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Security Scanning</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Identify sensitive data patterns, detect potential vulnerabilities, or sanitize user inputs.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <Code className="w-5 h-5" />
              <span>Open Regex Generator</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print This Guide</span>
            </button>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer and Important Notice:</strong> This page describes a local-only utility that compiles and tests regular expressions in your browser. No analytics or tracking is embedded on the tool page, and no data leaves your device unless you choose to download files. Use is your responsibility and must comply with applicable laws and acceptable-use rules. Validate patterns for correctness and performance before deploying them in production.
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
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
