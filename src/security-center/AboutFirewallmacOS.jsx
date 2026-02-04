import React from 'react';
import { Shield, ArrowLeft, Printer } from 'lucide-react';

export default function AboutFirewallMacOS() {
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
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">macOS (local device)</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">macOS Firewall Baseline Script Assistant</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            macOS Firewall Baseline Script Assistant
          </h1>
          
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            This page explains what the macOS firewall assistant does, how it relates to DISA STIG-style expectations, and how to use the generated bash script safely on Macs you manage. It is designed for people who want a repeatable, default-deny firewall baseline without clicking through every panel in System Settings.
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
                href="/security-center/firewall-hardening-hub/firewall-baseline-macos"
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <Shield className="w-5 h-5" />
                <span>Open macOS Firewall Baseline Assistant</span>
              </a>
              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold border border-slate-700 hover:border-cyan-500 transition-all hover:bg-slate-800"
              >
                <Printer className="w-5 h-5" />
                <span>Print this page</span>
              </button>
            </div>

            {/* What this assistant does */}
            <div className="mb-8">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">What this assistant does</div>
              <h2 className="text-2xl font-bold mb-4">Harden the built-in macOS Application Firewall with a STIG-style baseline</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                The macOS Firewall Baseline Script Assistant generates a bash script (<code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">macos_firewall_stig.sh</code>) that configures the native Application Firewall in a way that mirrors typical DISA STIG expectations for a host firewall. The script uses Apple's own <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">socketfilterfw</code> tool to apply and verify changes.
              </p>
              <p className="text-slate-400 leading-relaxed mb-4">
                Instead of manually toggling settings in System Settings, you get a repeatable, documented baseline you can re-run after OS upgrades, new Mac setups, or when you need to confirm that strict controls are still in place.
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Backs up current firewall plist</span>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Enables Application Firewall</span>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Default-deny inbound ("block all")</span>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Stealth mode and logging on</span>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Disables auto-allow for signed apps</span>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Rollback from timestamped backups</span>
              </div>

              <p className="text-xs text-slate-500">
                The assistant focuses on the built-in <strong className="text-slate-400">Application Firewall</strong> configuration under <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">/Library/Preferences/com.apple.alf</code>. It does not configure your router, Wi-Fi access point, or any third-party firewall products.
              </p>
            </div>

            {/* Who this is for */}
            <div className="mb-8">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Who this is for</div>
              <h2 className="text-2xl font-bold mb-4">Good fit and situations where extra care is needed</h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                A STIG-style firewall can be a significant change compared to macOS defaults, especially the default-deny inbound posture. It is important to be sure this aligns with how you actually use the Mac.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">Good fit</h3>
                  <ul className="space-y-2 text-slate-400">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Home users who want a strict host firewall on laptops and desktops they control.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Privacy-conscious users who want a default-deny inbound posture, even on home networks.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Admins hardening standalone Macs that do not host inbound services such as file shares.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Small teams using Macs as workstations behind a router or VPN, not as servers.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">Use with caution</h3>
                  <ul className="space-y-2 text-slate-400 mb-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Shared Macs where other people expect AirDrop, file sharing, or remote access to work normally.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Systems that act as servers for file sharing, remote desktop, or development stacks.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Devices managed by MDM, configuration profiles, or enterprise change-control processes.</span>
                    </li>
                  </ul>
                  <p className="text-xs text-yellow-400">
                    <strong>Never</strong> bypass existing organizational policies, MDM profiles, or STIG baselines with this script. Treat it as a helper for Macs you are responsible for and allowed to configure.
                  </p>
                </div>
              </div>
            </div>

            {/* How it works and safety */}
            <div className="mb-8">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">How it works and how to run it</div>
              <h2 className="text-2xl font-bold mb-4">How the generated bash script behaves</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                The assistant itself runs entirely in your browser. When you use the macOS firewall tool, it assembles a bash script locally based on the fixed STIG-style controls shown. You can copy, download, or paste that script into your editor before running anything.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6">
                The script is intentionally explicit, comments each major step, and implements both a backup-and-apply path as well as a rollback path that restores the most recent backup of the firewall preferences plist.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">Before you run the script</h3>
                  <ul className="space-y-2 text-slate-400 mb-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Use this only on Macs that you own or are explicitly allowed to manage.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Make sure you understand that <strong className="text-slate-300">block all incoming</strong> stops unsolicited inbound traffic.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Review the script content, especially the comments about backups and warnings about strict mode.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Plan to test on a non-critical Mac before applying it to daily-driver systems.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Note that this script does not manage pf rules, VPNs, or router-level firewalls.</span>
                    </li>
                  </ul>
                  <p className="text-xs text-slate-500">
                    The script exports the current <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">com.apple.alf</code> configuration from <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">/Library/Preferences</code> into a timestamped backup under <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">/usr/local/macos-firewall-backups</code> before applying hardened settings.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">Running and rolling back</h3>
                  <ul className="space-y-2 text-slate-400 mb-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Save the generated script as something like <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">macos_firewall_stig.sh</code>.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>From Terminal, mark it executable with <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">chmod +x macos_firewall_stig.sh</code>.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>To apply the hardened baseline and create a new backup, run <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">sudo ./macos_firewall_stig.sh apply</code>.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>To restore the most recent backup and restart the firewall service, run <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">sudo ./macos_firewall_stig.sh rollback</code>.</span>
                    </li>
                  </ul>
                  <p className="text-xs text-slate-500">
                    The rollback function restores the latest backup created by this script in <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">/usr/local/macos-firewall-backups</code>. It does not change other system settings, network services, or router configurations.
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-6">
                Because the baseline enforces a default-deny inbound policy and enables stealth mode, some features such as inbound file sharing, screen sharing, or certain AirDrop scenarios may stop working until you adjust exceptions in the macOS firewall UI or change the baseline.
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
                    This assistant runs entirely in your browser. Your selections and the generated bash script are not sent to CyberLife Coach, to Apple, or to any third party. The output is a generic starting point and is provided for educational and informational use only. It is not a substitute for professional advice, does not claim to be an official DISA STIG implementation, and is used at your own risk.
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    Always test in a safe environment, verify every line, and ensure you have reliable backups before making changes. Do not apply these settings to employer or school managed devices without explicit approval, and do not bypass existing MDM profiles, security baselines, or enterprise change-control processes.
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
