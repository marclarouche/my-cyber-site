import React, { useState, useCallback } from 'react';
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, XCircle, ChevronDown, ChevronUp, Search, RefreshCw, ExternalLink, Phone, FileText, Printer, BookOpen } from 'lucide-react';

// ─── Agency Definitions ───────────────────────────────────────────────────────

const AGENCIES = {
  irs: {
    name: 'IRS (Internal Revenue Service)',
    shortName: 'IRS',
    keywords: ['irs', 'internal revenue', 'tax', 'taxes', 'tax debt', 'tax fraud', 'federal tax', 'income tax', 'tax lien', 'tax warrant', 'tax refund'],
    neverDoes: [
      'Call you first about a tax bill — they always send a letter by mail',
      'Demand immediate payment without allowing you to question or appeal',
      'Require a specific payment method like gift cards, wire transfer, or cryptocurrency',
      'Threaten to bring in police or immigration agents for not paying immediately',
      'Revoke your driver\'s license, business license, or immigration status for non-payment',
      'Ask for credit or debit card numbers over the phone',
    ],
    realContact: '1-800-829-1040',
    realWebsite: 'irs.gov',
    reportUrl: 'https://www.tigta.gov/hotline',
    reportName: 'Treasury Inspector General (TIGTA)',
  },
  ssa: {
    name: 'Social Security Administration',
    shortName: 'SSA',
    keywords: ['social security', 'ssa', 'social security number', 'ssn', 'suspended', 'social security suspended', 'benefits suspended', 'social security administration'],
    neverDoes: [
      'Suspend or cancel your Social Security number — this is not possible',
      'Threaten you with arrest or legal action if you don\'t confirm your SSN',
      'Ask you to verify your SSN by calling a number they provide',
      'Demand payment via gift cards, wire transfer, or cryptocurrency',
      'Send you a "warrant" or "legal notice" by automated phone call',
      'Contact you about a mysterious problem with your account without prior notice',
    ],
    realContact: '1-800-772-1213',
    realWebsite: 'ssa.gov',
    reportUrl: 'https://oig.ssa.gov/report/',
    reportName: 'SSA Office of Inspector General',
  },
  fbi: {
    name: 'FBI / DEA / Federal Law Enforcement',
    shortName: 'FBI/DEA',
    keywords: ['fbi', 'dea', 'federal bureau', 'drug enforcement', 'federal agent', 'federal investigation', 'interpol', 'federal marshal', 'warrant', 'arrest warrant', 'federal warrant', 'homeland security'],
    neverDoes: [
      'Call you to offer immunity or warn you about an investigation in exchange for money',
      'Demand payment to avoid arrest — agencies make arrests, they don\'t negotiate fees',
      'Ask you to purchase gift cards or wire money to avoid being arrested',
      'Conduct official business by phone for financial transactions',
      'Send badge numbers or case numbers via text and demand urgent callback',
      'Ask you to keep the call secret from family members or attorneys',
    ],
    realContact: 'tips.fbi.gov',
    realWebsite: 'fbi.gov',
    reportUrl: 'https://www.ic3.gov/',
    reportName: 'FBI Internet Crime Complaint Center (IC3)',
  },
  cbp: {
    name: 'CBP / ICE / Immigration',
    shortName: 'CBP/ICE',
    keywords: ['cbp', 'ice', 'customs', 'border protection', 'immigration', 'deportation', 'visa', 'green card', 'immigration status', 'detained', 'customs and border'],
    neverDoes: [
      'Call to demand payment to prevent deportation or fix immigration status',
      'Threaten immediate deportation over the phone unless you pay now',
      'Ask for gift cards, wire transfers, or cryptocurrency to resolve status issues',
      'Contact you by phone about a package seized at the border with contraband',
      'Demand your bank account information to process a refund or release a package',
      'Ask you to keep your immigration situation secret from a lawyer',
    ],
    realContact: '1-877-227-5511',
    realWebsite: 'cbp.gov',
    reportUrl: 'https://www.ftc.gov/complaint',
    reportName: 'FTC Report Fraud',
  },
  medicare: {
    name: 'Medicare / Medicaid / HHS',
    shortName: 'Medicare',
    keywords: ['medicare', 'medicaid', 'hhs', 'health insurance', 'medicare card', 'new medicare card', 'benefits', 'health benefits', 'social security benefits', 'insurance number'],
    neverDoes: [
      'Call to ask for your Medicare number to send a new card — they already have it',
      'Offer free medical equipment in exchange for your Medicare number',
      'Ask you to pay a fee to keep your Medicare benefits active',
      'Contact you about a random benefits change without a prior written notice',
      'Request payment via gift cards or wire transfer for any medical reason',
      'Threaten to cancel your coverage unless you provide payment immediately',
    ],
    realContact: '1-800-633-4227',
    realWebsite: 'medicare.gov',
    reportUrl: 'https://oig.hhs.gov/fraud/report-fraud/',
    reportName: 'HHS Office of Inspector General',
  },
  utility: {
    name: 'Utility / Power Company',
    shortName: 'Utility',
    keywords: ['electric', 'electricity', 'power company', 'gas company', 'utility', 'water company', 'disconnect', 'shut off', 'shutoff', 'power shutoff', 'utility bill'],
    neverDoes: [
      'Demand same-day payment via gift card to avoid immediate disconnection',
      'Send someone to your door within the hour if you don\'t pay right now by phone',
      'Accept gift cards, cryptocurrency, or wire transfers as valid payment',
      'Threaten immediate shutoff without prior mailed notice and a grace period',
      'Call from a number that doesn\'t match the number on your bill',
    ],
    realContact: 'Check your bill for the official number',
    realWebsite: 'Your utility provider\'s official website',
    reportUrl: 'https://www.ftc.gov/complaint',
    reportName: 'FTC Report Fraud',
  },
  court: {
    name: 'Court / Jury Duty / Sheriff',
    shortName: 'Court/Jury',
    keywords: ['jury', 'jury duty', 'court', 'judge', 'sheriff', 'court summons', 'missed jury', 'contempt', 'warrant for arrest', 'failure to appear'],
    neverDoes: [
      'Call demanding payment to avoid arrest for missing jury duty',
      'Accept gift cards or wire transfers to clear a court warrant',
      'Conduct official warrant service exclusively by phone',
      'Demand you keep the call secret from family or an attorney',
      'Require payment before you can speak to a supervisor or verify the case',
    ],
    realContact: 'Your local courthouse — look up the number independently',
    realWebsite: 'Look up your local county court website directly',
    reportUrl: 'https://www.ftc.gov/complaint',
    reportName: 'FTC Report Fraud',
  },
};

