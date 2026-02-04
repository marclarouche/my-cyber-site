import React, { useState } from 'react';
import { Smartphone, Copy, Download, Printer, RotateCcw, ArrowLeft, FileText, AlertCircle } from 'lucide-react';

export default function BYODPolicy() {
  const [formData, setFormData] = useState({
    org: '',
    scope: '',
    devices: '',
    enroll: '',
    security: '',
    mdm: '',
    container: '',
    acceptable: '',
    prohibited: '',
    privacy: '',
    network: '',
    lost: '',
    report: '',
    offboard: '',
    sanctions: ''
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
    const date = new Date().toLocaleDateString();

    const org = formData.org.trim() || 'Your Organization';
    const scope = formData.scope.trim() || 'Define the scope of users and devices covered';
    const devices = formData.devices.trim() || 'Define eligible device types and minimum OS versions';
    const enroll = formData.enroll.trim() || 'Describe enrollment and onboarding steps';
    const security = formData.security.trim() || 'Describe baseline security requirements';
    const mdm = formData.mdm.trim();
    const container = formData.container.trim() || 'Describe how corporate data is separated and controlled';
    const acceptable = formData.acceptable.trim() || 'Describe acceptable use requirements';
    const prohibited = formData.prohibited.trim() || 'Describe prohibited apps and actions';
    const privacy = formData.privacy.trim() || 'Describe employee privacy expectations and what administrators can see';
    const network = formData.network.trim() || 'Describe network and access controls';
    const lost = formData.lost.trim() || 'Describe steps for lost or stolen devices';
    const report = formData.report.trim() || 'Describe incident reporting process and timeline';
    const offboard = formData.offboard.trim() || 'Describe off boarding and device changes';
    const sanctions = formData.sanctions.trim() || 'Describe consequences for non compliance';

    const mdmLine = mdm
      ? `Appendix A – Management and Tooling\n${mdm}\n\n`
      : '';

    const text = `
${org} – Bring Your Own Device (BYOD) Policy
Effective Date: ${date}

1. Purpose and Scope
${scope}

2. Eligibility and Supported Platforms
Eligible device types and minimum OS versions:
${devices}

3. Enrollment and Onboarding
${enroll}

4. Security Requirements
${security}

5. Data Separation and Company Control
${container}

6. Acceptable Use
${acceptable}

7. Prohibited Apps and Actions
${prohibited}

8. Employee Privacy
${privacy}

9. Network and Access Controls
${network}

10. Lost or Stolen Devices
${lost}

11. Incident Reporting
${report}

12. Off boarding and Device Changes
${offboard}

13. Consequences for Non Compliance
${sanctions}

14. Governance and Maintenance
This policy is reviewed at least annually or after significant changes in technology or risk. Updates are communicated to all participants.

${mdmLine}Approved by: ______________________    Date: __________
`.trim();

    setOutput(text);
  };

  const resetAll = () => {
    setFormData({
      org: '',
      scope: '',
      devices: '',
      enroll: '',
      security: '',
      mdm: '',
      container: '',
      acceptable: '',
      prohibited: '',
      privacy: '',
      network: '',
      lost: '',
      report: '',
      offboard: '',
      sanctions: ''
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

  const downloadText = () => downloadFile("byod-policy.txt", "text/plain");
  const downloadMarkdown = () => downloadFile("byod-policy.md", "text/markdown");

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
  <title>BYOD Policy</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #000; }
    h1 { font-size: 18px; margin: 0 0 16px; }
    pre { white-space: pre-wrap; word-wrap: break-word; font-family: "Courier New", monospace; font-size: 12px; line-height: 1.5; }
    @media print { body { margin: 20mm; } }
  </style>
</head>
<body>
  <h1>BYOD Policy</h1>
  <pre>${escapeHtml(output)}</pre>
  <script>
    window.onload = function() {
      window.focus();
      window.print();
      setTimeout(function(){ window.close(); }, 300);
    };
  <\/script>
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
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30 mb-6">
              <Smartphone className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-slate-300">Policy Generator</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              BYOD Policy Generator
            </h1>
            
            <p className="text-xl text-slate-400 mb-2">
              Create a Bring Your Own Device policy that balances security and employee privacy
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
                  Organization name
                </label>
                <input
                  type="text"
                  name="org"
                  value={formData.org}
                  onChange={handleInputChange}
                  placeholder="Acme Co."
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  autoComplete="organization"
                />
              </div>

              {/* Policy Scope */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Policy scope
                </label>
                <input
                  type="text"
                  name="scope"
                  value={formData.scope}
                  onChange={handleInputChange}
                  placeholder="Employees, contractors, and interns using personal phones, tablets, and laptops for work"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
              </div>

              {/* Eligible Device Types */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Eligible device types
                </label>
                <input
                  type="text"
                  name="devices"
                  value={formData.devices}
                  onChange={handleInputChange}
                  placeholder="iOS 16+, iPadOS 16+, Android 12+, Windows 11, macOS 13+"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
                <p className="text-sm text-slate-500 mt-2">Include minimum OS versions you support</p>
              </div>

              {/* Enrollment Process */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Enrollment process
                </label>
                <textarea
                  name="enroll"
                  value={formData.enroll}
                  onChange={handleInputChange}
                  placeholder="Register device with IT, accept MDM profile, enable screen lock, complete compliance check"
                  rows="3"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>

              {/* Security Requirements */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Security requirements
                </label>
                <textarea
                  name="security"
                  value={formData.security}
                  onChange={handleInputChange}
                  placeholder="Screen lock with PIN/biometrics, full-disk encryption, auto-lock ≤ 5 minutes, OS and app updates, device not rooted/jailbroken"
                  rows="3"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>

              {/* MDM or Management Tool */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  MDM or management tool (optional)
                </label>
                <input
                  type="text"
                  name="mdm"
                  value={formData.mdm}
                  onChange={handleInputChange}
                  placeholder="Microsoft Intune with app protection policies"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
                <p className="text-sm text-slate-500 mt-2">Leave blank if you use a light BYOD approach with app-based controls only</p>
              </div>

              {/* Data Separation */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Data separation
                </label>
                <textarea
                  name="container"
                  value={formData.container}
                  onChange={handleInputChange}
                  placeholder="Company data isolated in managed apps with separate passcode; selective wipe removes work data only"
                  rows="3"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>

              {/* Acceptable Use */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Acceptable use
                </label>
                <textarea
                  name="acceptable"
                  value={formData.acceptable}
                  onChange={handleInputChange}
                  placeholder="Use work apps only for business; no sharing of company data to personal cloud or messaging apps; disable Bluetooth/Airdrop for sensitive work when possible"
                  rows="3"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>

              {/* Prohibited Apps and Actions */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Prohibited apps and actions
                </label>
                <textarea
                  name="prohibited"
                  value={formData.prohibited}
                  onChange={handleInputChange}
                  placeholder="Unauthorized VPN/proxy, side-loading apps, rooted/jailbroken devices, ad blocking that intercepts TLS, public app store screen recorders for work apps"
                  rows="3"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>

              {/* Privacy Statement */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Privacy statement for employees
                </label>
                <textarea
                  name="privacy"
                  value={formData.privacy}
                  onChange={handleInputChange}
                  placeholder="We do not access personal photos, texts, contacts, or location. We can view device model/OS, compliance status, work app inventory, and corporate data within managed apps."
                  rows="3"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>

              {/* Network Access */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Network access
                </label>
                <textarea
                  name="network"
                  value={formData.network}
                  onChange={handleInputChange}
                  placeholder="Zero trust access to SaaS via SSO; VPN required for on prem resources; guest Wi-Fi for personal traffic"
                  rows="3"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>

              {/* Lost or Stolen Procedure */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Lost or stolen procedure
                </label>
                <textarea
                  name="lost"
                  value={formData.lost}
                  onChange={handleInputChange}
                  placeholder="Report within 24 hours; IT issues selective wipe; rotate credentials; file police report if appropriate"
                  rows="3"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>

              {/* Incident Reporting */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Incident reporting
                </label>
                <input
                  type="text"
                  name="report"
                  value={formData.report}
                  onChange={handleInputChange}
                  placeholder="Report suspected compromise to security@acme.com or helpdesk within 24 hours"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
              </div>

              {/* Off-boarding */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Off boarding and device change
                </label>
                <textarea
                  name="offboard"
                  value={formData.offboard}
                  onChange={handleInputChange}
                  placeholder="Selective wipe on departure; revoke access tokens; remove corporate accounts; confirm data deletion"
                  rows="3"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>

              {/* Sanctions */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Consequences for non compliance
                </label>
                <textarea
                  name="sanctions"
                  value={formData.sanctions}
                  onChange={handleInputChange}
                  placeholder="Loss of BYOD access, HR action per company policy, up to termination for willful violations"
                  rows="3"
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
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">Generated BYOD Policy:</h3>
            <textarea
              value={output}
              readOnly
              placeholder="Your generated BYOD policy will appear here..."
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
              <strong className="text-cyan-400">Legal Disclaimer:</strong> This template is for informational purposes only and is not legal advice. Requirements vary by jurisdiction, industry, labor rules, and your specific device management approach. Have qualified legal and security professionals review before adoption or publication.
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
