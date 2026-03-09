import React, { useState } from 'react';

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
          <p className="text-slate-400 text-sm mb-3">Paste the URL into your browser. You should see an XML page with your recent articles. If it loads — Substack setup is complete ✅</p>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-sm text-blue-300">
            <span className="font-semibold">How this is used:</span> The automation polls this feed every 15–30 minutes, detects new posts, and triggers the AI drafting pipeline automatically.
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
        <p className="text-slate-400 text-sm">Go to <a href="https://bsky.app" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">bsky.app</a> and sign into your <code className="bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono">cyberlifecoach.bsky.social</code> account.</p>
      ),
    },
    {
      num: '02',
      title: 'Navigate to App Passwords',
      content: (
        <>
          <p className="text-slate-400 text-sm mb-3">Profile icon → <strong className="text-slate-300">Settings</strong> → <strong className="text-slate-300">Privacy and Security</strong> → <strong className="text-slate-300">App Passwords</strong></p>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 text-sm text-blue-300">
            Direct link: <a href="https://bsky.app/settings/app-passwords" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">bsky.app/settings/app-passwords</a>
          </div>
        </>
      ),
    },
    {
      num: '03',
      title: 'Create a new App Password',
      content: (
        <>
          <p className="text-slate-400 text-sm mb-3">Click <strong className="text-slate-300">"Add App Password"</strong> → name it <code className="bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono">CyberLifeCoach-Automation</code> → click <strong className="text-slate-300">Create App Password</strong>.</p>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-sm text-amber-300">
            ⚠️ <span className="font-semibold">Bluesky only shows this password once.</span> Copy it to a secure notes app immediately before closing the window.
          </div>
        </>
      ),
    },
    {
      num: '04',
      title: 'Save your credentials',
      content: (
        <>
          <p className="text-slate-400 text-sm mb-3">You'll need both of these when we build the system:</p>
          <div className="bg-slate-950 border border-slate-700 border-l-2 border-l-cyan-500 rounded-r-lg p-4 font-mono text-sm space-y-2">
            <div><span className="text-slate-500"># Your handle:</span></div>
            <div><span className="text-slate-400">BLUESKY_HANDLE</span> = <span className="text-cyan-400">cyberlifecoach.bsky.social</span></div>
            <div className="pt-1"><span className="text-slate-500"># App password you just created:</span></div>
            <div><span className="text-slate-400">BLUESKY_APP_PASSWORD</span> = <span className="text-cyan-400">xxxx-xxxx-xxxx-xxxx</span></div>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-sm text-emerald-300 mt-3">
            ✅ Bluesky uses the open AT Protocol — no app review, no wait. Posting works immediately.
          </div>
        </>
      ),
    },
  ],
  linkedin: [
    {
      num: '01',
      title: 'Create a LinkedIn Developer App',
      content: (
        <>
          <p className="text-slate-400 text-sm mb-3">Go to <a href="https://www.linkedin.com/developers/apps/new" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">linkedin.com/developers/apps/new</a> and fill in:</p>
          <div className="bg-slate-950 border border-slate-700 border-l-2 border-l-cyan-500 rounded-r-lg p-4 font-mono text-sm space-y-1">
            <div><span className="text-slate-500">App Name: </span><span className="text-cyan-400">CyberLifeCoach Automation</span></div>
            <div><span className="text-slate-500">LinkedIn Page: </span><span className="text-cyan-400">your LinkedIn page URL</span></div>
            <div><span className="text-slate-500">App Logo: </span><span className="text-cyan-400">upload CyberLifeCoach logo</span></div>
            <div><span className="text-slate-500">Legal Agreement: </span><span className="text-cyan-400">✅ check the box</span></div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 text-sm text-blue-300 mt-3">
            No LinkedIn Company Page? Create one free at <a href="https://www.linkedin.com/company/setup/new/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">linkedin.com/company/setup/new</a>
          </div>
        </>
      ),
    },
    {
      num: '02',
      title: 'Get your Client ID & Secret',
      content: (
        <>
          <p className="text-slate-400 text-sm mb-3">Click the <strong className="text-slate-300">Auth</strong> tab and copy both values:</p>
          <div className="bg-slate-950 border border-slate-700 border-l-2 border-l-cyan-500 rounded-r-lg p-4 font-mono text-sm space-y-2">
            <div><span className="text-slate-400">LINKEDIN_CLIENT_ID</span> = <span className="text-cyan-400">xxxxxxxxxxxxxxxx</span></div>
            <div><span className="text-slate-400">LINKEDIN_CLIENT_SECRET</span> = <span className="text-cyan-400">xxxxxxxxxxxxxxxx</span></div>
          </div>
        </>
      ),
    },
    {
      num: '03',
      title: 'Add OAuth Redirect URL',
      content: (
        <>
          <p className="text-slate-400 text-sm mb-3"><strong className="text-slate-300">Auth tab</strong> → <strong className="text-slate-300">Authorized Redirect URLs</strong> → add:</p>
          <div className="bg-slate-950 border border-slate-700 border-l-2 border-l-cyan-500 rounded-r-lg p-4 font-mono text-sm text-cyan-400">
            http://localhost:3000/callback
          </div>
          <p className="text-slate-400 text-sm mt-3">Click <strong className="text-slate-300">Update</strong>. We'll swap this for the real domain once the dashboard is live.</p>
        </>
      ),
    },
    {
      num: '04',
      title: 'Request Product Access',
      content: (
        <>
          <p className="text-slate-400 text-sm mb-3">Click the <strong className="text-slate-300">Products</strong> tab and request:</p>
          <div className="bg-slate-950 border border-slate-700 border-l-2 border-l-cyan-500 rounded-r-lg p-4 font-mono text-sm space-y-1">
            <div className="text-cyan-400">✅ Share on LinkedIn</div>
            <div className="text-cyan-400">✅ Sign In with LinkedIn using OpenID Connect</div>
          </div>
          <p className="text-slate-400 text-sm mt-3">"Share on LinkedIn" enables posting — usually approved within a few hours.</p>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-sm text-amber-300 mt-3">
            ⚠️ Do NOT request "Marketing Developer Platform" — requires business justification and takes much longer.
          </div>
        </>
      ),
    },
    {
      num: '05',
      title: 'Generate Your Access Token',
      content: (
        <>
          <p className="text-slate-400 text-sm mb-3">Once approved → <strong className="text-slate-300">Auth tab → OAuth 2.0 Tools → Token Generator (3-legged)</strong>. Select scopes:</p>
          <div className="bg-slate-950 border border-slate-700 border-l-2 border-l-cyan-500 rounded-r-lg p-4 font-mono text-sm">
            <span className="text-cyan-400">✅ openid &nbsp; ✅ profile &nbsp; ✅ w_member_social &nbsp; ✅ email</span>
          </div>
          <p className="text-slate-400 text-sm mt-3">Click <strong className="text-slate-300">Request Access Token</strong>, authorize with your LinkedIn. Save both values:</p>
          <div className="bg-slate-950 border border-slate-700 border-l-2 border-l-cyan-500 rounded-r-lg p-4 font-mono text-sm space-y-2 mt-3">
            <div><span className="text-slate-500"># Expires in 60 days (auto-refresh handled):</span></div>
            <div><span className="text-slate-400">LINKEDIN_ACCESS_TOKEN</span> = <span className="text-cyan-400">AQX...long string...</span></div>
            <div className="pt-1"><span className="text-slate-500"># Your unique person ID:</span></div>
            <div><span className="text-slate-400">LINKEDIN_PERSON_URN</span> = <span className="text-cyan-400">urn:li:person:XXXXXXXXX</span></div>
          </div>
        </>
      ),
    },
    {
      num: '06',
      title: 'Verify the connection',
      content: (
        <p className="text-slate-400 text-sm">In the Token Generator → <strong className="text-slate-300">API calls</strong> → click <strong className="text-slate-300">GET /v2/me</strong> → Execute. If your profile data comes back in JSON — LinkedIn is fully connected ✅</p>
      ),
    },
  ],
};