// ─── Red Flag Library ─────────────────────────────────────────────────────────

const RED_FLAGS = [
  // Pressure tactics — weight 15 each
  { id: 'rf1',  category: 'pressure',  weight: 15, label: 'Threatened arrest if you hang up or don\'t pay', patterns: ['arrest', 'arrested', 'police', 'officers on the way', 'handcuffs', 'jail', 'prison', 'taken into custody', 'warrant out for', 'officer will arrive'] },
  { id: 'rf2',  category: 'pressure',  weight: 15, label: 'Told you must act today or face consequences', patterns: ['today', 'right now', 'immediately', 'within the hour', 'last chance', 'final notice', 'before midnight', 'before end of day', 'urgent', 'emergency'] },
  { id: 'rf3',  category: 'pressure',  weight: 12, label: 'Told not to hang up or call anyone else', patterns: ['do not hang up', 'don\'t hang up', 'stay on the line', 'do not call anyone', 'don\'t tell anyone', 'keep this confidential', 'do not discuss', 'don\'t discuss'] },
  { id: 'rf4',  category: 'pressure',  weight: 10, label: 'Told to keep the situation secret', patterns: ['secret', 'confidential', 'don\'t tell', 'do not tell', 'not tell your family', 'not tell your spouse', 'between us', 'private matter'] },

  // Payment red flags — weight 20 each (strongest signals)
  { id: 'rf5',  category: 'payment',   weight: 20, label: 'Asked to pay with gift cards', patterns: ['gift card', 'gift cards', 'itunes', 'google play', 'amazon gift', 'steam card', 'ebay gift', 'target gift', 'walmart gift', 'best buy gift'] },
  { id: 'rf6',  category: 'payment',   weight: 20, label: 'Asked to wire money or use Western Union', patterns: ['wire transfer', 'western union', 'moneygram', 'money order', 'wire the money', 'wire funds', 'bank wire'] },
  { id: 'rf7',  category: 'payment',   weight: 20, label: 'Asked to pay with cryptocurrency', patterns: ['bitcoin', 'crypto', 'cryptocurrency', 'ethereum', 'coinbase', 'crypto atm', 'bitcoin atm', 'digital currency', 'usdt', 'tether'] },
  { id: 'rf8',  category: 'payment',   weight: 18, label: 'Asked to pay with prepaid debit cards', patterns: ['prepaid card', 'prepaid debit', 'green dot', 'vanilla visa', 'reloadable card', 'prepaid visa', 'reload the card'] },
  { id: 'rf9',  category: 'payment',   weight: 12, label: 'Asked to pay a fee to receive a refund or prize', patterns: ['fee to receive', 'processing fee', 'release fee', 'customs fee', 'tax on your prize', 'fee to claim', 'administration fee', 'pay to receive your'] },

  // Identity signals — weight 12-15
  { id: 'rf10', category: 'identity',  weight: 15, label: 'Asked for your full Social Security Number', patterns: ['social security number', 'ssn', 'full ssn', 'social security', 'confirm your social', 'verify your social', 'last four digits'] },
  { id: 'rf11', category: 'identity',  weight: 12, label: 'Asked for bank account or routing number', patterns: ['bank account', 'account number', 'routing number', 'checking account', 'savings account', 'bank information', 'financial information'] },
  { id: 'rf12', category: 'identity',  weight: 10, label: 'Caller ID showed a real government phone number', patterns: ['caller id', 'showed', 'displayed', 'appeared as', 'said it was from', 'came up as', 'the number showed'] },
  { id: 'rf13', category: 'identity',  weight: 8,  label: 'Caller provided a badge number or case number to sound official', patterns: ['badge number', 'badge #', 'case number', 'case #', 'agent id', 'employee id', 'reference number', 'confirmation number'] },

  // Procedure violations — weight 8-12
  { id: 'rf14', category: 'procedure', weight: 12, label: 'Government contacted you by phone first with no prior letter', patterns: ['no letter', 'never received', 'didn\'t get a letter', 'no mail', 'called out of nowhere', 'unexpected call', 'never contacted before'] },
  { id: 'rf15', category: 'procedure', weight: 10, label: 'Mentioned "suspended" Social Security number', patterns: ['suspended', 'your number has been suspended', 'ssn suspended', 'social security suspended', 'number is suspended', 'account suspended'] },
  { id: 'rf16', category: 'procedure', weight: 10, label: 'Claimed a package or shipment contained drugs or contraband', patterns: ['package', 'shipment', 'parcel', 'drugs found', 'contraband', 'illegal', 'narcotics', 'your name on a package', 'package in your name'] },
  { id: 'rf17', category: 'procedure', weight: 8,  label: 'Offered to make a legal problem "go away" for money', patterns: ['go away', 'make this disappear', 'settle this quietly', 'avoid charges', 'clear your name', 'clear the warrant', 'resolve this privately'] },
  { id: 'rf18', category: 'procedure', weight: 8,  label: 'Asked you to call back a number they provided', patterns: ['call back', 'call us back', 'call this number', 'return this call', 'call immediately', 'call the number below', 'call 1-8', 'call 1-9'] },
];

