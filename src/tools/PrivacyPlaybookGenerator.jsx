import React, { useState } from 'react';
import { ArrowLeft, Shield, Download, RefreshCw, ChevronRight, Printer, BookOpen, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

// ── QUESTIONS ─────────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 'concern',
    question: "What's your biggest privacy concern right now?",
    sub: 'Pick the one that keeps you up at night.',
    type: 'single',
    options: [
      { value: 'tracking',  label: '🕵️  Being tracked online by advertisers & apps' },
      { value: 'brokers',   label: '📋  Data brokers selling my personal info' },
      { value: 'accounts',  label: '🔐  My accounts getting hacked or breached' },
      { value: 'device',    label: '📱  My devices leaking data without my knowledge' },
      { value: 'cloud',     label: '☁️   My files & photos exposed in cloud storage' },
      { value: 'identity',  label: '🪪  Identity theft & impersonation' },
    ],
  },
  {
    id: 'devices',
    question: 'Which devices do you regularly use?',
    sub: 'Select all that apply.',
    type: 'multi',
    options: [
      { value: 'windows',    label: '🖥️  Windows PC' },
      { value: 'mac',        label: '🍎  Mac' },
      { value: 'iphone',     label: '📱  iPhone / iPad' },
      { value: 'android',    label: '🤖  Android' },
      { value: 'linux',      label: '🐧  Linux' },
      { value: 'chromebook', label: '💻  Chromebook' },
    ],
  },
  {
    id: 'browser',
    question: 'What browser do you use most?',
    sub: 'Your browser is the front door to your digital life.',
    type: 'single',
    options: [
      { value: 'chrome',  label: 'Google Chrome' },
      { value: 'firefox', label: 'Firefox' },
      { value: 'safari',  label: 'Safari' },
      { value: 'edge',    label: 'Microsoft Edge' },
      { value: 'brave',   label: 'Brave' },
      { value: 'other',   label: 'Other / I use multiple' },
    ],
  },
  {
    id: 'vpn',
    question: 'Do you currently use a VPN?',
    sub: 'A VPN shifts trust from your ISP to your VPN provider — choosing the right one matters.',
    type: 'single',
    options: [
      { value: 'yes_paid',         label: '✅  Yes — I pay for a reputable VPN' },
      { value: 'yes_free',         label: '⚠️  Yes — I use a free VPN' },
      { value: 'no_interested',    label: "❌  No — but I'm interested" },
      { value: 'no_notinterested', label: "❌  No — and I'm not sure I need one" },
    ],
  },
  {
    id: 'password',
    question: 'How do you manage your passwords?',
    sub: 'Password reuse is one of the top causes of account compromise.',
    type: 'single',
    options: [
      { value: 'manager', label: '✅  I use a dedicated password manager (Bitwarden, 1Password, etc.)' },
      { value: 'browser', label: "⚠️  I use my browser's built-in password saver" },
      { value: 'memory',  label: '⚠️  I memorize them (often reusing passwords)' },
      { value: 'notes',   label: '⚠️  I write them down or use a notes app' },
      { value: 'nothing', label: "❌  I don't have a system" },
    ],
  },
  {
    id: 'mfa',
    question: 'What type of two-factor authentication do you use?',
    sub: 'Not all 2FA is created equal — hardware keys beat SMS every time.',
    type: 'single',
    options: [
      { value: 'hardware', label: '🏆  Hardware key (YubiKey, etc.) or passkeys' },
      { value: 'app',      label: '✅  Authenticator app (Authy, Google Authenticator)' },
      { value: 'sms',      label: '⚠️  SMS / text message codes' },
      { value: 'email2fa', label: '⚠️  Email codes only' },
      { value: 'none',     label: "❌  I don't use 2FA" },
    ],
  },
  {
    id: 'cloud',
    question: 'Where do you store your files and photos?',
    sub: 'Cloud convenience comes with a privacy tradeoff — unless you encrypt first.',
    type: 'multi',
    options: [
      { value: 'google',     label: 'Google Drive / Google Photos' },
      { value: 'icloud',     label: 'Apple iCloud' },
      { value: 'onedrive',   label: 'Microsoft OneDrive' },
      { value: 'dropbox',    label: 'Dropbox' },
      { value: 'selfhosted', label: 'Self-hosted (Nextcloud, etc.)' },
      { value: 'local',      label: 'Local only — no cloud' },
    ],
  },
  {
    id: 'brokers',
    question: 'Have you ever checked what data brokers know about you?',
    sub: 'Data brokers compile and sell detailed profiles on nearly every adult in the US.',
    type: 'single',
    options: [
      { value: 'yes_removed', label: "✅  Yes — and I've requested removal" },
      { value: 'yes_shocked', label: '😮  Yes — and I was alarmed by what I found' },
      { value: 'no_curious',  label: '❌  No — but I want to' },
      { value: 'no_unaware',  label: "❌  No — I didn't know this was a thing" },
    ],
  },
  {
    id: 'social',
    question: 'How much personal info do you share on social media?',
    sub: 'Social profiles are a goldmine for social engineering attacks.',
    type: 'single',
    options: [
      { value: 'minimal',  label: '🔒  Minimal — I keep profiles private and sparse' },
      { value: 'moderate', label: '⚖️   Moderate — some public, some private' },
      { value: 'open',     label: '📢  Open — most things are public' },
      { value: 'none',     label: "🚫  I don't use social media" },
    ],
  },
  {
    id: 'email',
    question: 'What email provider do you use for sensitive accounts?',
    sub: 'Your email is the master key to your digital identity.',
    type: 'single',
    options: [
      { value: 'private',  label: '🔒  Privacy-focused (ProtonMail, Tutanota, Fastmail)' },
      { value: 'gmail',    label: 'Gmail' },
      { value: 'outlook',  label: 'Outlook / Hotmail' },
      { value: 'yahoo',    label: 'Yahoo Mail' },
      { value: 'icloudmail', label: 'iCloud Mail' },
      { value: 'work',     label: 'Work / ISP email for everything' },
    ],
  },
  {
    id: 'network',
    question: 'How do you handle public Wi-Fi?',
    sub: 'Public networks are prime hunting grounds for credential theft.',
    type: 'single',
    options: [
      { value: 'vpn_always', label: '✅  I always use a VPN on public Wi-Fi' },
      { value: 'avoid',      label: '✅  I avoid public Wi-Fi entirely' },
      { value: 'sensitive',  label: '⚠️  I avoid sensitive tasks but browse normally' },
      { value: 'normal',     label: '❌  I use it like my home network' },
    ],
  },
  {
    id: 'comfort',
    question: 'How comfortable are you with technical privacy tools?',
    sub: "We'll calibrate your playbook to your skill level.",
    type: 'single',
    options: [
      { value: 'beginner',     label: '🌱  Beginner — I want simple, one-click solutions' },
      { value: 'intermediate', label: '⚙️   Intermediate — I can follow step-by-step guides' },
      { value: 'advanced',     label: "🔧  Advanced — I'm comfortable with technical configs" },
      { value: 'expert',       label: '🏗️  Expert — I self-host and build my own setup' },
    ],
  },
  {
    id: 'timeline',
    question: 'How much time can you dedicate to improving your privacy?',
    sub: "Honest answer helps us build a realistic plan you'll actually follow.",
    type: 'single',
    options: [
      { value: 'minimal',   label: '⏱️  15–30 min/week — highest impact moves only' },
      { value: 'moderate',  label: "🕐  1–2 hours/week — I'm motivated to make real changes" },
      { value: 'dedicated', label: '🕓  3+ hours/week — I want a comprehensive overhaul' },
    ],
  },
];

