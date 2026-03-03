import { useState } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: "governance",
    label: "Governance & Access Control",
    icon: "🔐",
    questions: [
      {
        id: "rbac",
        text: "Is Role-Based Access Control (RBAC) enforced for your AI coworker?",
        hint: "Each user or role should have explicit permissions scoped to their job function.",
        weight: 3,
      },
      {
        id: "zdr",
        text: "Have you enabled Zero Data Retention (ZDR) with your AI provider?",
        hint: "ZDR ensures conversation data is not stored or used for model training.",
        weight: 3,
      },
      {
        id: "sensitive_dirs",
        text: "Are sensitive directories (HR, Payroll, Legal) explicitly blocked from AI access?",
        hint: "AI tools should operate on a least-privilege model.",
        weight: 2,
      },
      {
        id: "audit_log",
        text: "Do you have immutable audit logging enabled for all AI interactions?",
        hint: "Logs should be tamper-proof and retained for a defined compliance period.",
        weight: 2,
      },
      {
        id: "data_class",
        text: "Has sensitive data been classified and labeled before AI deployment?",
        hint: "AI systems need data classification context to enforce access boundaries.",
        weight: 2,
      },
    ],
  },
  {
    id: "monitoring",
    label: "Monitoring & Detection",
    icon: "📡",
    questions: [
      {
        id: "siem",
        text: "Are AI activity logs forwarded to your SIEM or security monitoring platform?",
        hint: "Your SOC team needs AI events in the same view as other security telemetry.",
        weight: 3,
      },
      {
        id: "dlp",
        text: "Is Data Loss Prevention (DLP) interception active for AI outputs?",
        hint: "DLP can flag or block AI responses containing PII, credentials, or IP.",
        weight: 3,
      },
      {
        id: "rate_alert",
        text: "Do you have alerts configured for abnormal prompt volume (e.g., 50+ rapid prompts)?",
        hint: "Automated prompt injection attacks often operate at machine speed.",
        weight: 2,
      },
      {
        id: "anomaly",
        text: "Is behavioral anomaly detection in place for AI-connected service accounts?",
        hint: "Watch for unusual file access, bulk exports, or off-hours activity.",
        weight: 2,
      },
    ],
  },
  {
    id: "redteam",
    label: "Red Team Readiness",
    icon: "🎯",
    questions: [
      {
        id: "canary",
        text: "Have you deployed canary trap documents to detect unauthorized AI data access?",
        hint: "Canary files trigger alerts if accessed — a key indicator of prompt injection exfiltration.",
        weight: 3,
      },
      {
        id: "injection_test",
        text: "Have you tested your AI for indirect prompt injection vulnerabilities?",
        hint: "Malicious instructions embedded in documents can hijack AI behavior.",
        weight: 3,
      },
      {
        id: "exfil_test",
        text: "Have you verified your AI cannot be coerced into sending data to external URLs?",
        hint: "Exfiltration via AI-generated hyperlinks is a documented attack vector.",
        weight: 3,
      },
      {
        id: "scope_test",
        text: "Have you validated that your AI stays within its authorized operational scope?",
        hint: "Test whether the AI can be prompted to perform actions outside its intended role.",
        weight: 2,
      },
    ],
  },
  {
    id: "killswitch",
    label: "Kill Switch & Incident Response",
    icon: "⚡",
    questions: [
      {
        id: "owner",
        text: "Is there a named owner responsible for AI token and credential revocation?",
        hint: "Someone must have the authority and access to kill AI access within minutes.",
        weight: 2,
      },
      {
        id: "revoke_proc",
        text: "Do you have a documented, tested procedure for revoking AI API keys and tokens?",
        hint: "This procedure should be practiced — not discovered during an incident.",
        weight: 3,
      },
      {
        id: "isolate",
        text: "Can you isolate your AI integration from your network within 15 minutes?",
        hint: "Containment speed is critical in limiting blast radius.",
        weight: 3,
      },
      {
        id: "ir_plan",
        text: "Is your AI coworker included in your organization's Incident Response plan?",
        hint: "AI-specific scenarios should have defined response playbooks.",
        weight: 2,
      },
    ],
  },
];

