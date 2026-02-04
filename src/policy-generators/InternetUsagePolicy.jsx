import React, { useState } from 'react';
import { Globe, Copy, Download, Printer, RotateCcw, ArrowLeft, FileText, Shield } from 'lucide-react';

export default function InternetUsagePolicy() {
  const [formData, setFormData] = useState({
    org: '',
    scope: '',
    covered: '',
    businessUse: '',
    personalUse: '',
    prohibited: '',
    downloads: '',
    emailMsg: '',
    socialMedia: '',
    dataHandling: '',
    remoteWifi: '',
    byod: '',
    monitoring: '',
    reporting: '',
    securityReq: '',
    enforcement: '',
    exceptions: '',
    review: '',
    references: ''
  });

  const [output, setOutput] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateIUP = () => {
    const date = new Date().toLocaleDateString();

    const org = formData.org.trim() || "Your Organization";
    const scope = formData.scope.trim() || "Define the scope of networks, devices, systems, and users covered";
    const covered = formData.covered.trim() || "Define covered users and device types";
    const businessUse = formData.businessUse.trim() || "Describe approved business uses";
    const personalUse = formData.personalUse.trim() || "Describe personal use limits and restrictions";
    const prohibited = formData.prohibited.trim() || "List prohibited activities";
    const downloads = formData.downloads.trim() || "Define download and installation rules";
    const emailMsg = formData.emailMsg.trim() || "Define email and messaging expectations";
    const socialMedia = formData.socialMedia.trim() || "Define social media and public posting rules";
    const dataHandling = formData.dataHandling.trim() || "Define data handling requirements";
    const remoteWifi = formData.remoteWifi.trim() || "Define remote access and public Wi Fi protections";
    const byod = formData.byod.trim() || "Define BYOD and mobile device requirements";
    const monitoring = formData.monitoring.trim() || "Describe monitoring and logging practices";
    const reporting = formData.reporting.trim() || "Define reporting process for suspicious activity";
    const securityReq = formData.securityReq.trim() || "List minimum security requirements";
    const enforcement = formData.enforcement.trim() || "Define enforcement and consequences";
    const exceptions = formData.exceptions.trim() || "Describe the exceptions process";
    const review = formData.review.trim() || "Describe training and review schedule";
    const references = formData.references.trim() || "Optional: list applicable standards or frameworks";

    const txt = `${org} — Internet Usage Policy
Effective Date: ${date}

1. Purpose
This policy defines acceptable and prohibited use of internet access provided by ${org} to protect the organization, its data, and its reputation.

2. Scope
This policy applies to:
${scope}

Covered users and devices:
${covered}

3. Guiding Principles
Internet access is provided primarily for business needs. Use must be lawful, respectful, and consistent with security and privacy requirements.

4. Acceptable Use
Approved business use includes:
${businessUse}

Limited personal use, if allowed, must remain reasonable and low risk:
${personalUse}

5. Prohibited Use
The following activities are not permitted when using ${org} networks, systems, or accounts:
${prohibited}

6. Downloads, Installations, and Extensions
Rules for downloading files, installing software, and adding browser extensions:
${downloads}

7. Email, Messaging, and Collaboration Tools
Users must use approved communication services and protect sensitive information:
${emailMsg}

8. Social Media and Public Posting
Users must avoid disclosing confidential information and follow authorization rules:
${socialMedia}

9. Data Handling and Cloud Storage
Users must store and share data using approved services and follow classification and access rules:
${dataHandling}

10. Remote Access and Public Networks
Remote work and public network usage must follow required protections:
${remoteWifi}

11. Mobile Devices and BYOD
Personal devices used for work must meet security requirements and may require management controls:
${byod}

12. Monitoring and Logging Notice
Internet activity may be logged and reviewed for security, compliance, and operational purposes:
${monitoring}

13. Reporting Suspicious Activity and Incidents
Users must report suspicious activity immediately using approved channels:
${reporting}

14. Minimum Security Requirements
Users and devices must follow baseline protections:
${securityReq}

15. Enforcement
Violations may result in corrective action appropriate to the severity and impact:
${enforcement}

16. Exceptions
Exceptions must be documented, approved, time bound, and paired with compensating controls:
${exceptions}

17. Training, Review, and Updates
Training expectations and policy review cadence:
${review}

18. References
${references}

Approved by: ______________________    Date: __________`;

    setOutput(txt);
  };

  const resetAll = () => {
    setFormData({
      org: '',
      scope: '',
      covered: '',
      businessUse: '',
      personalUse: '',
      prohibited: '',
      downloads: '',
      emailMsg: '',
      socialMedia: '',
      dataHandling: '',
      remoteWifi: '',
      byod: '',
      monitoring: '',
      reporting: '',
      securityReq: '',
      enforcement: '',
      exceptions: '',
      review: '',
      references: ''
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
    downloadFile("internet-usage-policy.txt", "text/plain");
  };

  const downloadMarkdown = () => {
    downloadFile("internet-usage-policy.md", "text/markdown");
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
  <title>Internet Usage Policy</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #000; }
    h1 { font-size: 18px; margin: 0 0 16px; }
    pre { white-space: pre-wrap; word-wrap: break-word; font-family: "Courier New", monospace; font-size: 12px; line-height: 1.5; }
    @media print { body { margin: 20mm; } }
  </style>
</head>
<body>
  <h1>Internet Usage Policy</h1>
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
              <Globe className="w-12 h-12 text-cyan-400" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Internet Usage Policy Generator
              </h1>
            </div>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Create a clear, enforceable internet usage policy for your organization, generated locally on your device.
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
                    placeholder="All organization networks, devices, accounts, and users that access the internet"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                  <p className="text-sm text-slate-500 mt-2">Include systems, locations, users, and the services covered</p>
                </div>

                {/* Covered users and devices */}
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Covered users and devices:
                  </label>
                  <textarea
                    name="covered"
                    value={formData.covered}
                    onChange={handleInputChange}
                    placeholder="Employees, contractors, interns, temporary staff, and approved third parties using company managed or approved devices"
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                  <p className="text-sm text-slate-500 mt-2">Who the policy applies to, and which device types count</p>
                </div>

                {/* Approved business use */}
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Approved business use:
                  </label>
                  <textarea
                    name="businessUse"
                    value={formData.businessUse}
                    onChange={handleInputChange}
                    placeholder="Web browsing for job duties, approved SaaS platforms, vendor portals, research, collaboration tools, and customer support systems"
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>

                {/* Limited personal use */}
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Limited personal use:
                  </label>
                  <textarea
                    name="personalUse"
                    value={formData.personalUse}
                    onChange={handleInputChange}
                    placeholder="Permitted if minimal, lawful, does not interfere with work, does not introduce risk, and does not consume excessive bandwidth"
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                  <p className="text-sm text-slate-500 mt-2">Define what "reasonable" personal use means in your environment</p>
                </div>

                {/* Prohibited internet activities */}
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Prohibited internet activities:
                  </label>
                  <textarea
                    name="prohibited"
                    value={formData.prohibited}
                    onChange={handleInputChange}
                    placeholder="Unauthorized access attempts, credential sharing, pirated software, peer to peer file sharing, malware distribution, harassment, illegal content, gambling on company systems, and bypassing security controls"
                    rows="4"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                  <p className="text-sm text-slate-500 mt-2">Keep this specific and enforceable</p>
                </div>

                {/* Downloads and software installation rules */}
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Downloads and software installation rules:
                  </label>
                  <textarea
                    name="downloads"
                    value={formData.downloads}
                    onChange={handleInputChange}
                    placeholder="Downloads must be business related, from reputable sources, and scanned. Installing software or browser extensions requires IT approval and must come from approved catalogs or allowlists"
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Email and messaging use */}
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Email and messaging use:
                  </label>
                  <textarea
                    name="emailMsg"
                    value={formData.emailMsg}
                    onChange={handleInputChange}
                    placeholder="Use approved email and messaging platforms. Do not auto forward to personal accounts. Do not send sensitive data unless approved protections are used, such as encryption or secure file transfer"
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>

                {/* Social media and public posting */}
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Social media and public posting:
                  </label>
                  <textarea
                    name="socialMedia"
                    value={formData.socialMedia}
                    onChange={handleInputChange}
                    placeholder="Do not disclose confidential information. Only authorized staff may post on behalf of the organization. Report impersonation attempts or suspicious messages immediately"
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>

                {/* Data handling and cloud storage */}
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Data handling and cloud storage:
                  </label>
                  <textarea
                    name="dataHandling"
                    value={formData.dataHandling}
                    onChange={handleInputChange}
                    placeholder="Store and share data using approved services only. Do not upload organization data to unapproved personal cloud accounts. Follow classification rules and least privilege access"
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>

                {/* Remote work and public Wi-Fi guidance */}
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Remote work and public Wi-Fi guidance:
                  </label>
                  <textarea
                    name="remoteWifi"
                    value={formData.remoteWifi}
                    onChange={handleInputChange}
                    placeholder="Use VPN when required. Avoid unknown networks when possible. Do not perform sensitive work on public Wi Fi without approved protections. Lock screens and prevent shoulder surfing"
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>

                {/* Mobile and BYOD expectations */}
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Mobile and BYOD expectations:
                  </label>
                  <textarea
                    name="byod"
                    value={formData.byod}
                    onChange={handleInputChange}
                    placeholder="Personal devices used for work must meet security requirements, such as passcodes, OS updates, and encryption. Organization may require MDM enrollment for access to company accounts"
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>

                {/* Monitoring and privacy notice */}
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Monitoring and privacy notice:
                  </label>
                  <textarea
                    name="monitoring"
                    value={formData.monitoring}
                    onChange={handleInputChange}
                    placeholder="Internet activity may be logged and monitored for security, compliance, and operational needs. Users should not expect privacy when using organization networks, systems, or accounts"
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>

                {/* Reporting and escalation */}
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Reporting and escalation:
                  </label>
                  <textarea
                    name="reporting"
                    value={formData.reporting}
                    onChange={handleInputChange}
                    placeholder="Report suspicious links, malware warnings, credential prompts, or suspected incidents immediately to IT or Security. Use the approved incident reporting process and do not attempt self remediation unless directed"
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Section - Full Width */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {/* Minimum security requirements */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Minimum security requirements:
                </label>
                <textarea
                  name="securityReq"
                  value={formData.securityReq}
                  onChange={handleInputChange}
                  placeholder="Use MFA where available, use strong authentication, keep systems updated, do not disable endpoint protections, and follow password and access control policies"
                  rows="3"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>

              {/* Enforcement and consequences */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Enforcement and consequences:
                </label>
                <textarea
                  name="enforcement"
                  value={formData.enforcement}
                  onChange={handleInputChange}
                  placeholder="Violations may result in access restrictions, disciplinary action up to termination, contract termination, and legal action when applicable. Severity depends on intent, impact, and recurrence"
                  rows="3"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {/* Exceptions process */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Exceptions process:
                </label>
                <textarea
                  name="exceptions"
                  value={formData.exceptions}
                  onChange={handleInputChange}
                  placeholder="Exceptions require written approval from IT or Security leadership, include compensating controls, and have a defined expiration date"
                  rows="3"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>

              {/* Training and policy review cadence */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Training and policy review cadence:
                </label>
                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleInputChange}
                  placeholder="Users receive onboarding awareness training and periodic refreshers. This policy is reviewed at least annually and after major security or regulatory changes"
                  rows="3"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>
            </div>

            {/* Optional references */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Optional references:
              </label>
              <textarea
                name="references"
                value={formData.references}
                onChange={handleInputChange}
                placeholder="NIST Cybersecurity Framework, ISO IEC 27001, Acceptable Use Policy standards, data protection requirements relevant to your jurisdiction"
                rows="2"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
              <p className="text-sm text-slate-500 mt-2">Helpful for audits and alignment, keep it short</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={generateIUP}
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
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">Generated Internet Usage Policy:</h3>
            <textarea
              value={output}
              readOnly
              placeholder="Your generated Internet Usage Policy will appear here..."
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
              <strong className="text-cyan-400">Legal Disclaimer:</strong> This generator provides a template for informational purposes only and does not constitute legal, regulatory, or compliance advice. Requirements vary by jurisdiction, industry, contracts, and operational context. Have qualified legal and security professionals review this policy before adoption or publication.
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