// ─── Checklist Questions ──────────────────────────────────────────────────────

const CHECKLIST = [
  { id: 'c1',  text: 'They threatened you with arrest or said police were on the way',         flagId: 'rf1',  weight: 15 },
  { id: 'c2',  text: 'They demanded payment today or said it was your last chance',             flagId: 'rf2',  weight: 15 },
  { id: 'c3',  text: 'They told you not to hang up or not to call anyone else',                 flagId: 'rf3',  weight: 12 },
  { id: 'c4',  text: 'They asked you to pay with gift cards',                                   flagId: 'rf5',  weight: 20 },
  { id: 'c5',  text: 'They asked you to wire money or use Western Union / MoneyGram',           flagId: 'rf6',  weight: 20 },
  { id: 'c6',  text: 'They asked you to pay with Bitcoin or cryptocurrency',                    flagId: 'rf7',  weight: 20 },
  { id: 'c7',  text: 'They asked for your full Social Security Number',                         flagId: 'rf10', weight: 15 },
  { id: 'c8',  text: 'They asked for your bank account or routing number',                      flagId: 'rf11', weight: 12 },
  { id: 'c9',  text: 'They said your Social Security number was "suspended"',                   flagId: 'rf15', weight: 10 },
  { id: 'c10', text: 'They claimed a package with your name on it contained drugs',             flagId: 'rf16', weight: 10 },
  { id: 'c11', text: 'They called with no prior letter or notice from that agency',             flagId: 'rf14', weight: 12 },
  { id: 'c12', text: 'They gave you a badge number or case number to sound official',           flagId: 'rf13', weight: 8  },
  { id: 'c13', text: 'They told you to keep the situation secret from family or your attorney', flagId: 'rf4',  weight: 10 },
];

