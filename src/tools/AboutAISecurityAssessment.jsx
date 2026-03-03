import React from 'react';
import { Shield, ArrowLeft, Eye, AlertTriangle, CheckCircle, Zap, Lock, BarChart2 } from 'lucide-react';

export default function AboutAISecurityAssessment() {
  const handleOpenTool = () => {
    window.location.href = '/tools/ai-security-assessment';
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
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
              Security Tool Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              AI Governance
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Zero Telemetry
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Client-Side Only
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the AI Coworker Security Self-Assessment Engine
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            Evaluate your organization's AI deployment posture and identify security gaps — entirely in your browser, with no data ever leaving your device.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">

          {/* Introduction */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-8 mb-8">
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              As AI coworkers — tools like Microsoft Copilot, Google Gemini, and ChatGPT Enterprise —
              become embedded in daily business operations, they introduce a new and often overlooked
              attack surface. Most organizations deploy these tools without fully evaluating the
              governance, monitoring, and incident response controls needed to secure them.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              This assessment engine walks you through 17 weighted questions across four critical
              security domains. In minutes, you'll receive a maturity score, an AI Delta Risk Score,
              a breakdown of your weakest domains, and a prioritized list of gaps to close.
            </p>
          </div>

          {/* Privacy First Notice */}
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-semibold text-blue-300 mb-2">Zero Telemetry — Privacy First</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  This tool runs entirely in your browser using local state. No answers, scores, or
                  organizational data are transmitted to any server. There are no cookies, no analytics
                  on your responses, and no account required. Your assessment is yours alone.
                </p>
              </div>
            </div>
          </div>

          {/* How to Use It */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              How to Use It
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold text-xl flex-shrink-0">1.</span>
                <span className="text-slate-300">
                  Work through each of the four security domains using the sidebar navigation — you can complete them in any order.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold text-xl flex-shrink-0">2.</span>
                <span className="text-slate-300">
                  For each question, select <strong className="text-slate-200">Yes</strong>, <strong className="text-slate-200">Partial</strong>, <strong className="text-slate-200">No</strong>, or <strong className="text-slate-200">N/A</strong> based on your current implementation status.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold text-xl flex-shrink-0">3.</span>
                <span className="text-slate-300">
                  Read the hint text under each question for guidance on what a fully implemented control looks like.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold text-xl flex-shrink-0">4.</span>
                <span className="text-slate-300">
                  After answering at least 4 questions, click <strong className="text-slate-200">View My Results</strong> in the sidebar to unlock your full report.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold text-xl flex-shrink-0">5.</span>
                <span className="text-slate-300">
                  Review your maturity score, AI Delta Risk Score, domain breakdown, and priority gaps — then use the results to inform your remediation roadmap.
                </span>
              </li>
            </ul>
          </div>

          {/* The Four Domains */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              The Four Assessment Domains
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Governance & Access Control</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Evaluates whether your AI coworker operates on a least-privilege model — covering RBAC enforcement,
                  Zero Data Retention, sensitive directory blocking, audit logging, and data classification.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Eye className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Monitoring & Detection</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Assesses whether your security stack can see what your AI is doing — SIEM integration,
                  DLP interception on AI outputs, anomalous prompt volume alerts, and behavioral anomaly detection.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Red Team Readiness</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Tests whether you have validated your AI against known attack vectors — canary trap deployment,
                  indirect prompt injection testing, exfiltration URL validation, and scope boundary verification.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Zap className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Kill Switch & Incident Response</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Determines whether your organization can rapidly revoke AI access if a breach or misuse event occurs —
                  ownership assignment, documented revocation procedures, network isolation capability, and IR plan coverage.
                </p>
              </div>
            </div>
          </div>

          {/* Understanding Your Score */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Understanding Your Score
            </h2>
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-4 bg-slate-950 border border-emerald-500/20 rounded-lg p-4">
                <span className="text-2xl font-bold text-emerald-400 w-16 shrink-0">85–100%</span>
                <div>
                  <p className="font-semibold text-emerald-400">Secure</p>
                  <p className="text-sm text-slate-400">Strong AI governance posture. Focus on continuous improvement and staying ahead of emerging threats.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 bg-slate-950 border border-cyan-500/20 rounded-lg p-4">
                <span className="text-2xl font-bold text-cyan-400 w-16 shrink-0">65–84%</span>
                <div>
                  <p className="font-semibold text-cyan-400">Managed</p>
                  <p className="text-sm text-slate-400">Good foundation with meaningful gaps. Prioritize your highest-weight gaps and build a 90-day remediation plan.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 bg-slate-950 border border-amber-500/20 rounded-lg p-4">
                <span className="text-2xl font-bold text-amber-400 w-16 shrink-0">40–64%</span>
                <div>
                  <p className="font-semibold text-amber-400">Developing</p>
                  <p className="text-sm text-slate-400">Partial controls in place. Immediate focus needed on critical gaps — particularly in red team readiness and kill switch procedures.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 bg-slate-950 border border-red-500/20 rounded-lg p-4">
                <span className="text-2xl font-bold text-red-400 w-16 shrink-0">0–39%</span>
                <div>
                  <p className="font-semibold text-red-400">At Risk</p>
                  <p className="text-sm text-slate-400">Significant exposure across multiple domains. Consider pausing new AI deployments until foundational controls are in place.</p>
                </div>
              </div>
            </div>

            {/* Delta Risk */}
            <div className="bg-gradient-to-br from-red-900/20 to-slate-900 border border-red-500/30 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <BarChart2 className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-red-400 mb-2">About the AI Delta Risk Score</p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    The Delta Risk Score is the gap between your current posture and a fully hardened AI deployment
                    (100 − your maturity score). Unlike traditional security tools that measure what you have,
                    the Delta Risk Score quantifies your exposure. A score of +60 means 60% of your potential
                    AI-amplified risk is currently unaddressed — and AI moves at machine speed, making that
                    gap far more consequential than the same gap in a human workflow.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Best Practices for AI Deployment Security
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  <strong className="text-slate-200">Classify your data before you deploy.</strong> AI coworkers inherit the access you give them. If sensitive data isn't labeled, the AI doesn't know to protect it.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  <strong className="text-slate-200">Enable Zero Data Retention from day one.</strong> Most enterprise AI providers offer ZDR options. Enabling it after the fact does not erase what was already retained.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  <strong className="text-slate-200">Red team your AI before attackers do.</strong> Indirect prompt injection — where malicious instructions are embedded in documents the AI reads — is a real and documented threat vector.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  <strong className="text-slate-200">Practice your kill switch.</strong> A revocation procedure that has never been tested will fail when you need it most. Run a tabletop exercise at least annually.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  <strong className="text-slate-200">Treat AI service accounts like privileged identities.</strong> They should be monitored, rotated, and governed the same way you handle admin credentials.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  <strong className="text-slate-200">Bring AI into your existing IR plan.</strong> Don't create a separate playbook — integrate AI-specific scenarios into your current incident response framework so your team responds with muscle memory.
                </span>
              </li>
            </ul>
          </div>

          {/* Security Considerations */}
          <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl border border-yellow-500/30 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-yellow-300">
                Important Limitations to Understand
              </h2>
            </div>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">⚠️</span>
                <span>
                  <strong>This is a self-assessment, not a formal audit.</strong> Results reflect your own knowledge of your environment. Gaps you aren't aware of won't appear in your score.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">⚠️</span>
                <span>
                  <strong>The tool does not access your systems.</strong> It cannot verify whether controls are actually implemented — only whether you believe they are.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">⚠️</span>
                <span>
                  <strong>Scores are point-in-time.</strong> Your AI risk posture changes as your environment evolves. Re-run this assessment after major changes to your AI deployment.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">⚠️</span>
                <span>
                  <strong>A high score does not guarantee security.</strong> This tool measures documented intent and self-reported implementation — not the effectiveness of those controls under real-world attack conditions.
                </span>
              </li>
            </ul>
          </div>

          {/* Who Should Use This */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Who Should Use This Tool
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Lock className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Security & IT Teams</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Quickly baseline your organization's AI security maturity and identify which domains need the most immediate attention before a formal assessment or audit.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <BarChart2 className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Business & Operations Leaders</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Understand the risk you're carrying before approving or expanding AI coworker deployments across teams and departments.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Consultants & Advisors</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Use this as a structured intake tool when onboarding clients who are deploying or have already deployed AI coworkers in their environment.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Small & Mid-Size Businesses</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Get enterprise-grade AI security guidance without hiring a full security team. The results give you a clear, prioritized list of what to tackle first.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105"
            >
              <Shield className="w-5 h-5" />
              <span>Start the Assessment</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print This Guide</span>
            </button>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer and Important Notice:</strong> This tool is provided "as-is" for informational and educational purposes only. It does not constitute a formal security audit, compliance assessment, or legal advice. Results should not be used as the sole basis for security decisions. CyberLifeCoach is not liable for any security incidents, data loss, or damages arising from reliance on these results. Always engage qualified security professionals for formal assessments and compliance requirements.
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
