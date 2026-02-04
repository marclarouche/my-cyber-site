import React from 'react';
import { Shield, ArrowLeft, AlertTriangle, Info } from 'lucide-react';

export default function AboutFirefoxBaselinemacOS() {
  const handleOpenTool = () => {
    window.location.href = '/security-center/browser-hardening-hub/firefox-baseline-macos';
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/browser-hardening-hub" className="flex items-center space-x-3 group cursor-pointer">
              <img 
                src="/logo.png" 
                alt="CyberLifeCoach" 
                className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300" 
              />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:brightness-125 transition-all duration-300">
                CyberLifeCoach
              </span>
            </a>

            <a href="/security-center/browser-hardening-hub" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Browser Hardening Hub</span>
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
              About this tool
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              macOS (local device)
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Firefox Security Baseline Script Assistant
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Firefox Security Baseline Script Assistant for macOS
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            This page explains what the assistant does, who it is for, and how to use the generated bash script
            safely on macOS systems you manage. It is designed for people who want a repeatable Firefox baseline
            without hand-writing every <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">policies.json</code> rule inside the app bundle.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {/* What it does */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Overview</div>
            <h2 className="text-2xl font-bold mb-4">What this Firefox baseline assistant actually builds</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              The Firefox Security Baseline Script Assistant helps you turn a set of curated hardening controls
              into a single bash script for macOS. You choose the protections you want, and the tool generates a
              script that:
            </p>
            <ul className="space-y-2 text-slate-400 mb-4">
              <li>• Targets the standard <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">/Applications/Firefox.app</code> installation on macOS.</li>
              <li>• Creates or updates the <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">distribution</code> folder inside the app bundle for enterprise policies.</li>
              <li>• Backs up any existing <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">policies.json</code> to a timestamped file under a backup directory.</li>
              <li>• Writes a new <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">policies.json</code> with the controls you selected.</li>
            </ul>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              The script does not reach out to the internet, does not install add-ons, and does not modify
              system-wide TLS or DNS settings for macOS. It focuses on Firefox browser-level policies that
              Mozilla supports through its enterprise configuration model.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                TLS 1.2+ only
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Telemetry off
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Pop-ups blocked
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Tracker protections
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-600">
                Optional stricter ciphers
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-600">
                DNS over HTTPS control
              </span>
            </div>
          </div>

          {/* Who it's for */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Audience</div>
            <h2 className="text-2xl font-bold mb-4">Who this tool is for (and when to use it)</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              This assistant is meant for people who want stronger Firefox defaults on macOS devices they control,
              without relying solely on ad hoc about:config tweaks or browser extensions.
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-200">Good fit</h3>
                <ul className="space-y-1.5 text-sm text-slate-400">
                  <li>• Home lab builders who want consistent Firefox settings across a few Macs.</li>
                  <li>• Small business owners hardening staff browsers on macOS devices they manage.</li>
                  <li>• Admins who prefer readable bash scripts over manually editing JSON by hand.</li>
                  <li>• Privacy-conscious users who want a reproducible baseline they can re-run after reinstalls.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-200">Use with caution</h3>
                <ul className="space-y-1.5 text-sm text-slate-400 mb-3">
                  <li>• Corporate or school-owned Macs that are already managed via MDM or configuration profiles.</li>
                  <li>• Shared systems where others expect the default Firefox behavior.</li>
                  <li>• Environments that depend on older TLS ciphers or legacy web apps.</li>
                </ul>
                <p className="text-sm text-red-300 leading-relaxed">
                  <strong className="text-red-200">Never</strong> bypass existing organizational policies, configuration baselines, or
                  change-control processes with this script. Treat it as a helper for systems you are responsible for.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">How it works and how to run it</div>
          <h2 className="text-2xl font-bold mb-4">How to use the generated bash script safely on macOS</h2>
          <p className="text-slate-400 mb-6 leading-relaxed">
            The assistant itself runs entirely in your browser. When you click
            <strong className="text-slate-300"> Generate bash script</strong>, it assembles a script locally based on your selections.
            You can copy, download, or paste that script into your editor before running anything.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-3">Before you run the script</h3>
              <ul className="space-y-2 text-sm text-slate-400 mb-4">
                <li>• Use this only on Macs that you own or are explicitly allowed to manage.</li>
                <li>• Create a full backup or snapshot of at least one test Mac.</li>
                <li>• Generate the script and read the comments above each block of controls.</li>
                <li>• Remove any sections that do not fit your environment or risk tolerance.</li>
                <li>• Plan to test on a non-critical Mac first.</li>
              </ul>
              <p className="text-sm text-slate-400 leading-relaxed">
                The script modifies <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">policies.json</code> inside the Firefox app bundle. It does not undo
                existing MDM profiles or other configuration profiles and does not manage system settings outside
                of Firefox's enterprise policy file.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3">Running and rolling back</h3>
              <ul className="space-y-2 text-sm text-slate-400 mb-3">
                <li>• Save the script as something like <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">firefox-macos-baseline.sh</code>.</li>
                <li>• Open Terminal on the Mac where you want to apply the baseline.</li>
                <li>• Make the script executable with <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-cyan-300">chmod +x firefox-macos-baseline.sh</code>.</li>
                <li>• Run <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-cyan-300">sudo ./firefox-macos-baseline.sh apply</code> to apply your chosen controls.</li>
                <li>• Use <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-cyan-300">sudo ./firefox-macos-baseline.sh rollback</code> to restore the most recent backup of <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">policies.json</code>.</li>
              </ul>
              <p className="text-sm text-slate-400 leading-relaxed">
                The rollback function only restores backups that this script created under its backup directory.
                It will not recover other configuration changes, browser extensions, or user profile tweaks
                made outside of <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">policies.json</code>.
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            If you later adopt MDM or a centralized macOS management solution, you can stop using this script and
            migrate the same policies into your preferred tooling. Think of this assistant as a bridge between
            "clicking around in settings" and a more formal enterprise configuration stack.
          </p>

          {/* Button Row */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <Shield className="w-5 h-5" />
              <span>Open Firefox Baseline Assistant</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print this page</span>
            </button>
          </div>

          {/* Scope Note */}
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            This tool includes a curated subset of DISA STIG controls selected for real world use
            by home users, entrepreneurs, digital nomads, and small businesses. It is not a full STIG implementation
            but a practical baseline designed to reduce your attack surface.
          </p>

          {/* Disclaimer */}
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-8 h-8 text-yellow-400 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-2">Important Notice & Legal Disclaimer</h4>
                <p className="text-sm text-slate-300 leading-relaxed mb-3">
                  This assistant runs entirely in your browser. Your selections and the generated bash script are not
                  sent to CyberLife Coach, to Mozilla, or to any third party. The output is a generic starting point and is
                  provided for educational and informational use only. It is not a substitute for professional advice, does
                  not guarantee compliance with any standard, and is used at your own risk.
                  Always test in a safe environment, verify every line, and ensure you have reliable backups before making
                  changes. Do not apply these settings to employer or school managed Macs without explicit approval, and
                  do not bypass existing MDM profiles, configuration profiles, or enterprise change-control processes.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/30">No warranty or guarantees</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">Local only, no data leaves this device</span>
                </div>
              </div>
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
            <p>&copy; 2026 CyberLifeCoach</p>
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