// ─── Scoring & Verdict ────────────────────────────────────────────────────────

function detectAgency(text) {
  const lower = text.toLowerCase();
  for (const [key, agency] of Object.entries(AGENCIES)) {
    if (agency.keywords.some(k => lower.includes(k))) return key;
  }
  return null;
}

function scoreText(text) {
  const lower = text.toLowerCase();
  const triggered = [];
  RED_FLAGS.forEach(flag => {
    if (flag.patterns.some(p => lower.includes(p))) {
      triggered.push(flag);
    }
  });
  return triggered;
}

function scoreChecklist(checked) {
  return RED_FLAGS.filter(f => {
    const q = CHECKLIST.find(c => c.flagId === f.id);
    return q && checked[q.id];
  });
}

function getVerdict(triggeredFlags) {
  const total = triggeredFlags.reduce((sum, f) => sum + f.weight, 0);
  if (total === 0)   return { level: 'clean',    label: 'No red flags detected',   color: '#22c55e', bg: 'bg-green-900/20 border-green-500/30',   text: 'text-green-400',  score: 0   };
  if (total <= 15)   return { level: 'verify',   label: 'Suspicious — verify first', color: '#f59e0b', bg: 'bg-amber-900/20 border-amber-500/30',   text: 'text-amber-400',  score: total };
  if (total <= 35)   return { level: 'probable', label: 'Probable scam',            color: '#f97316', bg: 'bg-orange-900/20 border-orange-500/30',  text: 'text-orange-400', score: total };
  return               { level: 'certain',   label: 'Almost certain scam',      color: '#ef4444', bg: 'bg-red-900/20 border-red-500/30',       text: 'text-red-400',    score: total };
}

