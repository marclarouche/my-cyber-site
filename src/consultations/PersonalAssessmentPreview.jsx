import React, { useState } from 'react';
import { Shield, CheckCircle, Download, Printer, RotateCcw, Calendar, ArrowLeft } from 'lucide-react';

export default function PersonalAssessment() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  const sections = [
    {
      title: "Endpoint Protection",
      questions: [
        { id: "q1", text: "Do you have antivirus software installed?" },
        { id: "q2", text: "Do you perform regular automatic antivirus scans?" },
        { id: "q3", text: "Do you have a firewall enabled on your computer?" },
        { id: "q4", text: "Do you use ransomware protection?" }
      ]
    },
    {
      title: "System Updates & Encryption",
      questions: [
        { id: "q5", text: "Do you have software updates applied automatically?" },
        { id: "q6", text: "Do you encrypt important files?" }
      ]
    },
    {
      title: "Home Network & Wi-Fi",
      questions: [
        { id: "q7", text: "Have you configured a complex password for your home Wi-Fi?" },
        { id: "q8", text: "Do you use WPA2 or WPA3 on your home Wi-Fi?" },
        { id: "q9", text: "Do you update your router firmware?" },
        { id: "q10", text: "Do you have a guest network for visitors?" }
      ]
    },
    {
      title: "Email Security",
      questions: [
        { id: "q11", text: "Have you enabled 2-factor authentication for your email accounts?" },
        { id: "q12", text: "Have you configured SPAM filters in your email?" },
        { id: "q13", text: "Do you know how to check email sender details to avoid phishing?" },
        { id: "q14", text: "Do you use email confidentiality or encryption?" },
        { id: "q15", text: "Do you use email aliases?" },
        { id: "q16", text: "Do you know how to report SPAM and suspicious activity?" }
      ]
    },
    {
      title: "Accounts & Authentication",
      questions: [
        { id: "q17", text: "Have you enabled 2-factor authentication on all important accounts?" },
        { id: "q18", text: "Do you know how to review your login activity?" },
        { id: "q19", text: "Do you use backup codes for account recovery?" },
        { id: "q20", text: "Do you use hardware keys or passkeys (e.g., Yubico, Titan)?" }
      ]
    },
    {
      title: "Passwords",
      questions: [
        { id: "q21", text: "Do you use a password manager?" },
        { id: "q22", text: "When you create passwords, do you use 15 or more complex characters?" }
      ]
    },
    {
      title: "Privacy, Social & Data Removal",
      questions: [
        { id: "q23", text: "Do you remove location data from your photos?" },
        { id: "q24", text: "Have you configured privacy settings on all your social media?" },
        { id: "q25", text: "Have you removed your personal information from online data brokers?" },
        { id: "q26", text: "Have you performed a dark-web scan for your personal data?" }
      ]
    },
    {
      title: "Backup & Recovery",
      questions: [
        { id: "q27", text: "Do you regularly back up your data?" },
        { id: "q28", text: "Are your backups encrypted?" },
        { id: "q29", text: "Have you ever restored backup data (tested recovery)?" }
      ]
    },
    {
      title: "Browser Safety",
      questions: [
        { id: "q30", text: "Do you block 3rd party cookies?" },
        { id: "q31", text: "Do you use HTTPS everywhere (or HTTPS-only mode)?" },
        { id: "q32", text: "Do you use a privacy-focused browser or extensions?" },
        { id: "q33", text: "Do you know how to check if a link is safe before clicking?" },
        { id: "q34", text: "Do you clear browsing data regularly?" },
        { id: "q35", text: "Do you avoid saving passwords in your browser?" }
      ]
    },
    {
      title: "Mobile Device Safety",
      questions: [
        { id: "q36", text: "Do you have a passcode or biometric lock on your phone?" },
        { id: "q37", text: "Have you enabled auto-lock after a short time?" },
        { id: "q38", text: "Have you enabled remote wipe on your phone?" },
        { id: "q39", text: "Do you use full-device encryption?" },
        { id: "q40", text: "Do you use mobile device antivirus?" }
      ]
    },
    {
      title: "Financial Protections",
      questions: [
        { id: "q41", text: "Have you locked or frozen your credit file?" },
        { id: "q42", text: "Do you set alerts for unusual activity with your bank accounts?" },
        { id: "q43", text: "Do you use 2-factor authentication for all financial accounts?" },
        { id: "q44", text: "Do you use a virtual credit card for online shopping?" },
        { id: "q45", text: "Do you prevent the saving of payment information in your browser?" }
      ]
    }
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateResults = () => {
    const totalQuestions = 45;
    const score = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const maxScore = totalQuestions * 2;
    const percent = score / maxScore;

    let tier, note;
    if (percent >= 0.80) {
      tier = "Low risk signal";
      note = "Your basics look solid. The biggest gains now come from consistency and tightening a few habits.";
    } else if (percent >= 0.55) {
      tier = "Medium risk signal";
      note = "You have some protections in place, but a few gaps can still lead to account takeovers and scams. Focus on the top priorities first.";
    } else {
      tier = "Higher risk signal";
      note = "Several core protections are missing or uncertain. A small set of changes can reduce common threats quickly.";
    }

    const focusAreas = calculateFocusAreas();
    const date = new Date().toLocaleDateString();

    setResults({ tier, note, focusAreas, date });
    setShowResults(true);
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const calculateFocusAreas = () => {
    const sectionData = [
      { 
        name: "Endpoint protection", 
        ids: ["q1","q2","q3","q4"], 
        tip: "Keep basic device protections on, and make sure scans and ransomware protections are enabled where available." 
      },
      { 
        name: "Updates and encryption", 
        ids: ["q5","q6"], 
        tip: "Turn on automatic updates, and encrypt devices or sensitive files to protect against loss or theft." 
      },
      { 
        name: "Home network and Wi-Fi", 
        ids: ["q7","q8","q9","q10"], 
        tip: "Use modern Wi-Fi security, update the router, and separate guest access from personal devices." 
      },
      { 
        name: "Email safety", 
        ids: ["q11","q12","q13","q14","q15","q16"], 
        tip: "Protect email with multi-factor authentication, use filtering, and slow down on unexpected messages and links." 
      },
      { 
        name: "Accounts and authentication", 
        ids: ["q17","q18","q19","q20"], 
        tip: "Use multi-factor authentication everywhere you can, and strengthen recovery with passkeys or hardware keys when possible." 
      },
      { 
        name: "Passwords", 
        ids: ["q21","q22"], 
        tip: "Use a password manager and long passphrases so every account is unique." 
      },
      { 
        name: "Privacy and data removal", 
        ids: ["q23","q24","q25","q26"], 
        tip: "Reduce your exposure by tightening sharing, removing data broker listings, and responding quickly to breaches." 
      },
      { 
        name: "Backups and recovery", 
        ids: ["q27","q28","q29"], 
        tip: "Keep backups, encrypt them when possible, and test a restore so you know recovery works." 
      },
      { 
        name: "Browser safety", 
        ids: ["q30","q31","q32","q33","q34","q35"], 
        tip: "Use basic browser protections, verify links before clicking, and reduce tracking through smarter browsing habits." 
      },
      { 
        name: "Mobile device safety", 
        ids: ["q36","q37","q38","q39","q40"], 
        tip: "Lock down the phone with encryption, a strong unlock method, short auto-lock, and remote wipe." 
      },
      { 
        name: "Financial protections", 
        ids: ["q41","q42","q43","q44","q45"], 
        tip: "Harden financial accounts with authentication, alerts, and less stored payment data." 
      }
    ];

    const scored = sectionData.map(section => {
      const sectionScore = section.ids.reduce((sum, id) => sum + (answers[id] || 0), 0);
      const maxSectionScore = section.ids.length * 2;
      const fraction = maxSectionScore ? (sectionScore / maxSectionScore) : 0;
      return { ...section, fraction };
    });

    scored.sort((a, b) => a.fraction - b.fraction);
    const picks = scored.filter(s => s.fraction < 0.90).slice(0, 3);

    if (picks.length) return picks;

    return [
      { 
        name: "Maintenance and review", 
        tip: "Keep updates, account reviews, and backups on a monthly reminder so protections stay consistent." 
      },
      { 
        name: "Safer clicking habits", 
        tip: "Slow down on links, verify senders, and treat urgent messages as suspicious until proven otherwise." 
      }
    ];
  };

  const resetForm = () => {
    setAnswers({});
    setShowResults(false);
    setResults(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generateSummaryText = () => {
    if (!results) return '';
    
    const focusList = results.focusAreas
      .map(area => `• ${area.name}: ${area.tip}`)
      .join('\n');

    return `Personal Cybersecurity Assessment (Preview)
Score band: ${results.tier}

Top Focus Areas
${focusList}

Generated locally on ${new Date().toLocaleString()}.`;
  };

  const downloadAsText = () => {
    const text = generateSummaryText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'personal-cyber-assessment-preview.txt';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
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
            <a href="/" className="flex items-center space-x-3 group cursor-pointer">
              <img 
                src="/logo.png" 
                alt="CyberLifeCoach" 
                className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300" 
              />
            </a>

            <div className="flex items-center space-x-6">
              <a href="/individual-consultation" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Consultation</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Add padding-top to account for fixed nav */}
      <div className="pt-24 py-12 px-4">
        <style>{`
          @media print {
            .no-print { display: none !important; }
          }
        `}</style>

        <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pb-8 border-b border-slate-800">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Personal Cybersecurity Assessment
          </h1>
          <p className="text-slate-400 mb-2 max-w-2xl mx-auto">
            Complete this privately on your device, no sign-in, no tracking, no data collection.
          </p>
          <div className="inline-flex items-center space-x-2 bg-cyan-500/10 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30 mt-4">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400 font-semibold">A Veteran-Owned Business Committed to Your Digital Security</span>
          </div>
        </div>

        {!showResults ? (
          <form onSubmit={(e) => e.preventDefault()}>
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold mb-6 text-cyan-400 pb-3 border-b border-slate-800">
                  {section.title}
                </h2>
                <div className="space-y-5">
                  {section.questions.map((question) => (
                    <div key={question.id}>
                      <label htmlFor={question.id} className="block text-slate-300 mb-2 font-medium">
                        {question.text}
                      </label>
                      <select
                        id={question.id}
                        value={answers[question.id] !== undefined ? answers[question.id] : ''}
                        onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                      >
                        <option value="">Select an answer</option>
                        <option value="2">Yes</option>
                        <option value="0">No / Not sure</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 no-print">
              <button
                type="button"
                onClick={calculateResults}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>View Results</span>
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-8 py-4 rounded-lg font-semibold border-2 border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-900 flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Clear Form</span>
              </button>
            </div>
          </form>
        ) : (
          <div id="results-section" className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-xl p-8">
            {/* Score Badge */}
            <div className="text-center mb-6">
              <div className="inline-block bg-slate-900/80 px-4 py-2 rounded-full border border-cyan-500/50 mb-4">
                <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">Preview Score Band</span>
              </div>
              <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {results.tier}
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                {results.note}
              </p>
            </div>

            {/* Focus Areas */}
            <div className="my-8">
              <h3 className="text-2xl font-bold mb-6 text-cyan-400 text-center">Top Focus Areas</h3>
              <div className="space-y-4">
                {results.focusAreas.map((area, index) => (
                  <div key={index} className="bg-slate-900/60 border-l-4 border-cyan-500 rounded-lg p-5">
                    <div className="font-semibold text-cyan-400 mb-2 text-lg">{area.name}</div>
                    <div className="text-slate-300 leading-relaxed">{area.tip}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-cyan-500/30 rounded-lg p-6 my-8 text-center">
              <h4 className="text-2xl font-bold mb-3 text-cyan-400">Want the full report and written plan?</h4>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Book the Digital Safety Checkup and receive a complete breakdown, 
                plus a prioritized plan you can follow over the next 30 days.
              </p>
              <a 
                href="/personal-consultation"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center space-x-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Book the Digital Safety Checkup</span>
              </a>
            </div>

            {/* Meta Info */}
            <div className="text-center text-sm text-slate-500 italic my-6">
              Preview generated locally on {results.date}. No information was uploaded or stored.
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center no-print">
              <button
                onClick={handlePrint}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Printer className="w-5 h-5" />
                <span>Download / Print</span>
              </button>
              <button
                onClick={downloadAsText}
                className="px-6 py-3 rounded-lg font-semibold border-2 border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-900 flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download Preview as Text</span>
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-3 rounded-lg font-semibold border-2 border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-900 flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Take Assessment Again</span>
              </button>
            </div>
          </div>
        )}

        {/* Legal Disclaimer */}
        <div className="mt-12 bg-slate-900/30 border-l-4 border-slate-700 rounded-lg p-6 text-sm text-slate-400 leading-relaxed">
          <strong className="text-slate-300">Legal Disclaimer:</strong> This assessment is provided for informational 
          purposes and does not constitute legal, compliance, or professional security advice. 
          Security posture depends on your systems, configuration, behavior, and evolving threats. 
          Results are calculated locally in your browser. No responses are collected, stored, or 
          transmitted by this page. This page provides a short preview. The complete score review 
          and written plan are available as part of the paid Digital Safety Checkup.
        </div>
      </div>
      </div>
    </div>
  );
}
