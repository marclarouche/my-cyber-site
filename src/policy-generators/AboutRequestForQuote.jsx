import React from 'react';
import { DollarSign, ArrowLeft } from 'lucide-react';

export default function AboutRequestForQuote() {
  const handleOpenTool = () => {
    window.location.href = '/policy-generators/request-for-quote';
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
            About the RFQ Generator
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            A guided way to assemble a clear Request for Quotation when your requirements are already defined and cost is the 
            primary decision factor.
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
          {/* When to use an RFQ */}
          <div className="md:col-span-2 bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Overview</div>
            <h2 className="text-2xl font-bold mb-4">When to use an RFQ instead of an RFI or RFP</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              The RFQ Generator is designed for situations where you know exactly what you need to purchase and you want suppliers 
              to compete primarily on price and commercial terms.
            </p>
            <p className="text-slate-400 mb-3 leading-relaxed">Use this tool when:</p>
            <ul className="grid md:grid-cols-2 gap-3 text-slate-400 mb-4">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Your requirements for goods, services, or both are already well-defined.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>You can describe clear specifications, quantities, and schedules.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>You want like-for-like quotations that are easy to compare.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Cost is the main decision factor once suppliers meet your mandatory requirements.</span>
              </li>
            </ul>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-slate-300 text-sm leading-relaxed">
                <strong className="text-blue-400">💡 Tip:</strong> If you are still exploring the market or are not sure what a 
                solution should look like, start with an RFI or an RFP instead.
              </p>
            </div>
          </div>

          {/* What the RFQ Generator creates */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Output</div>
            <h2 className="text-2xl font-bold mb-4">What the RFQ Generator creates</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              The generator produces a structured RFQ text document that you can copy, download as plain text or Markdown, or print 
              to PDF. It follows a logical flow from administrative details through scope and pricing.
            </p>
            <p className="text-slate-400 mb-3 leading-relaxed">
              The text is intentionally neutral and adaptable so you can align it with your own templates, approval processes, and 
              contract language.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Text Format
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                Markdown Export
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
                PDF Ready
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-600">
                No Server Upload
              </span>
            </div>
          </div>

          {/* Core sections included */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Sections</div>
            <h2 className="text-2xl font-bold mb-4">Core sections included</h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Administrative and submission information with contact details and deadlines.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Statement of need that explains what you are purchasing and why.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Scope of work and requirements for goods, services, or both.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Delivery or performance schedule and acceptance criteria.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Pricing and commercial terms, including payment, validity, and warranties.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Mandatory requirements and evaluation approach focused on cost and compliance.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>General terms and reservations that protect your organization.</span>
              </li>
            </ul>
          </div>

          {/* How to use the RFQ Generator - Full width */}
          <div className="md:col-span-2 bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Getting Started</div>
            <h2 className="text-2xl font-bold mb-6">How to use the RFQ Generator</h2>
            
            {/* Step 1 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">1. Confirm that your requirements are clear</h3>
              <p className="text-slate-400 mb-3 leading-relaxed">
                Before opening the generator, make sure you can describe the purchase in specific terms. For example:
              </p>
              <ul className="space-y-2 text-slate-400 ml-4">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Exact products, part numbers, or models.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Service tasks, deliverables, and expected hours.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Locations or systems where the work will be performed.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Any standards, certifications, or policies suppliers must meet.</span>
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">2. Fill in the administrative and scope fields</h3>
              <p className="text-slate-400 mb-3 leading-relaxed">
                Inside the generator, you will see fields for the RFQ title, reference number, organization overview, decision type, 
                and all of the key scope and schedule components.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Required fields are highlighted so that the output remains complete and ready to send once you have inserted your 
                specific details.
              </p>
            </div>

            {/* Step 3 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-purple-400 mb-3">3. Define pricing and commercial expectations</h3>
              <p className="text-slate-400 mb-3 leading-relaxed">
                The tool helps you capture how you want suppliers to structure their quotations. For example:
              </p>
              <ul className="space-y-2 text-slate-400 ml-4">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Whether you expect unit and total pricing for each line item.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>How shipping, taxes, and optional items should be shown.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>How long prices must remain valid after submission.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Any standard payment terms or contract conditions you intend to apply.</span>
                </li>
              </ul>
            </div>

            {/* Step 4 */}
            <div>
              <h3 className="text-xl font-semibold text-green-400 mb-3">4. Generate, export, and adapt</h3>
              <p className="text-slate-400 mb-3 leading-relaxed">
                When you select Generate RFQ, the tool builds a single document that you can:
              </p>
              <ul className="space-y-2 text-slate-400 ml-4">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Copy into an email, document template, or procurement system.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Download as TXT for editing in a word processor.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Download as Markdown for use in a text editor or repository.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Print or save to PDF using your browser print dialog.</span>
                </li>
              </ul>
              <p className="text-slate-400 mt-4 text-sm leading-relaxed">
                After generation, you can refine the language, add any organization-specific clauses, and route the RFQ for internal 
                review before sending it to suppliers.
              </p>
            </div>
          </div>

          {/* Tips for clearer quotations */}
          <div className="md:col-span-2 bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Best Practices</div>
            <h2 className="text-2xl font-bold mb-4">Tips for clearer and more competitive quotations</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              A clear RFQ gives suppliers less room to guess and more room to compete on price and quality. Consider the following 
              practices:
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-slate-400">
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                <h3 className="text-cyan-400 font-semibold mb-2">Unambiguous Specifications</h3>
                <p className="text-sm leading-relaxed">
                  Keep specifications clear so all suppliers are quoting the same thing, enabling true price comparison.
                </p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-blue-400 font-semibold mb-2">Separate Requirements</h3>
                <p className="text-sm leading-relaxed">
                  Distinguish mandatory requirements from nice-to-have items to help suppliers prioritize their responses.
                </p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-purple-400 font-semibold mb-2">Specific Deadlines</h3>
                <p className="text-sm leading-relaxed">
                  Make deadlines specific and list the time zone to avoid confusion and late submissions.
                </p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h3 className="text-green-400 font-semibold mb-2">Alternative Options</h3>
                <p className="text-sm leading-relaxed">
                  Explain how you will treat alternative options or value-add proposals to encourage innovation.
                </p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <h3 className="text-orange-400 font-semibold mb-2">Consistent References</h3>
                <p className="text-sm leading-relaxed">
                  Use a consistent subject line and reference number in all communications for easy tracking.
                </p>
              </div>
              <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
                <h3 className="text-pink-400 font-semibold mb-2">Reusable Templates</h3>
                <p className="text-sm leading-relaxed">
                  Save parts of generated RFQs as standard language to reduce effort in future procurement rounds.
                </p>
              </div>
            </div>
          </div>

          {/* Data privacy and storage */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Privacy</div>
            <h2 className="text-2xl font-bold mb-4">Data privacy and storage</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              The RFQ Generator runs entirely in your browser. Information you enter stays on your device while the page is open. 
              The tool does not send RFQ content, pricing expectations, or supplier information to external servers.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              If you paste generated text into email, shared documents, or third-party procurement portals, those systems will have 
              their own privacy, security, and retention practices. Always follow your internal policies and any applicable regulations 
              when handling supplier or pricing information.
            </p>
          </div>

          {/* Key benefits */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Benefits</div>
            <h2 className="text-2xl font-bold mb-4">Why use an RFQ Generator</h2>
            <div className="space-y-3">
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
                <h3 className="text-cyan-400 font-semibold mb-1">Competitive Pricing</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Clear specifications enable true apples-to-apples price comparison across suppliers.
                </p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <h3 className="text-blue-400 font-semibold mb-1">Time Savings</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Generate complete RFQs in minutes instead of starting from scratch each time.
                </p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                <h3 className="text-purple-400 font-semibold mb-1">Professional Structure</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Follow proven RFQ structure that suppliers recognize and can respond to efficiently.
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
                <DollarSign className="w-5 h-5" />
                <span>Open the RFQ Generator</span>
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
                <strong className="text-cyan-400">Legal Disclaimer:</strong> This about page and the RFQ Generator are provided for 
                informational and educational purposes only. They do not constitute legal, procurement, or contract advice and they do 
                not replace your organization policies or professional guidance. You remain responsible for verifying eligibility, 
                applying appropriate terms and conditions, complying with applicable laws and regulations, and having RFQs and resulting 
                contracts reviewed by qualified professionals where appropriate.
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
