import React from 'react';
import { Share2, ArrowLeft, Shield } from 'lucide-react';

export default function AboutSocialMediaPolicy() {
  const handleOpenTool = () => {
    window.location.href = '/policy-generators/social-media-policy';
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
            About the Social Media Policy Generator
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            Generate a comprehensive Social Media Policy that guides employees on appropriate social media use, protects your company's reputation, 
            and establishes clear guidelines for both official and personal social media activity.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Security Badge */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-4 flex items-center justify-center space-x-3">
            <Shield className="w-6 h-6 text-cyan-400" />
            <span className="text-cyan-300 font-semibold">Client-Side Processing – Your Data Stays Local</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {/* What it does */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Overview</div>
            <h2 className="text-2xl font-bold mb-4">What this tool does</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              This generator creates a comprehensive social media policy tailored to your organization's needs. 
              It helps you establish guidelines for official company accounts, personal social media use by employees, 
              content standards, security requirements, and incident response procedures. The policy addresses both 
              brand protection and employee guidance in a clear, actionable format.
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

          {/* How to use it */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Getting Started</div>
            <h2 className="text-2xl font-bold mb-4">How to use it</h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Enter your organization name and define the purpose and scope of your social media policy.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>List your official social media accounts and platforms, plus identify who the policy applies to.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Define core principles such as respect, accuracy, transparency, and brand protection.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Specify acceptable use expectations and prohibited activities for social media interactions.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Set content and brand guidelines, approval requirements, and personal use expectations.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Define confidentiality rules, privacy protections, and security requirements for accounts.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Establish incident response procedures, retention requirements, and enforcement mechanisms.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Generate the policy, then copy, download, or print and save as PDF for distribution.</span>
              </li>
            </ul>
          </div>

          {/* What it covers */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Coverage</div>
            <h2 className="text-2xl font-bold mb-4">What it covers</h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Purpose, scope, covered accounts and platforms, and who must follow the policy.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Core principles for professional, respectful, and accurate social media engagement.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Acceptable use expectations and comprehensive list of prohibited activities.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Content guidelines, brand voice, logo usage, and accessibility requirements.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Posting authority, approval workflows, and handling of time-sensitive content.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Personal social media use guidelines and required disclaimers when referencing the company.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Confidentiality requirements, intellectual property protection, and customer data privacy.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Account security requirements including MFA, password management, and access controls.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Third-party tool requirements, vendor management, and influencer partnerships.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Incident handling procedures for compromises, misinformation, and legal threats.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Recordkeeping, retention requirements, and legal hold procedures.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Monitoring approach, enforcement procedures, and policy review cadence.</span>
              </li>
            </ul>
          </div>

          {/* Helpful references */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">References</div>
            <h2 className="text-2xl font-bold mb-4">Helpful references</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              When developing your social media policy, consider aligning with relevant standards and regulations:
            </p>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    FTC Endorsement Guides
                  </a> (for disclosures and sponsored content requirements)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://gdpr.eu/" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    GDPR
                  </a> (General Data Protection Regulation for privacy and data handling)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://www.nlrb.gov/about-nlrb/rights-we-protect/your-rights/employer-union-rights-and-obligations" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    NLRB Guidelines
                  </a> (National Labor Relations Board guidance on employee social media rights)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://www.iso.org/standard/82875.html" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    ISO/IEC 27001
                  </a> (information security management for social media account protection)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    NIST SP 800-53 Rev. 5
                  </a> (security controls for access management and incident response)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Industry-specific regulations (HIPAA for healthcare, FINRA for financial services, etc.)</span>
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
                <Share2 className="w-5 h-5" />
                <span>Open Social Media Policy Generator</span>
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
                <strong className="text-cyan-400">Legal Disclaimer:</strong> This page and tool are provided for informational and educational purposes only and do not constitute legal advice, employment law guidance, or a comprehensive communications strategy. Social media policies must comply with employment law, labor relations regulations, privacy requirements, and industry-specific rules that vary by jurisdiction and sector. Organizations must tailor content to their specific environment, brand values, and cultural context. Obtain review from qualified legal counsel, HR professionals, and communications experts before adopting any generated text. Use of this site does not create an attorney-client relationship, and no warranties are made regarding completeness, accuracy, or fitness for a particular purpose.
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
