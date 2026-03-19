import React from 'react';
import { Hash, ArrowLeft, Shield, CheckCircle, AlertTriangle, FileText, Lock, ExternalLink } from 'lucide-react';

export default function AboutFileHashCalculator() {
  const handleOpenTool = () => {
    window.location.href = '/tools/file-hash-calculator';
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
              Security Tool Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              File Integrity
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Client-Side Only
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the File Hash Calculator
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            Learn how the tool works, what it supports, and how to use it safely.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* What this tool does */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-cyan-300">What this tool does</h2>
            <p className="text-slate-300 leading-relaxed">
              The File Hash Calculator computes cryptographic hashes for any file on your device. Results are displayed 
              for each selected algorithm so you can verify downloads, share checksums with collaborators, and confirm 
              file integrity during incident response or archival tasks.
            </p>
          </div>

          {/* How it works */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              How it works
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              All hashing runs locally in your browser using the Web Crypto API for modern algorithms. MD5, which is not 
              exposed by Web Crypto, is computed with a client-side library. Your file never leaves your device and no 
              network requests are made during hashing.
            </p>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span>SHA-256 and SHA-512 use the browser's built-in cryptography interface.</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                <span>SHA-1 is provided for legacy validation and should not be used for new security decisions.</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                <span>MD5 is included for compatibility with older checksum listings.</span>
              </li>
            </ul>
          </div>

          {/* Supported algorithms */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Supported algorithms
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Hash className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-semibold text-cyan-400">MD5</h3>
                </div>
                <p className="text-sm text-slate-400">128-bit legacy hash (compatibility only)</p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Hash className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-lg font-semibold text-yellow-400">SHA-1</h3>
                </div>
                <p className="text-sm text-slate-400">160-bit legacy hash (verification only)</p>
              </div>
              <div className="bg-slate-950 border border-green-700/50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Hash className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-semibold text-green-400">SHA-256</h3>
                </div>
                <p className="text-sm text-slate-400">256-bit secure hash (recommended)</p>
              </div>
              <div className="bg-slate-950 border border-green-700/50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Hash className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-semibold text-green-400">SHA-512</h3>
                </div>
                <p className="text-sm text-slate-400">512-bit secure hash (maximum security)</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Open the main tool and choose one or more algorithms from the selector. The calculator will produce a hex 
              string for each selection.
            </p>
          </div>

          {/* Privacy and security */}
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Shield className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-blue-300">Privacy and security</h2>
            </div>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start">
                <Lock className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                <span><strong>No file uploads.</strong> Hashing is performed entirely in memory on your device.</span>
              </li>
              <li className="flex items-start">
                <Lock className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                <span><strong>No telemetry.</strong> The page does not send hashes or filenames to any service.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                <span><strong>Accessible design</strong> with keyboard support and clear focus indicators.</span>
              </li>
            </ul>
          </div>

          {/* Quick start */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Quick start
            </h2>
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">1.</span>
                <span className="text-slate-300">Open the tool and select the algorithms that you want.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">2.</span>
                <span className="text-slate-300">Drag and drop a file into the drop zone, or choose a file with the picker.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">3.</span>
                <span className="text-slate-300">Copy any checksum with the Copy button next to the result.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">4.</span>
                <div className="text-slate-300">
                  Use{' '}
                  <kbd className="px-2 py-1 text-xs font-mono bg-slate-950 border border-slate-600 rounded text-cyan-300">Ctrl</kbd>
                  {' + '}
                  <kbd className="px-2 py-1 text-xs font-mono bg-slate-950 border border-slate-600 rounded text-cyan-300">P</kbd>
                  {' '}or the Print button on this page if you want a printable overview.
                </div>
              </li>
            </ol>
          </div>

          {/* Known limitations */}
          <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl border border-yellow-500/30 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-yellow-300">Known limitations</h2>
            </div>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">⚠️</span>
                <span>
                  Very large files can be memory-intensive in some browsers. If you experience issues, try a modern desktop browser.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">⚠️</span>
                <span>
                  SHA-1 and MD5 should not be used to make new security decisions. Prefer SHA-256 or SHA-512 for integrity checks.
                </span>
              </li>
            </ul>
          </div>

          {/* Use Cases */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Common Use Cases
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Verify Downloads</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Compare the hash of downloaded software against the official checksum to ensure it hasn't been tampered with.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <FileText className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Document Integrity</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Generate hashes for important documents to prove they haven't been altered since creation.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Incident Response</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Calculate hashes during forensic analysis to maintain chain of custody and verify evidence integrity.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Lock className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">File Deduplication</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Identify duplicate files by comparing their hashes, regardless of filename or location.
                </p>
              </div>
            </div>
          </div>

          {/* References */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              References
            </h2>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://csrc.nist.gov/projects/hash-functions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="group-hover:underline">NIST Hash Functions Project</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.iso.org/standard/41538.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="group-hover:underline">ISO/IEC 10118 Information Technology — Security Techniques — Hash Functions</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Algorithm Comparison */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Algorithm Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Algorithm</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Hash Length</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Security Status</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Recommended Use</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400">
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">
                      <code className="text-cyan-300 font-mono text-sm">MD5</code>
                    </td>
                    <td className="py-3 px-4">128 bits</td>
                    <td className="py-3 px-4">
                      <span className="text-red-400">⚠️ Broken</span>
                    </td>
                    <td className="py-3 px-4">Legacy compatibility only</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">
                      <code className="text-yellow-300 font-mono text-sm">SHA-1</code>
                    </td>
                    <td className="py-3 px-4">160 bits</td>
                    <td className="py-3 px-4">
                      <span className="text-yellow-400">⚠️ Deprecated</span>
                    </td>
                    <td className="py-3 px-4">Legacy verification only</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">
                      <code className="text-green-300 font-mono text-sm">SHA-256</code>
                    </td>
                    <td className="py-3 px-4">256 bits</td>
                    <td className="py-3 px-4">
                      <span className="text-green-400">✓ Secure</span>
                    </td>
                    <td className="py-3 px-4">Recommended for most uses</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">
                      <code className="text-green-300 font-mono text-sm">SHA-512</code>
                    </td>
                    <td className="py-3 px-4">512 bits</td>
                    <td className="py-3 px-4">
                      <span className="text-green-400">✓ Secure</span>
                    </td>
                    <td className="py-3 px-4">Maximum security applications</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <Hash className="w-5 h-5" />
              <span>Open File Hash Tool</span>
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
              <strong className="text-cyan-400">Legal Disclaimer and Important Notice:</strong> This page and the related tool are provided "as-is" with no warranties, guarantees, or assurances of any kind.
              All hashing is performed locally in your browser and no files are uploaded to any server.
              You are responsible for using this tool appropriately and in accordance with applicable laws and policies.
              We are not liable for any loss, damage, or misuse arising from its use.
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
