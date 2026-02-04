import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';

export default function AboutDataProcessingAgreement() {
  const handleOpenTool = () => {
    window.location.href = '/policy-generators/data-processing-policy';
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
              Agreement Generator
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Client-Side Processing
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the Data Processing Agreement (DPA) Generator
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            A Data Processing Agreement is a contract between a <strong>Controller</strong> and a <strong>Processor</strong> that 
            explains how personal data is handled. The Controller decides why and how personal data is used. The Processor handles 
            that data on the Controller's behalf, for example by hosting, storing, analyzing, or supporting a service.
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
          {/* What is a DPA */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Overview</div>
            <h2 className="text-2xl font-bold mb-4">What is a DPA?</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              A Data Processing Agreement is a contract between a <strong>Controller</strong> and a <strong>Processor</strong> that 
              explains how personal data is handled. The Controller decides why and how personal data is used. The Processor handles 
              that data on the Controller's behalf, for example by hosting, storing, analyzing, or supporting a service.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Laws such as the EU and UK GDPR require a written DPA when a Processor handles personal data for a Controller. The 
              agreement sets responsibilities, security expectations, breach notification duties, and rules for subcontractors known 
              as subprocessors.
            </p>
          </div>

          {/* When do you need a DPA */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Applicability</div>
            <h2 className="text-2xl font-bold mb-4">When do you need a DPA?</h2>
            <ul className="space-y-3 text-slate-400 mb-4">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>You provide a product or service that processes personal data for business customers, for example a SaaS app or managed support.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>You hire vendors who will access customer personal data, for example a cloud host or analytics platform. In that case, you are the Controller and the vendor is your Processor or subprocessor.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Your customers ask for a GDPR-compliant contract before sharing customer records, employee information, or other personal data.</span>
              </li>
            </ul>
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Note:</strong> If you only process data for your own company's needs and do not handle 
              personal data on behalf of others, a DPA may not apply to those specific activities.
            </p>
          </div>

          {/* What does a good DPA include */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Key Components</div>
            <h2 className="text-2xl font-bold mb-4">What does a good DPA include?</h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Purpose and scope.</strong> A clear description of the services and the types of personal data being processed.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Roles and responsibilities.</strong> A statement that the Processor acts only on documented instructions from the Controller.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Security measures.</strong> Practical safeguards such as encryption, access control, logging, and multi-factor authentication.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Subprocessors.</strong> Rules for using third parties, including notice and responsibility for their compliance.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Data subject rights assistance.</strong> Help the Controller respond to access or deletion requests where required by law.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Breach notification.</strong> Timely notice to the Controller if an incident affects personal data you handle.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">International transfers.</strong> The lawful basis for cross-border transfers where applicable.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Return and deletion.</strong> What happens to personal data when the service ends.</span>
              </li>
            </ul>
          </div>

          {/* How to use the DPA Generator */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Getting Started</div>
            <h2 className="text-2xl font-bold mb-4">How to use the DPA Generator</h2>
            <ol className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">1.</span>
                <span>Open the tool with the button below. All fields are processed locally in your browser.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">2.</span>
                <span>Enter the <strong className="text-slate-300">Controller</strong> name, your <strong className="text-slate-300">Processor</strong> name, your website, and a contact email for privacy matters.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">3.</span>
                <span>List the <strong className="text-slate-300">types of personal data</strong> you handle, for example names, emails, IP addresses, and usage data.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">4.</span>
                <span>Describe the <strong className="text-slate-300">purpose</strong> of processing, for example providing a SaaS service or support.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">5.</span>
                <span>Summarize your <strong className="text-slate-300">security measures</strong>, for example encryption, MFA, access controls, and logging.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">6.</span>
                <span>Identify any <strong className="text-slate-300">subprocessors</strong>, for example cloud hosting or payment providers.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">7.</span>
                <span>Specify a sensible <strong className="text-slate-300">retention period</strong> and deletion approach after the service ends.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">8.</span>
                <span>Select "Generate". Copy the output to your legal document template or download it from your site's workflow if offered.</span>
              </li>
            </ol>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed">
              <strong className="text-cyan-400">Note:</strong> This generator provides a structured starting point. A lawyer should 
              review your final DPA to match your exact services, jurisdictions, and risk profile.
            </p>
          </div>

          {/* Practical tips */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Best Practices</div>
            <h2 className="text-2xl font-bold mb-4">Practical tips</h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Keep a current list of subprocessors and share changes with customers when contracts require it.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Align the DPA with your privacy notice and your technical controls so they tell the same story.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Map data flows for common use cases. This helps you respond to customer due-diligence questions.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Test your incident response plan and document timelines for notifying customers about security events.</span>
              </li>
            </ul>
          </div>

          {/* FAQs */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">FAQs</div>
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 text-slate-400">
              <div>
                <p className="font-semibold text-slate-300 mb-1">Does this tool store my inputs?</p>
                <p className="text-sm">No. It works entirely on the client side. Nothing is sent to a server by the generator page.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-300 mb-1">Is the generated text legally sufficient?</p>
                <p className="text-sm">It is a template. You should have a lawyer review and tailor it to your services and laws that apply to you.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-300 mb-1">Can I add custom clauses?</p>
                <p className="text-sm">Yes. Paste the generated text into your document editor and expand sections such as international transfers or audits.</p>
              </div>
            </div>
          </div>

          {/* Helpful references - Full Width */}
          <div className="md:col-span-2 bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Resources</div>
            <h2 className="text-2xl font-bold mb-4">Helpful references</h2>
            <ul className="grid md:grid-cols-2 gap-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    GDPR Article 28
                  </a> on Processor requirements, including content of a DPA (official text on EUR-Lex)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/accountability-and-governance/contracts/" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    UK ICO Guidance
                  </a> on DPAs and vendor due diligence
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    NIST SP 800-53
                  </a> security control frameworks for inspiration
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://www.iso.org/standard/82875.html" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    ISO 27001 Annex A
                  </a> controls for data protection and security measures
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
                <FileText className="w-5 h-5" />
                <span>Open DPA Generator</span>
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
                <strong className="text-cyan-400">Legal Disclaimer:</strong> This page and the DPA Generator are educational resources and do not constitute legal advice. Regulations vary by jurisdiction and industry. The generated agreement is a starting point and should be reviewed and customized by a qualified attorney. Using this site does not create an attorney-client relationship. No warranty is made regarding completeness or suitability for a particular purpose.
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
