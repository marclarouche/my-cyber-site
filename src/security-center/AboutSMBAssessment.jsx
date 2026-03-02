import React from 'react';
import { Shield, ArrowLeft, Printer } from 'lucide-react';

export default function AboutSMBAssessment() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/security-center" className="flex items-center space-x-3 group cursor-pointer">
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
                         onClick={() => window.location.href = '/security-center'}
                         className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-all duration-300 border border-slate-700 hover:border-cyan-500"
                         >
                         <ArrowLeft className="w-4 h-4" />
                         <span>Back to Security Center</span>
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
        
        <div className="relative max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">About this assessment tool</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Small businesses (5–50 people)</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Local, in-browser helper</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About Small Business Security Assessment
          </h1>
          
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            This page explains how the Small Business Security Assessment works, which areas it evaluates, and how to use the results safely. The assessment runs as a guided questionnaire in your browser so you can quickly score your current posture, identify quick wins, and capture evidence you can reuse with clients, insurers, and auditors.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            {/* Action Buttons at Top */}
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href="/security-center/small-business-eval"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <Shield className="w-5 h-5" />
                <span>Open Small Business Assessment</span>
              </a>
              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold border border-slate-700 hover:border-cyan-500 transition-all hover:bg-slate-800"
              >
                <Printer className="w-5 h-5" />
                <span>Print this page</span>
              </button>
            </div>

            {/* Two Column Grid - Overview and Quick Start */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Overview</div>
                <h2 className="text-2xl font-bold mb-4">What this assessment is designed to do</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  The Small Business Security Assessment is a local-only helper that walks you through a concise set of security questions tailored to small organizations. It focuses on the most common gaps that appear in insurance questionnaires, client security reviews, and basic audit checklists.
                </p>
                <ul className="space-y-2 text-slate-400 mb-4">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Collects answers about people, devices, data protection, vendors, and incident readiness.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Calculates simple scores for each area so you can see strengths and weak spots at a glance.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Generates a prioritized action list you can turn into a roadmap or improvement plan.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Helps you capture plain language evidence that aligns with common audit and insurance questions.</span>
                  </li>
                </ul>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Insurance and client questionnaires</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Security health check for owners</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Roadmap starter for small teams</span>
                </div>

                <p className="text-slate-400 leading-relaxed text-sm">
                  Nothing is sent back to CyberLife Coach or to any third party. All logic runs in your browser, and any exported reports stay on your systems.
                </p>
              </div>

              <div>
                <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Quick start</div>
                <h2 className="text-2xl font-bold mb-4">How to use the assessment results</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  The assessment guides you through a series of questions and then produces a summary view of your scores and next steps. You decide how to use that output in your own environment.
                </p>
                <ul className="space-y-2 text-slate-400 mb-4">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Open the tool and choose the profile that best matches your situation, for example very small team or growing team.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Work through each section, answering questions as honestly as possible based on current practices.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Review the score breakdown and short narrative summary for people, devices, data, vendors, and response.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Export the results to a file, for example <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">smb-security-assessment.json</code> or <code className="text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">smb-security-summary.md</code>.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Use the prioritized action list as a lightweight project plan and track items to completion.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Refer back to the assessment periodically so you can measure progress over time.</span>
                  </li>
                </ul>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Treat this as a planning and communication aid. It does not make configuration changes and it does not replace technical testing or professional consulting for complex environments.
                </p>
              </div>
            </div>

            {/* Coverage areas section */}
            <div className="mb-8">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Coverage areas</div>
              <h2 className="text-2xl font-bold mb-4">What this assessment looks at</h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                The assessment focuses on a practical subset of topics that repeatedly show up in security questionnaires for small businesses. Questions are written in plain language so owners, office managers, and non technical staff can participate.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">People and access</h3>
                  <ul className="space-y-2 text-slate-400 mb-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Use of unique accounts and basic account hygiene for staff and contractors.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Multi factor authentication coverage on email, finance, and key business tools.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Onboarding and offboarding steps for new hires, departures, and role changes.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Staff awareness of phishing, social engineering, and basic data handling rules.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Use of written policies for acceptable use, remote work, and device ownership.</span>
                    </li>
                  </ul>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    This area gives you a quick view of how well your human processes support secure access to critical systems and data.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">Devices, data, and vendors</h3>
                  <ul className="space-y-2 text-slate-400 mb-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>How laptops, desktops, and mobile devices are protected and kept up to date.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Use of disk encryption, backups, and basic data classification for sensitive records.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Coverage of endpoint security tools such as antivirus and basic hardening baselines.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Vendor and cloud service usage, including how access and data location are tracked.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Presence of a simple incident playbook for ransomware, account compromise, or data loss.</span>
                    </li>
                  </ul>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    These questions help you understand where business data lives, how it is protected, and how reliant you are on third party services.
                  </p>
                </div>
              </div>
            </div>

            {/* Safe use and boundaries */}
            <div className="mb-8">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Safe use and boundaries</div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">Before you rely on this assessment</h3>
                  <ul className="space-y-2 text-slate-400">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Confirm who in your organization is allowed to answer on behalf of the business.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Involve both technical and non technical stakeholders where possible so answers are balanced.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Document assumptions and notes for any questions that feel ambiguous or context dependent.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Pair this assessment with at least basic technical checks such as patch status and backup tests.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Revisit and refresh answers whenever there are major changes in staff, tools, or data flows.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-400">Good next steps</h3>
                  <ul className="space-y-2 text-slate-400">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Turn your prioritized actions into a small backlog or task list with clear owners and dates.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Store exported reports securely so you can reference them during insurance or client reviews.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Use the questions as a starting agenda for board, owner, or leadership level discussions.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Map key findings to frameworks such as NIST CSF or CIS Controls if you need a more formal view.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Scope Note */}
            <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-slate-700">
              <p className="text-sm text-slate-400 leading-relaxed">
                This assessment provides a curated set of questions inspired by common insurance and audit themes and by controls found in frameworks such as NIST CSF and CIS Controls. It is not a full compliance program, but a practical starting point for small businesses that want to understand and improve their security posture.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="text-3xl flex-shrink-0">⚠️</div>
                <div>
                  <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-3">Important Notice & Legal Disclaimer</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    This assessment and any exported summaries are provided for educational and informational use only. They do not replace professional advice and they do not guarantee compliance with DISA STIGs, NIST CSF, CIS Controls, GDPR, cyber insurance requirements, or any other framework or contract. All logic runs locally in your browser and any output stays on your systems, yet you are fully responsible for how you interpret and use the results. Always verify findings against your own environment, involve qualified professionals where appropriate, and make sure you have reliable backups and incident response plans in place before making significant changes. Do not treat this tool as a formal audit, penetration test, or certification of security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="w-6 h-6 text-cyan-400" />
            <span className="font-bold text-lg">CyberLifeCoach</span>
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
