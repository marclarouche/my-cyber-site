import React from 'react';
import { Shield, ArrowLeft, Printer } from 'lucide-react';

export default function AboutOffice365Tool() {
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
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">About this baseline tool</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Office 365 (Office 2016 / 16.0 policy paths)</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Local, in-browser helper</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About Office 365 Lockdown
          </h1>
          
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            This page explains what the Office 365 Baseline Script Assistant does, which controls it touches, and how to use the generated PowerShell script safely on Windows systems that run Office 2016 style Microsoft 365 Apps. The assistant builds a single script with <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">Invoke-O365Baseline</code> and <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">Invoke-O365BaselineRollback</code> functions so you can apply and attempt to undo its changes in a controlled way.
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
                href="/security-center/office365-lockdown-tool"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <Shield className="w-5 h-5" />
                <span>Open Office 365 Lockdown</span>
              </a>
              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold border border-slate-700 hover:border-cyan-500 transition-all hover:bg-slate-800"
              >
                <Printer className="w-5 h-5" />
                <span>Print this page</span>
              </button>
            </div>

            {/* Two Column Grid - Overview and Quick Start */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Overview</div>
                <h2 className="text-2xl font-bold mb-4">What this assistant is designed to do</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  The Office 365 Baseline Script Assistant is a local-only helper that builds a PowerShell script for registry based Office hardening. It follows a STIG style approach and focuses on protections that are useful for home users, solo professionals, and small environments.
                </p>
                <ul className="space-y-2 text-slate-400 mb-4">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Targets Office 16.0 policy registry paths for Microsoft 365 Apps on Windows.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Lets you pick individual controls or start from Relaxed, Strict, or Custom profiles.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Builds one script that you can review, version, and run on your own schedule.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Includes a companion rollback function that attempts to remove keys the script created.</span>
                  </li>
                </ul>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Macros and VBA safety</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Legacy IE and ActiveX protections</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Privacy and connected experiences</span>
                </div>

                <p className="text-slate-400 leading-relaxed text-sm">
                  Nothing is sent back to CyberLife Coach, to Microsoft, or to any third party. All selection logic and script generation happens in your browser tab.
                </p>
              </div>

              <div>
                <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Quick start</div>
                <h2 className="text-2xl font-bold mb-4">How to use the generated script</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  The assistant produces a complete script that defines <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">Invoke-O365Baseline</code> and <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">Invoke-O365BaselineRollback</code>. You decide when to run either function.
                </p>
                <ul className="space-y-2 text-slate-400 mb-4">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Open the tool, choose Relaxed, Strict, or Custom, then select the controls you want.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Select "Generate PowerShell script" and copy or download the output.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Save it as a file, for example <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">office365-baseline.ps1</code>.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Right click PowerShell, choose "Run as administrator," then run: <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">.\office365-baseline.ps1</code></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Apply the controls when you are ready by running: <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">Invoke-O365Baseline</code></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>If you need to undo what this script did for supported keys, run: <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">Invoke-O365BaselineRollback</code></span>
                  </li>
                </ul>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Always test on a non critical machine first and take a snapshot or backup of your configuration before you make changes in a production environment.
                </p>
              </div>
            </div>

            {/* Included controls section */}
            <div className="mb-8">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Included controls</div>
              <h2 className="text-2xl font-bold mb-4">Which protections this baseline can enforce</h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                The assistant focuses on a concise set of registry based controls that are broadly useful for individuals and small environments. The exact registry blocks are visible inside the generated script so you can adjust, comment, or extend them.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">Relaxed profile</h3>
                  <ul className="space-y-2 text-slate-400 mb-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Blocks macros in Office files from the Internet for Access.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Enables VBA macro runtime scanning for all documents so AV has better context.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Requires digitally signed macros in Excel by setting <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">vbawarnings = 3</code>.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Disables connected experiences that automatically download online content.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Disables additional optional connected experiences for better privacy posture.</span>
                    </li>
                  </ul>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    Relaxed is designed as a sensible baseline for most home users and solo professionals, since it adds meaningful protection while keeping core Office functions usable.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">Strict profile</h3>
                  <ul className="space-y-2 text-slate-400 mb-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Includes everything in Relaxed.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Turns on Local Machine Zone lockdown for common Office executables.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Enables object caching protection for Office when hosted by IE components.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Enables zone elevation protection to reduce silent jumps between zones.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Restricts ActiveX installation in Office host contexts.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Enforces scripted window security restrictions to reduce spoofing risk.</span>
                    </li>
                  </ul>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    Strict is aimed at hardened builds where legacy intranet apps and older ActiveX based add-ins are either not used or can be safely retired.
                  </p>
                </div>
              </div>
            </div>

            {/* Safe use and boundaries */}
            <div className="mb-8">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Safe use and boundaries</div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">Before you roll this out widely</h3>
                  <ul className="space-y-2 text-slate-400">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Confirm that you are allowed to modify Office policy keys on the devices in scope.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Export relevant registry branches or take a full system backup before testing.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Read through the generated script so every registry path and value makes sense.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Check for overlap with existing Group Policy or MDM baselines from your employer.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Apply and evaluate on a single, non critical machine before using it anywhere else.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">Good next steps</h3>
                  <ul className="space-y-2 text-slate-400">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Store your adjusted baseline script in version control or a secure admin repository.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Document which controls you enabled, why you chose them, and how to reverse them.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Revisit this baseline whenever your Office channel, add ins, or browser integrations change.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Pair this Office hardening with host baselines such as Windows 11, browser, and firewall tools.</span>
                    </li>
                  </ul>
                </div>
              </div>
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
                  <p className="text-sm text-slate-300 leading-relaxed">
                    This assistant and the generated script are provided for educational and informational use only. They do not replace professional advice and they do not guarantee compliance with DISA STIGs, NIST CSF, or any other framework. All logic runs locally in your browser and the output script stays on your system, yet you are fully responsible for how you use it. Always test in a safe environment, verify every line, and make sure you have reliable backups and recovery plans before applying changes. Do not run this baseline on employer or school managed devices without explicit written approval from whoever owns those environments.
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
