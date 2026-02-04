import React, { useState } from 'react';
import { Globe, Copy, Download, Printer, RotateCcw, ArrowLeft, FileText, Shield } from 'lucide-react';

export default function GDPRPrivacyPolicy() {
  const [formData, setFormData] = useState({
    businessName: '',
    legalEntity: '',
    websiteUrl: '',
    contactEmail: '',
    controllerContact: '',
    dataTypes: '',
    purpose: '',
    legalBasis: '',
    subprocessors: '',
    retention: '',
    cookiesSelect: 'Yes',
    transfersSelect: 'Yes'
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
    const b = formData.businessName.trim() || "Your Business";
    const l = formData.legalEntity.trim() || "Business";
    const w = formData.websiteUrl.trim() || "your website";
    const ce = formData.contactEmail.trim() || "your contact email";
    const cc = formData.controllerContact.trim() || "Describe your data controller";
    const dt = formData.dataTypes.trim() || "Describe the types of personal data collected";
    const pur = formData.purpose.trim() || "Describe the purpose of processing";
    const lb = formData.legalBasis.trim() || "Describe your legal basis";
    const sub = formData.subprocessors.trim() || "None";
    const ret = formData.retention.trim() || "Describe your data retention period";
    const cookiesValue = formData.cookiesSelect.trim() || "Yes";
    const transfersValue = formData.transfersSelect.trim() || "Yes";
    
    const cookies = cookiesValue === "Yes"
      ? "We use cookies and similar tracking technologies."
      : "We do not use cookies or tracking technologies beyond essential website functionality.";
    
    const transfers = transfersValue === "Yes"
      ? "We may transfer personal data internationally in compliance with GDPR transfer mechanisms."
      : "We do not transfer personal data outside your region.";
    
    const date = new Date().toLocaleDateString();

    const policy = `GDPR Privacy Notice
Effective Date: ${date}

${b} (${l}), operating at ${w}, acts as the Data Controller.

════════════════════════════════════════════════════════════════

1. Data We Collect:
${dt}

════════════════════════════════════════════════════════════════

2. Purpose & Legal Basis:
Purpose: ${pur}
Legal Basis: ${lb}

════════════════════════════════════════════════════════════════

3. Sub-Processors:
${sub}

════════════════════════════════════════════════════════════════

4. Cookies:
${cookies}

════════════════════════════════════════════════════════════════

5. International Transfers:
${transfers}

════════════════════════════════════════════════════════════════

6. Data Retention:
${ret}

════════════════════════════════════════════════════════════════

7. Rights:
You may request access, correction, deletion, restriction, objection, and data portability.

════════════════════════════════════════════════════════════════

8. Contact:
Email: ${ce}
Controller Contact: ${cc}

Last Updated: ${date}`;

    setOutput(policy);
  };

  const resetAll = () => {
    setFormData({
      businessName: '',
      legalEntity: '',
      websiteUrl: '',
      contactEmail: '',
      controllerContact: '',
      dataTypes: '',
      purpose: '',
      legalBasis: '',
      subprocessors: '',
      retention: '',
      cookiesSelect: 'Yes',
      transfersSelect: 'Yes'
    });
    setOutput('');
  };

  const copyOutput = async () => {
    if (!output.trim()) {
      alert("Please generate a notice first.");
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
      alert("Please generate a notice first.");
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
    downloadFile("gdpr-privacy-notice.txt", "text/plain");
  };

  const downloadMarkdown = () => {
    downloadFile("gdpr-privacy-notice.md", "text/markdown");
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
      alert("Please generate a notice first.");
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
  <title>GDPR Privacy Notice</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #000; }
    h1 { font-size: 18px; margin: 0 0 16px; }
    pre { white-space: pre-wrap; word-wrap: break-word; font-family: "Courier New", monospace; font-size: 12px; line-height: 1.5; }
    @media print { body { margin: 20mm; } }
  </style>
</head>
<body>
  <h1>GDPR Privacy Notice</h1>
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
                GDPR Privacy Notice Generator
              </h1>
            </div>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Create compliant privacy notices for EU data protection regulations
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
              {/* Business Name */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Business Name:
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Enter your business name"
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
                  name="legalEntity"
                  value={formData.legalEntity}
                  onChange={handleInputChange}
                  placeholder="LLC, Corporation, Sole Proprietor"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
                <p className="text-sm text-slate-500 mt-2">Specify your business legal structure</p>
              </div>

              {/* Website URL */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Website URL:
                </label>
                <input
                  type="url"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
              </div>

              {/* Contact Email */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Contact Email:
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  placeholder="privacy@example.com"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
              </div>

              {/* Data Controller Contact */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Data Controller Contact:
                </label>
                <input
                  type="text"
                  name="controllerContact"
                  value={formData.controllerContact}
                  onChange={handleInputChange}
                  placeholder="Name or email of data controller"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
                <p className="text-sm text-slate-500 mt-2">Person or entity responsible for data processing decisions</p>
              </div>

              {/* Types of Personal Data Collected */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Types of Personal Data Collected:
                </label>
                <input
                  type="text"
                  name="dataTypes"
                  value={formData.dataTypes}
                  onChange={handleInputChange}
                  placeholder="Name, Email, IP, usage data"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
                <p className="text-sm text-slate-500 mt-2">List all categories of personal data you collect</p>
              </div>

              {/* Purpose of Processing */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Purpose of Processing:
                </label>
                <input
                  type="text"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  placeholder="Provide services, analytics, communication"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
                <p className="text-sm text-slate-500 mt-2">Explain why you process personal data</p>
              </div>

              {/* Legal Basis for Processing */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Legal Basis for Processing:
                </label>
                <input
                  type="text"
                  name="legalBasis"
                  value={formData.legalBasis}
                  onChange={handleInputChange}
                  placeholder="Consent, Legitimate Interest, Contract"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
                <p className="text-sm text-slate-500 mt-2">GDPR requires a lawful basis for processing (Art. 6)</p>
              </div>

              {/* Sub-Processors */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Sub-Processors:
                </label>
                <input
                  type="text"
                  name="subprocessors"
                  value={formData.subprocessors}
                  onChange={handleInputChange}
                  placeholder="Stripe, Cloudflare, Google Analytics"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
                <p className="text-sm text-slate-500 mt-2">Third parties that process data on your behalf</p>
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
                  placeholder="For duration of services; deleted after 12 months"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
                <p className="text-sm text-slate-500 mt-2">How long data is retained and deletion policy</p>
              </div>

              {/* Use Cookies */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Use Cookies?
                </label>
                <select
                  name="cookiesSelect"
                  value={formData.cookiesSelect}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              {/* International Data Transfers */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  International Data Transfers?
                </label>
                <select
                  name="transfersSelect"
                  value={formData.transfersSelect}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
                <p className="text-sm text-slate-500 mt-2">Whether data is transferred outside the EU/EEA</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={generatePolicy}
                className="flex-1 min-w-[200px] bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <FileText className="w-5 h-5" />
                <span>Generate GDPR Privacy Notice</span>
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
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">Generated GDPR Privacy Notice:</h3>
            <textarea
              value={output}
              readOnly
              placeholder="Your generated privacy notice will appear here..."
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
              <strong className="text-cyan-400">Legal Disclaimer:</strong> This tool is provided for informational purposes only and does not constitute legal advice. The generated GDPR Privacy Notice is a template and may not cover all legal requirements specific to your business operations, data processing activities, or jurisdiction. GDPR compliance involves complex legal obligations including data protection impact assessments, lawful basis determination, and proper implementation of data subject rights. You should consult with a qualified data protection attorney or Data Protection Officer (DPO) to ensure your privacy practices and notices comply with all applicable EU and member state data protection laws. Use of this tool does not create an attorney-client relationship. We make no warranties regarding the legal sufficiency or compliance of the generated content.
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
