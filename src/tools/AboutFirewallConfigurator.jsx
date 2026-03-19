import React, { useEffect } from 'react';
import { Shield, ArrowLeft, AlertTriangle, CheckCircle, Server, Monitor, Terminal, FileCode, Download, ExternalLink } from 'lucide-react';

export default function AboutFirewallConfigurator() {
  const handleOpenTool = (hash = '') => {
    window.location.href = `/tools/firewall-configurator${hash}`;
  };

  const handlePrint = () => {
    window.print();
  };

  // Handle URL hash to carry over to tool links
  useEffect(() => {
    const hash = window.location.hash || '';
    if (hash && /#(windows|mac|linux)/i.test(hash)) {
      // This will be handled by the button click handlers
    }
  }, []);

  const getCurrentHash = () => {
    const hash = window.location.hash || '';
    if (/#(windows|mac|linux)/i.test(hash)) {
      return hash.toLowerCase();
    }
    return '';
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
              Firewall Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Rule Generator
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the Firewall Rule Generator
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            What it does, how it works, and how to use it safely on Linux, macOS, and Windows.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Primary CTA Section */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={() => handleOpenTool(getCurrentHash())}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              >
                <Shield className="w-5 h-5" />
                <span>Open Firewall Generator</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
              >
                <span className="text-lg">🖨️</span>
                <span>Print this page</span>
              </button>
              <a
                href="/terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
              >
                <ExternalLink className="w-5 h-5" />
                <span>View Terms of Service</span>
              </a>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-4 mb-6">
              <p className="text-sm text-slate-300">
                <strong className="text-cyan-400">Tip:</strong> You can deep link the generator to a specific OS, for example <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-xs">#windows</code>, <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-xs">#mac</code>, or <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-xs">#linux</code>.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleOpenTool('#windows')}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 text-sm font-semibold transition-all"
              >
                <Monitor className="w-4 h-4" />
                <span>Open for Windows</span>
              </button>
              <button
                onClick={() => handleOpenTool('#mac')}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 text-sm font-semibold transition-all"
              >
                <Monitor className="w-4 h-4" />
                <span>Open for macOS</span>
              </button>
              <button
                onClick={() => handleOpenTool('#linux')}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 text-sm font-semibold transition-all"
              >
                <Server className="w-4 h-4" />
                <span>Open for Linux</span>
              </button>
            </div>
          </div>

          {/* What this tool does */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              What this tool does
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              The generator builds ready-to-run firewall scripts tailored to your device role and operating system. You choose services to allow, decide whether to exempt an admin IP, and optionally enable country blocking on Linux. The tool produces commands for the native firewall on each platform.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Linux */}
              <div className="bg-slate-950/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Server className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-bold text-cyan-400">Linux</h3>
                </div>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Backends: <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded text-sm">UFW</code>, <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded text-sm">iptables + ipset</code>, <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded text-sm">nftables</code></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Optional country blocking using public CIDR lists</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>IPv4 and optional IPv6 set population</span>
                  </li>
                </ul>
              </div>

              {/* macOS */}
              <div className="bg-slate-950/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Monitor className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-bold text-cyan-400">macOS</h3>
                </div>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Native <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded text-sm">pf</code> (Packet Filter) with an anchor file</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Safe flow: validate, load, then enable</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>App-only firewall is not enough for port-level control</span>
                  </li>
                </ul>
              </div>

              {/* Windows */}
              <div className="bg-slate-950/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Monitor className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-bold text-cyan-400">Windows</h3>
                </div>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span><code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded text-sm">PowerShell</code> rules, recommended for clarity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span><code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded text-sm">netsh</code> rules, useful for legacy or GPO copy-paste</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Profiles enabled, logging path set</span>
                  </li>
                </ul>
              </div>

              {/* Profiles & Portability */}
              <div className="bg-slate-950/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <FileCode className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-bold text-cyan-400">Profiles & portability</h3>
                </div>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Export and import configuration profiles as JSON</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Download scripts with OS-aware filenames</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Deep link directly to an OS mode</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How it works (client-side) */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              How it works (client-side)
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              The page runs entirely in your browser. No accounts, no uploads, and no telemetry. Your selections generate a script locally, which you can copy, review, and download. Nothing leaves your device.
            </p>

            <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-sm rounded-xl border border-yellow-500/30 p-6 mb-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-yellow-300 mb-2">Safety first</p>
                  <p className="text-sm text-slate-300">
                    <strong>Safety first.</strong> Firewall changes can interrupt access, including SSH. Always test on a non-critical machine or a virtual machine before applying rules to production devices.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4 text-cyan-400">What you control</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5 mr-3" />
                <span>Allowed ports by service, for example <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">22</code>, <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">80</code>, <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">443</code>, or <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">53/udp</code></span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5 mr-3" />
                <span>Admin IP exemption to avoid locking yourself out</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5 mr-3" />
                <span>Linux only: country blocking via sets, IPv4 plus optional IPv6</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5 mr-3" />
                <span>Engine choices per OS, for example PowerShell or netsh</span>
              </li>
            </ul>
          </div>

          {/* Quick start */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Quick start
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Linux Quick Start */}
              <div className="bg-slate-950/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Server className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-bold text-cyan-400">Linux</h3>
                </div>
                <ol className="space-y-3 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">1.</span>
                    <span>Open the tool and pick Linux.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">2.</span>
                    <span>Select your backend: UFW, iptables, or nftables.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">3.</span>
                    <span>Choose your device role and services to allow.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">4.</span>
                    <span>Optional: enable country blocking and IPv6 lists.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">5.</span>
                    <span>Generate, review, then run on a test system first.</span>
                  </li>
                </ol>
              </div>

              {/* macOS Quick Start */}
              <div className="bg-slate-950/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Monitor className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-bold text-cyan-400">macOS</h3>
                </div>
                <ol className="space-y-3 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">1.</span>
                    <span>Open the tool with <a href="/tools/firewall-configurator#mac" className="text-cyan-400 hover:text-cyan-300 underline">#mac</a>.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">2.</span>
                    <span>Select services to allow, then generate.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">3.</span>
                    <span>The script creates a pf anchor, validates with <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded text-sm">pfctl -n</code>, loads, then enables.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">4.</span>
                    <span>Run in Terminal, you will be prompted for admin rights.</span>
                  </li>
                </ol>
              </div>

              {/* Windows PowerShell Quick Start */}
              <div className="bg-slate-950/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Terminal className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-bold text-cyan-400">Windows (PowerShell)</h3>
                </div>
                <ol className="space-y-3 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">1.</span>
                    <span>Open the tool with <a href="/tools/firewall-configurator#windows" className="text-cyan-400 hover:text-cyan-300 underline">#windows</a>.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">2.</span>
                    <span>Choose PowerShell, select services, then generate.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">3.</span>
                    <span>Right-click PowerShell and run as Administrator.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">4.</span>
                    <span>Paste the script and verify rules were added.</span>
                  </li>
                </ol>
              </div>

              {/* Windows netsh Quick Start */}
              <div className="bg-slate-950/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Terminal className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-bold text-cyan-400">Windows (netsh)</h3>
                </div>
                <ol className="space-y-3 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">1.</span>
                    <span>Switch the engine to netsh.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">2.</span>
                    <span>Generate and download the <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded text-sm">.cmd</code> file.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">3.</span>
                    <span>Right-click and run as Administrator.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">4.</span>
                    <span>Confirm the rules via Windows Firewall UI or netsh.</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Advanced notes */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Advanced notes
            </h2>

            <div className="space-y-6">
              {/* macOS Packet Filter */}
              <div>
                <h3 className="text-xl font-bold mb-3 text-cyan-400">macOS Packet Filter (pf)</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Anchor file path: <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">/etc/pf.anchors/com.cyberlifecoach</code></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Main config: <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">/etc/pf.conf</code> gets a one-time anchor include</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Validate first: <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">sudo pfctl -nf /etc/pf.conf</code>, then load with <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">sudo pfctl -f /etc/pf.conf</code></span>
                  </li>
                </ul>
              </div>

              {/* Windows options */}
              <div>
                <h3 className="text-xl font-bold mb-3 text-cyan-400">Windows options</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>PowerShell: <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">New-NetFirewallRule</code> with a consistent Group label, "CLC Firewall"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>netsh: <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">netsh advfirewall firewall add rule ...</code> for legacy and GPO workflows</span>
                  </li>
                </ul>
              </div>

              {/* Linux sets and persistence */}
              <div>
                <h3 className="text-xl font-bold mb-3 text-cyan-400">Linux sets and persistence</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>iptables + ipset: saves to <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">/etc/ipset.conf</code> and uses netfilter-persistent</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>nftables: writes a full ruleset to <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">/etc/nftables.conf</code> and enables the service</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => handleOpenTool(getCurrentHash())}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <Shield className="w-5 h-5" />
              <span>Open Firewall Generator</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print this page</span>
            </button>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclosure:</strong> This page and the generator are for educational and informational use. Firewall changes can disrupt connectivity or lock you out of systems. Always review scripts, test in a safe environment, and keep console or recovery access available. The author and host accept no liability for damage, data loss, or misuse.
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
            <p>&copy; {new Date().getFullYear()} CyberLife Coach</p>
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
