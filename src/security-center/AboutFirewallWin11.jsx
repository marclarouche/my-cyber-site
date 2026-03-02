import React from 'react';
import { Shield, ArrowLeft, Printer } from 'lucide-react';

export default function AboutFirewallWin11() {
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

                <a href="/security-center/firewall-hardening-hub" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
                 <ArrowLeft className="w-4 h-4" />
                <span>Back to Firewall Hardening Hub</span>
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
        
        <div className="relative max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">About this tool</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Windows 11 (local device)</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Windows 11 Firewall Baseline Script Assistant</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Windows 11 Firewall Baseline Script Assistant
          </h1>
          
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            This page explains what the assistant does, who it is for, and how to use the generated PowerShell script safely on Windows 11 systems you manage. It is designed for people who want a repeatable Windows Defender Firewall baseline without hand-building every rule by hand in the GUI.
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
                href="/security-center/firewall-hardening-hub/firewall-baseline-win11"
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <Shield className="w-5 h-5" />
                <span>Open Windows 11 Firewall Assistant</span>
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
                <h2 className="text-2xl font-bold mb-4">What this Windows 11 firewall assistant actually builds</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  The Windows 11 Firewall Baseline Script Assistant helps you turn a curated set of hardening choices into a single PowerShell script. You choose the protections you want, and the tool generates a script that typically:
                </p>
                <ul className="space-y-2 text-slate-400 mb-4">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Targets Windows Defender Firewall on Windows 11 hosts.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Applies a stricter inbound posture for one or more profiles (Domain, Private, Public).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Can keep outbound traffic permissive for everyday use or tighten it if you choose.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Creates a backup of your existing firewall policy before changes are applied.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Writes new rules and profile settings that match your selections in the assistant.</span>
                  </li>
                </ul>
                <p className="text-xs text-slate-500 mb-4">
                  The script focuses on host firewall behavior at the Windows endpoint. It does not change router settings, group policies, or third-party endpoint security tools. It also does not talk to the internet or pull additional content at runtime.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Default-deny inbound</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Profile-aware rules</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Optional service exceptions</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Backup and rollback logic</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Readable PowerShell, no magic</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Audience</div>
                <h2 className="text-2xl font-bold mb-4">Who this tool is for (and when to use it)</h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  This assistant is meant for people who want stronger Windows Defender Firewall defaults on Windows 11 devices they own or directly manage, without relying solely on the built-in wizard or scattered rule changes over time.
                </p>

                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3 text-cyan-400">Good fit</h3>
                  <ul className="space-y-2 text-slate-400">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Home lab builders hardening a small number of Windows 11 desktops or laptops.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Small business owners securing staff PCs that are not centrally managed.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Admins who want a readable script they can version-control and re-run after rebuilds.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Privacy and security enthusiasts who want a known, repeatable firewall baseline.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-3 text-cyan-400">Use with caution</h3>
                  <ul className="space-y-2 text-slate-400 mb-3">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Corporate or school-owned laptops that already receive firewall rules via GPO or MDM.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Systems running legacy applications that expect loose or custom firewall behavior.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Shared household machines where others depend on apps that open network ports.</span>
                    </li>
                  </ul>
                  <p className="text-xs text-yellow-400">
                    <strong>Never</strong> bypass existing organizational policies, configuration baselines, or change-control processes with this script. Treat it as a helper for systems you are responsible for and are allowed to configure.
                  </p>
                </div>
              </div>
            </div>

            {/* How it works and safety */}
            <div className="mb-8">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">How it works and how to run it</div>
              <h2 className="text-2xl font-bold mb-4">How to use the generated PowerShell script safely</h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                The assistant itself runs entirely in your browser. When you click <strong className="text-slate-300">Generate script</strong>, it assembles a PowerShell script locally based on your selections. You can copy, download, or paste that script into your editor before running anything on a live system.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">Before you run the script</h3>
                  <ul className="space-y-2 text-slate-400 mb-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Use this only on Windows 11 systems that you own or are explicitly allowed to manage.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Create a full backup or at least a restore point on a test machine.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Generate the script and read the comments above each block of firewall changes.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Remove any sections that do not fit your environment, risk tolerance, or compliance needs.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Plan to start with a non-critical test device before touching anything important.</span>
                    </li>
                  </ul>
                  <p className="text-xs text-slate-500">
                    The script adjusts Windows Defender Firewall configuration and rules. It is not aware of Group Policy Objects (GPOs), MDM policies, or third-party firewall agents that may override or conflict with its changes.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">Running and rolling back</h3>
                  <ul className="space-y-2 text-slate-400 mb-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Save the script as a file such as <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">firewall-baseline-win11.ps1</code>.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Open PowerShell as Administrator on the Windows 11 device.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Review the usage comments at the top of the script.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Run something like <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">.\firewall-baseline-win11.ps1 apply</code> to create a backup and apply the selected baseline.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Run something like <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">.\firewall-baseline-win11.ps1 rollback</code> to restore the most recent firewall backup the script created.</span>
                    </li>
                  </ul>
                  <p className="text-xs text-slate-500">
                    The rollback logic only restores backups created by this script. It will not reverse other firewall changes made by hand, by other tools, or by domain policies.
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-6">
                Over time, you can refine the generated script into a reusable baseline for your environment, commit it to version control, and treat it as part of your broader configuration-as-code approach. If you later adopt centralized management, the same ideas can be translated into GPOs, MDM profiles, or configuration templates.
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
                    This assistant runs entirely in your browser. Your selections and the generated PowerShell script are not sent to CyberLife Coach, to Microsoft, or to any third party. The output is a generic starting point and is provided for educational and informational use only. It is not a substitute for professional advice, does not guarantee compliance with any standard, and is used at your own risk.
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    Always test in a safe environment, verify every line, and ensure you have reliable backups before making changes. Do not apply these settings to employer or school managed devices without explicit approval, and do not bypass existing GPOs, MDM profiles, or enterprise change-control processes.
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
