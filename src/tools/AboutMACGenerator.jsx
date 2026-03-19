import React from 'react';
import { Cpu, ArrowLeft, AlertTriangle, Shield, CheckCircle, Network } from 'lucide-react';

export default function AboutMACGenerator() {
  const handleOpenTool = () => {
    window.location.href = '/tools/mac-generator';
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
              Privacy Tool
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              MAC Randomization
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <Cpu className="w-12 h-12 text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              About the Random MAC Address Generator
            </h1>
          </div>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            This page explains what the Random MAC Address Generator does, why it focuses on locally administered unicast
            addresses, and how to use it safely for privacy and lab work without touching any central servers.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* What this tool actually does */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              What this tool actually does
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              The Random MAC Address Generator creates valid, randomly generated MAC addresses that are marked as
              <strong className="text-slate-300"> locally administered</strong> and <strong className="text-slate-300">unicast</strong>. It does not scan your device and it does
              not change your network adapter settings. Everything happens inside your browser window.
            </p>

            <h3 className="text-2xl font-bold mb-3 text-cyan-400">Why MAC randomization matters for privacy</h3>
            <p className="text-slate-400 leading-relaxed mb-4">
              A MAC address is a unique hardware identifier that your device broadcasts when it looks for Wi-Fi networks.
              If that identifier never changes, it can be used to track your presence over time across different locations.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              Modern operating systems already include some MAC randomization features, especially when probing for public
              networks. This generator complements those features by giving privacy-conscious users and lab admins a way to
              create their own valid MAC addresses on demand for testing, demos, and additional hardening.
            </p>

            <h3 className="text-2xl font-bold mb-3 text-cyan-400">How the generator builds a valid address</h3>
            <p className="text-slate-400 leading-relaxed mb-4">
              The tool follows standard MAC address rules. It focuses on the first byte of the address, because that byte
              controls two important bits.
            </p>
            <ul className="space-y-3 text-slate-400 mb-6">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  The generator sets the "locally administered" bit which signals that the address was created by software
                  rather than burned into a network card by a vendor.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  At the same time it keeps the multicast bit off so the address is treated as a standard unicast address
                  for one device instead of a multicast group.
                </span>
              </li>
            </ul>
            <p className="text-slate-400 leading-relaxed mb-6">
              It does this by constraining the second hexadecimal character of the first byte to one of four values:
              <code className="bg-slate-950 px-2 py-1 rounded text-cyan-300 mx-1">2</code>, 
              <code className="bg-slate-950 px-2 py-1 rounded text-cyan-300 mx-1">6</code>, 
              <code className="bg-slate-950 px-2 py-1 rounded text-cyan-300 mx-1">A</code>, or 
              <code className="bg-slate-950 px-2 py-1 rounded text-cyan-300 mx-1">E</code>. This combination satisfies both bit
              requirements, while the remaining ten hexadecimal characters are fully random.
            </p>

            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-6">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-cyan-300 mb-2">Note</p>
                  <p className="text-slate-300 leading-relaxed">
                    The page never looks at your real MAC address and never attempts to apply the generated address to your
                    system. It only produces text that you can copy into your own network settings if that is appropriate for
                    your situation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How to use it in practice */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h3 className="text-2xl font-bold mb-3 text-cyan-400">How to use it in practice</h3>
            <p className="text-slate-500 mb-4 italic">
              The exact steps to "spoof" or temporarily change a MAC address depend on your operating system and network
              adapter. In general the workflow looks like this.
            </p>
            <ul className="space-y-3 text-slate-400 mb-6">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Open the generator and choose how many addresses you want and which format you prefer.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Copy a generated address either directly or using the "Copy for Sheets" button if you need a list.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Paste the address into the relevant network adapter setting on a device you own or manage.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Reconnect to the network and confirm that your connection is stable before using it for anything critical.</span>
              </li>
            </ul>
            <p className="text-slate-500 italic">
              If you are not comfortable changing adapter settings, treat this as an educational tool that shows how MAC
              randomization works under the hood rather than something you must apply on your primary device.
            </p>
          </div>

          {/* When this tool is a good fit */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h3 className="text-2xl font-bold mb-3 text-cyan-400">When this tool is a good fit</h3>
            <p className="text-slate-400 leading-relaxed mb-4">
              This generator is tuned for situations where you want to reduce tracking or experiment with network behavior
              in a controlled way.
            </p>
            <ul className="space-y-3 text-slate-400 mb-6">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Lab environments where you want realistic but non-vendor MAC addresses.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Test networks where you rotate identifiers to simulate different devices.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Privacy-focused setups on your own equipment when you understand the impact.</span>
              </li>
            </ul>
            <p className="text-slate-500 italic">
              It is not intended for bypassing enterprise security controls, evading incident response, or masking activity
              on networks where you do not have clear authorization.
            </p>
          </div>

          {/* Quick snapshot */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Quick snapshot
            </h2>
            <p className="text-slate-400 mb-4"><strong className="text-slate-300">Client-side only, no logging</strong></p>
            <ul className="space-y-3 text-slate-400 mb-8">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>All generation happens in your browser. No MAC addresses, IP addresses, or telemetry are sent to any server.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>The page does not probe your system. It does not read existing network adapters and it does not modify device settings.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>You decide whether and where to paste the generated address. You stay in control of how it is used.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold mb-3 text-cyan-400">Who this is for</h3>
            <ul className="space-y-3 text-slate-400 mb-8">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Privacy-aware individuals who want to understand MAC randomization and experiment on their own equipment.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Home lab builders and students who need clean, locally administered addresses for network exercises.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Trainers and consultants who want a safe demo tool to explain how device identifiers can be rotated.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold mb-3 text-cyan-400">What this page does not do</h3>
            <p className="text-slate-500 italic mb-6">
              This page is not a hacking toolkit. It does not attempt to break Wi-Fi, bypass MAC filters, or impersonate
              specific devices. It simply generates correctly formatted addresses that you can apply where you are allowed to.
            </p>

            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-6">
              <div className="flex items-start space-x-3">
                <Network className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-cyan-300 mb-2">Scope</p>
                  <p className="text-slate-300 leading-relaxed">
                    No external API calls. No persistent logs. Educational first.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <span>▶</span>
              <span>Open MAC Generator</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print This Page</span>
            </button>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal and usage notice:</strong> This Random MAC Address Generator and this page are provided for educational use, lab work, and privacy
              enhancement on networks you own or are explicitly authorized to use. The tool runs entirely in your browser,
              does not discover, store, or transmit any device information, and does not modify your network configuration.
              Generated values remain on your device unless you choose to copy or share them.
              <br /><br />
              <strong className="text-slate-300">Important.</strong> Using spoofed identifiers to gain unauthorized access, bypass access controls, or
              impersonate another device may be illegal in your jurisdiction and may violate contracts or acceptable use
              policies. Nothing on this site is legal advice, networking advice, or a guarantee of security or privacy. You
              are solely responsible for understanding and complying with applicable laws, regulations, and organizational
              rules. No warranty of any kind is provided.
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
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
