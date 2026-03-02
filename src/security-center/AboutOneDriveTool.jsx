import React from 'react';
import { Shield, ArrowLeft, Printer } from 'lucide-react';

export default function AboutOnedriveTool() {
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
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">OneDrive (local baseline)</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Security Baseline Script Assistant</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
             About OneDrive Lockdown
          </h1>
          
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            This page explains what the assistant does, who it is for, and how to use the generated PowerShell script safely alongside your own backups, storage policies, and OneDrive hardening plans.
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
                href="/security-center/onedrive-lockdown-tool"
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <Shield className="w-5 h-5" />
                <span>Open OneDrive Lockdown </span>
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
              The OneDrive Security Baseline Script Assistant helps you turn a set of OneDrive-related hardening choices into a single, readable PowerShell script. You choose the protections you want, then the tool builds a script that applies safer defaults to the local OneDrive working paths, logs, cache folders, and related sync locations on Windows systems you control.
            </p>

            {/* Two Column Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-3 text-cyan-400">Who it is for</h3>
                <ul className="space-y-2 text-slate-400">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>People who sync sensitive data with OneDrive and want stronger local defaults on Windows systems.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Small teams that keep project folders mirrored to OneDrive from Windows 11 devices.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>IT admins and homelab builders who prefer readable PowerShell scripts to manage permissions and layouts.</span>
                  </li>
                </ul>
                <p className="text-xs text-slate-500 mt-3">
                  The tool does not log in to your OneDrive account or change cloud settings. It only touches local paths and configuration files you point it at, using PowerShell and standard Windows utilities.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-cyan-400">What the script includes</h3>
                <ul className="space-y-2 text-slate-400">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Options to tighten permissions on OneDrive sync folders and working directories.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Safer defaults for logs and cache locations where that makes sense for your setup.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Clearly marked manual steps for account-level changes like MFA and sign-in alerts.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>A simple "pre / post" JSON snapshot under <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">C:\SecurityTools\Reports\OneDriveBaseline</code> so you can track what was selected on each run.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* How profiles work */}
            <h3 className="text-xl font-bold mb-3 text-cyan-400">How profiles work (Relaxed, Strict, Custom)</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              When you use the main assistant page you can choose Relaxed, Strict, or Custom. Relaxed focuses on safer file system changes that rarely break normal OneDrive syncing. Strict layers on tighter ownership, permission, and logging rules that may affect shared accounts or legacy tooling. Custom lets you hand-pick each control so you can align the script with your own risk tolerance and storage model.
            </p>

            {/* How to Use Section */}
            <h3 className="text-xl font-bold mb-3 text-cyan-400">How to use it in a safe workflow</h3>
            <ul className="space-y-2 text-slate-400 mb-8">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Generate the script from the main assistant and save it as <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">onedrive-baseline.ps1</code>.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Read through every section, especially anything that changes ownership, permissions, or NTFS attributes.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Create a full backup or image of the device and OneDrive data before you change anything.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Test on a non-critical Windows system or a small test folder first from an elevated PowerShell session using <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">.\onedrive-baseline.ps1 -Action Apply</code>, and review the output carefully.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>If you need to undo changes that support rollback, run <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">.\onedrive-baseline.ps1 -Action Rollback</code> on the same system.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>After you are comfortable with the effect of each control, decide which pieces belong in your regular backup scripts, scheduled tasks, or Group Policy configurations.</span>
              </li>
            </ul>

            {/* Pre/Post Reporting Section */}
            <h3 className="text-xl font-bold mb-3 text-cyan-400">How the "pre / post" reporting works</h3>
            <p className="text-slate-400 leading-relaxed mb-3">
              Each time you run the script with the <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">-Action Apply</code> parameter, it writes a small JSON file under <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">C:\SecurityTools\Reports\OneDriveBaseline</code>. The report records the date, hostname, OS version, selected profile label, and which controls were chosen before and after changes. This gives you a simple local audit trail you can pair with your own backup logs and change notes.
            </p>
            <p className="text-xs text-slate-500 mb-8">
              These reports stay on the system where you run the script. They are not transmitted to CyberLife Coach, to Microsoft, or to any third party.
            </p>

            {/* Command basics */}
            <h3 className="text-xl font-bold mb-3 text-cyan-400">Command basics</h3>
            <p className="text-slate-400 leading-relaxed mb-3">
              The generated script is written in PowerShell and is intended to run from an elevated PowerShell session on Windows systems where you manage OneDrive-related folders. You can use:
            </p>
            <ul className="space-y-2 text-slate-400 mb-6">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">.\onedrive-baseline.ps1 -Action Apply</code> to record a snapshot and apply your selected controls.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">.\onedrive-baseline.ps1 -Action Rollback</code> to run the rollback block where it exists.</span>
              </li>
            </ul>
            <p className="text-slate-400 leading-relaxed mb-8">
              Run the script from an elevated PowerShell window (Run as Administrator). You may need to adjust your execution policy if you encounter script execution restrictions using <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser</code>.
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
                  <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-3">Important Notice</h4>
                  <p className="text-sm text-slate-300 leading-relaxed mb-3">
                    This assistant and the generated PowerShell script run entirely on your local device. Your selections and output are not sent to CyberLife Coach, to Microsoft, or to any other party. The script is a generic starting point based on common OneDrive hardening ideas and is provided for educational and informational use only. It is not tailored to your specific environment and does not guarantee compliance with any framework or policy, and it carries no warranty or guarantee.
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    You are responsible for reviewing, testing, and validating every line before use. Always create reliable backups, test in a non-critical environment, and confirm you are authorized to make changes on any systems you manage. Do not apply these settings to employer, school, or centrally managed devices without explicit written approval from the appropriate owner or administrator, and never bypass your organization's official storage and backup controls.
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
