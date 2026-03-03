import React, { useState } from 'react';
import { Shield, Eye, AlertTriangle, Zap, ChevronRight, CheckCircle, XCircle, MinusCircle, BarChart2 } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: "governance",
    label: "Governance & Access Control",
    Icon: Shield,
    questions: [
      { id: "rbac", text: "Is Role-Based Access Control (RBAC) enforced for your AI coworker?", hint: "Each user or role should have explicit permissions scoped to their job function.", weight: 3 },
      { id: "zdr", text: "Have you enabled Zero Data Retention (ZDR) with your AI provider?", hint: "ZDR ensures conversation data is not stored or used for model training.", weight: 3 },
      { id: "sensitive_dirs", text: "Are sensitive directories (HR, Payroll, Legal) explicitly blocked from AI access?", hint: "AI tools should operate on a least-privilege model.", weight: 2 },
      { id: "audit_log", text: "Do you have immutable audit logging enabled for all AI interactions?", hint: "Logs should be tamper-proof and retained for a defined compliance period.", weight: 2 },
      { id: "data_class", text: "Has sensitive data been classified and labeled before AI deployment?", hint: "AI systems need data classification context to enforce access boundaries.", weight: 2 },
    ],
  },
  {
    id: "monitoring",
    label: "Monitoring & Detection",
    Icon: Eye,
    questions: [
      { id: "siem", text: "Are AI activity logs forwarded to your SIEM or security monitoring platform?", hint: "Your SOC team needs AI events in the same view as other security telemetry.", weight: 3 },
      { id: "dlp", text: "Is Data Loss Prevention (DLP) interception active for AI outputs?", hint: "DLP can flag or block AI responses containing PII, credentials, or IP.", weight: 3 },
      { id: "rate_alert", text: "Do you have alerts configured for abnormal prompt volume (e.g., 50+ rapid prompts)?", hint: "Automated prompt injection attacks often operate at machine speed.", weight: 2 },
      { id: "anomaly", text: "Is behavioral anomaly detection in place for AI-connected service accounts?", hint: "Watch for unusual file access, bulk exports, or off-hours activity.", weight: 2 },
    ],
  },
  {
    id: "redteam",
    label: "Red Team Readiness",
    Icon: AlertTriangle,
    questions: [
      { id: "canary", text: "Have you deployed canary trap documents to detect unauthorized AI data access?", hint: "Canary files trigger alerts if accessed — a key indicator of prompt injection exfiltration.", weight: 3 },
      { id: "injection_test", text: "Have you tested your AI for indirect prompt injection vulnerabilities?", hint: "Malicious instructions embedded in documents can hijack AI behavior.", weight: 3 },
      { id: "exfil_test", text: "Have you verified your AI cannot be coerced into sending data to external URLs?", hint: "Exfiltration via AI-generated hyperlinks is a documented attack vector.", weight: 3 },
      { id: "scope_test", text: "Have you validated that your AI stays within its authorized operational scope?", hint: "Test whether the AI can be prompted to perform actions outside its intended role.", weight: 2 },
    ],
  },
  {
    id: "killswitch",
    label: "Kill Switch & Incident Response",
    Icon: Zap,
    questions: [
      { id: "owner", text: "Is there a named owner responsible for AI token and credential revocation?", hint: "Someone must have the authority and access to kill AI access within minutes.", weight: 2 },
      { id: "revoke_proc", text: "Do you have a documented, tested procedure for revoking AI API keys and tokens?", hint: "This procedure should be practiced — not discovered during an incident.", weight: 3 },
      { id: "isolate", text: "Can you isolate your AI integration from your network within 15 minutes?", hint: "Containment speed is critical in limiting blast radius.", weight: 3 },
      { id: "ir_plan", text: "Is your AI coworker included in your organization's Incident Response plan?", hint: "AI-specific scenarios should have defined response playbooks.", weight: 2 },
    ],
  },
];

