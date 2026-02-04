import React, { useState } from 'react';
import { ArrowLeft, Printer, ChevronDown, ChevronRight } from 'lucide-react';

// Section component - defined outside to avoid recreation on each render
function Section({ id, title, children, isOpen, onToggle }) {
  return (
    <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden">
      <button
        onClick={() => onToggle(id)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors text-left"
      >
        <span className="text-lg font-semibold text-slate-200">{title}</span>
        {isOpen ? (
          <ChevronDown className="w-5 h-5 text-cyan-400" />
        ) : (
          <ChevronRight className="w-5 h-5 text-slate-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 pt-2">
          {children}
        </div>
      )}
    </div>
  );
}

export default function PrivateDNS() {
  const [expandedSections, setExpandedSections] = useState({
    windows: true,
    macos: false,
    linux: false,
    ios: false,
    android: false,
    chromeos: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const expandAll = () => {
    setExpandedSections({
      windows: true,
      macos: true,
      linux: true,
      ios: true,
      android: true,
      chromeos: true
    });
  };

  const collapseAll = () => {
    setExpandedSections({
      windows: false,
      macos: false,
      linux: false,
      ios: false,
      android: false,
      chromeos: false
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const providers = [
    {
      name: 'Cloudflare',
      doh: 'https://cloudflare-dns.com/dns-query',
      dot: 'one.one.one.one',
      ips: '1.1.1.1, 1.0.0.1',
      notes: 'Fast, privacy-focused, optional family profiles.'
    },
    {
      name: 'Quad9',
      doh: 'https://dns.quad9.net/dns-query',
      dot: 'dns.quad9.net',
      ips: '9.9.9.9, 149.112.112.112',
      notes: 'Blocks known malicious domains.'
    },
    {
      name: 'Google Public DNS',
      doh: 'https://dns.google/dns-query',
      dot: 'dns.google',
      ips: '8.8.8.8, 8.8.4.4',
      notes: 'Reliable and globally available.'
    },
    {
      name: 'NextDNS',
      doh: 'https://dns.nextdns.io/<id>',
      dot: '<id>.dns.nextdns.io',
      ips: 'Dynamic',
      notes: 'Custom filtering and analytics per account.'
    },
    {
      name: 'AdGuard DNS',
      doh: 'https://dns.adguard.com/dns-query',
      dot: 'dns.adguard.com',
      ips: '94.140.14.14, 94.140.15.15',
      notes: 'Optional ad-blocking and family protection.'
    },
    {
      name: 'CleanBrowsing',
      doh: 'https://doh.cleanbrowsing.org/doh/security-filter/',
      dot: 'security-filter-dns.cleanbrowsing.org',
      ips: '185.228.168.9, 185.228.169.9',
      notes: 'Family-safe and adult-filter profiles available.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-8 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
                  Privacy Guide
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  DNS Encryption
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Check & Enable Encrypted DNS
              </h1>
              <p className="text-slate-400 text-sm max-w-3xl">
                Private DNS, DNS over HTTPS, and DNS over TLS protect your lookups from snooping on public Wi-Fi and ISPs.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-3 ml-6">
              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
                title="Print this guide"
              >
                <Printer className="w-4 h-4" />
                <span>Print Guide</span>
              </button>
              <button
                onClick={expandAll}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Mobile Action Buttons */}
          <div className="flex md:hidden items-center space-x-2 mt-4">
            <button
              onClick={handlePrint}
              className="flex items-center justify-center space-x-1 flex-1 px-3 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all text-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
            <button
              onClick={expandAll}
              className="flex-1 px-3 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all text-sm"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="flex-1 px-3 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all text-sm"
            >
              Collapse All
            </button>
          </div>

          {/* Notice */}
          <div className="mt-6 p-4 bg-cyan-900/20 border border-cyan-500/30 rounded-lg">
            <p className="text-sm text-cyan-300">
              This guide runs entirely in your browser. No data is sent or collected.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Windows Section */}
          <Section id="windows" title="Windows 10 & 11" isOpen={expandedSections.windows} onToggle={toggleSection}>
            <div className="space-y-4 text-slate-300">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-cyan-400">Browser Check</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2 mt-1">•</span>
                    <span>
                      <strong className="text-slate-200">Edge/Chrome:</strong> Settings → Privacy and Security → Security → Use secure DNS. Confirm it is enabled with a known provider.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2 mt-1">•</span>
                    <span>
                      <strong className="text-slate-200">Firefox:</strong> Settings → General → Network Settings → Enable DNS over HTTPS.
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-cyan-400">System-wide (Windows 11)</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2 mt-1">•</span>
                    <span>Settings → Network & Internet → Ethernet/Wi-Fi → DNS Server Assignment → Edit.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2 mt-1">•</span>
                    <span>Switch to Manual, enable IPv4, turn DNS over HTTPS to On.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2 mt-1">•</span>
                    <span>
                      Enter DoH servers, for example <code className="bg-slate-800 px-2 py-0.5 rounded text-cyan-300">9.9.9.9</code> and <code className="bg-slate-800 px-2 py-0.5 rounded text-cyan-300">149.112.112.112</code>.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Section>

          {/* macOS Section */}
          <Section id="macos" title="macOS (Monterey or newer)" isOpen={expandedSections.macos} onToggle={toggleSection}>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2 mt-1">•</span>
                <span>System Settings → Network → your connection → Details → DNS. If you see only IPs, it is unencrypted.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2 mt-1">•</span>
                <span>Install an encrypted DNS configuration profile from a trusted provider such as Quad9 or Cloudflare.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2 mt-1">•</span>
                <span>Verify under System Settings → Privacy & Security → Profiles.</span>
              </li>
            </ul>
          </Section>

          {/* Linux Section */}
          <Section id="linux" title="Linux (systemd-resolved / NetworkManager)" isOpen={expandedSections.linux} onToggle={toggleSection}>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2 mt-1">•</span>
                <span>
                  Run <code className="bg-slate-800 px-2 py-0.5 rounded text-cyan-300">resolvectl status</code> to check <code className="bg-slate-800 px-2 py-0.5 rounded text-cyan-300">DNSOverTLS</code> status.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2 mt-1">•</span>
                <div className="flex-1">
                  <span className="block mb-2">
                    Edit <code className="bg-slate-800 px-2 py-0.5 rounded text-cyan-300">/etc/systemd/resolved.conf</code> and add:
                  </span>
                  <pre className="bg-slate-950 border border-slate-700 rounded-lg p-3 overflow-x-auto">
                    <code className="text-xs text-cyan-300 font-mono">
{`DNS=9.9.9.9
DNSOverTLS=yes`}
                    </code>
                  </pre>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2 mt-1">•</span>
                <span>
                  Restart: <code className="bg-slate-800 px-2 py-0.5 rounded text-cyan-300">sudo systemctl restart systemd-resolved</code>.
                </span>
              </li>
            </ul>
          </Section>

          {/* iOS Section */}
          <Section id="ios" title="iPhone / iPad (iOS 14+)" isOpen={expandedSections.ios} onToggle={toggleSection}>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2 mt-1">•</span>
                <span>Settings → Wi-Fi → the network → Configure DNS → Automatic, default is unencrypted.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2 mt-1">•</span>
                <span>Install a DNS configuration profile from your provider, for example Quad9 or Cloudflare.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2 mt-1">•</span>
                <span>Verify under Settings → General → VPN & Device Management → Profile.</span>
              </li>
            </ul>
          </Section>

          {/* Android Section */}
          <Section id="android" title="Android (9+)" isOpen={expandedSections.android} onToggle={toggleSection}>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2 mt-1">•</span>
                <span>Settings → Network & Internet → Private DNS.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2 mt-1">•</span>
                <div className="flex-1">
                  <span className="block mb-2">Select "Private DNS provider hostname" and enter one of the following:</span>
                  <ul className="space-y-1 ml-4">
                    <li className="text-cyan-300 font-mono text-xs">dns.quad9.net</li>
                    <li className="text-cyan-300 font-mono text-xs">one.one.one.one</li>
                    <li className="text-cyan-300 font-mono text-xs">dns.google</li>
                    <li className="text-cyan-300 font-mono text-xs">dns.adguard.com</li>
                    <li className="text-cyan-300 font-mono text-xs">&lt;your-id&gt;.dns.nextdns.io</li>
                  </ul>
                </div>
              </li>
            </ul>
          </Section>

          {/* ChromeOS Section */}
          <Section id="chromeos" title="Chromebook (ChromeOS)" isOpen={expandedSections.chromeos} onToggle={toggleSection}>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2 mt-1">•</span>
                <span>Clock → Settings → Network → Wi-Fi → Name servers → Custom name servers.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2 mt-1">•</span>
                <span>In Chrome: Settings → Privacy & Security → Security → Use secure DNS.</span>
              </li>
            </ul>
          </Section>
        </div>
      </section>

      {/* DNS Providers Section */}
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Encrypted DNS Providers
            </h2>
            <p className="text-slate-400 mb-6">
              The resolvers below support DNS over HTTPS and DNS over TLS. Copy any entry into your OS or browser settings.
            </p>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">Provider</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">DoH Endpoint (HTTPS)</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">DoT Hostname</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">IPs</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {providers.map((provider, index) => (
                    <tr key={index} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                      <td className="py-4 px-4">
                        <strong className="text-cyan-400">{provider.name}</strong>
                      </td>
                      <td className="py-4 px-4 font-mono text-xs text-slate-300 break-all">
                        {provider.doh}
                      </td>
                      <td className="py-4 px-4 font-mono text-xs text-slate-300 break-all">
                        {provider.dot}
                      </td>
                      <td className="py-4 px-4 font-mono text-xs text-slate-300">
                        {provider.ips}
                      </td>
                      <td className="py-4 px-4 text-slate-400 text-xs">
                        {provider.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
              {providers.map((provider, index) => (
                <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <h3 className="text-lg font-bold text-cyan-400 mb-3">{provider.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-500 block mb-1">DoH Endpoint:</span>
                      <code className="text-xs text-slate-300 font-mono break-all">{provider.doh}</code>
                    </div>
                    <div>
                      <span className="text-slate-500 block mb-1">DoT Hostname:</span>
                      <code className="text-xs text-slate-300 font-mono break-all">{provider.dot}</code>
                    </div>
                    <div>
                      <span className="text-slate-500 block mb-1">IPs:</span>
                      <code className="text-xs text-slate-300 font-mono">{provider.ips}</code>
                    </div>
                    <div>
                      <span className="text-slate-500 block mb-1">Notes:</span>
                      <span className="text-slate-400 text-xs">{provider.notes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer:</strong> Educational use only. Settings and provider information may change over time. Always verify provider policies and device support before making changes.
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
            <p className="text-slate-600">Analysis happens entirely in your browser. No data is sent anywhere.</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
