import React from 'react';
import { ArrowLeft, Shield, BookOpen, AlertTriangle, CheckCircle, Lock, Download } from 'lucide-react';

export default function AboutPrivacyPlaybookGenerator() {
  const handleOpenTool = () => {
    window.location.href = '/tools/privacy-playbook-generator';
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">

      {/* ── NAV ── */}
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

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
              Privacy Planning Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              4-Week Action Plan
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Free &amp; Browser-Based
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the Personal Privacy Playbook Generator
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            A practical guide to understanding what this tool does, how it works, and how to get the most out of your personalized privacy action plan.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">

          {/* Why This Matters */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-8 mb-8">
            <div className="flex items-start space-x-4">
              <Shield className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-cyan-300">Why This Tool Exists</h2>
                <p className="text-slate-300 leading-relaxed">
                  Most privacy advice is generic. "Use a VPN." "Enable two-factor authentication." But generic advice doesn't account
                  for what devices you use, what your biggest risks are, or how comfortable you are with technology. The Privacy Playbook
                  Generator asks you 13 targeted questions and builds a prioritized, personalized 4-week action plan based on your actual situation —
                  not a one-size-fits-all checklist.
                </p>
              </div>
            </div>
          </div>

          {/* What It Does */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              What the Tool Does
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              The generator walks you through 13 questions covering your devices, browser habits, password practices, cloud storage,
              social media exposure, data broker risk, and comfort level with privacy tools. Based on your answers it produces:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: '📊', title: 'Privacy Baseline Score', desc: 'A 0–100 score showing where you stand today, with a visual gauge.' },
                { icon: '📅', title: '4-Week Action Plan', desc: 'Specific tasks organized by week — browser, accounts, data brokers, and advanced hardening.' },
                { icon: '🎯', title: 'Prioritized Tasks', desc: 'Each task is rated CRITICAL, HIGH, MEDIUM, or LOW based on your specific answers.' },
                { icon: '🛠️', title: 'Tool Recommendations', desc: 'Concrete tools and apps recommended for your platform and comfort level.' },
                { icon: '⏱️', title: 'Time Estimates', desc: 'Each task shows how long it will realistically take so you can plan your effort.' },
                { icon: '📄', title: 'Downloadable Report', desc: 'Export your full playbook as an HTML file you can save, print, or reference offline.' },
              ].map(item => (
                <div key={item.title} className="bg-slate-950/50 border border-slate-700 rounded-xl p-5">
                  <p className="text-lg mb-1">{item.icon} <strong className="text-slate-200">{item.title}</strong></p>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              How It Works
            </h2>

            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-3">
                <Lock className="w-6 h-6 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">Fully Private — Runs in Your Browser</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Every calculation happens locally in your browser. Your answers are never transmitted to any server, stored in any database,
                or shared with any third party. The moment you close the tab, your answers are gone. There is no account required and no data collected.
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-3">
                <CheckCircle className="w-6 h-6 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">How the Score Is Calculated</h3>
              </div>
              <p className="text-slate-400 leading-relaxed mb-4">
                Your privacy score is built from weighted signals across your answers. Higher-risk gaps — like no password manager,
                no multi-factor authentication, or active data broker exposure — lower your score more significantly. Lower-risk gaps
                such as not yet using a VPN have less impact. The score is a directional indicator, not a certification.
              </p>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-sm">
                  {[
                    { range: '80–100', label: 'Strong', color: 'text-emerald-400' },
                    { range: '60–79', label: 'Moderate', color: 'text-cyan-400' },
                    { range: '40–59', label: 'At Risk', color: 'text-amber-400' },
                    { range: '0–39',  label: 'Vulnerable', color: 'text-red-400' },
                  ].map(s => (
                    <div key={s.range} className="bg-slate-900 border border-slate-700 rounded-lg p-3">
                      <p className={`text-lg font-bold ${s.color}`}>{s.range}</p>
                      <p className="text-slate-400 text-xs mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-3">
                <BookOpen className="w-6 h-6 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">How the Plan Is Personalized</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Tasks are generated based on your specific answers. If you said you use Chrome, the browser week focuses on Chrome-specific
                hardening steps. If you indicated a beginner comfort level, the tool recommends user-friendly options rather than
                advanced configurations. If you already use a password manager, that task is excluded from your plan. The result is a
                plan built around your gaps, not someone else's.
              </p>
            </div>
          </div>

          {/* The 4 Weeks */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              The 4-Week Structure
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  week: 'Week 1',
                  theme: 'Browser & Tracking',
                  grad: 'from-cyan-500/20 to-blue-500/20',
                  border: 'border-cyan-500/30',
                  icon: '🌐',
                  desc: 'Lock down your browser settings, switch to a privacy-respecting default, install tracker blockers, and remove unnecessary extensions.',
                },
                {
                  week: 'Week 2',
                  theme: 'Account Security',
                  grad: 'from-violet-500/20 to-purple-500/20',
                  border: 'border-violet-500/30',
                  icon: '🔐',
                  desc: 'Set up or audit your password manager, enable multi-factor authentication on critical accounts, and review account recovery options.',
                },
                {
                  week: 'Week 3',
                  theme: 'Data Brokers & Footprint',
                  grad: 'from-amber-500/20 to-orange-500/20',
                  border: 'border-amber-500/30',
                  icon: '🕵️',
                  desc: 'Identify and opt out of data broker databases, audit your social media exposure, and reduce your publicly searchable personal information.',
                },
                {
                  week: 'Week 4',
                  theme: 'Cloud, Device & Advanced',
                  grad: 'from-emerald-500/20 to-teal-500/20',
                  border: 'border-emerald-500/30',
                  icon: '☁️',
                  desc: 'Review cloud storage permissions, apply device-level privacy settings, and tackle advanced steps like VPN setup or encrypted email.',
                },
              ].map(w => (
                <div key={w.week} className={`bg-gradient-to-br ${w.grad} backdrop-blur-sm rounded-2xl border ${w.border} p-6`}>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{w.week}</p>
                  <h3 className="text-xl font-bold text-white mb-3">{w.icon} {w.theme}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Who It's For */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Who This Tool Is For
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: '👤', title: 'Everyday Users', desc: 'Anyone who wants to take their first real step toward protecting their personal data without needing a technical background.' },
                { icon: '👪', title: 'Families', desc: 'Parents looking to understand their digital exposure and set a better example for children growing up online.' },
                { icon: '💼', title: 'Small Business Owners', desc: 'Sole operators and small teams who handle customer data and want to reduce personal and business privacy risk.' },
              ].map(u => (
                <div key={u.title} className="bg-slate-950/50 border border-slate-700 rounded-xl p-5">
                  <p className="text-2xl mb-2">{u.icon}</p>
                  <p className="font-bold text-slate-200 mb-2">{u.title}</p>
                  <p className="text-slate-400 text-sm">{u.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips for Getting the Most Out of It */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Tips for Getting the Most Out of It
            </h2>
            <ol className="space-y-4 text-slate-400">
              {[
                'Answer honestly. The tool is only as accurate as your inputs. There are no wrong answers — every gap is an opportunity.',
                'Download your report immediately after completing the quiz. Once you close the tab, your results are gone.',
                'Start with CRITICAL tasks first. Don\'t try to do everything in week one — focus on what the plan marks as highest priority.',
                'Revisit in 90 days. Privacy is not a one-time fix. Run through the quiz again after completing your first playbook to see how your score improves.',
                'Share it with someone you care about. Privacy risks don\'t stop at your own devices — help family members run through it too.',
              ].map((tip, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold text-xl flex-shrink-0">{i + 1}.</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Important Limitations */}
          <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl border border-yellow-500/30 p-8 mb-8">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-3 text-yellow-300">Important Limitations</h3>
                <ul className="space-y-2 text-slate-300 text-sm leading-relaxed">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>This tool generates recommendations based on general best practices. It cannot account for every configuration, service, or threat unique to your environment.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>A high score does not mean you are immune to threats. Privacy hygiene reduces risk — it does not eliminate it.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Tool and service recommendations reflect general consensus at time of publication. Always verify a tool's current reputation before installing it.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>This is a starting point, not a comprehensive security audit. For high-risk situations, consult a qualified cybersecurity professional.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <Shield className="w-5 h-5" />
              <span>Generate My Privacy Playbook</span>
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
              <strong className="text-cyan-400">Legal Disclaimer and Important Notice: </strong>
              The Personal Privacy Playbook Generator and this guide are provided for informational and educational purposes only.
              They do not constitute legal advice, professional cybersecurity consulting, or a guarantee of security outcomes.
              Recommendations are based on general privacy best practices and may not apply to every individual, device configuration,
              jurisdiction, or threat environment. CyberLifeCoach assumes no liability for any outcome resulting from following or not
              following the recommendations generated by this tool. No personally identifiable information is collected, stored, or
              transmitted — all processing occurs locally in your browser. Always consult a qualified cybersecurity professional for
              advice tailored to your specific situation.
            </p>
          </div>

        </div>
      </section>

      {/* ── FOOTER ── */}
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
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
