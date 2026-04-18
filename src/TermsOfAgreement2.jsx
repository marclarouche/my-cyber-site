import React, { useState, useEffect } from 'react';
import { Shield, FileText, Lock, AlertTriangle, UserCheck, RefreshCw, ChevronRight, CheckCircle } from 'lucide-react';

const TOS_VERSION = "1.0.1";
const TOS_KEY = "clc_tos_acceptance";

export default function TermsOfAgreement({ onAccept }) {
  const [checked, setChecked] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [previousAcceptance, setPreviousAcceptance] = useState(null);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(TOS_KEY) || 'null');
      if (stored?.version) {
        setPreviousAcceptance(stored);
      }
    } catch (e) {
      console.error('Error reading TOS acceptance:', e);
    }
  }, []);

  const handleAccept = () => {
    if (!checked) {
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
      return;
    }
    const record = { version: TOS_VERSION, ts: new Date().toISOString() };
    try {
      localStorage.setItem(TOS_KEY, JSON.stringify(record));
    } catch (e) {
      alert('Unable to save your acceptance. Please check your browser settings.');
      console.error('localStorage error:', e);
      return;
    }
    setAccepted(true);
    if (onAccept) onAccept();
  };

  const handleReset = () => {
    try {
      localStorage.removeItem(TOS_KEY);
      setPreviousAcceptance(null);
      setChecked(false);
      setAccepted(false);
    } catch (e) {
      console.error('localStorage remove error:', e);
    }
  };

  const sections = [
    {
      icon: <Shield className="w-5 h-5" />,
      number: '1',
      title: 'Purpose and Scope',
      content:
        'CyberLife Coach provides educational content and client-side tools intended to help you improve personal and small-business security practices. These tools run locally in your browser and are offered "as is."',
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      number: '2',
      title: 'No Legal or Professional Advice',
      content:
        'Materials are for informational purposes only and do not constitute legal, compliance, or professional security advice. You are responsible for evaluating applicability to your situation and for any actions taken.',
    },
    {
      icon: <Lock className="w-5 h-5" />,
      number: '3',
      title: 'Privacy and Data Handling',
      content:
        'Tools are designed so that inputs are processed locally on your device. We do not require your name, email, or phone number to use the tools. If you choose to email results to us, that communication is voluntary and outside the tools themselves.',
    },
    {
      icon: <FileText className="w-5 h-5" />,
      number: '4',
      title: 'No Warranties',
      content:
        'Content and tools are provided without warranties of any kind, including fitness for a particular purpose or non-infringement. Availability and features may change without notice.',
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      number: '5',
      title: 'Limitation of Liability',
      content:
        'CyberLife Coach is not liable for any loss, damage, or claims arising from use or inability to use the site, content, or tools, including but not limited to data loss, system issues, or misconfiguration.',
    },
    {
      icon: <UserCheck className="w-5 h-5" />,
      number: '6',
      title: 'User Responsibilities',
      content:
        'You are responsible for your systems, backups, and compliance obligations. Test in safe environments before applying changes to production systems.',
    },
    {
      icon: <RefreshCw className="w-5 h-5" />,
      number: '7',
      title: 'Updates',
      content:
        'We may update these Terms. When we do, you may be asked to re-acknowledge. The Terms Version is shown at the bottom of this page.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes pulseShake {
          0%, 100% { transform: translateX(0); }
          20%      { transform: translateX(-6px); }
          40%      { transform: translateX(6px); }
          60%      { transform: translateX(-4px); }
          80%      { transform: translateX(4px); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 10px rgba(34,211,238,0.3); }
          50%      { box-shadow: 0 0 30px rgba(34,211,238,0.7), 0 0 60px rgba(34,211,238,0.3); }
        }
        @keyframes checkBounce {
          0%   { transform: scale(0) rotate(-10deg); }
          60%  { transform: scale(1.2) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        .fade-in-up { animation: fadeInUp 0.6s ease both; }
        .section-card { animation: fadeInUp 0.5s ease both; }
        .section-card:nth-child(1)  { animation-delay: 0.05s; }
        .section-card:nth-child(2)  { animation-delay: 0.10s; }
        .section-card:nth-child(3)  { animation-delay: 0.15s; }
        .section-card:nth-child(4)  { animation-delay: 0.20s; }
        .section-card:nth-child(5)  { animation-delay: 0.25s; }
        .section-card:nth-child(6)  { animation-delay: 0.30s; }
        .section-card:nth-child(7)  { animation-delay: 0.35s; }
        .shake { animation: pulseShake 0.5s ease; }
        .glow-accept { animation: glowPulse 2s ease-in-out infinite; }
        .check-bounce { animation: checkBounce 0.4s cubic-bezier(0.175,0.885,0.32,1.275) both; }
        .scanline {
          position: fixed; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(34,211,238,0.4), transparent);
          pointer-events: none;
          animation: scanline 6s linear infinite;
          z-index: 9999;
        }
        .grid-bg {
          background-image:
            linear-gradient(rgba(34,211,238,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .custom-checkbox {
          appearance: none;
          -webkit-appearance: none;
          width: 20px; height: 20px;
          border: 2px solid rgba(34,211,238,0.5);
          border-radius: 4px;
          background: rgba(15,23,42,0.8);
          cursor: pointer;
          flex-shrink: 0;
          position: relative;
          transition: all 0.2s;
        }
        .custom-checkbox:checked {
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          border-color: #06b6d4;
        }
        .custom-checkbox:checked::after {
          content: '✓';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        }
        .custom-checkbox:hover:not(:checked) {
          border-color: #22d3ee;
          box-shadow: 0 0 8px rgba(34,211,238,0.3);
        }
      `}</style>

      {/* Decorative scanline */}
      <div className="scanline" aria-hidden="true" />

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Nav */}
      <nav className="relative z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center space-x-3 group">
            <img src="/logo.png" alt="CyberLifeCoach" className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              CyberLifeCoach
            </span>
          </a>
          <div className="flex items-center space-x-2 text-slate-400 text-sm">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Terms of Service</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 grid-bg min-h-screen">
        <div className="max-w-3xl mx-auto px-4 py-16">

          {/* Header */}
          <div className="text-center mb-14 fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 mb-6">
              <Shield className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Please read and acknowledge the following terms before continuing to use CyberLife Coach tools.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-4 mb-10">
            {sections.map((s) => (
              <div
                key={s.number}
                className="section-card bg-slate-900/60 backdrop-blur-sm border border-slate-800 hover:border-cyan-500/30 rounded-2xl p-6 transition-all duration-300 hover:bg-slate-900/80"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 text-cyan-400">
                    {s.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base font-semibold text-slate-200 mb-2 flex items-center space-x-2">
                      <span className="text-cyan-500 font-mono text-sm">{s.number}.</span>
                      <span>{s.title}</span>
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed">{s.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Notice box */}
          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-2xl p-6 mb-10 fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-cyan-300 mb-1">Educational Notice</p>
                <p className="text-sm text-slate-400">
                  All CyberLife Coach workbooks and guides are provided for educational and informational purposes only. Always verify recommendations and test thoroughly before applying them to your own systems or organization.
                </p>
              </div>
            </div>
          </div>

          {/* Acceptance */}
          {accepted ? (
            <div className="text-center py-12 fade-in-up">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 mb-6 check-bounce">
                <CheckCircle className="w-10 h-10 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-2">Terms Accepted</h3>
              <p className="text-slate-400 mb-8">You're all set. Welcome to CyberLife Coach.</p>
              <a
                href="/"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
              >
                <span>Continue to Site</span>
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          ) : (
            <div className="fade-in-up" style={{ animationDelay: '0.45s' }}>
              {/* Checkbox acknowledgement */}
              <div
                className={`bg-slate-900/70 border rounded-2xl p-6 mb-6 transition-all duration-300 ${
                  pulse ? 'border-red-500/60 shake' : checked ? 'border-cyan-500/50' : 'border-slate-700'
                }`}
              >
                <label className="flex items-start space-x-4 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="custom-checkbox mt-0.5"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                  <span className="text-sm text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors">
                    I have read and agree to the Terms of Agreement, and I understand that the tools process data locally in my browser and do not collect personal information unless I explicitly choose to email results.
                  </span>
                </label>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAccept}
                  className={`flex-1 flex items-center justify-center space-x-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 ${
                    checked
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/40 hover:scale-105 glow-accept'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Accept and Continue</span>
                </button>
                <a
                  href="/about"
                  className="flex-1 sm:flex-none flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-base border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300 transition-all duration-300"
                >
                  Decline
                </a>
              </div>
            </div>
          )}

          {/* Version / Reset panel */}
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500 fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1.5 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-full">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-mono text-xs text-slate-300">v{TOS_VERSION}</span>
              </span>
              {previousAcceptance && (
                <span className="text-slate-500 text-xs">
                  Previously accepted v{previousAcceptance.version} on{' '}
                  {new Date(previousAcceptance.ts).toLocaleDateString()}
                </span>
              )}
              {!previousAcceptance && (
                <span className="text-slate-600 text-xs">Not yet accepted on this browser.</span>
              )}
            </div>
            {previousAcceptance && (
              <button
                onClick={handleReset}
                className="flex items-center space-x-1.5 text-slate-600 hover:text-cyan-400 transition-colors text-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset acknowledgement</span>
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-950 border-t border-slate-800 py-6 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; 2026 CyberLifeCoach | A Veteran-Owned Business Committed to Your Digital Security</p>
          <div className="flex space-x-6">
            <a href="/privacy-policy" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="text-cyan-400">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
