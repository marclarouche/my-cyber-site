import React from 'react';
import { Code, ArrowLeft } from 'lucide-react';

export default function AboutAPIGenerator() {
  const handleOpenTool = () => {
    window.location.href = '/policy-generators/api-generator';
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
              Documentation Strategy
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Client-Side Processing
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the API Documentation Strategy Generator
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            This page explains what the API Documentation Strategy Generator does, who it is designed for, and how it helps teams plan a modern, specification-driven documentation approach before they start building pages.
          </p>
          <p className="text-base text-cyan-400 font-semibold mb-4">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
              Audience and doc goals
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              Spec format and tooling choices
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/40">
              Security and environment notes
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
              Versioning and change management
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-600">
              Browser-based workflow
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Who this tool is for */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Audience</div>
            <h2 className="text-2xl font-bold mb-4">Who this tool is for</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              The API Documentation Strategy Generator is designed for technical writers, API product owners, platform teams, and developer relations professionals who want a clear written plan for how API documentation will work before they start building.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Instead of jumping straight into ad hoc pages, the tool helps you describe your audience, API style, specification format, security model, and documentation tooling in one structured document that can be reviewed and agreed by stakeholders.
            </p>
          </div>

          {/* What the generator creates */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Output</div>
            <h2 className="text-2xl font-bold mb-4">What the generator creates</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              The generator produces a single Markdown document that reads like an API documentation playbook. It explains how your team will define, publish, and maintain API reference documentation using modern standards and tools.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Markdown format
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                Spec-driven approach
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-600">
                Instant download
              </span>
            </div>
          </div>

          {/* Core sections - Full width */}
          <div className="md:col-span-2 bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Core Sections Included</div>
            <h2 className="text-2xl font-bold mb-4">What's covered in the documentation plan</h2>
            <ul className="grid md:grid-cols-2 gap-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>An overview of the API, its purpose, and who the documentation is for.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>A description of the API style, such as REST, GraphQL, event-driven, or mixed.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>A clear statement that OpenAPI, AsyncAPI, Postman collections, or code-first tools will be the source of truth.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>An explanation of how tools like Swagger UI, Redoc, or Slate will render the spec.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Notes on security and authentication that belong in the docs.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Details about environments and base URLs that developers will use.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Language examples and SDKs you plan to highlight.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Versioning and change management expectations for your docs.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>An optional table of common documentation tools that can be pasted into Sheets or Excel for planning.</span>
              </li>
            </ul>
          </div>

          {/* How to use - Full width with steps */}
          <div className="md:col-span-2 bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Getting Started</div>
            <h2 className="text-2xl font-bold mb-6">How to use the API Documentation Strategy Generator</h2>
            
            <div className="space-y-6">
              {/* Step 1 */}
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">1. Gather your inputs</h3>
                <p className="text-slate-400 mb-3 leading-relaxed">
                  Before you open the tool, collect a few key details about your API and documentation goals. For example:
                </p>
                <ul className="space-y-2 text-slate-400 ml-4">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>The name of your API and the team that owns it.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Whether it is REST, GraphQL, event-based, or a mix.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Who will read the docs, such as internal developers or external partners.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Which specification format you plan to use.</span>
                  </li>
                </ul>
              </div>

              {/* Step 2 */}
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">2. Describe your spec and tooling choices</h3>
                <p className="text-slate-400 mb-3 leading-relaxed">
                  Inside the generator you will choose your specification style, such as OpenAPI or AsyncAPI, and the documentation renderer that will read that spec, such as Swagger UI or Redoc.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  The generator then weaves these choices into a plain-language explanation of how your documentation pipeline will work from spec to rendered site.
                </p>
              </div>

              {/* Step 3 */}
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">3. Capture security, environments, and versions</h3>
                <p className="text-slate-400 mb-3 leading-relaxed">
                  You can add notes about authentication models, environments such as sandbox and production, and how you intend to handle API versions and deprecations.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  These details are often scattered across emails and meetings. This tool brings them together in one document that can serve as a shared reference for engineering, security, and product.
                </p>
              </div>

              {/* Step 4 */}
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">4. Generate and export your plan</h3>
                <p className="text-slate-400 mb-3 leading-relaxed">
                  When you select Generate API docs plan, the tool builds a Markdown document covering your inputs and a summary of common tooling.
                </p>
                <ul className="space-y-2 text-slate-400 ml-4">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Copy the plan into a wiki, developer portal, or ticket.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Download as a text or Markdown file and store it in your repository.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Print or save to PDF for sharing with non-technical stakeholders.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Why specification-driven */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Best Practice</div>
            <h2 className="text-2xl font-bold mb-4">Why focus on specification-driven documentation</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              Most modern API teams try to avoid hand-written, one-off reference pages. Instead, they use a single specification file as the source of truth and then generate documentation from it.
            </p>
            <p className="text-slate-400 mb-4 leading-relaxed">
              The generator reflects this approach by talking about OpenAPI for HTTP and REST-style APIs, AsyncAPI for event-driven architectures, Postman collections as a bridge between testing and documentation, and tools such as Swagger UI and Redoc that turn specs into interactive sites.
            </p>
            <p className="text-slate-400 leading-relaxed">
              This makes it easier to keep documentation and implementation aligned over time and reduces manual editing when endpoints change.
            </p>
          </div>

          {/* Local processing */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Privacy & Security</div>
            <h2 className="text-2xl font-bold mb-4">Local processing and data handling</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              The API Documentation Strategy Generator runs entirely in your browser. Any API names, environment details, or high-level security notes you enter stay on your device while the page is open.
            </p>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>No plan content is sent to external servers by the tool itself.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>If you later paste generated text into a repository, wiki, ticket system, or chat tool, those platforms will have their own security and privacy practices.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>If your organization has strict handling rules, follow those policies first.</span>
              </li>
            </ul>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed">
              <strong className="text-cyan-400">Note:</strong> Processing happens entirely in your browser. No inputs are sent to any server.
            </p>
          </div>

          {/* Important Notice */}
          <div className="md:col-span-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <span className="text-2xl">ℹ️</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-2">Important Notice</h4>
                <p className="text-sm text-slate-300 leading-relaxed mb-3">
                  This about page and the API Documentation Strategy Generator are provided for informational and educational purposes. They do not constitute legal, compliance, or security design advice, and they do not replace formal documentation standards or code reviews. You remain responsible for validating all technical details, security models, and lifecycle policies, and for aligning your API documentation with your organization guidelines and any applicable regulations.
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  If you are unsure whether certain details should appear in a public developer portal or shared plan, consult with your security, privacy, or legal teams before distributing the output beyond your immediate group.
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
                <Code className="w-5 h-5" />
                <span>Open API Documentation Strategy Generator</span>
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
                <strong className="text-cyan-400">Legal Disclaimer:</strong> This page and tool are provided for informational purposes only and do not constitute legal advice. This tool does not verify correctness, security, performance, or regulatory compliance of any documentation strategy. Review the output with qualified engineering, security, and compliance stakeholders before adopting it. Use of this site does not create any professional services relationship, and no warranties are made regarding completeness, accuracy, or fitness for a particular purpose.
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
