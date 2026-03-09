import React, { useState } from 'react';

// ── Data ──────────────────────────────────────────────────

const phases = [
  {
    id: 1,
    title: 'Create a Cloudflare Account',
    subtitle: 'Free tier — no credit card needed',
    time: '~5 min',
    steps: [
      {
        num: '01',
        title: 'Sign up at Cloudflare',
        content: (
          <>
            <p className="text-slate-400 text-sm mb-3">
              Go to{' '}
              <a href="https://dash.cloudflare.com/sign-up" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                dash.cloudflare.com/sign-up
              </a>{' '}
              and create a free account using your{' '}
              <code className="bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono">cyberlifecoach@proton.me</code> address.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 text-sm text-blue-300">
              ℹ️ Use the same email you want for Access authentication — Cloudflare sends your one-time login codes here.
            </div>
          </>
        ),
      },
      {
        num: '02',
        title: 'Add your site',
        content: (
          <p className="text-slate-400 text-sm">
            After signing in, click <strong className="text-slate-300">Add a domain</strong>. Enter{' '}
            <code className="bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono">cyberlifecoach.pro</code> and select the{' '}
            <strong className="text-slate-300">Free plan</strong>. Cloudflare will automatically scan and import all your existing DNS records from NearlyFreeSpeech. Review them — they should all look correct. Click <strong className="text-slate-300">Continue</strong>.
          </p>
        ),
      },
    ],
  },
  {
    id: 2,
    title: 'Update Nameservers at Namecheap',
    subtitle: 'Point your domain to Cloudflare\'s DNS',
    time: '~10 min',
    warning: '⚠️ DNS changes take 5 minutes to 48 hours to propagate globally. Your site stays live the entire time — there is no downtime.',
    steps: [
      {
        num: '01',
        title: 'Get your Cloudflare nameservers',
        content: (
          <>
            <p className="text-slate-400 text-sm mb-3">After adding your site, Cloudflare gives you two custom nameservers. They look like:</p>
            <div className="bg-slate-950 border border-slate-700 border-l-2 border-l-cyan-500 rounded-r-lg p-4 font-mono text-sm space-y-1">
              <div className="text-cyan-400">ava.ns.cloudflare.com</div>
              <div className="text-cyan-400">bob.ns.cloudflare.com</div>
            </div>
            <p className="text-slate-400 text-sm mt-3">Yours will have different names — copy both from your Cloudflare dashboard.</p>
          </>
        ),
      },
      {
        num: '02',
        title: 'Log into Namecheap',
        content: (
          <p className="text-slate-400 text-sm">
            Go to{' '}
            <a href="https://www.namecheap.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              namecheap.com
            </a>{' '}
            → <strong className="text-slate-300">Domain List</strong> → click <strong className="text-slate-300">Manage</strong> next to <code className="bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono">cyberlifecoach.pro</code>.
          </p>
        ),
      },
      {
        num: '03',
        title: 'Switch to Custom DNS',
        content: (
          <>
            <p className="text-slate-400 text-sm mb-3">
              Find <strong className="text-slate-300">Nameservers</strong>. Change the dropdown from <strong className="text-slate-300">Namecheap BasicDNS</strong> to <strong className="text-slate-300">Custom DNS</strong>. Enter your two Cloudflare nameservers and click the <strong className="text-slate-300">green checkmark</strong> to save.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 text-sm text-blue-300">
              ℹ️ Cloudflare will email you when propagation is confirmed and your domain is active. Usually within 30 minutes.
            </div>
          </>
        ),
      },
      {
        num: '04',
        title: 'Verify in Cloudflare dashboard',
        content: (
          <p className="text-slate-400 text-sm">
            Your domain status changes from <span className="text-amber-400 font-semibold">Pending</span> to{' '}
            <span className="text-emerald-400 font-semibold">Active</span> once propagation is complete. You'll also get a confirmation email.
          </p>
        ),
      },
    ],
  },
  {
    id: 3,
    title: 'Enable Cloudflare Zero Trust',
    subtitle: 'This is where Access lives — free for up to 50 users',
    time: '~5 min',
    steps: [
      {
        num: '01',
        title: 'Open Zero Trust dashboard',
        content: (
          <p className="text-slate-400 text-sm">
            In your Cloudflare dashboard, click <strong className="text-slate-300">Zero Trust</strong> in the left sidebar, or go directly to{' '}
            <a href="https://one.dash.cloudflare.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              one.dash.cloudflare.com
            </a>.
          </p>
        ),
      },
      {
        num: '02',
        title: 'Choose your team name',
        content: (
          <>
            <p className="text-slate-400 text-sm mb-3">Cloudflare asks for a "team name" — this becomes part of your Access login URL. Enter:</p>
            <div className="bg-slate-950 border border-slate-700 border-l-2 border-l-cyan-500 rounded-r-lg p-4 font-mono text-sm text-cyan-400">cyberlifecoach</div>
            <p className="text-slate-400 text-sm mt-3">This creates <code className="bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono">cyberlifecoach.cloudflareaccess.com</code> — your private auth portal.</p>
          </>
        ),
      },
      {
        num: '03',
        title: 'Select the Free plan',
        content: (
          <p className="text-slate-400 text-sm">When prompted for a plan, choose <strong className="text-slate-300">Free</strong>. This covers up to 50 users and includes everything you need for personal admin access.</p>
        ),
      },
    ],
  },
  {
    id: 4,
    title: 'Create an Access Application',
    subtitle: 'Define which URL to protect and who can access it',
    time: '~5 min',
    steps: [
      {
        num: '01',
        title: 'Navigate to Access → Applications',
        content: (
          <p className="text-slate-400 text-sm">Zero Trust dashboard → <strong className="text-slate-300">Access</strong> → <strong className="text-slate-300">Applications</strong> → click <strong className="text-slate-300">Add an application</strong>.</p>
        ),
      },
      {
        num: '02',
        title: 'Choose "Self-hosted"',
        content: (
          <p className="text-slate-400 text-sm">Select <strong className="text-slate-300">Self-hosted</strong> from the application type options. This is for protecting URLs on your own domain.</p>
        ),
      },
      {
        num: '03',
        title: 'Configure the application',
        content: (
          <>
            <p className="text-slate-400 text-sm mb-3">Fill in the application settings:</p>
            <div className="bg-slate-950 border border-slate-700 border-l-2 border-l-cyan-500 rounded-r-lg p-4 font-mono text-sm space-y-1.5">
              <div><span className="text-slate-500">Application name: </span><span className="text-cyan-400">CLC Mission Control</span></div>
              <div><span className="text-slate-500">Session duration:  </span><span className="text-cyan-400">24 hours</span></div>
              <div><span className="text-slate-500">Domain:            </span><span className="text-cyan-400">cyberlifecoach.pro</span></div>
              <div><span className="text-slate-500">Path:              </span><span className="text-cyan-400">clc-ops/social-setup</span></div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 text-sm text-blue-300 mt-3">
              ℹ️ The Path field tells Cloudflare to only protect <code className="bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono">/clc-ops/social-setup</code> — the rest of your site stays fully public.
            </div>
          </>
        ),
      },
      {
        num: '04',
        title: 'Click Next — skip to Policy',
        content: (
          <p className="text-slate-400 text-sm">Leave Identity providers as default. Click <strong className="text-slate-300">Next</strong> to move to the Policy configuration page.</p>
        ),
      },
    ],
  },
  {
    id: 5,
    title: 'Create the Access Policy',
    subtitle: 'Allow only your email — everyone else is blocked',
    time: '~3 min',
    steps: [
      {
        num: '01',
        title: 'Create an Allow policy',
        content: (
          <>
            <p className="text-slate-400 text-sm mb-3">Click <strong className="text-slate-300">Add a policy</strong> and fill in:</p>
            <div className="bg-slate-950 border border-slate-700 border-l-2 border-l-cyan-500 rounded-r-lg p-4 font-mono text-sm space-y-1.5">
              <div><span className="text-slate-500">Policy name: </span><span className="text-cyan-400">Owner Only</span></div>
              <div><span className="text-slate-500">Action:      </span><span className="text-cyan-400">Allow</span></div>
            </div>
          </>
        ),
      },
      {
        num: '02',
        title: 'Set the Include rule',
        content: (
          <>
            <p className="text-slate-400 text-sm mb-3">Under <strong className="text-slate-300">Include</strong>, set:</p>
            <div className="bg-slate-950 border border-slate-700 border-l-2 border-l-cyan-500 rounded-r-lg p-4 font-mono text-sm space-y-1.5">
              <div><span className="text-slate-500">Selector: </span><span className="text-cyan-400">Emails</span></div>
              <div><span className="text-slate-500">Value:    </span><span className="text-cyan-400">cyberlifecoach@proton.me</span></div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-sm text-emerald-300 mt-3">
              ✅ Only someone who can receive email at this address can ever authenticate. Everyone else sees a hard block.
            </div>
          </>
        ),
      },
      {
        num: '03',
        title: 'Enable One-Time PIN login',
        content: (
          <p className="text-slate-400 text-sm">
            Scroll to <strong className="text-slate-300">Authentication</strong> and make sure <strong className="text-slate-300">One-time PIN</strong> is enabled. Cloudflare emails you a 6-digit code each time you log in — no password stored anywhere. Click <strong className="text-slate-300">Save policy</strong> then <strong className="text-slate-300">Save application</strong>.
          </p>
        ),
      },
    ],
  },
  {
    id: 6,
    title: 'Test & Clean Up AdminSetup.jsx',
    subtitle: 'Verify it works, then remove the in-app password gate',
    time: '~5 min',
    steps: [
      {
        num: '01',
        title: 'Test in an incognito window',
        content: (
          <>
            <p className="text-slate-400 text-sm mb-3">Open a private browser window and navigate to:</p>
            <div className="bg-slate-950 border border-slate-700 border-l-2 border-l-cyan-500 rounded-r-lg p-4 font-mono text-sm text-cyan-400">
              https://cyberlifecoach.pro/clc-ops/social-setup
            </div>
            <p className="text-slate-400 text-sm mt-3">You should be redirected to the Cloudflare Access login. Enter your email → receive a 6-digit code → enter it → you're in.</p>
          </>
        ),
      },
      {
        num: '02',
        title: 'Remove the password gate from AdminSetup.jsx',
        content: (
          <>
            <p className="text-slate-400 text-sm mb-3">Now that Cloudflare handles auth, the in-app password component is redundant. Remove these three things from <code className="bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono">AdminSetup.jsx</code>:</p>
            <div className="bg-slate-950 border border-slate-700 border-l-2 border-l-cyan-500 rounded-r-lg p-4 font-mono text-sm space-y-2">
              <div className="text-slate-500">// Delete these three lines:</div>
              <div className="text-red-400 line-through">const ADMIN_PASSWORD = '...';</div>
              <div className="text-red-400 line-through">const [unlocked, setUnlocked] = useState(false);</div>
              <div className="text-red-400 line-through">if (!unlocked) return &lt;PasswordGate .../&gt;;</div>
            </div>
            <p className="text-slate-400 text-sm mt-3">The page renders directly — Cloudflare blocks everyone else before React even loads.</p>
          </>
        ),
      },
      {
        num: '03',
        title: 'Rebuild and redeploy',
        content: (
          <>
            <p className="text-slate-400 text-sm mb-3">Run your build and upload the new <code className="bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono">/dist</code> to NearlyFreeSpeech as normal:</p>
            <div className="bg-slate-950 border border-slate-700 border-l-2 border-l-cyan-500 rounded-r-lg p-4 font-mono text-sm space-y-1">
              <div className="text-cyan-400">npm run build</div>
              <div className="text-slate-500"># then upload /dist via SFTP as usual</div>
            </div>
          </>
        ),
      },
    ],
  },
];

