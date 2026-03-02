import React from 'react';
import { Smartphone, ArrowLeft } from 'lucide-react';

export default function AboutBYODPolicy() {
  const handleOpenTool = () => {
    window.location.href = '/policy-generators/byod-policy';
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
              Policy Generator
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Client-Side Processing
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the BYOD Policy Generator
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            A concise Bring Your Own Device policy covering enrollment, security requirements, acceptable use, prohibited apps, data separation, privacy, lost device handling, off-boarding, and consequences for non-compliance. Everything runs locally in your browser.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {/* What this tool creates */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Overview</div>
            <h2 className="text-2xl font-bold mb-4">What this tool creates</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              A concise Bring Your Own Device policy covering enrollment, security requirements, acceptable use, prohibited apps, data separation, privacy, lost device handling, off-boarding, and consequences for non-compliance. Everything runs locally in your browser.
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

          {/* Why BYOD matters */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Importance</div>
            <h2 className="text-2xl font-bold mb-4">Why BYOD matters</h2>
            <p className="text-slate-400 leading-relaxed">
              Personal devices are often the weakest link. A practical policy reduces risk from lost phones, phishing, and shadow IT while respecting employee privacy and improving compliance with frameworks such as NIST CSF and ISO/IEC 27001.
            </p>
          </div>

          {/* How to use it */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Getting Started</div>
            <h2 className="text-2xl font-bold mb-4">How to use it</h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Enter your organization name, eligible platforms, and enrollment process.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Set security baselines, acceptable use, and privacy language.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Define lost/stolen procedures, incident reporting, and off-boarding.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Generate the policy, then Print to PDF or Download as a text file.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Have leadership approve and review annually.</span>
              </li>
            </ul>
          </div>

          {/* Privacy */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Privacy & Security</div>
            <h2 className="text-2xl font-bold mb-4">Privacy</h2>
            <p className="text-slate-400 leading-relaxed">
              No names, emails, or device details are collected. The generator operates entirely on your device. Your data remains in the browser unless you save it.
            </p>
          </div>

          {/* Button Row */}
          <div className="md:col-span-2">
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={handleOpenTool}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              >
                <Smartphone className="w-5 h-5" />
                <span>Open BYOD Policy Generator</span>
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
                <strong className="text-cyan-400">Legal Disclaimer:</strong> This page is provided for informational purposes only and does not constitute legal advice. Tailor the policy to your jurisdiction, sector, and contracts, and have counsel review before adoption. Use of this site does not create an attorney-client relationship, and no warranties are made regarding completeness, accuracy, or fitness for a particular purpose.
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
