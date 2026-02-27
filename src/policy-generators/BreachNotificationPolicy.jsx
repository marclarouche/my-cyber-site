import React, { useState } from 'react';
import { AlertTriangle, Copy, Download, Printer, RotateCcw, ArrowLeft, FileText, AlertCircle } from 'lucide-react';

export default function BreachNotificationPolicy() {
  const [formData, setFormData] = useState({
    company: '',
    owner: '',
    appliesTo: '',
    effective: '',
    incidentDef: '',
    pdbDef: '',
    trigger: '',
    regNotify: '',
    indNotify: '',
    lawEnf: 'Consult legal; delay notice if instructed to avoid impeding investigation',
    jurisdictions: '',
    ic: '',
    dpo: '',
    comms: '',
    legal: '',
    vendor: '',
    assessment: '',
    evidence: '',
    forensics: '',
    retention: '',
    regContacts: '',
    delivery: '',
    content: '',
    remediation: '',
    ll: '',
    improve: '',
    exec: ''
  });

  const [output, setOutput] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getEffectiveDate = () => {
    if (formData.effective) {
      return new Date(formData.effective).toLocaleDateString();
    }
    return new Date().toLocaleDateString();
  };

  const generatePolicy = () => {
    const company = formData.company.trim() || 'Your Company';
    const owner = formData.owner.trim() || 'Security / Legal / Privacy';
    const appliesTo = formData.appliesTo.trim() || 'Employees, contractors, vendors handling company data';
    const effective = getEffectiveDate();

    const incidentDef = formData.incidentDef.trim() || 'Event that compromises confidentiality, integrity, or availability';
    const pdbDef = formData.pdbDef.trim() || 'Breach leading to accidental or unlawful destruction, loss, alteration, unauthorized disclosure or access';
    const trigger = formData.trigger.trim() || 'When the company becomes aware that a breach is likely to result in risk to individuals';

    const regNotify = formData.regNotify.trim() || '72 hours (GDPR), as soon as practicable (state laws)';
    const indNotify = formData.indNotify.trim() || 'Without undue delay; state-specific days if applicable';
    const lawEnf = formData.lawEnf.trim();
    const jurisdictions = formData.jurisdictions.trim() || 'EU/EEA, UK, US states, other';

    const ic = formData.ic.trim() || 'CISO or delegate';
    const dpo = formData.dpo.trim() || 'DPO/Privacy Counsel';
    const comms = formData.comms.trim() || 'Comms/PR';
    const legal = formData.legal.trim() || 'General Counsel / External Counsel';
    const vendor = formData.vendor.trim() || 'Vendors must notify within agreed hours, share indicators, and cooperate with forensics';

    const assessment = formData.assessment.trim() || 'Evaluate likelihood and severity to individuals, data types affected, volume, safeguards, and mitigations';
    const evidence = formData.evidence.trim() || 'Maintain chain-of-custody, case number, timelines, and artifacts in IR system';
    const forensics = formData.forensics.trim() || 'Engage qualified responders; isolate affected systems; preserve logs and images';
    const retention = formData.retention.trim() || 'Retain incident records and notices for required statutory periods';

    const regContacts = formData.regContacts.trim() || 'Notify competent authority(ies) for affected data subjects';
    const delivery = formData.delivery.trim() || 'Email, postal mail, account notifications, and media/public postings where required';
    const content = formData.content.trim() || 'Nature of incident, categories of data, timing, mitigation steps, recommended protective actions, contact details';
    const remediation = formData.remediation.trim() || 'Provide credit monitoring/identity protection where required or appropriate';

    const ll = formData.ll.trim() || '14 days';
    const improve = formData.improve.trim() || 'Assigned and monitored to closure';
    const exec = formData.exec.trim() || 'Provide an executive/board summary within 30 days';

    const text = `
${company} Breach Notification Policy
Effective Date: ${effective}
Policy Owner: ${owner}
Scope: ${appliesTo}

1. Purpose
This policy establishes how ${company} assesses, documents, and notifies regulators, individuals, and partners of personal data breaches and other incidents in accordance with applicable laws and contracts.

2. Definitions and Triggers
2.1 Incident: ${incidentDef}.
2.2 Personal Data Breach: ${pdbDef}.
2.3 Notification Clock: Starts ${trigger}.

3. Timelines and Jurisdictions
3.1 Regulator notification target: ${regNotify}.
3.2 Individuals notification target: ${indNotify}.
3.3 Law enforcement coordination: ${lawEnf}.
3.4 Jurisdictions in scope: ${jurisdictions}.

4. Roles and Responsibilities
4.1 Incident Commander: ${ic} coordinates response.
4.2 Privacy Lead/DPO: ${dpo} determines notification necessity and content.
4.3 Legal: ${legal} confirms statutory triggers and safe harbors.
4.4 Communications: ${comms} manages consistent external messaging.
4.5 Vendors: ${vendor}.

5. Assessment, Evidence, and Containment
5.1 Risk assessment: ${assessment}.
5.2 Evidence: ${evidence}.
5.3 Forensics and containment: ${forensics}.
5.4 Records retention: ${retention}.

6. Notification Requirements
6.1 Regulator contacts: ${regContacts}.
6.2 Delivery methods: ${delivery}.
6.3 Content: ${content}.
6.4 Remediation support: ${remediation}.

7. Post-Incident Review
7.1 Lessons learned within ${ll} of containment.
7.2 Control improvements tracked in a POA&M with owners and due dates: ${improve}.
7.3 Executive reporting: ${exec}.

8. Governance and Exceptions
8.1 This policy is reviewed at least annually and after material changes.
8.2 Exceptions must be documented, time-bound, and approved by Legal, Privacy, and the CISO.

9. Enforcement
Violations may result in corrective action and contractual remedies as applicable.

Document Control
Owner: ${owner}
Effective Date: ${effective}
Review Cycle: Annual or upon material change
`.trim();

    setOutput(text);
  };

  const resetAll = () => {
    setFormData({
      company: '',
      owner: '',
      appliesTo: '',
      effective: '',
      incidentDef: '',
      pdbDef: '',
      trigger: '',
      regNotify: '',
      indNotify: '',
      lawEnf: 'Consult legal; delay notice if instructed to avoid impeding investigation',
      jurisdictions: '',
      ic: '',
      dpo: '',
      comms: '',
      legal: '',
      vendor: '',
      assessment: '',
      evidence: '',
      forensics: '',
      retention: '',
      regContacts: '',
      delivery: '',
      content: '',
      remediation: '',
      ll: '',
      improve: '',
      exec: ''
    });
    setOutput('');
  };

  const copyOutput = async () => {
    if (!output.trim()) {
      alert("Please generate a policy first.");
      return;
    }
    try {
      await navigator.clipboard.writeText(output);
      alert("Copied to clipboard.");
    } catch {
      alert("Copy failed. Please copy manually.");
    }
  };

  const downloadFile = (filename, mimeType) => {
    if (!output.trim()) {
      alert("Please generate a policy first.");
      return;
    }
    const blob = new Blob([output], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const downloadText = () => downloadFile("breach-notification-policy.txt", "text/plain");
  const downloadMarkdown = () => downloadFile("breach-notification-policy.md", "text/markdown");

  const printOutput = () => {
    if (!output.trim()) {
      alert("Please generate a policy first.");
      return;
    }
    const win = window.open("", "_blank", "noopener,noreferrer");
    if (!win) {
      alert("Pop-up blocked. Please allow pop-ups to print/save as PDF.");
      return;
    }

    const escapeHtml = (str) => {
      const map = { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" };
      return String(str).replace(/[&<>"']/g, m => map[m]);
    };

    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Breach Notification Policy</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #000; }
    h1 { font-size: 18px; margin: 0 0 16px; }
    pre { white-space: pre-wrap; word-wrap: break-word; font-family: "Courier New", monospace; font-size: 12px; line-height: 1.5; }
    @media print { body { margin: 20mm; } }
  </style>
</head>
<body>
  <h1>Breach Notification Policy</h1>
  <pre>${escapeHtml(output)}</pre>
  <script>
    window.onload = function() {
      window.focus();
      window.print();
      setTimeout(function(){ window.close(); }, 300);
    };
  </script>
</body>
</html>`;

    win.document.open();
    win.document.write(html);
    win.document.close();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <img 
                src="/logo.png" 
                alt="CyberLifeCoach" 
                className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300" 
              />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:brightness-125 transition-all duration-300">
                CyberLifeCoach
              </span>
            </div>

            <a 
              href="/policy-generators"
              className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Business Policy Hub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30 mb-6">
              <AlertTriangle className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-slate-300">Policy Generator</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              Breach Notification Policy Generator
            </h1>
            
            <p className="text-xl text-slate-400 mb-2">
              Codify triggers, timelines, roles, regulator and customer notifications, evidence capture, and post-incident review
            </p>
            <p className="text-lg font-semibold text-cyan-400">
              A Veteran-Owned Business Committed to Your Digital Security
            </p>
          </div>

          {/* Security Badge */}
          <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-xl p-4 mb-8 flex items-center justify-center space-x-3">
            <AlertCircle className="w-6 h-6 text-cyan-400" />
            <span className="text-slate-300">Client-Side Processing - your data never leaves your browser</span>
          </div>

          {/* Form */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8 mb-8">
            {/* Organization & Scope Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-cyan-400 mb-6 pb-3 border-b border-cyan-500/30">
                Organization & Scope
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Acme, Inc."
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                    autoComplete="organization"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Policy Owner
                  </label>
                  <input
                    type="text"
                    name="owner"
                    value={formData.owner}
                    onChange={handleInputChange}
                    placeholder="Security / Legal / Privacy"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Applies To
                  </label>
                  <input
                    type="text"
                    name="appliesTo"
                    value={formData.appliesTo}
                    onChange={handleInputChange}
                    placeholder="Employees, contractors, vendors handling company data"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Effective Date
                  </label>
                  <input
                    type="date"
                    name="effective"
                    value={formData.effective}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                  <p className="text-sm text-slate-500 mt-2">If left blank, today's date will be used.</p>
                </div>
              </div>
            </div>

            {/* Definitions & Triggers Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-cyan-400 mb-6 pb-3 border-b border-cyan-500/30">
                Definitions & Triggers
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Incident Definition
                  </label>
                  <input
                    type="text"
                    name="incidentDef"
                    value={formData.incidentDef}
                    onChange={handleInputChange}
                    placeholder="Event that compromises confidentiality, integrity, or availability"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Personal Data Breach Definition
                  </label>
                  <input
                    type="text"
                    name="pdbDef"
                    value={formData.pdbDef}
                    onChange={handleInputChange}
                    placeholder="Breach leading to accidental or unlawful destruction, loss, alteration, unauthorized disclosure or access"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Trigger to Start Notification Clock
                  </label>
                  <input
                    type="text"
                    name="trigger"
                    value={formData.trigger}
                    onChange={handleInputChange}
                    placeholder="When the company becomes aware that a breach is likely to result in risk to individuals"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Timelines & Jurisdictions Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-cyan-400 mb-6 pb-3 border-b border-cyan-500/30">
                Timelines & Jurisdictions
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Regulator Notification Target
                  </label>
                  <input
                    type="text"
                    name="regNotify"
                    value={formData.regNotify}
                    onChange={handleInputChange}
                    placeholder="72 hours (GDPR), as soon as practicable (state laws)"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Affected Individuals Notification Target
                  </label>
                  <input
                    type="text"
                    name="indNotify"
                    value={formData.indNotify}
                    onChange={handleInputChange}
                    placeholder="Without undue delay; state-specific days if applicable"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Law Enforcement Coordination
                  </label>
                  <select
                    name="lawEnf"
                    value={formData.lawEnf}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  >
                    <option>Consult legal; delay notice if instructed to avoid impeding investigation</option>
                    <option>No delay permitted</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Jurisdictions in Scope
                  </label>
                  <input
                    type="text"
                    name="jurisdictions"
                    value={formData.jurisdictions}
                    onChange={handleInputChange}
                    placeholder="EU/EEA, UK, US states, other"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Roles & Responsibilities Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-cyan-400 mb-6 pb-3 border-b border-cyan-500/30">
                Roles & Responsibilities
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Incident Commander
                  </label>
                  <input
                    type="text"
                    name="ic"
                    value={formData.ic}
                    onChange={handleInputChange}
                    placeholder="CISO or delegate"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Privacy Lead / DPO
                  </label>
                  <input
                    type="text"
                    name="dpo"
                    value={formData.dpo}
                    onChange={handleInputChange}
                    placeholder="DPO or Privacy Counsel"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Communications Lead
                  </label>
                  <input
                    type="text"
                    name="comms"
                    value={formData.comms}
                    onChange={handleInputChange}
                    placeholder="PR/Comms; coordinates external messaging"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Legal Lead
                  </label>
                  <input
                    type="text"
                    name="legal"
                    value={formData.legal}
                    onChange={handleInputChange}
                    placeholder="General Counsel / External Counsel"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Vendor Coordination
                  </label>
                  <input
                    type="text"
                    name="vendor"
                    value={formData.vendor}
                    onChange={handleInputChange}
                    placeholder="Require vendors to notify within X hours, share indicators, and cooperate"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Assessment & Evidence Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-cyan-400 mb-6 pb-3 border-b border-cyan-500/30">
                Assessment & Evidence
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Risk Assessment Method
                  </label>
                  <input
                    type="text"
                    name="assessment"
                    value={formData.assessment}
                    onChange={handleInputChange}
                    placeholder="Likelihood and severity to individuals; data types and safeguards"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Evidence Repository
                  </label>
                  <input
                    type="text"
                    name="evidence"
                    value={formData.evidence}
                    onChange={handleInputChange}
                    placeholder="IR case system, ticket number, chain-of-custody"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Forensics & Containment
                  </label>
                  <input
                    type="text"
                    name="forensics"
                    value={formData.forensics}
                    onChange={handleInputChange}
                    placeholder="Engage IR firm; isolate systems; preserve logs and images"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Record Retention
                  </label>
                  <input
                    type="text"
                    name="retention"
                    value={formData.retention}
                    onChange={handleInputChange}
                    placeholder="Retain IR records and notices for X years"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-cyan-400 mb-6 pb-3 border-b border-cyan-500/30">
                Notifications
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Regulator Contacts
                  </label>
                  <input
                    type="text"
                    name="regContacts"
                    value={formData.regContacts}
                    onChange={handleInputChange}
                    placeholder="List competent authorities or link to registry"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Notice Delivery Methods
                  </label>
                  <input
                    type="text"
                    name="delivery"
                    value={formData.delivery}
                    onChange={handleInputChange}
                    placeholder="Email, postal mail, account alerts, media if required"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Notice Content Elements
                  </label>
                  <input
                    type="text"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="What happened, data types, when, actions taken, how to protect, contact info"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Credit Monitoring / Remediation
                  </label>
                  <input
                    type="text"
                    name="remediation"
                    value={formData.remediation}
                    onChange={handleInputChange}
                    placeholder="Offer monitoring/identity protection where required or appropriate"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Post-Incident Review Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-cyan-400 mb-6 pb-3 border-b border-cyan-500/30">
                Post-Incident Review
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Lessons Learned Timeline
                  </label>
                  <input
                    type="text"
                    name="ll"
                    value={formData.ll}
                    onChange={handleInputChange}
                    placeholder="Within 14 days of containment"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Control Improvements
                  </label>
                  <input
                    type="text"
                    name="improve"
                    value={formData.improve}
                    onChange={handleInputChange}
                    placeholder="POA&M with owners and due dates; track to closure"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Executive Reporting
                  </label>
                  <input
                    type="text"
                    name="exec"
                    value={formData.exec}
                    onChange={handleInputChange}
                    placeholder="Board or exec summary within 30 days"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={generatePolicy}
                className="flex-1 min-w-[200px] bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <FileText className="w-5 h-5" />
                <span>Generate Policy</span>
              </button>
              <button
                onClick={resetAll}
                className="flex-1 min-w-[200px] bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">Generated Breach Notification Policy:</h3>
            <textarea
              value={output}
              readOnly
              placeholder="Your generated policy will appear here."
              rows="20"
              className="w-full bg-slate-950 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 font-mono text-sm resize-none"
            />

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-4 mt-6">
              <button
                onClick={copyOutput}
                className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <Copy className="w-5 h-5" />
                <span>Copy</span>
              </button>
              <button
                onClick={downloadText}
                className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                <span>Download TXT</span>
              </button>
              <button
                onClick={downloadMarkdown}
                className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                <span>Download Markdown</span>
              </button>
              <button
                onClick={printOutput}
                className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <Printer className="w-5 h-5" />
                <span>Print/Save as PDF</span>
              </button>
            </div>

            <p className="text-sm text-slate-500 mt-4">Tip: Print/Save as PDF uses your browser print dialog. Choose Save as PDF.</p>
          </div>

          {/* Legal Disclaimer */}
          <div className="mt-8 bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer:</strong> This generator produces a template for informational purposes and does not constitute legal or compliance advice. Breach notification obligations vary by jurisdiction, regulation, and contract. Obtain review from qualified counsel and your security/compliance teams before adoption. Use of this tool does not create an attorney-client relationship.
            </p>
          </div>
        </div>
      </div>

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
