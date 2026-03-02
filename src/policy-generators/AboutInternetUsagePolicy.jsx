import React from 'react';
import { Globe, ArrowLeft } from 'lucide-react';

export default function AboutInternetUsagePolicy() {
  const handleOpenTool = () => {
    window.location.href = '/policy-generators/internet-usage-policy';
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
            <a href="/policy-generators" className="flex items-center space-x-3 group cursor-pointer">
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
                      onClick={() => window.location.href = '/policy-generators'}
                      className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-all duration-300 border border-slate-700 hover:border-cyan-500"
                      >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Business Policy Hub</span>
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
            <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
              About this tool
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Policy Generator
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Client-Side Processing
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the Internet Usage Policy Generator
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            A clear Internet Usage Policy you can adapt for employees, contractors, and approved third parties. It covers 
            acceptable use, prohibited activity, downloads and extensions, remote work and public Wi-Fi guidance, monitoring 
            notice, incident reporting, enforcement, exceptions, and review cadence. The policy is generated locally on your device.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Security Badge */}
      <section className="px-4 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-4 flex items-center space-x-3">
            <span className="text-2xl">⚡</span>
            <span className="text-cyan-300 font-semibold">Client-Side Processing, your data never leaves your browser</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {/* What this tool creates */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Overview</div>
            <h2 className="text-2xl font-bold mb-4">What this tool creates</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              A clear Internet Usage Policy you can adapt for employees, contractors, and approved third parties. It covers 
              acceptable use, prohibited activity, downloads and extensions, remote work and public Wi-Fi guidance, monitoring 
              notice, incident reporting, enforcement, exceptions, and review cadence.
            </p>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              <strong className="text-cyan-400">Note:</strong> Processing happens entirely in your browser. No inputs are sent to any server.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Client-Side Only
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                Instant Download
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-600">
                No Server Upload
              </span>
            </div>
          </div>

          {/* Why an internet usage policy matters */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Importance</div>
            <h2 className="text-2xl font-bold mb-4">Why an internet usage policy matters</h2>
            <p className="text-slate-400 leading-relaxed">
              Internet access is one of the fastest ways risk enters an organization, through phishing, malicious downloads, 
              risky browser extensions, shadow IT, data leakage, and unsafe remote work habits. A practical policy sets 
              expectations, supports consistent enforcement, and reduces confusion during incidents.
            </p>
          </div>

          {/* What to include in a strong policy */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Key Elements</div>
            <h2 className="text-2xl font-bold mb-4">What to include in a strong policy</h2>
            <p className="text-slate-400 leading-relaxed">
              The best policies are specific enough to guide behavior, but not so strict that people work around them. This 
              generator helps you document the essentials, including approved business use, reasonable personal use (if allowed), 
              prohibited activities, data handling expectations, and the monitoring notice users need to understand.
            </p>
          </div>

          {/* How to use it */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Getting Started</div>
            <h2 className="text-2xl font-bold mb-4">How to use it</h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Enter your organization name, scope, and who the policy applies to.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Define approved business use, personal use rules, and prohibited activities.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Set rules for downloads, software installs, and browser extensions.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Add remote work and public Wi-Fi guidance, plus minimum security requirements.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Define monitoring notice, incident reporting, enforcement, and exceptions.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Generate the policy, then Print to PDF or Download as TXT or Markdown.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Have leadership approve it, train users, and review it at least annually.</span>
              </li>
            </ul>
          </div>

          {/* Privacy */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Privacy</div>
            <h2 className="text-2xl font-bold mb-4">Your data stays private</h2>
            <p className="text-slate-400 leading-relaxed">
              This tool does not collect names, emails, or browsing data. The generator operates locally in your browser. 
              Your inputs remain on your device unless you choose to copy or save the output.
            </p>
          </div>

          {/* Practical rollout tips */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Best Practices</div>
            <h2 className="text-2xl font-bold mb-4">Practical rollout tips</h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Pair the policy with short onboarding training so expectations are clear from day one.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Make enforcement predictable, document the consequences, and apply them consistently.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Keep an exceptions process so business needs can be met with compensating controls.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Align wording with your other policies such as BYOD, access control, and incident response.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Review after major security events, tooling changes, or regulatory updates.</span>
              </li>
            </ul>
          </div>

          {/* Policy Coverage - Full Width */}
          <div className="md:col-span-2 bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Coverage</div>
            <h2 className="text-2xl font-bold mb-4">What the policy covers</h2>
            <ul className="grid md:grid-cols-2 gap-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Scope and applicability:</strong> Who must follow the policy and which systems are covered.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Approved business use:</strong> Legitimate work-related internet activities and resources.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Personal use guidelines:</strong> Whether and how personal internet use is permitted.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Prohibited activities:</strong> Actions that violate security, legal, or ethical standards.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Downloads and installations:</strong> Rules for software, apps, and browser extensions.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Email and messaging:</strong> Appropriate use of company communication channels.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Social media:</strong> Guidelines for representing the company and protecting sensitive information.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Data handling:</strong> How to protect company and customer information online.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Remote access and Wi-Fi:</strong> Security requirements for working from home or public locations.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">BYOD considerations:</strong> Expectations for personal devices used for work.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Monitoring notice:</strong> Transparency about what activities may be logged or reviewed.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Incident reporting:</strong> How to report suspicious activity or policy violations.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Security requirements:</strong> Minimum safeguards like updates, passwords, and VPNs.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Enforcement and consequences:</strong> What happens when the policy is violated.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Exceptions process:</strong> How to request and approve policy deviations.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Review and updates:</strong> Regular policy review cycle to stay current.</span>
              </li>
            </ul>
          </div>

          {/* Helpful references - Full Width */}
          <div className="md:col-span-2 bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Resources</div>
            <h2 className="text-2xl font-bold mb-4">Helpful references</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              If you want to align with widely used frameworks, compare your policy language to:
            </p>
            <ul className="grid md:grid-cols-2 gap-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    NIST SP 800-53 Rev. 5
                  </a> - Rules of behavior and access controls
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://www.iso.org/standard/82875.html" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    ISO/IEC 27001
                  </a> - Information security management requirements
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://www.cisecurity.org/controls/cis-controls" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    CIS Critical Security Controls
                  </a> - Security awareness and safe internet use
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://www.sans.org/security-resources/policies" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    SANS Security Policy Templates
                  </a> - Example policies and best practices
                </span>
              </li>
            </ul>
          </div>

          {/* Button Row */}
          <div className="md:col-span-2">
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={handleOpenTool}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              >
                <Globe className="w-5 h-5" />
                <span>Open Internet Usage Policy Generator</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
              >
                <span className="text-lg">🖨️</span>
                <span>Print This Page</span>
              </button>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="md:col-span-2">
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
              <p className="text-sm text-slate-400 leading-relaxed">
                <strong className="text-cyan-400">Legal Disclaimer:</strong> This page is informational and not legal advice. Tailor the policy to your jurisdiction, sector, contracts, and operational context. Have qualified legal and security professionals review before adoption or publication.
              </p>
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
