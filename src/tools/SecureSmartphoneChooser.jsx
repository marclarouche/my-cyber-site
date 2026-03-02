import React, { useState } from 'react';
import { Smartphone, ArrowLeft, Shield, Download, Copy, RotateCcw, ChevronDown, ChevronUp, BookOpen, AlertTriangle, CheckCircle, FileText } from 'lucide-react';

const RECS = {
  tracking: {
    label: 'Tracking and data collection',
    bestFit: 'Punkt. MC03 or Pixel with GrapheneOS',
    why: 'Reduced Google dependency and tighter permission control.'
  },
  theft: {
    label: 'Theft and account takeover',
    bestFit: 'iPhone or a current supported Android flagship',
    why: 'Strong default security plus theft hardening features and fast updates.'
  },
  travel: {
    label: 'Travel risk and hostile networks',
    bestFit: 'Punkt. MC03 or iPhone with strict network settings',
    why: 'Always on VPN workflows and safer defaults when bouncing between networks.'
  },
  spyware: {
    label: 'Targeted spyware and high risk work',
    bestFit: 'Pixel with GrapheneOS, or iPhone with Lockdown Mode',
    why: 'Strongest practical attack surface reduction options.'
  },
  compliance: {
    label: 'Business compliance and client data',
    bestFit: 'Bittium Tough Mobile 2 C or a managed iPhone or Android fleet',
    why: 'Separation, policy enforcement, auditability, and remote response.'
  }
};

const MUST_HAVE = [
  'At least five years of security updates remaining',
  'Verified boot and hardware backed security',
  'Strong passcode support and fast biometric fallback lock',
  'Full disk encryption on by default',
  'App permissions you can actually control',
  'Work profile or separation option if you mix personal and business'
];

const HARDENING = [
  'Set a long passcode, not a short PIN',
  'Turn on automatic OS updates and app updates',
  'Remove unused apps, then review permissions for remaining apps',
  'Disable Bluetooth when not in use',
  'Turn off ad tracking and reset advertising ID regularly, or disable it where possible',
  'Use passkeys for key accounts, then add a hardware security key for email and password manager if you can',
  'Turn on device find and remote wipe',
  'Enable SIM protection with a carrier PIN, and consider eSIM plus port out protection',
  'Use an always on VPN if you travel or use public WiFi often',
  'Back up securely, then test account recovery before you need it'
];

const RED_FLAGS = [
  'No clear patch timeline',
  'Patches depend on a tiny vendor with no track record',
  'The device is discontinued or stuck on old Android',
  'Security claims are vague, like military grade without specifics',
  'It requires installing unknown apps from outside trusted stores, unless you know exactly why'
];

