import React from 'react';
import { Smartphone, ArrowLeft, Shield, CheckCircle, AlertTriangle, Lock, Eye, Wifi, Users } from 'lucide-react';

export default function AboutSecureSmartphoneChooser() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center space-x-3 group cursor-pointer">
              <img src="/logo.png" alt="CyberLifeCoach" className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300" />
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
              Security Tool Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Mobile Security
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Client-Side Only
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the Secure Smartphone Chooser
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            A threat-focused decision tool that helps you choose the right smartphone and generate a personalized hardening checklist — all in your browser.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">

          {/* Introduction */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-8 mb-8">
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              The Secure Smartphone Chooser helps you cut through the noise of mobile security advice by anchoring recommendations to your actual threat model. Most phone security guides give you a generic list of settings to change. This tool starts by asking what you are actually trying to protect against, then builds a recommendation and checklist around that focus.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              It runs entirely in your browser. Nothing you enter is transmitted to any server. Your answers stay on your device.
            </p>
          </div>

          {/* Privacy First */}
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
              <div>
                <p className="text-sm font-semibold text-blue-300 mb-2">Privacy First</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  This tool operates entirely client-side. No data is collected, stored, or transmitted. Your phone model, threat focus, and answers never leave your browser session.
                </p>
              </div>
            </div>
          </div>

          {/* How to Use It */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              How to Use It
            </h2>
            <ul className="space-y-4">
              {[
                { step: '1', text: 'Select your primary threat focus from the five options provided.' },
                { step: '2', text: 'Enter your current phone model, platform, OS version, and how long you plan to keep the device.' },
                { step: '3', text: 'Note any high risk apps you use regularly, such as social apps, dating apps, or crypto wallets.' },
                { step: '4', text: 'Answer whether you depend on Google services or iMessage and FaceTime, as these anchor your platform choice.' },
                { step: '5', text: 'Optionally expand the additional questions to refine the recommendation further.' },
                { step: '6', text: 'Click Generate My Plan to see your best-fit recommendation, must-have features, hardening checklist, red flags, and personalized notes.' },
                { step: '7', text: 'Download the output as a text file or copy it to keep with your device notes.' },
              ].map(({ step, text }) => (
                <li key={step} className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold text-xl shrink-0">{step}.</span>
                  <span className="text-slate-300">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Threat Categories */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              The Five Threat Categories
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: <Eye className="w-6 h-6 text-cyan-400" />,
                  title: 'Tracking and Data Collection',
                  desc: 'For users who want to reduce how much data apps, advertisers, and platforms collect about them. Focus is on permission control and reducing telemetry.'
                },
                {
                  icon: <Lock className="w-6 h-6 text-cyan-400" />,
                  title: 'Theft and Account Takeover',
                  desc: 'For users whose primary concern is someone physically taking their device or hijacking their accounts through SIM swapping or credential theft.'
                },
                {
                  icon: <Wifi className="w-6 h-6 text-cyan-400" />,
                  title: 'Travel Risk and Hostile Networks',
                  desc: 'For frequent travelers or those who regularly use public WiFi, hotel networks, or connect in countries with aggressive surveillance infrastructure.'
                },
                {
                  icon: <Shield className="w-6 h-6 text-cyan-400" />,
                  title: 'Targeted Spyware and High Risk Work',
                  desc: 'For journalists, activists, attorneys, executives, or anyone who may be a specific target of sophisticated spyware like Pegasus or nation-state actors.'
                },
                {
                  icon: <Users className="w-6 h-6 text-cyan-400" />,
                  title: 'Business Compliance and Client Data',
                  desc: 'For professionals who handle regulated data, client records, or work under formal compliance requirements like HIPAA, SOC 2, or contractual obligations.'
                },
              ].map((item, i) => (
                <div key={i} className="bg-slate-950 border border-slate-700 rounded-lg p-5">
                  <div className="flex items-start space-x-3 mb-3">
                    {item.icon}
                    <h3 className="text-base font-semibold text-cyan-400">{item.title}</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What the Output Includes */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              What the Output Includes
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'Best-Fit Recommendation', desc: 'A specific platform or device recommendation matched to your threat focus, with a plain-language explanation of why it fits.' },
                { title: 'Must-Have Security Features', desc: 'A list of non-negotiable security capabilities your device should have before you rely on it for anything sensitive.' },
                { title: 'Hardening Checklist', desc: 'Actionable settings and behaviors you can apply right now to reduce your attack surface, regardless of which phone you use.' },
                { title: 'Red Flags to Avoid', desc: 'Warning signs that a device or vendor is making security claims you should not trust, including vague marketing and poor patch records.' },
                { title: 'Personalized Notes', desc: 'Context-aware observations based on your specific answers, such as what changes when you need Google services or travel frequently.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200 text-sm">{item.title}</strong>
                    <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Best Practices
            </h2>
            <ul className="space-y-4">
              {[
                'Be honest about the apps you actually use. High risk apps like social platforms or dating apps change your exposure profile significantly.',
                'Answer the optional questions if you travel or have compliance requirements. The notes section becomes much more useful with complete answers.',
                'Download the output and keep it with your device documentation. Revisit it when you upgrade or when your threat profile changes.',
                'Treat the recommendation as a starting point, not a final answer. Verify update timelines and specific device features directly with the manufacturer.',
                'If you need iMessage or FaceTime, that typically means staying on iPhone. If you need Google services, GrapheneOS paths require testing before committing.',
              ].map((text, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 shrink-0 mt-0.5" />
                  <span className="text-slate-300">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Security Considerations */}
          <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl border border-yellow-500/30 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-400 shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-yellow-300">Important Limitations</h2>
            </div>
            <ul className="space-y-3 text-slate-300">
              {[
                { label: 'Recommendations are general guidance.', detail: 'Device update timelines and manufacturer support policies change. Always verify directly with the manufacturer before making a purchase decision.' },
                { label: 'Carrier policies vary.', detail: 'SIM protection, eSIM availability, and port-out protection depend on your carrier. Check with your provider for current options.' },
                { label: 'App compatibility is not verified.', detail: 'If you switch platforms, especially to GrapheneOS or a de-Googled device, test that your essential apps work before fully committing.' },
                { label: 'This tool does not replace a professional assessment.', detail: 'For high risk work involving targeted spyware or compliance requirements, consult a professional who can evaluate your full environment.' },
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-yellow-400 mr-3 shrink-0">⚠️</span>
                  <span><strong>{item.label}</strong> {item.detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => window.location.href = '/tools/secure-smartphone-chooser'}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <Smartphone className="w-5 h-5" />
              <span>Open Secure Smartphone Chooser</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print This Guide</span>
            </button>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer:</strong> This tool provides educational guidance only. Always verify recommendations, update timelines, and device features with the manufacturer and your carrier. CyberLifeCoach assumes no liability for misuse, data loss, or damage resulting from actions taken based on this content.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/logo.png" alt="CyberLifeCoach" className="h-8 w-auto transition-all duration-300 hover:scale-125 hover:brightness-125" />
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