// ── PLAYBOOK GENERATOR ────────────────────────────────────────────────────────
function generatePlaybook(answers) {
  const weeks = [[], [], [], []];

  // Week 1 — Browser & Tracking
  const browserNeedsUpgrade = ['chrome', 'edge', 'safari', 'other'].includes(answers.browser);
  if (browserNeedsUpgrade) {
    weeks[0].push({
      priority: 'high',
      title: 'Switch to a privacy-respecting browser',
      why: 'Your current browser sends significant tracking data. Brave or Firefox with uBlock Origin cuts most ad-tech tracking instantly.',
      tools: answers.comfort === 'beginner' ? ['Brave (easiest — privacy built in)'] : ['Brave', 'Firefox + uBlock Origin + Privacy Badger'],
      time: '30 min',
    });
  }
  if (answers.browser !== 'brave') {
    weeks[0].push({
      priority: 'high',
      title: 'Install uBlock Origin & enable strict tracking protection',
      why: "A single well-maintained content blocker removes most trackers. Don't install multiple — it makes your browser fingerprint unique.",
      tools: ['uBlock Origin (free, open source)'],
      time: '10 min',
    });
  }
  if (answers.social === 'open') {
    weeks[0].push({
      priority: 'medium',
      title: 'Audit your social media privacy settings',
      why: 'Public profiles expose information used in social engineering, targeted scams, and data broker profiles.',
      tools: ["Each platform's privacy settings menu", "EFF's social media privacy guide (eff.org)"],
      time: '45 min',
    });
  }
  if (answers.email !== 'private') {
    const providerName = answers.email === 'gmail' ? 'Gmail' : answers.email === 'outlook' ? 'Outlook' : 'Your current provider';
    weeks[0].push({
      priority: 'medium',
      title: 'Create a privacy-focused email for sensitive accounts',
      why: `${providerName} scans content for advertising and complies with broad legal requests. A ProtonMail account for financial and identity services keeps your most sensitive communications private.`,
      tools: ['ProtonMail (free tier available)', 'Tutanota (open source alternative)'],
      time: '20 min',
    });
  }
  if (answers.network === 'normal') {
    weeks[0].push({
      priority: 'high',
      title: 'Stop using public Wi-Fi without protection',
      why: 'Public networks allow anyone on the same network to intercept unencrypted traffic. Your credentials, sessions, and browsing are all at risk.',
      tools: answers.comfort === 'beginner' ? ['Use mobile data instead of public Wi-Fi'] : ['Enable VPN before connecting', 'Use HTTPS-only mode in browser'],
      time: '15 min',
    });
  }
  if (weeks[0].length === 0) {
    weeks[0].push({
      priority: 'medium',
      title: 'Review and harden advanced browser privacy settings',
      why: "Even with a good setup, a few tweaks can reduce fingerprinting and block hidden trackers that bypass ad blockers.",
      tools: ['Firefox: about:config → privacy.resistFingerprinting', 'Brave: Settings → Shields → Aggressive blocking'],
      time: '20 min',
    });
  }

  // Week 2 — Account Security
  if (answers.password !== 'manager') {
    const why = answers.password === 'memory'
      ? 'Memorized passwords are almost always reused — one breach compromises everything.'
      : answers.password === 'browser'
      ? "Browser password managers don't protect you if your browser account is compromised."
      : "Without a dedicated password manager, you're likely reusing passwords across accounts.";
    weeks[1].push({
      priority: 'critical',
      title: 'Set up a password manager',
      why: `${why} A password manager generates and stores unique strong passwords for every site.`,
      tools: ['Bitwarden (free, open source, highly recommended)', '1Password (best UX, paid)'],
      time: '1–2 hours',
    });
  }
  if (['none', 'sms', 'email2fa'].includes(answers.mfa)) {
    weeks[1].push({
      priority: 'critical',
      title: answers.mfa === 'none' ? 'Enable two-factor authentication on all critical accounts' : 'Upgrade from SMS/email 2FA to an authenticator app',
      why: answers.mfa === 'none'
        ? 'Without 2FA, a stolen password is all an attacker needs. Enable it on email, banking, and social media first.'
        : 'SMS codes can be intercepted via SIM swapping. An authenticator app generates codes locally — no interception possible.',
      tools: answers.comfort === 'beginner' ? ['Authy (beginner-friendly, syncs across devices)'] : ['Aegis (Android, open source)', 'Raivo OTP (iOS, open source)', 'Authy'],
      time: '1 hour',
    });
  }
  if (answers.mfa === 'app' && answers.comfort !== 'beginner') {
    weeks[1].push({
      priority: 'medium',
      title: 'Add a hardware security key for your most critical accounts',
      why: "Hardware keys are phishing-resistant — even if you click a fake login page, the key won't authenticate because the domain doesn't match.",
      tools: ['YubiKey 5 Series ($50–70)', 'Google Titan Key ($30)'],
      time: '45 min',
    });
  }
  weeks[1].push({
    priority: 'medium',
    title: 'Audit and revoke unused app permissions',
    why: "Apps you haven't used in months may still have access to your location, contacts, camera, and microphone.",
    tools: (answers.devices || []).includes('iphone')
      ? ['iOS: Settings → Privacy & Security → review each category']
      : (answers.devices || []).includes('android')
      ? ['Android: Settings → Apps → Permissions → review each category']
      : ["Check each device's app permission settings"],
    time: '30 min',
  });

  // Week 3 — Data Brokers & Footprint
  if (answers.brokers !== 'yes_removed') {
    weeks[2].push({
      priority: 'high',
      title: 'Check what data brokers have on you',
      why: 'Data brokers compile addresses, phone numbers, relatives, financial info, and more — then sell it to anyone. This data fuels targeted scams and identity theft.',
      tools: ["Google yourself first — see what's indexed", 'Search your name on Spokeo, Whitepages, BeenVerified', 'Use DeleteMe or Privacy Bee for automated removal ($)'],
      time: '1 hour',
    });
  }
  weeks[2].push({
    priority: 'medium',
    title: 'Start requesting data broker opt-outs',
    why: 'Manual opt-outs are free but time-consuming. Even removing your data from 10 major brokers significantly reduces your attack surface.',
    tools: answers.comfort === 'beginner'
      ? ['DeleteMe (automated, ~$129/year)', 'Privacy Bee (automated)']
      : ['JustDeleteMe directory (free manual opt-outs)', 'OptOutPrescreen.com (credit bureau opt-out)', 'DMAchoice.org (mail opt-out)'],
    time: '1–2 hours',
  });
  if (answers.concern === 'identity') {
    weeks[2].push({
      priority: 'high',
      title: 'Freeze your credit at all three bureaus',
      why: "A credit freeze prevents new accounts from being opened in your name — even if an attacker has your SSN. It's free and reversible.",
      tools: ['Equifax.com/freeze', 'Experian.com/freeze', 'TransUnion.com/freeze'],
      time: '30 min',
    });
  }
  weeks[2].push({
    priority: 'medium',
    title: 'Review and close unused online accounts',
    why: 'Every dormant account is a potential breach waiting to happen. Fewer accounts means fewer ways to get compromised.',
    tools: ['JustDeleteMe.xyz — direct deletion links', 'Have I Been Pwned — see which accounts are already breached'],
    time: '1 hour',
  });

  // Week 4 — Cloud, Device & Advanced
  const usesUntrustedCloud = (answers.cloud || []).some(c => ['google', 'onedrive', 'dropbox'].includes(c));
  if (usesUntrustedCloud) {
    weeks[3].push({
      priority: 'high',
      title: 'Encrypt sensitive files before uploading to cloud',
      why: 'Google, Microsoft, and Dropbox can access your files and respond to legal requests. Encrypting before upload means only you can read them.',
      tools: answers.comfort === 'beginner'
        ? ['Cryptomator (free, simple — works with any cloud folder)']
        : ['Cryptomator (file-by-file encryption)', 'VeraCrypt (full volume encryption)'],
      time: '1 hour',
    });
  }
  if (['no_interested', 'no_notinterested'].includes(answers.vpn) || answers.vpn === 'yes_free') {
    weeks[3].push({
      priority: answers.vpn === 'yes_free' ? 'critical' : 'medium',
      title: answers.vpn === 'yes_free' ? 'Replace your free VPN with a trustworthy paid one' : 'Set up a reputable VPN',
      why: answers.vpn === 'yes_free'
        ? 'Free VPNs monetize by logging and selling your browsing data — the opposite of privacy. You are the product.'
        : 'A VPN encrypts your traffic on hostile networks and reduces ISP-level tracking. Choose one with independent audits and a verified no-log policy.',
      tools: ['Mullvad (most private, accepts cash/crypto)', 'ProtonVPN (free tier available, audited)', 'IVPN (privacy-focused, independently audited)'],
      time: '30 min',
    });
  }
  if (['advanced', 'expert'].includes(answers.comfort)) {
    weeks[3].push({
      priority: 'medium',
      title: 'Set up encrypted DNS (DNS over HTTPS/TLS)',
      why: "Without encrypted DNS, your ISP sees every domain you query — even when using a VPN. Encrypted DNS closes this surveillance gap.",
      tools: ['NextDNS (cloud-based, free tier, granular controls)', 'Cloudflare 1.1.1.1 (fast, simple)', 'Configure on your router for whole-home coverage'],
      time: '30 min',
    });
  }
  if (answers.comfort === 'expert') {
    weeks[3].push({
      priority: 'low',
      title: 'Evaluate self-hosting for sensitive data',
      why: 'Self-hosting eliminates third-party access to your files, photos, and notes entirely — no terms of service, no law enforcement requests.',
      tools: ['Nextcloud (files, calendar, contacts)', 'Immich (open source Google Photos alternative)', 'Vaultwarden (self-hosted Bitwarden)'],
      time: 'Weekend project',
    });
  }
  weeks[3].push({
    priority: 'medium',
    title: 'Set up breach monitoring alerts',
    why: "You can't respond to a breach you don't know about. Automated monitoring alerts you the moment your credentials appear in a new leak.",
    tools: [
      'Have I Been Pwned — free email breach alerts',
      'Firefox Monitor',
      ...(answers.password === 'manager' ? ['Most password managers include built-in breach monitoring'] : []),
    ],
    time: '15 min',
  });

  // Score calculation
  let score = 100;
  if (browserNeedsUpgrade) score -= 10;
  if (answers.password !== 'manager') score -= 20;
  if (answers.mfa === 'none') score -= 20;
  if (['sms', 'email2fa'].includes(answers.mfa)) score -= 10;
  if (answers.vpn === 'yes_free') score -= 15;
  if (['no_interested', 'no_notinterested'].includes(answers.vpn)) score -= 10;
  if (answers.brokers === 'no_unaware') score -= 15;
  if (answers.social === 'open') score -= 10;
  if (answers.email !== 'private') score -= 5;
  if (answers.network === 'normal') score -= 10;
  if (usesUntrustedCloud) score -= 5;

  return {
    weeks,
    score: Math.max(score, 5),
    totalTasks: weeks.flat().length,
  };
}

