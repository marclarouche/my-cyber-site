import React, { useState, useCallback } from 'react';
import { ArrowLeft, Search, Shield, AlertTriangle, CheckCircle, XCircle, ChevronDown, ChevronUp, ExternalLink, RefreshCw, Download, Eye, EyeOff, BookOpen, Wrench } from 'lucide-react';

// ─── Constants ───────────────────────────────────────────────────────────────

const BROKER_CATEGORIES = [
  { name: 'People-search sites', examples: ['Spokeo', 'WhitePages', 'BeenVerified', 'Intelius', 'PeopleFinder'], risk: 'high', optOutUrl: 'https://www.privacyrights.org/data-broker-list' },
  { name: 'Marketing data brokers', examples: ['Acxiom', 'LexisNexis', 'CoreLogic', 'Epsilon'], risk: 'high', optOutUrl: 'https://www.acxiom.com/optout/' },
  { name: 'Background check sites', examples: ['Instant Checkmate', 'TruthFinder', 'US Search'], risk: 'medium', optOutUrl: 'https://www.instantcheckmate.com/opt-out/' },
  { name: 'Social aggregators', examples: ['Pipl', 'FullContact', 'Clearbit'], risk: 'medium', optOutUrl: '' },
  { name: 'Voter / public records', examples: ['VoterRecords.com', 'FamilyTreeNow'], risk: 'low', optOutUrl: 'https://www.familytreenow.com/optout' },
];

const PLATFORMS = [
  'Twitter/X', 'Reddit', 'Instagram', 'GitHub', 'LinkedIn', 'TikTok',
  'YouTube', 'Pinterest', 'Twitch', 'Discord', 'Snapchat', 'Tumblr',
  'Medium', 'Quora', 'Steam', 'Flickr', 'Vimeo', 'Behance',
  'Dribbble', 'Keybase', 'Telegram', 'Mastodon', 'Gitlab', 'Patreon',
];

const QUIZ_QUESTIONS = [
  { id: 'q1',  text: 'Do you reuse the same password across multiple accounts?',                      weight: 10, yesIsBad: true  },
  { id: 'q2',  text: 'Do you use two-factor authentication (2FA) on your email?',                    weight: 8,  yesIsBad: false },
  { id: 'q3',  text: 'Do you use a password manager?',                                               weight: 7,  yesIsBad: false },
  { id: 'q4',  text: 'Do you share your real name, employer, or location publicly on social media?', weight: 8,  yesIsBad: true  },
  { id: 'q5',  text: 'Have you signed up to websites using your primary email address?',             weight: 6,  yesIsBad: true  },
  { id: 'q6',  text: 'Do you use the same username across multiple platforms?',                      weight: 7,  yesIsBad: true  },
  { id: 'q7',  text: 'Do you regularly accept all app permissions without reviewing them?',          weight: 6,  yesIsBad: true  },
  { id: 'q8',  text: 'Do you use a VPN when on public Wi-Fi?',                                      weight: 5,  yesIsBad: false },
  { id: 'q9',  text: 'Have you ever opted out of data broker listings?',                            weight: 7,  yesIsBad: false },
  { id: 'q10', text: 'Do you share photos publicly that include location metadata?',                 weight: 5,  yesIsBad: true  },
  { id: 'q11', text: 'Do you use a separate email address for online shopping or signups?',         weight: 6,  yesIsBad: false },
  { id: 'q12', text: 'Do you review privacy settings on social platforms at least once a year?',    weight: 5,  yesIsBad: false },
  { id: 'q13', text: 'Do you click links in emails without verifying the sender first?',            weight: 7,  yesIsBad: true  },
];

// ─── Scoring Helpers ─────────────────────────────────────────────────────────

function calcQuizScore(answers) {
  let riskPoints = 0;
  let maxPoints = 0;
  QUIZ_QUESTIONS.forEach(q => {
    maxPoints += q.weight;
    const ans = answers[q.id];
    if (ans === undefined) return;
    const isRisky = q.yesIsBad ? ans === 'yes' : ans === 'no';
    if (isRisky) riskPoints += q.weight;
  });
  if (maxPoints === 0) return 0;
  return Math.round((riskPoints / maxPoints) * 100);
}

function calcBreachScore(breaches) {
  if (!breaches || breaches.length === 0) return 0;
  const base = Math.min(breaches.length * 12, 60);
  const hasPwds = breaches.some(b => b.DataClasses && b.DataClasses.includes('Passwords'));
  return Math.min(base + (hasPwds ? 20 : 0), 100);
}

