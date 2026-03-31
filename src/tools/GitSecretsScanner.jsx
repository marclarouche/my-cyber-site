import { useState, useRef } from "react";
import {
  Shield, AlertTriangle, CheckCircle, Search, Copy,
  FileCode, Eye, EyeOff, ChevronRight, Zap, ArrowLeft,
  Download, RotateCcw, Info, XCircle, ShieldAlert
} from "lucide-react";

// ── Secret pattern definitions ──────────────────────────────────────────────
const SECRET_PATTERNS = [
  {
    id: "aws_access_key",
    label: "AWS Access Key ID",
    severity: "critical",
    regex: /\b(AKIA|ABIA|ACCA|ASIA)[A-Z0-9]{16}\b/g,
    description: "Amazon Web Services access key — grants API access to AWS resources.",
    remediation: "Rotate immediately in IAM → revoke old key → use AWS STS short-lived tokens or IAM roles.",
  },
  {
    id: "aws_secret_key",
    label: "AWS Secret Access Key",
    severity: "critical",
    regex: /(?<![A-Za-z0-9/+])[A-Za-z0-9/+=]{40}(?![A-Za-z0-9/+])/g,
    description: "Potential AWS secret access key pattern (40-char base64 string).",
    remediation: "Rotate the keypair in IAM immediately. Never store raw secrets in code — use Secrets Manager or SSM Parameter Store.",
  },
  {
    id: "github_token",
    label: "GitHub Personal Access Token",
    severity: "critical",
    regex: /\bghp_[A-Za-z0-9]{36}\b|\bgh[pousr]_[A-Za-z0-9]{36,}\b/g,
    description: "GitHub PAT — allows read/write access to repositories and APIs.",
    remediation: "Revoke at github.com → Settings → Developer settings → Tokens. Use short-lived GitHub Actions OIDC tokens instead.",
  },
  {
    id: "slack_token",
    label: "Slack API Token",
    severity: "high",
    regex: /\bxox[baprs]-[A-Za-z0-9-]{10,48}\b/g,
    description: "Slack OAuth or bot token — can read messages and post to channels.",
    remediation: "Revoke at api.slack.com → Your Apps → OAuth & Permissions. Regenerate and store in a secrets vault.",
  },
  {
    id: "stripe_key",
    label: "Stripe API Key",
    severity: "critical",
    regex: /\b(sk|pk)_(live|test)_[A-Za-z0-9]{24,}\b/g,
    description: "Stripe secret or publishable key — live keys can process real payments.",
    remediation: "Roll the key in Stripe Dashboard → Developers → API Keys. Never commit live keys.",
  },
  {
    id: "google_api",
    label: "Google API Key",
    severity: "high",
    regex: /\bAIza[A-Za-z0-9_-]{35}\b/g,
    description: "Google Cloud or Maps API key — may expose billing and data access.",
    remediation: "Restrict key in Google Cloud Console → APIs & Services → Credentials. Regenerate and add HTTP referrer/IP restrictions.",
  },
  {
    id: "private_key",
    label: "Private Key Block",
    severity: "critical",
    regex: /-----BEGIN\s+(RSA|EC|DSA|OPENSSH|PGP)?\s*PRIVATE KEY-----/g,
    description: "Embedded private key — can decrypt communications or impersonate services.",
    remediation: "Revoke the certificate/key pair immediately. Regenerate with a secrets manager and never store keys in code.",
  },
  {
    id: "jwt",
    label: "JSON Web Token (JWT)",
    severity: "medium",
    regex: /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g,
    description: "JWT found — may contain authentication claims or session data.",
    remediation: "Rotate the signing secret. Ensure JWTs are short-lived and validated server-side.",
  },
  {
    id: "generic_password",
    label: "Hardcoded Password",
    severity: "high",
    regex: /(?:password|passwd|pwd|secret|api_key|apikey|token|auth)\s*[:=]\s*['"]([^'"]{8,})['"](?!\s*\+)/gi,
    description: "Credential assigned directly in code — common in config files and scripts.",
    remediation: "Remove from code. Use environment variables or a secrets manager (HashiCorp Vault, AWS Secrets Manager).",
  },
  {
    id: "connection_string",
    label: "Database Connection String",
    severity: "critical",
    regex: /(?:mongodb|mysql|postgres|postgresql|mssql|redis|amqp):\/\/[^\s'"<>]+:[^\s'"<>@]+@[^\s'"<>]+/gi,
    description: "Database URI with embedded credentials — exposes the entire database.",
    remediation: "Rotate DB credentials immediately. Use connection pooling with secrets injection at runtime (e.g., AWS RDS IAM auth).",
  },
  {
    id: "sendgrid",
    label: "SendGrid API Key",
    severity: "high",
    regex: /\bSG\.[A-Za-z0-9_-]{22}\.[A-Za-z0-9_-]{43}\b/g,
    description: "SendGrid key — can send email on your behalf and access contact lists.",
    remediation: "Revoke at app.sendgrid.com → Settings → API Keys. Restrict scope when regenerating.",
  },
  {
    id: "twilio",
    label: "Twilio API Key / Account SID",
    severity: "high",
    regex: /\b(AC[a-f0-9]{32}|SK[a-f0-9]{32})\b/g,
    description: "Twilio account or API key — can send SMS/calls and access call logs.",
    remediation: "Revoke at twilio.com → Console → API Keys. Use API keys scoped to minimum permissions.",
  },
  {
    id: "bearer_token",
    label: "Bearer Token",
    severity: "medium",
    regex: /\bBearer\s+[A-Za-z0-9_\-\.]{20,}\b/gi,
    description: "Raw Bearer token in code — could authenticate against APIs if still valid.",
    remediation: "Rotate the token at the issuing service. Use token injection via environment variables.",
  },
];