// ── PRIORITY CONFIG ───────────────────────────────────────────────────────────
const PRIORITY = {
  critical: {
    bg: 'bg-red-900/20',
    border: 'border border-red-500/40',
    badge: 'bg-red-500/10 text-red-400 border border-red-500/30',
    dot: 'bg-red-400',
    label: 'CRITICAL',
  },
  high: {
    bg: 'bg-amber-900/10',
    border: 'border border-amber-500/30',
    badge: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
    dot: 'bg-amber-400',
    label: 'HIGH',
  },
  medium: {
    bg: 'bg-slate-900',
    border: 'border border-slate-700',
    badge: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30',
    dot: 'bg-cyan-400',
    label: 'MEDIUM',
  },
  low: {
    bg: 'bg-slate-900/50',
    border: 'border border-slate-800',
    badge: 'bg-slate-700 text-slate-400 border border-slate-600',
    dot: 'bg-slate-500',
    label: 'LOW',
  },
};

const WEEKS = [
  { label: 'Week 1', theme: 'Browser & Tracking',       icon: '🌐', grad: 'from-cyan-500 to-blue-600' },
  { label: 'Week 2', theme: 'Account Security',          icon: '🔐', grad: 'from-blue-500 to-violet-600' },
  { label: 'Week 3', theme: 'Data Brokers & Footprint',  icon: '🗑️', grad: 'from-violet-500 to-purple-600' },
  { label: 'Week 4', theme: 'Cloud, Device & Advanced',  icon: '☁️', grad: 'from-purple-500 to-pink-600' },
];

