import React from 'react';
import { FileText, ArrowLeft, AlertTriangle, Shield, Info, Eye, Users, BookOpen } from 'lucide-react';

export default function AboutTOSSummarizer() {
  const handleOpenTool = () => {
    window.open('/tools/tos-summarizer', '_blank', 'noopener,noreferrer');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center space-x-3 group cursor-pointer">
              <img 
                src="/logo.png" 
                alt="CyberLifeCoach" 
                className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300" 
              />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:brightness-125 transition-all duration-300">
                CyberLifeCoach
              </span>
            </a>

            <a href="/tools" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tools Hub</span>
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
              Privacy Tool
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              ToS Analysis
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the Privacy Policy & ToS Summarizer
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            This page explains what the Privacy Policy and Terms of Service Summarizer does, how it works behind the scenes,
            and where its limits are. It is an AI lite, keyword driven helper that runs entirely in your browser and is
            meant to nudge you toward careful reading, not to replace legal advice.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1.7fr_1.4fr] gap-6">
            {/* Left Column */}
            <div>
              {/* What this tool is designed to do */}
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
                <div className="flex items-center space-x-2 mb-3">
                  <Eye className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">Overview</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white">
                  What this tool is designed to do
                </h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Many people click "I agree" without ever seeing what a privacy policy or Terms of Service actually says.
                  The summarizer is a small, browser based helper that gives you a quick sense of what a document covers,
                  which themes appear, and where common concerning clauses may sit.
                </p>
                <p className="text-slate-400 leading-relaxed mb-6">
                  It works best on public policies and ToS pages from websites, apps, and online services that you already have
                  access to. You paste the text into the tool or load a simple text file and receive a short overview plus a
                  list of sentences that match common "red flag" patterns.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                    <span className="text-sm text-slate-300">Client-side only, no network calls</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                    <span className="text-sm text-slate-300">Heuristic demo, AI lite</span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-4 text-white">
                  Who this helper is for
                </h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  The summarizer is aimed at everyday users, students, journalists, digital nomads, small organizations, and
                  anyone else who wants a little extra structure when reading dense legal pages. It is not built for drafting
                  contracts or performing formal legal review.
                </p>
                <ul className="space-y-2 text-slate-400 mb-6">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Individuals deciding whether to try or keep using a service.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Nonprofits and small teams doing an initial privacy sanity check.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Journalists and advocates looking for quick examples of certain clauses.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Curious readers who want help finding the "interesting" parts of a long policy.</span>
                  </li>
                </ul>

                <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-6">
                  <div className="flex items-start space-x-4">
                    <BookOpen className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-cyan-300">Think of it as a highlighter</h3>
                      <p className="text-slate-300 leading-relaxed">
                        The tool points at areas you may want to read more slowly, but it does not tell you what to accept or reject.
                        You stay in control of the final judgment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* How it works */}
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
                <div className="flex items-center space-x-2 mb-3">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">How it works</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white">
                  What happens in your browser
                </h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  The summarizer does not send your text anywhere. All processing happens locally using simple pattern matching
                  and scoring logic written in JavaScript. There are no calls to external AI services and no tracking on this
                  page from the tool itself.
                </p>
                <p className="text-slate-300 leading-relaxed mb-3 font-semibold">At a high level, the tool:</p>
                <ul className="space-y-2 text-slate-400 mb-6">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Cleans the text and splits it into sentences.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Looks for sentences that mention collection, use, sharing, rights, and security.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Scores sentences based on length and presence of important words.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Applies keyword based rules to detect themes such as arbitration, broad data sharing, or tracking.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Builds a short "plain language" snapshot from the highest scoring sentences.</span>
                  </li>
                </ul>

                <p className="text-slate-400 leading-relaxed mb-8">
                  The rules are intentionally transparent and conservative. They rely on simple keywords instead of full natural
                  language understanding, so you can think of them as a checklist of phrases to keep an eye on.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-white">
                  Limits you should know about
                </h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  This is not a legal engine and it does not understand context, jurisdiction, or your personal risk profile.
                  There are important limitations:
                </p>
                <ul className="space-y-2 text-slate-400 mb-6">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Important issues can be missed if the wording is different from the phrases the tool looks for.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Harmless boilerplate can be highlighted even when it is standard and low risk in your situation.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>The tool does not know which laws apply to you or how a court would interpret any clause.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>It does not perform tracking detection in your browser, it only reads the text of the policy itself.</span>
                  </li>
                </ul>

                <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-sm rounded-xl border border-yellow-500/30 p-6">
                  <div className="flex items-start space-x-4">
                    <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-yellow-300">Bottom line</h3>
                      <p className="text-slate-300 leading-relaxed">
                        You should still read the original policy, especially the sections about data sharing, your rights, dispute
                        resolution, and how changes are communicated. The summarizer is a reading aid, not a decision maker.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <FileText className="w-5 h-5" />
              <span>Open Privacy & ToS Summarizer</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print This Page</span>
            </button>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              <strong className="text-cyan-400">Important Notice & Legal Disclaimer:</strong> The Privacy Policy & Terms of Service Summarizer and this companion page are provided for educational and
              informational purposes only. They are not a source of legal advice, do not create any attorney–client
              relationship, and do not guarantee compliance with any law or regulation.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              This tool runs entirely in your browser. The text you paste or load is processed locally and is not sent to
              CyberLife Coach, to browser vendors, or to any third party by this page. No warranty is given that any particular
              clause will be identified, interpreted correctly, or evaluated in light of your specific situation.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Always review the original policy or Terms of Service, consider your own risk tolerance and obligations, and
              consult a qualified professional if you need legal, regulatory, or compliance guidance. By using this page and
              the associated demo, you agree that you are solely responsible for any decisions you make based on the results.
            </p>
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
            <p>&copy; 2025 CyberLifeCoach</p>
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