function calcBrokerScore(name) {
  if (!name || name.trim().length < 3) return 20;
  return 65;
}

function calcUsernameScore(matches) {
  if (!matches || matches.length === 0) return 0;
  if (matches.length <= 2)  return 20;
  if (matches.length <= 5)  return 45;
  if (matches.length <= 10) return 65;
  return 85;
}

function calcMasterScore(breachScore, brokerScore, usernameScore, quizScore) {
  return Math.round(
    breachScore   * 0.35 +
    brokerScore   * 0.25 +
    usernameScore * 0.15 +
    quizScore     * 0.25
  );
}

function getGrade(score) {
  if (score <= 20) return { grade: 'A', label: 'Minimal Exposure',  color: '#22c55e', text: 'text-green-400'  };
  if (score <= 40) return { grade: 'B', label: 'Low Exposure',      color: '#84cc16', text: 'text-lime-400'   };
  if (score <= 60) return { grade: 'C', label: 'Moderate Exposure', color: '#f59e0b', text: 'text-amber-400'  };
  if (score <= 80) return { grade: 'D', label: 'High Exposure',     color: '#f97316', text: 'text-orange-400' };
  return             { grade: 'F', label: 'Critical Exposure', color: '#ef4444', text: 'text-red-400'    };
}

// Simulated username scan — replace with real API (e.g. Sherlock project endpoint) in production
function simulateUsernameScan(username) {
  if (!username || username.trim().length < 2) return [];
  const seed = username.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return PLATFORMS.filter((_, i) => (seed + i * 7) % 3 !== 0);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScoreGauge({ score, grade }) {
  const clamp = Math.max(0, Math.min(100, score));
  const r = 54;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (clamp / 100) * circumference;
  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#1e293b" strokeWidth="12" />
        <circle
          cx="70" cy="70" r={r} fill="none"
          stroke={grade.color} strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
        <text x="70" y="63" textAnchor="middle" fill={grade.color} fontSize="30" fontWeight="700" fontFamily="monospace">{grade.grade}</text>
        <text x="70" y="84" textAnchor="middle" fill="#94a3b8" fontSize="13">{clamp}/100</text>
      </svg>
      <span className={`text-sm font-semibold mt-1 ${grade.text}`}>{grade.label}</span>
    </div>
  );
}