const bonuses = [
  { icon: '🛡️', title: 'DDoS Protection', desc: 'Cloudflare absorbs volumetric attacks at the network edge before they reach NearlyFreeSpeech.' },
  { icon: '🔒', title: 'Free SSL / TLS', desc: 'Automatic HTTPS certificate management — no manual renewals ever again.' },
  { icon: '⚡', title: 'CDN & Caching', desc: 'Static assets served from Cloudflare\'s global edge network — faster load times worldwide.' },
  { icon: '📊', title: 'Analytics', desc: 'Basic traffic analytics, bot detection, and threat insights — without touching your code.' },
];

// ── Sub-components ────────────────────────────────────────

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

function PhaseSection({ phase, checked, onToggle }) {
  return (
    <section className="mb-10">
      <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-slate-800">
        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0">
          {phase.id}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold">{phase.title}</h2>
          <p className="text-slate-400 text-sm">{phase.subtitle}</p>
        </div>
        <span className="text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full whitespace-nowrap">
          ⏱ {phase.time}
        </span>
      </div>

      {phase.warning && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-sm text-amber-300 mb-5">
          {phase.warning}
        </div>
      )}

      <div className="space-y-4">
        {phase.steps.map((s) => <StepCard key={s.num} {...s} />)}
      </div>

      <div className="mt-4">
        <label onClick={onToggle} className="flex items-center space-x-3 cursor-pointer group">
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${checked ? 'bg-cyan-500/20 border-cyan-500' : 'border-slate-600 group-hover:border-cyan-500'}`}>
            {checked && (
              <svg className="w-3 h-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className={`text-sm transition-colors duration-200 ${checked ? 'text-cyan-400' : 'text-slate-400'}`}>
            {checked ? `Phase ${phase.id} complete ✅` : `Mark Phase ${phase.id} complete`}
          </span>
        </label>
      </div>
    </section>
  );
}

// ── Main component ────────────────────────────────────────

export default function CloudflareSetup() {
  const [checked, setChecked] = useState(Array(phases.length).fill(false));

  const toggle = (i) => {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);
  };

  const completedCount = checked.filter(Boolean).length;
  const allDone = completedCount === phases.length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 0.7; transform: scale(1.05); }
        }
        .blob  { animation: pulse-glow 4s ease-in-out infinite; }
        .blob2 { animation: pulse-glow 4s ease-in-out infinite; animation-delay: 1s; }
      `}</style>

      {/* Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob  absolute top-20  left-10  w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl opacity-10" />
        <div className="blob2 absolute bottom-40 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-10" />
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
            <span className="text-cyan-400 text-sm font-medium hidden sm:inline">Cloudflare Access Setup</span>
          </div>
          <span className="text-xs font-medium bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 text-cyan-400 px-3 py-1 rounded-full">
            SECURITY UPGRADE
          </span>
        </div>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-14">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Zero-Trust Access Control</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Cloudflare Access<br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Setup Guide</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mb-6">
            Protect any page on your site with enterprise-grade zero-trust authentication — free, no backend required, and no passwords stored anywhere in your code.
          </p>
          <div className="flex flex-wrap gap-3">
            {['100% Free', 'No code changes', 'Password never in your codebase', 'Free DDoS + SSL as a bonus'].map((label) => (
              <div key={label} className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-6 mb-14">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-5">How Cloudflare Access Works</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-slate-300 mb-3">Without Cloudflare Access:</p>
              <div className="space-y-2">
                {[
                  'Request hits NearlyFreeSpeech directly',
                  'React app loads — password check in browser JS',
                  'Password visible in bundled JavaScript',
                ].map((t) => (
                  <div key={t} className="flex items-center space-x-3 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
                    <span className="text-red-400">⚠️</span>
                    <span className="text-sm text-slate-300">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-300 mb-3">With Cloudflare Access:</p>
              <div className="space-y-2">
                {[
                  'Request intercepted at Cloudflare\'s edge',
                  'Email OTP login — no password ever',
                  'Only your verified email can access the page',
                ].map((t) => (
                  <div key={t} className="flex items-center space-x-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-2.5">
                    <span className="text-emerald-400">✅</span>
                    <span className="text-sm text-slate-300">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-10">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-widest">Overall Progress</span>
            <span>{completedCount} / {phases.length} phases complete</span>
          </div>
          <div className="bg-slate-800 rounded-full" style={{ height: '6px' }}>
            <div
              className="rounded-full transition-all duration-500"
              style={{
                height: '6px',
                width: `${(completedCount / phases.length) * 100}%`,
                background: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
              }}
            />
          </div>
        </div>

        {/* Phases */}
        {phases.map((phase, i) => (
          <PhaseSection
            key={phase.id}
            phase={phase}
            checked={checked[i]}
            onToggle={() => toggle(i)}
          />
        ))}

        {/* Bonus benefits */}
        <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-8 mb-10">
          <h2 className="text-xl font-bold mb-2">🎁 Bonus Benefits from Moving to Cloudflare DNS</h2>
          <p className="text-slate-400 text-sm mb-6">You came for Access — you're also getting all of this for free:</p>
          <div className="grid md:grid-cols-2 gap-4">
            {bonuses.map((b) => (
              <div key={b.title} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <p className="text-cyan-400 font-semibold text-sm mb-1">{b.icon} {b.title}</p>
                <p className="text-slate-400 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* All done */}
        {allDone && (
          <div className="mb-10 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-3">🎉</div>
            <h2 className="text-2xl font-bold text-emerald-400 mb-2">Cloudflare Access is live!</h2>
            <p className="text-slate-400">Your admin page is now protected by enterprise-grade zero-trust auth. No passwords in your codebase — ever.</p>
          </div>
        )}

        {/* Article CTA */}
        <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-2xl p-10 text-center">
          <p className="text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-3">Substack Article</p>
          <h2 className="text-2xl font-bold mb-3">
            How I Locked Down My Admin Page<br />with Zero-Trust Auth — For Free
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mb-6">
            This setup makes great content for your audience — solo operators and small business owners who want enterprise-level security without enterprise budgets.
          </p>
          <div className="flex flex-wrap gap-3 justify-center text-xs">
            {['Zero Trust explained simply', 'Why passwords in code are risky', 'Free Cloudflare Access walkthrough', 'Bonus: DDoS + CDN for free'].map((t) => (
              <div key={t} className="bg-slate-900 border border-slate-700 text-slate-300 px-4 py-2 rounded-lg">{t}</div>
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
