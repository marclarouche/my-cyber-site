import React, { useState } from 'react';
import { ArrowLeft, Shield } from 'lucide-react';

// ── PHASE DATA ────────────────────────────────────────────────────────────────
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
            <strong className="text-slate-300">Free plan</strong>. Cloudflare will automatically scan and import all your existing DNS records from NearlyFreeSpeech.
            Review them — they should all look correct. Click <strong className="text-slate-300">Continue</strong>.
          </p>
        ),
      },
    ],
  },
  {
    id: 2,
    title: 'Update Nameservers at Namecheap',
    subtitle: "Point your domain to Cloudflare's DNS",
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
              <div className="text-cyan-400">clarissa.ns.cloudflare.com</div>
              <div className="text-cyan-400">rex.ns.cloudflare.com</div>
            </div>
            <p className="text-slate-400 text-sm mt-3">Copy both from your Cloudflare dashboard.</p>
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
            → <strong className="text-slate-300">Domain List</strong> → click <strong className="text-slate-300">Manage</strong> next to{' '}
            <code className="bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono">cyberlifecoach.pro</code>.
          </p>
        ),
      },
      {
        num: '03',
        title: 'Switch to Custom DNS',
        content: (
          <>
            <p className="text-slate-400 text-sm mb-3">
              Find <strong className="text-slate-300">Nameservers</strong>. Change the dropdown from{' '}
              <strong className="text-slate-300">Namecheap BasicDNS</strong> to <strong className="text-slate-300">Custom DNS</strong>.
              Enter your two Cloudflare nameservers and click the <strong className="text-slate-300">green checkmark</strong> to save.
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
            <div className="bg-slate-950 border border-slate-700 border-l-2 border-l-cyan-500 rounded-r-lg p-4 font-mono text-sm text-cyan-400">
              cyberlifecoach
            </div>
            <p className="text-slate-400 text-sm mt-3">
              This creates{' '}
              <code className="bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono">cyberlifecoach.cloudflareaccess.com</code> — your private auth portal.
            </p>
          </>
        ),
      },
      {
        num: '03',
        title: 'Select the Free plan',
        content: (
          <p className="text-slate-400 text-sm">
            When prompted for a plan, choose <strong className="text-slate-300">Free</strong>. This covers up to 50 users and includes everything you need for personal admin access.
          </p>
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
          <p className="text-slate-400 text-sm">
            Zero Trust dashboard → <strong className="text-slate-300">Access</strong> → <strong className="text-slate-300">Applications</strong> → click <strong className="text-slate-300">Add an application</strong>.
          </p>
        ),
      },
      {
        num: '02',
        title: 'Choose "Self-hosted"',
        content: (
          <p className="text-slate-400 text-sm">
            Select <strong className="text-slate-300">Self-hosted</strong> from the application type options. This is for protecting URLs on your own domain.
          </p>
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
              <div><span className="text-slate-500">Path:              </span><span className="text-cyan-400">clc-ops</span></div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 text-sm text-blue-300 mt-3">
              ℹ️ Setting the path to <code className="bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono">clc-ops</code> protects ALL pages under <code className="bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono">/clc-ops/*</code> automatically — the rest of your site stays fully public.
            </div>
          </>
        ),
      },
      {
        num: '04',
        title: 'Click Next — skip to Policy',
        content: (
          <p className="text-slate-400 text-sm">
            Leave Identity providers as default. Click <strong className="text-slate-300">Next</strong> to move to the Policy configuration page.
          </p>
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
            Scroll to <strong className="text-slate-300">Authentication</strong> and make sure <strong className="text-slate-300">One-time PIN</strong> is enabled.
            Cloudflare emails you a 6-digit code each time you log in — no password stored anywhere. Click{' '}
            <strong className="text-slate-300">Save policy</strong> then <strong className="text-slate-300">Save application</strong>.
          </p>
        ),
      },
    ],
  },
  {
    id: 6,
    title: 'Test & Verify',
    subtitle: 'Confirm the Access wall is working correctly',
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
            <p className="text-slate-400 text-sm mt-3">
              You should be redirected to the Cloudflare Access login. Enter your email → receive a 6-digit code → enter it → you're in.
            </p>
          </>
        ),
      },
      {
        num: '02',
        title: 'Verify the path covers all clc-ops pages',
        content: (
          <>
            <p className="text-slate-400 text-sm mb-3">Test each ops page in incognito to confirm the Access wall appears on all of them:</p>
            <div className="bg-slate-950 border border-slate-700 border-l-2 border-l-cyan-500 rounded-r-lg p-4 font-mono text-sm space-y-1">
              <div className="text-cyan-400">cyberlifecoach.pro/clc-ops/social-setup</div>
              <div className="text-cyan-400">cyberlifecoach.pro/clc-ops/social-automation</div>
              <div className="text-cyan-400">cyberlifecoach.pro/clc-ops/cloudflare-setup</div>
            </div>
          </>
        ),
      },
      {
        num: '03',
        title: 'Rebuild and redeploy',
        content: (
          <>
            <p className="text-slate-400 text-sm mb-3">
              Run your build and upload the new <code className="bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono">/dist</code> to NearlyFreeSpeech as normal:
            </p>
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
  { icon: '🛡️', title: 'DDoS Protection',  desc: "Cloudflare absorbs volumetric attacks at the network edge before they reach NearlyFreeSpeech." },
  { icon: '🔒', title: 'Free SSL / TLS',   desc: 'Automatic HTTPS certificate management — no manual renewals ever again.' },
  { icon: '⚡', title: 'CDN & Caching',    desc: "Static assets served from Cloudflare's global edge network — faster load times worldwide." },
  { icon: '📊', title: 'Analytics',        desc: 'Basic traffic analytics, bot detection, and threat insights — without touching your code.' },
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
        {phase.steps.map(s => <StepCard key={s.num} {...s} />)}
      </div>

      <div className="mt-4">
        <label onClick={onToggle} className="flex items-center space-x-3 cursor-pointer group">
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
            checked ? 'bg-cyan-500/20 border-cyan-500' : 'border-slate-600 group-hover:border-cyan-500'
          }`}>
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

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function CloudflareSetup() {
  const [checked, setChecked] = useState(Array(phases.length).fill(false));

  function toggle(i) {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);
  }

  const completedCount = checked.filter(Boolean).length;
  const allDone = completedCount === phases.length;

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
              <Shield className="w-4 h-4" /> Mission Control — Zero-Trust Access Control
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
              Cloudflare Access<br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Setup Guide</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mb-6">
              Protect any page on your site with enterprise-grade zero-trust authentication — free, no backend required, and no passwords stored anywhere in your code.
            </p>
            <div className="flex flex-wrap gap-3">
              {['100% Free', 'No code changes', 'Password never in your codebase', 'Free DDoS + SSL as a bonus'].map(label => (
                <div key={label} className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-6 mb-12">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-5">How Cloudflare Access Works</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-slate-300 mb-3">Without Cloudflare Access:</p>
                <div className="space-y-2">
                  {[
                    'Request hits NearlyFreeSpeech directly',
                    'React app loads — password check in browser JS',
                    'Password visible in bundled JavaScript',
                  ].map(t => (
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
                    "Request intercepted at Cloudflare's edge",
                    'Email OTP login — no password ever',
                    'Only your verified email can access the page',
                  ].map(t => (
                    <div key={t} className="flex items-center space-x-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-2.5">
                      <span className="text-emerald-400">✅</span>
                      <span className="text-sm text-slate-300">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Overall progress */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-6 mb-10">
            <div className="flex justify-between text-xs text-slate-500 mb-2">
              <span className="font-semibold uppercase tracking-widest">Overall Progress</span>
              <span>{completedCount} / {phases.length} phases complete</span>
            </div>
            <div className="bg-slate-800 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full transition-all duration-500"
                style={{
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
              {bonuses.map(b => (
                <div key={b.title} className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-cyan-500/30 transition-colors duration-300">
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
              <p className="text-slate-400">Your admin pages are now protected by enterprise-grade zero-trust auth. No passwords in your codebase — ever.</p>
            </div>
          )}

          {/* CTA */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-bold mb-3">Access is set up — now build the automation</h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto mb-6">
              With Cloudflare protecting <code className="bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono">/clc-ops/*</code>, head to the Social Automation dashboard to start posting.
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
