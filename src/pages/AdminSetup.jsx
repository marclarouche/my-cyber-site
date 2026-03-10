import React, { useState } from 'react';
import { ArrowLeft, Shield, CheckCircle } from 'lucide-react';

// ── STEP DATA ─────────────────────────────────────────────────────────────────
const steps = {
  substack: [
    {
      num: '01',
      title: 'Find your Substack RSS URL',
      content: (
        <>
          <p className="text-slate-400 text-sm mb-3">Your RSS feed is automatic — no configuration needed:</p>
          <div className="bg-slate-950 border border-slate-700 border-l-2 border-l-cyan-500 rounded-r-lg p-4 font-mono text-sm text-cyan-400">
            https://cyberlifecoach.substack.com/feed
          </div>
        </>
      ),
    },
    {
      num: '02',
      title: 'Verify it loads in your browser',
      content: (
        <>
          <p className="text-slate-400 text-sm mb-3">
            Paste the URL into your browser. You should see an XML page with your recent articles. If it loads — Substack setup is complete ✅
          </p>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-sm text-blue-300">
            <span className="font-semibold">How this is used:</span> The automation polls this feed every 15 minutes,
            detects new posts, and triggers the Claude AI drafting pipeline automatically.
          </div>
        </>
      ),
    },
  ],

  bluesky: [
    {
      num: '01',
      title: 'Log into Bluesky',
      content: (
        <p className="text-slate-400 text-sm">
          Go to{' '}
          <a href="https://bsky.app" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            bsky.app
          </a>{' '}
          and sign into your{' '}
          <code className="bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono">
            cyberlifecoach.bsky.social
          </code>{' '}
          account.
        </p>
      ),
    },
    {
      num: '02',
      title: 'Navigate to App Passwords',
      content: (
        <>
          <p className="text-slate-400 text-sm mb-3">
            Profile icon → <strong className="text-slate-300">Settings</strong> →{' '}
            <strong className="text-slate-300">Privacy and Security</strong> →{' '}
            <strong className="text-slate-300">App Passwords</strong>
          </p>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 text-sm text-blue-300">
            Direct link:{' '}
            <a href="https://bsky.app/settings/app-passwords" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">
              bsky.app/settings/app-passwords
            </a>
          </div>
        </>
      ),
    },
    {
      num: '03',
      title: 'Create a new App Password',
      content: (
        <>
          <p className="text-slate-400 text-sm mb-3">
            Click <strong className="text-slate-300">"Add App Password"</strong> → name it{' '}
            <code className="bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono">
              CyberLifeCoach-Automation
            </code>{' '}
            → click <strong className="text-slate-300">Create App Password</strong>.
          </p>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-sm text-amber-300">
            ⚠️ <span className="font-semibold">Bluesky only shows this password once.</span> Copy it to ProtonPass immediately before closing the window.
          </div>
        </>
      ),
    },
    {
      num: '04',
      title: 'Save to ProtonPass',
      content: (
        <>
          <p className="text-slate-400 text-sm mb-3">
            Create a single login entry in ProtonPass with both credentials so you can autofill the session modal in one click:
          </p>
          <div className="bg-slate-950 border border-slate-700 border-l-2 border-l-cyan-500 rounded-r-lg p-4 font-mono text-sm space-y-2">
            <div><span className="text-slate-500"># ProtonPass — Username field:</span></div>
            <div><span className="text-slate-400">Username</span> = <span className="text-cyan-400">your Claude API key (sk-ant-...)</span></div>
            <div className="pt-1"><span className="text-slate-500"># ProtonPass — Password field:</span></div>
            <div><span className="text-slate-400">Password</span> = <span className="text-cyan-400">your Bluesky App Password</span></div>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-sm text-emerald-300 mt-3">
            ✅ Bluesky uses the open AT Protocol — no app review, no wait. Posting works immediately.
          </div>
        </>
      ),
    },
  ],

  claude: [
    {
      num: '01',
      title: 'Log into Anthropic Console',
      content: (
        <p className="text-slate-400 text-sm">
          Go to{' '}
          <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            console.anthropic.com
          </a>{' '}
          and sign in or create a free account.
        </p>
      ),
    },
    {
      num: '02',
      title: 'Create an API Key',
      content: (
        <>
          <p className="text-slate-400 text-sm mb-3">
            Left sidebar → <strong className="text-slate-300">API Keys</strong> → <strong className="text-slate-300">Create Key</strong> → name it{' '}
            <code className="bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono">CyberLifeCoach-Social</code>
          </p>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-sm text-amber-300">
            ⚠️ <span className="font-semibold">Copy it immediately — it only shows once.</span> Save it to the Username field of your ProtonPass entry.
          </div>
        </>
      ),
    },
    {
      num: '03',
      title: 'Add billing credits',
      content: (
        <>
          <p className="text-slate-400 text-sm mb-3">
            Console → <strong className="text-slate-300">Billing</strong> → add a small credit balance. Each Bluesky draft costs roughly <span className="text-cyan-400 font-semibold">$0.001–0.003</span> with Claude Sonnet — $5 will last hundreds of posts.
          </p>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 text-sm text-blue-300">
            The automation only calls the API when you click "Generate Draft" — no background usage.
          </div>
        </>
      ),
    },
  ],

  linkedin: [
    {
      num: '01',
      title: 'Manual copy-paste workflow',
      content: (
        <>
          <p className="text-slate-400 text-sm mb-3">
            LinkedIn API access for personal posting requires OAuth approval, token refresh management, and carries TOS risk for small accounts.
            The manual approach is safer, faster to set up, and gives you full control over every post.
          </p>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-sm text-emerald-300">
            ✅ The Social Automation dashboard has a <strong>"Copy for LinkedIn"</strong> button on every article card.
            It generates a fully formatted post — title, excerpt, link, and hashtags — ready to paste into LinkedIn in one click.
          </div>
        </>
      ),
    },
    {
      num: '02',
      title: 'Recommended posting schedule',
      content: (
        <>
          <p className="text-slate-400 text-sm mb-3">
            Post twice a week for consistent reach without burning your audience.
          </p>
          <div className="bg-slate-950 border border-slate-700 border-l-2 border-l-blue-500 rounded-r-lg p-4 text-sm space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-blue-400 font-semibold w-28">Best days:</span>
              <span className="text-slate-300">Tuesday + Thursday, or Monday + Friday</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-blue-400 font-semibold w-28">Best times:</span>
              <span className="text-slate-300">9–11am or 4–6pm your local time</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-blue-400 font-semibold w-28">Format:</span>
              <span className="text-slate-300">Hook → excerpt → link → 3–4 hashtags</span>
            </div>
          </div>
        </>
      ),
    },
  ],
};

