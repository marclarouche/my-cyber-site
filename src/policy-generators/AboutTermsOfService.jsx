import React from 'react';
import { FileText, ArrowLeft, Shield } from 'lucide-react';

export default function AboutTermsOfService() {
  const handleOpenTool = () => {
    window.location.href = '/policy-generators/terms-of-service';
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
              Legal Generator
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Client-Side Processing
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the Terms of Service Generator
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            Learn what a Terms of Service covers, why it matters, and how to generate a clear agreement for your website or app.
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
          {/* What is a Terms of Service */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Overview</div>
            <h2 className="text-2xl font-bold mb-4">What is a Terms of Service?</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              A Terms of Service is a contract between your organization and your users. It explains the rules for using your service, 
              the rights and responsibilities of each party, and the limits on liability. It also sets expectations for acceptable use, 
              payments, account management, dispute handling, and changes to the service.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Publishing a clear Terms of Service helps users understand how your service works, reduces misunderstandings, and supports 
              enforcement when people misuse the platform.
            </p>
          </div>

          {/* Why it matters */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Importance</div>
            <h2 className="text-2xl font-bold mb-4">Why it matters</h2>
            <ul className="space-y-3 text-slate-400 mb-4">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>It clarifies what users can expect from the service and what you expect from them.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>It sets rules for content, conduct, and security so you can act on violations.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>It documents payment terms, renewals, and refunds for transparency.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>It limits risk by defining warranties, liability, and dispute procedures.</span>
              </li>
            </ul>
            <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-lg p-3">
              <p className="text-sm text-slate-300">
                <strong className="text-cyan-400">Tip:</strong> Your Terms of Service should align with your Privacy Policy, Acceptable Use Policy, 
                and support materials so visitors get a consistent message.
              </p>
            </div>
          </div>

          {/* How to use the generator */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Getting Started</div>
            <h2 className="text-2xl font-bold mb-4">How to use the generator</h2>
            <ol className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">1.</span>
                <span>Open the tool with the button below. All inputs are processed locally in your browser.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">2.</span>
                <span>Enter your company name, service name or URL, and a support or legal contact.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">3.</span>
                <span>Provide short summaries for acceptable use, accounts and eligibility, payments and refunds, and intellectual property.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">4.</span>
                <span>Add a link to your Privacy Policy and a brief overview of your security practices.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">5.</span>
                <span>Set your governing law and dispute approach. Choose the location that best fits your operations.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">6.</span>
                <span>Include termination conditions, change notifications, and a mailing address for notices.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">7.</span>
                <span>Select Generate. Copy the result into your site's legal page or export it for further editing.</span>
              </li>
            </ol>
            <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-lg p-3 mt-4">
              <p className="text-sm text-slate-300">
                <strong className="text-cyan-400">Note:</strong> Have legal counsel review the final document and tailor it to your jurisdiction 
                and risk profile.
              </p>
            </div>
          </div>

          {/* Key clauses to include */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Key Elements</div>
            <h2 className="text-2xl font-bold mb-4">Key clauses to include</h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Eligibility and accounts</strong> — Age limits, accurate information, and credential security.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Acceptable use</strong> — No illegal activity, malware, or attempts to bypass security. Clear rules for scraping and abuse.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Subscriptions and payments</strong> — Billing cycles, renewals, taxes, and refund practices.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Intellectual property</strong> — Ownership of service content and user rights to their own content.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Privacy and security</strong> — Link to your Privacy Policy and describe high-level safeguards.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Third-party services</strong> — Scope of responsibility when integrations are used.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Warranties and liability</strong> — "As is" terms and reasonable caps where permitted.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Disputes and governing law</strong> — Process for resolving issues and the legal venue.</span>
              </li>
            </ul>
          </div>

          {/* Helpful references */}
          <div className="md:col-span-2 bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">References</div>
            <h2 className="text-2xl font-bold mb-4">Helpful references</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              When creating your Terms of Service, consider reviewing these resources for guidance on legal and compliance requirements:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <a 
                href="https://www.ftc.gov/business-guidance" 
                target="_blank" 
                rel="noopener"
                className="bg-slate-800/50 border border-slate-600 rounded-lg p-4 hover:border-cyan-500/50 transition-colors group"
              >
                <h3 className="text-cyan-400 font-semibold mb-2 group-hover:text-cyan-300">FTC Business Guidance</h3>
                <p className="text-slate-400 text-sm">Federal Trade Commission guidance on business practices and consumer protection.</p>
              </a>
              <a 
                href="https://www.iso.org/standard/27001" 
                target="_blank" 
                rel="noopener"
                className="bg-slate-800/50 border border-slate-600 rounded-lg p-4 hover:border-cyan-500/50 transition-colors group"
              >
                <h3 className="text-cyan-400 font-semibold mb-2 group-hover:text-cyan-300">ISO 27001 Overview</h3>
                <p className="text-slate-400 text-sm">Information security management system requirements and best practices.</p>
              </a>
              <a 
                href="https://www.nist.gov/privacy-framework" 
                target="_blank" 
                rel="noopener"
                className="bg-slate-800/50 border border-slate-600 rounded-lg p-4 hover:border-cyan-500/50 transition-colors group"
              >
                <h3 className="text-cyan-400 font-semibold mb-2 group-hover:text-cyan-300">NIST Privacy Framework</h3>
                <p className="text-slate-400 text-sm">Framework for managing privacy risk and protecting individual privacy.</p>
              </a>
            </div>
          </div>

          {/* Button Row */}
          <div className="md:col-span-2">
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={handleOpenTool}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              >
                <FileText className="w-5 h-5" />
                <span>Open Terms of Service Generator</span>
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
                <strong className="text-cyan-400">Legal Disclaimer:</strong> This page and the Terms of Service Generator are educational resources 
                and do not constitute legal advice. Laws and requirements vary by jurisdiction and industry. The generated content is a starting 
                point and should be reviewed and customized by a qualified attorney. Using this site does not create an attorney-client relationship. 
                No warranty is made regarding completeness, accuracy, or suitability for a particular purpose.
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
