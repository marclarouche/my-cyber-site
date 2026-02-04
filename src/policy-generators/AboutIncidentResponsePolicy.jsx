import React from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

export default function AboutIncidentResponsePolicy() {
  const handleOpenTool = () => {
    window.location.href = '/policy-generators/incident-response-policy';
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

            <a href="/policy-generators" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Business Policy Hub</span>
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
            About the Incident Response Policy Generator
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            Create a practical, actionable incident response policy for your organization, generated locally on your device.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Security Badge */}
      <section className="px-4 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-4 flex items-center space-x-3">
            <span className="text-2xl">⚡</span>
            <span className="text-cyan-300 font-semibold">Client-Side Processing, your data never leaves your browser</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {/* What this tool does */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Overview</div>
            <h2 className="text-2xl font-bold mb-4">What this tool does</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              This generator helps you create a comprehensive incident response policy that defines how your organization prepares for, 
              detects, responds to, and recovers from security incidents. It covers the essential elements needed for effective incident 
              management and coordination.
            </p>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              <strong className="text-cyan-400">Note:</strong> Processing happens entirely in your browser. No inputs are sent to any server.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Client-Side Only
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                Instant Download
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-600">
                No Server Upload
              </span>
            </div>
          </div>

          {/* Why you need this */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Importance</div>
            <h2 className="text-2xl font-bold mb-4">Why you need this</h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Reduces confusion and response time during actual security incidents.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Establishes clear roles, responsibilities, and escalation paths.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Helps meet regulatory and compliance requirements for incident management.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Provides a framework for post-incident learning and improvement.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Documents notification requirements for legal, regulatory, and customer needs.</span>
              </li>
            </ul>
          </div>

          {/* Policy components covered */}
          <div className="md:col-span-2 bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Coverage</div>
            <h2 className="text-2xl font-bold mb-4">Policy components covered</h2>
            <ul className="grid md:grid-cols-2 gap-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Purpose and scope:</strong> Systems, data types, users, and locations included in the policy.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Roles and responsibilities:</strong> IR team structure including lead, communications, forensics, legal, and IT operations.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Severity classification:</strong> How incidents are categorized (Low, Medium, High, Critical) and escalated.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Detection and triage:</strong> Sources including EDR alerts, email reports, SIEM rules, and threat intel feeds.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Containment and eradication:</strong> Response actions to isolate, remove threats, and restore operations.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Evidence handling:</strong> Chain of custody, disk images, logs, and time-stamped documentation.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Communication channels:</strong> Phone trees, out-of-band chat, ticketing, and executive briefings.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Notification timelines:</strong> When and how to notify customers, regulators, and executives.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Tooling and resources:</strong> EDR/AV, SIEM, backup platforms, ticketing systems, and templates.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">External contacts:</strong> Outside counsel, DFIR partners, insurers, key vendors, and law enforcement.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Post-incident review:</strong> Lessons learned, control updates, tabletop exercises, and metrics tracking.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span><strong className="text-slate-300">Governance:</strong> Annual review cycle and update processes as technology and regulations change.</span>
              </li>
            </ul>
          </div>

          {/* How to use the generator */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Getting Started</div>
            <h2 className="text-2xl font-bold mb-4">How to use the generator</h2>
            <ol className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">1.</span>
                <span>Enter your organization name and define the policy scope (systems, data, users, locations).</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">2.</span>
                <span>Specify your severity classification levels and how incidents escalate.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">3.</span>
                <span>Define IR team roles including who leads, communicates, investigates, and coordinates.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">4.</span>
                <span>List your detection sources (EDR, SIEM, email reports, vendor notices, threat intel).</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">5.</span>
                <span>Describe containment, eradication, and recovery procedures.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">6.</span>
                <span>Document evidence handling requirements and chain of custody processes.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">7.</span>
                <span>Specify notification timelines for customers, regulators, and executives.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">8.</span>
                <span>List your tooling, external contacts, and post-incident review approach.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">9.</span>
                <span>Generate the policy and download as TXT, Markdown, or save as PDF.</span>
              </li>
            </ol>
          </div>

          {/* Best practices */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Best Practices</div>
            <h2 className="text-2xl font-bold mb-4">Implementation tips</h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Test your incident response plan with tabletop exercises at least annually.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Ensure all team members know their roles and have access to required tools and contacts.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Document and review real incidents to continuously improve your response procedures.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Keep external contact information current, including after-hours numbers.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Review and update the policy when technology, regulations, or team structure changes.</span>
              </li>
            </ul>
          </div>

          {/* Helpful references - Full Width */}
          <div className="md:col-span-2 bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Resources</div>
            <h2 className="text-2xl font-bold mb-4">Helpful references</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              For guidance on incident response frameworks and best practices:
            </p>
            <ul className="grid md:grid-cols-2 gap-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    NIST SP 800-61 Rev. 2
                  </a> - Computer Security Incident Handling Guide
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://www.sans.org/white-papers/33901/" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    SANS Incident Handler's Handbook
                  </a> - Practical incident response guidance
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://www.iso.org/standard/78096.html" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    ISO/IEC 27035
                  </a> - Information security incident management
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <a href="https://www.cisa.gov/resources-tools/resources/incident-response" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 underline">
                    CISA Incident Response Resources
                  </a> - Government guidance and tools
                </span>
              </li>
            </ul>
          </div>

          {/* Button Row */}
          <div className="md:col-span-2">
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={handleOpenTool}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              >
                <AlertTriangle className="w-5 h-5" />
                <span>Open Incident Response Policy Generator</span>
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
                <strong className="text-cyan-400">Legal Disclaimer:</strong> This generator provides a template for informational purposes only and does not constitute legal, regulatory, or compliance advice. Requirements vary by jurisdiction, industry, contracts, and incident type. Have qualified legal and security professionals review this policy before adoption or publication.
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
