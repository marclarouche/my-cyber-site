import React, { useState } from 'react';
import { Calculator, ArrowLeft, RotateCcw } from 'lucide-react';

export default function DigitalRiskCalculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [answers, setAnswers] = useState({});
  const [validationMessage, setValidationMessage] = useState('');
  const [riskScore, setRiskScore] = useState(null);

  const riskProfiles = {
    student: {
      name: "Student",
      questions: [
        {
          id: "public_wifi",
          text: "How often do you use public or campus Wi-Fi for schoolwork or personal accounts?",
          options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 2 },
            { text: "Sometimes", score: 4 },
            { text: "Frequently", score: 6 }
          ],
          risk: "Man-in-the-middle attacks and credential theft on open or poorly secured networks."
        },
        {
          id: "password_reuse",
          text: "Do you reuse the same or similar passwords across school, email, and social media?",
          options: [
            { text: "Never reuse", score: 0 },
            { text: "Sometimes reuse", score: 3 },
            { text: "Often reuse", score: 6 }
          ],
          risk: "Credential stuffing attacks if one site is breached."
        },
        {
          id: "mfa_usage",
          text: "How often do you turn on multi-factor authentication (MFA) for important accounts?",
          options: [
            { text: "Enabled on all important accounts", score: 0 },
            { text: "Enabled on a few accounts", score: 3 },
            { text: "Rarely or never enabled", score: 6 }
          ],
          risk: "Account takeover if a password is guessed, stolen, or phished."
        },
        {
          id: "device_updates",
          text: "How quickly do you install security updates on your laptop and phone?",
          options: [
            { text: "Within a day or two", score: 0 },
            { text: "Within a couple of weeks", score: 3 },
            { text: "Only when forced or rarely", score: 6 }
          ],
          risk: "Exploitation of known vulnerabilities in outdated software."
        },
        {
          id: "account_sharing",
          text: "Do you share accounts or passwords with friends, classmates, or partners?",
          options: [
            { text: "Never share accounts or passwords", score: 0 },
            { text: "Occasionally share streaming or low risk accounts", score: 3 },
            { text: "Regularly share important accounts", score: 7 }
          ],
          risk: "Loss of control over accounts and data if relationships change or devices are lost."
        },
        {
          id: "social_privacy",
          text: "How locked down are your social media privacy settings?",
          options: [
            { text: "Mostly private, only trusted contacts see posts", score: 0 },
            { text: "Some settings locked down", score: 3 },
            { text: "Public or open to most people", score: 6 }
          ],
          risk: "Identity theft, social engineering, or harassment from information leaked publicly."
        }
      ]
    },
    retiree: {
      name: "Retiree",
      questions: [
        {
          id: "phishing_awareness",
          text: "How often do you receive suspicious emails or texts claiming urgent action is needed?",
          options: [
            { text: "Rarely, and I ignore them", score: 0 },
            { text: "Sometimes, and I usually spot them", score: 2 },
            { text: "Often, and I sometimes click links", score: 6 }
          ],
          risk: "Falling for phishing scams targeting financial or personal accounts."
        },
        {
          id: "banking_mfa",
          text: "Do you use multi-factor authentication (MFA) on your online banking and retirement accounts?",
          options: [
            { text: "Yes, always enabled", score: 0 },
            { text: "On some accounts", score: 3 },
            { text: "Rarely or never", score: 7 }
          ],
          risk: "Unauthorized access to financial accounts if credentials are compromised."
        },
        {
          id: "password_complexity",
          text: "How complex are your passwords for important accounts?",
          options: [
            { text: "Long and unique for each account", score: 0 },
            { text: "Moderately complex but reused", score: 4 },
            { text: "Simple or easy to remember", score: 7 }
          ],
          risk: "Brute force attacks or credential stuffing if passwords are weak or reused."
        },
        {
          id: "public_computers",
          text: "Do you ever log into financial or email accounts from public or shared computers?",
          options: [
            { text: "Never", score: 0 },
            { text: "Rarely", score: 4 },
            { text: "Sometimes or often", score: 8 }
          ],
          risk: "Keyloggers or session hijacking on compromised shared devices."
        },
        {
          id: "software_updates",
          text: "How often do you update your computer, phone, and tablet?",
          options: [
            { text: "Automatically or within days", score: 0 },
            { text: "Every few weeks", score: 3 },
            { text: "Rarely or when forced", score: 6 }
          ],
          risk: "Exploitation of unpatched vulnerabilities in outdated software."
        }
      ]
    },
    traveler: {
      name: "Traveler/Digital Nomad",
      questions: [
        {
          id: "public_wifi_vpn",
          text: "How often do you use public Wi-Fi (hotels, cafés, airports) without a VPN?",
          options: [
            { text: "Never without VPN", score: 0 },
            { text: "Sometimes without VPN", score: 4 },
            { text: "Frequently without VPN", score: 7 }
          ],
          risk: "Man-in-the-middle attacks and data interception on untrusted networks."
        },
        {
          id: "device_encryption",
          text: "Are your devices (laptop, phone, tablet) encrypted with full disk encryption?",
          options: [
            { text: "Yes, all devices encrypted", score: 0 },
            { text: "Some devices encrypted", score: 3 },
            { text: "No encryption", score: 7 }
          ],
          risk: "Data exposure if devices are lost, stolen, or seized."
        },
        {
          id: "screen_privacy",
          text: "How often do you work on sensitive matters in public spaces without privacy screens?",
          options: [
            { text: "Never or always use privacy screen", score: 0 },
            { text: "Sometimes", score: 3 },
            { text: "Frequently", score: 6 }
          ],
          risk: "Visual shoulder surfing and data leakage in public environments."
        },
        {
          id: "backup_strategy",
          text: "How often do you back up important data while traveling?",
          options: [
            { text: "Regularly, encrypted cloud and local", score: 0 },
            { text: "Occasionally", score: 3 },
            { text: "Rarely or never", score: 6 }
          ],
          risk: "Permanent data loss if devices fail, are stolen, or confiscated."
        },
        {
          id: "border_security",
          text: "How do you prepare devices when crossing international borders?",
          options: [
            { text: "Minimal data, encrypted, strong passwords", score: 0 },
            { text: "Some precautions", score: 3 },
            { text: "No special precautions", score: 6 }
          ],
          risk: "Device searches, data seizure, or compromise at border crossings."
        }
      ]
    },
    journalist: {
      name: "Journalist",
      questions: [
        {
          id: "source_communication",
          text: "How do you communicate with sensitive sources?",
          options: [
            { text: "End-to-end encrypted apps only (Signal, etc.)", score: 0 },
            { text: "Mix of encrypted and standard channels", score: 4 },
            { text: "Email, SMS, or unencrypted channels", score: 8 }
          ],
          risk: "Source identification, surveillance, or communication interception."
        },
        {
          id: "device_separation",
          text: "Do you use separate devices for work and personal use?",
          options: [
            { text: "Yes, always separated", score: 0 },
            { text: "Sometimes separated", score: 3 },
            { text: "Same device for everything", score: 6 }
          ],
          risk: "Cross-contamination of personal and work data, increased attack surface."
        },
        {
          id: "metadata_awareness",
          text: "How careful are you about metadata in documents and photos you publish?",
          options: [
            { text: "Always strip metadata", score: 0 },
            { text: "Sometimes check", score: 4 },
            { text: "Rarely think about it", score: 7 }
          ],
          risk: "Location tracking, source identification, or operational security breaches."
        },
        {
          id: "threat_modeling",
          text: "How often do you update your threat model based on your current assignments?",
          options: [
            { text: "Regularly, for each sensitive story", score: 0 },
            { text: "Occasionally", score: 3 },
            { text: "Rarely or never", score: 6 }
          ],
          risk: "Inadequate security posture for evolving threats and adversaries."
        },
        {
          id: "incident_response",
          text: "Do you have a documented incident response plan for security breaches?",
          options: [
            { text: "Yes, tested and current", score: 0 },
            { text: "Basic plan exists", score: 3 },
            { text: "No plan", score: 7 }
          ],
          risk: "Delayed or ineffective response to security incidents or compromises."
        }
      ]
    },
    nonprofit: {
      name: "Non-Profit",
      questions: [
        {
          id: "donor_data_protection",
          text: "How is donor and beneficiary data protected?",
          options: [
            { text: "Encrypted, access controlled, minimal collection", score: 0 },
            { text: "Some protections in place", score: 4 },
            { text: "Minimal or no specific protections", score: 8 }
          ],
          risk: "Data breaches exposing sensitive donor or beneficiary information."
        },
        {
          id: "access_controls",
          text: "Are role-based access controls implemented for sensitive systems and data?",
          options: [
            { text: "Yes, strictly enforced", score: 0 },
            { text: "Partially implemented", score: 3 },
            { text: "No role-based controls", score: 7 }
          ],
          risk: "Unauthorized access, insider threats, or data misuse."
        },
        {
          id: "staff_training",
          text: "How often do staff receive security awareness training?",
          options: [
            { text: "Regular, documented training", score: 0 },
            { text: "Occasional training", score: 3 },
            { text: "Rarely or never", score: 6 }
          ],
          risk: "Phishing attacks, social engineering, and security policy violations."
        },
        {
          id: "incident_plan",
          text: "Does your organization have a documented incident response plan?",
          options: [
            { text: "Yes, tested regularly", score: 0 },
            { text: "Basic plan exists", score: 3 },
            { text: "No plan", score: 7 }
          ],
          risk: "Chaotic response to security incidents, leading to greater damage."
        },
        {
          id: "backup_recovery",
          text: "How robust is your data backup and recovery strategy?",
          options: [
            { text: "Automated, encrypted, offsite", score: 0 },
            { text: "Some backups in place", score: 3 },
            { text: "Minimal or no backups", score: 8 }
          ],
          risk: "Permanent data loss from ransomware, hardware failure, or disasters."
        }
      ]
    },
    business: {
      name: "Small Business",
      questions: [
        {
          id: "employee_training",
          text: "How often do employees receive cybersecurity awareness training?",
          options: [
            { text: "Regularly, with phishing tests", score: 0 },
            { text: "Annual training", score: 3 },
            { text: "Rarely or never", score: 7 }
          ],
          risk: "Successful phishing attacks, credential theft, and social engineering."
        },
        {
          id: "backup_strategy",
          text: "What is your data backup and disaster recovery strategy?",
          options: [
            { text: "Automated, tested, offsite/cloud", score: 0 },
            { text: "Some backups, not regularly tested", score: 4 },
            { text: "Minimal or no backup strategy", score: 8 }
          ],
          risk: "Business disruption or permanent data loss from ransomware or failures."
        },
        {
          id: "mfa_deployment",
          text: "Is multi-factor authentication (MFA) required for business email and admin accounts?",
          options: [
            { text: "Yes, enforced for all critical accounts", score: 0 },
            { text: "Encouraged but not enforced", score: 4 },
            { text: "Not implemented", score: 7 }
          ],
          risk: "Account takeover, business email compromise, and financial fraud."
        },
        {
          id: "patch_management",
          text: "How quickly are security patches applied to business systems?",
          options: [
            { text: "Automated or within days", score: 0 },
            { text: "Within a few weeks", score: 3 },
            { text: "Rarely or when convenient", score: 7 }
          ],
          risk: "Exploitation of known vulnerabilities in outdated software."
        },
        {
          id: "incident_response",
          text: "Do you have a documented incident response plan specific to your business?",
          options: [
            { text: "Yes, tested and current", score: 0 },
            { text: "Basic plan exists", score: 3 },
            { text: "No documented plan", score: 7 }
          ],
          risk: "Slow or ineffective response to security incidents, increasing damage."
        }
      ]
    }
  };

  const recommendations = {
    student: [
      "Use a reputable password manager and avoid reusing passwords across accounts.",
      "Turn on multi-factor authentication for email, school, and social media logins.",
      "Avoid logging in over open public Wi-Fi without a VPN.",
      "Keep your laptop and phone updated so security patches are applied."
    ],
    traveler: [
      "Use a trustworthy VPN whenever you connect to hotel, café, or airport Wi-Fi.",
      "Avoid logging into sensitive accounts on shared or public computers.",
      "Enable full disk encryption and screen lock with a strong PIN or passphrase.",
      "Carry a privacy screen filter if you work in public spaces."
    ],
    journalist: [
      "Use end-to-end encrypted apps such as Signal for sensitive conversations.",
      "Enable full disk encryption on all devices used for reporting and research.",
      "Separate work and personal accounts and devices where possible.",
      "Review your threat model regularly and keep a basic incident response plan."
    ],
    nonprofit: [
      "Limit donor data collection to what is truly necessary for your mission.",
      "Introduce role-based access controls and multi-factor authentication.",
      "Create a simple incident response plan in case donor data is exposed.",
      "Encrypt backups and store them securely, separate from production systems."
    ],
    business: [
      "Schedule regular security awareness training, especially around phishing.",
      "Implement an automated backup strategy with offsite or cloud copies.",
      "Use multi-factor authentication for email, financial, and admin accounts.",
      "Document a lightweight incident response plan specific to your business."
    ],
    retiree: [
      "Use official banking and retirement apps with multi-factor authentication.",
      "Never log into financial accounts from public or shared computers.",
      "Learn the warning signs of common phone and email scams.",
      "Consider freezing your credit files to reduce identity theft risk."
    ]
  };

  const handleProfileSelect = (profile) => {
    setCurrentProfile(profile);
    setCurrentStep(2);
    setAnswers({});
    setValidationMessage('');
  };

  const handleAnswerChange = (questionId, score) => {
    setAnswers({ ...answers, [questionId]: score });
    setValidationMessage('');
  };

  const calculateRisk = () => {
    const profile = riskProfiles[currentProfile];
    const unanswered = [];
    let totalScore = 0;
    let maxPossibleScore = 0;

    profile.questions.forEach((question) => {
      const questionMax = Math.max(...question.options.map((opt) => opt.score));
      maxPossibleScore += questionMax;

      if (answers[question.id] === undefined) {
        unanswered.push(question.text);
        return;
      }

      totalScore += answers[question.id];
    });

    if (unanswered.length > 0) {
      setValidationMessage('Please answer all questions before calculating your risk.');
      return;
    }

    const riskPercentage = maxPossibleScore > 0
      ? Math.round((totalScore / maxPossibleScore) * 100)
      : 0;

    setRiskScore({ percentage: riskPercentage, totalScore, maxPossibleScore });
    setCurrentStep(3);
    setValidationMessage('');
  };

  const restart = () => {
    setCurrentStep(1);
    setCurrentProfile(null);
    setAnswers({});
    setValidationMessage('');
    setRiskScore(null);
  };

  const getRiskLevel = (percentage) => {
    if (percentage < 25) {
      return {
        level: "Low",
        key: "low",
        description: "Your security habits are solid, with a few areas to tighten up.",
        color: "text-green-400",
        bgColor: "bg-green-500/20",
        borderColor: "border-green-500/40"
      };
    } else if (percentage < 50) {
      return {
        level: "Moderate",
        key: "moderate",
        description: "You have some protections in place, but several gaps remain.",
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/20",
        borderColor: "border-yellow-500/40"
      };
    } else if (percentage < 75) {
      return {
        level: "High",
        key: "high",
        description: "Your digital risk is high. Focus on the priority actions listed below.",
        color: "text-orange-400",
        bgColor: "bg-orange-500/20",
        borderColor: "border-orange-500/40"
      };
    } else {
      return {
        level: "Critical",
        key: "critical",
        description: "Your risk is critical. Take immediate steps to reduce exposure.",
        color: "text-red-400",
        bgColor: "bg-red-500/20",
        borderColor: "border-red-500/40"
      };
    }
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

            <a href="/tools" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tools Hub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-8 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <Calculator className="w-12 h-12 text-cyan-400" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Universal Digital Risk Calculator
                <span className="ml-4 inline-block bg-cyan-500/10 text-cyan-400 px-4 py-1 rounded-full text-base font-semibold border border-cyan-500/30">
                  Client-Side Tool
                </span>
              </h1>
              <p className="text-slate-400 mt-2">
                Choose who you are assessing, answer a few plain language questions, and get a color-coded risk score with
                practical steps to reduce your digital exposure. Nothing is stored or sent anywhere; everything runs in your browser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto px-4 pb-20">
        {/* Step 1: Profile Selection */}
        {currentStep === 1 && (
          <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <h2 className="text-2xl font-bold text-cyan-400">Step 1 of 3</h2>
              <span className="bg-cyan-500/10 text-cyan-400 px-4 py-1 rounded-full text-sm font-semibold border border-cyan-500/30">
                Select a profile
              </span>
            </div>
            <p className="text-slate-400 mb-6">
              Pick who you are assessing. Each profile asks a slightly different set of questions based on typical risk.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(riskProfiles).map(([key, profile]) => (
                <button
                  key={key}
                  onClick={() => handleProfileSelect(key)}
                  className="px-6 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all hover:border-cyan-500 hover:text-cyan-400"
                >
                  {profile.name}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Step 2: Questions */}
        {currentStep === 2 && currentProfile && (
          <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <h2 className="text-2xl font-bold text-cyan-400">Step 2 of 3</h2>
              <span className="bg-cyan-500/10 text-cyan-400 px-4 py-1 rounded-full text-sm font-semibold border border-cyan-500/30">
                {riskProfiles[currentProfile].name}
              </span>
            </div>
            <p className="text-slate-400 mb-6">
              Answer each question. If you're unsure, choose the "Sometimes" option. You can re-run as habits change.
            </p>

            <div className="space-y-6">
              {riskProfiles[currentProfile].questions.map((question, idx) => (
                <div key={question.id} className="bg-slate-950 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-lg font-semibold text-slate-200 mb-4">
                    {idx + 1}. {question.text}
                  </h3>
                  
                  <div className="space-y-2 mb-3">
                    {question.options.map((option, optIdx) => (
                      <label
                        key={optIdx}
                        className="flex items-center space-x-3 p-3 bg-slate-900 border border-slate-700 rounded-lg cursor-pointer hover:border-cyan-500/50 transition-colors"
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={option.score}
                          checked={answers[question.id] === option.score}
                          onChange={() => handleAnswerChange(question.id, option.score)}
                          className="w-4 h-4 text-cyan-500 border-slate-600 focus:ring-cyan-500 focus:ring-offset-slate-900"
                        />
                        <span className="text-slate-300">{option.text}</span>
                      </label>
                    ))}
                  </div>

                  <p className="text-sm text-slate-500 italic">Risk: {question.risk}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all hover:border-cyan-500"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Change Profile</span>
              </button>
              
              <div className="flex-1 flex items-center justify-end gap-4">
                {validationMessage && (
                  <p className="text-red-400 font-semibold">{validationMessage}</p>
                )}
                <button
                  onClick={calculateRisk}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                >
                  Calculate My Risk
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Step 3: Results */}
        {currentStep === 3 && riskScore && (
          <div className="space-y-6">
            <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                <h2 className="text-2xl font-bold text-cyan-400">Step 3 of 3</h2>
                <span className="bg-cyan-500/10 text-cyan-400 px-4 py-1 rounded-full text-sm font-semibold border border-cyan-500/30">
                  Your result
                </span>
              </div>

              {(() => {
                const riskLevel = getRiskLevel(riskScore.percentage);
                return (
                  <div className={`${riskLevel.bgColor} border ${riskLevel.borderColor} rounded-xl p-8`}>
                    <h3 className="text-3xl font-bold mb-2">
                      Your Digital Risk Score: <span className={riskLevel.color}>{riskScore.percentage}%</span>
                    </h3>
                    <div className={`text-xl font-semibold mb-3 ${riskLevel.color}`}>
                      {riskLevel.level} risk
                    </div>
                    <p className="text-slate-300 mb-6">{riskLevel.description}</p>
                    
                    <div className="w-full bg-slate-900 rounded-full h-4 overflow-hidden">
                      <div
                        className={`h-full ${riskLevel.color.replace('text-', 'bg-')} transition-all duration-1000 ease-out`}
                        style={{ width: `${riskScore.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })()}
            </section>

            {/* Risk Breakdown and Recommendations */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Risk Breakdown */}
              <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
                <h2 className="text-2xl font-bold text-cyan-400 mb-6">Risk Breakdown</h2>
                <div className="space-y-4">
                  {riskProfiles[currentProfile].questions.map((question) => {
                    const score = answers[question.id] || 0;
                    const maxScore = Math.max(...question.options.map((opt) => opt.score));
                    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
                    
                    return (
                      <div key={question.id} className="bg-slate-950 rounded-lg p-4 border border-slate-700">
                        <p className="font-semibold text-slate-200 mb-2">{question.text}</p>
                        <p className="text-sm text-cyan-400 mb-1">
                          Risk contribution: {percentage}% of maximum for this area.
                        </p>
                        <p className="text-sm text-slate-500 italic">{question.risk}</p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Recommendations */}
              <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
                <h2 className="text-2xl font-bold text-cyan-400 mb-6">Recommended Next Steps</h2>
                <div className="space-y-3">
                  {(recommendations[currentProfile] || recommendations.student).map((rec, idx) => (
                    <div key={idx} className="flex items-start space-x-3 bg-slate-950 rounded-lg p-4 border border-slate-700">
                      <span className="text-cyan-400 font-bold flex-shrink-0">{idx + 1}.</span>
                      <p className="text-slate-300">{rec}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Start Over Button */}
            <div className="flex justify-center">
              <button
                onClick={restart}
                className="flex items-center space-x-2 px-8 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all hover:border-cyan-500"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Start Over</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Legal Disclaimer */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-6">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Legal Disclaimer:</strong> This calculator is for educational purposes only and does not constitute legal,
            financial, or security advice. The risk scores and recommendations provided are general guidance based on common security practices.
            Always test changes in a safe environment and consult a professional for high-risk situations or compliance requirements.
          </p>
        </div>

        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-12">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Data Privacy:</strong> Your answers never leave this page. The calculator runs entirely in your browser using client-side JavaScript.
            No data is transmitted to CyberLifeCoach servers or any third party. No cookies are set, and no tracking is performed.
            You can use this tool completely offline by saving this page locally.
          </p>
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
            <p className="text-slate-600">Assessment happens entirely in your browser. No data is sent anywhere.</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
