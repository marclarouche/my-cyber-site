// AboutFingerPrintAuditor.jsx
import React from "react";
import { ArrowLeft, Fingerprint, AlertTriangle } from "lucide-react";

export default function AboutFingerPrintAuditor() {
  const handleOpenTool = () => {
    // HTML points to: fingerprint-auditor.html
    window.location.href = "/tools/finger-print-auditor";
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">
      {/* Navigation (match AboutEmailHeaderAnalyzer.jsx) */}
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

            <a
              href="/tools"
              className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tools Hub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero (icon/title layout pattern) */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
              Privacy Visibility Tool
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Fingerprinting Signals
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-700">
              {/* Icon should be 12x12, cyan-400 */}
              <Fingerprint className="w-12 h-12 text-cyan-400" />
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                About: Browser Fingerprinting Auditor
              </h1>
              <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
                A practical, privacy focused checker that shows what your browser reveals to websites. The goal is clarity, not
                fear. You get a simple snapshot of common fingerprint signals so you can make better choices.
              </p>
              <p className="text-base text-cyan-400 font-semibold">
                A Veteran-Owned Business Committed to Your Digital Security
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* What this tool does */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">What this tool does</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              The Browser Fingerprinting Auditor helps you understand how unique your browser appears to websites. It collects
              common signals that can be combined to recognize you across sessions, even when you clear cookies.
            </p>
            <p className="text-slate-500 italic">
              This is a visibility tool. It does not change your settings automatically, and it does not promise anonymity.
            </p>
          </div>

          {/* How fingerprinting works */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">How browser fingerprinting works</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Many sites can read certain browser and device characteristics in a normal web session. One detail alone is
              usually not enough to identify you, but a bundle of details can become distinctive.
            </p>

            <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-cyan-300 mb-3">Common signals include</h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Browser details such as user agent, platform, and feature support.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Screen and display information such as resolution and pixel density.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Graphics capabilities via WebGL and GPU reporting.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Canvas and audio behaviors that can vary by device and configuration.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Time zone and language settings.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Network and hardware hints exposed by certain APIs.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* How to use results */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">How to use the results</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Start by running the tool in your everyday browser, then compare with a privacy hardened browser profile. If your
              fingerprint remains highly unique, consider tightening settings that influence the biggest signals.
            </p>

            <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-cyan-300 mb-3">Practical improvements that often help</h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Enable built in anti fingerprinting features where available.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Limit extensions, especially ones that make you stand out.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Consider disabling WebGL or restricting it when you do not need it.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Use private browsing thoughtfully, but remember it does not erase fingerprint signals.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>For high risk situations, consider Tor Browser and follow its guidance.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Expectations */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">What to expect and what not to expect</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Some fingerprint signals are difficult to reduce without breaking websites or reducing usability. Your goal should
              be risk reduction that fits your needs, not chasing a perfect score.
            </p>
            <p className="text-slate-500 italic">
              A lower fingerprint risk can reduce passive tracking, but it does not replace good account security, safe browsing
              habits, and device hardening.
            </p>
          </div>

          {/* Buttons moved to bottom (same location as HTML) */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mb-8 no-print">
            <button
              type="button"
              onClick={handleOpenTool}
              className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              aria-label="Open Browser Fingerprinting Auditor tool"
            >
              <span className="text-lg">🔍</span>
              <span>Open Fingerprint Auditor</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 border border-slate-600 rounded-xl text-slate-100 font-semibold transition-all"
              aria-label="Print this page"
            >
              <span className="text-lg">🖨️</span>
              <span>Print</span>
            </button>
          </div>

          {/* Legal disclaimer (same format/styling as AboutEmailHeaderAnalyzer.jsx), positioned before footer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-8">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer and Important Notice:</strong> This Browser Fingerprinting
              Auditor runs entirely in your browser. Your results are not sent to CyberLife Coach, to analytics services, or to
              any external server. Output and guidance are provided for educational and informational use only and do not
              guarantee security, privacy, anonymity, or compliance.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed mt-4">
              Always verify changes before applying them, and test adjustments in a safe environment. Avoid modifying settings
              on employer managed or school managed devices without explicit authorization. If you rely on certain sites for
              work, banking, or accessibility, make changes carefully so you do not lock yourself out or break critical
              workflows.
            </p>
          </div>

          {/* Footer note card (keeps the original footer message while matching theme) */}
          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-2xl p-6 mb-10">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-300 leading-relaxed">
                CyberLife Coach, practical privacy and security education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (match AboutEmailHeaderAnalyzer.jsx style) */}
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
