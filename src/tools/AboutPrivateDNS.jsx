import React from 'react';
import { Shield, ArrowLeft, Lock, Eye, AlertTriangle, CheckCircle, Wifi, Globe, Smartphone, Monitor, Server } from 'lucide-react';

export default function AboutPrivateDNS() {
  const handleOpenTool = () => {
    window.location.href = '/tools/private-dns';
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center space-x-3 group cursor-pointer">
              <img 
                src="/logo.png" 
                alt="CyberLifeCoach" 
                className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300" 
              />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:brightness-125 transition-all duration-300">
                CyberLifeCoach
              </span>
            </a>

            <a href="/tools" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tools Hub</span>
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
              Privacy Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              DNS Security
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Encrypted DNS
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            What it is, why it matters, and why everyone should turn it on
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Privacy Notice */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
              <p className="text-slate-300">
                This page runs entirely in your browser. No data is sent or collected.
              </p>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <p className="text-lg text-slate-300 leading-relaxed">
              Every time you open a website, your device asks a Domain Name System server for the site's address. Those
              DNS lookups reveal which sites you visit, even when the page itself is protected with HTTPS. <strong className="text-cyan-400">Encrypted DNS</strong> wraps those lookups inside an encrypted tunnel so your Internet provider, public Wi-Fi operator, or anyone on the same network
              cannot easily see or tamper with your requests.
            </p>
          </div>

          {/* What is Encrypted DNS? */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              What is Encrypted DNS?
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-950/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-red-400">Plain DNS (legacy)</h3>
                <ul className="space-y-3 text-slate-400">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    <span>Lookups are sent in the clear.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    <span>Network operators can log, sell, or block your requests.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    <span>Attackers can spoof responses on insecure networks.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-950/50 border border-cyan-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Encrypted DNS (modern)</h3>
                <ul className="space-y-3 text-slate-400">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Requests are encrypted in transit.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Harder for others to monitor the domains you look up.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Helps prevent tampering and downgrade attacks.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-sm rounded-xl border border-yellow-500/30 p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">
                  Encrypted DNS does not hide your traffic from websites themselves, and it is not a VPN. It protects the <em>lookup</em> step.
                </p>
              </div>
            </div>
          </div>

          {/* How it Works */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              How it Works
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="pb-3 pr-4 text-cyan-400 font-semibold">Protocol</th>
                    <th className="pb-3 pr-4 text-cyan-400 font-semibold">Where you'll see it</th>
                    <th className="pb-3 text-cyan-400 font-semibold">How it encrypts</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800">
                    <td className="py-4 pr-4">
                      <strong className="text-cyan-400">DoH</strong> — DNS over HTTPS
                    </td>
                    <td className="py-4 pr-4">Chrome, Edge, Firefox, iOS/macOS profiles, many routers</td>
                    <td className="py-4">Wraps DNS inside standard HTTPS, blends with web traffic</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-4 pr-4">
                      <strong className="text-cyan-400">DoT</strong> — DNS over TLS
                    </td>
                    <td className="py-4 pr-4">Android Private DNS, some routers, system resolvers</td>
                    <td className="py-4">Uses TLS on port 853 dedicated to DNS queries</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-4">
                      <strong className="text-cyan-400">Private DNS</strong> (Android)
                    </td>
                    <td className="py-4 pr-4">
                      System setting under <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">Network & Internet → Private DNS</code>
                    </td>
                    <td className="py-4">Configures a DoT hostname for all apps on the device</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Why It's Important */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Why It's Important
            </h2>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <strong className="text-cyan-400">Privacy on public Wi-Fi.</strong> Hotspots can see and log DNS queries. Encryption blocks casual surveillance.
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <strong className="text-cyan-400">Integrity and safety.</strong> Prevents easy spoofing of DNS answers that can send you to fake sites.
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <strong className="text-cyan-400">Consistent security policy.</strong> System-wide encrypted DNS ensures all apps use the same trusted resolver.
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <strong className="text-cyan-400">Parental or security filtering (optional).</strong> Providers like Quad9 or NextDNS add malware blocking or custom rules.
                </div>
              </li>
            </ul>
          </div>

          {/* What Encrypted DNS Doesn't Do */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              What Encrypted DNS Doesn't Do
            </h2>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start">
                <span className="text-slate-500 mr-2">•</span>
                <span>It does not make you anonymous on the web.</span>
              </li>
              <li className="flex items-start">
                <span className="text-slate-500 mr-2">•</span>
                <span>It does not block tracking on its own, though some resolvers offer filtering.</span>
              </li>
              <li className="flex items-start">
                <span className="text-slate-500 mr-2">•</span>
                <span>It does not replace HTTPS or a VPN — it complements them.</span>
              </li>
            </ul>
          </div>

          {/* How to Turn It On */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              How to Turn It On (Quick Reference)
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Android */}
              <div className="bg-slate-950/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Smartphone className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-bold text-cyan-400">Android</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Settings → <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">Network & Internet</code> → <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">Private DNS</code> → choose "Private DNS provider hostname"
                  and enter a provider like <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">dns.quad9.net</code> or <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">one.one.one.one</code>.
                </p>
              </div>

              {/* Windows 11 */}
              <div className="bg-slate-950/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Monitor className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-bold text-cyan-400">Windows 11</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Settings → <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">Network & Internet</code> → your network → DNS → set to <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">Manual</code> and enable
                  <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">DNS over HTTPS</code>.
                </p>
              </div>

              {/* Chrome / Edge */}
              <div className="bg-slate-950/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Globe className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-bold text-cyan-400">Chrome / Edge</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Settings → <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">Privacy & Security</code> → <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">Security</code> → enable <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">Use secure DNS</code>.
                </p>
              </div>

              {/* Firefox */}
              <div className="bg-slate-950/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Globe className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-bold text-cyan-400">Firefox</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Settings → <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">General</code> → <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">Network Settings</code> → enable <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">DNS over HTTPS</code>.
                </p>
              </div>

              {/* iOS / macOS */}
              <div className="bg-slate-950/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Smartphone className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-bold text-cyan-400">iOS / macOS</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Install a DNS profile from a trusted provider (Quad9, Cloudflare, NextDNS). On iOS:
                  <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">Settings → General → VPN & Device Management</code>.
                </p>
              </div>

              {/* Routers */}
              <div className="bg-slate-950/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Server className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-bold text-cyan-400">Routers</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Many support DoH/DoT or provider-specific apps. Consult your router docs or use a capable firmware.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">
                  Need step-by-step instructions and provider endpoints? Use the button below to open the setup guide.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <Shield className="w-5 h-5" />
              <span>Open Setup Guide</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print</span>
            </button>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer and Important Notice:</strong> This page is provided for educational purposes only. CyberLifeCoach and its affiliates make no warranties regarding completeness or accuracy. Provider policies and device settings can change over time. Always verify resolver privacy terms and confirm your device is using encrypted DNS after making changes.
            </p>
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
            <p>&copy; {new Date().getFullYear()} CyberLifeCoach</p>
            <p className="text-slate-600">Educational guide. Provider settings change over time.</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
