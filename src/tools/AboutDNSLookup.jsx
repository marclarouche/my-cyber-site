import React from 'react';
import { Search, ArrowLeft, Shield, Globe, Server, Mail, FileText, Link as LinkIcon, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';

export default function AboutDNSLookup() {
  const handleOpenTool = () => {
    window.location.href = '/tools/dns-lookup';
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
              DNS Tool Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Network Troubleshooting
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the DNS Lookup Tool
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            What it does, how it protects your privacy, and how to read the results with confidence.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          
          {/* What the Tool Does */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              What the Tool Does
            </h2>
            <p className="text-slate-300 leading-relaxed">
              This tool retrieves DNS records for a domain and presents them in a clean, readable way. You can select record types, run the query, then copy values for documentation or troubleshooting. Everything renders locally in your browser and the query is sent over HTTPS to a public DNS resolver.
            </p>
          </div>

          {/* Why DNS Records Matter */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Why DNS Records Matter
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Domain Name System records describe where services for a domain live. They direct web traffic, route email, point to aliases, and reveal the authoritative servers for a zone. When something breaks on a website or in email delivery, DNS is often the first place to check.
            </p>
          </div>

          {/* Types of DNS Records */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Types of DNS Records
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Globe className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <div className="text-slate-300">
                  <strong className="text-cyan-400">A and AAAA:</strong> Map a hostname to an IP address (IPv4 and IPv6).
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <div className="text-slate-300">
                  <strong className="text-cyan-400">MX:</strong> Identifies mail servers for the domain.
                </div>
              </div>
              <div className="flex items-start">
                <FileText className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <div className="text-slate-300">
                  <strong className="text-cyan-400">TXT:</strong> Carries verification tokens and SPF/DKIM values.
                </div>
              </div>
              <div className="flex items-start">
                <LinkIcon className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <div className="text-slate-300">
                  <strong className="text-cyan-400">CNAME:</strong> Creates an alias from one hostname to another.
                </div>
              </div>
              <div className="flex items-start">
                <Server className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <div className="text-slate-300">
                  <strong className="text-cyan-400">NS:</strong> Declares authoritative name servers for the domain.
                </div>
              </div>
              <div className="flex items-start">
                <Server className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <div className="text-slate-300">
                  <strong className="text-cyan-400">SOA:</strong> Contains zone metadata like primary nameserver and cache values.
                </div>
              </div>
            </div>
          </div>

          {/* How the Tool Works */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              How the Tool Works
            </h2>
            <p className="text-slate-300 leading-relaxed">
              The page builds a DNS-over-HTTPS request and sends it to a public resolver. The response contains records for the types you selected, with time to live values and data fields. The page does not send analytics and it does not include third-party trackers.
            </p>
          </div>

          {/* Privacy and Security Notes */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Privacy and Security Notes
            </h2>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start">
                <Shield className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <span>No analytics or tracking scripts on this page.</span>
              </li>
              <li className="flex items-start">
                <Shield className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <span>No cookies or local storage are required for basic use.</span>
              </li>
              <li className="flex items-start">
                <Shield className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <span>All rendering happens locally in your browser, which protects you from potential script injections in DNS records.</span>
              </li>
            </ul>
          </div>

          {/* Interpreting Results */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Interpreting Results
            </h2>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <strong className="text-cyan-400">Multiple A or AAAA records:</strong> Load balancing or anycast.
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <strong className="text-cyan-400">MX priority:</strong> Lower values indicate higher priority servers.
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <strong className="text-cyan-400">TXT records:</strong> Look for SPF, DKIM, and DMARC for email authentication.
                </div>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <strong className="text-yellow-400">Unexpected CNAME:</strong> Ensure aliases point to intended domains.
                </div>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <strong className="text-yellow-400">Authoritative mismatch:</strong> If NS records don't match your registrar, check for misconfiguration.
                </div>
              </li>
            </ul>
          </div>

          {/* Troubleshooting */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Troubleshooting
            </h2>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Ensure the domain is typed correctly, e.g., use <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">example.com</code> instead of <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm">https://example.com</code>.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Try again after a few minutes if caching or throttling is causing outdated results.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Check TTL values to estimate how long cached results may persist.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Consider using an alternate resolver if regional issues arise.</span>
              </li>
            </ul>
          </div>

          {/* Helpful References */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Helpful References
            </h2>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start">
                <ExternalLink className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <a 
                  href="https://www.rfc-editor.org/rfc/rfc1035" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  RFC 1035: Domain Names, Implementation and Specification
                </a>
              </li>
              <li className="flex items-start">
                <ExternalLink className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <a 
                  href="https://www.rfc-editor.org/rfc/rfc8484" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  RFC 8484: DNS over HTTPS
                </a>
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <Search className="w-5 h-5" />
              <span>🔍 Open DNS Lookup</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print this Page</span>
            </button>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer:</strong> This page is provided for informational and troubleshooting purposes. DNS answers come from the resolver you query and are presented as is. Results, interpretations, and any actions you take are your responsibility. No warranty is expressed or implied, and availability of third-party services may change at any time.
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
