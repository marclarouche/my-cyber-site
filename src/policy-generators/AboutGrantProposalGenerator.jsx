import React from 'react';
import { Target, ArrowLeft } from 'lucide-react';

export default function AboutGrantProposalGenerator() {
  const handleOpenTool = () => {
    window.location.href = '/policy-generators/grant-proposal-generator';
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
              Proposal Generator
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Client-Side Processing
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the Grant Proposal Generator
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            A guided workspace for nonprofit teams that want to build consistent, funder-ready proposals without starting from a 
            blank page every time.
          </p>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            You type in your organization and project details, choose which supporting documents you plan to include, and the tool 
            produces a structured draft in a copy-friendly format for portals, word processors, or shared drives.
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
          {/* What this tool does */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Overview</div>
            <h2 className="text-2xl font-bold mb-4">What this tool does</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              The Grant Proposal Generator helps you assemble the core narrative and attachments for a typical foundation or 
              corporate grant request. It brings the standard building blocks into one place so you can focus on your story 
              instead of wrestling with format.
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

          {/* Who it is designed for */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Audience</div>
            <h2 className="text-2xl font-bold mb-4">Who it is designed for</h2>
            <p className="text-slate-400 leading-relaxed">
              This tool is intentionally written in clear, plain language so that executive directors, program managers, and 
              board members can work on drafts together. The generator does not replace your funder guidelines or your own 
              expertise, but it gives you a strong first version to refine.
            </p>
          </div>

          {/* Key components covered */}
          <div className="md:col-span-2 bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Coverage</div>
            <h2 className="text-2xl font-bold mb-4">Key components covered</h2>
            <ul className="grid md:grid-cols-2 gap-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Cover letter framing and thank you language.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Executive summary that highlights who you serve, what you will do, and what you are requesting.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Statement of need that explains the problem, context, and community impact.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Project description with objectives, methods, basic timeline, and expected outcomes.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Budget summary that describes major cost categories and the requested amount.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Evaluation plan with simple, measurable indicators and feedback loops.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Organizational background, mission, and track record.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Attachments section that lists supporting documents you plan to submit.</span>
              </li>
            </ul>
          </div>

          {/* How to use the generator - Step 1 & 2 */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Getting Started</div>
            <h2 className="text-2xl font-bold mb-4">How to use the generator</h2>
            
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-slate-300 mb-2">Step 1: Gather your basics</p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Collect your project title, rough budget range, program dates, and any recent numbers that illustrate the need 
                  you are addressing. If you have older proposals that worked well, keep them nearby for reference.
                </p>
              </div>

              <div>
                <p className="font-semibold text-slate-300 mb-2">Step 2: Complete the core fields</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-2">
                  Inside the generator you will find a simple form organised around standard grant sections:
                </p>
                <ul className="space-y-2 text-slate-400 text-sm ml-4">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Organization name and funder name.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Project title, duration, and requested amount.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Executive summary, statement of need, and project description.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Budget and evaluation notes.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Organizational background and partner information.</span>
                  </li>
                </ul>
                <p className="text-slate-400 text-sm leading-relaxed mt-2">
                  Required fields are marked so you do not accidentally skip anything that would leave a major gap in the draft.
                </p>
              </div>
            </div>
          </div>

          {/* How to use the generator - Step 3 & 4 */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Workflow</div>
            <h2 className="text-2xl font-bold mb-4">Complete and export</h2>
            
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-slate-300 mb-2">Step 3: Select supporting documents</p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  The tool includes a checklist for common attachments such as your IRS determination letter, Form 990, financial 
                  statements, strategic plan, and board list. Selecting these items builds a clear attachments section at the end 
                  of the proposal.
                </p>
              </div>

              <div>
                <p className="font-semibold text-slate-300 mb-2">Step 4: Generate, export, and refine</p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  When you click "Generate proposal" the output panel fills with a structured draft. From there you can copy the 
                  text into a portal or word processor, download plain text or Markdown, or print and save as a PDF for internal 
                  review. Use this draft as a starting point, then align it with the word counts, prompts, and formatting 
                  instructions each funder requires.
                </p>
              </div>
            </div>
          </div>

          {/* Tips for Success */}
          <div className="md:col-span-2 bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Best Practices</div>
            <h2 className="text-2xl font-bold mb-4">Tips for Success</h2>
            <div className="grid md:grid-cols-2 gap-4 text-slate-400">
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                <p className="text-sm leading-relaxed">
                  <strong className="text-cyan-400">Focus on impact:</strong> Funders want to know how their investment will create 
                  measurable change. Use specific numbers and outcomes whenever possible.
                </p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-sm leading-relaxed">
                  <strong className="text-blue-400">Tell your story:</strong> While the generator provides structure, your unique 
                  organizational voice and community connection make the proposal compelling.
                </p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <p className="text-sm leading-relaxed">
                  <strong className="text-purple-400">Review funder guidelines:</strong> Every funder has specific requirements. 
                  Always adapt the generated content to match their exact specifications and priorities.
                </p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-sm leading-relaxed">
                  <strong className="text-green-400">Save your drafts:</strong> Keep copies of successful proposals as templates 
                  for future applications, adjusting only the specific project details.
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
                <Target className="w-5 h-5" />
                <span>Open Grant Proposal Generator</span>
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
                <strong className="text-cyan-400">Important notice:</strong> This guide and the Grant Proposal Generator are provided for informational and educational purposes only. They do not constitute legal, financial, tax, or fundraising advice, and they do not guarantee funding or compliance with any specific grant maker requirements. You remain responsible for reviewing each funder guideline, confirming eligibility, and ensuring that all final submissions are accurate and complete.
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
