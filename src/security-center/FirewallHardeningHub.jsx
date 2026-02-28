import React from 'react';
import { Shield, ArrowLeft, FileText } from 'lucide-react';

export default function FirewallHardeningHub() {
  const firewallTools = [
    {
      id: 'firewall-win11',
      name: 'Windows 11',
      fullName: 'Windows 11 Firewall Baseline',
      icon: '🪟',
      platform: 'Windows 11 · PowerShell script',
      description: 'Generate a PowerShell script that applies a STIG-style baseline for Windows Defender Firewall, including a stricter inbound posture and rollback-aware changes you can test first.',
      pills: ['Copy-paste PowerShell', 'Windows Defender Firewall'],
      pillType: 'ps',
      toolUrl: '/security-center/firewall-hardening-hub/firewall-baseline-win11',
      aboutUrl: '/security-center/firewall-hardening-hub/about-firewall-win11'
    },
    {
      id: 'firewall-macos',
      name: 'macOS',
      fullName: 'macOS Firewall Baseline',
      icon: '🍎',
      platform: 'macOS · Bash script',
      description: 'Create a bash script that hardens the native macOS Application Firewall with a default-deny posture, stealth mode, logging, and plist-based backups for clean rollback.',
      pills: ['Bash script', 'Application Firewall (alf)'],
      pillType: 'bash',
      toolUrl: '/security-center/firewall-hardening-hub/firewall-baseline-macos',
      aboutUrl: '/security-center/firewall-hardening-hub/about-firewall-macos'
    },
    {
      id: 'firewall-ubuntu',
      name: 'Ubuntu',
      fullName: 'Ubuntu UFW Firewall Baseline',
      icon: '🐧',
      platform: 'Ubuntu · Bash script',
      description: 'Generate a UFW helper script for Ubuntu that sets deny-incoming, allow-outgoing, adds optional rules for SSH, HTTP/HTTPS, Samba, and VNC, and supports backup and rollback of your UFW config.',
      pills: ['Bash script', 'UFW front-end to iptables'],
      pillType: 'bash',
      toolUrl: '/security-center/firewall-hardening-hub/firewall-baseline-ubuntu',
      aboutUrl: '/security-center/firewall-hardening-hub/about-firewall-ubuntu'
    }
  ];

  const FirewallCard = ({ tool }) => (
    <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 flex flex-col h-full relative overflow-hidden group hover:border-cyan-500/50 transition-all">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center text-2xl">
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
        
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Firewall Hardening Center</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Local, in-browser helpers</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Script-based baselines</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Lock down your desktop firewalls, one platform at a time.
          </h1>
          
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            Choose the operating system you use, then open the matching firewall baseline assistant. Each tool generates a local script that hardens Windows Defender Firewall, the macOS Application Firewall, or Ubuntu UFW on your own terms, without sending data to CyberLife Coach or anyone else.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Firewall Tools */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">Step 1 · Choose your firewall platform</div>
            <h2 className="text-2xl font-bold mb-6">Desktop firewall baselines</h2>

            {/* Firewall Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {firewallTools.map(tool => (
                <FirewallCard key={tool.id} tool={tool} />
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
                  This Firewall Hardening Tool runs entirely in your browser. Your selections and the generated scripts are not sent to CyberLife Coach, to operating system vendors, or to any third party. Each assistant produces a generic starting point for host firewall security controls. It is provided for educational and informational use only, is not a substitute for professional advice, and does not guarantee compliance with any standard or policy.
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
