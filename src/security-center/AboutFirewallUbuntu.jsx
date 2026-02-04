import React from 'react';
import { Shield, ArrowLeft, Printer } from 'lucide-react';

export default function AboutFirewallUbuntu() {
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
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Ubuntu (local device)</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">UFW Firewall Baseline Script Assistant</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Ubuntu UFW Firewall Baseline Script Assistant
          </h1>
          
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            This page explains what the UFW firewall assistant does, who it is for, and how to use the generated bash script safely on Ubuntu systems you manage. It is designed for people who want a repeatable, default-deny host firewall baseline using UFW, without remembering every command by hand.
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
                href="/security-center/firewall-hardening-hub/firewall-baseline-ubuntu"
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <Shield className="w-5 h-5" />
                <span>Open Ubuntu UFW Firewall Assistant</span>
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
                <h2 className="text-2xl font-bold mb-4">What this UFW firewall baseline actually builds</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  The Ubuntu UFW Firewall Baseline Script Assistant helps you turn a small set of practical choices into a single bash script. You select whether to include additional service rules, and the tool generates a script that:
                </p>
                <ul className="space-y-2 text-slate-400 mb-4">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Targets Ubuntu's built-in UFW front-end to <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">iptables</code>.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Sets a default policy of <strong className="text-slate-300">deny incoming</strong> and <strong className="text-slate-300">allow outgoing</strong>.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Applies only the extra rules you chose for SSH, HTTP/HTTPS, Samba, or VNC.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Creates a timestamped backup of your existing UFW configuration before changes.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Provides a rollback option that restores the most recent backup and reloads UFW.</span>
                  </li>
                </ul>
                <p className="text-xs text-slate-500 mb-4">
                  The script focuses on <strong className="text-slate-400">host firewall behavior</strong> on that Ubuntu machine. It does not modify your router, cloud security groups, or other network devices. It also does not contact any external services.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Deny incoming by default</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Allow outgoing by default</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Optional SSH / web / Samba / VNC rules</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Backup + rollback of /etc/ufw</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Audience</div>
                <h2 className="text-2xl font-bold mb-4">Who this tool is for (and when to use it)</h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  This assistant is meant for people who want a clear, documented UFW baseline on Ubuntu systems they control, particularly when those machines are used as desktops, home servers, or small-business hosts.
                </p>

                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3 text-cyan-400">Good fit</h3>
                  <ul className="space-y-2 text-slate-400">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Home users locking down a workstation or always-on Ubuntu box.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Developers running local services who still want a default-deny inbound firewall.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Small business owners securing a simple self-hosted service or internal VM.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Privacy-focused users who want a baseline UFW script they can re-run after rebuilds.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-3 text-cyan-400">Use with caution</h3>
                  <ul className="space-y-2 text-slate-400 mb-3">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Production servers with complex firewall requirements or change-control processes.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Environments already managed by configuration management, Ansible, or cloud firewalls.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Systems where other admins expect to maintain manual control of UFW rules.</span>
                    </li>
                  </ul>
                  <p className="text-xs text-yellow-400">
                    <strong>Never</strong> bypass existing organizational policies, firewall change boards, or infrastructure-as-code pipelines with this script. Treat it as a helper for systems you are responsible for and allowed to configure.
                  </p>
                </div>
              </div>
            </div>

            {/* How it works and safety */}
            <div className="mb-8">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">How it works and how to run it</div>
              <h2 className="text-2xl font-bold mb-4">How to use the generated bash script safely on Ubuntu</h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                The assistant itself runs entirely in your browser. When you click <strong className="text-slate-300">Generate script</strong>, it assembles a bash script locally based on your selections. You can copy, download, or paste that script into your editor before running anything on a live system.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">Before you run the script</h3>
                  <ul className="space-y-2 text-slate-400 mb-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Use this only on Ubuntu systems that you own or are explicitly allowed to manage.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Confirm that UFW is installed and that you are comfortable managing it via the command line.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Generate the script and read the comments, especially around backup and rollback behavior.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Make sure you really need any optional service rules before enabling them.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Plan to test on a non-critical host or VM before applying changes to anything important.</span>
                    </li>
                  </ul>
                  <p className="text-xs text-slate-500">
                    The script creates compressed backups of <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">/etc/ufw</code> under a dedicated directory such as <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">/var/backups/ufw-baseline</code> before applying your selected baseline. Those backups are what the rollback routine uses.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">Running and rolling back</h3>
                  <ul className="space-y-2 text-slate-400 mb-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Save the script as something like <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">firewall-baseline-ubuntu.sh</code>.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>From a terminal on the Ubuntu host, mark it executable with <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">chmod +x firewall-baseline-ubuntu.sh</code>.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>To create a backup and apply the UFW baseline, run <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">sudo ./firewall-baseline-ubuntu.sh apply</code>.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>To restore the most recent backup and reload UFW, run <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">sudo ./firewall-baseline-ubuntu.sh rollback</code>.</span>
                    </li>
                  </ul>
                  <p className="text-xs text-slate-500">
                    The rollback function only restores UFW configuration backups created by this script. It does not undo firewall rules added afterwards, nor does it touch router rules, cloud firewalls, or other hosts.
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-6">
                Over time, you can refine the generated script into your own reusable baseline, check it into version control, and pair it with other automation tools. If you move to a fully automated infrastructure stack later, the same UFW logic can be translated into Ansible, Terraform user data, or cloud-init templates.
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
                    This assistant runs entirely in your browser. Your selections and the generated bash script are not sent to CyberLife Coach, to Canonical, or to any third party. The output is a generic starting point and is provided for educational and informational use only. It is not a substitute for professional advice, does not guarantee compliance with any standard, and is used at your own risk.
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    Always test in a safe environment, verify every line, and ensure you have reliable backups before making changes. Do not apply these settings to employer or school managed systems without explicit approval, and do not bypass existing firewall policies, infrastructure-as-code pipelines, or enterprise change-control processes.
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
