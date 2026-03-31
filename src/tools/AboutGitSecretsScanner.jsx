import React from 'react';
import { FileCode, ArrowLeft, Shield, Key, AlertTriangle, CheckCircle, Eye, Database, GitBranch, Lock, Search, RotateCcw } from 'lucide-react';

export default function AboutGitSecretsScanner() {
  const handleOpenTool = () => {
    window.location.href = '/tools/git-secrets-scanner';
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">
      {/* Navigation */}
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

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
              Secret Detection Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Supply Chain Security
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Git Secrets Scanner: Why Exposed Credentials in Code Are a Critical Risk
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            Understanding how secrets end up in repositories — and how to find and remove them before attackers do.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">

          {/* 1. What Are "Secrets" in Code? */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Key className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  1. What Are "Secrets" in Code?
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  A "secret" is any sensitive value that grants access to a system, service, or dataset. Common examples include API keys, OAuth tokens, database connection strings, private keys, and hardcoded passwords. These values are legitimate credentials — the problem is when they are accidentally embedded in source code, configuration files, scripts, or documentation that gets committed to a repository.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Once a secret appears in a git commit, it enters the repository's permanent history. Even if you delete the line in a later commit, the value remains recoverable by anyone with access to the repo — or to a leaked copy of it.
                </p>
              </div>
            </div>
          </div>

          {/* 2. How Secrets End Up in Repositories */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <GitBranch className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  2. How Secrets End Up in Repositories
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  The most common routes are entirely accidental. A developer copies a working credential into a config file for a quick test and forgets to remove it before committing. A CI/CD pipeline template gets committed with a real token still inside. An Ansible playbook or CloudFormation template is exported directly from a working environment and pushed without scrubbing. Consulting deliverables — Customer Engagement Reports, architecture scripts, and runbooks — often contain live credentials from the client environment they were written for.
                </p>
                <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-yellow-300 mb-1">Real-World Example</p>
                      <p className="text-sm text-slate-300">
                        The 2025 Red Hat Consulting breach involved a hacker group claiming to have exfiltrated roughly 570 GB of data from over 28,000 internal repositories. The leaked Customer Engagement Reports allegedly contained network maps, VPN credentials, database connection strings, and cloud tokens belonging to Red Hat's clients — across financial services, telecoms, healthcare, and government sectors.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Why Attackers Hunt Repositories First */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Search className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  3. Why Attackers Hunt Repositories First
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Repositories are attractive targets because they aggregate credentials across every service a team uses. A single leaked repo can contain keys for AWS, Stripe, SendGrid, Slack, GitHub itself, and internal databases — all in one place. Tooling like TruffleHog and GitGuardian was built precisely because attackers use the same pattern-matching approach at scale, scanning GitHub, GitLab, and Bitbucket for known credential formats within minutes of a public push.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Consulting firm repositories are especially high-value because they aggregate secrets across <strong className="text-cyan-400">multiple client environments</strong>. Breaching one consulting repo can unlock dozens of downstream organizations simultaneously — the digital equivalent of stealing a locksmith's entire key ring.
                </p>
              </div>
            </div>
          </div>

          {/* 4. What This Tool Scans For */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Shield className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  4. What This Tool Scans For
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  The Git Secrets Scanner checks pasted code and configuration snippets against 13 known secret patterns, grouped by severity. Critical findings include AWS access and secret keys, GitHub personal access tokens, Stripe live API keys, private key blocks (RSA, EC, OpenSSH, PGP), and database connection strings with embedded credentials. High-severity findings cover Slack tokens, Google API keys, SendGrid and Twilio keys, and hardcoded password assignments. Medium findings flag raw Bearer tokens and JSON Web Tokens embedded in source files.
                </p>
                <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-cyan-300 mb-1">How It Works</p>
                      <p className="text-sm text-slate-300">
                        All scanning runs entirely in your browser using JavaScript regex pattern matching. No code, credentials, or snippet content is ever transmitted to a server, stored, or logged. The matched value is redacted by default — you choose whether to reveal it.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Immediate Steps When a Secret Is Found */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  5. Immediate Steps When a Secret Is Found
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  If the scanner flags a credential in your code, treat it as already compromised — even if the repository is private. The first step is to revoke or rotate the credential at the issuing service immediately, before anything else. Deleting the line from your code does not invalidate the credential. After rotating, remove the secret from the codebase and rewrite git history using <code className="text-cyan-300 bg-slate-950 px-2 py-1 rounded">git filter-repo</code> or BFG Repo Cleaner to purge the value from all historical commits. Finally, audit access logs at the affected service for any unauthorized activity during the window the secret was exposed.
                </p>
                <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-cyan-300 mb-1">Priority Order</p>
                      <p className="text-sm text-slate-300">
                        Rotate first, remove from code second, purge from history third, audit logs fourth. Reversing this order leaves the credential live while you clean up.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 6. How to Prevent Secrets from Entering Repos */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Lock className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  6. How to Prevent Secrets from Entering Repos
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Prevention works at multiple layers. At the developer workstation level, install pre-commit hooks using tools such as <code className="text-cyan-300 bg-slate-950 px-2 py-1 rounded">detect-secrets</code> or <code className="text-cyan-300 bg-slate-950 px-2 py-1 rounded">gitleaks</code> that block commits containing known secret patterns before they ever reach the remote. At the repository level, enable GitHub's built-in secret scanning or connect GitGuardian to receive alerts when a pattern is detected in a push. At the infrastructure level, replace long-lived credentials with short-lived alternatives — AWS STS tokens, Azure Managed Identities, GitHub Actions OIDC — so that even if a token is captured, it expires within minutes or hours rather than persisting indefinitely.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  For consulting engagements specifically, require that all deliverables — playbooks, templates, runbooks, and reports — are scrubbed of real credentials before archiving. Use a dedicated secrets management platform such as HashiCorp Vault, AWS Secrets Manager, or Azure Key Vault, and inject secrets at runtime rather than embedding them at authoring time.
                </p>
              </div>
            </div>
          </div>

          {/* 7. Understanding Severity Levels */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Eye className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  7. Understanding Severity Levels
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Not all exposed secrets carry equal risk. Critical findings — AWS keys, database URIs, private keys — can grant immediate, broad access to infrastructure or data and must be treated as active incidents. High findings — Stripe keys, Slack tokens, Google API keys — can enable financial fraud, data exfiltration, or account takeover and require same-day rotation. Medium findings — JWTs, Bearer tokens — may or may not be currently valid but represent a pattern that indicates poor secrets hygiene and should be removed and the signing secret rotated as a precaution.
                </p>
                <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-cyan-300 mb-1">Tip</p>
                      <p className="text-sm text-slate-300">
                        Click any finding in the scanner to expand a plain-language explanation of what the secret controls and step-by-step remediation instructions tailored to that credential type.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 8. Limitations of Browser-Based Scanning */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Database className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  8. Limitations of Browser-Based Scanning
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  This tool is designed for quick awareness checks on individual snippets — not as a replacement for production-grade tooling. It cannot scan git history, monitor repository pushes in real time, validate whether a detected credential is still active, or cover every credential format in existence. Pattern-based scanning also produces false positives on strings that match the format of a secret but are not real credentials, such as example values in documentation.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  For a complete secrets security program, integrate TruffleHog or gitleaks into your CI/CD pipeline to scan every commit automatically, use GitGuardian for real-time monitoring across your organization's repositories, and conduct periodic full-history scans to catch secrets that predate your current tooling.
                </p>
              </div>
            </div>
          </div>

          {/* 9. Supply Chain Risk and Third-Party Vendors */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <RotateCcw className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  9. Supply Chain Risk and Third-Party Vendors
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  The Red Hat Consulting breach is a reminder that your secrets hygiene depends on more than your own team. Any consulting partner, managed service provider, or DevOps contractor who works inside your environment may retain copies of your credentials in their own internal systems. Ask your vendors directly whether they use secrets scanning in their pipelines, how long-lived credentials are stored and rotated, and what their breach notification obligations are under your contract.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Where possible, issue short-lived, scoped credentials for each engagement rather than sharing production keys. Treat a vendor's systems as an extension of your own attack surface — because in practice, they are.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <FileCode className="w-5 h-5" />
              <span>🔍 Open the Scanner Tool</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print this Guide</span>
            </button>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer and Important Notice:</strong> This page and the Git Secrets Scanner tool are provided for educational and informational purposes only. CyberLifeCoach and its affiliates make no warranties, express or implied, regarding the completeness, accuracy, or fitness for purpose of the information or scanning results provided. The scanner uses pattern-matching heuristics and may produce false positives or miss credential types not covered by its rule set. Detection of a pattern does not confirm that a credential is valid, active, or has been accessed by a third party. You are solely responsible for verifying findings, rotating credentials, auditing access logs, and implementing appropriate secrets management practices in accordance with your own risk tolerance, organizational policy, and applicable law. Use of this tool does not constitute a security audit, penetration test, or professional security assessment. For production environments and regulated industries, engage a qualified security professional.
            </p>
          </div>

        </div>
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
}
