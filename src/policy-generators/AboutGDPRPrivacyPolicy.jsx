import React from 'react';
import { Globe, ArrowLeft } from 'lucide-react';

export default function AboutGDPRPrivacyPolicy() {
  const handleOpenTool = () => {
    window.location.href = '/policy-generators/gdpr-privacy-policy';
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
            About the GDPR Privacy Policy Generator
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            Understand what a GDPR Privacy Policy is, why it matters for your website or service, and how to generate a clear 
            document in minutes.
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
            <span className="text-cyan-300 font-semibold">Client-Side Processing, your data stays local</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {/* What is a GDPR Privacy Policy */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Overview</div>
            <h2 className="text-2xl font-bold mb-4">What is a GDPR Privacy Policy?</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              A GDPR Privacy Policy explains how your organization collects, uses, shares, and protects personal data. It describes 
              your legal bases for processing, the rights available to individuals, the categories of data involved, the purposes of 
              use, and how long information is retained.
            </p>
            <p className="text-slate-400 leading-relaxed">
              The policy also clarifies contact details for privacy questions, how to submit access or deletion requests, and whether 
              data is transferred internationally. Publishing a clear policy improves transparency and helps you meet obligations under 
              the EU and UK GDPR.
            </p>
          </div>

          {/* Why it matters */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Importance</div>
            <h2 className="text-2xl font-bold mb-4">Why it matters</h2>
            <ul className="space-y-3 text-slate-400 mb-4">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>It gives people practical insight into your data practices and builds trust.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>It documents your legal bases for processing so visitors understand why data is collected.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>It helps you demonstrate accountability for audits and customer due diligence.</span>
              </li>
            </ul>
            <p className="text-sm text-slate-400 leading-relaxed bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
              <strong className="text-cyan-400">Tip:</strong> A GDPR Privacy Policy complements other controls such as records of 
              processing activities, a Data Processing Agreement when you act as a Processor, and cookie consent where required.
            </p>
          </div>

          {/* How to use the generator */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Getting Started</div>
            <h2 className="text-2xl font-bold mb-4">How to use the generator</h2>
            <ol className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">1.</span>
                <span>Open the tool with the button below. All fields are processed locally in your browser.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">2.</span>
                <span>Enter your organization name, website, and privacy contact information.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">3.</span>
                <span>Describe the categories of personal data you collect and the purposes of processing.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">4.</span>
                <span>Specify your legal bases such as consent, contract, legitimate interests, or legal obligation.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">5.</span>
                <span>Outline how users can exercise rights to access, rectification, deletion, restriction, portability, and objection.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">6.</span>
                <span>Note whether you use processors or subprocessors and list key services that handle personal data.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">7.</span>
                <span>Explain retention periods and high level security measures such as encryption and access controls.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">8.</span>
                <span>Select Generate. Copy the output into your website's policy page or export to your preferred format.</span>
              </li>
            </ol>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed">
              <strong className="text-cyan-400">Note:</strong> Have legal counsel review the final text to match your jurisdictions, 
              products, and risk profile.
            </p>
          </div>

          {/* What a strong policy includes */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Key Components</div>
            <h2 className="text-2xl font-bold mb-4">What a strong policy includes</h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Controller details.</strong> Company name, address, and contact methods for privacy inquiries.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Data categories.</strong> The types of personal data you collect and from whom.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Purposes and legal bases.</strong> Why you process data and the lawful basis for each purpose.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Sharing and subprocessors.</strong> Which parties receive data and why.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">International transfers.</strong> Safeguards used for cross border data movement.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Retention timelines.</strong> How long information is kept and the criteria used.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Security overview.</strong> High level measures used to protect personal data.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Individual rights.</strong> How to submit requests and what to expect in response.</span>
              </li>
            </ul>
          </div>

          {/* Practical tips */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Best Practices</div>
            <h2 className="text-2xl font-bold mb-4">Practical tips</h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Keep your policy readable. Short paragraphs and plain language help visitors understand your practices.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Align your policy with your cookie banner, consent records, and internal data maps.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Review the policy at regular intervals or when products and vendors change.</span>
              </li>
            </ul>
          </div>

          {/* FAQs */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">FAQs</div>
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 text-slate-400">
              <div>
                <p className="font-semibold text-slate-300 mb-1">Does this tool store my inputs?</p>
                <p className="text-sm">No. It runs entirely in your browser and does not transmit inputs to a server.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-300 mb-1">Is this a complete legal solution?</p>
                <p className="text-sm">It is a template. A lawyer should review your final text for accuracy and coverage.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-300 mb-1">Can I customize sections?</p>
                <p className="text-sm">Yes. Paste into your content editor and tailor the language for your organization.</p>
              </div>
            </div>
          </div>

          {/* Helpful references - Full Width */}
          <div className="md:col-span-2 bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Resources</div>
            <h2 className="text-2xl font-bold mb-4">Helpful references</h2>
            <ul className="grid md:grid-cols-2 gap-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    General Data Protection Regulation (EU) 2016/679
                  </a>
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    UK ICO guidance on UK GDPR
                  </a>
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://www.iso.org/standard/27001" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    ISO 27001 overview
                  </a>
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://www.nist.gov/privacy-framework" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    NIST Privacy Framework
                  </a>
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
                <span>Open GDPR Privacy Policy Generator</span>
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
                <strong className="text-cyan-400">Legal Disclaimer:</strong> This page and the GDPR Privacy Policy Generator are educational resources and do not constitute legal advice. Regulations vary by jurisdiction and industry. The generated content is a starting point and should be reviewed and customized by a qualified attorney. Using this site does not create an attorney-client relationship. No warranty is made regarding completeness, accuracy, or suitability for a particular purpose.
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
