import React from 'react';
import { GitBranch, ArrowLeft } from 'lucide-react';

export default function AboutChangeManagementPolicy() {
  const handleOpenTool = () => {
    window.location.href = '/policy-generators/change-management-policy';
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/policy-generators" className="flex items-center space-x-3 group cursor-pointer">
              <img 
                src="/logo.png" 
                alt="CyberLifeCoach" 
                className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300" 
              />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:brightness-125 transition-all duration-300">
                CyberLifeCoach
              </span>
            </a>

             <button
                      onClick={() => window.location.href = '/policy-generators'}
                      className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-all duration-300 border border-slate-700 hover:border-cyan-500"
                      >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Business Policy Hub</span>
                      </button>

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
              About this tool
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Policy Generator
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Client-Side Processing
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the Change Management Policy Generator
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            This page explains how the Change Management Policy Generator works, who it is for, and how it supports a consistent, 
            auditable approach to change. The goal is to help you move from ad hoc changes toward a simple, documented process that teams can follow.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Security Badge */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-4 flex items-center space-x-3">
            <span className="text-2xl">⚡</span>
            <span className="text-cyan-300 font-semibold">Client-Side Processing — Your Data Stays Local</span>
          </div>

          {/* Quick Highlights */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
            <p className="text-slate-400 mb-4 leading-relaxed">
              <strong className="text-cyan-400">Quick highlights:</strong> Covers roles, change types, approvals, and risk. 
              Supports communication, testing, CAB, and metrics. Browser based workflow with local processing only.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            
            {/* What this generator does */}
            <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Overview</div>
              <h2 className="text-2xl font-bold mb-4">What this generator does</h2>
              <p className="text-slate-400 mb-4 leading-relaxed">
                The Change Management Policy Generator walks you through the essential sections of a change management policy.
                It prompts you for the information you already know about your environment and turns it into a structured,
                readable document.
              </p>
              <p className="text-slate-400 mb-4 leading-relaxed">
                Instead of starting with a blank page, you capture each part of your process, from who can request changes to
                how they are evaluated, approved, implemented, and reviewed. The tool assembles this into a single policy you
                can adapt for internal use, audits, or training.
              </p>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Defines purpose, scope, and governance for change management.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Clarifies roles, responsibilities, and decision authority.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Describes change categories, risk assessment, and approval paths.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Supports documentation, metrics, and continuous improvement.</span>
                </li>
              </ul>
            </div>

            {/* Who this generator is for */}
            <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Audience</div>
              <h2 className="text-2xl font-bold mb-4">Who this generator is for</h2>
              <p className="text-slate-400 mb-4 leading-relaxed">
                This generator is designed for teams that need a clear, practical change management policy without a heavy
                tooling stack. It can help small IT teams, managed service providers, and growing organizations that want
                more predictable changes.
              </p>
              <ul className="space-y-3 text-slate-400 mb-4">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>IT and operations teams managing infrastructure or applications.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Security and compliance leads preparing for audits or certifications.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Small organizations that want a straightforward, written process.</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  IT and ops leads
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                  Security and compliance
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-600">
                  Managed service providers
                </span>
              </div>
              <p className="text-slate-400 mb-3 leading-relaxed">
                A written change management policy also supports conversations with vendors, partners, and regulators. It
                shows how your team reduces risk, learns from incidents, and keeps systems available while still improving
                them over time.
              </p>
              <p className="text-slate-400 leading-relaxed">
                The generator provides structure. You still decide how strict or flexible your process should be based on
                your size, risk tolerance, and business needs.
              </p>
            </div>

            {/* How the workflow is organized */}
            <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Workflow</div>
              <h2 className="text-2xl font-bold mb-4">How the workflow is organized</h2>
              <p className="text-slate-400 mb-4 leading-relaxed">
                The Change Management Policy Generator mirrors the sections you would expect to see in a modern policy that
                supports IT operations, security, and audit teams.
              </p>
              <ul className="space-y-3 text-slate-400 mb-4">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>
                    Basic information, where you describe your organization, the purpose of the policy, and the systems or
                    environments it covers.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>
                    Roles and responsibilities, where you define who requests, reviews, approves, implements, and verifies
                    changes, including any Change Advisory Board.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>
                    Change types, where you describe categories such as standard, normal, and emergency change, along with
                    examples.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>
                    Request and approval process, where you outline how changes are proposed, assessed, approved, rejected, or
                    deferred.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>
                    Risk and impact assessment, where you capture how you score risk, evaluate impact, and choose the right
                    approval path.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>
                    Implementation, communication, and testing, where you describe deployment planning, stakeholder
                    communication, pre change and post change testing, and fallback preparations.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>
                    Documentation, metrics, and continuous improvement, where you define record keeping needs and how you use
                    change data to improve over time.
                  </span>
                </li>
              </ul>
              <p className="text-slate-400 leading-relaxed">
                When you select "Generate Policy" in the tool, these sections are combined into one document that you can
                review, edit, and align with your internal standards.
              </p>
            </div>

            {/* Alignment with best practices */}
            <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Best Practices</div>
              <h2 className="text-2xl font-bold mb-4">Alignment with best practices and frameworks</h2>
              <p className="text-slate-400 mb-4 leading-relaxed">
                The generator takes inspiration from common change management practices found in IT operations and security
                frameworks. It does not implement any framework in full, but it helps you speak the same language.
              </p>
              <ul className="space-y-3 text-slate-400 mb-4">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>
                    IT service management practices, which highlight the importance of formal change control, risk assessment,
                    and post implementation review.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>
                    Security and control frameworks, which expect documented processes for changes that can affect
                    confidentiality, integrity, or availability of systems and data.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>
                    Audit and assurance expectations, which often require evidence of approvals, testing, and consistent
                    application of change procedures.
                  </span>
                </li>
              </ul>
              <p className="text-slate-400 leading-relaxed">
                You can reference specific standards, such as internal IT governance, ISO style control families, or cloud
                provider guidance, inside the generated policy where appropriate.
              </p>
            </div>

            {/* Local processing */}
            <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Privacy</div>
              <h2 className="text-2xl font-bold mb-4">Local processing and data handling</h2>
              <p className="text-slate-400 mb-4 leading-relaxed">
                The Change Management Policy Generator runs entirely in your browser. All logic is implemented in client side
                JavaScript, and the text is assembled locally on your device.
              </p>
              <ul className="space-y-3 text-slate-400 mb-4">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>No policy content is sent to a server while you use the tool.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>No change data, system names, or approval details are stored by CyberLifeCoach.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Exports create text files directly in your browser for you to download and manage.</span>
                </li>
              </ul>
              <p className="text-slate-400 leading-relaxed">
                Even so, policy text can still contain sensitive information about systems, processes, and roles. Store the
                generated policy in the same secure locations you use for other internal documents, and share it only with
                people who need to see it.
              </p>
            </div>

            {/* Governance and legal */}
            <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Governance</div>
              <h2 className="text-2xl font-bold mb-4">Governance and legal considerations</h2>
              <p className="text-slate-400 mb-4 leading-relaxed">
                A change management policy is part of your broader governance and risk management program. This generator
                helps you draft that policy. It does not review or approve changes, connect to ticketing systems, or enforce
                the process you describe.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Many organizations align their change management policies with other documents, such as incident response
                plans, access control policies, or vendor management practices. You can reference those relationships from
                within the policy you generate.
              </p>
            </div>
          </div>

          {/* Important Notice */}
          <div className="md:col-span-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <span className="text-2xl">ℹ️</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-2">Important Notice</h4>
                <p className="text-sm text-slate-300 leading-relaxed mb-3">
                  This tool is a documentation aid and does not provide legal, regulatory, or audit advice. All information
                  you enter is processed locally in your browser and is not stored or transmitted by CyberLifeCoach. You are
                  responsible for reviewing the generated policy, ensuring it reflects your actual practices, and validating
                  that it meets the requirements of your organization and any applicable laws or regulations.
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  If you are unsure whether the policy meets a specific requirement, consult your legal, compliance, or audit
                  team before adopting it formally.
                </p>
              </div>
            </div>
          </div>

          {/* Button Row */}
          <div className="md:col-span-2">
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={handleOpenTool}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              >
                <GitBranch className="w-5 h-5" />
                <span>Open Change Management Policy Generator</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
              >
                <span className="text-lg">🖨️</span>
                <span>Print This Page</span>
              </button>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="md:col-span-2">
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
              <p className="text-sm text-slate-400 leading-relaxed">
                <strong className="text-cyan-400">Legal Disclaimer:</strong> This page and tool are provided for informational purposes only and do not constitute legal advice. Requirements vary by jurisdiction, contract, and regulatory regime. Obtain review from qualified counsel and your security/compliance teams before adopting any generated text. Use of this site does not create an attorney-client relationship, and no warranties are made regarding completeness, accuracy, or fitness for a particular purpose.
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
            <p>&copy; 2026 CyberLifeCoach</p>
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