const ANSWER_OPTIONS = [
  { value: "yes",     label: "Yes",     score: 1.0 },
  { value: "partial", label: "Partial", score: 0.5 },
  { value: "no",      label: "No",      score: 0.0 },
  { value: "na",      label: "N/A",     score: null },
];

function getMaturity(pct) {
  if (pct >= 85) return { label: "Secure",     colorClass: "text-emerald-400", borderClass: "border-emerald-500/40", bgClass: "bg-emerald-950/30", desc: "Strong AI governance posture. Maintain and continuously evolve." };
  if (pct >= 65) return { label: "Managed",    colorClass: "text-cyan-400",    borderClass: "border-cyan-500/40",    bgClass: "bg-cyan-950/30",    desc: "Good foundation with meaningful gaps to close." };
  if (pct >= 40) return { label: "Developing", colorClass: "text-amber-400",   borderClass: "border-amber-500/40",   bgClass: "bg-amber-950/30",   desc: "Partial controls in place. Prioritize your critical gaps." };
  return           { label: "At Risk",   colorClass: "text-red-400",     borderClass: "border-red-500/40",     bgClass: "bg-red-950/30",     desc: "Significant exposure. Immediate action recommended." };
}

function calcSection(section, answers) {
  let earned = 0, possible = 0;
  section.questions.forEach((q) => {
    const a = answers[q.id];
    if (a && a !== "na") {
      const opt = ANSWER_OPTIONS.find((o) => o.value === a);
      if (opt) { earned += opt.score * q.weight; }
      possible += q.weight;
    } else if (!a) {
      possible += q.weight;
    }
  });
  return possible > 0 ? earned / possible : 0;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ProgressBar({ value, colorClass = "bg-cyan-500" }) {
  return (
    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
      <div
        className={`h-full ${colorClass} rounded-full transition-all duration-700`}
        style={{ width: `${value}%`, boxShadow: '0 0 8px currentColor' }}
      />
    </div>
  );
}

function QuestionRow({ question, answer, onChange }) {
  return (
    <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors mb-4">
      <p className="text-slate-200 font-medium mb-1 leading-relaxed">{question.text}</p>
      <p className="text-slate-500 text-sm mb-4 leading-relaxed">{question.hint}</p>
      <div className="flex flex-wrap gap-2">
        {ANSWER_OPTIONS.map((opt) => {
          const selected = answer === opt.value;
          const selectedStyles = {
            yes:     selected ? "bg-emerald-950/60 border-emerald-500 text-emerald-400" : "",
            partial: selected ? "bg-amber-950/60 border-amber-500 text-amber-400" : "",
            no:      selected ? "bg-red-950/60 border-red-500 text-red-400" : "",
            na:      selected ? "bg-slate-800 border-slate-500 text-slate-300" : "",
          };
          return (
            <button
              key={opt.value}
              onClick={() => onChange(question.id, opt.value)}
              className={`px-4 py-1.5 rounded-lg border text-sm font-medium transition-all duration-200 ${
                selected
                  ? selectedStyles[opt.value]
                  : "border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Results Panel ────────────────────────────────────────────────────────────

function ResultsPanel({ answers, onBack }) {
  const sectionResults = SECTIONS.map((section) => {
    const pct = Math.round(calcSection(section, answers) * 100);
    return { ...section, pct };
  });

  let totalEarned = 0, totalPossible = 0;
  SECTIONS.forEach((section) => {
    section.questions.forEach((q) => {
      const a = answers[q.id];
      if (a && a !== "na") {
        const opt = ANSWER_OPTIONS.find((o) => o.value === a);
        if (opt) { totalEarned += opt.score * q.weight; }
        totalPossible += q.weight;
      } else if (!a) {
        totalPossible += q.weight;
      }
    });
  });
  const overallPct = totalPossible > 0 ? Math.round((totalEarned / totalPossible) * 100) : 0;
  const maturity = getMaturity(overallPct);
  const riskDelta = 100 - overallPct;

  const gaps = [];
  SECTIONS.forEach((section) => {
    section.questions.forEach((q) => {
      const a = answers[q.id];
      if (a === "no" && q.weight >= 2) gaps.push({ text: q.text, section: section.label });
      else if (a === "partial" && q.weight === 3) gaps.push({ text: q.text + " (partially implemented)", section: section.label });
    });
  });

  const barColor = (pct) => {
    if (pct >= 85) return "bg-emerald-500";
    if (pct >= 65) return "bg-cyan-500";
    if (pct >= 40) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-8 text-slate-400 hover:text-cyan-400 transition-colors text-sm flex items-center space-x-1"
      >
        <ChevronRight className="w-4 h-4 rotate-180" />
        <span>Back to Assessment</span>
      </button>

      {/* Overall Score */}
      <div className={`${maturity.bgClass} ${maturity.borderClass} border rounded-2xl p-10 mb-6 text-center`}>
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">AI Security Maturity Score</p>
        <div className={`text-7xl font-bold mb-3 ${maturity.colorClass}`}>{overallPct}%</div>
        <span className={`inline-block px-4 py-1 rounded-full border text-sm font-semibold mb-4 ${maturity.colorClass} ${maturity.borderClass} bg-slate-950/50`}>
          {maturity.label}
        </span>
        <p className="text-slate-400 max-w-md mx-auto">{maturity.desc}</p>
      </div>

      {/* Delta Risk */}
      <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-6 mb-6 flex items-center space-x-6">
        <div className="text-5xl font-bold text-red-400 shrink-0">+{riskDelta}</div>
        <div>
          <p className="text-xs text-red-400 uppercase tracking-widest font-semibold mb-1">AI Delta Risk Score</p>
          <p className="text-slate-400 text-sm leading-relaxed">
            The gap between your current posture and a fully hardened AI deployment. Every point represents unaddressed exposure.
          </p>
        </div>
      </div>

      {/* Domain Breakdown */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
          <BarChart2 className="w-5 h-5 text-cyan-400" />
          <span>Domain Breakdown</span>
        </h3>
        <div className="space-y-5">
          {sectionResults.map((s) => {
            const m = getMaturity(s.pct);
            return (
              <div key={s.id}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300 text-sm font-medium">{s.label}</span>
                  <span className={`text-sm font-bold ${m.colorClass}`}>{s.pct}%</span>
                </div>
                <ProgressBar value={s.pct} colorClass={barColor(s.pct)} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Priority Gaps */}
      {gaps.length > 0 && (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-bold mb-4 flex items-center space-x-2 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            <span>Priority Gaps Identified</span>
          </h3>
          <div className="space-y-3">
            {gaps.slice(0, 6).map((g, i) => (
              <div key={i} className="bg-red-950/20 border border-red-500/20 rounded-xl p-4">
                <p className="text-slate-200 text-sm mb-1">{g.text}</p>
                <p className="text-slate-500 text-xs uppercase tracking-widest">{g.section}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-3">Ready to Close Your Gaps?</h3>
        <p className="text-slate-400 mb-6 max-w-md mx-auto">
          Get a personalized AI security roadmap and remediation playbook tailored to your environment.
        </p>
        <a
          href="https://calendly.com/cyberlifecoach-proton/new-meeting"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
        >
          <span>Book a Consultation</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
        <p className="text-slate-500 mt-4 text-sm">First 30 minutes complimentary • No obligation</p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AISecurityAssessment() {
  const [activeSection, setActiveSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (qid, value) => setAnswers((prev) => ({ ...prev, [qid]: value }));

  const totalQuestions = SECTIONS.reduce((s, sec) => s + sec.questions.length, 0);
  const answeredCount = Object.keys(answers).length;
  const overallProgress = Math.round((answeredCount / totalQuestions) * 100);
  const currentSection = SECTIONS[activeSection];

  if (showResults) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <section className="relative pt-32 pb-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent pointer-events-none" />
          <div className="max-w-2xl mx-auto relative">
            <ResultsPanel answers={answers} onBack={() => setShowResults(false)} />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <style>{`
        @keyframes wobble {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
      `}</style>

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30 mb-8">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </div>
            <span className="text-sm text-slate-300">AI Security Tools</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight">
            AI Coworker Security<br />Self-Assessment Engine
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Evaluate your organization's AI deployment posture across governance, monitoring,
            red team readiness, and incident response. Zero telemetry — runs entirely in your browser.
          </p>

          {/* Progress bar */}
          <div className="max-w-sm mx-auto">
            <div className="flex justify-between text-xs text-slate-500 uppercase tracking-widest mb-2">
              <span>Assessment Progress</span>
              <span>{answeredCount}/{totalQuestions}</span>
            </div>
            <ProgressBar value={overallProgress} colorClass="bg-cyan-500" />
          </div>
        </div>
      </section>

      {/* Assessment body */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">

            {/* Sidebar */}
            <div className="lg:sticky lg:top-8">
              <div className="space-y-2 mb-4">
                {SECTIONS.map((section, i) => {
                  const answeredInSection = section.questions.filter((q) => answers[q.id]).length;
                  const isActive = activeSection === i;
                  const pct = Math.round((answeredInSection / section.questions.length) * 100);
                  const Icon = section.Icon;

                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(i)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                        isActive
                          ? "bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-500/10"
                          : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-500"}`} />
                          <span className={`text-sm font-semibold ${isActive ? "text-slate-100" : "text-slate-400"}`}>
                            {section.label}
                          </span>
                        </div>
                        {answeredInSection > 0 && (
                          <span className={`text-xs font-mono ${isActive ? "text-cyan-400" : "text-slate-500"}`}>
                            {pct}%
                          </span>
                        )}
                      </div>
                      {answeredInSection > 0 && (
                        <ProgressBar value={pct} colorClass={isActive ? "bg-cyan-500" : "bg-slate-600"} />
                      )}
                      <p className="text-xs text-slate-600 mt-1.5">{answeredInSection}/{section.questions.length} answered</p>
                    </button>
                  );
                })}
              </div>

              {/* View Results CTA */}
              <button
                onClick={() => setShowResults(true)}
                disabled={answeredCount < 4}
                className={`w-full py-3 rounded-xl border font-semibold text-sm transition-all duration-300 ${
                  answeredCount >= 4
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 border-transparent text-white hover:shadow-lg hover:shadow-cyan-500/40 hover:scale-105"
                    : "bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed"
                }`}
              >
                {answeredCount >= 4 ? "View My Results →" : `Answer ${4 - answeredCount} more to unlock`}
              </button>
            </div>

            {/* Questions */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                {React.createElement(currentSection.Icon, { className: "w-6 h-6 text-cyan-400" })}
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">
                    Domain {activeSection + 1} of {SECTIONS.length}
                  </p>
                  <h2 className="text-2xl font-bold text-slate-100">{currentSection.label}</h2>
                </div>
              </div>

              {currentSection.questions.map((q) => (
                <QuestionRow
                  key={q.id}
                  question={q}
                  answer={answers[q.id]}
                  onChange={handleAnswer}
                />
              ))}

              {/* Navigation */}
              <div className="flex gap-3 mt-6">
                {activeSection > 0 && (
                  <button
                    onClick={() => setActiveSection((p) => p - 1)}
                    className="px-6 py-2.5 rounded-lg border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-all text-sm font-semibold"
                  >
                    ← Previous
                  </button>
                )}
                {activeSection < SECTIONS.length - 1 && (
                  <button
                    onClick={() => setActiveSection((p) => p + 1)}
                    className="flex items-center space-x-2 px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all text-sm font-semibold"
                  >
                    <span>Next Domain</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
