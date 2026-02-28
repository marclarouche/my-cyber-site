import React, { useState } from 'react';
import { UserCheck, Copy, Download, Printer, RotateCcw, ArrowLeft, FileText, AlertCircle } from 'lucide-react';

export default function AccessControlPolicy() {
  const [formData, setFormData] = useState({
    company: '',
    owner: '',
    appliesTo: '',
    effective: '',
    model: 'RBAC (Role-Based)',
    mfa: 'Required for all access',
    pam: '',
    sod: '',
    approval: '',
    roles: '',
    joiner: '',
    provSla: '',
    mover: '',
    leaver: '',
    cadence: '',
    scope: '',
    evidence: '',
    remediation: '',
    statement: '',
    iga: '',
    logging: '',
    exceptions: '',
    contact: ''
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
    const owner = formData.owner.trim() || 'Security / GRC';
    const appliesTo = formData.appliesTo.trim() || 'All users, contractors, vendors, service and privileged accounts';
    const pam = formData.pam.trim() || 'Just-in-time elevation with monitoring and session recording';
    const sod = formData.sod.trim() || 'Incompatible roles defined and enforced via approval gates and automated checks';
    const approval = formData.approval.trim() || 'Manager and data owner approvals via ticketing/IGA';
    const roles = formData.roles.trim() || 'Standard roles mapped to least-privilege entitlements';
    const joiner = formData.joiner.trim() || 'Identity created in IdP, baseline role assigned, MFA enforced';
    const provSla = formData.provSla.trim() || '1 business day';
    const mover = formData.mover.trim() || 'Access recertified against new role; remove old entitlements immediately';
    const leaver = formData.leaver.trim() || 'Disable accounts within 1 hour; revoke tokens; collect assets; archive according to policy';
    const cadence = formData.cadence.trim() || 'Quarterly privileged; semi-annual all users';
    const scope = formData.scope.trim() || 'Business-critical apps and data stores';
    const evidence = formData.evidence.trim() || 'Signed certification export and linked tickets stored in GRC repository';
    const remediation = formData.remediation.trim() || 'Remove excess access within 5 days; track via POA&M';
    const statement = formData.statement.trim() || 'I certify that access is appropriate and least-privileged.';
    const iga = formData.iga.trim() || 'Central IdP with IGA for lifecycle and reviews';
    const logging = formData.logging.trim() || 'All access requests/approvals logged; privileged sessions recorded; 1 year retention';
    const exceptions = formData.exceptions.trim() || 'Time-bound exceptions require risk acceptance by CISO and business owner; renew or expire automatically.';
    const contact = formData.contact.trim() || 'security@example.com';

    const text = `
${company} Access Control Policy
Effective Date: ${getEffectiveDate()}
Policy Owner: ${owner}
Scope: ${appliesTo}

1. Purpose
This policy defines how access to company systems and data is requested, approved, provisioned, monitored, reviewed, and revoked to maintain least privilege and reduce risk.

2. Access Model
2.1 Primary model: ${formData.model}.
2.2 MFA: ${formData.mfa}.
2.3 Privileged Access Management: ${pam}.
2.4 Segregation of Duties: ${sod}.
2.5 Approval workflow: ${approval}.
2.6 Role catalog: ${roles}.

3. Joiner-Mover-Leaver (JML)
3.1 Joiner: ${joiner}; SLA ${provSla}.
3.2 Mover: ${mover}.
3.3 Leaver: ${leaver}.

4. Access Reviews
4.1 Cadence: ${cadence}.
4.2 Scope: ${scope}.
4.3 Evidence: ${evidence}.
4.4 Remediation: ${remediation}.
4.5 Certification statement: "${statement}"

5. Technology & Logging
5.1 Identity/IGA: ${iga}.
5.2 Logging: ${logging}.

6. Exceptions
6.1 ${exceptions}

7. Enforcement & Contact
7.1 Violations may result in access restriction and corrective action under HR/IT policies.
7.2 Security contact: ${contact}.

Document Control
Owner: ${owner}
Effective Date: ${getEffectiveDate()}
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
      model: 'RBAC (Role-Based)',
      mfa: 'Required for all access',
      pam: '',
      sod: '',
      approval: '',
      roles: '',
      joiner: '',
      provSla: '',
      mover: '',
      leaver: '',
      cadence: '',
      scope: '',
      evidence: '',
      remediation: '',
      statement: '',
      iga: '',
      logging: '',
      exceptions: '',
      contact: ''
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

  const downloadText = () => downloadFile("access-control-policy.txt", "text/plain");
  const downloadMarkdown = () => downloadFile("access-control-policy.md", "text/markdown");

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
  <title>Access Control Policy</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #000; }
    h1 { font-size: 18px; margin: 0 0 16px; }
    pre { white-space: pre-wrap; word-wrap: break-word; font-family: "Courier New", monospace; font-size: 12px; line-height: 1.5; }
    @media print { body { margin: 20mm; } }
  </style>
</head>
<body>
  <h1>Access Control Policy</h1>
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
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30 mb-6">
              <UserCheck className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-slate-300">Policy Generator</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              Access Control Policy Generator
            </h1>
            
            <p className="text-xl text-slate-400">
              Codify least privilege, role mapping, joiner-mover-leaver steps, and periodic access reviews with evidence capture
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
                    placeholder="Security / GRC / IT"
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
                    placeholder="Employees, contractors, vendors, service accounts"
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
                </div>
              </div>
            </div>

            {/* Access Model Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-cyan-400 mb-6 pb-3 border-b border-cyan-500/30">
                Access Model
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Primary Model
                  </label>
                  <select
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  >
                    <option>RBAC (Role-Based)</option>
                    <option>ABAC (Attribute-Based)</option>
                    <option>RBAC with ABAC conditions</option>
                    <option>Least-Privilege by default (hybrid)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    MFA Requirement
                  </label>
                  <select
                    name="mfa"
                    value={formData.mfa}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  >
                    <option>Required for all access</option>
                    <option>Required for privileged access</option>
                    <option>Recommended</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Privileged Access Management
                  </label>
                  <input
                    type="text"
                    name="pam"
                    value={formData.pam}
                    onChange={handleInputChange}
                    placeholder="JIT elevation, session recording, vaulting (e.g., PAM tool)"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Segregation of Duties (SoD)
                  </label>
                  <input
                    type="text"
                    name="sod"
                    value={formData.sod}
                    onChange={handleInputChange}
                    placeholder="Define incompatible roles and approval gates"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Approval Workflow
                  </label>
                  <input
                    type="text"
                    name="approval"
                    value={formData.approval}
                    onChange={handleInputChange}
                    placeholder="Manager + data owner approval via ticketing/IGA; emergency break-glass logged"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Role Catalog Summary
                  </label>
                  <input
                    type="text"
                    name="roles"
                    value={formData.roles}
                    onChange={handleInputChange}
                    placeholder="Finance-AP, Finance-AR, Support-Tier1, Engineering-ReadOnly, etc."
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Joiner-Mover-Leaver Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-cyan-400 mb-6 pb-3 border-b border-cyan-500/30">
                Joiner-Mover-Leaver (JML)
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Joiner (Provisioning) Steps
                  </label>
                  <input
                    type="text"
                    name="joiner"
                    value={formData.joiner}
                    onChange={handleInputChange}
                    placeholder="HR trigger, identity created in IdP, baseline role, least privilege"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Provisioning SLA
                  </label>
                  <input
                    type="text"
                    name="provSla"
                    value={formData.provSla}
                    onChange={handleInputChange}
                    placeholder="Within 1 business day of HR trigger"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Mover (Change) Steps
                  </label>
                  <input
                    type="text"
                    name="mover"
                    value={formData.mover}
                    onChange={handleInputChange}
                    placeholder="Re-certify access vs new role, remove old entitlements immediately"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Leaver (Termination) Steps
                  </label>
                  <input
                    type="text"
                    name="leaver"
                    value={formData.leaver}
                    onChange={handleInputChange}
                    placeholder="Disable account within 1 hour, revoke tokens, collect assets, archive mailbox"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Periodic Access Reviews Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-cyan-400 mb-6 pb-3 border-b border-cyan-500/30">
                Periodic Access Reviews
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Review Cadence
                  </label>
                  <input
                    type="text"
                    name="cadence"
                    value={formData.cadence}
                    onChange={handleInputChange}
                    placeholder="Quarterly privileged, semi-annual all users"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Review Scope
                  </label>
                  <input
                    type="text"
                    name="scope"
                    value={formData.scope}
                    onChange={handleInputChange}
                    placeholder="Systems in scope: ERP, CRM, Source Control, Data Warehouse"
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
                    placeholder="GRC tool record, signed export, ticket number"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Remediation Workflow
                  </label>
                  <input
                    type="text"
                    name="remediation"
                    value={formData.remediation}
                    onChange={handleInputChange}
                    placeholder="Remove access within 5 days; track in POA&M with owner"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Certification Statement
                  </label>
                  <input
                    type="text"
                    name="statement"
                    value={formData.statement}
                    onChange={handleInputChange}
                    placeholder="I certify that access for listed users is appropriate and least-privileged."
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Technology & Logging Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-cyan-400 mb-6 pb-3 border-b border-cyan-500/30">
                Technology & Logging
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Identity Platform / IGA
                  </label>
                  <input
                    type="text"
                    name="iga"
                    value={formData.iga}
                    onChange={handleInputChange}
                    placeholder="Okta / Entra ID, plus IGA tool for reviews"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Logging & Retention
                  </label>
                  <input
                    type="text"
                    name="logging"
                    value={formData.logging}
                    onChange={handleInputChange}
                    placeholder="Centralized logs (SIEM), 1 year retention, privileged sessions recorded"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Exception Process
                  </label>
                  <input
                    type="text"
                    name="exceptions"
                    value={formData.exceptions}
                    onChange={handleInputChange}
                    placeholder="Time-bound exception with risk acceptance by CISO and business owner"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Security Contact
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder="security@example.com"
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
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">Generated Access Control Policy:</h3>
            <textarea
              value={output}
              readOnly
              placeholder="Your generated policy will appear here..."
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
              <strong className="text-cyan-400">Legal Disclaimer:</strong> This generator produces a template for informational purposes and does not constitute legal or compliance advice. Access control obligations vary by jurisdiction, regulation, and contract. Obtain review from qualified counsel and your security/compliance teams before adoption. Use of this tool does not create an attorney-client relationship.
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
