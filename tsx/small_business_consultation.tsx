import React, { useState } from 'react';
import { Shield, ArrowLeft, CheckCircle, Building, Calendar, FileText, Users, Lock, Database, AlertTriangle, Target, Clock, DollarSign } from 'lucide-react';

export default function SmallBusinessConsultation() {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  const quickstartModules = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Asset Awareness",
      description: "What systems exist, who has access, and what matters most."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Access Control Basics",
      description: "Multi-factor authentication, role separation, offboarding, and shared login cleanup."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Data Protection",
      description: "Backups, encryption basics, and where sensitive data lives."
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Incident Readiness",
      description: "Who decides, what to do first, and how to reduce damage quickly."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Essential Policies",
      description: "Password policy, acceptable use, and incident response basics."
    }
  ];

  const deliverables = [
    "A prioritized written plan for the next 30 days",
    "A short executive summary suitable for internal leadership or basic questionnaires",
    "Clear, plain English rationale for the highest value controls"
  ];

  const notReviewed = [
    "Password vault contents, customer PII, or client records",
    "Security logs, forensic artifacts, or incident triage",
    "System configuration changes during the call"
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Book & Share",
      description: "You book a paid call and answer a short intake about staff, tools, and data handled."
    },
    {
      step: "2",
      title: "Identify & Plan",
      description: "We identify the highest risk gaps and convert them into a realistic plan."
    },
    {
      step: "3",
      title: "Receive & Decide",
      description: "You receive your written plan and decide if you want follow-up support or an onsite visit."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
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

            <div className="flex items-center space-x-6">
              <a href="/" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </a>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
                Book Session
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30 mb-8">
            <Building className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-300">For Small Businesses</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight">
            Small Business Cyber QuickStart
          </h1>
          
          <p className="text-xl text-slate-300 mb-4 max-w-3xl mx-auto font-semibold">
            Minimum baseline security for companies under 50 people, with a written plan and clear priorities
          </p>

          <p className="text-lg text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            This is guidance only. You get a practical 30-day plan, plus a short executive summary you can reuse for questionnaires. Optional onsite white glove visits are available separately.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setShowQuestionnaire(true)}
              className="group bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Book This Session</span>
            </button>
            <button className="px-8 py-4 rounded-lg font-semibold text-lg border-2 border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-900 flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Try Free Preview</span>
            </button>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              What You Get
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              Survivable security. Not perfection. You leave knowing what to do next, in the right order, without buying a pile of tools.
            </p>
          </div>

          {/* QuickStart Modules */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">QuickStart Modules</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickstartModules.map((module, index) => (
                <div key={index} className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all duration-300">
                  <div className="text-cyan-400 mb-4">
                    {module.icon}
                  </div>
                  <h4 className="text-lg font-bold mb-2">{module.title}</h4>
                  <p className="text-sm text-slate-400">{module.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables & Not Reviewed Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-cyan-500/30">
              <div className="flex items-center space-x-3 mb-6">
                <CheckCircle className="w-8 h-8 text-cyan-400" />
                <h3 className="text-2xl font-bold">Deliverables</h3>
              </div>
              <ul className="space-y-4">
                {deliverables.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700">
              <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="w-8 h-8 text-orange-400" />
                <h3 className="text-2xl font-bold">What I Will Not Review</h3>
              </div>
              <ul className="space-y-4">
                {notReviewed.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0 mt-2"></div>
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
                  <span className="text-2xl font-bold text-cyan-400">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Who Should Attend */}
          <div className="bg-slate-900/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-8 h-8 text-cyan-400" />
              <h3 className="text-2xl font-bold">Who Should Attend</h3>
            </div>
            <p className="text-slate-300 text-lg">
              The owner is best. The accidental IT person is also fine, as long as they can implement changes after the call.
            </p>
          </div>

          {/* Privacy Boundary Callout */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-xl p-8">
            <div className="flex items-start space-x-4">
              <Lock className="w-8 h-8 text-cyan-400 flex-shrink-0" />
              <div>
                <h4 className="text-xl font-bold text-cyan-400 mb-3">Privacy Boundary</h4>
                <p className="text-slate-300 leading-relaxed">
                  No accounts are required. No uploads are requested. I do not review password vaults, customer PII, or security logs. Guidance is based on what you choose to share during the session.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-cyan-500/30 text-center">
            <h2 className="text-3xl font-bold mb-4">Investment</h2>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <DollarSign className="w-10 h-10 text-cyan-400" />
              <span className="text-6xl font-bold text-cyan-400">150</span>
            </div>
            <p className="text-slate-400 mb-2">One-time consultation fee</p>
            <p className="text-sm text-slate-500 mb-8">Includes 30-day written plan and executive summary</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
                Book Session Now
              </button>
              <button className="px-8 py-4 rounded-lg font-semibold text-lg border-2 border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-900">
                Try Free Preview First
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-500/10 border-2 border-yellow-500/30 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="bg-yellow-500/20 p-3 rounded-lg">
                  <Shield className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-yellow-400">Legal Disclaimer</h3>
                <p className="text-slate-300 leading-relaxed">
                  This service provides educational guidance only and does not certify compliance with any framework. You are responsible for changes you make to your systems. If you want hands-on changes, those are handled only through a separate onsite engagement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-cyan-900/30 to-blue-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Secure Your Business?</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Get your practical 30-day security plan and take control of your cyber risk today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-5 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center space-x-3">
              <Calendar className="w-6 h-6" />
              <span>Book Your Session</span>
            </button>
            <button className="px-10 py-5 rounded-lg font-semibold text-lg border-2 border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-900 inline-flex items-center space-x-3">
              <FileText className="w-6 h-6" />
              <span>Free Preview Assessment</span>
            </button>
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