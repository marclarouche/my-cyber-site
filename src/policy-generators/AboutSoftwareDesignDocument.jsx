import React from 'react';
import { Code, ArrowLeft, Shield } from 'lucide-react';

export default function AboutSoftwareDesignDocument() {
  const handleOpenTool = () => {
    window.location.href = '/policy-generators/software-design-document';
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
              Documentation Generator
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Client-Side Processing
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the Software Design Document Generator
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            This page explains how the Software Design Document Generator works, who it is designed for, and how it helps you capture 
            architecture decisions in a single, structured document. The goal is to support conversation between engineers, product teams, 
            and stakeholders without forcing a rigid template.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-300">
            <span className="flex items-center space-x-2">
              <span className="text-cyan-400">•</span>
              <span>Project context, architecture, components, and data model</span>
            </span>
            <span className="flex items-center space-x-2">
              <span className="text-cyan-400">•</span>
              <span>Quality attributes, risks, and deployment considerations</span>
            </span>
            <span className="flex items-center space-x-2">
              <span className="text-cyan-400">•</span>
              <span>Browser-based workflow with local processing only</span>
            </span>
          </div>
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
          {/* What this generator does */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Overview</div>
            <h2 className="text-2xl font-bold mb-4">What this generator does</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              The Software Design Document Generator walks you through the core sections of a design document, from project overview to 
              deployment and operations. It gives you prompts for each part so you can turn scattered notes into a complete, readable design.
            </p>
            <p className="text-slate-400 mb-4 leading-relaxed">
              Instead of starting from a blank page, you capture the story of your system in small steps. The generator groups your answers 
              into a single document that you can paste into your internal wiki, export as text or Markdown, or adapt to your organization's 
              standard template.
            </p>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Captures project purpose, goals, and audience.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Describes architecture, components, and data flows.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Documents quality attributes, risks, and operational needs.</span>
              </li>
            </ul>
          </div>

          {/* Who this generator is for */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Target Audience</div>
            <h2 className="text-2xl font-bold mb-4">Who this generator is for</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              The generator is useful for teams that want clear design docs without heavy process, and for individual developers who want 
              to document work in a consistent way. It is especially helpful when you have several audiences: engineers, product owners, 
              security partners, and leadership.
            </p>
            <ul className="space-y-2 text-slate-400 mb-4">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Engineering teams documenting new services or features.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Independent builders who want a simple yet complete design narrative.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Organizations that need repeatable documentation for reviews and audits.</span>
              </li>
            </ul>
            <p className="text-sm text-slate-500">
              <strong className="text-cyan-400">Common audiences:</strong> Technical leads, Individual contributors, Architecture and security reviewers.
            </p>
          </div>

          {/* How the workflow is organized */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Workflow</div>
            <h2 className="text-2xl font-bold mb-4">How the workflow is organized</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              The Software Design Document Generator is divided into a series of steps that mirror common design document sections. 
              You can complete these in one sitting or revisit them as the design evolves.
            </p>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Project basics</strong> — Capture the name, authors, purpose, audience, and a short overview of the system.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Context and requirements</strong> — Describe the problem, goals, stakeholders, and important functional and non-functional requirements.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Architecture</strong> — Explain the architectural style, technology stack, system context, and key design decisions.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Components</strong> — List major components or services with responsibilities, interfaces, and the data they handle.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Data and interfaces</strong> — Summarize the data model, entities, external APIs, and error handling approach.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Quality and risks</strong> — Document performance, reliability, security, usability, and significant tradeoffs or risks.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Deployment and operations</strong> — Describe environments, dependencies, monitoring, rollout strategy, and future work.</span>
              </li>
            </ul>
            <p className="text-slate-400 mt-4 leading-relaxed">
              When you select "Generate design document" the tool assembles these pieces into a single, export-ready document with 
              clear headings and section numbers.
            </p>
          </div>

          {/* What a complete design document includes */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Coverage</div>
            <h2 className="text-2xl font-bold mb-4">What a complete design document includes</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              The generator is designed to cover the elements people expect to see in a modern software design document. 
              You can keep things high-level for small projects or go deeper for complex systems.
            </p>
            <p className="text-slate-400 mb-3">A typical output contains sections such as:</p>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Introduction with purpose, audience, and system overview.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Context and requirements with goals, stakeholders, and constraints.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Architecture overview with style, stack, context, and major decisions.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Component design with responsibilities and interfaces for each component.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Data model and interfaces with key entities, data lifecycle, and external APIs.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Quality attributes, risks, and testing strategy.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Deployment, dependencies, monitoring, and future work.</span>
              </li>
            </ul>
            <p className="text-slate-400 mt-4 leading-relaxed">
              You can still add diagrams, sequence charts, and API specifications in your own tools, then reference them from the final document.
            </p>
          </div>

          {/* Local processing and data handling */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Privacy & Security</div>
            <h2 className="text-2xl font-bold mb-4">Local processing and data handling</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              The Software Design Document Generator runs entirely in your browser. All logic is implemented in client-side JavaScript, 
              and the document text is generated locally on your device.
            </p>
            <ul className="space-y-2 text-slate-400 mb-4">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>No form data is sent to a server while you use the tool.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>No project details or design notes are stored by CyberLifeCoach.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Exports create text files directly in your browser for you to save or manage.</span>
              </li>
            </ul>
            <p className="text-slate-400 mb-4 leading-relaxed">
              Even with a local tool, you should treat design documents as sensitive. They often contain details about architecture, 
              security controls, and dependencies that would help an attacker. Store exports in the same secure locations you use for 
              other internal documentation.
            </p>
            <p className="text-slate-400 leading-relaxed">
              If your organization has strict handling rules, follow those policies first. You can also keep the generator output general 
              and move deeper technical details into your own private repositories or diagramming tools.
            </p>
          </div>

          {/* Review, governance, and legal considerations */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Governance</div>
            <h2 className="text-2xl font-bold mb-4">Review, governance, and legal considerations</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              A design document is part of a broader engineering process. This generator supports that process by helping you capture 
              information in a structured way. It does not replace architecture reviews, threat modeling, privacy assessments, or formal 
              approval workflows.
            </p>
            <p className="text-slate-400 mb-4 leading-relaxed">
              Many teams align their design documentation with internal standards or external frameworks, such as architecture review boards, 
              change management practices, or secure development life cycle guidance. You can reference those processes directly inside the 
              generated document where helpful.
            </p>
            <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-3">
                <span className="text-cyan-400 text-2xl mt-1">⚠</span>
                <div>
                  <p className="text-slate-300 font-semibold mb-2">Important notice:</p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    This tool is intended as a documentation aid only. It does not verify correctness, security, performance, or 
                    regulatory compliance of the system being described. All information entered into this page and the associated 
                    generator is processed locally in your browser and is not stored or transmitted by CyberLifeCoach. You remain 
                    responsible for reviewing the output, validating the design, and following your organization's policies and 
                    applicable laws.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed">
              If you are unsure whether certain details should appear in a design document, consult with your security, privacy, or 
              legal teams before sharing the document beyond your immediate development group.
            </p>
          </div>

          {/* Button Row */}
          <div className="md:col-span-2">
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={handleOpenTool}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              >
                <Code className="w-5 h-5" />
                <span>Open Software Design Document Generator</span>
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
                <strong className="text-cyan-400">Legal Disclaimer:</strong> This page and tool are provided for informational purposes and do not constitute legal advice. This tool does not verify correctness, security, performance, or regulatory compliance of any design. Review the output with qualified engineering, security, and compliance stakeholders before adopting it. Use of this site does not create any professional services relationship.
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
