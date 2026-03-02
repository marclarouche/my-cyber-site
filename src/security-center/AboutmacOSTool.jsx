import React from 'react';
import { Shield, ArrowLeft, Printer } from 'lucide-react';

export default function AboutmacOSTool() {
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
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">About this tool</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">macOS (local device)</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Security Baseline Script Assistant</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About macOS Secure Setup Tool
          </h1>
          
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            This page explains what the assistant does, who it is for, and how to use the generated bash script safely alongside your own backups, MDM policies, and macOS hardening plans.
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
                href="/security-center/about-macos-tool"
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <Shield className="w-5 h-5" />
                <span>Open macOS Secure Setup</span>
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
            <h2 className="text-2xl font-bold mb-4">What this assistant is designed to do</h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              The macOS Secure Setup helps you turn individual DISA STIG-inspired controls into a single, readable bash script. You choose which critical and medium severity items to include, then the tool builds a script that combines native commands, safe local checks, and clearly marked manual steps you can follow in Terminal on Macs you manage.
            </p>

            {/* Two Column Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-3 text-cyan-400">Who it is for</h3>
                <ul className="space-y-2 text-slate-400">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Mac owners who want stronger defaults on personal or lab systems.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Small teams that need a repeatable baseline for a handful of macOS devices.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Admins and homelab builders who prefer plain bash over heavy management stacks.</span>
                  </li>
                </ul>
                <p className="text-xs text-slate-500 mt-3">
                  The tool does not push changes remotely. It simply generates a script you can review, edit, and run yourself from a root or <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">sudo</code>-enabled shell.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-cyan-400">What the script includes</h3>
                <ul className="space-y-2 text-slate-400">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Controls grouped by severity and impact, including SSH, FileVault, SIP, and service hardening.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Comments that explain each section in plain language before any command runs.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Manual-only items that appear as clearly labelled guidance and checklists inside the script.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>A simple "pre / post" JSON snapshot under <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">/usr/local/CyberLifeCoach/Reports/MacOSBaseline</code> so you can track what was selected on each run.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Profiles Section */}
            <h3 className="text-xl font-bold mb-3 text-cyan-400">How profiles work (Relaxed, Strict, Custom)</h3>
            <p className="text-slate-400 leading-relaxed mb-8">
              When you use the main assistant page you can choose between Relaxed, Strict, and Custom profiles. Relaxed focuses on safer changes that rarely affect everyday apps. Strict layers on stronger SSH and network service controls that can impact legacy workflows. Custom lets you hand-pick each STIG control so you can align the script with your own risk tolerance and MDM configuration.
            </p>

            {/* How to Use Section */}
            <h3 className="text-xl font-bold mb-3 text-cyan-400">How to use it in a safe workflow</h3>
            <ul className="space-y-2 text-slate-400 mb-8">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Generate the script from the main assistant and save it as <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">macos-baseline.sh</code>.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Read through every section, especially SSH, SMB, web server, and crypto-tightening items.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Create a Time Machine backup, snapshot, or image before making any changes.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Test on a non-critical Mac first from Terminal using <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">sudo bash ./macos-baseline.sh apply</code>, and review the output carefully.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>If you need to undo changes that support rollback, run <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">sudo bash ./macos-baseline.sh rollback</code> on the same system.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>After you are comfortable with the effect of each control, decide which pieces should move into configuration profiles or MDM policies for long-term enforcement.</span>
              </li>
            </ul>

            {/* Pre/Post Reporting Section */}
            <h3 className="text-xl font-bold mb-3 text-cyan-400">How the "pre / post" reporting works</h3>
            <p className="text-slate-400 leading-relaxed mb-3">
              Each time you run the script with the <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">apply</code> option, it writes a small JSON file under <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">/usr/local/CyberLifeCoach/Reports/MacOSBaseline</code>. The report records the date, hostname, macOS version, selected profile label, and which controls were chosen before and after changes. This gives you a simple local audit trail you can pair with your own images, configuration backups, and change log notes.
            </p>
            <p className="text-xs text-slate-500 mb-8">
              These reports stay on the Mac where you run the script. They are not transmitted to CyberLife Coach or to any third party.
            </p>

            {/* Command Basics Section */}
            <h3 className="text-xl font-bold mb-3 text-cyan-400">Command basics</h3>
            <p className="text-slate-400 leading-relaxed mb-3">
              The generated script is written in bash and is intended to run from Terminal on macOS. By default you can execute it using:
            </p>
            <ul className="space-y-2 text-slate-400 mb-3">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">sudo bash ./macos-baseline.sh apply</code> to record a snapshot and apply selected controls.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">sudo bash ./macos-baseline.sh rollback</code> to run the rollback block where it exists.</span>
              </li>
            </ul>
            <p className="text-slate-400 leading-relaxed mb-8">
              If you prefer to run it as a direct executable, mark it as executable first with <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">chmod +x macos-baseline.sh</code> and then call it from a root or <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">sudo</code>-enabled shell.
            </p>

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
                    This assistant and the generated bash script run entirely on your local device. Your selections and output are not sent to CyberLife Coach, to any server, or to any third party. The script is a generic starting point based on macOS hardening ideas and public DISA STIG guidance and is provided for educational and informational use only. It is not tailored to your specific environment and does not guarantee compliance with NIST, CIS Benchmarks, DISA STIGs, or any other framework, and it carries no warranty or guarantee.
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    You are responsible for reviewing, testing, and validating every line before use. Always create reliable backups, test in a non-critical environment, and confirm you are authorized to make changes on any systems you manage. Do not apply these settings to employer, school, or MDM-managed devices without explicit written approval from the appropriate owner or administrator, and never bypass your organization's official profiles or management controls.
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