export default function SecureSmartphoneChooser() {
  const [threat, setThreat] = useState('tracking');
  const [phoneModel, setPhoneModel] = useState('');
  const [osFamily, setOsFamily] = useState('');
  const [osVersion, setOsVersion] = useState('');
  const [keepYears, setKeepYears] = useState('');
  const [highRiskApps, setHighRiskApps] = useState('');
  const [needGoogle, setNeedGoogle] = useState('no');
  const [needIMsg, setNeedIMsg] = useState('no');
  const [travelOften, setTravelOften] = useState('');
  const [sideloading, setSideloading] = useState('');
  const [workProfile, setWorkProfile] = useState('');
  const [complianceNeed, setComplianceNeed] = useState('');
  const [showOptional, setShowOptional] = useState(false);
  const [output, setOutput] = useState(null);
  const [copyLabel, setCopyLabel] = useState('Copy');

  function buildNotes(threatKey) {
    const notes = [];
    if (phoneModel) notes.push('Current phone: ' + phoneModel + '.');
    if (osFamily) notes.push('Platform: ' + (osFamily === 'ios' ? 'iOS' : 'Android') + '.');
    if (keepYears) notes.push('Planned keep time: ' + keepYears + ' year(s).');
    if (highRiskApps) notes.push('High risk apps: ' + highRiskApps + '.');
    if (threatKey === 'tracking' && needGoogle === 'yes') {
      notes.push('You said you need Google services. GrapheneOS and de-Googled paths can change day to day app behavior, so confirm your must-have apps before switching.');
    }
    if (threatKey === 'tracking' && needIMsg === 'yes') {
      notes.push('You said you need iMessage or FaceTime. That typically anchors you to iPhone for daily use, so focus on hardening and app permission discipline.');
    }
    if (travelOften === 'often') {
      notes.push('You travel often or use public WiFi. An always on VPN workflow and safer network defaults matter more than extra features.');
    }
    if (sideloading === 'yes') {
      notes.push('You sideload apps. Keep a strict rule for sources, and treat sideloading as a higher risk behavior that deserves tighter permissions and reduced app count.');
    }
    if (workProfile === 'yes') {
      notes.push('You need separation between work and personal. Prefer a platform that supports a work profile or managed separation.');
    }
    if (complianceNeed === 'regulated') {
      notes.push('You indicated regulated requirements. Prefer devices and management that support policy enforcement, auditability, and remote response.');
    }
    if (!notes.length) return 'No notes yet. Add a phone model or a few answers to tailor this section.';
    return notes.join(' ');
  }

  function buildExportText() {
    const rec = RECS[threat];
    const lines = [];
    lines.push('Secure Smartphone Chooser Output');
    lines.push('');
    lines.push('Threat focus: ' + rec.label);
    lines.push('Best fit: ' + rec.bestFit);
    lines.push('Why: ' + rec.why);
    lines.push('');
    lines.push('Current phone snapshot');
    if (phoneModel) lines.push('• Phone: ' + phoneModel);
    if (osFamily) lines.push('• Platform: ' + (osFamily === 'ios' ? 'iOS' : 'Android'));
    if (osVersion) lines.push('• OS version: ' + osVersion);
    if (keepYears) lines.push('• Planned keep time: ' + keepYears + ' year(s)');
    if (highRiskApps) lines.push('• High risk apps: ' + highRiskApps);
    lines.push('• Need Google services: ' + needGoogle);
    lines.push('• Need iMessage or FaceTime: ' + needIMsg);
    lines.push('');
    lines.push('Must have security features');
    MUST_HAVE.forEach(x => lines.push('• ' + x));
    lines.push('');
    lines.push('Hardening checklist');
    HARDENING.forEach(x => lines.push('• ' + x));
    lines.push('');
    lines.push('Red flags to avoid');
    RED_FLAGS.forEach(x => lines.push('• ' + x));
    lines.push('');
    lines.push('Notes');
    lines.push(buildNotes(threat));
    lines.push('');
    lines.push('CyberLifeCoach  Educational use only');
    return lines.join('\n');
  }

  function handleGenerate() {
    setOutput({
      rec: RECS[threat],
      notes: buildNotes(threat)
    });
  }

  function handleReset() {
    setThreat('tracking');
    setPhoneModel('');
    setOsFamily('');
    setOsVersion('');
    setKeepYears('');
    setHighRiskApps('');
    setNeedGoogle('no');
    setNeedIMsg('no');
    setTravelOften('');
    setSideloading('');
    setWorkProfile('');
    setComplianceNeed('');
    setShowOptional(false);
    setOutput(null);
  }

  function handleLoadExample() {
    setThreat('travel');
    setPhoneModel('Pixel 8, 2023');
    setOsFamily('android');
    setOsVersion('Android 14');
    setKeepYears('3');
    setHighRiskApps('Social apps, travel booking apps');
    setNeedGoogle('yes');
    setNeedIMsg('no');
    setTravelOften('often');
    setSideloading('no');
    setWorkProfile('not_sure');
    setComplianceNeed('none');
    setShowOptional(true);
    setTimeout(() => {
      setOutput({
        rec: RECS['travel'],
        notes: buildNotes('travel')
      });
    }, 50);
  }

  function handleDownloadText() {
    const text = buildExportText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'secure-smartphone-chooser-output.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function handleCopy() {
    const text = buildExportText();
    try {
      await navigator.clipboard.writeText(text);
      setCopyLabel('Copied!');
      setTimeout(() => setCopyLabel('Copy'), 1200);
    } catch {
      alert('Copy failed in this browser. Use Download Text instead.');
    }
  }

  const inputClass = "w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 placeholder-slate-500";
  const selectClass = "w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100";
  const labelClass = "block text-sm font-semibold text-cyan-400 mb-2";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center space-x-3 group cursor-pointer">
              <img src="/logo.png" alt="CyberLifeCoach" className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:brightness-125 transition-all duration-300">
                CyberLifeCoach
              </span>
            </a>
            <div className="flex items-center space-x-4">
              <a href="/tools" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Tools Hub</span>
              </a>
              
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30 mb-8">
            <Smartphone className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-300">Security Tool</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight">
            Secure Smartphone Chooser
          </h1>

          <p className="text-xl text-slate-300 mb-4 max-w-3xl mx-auto font-semibold">
            Pick your threat focus, then generate a best-fit recommendation and a hardening checklist you can download.
          </p>
          <p className="text-lg text-slate-400 mb-10 max-w-3xl mx-auto">
            This tool runs in your browser. Nothing you enter is sent anywhere.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#chooser"
              className="group bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Smartphone className="w-5 h-5" />
              <span>Start the Chooser</span>
            </a>
            <button
              onClick={handleLoadExample}
              className="px-8 py-4 rounded-lg font-semibold text-lg border-2 border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-900 flex items-center justify-center space-x-2"
            >
              <FileText className="w-5 h-5" />
              <span>Load Example</span>
            </button>
          </div>
        </div>
      </section>

      {/* Privacy Badge */}
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-xl p-4">
          <div className="flex items-center justify-center space-x-3">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="text-slate-300 text-sm">Client-Side Processing — Your data never leaves your browser</span>
          </div>
        </div>
      </div>

      {/* Main Chooser */}
      <section id="chooser" className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Build Your Best-Fit Plan
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Most phone security comes down to your threat focus, your update timeline, and a handful of settings you can control.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            {/* Left: Input */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700">

              {/* Step 1: Threat Focus */}
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Step 1 — Threat Focus</h3>
              <p className="text-slate-400 text-sm mb-4">Choose the threat that matters most right now.</p>

              <div className="space-y-2 mb-8">
                {Object.entries(RECS).map(([key, val]) => (
                  <label key={key} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="threat"
                      value={key}
                      checked={threat === key}
                      onChange={() => setThreat(key)}
                      className="w-4 h-4 text-cyan-500 border-slate-600 focus:ring-cyan-500"
                    />
                    <span className={`text-sm transition-colors ${threat === key ? 'text-cyan-300 font-semibold' : 'text-slate-300 group-hover:text-slate-100'}`}>
                      {val.label}
                    </span>
                  </label>
                ))}
              </div>

              <div className="border-t border-slate-700 pt-6 mb-6">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">Step 2 — Your Current Phone</h3>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelClass}>Phone model and year</label>
                    <input
                      type="text"
                      value={phoneModel}
                      onChange={e => setPhoneModel(e.target.value)}
                      placeholder="e.g. iPhone 14 Pro, 2022"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Platform</label>
                    <select value={osFamily} onChange={e => setOsFamily(e.target.value)} className={selectClass}>
                      <option value="">Select one</option>
                      <option value="ios">iOS</option>
                      <option value="android">Android</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>OS version</label>
                    <input
                      type="text"
                      value={osVersion}
                      onChange={e => setOsVersion(e.target.value)}
                      placeholder="e.g. iOS 17 or Android 14"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>How long you plan to keep it</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={keepYears}
                      onChange={e => setKeepYears(e.target.value)}
                      placeholder="Years"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className={labelClass}>High risk apps you use most</label>
                  <textarea
                    value={highRiskApps}
                    onChange={e => setHighRiskApps(e.target.value)}
                    rows="3"
                    placeholder="e.g. social apps, dating apps, crypto wallets"
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Need Google services?</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="radio" name="needGoogle" value="yes" checked={needGoogle === 'yes'} onChange={() => setNeedGoogle('yes')} className="w-4 h-4 text-cyan-500" />
                        <span className="text-slate-300 text-sm">Yes</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="radio" name="needGoogle" value="no" checked={needGoogle === 'no'} onChange={() => setNeedGoogle('no')} className="w-4 h-4 text-cyan-500" />
                        <span className="text-slate-300 text-sm">No</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Need iMessage or FaceTime?</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="radio" name="needIMsg" value="yes" checked={needIMsg === 'yes'} onChange={() => setNeedIMsg('yes')} className="w-4 h-4 text-cyan-500" />
                        <span className="text-slate-300 text-sm">Yes</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="radio" name="needIMsg" value="no" checked={needIMsg === 'no'} onChange={() => setNeedIMsg('no')} className="w-4 h-4 text-cyan-500" />
                        <span className="text-slate-300 text-sm">No</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional Questions */}
              <button
                onClick={() => setShowOptional(!showOptional)}
                className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm mb-4 transition-colors"
              >
                {showOptional ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                <span>Optional questions to refine the pick</span>
              </button>

              {showOptional && (
                <div className="grid grid-cols-2 gap-4 mb-6 border-t border-slate-700 pt-4">
                  <div>
                    <label className={labelClass}>Travel often or use public WiFi?</label>
                    <select value={travelOften} onChange={e => setTravelOften(e.target.value)} className={selectClass}>
                      <option value="">Select one</option>
                      <option value="often">Often</option>
                      <option value="sometimes">Sometimes</option>
                      <option value="rarely">Rarely</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Install apps from outside official stores?</label>
                    <select value={sideloading} onChange={e => setSideloading(e.target.value)} className={selectClass}>
                      <option value="">Select one</option>
                      <option value="no">No</option>
                      <option value="sometimes">Sometimes</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Need work and personal separation?</label>
                    <select value={workProfile} onChange={e => setWorkProfile(e.target.value)} className={selectClass}>
                      <option value="">Select one</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="not_sure">Not sure</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Compliance requirements?</label>
                    <select value={complianceNeed} onChange={e => setComplianceNeed(e.target.value)} className={selectClass}>
                      <option value="">Select one</option>
                      <option value="none">None</option>
                      <option value="client">Client requirements</option>
                      <option value="regulated">Regulated, formal policies required</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleGenerate}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                >
                  Generate My Plan
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-lg font-semibold border border-slate-600 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-800 flex items-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Right: Output */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700">
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Your Output</h3>
              <p className="text-slate-400 text-sm mb-6">Generate a recommendation, then download or copy it.</p>

              {!output ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Smartphone className="w-16 h-16 text-slate-700 mb-4" />
                  <p className="text-slate-400 font-semibold mb-2">No output yet.</p>
                  <p className="text-slate-500 text-sm">Choose your threat focus, fill in what you can, then click Generate My Plan.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Recommendation */}
                  <div className="bg-slate-950 rounded-xl border border-cyan-500/30 p-5">
                    <h4 className="text-lg font-bold text-cyan-300 mb-3">Your Best-Fit Plan</h4>
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                        <span className="text-slate-500 text-sm font-semibold w-28 shrink-0">Threat focus</span>
                        <span className="text-slate-300 text-sm">{output.rec.label}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                        <span className="text-slate-500 text-sm font-semibold w-28 shrink-0">Best fit</span>
                        <span className="text-cyan-300 text-sm font-semibold">{output.rec.bestFit}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                        <span className="text-slate-500 text-sm font-semibold w-28 shrink-0">Why this fits</span>
                        <span className="text-slate-300 text-sm">{output.rec.why}</span>
                      </div>
                    </div>
                  </div>

                  {/* Must Have */}
                  <div className="bg-slate-950 rounded-xl border border-slate-700 p-5">
                    <h5 className="text-sm font-bold text-cyan-400 mb-3 uppercase tracking-wider">Must Have Security Features</h5>
                    <ul className="space-y-2">
                      {MUST_HAVE.map((item, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="text-slate-300 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Hardening */}
                  <div className="bg-slate-950 rounded-xl border border-slate-700 p-5">
                    <h5 className="text-sm font-bold text-cyan-400 mb-3 uppercase tracking-wider">Hardening Checklist</h5>
                    <ul className="space-y-2">
                      {HARDENING.map((item, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                          <span className="text-slate-300 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Red Flags */}
                  <div className="bg-slate-950 rounded-xl border border-red-500/20 p-5">
                    <h5 className="text-sm font-bold text-red-400 mb-3 uppercase tracking-wider">Red Flags to Avoid</h5>
                    <ul className="space-y-2">
                      {RED_FLAGS.map((item, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                          <span className="text-slate-300 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Notes */}
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-5">
                    <h5 className="text-sm font-bold text-cyan-400 mb-2 uppercase tracking-wider">Notes Based on Your Answers</h5>
                    <p className="text-slate-300 text-sm leading-relaxed">{output.notes}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleDownloadText}
                  disabled={!output}
                  className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Text</span>
                </button>
                <button
                  onClick={handleCopy}
                  disabled={!output}
                  className="flex-1 flex items-center justify-center space-x-2 border border-slate-600 hover:border-cyan-500 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copyLabel}</span>
                </button>
              </div>

              {/* Tip */}
              <div className="mt-6 bg-slate-950 border border-slate-700 rounded-xl p-4">
                <p className="text-slate-400 text-sm">
                  <strong className="text-cyan-400">Tip: </strong>
                  If you want a tailored version, enter your phone model and your top concern, then download the output and keep it with your device notes.
                </p>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="mt-8 bg-yellow-500/10 border-2 border-yellow-500/30 rounded-2xl p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-500/20 p-2 rounded-lg shrink-0">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-bold text-yellow-400 mb-2">Legal Disclaimer</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  This tool provides educational guidance only. Always verify recommendations, update timelines, and device features with the manufacturer and your carrier. CyberLifeCoach assumes no liability for misuse, data loss, or damage resulting from actions taken based on this content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/logo.png" alt="CyberLifeCoach" className="h-8 w-auto transition-all duration-300 hover:scale-125 hover:brightness-125" />
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
