// AboutAPIAuthorizationHealthCheck.jsx
import React from "react";
import { ArrowLeft, Server, AlertTriangle } from "lucide-react";

export default function AboutAPIAuthorizationHealthCheck() {
  const handleOpenTool = () => {
    window.location.href = "/tools/api-authorization-health-check";
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

            <a
              href="/tools"
              className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tools Hub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
              API Security
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              BOLA / OWASP API Top 10
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-700">
              <Server className="w-12 h-12 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                About the API Authorization Health Check
              </h1>
              <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
                A dual-layer BOLA risk assessment that produces both an executive-ready risk summary and a developer-facing technical breakdown — built around OWASP API Security Top 10, API1:2023.
              </p>
              <p className="text-base text-cyan-400 font-semibold mt-2">
                A Veteran-Owned Business Committed to Your Digital Security
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">

          {/* What is BOLA */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">What is BOLA and why does it matter</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Broken Object Level Authorization, commonly called BOLA, is the number one vulnerability in the OWASP API
              Security Top 10. It occurs when an API fails to verify that the authenticated user actually has permission
              to access a specific object — allowing an attacker to simply change an ID in a request and retrieve data
              that belongs to someone else.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Unlike many attack techniques that require malware or exploits, BOLA requires nothing more than changing a
              number in a URL or request body. The system already trusts that the user is logged in. It simply never
              checks whether that user is allowed to touch that specific record.
            </p>
          </div>

          {/* Auth vs authz */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">The authentication versus authorization gap</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Think of an apartment building. Authentication is the front door — you prove you live there. Authorization
              is the lock on your individual unit. BOLA happens when the building checks your identity at the entrance
              but then lets you open any door once you are inside.
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
              Many security programs focus heavily on authentication — login walls, MFA, and session management.
              Authorization at the object level, meaning whether this specific user can read or write this specific
              record, is far less consistently enforced. That gap is exactly what BOLA exploits.
            </p>

            <div className="bg-gradient-to-br from-cyan-900/25 to-blue-900/25 border border-cyan-500/30 rounded-2xl p-6">
              <div className="text-xs text-cyan-300 font-semibold uppercase tracking-wider mb-2">
                The core principle
              </div>
              <p className="text-slate-300 leading-relaxed">
                Authentication tells you who someone is. Authorization decides what they are allowed to touch.
                Confusing the two creates silent, systemic risk that automated scanners often miss entirely —
                because the API behaves normally until the right identifier is changed.
              </p>
            </div>
          </div>

          {/* Real world impact */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Real world impact</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              BOLA has been the root cause of some of the largest API data exposures in recent years. In each case
              the underlying pattern was the same — the system verified identity but skipped object-level authorization.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300 leading-relaxed mb-4">
              <li><strong className="text-slate-200">Peloton (2021)</strong> — Private user profiles exposed by manipulating user IDs, even for accounts marked private.</li>
              <li><strong className="text-slate-200">Optus (2022)</strong> — Customer personal data accessible through an unauthenticated endpoint when identifiers were modified.</li>
              <li><strong className="text-slate-200">Experian (2021)</strong> — Credit data returned without enforcing authorization checks at the object level.</li>
              <li><strong className="text-slate-200">T-Mobile (2023)</strong> — 37 million customer accounts exposed through lookup APIs lacking object-level controls.</li>
              <li><strong className="text-slate-200">Instagram (2019)</strong> — Predictable user IDs combined with missing authorization checks enabled mass private data scraping.</li>
              <li><strong className="text-slate-200">Volkswagen (2025)</strong> — Connected car APIs treated VINs as authorization tokens, exposing owner data and vehicle service histories.</li>
            </ul>
            <p className="text-slate-300 leading-relaxed">
              The pattern is consistent across all of them. The system trusted the client request instead of validating
              access server-side for every individual object.
            </p>
          </div>

          {/* How the tool works */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">How the assessment works</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              The tool is structured as two independent layers. You can complete either one, both, or return to finish
              the second at any point. Each layer is scored separately and produces its own set of findings.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300 leading-relaxed mb-4">
              <li>
                <strong className="text-slate-200">Executive Risk Snapshot</strong> — Five questions designed for IT
                managers, CISOs, and technical directors. Takes approximately five minutes. Produces a risk tier rating,
                board-ready summary language, regulatory implications, and framework alignment against ISO 27001, NIST
                SP 800-53, OWASP, and GDPR.
              </li>
              <li>
                <strong className="text-slate-200">Developer Deep Dive</strong> — Seven questions targeting developers,
                DevSecOps engineers, and architects. Takes fifteen to twenty minutes. Evaluates object identification
                design, ownership validation logic, access control models, query-level enforcement, background task
                authorization, and service-to-service revalidation.
              </li>
            </ul>
            <p className="text-slate-300 leading-relaxed">
              After completing either layer, the results dashboard displays your risk tier, specific findings,
              remediation guidance, and downloadable reports — one executive summary and one technical remediation report.
            </p>
          </div>

          {/* Developer layer detail */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">What the developer layer evaluates</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              The developer assessment covers the specific implementation patterns where BOLA most commonly appears.
              Each section is drawn directly from real-world breach patterns and OWASP guidance.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300 leading-relaxed mb-4">
              <li>Whether your API uses sequential integer IDs that can be trivially enumerated.</li>
              <li>Whether ownership validation happens inside the database query or after data has already been retrieved.</li>
              <li>Whether your access control model is role-based, attribute-based, or authentication-only.</li>
              <li>Whether user ID constraints are included directly in database WHERE clauses.</li>
              <li>How background jobs and async tasks handle authorization context for each object they process.</li>
              <li>Whether internal microservice calls re-validate permissions or trust upstream services unconditionally.</li>
              <li>Whether your API ever accepts client-supplied user IDs in request bodies or parameters.</li>
            </ul>
            <p className="text-slate-300 leading-relaxed">
              Each finding includes a severity rating and a specific corrective action. The most critical pattern —
              trusting client-supplied identity — receives its own dedicated remediation guidance.
            </p>
          </div>

          {/* Privacy */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Privacy and local-only design</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              This tool follows the same privacy principles as every CyberLife Coach tool. It is a static page that
              runs entirely in your browser. There is no server-side processing of your responses.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300 leading-relaxed mb-4">
              <li>All answers are processed locally and never transmitted to any server.</li>
              <li>No account or registration is required.</li>
              <li>Downloaded reports are generated in your browser and saved directly to your device.</li>
              <li>No analytics are attached to individual assessment responses.</li>
            </ul>
            <p className="text-slate-300 leading-relaxed">
              This makes the tool appropriate for use in enterprise environments where sensitive architecture details
              cannot leave the device.
            </p>
          </div>

          {/* Next step */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Next step</h2>
            <p className="text-slate-300 leading-relaxed">
              If you have not run the assessment yet, open the tool and start with whichever layer matches your role.
              Executives can complete the five-question snapshot in a single sitting and walk away with a board-ready
              summary. Developers should plan for fifteen to twenty minutes to work through the technical layer and
              review each remediation recommendation carefully. Use the findings to start a focused conversation with
              your development and security teams about object-level authorization in your APIs.
            </p>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-8">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer and Important Notice:</strong> This tool and the
              associated assessment are provided for educational and informational purposes only. They do not connect
              to your systems, perform live API testing, or execute any security scans. Results are based entirely on
              self-reported answers. Always validate findings with qualified security professionals before making
              architecture or compliance decisions.
            </p>
          </div>

          {/* Bottom actions */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mb-10 no-print">
            <button
              type="button"
              onClick={handleOpenTool}
              className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <span className="text-lg">🚀</span>
              <span>Open the API Authorization Health Check</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 border border-slate-600 rounded-xl text-slate-100 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print this Guide</span>
            </button>
          </div>

          {/* Callout */}
          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-300 leading-relaxed">
                This assessment is a starting point, not a substitute for professional penetration testing. Use the
                findings to prioritize conversations with your development and security teams about object-level
                authorization in your APIs.
              </p>
            </div>
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