const checklist = [
  'Substack RSS URL confirmed and loading in browser',
  'Bluesky handle noted (cyberlifecoach.bsky.social)',
  'Bluesky App Password copied and saved securely',
  'LinkedIn Developer App created',
  'LinkedIn Client ID saved',
  'LinkedIn Client Secret saved',
  'LinkedIn Access Token saved',
  'LinkedIn Person URN saved + /v2/me verified ✅',
];

function StepCard({ num, title, content }) {
  return (
    <div className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300 rounded-2xl p-6">
      <div className="flex items-start space-x-4">
        <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
          {num}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white mb-2">{title}</h3>
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
      <span className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${timeColor}`}>{time}</span>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────
// Auth is handled by Cloudflare Access — no password gate needed here.
export default function AdminSetup() {
  const [checked, setChecked] = useState(Array(8).fill(false));

  const toggleCheck = (i) => {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);
  };

  const completedCount = checked.filter(Boolean).length;
  const allDone = completedCount === 8;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        .blob { animation: pulse-glow 4s ease-in-out infinite; }
        .blob-2 { animation: pulse-glow 4s ease-in-out infinite; animation-delay: 1s; }
      `}</style>

      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl opacity-10" />
        <div className="blob-2 absolute bottom-40 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-10" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold">C</div>
            <span className="font-bold text-lg bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">CyberLifeCoach</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400 text-sm hidden sm:inline">Mission Control</span>
            <span className="text-slate-600 hidden sm:inline">/</span>
            <span className="text-cyan-400 text-sm font-medium hidden sm:inline">Social Automation Setup</span>
          </div>
          <span className="text-xs font-medium bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 text-cyan-400 px-3 py-1 rounded-full">ITEM 2 OF 3</span>
        </div>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-14">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Social Automation Pipeline</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">API Setup Guide</h1>
          <p className="text-slate-400 text-lg max-w-2xl">Connect Substack, LinkedIn, and Bluesky so the automation system can draft and publish posts on your behalf. Follow each section in order.</p>
        </div>

        {/* Flow diagram */}
        <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-6 mb-14">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-4">Automation Flow</p>
          <div className="flex flex-wrap items-center gap-2">
            {[
              ['📰', 'Substack Publishes'],
              null,
              ['📡', 'RSS Detected'],
              null,
              ['🤖', 'Claude AI Drafts', true],
              null,
              ['✅', 'You Approve'],
              null,
              ['💼', 'LinkedIn'],
              '+',
              ['🦋', 'Bluesky'],
            ].map((item, i) => {
              if (item === null) return (
                <svg key={i} className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              );
              if (item === '+') return <span key={i} className="text-slate-500 font-bold">+</span>;
              const [emoji, label, highlight] = item;
              return (
                <div key={i} className={`flex items-center space-x-2 bg-slate-900 rounded-lg px-4 py-2 border ${highlight ? 'border-cyan-500/40' : 'border-slate-700'}`}>
                  <span>{emoji}</span>
                  <span className={`text-sm font-medium ${highlight ? 'text-cyan-400' : ''}`}>{label}</span>
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
              svg: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6" /></svg>,
            }}
            title="Substack RSS Feed"
            subtitle="No API key needed — free and instant"
            time="⏱ ~2 min"
            timeColor="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
          />
          <div className="space-y-4">
            {steps.substack.map((s) => <StepCard key={s.num} {...s} />)}
          </div>
        </section>

        {/* ── BLUESKY ── */}
        <section className="mb-12">
          <SectionHeader
            icon={{
              bg: 'bg-gradient-to-br from-blue-400 to-blue-600',
              svg: <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" opacity="0.3"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>,
            }}
            title="Bluesky API Setup"
            subtitle="App Password — no developer account needed"
            time="⏱ ~5 min"
            timeColor="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
          />
          <div className="space-y-4">
            {steps.bluesky.map((s) => <StepCard key={s.num} {...s} />)}
          </div>
        </section>

        {/* ── LINKEDIN ── */}
        <section className="mb-12">
          <SectionHeader
            icon={{
              bg: 'bg-gradient-to-br from-blue-600 to-blue-800',
              svg: <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
            }}
            title="LinkedIn API Setup"
            subtitle="Developer App + OAuth — the most involved step"
            time="⏱ ~20 min"
            timeColor="bg-amber-500/10 border border-amber-500/30 text-amber-400"
          />
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-sm text-amber-300 mb-5">
            ⚠️ <span className="font-semibold">More steps than Bluesky, but it's a one-time process.</span> Basic posting works immediately — no lengthy review for personal posting.
          </div>
          <div className="space-y-4">
            {steps.linkedin.map((s) => <StepCard key={s.num} {...s} />)}
          </div>
        </section>

        {/* ── CHECKLIST ── */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-1">Credentials Checklist</h2>
            <p className="text-slate-400 text-sm mb-6">Check each off as you complete it. All 8 = ready to build.</p>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-slate-500 mb-2">
                <span>Progress</span>
                <span>{completedCount} / 8 complete</span>
              </div>
              <div className="bg-slate-800 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${(completedCount / 8) * 100}%`,
                    background: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
                  }}
                />
              </div>
            </div>

            <div className="space-y-3">
              {checklist.map((item, i) => (
                <label key={i} className="flex items-center space-x-3 cursor-pointer group">
                  <div
                    onClick={() => toggleCheck(i)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                      checked[i]
                        ? 'bg-cyan-500/20 border-cyan-500'
                        : 'border-slate-600 group-hover:border-cyan-500'
                    }`}
                  >
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
              <div className="mt-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center">
                <p className="text-emerald-400 font-semibold">🎉 All credentials collected — ready to build the automation system!</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to Build?</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">Once all 8 credentials are checked off, come back and we'll build the full automation engine and review dashboard in one session.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {['📡 RSS Poller', '🤖 Claude AI Drafter', '🖥️ Review Dashboard', '💼 LinkedIn Publisher', '🦋 Bluesky Publisher'].map((label) => (
              <div key={label} className="bg-slate-900 border border-slate-700 hover:border-cyan-500/50 transition-colors text-slate-300 text-sm px-4 py-2.5 rounded-lg font-medium">
                {label}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 py-8 mt-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© 2026 CyberLifeCoach | A Veteran-Owned Business Committed to Your Digital Security</p>
          <a href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors mt-3 md:mt-0">← Back to Site</a>
        </div>
      </footer>
    </div>
  );
}