// ── SCORE RING ────────────────────────────────────────────────────────────────
function ScoreRing({ score }) {
  const ringColor  = score >= 70 ? '#34d399' : score >= 40 ? '#fbbf24' : '#f87171';
  const textColor  = score >= 70 ? 'text-emerald-400' : score >= 40 ? 'text-amber-400' : 'text-red-400';
  const scoreLabel = score >= 70 ? 'Good Foundation'   : score >= 40 ? 'Needs Attention' : 'High Risk';
  const r = 52, circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={r} fill="none" stroke="#1e293b" strokeWidth="10" />
          <circle cx="60" cy="60" r={r} fill="none" stroke={ringColor} strokeWidth="10"
            strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1.2s ease' }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-black ${textColor}`}>{score}</span>
          <span className="text-slate-500 text-xs">/100</span>
        </div>
      </div>
      <span className={`text-sm font-bold mt-2 ${textColor}`}>{scoreLabel}</span>
    </div>
  );
}

// ── TASK CARD ─────────────────────────────────────────────────────────────────
function TaskCard({ task }) {
  const p = PRIORITY[task.priority];
  return (
    <div className={`${p.bg} ${p.border} rounded-xl p-5 mb-3 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/5`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-start gap-2">
          <span className={`w-2 h-2 rounded-full ${p.dot} mt-1.5 flex-shrink-0`} />
          <h4 className="font-bold text-white text-sm leading-snug">{task.title}</h4>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${p.badge}`}>{p.label}</span>
          <span className="text-xs text-slate-500 whitespace-nowrap flex items-center gap-1">
            <Clock className="w-3 h-3" />{task.time}
          </span>
        </div>
      </div>
      <p className="text-slate-400 text-xs mb-3 leading-relaxed ml-4">{task.why}</p>
      <div className="flex flex-wrap gap-2 ml-4">
        {task.tools.map((t, i) => (
          <span key={i} className="bg-slate-800 border border-slate-700 text-slate-300 text-xs px-3 py-1 rounded-lg">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── PDF EXPORT ────────────────────────────────────────────────────────────────
function exportPDF(answers, playbook) {
  const { weeks, score } = playbook;
  const scoreLabel = score >= 70 ? 'Good Foundation' : score >= 40 ? 'Needs Attention' : 'High Risk';
  const scoreColor = score >= 70 ? '#059669' : score >= 40 ? '#d97706' : '#dc2626';
  const weekIcons  = ['🌐', '🔐', '🗑️', '☁️'];
  const pc = {
    critical: { bg: '#fff1f2', border: '#ef4444', badge: '#fee2e2', badgeText: '#dc2626' },
    high:     { bg: '#fffbeb', border: '#f59e0b', badge: '#fef3c7', badgeText: '#d97706' },
    medium:   { bg: '#ecfeff', border: '#06b6d4', badge: '#cffafe', badgeText: '#0891b2' },
    low:      { bg: '#f8fafc', border: '#94a3b8', badge: '#f1f5f9', badgeText: '#64748b' },
  };

  let html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>My Personal Privacy Playbook — CyberLifeCoach.pro</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Inter',sans-serif;background:#fff;color:#1e293b;padding:40px;max-width:820px;margin:0 auto}
  .header{border-bottom:3px solid #06b6d4;padding-bottom:20px;margin-bottom:28px}
  .header h1{font-size:26px;font-weight:900;color:#0e7490}
  .header p{color:#64748b;font-size:12px;margin-top:4px}
  .score-row{display:flex;align-items:center;gap:20px;background:#f0fafa;border:1px solid #a5f3fc;border-radius:12px;padding:16px 20px;margin-bottom:28px}
  .score-num{font-size:46px;font-weight:900;color:${scoreColor};line-height:1}
  .score-sub{font-size:11px;color:#94a3b8}
  .score-label{font-size:14px;font-weight:700;color:${scoreColor}}
  .score-desc{font-size:12px;color:#64748b;margin-top:3px}
  .stat-chips{display:flex;gap:10px;margin-top:8px}
  .stat-chip{background:#f1f5f9;border:1px solid #e2e8f0;border-radius:8px;padding:6px 12px;text-align:center}
  .stat-num{font-size:20px;font-weight:900;color:#0e7490}
  .stat-lbl{font-size:10px;color:#64748b}
  .week{margin-bottom:28px}
  .week-hdr{display:flex;align-items:center;gap:8px;padding-bottom:8px;border-bottom:2px solid #e2e8f0;margin-bottom:10px}
  .week-badge{background:#0e7490;color:#fff;font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px}
  .week-title{font-size:15px;font-weight:700}
  .task{border-radius:10px;padding:12px 14px;margin-bottom:8px;border-left:4px solid #ccc}
  .task-hdr{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:5px}
  .task-title{font-size:13px;font-weight:700;flex:1}
  .p-badge{font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;margin-left:8px;white-space:nowrap}
  .time-lbl{font-size:10px;color:#94a3b8;margin-left:8px;white-space:nowrap}
  .task-why{font-size:11px;color:#64748b;margin-bottom:7px;line-height:1.5}
  .tools{display:flex;flex-wrap:wrap;gap:5px}
  .tool{background:#f1f5f9;border:1px solid #e2e8f0;color:#475569;font-size:10px;padding:3px 8px;border-radius:6px}
  .footer{margin-top:36px;padding-top:14px;border-top:1px solid #e2e8f0;font-size:11px;color:#94a3b8;text-align:center}
  @media print{body{padding:20px}}
</style></head><body>
<div class="header">
  <h1>🔐 My Personal Privacy Playbook</h1>
  <p>Generated by CyberLifeCoach.pro &nbsp;•&nbsp; ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
</div>
<div class="score-row">
  <div><div class="score-num">${score}</div><div class="score-sub">/100</div></div>
  <div style="flex:1">
    <div class="score-label">${scoreLabel}</div>
    <div class="score-desc">Privacy baseline score based on your current setup</div>
    <div class="stat-chips">
      <div class="stat-chip"><div class="stat-num">${weeks.flat().length}</div><div class="stat-lbl">Action items</div></div>
      <div class="stat-chip"><div class="stat-num">4</div><div class="stat-lbl">Weeks</div></div>
      <div class="stat-chip"><div class="stat-num">100%</div><div class="stat-lbl">Free tools</div></div>
    </div>
  </div>
</div>`;

  weeks.forEach((tasks, wi) => {
    if (!tasks.length) return;
    html += `<div class="week"><div class="week-hdr"><span class="week-badge">${weekIcons[wi]} ${WEEKS[wi].label}</span><span class="week-title" style="margin-left:4px">${WEEKS[wi].theme}</span><span style="font-size:11px;color:#94a3b8;margin-left:auto">${tasks.length} tasks</span></div>`;
    tasks.forEach(t => {
      const col = pc[t.priority];
      html += `<div class="task" style="background:${col.bg};border-left-color:${col.border}">
<div class="task-hdr"><span class="task-title">${t.title}</span><span class="p-badge" style="background:${col.badge};color:${col.badgeText}">${t.priority.toUpperCase()}</span><span class="time-lbl">⏱ ${t.time}</span></div>
<div class="task-why">${t.why}</div>
<div class="tools">${t.tools.map(tool => `<span class="tool">${tool}</span>`).join('')}</div></div>`;
    });
    html += `</div>`;
  });

  html += `<div class="footer">
<p>Generated by CyberLifeCoach.pro — All analysis runs locally in your browser. No data is stored or transmitted.</p>
<p style="margin-top:4px">© ${new Date().getFullYear()} CyberLifeCoach | A Veteran-Owned Business Committed to Your Digital Security</p>
</div></body></html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = 'my-privacy-playbook.html';
  a.click();
  URL.revokeObjectURL(url);
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function PrivacyPlaybookGenerator() {
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState({});
  const [playbook, setPlaybook] = useState(null);

  const total    = QUESTIONS.length;
  const isIntro  = step === 0;
  const isResult = step > total;
  const currentQ = QUESTIONS[step - 1];
  const progress = step === 0 ? 0 : Math.round((step / total) * 100);

  function pickSingle(id, val) { setAnswers(p => ({ ...p, [id]: val })); }
  function pickMulti(id, val) {
    setAnswers(p => {
      const cur = p[id] || [];
      return { ...p, [id]: cur.includes(val) ? cur.filter(v => v !== val) : [...cur, val] };
    });
  }

  function canAdvance() {
    if (isIntro) return true;
    if (!currentQ) return false;
    if (currentQ.type === 'single') return !!answers[currentQ.id];
    return (answers[currentQ.id] || []).length > 0;
  }

  function advance() {
    if (step === total) {
      setPlaybook(generatePlaybook(answers));
      setStep(step + 1);
    } else {
      setStep(s => s + 1);
    }
  }

  function restart() { setStep(0); setAnswers({}); setPlaybook(null); }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">

      {/* ── NAV (matches site pattern) ── */}
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

      {/* ── MAIN CONTENT ── */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">

          {/* ══ INTRO ══ */}
          {isIntro && (
            <div>
              {/* Hero */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
                  <Shield className="w-4 h-4" /> Free Tool — No Account Required
                </div>
                <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                  Your Personal<br />
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Privacy Playbook
                  </span>
                </h1>
                <p className="text-xl text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed">
                  Answer 13 questions about your current setup. Get a personalized, prioritized 4-week action plan built specifically for you.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                  {['✅ 100% free', '🔒 Runs in your browser', '📋 13 questions', '📄 Downloadable report'].map(t => (
                    <span key={t} className="bg-slate-900 border border-slate-700 text-slate-300 text-sm px-4 py-2 rounded-lg">{t}</span>
                  ))}
                </div>
                <button
                  onClick={advance}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg px-12 py-4 rounded-xl hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                >
                  Build My Playbook <ChevronRight className="w-5 h-5" />
                </button>
                <p className="text-slate-600 text-xs mt-4">No data leaves your browser. Ever.</p>
              </div>

              {/* Feature cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  { icon: '📋', title: '13 Tailored Questions', desc: 'Covers your devices, accounts, browsing habits, and comfort level.' },
                  { icon: '🧠', title: 'Personalized Analysis', desc: 'Every recommendation adapts to your specific answers and skill level.' },
                  { icon: '📄', title: 'Downloadable Report', desc: 'Save your 4-week plan as an HTML file — print or open any time.' },
                ].map(item => (
                  <div key={item.title} className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-6 text-center hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className="font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Privacy notice */}
              <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-xl p-6 flex items-start space-x-4">
                <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-cyan-400 mb-1">Privacy First</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    This tool runs entirely in your browser. Your answers are never stored, sent to a server, or shared with anyone. All analysis happens locally on your device.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ══ QUESTIONS ══ */}
          {!isIntro && !isResult && currentQ && (
            <div key={step}>
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-cyan-400 font-semibold uppercase tracking-widest">
                    Question {step} of {total}
                  </span>
                  <span className="text-xs text-slate-500">{progress}% complete</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Question card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{currentQ.question}</h2>
                <p className="text-slate-400 mb-8">{currentQ.sub}</p>

                <div className="space-y-3">
                  {currentQ.options.map(opt => {
                    const isMulti = currentQ.type === 'multi';
                    const selected = isMulti
                      ? (answers[currentQ.id] || []).includes(opt.value)
                      : answers[currentQ.id] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => isMulti ? pickMulti(currentQ.id, opt.value) : pickSingle(currentQ.id, opt.value)}
                        className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all duration-200 ${
                          selected
                            ? 'border-cyan-500 bg-cyan-500/10 text-white shadow-lg shadow-cyan-500/10'
                            : 'border-slate-700 bg-slate-900/50 text-slate-300 hover:border-slate-500 hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                            selected ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'
                          }`}>
                            {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                          {opt.label}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {currentQ.type === 'multi' && (
                  <p className="text-slate-600 text-xs mt-4">Select all that apply</p>
                )}
              </div>

              {/* Nav */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setStep(s => s - 1)}
                  className="flex items-center space-x-2 text-slate-500 hover:text-slate-300 transition-colors text-sm px-4 py-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={advance}
                  disabled={!canAdvance()}
                  className={`flex items-center gap-2 font-bold px-8 py-3 rounded-xl transition-all duration-300 ${
                    canAdvance()
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105'
                      : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  {step === total ? (
                    <><Shield className="w-4 h-4" /> Generate My Playbook</>
                  ) : (
                    <>Next <ChevronRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ══ RESULTS ══ */}
          {isResult && playbook && (
            <div>
              {/* Header */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">
                  <CheckCircle className="w-4 h-4" /> Your Playbook is Ready
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-2">Your Privacy Playbook</h2>
                <p className="text-slate-400">Personalized from your answers — prioritized for maximum impact.</p>
              </div>

              {/* Score card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center gap-8">
                <ScoreRing score={playbook.score} />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-white mb-1">Privacy Baseline Score</h3>
                  <p className="text-slate-400 text-sm mb-5">
                    Based on your current setup. Your playbook is designed to improve this score over 4 weeks.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    {[
                      { val: playbook.totalTasks, label: 'Action items', color: 'text-cyan-400' },
                      { val: 4,                   label: 'Weeks',        color: 'text-blue-400' },
                      { val: '100%',              label: 'Free tools',   color: 'text-violet-400' },
                    ].map(s => (
                      <div key={s.label} className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-3 text-center">
                        <div className={`text-2xl font-black ${s.color}`}>{s.val}</div>
                        <div className="text-xs text-slate-500">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 mb-10">
                <button
                  onClick={() => exportPDF(answers, playbook)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Report</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center space-x-2 px-6 py-2.5 rounded-lg font-semibold border border-slate-600 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-800 text-slate-300"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>
                <button
                  onClick={restart}
                  className="flex items-center space-x-2 px-6 py-2.5 rounded-lg font-semibold border border-slate-600 hover:border-slate-500 transition-all duration-300 hover:bg-slate-800 text-slate-300"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Start Over</span>
                </button>
              </div>

              {/* Week sections */}
              {playbook.weeks.map((tasks, wi) => {
                if (!tasks.length) return null;
                const w = WEEKS[wi];
                return (
                  <div key={wi} className="mb-10">
                    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-800">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${w.grad} flex items-center justify-center text-xl flex-shrink-0`}>
                        {w.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{w.label}</span>
                          <span className="text-xs bg-slate-800 border border-slate-700 text-slate-400 px-2 py-0.5 rounded-full">
                            {tasks.length} tasks
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white">{w.theme}</h3>
                      </div>
                    </div>
                    {tasks.map((task, ti) => <TaskCard key={ti} task={task} />)}
                  </div>
                );
              })}

              {/* CTA */}
              <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-2xl p-8 text-center mb-8">
                <BookOpen className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">Want to go deeper?</h3>
                <p className="text-slate-400 text-sm mb-6">
                  Explore all our free privacy and security tools — no account required.
                </p>
                <a
                  href="/tools"
                  className="group bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center space-x-2"
                >
                  <span>Explore All Tools</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Disclaimer */}
              <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
                <p className="text-sm text-slate-400 leading-relaxed">
                  <strong className="text-cyan-400">Disclaimer: </strong>
                  All analysis runs locally in your browser. No answers are stored, transmitted, or shared with any third party.
                  Tool recommendations are for informational purposes only. CyberLifeCoach assumes no liability for security
                  outcomes from following or not following this guide.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── FOOTER (matches site pattern) ── */}
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
            <p className="text-slate-600">All analysis happens entirely in your browser. No data is sent anywhere.</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
