import React from 'react';
import { Key, ArrowLeft } from 'lucide-react';

export default function AboutPasswordMFAPolicy() {
  const handleOpenTool = () => {
    window.location.href = '/policy-generators/password-mfa-policy';
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

            <a href="/policy-generators" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Business Policy Hub</span>
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
              Policy Generator
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Client-Side Processing
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the Password & MFA Policy Generator
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            Learn why strong password and multi-factor authentication policies matter and how this tool helps you craft one. Generate 
            a comprehensive policy that defines how employees and users should create, manage, and protect authentication credentials.
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
            <span className="text-cyan-300 font-semibold">Client-Side Processing — Your Data Stays Local</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {/* What is a Password & MFA Policy */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Overview</div>
            <h2 className="text-2xl font-bold mb-4">What is a Password & MFA Policy?</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              A Password & Multi-Factor Authentication (MFA) Policy defines how employees and users should create, manage, and 
              protect authentication credentials. It helps reduce unauthorized access and supports compliance with standards like 
              ISO/IEC 27001, NIST SP 800-63, and SOC 2.
            </p>
            <p className="text-slate-400 leading-relaxed">
              The policy covers areas such as password complexity, expiration, storage, and MFA enrollment requirements for 
              sensitive systems.
            </p>
          </div>

          {/* When is it needed */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Applicability</div>
            <h2 className="text-2xl font-bold mb-4">When is it needed?</h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Your organization handles sensitive or personal data that must remain secure.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>You manage systems with administrative or privileged access accounts.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>You need to meet compliance frameworks that require formal authentication controls.</span>
              </li>
            </ul>
          </div>

          {/* How to use the generator */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Getting Started</div>
            <h2 className="text-2xl font-bold mb-4">How to use the Password & MFA Policy Generator</h2>
            <ol className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">1.</span>
                <span>Open the tool using the button below.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">2.</span>
                <span>Enter your organization name, password requirements, MFA options, and enforcement rules.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">3.</span>
                <span>Click <strong className="text-slate-300">Generate Policy</strong> to create a ready-to-use document within your browser.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">4.</span>
                <span>Print or save the result for internal policy documentation or employee handbooks.</span>
              </li>
            </ol>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed">
              <strong className="text-cyan-400">Note:</strong> This tool operates locally and does not store or transmit any entered data.
            </p>
          </div>

          {/* Key elements of a strong policy */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Key Components</div>
            <h2 className="text-2xl font-bold mb-4">Key elements of a strong policy</h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Password Length and Complexity:</strong> Minimum character count, mixed types, or passphrases.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">MFA Enforcement:</strong> Requiring two or more factors for privileged accounts.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Rotation and Lockout:</strong> Reasonable reset intervals and lockout thresholds.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Secure Recovery:</strong> Verified identity for password resets.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Training and Awareness:</strong> Educating users on password hygiene and phishing prevention.</span>
              </li>
            </ul>
          </div>

          {/* Tips for implementation */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Best Practices</div>
            <h2 className="text-2xl font-bold mb-4">Tips for implementation</h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Integrate MFA in all administrative portals and VPNs.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Adopt password managers for secure credential handling.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Monitor failed login patterns to detect potential brute-force attacks.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Review your policy annually as authentication standards evolve.</span>
              </li>
            </ul>
          </div>

          {/* Why this matters - Full Width */}
          <div className="md:col-span-2 bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Importance</div>
            <h2 className="text-2xl font-bold mb-4">Why strong authentication policies matter</h2>
            <div className="grid md:grid-cols-3 gap-4 text-slate-400">
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                <h3 className="text-cyan-400 font-semibold mb-2">Security Foundation</h3>
                <p className="text-sm leading-relaxed">
                  Passwords are the first line of defense. Weak credentials are the most common entry point for attackers, 
                  making strong authentication essential.
                </p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-blue-400 font-semibold mb-2">Compliance Requirements</h3>
                <p className="text-sm leading-relaxed">
                  Many frameworks (ISO 27001, NIST, SOC 2, PCI DSS) require documented authentication policies and MFA for 
                  privileged access.
                </p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-purple-400 font-semibold mb-2">User Education</h3>
                <p className="text-sm leading-relaxed">
                  A clear policy helps users understand expectations, reducing support tickets and improving overall security 
                  awareness.
                </p>
              </div>
            </div>
          </div>

          {/* Helpful references - Full Width */}
          <div className="md:col-span-2 bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Resources</div>
            <h2 className="text-2xl font-bold mb-4">Helpful references</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              For guidance on password and authentication best practices:
            </p>
            <ul className="grid md:grid-cols-2 gap-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://pages.nist.gov/800-63-3/sp800-63b.html" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    NIST SP 800-63B
                  </a> - Digital Identity Guidelines for Authentication
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
                  </a> - Safeguards for access control management
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://www.cisa.gov/mfa" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    CISA MFA Resources
                  </a> - Government guidance on multi-factor authentication
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
                <Key className="w-5 h-5" />
                <span>Open Password & MFA Policy Generator</span>
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
                <strong className="text-cyan-400">Legal Disclaimer:</strong> This page and the Password & MFA Policy Generator are provided for educational purposes only and do not constitute legal or cybersecurity advice. Generated content should be reviewed and tailored by qualified professionals to fit your organization's specific needs and applicable regulations. Use of this tool does not create a legal, professional, or consulting relationship, and no warranty is provided regarding completeness or accuracy.
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