const SEVERITY_CONFIG = {
  critical: { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/40", badge: "bg-red-500/20 text-red-300", dot: "bg-red-400", label: "CRITICAL" },
  high:     { color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/40", badge: "bg-orange-500/20 text-orange-300", dot: "bg-orange-400", label: "HIGH" },
  medium:   { color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/40", badge: "bg-yellow-500/20 text-yellow-300", dot: "bg-yellow-400", label: "MEDIUM" },
  low:      { color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/40", badge: "bg-cyan-500/20 text-cyan-300", dot: "bg-cyan-400", label: "LOW" },
};

// ── Redact a matched string ──────────────────────────────────────────────────
function redact(str) {
  if (str.length <= 8) return "●".repeat(str.length);
  return str.slice(0, 4) + "●".repeat(Math.min(str.length - 6, 20)) + str.slice(-2);
}

// ── Run all patterns against input ──────────────────────────────────────────
function scanCode(input) {
  const findings = [];
  const lines = input.split("\n");

  for (const pattern of SECRET_PATTERNS) {
    const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
    let match;
    while ((match = regex.exec(input)) !== null) {
      const before = input.slice(0, match.index);
      const lineNum = before.split("\n").length;
      const lineText = lines[lineNum - 1] || "";
      findings.push({
        patternId: pattern.id,
        label: pattern.label,
        severity: pattern.severity,
        description: pattern.description,
        remediation: pattern.remediation,
        match: match[0],
        redacted: redact(match[0]),
        lineNum,
        lineText: lineText.trim().slice(0, 120),
      });
    }
  }

  // dedupe by patternId + lineNum
  const seen = new Set();
  return findings.filter(f => {
    const key = `${f.patternId}:${f.lineNum}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ── Severity summary counts ──────────────────────────────────────────────────
function summarize(findings) {
  return findings.reduce((acc, f) => {
    acc[f.severity] = (acc[f.severity] || 0) + 1;
    return acc;
  }, {});
}

// ── Main component ───────────────────────────────────────────────────────────
export default function GitSecretsScanner() {
  const [input, setInput] = useState("");
  const [findings, setFindings] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [showRedacted, setShowRedacted] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);

  const PLACEHOLDER = `# Paste any code, config, or script snippet here
# Examples: .env files, Ansible playbooks, CloudFormation templates,
#           CI/CD configs, shell scripts, Python/JS source files

AWS_ACCESS_KEY_ID=AXIA_EXAMPLE_FODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=EXAMPLE_wJalrXUtnFEMI/K7MDENG/bPxRfiCYKEY
DATABASE_URL=postgres://admin:S3cr3tP@ss@db.example.com:5432/prod
GITHUB_TOKEN=ghp_EXAMPLE_16C7e42F292c6912E7710c838347Ae298246
STRIPE_SECRET=sk_EXAMPLE_abcdef1234567890abcdef12`;

  const handleScan = () => {
    if (!input.trim()) return;
    setScanning(true);
    setFindings(null);
    setExpandedId(null);
    setTimeout(() => {
      const results = scanCode(input);
      setFindings(results);
      setScanning(false);
    }, 700);
  };

  const handleReset = () => {
    setInput("");
    setFindings(null);
    setExpandedId(null);
    setCopied(false);
  };

  const handleCopyReport = () => {
    if (!findings) return;
    const summary = summarize(findings);
    const lines = [
      "=== Git Secrets Scanner Report ===",
      `Scanned: ${new Date().toISOString()}`,
      `Total findings: ${findings.length}`,
      Object.entries(summary).map(([s, c]) => `  ${s.toUpperCase()}: ${c}`).join("\n"),
      "",
      ...findings.map((f, i) =>
        `[${i + 1}] ${f.label} (${f.severity.toUpperCase()}) — Line ${f.lineNum}\n    ${f.description}\n    Remediation: ${f.remediation}\n`
      ),
      "=== All processing was done locally in your browser. No data was transmitted. ===",
    ];
    navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const summary = findings ? summarize(findings) : null;

  const overallRisk = findings === null ? null
    : findings.length === 0 ? "clean"
    : summary.critical ? "critical"
    : summary.high ? "high"
    : summary.medium ? "medium"
    : "low";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace" }}>

      {/* Nav */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg border-b border-slate-800">
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
              <span>Back to Tools</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-900/60 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30 mb-8">
            <FileCode className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-300">Inspired by TruffleHog &amp; GitGuardian</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight">
            Git Secrets Scanner
          </h1>
          <p className="text-lg text-slate-400 mb-4 max-w-2xl mx-auto leading-relaxed">
            Paste any code snippet, config file, or script. We'll scan it for exposed API keys,
            tokens, passwords, and connection strings — <span className="text-cyan-400 font-semibold">entirely in your browser</span>. Nothing is transmitted.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {[
              { icon: <Shield className="w-4 h-4" />, text: "100% Client-Side" },
              { icon: <Eye className="w-4 h-4" />, text: "No Data Sent" },
              { icon: <Zap className="w-4 h-4" />, text: "13 Secret Patterns" },
            ].map((b, i) => (
              <div key={i} className="flex items-center space-x-2 bg-slate-800/60 border border-slate-700 px-4 py-2 rounded-full text-sm text-slate-300">
                <span className="text-cyan-400">{b.icon}</span>
                <span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Scanner */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto space-y-6">

          {/* Input Panel */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-900/50">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="text-slate-400 text-sm">snippet.env · config.yml · script.sh</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-500">
                <span>{input.split("\n").length} lines</span>
                <span>·</span>
                <span>{input.length} chars</span>
              </div>
            </div>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={PLACEHOLDER}
              className="w-full bg-transparent p-6 text-sm text-slate-300 placeholder-slate-600 resize-none focus:outline-none leading-relaxed"
              style={{ minHeight: "280px", fontFamily: "inherit" }}
            />
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-3">
              <button
                onClick={handleScan}
                disabled={!input.trim() || scanning}
                className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {scanning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Scanning…</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Scan for Secrets</span>
                  </>
                )}
              </button>

              <button
                onClick={handleReset}
                className="flex items-center space-x-2 px-4 py-3 rounded-lg border border-slate-600 hover:border-slate-500 text-slate-400 hover:text-slate-200 transition-all text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>

            {findings && findings.length > 0 && (
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRedacted(r => !r)}
                  className="flex items-center space-x-2 px-4 py-3 rounded-lg border border-slate-600 hover:border-cyan-500 text-slate-400 hover:text-cyan-400 transition-all text-sm"
                >
                  {showRedacted ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  <span>{showRedacted ? "Show Redacted" : "Hide Values"}</span>
                </button>
                <button
                  onClick={handleCopyReport}
                  className="flex items-center space-x-2 px-4 py-3 rounded-lg border border-slate-600 hover:border-cyan-500 text-slate-400 hover:text-cyan-400 transition-all text-sm"
                >
                  {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Copied!" : "Copy Report"}</span>
                </button>
              </div>
            )}
          </div>

          {/* ── Results ── */}
          {findings !== null && (
            <div className="space-y-4 animate-fade-in">

              {/* Overall verdict banner */}
              {overallRisk === "clean" ? (
                <div className="flex items-center space-x-4 bg-green-500/10 border border-green-500/40 rounded-2xl p-6">
                  <CheckCircle className="w-10 h-10 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-green-400 font-bold text-lg">No secrets detected</p>
                    <p className="text-slate-400 text-sm mt-1">No known secret patterns were found in this snippet. Still review manually — patterns can't catch everything.</p>
                  </div>
                </div>
              ) : (
                <div className={`flex flex-wrap items-center gap-6 ${SEVERITY_CONFIG[overallRisk].bg} border ${SEVERITY_CONFIG[overallRisk].border} rounded-2xl p-6`}>
                  <ShieldAlert className={`w-10 h-10 ${SEVERITY_CONFIG[overallRisk].color} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-lg ${SEVERITY_CONFIG[overallRisk].color}`}>
                      {findings.length} secret{findings.length !== 1 ? "s" : ""} detected
                    </p>
                    <p className="text-slate-400 text-sm mt-1">Review each finding below and remediate before committing or sharing this code.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["critical", "high", "medium", "low"].map(s =>
                      summary[s] ? (
                        <span key={s} className={`text-xs font-bold px-3 py-1.5 rounded-full ${SEVERITY_CONFIG[s].badge}`}>
                          {summary[s]} {s.toUpperCase()}
                        </span>
                      ) : null
                    )}
                  </div>
                </div>
              )}

              {/* Findings list */}
              {findings.length > 0 && (
                <div className="space-y-3">
                  {findings.map((f, i) => {
                    const cfg = SEVERITY_CONFIG[f.severity];
                    const isOpen = expandedId === i;
                    return (
                      <div
                        key={i}
                        className={`${cfg.bg} border ${cfg.border} rounded-xl overflow-hidden transition-all duration-200`}
                      >
                        {/* Header row */}
                        <button
                          onClick={() => setExpandedId(isOpen ? null : i)}
                          className="w-full flex items-center gap-4 px-5 py-4 text-left hover:brightness-110 transition-all"
                        >
                          <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="font-bold text-sm text-white">{f.label}</span>
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cfg.badge}`}>{cfg.label}</span>
                              <span className="text-xs text-slate-500">Line {f.lineNum}</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5 truncate font-mono">
                              {showRedacted ? f.redacted : f.match}
                            </p>
                          </div>
                          <ChevronRight className={`w-4 h-4 ${cfg.color} flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />
                        </button>

                        {/* Expanded detail */}
                        {isOpen && (
                          <div className="px-5 pb-5 space-y-4 border-t border-slate-700/50 pt-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">What it is</p>
                                <p className="text-sm text-slate-300">{f.description}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">How to fix it</p>
                                <p className="text-sm text-slate-300">{f.remediation}</p>
                              </div>
                            </div>
                            <div className="bg-slate-950/60 rounded-lg px-4 py-3 border border-slate-700">
                              <p className="text-xs text-slate-500 mb-1">Matched on line {f.lineNum}:</p>
                              <code className="text-xs text-slate-300 break-all">{f.lineText}</code>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Privacy note */}
              <div className="flex items-start space-x-3 bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4">
                <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400 leading-relaxed">
                  <span className="text-cyan-400 font-semibold">Your data never leaves this page.</span>{" "}
                  All scanning runs locally via JavaScript regex patterns. No code is stored, logged, or transmitted to any server.
                  This tool is for educational awareness — for production-grade scanning use{" "}
                  <span className="text-slate-300">TruffleHog, GitGuardian, or gitleaks</span> in your CI/CD pipeline.
                </p>
              </div>
            </div>
          )}

          {/* Pattern reference */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
            <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
              <FileCode className="w-5 h-5 text-cyan-400" />
              Patterns We Detect
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {SECRET_PATTERNS.map(p => {
                const cfg = SEVERITY_CONFIG[p.severity];
                return (
                  <div key={p.id} className="flex items-center gap-2 text-sm">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
                    <span className="text-slate-300">{p.label}</span>
                    <span className={`text-xs ml-auto ${cfg.color}`}>{cfg.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">Want a real secrets audit for your codebase?</h3>
            <p className="text-slate-400 mb-6 max-w-lg mx-auto text-sm">
              This tool catches common patterns — a full engagement covers your entire git history, CI/CD pipelines, cloud configs, and more.
            </p>
            <a
              href="https://calendly.com/cyberlifecoach-proton/new-meeting"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
            >
              <Shield className="w-5 h-5" />
              <span>Schedule a Free Consultation</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img
              src="/logo.png"
              alt="CyberLifeCoach"
              className="h-8 w-auto transition-all duration-300 hover:scale-125 hover:brightness-125"
            />
            <span className="font-bold text-lg transition-all duration-300 hover:text-cyan-400 hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">CyberLifeCoach</span>
          </div>
          <div className="text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} CyberLifeCoach</p>
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
