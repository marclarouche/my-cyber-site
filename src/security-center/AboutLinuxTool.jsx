import React from 'react';
import { Shield, ArrowLeft, Printer } from 'lucide-react';

export default function AboutLinuxTool() {
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
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Local, browser based helper</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Linux OS Baseline</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Ubuntu 24.04 STIG inspired</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the Linux OS Secure Setup Tool
          </h1>
          
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            This page explains how the Linux OS Secure Setup Tool works, how the Relaxed, Strict, and Custom profiles are put together, and how to use the generated shell script safely on Ubuntu systems.
          </p>
          
          <p className="text-base text-slate-500 max-w-4xl leading-relaxed">
            The Linux OS Baseline Assistant focuses on a practical subset of Ubuntu 24.04 LTS STIG inspired controls for small environments. It does not implement the full STIG and it does not guarantee compliance with any standard. The output is a structured script template with human readable hints, designed to help you review, prioritize, and document Linux hardening work.
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
                href="/security-center/linux-secure-setup"
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <Shield className="w-5 h-5" />
                <span>Open Linux Secure Setup </span>
              </a>
              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold border border-slate-700 hover:border-cyan-500 transition-all hover:bg-slate-800"
              >
                <Printer className="w-5 h-5" />
                <span>Print this page</span>
              </button>
            </div>

            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Overview</div>
            <h2 className="text-2xl font-bold mb-4">What this tool actually does</h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              The Linux OS Baseline Assistant builds a checklist style hardening script for Ubuntu 24.04 LTS using a curated set of STIG inspired controls. You choose a profile, fine tune the individual controls, then generate a shell script that you can adapt for your environment.
            </p>
            <p className="text-slate-500 leading-relaxed mb-8 text-sm">
              Instead of applying changes silently, the assistant writes clearly commented blocks for each selected control. Each block includes a short hint such as <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">apt-get remove --purge telnet</code> rather than forcing a specific configuration on your systems.
            </p>

            {/* Two Column Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Relaxed, Strict, and Custom in plain language</h2>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold uppercase tracking-wider">Relaxed</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-semibold uppercase tracking-wider">Strict</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-semibold uppercase tracking-wider">Custom</span>
                </div>

                <h3 className="text-lg font-bold mb-2 text-cyan-400">Relaxed profile</h3>
                <p className="text-slate-400 leading-relaxed mb-3">
                  Relaxed turns on foundational hardening that almost every small business can live with. It focuses on removing legacy services, enforcing basic authentication rules, enabling host firewall and file integrity, and tightening obvious gaps without being aggressive.
                </p>
                <ul className="space-y-2 text-slate-400 mb-4">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Removes unsafe remote tools such as telnet and rsh in favor of SSH.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Blocks blank passwords and null passwords at the PAM level.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Encourages host firewall and file integrity tools like <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">ufw</code> and AIDE.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Sets sensible session timeouts and uses strong password hashing by default.</span>
                  </li>
                </ul>

                <h3 className="text-lg font-bold mb-2 text-cyan-400">Strict profile</h3>
                <p className="text-slate-400 leading-relaxed mb-3">
                  Strict adds opinionated security controls that can change how systems behave. It is better suited for teams that are chasing formal compliance or that have time to test and adjust crypto, PAM, and kernel settings.
                </p>
                <ul className="space-y-2 text-slate-400 mb-4">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Introduces FIPS aligned cryptography planning and SSH cipher tightening.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Applies stronger controls on PAM caching and network session idle timeouts.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Further restricts kernel visibility, for example access to the message buffer.</span>
                  </li>
                </ul>

                <h3 className="text-lg font-bold mb-2 text-cyan-400">Custom profile</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Custom leaves the decisions to you. You can start from Relaxed or Strict, adjust any individual control, then regenerate the script. This is the right choice when you already know which controls fit your workloads and which ones need to stay off.
                </p>

                <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
                  <p className="text-sm text-slate-300 leading-relaxed">
                    <strong className="text-cyan-400">Short version.</strong> Relaxed is "secure by default for most small shops". Strict is "turn the hardening up and accept more testing". Custom is "you are the auditor, pick what you want".
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">How to use the generated script safely</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  When you click Generate script the assistant writes a shell script template and suggests a filename such as <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">ubuntu-baseline.sh</code>. It is meant to be read, edited, and version controlled before you ever run it on production systems.
                </p>

                <h3 className="text-lg font-bold mb-3 text-cyan-400">Basic workflow</h3>
                <ul className="space-y-2 text-slate-400 mb-4">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Review every control block, including the comment lines and the <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">Hint</code> text.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Replace or expand the hints with the exact commands you want, for example <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">apt-get install chrony</code> or a complete <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">ufw</code> rule set.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Save the file as <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">ubuntu-baseline.sh</code> and make it executable with <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">chmod +x ubuntu-baseline.sh</code>.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Test it first on a non critical Ubuntu system with <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">sudo ./ubuntu-baseline.sh</code>.</span>
                  </li>
                </ul>

                <h3 className="text-lg font-bold mb-3 text-cyan-400">Rollback thinking</h3>
                <p className="text-slate-400 leading-relaxed mb-3">
                  The assistant does not create a full rollback script for you. In practice you should keep a separate playbook or script with the steps required to reverse changes that can impact users such as firewall rules, SSH crypto options, and PAM behavior.
                </p>
                <p className="text-xs text-slate-500">
                  For more complex environments, consider pairing this baseline with configuration management tools such as Ansible, so you can track changes, roll forward cleanly, and test in stages.
                </p>
              </div>
            </div>

            {/* What this assistant does not do */}
            <h2 className="text-2xl font-bold mb-4">What this assistant does not do</h2>
            <p className="text-slate-400 leading-relaxed mb-3">
              The Linux OS Baseline Assistant is not a full STIG implementation engine and it is not a magic compliance button. It does not pull live data from your systems, it does not enforce patches, and it does not track evidence for audits. It gives you a structured starting point that you can extend with your own commands, documentation, and change management.
            </p>
            <p className="text-slate-500 leading-relaxed mb-8 text-sm">
              The control texts are informed by Ubuntu 24.04 STIG guidance and common audit expectations. Final responsibility for testing, approvals, and compliance still sits with your organization and your auditors.
            </p>

            {/* Disclaimer */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="text-3xl flex-shrink-0">⚠️</div>
                <div>
                  <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-3">Important Notice and Legal Disclaimer</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    This Linux OS Baseline Assistant and its generated scripts are provided for educational and informational use only. They do <strong className="text-yellow-200">not</strong> replace formal STIG implementation guidance, vendor documentation, or professional services, and they do <strong className="text-yellow-200">not</strong> guarantee compliance with any framework, including STIG, NIST, CIS, PCI DSS, HIPAA, GDPR, or any cyber insurance requirement. All logic runs locally in your browser and any output remains on your systems unless you choose to share or upload it. You are responsible for reviewing, testing, and adapting every line before use, ensuring you have reliable backups, documented rollback steps, change approvals, and an appropriate lab or staging environment before changing production systems.
                  </p>
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
