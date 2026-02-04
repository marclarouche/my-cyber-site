import React, { useState } from 'react';
import { AlertTriangle, Copy, Download, Printer, RotateCcw, ArrowLeft, FileText, Shield } from 'lucide-react';

export default function IncidentResponsePolicy() {
  const [formData, setFormData] = useState({
    org: '',
    scope: '',
    severity: '',
    roles: '',
    comms: '',
    detection: '',
    containment: '',
    evidence: '',
    notify: '',
    post: '',
    contacts: '',
    tools: ''
  });

  const [output, setOutput] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateIRP = () => {
    const date = new Date().toLocaleDateString();

    const org = formData.org.trim() || "Your Organization";
    const scope = formData.scope.trim() || "Define the scope of systems, data, users, and locations covered";
    const sev = formData.severity.trim() || "Low, Medium, High, Critical";
    const roles = formData.roles.trim() || "Define IR team roles and responsibilities";
    const comms = formData.comms.trim() || "Define approved communication channels";
    const detection = formData.detection.trim() || "Describe detection sources and triage steps";
    const containment = formData.containment.trim() || "Describe containment, eradication, and recovery approach";
    const evidence = formData.evidence.trim() || "Describe evidence handling and chain of custody";
    const notify = formData.notify.trim() || "Describe notification requirements and timelines";
    const post = formData.post.trim() || "Describe lessons learned and continuous improvement";
    const contacts = formData.contacts.trim() || "List external contacts";
    const tools = formData.tools.trim() || "List tooling and resources";

    const txt = `${org} — Incident Response Policy
Effective Date: ${date}

1. Purpose and Scope
This policy defines how ${org} prepares for, detects, responds to, and recovers from security incidents.
Scope: ${scope}

2. Roles and Responsibilities
Primary incident roles and coverage:
${roles}

3. Severity Classification
Incidents are classified and escalated according to:
${sev}

4. Reporting, Detection, and Triage
Employees must report suspected incidents immediately to the incident response team.
Detection and triage sources include:
${detection}

5. Containment, Eradication, and Recovery
Response actions prioritize safety, data integrity, and business continuity:
${containment}

6. Communication Plan
All communications follow approved channels to reduce misinformation and preserve evidence:
${comms}

7. Evidence Preservation
The incident response team maintains chain of custody and preserves evidence for internal review and potential legal needs:
${evidence}

8. Notifications
Notifications are made when required by law, contract, or risk:
${notify}

9. Tooling and Resources
The following tools and platforms support investigation, coordination, and recovery:
${tools}

10. Post-Incident Review and Continuous Improvement
Following closure, the team conducts a lessons learned review and tracks remediation:
${post}

11. External Contacts
Primary external contacts for legal, forensic, insurance, and public safety support:
${contacts}

12. Governance and Maintenance
This policy is reviewed at least annually, after major incidents, or when technology or regulations change.
Updates are approved by leadership and communicated to all affected staff.

Approved by: ______________________    Date: __________`;

    setOutput(txt);
  };

  const resetAll = () => {
    setFormData({
      org: '',
      scope: '',
      severity: '',
      roles: '',
      comms: '',
      detection: '',
      containment: '',
      evidence: '',
      notify: '',
      post: '',
      contacts: '',
      tools: ''
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
    } catch (e) {
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

  const downloadText = () => {
    downloadFile("incident-response-policy.txt", "text/plain");
  };

  const downloadMarkdown = () => {
    downloadFile("incident-response-policy.md", "text/markdown");
  };

  const escapeHtml = (str) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    return String(str).replace(/[&<>"']/g, m => map[m]);
  };

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

    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Incident Response Policy</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #000; }
    h1 { font-size: 18px; margin: 0 0 16px; }
    pre { white-space: pre-wrap; word-wrap: break-word; font-family: "Courier New", monospace; font-size: 12px; line-height: 1.5; }
    @media print { body { margin: 20mm; } }
  </style>
</head>
<body>
  <h1>Incident Response Policy</h1>
  <pre>${escapeHtml(output)}</pre>
  <script>
    window.onload = function() {
      window.focus();
      window.print();
      setTimeout(function() { window.close(); }, 300);
    };
  <\/script>
</body>
</html>`;

    win.document.open();
    win.document.write(html);
    win.document.close();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className="bg-slate-950/80 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
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

            {/* Back to Hub */}
            <button
              onClick={() => window.location.href = '/policy-generators'}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-all duration-300 border border-slate-700 hover:border-cyan-500"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Business Policy Hub</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <AlertTriangle className="w-12 h-12 text-cyan-400" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Incident Response Policy Generator
              </h1>
            </div>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Create a practical, actionable incident response policy for your organization, generated locally on your device.
            </p>
            <p className="text-lg text-cyan-400 font-semibold mt-2">
              A Veteran-Owned Business Committed to Your Digital Security
            </p>
          </div>

          {/* Security Badge */}
          <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-xl p-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-3">
              <Shield className="w-6 h-6 text-cyan-400" />
              <span className="text-slate-300">Client-Side Processing - Your data never leaves your browser</span>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Organization name */}
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Organization name:
                  </label>
                  <input
                    type="text"
                    name="org"
                    value={formData.org}
                    onChange={handleInputChange}
                    placeholder="Acme Co."
                    autoComplete="organization"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                {/* Policy scope */}
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Policy scope:
                  </label>
                  <input
                    type="text"
                    name="scope"
                    value={formData.scope}
                    onChange={handleInputChange}
                    placeholder="All company information systems, data, and users"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                  <p className="text-sm text-slate-500 mt-2">Systems, data types, users, locations included</p>
                </div>

                {/* Severity levels */}
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Severity levels:
                  </label>
                  <input
                    type="text"
                    name="severity"
                    value={formData.severity}
                    onChange={handleInputChange}
                    placeholder="Low, Medium, High, Critical"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                  <p className="text-sm text-slate-500 mt-2">How you classify incidents and escalate</p>
                </div>

                {/* IR team and roles */}
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    IR team and roles:
                  </label>
                  <textarea
                    name="roles"
                    value={formData.roles}
                    onChange={handleInputChange}
                    placeholder="IR Lead, Communications, Forensics, Legal, IT Ops, Executive Sponsor"
                    rows="4"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                  <p className="text-sm text-slate-500 mt-2">Who does what during response</p>
                </div>

                {/* Communication channels */}
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Communication channels:
                  </label>
                  <input
                    type="text"
                    name="comms"
                    value={formData.comms}
                    onChange={handleInputChange}
                    placeholder="Phone tree, out-of-band chat, ticketing, executive briefings"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Detection and triage sources */}
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Detection and triage sources:
                  </label>
                  <textarea
                    name="detection"
                    value={formData.detection}
                    onChange={handleInputChange}
                    placeholder="EDR alerts, email reports, SIEM rules, vendor notices, threat intel feeds"
                    rows="4"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>

                {/* Containment and eradication approach */}
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Containment and eradication approach:
                  </label>
                  <textarea
                    name="containment"
                    value={formData.containment}
                    onChange={handleInputChange}
                    placeholder="Isolate endpoints, block IOC domains, rotate credentials, remove malware"
                    rows="4"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>

                {/* Evidence handling */}
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Evidence handling:
                  </label>
                  <textarea
                    name="evidence"
                    value={formData.evidence}
                    onChange={handleInputChange}
                    placeholder="Chain of custody, disk images, logs with hashes, time-stamped notes"
                    rows="4"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>

                {/* Notification timelines */}
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Notification timelines:
                  </label>
                  <input
                    type="text"
                    name="notify"
                    value={formData.notify}
                    onChange={handleInputChange}
                    placeholder="Customers within 72 hours when applicable, regulators per law, execs within 24 hours"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                {/* Post-incident review */}
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Post-incident review:
                  </label>
                  <textarea
                    name="post"
                    value={formData.post}
                    onChange={handleInputChange}
                    placeholder="Lessons learned, control updates, tabletop schedule, metrics tracking"
                    rows="4"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Row - Full Width */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {/* External contacts */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  External contacts:
                </label>
                <textarea
                  name="contacts"
                  value={formData.contacts}
                  onChange={handleInputChange}
                  placeholder="Outside counsel, DFIR partner, insurer, key vendors, law enforcement"
                  rows="3"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>

              {/* Tooling and resources */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Tooling and resources:
                </label>
                <textarea
                  name="tools"
                  value={formData.tools}
                  onChange={handleInputChange}
                  placeholder="EDR or AV, SIEM, backup platform, ticketing, password manager, comms plan templates"
                  rows="3"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={generateIRP}
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
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">Generated Incident Response Policy:</h3>
            <textarea
              value={output}
              readOnly
              placeholder="Your generated Incident Response Policy will appear here..."
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
              <strong className="text-cyan-400">Legal Disclaimer:</strong> This generator provides a template for informational purposes only and does not constitute legal, regulatory, or compliance advice. Requirements vary by jurisdiction, industry, contracts, and incident type. Have qualified legal and security professionals review this policy before adoption or publication.
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
