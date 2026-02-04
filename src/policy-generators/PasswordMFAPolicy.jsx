import React, { useState } from 'react';
import { Lock, Copy, Download, Printer, RotateCcw, ArrowLeft, FileText, Key, Shield } from 'lucide-react';

export default function PasswordMFAPolicy() {
  const [formData, setFormData] = useState({
    companyName: '',
    minLength: '12',
    complexity: '',
    expiration: 'Every 90 days',
    mfaRequired: 'All users'
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
    const company = formData.companyName.trim() || "Your Organization";
    const length = formData.minLength.trim() || "12";
    const complexity = formData.complexity.trim() || "Use long passphrases, avoid reuse, and block common passwords.";
    const expiration = formData.expiration || "No expiration policy";
    const mfa = formData.mfaRequired || "All users";
    const date = new Date().toLocaleDateString();

    const text = `${company} Password & MFA Policy
Effective Date: ${date}

════════════════════════════════════════════════════════════════

1. Purpose
This policy defines password and multi-factor authentication (MFA) requirements to protect ${company} systems, data, and accounts from unauthorized access.

════════════════════════════════════════════════════════════════

2. Password Requirements
- Minimum length: ${length} characters
- Requirements: ${complexity}
- Passwords must not contain usernames or predictable patterns.
- Password reuse is prohibited. Previous five passwords may not be reused.
- Use a password manager where approved and available.

════════════════════════════════════════════════════════════════

3. Password Changes and Expiration
Passwords must be changed ${expiration}, and immediately if compromise is suspected, credentials are exposed, or account takeover is suspected.

════════════════════════════════════════════════════════════════

4. Multi-Factor Authentication (MFA)
MFA is required for: ${mfa}.
Approved MFA methods include:
- Authenticator apps (TOTP)
- Hardware security keys or tokens
- SMS or email verification (fallback only when stronger methods are not available)

════════════════════════════════════════════════════════════════

5. Account Lockout and Brute-Force Protections
Accounts should be protected with rate limiting or lockout controls. A typical baseline is locking accounts after 5 failed attempts for 15 minutes, with additional monitoring for repeated abuse.

════════════════════════════════════════════════════════════════

6. User Responsibilities
Users must keep passwords confidential, never share credentials, and report suspected compromise immediately.

════════════════════════════════════════════════════════════════

7. Enforcement
Non-compliance may result in access restriction, required remediation, or disciplinary action consistent with organizational policy.

Approved by: ________________________
Date: _______________________________`;

    setOutput(text.trim());
  };

  const resetAll = () => {
    setFormData({
      companyName: '',
      minLength: '12',
      complexity: '',
      expiration: 'Every 90 days',
      mfaRequired: 'All users'
    });
    setOutput('');
  };

  const copyOutput = async () => {
    if (!output) {
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
    if (!output) {
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
    downloadFile("password-mfa-policy.txt", "text/plain");
  };

  const downloadMarkdown = () => {
    downloadFile("password-mfa-policy.md", "text/markdown");
  };

  const escapeHtml = (str) => {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return String(str).replace(/[&<>"']/g, m => map[m]);
  };

  const printOutput = () => {
    if (!output) {
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
  <title>Password & MFA Policy</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #000; }
    h1 { font-size: 18px; margin: 0 0 16px; }
    pre { white-space: pre-wrap; word-wrap: break-word; font-family: "Courier New", monospace; font-size: 12px; line-height: 1.5; }
    @media print { body { margin: 20mm; } }
  </style>
</head>
<body>
  <h1>Password & MFA Policy</h1>
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
              <Key className="w-12 h-12 text-cyan-400" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Password & MFA Policy Generator
              </h1>
            </div>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Create a secure password and multi-factor authentication policy for your organization
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

          {/* Form Section */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            <div className="space-y-6">
              {/* Organization Name */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Organization Name:
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter your organization name"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
              </div>

              {/* Minimum Password Length */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Minimum Password Length:
                </label>
                <input
                  type="number"
                  name="minLength"
                  value={formData.minLength}
                  onChange={handleInputChange}
                  min="6"
                  max="64"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
                <p className="text-sm text-slate-500 mt-2">Common guidance encourages longer passwords or passphrases. Adjust for your environment.</p>
              </div>

              {/* Password Complexity Requirements */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Password Complexity Requirements:
                </label>
                <input
                  type="text"
                  name="complexity"
                  value={formData.complexity}
                  onChange={handleInputChange}
                  placeholder="Use a long passphrase, avoid reuse, and block common passwords"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
                <p className="text-sm text-slate-500 mt-2">Tip: Consider a password manager and a banned-password list instead of forced complexity.</p>
              </div>

              {/* Password Expiration Policy */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Password Expiration Policy:
                </label>
                <select
                  name="expiration"
                  value={formData.expiration}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                >
                  <option>Every 90 days</option>
                  <option>Every 180 days</option>
                  <option>No expiration policy</option>
                </select>
                <p className="text-sm text-slate-500 mt-2">Many orgs avoid routine expiration except for high-risk accounts or suspected compromise.</p>
              </div>

              {/* MFA Required For */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  MFA Required For:
                </label>
                <select
                  name="mfaRequired"
                  value={formData.mfaRequired}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                >
                  <option>All users</option>
                  <option>Admin accounts only</option>
                  <option>Remote access users</option>
                </select>
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
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">Generated Password & MFA Policy:</h3>
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
              <strong className="text-cyan-400">Legal Disclaimer:</strong> This tool is provided for informational purposes only and does not constitute legal or cybersecurity advice. The generated Password and MFA Policy template is a starting point and may not meet all organizational, compliance, or jurisdiction-specific requirements. Consult qualified security and legal professionals before adopting or implementing the generated policy. Use of this tool does not create an attorney client relationship. No warranties are made regarding completeness, accuracy, or suitability for a particular purpose.
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
