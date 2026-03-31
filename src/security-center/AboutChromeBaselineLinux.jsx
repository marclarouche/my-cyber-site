import React from 'react';
import { Shield, ArrowLeft, AlertTriangle } from 'lucide-react';

export default function AboutChromeBaselineLinux() {
  const handleOpenTool = () => {
    window.location.href = '/security-center/browser-hardening-hub/chrome-baseline-linux';
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
              Chrome / Chromium on Linux
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Bash baseline script assistant
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Chrome / Chromium Security Baseline Script Assistant for Linux
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            This page explains what the assistant does, who it is for, and how to use the generated bash script
            safely on Linux systems you manage. It helps you create a repeatable Chrome or Chromium hardening
            baseline without manually editing JSON policy files across different distro paths.
          </p>
        </div>
      </section>

      {/* Main Content — two-column cards */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">

          {/* What it does */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Overview</div>
            <h2 className="text-2xl font-bold mb-4">What this Chrome / Chromium baseline assistant actually builds on Linux</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              The Chrome / Chromium Security Baseline Script Assistant for Linux turns a curated set of hardening
              controls into a single bash script you can run with root privileges. You select your distro family,
              choose your controls, and the tool generates a script that:
            </p>
            <ul className="space-y-2 text-slate-400 mb-4">
              <li>• Writes a managed policy JSON file named <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">cyberlifecoach_baseline.json</code> to the correct policy directory for your distro — Chrome at <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">/etc/opt/chrome/policies/managed/</code> and Chromium at the distro-appropriate path.</li>
              <li>• Targets both Chrome and Chromium simultaneously if both are installed on the same system, writing the policy file to each managed directory it finds.</li>
              <li>• Applies privacy and security controls including pop-up blocking, Safe Browsing, download restrictions, cookie rules, geolocation, WebUSB, mic/camera access, telemetry, Sync, and certificate revocation checks.</li>
              <li>• Respects your choice of Relaxed, Strict, or Custom profile so you can tune the impact level to each system.</li>
              <li>• Backs up any existing policy file before writing, producing a timestamped copy in <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">/usr/local/CyberLifeCoach/ChromeBaseline</code>.</li>
              <li>• Produces clean, commented bash you can store in version control or adapt for fleet management tools like Ansible or Salt.</li>
            </ul>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              The script does not touch user profiles, bookmarks, or extensions. It only writes to the system-level
              managed policy directory, which Chrome and Chromium read at launch. After applying, you can verify
              active policies by visiting <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">chrome://policy</code> in the browser.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Bash script
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                JSON managed policy file
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
              This assistant is designed for people who want stronger Chrome or Chromium defaults on Linux systems
              they control, without spending time hunting for the right policy paths across different distros or
              hand-crafting JSON policy files.
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-200">Good fit</h3>
                <ul className="space-y-1.5 text-sm text-slate-400">
                  <li>• Home users and hobbyists who want safer Chrome or Chromium defaults on personal Linux desktops and laptops.</li>
                  <li>• Small business owners hardening staff browsers on company-owned Linux workstations.</li>
                  <li>• Developers and sysadmins who want a quick, reviewable baseline before implementing fleet-wide policies.</li>
                  <li>• Privacy-conscious users who want a consistent hardening baseline they can regenerate after distro reinstalls.</li>
                  <li>• Anyone switching from Windows or macOS who wants to replicate the same browser security posture on Linux.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-200">Use with caution</h3>
                <ul className="space-y-1.5 text-sm text-slate-400 mb-3">
                  <li>• Employer or school managed Linux systems that already receive Chrome or Chromium policies through configuration management tools.</li>
                  <li>• Systems that rely on legacy web apps, unusual download workflows, or Chrome extensions that stricter policies may disrupt.</li>
                  <li>• Multi-user systems where other users expect default browser behavior and have not agreed to a hardened baseline.</li>
                  <li>• Snap, Flatpak, or AppImage installations of Chrome or Chromium, which use different sandboxed paths that this script does not cover.</li>
                </ul>
                <p className="text-sm text-red-300 leading-relaxed">
                  <strong className="text-red-200">Never</strong> bypass existing fleet management, configuration management, or change-control processes with this
                  script. Treat it as a helper for Linux systems you are clearly responsible for and where you are allowed to write
                  system-level policy files.
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
          <h2 className="text-2xl font-bold mb-4">Using the Chrome / Chromium baseline script safely on Linux</h2>
          <p className="text-slate-400 mb-6 leading-relaxed">
            The assistant runs entirely in your browser. When you click the generate button it builds a bash script
            locally based on your distro selection and chosen controls. You can copy, download, or paste that script
            into your editor before running anything on a Linux system.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-3">Before you run the script</h3>
              <ul className="space-y-2 text-sm text-slate-400 mb-4">
                <li>• Use this only on Linux systems that you own or are clearly allowed to manage.</li>
                <li>• Select the correct distro family in the tool so the script targets the right policy directories for your system.</li>
                <li>• Back up your existing policy directory before applying: <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">sudo cp -a /etc/opt/chrome /etc/opt/chrome.bak</code>.</li>
                <li>• Close all Chrome and Chromium windows so the browser does not interfere with the policy file being written.</li>
                <li>• Read the embedded JSON block in the generated script to confirm the exact policy values before running.</li>
                <li>• Test on a non-critical Linux system first using a <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">sudo</code>-enabled shell.</li>
              </ul>
              <p className="text-sm text-slate-400 leading-relaxed">
                The script writes a file named <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">cyberlifecoach_baseline.json</code> into
                the managed policy directory and creates a timestamped backup of any existing file in
                <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300"> /usr/local/CyberLifeCoach/ChromeBaseline</code> before applying.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3">Running the baseline and using rollback</h3>
              <p className="text-sm text-slate-400 mb-3 leading-relaxed">
                <strong className="text-slate-300">How to use:</strong> In the assistant, select your distro family and controls, then generate the script. Save it as
                <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-cyan-300"> chrome-linux-baseline.sh</code> and from a terminal run
                <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-cyan-300"> sudo bash chrome-linux-baseline.sh apply</code>
                to write the policy JSON to the managed policy directory.
              </p>
              <p className="text-sm text-slate-400 mb-3 leading-relaxed">
                <strong className="text-slate-300">Verify:</strong> After applying, open Chrome or Chromium and visit
                <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-cyan-300"> chrome://policy</code> to confirm which policies are active.
                Policies applied from the managed directory will be shown as enforced.
              </p>
              <p className="text-sm text-slate-400 mb-3 leading-relaxed">
                <strong className="text-slate-300">Rollback:</strong> The same script includes a rollback path. Run
                <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-cyan-300"> sudo bash chrome-linux-baseline.sh rollback</code>
                to remove the <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">cyberlifecoach_baseline.json</code> policy file
                from both Chrome and Chromium managed directories. Restart the browser after rollback.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                <strong className="text-slate-300">Scope of rollback:</strong> Rollback only removes the specific policy file written by this script. Other JSON
                files in the managed policy directory — including any placed by other tools — are not affected.
              </p>
            </div>
          </div>

          {/* Distro note */}
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-5 mb-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">A note on distro families and Snap / Flatpak installs</div>
            <p className="text-sm text-slate-400 leading-relaxed mb-2">
              Chrome and Chromium use the same JSON policy mechanism on all Linux distros, but the directory paths
              differ by distro family. The assistant offers three families — Debian/Ubuntu, Fedora/RHEL, and
              Arch/Manjaro — covering the most common paths. If your distro is not listed or uses a custom path,
              check your browser's <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">chrome://policy</code> page for the active policy path and adjust the script accordingly.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Snap and Flatpak installations of Chrome or Chromium run in sandboxed environments with their own
              internal paths. This script targets the system-level policy directories used by traditional package
              manager installations (<code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">apt</code>, <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">dnf</code>, <code className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-blue-900/60 text-blue-300">pacman</code>)
              and will not apply to sandboxed installs without modification.
            </p>
          </div>

          {/* Button Row */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <Shield className="w-5 h-5" />
              <span>Open Chrome / Chromium Baseline Assistant (Linux)</span>
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
            This tool includes a curated subset of DISA STIG-aligned controls selected for real-world use
            by home users, entrepreneurs, digital nomads, and small businesses. It is not a full STIG implementation
            but a practical baseline designed to reduce your attack surface without breaking everyday workflows.
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
                  changes. Do not apply these settings to employer, school, or fleet-managed Linux systems without explicit
                  approval, and do not bypass existing configuration management or change-control processes.
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
