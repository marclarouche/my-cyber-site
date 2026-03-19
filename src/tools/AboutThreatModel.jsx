import React from 'react';
import { Shield, ArrowLeft, Target, AlertTriangle, CheckCircle, Eye, Users, FileText, Lock } from 'lucide-react';

export default function AboutThreatModel() {
  const handleOpenTool = () => {
    window.location.href = '/tools/threat-model';
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
              Security Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Threat Modeling
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About Threat Modeling
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            What it is, why it matters, and how to do it without being a security expert.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* 1) What is a threat model */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              1) What is a threat model
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              A threat model is a simple description of what you are protecting, who or what you are protecting it from, 
              and the smallest set of steps that measurably reduce the most important risks. It turns a vague feeling of 
              worry into a concrete plan you can act on.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Plain-language version */}
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Plain-language version</h3>
                <ul className="space-y-3 text-slate-400">
                  <li className="flex items-start">
                    <Target className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-300">Assets</strong> — the stuff that matters such as accounts, devices, data, identity
                    </div>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-300">Threats</strong> — how things could go wrong such as phishing, theft, malware, account takeover, mistakes
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Eye className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-300">Likelihood and impact</strong> — how likely it is and how bad it would be
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-300">Controls</strong> — one or two specific actions that reduce the risk
                    </div>
                  </li>
                </ul>
              </div>

              {/* A tiny example */}
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">A tiny example</h3>
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-4">
                  <div className="text-sm font-semibold text-blue-300 mb-2">Example</div>
                  <pre className="text-sm text-slate-300 font-mono leading-relaxed whitespace-pre-wrap">
Asset:
Primary email account

Threat:
Phishing leading to account takeover

Likelihood:
Medium

Impact:
High

Controls:
Turn on authenticator-app MFA, review forwarding rules monthly
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* 2) Why do a threat model */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              2) Why do a threat model
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Focus</strong>
                  <span className="text-slate-400"> — helps you spend effort where it matters rather than on random tips</span>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Clarity</strong>
                  <span className="text-slate-400"> — turns security jargon into plain tasks with owners and due dates</span>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Resilience</strong>
                  <span className="text-slate-400"> — reduces the blast radius when something does go wrong</span>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Accountability</strong>
                  <span className="text-slate-400"> — creates a record you can share with family, a team, or leadership</span>
                </div>
              </li>
            </ul>
          </div>

          {/* 3) When to do it */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              3) When to do it
            </h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3">•</span>
                <span>At project kickoff, before launching a new feature or workflow</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3">•</span>
                <span>After a major change such as new devices, travel, remote work, or a new vendor</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3">•</span>
                <span>After a security incident or near-miss</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3">•</span>
                <span>On a cadence such as once or twice per year</span>
              </li>
            </ul>
          </div>

          {/* 4) A quick workflow that works */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              4) A quick workflow that works
            </h2>
            <ol className="space-y-4 mb-6">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">1.</span>
                <div>
                  <strong className="text-slate-200">List your top five assets</strong>
                  <span className="text-slate-400"> — devices, accounts, or data that would truly hurt to lose</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">2.</span>
                <div>
                  <strong className="text-slate-200">Pick one likely threat</strong>
                  <span className="text-slate-400"> for each asset rather than listing every possibility</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">3.</span>
                <div>
                  <strong className="text-slate-200">Rate likelihood and impact</strong>
                  <span className="text-slate-400"> using Low, Medium, High, then multiply for a quick score</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">4.</span>
                <div>
                  <strong className="text-slate-200">Choose one small fix</strong>
                  <span className="text-slate-400"> that reduces risk right away such as turning on MFA or enabling automatic backups</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">5.</span>
                <div>
                  <strong className="text-slate-200">Assign an owner and a date</strong>
                  <span className="text-slate-400"> — optional but it turns ideas into action</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">6.</span>
                <div>
                  <strong className="text-slate-200">Print or export to PDF</strong>
                  <span className="text-slate-400"> and revisit after you complete the fixes</span>
                </div>
              </li>
            </ol>
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-4">
              <p className="text-slate-300 text-sm">
                You can do all of this with the{' '}
                <button
                  onClick={handleOpenTool}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold underline transition-colors"
                >
                  Threat Model Builder
                </button>
                {' '}in a few minutes.
              </p>
            </div>
          </div>

          {/* 5) Common misconceptions */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              5) Common misconceptions
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-red-400 mr-3 text-xl flex-shrink-0">✕</span>
                <div>
                  <strong className="text-slate-200">"I need to be technical."</strong>
                  <span className="text-slate-400"> You do not. Plain language and a small checklist are enough.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 text-xl flex-shrink-0">✕</span>
                <div>
                  <strong className="text-slate-200">"It takes too long."</strong>
                  <span className="text-slate-400"> Ten focused minutes beats a hundred random tips.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 text-xl flex-shrink-0">✕</span>
                <div>
                  <strong className="text-slate-200">"I must cover every threat."</strong>
                  <span className="text-slate-400"> You only need to address the most likely high-impact risks.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 text-xl flex-shrink-0">✕</span>
                <div>
                  <strong className="text-slate-200">"Tools will solve it."</strong>
                  <span className="text-slate-400"> Tools help, but decisions about what to protect and why must come first.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* 6) What good output looks like */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              6) What good output looks like
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FileText className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  Three to ten entries, each with asset, threat, likelihood, impact, one specific control
                </span>
              </li>
              <li className="flex items-start">
                <Users className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  Short notes about owners and dates if you are working as a team or family
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  A one page PDF you can print or share securely
                </span>
              </li>
            </ul>
          </div>

          {/* 7) Privacy and scope */}
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-8 mb-8">
            <div className="flex items-start space-x-4">
              <Lock className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-blue-300">7) Privacy and scope</h2>
                <p className="text-slate-300 leading-relaxed">
                  Your model can be personal, family, or business scoped. If it includes sensitive details, 
                  store the file securely and avoid emailing it in plain text. The builder runs locally, 
                  so nothing is uploaded by default.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Guide Section */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Quick Reference: The Threat Modeling Process
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-slate-950 border border-cyan-500/30 rounded-lg p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-cyan-500/30">
                  <Target className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-sm font-semibold text-cyan-400 mb-2">Identify Assets</h3>
                <p className="text-xs text-slate-400">What needs protection?</p>
              </div>
              <div className="bg-slate-950 border border-yellow-500/30 rounded-lg p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center border border-yellow-500/30">
                  <AlertTriangle className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-sm font-semibold text-yellow-400 mb-2">List Threats</h3>
                <p className="text-xs text-slate-400">What could go wrong?</p>
              </div>
              <div className="bg-slate-950 border border-blue-500/30 rounded-lg p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                  <Eye className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-sm font-semibold text-blue-400 mb-2">Assess Risk</h3>
                <p className="text-xs text-slate-400">How likely and severe?</p>
              </div>
              <div className="bg-slate-950 border border-green-500/30 rounded-lg p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-sm font-semibold text-green-400 mb-2">Apply Controls</h3>
                <p className="text-xs text-slate-400">What reduces risk?</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <span className="text-lg">🧭</span>
              <span>Open Threat Model Builder</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print This Guide</span>
            </button>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer and Important Notice:</strong> This guide and the accompanying tools are provided for educational purposes only and do not constitute legal or professional advice. CyberLife Coach is not liable for actions taken or outcomes arising from the use of this material. Use these resources only on systems and accounts you own or are authorized to manage, and always comply with applicable laws and organizational policies.
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
            <p>&copy; {new Date().getFullYear()} CyberLifeCoach</p>
            <p className="text-slate-600">Privacy-first security guidance and tools</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