// ── CHECKLIST ITEMS ───────────────────────────────────────────────────────────
const checklist = [
  'Substack RSS URL confirmed loading at cyberlifecoach.substack.com/feed',
  'Bluesky App Password created and saved to ProtonPass (password field)',
  'Claude API key created and saved to ProtonPass (username field)',
];

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────
function StepCard({ num, title, content }) {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300 rounded-2xl p-6">
      <div className="flex items-start space-x-4">
        <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
          {num}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white mb-3">{title}</h3>
          {content}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ icon, title, subtitle, time, timeColor }) {
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-xl ${icon.bg}`}>{icon.svg}</div>
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-slate-400 text-sm">{subtitle}</p>
        </div>
      </div>
      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap ${timeColor}`}>{time}</span>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function AdminSetup() {
  const [checked, setChecked] = useState(Array(checklist.length).fill(false));

  function toggleCheck(i) {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);
  }

  const completedCount = checked.filter(Boolean).length;
  const allDone = completedCount === checklist.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">

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
            <a href="/clc-ops" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Mission Control</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ── CONTENT ── */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Page header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">
              <Shield className="w-4 h-4" /> Mission Control — Social Automation Setup
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">API Setup Guide</h1>
            <p className="text-slate-400 text-lg">
              Three things to set up. Two take under 5 minutes each. LinkedIn is manual — no API needed.
            </p>
          </div>

          {/* Automation flow */}
          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-6 mb-12">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-4">Automation Flow</p>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {[
                ['📰', 'Substack Publishes'],
                null,
                ['📡', 'RSS Detected'],
                null,
                ['🤖', 'Claude Drafts', true],
                null,
                ['✅', 'You Approve'],
                null,
                ['🦋', 'Bluesky Auto-posts'],
                '+',
                ['💼', 'LinkedIn Manual'],
              ].map((item, i) => {
                if (item === null) return (
                  <svg key={i} className="w-4 h-4 text-cyan-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                );
                if (item === '+') return <span key={i} className="text-slate-500 font-bold">+</span>;
                const [emoji, label, highlight] = item;
                return (
                  <div key={i} className={`flex items-center space-x-2 bg-slate-900 rounded-lg px-3 py-2 border ${highlight ? 'border-cyan-500/40' : 'border-slate-700'}`}>
                    <span>{emoji}</span>
                    <span className={`text-sm font-medium ${highlight ? 'text-cyan-400' : 'text-slate-300'}`}>{label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── SUBSTACK ── */}
          <section className="mb-12">
            <SectionHeader
              icon={{
                bg: 'bg-gradient-to-br from-orange-500 to-red-600',
                svg: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6" />
                  </svg>
                ),
              }}
              title="Substack RSS Feed"
              subtitle="No API key needed — free and instant"
              time="⏱ ~2 min"
              timeColor="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
            />
            <div className="space-y-4">
              {steps.substack.map(s => <StepCard key={s.num} {...s} />)}
            </div>
          </section>

          {/* ── BLUESKY ── */}
          <section className="mb-12">
            <SectionHeader
              icon={{
                bg: 'bg-gradient-to-br from-blue-400 to-blue-600',
                svg: (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 4c1.5 0 3 .75 4 2L12 13 8 8c1-1.25 2.5-2 4-2zm-6 6c0-1 .25-2 .75-2.75L11 14.5v4.4A8.01 8.01 0 016 12zm7 6.9v-4.4l4.25-5.25c.5.75.75 1.75.75 2.75a8.01 8.01 0 01-5 6.9z" />
                  </svg>
                ),
              }}
              title="Bluesky App Password"
              subtitle="No developer account needed — just an App Password"
              time="⏱ ~5 min"
              timeColor="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
            />
            <div className="space-y-4">
              {steps.bluesky.map(s => <StepCard key={s.num} {...s} />)}
            </div>
          </section>

          {/* ── CLAUDE API ── */}
          <section className="mb-12">
            <SectionHeader
              icon={{
                bg: 'bg-gradient-to-br from-violet-500 to-purple-600',
                svg: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
              }}
              title="Claude API Key"
              subtitle="Powers the AI post drafting — pay per use, no subscription"
              time="⏱ ~5 min"
              timeColor="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
            />
            <div className="space-y-4">
              {steps.claude.map(s => <StepCard key={s.num} {...s} />)}
            </div>
          </section>

          {/* ── LINKEDIN ── */}
          <section className="mb-12">
            <SectionHeader
              icon={{
                bg: 'bg-gradient-to-br from-blue-600 to-blue-800',
                svg: (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ),
              }}
              title="LinkedIn — Manual Workflow"
              subtitle="No API needed — copy-paste is safer and TOS-compliant"
              time="⏱ 0 min setup"
              timeColor="bg-blue-500/10 border border-blue-500/30 text-blue-400"
            />
            <div className="space-y-4">
              {steps.linkedin.map(s => <StepCard key={s.num} {...s} />)}
            </div>
          </section>

          {/* ── CHECKLIST ── */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-8">
              <h2 className="text-xl font-bold mb-1">Credentials Checklist</h2>
              <p className="text-slate-400 text-sm mb-6">Check each off as you complete it. All 3 = ready to use the automation dashboard.</p>

              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-slate-500 mb-2">
                  <span>Progress</span>
                  <span>{completedCount} / {checklist.length} complete</span>
                </div>
                <div className="bg-slate-800 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${(completedCount / checklist.length) * 100}%`,
                      background: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
                    }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                {checklist.map((item, i) => (
                  <label key={i} className="flex items-center space-x-3 cursor-pointer group" onClick={() => toggleCheck(i)}>
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                      checked[i] ? 'bg-cyan-500/20 border-cyan-500' : 'border-slate-600 group-hover:border-cyan-500'
                    }`}>
                      {checked[i] && (
                        <svg className="w-3 h-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm transition-colors duration-200 ${checked[i] ? 'line-through text-slate-500' : 'text-slate-300'}`}>
                      {item}
                    </span>
                  </label>
                ))}
              </div>

              {allDone && (
                <div className="mt-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <p className="text-emerald-400 font-semibold">All credentials ready — head to the Social Automation dashboard.</p>
                </div>
              )}
            </div>
          </section>

          {/* ── CTA ── */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-bold mb-3">Ready to Post?</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Once all 3 credentials are checked off, open the Social Automation dashboard to fetch your latest Substack posts and start drafting.
            </p>
            <a
              href="/clc-ops/social-automation"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
            >
              Open Social Automation Dashboard
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

        </div>
      </div>

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
            <p className="text-slate-600">Mission Control — Internal Use Only</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