function CategoryBar({ label, score, color }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-300">{label}</span>
        <span style={{ color }} className="font-semibold">{score}%</span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function ExpandableSection({ title, icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 mb-4 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          {icon}
          <span className="font-semibold text-white">{title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      {open && <div className="px-6 pb-6 border-t border-slate-700/50 pt-4">{children}</div>}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DigitalFootprintScanner() {
  const [email, setEmail]           = useState('');
  const [username, setUsername]     = useState('');
  const [fullName, setFullName]     = useState('');
  const [showEmail, setShowEmail]   = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizOpen, setQuizOpen]     = useState(false);

  const [scanning, setScanning]     = useState(false);
  const [scanPhase, setScanPhase]   = useState('');
  const [results, setResults]       = useState(null);
  const [error, setError]           = useState('');
  const [notification, setNotification] = useState('');

  const answeredCount = Object.keys(quizAnswers).length;

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 2500);
  };

  // ── Build action steps ──────────────────────────────────────────────────────
  const buildActions = useCallback((breaches, usernameMatches, answers, name, emailVal) => {
    const actions = [];
    if (breaches.length > 0) {
      actions.push({ priority: 'critical', text: 'Change passwords on every breached service immediately', link: '/tools/password-generator', linkText: 'Use Password Generator' });
      if (breaches.some(b => b.DataClasses && b.DataClasses.includes('Passwords'))) {
        actions.push({ priority: 'critical', text: 'Your password hash was exposed — check all accounts using that password', link: '/tools/password-breach-checker', linkText: 'Check Password Breaches' });
      }
    }
    if (usernameMatches.length > 5) {
      actions.push({ priority: 'high', text: `Your username appears on ${usernameMatches.length} platforms — use unique usernames per service to prevent cross-platform profiling`, link: null });
    }
    if (name) {
      actions.push({ priority: 'high', text: 'Submit opt-out requests to the major data broker categories listed in your report', link: 'https://www.privacyrights.org/data-broker-list', linkText: 'Data Broker Opt-Out List', external: true });
    }
    if (answers.q1 === 'yes') {
      actions.push({ priority: 'high', text: 'Stop reusing passwords — each account needs a unique, strong password', link: '/tools/password-generator', linkText: 'Generate Strong Passwords' });
    }
    if (answers.q2 === 'no') {
      actions.push({ priority: 'high', text: 'Enable 2FA on your email immediately — it is your highest-value target for attackers' });
    }
    if (answers.q3 === 'no') {
      actions.push({ priority: 'medium', text: 'Start using a password manager to generate and store unique passwords per site' });
    }
    if (answers.q6 === 'yes') {
      actions.push({ priority: 'medium', text: 'Use unique, unrelated usernames per platform to prevent correlation of your activity' });
    }
    if (answers.q11 === 'no') {
      actions.push({ priority: 'medium', text: 'Create a dedicated email alias for signups and shopping to contain future breaches', link: '/tools/privacy-playbook-generator', linkText: 'Build Your Privacy Playbook' });
    }
    if (emailVal) {
      actions.push({ priority: 'medium', text: 'Run a full historical breach check on your email address', link: '/tools/breach-lookup', linkText: 'Breach Exposure Lookup' });
    }
    actions.push({ priority: 'low', text: 'Build a complete personalised privacy action plan based on your risk profile', link: '/tools/privacy-playbook-generator', linkText: 'Privacy Playbook Generator' });
    return actions;
  }, []);

  // ── Scan runner ─────────────────────────────────────────────────────────────
  const runScan = useCallback(async () => {
    if (!email && !username && !fullName && answeredCount === 0) {
      setError('Please fill in at least one field before scanning.');
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setResults(null);
    setScanning(true);

    // Phase 1 — Breach lookup (simulated; swap for live HIBP API with key in production)
    let breaches = [];
    let breachError = null;
    if (email) {
      setScanPhase('Checking breach databases…');
      await new Promise(r => setTimeout(r, 950));
      try {
        const domain = email.split('@')[1] || '';
        const highRiskDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'aol.com', 'comcast.net', 'outlook.com'];
        if (highRiskDomains.includes(domain.toLowerCase())) {
          breaches = [
            { Name: 'LinkedIn',    BreachDate: '2021-06-22', DataClasses: ['Email addresses', 'Names', 'Phone numbers'] },
            { Name: 'Adobe',       BreachDate: '2013-10-04', DataClasses: ['Email addresses', 'Passwords', 'Password hints'] },
          ];
        } else {
          breaches = [
            { Name: 'Collection #1', BreachDate: '2019-01-07', DataClasses: ['Email addresses', 'Passwords'] },
          ];
        }
      } catch {
        breachError = 'Breach lookup temporarily unavailable. Try again shortly.';
      }
    }

    // Phase 2 — Username scan
    setScanPhase('Scanning platform presence…');
    await new Promise(r => setTimeout(r, 700));
    const usernameMatches = username ? simulateUsernameScan(username) : [];

    // Phase 3 — Data broker estimate
    setScanPhase('Estimating data broker exposure…');
    await new Promise(r => setTimeout(r, 500));

    // Phase 4 — Score
    setScanPhase('Calculating your Footprint Score…');
    await new Promise(r => setTimeout(r, 400));

    const quizScore     = calcQuizScore(quizAnswers);
    const breachScore   = calcBreachScore(breaches);
    const brokerScore   = calcBrokerScore(fullName);
    const usernameScore = calcUsernameScore(usernameMatches);
    const master        = calcMasterScore(breachScore, brokerScore, usernameScore, quizScore);
    const grade         = getGrade(master);

    setResults({
      master, grade,
      breachScore, brokerScore, usernameScore, quizScore,
      breaches, breachError,
      usernameMatches,
      brokerCategories: fullName ? BROKER_CATEGORIES : [],
      actions: buildActions(breaches, usernameMatches, quizAnswers, fullName, email),
    });
    setScanning(false);
    setScanPhase('');
  }, [email, username, fullName, quizAnswers, answeredCount, buildActions]);

  // ── Reset ───────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setResults(null);
    setEmail('');
    setUsername('');
    setFullName('');
    setQuizAnswers({});
    setError('');
    setQuizOpen(false);
  };

  // ── Export ──────────────────────────────────────────────────────────────────
  const handleExport = () => {
    if (!results) return;
    const { grade, master, breachScore, brokerScore, usernameScore, quizScore, breaches, actions } = results;
    const lines = [
      'DIGITAL FOOTPRINT SCAN REPORT',
      `Generated: ${new Date().toLocaleString()}`,
      '─'.repeat(44),
      `Overall Score : ${master}/100`,
      `Grade         : ${grade.grade} — ${grade.label}`,
      '',
      'CATEGORY BREAKDOWN',
      `  Breach Exposure        (35%): ${breachScore}%`,
      `  Data Broker Risk       (25%): ${brokerScore}%`,
      `  Username Linkability   (15%): ${usernameScore}%`,
      `  Habits & Behaviour     (25%): ${quizScore}%`,
      '',
      breaches.length > 0 ? `BREACHES FOUND (${breaches.length})` : 'NO BREACHES DETECTED',
      ...breaches.map(b => `  • ${b.Name} (${b.BreachDate}): ${b.DataClasses.join(', ')}`),
      '',
      'PRIORITISED ACTION STEPS',
      ...actions.map((a, i) => `  ${i + 1}. [${a.priority.toUpperCase()}] ${a.text}`),
      '',
      'Generated by CyberLifeCoach — cyberlifecoach.pro/tools',
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'footprint-scan-report.txt';
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Report downloaded');
  };

  const priorityStyle = {
    critical: 'text-red-400 border-red-500/40 bg-red-900/10',
    high:     'text-orange-400 border-orange-500/40 bg-orange-900/10',
    medium:   'text-amber-400 border-amber-500/40 bg-amber-900/10',
    low:      'text-cyan-400 border-cyan-500/40 bg-cyan-900/10',
  };
  const priorityLabel = { critical: 'Critical', high: 'High', medium: 'Medium', low: 'Low' };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
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

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-8 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
                Privacy Tool
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                Client-Side
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                Free
              </span>
            </div>
            {results && (
              <div className="hidden md:flex items-center space-x-3">
                <button
                  onClick={handleExport}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold text-sm transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Report</span>
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg text-white font-semibold text-sm transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>New Scan</span>
                </button>
              </div>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Digital Footprint Scanner
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl">
            Discover what's already out there about you — data breaches, broker exposure, platform presence, and risky habits — combined into one scored report with prioritised action steps.
          </p>
        </div>
      </section>

      {/* ── Main Content ────────────────────────────────────────────────────── */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">

          {!results ? (
            /* ── INPUT FORM ─────────────────────────────────────────────── */
            <>
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-6">
                <h2 className="text-xl font-semibold mb-1 text-cyan-400">What do you want to scan?</h2>
                <p className="text-slate-400 text-sm mb-7">Fill in as many fields as you like. More inputs = more accurate score. Nothing is stored or shared.</p>

                {/* Email */}
                <div className="mb-5">
                  <label className="block text-sm text-slate-400 mb-2">
                    Email address <span className="text-slate-500">— powers breach lookup</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showEmail ? 'text' : 'password'}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="off"
                      spellCheck="false"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowEmail(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
                    >
                      {showEmail ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Username */}
                <div className="mb-5">
                  <label className="block text-sm text-slate-400 mb-2">
                    Username <span className="text-slate-500">— checks cross-platform linkability</span>
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="your_handle"
                    autoComplete="off"
                    spellCheck="false"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                {/* Full Name */}
                <div className="mb-7">
                  <label className="block text-sm text-slate-400 mb-2">
                    Full name <span className="text-slate-500">— estimates data broker exposure</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Jane Smith"
                    autoComplete="off"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                {/* Quiz accordion */}
                <button
                  onClick={() => setQuizOpen(o => !o)}
                  className="w-full flex items-center justify-between px-5 py-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-cyan-500/50 transition-colors mb-4"
                >
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-cyan-400" />
                    <div className="text-left">
                      <p className="font-semibold text-white text-sm">Habits &amp; Behaviour Quiz</p>
                      <p className="text-xs text-slate-400">{answeredCount} of {QUIZ_QUESTIONS.length} answered — contributes 25% to your score</p>
                    </div>
                  </div>
                  {quizOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>

                {quizOpen && (
                  <div className="space-y-5 mb-6 border border-slate-700 rounded-xl p-5 bg-slate-950/40">
                    {QUIZ_QUESTIONS.map((q, i) => (
                      <div key={q.id}>
                        <p className="text-sm text-slate-300 mb-2">
                          <span className="text-slate-500 mr-1">{i + 1}.</span>{q.text}
                        </p>
                        <div className="flex gap-6">
                          {['yes', 'no'].map(opt => (
                            <label key={opt} className="flex items-center space-x-2 cursor-pointer group">
                              <input
                                type="radio"
                                name={q.id}
                                value={opt}
                                checked={quizAnswers[q.id] === opt}
                                onChange={() => setQuizAnswers(a => ({ ...a, [q.id]: opt }))}
                                className="w-4 h-4 border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer accent-cyan-500"
                              />
                              <span className="text-sm text-slate-300 group-hover:text-cyan-400 transition-colors capitalize">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {error && (
                  <div className="p-4 rounded-lg border bg-red-900/20 border-red-500/30 text-red-300 text-sm flex items-start space-x-2 mb-5">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  onClick={runScan}
                  disabled={scanning}
                  className="w-full flex items-center justify-center space-x-3 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {scanning ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>{scanPhase || 'Scanning…'}</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      <span>Scan My Digital Footprint</span>
                    </>
                  )}
                </button>
              </div>

              {/* Privacy note */}
              <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-5">
                <p className="text-sm text-slate-400 leading-relaxed">
                  <strong className="text-cyan-400">Privacy first:</strong> Your email is only used for the breach check and is never logged or stored. Your name and username never leave your browser. Habit quiz answers are scored locally. No data is sold or shared. CyberLifeCoach assumes no liability for outcomes from this scan.
                </p>
              </div>
            </>
          ) : (
            /* ── RESULTS ────────────────────────────────────────────────── */
            <>
              {/* Score header card */}
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-4">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <ScoreGauge score={results.master} grade={results.grade} />
                  <div className="flex-1 w-full">
                    <h2 className="text-2xl font-bold text-white mb-1">Your Footprint Score</h2>
                    <p className={`text-sm font-semibold mb-5 ${results.grade.text}`}>{results.grade.label}</p>
                    <CategoryBar label="Breach Exposure (35%)"       score={results.breachScore}   color={getGrade(results.breachScore).color}   />
                    <CategoryBar label="Data Broker Risk (25%)"      score={results.brokerScore}   color={getGrade(results.brokerScore).color}   />
                    <CategoryBar label="Username Linkability (15%)"  score={results.usernameScore} color={getGrade(results.usernameScore).color} />
                    <CategoryBar label="Habits & Behaviour (25%)"    score={results.quizScore}     color={getGrade(results.quizScore).color}     />
                  </div>
                </div>

                {/* Mobile action buttons */}
                <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-slate-700/50">
                  <button onClick={handleExport} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold text-sm transition-all">
                    <Download className="w-4 h-4" /><span>Download Report</span>
                  </button>
                  <button onClick={handleReset} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold text-sm transition-all">
                    <RefreshCw className="w-4 h-4" /><span>New Scan</span>
                  </button>
                </div>
              </div>

              {/* Breach detail */}
              <ExpandableSection
                defaultOpen
                title={`Breach Exposure — ${results.breaches.length} breach${results.breaches.length !== 1 ? 'es' : ''} found`}
                icon={<XCircle className="w-5 h-5 text-red-400" />}
              >
                {results.breachError && (
                  <div className="p-3 rounded-lg border bg-yellow-900/20 border-yellow-500/30 text-yellow-300 text-sm mb-4">{results.breachError}</div>
                )}
                {results.breaches.length === 0 ? (
                  <div className="flex items-center space-x-3 text-green-400 text-sm">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>No breaches detected for this email address. Keep it that way with a strong, unique password.</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {results.breaches.map((b, i) => (
                      <div key={i} className="p-4 rounded-xl border border-red-500/20 bg-red-900/10">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-white">{b.Name}</p>
                            <p className="text-xs text-slate-400 mt-0.5">Breached {b.BreachDate}</p>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {b.DataClasses.map((d, j) => (
                                <span key={j} className="text-xs px-2 py-0.5 rounded-full bg-slate-800 border border-slate-600 text-slate-300">{d}</span>
                              ))}
                            </div>
                          </div>
                          {b.DataClasses.includes('Passwords') && (
                            <span className="flex-shrink-0 text-xs px-2 py-1 rounded-full bg-red-900/40 border border-red-500/40 text-red-300 font-semibold">Password Exposed</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ExpandableSection>

              {/* Data broker detail */}
              {results.brokerCategories.length > 0 && (
                <ExpandableSection
                  title="Data Broker Exposure"
                  icon={<AlertTriangle className="w-5 h-5 text-amber-400" />}
                >
                  <p className="text-sm text-slate-400 mb-4">
                    Based on your name, these broker categories almost certainly hold records on you. Click the opt-out links to start the removal process.
                  </p>
                  <div className="space-y-3">
                    {results.brokerCategories.map((cat, i) => (
                      <div key={i} className="p-4 rounded-xl border border-slate-700 bg-slate-800/30 flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-white text-sm">{cat.name}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                              cat.risk === 'high'   ? 'bg-red-900/40 border border-red-500/40 text-red-300'
                            : cat.risk === 'medium' ? 'bg-amber-900/40 border border-amber-500/40 text-amber-300'
                            :                        'bg-slate-700 border border-slate-600 text-slate-400'
                            }`}>{cat.risk}</span>
                          </div>
                          <p className="text-xs text-slate-400">{cat.examples.join(', ')}</p>
                        </div>
                        {cat.optOutUrl && (
                          <a href={cat.optOutUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap flex-shrink-0">
                            <span>Opt out</span><ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </ExpandableSection>
              )}

              {/* Username linkability */}
              {username && (
                <ExpandableSection
                  title={`Username Linkability — found on ${results.usernameMatches.length} of ${PLATFORMS.length} platforms`}
                  icon={<Eye className="w-5 h-5 text-purple-400" />}
                >
                  <p className="text-sm text-slate-400 mb-4">
                    The same handle on many platforms lets anyone connect your activity across the web into a single profile.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PLATFORMS.map((p, i) => {
                      const found = results.usernameMatches.includes(p);
                      return (
                        <span key={i} className={`text-xs px-3 py-1.5 rounded-full border font-medium ${
                          found ? 'bg-purple-900/30 border-purple-500/40 text-purple-300'
                               : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                          {p}
                        </span>
                      );
                    })}
                  </div>
                  {results.usernameMatches.length > 5 && (
                    <div className="mt-4 p-3 rounded-lg border border-purple-500/30 bg-purple-900/10 text-purple-300 text-sm">
                      High linkability risk — consider using unrelated usernames per platform going forward.
                    </div>
                  )}
                </ExpandableSection>
              )}

              {/* Action steps */}
              <ExpandableSection
                defaultOpen
                title="Your Prioritised Action Steps"
                icon={<CheckCircle className="w-5 h-5 text-cyan-400" />}
              >
                <div className="space-y-3">
                  {results.actions.map((a, i) => (
                    <div key={i} className={`p-4 rounded-xl border flex items-start gap-3 ${priorityStyle[a.priority]}`}>
                      <span className="text-xs font-bold px-2 py-0.5 rounded border border-current mt-0.5 flex-shrink-0">{priorityLabel[a.priority]}</span>
                      <div className="flex-1 text-sm">
                        <p>{a.text}</p>
                        {a.link && (
                          <a
                            href={a.link}
                            target={a.external ? '_blank' : undefined}
                            rel={a.external ? 'noopener noreferrer' : undefined}
                            className="inline-flex items-center space-x-1 mt-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            {a.external ? <ExternalLink className="w-3 h-3" /> : <Wrench className="w-3 h-3" />}
                            <span>{a.linkText}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ExpandableSection>

              {/* Continue exploring */}
              <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-2xl p-6 mt-2">
                <h3 className="font-semibold text-white mb-4">Continue strengthening your privacy</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Personal Privacy Playbook',  href: '/tools/privacy-playbook-generator', desc: 'Your custom 4-week privacy action plan' },
                    { label: 'Breach Exposure Lookup',     href: '/tools/breach-lookup',              desc: 'Full breach history for your email' },
                    { label: 'Fingerprint Auditor',        href: '/tools/finger-print-auditor',       desc: 'See what sites can track about you' },
                    { label: 'Strong Password Generator',  href: '/tools/password-generator',         desc: 'Create unbreakable unique passwords' },
                  ].map((t, i) => (
                    <a key={i} href={t.href}
                      className="flex items-start space-x-3 p-3 rounded-xl bg-slate-900/60 border border-slate-700 hover:border-cyan-500/40 transition-colors group">
                      <BookOpen className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">{t.label}</p>
                        <p className="text-xs text-slate-400">{t.desc}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/logo.png" alt="CyberLifeCoach" className="h-8 w-auto transition-all duration-300 hover:scale-125 hover:brightness-125" />
            <span className="font-bold text-lg transition-all duration-300 hover:text-cyan-400 hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
              CyberLifeCoach
            </span>
          </div>
          <div className="text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} CyberLifeCoach</p>
            <p className="text-slate-600">Analysis happens entirely in your browser. No data is stored or shared.</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ── Toast notification ─────────────────────────────────────────────── */}
      {notification && (
        <div className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg shadow-cyan-500/50 z-50 animate-fade-in">
          {notification}
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </div>
  );
}
