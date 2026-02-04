import React from 'react';
import { Shield, ArrowLeft, CheckCircle, Server, HardDrive, Calendar, FileText, Lock, Users, Zap, AlertTriangle, Home, Building2, Network, Database } from 'lucide-react';

export default function PrivateStorageConsultation() {
  const homeSetup = {
    whatWeSetup: [
      "ZimaOS installation and baseline configuration on your mini server",
      "Mirrored storage for resilience using two matching drives",
      "Shared folders with clear permissions and sensible organization",
      "Safer defaults, updates, and basic hardening to reduce risk"
    ],
    deliverables: [
      "A written setup summary and a simple monthly maintenance checklist",
      "Clear guidance for remote access that avoids risky exposure",
      "A practical backup approach so you can recover from deletion or ransomware"
    ],
    optionalServices: [
      "Guided migration from Google Drive and devices, based on your comfort level",
      "Short support window after setup for questions tied to the deployed system",
      "Follow up call to validate backups, access, and ongoing routine"
    ],
    requirements: [
      "A mini PC or small server, 8 GB RAM minimum, 16 GB preferred",
      "A boot SSD, 256 GB minimum",
      "Two identical drives for mirroring, same size and model recommended",
      "A nearby power outlet and a wired ethernet connection"
    ]
  };

  const businessSetup = {
    whatWeSetup: [
      "Initial NAS configuration, storage pool setup, and mirrored or parity protected storage based on your drive plan",
      "User accounts, shared folders, and role based access for up to 10 users",
      "Snapshots and safer defaults to reduce risk from accidental deletion and ransomware",
      "Secure admin setup including stronger authentication and reduced exposure"
    ],
    deliverables: [
      "A written setup summary, user access notes, and a simple maintenance routine",
      "Backup guidance that fits your business, including an offline or second location copy where appropriate",
      "A permissions map so owners know who can access what"
    ],
    optionalServices: [
      "Guided migration from cloud storage and office devices",
      "One follow up session to validate backups, restores, and access patterns",
      "Basic onboarding guidance for new users and folder organization"
    ],
    requirements: [
      "A NAS device and drives sized for your data and growth",
      "Access to the router during setup and an available ethernet port",
      "Your business email access for any required account logins during configuration"
    ]
  };

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
            <Server className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-300">White Glove Service</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight">
            Private Storage Setup
          </h1>
          
          <p className="text-xl text-slate-300 mb-4 max-w-3xl mx-auto font-semibold">
            Choose a Home and Prosumer mini server or a Small Business NAS, both securely hardened and set up with training
          </p>

          <p className="text-lg text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            This is guided setup using your hardware. You keep control of your accounts and data. Optional add-ons are available based on your needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Book This Session</span>
            </button>
            <button className="px-8 py-4 rounded-lg font-semibold text-lg border-2 border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-900 flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Fill Out Questionnaire</span>
            </button>
          </div>
        </div>
      </section>

      {/* Choose Your Setup Section */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Choose Your Setup
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              Pick the track that fits your comfort level and your day-to-day needs. Both options keep your data under your control with safer defaults.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Home & Prosumer Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-cyan-500/30 overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-6 border-b border-cyan-500/30">
                <div className="flex items-center space-x-3 mb-2">
                  <Home className="w-8 h-8 text-cyan-400" />
                  <h3 className="text-2xl font-bold">Home & Prosumer Mini Server</h3>
                </div>
                <p className="text-slate-300 font-semibold">
                  ZimaOS based private storage with mirrored drives, secure sharing, and a simple routine you can maintain
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* What We Set Up */}
                <div>
                  <h4 className="text-lg font-bold mb-3 flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-cyan-400" />
                    <span>What We Set Up</span>
                  </h4>
                  <ul className="space-y-2">
                    {homeSetup.whatWeSetup.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables */}
                <div>
                  <h4 className="text-lg font-bold mb-3 flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    <span>Deliverables</span>
                  </h4>
                  <ul className="space-y-2">
                    {homeSetup.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Optional Services */}
                <div>
                  <h4 className="text-lg font-bold mb-3 flex items-center space-x-2">
                    <Server className="w-5 h-5 text-cyan-400" />
                    <span>Optional Services</span>
                  </h4>
                  <ul className="space-y-2">
                    {homeSetup.optionalServices.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0 mt-2"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Remote Access */}
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <h4 className="text-lg font-bold mb-2 flex items-center space-x-2">
                    <Network className="w-5 h-5 text-cyan-400" />
                    <span>Remote Access</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0 mt-2"></div>
                      <span>If you want access away from home, I can configure secure remote access using Tailscale</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0 mt-2"></div>
                      <span>Tailscale avoids risky router port forwarding and keeps access limited to approved devices</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0 mt-2"></div>
                      <span>Remote access is optional and can be added only if it fits your comfort level and use case</span>
                    </li>
                  </ul>
                </div>

                {/* Requirements */}
                <div>
                  <h4 className="text-lg font-bold mb-3 flex items-center space-x-2">
                    <HardDrive className="w-5 h-5 text-orange-400" />
                    <span>What You Must Provide</span>
                  </h4>
                  <ul className="space-y-2">
                    {homeSetup.requirements.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0 mt-2"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Privacy Boundary */}
                <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Lock className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-cyan-400 mb-1">Privacy Boundary</h5>
                      <p className="text-sm text-slate-300">
                        No passwords, recovery codes, private keys, or personal files are requested. You sign in to accounts yourself if needed during setup.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
                    Book Home Setup
                  </button>
                  <button className="flex-1 px-6 py-3 rounded-lg font-semibold border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-800">
                    Questionnaire
                  </button>
                </div>
              </div>
            </div>

            {/* Small Business NAS Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-cyan-500/30 overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-6 border-b border-cyan-500/30">
                <div className="flex items-center space-x-3 mb-2">
                  <Building2 className="w-8 h-8 text-cyan-400" />
                  <h3 className="text-2xl font-bold">Small Business NAS</h3>
                </div>
                <p className="text-slate-300 font-semibold">
                  Appliance style NAS for teams of 10 or less, using a proprietary NAS operating system such as Synology DSM
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* What We Set Up */}
                <div>
                  <h4 className="text-lg font-bold mb-3 flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-cyan-400" />
                    <span>What We Set Up</span>
                  </h4>
                  <ul className="space-y-2">
                    {businessSetup.whatWeSetup.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables */}
                <div>
                  <h4 className="text-lg font-bold mb-3 flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    <span>Deliverables</span>
                  </h4>
                  <ul className="space-y-2">
                    {businessSetup.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Optional Services */}
                <div>
                  <h4 className="text-lg font-bold mb-3 flex items-center space-x-2">
                    <Server className="w-5 h-5 text-cyan-400" />
                    <span>Optional Services</span>
                  </h4>
                  <ul className="space-y-2">
                    {businessSetup.optionalServices.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0 mt-2"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Remote Access */}
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <h4 className="text-lg font-bold mb-2 flex items-center space-x-2">
                    <Network className="w-5 h-5 text-cyan-400" />
                    <span>Remote Access</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0 mt-2"></div>
                      <span>Remote access can be configured using safer approaches that avoid direct exposure to the public internet</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0 mt-2"></div>
                      <span>If remote access is required, we keep it limited to approved devices and documented for the owner</span>
                    </li>
                  </ul>
                </div>

                {/* Requirements */}
                <div>
                  <h4 className="text-lg font-bold mb-3 flex items-center space-x-2">
                    <HardDrive className="w-5 h-5 text-orange-400" />
                    <span>What You Must Provide</span>
                  </h4>
                  <ul className="space-y-2">
                    {businessSetup.requirements.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0 mt-2"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Privacy Boundary */}
                <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Lock className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-cyan-400 mb-1">Privacy Boundary</h5>
                      <p className="text-sm text-slate-300">
                        No passwords, recovery codes, private keys, or business files are requested. You keep full control of accounts and data.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
                    Book Business Setup
                  </button>
                  <button className="flex-1 px-6 py-3 rounded-lg font-semibold border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-800">
                    Questionnaire
                  </button>
                </div>
              </div>
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
                  <AlertTriangle className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-yellow-400">Legal Disclaimer</h3>
                <p className="text-slate-300 leading-relaxed">
                  This service provides educational guidance and guided setup only. Mirrored or parity protected drives improve resilience but do not replace backups. You are responsible for changes you make to your systems and for maintaining your backup routine. Any hands-on onsite work, device repairs, or extended support is handled only through a separate engagement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-cyan-900/30 to-blue-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Take Control of Your Data?</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Get professional guidance to set up your private storage solution with security and privacy built in from day one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-5 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center space-x-3">
              <Calendar className="w-6 h-6" />
              <span>Book Your Setup Session</span>
            </button>
            <button className="px-10 py-5 rounded-lg font-semibold text-lg border-2 border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-900 inline-flex items-center space-x-3">
              <FileText className="w-6 h-6" />
              <span>Fill Out Questionnaire</span>
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