import React from 'react';
import { Calculator, ArrowLeft, Shield, CheckCircle, AlertTriangle, Users, TrendingUp, Lock, Target } from 'lucide-react';

export default function AboutDigitalRiskCalculator() {
  const handleOpenTool = () => {
    window.location.href = '/tools/digital-risk-calculator';
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
              Assessment Tool Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Risk Analysis
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Client-Side Only
            </span>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              Universal Digital Risk Calculator
            </h1>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-sm font-semibold whitespace-nowrap">
              About This Tool
            </span>
          </div>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            This page explains what the Universal Digital Risk Calculator does, who it is for, and how to use it to guide
            practical security decisions for yourself, your family, or your organization.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Key Features Notice */}
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-300">
              <div className="flex items-start space-x-3">
                <Lock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-blue-300 block mb-1">Runs locally</strong>
                  <span>All calculations happen in your browser</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-blue-300 block mb-1">No accounts</strong>
                  <span>Use it anytime without logging in</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-blue-300 block mb-1">Audience aware</strong>
                  <span>Profiles for students, retirees, travelers, journalists, non-profits, and small businesses</span>
                </div>
              </div>
            </div>
          </div>

          {/* What this calculator does */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              What this calculator does
            </h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              The Universal Digital Risk Calculator is a client side assessment tool. It helps you quickly estimate digital
              risk for different real world profiles using a small set of plain language questions. The goal is not a perfect
              score. Instead, it is a conversation starter that shows where your habits and controls are strong and where they
              leave you exposed.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              Each profile student, retiree, traveler or digital nomad, journalist, non profit, and small business has a
              different threat model. The tool reflects that reality. The questions and risk explanations change based on
              the profile you select so the score feels relevant to the way you actually live and work.
            </p>

            <h3 className="text-xl font-bold mb-4 text-cyan-400">How it works</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold flex-shrink-0">1.</span>
                <span className="text-slate-300">You pick the profile that best matches the person or organization you are assessing.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold flex-shrink-0">2.</span>
                <span className="text-slate-300">You answer a short series of questions about everyday habits and basic security controls.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold flex-shrink-0">3.</span>
                <span className="text-slate-300">The tool calculates a percentage score based on the answers for that profile.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold flex-shrink-0">4.</span>
                <span className="text-slate-300">You receive a color coded risk level with a simple breakdown and practical recommendations.</span>
              </li>
            </ul>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-blue-300 mb-2">Privacy first</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Your answers never leave the page. The calculator runs entirely in your browser, and no data is sent to
                    CyberLifeCoach.pro or any third party. You can close the tab at any time and your responses are gone.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4 text-cyan-400 mt-6">When to use it</h3>
            <p className="text-slate-400 leading-relaxed">
              This tool is helpful when you want a structured starting point rather than a vague feeling that things might
              be risky. It can support conversations with family members, leadership teams, board members, or clients who need
              a clear, visual way to understand digital exposure before they commit to changes.
            </p>
          </div>

          {/* Available Profiles */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Available Profiles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Users className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Student</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Social media usage, shared devices, campus networks, and identity protection.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Retiree</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Financial accounts, healthcare data, scam prevention, and family communications.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Target className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Traveler / Digital Nomad</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Public Wi-Fi, device security, international access, and data backups.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Journalist</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Source protection, secure communications, device encryption, and adversarial threats.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Non-Profit</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Donor data protection, volunteer access, budget constraints, and compliance needs.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <TrendingUp className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Small Business</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Customer data, payment processing, employee training, and vendor security.
                </p>
              </div>
            </div>
          </div>

          {/* How to use the tool */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-baseline space-x-3 mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                How to use the tool
              </h2>
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold uppercase tracking-wider">
                Quick start
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              You can complete a full assessment in just a few minutes. You do not need technical skills to understand the
              questions or the results. Use the recommendations as a checklist. When you have implemented new protections,
              run the calculator again and compare your new risk level.
            </p>

            <h3 className="text-xl font-bold mb-4 text-cyan-400">Step by step</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold flex-shrink-0">1.</span>
                <span className="text-slate-300">Select the profile that feels closest to your situation, for example retiree or small business.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold flex-shrink-0">2.</span>
                <span className="text-slate-300">Answer each question honestly based on current behavior instead of ideal habits.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold flex-shrink-0">3.</span>
                <span className="text-slate-300">Review the color coded score and the risk breakdown for each area.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold flex-shrink-0">4.</span>
                <span className="text-slate-300">Focus on the recommended actions that deliver the biggest improvement for the least effort.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold flex-shrink-0">5.</span>
                <span className="text-slate-300">Repeat the process after you make changes so you can see progress over time.</span>
              </li>
            </ul>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6">
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-blue-300 mb-2">Tip for coaches and teams</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    You can run the calculator together with clients, loved ones, or staff members. It creates a shared picture
                    of risk and makes it easier to agree on next steps.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Levels Explained */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Understanding Risk Levels
            </h2>
            <div className="space-y-4">
              <div className="bg-slate-950 border-l-4 border-green-500 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-2">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-green-400">Low Risk (70-100%)</h3>
                </div>
                <p className="text-sm text-slate-400 ml-9">
                  Strong security posture with comprehensive protections in place. Continue maintaining good practices.
                </p>
              </div>
              <div className="bg-slate-950 border-l-4 border-yellow-500 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-2">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-yellow-400">Medium Risk (40-69%)</h3>
                </div>
                <p className="text-sm text-slate-400 ml-9">
                  Basic protections exist but significant gaps remain. Focus on implementing recommended improvements.
                </p>
              </div>
              <div className="bg-slate-950 border-l-4 border-red-500 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-2">
                  <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-red-400">High Risk (0-39%)</h3>
                </div>
                <p className="text-sm text-slate-400 ml-9">
                  Critical vulnerabilities present. Prioritize immediate action on fundamental security controls.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Benefits of Regular Assessment
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <TrendingUp className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Track Progress</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Measure improvement over time as you implement security controls and develop better habits.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Target className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Prioritize Actions</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Focus on changes that have the biggest impact on your risk score and security posture.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Users className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Facilitate Conversations</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Create shared understanding of risk with family, team members, or clients using visual results.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Identify Gaps</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Discover blind spots in your security approach before they become real problems.
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
              <Calculator className="w-5 h-5" />
              <span>Open Digital Risk Tool</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print this page</span>
              <kbd className="ml-2 px-2 py-1 text-xs font-mono bg-slate-950 border border-slate-600 rounded text-cyan-300">Ctrl+P</kbd>
            </button>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer and Important Notice:</strong> The Universal Digital Risk Calculator is an educational tool. It does not provide legal, financial, or professional security advice, and it cannot guarantee protection against attacks or data loss. Always test changes in a safe environment, keep reliable backups of important data, and consult qualified professionals for high risk situations or regulated environments.
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
