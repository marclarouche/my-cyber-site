import React, { useState } from 'react';
import {
  Shield, Lock, AlertTriangle, CheckCircle, XCircle, ChevronRight,
  ChevronLeft, BarChart2, FileText, Download, Calendar, Users,
  Code, Server, Eye, RefreshCw, Award, Zap, AlertCircle, Info, ArrowLeft
} from 'lucide-react';

// ── Scoring Engine ────────────────────────────────────────────────────────────

const EXEC_QUESTIONS = [
  {
    id: 'eq1',
    question: 'Does your organization maintain an inventory of all externally accessible APIs?',
    context: 'Includes public, partner, and internal APIs exposed outside the perimeter.',
    options: [
      { label: 'Yes, fully documented and reviewed regularly', score: 0 },
      { label: 'Partially — some APIs are documented', score: 2 },
      { label: 'No formal inventory exists', score: 4 },
      { label: 'Unknown', score: 3 },
    ],
  },
  {
    id: 'eq2',
    question: 'Are object-level authorization checks centrally enforced across your APIs?',
    context: 'Centralized enforcement means a shared middleware or gateway layer validates access — not individual services.',
    options: [
      { label: 'Yes, via a centralized gateway or middleware', score: 0 },
      { label: 'Partially — some services handle it independently', score: 2 },
      { label: 'No — each team implements their own checks', score: 4 },
      { label: 'We rely on authentication only', score: 5 },
    ],
  },
  {
    id: 'eq3',
    question: 'Has your organization tested for object ID enumeration vulnerabilities in the last 12 months?',
    context: 'This includes penetration testing, red team exercises, or automated API security scanning.',
    options: [
      { label: 'Yes, formal testing with documented results', score: 0 },
      { label: 'Informal testing only', score: 2 },
      { label: 'No testing has been conducted', score: 4 },
      { label: 'Not sure', score: 3 },
    ],
  },
  {
    id: 'eq4',
    question: 'Do background jobs and scheduled tasks revalidate user permissions before processing?',
    context: 'Background processes that access user data must verify current permissions — not cached credentials.',
    options: [
      { label: 'Yes, permissions are always revalidated', score: 0 },
      { label: 'Sometimes, depending on the task', score: 2 },
      { label: 'No — background jobs assume prior authorization', score: 4 },
      { label: 'We have no background jobs accessing user data', score: 0 },
    ],
  },
  {
    id: 'eq5',
    question: 'Is API activity logging monitored for sequential or high-velocity object ID access patterns?',
    context: 'Attackers exploiting BOLA often iterate through IDs rapidly. This pattern should trigger alerts.',
    options: [
      { label: 'Yes, with automated alerting in place', score: 0 },
      { label: 'Logs exist but are not actively monitored', score: 2 },
      { label: 'No logging or monitoring for this pattern', score: 4 },
      { label: 'Unknown', score: 3 },
    ],
  },
];

const DEV_QUESTIONS = [
  {
    id: 'dq1',
    category: 'Object Identification Design',
    question: 'What type of object identifiers does your API primarily use?',
    context: 'Sequential integers are trivially enumerable. UUIDs or non-sequential IDs reduce enumeration risk.',
    options: [
      { label: 'Non-sequential UUIDs or random identifiers', score: 0 },
      { label: 'Mixed — some sequential, some random', score: 2 },
      { label: 'Sequential integers (e.g. /user/1001, /user/1002)', score: 5 },
      { label: 'External identifiers (VINs, SSNs, account numbers)', score: 4 },
    ],
  },
  {
    id: 'dq2',
    category: 'Ownership Validation Logic',
    question: 'When does your API validate object ownership relative to data retrieval?',
    context: 'Authorization must happen BEFORE data is fetched. Post-retrieval checks still expose data in memory.',
    options: [
      { label: 'Ownership validated inside the database query (WHERE user_id = :current_user)', score: 0 },
      { label: 'Authorization checked before fetching data', score: 1 },
      { label: 'Authorization checked after fetching data', score: 4 },
      { label: 'No explicit ownership validation', score: 5 },
    ],
  },
  {
    id: 'dq3',
    category: 'Access Control Model',
    question: 'What access control model does your API use?',
    context: 'Attribute-based access control (ABAC) provides the most granular object-level protection.',
    options: [
      { label: 'Attribute-based (ABAC) — checks ownership, role, context', score: 0 },
      { label: 'Role-based (RBAC) — checks user role only', score: 2 },
      { label: 'Authentication-only — logged in = access granted', score: 5 },
      { label: 'No formal model', score: 5 },
    ],
  },
  {
    id: 'dq4',
    category: 'Query-Level Enforcement',
    question: 'Are user ID constraints included directly in database queries for object retrieval?',
    context: 'Example: SELECT * FROM orders WHERE id = ? AND user_id = ? prevents cross-user access at the DB layer.',
    options: [
      { label: 'Yes, always — user_id is always part of the WHERE clause', score: 0 },
      { label: 'Usually, but not consistently across all endpoints', score: 2 },
      { label: 'No — we fetch by object ID and check ownership separately', score: 4 },
      { label: 'No query-level controls exist', score: 5 },
    ],
  },
  {
    id: 'dq5',
    category: 'Background Task Authorization',
    question: 'How do your background/async tasks handle object-level authorization?',
    context: 'Queued jobs that process user objects must carry and validate authorization context.',
    options: [
      { label: 'Authorization context is passed and validated with each job', score: 0 },
      { label: 'Jobs validate permissions at start but not per-object', score: 2 },
      { label: 'Background tasks run with elevated/system permissions', score: 4 },
      { label: 'No authorization in background tasks', score: 5 },
    ],
  },
  {
    id: 'dq6',
    category: 'Service-to-Service Authorization',
    question: 'When microservices call each other, is object-level authorization re-validated?',
    context: 'Internal service calls are a common BOLA blind spot. Each service must validate — never trust upstream.',
    options: [
      { label: 'Yes, each service validates independently', score: 0 },
      { label: 'Partially — some services trust upstream validation', score: 2 },
      { label: 'Internal calls are fully trusted without validation', score: 5 },
      { label: 'We have a monolith — not applicable', score: 0 },
    ],
  },
  {
    id: 'dq7',
    category: 'Client-Supplied Identity',
    question: 'Does your API trust client-supplied user IDs in request bodies or parameters?',
    context: 'Trusting client-supplied user IDs without server-side verification is a critical BOLA pattern.',
    options: [
      { label: 'Never — user identity is always derived from the auth token server-side', score: 0 },
      { label: 'Rarely, with additional validation', score: 2 },
      { label: 'Sometimes for convenience', score: 4 },
      { label: 'Yes — client-supplied IDs are used directly', score: 5 },
    ],
  },
];

