import React from 'react';
import { FileSearch, ArrowLeft } from 'lucide-react';

export default function AboutRequestForInformation() {
  const handleOpenTool = () => {
    window.location.href = '/policy-generators/request-for-information';
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
              Document Generator
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Client-Side Processing
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the RFI Generator
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            A guided way to create a clear, non-binding Request for Information when you know you have a problem but are still 
            exploring the market, potential solutions, and vendor capabilities.
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
          {/* When to use an RFI */}
          <div className="md:col-span-2 bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Overview</div>
            <h2 className="text-2xl font-bold mb-4">When to use an RFI instead of an RFP or RFQ</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              A Request for Information is a good fit when you know there is a business problem or opportunity, but you are still 
              learning about what the market can provide and which vendors might be a match. An RFI lets you explore options without 
              committing to a specific scope, budget, or solution.
            </p>
            <p className="text-slate-400 mb-4 leading-relaxed">
              In simple terms, an RFI is used for discovery. An RFP is used when you are ready to ask for detailed proposals. An RFQ 
              is used when you have a very clear scope and mainly need pricing and commercial terms.
            </p>
            <p className="text-slate-400 leading-relaxed">
              This RFI Generator helps you standardize that early discovery step so you can compare responses easily and move on to a 
              more formal RFP or RFQ only when you are ready.
            </p>
          </div>

          {/* What the RFI Generator produces */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Output</div>
            <h2 className="text-2xl font-bold mb-4">What the RFI Generator produces</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              The tool creates a single, structured text document that follows the common building blocks of a well-formed RFI. The 
              output is simple text that you can copy into your own templates, save as a file, or paste into an online vendor portal.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Text Format
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                Markdown Export
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
                Copy & Paste
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-600">
                No Server Upload
              </span>
            </div>
          </div>

          {/* Core sections included */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Sections</div>
            <h2 className="text-2xl font-bold mb-4">Core sections included</h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Administrative and contact details so vendors know who you are and who to contact.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Key dates that call out response deadlines and question deadlines.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Project context and scope with the purpose of the RFI and the problem you want to address.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Description of goals and possible outcomes you care about.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Scope of inquiry that defines the product, service, or capability area you are exploring.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Questionnaire that focuses on vendor background, experience, capabilities, and support model.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Response instructions and basic format expectations.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Evaluation overview that explains how you will look at the responses.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Confidentiality and non-binding notice that reinforces the exploratory nature of the RFI.</span>
              </li>
            </ul>
          </div>

          {/* How to use the RFI Generator - Full width */}
          <div className="md:col-span-2 bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Getting Started</div>
            <h2 className="text-2xl font-bold mb-6">How to use the RFI Generator</h2>
            
            {/* Step 1 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">1. Gather your basic information</h3>
              <p className="text-slate-400 mb-3 leading-relaxed">
                Before opening the generator, it is helpful to collect some basics.
              </p>
              <ul className="space-y-2 text-slate-400 ml-4">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Your organization name, a short background, and main location.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>A working title for the RFI and an internal reference number if you use one.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>The name and email for your RFI coordinator or procurement contact.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Any high-level dates you already know, such as a response deadline.</span>
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">2. Describe the problem and the scope of inquiry</h3>
              <p className="text-slate-400 mb-3 leading-relaxed">
                Inside the tool, the Project context and scope section helps you explain why you are issuing the RFI. You can describe 
                the business problem, the change you hope to see, and what types of solutions you are open to considering.
              </p>
              <p className="text-slate-400 leading-relaxed">
                The Scope of inquiry field lets you define the general product or service category. For example: managed security 
                services, cloud-based HR software, data integration tools, or anything else that fits your situation.
              </p>
            </div>

            {/* Step 3 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-purple-400 mb-3">3. Shape the questionnaire</h3>
              <p className="text-slate-400 mb-3 leading-relaxed">
                The generator includes default question blocks for vendor background, experience, capabilities, and implementation 
                support. You can keep these defaults or override them with your own questions.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Questions should focus on capability, fit, and approach. Detailed pricing and contract terms can be deferred to a later 
                RFQ or RFP once you have narrowed the field of potential vendors.
              </p>
            </div>

            {/* Step 4 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-green-400 mb-3">4. Set response instructions</h3>
              <p className="text-slate-400 leading-relaxed">
                The Response instructions and format section gives vendors clear guidance on how to reply. You can specify how to submit 
                responses, what format to use, and any page or word limits. You can also describe the general criteria you will use to 
                review the information.
              </p>
            </div>

            {/* Step 5 */}
            <div>
              <h3 className="text-xl font-semibold text-orange-400 mb-3">5. Generate and export the RFI</h3>
              <p className="text-slate-400 mb-3 leading-relaxed">
                Once the fields are filled, you select Generate RFI. The tool will build a full text RFI that you can:
              </p>
              <ul className="space-y-2 text-slate-400 ml-4">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Copy to your clipboard and paste into email or a document template.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Download as a TXT file for editing in a word processor.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Download as a Markdown file if you prefer text-based workflows.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Print or save as a PDF using your browser print options.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Who this tool is for */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Audience</div>
            <h2 className="text-2xl font-bold mb-4">Who this tool is for</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              The RFI Generator is intended for IT leaders, operations managers, procurement teams, and project owners who want a 
              consistent way to explore market options before committing to a full procurement cycle.
            </p>
            <p className="text-slate-400 leading-relaxed">
              It is also helpful for smaller organizations without dedicated procurement staff. They can still work in a disciplined way 
              when contacting vendors and can avoid starting from a blank page every time a new technology or service is being considered.
            </p>
          </div>

          {/* Data privacy and storage */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Privacy</div>
            <h2 className="text-2xl font-bold mb-4">Data privacy and storage</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              The RFI Generator runs entirely in your browser. The information you enter is processed on your device while the page is 
              open. The generator itself does not send RFI content, vendor names, or internal details to any external server.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Once you copy the generated text into email, shared documents, or vendor portals, those systems will apply their own 
              privacy, security, and retention practices. Always follow your internal policies and any regulatory requirements that apply 
              to your organization and your sector.
            </p>
          </div>

          {/* Key benefits */}
          <div className="md:col-span-2 bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Benefits</div>
            <h2 className="text-2xl font-bold mb-4">Why use an RFI Generator</h2>
            <div className="grid md:grid-cols-3 gap-4 text-slate-400">
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                <h3 className="text-cyan-400 font-semibold mb-2">Standardized Format</h3>
                <p className="text-sm leading-relaxed">
                  Ensure consistency across all vendor inquiries with a structured, professional format that covers all essential sections.
                </p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-blue-400 font-semibold mb-2">Time Savings</h3>
                <p className="text-sm leading-relaxed">
                  Stop starting from scratch. Generate a complete RFI in minutes instead of hours, allowing you to focus on vendor evaluation.
                </p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-purple-400 font-semibold mb-2">Easy Comparison</h3>
                <p className="text-sm leading-relaxed">
                  Standardized questions make it easier to compare vendor responses side-by-side and identify the best fit for your needs.
                </p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h3 className="text-green-400 font-semibold mb-2">Professional Approach</h3>
                <p className="text-sm leading-relaxed">
                  Present a polished, organized inquiry that reflects well on your organization and encourages quality vendor responses.
                </p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <h3 className="text-orange-400 font-semibold mb-2">Market Discovery</h3>
                <p className="text-sm leading-relaxed">
                  Learn about available solutions, capabilities, and approaches before committing to a full RFP or procurement process.
                </p>
              </div>
              <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
                <h3 className="text-pink-400 font-semibold mb-2">No Commitment</h3>
                <p className="text-sm leading-relaxed">
                  Explore options without obligation. RFIs are non-binding and give you flexibility to decide on next steps.
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
                <FileSearch className="w-5 h-5" />
                <span>Open the RFI Generator</span>
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
                <strong className="text-cyan-400">Legal Disclaimer:</strong> This about page and the corresponding RFI Generator are 
                provided for informational and educational purposes. They do not constitute legal, procurement, financial, or contract 
                advice, and they do not create any obligation to issue an RFP, RFQ, or award any work. You remain responsible for 
                confirming eligibility, following your organization procurement rules, complying with applicable laws and regulations, 
                and having RFI content reviewed by qualified professionals where appropriate. All text is generated and processed locally 
                in your browser and is not transmitted to external servers.
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
