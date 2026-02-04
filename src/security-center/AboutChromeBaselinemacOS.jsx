import React from 'react';
import { Shield, ArrowLeft, AlertTriangle, Info } from 'lucide-react';

export default function AboutChromeBaselinemacOS() {
  const handleOpenTool = () => {
    window.location.href = '/security-center/browser-hardening-hub/chrome-baseline-macos';
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
              Chrome on macOS
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Bash baseline script assistant
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Chrome Security Baseline Script Assistant for macOS
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            This page explains what the assistant does, who it is for, and how to use the generated bash script
            safely on Macs you manage. It helps you create a repeatable Chrome hardening baseline without hand editing
            managed preference plist files or building MDM profiles from scratch.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {/* What it does */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Overview</div>
            <h2 className="text-2xl font-bold mb-4">What this Chrome baseline assistant actually builds on macOS</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              The Chrome Security Baseline Script Assistant for macOS turns a curated set of hardening controls into
              a single bash script you can run with <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">sudo</code>. You pick the protections you want and the tool
              generates a script that:
            </p>
            <ul className="space-y-2 text-slate-400 mb-4">
              <li>• Targets Chrome on macOS through the managed preferences plist at <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">/Library/Managed Preferences/com.google.Chrome.plist</code> using <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">/usr/libexec/PlistBuddy</code>.</li>
              <li>• Applies privacy and security controls including pop up blocking, Safe Browsing, download restrictions, cookie rules, location, WebUSB, telemetry, Sync, Remote Desktop firewall traversal, and certificate revocation checks.</li>
              <li>• Respects your choice of Relaxed, Strict, or Custom profile when selecting controls so you can tune the impact level to each Mac.</li>
              <li>• Produces clean, commented bash you can reuse, store in version control, or adapt into long term MDM or configuration profiles.</li>
            </ul>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              The script focuses on managed Chrome policy keys and does not directly edit user bookmarks, extensions,
              or personal Chrome profile data. It writes a backup copy of any existing policy plist before it applies
              changes so you have an extra safety net.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                Copy paste bash script
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Managed preference plist policies
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-600">
                Relaxed or Strict baseline
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/40">
                Apply and rollback modes
              </span>
            </div>
          </div>

          {/* Who it's for */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Audience</div>
            <h2 className="text-2xl font-bold mb-4">Who this tool is for and when it helps</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              This assistant is designed for people who want stronger Chrome defaults on Macs they control,
              without spending time hunting through every Chrome settings pane or hand crafting plist edits.
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-200">Good fit</h3>
                <ul className="space-y-1.5 text-sm text-slate-400">
                  <li>• Home users and families who want safer Chrome browsing on a handful of personal Macs.</li>
                  <li>• Small business owners hardening staff browsers on company owned macOS devices.</li>
                  <li>• Admins who prefer scripted, repeatable changes instead of one off clicks in Chrome or manual plist edits.</li>
                  <li>• Privacy conscious users who want a baseline they can regenerate after macOS or Chrome reinstalls.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-200">Use with caution</h3>
                <ul className="space-y-1.5 text-sm text-slate-400 mb-3">
                  <li>• Employer, school, or MDM managed Macs that already receive Chrome policies through configuration profiles.</li>
                  <li>• Systems that rely on legacy web apps, Chrome Remote Desktop, or unusual download flows that stricter policies might disrupt.</li>
                  <li>• Shared Macs where other users expect the default Chrome behavior and have not agreed to a hardened baseline.</li>
                </ul>
                <p className="text-sm text-red-300 leading-relaxed">
                  <strong className="text-red-200">Never</strong> bypass existing MDM, configuration profiles, or change control processes with this
                  script. Treat it as a helper for Macs you are clearly responsible for and where you are allowed to set
                  local policies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">How it works, how to run it, and how to roll it back</div>
          <h2 className="text-2xl font-bold mb-4">Using the Chrome baseline script safely on macOS</h2>
          <p className="text-slate-400 mb-6 leading-relaxed">
            The assistant itself runs entirely in your browser. When you click the generate button it builds
            a bash script locally based on your selections. You can copy, download, or paste that script
            into your editor before running anything on a Mac.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-3">Before you run the script</h3>
              <ul className="space-y-2 text-sm text-slate-400 mb-4">
                <li>• Use this only on Macs that you own or are clearly allowed to manage.</li>
                <li>• Back up at least one test system or capture a full image or snapshot before changes.</li>
                <li>• Quit Chrome so it does not overwrite the managed preferences plist while you apply the baseline.</li>
                <li>• Generate the script and read the comments above each command, then remove anything that does not fit your environment.</li>
                <li>• Plan to test first on a non critical Mac from a <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">sudo</code> enabled shell.</li>
              </ul>
              <p className="text-sm text-slate-400 leading-relaxed">
                The script uses <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">/usr/libexec/PlistBuddy</code> to write policy keys into
                <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300"> /Library/Managed Preferences/com.google.Chrome.plist</code>. It also writes a timestamped backup
                of any existing plist into <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">/usr/local/CyberLifeCoach/ChromeBaseline</code> before it starts.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3">Running the baseline and using rollback</h3>
              <p className="text-sm text-slate-400 mb-3 leading-relaxed">
                <strong className="text-slate-300">How to use:</strong> In the assistant, select your controls and generate the script. Save it as something like
                <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-cyan-300"> chrome-macos-baseline.sh</code>, then make it executable with
                <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-cyan-300"> chmod +x chrome-macos-baseline.sh</code>. From Terminal on a test Mac,
                run
                <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-cyan-300"> sudo ./chrome-macos-baseline.sh apply</code>
                to write the managed policy keys into
                <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300"> /Library/Managed Preferences/com.google.Chrome.plist</code>.
              </p>
              <p className="text-sm text-slate-400 mb-3 leading-relaxed">
                <strong className="text-slate-300">Rollback:</strong> The same script includes a rollback path. If you need to undo the specific policy keys created by this
                baseline, run
                <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-cyan-300"> sudo ./chrome-macos-baseline.sh rollback</code>
                from Terminal. That mode deletes the policy values this assistant set while leaving other MDM profiles
                or tools in place.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                <strong className="text-slate-300">Scope of rollback:</strong> Rollback only targets the policy keys created in
                <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300"> /Library/Managed Preferences/com.google.Chrome.plist</code> by this script. It does not restore
                previous MDM configurations, other Chrome policy sources, or user level Chrome settings.
              </p>
            </div>
          </div>

          {/* Button Row */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <Shield className="w-5 h-5" />
              <span>Open Chrome Baseline Assistant (macOS)</span>
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
                  sent to CyberLife Coach, to Google, or to any third party. The output is a generic starting point and is
                  provided for educational and informational use only. It is not a substitute for professional advice,
                  does not guarantee compliance with any standard, and is used at your own risk.
                  Always test in a safe environment, verify every line, and ensure you have reliable backups before making
                  changes. Do not apply these settings to employer, school, or MDM managed Macs without explicit approval,
                  and do not bypass existing configuration profiles or management tools.
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