function calcRiskTier(score, max) {
  const pct = score / max;
  if (pct <= 0.25) return { tier: 'Low', color: 'text-emerald-400', bg: 'bg-emerald-500', border: 'border-emerald-500/40', glow: 'shadow-emerald-500/20' };
  if (pct <= 0.55) return { tier: 'Moderate', color: 'text-amber-400', bg: 'bg-amber-500', border: 'border-amber-500/40', glow: 'shadow-amber-500/20' };
  return { tier: 'High', color: 'text-red-400', bg: 'bg-red-500', border: 'border-red-500/40', glow: 'shadow-red-500/20' };
}

function generateExecSummary(answers, tier) {
  const findings = [];
  if (answers.eq1 >= 2) findings.push('API inventory gaps leave unknown attack surface exposed.');
  if (answers.eq2 >= 2) findings.push('Decentralized authorization enforcement creates inconsistent protection.');
  if (answers.eq3 >= 2) findings.push('Lack of recent enumeration testing means vulnerabilities may go undetected.');
  if (answers.eq4 >= 2) findings.push('Background jobs may process data with stale or unchecked permissions.');
  if (answers.eq5 >= 2) findings.push('No alerting on sequential object access leaves enumeration attacks invisible.');

  const regulatory = tier.tier === 'High'
    ? 'Your current posture presents material risk of GDPR, CCPA, or HIPAA violations depending on your data types. Object-level authorization failures are not treated as configuration errors by regulators — they are treated as access control failures.'
    : tier.tier === 'Moderate'
    ? 'Partial controls reduce but do not eliminate regulatory exposure. Framework alignment with ISO 27001 and NIST SP 800-53 requires consistent enforcement, not selective implementation.'
    : 'Your controls indicate reasonable alignment with access control requirements under major frameworks. Continued testing and monitoring will maintain this posture.';

  return { findings, regulatory };
}

function generateDevFindings(answers) {
  const flags = [];
  if (answers.dq1 >= 4) flags.push({ severity: 'critical', text: 'Sequential integer IDs detected — trivial enumeration possible', fix: 'Migrate to UUIDs or non-sequential identifiers. Apply rate limiting on object-lookup endpoints immediately.' });
  if (answers.dq2 >= 3) flags.push({ severity: 'critical', text: 'Authorization occurs after data retrieval — data exposed in memory', fix: 'Move ownership validation INTO the database query using WHERE user_id = :current_user_id.' });
  if (answers.dq3 >= 4) flags.push({ severity: 'critical', text: 'Authentication-only model — no object-level authorization enforced', fix: 'Implement ABAC or at minimum ownership checks. Authentication ≠ Authorization.' });
  if (answers.dq4 >= 3) flags.push({ severity: 'high', text: 'User ID constraints missing from database queries', fix: 'Add user_id to all WHERE clauses for user-owned objects. Never rely on post-fetch ownership checks.' });
  if (answers.dq5 >= 3) flags.push({ severity: 'high', text: 'Background tasks running without per-object authorization', fix: 'Pass authorization context with each job. Validate permissions for each object processed, not just at job start.' });
  if (answers.dq6 >= 3) flags.push({ severity: 'high', text: 'Internal service calls trusted without re-validation', fix: 'Implement zero-trust between services. Each microservice must validate object access independently.' });
  if (answers.dq7 >= 3) flags.push({ severity: 'critical', text: 'Client-supplied user IDs trusted in requests', fix: 'Never trust client-supplied identity. Always derive user identity server-side from the authenticated token.' });
  return flags;
}

