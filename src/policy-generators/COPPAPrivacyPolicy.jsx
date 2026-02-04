import React, { useState } from 'react';
import { Users, Copy, Download, Printer, RotateCcw, ArrowLeft, FileText, Shield } from 'lucide-react';

export default function COPPAPrivacyPolicy() {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    entity: '',
    email: '',
    address: '',
    data: '',
    purpose: '',
    consent: '',
    third: '',
    retention: ''
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
    const n = formData.name.trim() || "Your Business";
    const u = formData.url.trim() || "your website";
    const ent = formData.entity.trim() || "Business";
    const e = formData.email.trim() || "your contact email";
    const a = formData.address.trim() || "Provided upon request";
    const d = formData.data.trim() || "Describe the data collected from children";
    const p = formData.purpose.trim() || "Describe the purpose of data collection";
    const c = formData.consent.trim() || "Describe your parental consent method";
    const t = formData.third.trim() || "None";
    const r = formData.retention.trim() || "Describe your data retention period";
    const date = new Date().toLocaleDateString();

    const policy = `Children's Privacy Notice (COPPA)
Effective Date: ${date}

${n} (${ent}), operating at ${u}, complies with the Children's Online Privacy Protection Act (COPPA).

════════════════════════════════════════════════════════════════

Information We Collect:
${d}

════════════════════════════════════════════════════════════════

Purpose of Collection:
${p}

════════════════════════════════════════════════════════════════

Parental Consent Method:
${c}

════════════════════════════════════════════════════════════════

Third-Party Services:
${t}

════════════════════════════════════════════════════════════════

We do not sell children's data or allow targeted advertising.

════════════════════════════════════════════════════════════════

Parental Rights:
Parents may review, delete, or withdraw consent by contacting: ${e}

════════════════════════════════════════════════════════════════

Data Retention:
${r}

════════════════════════════════════════════════════════════════

Contact:
Website: ${u}
Email: ${e}
Address: ${a}

Last Updated: ${date}`;

    setOutput(policy);
  };

  const resetAll = () => {
    setFormData({
      name: '',
      url: '',
      entity: '',
      email: '',
      address: '',
      data: '',
      purpose: '',
      consent: '',
      third: '',
      retention: ''
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
    downloadFile("coppa-privacy-policy.txt", "text/plain");
  };

  const downloadMarkdown = () => {
    downloadFile("coppa-privacy-policy.md", "text/markdown");
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
  <title>COPPA Privacy Policy</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #000; }
    h1 { font-size: 18px; margin: 0 0 16px; }
    pre { white-space: pre-wrap; word-wrap: break-word; font-family: "Courier New", monospace; font-size: 12px; line-height: 1.5; }
    @media print { body { margin: 20mm; } }
  </style>
</head>
<body>
  <h1>COPPA Privacy Policy</h1>
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
              <Users className="w-12 h-12 text-cyan-400" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                COPPA Privacy Policy Generator
              </h1>
            </div>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Create compliant children's privacy policies under COPPA regulations
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
            <div className="space-y-6">
              {/* Business/Platform Name */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Business/Platform Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your business or platform name"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
              </div>

              {/* Website URL */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Website URL:
                </label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
              </div>

              {/* Legal Entity */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Legal Entity:
                </label>
                <input
                  type="text"
                  name="entity"
                  value={formData.entity}
                  onChange={handleInputChange}
                  placeholder="LLC, Corporation, Sole Proprietor"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
                <p className="text-sm text-slate-500 mt-2">Specify your business legal structure</p>
              </div>

              {/* Contact Email */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Contact Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="privacy@example.com"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
              </div>

              {/* Business Address */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Business Address (Optional):
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="City, State, Country"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
                <p className="text-sm text-slate-500 mt-2">Physical address or "Provided upon request"</p>
              </div>

              {/* Data Collected from Children */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Data Collected from Children:
                </label>
                <input
                  type="text"
                  name="data"
                  value={formData.data}
                  onChange={handleInputChange}
                  placeholder="Name, age, parent email, usage data"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
                <p className="text-sm text-slate-500 mt-2">List all personal information collected from children under 13</p>
              </div>

              {/* Purpose of Data Collection */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Purpose of Data Collection:
                </label>
                <input
                  type="text"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  placeholder="Educational access and communication"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
                <p className="text-sm text-slate-500 mt-2">Explain why you collect data from children</p>
              </div>

              {/* Parental Consent Method */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Parental Consent Method:
                </label>
                <input
                  type="text"
                  name="consent"
                  value={formData.consent}
                  onChange={handleInputChange}
                  placeholder="Email verification, parent dashboard approval"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
                <p className="text-sm text-slate-500 mt-2">How parents provide verifiable consent (required by COPPA)</p>
              </div>

              {/* Third-Party Services Used */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Third-Party Services Used:
                </label>
                <input
                  type="text"
                  name="third"
                  value={formData.third}
                  onChange={handleInputChange}
                  placeholder="Google Classroom, Zoom, Stripe"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
                <p className="text-sm text-slate-500 mt-2">List any third-party services that may access children's data</p>
              </div>

              {/* Data Retention Period */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Data Retention Period:
                </label>
                <input
                  type="text"
                  name="retention"
                  value={formData.retention}
                  onChange={handleInputChange}
                  placeholder="Duration of enrollment + 12 months"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
                <p className="text-sm text-slate-500 mt-2">How long children's data is retained and deletion policy</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={generatePolicy}
                className="flex-1 min-w-[200px] bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <FileText className="w-5 h-5" />
                <span>Generate COPPA Policy</span>
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
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">Generated COPPA Privacy Policy:</h3>
            <textarea
              value={output}
              readOnly
              placeholder="Your generated COPPA policy will appear here..."
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
              <strong className="text-cyan-400">Legal Disclaimer:</strong> This tool is provided for informational purposes only and does not constitute legal advice. The generated COPPA Children's Privacy Policy is a template and may not cover all legal requirements specific to your platform, services, or data collection practices. The Children's Online Privacy Protection Act (COPPA) has strict requirements for obtaining verifiable parental consent, limiting data collection, and protecting children's information. Non-compliance can result in significant penalties from the Federal Trade Commission (FTC). You should consult with a qualified attorney specializing in children's privacy law to ensure your practices, consent mechanisms, and policies fully comply with COPPA and any applicable state laws. Use of this tool does not create an attorney-client relationship. We make no warranties regarding the accuracy, completeness, or legal sufficiency of the generated content.
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
