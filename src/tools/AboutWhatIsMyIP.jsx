import React from 'react';
import { Globe, ArrowLeft, Shield, MapPin, CheckCircle, AlertTriangle, Info, HelpCircle, Network } from 'lucide-react';

export default function AboutWhatIsMyIP() {
  const handleOpenTool = () => {
    window.location.href = '/tools/what-is-my-ip';
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
              Network Tool Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              IP Detection
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Privacy Check
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            What's My IP, explained clearly
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            This page explains what the tool shows, how it detects your IP information, and how to use the results safely.
            It is written for everyone, not just network pros.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* About this tool */}
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-6 mb-8">
            <div className="flex items-start space-x-3 mb-4">
              <Info className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-semibold text-blue-300 mb-3">About this tool</p>
                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex items-start">
                    <strong className="text-blue-300 min-w-[140px]">Purpose:</strong>
                    <span>Quickly see your public IP details</span>
                  </div>
                  <div className="flex items-start">
                    <strong className="text-blue-300 min-w-[140px]">Best for:</strong>
                    <span>Travelers, remote workers, privacy checks</span>
                  </div>
                  <div className="flex items-start">
                    <strong className="text-blue-300 min-w-[140px]">One-click actions:</strong>
                    <span>Print results, open the tool, copy values</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why this matters */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Why this matters
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Your public IP is how the internet sees your connection. It can reveal your approximate location, your internet provider, 
              and whether you appear to be on a VPN. Knowing this helps you verify privacy tools, troubleshoot connectivity, and share 
              accurate details with support without exposing passwords or personal documents.
            </p>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span>Confirm a VPN, mobile hotspot, or office gateway is actually in use.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span>Double-check geolocation for streaming, travel, or remote work policies.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span>Troubleshoot sites that block certain regions or networks.</span>
              </li>
            </ul>
          </div>

          {/* What the tool shows */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              What the tool shows
            </h2>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <Globe className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Public IP address</strong>
                  <span className="text-slate-400">, IPv4 and, when available, IPv6.</span>
                </div>
              </li>
              <li className="flex items-start">
                <Network className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Reverse DNS / hostname</strong>
                  <span className="text-slate-400"> if resolvable.</span>
                </div>
              </li>
              <li className="flex items-start">
                <Shield className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">ASN and ISP</strong>
                  <span className="text-slate-400"> for network identification.</span>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Rough geolocation</strong>
                  <span className="text-slate-400"> such as city and country, based on public databases.</span>
                </div>
              </li>
              <li className="flex items-start">
                <Info className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Transport hints</strong>
                  <span className="text-slate-400"> like whether traffic looks residential, corporate, mobile, or VPN/hosting.</span>
                </div>
              </li>
            </ul>
            <p className="text-sm text-slate-500 italic">
              Geolocation is approximate and may not match your true street address or current city, which is by design for privacy.
            </p>
          </div>

          {/* How detection works */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              How detection works
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              The tool primarily reads your public IP from the server side or a privacy-respecting API that reflects the address your 
              browser used. It may also attempt local techniques in the browser to check for IPv6 availability. Reverse DNS, ASN, and 
              rough location are derived from public routing and IP registry data.
            </p>
            
            <h3 className="text-xl font-bold mb-4 text-cyan-400">Verification tips</h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3">•</span>
                <span>Toggle your VPN on and off, then reopen the tool to compare results.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3">•</span>
                <span>Try mobile data or another Wi-Fi network to see how the details change.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3">•</span>
                <span>Use the Print button here to save a PDF snapshot for support.</span>
              </li>
            </ul>
          </div>

          {/* Privacy and data handling */}
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Shield className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-blue-300">Privacy and data handling</h2>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">
              We minimize data collection. The tool shows you your IP-related details in your browser. If optional analytics are 
              enabled on your site, ensure they do not store IP addresses or precise locations beyond what is necessary. When sharing 
              results, prefer screenshots that hide unrelated tabs or windows.
            </p>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                <span>No passwords or personal files are touched by this page.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                <span>Rough geolocation comes from public datasets, not device GPS.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                <span>You can print to PDF for records without sending data elsewhere.</span>
              </li>
            </ul>
          </div>

          {/* Troubleshooting */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Troubleshooting
            </h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                <span>If values do not appear, reload the tool page in a new tab with caches disabled, then try again.</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                <span>VPNs can rotate addresses. If results change often, that is expected behavior.</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                <span>Some corporate networks route traffic in distant cities. Geolocation may look far away even when you are local.</span>
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              FAQ
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-start space-x-3 mb-2">
                  <HelpCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <h3 className="text-lg font-semibold text-cyan-400">Does this reveal my exact home address?</h3>
                </div>
                <p className="text-slate-400 ml-8">
                  No. IP geolocation is approximate. It is normal for the city to be off.
                </p>
              </div>
              
              <div>
                <div className="flex items-start space-x-3 mb-2">
                  <HelpCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <h3 className="text-lg font-semibold text-cyan-400">Why do I see IPv6 sometimes?</h3>
                </div>
                <p className="text-slate-400 ml-8">
                  Many providers are enabling IPv6. If your device and network support it, you will see both IPv4 and IPv6.
                </p>
              </div>
              
              <div>
                <div className="flex items-start space-x-3 mb-2">
                  <HelpCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <h3 className="text-lg font-semibold text-cyan-400">Will printing include buttons and backgrounds?</h3>
                </div>
                <p className="text-slate-400 ml-8">
                  Print view is simplified automatically so it is clean and readable on paper or in a PDF.
                </p>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Common Use Cases
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">VPN Verification</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Confirm your VPN is active by checking if your IP address and location match the VPN server location.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <MapPin className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Remote Work Setup</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Verify you're connecting through the correct network gateway when working remotely or traveling.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Network className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Network Troubleshooting</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Identify network issues by comparing your expected IP with what websites actually see.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Globe className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Access Verification</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Check if geo-restricted content issues are related to your apparent location.
                </p>
              </div>
            </div>
          </div>

          {/* Understanding IP Types */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Understanding IP Types
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-cyan-400 mb-3">IPv4</h3>
                <p className="text-sm text-slate-400 mb-3">
                  The traditional Internet Protocol format (e.g., 192.168.1.1). Most commonly used and universally supported.
                </p>
                <div className="bg-slate-900 border border-slate-700 rounded p-3">
                  <code className="text-xs text-cyan-300 font-mono">Example: 203.0.113.45</code>
                </div>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-cyan-400 mb-3">IPv6</h3>
                <p className="text-sm text-slate-400 mb-3">
                  The newer protocol with much larger address space. Increasingly common as IPv4 addresses run out.
                </p>
                <div className="bg-slate-900 border border-slate-700 rounded p-3">
                  <code className="text-xs text-cyan-300 font-mono">Example: 2001:db8::1</code>
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
              <Globe className="w-5 h-5" />
              <span>Open What's My IP Tool</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print This Guide</span>
            </button>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer and Important Notice:</strong> This page is informational. Results depend on public routing data and third-party registries that change over time. Do not rely on IP geolocation for personal safety decisions or emergency services. For security incidents, contact your provider and follow your organization's policies.
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
