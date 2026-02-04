import React, { useState } from 'react';
import { Database, Copy, Download, Printer, RotateCcw, ArrowLeft, FileText, Shield } from 'lucide-react';

export default function DataRetentionPolicy() {
  const [formData, setFormData] = useState({
    controllerName: '',
    processorName: '',
    websiteUrl: '',
    contactEmail: '',
    dataTypes: '',
    purpose: '',
    securityMeasures: '',
    subprocessors: '',
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

  const generateDPA = () => {
    const controller = formData.controllerName.trim() || "Controller";
    const processor = formData.processorName.trim() || "Processor";
    const websiteUrl = formData.websiteUrl.trim() || "Website URL";
    const contactEmail = formData.contactEmail.trim() || "Contact Email";
    const dataTypes = formData.dataTypes.trim() || "Describe personal data categories";
    const purpose = formData.purpose.trim() || "Describe processing purpose";
    const securityMeasures = formData.securityMeasures.trim() || "Describe security measures";
    const subprocessors = formData.subprocessors.trim() || "List subprocessors or state none";
    const retention = formData.retention.trim() || "Describe retention and deletion timelines";
    const date = new Date().toLocaleDateString();

    const dpa = `Data Processing Agreement (DPA)
Effective Date: ${date}

Controller: ${controller}
Processor: ${processor}
Website: ${websiteUrl}
Contact: ${contactEmail}

════════════════════════════════════════════════════════════════

1. Purpose and Scope
The Processor will process personal data only on documented instructions from the Controller and only for the following purpose:
${purpose}

Categories of personal data processed:
${dataTypes}

════════════════════════════════════════════════════════════════

2. Confidentiality
Processor will ensure that persons authorized to process personal data are bound by confidentiality obligations or appropriate statutory duties.

════════════════════════════════════════════════════════════════

3. Security Measures
Processor will implement appropriate technical and organizational measures designed to protect personal data, including:
${securityMeasures}

════════════════════════════════════════════════════════════════

4. Subprocessors
Processor may use subprocessors to support service delivery. Authorized subprocessors include:
${subprocessors}

Processor will remain responsible for subprocessors as required by applicable law and will maintain appropriate contractual protections.

════════════════════════════════════════════════════════════════

5. Assistance and Cooperation
Processor will reasonably assist the Controller with data subject requests and compliance obligations, including incident response and relevant documentation, consistent with applicable law and contractual scope.

════════════════════════════════════════════════════════════════

6. Personal Data Breach Notification
Processor will notify the Controller without undue delay after becoming aware of a personal data breach affecting the services, and will provide available details to support investigation, containment, and notification decisions.

════════════════════════════════════════════════════════════════

7. Data Retention and Deletion
Data retention and deletion practices:
${retention}

Upon termination of services, Processor will delete or return personal data as instructed by the Controller unless retention is required by law.

════════════════════════════════════════════════════════════════

8. Audit and Accountability
Processor will make available information reasonably necessary to demonstrate compliance with this DPA, subject to security, confidentiality, and reasonable limitations.

════════════════════════════════════════════════════════════════

Signed electronically.
Last Updated: ${date}`;

    setOutput(dpa);
  };

  const resetAll = () => {
    setFormData({
      controllerName: '',
      processorName: '',
      websiteUrl: '',
      contactEmail: '',
      dataTypes: '',
      purpose: '',
      securityMeasures: '',
      subprocessors: '',
      retention: ''
    });
    setOutput('');
  };

  const copyOutput = async () => {
    if (!output.trim()) {
      alert("Please generate a DPA first.");
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
      alert("Please generate a DPA first.");
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
    downloadFile("data-processing-agreement.txt", "text/plain");
  };

  const downloadMarkdown = () => {
    downloadFile("data-processing-agreement.md", "text/markdown");
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
      alert("Please generate a DPA first.");
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
  <title>Data Processing Agreement</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #000; }
    h1 { font-size: 18px; margin: 0 0 16px; }
    pre { white-space: pre-wrap; word-wrap: break-word; font-family: "Courier New", monospace; font-size: 12px; line-height: 1.5; }
    @media print { body { margin: 20mm; } }
  </style>
</head>
<body>
  <h1>Data Processing Agreement</h1>
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
              <Database className="w-12 h-12 text-cyan-400" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Data Processing Agreement Generator
              </h1>
            </div>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Create a practical DPA template for GDPR and common data protection requirements
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
              {/* Controller (Client) Business Name */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Controller (Client) Business Name:
                </label>
                <input
                  type="text"
                  name="controllerName"
                  value={formData.controllerName}
                  onChange={handleInputChange}
                  placeholder="Enter the client's business name"
                  autoComplete="organization"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
              </div>

              {/* Processor (Your Business) Name */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Processor (Your Business) Name:
                </label>
                <input
                  type="text"
                  name="processorName"
                  value={formData.processorName}
                  onChange={handleInputChange}
                  placeholder="Enter your business name"
                  autoComplete="organization"
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
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  autoComplete="url"
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
                  autoComplete="email"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
              </div>

              {/* Types of Personal Data Processed */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Types of Personal Data Processed:
                </label>
                <input
                  type="text"
                  name="dataTypes"
                  value={formData.dataTypes}
                  onChange={handleInputChange}
                  placeholder="Name, Email, IP address, Usage data"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
                <p className="text-sm text-slate-500 mt-2">Separate multiple categories with commas</p>
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
                  placeholder="Provide SaaS service, support customers, deliver contracted services"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
                <p className="text-sm text-slate-500 mt-2">Describe the specific purpose for processing personal data</p>
              </div>

              {/* Security Measures */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Security Measures:
                </label>
                <input
                  type="text"
                  name="securityMeasures"
                  value={formData.securityMeasures}
                  onChange={handleInputChange}
                  placeholder="Encryption, MFA, access controls, logging, backups"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
                <p className="text-sm text-slate-500 mt-2">List the security controls used to protect data</p>
              </div>

              {/* Subprocessors */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Subprocessors:
                </label>
                <input
                  type="text"
                  name="subprocessors"
                  value={formData.subprocessors}
                  onChange={handleInputChange}
                  placeholder="Stripe, Cloudflare, hosting provider, support platform"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
                <p className="text-sm text-slate-500 mt-2">List third parties that may process data on your behalf</p>
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
                  placeholder="For duration of services, deleted 12 months after termination unless required by law"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
                <p className="text-sm text-slate-500 mt-2">Specify retention and deletion practices</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={generateDPA}
                className="flex-1 min-w-[200px] bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <FileText className="w-5 h-5" />
                <span>Generate DPA</span>
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
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">Generated Data Processing Agreement:</h3>
            <textarea
              value={output}
              readOnly
              placeholder="Your generated DPA will appear here..."
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
              <strong className="text-cyan-400">Legal Disclaimer:</strong> This tool is provided for informational purposes only and does not constitute legal advice. The generated Data Processing Agreement is a template and may not cover all legal requirements specific to your operations, jurisdiction, or regulatory obligations. A valid DPA should be reviewed and customized by qualified legal counsel. Use of this tool does not create an attorney client relationship. No warranties are made regarding legal sufficiency, enforceability, or compliance.
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
