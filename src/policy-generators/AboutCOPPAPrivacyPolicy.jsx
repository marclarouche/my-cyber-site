import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';

export default function AboutCOPPAPrivacyPolicy() {
  const handleOpenTool = () => {
    window.location.href = '/policy-generators/coppa-privacy-policy';
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
              Privacy Policy Generator
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Client-Side Processing
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the COPPA Privacy Policy Generator
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            The Children's Online Privacy Protection Act (COPPA) is a U.S. federal law that regulates how websites, apps, and online 
            services collect and handle personal information from children under 13. If your service knowingly collects data from kids, 
            or if your audience is likely to include them, you are legally required to provide a COPPA-compliant privacy notice.
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
            <span className="text-cyan-300 font-semibold">Client-Side Processing — Your Data Never Leaves Your Browser</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {/* How This Tool Helps */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Overview</div>
            <h2 className="text-2xl font-bold mb-4">How This Tool Helps</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              This generator allows you to create a clear and understandable privacy policy tailored to child data collection practices. 
              By answering a few questions, you will generate a downloadable and copy-ready notice suitable for your website, 
              application, or parental consent workflow.
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

          {/* How to Use the Tool */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Getting Started</div>
            <h2 className="text-2xl font-bold mb-4">How to Use the Tool</h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Enter your business or organization's name.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Specify whether the service is directed at children under 13.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>List any personal information collected (e.g., usernames, photos, IP addresses).</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Identify parental consent methods used, if any.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Click "Generate Notice" to create your policy text.</span>
              </li>
            </ul>
            <p className="text-slate-400 mt-4 leading-relaxed">
              You can then copy, post, or download the generated notice.
            </p>
          </div>

          {/* What COPPA Requires */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Compliance</div>
            <h2 className="text-2xl font-bold mb-4">What COPPA Requires</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              COPPA compliance involves several key requirements to protect children's privacy online:
            </p>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Clear notice of what information is collected from children under 13.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Direct notice to parents about your information practices.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Verifiable parental consent before collecting, using, or disclosing personal information.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Parental access to their child's information and ability to delete it.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Reasonable security measures to protect collected information.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Data retention and deletion policies limited to necessary purposes.</span>
              </li>
            </ul>
          </div>

          {/* Important Considerations */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Key Points</div>
            <h2 className="text-2xl font-bold mb-4">Important Considerations</h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>COPPA applies if your service is directed to children under 13 or if you have actual knowledge you're collecting their data.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>The law covers websites, apps, connected devices, and online services.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Personal information includes names, addresses, emails, photos, audio, video, geolocation, and persistent identifiers.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Violations can result in significant penalties from the Federal Trade Commission (FTC).</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>This generator creates a starting point - legal review is essential before deployment.</span>
              </li>
            </ul>
          </div>

          {/* Helpful References - Full Width */}
          <div className="md:col-span-2 bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Resources</div>
            <h2 className="text-2xl font-bold mb-4">Helpful References</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              For more information about COPPA compliance and requirements:
            </p>
            <ul className="grid md:grid-cols-2 gap-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    FTC COPPA FAQs
                  </a> (official guidance from the Federal Trade Commission)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    COPPA Rule Text
                  </a> (the full text of the regulation)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://www.ftc.gov/tips-advice/business-center/guidance/complying-coppa-frequently-asked-questions-0" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    COPPA Compliance Resources
                  </a> (business guidance and best practices)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://www.ftc.gov/business-guidance/resources/protecting-consumer-privacy-kids-apps" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    Mobile App Developer Resources
                  </a> (specific guidance for app developers)
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
                <Shield className="w-5 h-5" />
                <span>Open COPPA Privacy Policy Generator</span>
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
                <strong className="text-cyan-400">Legal Disclaimer:</strong> This tool and page are provided for informational and educational purposes only and do not constitute legal advice. COPPA compliance may involve additional requirements depending on your data collection practices, business model, technology stack, and jurisdiction. Consult a qualified attorney before publishing or relying upon any generated text. Use of this tool does not create an attorney-client relationship, and no warranties are made regarding completeness, accuracy, or fitness for a particular purpose.
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
