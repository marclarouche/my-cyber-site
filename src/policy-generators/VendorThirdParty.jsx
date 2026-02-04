import React, { useState } from 'react';
import { Lock, Copy, Download, Printer, RotateCcw, ArrowLeft, FileText, Users } from 'lucide-react';

export default function VendorThirdParty() {
  const [formData, setFormData] = useState({
    company: '',
    owner: '',
    appliesTo: '',
    effective: '',
    tiers: 'Low / Medium / High',
    dataClasses: '',
    useCase: '',
    questionnaire: '',
    assurance: '',
    testing: '',
    screening: 'Required',
    minControls: '',
    dpa: 'Required',
    breachHours: '',
    subproc: 'Prior written approval',
    audit: 'Right to audit',
    location: '',
    encryption: '',
    retention: '',
    insurance: '',
    privacy: '',
    onboarding: '',
    monitoring: '',
    issues: '',
    sla: '',
    access: '',
    ack: 'Required',
    review: '',
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

  const generatePolicy = () => {
    const company = formData.company.trim() || "Your Company";
    const owner = formData.owner.trim() || "TPRM / Security";
    const appliesTo = formData.appliesTo.trim() || "All third parties with access to company data or systems";
    const effectiveDate = formData.effective ? new Date(formData.effective).toLocaleDateString() : new Date().toLocaleDateString();

    const tiers = formData.tiers || "Low / Medium / High";
    const dataClasses = formData.dataClasses.trim() || "Public, Internal";
    const useCase = formData.useCase.trim() || "As documented in the vendor record";

    const questionnaire = formData.questionnaire.trim() || "Standard security questionnaire";
    const assurance = formData.assurance.trim() || "SOC 2 or ISO 27001 (or equivalent evidence)";
    const testing = formData.testing.trim() || "Annual penetration test summary and routine vulnerability scanning";
    const screening = formData.screening || "Required";
    const minControls = formData.minControls.trim() || "MFA, encryption, EDR, logging, backups, incident response";

    const dpa = formData.dpa || "Required";
    const breachHours = formData.breachHours.trim() || "72";
    const subproc = formData.subproc || "Prior written approval";
    const audit = formData.audit || "Right to audit";
    const location = formData.location.trim() || "Restricted to approved regions; SCCs/IDTA and TIAs as needed";
    const encryption = formData.encryption.trim() || "TLS 1.2+ in transit and AES-256 at rest with appropriate key management";
    const retention = formData.retention.trim() || "Return or delete data upon termination within 30 days and certify deletion";
    const insurance = formData.insurance.trim() || "Maintain appropriate cyber insurance and provide evidence on request";
    const privacy = formData.privacy.trim() || "Support data subject rights and DPIA obligations as applicable";

    const onboarding = formData.onboarding.trim() || "Due diligence completed, contracts executed, SSO/MFA configured";
    const monitoring = formData.monitoring.trim() || "Quarterly attestations and annual recertification";
    const issues = formData.issues.trim() || "Vendor maintains POA&M with target dates and progress updates";
    const sla = formData.sla.trim() || "Defined uptime, RTO/RPO, and support response SLAs with reporting";
    const access = formData.access.trim() || "Grant least privilege via RBAC, enforce MFA, and log administrative access";

    const ack = formData.ack || "Required";
    const review = formData.review.trim() || "Annual or upon material change";
    const exceptions = formData.exceptions.trim() || "Documented risk acceptance approved by CISO and business owner with expiry";
    const contact = formData.contact.trim() || "security@example.com";

    const txt = `
${company} Vendor & Third-Party Security Policy
Effective Date: ${effectiveDate}
Policy Owner: ${owner}
Scope: ${appliesTo}

1. Purpose
This policy establishes requirements for evaluating, contracting, and monitoring third parties that process company data or provide services that could impact confidentiality, integrity, or availability.

2. Risk Tiering and Use Case
2.1 Risk tiers: ${tiers}.
2.2 Data classifications handled: ${dataClasses}.
2.3 Business purpose: ${useCase}.

3. Security Evidence and Due Diligence
3.1 Questionnaire: ${questionnaire}.
3.2 External assurance: ${assurance}.
3.3 Testing evidence: ${testing}.
3.4 Screening: ${screening}.
3.5 Minimum controls: ${minControls}.

4. Contractual Requirements
4.1 DPA: ${dpa}.
4.2 Breach notification: within ${breachHours} hours of becoming aware.
4.3 Sub-processors: ${subproc}.
4.4 Audit rights: ${audit}.
4.5 Data location and transfers: ${location}.
4.6 Encryption: ${encryption}.
4.7 Retention, return, deletion: ${retention}.
4.8 Insurance: ${insurance}.
4.9 Privacy and DPIA: ${privacy}.

5. Onboarding and Access
5.1 Onboarding checklist: ${onboarding}.
5.2 Access management: ${access}.

6. Continuous Monitoring
6.1 Cadence: ${monitoring}.
6.2 Issue management: ${issues}.
6.3 Service SLAs: ${sla}.

7. Incident Management
7.1 Vendor must notify the company within ${breachHours} hours and provide details, containment actions, and ongoing updates.
7.2 Security contact: ${contact}.

8. Governance
8.1 Acknowledgment: ${ack}.
8.2 Review cycle: ${review}.
8.3 Exceptions: ${exceptions}.

9. Termination
9.1 Upon termination, vendor must cease processing, return or delete data per section 4.7, revoke access, and provide certification of destruction.

Document Control
Owner: ${owner}
Effective Date: ${effectiveDate}
Review Cycle: ${review}
    `.trim();

    setOutput(txt);
  };

  const resetForm = () => {
    setFormData({
      company: '',
      owner: '',
      appliesTo: '',
      effective: '',
      tiers: 'Low / Medium / High',
      dataClasses: '',
      useCase: '',
      questionnaire: '',
      assurance: '',
      testing: '',
      screening: 'Required',
      minControls: '',
      dpa: 'Required',
      breachHours: '',
      subproc: 'Prior written approval',
      audit: 'Right to audit',
      location: '',
      encryption: '',
      retention: '',
      insurance: '',
      privacy: '',
      onboarding: '',
      monitoring: '',
      issues: '',
      sla: '',
      access: '',
      ack: 'Required',
      review: '',
      exceptions: '',
      contact: ''
    });
    setOutput('');
  };

  const copyOutput = async () => {
    if (!output) {
      alert("Please generate the policy first.");
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      alert("Copied to clipboard.");
    } catch (e) {
      alert("Copy failed. Please copy manually.");
    }
  };

  const downloadFile = (filename, content) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const downloadText = () => {
    if (!output) {
      alert("Please generate the policy first.");
      return;
    }
    downloadFile('vendor-third-party-security-policy.txt', output);
  };

  const downloadMarkdown = () => {
    if (!output) {
      alert("Please generate the policy first.");
      return;
    }
    downloadFile('vendor-third-party-security-policy.md', output);
  };

  const printOutput = () => {
    if (!output) {
      alert("Please generate the policy first.");
      return;
    }

    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) {
      alert("Pop-up blocked. Please allow pop-ups to print/save as PDF.");
      return;
    }

    const escapeHtml = (str) => {
      return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };

    printWindow.document.write(`
      <html>
      <head>
        <title>Vendor & Third-Party Security Policy</title>
        <style>
          body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
            padding: 24px;
            color: #020617;
            background: #ffffff;
            white-space: pre-wrap;
          }
        </style>
      </head>
      <body>${escapeHtml(output)}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
         
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
            className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Business Policy Hub</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Users className="w-12 h-12 text-cyan-400" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Vendor & Third-Party Security Policy Generator
              </h1>
            </div>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Define onboarding checks, risk tiers, contractual clauses, and continuous monitoring expectations
            </p>
            <p className="text-lg text-cyan-400 font-semibold mt-2">
              A Veteran-Owned Business Committed to Your Digital Security
            </p>
          </div>

          {/* Security Badge */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-4 flex items-center justify-center space-x-3">
            <Lock className="w-6 h-6 text-cyan-400" />
            <span className="text-slate-300">Client-Side Processing - Your data never leaves your browser</span>
          </div>

          {/* Form Sections */}
          <div className="space-y-6">
            {/* Organization & Scope */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Organization & Scope</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Company Name</label>
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
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Policy Owner / TPRM Function</label>
                  <input
                    type="text"
                    name="owner"
                    value={formData.owner}
                    onChange={handleInputChange}
                    placeholder="Security, GRC, Procurement"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Applies To</label>
                  <input
                    type="text"
                    name="appliesTo"
                    value={formData.appliesTo}
                    onChange={handleInputChange}
                    placeholder="Vendors, processors, sub-processors, contractors"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Effective Date</label>
                  <input
                    type="date"
                    name="effective"
                    value={formData.effective}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                  <p className="text-xs text-slate-500 mt-2">If left blank, today's date will be used.</p>
                </div>
              </div>
            </div>

            {/* Risk Tiering & Use Case */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Risk Tiering & Use Case</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Risk Tiering Model</label>
                  <select
                    name="tiers"
                    value={formData.tiers}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  >
                    <option>Low / Medium / High</option>
                    <option>Tier 1 Critical / Tier 2 Important / Tier 3 Standard</option>
                    <option>Custom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Data Classifications Handled</label>
                  <input
                    type="text"
                    name="dataClasses"
                    value={formData.dataClasses}
                    onChange={handleInputChange}
                    placeholder="Public, Internal, Confidential, Regulated (e.g., PCI, PHI)"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Business Purpose / Use Case</label>
                  <input
                    type="text"
                    name="useCase"
                    value={formData.useCase}
                    onChange={handleInputChange}
                    placeholder="Describe the processing activity and services provided"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Security Evidence & Due Diligence */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Security Evidence & Due Diligence</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Security Questionnaire</label>
                  <input
                    type="text"
                    name="questionnaire"
                    value={formData.questionnaire}
                    onChange={handleInputChange}
                    placeholder="CAIQ, CIS Controls, custom questionnaire"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">External Assurance</label>
                  <input
                    type="text"
                    name="assurance"
                    value={formData.assurance}
                    onChange={handleInputChange}
                    placeholder="SOC 2 Type II, ISO 27001, PCI DSS AoC"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Pen Test / Vulnerability Evidence</label>
                  <input
                    type="text"
                    name="testing"
                    value={formData.testing}
                    onChange={handleInputChange}
                    placeholder="Annual pen test summary, quarterly vuln scans"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Background & Sanctions Screening</label>
                  <select
                    name="screening"
                    value={formData.screening}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  >
                    <option>Required</option>
                    <option>Recommended</option>
                    <option>Not Required</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Minimum Controls (examples)</label>
                  <input
                    type="text"
                    name="minControls"
                    value={formData.minControls}
                    onChange={handleInputChange}
                    placeholder="MFA, SSO, encryption at rest/in transit, EDR, logging, backups"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Contractual Clauses */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Contractual Clauses</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Data Processing Addendum (DPA)</label>
                  <select
                    name="dpa"
                    value={formData.dpa}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  >
                    <option>Required</option>
                    <option>Recommended</option>
                    <option>Not Required</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Breach Notification Window (hours)</label>
                  <input
                    type="number"
                    name="breachHours"
                    value={formData.breachHours}
                    onChange={handleInputChange}
                    placeholder="72"
                    min="1"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Sub-processor Approval</label>
                  <select
                    name="subproc"
                    value={formData.subproc}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  >
                    <option>Prior written approval</option>
                    <option>Notice and opt-out</option>
                    <option>Not restricted</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Audit & Assessment Rights</label>
                  <select
                    name="audit"
                    value={formData.audit}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  >
                    <option>Right to audit</option>
                    <option>Independent audit reports only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Data Location / Transfer Restrictions</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Region pinning, SCCs, UK IDTA, TIA required"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Encryption Requirements</label>
                  <input
                    type="text"
                    name="encryption"
                    value={formData.encryption}
                    onChange={handleInputChange}
                    placeholder="TLS 1.2+, AES-256 at rest, key mgmt responsibilities"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Retention, Return, and Deletion</label>
                  <input
                    type="text"
                    name="retention"
                    value={formData.retention}
                    onChange={handleInputChange}
                    placeholder="Delete or return data within 30 days of termination"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Cyber Insurance</label>
                  <input
                    type="text"
                    name="insurance"
                    value={formData.insurance}
                    onChange={handleInputChange}
                    placeholder="Minimum coverage, evidence upon request"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Privacy & DPIA Requirements</label>
                  <input
                    type="text"
                    name="privacy"
                    value={formData.privacy}
                    onChange={handleInputChange}
                    placeholder="Lawful basis, DPIA/LIA for high risk, data subject rights support"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Onboarding & Continuous Monitoring */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Onboarding & Continuous Monitoring</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Onboarding Checks</label>
                  <input
                    type="text"
                    name="onboarding"
                    value={formData.onboarding}
                    onChange={handleInputChange}
                    placeholder="Due diligence complete, DPA executed, access provisioned via SSO"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Monitoring Cadence</label>
                  <input
                    type="text"
                    name="monitoring"
                    value={formData.monitoring}
                    onChange={handleInputChange}
                    placeholder="Quarterly attestations, annual recertification, issue tracking"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Issue Management</label>
                  <input
                    type="text"
                    name="issues"
                    value={formData.issues}
                    onChange={handleInputChange}
                    placeholder="POA&M with dates, severity, and remediation tracking"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Service SLAs</label>
                  <input
                    type="text"
                    name="sla"
                    value={formData.sla}
                    onChange={handleInputChange}
                    placeholder="Uptime, RTO/RPO, support response times"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Access Management</label>
                  <input
                    type="text"
                    name="access"
                    value={formData.access}
                    onChange={handleInputChange}
                    placeholder="Least privilege, RBAC, timely deprovisioning, logs retained 1 year"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Governance */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Governance</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Acknowledgment Requirement</label>
                  <select
                    name="ack"
                    value={formData.ack}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  >
                    <option>Required</option>
                    <option>Recommended</option>
                    <option>Not Required</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Review Cycle</label>
                  <input
                    type="text"
                    name="review"
                    value={formData.review}
                    onChange={handleInputChange}
                    placeholder="Annual or upon material change"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Exception Process</label>
                  <input
                    type="text"
                    name="exceptions"
                    value={formData.exceptions}
                    onChange={handleInputChange}
                    placeholder="Risk acceptance by CISO and business owner with expiry"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Contact for Security Incidents</label>
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
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={generatePolicy}
              className="flex-1 min-w-[200px] bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <FileText className="w-5 h-5" />
              <span>Generate Vendor Security Policy</span>
            </button>
            <button
              onClick={resetForm}
              className="flex-1 min-w-[200px] bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Output Section */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">Generated Vendor & Third-Party Security Policy</h3>
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
              <strong className="text-cyan-400">Legal Disclaimer:</strong> This generator produces a template for informational purposes and does not constitute legal advice. Third-party risk, privacy, and contracting obligations vary by jurisdiction and sector. Obtain review by qualified counsel and your procurement, privacy, and security teams before adoption. Use of this tool does not create an attorney-client relationship and no warranties are provided.
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
