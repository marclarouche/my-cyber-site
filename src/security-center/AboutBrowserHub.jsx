import React from 'react';
import { Shield, ArrowLeft, Printer } from 'lucide-react';

export default function AboutBrowserCenter() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/security-center" className="flex items-center space-x-3 group cursor-pointer">
              <img 
                src="/logo.png" 
                alt="CyberLifeCoach" 
                className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300" 
              />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:brightness-125 transition-all duration-300">
                CyberLifeCoach
              </span>
            </a>

            <button
              onClick={() => window.location.href = '/security-center'}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-all duration-300 border border-slate-700 hover:border-cyan-500"
              >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Security Center</span>
              </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">About this toolkit</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Browser Hardening Toolkit</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Local, in-browser helpers</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About Browser Hardening Hub
          </h1>
          
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            This page explains what the Browser Hardening Tool does, how the individual baseline assistants work, and how to use the generated scripts safely on Windows 11 and macOS. It is meant as a human friendly companion to the main toolkit page, not a replacement for your own review and testing.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            {/* Action Buttons at Top */}
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href="/security-center/browser-hardening-hub"
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <Shield className="w-5 h-5" />
                <span>Open Browser Hardening Hub</span>
              </a>
              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold border border-slate-700 hover:border-cyan-500 transition-all hover:bg-slate-800"
              >
                <Printer className="w-5 h-5" />
                <span>Print this page</span>
              </button>
            </div>

            {/* Two Column Grid - Overview and Audience */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Overview</div>
                <h2 className="text-2xl font-bold mb-4">What the Browser Hardening Hub actually builds</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  The Browser Hardening Hub brings several browser specific assistants into one place. Each assistant generates a script that applies opinionated but readable security and privacy controls for a particular browser and operating system combination.
                </p>
                <p className="text-slate-400 leading-relaxed mb-4">
                  You choose an operating system, then pick a browser baseline. The toolkit then builds a local script that typically:
                </p>
                <ul className="space-y-2 text-slate-400 mb-4">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Targets a specific browser, such as Edge, Chrome, or Firefox.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Turns on stricter tracking, cookie, and permission settings where possible.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Adjusts TLS and certificate behavior toward more modern, safer defaults.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Reduces telemetry and background data collection where supported.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Uses a repeatable configuration file or registry based approach instead of one computer at a time clicks.</span>
                  </li>
                </ul>
                <p className="text-xs text-slate-500 mb-4">
                  The toolkit focuses on browser level settings on your local device. It does not change your router, VPN, DNS resolver, or any account level settings you have with Google, Microsoft, or Mozilla.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Script based baselines</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Windows 11 and macOS support</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Edge, Chrome, Firefox profiles</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Local only, no cloud calls</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Audience</div>
                <h2 className="text-2xl font-bold mb-4">Who this toolkit is for (and where to be careful)</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  This toolkit is intended for people who want stronger browser defaults on systems they control, without becoming full time policy engineers. It is especially helpful when you rebuild machines often or manage a small number of devices for other people.
                </p>
                
                <h3 className="text-lg font-bold mb-3 text-cyan-400">Good fit</h3>
                <ul className="space-y-2 text-slate-400 mb-4">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Home users who want tighter browser privacy on laptops and desktops.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Independent professionals securing a few Windows or macOS devices.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Small business owners who want consistent browser settings for a compact team.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Security minded users who like copy paste scripts they can version control.</span>
                  </li>
                </ul>

                <h3 className="text-lg font-bold mb-3 text-yellow-400">Use with caution</h3>
                <ul className="space-y-2 text-slate-400 mb-3">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Corporate or school managed laptops that already receive browser policies.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Shared household machines where others may dislike stricter permissions.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Environments governed by formal change control, GPOs, or MDM baselines.</span>
                  </li>
                </ul>
                <p className="text-xs text-yellow-400/80 bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3">
                  <strong className="text-yellow-400">Never</strong> bypass organizational policies, device management profiles, or security baselines with these scripts. Treat this toolkit as a helper for systems you are responsible for and have explicit permission to configure.
                </p>
              </div>
            </div>

            {/* How it works section */}
            <div className="mb-8">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">How it works</div>
              <h2 className="text-2xl font-bold mb-4">How the browser assistants generate and apply their scripts</h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                The Browser Hardening Tool runs entirely in your browser. When you open one of the baseline assistants and click a button such as <strong className="text-slate-300">Generate script</strong>, the tool assembles its output locally in the page. You can copy or download that script and review it before running anything.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">Windows 11 assistants</h3>
                  <ul className="space-y-2 text-slate-400 mb-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Edge, Chrome, and Firefox assistants generate PowerShell scripts aimed at Windows 11 devices.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>These scripts usually write browser policies by creating registry keys or enterprise policy files such as <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">policies.json</code> for Firefox.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>You typically save a script as something like <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">edge-baseline-win11.ps1</code>, <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">chrome-baseline-win11.ps1</code>, or <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">firefox-baseline-win11.ps1</code>.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>To run a script, you open PowerShell as Administrator and use a command similar to <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">.\edge-baseline-win11.ps1</code> after you have read through it.</span>
                    </li>
                  </ul>
                  <p className="text-xs text-slate-500">
                    Some assistants also include simple backup and rollback behavior so you can test settings on a non critical machine first, then migrate a known good configuration forward.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">macOS assistants</h3>
                  <ul className="space-y-2 text-slate-400 mb-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>macOS Chrome and Firefox assistants generate bash scripts that write policy files and related folders on disk.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>These scripts take care of file paths that can be awkward to remember and add comments for each major block.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>You typically save a script with a name like <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">chrome-baseline-macos.sh</code> or <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">firefox-baseline-macos.sh</code>.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Before running, make the script executable with <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">chmod +x chrome-baseline-macos.sh</code>, then run something like <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">sudo ./chrome-baseline-macos.sh</code> on a test system.</span>
                    </li>
                  </ul>
                  <p className="text-xs text-slate-500">
                    The macOS baselines are intended to work alongside the operating system's privacy controls, not to replace regular browser updates or per site decisions about cookies and permissions.
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-6">
                Whether you are using Windows or macOS, the core idea is the same. The toolkit helps you move from one off clicks in settings menus toward a repeatable script that documents your intent. You always remain in control of what you apply, where you apply it, and when you choose to roll changes back.
              </p>
            </div>

            {/* Scope Note */}
            <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-slate-700">
              <p className="text-sm text-slate-400 leading-relaxed">
                This tool includes a curated subset of DISA STIG controls selected for real world use by home users, entrepreneurs, digital nomads, and small businesses. It is not a full STIG implementation but a practical baseline designed to reduce your attack surface.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="text-3xl flex-shrink-0">⚠️</div>
                <div>
                  <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-3">Important Notice & Legal Disclaimer</h4>
                  <p className="text-sm text-slate-300 leading-relaxed mb-3">
                    This Browser Hardening Hub and its companion pages run entirely in your browser. Your selections and the generated scripts are not sent to CyberLife Coach, to browser vendors, or to any third party. The output is a generic starting point for browser security and privacy controls and is provided for educational and informational use only. It is not a substitute for professional advice and does not guarantee compliance with any standard or policy.
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    Always test in a safe environment, verify every line, and ensure you have reliable backups before making changes. Do not apply these settings to employer or school managed devices without explicit approval, and do not bypass existing GPOs, MDM profiles, configuration profiles, or enterprise change control processes.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">No warranty or guarantees</span>
                    <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">Local only, no data leaves this device</span>
                  </div>
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
            <Shield className="w-6 h-6 text-cyan-400" />
            <span className="font-bold text-lg">CyberLifeCoach</span>
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
