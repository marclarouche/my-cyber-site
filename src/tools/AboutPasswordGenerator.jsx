import React from 'react';
import { Key, ArrowLeft, Shield, Lock, AlertTriangle, CheckCircle, Eye, Database } from 'lucide-react';

export default function AboutPasswordGenerator() {
  const handleOpenTool = () => {
    window.location.href = '/tools/password-generator';
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
              Password Security Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Best Practices
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Best Password Practices
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            Simple, evidence-based habits to keep your digital life secure.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          
          {/* 1. Use Long, Unique Passwords */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Lock className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  1. Use Long, Unique Passwords
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  Length matters more than complexity. Aim for at least <strong className="text-cyan-400">16 characters</strong>—longer if possible. Each account should have its own password to prevent domino-effect breaches.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Prefer Passphrases Over Random Characters */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Key className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  2. Prefer Passphrases Over Random Characters
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Instead of "h!9R%2x", try a phrase like <code className="text-cyan-300 bg-slate-950 px-2 py-1 rounded">coffee-sky-bridge-turtle</code>. It's easier to remember and still extremely difficult to guess.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Store Passwords Securely */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Database className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  3. Store Passwords Securely
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Use a reputable password manager such as Bitwarden, 1Password, or KeePassXC. They encrypt your vault locally and reduce the temptation to reuse weak passwords.
                </p>
                <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-cyan-300 mb-1">Tip</p>
                      <p className="text-sm text-slate-300">
                        Avoid storing passwords in browsers, text files, or cloud notes without encryption.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Enable Multi-Factor Authentication (MFA) */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Shield className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  4. Enable Multi-Factor Authentication (MFA)
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  MFA adds an extra lock even if your password leaks. Use an authenticator app or hardware key (YubiKey, Titan, or SoloKey) instead of SMS where possible.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Watch for Breach Notifications */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  5. Watch for Breach Notifications
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  Check your email at <a href="https://haveibeenpwned.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">Have I Been Pwned</a> or use CyberLifeCoach's <strong className="text-cyan-400">Breach Exposure Lookup</strong> tool to see if your credentials have surfaced in known leaks. If so, change them immediately.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Understand Password Entropy */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Eye className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  6. Understand Password Entropy
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Entropy measures unpredictability. Each extra bit roughly doubles the work an attacker needs to crack your password. A 100-bit password could take billions of years to brute-force with current tech.
                </p>
                <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-cyan-300 mb-1">Tip</p>
                      <p className="text-sm text-slate-300">
                        You can check entropy estimates directly in the <a href="/tools/password-generator" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">Password Generator Tool</a>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Rotate Only When Necessary */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              7. Rotate Only When Necessary
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Modern guidance (from NIST and CISA) discourages frequent forced password changes. Rotate only after a suspected compromise or if you shared access unintentionally.
            </p>
          </div>

          {/* 8. Educate Family and Teams */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              8. Educate Family and Teams
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Strong password habits work best when everyone follows them. Share this guide with family, colleagues, or small-business teams to build collective security awareness.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <Key className="w-5 h-5" />
              <span>🔐 Open the Generator Tool</span>
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
              <strong className="text-cyan-400">Legal Disclaimer and Important Notice:</strong> This page is provided for educational purposes only. CyberLifeCoach and its affiliates make no warranties regarding completeness or accuracy. You are responsible for implementing proper password hygiene and multi-factor authentication according to your own risk tolerance and organizational policy.
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
