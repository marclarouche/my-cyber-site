import React, { useState } from 'react';
import { Lock, Copy, Download, Printer, RotateCcw, ArrowLeft, FileText, AlertCircle } from 'lucide-react';

export default function AcceptableUsePolicy() {
  const [formData, setFormData] = useState({
    orgName: '',
    appliesTo: 'All users (employees, contractors, and temporary staff)',
    systemsCovered: '',
    personalUse: 'Limited personal use is permitted if it does not interfere with work and follows this policy',
    remoteAccess: 'Remote access is allowed only through approved tools (VPN or approved remote access platform)',
    dataTypes: 'Public and internal business information',
    prohibited: [],
    includeMonitoring: true,
    reportingContact: '',
    reviewCycle: 'at least annually',
    customNotes: ''
  });

  const [output, setOutput] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' && name !== 'includeMonitoring' ? value : (type === 'checkbox' ? checked : value)
    }));
  };

  const handleCheckboxChange = (value) => {
    setFormData(prev => ({
      ...prev,
      prohibited: prev.prohibited.includes(value)
        ? prev.prohibited.filter(item => item !== value)
        : [...prev.prohibited, value]
    }));
  };

  const toBullets = (items) => {
    return items.map(i => `• ${i}`).join('\n');
  };

  const generatePolicy = () => {
    const org = formData.orgName.trim() || "Your Organization";
    const appliesTo = formData.appliesTo.trim() || "All users";
    const systemsCovered = formData.systemsCovered.trim() || "organization devices, accounts, networks, and approved cloud services";
    const personalUse = formData.personalUse.trim();
    const remoteAccess = formData.remoteAccess.trim();
    const dataTypes = formData.dataTypes.trim();
    const reportingContact = formData.reportingContact.trim() || "IT or Security Team";
    const reviewCycle = formData.reviewCycle.trim();
    const customNotes = formData.customNotes.trim();

    let prohibitedList = formData.prohibited.length > 0 ? formData.prohibited : [
      "Unauthorized access attempts, scanning, or exploitation of systems",
      "Installing or running unapproved software, including cracked or pirated software",
      "Disabling security controls such as antivirus, EDR, firewall rules, or device encryption",
      "Using organization resources for illegal activity, harassment, or hateful content",
      "Sharing credentials, using shared accounts, or bypassing MFA requirements"
    ];

    const monitoringText = formData.includeMonitoring
      ? `${org} reserves the right to monitor, log, and review activity on ${org} owned or managed systems. Users should have no expectation of privacy when using organization resources. Monitoring is performed to protect business interests, ensure policy compliance, detect unauthorized use, and support security incident response.`
      : "This organization does not routinely monitor user activity. However, authorized personnel may review logs when responding to incidents or suspected policy violations.";

    const notesSection = customNotes ? `\n\n════════════════════════════════════════════════════════════════\n\n14. Custom Notes and Exceptions\n${customNotes}` : "";

    const text = `
${org}

ACCEPTABLE USE POLICY (AUP)

Last Updated: ${new Date().toLocaleDateString()}
Version: 1.0

════════════════════════════════════════════════════════════════

1. Purpose
This Acceptable Use Policy (AUP) defines the acceptable and prohibited uses of ${org} technology resources. This policy helps protect the organization, its employees, and its data from security and legal risks.

════════════════════════════════════════════════════════════════

2. Scope
This policy applies to: ${appliesTo}

Covered systems include: ${systemsCovered}

════════════════════════════════════════════════════════════════

3. Roles and Responsibilities
${toBullets([
  "Users are responsible for understanding and following this policy",
  "IT and security staff are responsible for implementing technical controls and monitoring compliance",
  "Managers and leadership must ensure their teams are aware of this policy and report suspected violations",
  "All users must complete security awareness training as required"
])}

════════════════════════════════════════════════════════════════

4. Acceptable Use
Reasonable personal use: ${personalUse}. When using organization resources, users must:
${toBullets([
  "Protect credentials and never share them with others",
  "Lock devices when stepping away and log out when finished",
  "Apply software updates and security patches promptly",
  "Use approved tools for work related communication and collaboration",
  "Report suspected phishing, malware, or security concerns immediately"
])}

════════════════════════════════════════════════════════════════

5. Prohibited Use
The following activities are prohibited on or through ${org} resources:
${toBullets(prohibitedList)}

════════════════════════════════════════════════════════════════

6. Data Handling and Privacy
Primary data types handled in this environment: ${dataTypes}. Users must:
${toBullets([
  "Use approved storage and sharing tools for work data",
  "Limit access to those with a business need to know",
  "Avoid copying sensitive data to personal devices or accounts unless explicitly approved",
  "Follow applicable retention and disposal requirements for the data you handle"
])}

════════════════════════════════════════════════════════════════

7. Software, Downloads, and External Services
To reduce malware and supply chain risk, users must:
${toBullets([
  "Install software only from approved sources or catalogs",
  "Avoid browser extensions or plugins that are not approved for your role",
  "Do not connect unauthorized storage devices when prohibited by organizational standards",
  "Do not use unapproved third party services to process or store organizational data"
])}

════════════════════════════════════════════════════════════════

8. Email, Messaging, and Web Use
Users must:
${toBullets([
  "Treat unexpected attachments and links as suspicious and verify the sender through a separate channel",
  "Do not send confidential data through unapproved messaging platforms",
  "Do not bypass web filtering or security protections",
  `Follow branding and communication standards when representing ${org}`
])}

════════════════════════════════════════════════════════════════

9. Remote Access
${remoteAccess}. When remote access is permitted, users must use approved authentication methods and protect devices and networks used for access.

════════════════════════════════════════════════════════════════

10. Monitoring and Notice
${monitoringText}

════════════════════════════════════════════════════════════════

11. Reporting and Incident Response
Report suspected phishing, malware, device loss, unauthorized access, or policy concerns immediately to: ${reportingContact}. Prompt reporting helps reduce harm and speeds remediation.

════════════════════════════════════════════════════════════════

12. Enforcement and Exceptions
Non-compliance may result in access restriction, required remediation, or disciplinary action consistent with organizational policy and applicable law. Any exceptions must be documented and approved by authorized leadership.

════════════════════════════════════════════════════════════════

13. Review and Updates
This policy will be reviewed ${reviewCycle} and updated as needed to reflect changes in technology, threats, and regulatory requirements.${notesSection}

Approved by: ________________________
Date: _______________________________`;

    setOutput(text.trim());
  };

  const resetAll = () => {
    setFormData({
      orgName: '',
      appliesTo: 'All users (employees, contractors, and temporary staff)',
      systemsCovered: '',
      personalUse: 'Limited personal use is permitted if it does not interfere with work and follows this policy',
      remoteAccess: 'Remote access is allowed only through approved tools (VPN or approved remote access platform)',
      dataTypes: 'Public and internal business information',
      prohibited: [],
      includeMonitoring: true,
      reportingContact: '',
      reviewCycle: 'at least annually',
      customNotes: ''
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

  const downloadText = () => downloadFile("acceptable-use-policy.txt", "text/plain");
  const downloadMarkdown = () => downloadFile("acceptable-use-policy.md", "text/markdown");

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
  <title>Acceptable Use Policy</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #000; }
    h1 { font-size: 18px; margin: 0 0 16px; }
    pre { white-space: pre-wrap; word-wrap: break-word; font-family: "Courier New", monospace; font-size: 12px; line-height: 1.5; }
    @media print { body { margin: 20mm; } }
  </style>
</head>
<body>
  <h1>Acceptable Use Policy</h1>
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

  const prohibitedOptions = [
    "Unauthorized access attempts, scanning, or exploitation of systems",
    "Installing or running unapproved software, including cracked or pirated software",
    "Disabling security controls such as antivirus, EDR, firewall rules, or device encryption",
    "Using organization resources for illegal activity, harassment, or hateful content",
    "Sharing credentials, using shared accounts, or bypassing MFA requirements",
    "Uploading confidential information to unapproved cloud services or personal email",
    "Peer to peer file sharing, unauthorized streaming, or excessive bandwidth use",
    "Cryptocurrency mining or running servers without written approval"
  ];

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
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30 mb-6">
              <Lock className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-slate-300">Policy Generator</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              Acceptable Use Policy Generator
            </h1>
            
            <p className="text-xl text-slate-400 mb-2">
              Create a clear acceptable use policy for devices, accounts, and networks
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
            <div className="space-y-6">
              {/* Organization Name */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Organization Name:
                </label>
                <input
                  type="text"
                  name="orgName"
                  value={formData.orgName}
                  onChange={handleInputChange}
                  placeholder="Enter your organization name"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  autoComplete="organization"
                />
              </div>

              {/* Applies To */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Applies To:
                </label>
                <select
                  name="appliesTo"
                  value={formData.appliesTo}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                >
                  <option>All users (employees, contractors, and temporary staff)</option>
                  <option>Employees only</option>
                  <option>Contractors and vendors</option>
                  <option>Students and faculty</option>
                  <option>Guests on the organization network</option>
                </select>
                <p className="text-sm text-slate-500 mt-2">Choose the audience this policy will cover.</p>
              </div>

              {/* Systems Covered */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Systems Covered:
                </label>
                <input
                  type="text"
                  name="systemsCovered"
                  value={formData.systemsCovered}
                  onChange={handleInputChange}
                  placeholder="Company devices, BYOD, email, network, cloud apps, and accounts"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
                <p className="text-sm text-slate-500 mt-2">Tip: Be specific so expectations are clear for both organization owned and personal devices.</p>
              </div>

              {/* Reasonable Personal Use */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Reasonable Personal Use:
                </label>
                <select
                  name="personalUse"
                  value={formData.personalUse}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                >
                  <option>Limited personal use is permitted if it does not interfere with work and follows this policy</option>
                  <option>No personal use on organization systems</option>
                  <option>Personal use is permitted only with manager approval</option>
                </select>
              </div>

              {/* Remote Access */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Remote Access:
                </label>
                <select
                  name="remoteAccess"
                  value={formData.remoteAccess}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                >
                  <option>Remote access is allowed only through approved tools (VPN or approved remote access platform)</option>
                  <option>Remote access is allowed for approved roles and requires MFA</option>
                  <option>Remote access is not permitted</option>
                </select>
              </div>

              {/* Primary Data Types */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Primary Data Types Handled:
                </label>
                <select
                  name="dataTypes"
                  value={formData.dataTypes}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                >
                  <option>Public and internal business information</option>
                  <option>Confidential business information</option>
                  <option>Personal data (PII), plus confidential business information</option>
                  <option>Regulated data (for example HIPAA, PCI DSS, CJIS) and personal data</option>
                </select>
                <p className="text-sm text-slate-500 mt-2">This selection helps shape the data handling language in the policy.</p>
              </div>

              {/* Prohibited Activities */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Common Prohibited Activities (select all that apply):
                </label>
                <p className="text-sm text-slate-500 mb-3">If you do not select anything, the generator will include a safe default list.</p>
                <div className="space-y-3">
                  {prohibitedOptions.map((option, index) => (
                    <label key={index} className="flex items-start space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.prohibited.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                        className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
                      />
                      <span className="text-slate-300 group-hover:text-slate-100 transition-colors text-sm">
                        {option.split(',')[0]}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Include Monitoring */}
              <div>
                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="includeMonitoring"
                    checked={formData.includeMonitoring}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
                  />
                  <div>
                    <span className="text-slate-300 group-hover:text-slate-100 transition-colors font-semibold">
                      Include monitoring and logging notice
                    </span>
                    <p className="text-sm text-slate-500 mt-1">Many organizations include a notice that systems may be monitored for security and compliance.</p>
                  </div>
                </label>
              </div>

              {/* Reporting Contact */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Reporting Contact:
                </label>
                <input
                  type="text"
                  name="reportingContact"
                  value={formData.reportingContact}
                  onChange={handleInputChange}
                  placeholder="IT Helpdesk or Security Team contact, for example security@company.com"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
                <p className="text-sm text-slate-500 mt-2">This is where users should report suspicious activity, policy concerns, or incidents.</p>
              </div>

              {/* Review Cycle */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Review Cycle:
                </label>
                <select
                  name="reviewCycle"
                  value={formData.reviewCycle}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                >
                  <option>at least annually</option>
                  <option>every six months</option>
                  <option>after major system or policy changes</option>
                </select>
              </div>

              {/* Custom Notes */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Custom Notes or Exceptions (optional):
                </label>
                <textarea
                  name="customNotes"
                  value={formData.customNotes}
                  onChange={handleInputChange}
                  placeholder="Optional: add exceptions, role specific rules, or references to internal standards"
                  rows="4"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
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
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">Generated Acceptable Use Policy:</h3>
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
              <strong className="text-cyan-400">Legal Disclaimer:</strong> This tool is provided for informational purposes only and does not constitute legal or cybersecurity advice. The generated Acceptable Use Policy template is a starting point and may not meet all organizational, compliance, or jurisdiction-specific requirements. Consult qualified security and legal professionals before adopting or implementing the generated policy. Use of this tool does not create an attorney client relationship. No warranties are made regarding completeness, accuracy, or suitability for a particular purpose.
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