const ANSWER_OPTIONS = [
  { value: "yes", label: "Yes", score: 1.0, color: "#00d17a" },
  { value: "partial", label: "Partial", score: 0.5, color: "#f0a500" },
  { value: "no", label: "No", score: 0.0, color: "#ff4466" },
  { value: "na", label: "N/A", score: null, color: "#4a7099" },
];

function getMaturityLevel(pct) {
  if (pct >= 85) return { label: "Secure", color: "#00d17a", desc: "Strong AI governance posture. Maintain and evolve." };
  if (pct >= 65) return { label: "Managed", color: "#00b4ff", desc: "Good foundation with meaningful gaps to close." };
  if (pct >= 40) return { label: "Developing", color: "#f0a500", desc: "Partial controls in place. Prioritize critical gaps." };
  return { label: "At Risk", color: "#ff4466", desc: "Significant exposure. Immediate action recommended." };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ProgressBar({ value, color = "#00b4ff" }) {
  return (
    <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
      <div
        style={{
          height: "100%",
          width: `${value}%`,
          background: color,
          borderRadius: "2px",
          transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: `0 0 8px ${color}80`,
        }}
      />
    </div>
  );
}

function QuestionRow({ question, answer, onChange }) {
  return (
    <div
      style={{
        padding: "1.2rem 1.4rem",
        borderRadius: "8px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(0,100,200,0.12)",
        marginBottom: "0.75rem",
      }}
    >
      <p style={{ margin: "0 0 0.4rem", fontSize: "0.9rem", color: "#c5dff5", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
        {question.text}
      </p>
      <p style={{ margin: "0 0 0.8rem", fontSize: "0.75rem", color: "#4a7099", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
        {question.hint}
      </p>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {ANSWER_OPTIONS.map((opt) => {
          const selected = answer === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onChange(question.id, opt.value)}
              style={{
                padding: "0.35rem 0.9rem",
                borderRadius: "4px",
                border: selected ? `1px solid ${opt.color}` : "1px solid rgba(0,100,200,0.2)",
                background: selected ? `${opt.color}18` : "transparent",
                color: selected ? opt.color : "#4a7099",
                fontSize: "0.75rem",
                fontFamily: "'Space Mono', monospace",
                cursor: "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "0.05em",
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SectionTab({ section, isActive, sectionScore, answered, total, onClick }) {
  const pct = sectionScore !== null ? Math.round(sectionScore * 100) : null;
  const maturity = pct !== null ? getMaturityLevel(pct) : null;

  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "1rem 1.2rem",
        borderRadius: "8px",
        border: isActive ? "1px solid rgba(0,180,255,0.4)" : "1px solid rgba(0,100,200,0.15)",
        background: isActive ? "rgba(0,120,200,0.1)" : "rgba(10,20,40,0.6)",
        cursor: "pointer",
        transition: "all 0.25s ease",
        marginBottom: "0.5rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
        <span style={{ fontSize: "0.85rem", fontFamily: "'Syne', sans-serif", fontWeight: 700, color: isActive ? "#d0eaff" : "#6a90b8" }}>
          {section.icon} {section.label}
        </span>
        {maturity && (
          <span style={{ fontSize: "0.68rem", color: maturity.color, fontFamily: "'Space Mono', monospace" }}>
            {pct}%
          </span>
        )}
      </div>
      <div style={{ fontSize: "0.68rem", color: "#4a7099", fontFamily: "'Space Mono', monospace", marginBottom: "0.4rem" }}>
        {answered}/{total} answered
      </div>
      {answered > 0 && <ProgressBar value={(answered / total) * 100} color={isActive ? "#00b4ff" : "rgba(0,120,200,0.4)"} />}
    </button>
  );
}

function ResultsPanel({ answers }) {
  // Calculate scores
  const sectionResults = SECTIONS.map((section) => {
    let earned = 0, possible = 0;
    section.questions.forEach((q) => {
      const a = answers[q.id];
      if (a && a !== "na") {
        const opt = ANSWER_OPTIONS.find((o) => o.value === a);
        if (opt) {
          earned += opt.score * q.weight;
          possible += q.weight;
        }
      } else if (!a) {
        possible += q.weight;
      }
    });
    const pct = possible > 0 ? Math.round((earned / possible) * 100) : 0;
    return { ...section, pct, earned, possible };
  });

  const totalEarned = sectionResults.reduce((s, r) => s + r.earned, 0);
  const totalPossible = sectionResults.reduce((s, r) => s + r.possible, 0);
  const overallPct = totalPossible > 0 ? Math.round((totalEarned / totalPossible) * 100) : 0;
  const maturity = getMaturityLevel(overallPct);

  // Risk delta concept
  const riskDelta = Math.round(100 - overallPct);

  const gaps = [];
  SECTIONS.forEach((section) => {
    section.questions.forEach((q) => {
      const a = answers[q.id];
      if (a === "no" && q.weight >= 2) {
        gaps.push({ text: q.text, section: section.label });
      } else if (a === "partial" && q.weight === 3) {
        gaps.push({ text: q.text + " (partial)", section: section.label });
      }
    });
  });

  return (
    <div style={{ animation: "fadeSlideUp 0.5s ease both" }}>
      {/* Overall Score */}
      <div
        style={{
          padding: "2rem",
          borderRadius: "12px",
          border: `1px solid ${maturity.color}40`,
          background: `linear-gradient(135deg, ${maturity.color}08 0%, rgba(5,15,30,0.95) 100%)`,
          marginBottom: "1.5rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${maturity.color}, transparent)`,
          }}
        />
        <p style={{ margin: "0 0 0.5rem", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a7099", fontFamily: "'Space Mono', monospace" }}>
          AI Security Maturity Score
        </p>
        <div style={{ fontSize: "clamp(3rem, 8vw, 5rem)", fontWeight: 800, fontFamily: "'Syne', sans-serif", color: maturity.color, lineHeight: 1, marginBottom: "0.5rem" }}>
          {overallPct}%
        </div>
        <div style={{ display: "inline-block", padding: "0.3rem 1rem", borderRadius: "20px", background: `${maturity.color}20`, border: `1px solid ${maturity.color}50`, color: maturity.color, fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", letterSpacing: "0.1em", marginBottom: "0.8rem" }}>
          {maturity.label}
        </div>
        <p style={{ margin: 0, fontSize: "0.9rem", color: "#6a90b8", fontFamily: "'DM Sans', sans-serif" }}>
          {maturity.desc}
        </p>
      </div>

      {/* Delta Risk */}
      <div
        style={{
          padding: "1.2rem 1.4rem",
          borderRadius: "8px",
          background: "rgba(255,68,102,0.05)",
          border: "1px solid rgba(255,68,102,0.2)",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div style={{ fontSize: "1.8rem", fontWeight: 800, fontFamily: "'Syne', sans-serif", color: "#ff4466", minWidth: "60px" }}>
          +{riskDelta}
        </div>
        <div>
          <p style={{ margin: "0 0 0.2rem", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#ff4466", fontFamily: "'Space Mono', monospace" }}>
            AI Delta Risk Score
          </p>
          <p style={{ margin: 0, fontSize: "0.82rem", color: "#6a90b8", fontFamily: "'DM Sans', sans-serif" }}>
            The gap between your current posture and a fully hardened AI deployment. Lower is better.
          </p>
        </div>
      </div>

      {/* Section Breakdown */}
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ margin: "0 0 0.8rem", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#4a7099", fontFamily: "'Space Mono', monospace" }}>
          Domain Breakdown
        </p>
        {sectionResults.map((s) => {
          const m = getMaturityLevel(s.pct);
          return (
            <div key={s.id} style={{ marginBottom: "0.8rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                <span style={{ fontSize: "0.82rem", color: "#8ab4d4", fontFamily: "'DM Sans', sans-serif" }}>
                  {s.icon} {s.label}
                </span>
                <span style={{ fontSize: "0.78rem", fontFamily: "'Space Mono', monospace", color: m.color }}>
                  {s.pct}%
                </span>
              </div>
              <ProgressBar value={s.pct} color={m.color} />
            </div>
          );
        })}
      </div>

      {/* Critical Gaps */}
      {gaps.length > 0 && (
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ margin: "0 0 0.8rem", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#ff4466", fontFamily: "'Space Mono', monospace" }}>
            ⚠ Priority Gaps Identified
          </p>
          {gaps.slice(0, 5).map((g, i) => (
            <div
              key={i}
              style={{
                padding: "0.7rem 1rem",
                borderRadius: "6px",
                border: "1px solid rgba(255,68,102,0.2)",
                background: "rgba(255,68,102,0.04)",
                marginBottom: "0.5rem",
              }}
            >
              <p style={{ margin: "0 0 0.15rem", fontSize: "0.82rem", color: "#c5dff5", fontFamily: "'DM Sans', sans-serif" }}>
                {g.text}
              </p>
              <p style={{ margin: 0, fontSize: "0.68rem", color: "#4a7099", fontFamily: "'Space Mono', monospace" }}>
                {g.section}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div
        style={{
          padding: "1.5rem",
          borderRadius: "8px",
          border: "1px solid rgba(0,120,200,0.25)",
          background: "rgba(0,50,100,0.1)",
          textAlign: "center",
        }}
      >
        <p style={{ margin: "0 0 0.4rem", fontSize: "0.9rem", fontWeight: 600, color: "#c5dff5", fontFamily: "'Syne', sans-serif" }}>
          Ready to close your gaps?
        </p>
        <p style={{ margin: "0 0 1rem", fontSize: "0.82rem", color: "#4a7099", fontFamily: "'DM Sans', sans-serif" }}>
          Get a personalized AI security roadmap and remediation playbook.
        </p>
        <a
          href="https://cyberlifecoach.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.7rem 1.6rem",
            borderRadius: "6px",
            background: "rgba(0,120,200,0.15)",
            border: "1px solid rgba(0,180,255,0.4)",
            color: "#00b4ff",
            fontSize: "0.8rem",
            letterSpacing: "0.08em",
            textDecoration: "none",
            fontFamily: "'Space Mono', monospace",
          }}
        >
          Book a Consultation →
        </a>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AISecurityAssessment() {
  const [activeSection, setActiveSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const getSectionScore = (section) => {
    let earned = 0, possible = 0, hasAny = false;
    section.questions.forEach((q) => {
      const a = answers[q.id];
      if (a) {
        hasAny = true;
        if (a !== "na") {
          const opt = ANSWER_OPTIONS.find((o) => o.value === a);
          if (opt) { earned += opt.score * q.weight; possible += q.weight; }
        }
      } else {
        possible += q.weight;
      }
    });
    return hasAny ? earned / possible : null;
  };

  const totalQuestions = SECTIONS.reduce((s, sec) => s + sec.questions.length, 0);
  const answeredCount = Object.keys(answers).length;
  const overallProgress = Math.round((answeredCount / totalQuestions) * 100);

  const currentSection = SECTIONS[activeSection];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500&display=swap');
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,100,200,0.3); border-radius: 2px; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(160deg, #020c1b 0%, #010810 60%, #020a16 100%)",
          padding: "5rem 1.5rem 6rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid BG */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(0,100,200,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,100,200,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            pointerEvents: "none",
          }}
        />

        {/* Glow orb */}
        <div
          style={{
            position: "absolute", top: "5%", left: "50%", transform: "translateX(-50%)",
            width: "700px", height: "350px",
            background: "radial-gradient(ellipse, rgba(0,100,200,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative" }}>

          {/* Header */}
          <div style={{ marginBottom: "3rem", animation: "fadeSlideUp 0.5s ease both" }}>
            <p style={{ margin: "0 0 0.5rem", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#0077cc", fontFamily: "'Space Mono', monospace" }}>
              // AI Security Tools
            </p>
            <h1 style={{ margin: "0 0 0.8rem", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#d0eaff", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              AI Coworker Security<br />Self-Assessment Engine
            </h1>
            <p style={{ margin: "0 0 1.5rem", fontSize: "0.95rem", color: "#4a7099", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7, maxWidth: "560px" }}>
              Evaluate your organization's AI deployment posture across governance, monitoring,
              red team readiness, and incident response. Zero telemetry — runs entirely in your browser.
            </p>

            {/* Overall progress */}
            <div style={{ maxWidth: "400px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                <span style={{ fontSize: "0.72rem", color: "#4a7099", fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em" }}>
                  ASSESSMENT PROGRESS
                </span>
                <span style={{ fontSize: "0.72rem", color: "#0077cc", fontFamily: "'Space Mono', monospace" }}>
                  {answeredCount}/{totalQuestions}
                </span>
              </div>
              <ProgressBar value={overallProgress} />
            </div>
          </div>

          {!showResults ? (
            <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "2rem", alignItems: "start" }}>

              {/* Sidebar nav */}
              <div style={{ position: "sticky", top: "2rem" }}>
                {SECTIONS.map((section, i) => {
                  const sScore = getSectionScore(section);
                  const ans = section.questions.filter((q) => answers[q.id]).length;
                  return (
                    <SectionTab
                      key={section.id}
                      section={section}
                      isActive={activeSection === i}
                      sectionScore={sScore}
                      answered={ans}
                      total={section.questions.length}
                      onClick={() => setActiveSection(i)}
                    />
                  );
                })}

                {/* View Results button */}
                <button
                  onClick={() => setShowResults(true)}
                  disabled={answeredCount < 4}
                  style={{
                    width: "100%",
                    marginTop: "0.5rem",
                    padding: "0.85rem",
                    borderRadius: "8px",
                    border: answeredCount >= 4 ? "1px solid rgba(0,180,255,0.5)" : "1px solid rgba(0,100,200,0.15)",
                    background: answeredCount >= 4 ? "rgba(0,120,200,0.15)" : "rgba(10,20,40,0.4)",
                    color: answeredCount >= 4 ? "#00b4ff" : "#2a4060",
                    fontSize: "0.78rem",
                    letterSpacing: "0.1em",
                    fontFamily: "'Space Mono', monospace",
                    cursor: answeredCount >= 4 ? "pointer" : "not-allowed",
                    transition: "all 0.25s ease",
                  }}
                >
                  {answeredCount >= 4 ? "→ View Results" : `Answer ${4 - answeredCount} more to unlock`}
                </button>
              </div>

              {/* Questions panel */}
              <div style={{ animation: "fadeSlideUp 0.4s ease both" }}>
                <div style={{ marginBottom: "1.5rem" }}>
                  <p style={{ margin: "0 0 0.3rem", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#0077cc", fontFamily: "'Space Mono', monospace" }}>
                    Domain {activeSection + 1} of {SECTIONS.length}
                  </p>
                  <h2 style={{ margin: 0, fontSize: "1.3rem", fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#d0eaff" }}>
                    {currentSection.icon} {currentSection.label}
                  </h2>
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
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
                  {activeSection > 0 && (
                    <button
                      onClick={() => setActiveSection((p) => p - 1)}
                      style={{
                        padding: "0.65rem 1.4rem",
                        borderRadius: "6px",
                        border: "1px solid rgba(0,100,200,0.25)",
                        background: "transparent",
                        color: "#6a90b8",
                        fontSize: "0.78rem",
                        letterSpacing: "0.08em",
                        fontFamily: "'Space Mono', monospace",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      ← Previous
                    </button>
                  )}
                  {activeSection < SECTIONS.length - 1 && (
                    <button
                      onClick={() => setActiveSection((p) => p + 1)}
                      style={{
                        padding: "0.65rem 1.4rem",
                        borderRadius: "6px",
                        border: "1px solid rgba(0,120,200,0.4)",
                        background: "rgba(0,100,200,0.1)",
                        color: "#00b4ff",
                        fontSize: "0.78rem",
                        letterSpacing: "0.08em",
                        fontFamily: "'Space Mono', monospace",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      Next Domain →
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setShowResults(false)}
                style={{
                  marginBottom: "1.5rem",
                  padding: "0.5rem 1.2rem",
                  borderRadius: "6px",
                  border: "1px solid rgba(0,100,200,0.25)",
                  background: "transparent",
                  color: "#6a90b8",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  fontFamily: "'Space Mono', monospace",
                  cursor: "pointer",
                }}
              >
                ← Back to Assessment
              </button>
              <div style={{ maxWidth: "680px" }}>
                <ResultsPanel answers={answers} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