function buildNextSteps(verdict, agencyKey) {
  const agency = agencyKey ? AGENCIES[agencyKey] : null;
  const steps = [];

  if (verdict.level === 'clean') {
    steps.push('Even without obvious red flags, verify by hanging up and calling the agency directly using a number from their official website — never the number the caller gave you.');
    steps.push('If it was a letter, check the agency\'s official website to confirm the address matches.');
    return steps;
  }

  steps.push('Hang up immediately if the call is still ongoing. You are never obligated to stay on the line.');
  steps.push('Do not pay anything — no gift cards, no wire transfers, no cryptocurrency, no prepaid cards. No real government agency uses these.');

  if (verdict.level === 'certain' || verdict.level === 'probable') {
    steps.push('Do not call back any number the scammer gave you. Look up the real number independently.');
  }

  if (agency) {
    steps.push(`Verify the situation by calling ${agency.shortName} directly at ${agency.realContact} — a number you look up yourself at ${agency.realWebsite}.`);
    steps.push(`Report this scam to ${agency.reportName} using the link below.`);
  } else {
    steps.push('Call the agency directly using a number from their official .gov website — never a number given to you by the caller.');
    steps.push('Report the scam to the FTC at reportfraud.ftc.gov.');
  }

  steps.push('Tell a trusted family member or friend what happened — scammers rely on isolation and secrecy.');
  steps.push('If you already paid, contact your bank or the payment service immediately. For gift cards, call the issuer\'s fraud line — some funds can be recovered.');

  return steps;
}

// ─── Category colors ──────────────────────────────────────────────────────────
const CAT_STYLE = {
  pressure:  'bg-red-900/20 border-red-500/30 text-red-400',
  payment:   'bg-orange-900/20 border-orange-500/30 text-orange-400',
  identity:  'bg-purple-900/20 border-purple-500/30 text-purple-400',
  procedure: 'bg-amber-900/20 border-amber-500/30 text-amber-400',
};
const CAT_LABEL = { pressure: 'Pressure tactic', payment: 'Payment red flag', identity: 'Identity signal', procedure: 'Procedure violation' };

// ─── Sub-components ───────────────────────────────────────────────────────────

function VerdictBadge({ verdict }) {
  const icons = {
    clean:    <CheckCircle className="w-6 h-6" />,
    verify:   <AlertTriangle className="w-6 h-6" />,
    probable: <AlertTriangle className="w-6 h-6" />,
    certain:  <XCircle className="w-6 h-6" />,
  };
  return (
    <div className={`flex items-center gap-3 px-5 py-4 rounded-xl border ${verdict.bg}`}>
      <span style={{ color: verdict.color }}>{icons[verdict.level]}</span>
      <div>
        <p className={`text-xl font-bold ${verdict.text}`}>{verdict.label}</p>
        <p className="text-slate-400 text-sm mt-0.5">
          {verdict.level === 'clean'
            ? 'No known scam signals were found. Still verify independently.'
            : `${verdict.score} risk points detected across ${verdict.level === 'certain' ? 'multiple critical' : 'several'} signal categories.`}
        </p>
      </div>
    </div>
  );
}

