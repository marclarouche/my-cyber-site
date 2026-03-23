import React from 'react';
import { ClipboardList, ArrowLeft } from 'lucide-react';

export default function AboutRequestForProposal() {
  const handleOpenTool = () => {
    window.location.href = '/policy-generators/request-for-proposal';
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
              Document Generator
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Client-Side Processing
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the RFP Generator
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            This page explains how to use the Request for Proposal (RFP) Generator to create clear, structured RFPs for technical 
            writing, cybersecurity, software projects, and other IT services. The generator guides you through a short set of questions, 
            then produces a complete, ready-to-edit document written in the voice of a technical documentation manager.
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
          {/* What the RFP Generator does */}
          <div className="md:col-span-2 bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Overview</div>
            <h2 className="text-2xl font-bold mb-4">What the RFP Generator does</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              The RFP Generator helps you produce a complete Request for Proposal that you can share with vendors, purchasing teams, 
              or leadership. It builds a structured draft that reads like it was prepared by someone who has managed technical 
              documentation programs and vendor delivery expectations.
            </p>
            <p className="text-slate-400 leading-relaxed">
              You can tailor the output in two key ways. First, you select the type of engagement you are running—for example: technical 
              writing, cybersecurity consulting, software development, IT infrastructure, or general IT services. Second, you choose the 
              level of detail, from a simple lightweight RFP to a fully detailed enterprise-style package.
            </p>
          </div>

          {/* Who this tool is for */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Audience</div>
            <h2 className="text-2xl font-bold mb-4">Who this tool is for</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              This generator is designed for people who need to run technical projects but do not want to start from a blank page 
              every time. It is especially useful for:
            </p>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Technical documentation managers and content leaders who work with external vendors</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Security, engineering, and IT managers who need structured vendor responses</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Project managers and product owners coordinating cross-team initiatives</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Small organizations and non-profits without dedicated procurement staff</span>
              </li>
            </ul>
          </div>

          {/* RFP Types Available */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Customization</div>
            <h2 className="text-2xl font-bold mb-4">RFP types available</h2>
            <div className="space-y-3 text-slate-400">
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
                <h3 className="text-cyan-400 font-semibold mb-1">Technical Writing</h3>
                <p className="text-sm">Documentation quality, writing samples, collaboration with engineers</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <h3 className="text-blue-400 font-semibold mb-1">Cybersecurity</h3>
                <p className="text-sm">Security controls, implementation experience, risk communication</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                <h3 className="text-purple-400 font-semibold mb-1">Software Development</h3>
                <p className="text-sm">Development methodology, code quality, delivery practices</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <h3 className="text-green-400 font-semibold mb-1">IT Infrastructure</h3>
                <p className="text-sm">System integration, infrastructure design, support capabilities</p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                <h3 className="text-orange-400 font-semibold mb-1">General Services</h3>
                <p className="text-sm">Professional services with flexible requirements</p>
              </div>
            </div>
          </div>

          {/* How the generator works */}
          <div className="md:col-span-2 bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Workflow</div>
            <h2 className="text-2xl font-bold mb-4">How the generator works</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              On the main generator page, you complete a short form that captures the essentials of your project. This includes your 
              organization name, project title, scope summary, key deliverables, budget range, timeline, evaluation criteria, any 
              mandatory requirements, and the technical standards or frameworks that apply. You also specify a submission deadline and 
              the contact information for questions and proposals.
            </p>
            <p className="text-slate-400 mb-3 leading-relaxed">
              The generator uses this information to build a multi-section RFP that can include:
            </p>
            <ul className="grid md:grid-cols-2 gap-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Introduction and project background written in plain language</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Scope of work, expected deliverables, and collaboration expectations</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Technical and security requirements tailored to your selected work type</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Timeline and milestone expectations with room for vendor suggestions</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Budget and pricing guidance with space for transparent cost breakdowns</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Vendor qualifications and experience expectations</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Evaluation criteria and proposal submission instructions</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Contact information and optional general terms for enterprise RFPs</span>
              </li>
            </ul>
          </div>

          {/* Choosing the RFP type and detail level */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Customization</div>
            <h2 className="text-2xl font-bold mb-4">Choosing the detail level</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              You can set the level of detail to match your needs and organizational requirements:
            </p>
            <div className="space-y-3 text-slate-400">
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                <h3 className="text-cyan-400 font-semibold mb-2">Simple</h3>
                <p className="text-sm leading-relaxed">
                  Produces a lean document for smaller engagements or early market checks. Perfect for quick vendor outreach.
                </p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-blue-400 font-semibold mb-2">Standard</h3>
                <p className="text-sm leading-relaxed">
                  Includes the sections most teams expect in a structured RFP. Balanced detail for typical procurement processes.
                </p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-purple-400 font-semibold mb-2">Enterprise</h3>
                <p className="text-sm leading-relaxed">
                  Adds explicit detail on collaboration, security, vendor due diligence, and general terms for internal governance.
                </p>
              </div>
            </div>
          </div>

          {/* Export options and next steps */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Export & Workflow</div>
            <h2 className="text-2xl font-bold mb-4">Export options and next steps</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              Once you generate the RFP, you can copy the text, download it as a plain text file, download it as a Markdown file, or 
              print it, which also allows you to save a PDF. From there, you can compare the draft against your preferred sample RFPs, 
              adjust the wording to match your house style, and share it with procurement or legal for review.
            </p>
            <p className="text-slate-400 mb-4 leading-relaxed">
              The generator is designed to give you a strong first draft that includes structure and context. You stay in control of 
              the final language, requirements, and legal terms.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Copy to Clipboard
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                Download TXT
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
                Download Markdown
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/40">
                Print/Save PDF
              </span>
            </div>
          </div>

          {/* Key benefits */}
          <div className="md:col-span-2 bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Benefits</div>
            <h2 className="text-2xl font-bold mb-4">Why use an RFP Generator</h2>
            <div className="grid md:grid-cols-3 gap-4 text-slate-400">
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                <h3 className="text-cyan-400 font-semibold mb-2">Professional Quality</h3>
                <p className="text-sm leading-relaxed">
                  Generate documents that read like they were prepared by experienced technical documentation managers with vendor 
                  delivery expertise.
                </p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-blue-400 font-semibold mb-2">Time Efficiency</h3>
                <p className="text-sm leading-relaxed">
                  Skip the blank page and hours of formatting. Generate a complete, structured RFP in minutes, not days.
                </p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-purple-400 font-semibold mb-2">Tailored Content</h3>
                <p className="text-sm leading-relaxed">
                  Choose from multiple RFP types and detail levels to match your specific needs, industry, and procurement requirements.
                </p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h3 className="text-green-400 font-semibold mb-2">Consistent Structure</h3>
                <p className="text-sm leading-relaxed">
                  Ensure all RFPs follow a proven structure with essential sections, making vendor responses easier to compare.
                </p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <h3 className="text-orange-400 font-semibold mb-2">Flexible Editing</h3>
                <p className="text-sm leading-relaxed">
                  Export in multiple formats and maintain full control over final content, requirements, and legal terms.
                </p>
              </div>
              <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
                <h3 className="text-pink-400 font-semibold mb-2">No Server Upload</h3>
                <p className="text-sm leading-relaxed">
                  All processing happens in your browser. Your project details and requirements never leave your device.
                </p>
              </div>
            </div>
          </div>

          {/* Button Row */}
          <div className="md:col-span-2">
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={handleOpenTool}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              >
                <ClipboardList className="w-5 h-5" />
                <span>Open the RFP Generator</span>
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
                <strong className="text-cyan-400">Legal Disclaimer:</strong> This page and the corresponding RFP Generator are provided 
                for informational and educational purposes only and do not constitute legal, procurement, or contract advice. You are 
                responsible for reviewing and adapting all generated content so it reflects your policies, local law, and regulatory 
                obligations, and for obtaining professional guidance where appropriate. Use of this tool does not create any client or 
                advisory relationship, and no guarantees are made regarding accuracy or completeness. All text is generated and processed 
                locally in your browser and is not transmitted to external servers.
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
