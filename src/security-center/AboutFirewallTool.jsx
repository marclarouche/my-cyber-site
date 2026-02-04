import React from 'react';
import { Shield, ArrowLeft, Printer } from 'lucide-react';

export default function AboutFirewallTool() {
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

            <a href="/security-center" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Security Center</span>
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
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">About this toolkit</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Windows 11 · macOS · Ubuntu</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Firewall Hardening Toolkit</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About Firewall Hardening Hub
          </h1>
          
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            This page explains what the Firewall Hardening Tool does, how the Windows 11, macOS, and Ubuntu assistants work together, and how to use the generated scripts safely on systems you manage. It is a companion to the main toolkit page that lists each firewall baseline card.
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
                href="/security-center/firewall-hardening-hub"
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <Shield className="w-5 h-5" />
                <span>Open Firewall Hardening hub</span>
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
                <h2 className="text-2xl font-bold mb-4">What the Firewall Hardening Toolkit actually builds</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  The Firewall Hardening Toolkit brings three host firewall assistants into one place. Each assistant generates a script that applies a clear, repeatable baseline for a specific platform.
                </p>
                <p className="text-slate-400 leading-relaxed mb-4">
                  You choose Windows 11, macOS, or Ubuntu. The toolkit then opens a matching assistant that builds a script tailored to that platform's native firewall:
                </p>
                <ul className="space-y-2 text-slate-400 mb-4">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span><strong>Windows 11:</strong> PowerShell script for Windows Defender Firewall.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span><strong>macOS:</strong> bash script for the built in Application Firewall using <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">socketfilterfw</code>.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span><strong>Ubuntu:</strong> bash script for UFW, the uncomplicated firewall front end to <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">iptables</code>.</span>
                  </li>
                </ul>
                <p className="text-xs text-slate-500 mb-4">
                  In every case, the focus stays on <strong className="text-slate-400">host firewall controls</strong> at the operating system boundary. The toolkit does not change your router, cloud security groups, or hardware firewalls.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Desktop firewall baselines</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Windows 11 · macOS · Ubuntu</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Backup and rollback aware</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Local only, no telemetry</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Audience</div>
                <h2 className="text-2xl font-bold mb-4">Who this toolkit is for (and where to be careful)</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  This toolkit is designed for people who want stronger, default-deny style firewall behavior on systems they own or are allowed to manage, without building every rule or command from scratch.
                </p>
                
                <h3 className="text-lg font-bold mb-3 text-cyan-400">Good fit</h3>
                <ul className="space-y-2 text-slate-400 mb-4">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Home users hardening laptops, desktops, or home lab VMs.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Independent professionals managing a handful of workstations themselves.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Small business owners securing a small fleet without full blown central management.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Security minded users who want readable scripts they can version control and refine.</span>
                  </li>
                </ul>

                <h3 className="text-lg font-bold mb-3 text-yellow-400">Use with caution</h3>
                <ul className="space-y-2 text-slate-400 mb-3">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Corporate or school devices already governed by GPO, MDM, or other baselines.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Production servers with complex firewall rules and formal change-control processes.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Shared machines where other people rely on inbound services such as file sharing or remote access.</span>
                  </li>
                </ul>
                <p className="text-xs text-yellow-400/80 bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3">
                  <strong className="text-yellow-400">Never</strong> bypass organizational policies, device management profiles, or firewall change boards with these scripts. Treat this toolkit as a helper for systems you are responsible for and explicitly allowed to configure.
                </p>
              </div>
            </div>

            {/* How it works section */}
            <div className="mb-8">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">How it works</div>
              <h2 className="text-2xl font-bold mb-4">How the firewall assistants generate and apply their scripts</h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                The Firewall Hardening Toolkit runs entirely in your browser. When you follow a card into one of the assistants and click a button such as <strong className="text-slate-300">Generate script</strong>, the tool assembles its output locally in the page. You can copy, download, or review the script before running anything.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">Windows 11 firewall assistant</h3>
                  <ul className="space-y-2 text-slate-400 mb-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Generates a PowerShell script for Windows Defender Firewall that enforces a stricter inbound posture and can preserve more permissive outbound defaults if you choose.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Typically saves as something like <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">firewall-baseline-win11.ps1</code>.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>You run it from an elevated PowerShell window and use commands such as <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">.\firewall-baseline-win11.ps1 apply</code> to create a backup and apply the baseline.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>When you need to undo changes created by the script, you use <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">.\firewall-baseline-win11.ps1 rollback</code> to restore the most recent backup the script created.</span>
                    </li>
                  </ul>
                  <p className="text-xs text-slate-500">
                    The assistant does not override Group Policy or MDM rules. If those are present, they may win over the settings in the script.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">macOS and Ubuntu firewall assistants</h3>
                  <ul className="space-y-2 text-slate-400 mb-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>The macOS assistant generates a bash script such as <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">macos_firewall_stig.sh</code> that uses <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">socketfilterfw</code> to enable the Application Firewall, set a default deny inbound posture, toggle stealth mode, and control logging.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>You typically mark it executable with <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">chmod +x macos_firewall_stig.sh</code> and apply the baseline with <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">sudo ./macos_firewall_stig.sh apply</code>. Rollback uses <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">sudo ./macos_firewall_stig.sh rollback</code>.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>The Ubuntu assistant generates a bash script such as <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">firewall-baseline-ubuntu.sh</code> that sets UFW to deny incoming, allow outgoing, and optionally add rules for SSH, HTTP/HTTPS, Samba, or VNC.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>You mark it executable with <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">chmod +x firewall-baseline-ubuntu.sh</code>, then run <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">sudo ./firewall-baseline-ubuntu.sh apply</code> to create a backup and apply the baseline and <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">sudo ./firewall-baseline-ubuntu.sh rollback</code> to restore the latest backup.</span>
                    </li>
                  </ul>
                  <p className="text-xs text-slate-500">
                    On both macOS and Ubuntu, rollback routines only affect the firewall configuration they backed up. They do not modify unrelated system settings, router rules, or cloud firewalls.
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-6">
                Across all three platforms, the intent is the same. The toolkit helps you move from one time changes in graphical interfaces toward documented, scriptable baselines. You stay in control of when, where, and how those baselines are applied.
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
                    This Firewall Hardening Toolkit and its companion pages run entirely in your browser. Your selections and the generated scripts are not sent to CyberLife Coach, to operating system vendors, or to any third party. The output is a generic starting point for host firewall security controls and is provided for educational and informational use only. It is not a substitute for professional advice and does not guarantee compliance with any standard or policy.
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