function ExpandableSection({ title, icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 mb-4 overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-800/50 transition-colors">
        <div className="flex items-center space-x-3">{icon}<span className="font-semibold text-white">{title}</span></div>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      {open && <div className="px-6 pb-6 border-t border-slate-700/50 pt-4">{children}</div>}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function GovernmentImpersonationScamDetector() {
  const [mode, setMode]             = useState('text'); // 'text' | 'checklist'
  const [inputText, setInputText]   = useState('');
  const [checkedItems, setCheckedItems] = useState({});
  const [agencyOverride, setAgencyOverride] = useState('');

  const [results, setResults]       = useState(null);
  const [notification, setNotification] = useState('');

  const showNotification = (msg) => { setNotification(msg); setTimeout(() => setNotification(''), 2500); };

  const answeredCount = Object.values(checkedItems).filter(Boolean).length;

  // ── Analyze ────────────────────────────────────────────────────────────────
  const runAnalysis = useCallback(() => {
    let triggered = [];
    let detectedAgency = agencyOverride || null;

    if (mode === 'text') {
      if (!inputText.trim()) return;
      triggered = scoreText(inputText);
      if (!detectedAgency) detectedAgency = detectAgency(inputText);
    } else {
      triggered = scoreChecklist(checkedItems);
    }

    const verdict    = getVerdict(triggered);
    const nextSteps  = buildNextSteps(verdict, detectedAgency);
    const agency     = detectedAgency ? AGENCIES[detectedAgency] : null;

    setResults({ triggered, verdict, nextSteps, agency, agencyKey: detectedAgency });
  }, [mode, inputText, checkedItems, agencyOverride]);

  const handleReset = () => {
    setResults(null);
    setInputText('');
    setCheckedItems({});
    setAgencyOverride('');
  };

  const handlePrint = () => window.print();

  const handleCopyResults = () => {
    if (!results) return;
    const lines = [
      'GOVERNMENT IMPERSONATION SCAM ANALYSIS',
      `Date: ${new Date().toLocaleString()}`,
      '─'.repeat(44),
      `Verdict: ${results.verdict.label}`,
      results.agency ? `Agency impersonated: ${results.agency.name}` : '',
      '',
      `Red flags detected (${results.triggered.length}):`,
      ...results.triggered.map(f => `  • [${CAT_LABEL[f.category]}] ${f.label}`),
      '',
      'What to do next:',
      ...results.nextSteps.map((s, i) => `  ${i + 1}. ${s}`),
      '',
      results.agency ? `Official contact: ${results.agency.realContact}` : '',
      '',
      'Generated by CyberLifeCoach — cyberlifecoach.pro/tools',
    ].filter(Boolean);
    navigator.clipboard?.writeText(lines.join('\n')).then(() => showNotification('Results copied to clipboard'));
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">

      {/* Nav */}
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
      <section className="relative pt-32 pb-8 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
                  Scam Detector
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Client-Side</span>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Free</span>
                <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold">New</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Government Impersonation Scam Detector
              </h1>
              <p className="text-slate-400 text-sm max-w-2xl">
                Paste a suspicious message, describe a phone call, or answer a quick checklist. Get an instant analysis of red flags, a clear verdict, and exact steps to take — including who to call to verify and where to report.
              </p>
            </div>
            {results && (
              <div className="hidden md:flex items-center space-x-3 ml-6 mt-2 flex-shrink-0">
                <button onClick={handlePrint} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold text-sm transition-all">
                  <Printer className="w-4 h-4" /><span>Print</span>
                </button>
                <button onClick={handleReset} className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg text-white font-semibold text-sm transition-all">
                  <RefreshCw className="w-4 h-4" /><span>New Analysis</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">

          {!results ? (
            /* ── INPUT ──────────────────────────────────────────────────── */
            <>
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-6">

                {/* Mode toggle */}
                <div className="flex gap-2 mb-7 p-1 bg-slate-950 rounded-xl border border-slate-800">
                  {[
                    { key: 'text',      label: 'Paste message or describe the call', icon: <FileText className="w-4 h-4" /> },
                    { key: 'checklist', label: 'Answer a quick checklist',           icon: <CheckCircle className="w-4 h-4" /> },
                  ].map(m => (
                    <button
                      key={m.key}
                      onClick={() => setMode(m.key)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        mode === m.key
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {m.icon}<span>{m.label}</span>
                    </button>
                  ))}
                </div>

                {mode === 'text' ? (
                  <>
                    <label className="block text-sm text-slate-400 mb-2">
                      Paste the message text, email, or describe what happened on the call
                    </label>
                    <textarea
                      value={inputText}
                      onChange={e => setInputText(e.target.value)}
                      placeholder={`Examples:\n• "This is the IRS. You owe $4,200 in back taxes. If you don't pay today with iTunes gift cards, officers will arrest you within the hour."\n• "Got a call saying my Social Security number was suspended due to suspicious activity and I needed to confirm it to reactivate."\n• "Email says I missed jury duty and have a warrant. Must call back immediately or be arrested."`}
                      rows={8}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none placeholder-slate-600 leading-relaxed"
                    />
                  </>
                ) : (
                  <>
                    <p className="text-sm text-slate-400 mb-5">Check every statement that applies to the call, text, or email you received:</p>
                    <div className="space-y-3">
                      {CHECKLIST.map(q => (
                        <label key={q.id} className="flex items-start gap-3 cursor-pointer group p-3 rounded-xl hover:bg-slate-800/40 transition-colors">
                          <input
                            type="checkbox"
                            checked={!!checkedItems[q.id]}
                            onChange={e => setCheckedItems(a => ({ ...a, [q.id]: e.target.checked }))}
                            className="w-5 h-5 mt-0.5 flex-shrink-0 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer accent-cyan-500"
                          />
                          <span className="text-slate-300 text-sm group-hover:text-white transition-colors leading-relaxed">{q.text}</span>
                        </label>
                      ))}
                    </div>
                    {answeredCount > 0 && (
                      <p className="text-xs text-slate-500 mt-4">{answeredCount} of {CHECKLIST.length} items checked</p>
                    )}
                  </>
                )}

                {/* Agency selector */}
                <div className="mt-6">
                  <label className="block text-sm text-slate-400 mb-2">
                    Which agency were they claiming to be? <span className="text-slate-600">(optional — auto-detected from text)</span>
                  </label>
                  <select
                    value={agencyOverride}
                    onChange={e => setAgencyOverride(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                  >
                    <option value="">Auto-detect from input</option>
                    {Object.entries(AGENCIES).map(([key, a]) => (
                      <option key={key} value={key}>{a.name}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={runAnalysis}
                  disabled={mode === 'text' ? !inputText.trim() : answeredCount === 0}
                  className="w-full mt-6 flex items-center justify-center space-x-3 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Search className="w-5 h-5" />
                  <span>Analyze for Scam Signals</span>
                </button>
              </div>

              {/* Privacy note */}
              <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-5">
                <p className="text-sm text-slate-400 leading-relaxed">
                  <strong className="text-cyan-400">Privacy first:</strong> Everything runs entirely in your browser. No text, descriptions, or answers are ever sent to any server. The detection engine is a local rule-based system built from publicly available FTC and FBI scam guidance. CyberLifeCoach assumes no liability for outcomes from this analysis.
                </p>
              </div>
            </>
          ) : (
            /* ── RESULTS ────────────────────────────────────────────────── */
            <>
              {/* Verdict card */}
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-4">
                <h2 className="text-lg font-semibold text-slate-300 mb-4">Analysis result</h2>
                <VerdictBadge verdict={results.verdict} />

                {results.agency && (
                  <div className="mt-4 p-4 rounded-xl border border-slate-700 bg-slate-800/30">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Agency identified</p>
                    <p className="font-semibold text-white">{results.agency.name}</p>
                  </div>
                )}

                {/* Mobile buttons */}
                <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-slate-700/50">
                  <button onClick={handleCopyResults} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold text-sm transition-all">
                    <FileText className="w-4 h-4" /><span>Copy Results</span>
                  </button>
                  <button onClick={handlePrint} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold text-sm transition-all">
                    <Printer className="w-4 h-4" /><span>Print</span>
                  </button>
                  <button onClick={handleReset} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold text-sm transition-all">
                    <RefreshCw className="w-4 h-4" /><span>New Analysis</span>
                  </button>
                </div>
              </div>

              {/* Red flags detected */}
              <ExpandableSection
                defaultOpen
                title={`Red flags detected — ${results.triggered.length} signal${results.triggered.length !== 1 ? 's' : ''} found`}
                icon={<AlertTriangle className="w-5 h-5 text-red-400" />}
              >
                {results.triggered.length === 0 ? (
                  <div className="flex items-center space-x-3 text-green-400 text-sm">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>No known scam signals detected in the input provided. Always verify independently before taking any action.</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {results.triggered.map(flag => (
                      <div key={flag.id} className={`flex items-start gap-3 p-4 rounded-xl border ${CAT_STYLE[flag.category]}`}>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded border border-current mt-0.5 flex-shrink-0 uppercase tracking-wide`}>
                          {CAT_LABEL[flag.category]}
                        </span>
                        <p className="text-sm">{flag.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </ExpandableSection>

              {/* Next steps */}
              <ExpandableSection
                defaultOpen
                title="What to do right now"
                icon={<CheckCircle className="w-5 h-5 text-cyan-400" />}
              >
                <ol className="space-y-3">
                  {results.nextSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                      <p className="text-slate-300 text-sm leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </ExpandableSection>

              {/* Agency-specific facts */}
              {results.agency && (
                <ExpandableSection
                  defaultOpen
                  title={`What the real ${results.agency.shortName} never does`}
                  icon={<Shield className="w-5 h-5 text-blue-400" />}
                >
                  <p className="text-sm text-slate-400 mb-4">
                    Real government agencies operate by strict rules. Scammers count on you not knowing them. These are verified facts — not opinions.
                  </p>
                  <ul className="space-y-3">
                    {results.agency.neverDoes.map((fact, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-slate-300 text-sm leading-relaxed">
                          The {results.agency.shortName} will <strong className="text-red-400">never</strong> {fact.toLowerCase()}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {/* Official contact */}
                  <div className="mt-5 p-4 rounded-xl border border-cyan-500/20 bg-cyan-900/10">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Real {results.agency.shortName} contact</p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <div className="flex items-center gap-2 text-cyan-400">
                        <Phone className="w-4 h-4" />
                        <span className="font-mono font-semibold">{results.agency.realContact}</span>
                      </div>
                      <a
                        href={`https://${results.agency.realWebsite}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>{results.agency.realWebsite}</span>
                      </a>
                    </div>
                  </div>

                  {/* Report link */}
                  <div className="mt-3 p-4 rounded-xl border border-slate-700 bg-slate-800/30">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Report this scam</p>
                    <a
                      href={results.agency.reportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{results.agency.reportName}</span>
                    </a>
                    <p className="text-xs text-slate-500 mt-1">Reporting helps protect others — especially seniors and families who are most targeted by these calls.</p>
                  </div>
                </ExpandableSection>
              )}

              {/* Generic report links if no agency detected */}
              {!results.agency && results.verdict.level !== 'clean' && (
                <ExpandableSection
                  title="Where to report this scam"
                  icon={<ExternalLink className="w-5 h-5 text-cyan-400" />}
                >
                  <div className="space-y-3">
                    {[
                      { name: 'FTC Report Fraud', url: 'https://reportfraud.ftc.gov', desc: 'Primary reporting site for all government impersonation scams' },
                      { name: 'FBI Internet Crime Complaint Center (IC3)', url: 'https://www.ic3.gov', desc: 'For scams involving wire fraud, online fraud, or email' },
                      { name: 'USA.gov Scam Reporting', url: 'https://www.usa.gov/stop-scams-frauds', desc: 'Guides you to the right agency for your specific situation' },
                    ].map((r, i) => (
                      <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-start gap-3 p-4 rounded-xl border border-slate-700 hover:border-cyan-500/40 transition-colors group">
                        <ExternalLink className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">{r.name}</p>
                          <p className="text-xs text-slate-400">{r.desc}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </ExpandableSection>
              )}

              {/* Share with family */}
              <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-2xl p-6 mt-2">
                <h3 className="font-semibold text-white mb-2">Share this tool with someone who needs it</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Seniors and non-technical family members are the most targeted by these scams. This tool is designed to be easy enough for anyone to use — no accounts, no downloads, free.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Digital Footprint Scanner',       href: '/tools/digital-footprint-scanner',  desc: 'See what\'s already exposed about you online' },
                    { label: 'Breach Exposure Lookup',          href: '/tools/breach-lookup',              desc: 'Check if your email appeared in a data breach' },
                    { label: 'Personal Privacy Playbook',       href: '/tools/privacy-playbook-generator', desc: 'Your custom 4-week privacy action plan' },
                    { label: 'Email Header Analyzer',           href: '/tools/email-header-analyzer',      desc: 'Trace the real sender of a suspicious email' },
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
            <p>&copy; {new Date().getFullYear()} CyberLifeCoach</p>
            <p className="text-slate-600">Analysis runs entirely in your browser. No data is stored or transmitted.</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Toast */}
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