// ── PDF Generation (client-side via print) ────────────────────────────────────
function downloadReport(type, execAnswers, devAnswers, execTier, devTier, execSummary, devFlags) {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const isExec = type === 'executive';

  const html = isExec ? `
<!DOCTYPE html><html><head><meta charset="utf-8">
<title>CyberLife API Authorization Health Check — Executive Summary</title>
<style>
  body { font-family: Georgia, serif; max-width: 750px; margin: 40px auto; color: #1e293b; line-height: 1.7; }
  h1 { font-size: 24px; color: #0e7490; border-bottom: 2px solid #0e7490; padding-bottom: 8px; }
  h2 { font-size: 18px; color: #1e293b; margin-top: 32px; }
  .tier { display: inline-block; padding: 6px 18px; border-radius: 999px; font-weight: bold; font-size: 18px; margin: 8px 0;
    background: ${execTier.tier === 'High' ? '#fee2e2' : execTier.tier === 'Moderate' ? '#fef9c3' : '#d1fae5'};
    color: ${execTier.tier === 'High' ? '#dc2626' : execTier.tier === 'Moderate' ? '#d97706' : '#059669'}; }
  .finding { background: #f8fafc; border-left: 4px solid #0e7490; padding: 10px 16px; margin: 8px 0; border-radius: 0 6px 6px 0; }
  .regulatory { background: #f0f9ff; border: 1px solid #bae6fd; padding: 16px; border-radius: 8px; margin-top: 16px; }
  .footer { margin-top: 48px; border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #64748b; }
  .logo { font-size: 20px; font-weight: bold; color: #0e7490; }
  table { width: 100%; border-collapse: collapse; margin-top: 12px; }
  td, th { padding: 8px 12px; border: 1px solid #e2e8f0; font-size: 14px; }
  th { background: #f1f5f9; font-weight: 600; }
</style></head><body>
<div class="logo">CyberLifeCoach</div>
<p style="color:#64748b;font-size:13px;">CyberLife API Authorization Intelligence | ${date}</p>
<h1>API Object Authorization Health Check<br>Executive Risk Summary</h1>
<p>This report summarizes the results of a BOLA (Broken Object Level Authorization) risk assessment completed via the CyberLife API Authorization Health Check tool. It is intended for IT leadership, CISOs, and technical directors.</p>
<h2>Overall Risk Tier</h2>
<div class="tier">${execTier.tier} Risk</div>
<p>Score: ${Object.values(execAnswers).reduce((a,b)=>a+b,0)} / ${EXEC_QUESTIONS.length * 5}</p>
<h2>Key Findings</h2>
${execSummary.findings.length ? execSummary.findings.map(f => `<div class="finding">⚠ ${f}</div>`).join('') : '<div class="finding">✓ No critical findings detected at the executive layer.</div>'}
<h2>Regulatory & Compliance Implications</h2>
<div class="regulatory">${execSummary.regulatory}</div>
<h2>Framework Alignment</h2>
<table>
  <tr><th>Framework</th><th>Relevant Control</th><th>Status</th></tr>
  <tr><td>ISO 27001</td><td>A.9 Access Control</td><td>${execTier.tier === 'Low' ? '✓ Likely aligned' : '⚠ Review required'}</td></tr>
  <tr><td>NIST SP 800-53</td><td>AC-3 Access Enforcement</td><td>${execTier.tier === 'Low' ? '✓ Likely aligned' : '⚠ Review required'}</td></tr>
  <tr><td>OWASP API Top 10</td><td>API1:2023 BOLA</td><td>${execTier.tier === 'High' ? '✗ Not addressed' : execTier.tier === 'Moderate' ? '⚠ Partially addressed' : '✓ Controls present'}</td></tr>
  <tr><td>GDPR</td><td>Art. 32 Security of Processing</td><td>${execTier.tier === 'High' ? '⚠ Potential exposure' : '✓ Controls present'}</td></tr>
</table>
<h2>Recommended Next Steps</h2>
<ol>
  <li>Commission a focused API security assessment targeting object-level authorization.</li>
  <li>Require development teams to map all API endpoints against OWASP API Top 10.</li>
  <li>Implement centralized API gateway-level authorization enforcement.</li>
  <li>Establish quarterly API security testing cadence including enumeration testing.</li>
</ol>
<div class="footer">
  <strong>CyberLifeCoach</strong> — Expert cybersecurity consulting for the privacy-conscious. Veteran-owned.<br>
  This assessment is for informational purposes only and does not constitute professional security advice.<br>
  Schedule a consultation: <a href="https://calendly.com/cyberlifecoach-proton/new-meeting">calendly.com/cyberlifecoach-proton/new-meeting</a>
</div>
</body></html>` : `
<!DOCTYPE html><html><head><meta charset="utf-8">
<title>CyberLife API Authorization Health Check — Technical Report</title>
<style>
  body { font-family: 'Courier New', monospace; max-width: 750px; margin: 40px auto; color: #1e293b; line-height: 1.7; }
  h1 { font-size: 22px; color: #0e7490; border-bottom: 2px solid #0e7490; padding-bottom: 8px; font-family: Georgia, serif; }
  h2 { font-size: 16px; color: #1e293b; margin-top: 28px; font-family: Georgia, serif; }
  .tier { display: inline-block; padding: 6px 18px; border-radius: 999px; font-weight: bold; font-size: 16px; margin: 8px 0;
    background: ${devTier.tier === 'High' ? '#fee2e2' : devTier.tier === 'Moderate' ? '#fef9c3' : '#d1fae5'};
    color: ${devTier.tier === 'High' ? '#dc2626' : devTier.tier === 'Moderate' ? '#d97706' : '#059669'}; }
  .flag-critical { background: #fff1f2; border-left: 4px solid #dc2626; padding: 12px 16px; margin: 10px 0; border-radius: 0 6px 6px 0; }
  .flag-high { background: #fffbeb; border-left: 4px solid #d97706; padding: 12px 16px; margin: 10px 0; border-radius: 0 6px 6px 0; }
  .fix { background: #f0fdf4; border: 1px solid #bbf7d0; padding: 10px; margin-top: 8px; border-radius: 4px; font-size: 13px; }
  code { background: #f1f5f9; padding: 2px 6px; border-radius: 3px; font-size: 13px; }
  .footer { margin-top: 48px; border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #64748b; font-family: Georgia, serif; }
  .logo { font-size: 20px; font-weight: bold; color: #0e7490; font-family: Georgia, serif; }
  table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px; }
  td, th { padding: 8px 12px; border: 1px solid #e2e8f0; }
  th { background: #f1f5f9; font-weight: 600; }
</style></head><body>
<div class="logo">CyberLifeCoach</div>
<p style="color:#64748b;font-size:12px;font-family:Georgia,serif;">CyberLife API Authorization Intelligence | ${date}</p>
<h1>API Object Authorization Health Check<br>Technical Remediation Report</h1>
<p style="font-family:Georgia,serif;">This report details developer-layer findings from the BOLA risk assessment. It is intended for development teams, DevSecOps engineers, and security architects.</p>
<h2>Authorization Architecture Score</h2>
<div class="tier">${devTier.tier} Risk</div>
<p>Score: ${Object.values(devAnswers).reduce((a,b)=>a+b,0)} / ${DEV_QUESTIONS.length * 5}</p>
<h2>Findings & Remediation</h2>
${devFlags.length ? devFlags.map(f => `
<div class="flag-${f.severity}">
  <strong>[${f.severity.toUpperCase()}]</strong> ${f.text}
  <div class="fix">🔧 <strong>Fix:</strong> ${f.fix}</div>
</div>`).join('') : '<p style="color:#059669;">✓ No critical developer-layer findings detected.</p>'}
<h2>Architecture Recommendations</h2>
<table>
  <tr><th>Pattern</th><th>Risk</th><th>Recommended Approach</th></tr>
  <tr><td>Sequential IDs</td><td>Critical</td><td>Use UUIDs v4 or ULID</td></tr>
  <tr><td>Post-fetch auth checks</td><td>Critical</td><td><code>WHERE id=? AND user_id=?</code> in query</td></tr>
  <tr><td>Client-supplied user ID</td><td>Critical</td><td>Always derive identity from JWT/session server-side</td></tr>
  <tr><td>Scattered auth logic</td><td>High</td><td>Centralize in middleware or API gateway</td></tr>
  <tr><td>Trusted internal calls</td><td>High</td><td>Zero-trust: validate per service, per request</td></tr>
</table>
<h2>OWASP API Security Top 10 Alignment</h2>
<p>This assessment targets <strong>API1:2023 — Broken Object Level Authorization</strong>. Additional OWASP categories to review:</p>
<ul>
  <li>API3:2023 — Broken Object Property Level Authorization</li>
  <li>API5:2023 — Broken Function Level Authorization</li>
  <li>API8:2023 — Security Misconfiguration</li>
</ul>
<div class="footer">
  <strong>CyberLifeCoach</strong> — Expert cybersecurity consulting for the privacy-conscious. Veteran-owned.<br>
  This assessment is for informational purposes only and does not constitute professional security advice.<br>
  Schedule a consultation: <a href="https://calendly.com/cyberlifecoach-proton/new-meeting">calendly.com/cyberlifecoach-proton/new-meeting</a>
</div>
</body></html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const w = window.open(url, '_blank');
  if (w) setTimeout(() => w.print(), 800);
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function APIAuthorizationHealthCheck() {
  const [mode, setMode] = useState('landing'); // landing | exec | dev | results
  const [execStep, setExecStep] = useState(0);
  const [devStep, setDevStep] = useState(0);
  const [execAnswers, setExecAnswers] = useState({});
  const [devAnswers, setDevAnswers] = useState({});
  const [completedLayers, setCompletedLayers] = useState([]);

  const execScore = Object.values(execAnswers).reduce((a, b) => a + b, 0);
  const devScore = Object.values(devAnswers).reduce((a, b) => a + b, 0);
  const execMax = EXEC_QUESTIONS.length * 5;
  const devMax = DEV_QUESTIONS.length * 5;
  const execTier = calcRiskTier(execScore, execMax);
  const devTier = calcRiskTier(devScore, devMax);
  const execSummary = generateExecSummary(execAnswers, execTier);
  const devFlags = generateDevFindings(devAnswers);

  const handleExecAnswer = (qId, score) => {
    setExecAnswers(prev => ({ ...prev, [qId]: score }));
  };

  const handleDevAnswer = (qId, score) => {
    setDevAnswers(prev => ({ ...prev, [qId]: score }));
  };

  const finishExec = () => {
    setCompletedLayers(prev => [...new Set([...prev, 'exec'])]);
    setMode('results');
  };

  const finishDev = () => {
    setCompletedLayers(prev => [...new Set([...prev, 'dev'])]);
    setMode('results');
  };

  const reset = () => {
    setMode('landing');
    setExecStep(0);
    setDevStep(0);
    setExecAnswers({});
    setDevAnswers({});
    setCompletedLayers([]);
  };

  // ── Styles ──
  const s = {
    page: "relative min-h-screen bg-slate-950 text-slate-100",
    card: "bg-slate-900/70 backdrop-blur-sm border border-slate-800 rounded-2xl p-8",
    cardHover: "bg-slate-900/70 backdrop-blur-sm border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-8 transition-all duration-300 cursor-pointer group",
    btn: "bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 flex items-center space-x-2",
    btnOutline: "border border-slate-700 px-6 py-3 rounded-xl font-semibold hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 flex items-center space-x-2",
    optionBase: "w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer text-sm leading-relaxed",
    optionUnselected: "border-slate-700 bg-slate-900/50 hover:border-cyan-500/40 hover:bg-slate-800/50",
    optionSelected: "border-cyan-500 bg-cyan-500/10 text-cyan-300",
  };

  // ── Nav ──
  const Nav = () => (
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
  );

  // ── Landing ──
  if (mode === 'landing') return (
    <div className={s.page}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.5s ease both; }
        .fade-up-1 { animation: fadeUp 0.5s 0.1s ease both; }
        .fade-up-2 { animation: fadeUp 0.5s 0.2s ease both; }
        .fade-up-3 { animation: fadeUp 0.5s 0.3s ease both; }
        @keyframes pulse-ring { 0%,100%{box-shadow:0 0 0 0 rgba(34,211,238,0.3)} 50%{box-shadow:0 0 0 16px rgba(34,211,238,0)} }
        .pulse-ring { animation: pulse-ring 2.5s ease-in-out infinite; }
      `}</style>
      <Nav />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
      <main className="relative max-w-4xl mx-auto px-4 py-16 pt-32">
        <div className="text-center mb-16 fade-up">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 pulse-ring">
              <Shield className="w-10 h-10 text-cyan-400" />
            </div>
          </div>
          <div className="inline-flex items-center space-x-3 bg-cyan-500/10 border border-cyan-500/20 px-5 py-2 rounded-full text-cyan-400 text-sm font-medium mb-6">
            <Zap className="w-3.5 h-3.5 flex-shrink-0" />
            <span>CyberLife API Authorization Intelligence</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            API Object Authorization<br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Health Check</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-3">
            A dual-layer assessment tool that produces both an executive-ready risk summary and a developer-facing technical breakdown.
          </p>
          <p className="text-slate-500 text-sm italic">Because authentication tells you who someone is. Authorization decides what they can touch.</p>
        </div>

        {/* Layer cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10 fade-up-1">
          <button onClick={() => setMode('exec')} className={`${s.cardHover} text-left`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-blue-500/30 group-hover:border-blue-400/50 transition-all">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Layer 1</div>
                <h2 className="text-lg font-bold text-slate-100">Executive Risk Snapshot</h2>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">For IT managers, CISOs, and technical directors. Translates BOLA risk into business language with regulatory implications.</p>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4 text-slate-500">
                <span className="flex items-center space-x-1"><FileText className="w-3.5 h-3.5" /><span>5 questions</span></span>
                <span>~5 min</span>
              </div>
              <div className="flex items-center space-x-1 text-cyan-400 group-hover:text-cyan-300 font-medium">
                <span>Start</span><ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            {completedLayers.includes('exec') && (
              <div className="mt-3 flex items-center space-x-2 text-emerald-400 text-sm">
                <CheckCircle className="w-4 h-4" /><span>Completed</span>
              </div>
            )}
          </button>

          <button onClick={() => setMode('dev')} className={`${s.cardHover} text-left`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-600/20 border border-cyan-500/30 group-hover:border-cyan-400/50 transition-all">
                <Code className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Layer 2</div>
                <h2 className="text-lg font-bold text-slate-100">Developer Deep Dive</h2>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">For developers, DevSecOps, and architects. Endpoint-level risk flags, code patterns, and remediation guidance.</p>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4 text-slate-500">
                <span className="flex items-center space-x-1"><Code className="w-3.5 h-3.5" /><span>7 questions</span></span>
                <span>~15 min</span>
              </div>
              <div className="flex items-center space-x-1 text-cyan-400 group-hover:text-cyan-300 font-medium">
                <span>Start</span><ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            {completedLayers.includes('dev') && (
              <div className="mt-3 flex items-center space-x-2 text-emerald-400 text-sm">
                <CheckCircle className="w-4 h-4" /><span>Completed</span>
              </div>
            )}
          </button>
        </div>

        {completedLayers.length > 0 && (
          <div className="text-center fade-up-2">
            <button onClick={() => setMode('results')} className={`${s.btn} mx-auto`}>
              <BarChart2 className="w-5 h-5" />
              <span>View Results Dashboard</span>
            </button>
          </div>
        )}

        {/* What is BOLA */}
        <div className="mt-16 fade-up-3">
          <div className="bg-gradient-to-br from-cyan-900/10 to-blue-900/10 border border-cyan-500/15 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-slate-200 mb-2">What is BOLA?</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Broken Object Level Authorization (BOLA) is the #1 API vulnerability in the OWASP API Security Top 10.
                  It occurs when an API fails to verify that the authenticated user has permission to access a specific object —
                  allowing attackers to simply change an ID in a request to access data belonging to other users.
                  Real-world victims include Peloton, Optus, Experian, T-Mobile, and Instagram.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
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
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );

  // ── Question UI (shared for exec + dev) ──
  const renderQuestion = (questions, step, answers, onAnswer, onBack, onNext, onFinish, layerLabel, layerIcon) => {
    const q = questions[step];
    const answered = answers[q.id] !== undefined;
    const isLast = step === questions.length - 1;
    const progress = ((step) / questions.length) * 100;

    return (
      <div className={s.page}>
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}.fade-up{animation:fadeUp 0.4s ease both}`}</style>
        <Nav />
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        <main className="max-w-2xl mx-auto px-4 py-10 pt-32">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-8">
            <button onClick={onBack} className="text-slate-400 hover:text-cyan-400 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <div className="flex items-center space-x-2 text-xs text-slate-500 uppercase tracking-wider mb-2">
                {layerIcon}
                <span>{layerLabel}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full transition-all duration-500"
                  style={{width: `${progress}%`}} />
              </div>
            </div>
            <span className="text-slate-500 text-sm font-mono">{step + 1}/{questions.length}</span>
          </div>

          {/* Question card */}
          <div className={`${s.card} fade-up`}>
            {q.category && (
              <div className="inline-flex items-center space-x-1.5 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full text-cyan-400 text-xs font-medium mb-4">
                <span>{q.category}</span>
              </div>
            )}
            <h2 className="text-xl font-bold text-slate-100 mb-3 leading-snug">{q.question}</h2>
            <div className="flex items-start space-x-2 bg-slate-800/50 rounded-lg p-3 mb-6">
              <Info className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
              <p className="text-slate-500 text-sm leading-relaxed">{q.context}</p>
            </div>
            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => onAnswer(q.id, opt.score)}
                  className={`${s.optionBase} ${answers[q.id] === opt.score ? s.optionSelected : s.optionUnselected}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${answers[q.id] === opt.score ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'}`}>
                      {answers[q.id] === opt.score && <div className="w-2 h-2 rounded-full bg-slate-950" />}
                    </div>
                    <span>{opt.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Nav buttons */}
          <div className="flex justify-between mt-6">
            <button onClick={step > 0 ? () => onNext(-1) : onBack} className={s.btnOutline}>
              <ChevronLeft className="w-4 h-4" /><span>Back</span>
            </button>
            {answered && (
              isLast
                ? <button onClick={onFinish} className={s.btn}>
                    <span>View Results</span><BarChart2 className="w-4 h-4" />
                  </button>
                : <button onClick={() => onNext(1)} className={s.btn}>
                    <span>Next</span><ChevronRight className="w-4 h-4" />
                  </button>
            )}
          </div>
        </main>

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
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    );
  };

  if (mode === 'exec') return renderQuestion(
    EXEC_QUESTIONS, execStep, execAnswers, handleExecAnswer,
    () => setMode('landing'),
    (dir) => setExecStep(s => s + dir),
    finishExec,
    'Executive Risk Snapshot',
    <Users className="w-3.5 h-3.5" />
  );

  if (mode === 'dev') return renderQuestion(
    DEV_QUESTIONS, devStep, devAnswers, handleDevAnswer,
    () => setMode('landing'),
    (dir) => setDevStep(s => s + dir),
    finishDev,
    'Developer Deep Dive',
    <Code className="w-3.5 h-3.5" />
  );

  // ── Results Dashboard ──
  if (mode === 'results') {
    const hasExec = completedLayers.includes('exec');
    const hasDev = completedLayers.includes('dev');

    const RiskMeter = ({ tier, score, max, label }) => {
      const pct = Math.round((score / max) * 100);
      return (
        <div className={`${s.card} border ${tier.border} shadow-lg ${tier.glow}`}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm font-medium">{label}</span>
            <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 ${tier.color}`}>{tier.tier} Risk</span>
          </div>
          <div className="relative pt-2">
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Low</span><span>Moderate</span><span>High</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3">
              <div className={`${tier.bg} h-3 rounded-full transition-all duration-1000`} style={{width:`${pct}%`}} />
            </div>
            <div className="flex justify-between text-xs text-slate-600 mt-1">
              <span>0</span><span>{max}</span>
            </div>
          </div>
          <div className="mt-3 text-center">
            <span className={`text-3xl font-bold font-mono ${tier.color}`}>{score}</span>
            <span className="text-slate-600 text-sm">/{max}</span>
          </div>
        </div>
      );
    };

    return (
      <div className={s.page}>
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}.fade-up{animation:fadeUp 0.5s ease both}.fade-up-1{animation:fadeUp 0.5s 0.1s ease both}.fade-up-2{animation:fadeUp 0.5s 0.2s ease both}.fade-up-3{animation:fadeUp 0.5s 0.3s ease both}`}</style>
        <Nav />
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        <main className="max-w-5xl mx-auto px-4 py-12 pt-32">

          {/* Header */}
          <div className="flex items-center justify-between mb-10 fade-up">
            <div>
              <h1 className="text-3xl font-bold mb-1">Assessment Results</h1>
              <p className="text-slate-400 text-sm">CyberLife API Authorization Health Check — {new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</p>
            </div>
            <button onClick={reset} className={s.btnOutline}>
              <RefreshCw className="w-4 h-4" /><span>Restart</span>
            </button>
          </div>

          {/* Risk meters */}
          <div className="grid md:grid-cols-2 gap-6 mb-8 fade-up-1">
            {hasExec
              ? <RiskMeter tier={execTier} score={execScore} max={execMax} label="Executive Layer" />
              : <div className={`${s.card} flex flex-col items-center justify-center text-center py-12`}>
                  <Users className="w-8 h-8 text-slate-600 mb-3" />
                  <p className="text-slate-500 mb-4">Executive layer not completed</p>
                  <button onClick={() => setMode('exec')} className={s.btn}><span>Start Now</span><ChevronRight className="w-4 h-4" /></button>
                </div>
            }
            {hasDev
              ? <RiskMeter tier={devTier} score={devScore} max={devMax} label="Developer Layer" />
              : <div className={`${s.card} flex flex-col items-center justify-center text-center py-12`}>
                  <Code className="w-8 h-8 text-slate-600 mb-3" />
                  <p className="text-slate-500 mb-4">Developer layer not completed</p>
                  <button onClick={() => setMode('dev')} className={s.btn}><span>Start Now</span><ChevronRight className="w-4 h-4" /></button>
                </div>
            }
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Executive findings */}
            {hasExec && (
              <div className={`${s.card} fade-up-1`}>
                <div className="flex items-center space-x-2 mb-5">
                  <Users className="w-5 h-5 text-blue-400" />
                  <h2 className="font-bold text-slate-200">Executive Findings</h2>
                </div>
                {execSummary.findings.length === 0
                  ? <div className="flex items-center space-x-2 text-emerald-400 text-sm"><CheckCircle className="w-4 h-4" /><span>No critical executive-layer findings.</span></div>
                  : <div className="space-y-3">
                      {execSummary.findings.map((f, i) => (
                        <div key={i} className="flex items-start space-x-3 bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                          <p className="text-slate-300 text-sm leading-relaxed">{f}</p>
                        </div>
                      ))}
                    </div>
                }
                <div className="mt-5 pt-5 border-t border-slate-800">
                  <p className="text-slate-500 text-xs leading-relaxed">{execSummary.regulatory}</p>
                </div>
              </div>
            )}

            {/* Developer flags */}
            {hasDev && (
              <div className={`${s.card} fade-up-2`}>
                <div className="flex items-center space-x-2 mb-5">
                  <Code className="w-5 h-5 text-cyan-400" />
                  <h2 className="font-bold text-slate-200">Developer Flags</h2>
                </div>
                {devFlags.length === 0
                  ? <div className="flex items-center space-x-2 text-emerald-400 text-sm"><CheckCircle className="w-4 h-4" /><span>No critical developer-layer findings.</span></div>
                  : <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                      {devFlags.map((f, i) => (
                        <div key={i} className={`rounded-xl p-4 border ${f.severity === 'critical' ? 'bg-red-500/5 border-red-500/25' : 'bg-amber-500/5 border-amber-500/25'}`}>
                          <div className="flex items-start space-x-2 mb-2">
                            {f.severity === 'critical'
                              ? <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                              : <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                            }
                            <span className={`text-xs font-bold uppercase tracking-wider ${f.severity === 'critical' ? 'text-red-400' : 'text-amber-400'}`}>{f.severity}</span>
                          </div>
                          <p className="text-slate-300 text-sm mb-2">{f.text}</p>
                          <div className="bg-slate-800/60 rounded-lg p-3">
                            <p className="text-slate-400 text-xs leading-relaxed"><span className="text-cyan-400 font-medium">Fix: </span>{f.fix}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                }
              </div>
            )}
          </div>

          {/* Framework alignment */}
          {hasExec && (
            <div className={`${s.card} mb-8 fade-up-2`}>
              <div className="flex items-center space-x-2 mb-5">
                <Award className="w-5 h-5 text-cyan-400" />
                <h2 className="font-bold text-slate-200">Framework Alignment</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'ISO 27001', control: 'A.9 Access Control', ok: execTier.tier === 'Low' },
                  { name: 'NIST SP 800-53', control: 'AC-3 Enforcement', ok: execTier.tier === 'Low' },
                  { name: 'OWASP API Top 10', control: 'API1:2023 BOLA', ok: execTier.tier === 'Low' },
                  { name: 'GDPR', control: 'Art. 32 Security', ok: execTier.tier !== 'High' },
                ].map((fw, i) => (
                  <div key={i} className={`rounded-xl p-4 border text-center ${fw.ok ? 'border-emerald-500/25 bg-emerald-500/5' : 'border-red-500/25 bg-red-500/5'}`}>
                    {fw.ok ? <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto mb-2" /> : <AlertTriangle className="w-5 h-5 text-red-400 mx-auto mb-2" />}
                    <p className="text-slate-300 text-sm font-semibold">{fw.name}</p>
                    <p className="text-slate-500 text-xs mt-1">{fw.control}</p>
                    <p className={`text-xs font-medium mt-2 ${fw.ok ? 'text-emerald-400' : 'text-red-400'}`}>{fw.ok ? 'Likely Aligned' : 'Review Required'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Downloads */}
          {(hasExec || hasDev) && (
            <div className={`${s.card} mb-8 fade-up-3`}>
              <div className="flex items-center space-x-2 mb-5">
                <Download className="w-5 h-5 text-cyan-400" />
                <h2 className="font-bold text-slate-200">Download Reports</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {hasExec && (
                  <button
                    onClick={() => downloadReport('executive', execAnswers, devAnswers, execTier, devTier, execSummary, devFlags)}
                    className="flex items-center space-x-4 p-4 bg-slate-800/60 border border-slate-700 hover:border-cyan-500/40 rounded-xl transition-all duration-200 group text-left"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 group-hover:border-blue-400/40 transition-all">
                      <FileText className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-slate-200 font-semibold text-sm">Executive Summary</p>
                      <p className="text-slate-500 text-xs">Board-ready risk report with framework alignment</p>
                    </div>
                    <Download className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 ml-auto transition-colors" />
                  </button>
                )}
                {hasDev && (
                  <button
                    onClick={() => downloadReport('technical', execAnswers, devAnswers, execTier, devTier, execSummary, devFlags)}
                    className="flex items-center space-x-4 p-4 bg-slate-800/60 border border-slate-700 hover:border-cyan-500/40 rounded-xl transition-all duration-200 group text-left"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 group-hover:border-cyan-400/40 transition-all">
                      <Server className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-slate-200 font-semibold text-sm">Technical Remediation Report</p>
                      <p className="text-slate-500 text-xs">Developer findings, fixes & OWASP alignment</p>
                    </div>
                    <Download className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 ml-auto transition-colors" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Consulting CTA */}
          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/25 rounded-2xl p-8 text-center fade-up-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 mb-4">
              <Eye className="w-7 h-7 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">
              {(hasExec && execTier.tier !== 'Low') || (hasDev && devTier.tier !== 'Low')
                ? 'Your BOLA exposure rating suggests further review is beneficial.'
                : 'Maintain your strong security posture with expert guidance.'}
            </h3>
            <p className="text-slate-400 mb-6 max-w-xl mx-auto text-sm leading-relaxed">
              Schedule a free 30-minute API risk walkthrough with CyberLifeCoach. We'll review your specific architecture, identify authorization gaps, and provide a customized remediation roadmap.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/cyberlifecoach-proton/new-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className={`${s.btn} justify-center`}
              >
                <Calendar className="w-5 h-5" />
                <span>Book Free API Risk Walkthrough</span>
              </a>
              <button onClick={reset} className={`${s.btnOutline} justify-center`}>
                <RefreshCw className="w-4 h-4" /><span>Retake Assessment</span>
              </button>
            </div>
            <p className="text-slate-600 text-xs mt-4">30 minutes complimentary · No obligation · Veteran-owned business</p>
          </div>
        </main>

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
              <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
              <p>All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return null;
}
