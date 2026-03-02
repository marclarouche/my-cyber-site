import React from 'react';
import { Scale, ArrowLeft } from 'lucide-react';

export default function AboutCCPACPRAPolicy() {
  const handleOpenTool = () => {
    window.location.href = '/policy-generators/ccpa-cpra-policy';
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
              Privacy Notice Generator
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Client-Side Processing
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the CCPA/CPRA Notice Generator
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            This tool helps businesses create a privacy notice that complies with the California Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA). These laws provide California residents with rights regarding personal data collection, disclosure, sale, and sharing. The generator produces a customizable CCPA/CPRA notice based on the information you provide.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {/* How to Use This Tool */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Getting Started</div>
            <h2 className="text-2xl font-bold mb-4">How to use this tool</h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Enter your business name and legal structure.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Provide your website URL and contact email for privacy requests.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>List the categories of personal information your business collects.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Select whether your business sells or shares personal information.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Optionally list any third-party service providers you use.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Click the "Generate Privacy Notice" button.</span>
              </li>
            </ul>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed">
              You can then copy, export, or integrate the generated notice into your website.
            </p>
            <p className="text-sm text-slate-400 mt-3 leading-relaxed">
              <strong className="text-cyan-400">Note:</strong> Processing happens entirely in your browser. No inputs are sent to any server.
            </p>
          </div>

          {/* Where to Place the Generated Notice */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Implementation</div>
            <h2 className="text-2xl font-bold mb-4">Where to place the generated notice</h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>On your website's footer (commonly linked as "California Privacy Notice" or "Do Not Sell/Share My Information")</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>On your general privacy policy page</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>In a user consent / cookie banner configuration panel</span>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
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

          {/* Button Row */}
          <div className="md:col-span-2">
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={handleOpenTool}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              >
                <Scale className="w-5 h-5" />
                <span>Open CCPA/CPRA Notice Generator</span>
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
                <strong className="text-cyan-400">Legal Disclaimer:</strong> This page and the corresponding CCPA/CPRA Notice Generator are provided for informational and educational purposes only and do not constitute legal advice. CCPA/CPRA compliance may involve additional legal obligations not covered by this template. Consult a qualified attorney before finalizing or publishing your privacy disclosures. Use of this tool does not create an attorney-client relationship, and no guarantees are made regarding accuracy, completeness, or fitness for a particular purpose.
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
