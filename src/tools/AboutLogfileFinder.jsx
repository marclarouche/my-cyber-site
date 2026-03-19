import React from 'react';
import { FileSearch, ArrowLeft, AlertTriangle, Shield, Info, Search, Terminal, Lightbulb } from 'lucide-react';

export default function AboutLogfileFinder() {
  const handleOpenTool = () => {
    window.open('/tools/logfile-finder', '_blank', 'noopener,noreferrer');
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
              Log Analysis Tool
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Pattern Detection
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the Log File Pattern Finder
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            The Log File Pattern Finder is a lightweight helper for quickly exploring small server and application logs.
            It surfaces noisy IP addresses, failed login candidates, and custom patterns so you can decide what deserves a
            closer look, without sending any data off your machine.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1.7fr_1.4fr] gap-6">
            {/* Left Column */}
            <div>
              {/* What this tool is designed to do */}
              <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
                <div className="flex items-center space-x-2 mb-3">
                  <Terminal className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">Overview</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white">
                  What this tool is designed to do
                </h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  This page focuses on fast, human-in-the-loop triage of log snippets. It is not a full SIEM or correlation
                  engine. Instead, it helps you answer practical questions such as which IP addresses are especially noisy and
                  where failed login attempts are concentrated.
                </p>
                <p className="text-slate-400 leading-relaxed mb-6">
                  You can paste log lines directly into the tool or upload a small <code className="text-cyan-300 bg-slate-800 px-2 py-0.5 rounded font-mono">.log</code> or
                  <code className="text-cyan-300 bg-slate-800 px-2 py-0.5 rounded font-mono ml-1">.txt</code> file from your machine. The browser then counts IP frequencies, highlights
                  failed login phrases, and lets you search for custom patterns using simple text or regular expressions.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                    <span className="text-sm text-slate-300">Client-side only, no upload</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                    <span className="text-sm text-slate-300">Works with many plain-text logs</span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-4 text-white">
                  When this tool is a good fit
                </h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  The Log File Pattern Finder is most helpful when you have a small slice of log data and you want a quick sense
                  of what is happening before you move into heavier tooling. Examples include:
                </p>
                <ul className="space-y-2 text-slate-400 mb-6">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>A few hundred SSH or VPN lines from a lab or personal server.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Web server access logs for a short time window, for example the last few minutes around an error.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Application logs from a self-hosted service where you suspect a noisy client or misconfiguration.</span>
                  </li>
                </ul>
                <p className="text-slate-400 leading-relaxed mb-6">
                  The analysis is shallow on purpose. It gives you a starting point, not a conclusion. You still review the
                  context, your threat model, and any compliance obligations before taking action.
                </p>

                <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-6">
                  <div className="flex items-start space-x-4">
                    <Lightbulb className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-cyan-300">Tip</h3>
                      <p className="text-slate-300 leading-relaxed">
                        For best results, trim very large logs down to a focused snippet such as the last 500 to 2000 lines, especially
                        around the timeframe where you suspect an issue.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* How it works */}
              <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
                <div className="flex items-center space-x-2 mb-3">
                  <Search className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">How it works</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Key features and workflow
                </h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  The Log File Pattern Finder reads only the text that you paste or upload into the page. It does not contact a
                  server, store your logs remotely, or send them to CyberLife Coach. All processing happens in the browser's
                  JavaScript engine.
                </p>
                <p className="text-slate-300 leading-relaxed mb-3 font-bold">Typical workflow:</p>
                <ul className="space-y-2 text-slate-400 mb-8">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Paste log lines or upload a small log file into the input area.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Select "Analyze log" to calculate total lines, distinct IP addresses, and failed-login candidates.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Review the list of top IP sources and decide which ones matter in your environment.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Scan the failed-login section and note usernames, sources, and timing of repeated attempts.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Use the custom search field to look for specific paths, user agents, or application markers.</span>
                  </li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 text-white">
                  Limitations and safe use
                </h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  This tool does not replace central logging, alerting, or incident response. It will not detect every attack
                  technique, and it does not maintain log history beyond what you paste or upload during the current session.
                </p>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Avoid pasting highly sensitive content such as credentials, secrets, or regulated personal data. If your
                  organization has policies that restrict log exports or require approved tooling, follow those policies first
                  and treat this helper as an optional, local-only viewer where it is allowed.
                </p>

                <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-sm rounded-xl border border-yellow-500/30 p-6">
                  <div className="flex items-start space-x-4">
                    <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-yellow-300">Important</h3>
                      <p className="text-slate-300 leading-relaxed">
                        Treat every pattern here as a lead, not a verdict. A noisy IP might be an internal scanner, a staging system,
                        or a legitimate integration. Always correlate with known assets, change history, and your existing security
                        controls.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <FileSearch className="w-5 h-5" />
              <span>Open Log File Pattern Finder</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print This Page</span>
            </button>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              <strong className="text-cyan-400">Important Notice & Legal Disclaimer:</strong> The Log File Pattern Finder and this companion page are provided for educational and informational purposes only.
              They are not a SIEM, IDS, IPS, managed security service, or a replacement for professional monitoring, forensics,
              or compliance tooling. No outcome, coverage level, or security benefit is guaranteed.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              This tool runs entirely in your browser. Log snippets and uploaded files are processed locally and are not sent to
              CyberLife Coach, to browser vendors, or to any third party by this page. You remain responsible for following your
              organization's policies, protecting sensitive data, and deciding whether a given log sample may be copied or
              inspected in this way.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Always validate findings against your own environment, retain full logs according to your legal and regulatory
              obligations, and consult a qualified professional if you require formal incident response, legal guidance, or
              compliance advice.
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
            <p>&copy; 2025 CyberLifeCoach</p>
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
