import React, { useState } from 'react';
import { Shield, ArrowLeft, ExternalLink, FileText } from 'lucide-react';

export default function BrowserHardeningHub() {
  const [selectedOS, setSelectedOS] = useState('windows');

  const browserTools = {
    windows: [
      {
        id: 'edge-win11',
        name: 'Edge',
        fullName: 'Edge Baseline Assistant',
        icon: 'E',
        platform: 'Windows 11 · PowerShell script',
        description: 'Turn on stricter tracking protection, cookie and permission rules, and safer defaults for Microsoft Edge on Windows 11 using a script you can review and test first.',
        pills: ['Copy-paste PowerShell', 'Based on STIG-style controls'],
        pillType: 'ps',
        toolUrl: '/security-center/browser-hardening-hub/edge-baseline-win11',
        aboutUrl: '/security-center/browser-hardening-hub/about-edge-baseline-win11'
      },
      {
        id: 'chrome-win11',
        name: 'Chrome',
        fullName: 'Chrome Baseline Assistant',
        icon: 'C',
        platform: 'Windows 11 · PowerShell script',
        description: 'Harden Google Chrome on Windows 11 with pre-built baselines for TLS, telemetry, safe browsing, cookie rules, and privacy-respecting defaults you can customize.',
        pills: ['Copy-paste PowerShell', 'Relaxed and Strict profiles'],
        pillType: 'ps',
        toolUrl: '/security-center/browser-hardening-hub/chrome-baseline-win11',
        aboutUrl: '/security-center/browser-hardening-hub/about-chrome-baseline-win11'
      },
      {
        id: 'firefox-win11',
        name: 'Firefox',
        fullName: 'Firefox Baseline Assistant',
        icon: 'F',
        platform: 'Windows 11 · PowerShell script',
        description: 'Generate a script that writes an enterprise policies.json file for Firefox on Windows 11, including stricter TLS, tracking protection, and telemetry controls.',
        pills: ['Copy-paste PowerShell', 'TLS 1.2+ and tracker blocks'],
        pillType: 'ps',
        toolUrl: '/security-center/browser-hardening-hub/firefox-baseline-win11',
        aboutUrl: '/security-center/browser-hardening-hub/about-firefox-baseline-win11'
      }
    ],
    macos: [
      {
        id: 'chrome-macos',
        name: 'Chrome',
        fullName: 'Chrome Baseline Assistant',
        icon: 'C',
        platform: 'macOS · Bash script',
        description: 'Use a bash helper to write a Chrome policies file on macOS that tightens tracking, cookie rules, and privacy defaults, with backup and rollback steps built in.',
        pills: ['Bash script', 'Safer defaults for Mac'],
        pillType: 'bash',
        toolUrl: '/security-center/browser-hardening-hub/chrome-baseline-macos',
        aboutUrl: '/security-center/browser-hardening-hub/about-chrome-baseline-macos'
      },
      {
        id: 'firefox-macos',
        name: 'Firefox',
        fullName: 'Firefox Baseline Assistant',
        icon: 'F',
        platform: 'macOS · Bash script',
        description: 'Generate a bash script that writes a Firefox policies.json inside the app bundle on macOS, with TLS, tracking, and telemetry controls you can tune per profile.',
        pills: ['Bash script', 'Relaxed and Strict profiles'],
        pillType: 'bash',
        toolUrl: '/security-center/browser-hardening-hub/firefox-baseline-macos',
        aboutUrl: '/security-center/browser-hardening-hub/about-firefox-baseline-macos'
      }
    ],
    linux: [
      {
        id: 'chrome-linux',
        name: 'Chromium / Chrome',
        fullName: 'Chromium / Chrome Baseline',
        icon: 'C',
        platform: 'Linux · Bash script',
        description: 'Linux browser baselines are in development. The first release will focus on Chromium/Chrome profiles for TLS, tracking, cookies, and permission rules on common distros.',
        pills: ['Bash script', 'Linux desktop security'],
        pillType: 'bash',
        comingSoon: true
      },
      {
        id: 'firefox-linux',
        name: 'Firefox',
        fullName: 'Firefox Baseline',
        icon: 'F',
        platform: 'Linux · Bash script',
        description: 'Planned Linux Firefox baselines will mirror your Windows and macOS controls, including safer TLS, telemetry controls, and tracking protections tuned for Linux environments.',
        pills: ['Bash script', 'Desktop and laptops'],
        pillType: 'bash',
        comingSoon: true
      }
    ]
  };

  const BrowserCard = ({ tool }) => (
    <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 flex flex-col h-full relative overflow-hidden group hover:border-cyan-500/50 transition-all">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center text-xl font-bold text-cyan-400">
            {tool.icon}
          </div>
          <div>
            <h3 className="font-bold text-lg">{tool.fullName}</h3>
            <p className="text-xs text-slate-400">{tool.platform}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-grow">
          {tool.description}
        </p>

        {/* Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tool.pills.map((pill, idx) => (
            <span 
              key={idx}
              className={`text-xs px-3 py-1 rounded-full border ${
                idx === 0 
                  ? tool.pillType === 'ps'
                    ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                    : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
              }`}
            >
              {pill}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 mt-auto">
          {tool.comingSoon ? (
            <button
              disabled
              className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-50"
            >
              <span>⏳</span>
              <span>Coming Soon</span>
            </button>
          ) : (
            <>
              <a
                href={tool.toolUrl}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <Shield className="w-4 h-4" />
                <span>Open Tool</span>
              </a>
              <a
                href={tool.aboutUrl}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold border border-slate-700 hover:border-cyan-500 transition-all hover:bg-slate-800 text-slate-300"
              >
                <FileText className="w-4 h-4" />
                <span>About Controls</span>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );

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
        
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Browser Security Toolkit</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Multi-platform</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Local, in-browser</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Browser Hardening Hub
          </h1>
          
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            Choose your operating system and browser, then generate hardening scripts with privacy and security controls you can review, customize, and deploy. Each assistant builds a baseline you can test before rolling out to real machines.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Step 1: OS Selector */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">Step 1 · Choose your operating system</div>
            <h2 className="text-2xl font-bold mb-2">Pick the platform you want to harden first.</h2>
            <p className="text-slate-400 text-sm mb-6">
              This keeps things simple for non-experts. Choose Windows 11 or macOS to see the matching browser tools. Linux profiles are on the way and will appear here as they go live.
            </p>

            {/* OS Pills */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedOS('windows')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedOS === 'windows'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                    : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-cyan-500'
                }`}
              >
                <span className="text-lg">🪟</span>
                <span>Windows 11</span>
              </button>

              <button
                onClick={() => setSelectedOS('macos')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedOS === 'macos'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                    : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-cyan-500'
                }`}
              >
                <span className="text-lg">🍎</span>
                <span>macOS</span>
              </button>

              <button
                onClick={() => setSelectedOS('linux')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedOS === 'linux'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                    : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-cyan-500'
                }`}
              >
                <span className="text-lg">🐧</span>
                <span>Linux</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300">Coming soon</span>
              </button>
            </div>
          </div>

          {/* Step 2: Browser Grid */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
              Step 2 · Choose your {selectedOS === 'windows' ? 'Windows' : selectedOS === 'macos' ? 'macOS' : 'Linux'} browser
            </div>
            <h2 className="text-2xl font-bold mb-6">
              {selectedOS === 'windows' ? 'Windows 11' : selectedOS === 'macos' ? 'macOS' : 'Linux'} browser baselines
              {selectedOS === 'linux' && <span className="text-yellow-400 text-lg ml-2">(coming soon)</span>}
            </h2>

            {/* Browser Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {browserTools[selectedOS].map(tool => (
                <BrowserCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">⚠️</div>
              <div>
                <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-2">Important Notice</h4>
                <p className="text-sm text-slate-300 leading-relaxed mb-3">
                  This Browser Hardening Toolkit runs entirely in your browser. Your selections and the generated scripts are not sent to CyberLife Coach, to browser vendors, or to any third party. Each assistant produces a generic starting point for browser security and privacy controls. It is provided for educational and informational use only, is not a substitute for professional advice, and does not guarantee compliance with any standard or policy.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed mb-3">
                  Always test in a safe environment, verify every line, and ensure you have reliable backups before making changes. Do not apply these settings to employer or school managed devices without explicit approval, and do not bypass existing GPOs, MDM profiles, configuration profiles, or enterprise change-control processes.
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
