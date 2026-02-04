import React, { useState, useEffect } from 'react';
import { Lock, Copy, Download, Printer, RotateCcw, ArrowLeft, FileText, Scale } from 'lucide-react';

export default function TermsOfService() {
  const [formData, setFormData] = useState({
    company: '',
    site: '',
    contact: '',
    effective: '',
    jurisdiction: '',
    aup: '',
    accounts: '',
    payments: '',
    ip: '',
    privacy: '',
    security: '',
    warranty: '',
    liability: '',
    termination: '',
    dispute: '',
    changes: '',
    notices: ''
  });

  const [output, setOutput] = useState('');

  useEffect(() => {
    // Set default date to today
    if (!formData.effective) {
      const d = new Date();
      const pad = (n) => String(n).padStart(2, "0");
      const dateStr = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
      setFormData(prev => ({ ...prev, effective: dateStr }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const todayISO = () => {
    const d = new Date();
    return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  };

  const generateTOS = () => {
    const company = formData.company.trim() || "Company";
    const site = formData.site.trim() || "the Service";
    const contact = formData.contact.trim() || "support@example.com";
    const effective = formData.effective ? new Date(formData.effective).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : todayISO();
    const jurisdiction = formData.jurisdiction.trim() || "the laws of your jurisdiction";

    const aup = formData.aup.trim() || "No illegal activity, malware, spam, scraping without permission, or attempts to bypass security.";
    const accounts = formData.accounts.trim() || "You must be at least 13, provide accurate information, and keep credentials secure.";
    const payments = formData.payments.trim() || "Subscriptions renew automatically unless canceled. Fees are non-refundable where permitted.";
    const ip = formData.ip.trim() || "All service content and software are owned by the Company. You retain rights to your content.";

    const privacy = formData.privacy.trim() || "https://example.com/privacy";
    const security = formData.security.trim() || "Encryption in transit, access controls, logging, and regular updates.";
    const warranty = formData.warranty.trim() || "The Service is provided 'as is' without warranties of any kind, express or implied.";
    const liability = formData.liability.trim() || "Liability is limited to the fees you paid in the 12 months before the claim.";

    const termination = formData.termination.trim() || "We may suspend or terminate for breaches. You may cancel at any time.";
    const dispute = formData.dispute.trim() || "Good-faith negotiation, then binding arbitration in the specified jurisdiction.";
    const changes = formData.changes.trim() || "We will post updates and notify users for material changes. Continued use means acceptance.";
    const notices = formData.notices.trim() || `${company}, Legal, 123 Address, City, State ZIP, Country. Email: ${contact}`;

    const tos = `TERMS OF SERVICE
Effective: ${effective}
Provider: ${company}
Service: ${site}
Contact: ${contact}

═══════════════════════════════════════════════════════════════

1. Acceptance of Terms
By accessing or using ${site}, you agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not use the Service.

═══════════════════════════════════════════════════════════════

2. Eligibility & Accounts
${accounts}

You are responsible for all activity that occurs under your account and for maintaining the confidentiality of your credentials.

═══════════════════════════════════════════════════════════════

3. Acceptable Use
You agree not to misuse the Service. Prohibited actions include: ${aup}

We may investigate and take action, including suspension or termination, for violations.

═══════════════════════════════════════════════════════════════

4. Subscriptions, Payments, and Refunds
${payments}

Taxes may apply. You authorize us to charge your payment method for recurring fees until you cancel.

═══════════════════════════════════════════════════════════════

5. Intellectual Property
${ip}

You grant ${company} a limited, non-exclusive license to host and process your content solely to operate the Service.

═══════════════════════════════════════════════════════════════

6. Privacy
Your use of ${site} is subject to our Privacy Policy: ${privacy}.
We describe collection, use, and sharing of personal data and how to exercise your privacy rights.

═══════════════════════════════════════════════════════════════

7. Security
We implement reasonable technical and organizational measures, including: ${security}
However, no system is perfectly secure and we cannot guarantee absolute security.

═══════════════════════════════════════════════════════════════

8. Third-Party Services
The Service may rely on third parties. We are not responsible for third-party content, terms, or practices. Use of third-party services is at your own risk.

═══════════════════════════════════════════════════════════════

9. Disclaimer of Warranties
${warranty}

═══════════════════════════════════════════════════════════════

10. Limitation of Liability
${liability}

To the fullest extent permitted by law, ${company} will not be liable for indirect, incidental, special, consequential, or exemplary damages.

═══════════════════════════════════════════════════════════════

11. Indemnification
You agree to indemnify and hold ${company} harmless from claims arising from your use of the Service or violation of these Terms.

═══════════════════════════════════════════════════════════════

12. Suspension and Termination
${termination}

Upon termination, your right to use the Service will cease. Sections intended to survive termination will continue in effect.

═══════════════════════════════════════════════════════════════

13. Changes to the Service and to These Terms
${changes}

If you continue using ${site} after changes take effect, you agree to the updated Terms.

═══════════════════════════════════════════════════════════════

14. Dispute Resolution; Governing Law
${dispute}

These Terms are governed by ${jurisdiction}, without regard to conflict of laws principles.

═══════════════════════════════════════════════════════════════

15. Notices
Legal notices may be sent to: ${notices}

═══════════════════════════════════════════════════════════════

16. Miscellaneous
If a provision is unenforceable, the remaining provisions remain in effect. Failure to enforce a provision is not a waiver. You may not assign these Terms without our consent. We may assign these Terms in connection with a merger, acquisition, or sale of assets.

Signed electronically by ${company}.
Last Updated: ${effective}
`;

    setOutput(tos);
  };

  const resetForm = () => {
    setFormData({
      company: '',
      site: '',
      contact: '',
      effective: '',
      jurisdiction: '',
      aup: '',
      accounts: '',
      payments: '',
      ip: '',
      privacy: '',
      security: '',
      warranty: '',
      liability: '',
      termination: '',
      dispute: '',
      changes: '',
      notices: ''
    });
    setOutput('');
    
    // Reset date to today
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const dateStr = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    setFormData(prev => ({ ...prev, effective: dateStr }));
  };

  const copyOutput = async () => {
    if (!output) {
      alert("Please generate a Terms of Service first.");
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
      alert("Please generate a Terms of Service first.");
      return;
    }
    downloadFile('terms-of-service.txt', output);
  };

  const downloadMarkdown = () => {
    if (!output) {
      alert("Please generate a Terms of Service first.");
      return;
    }
    downloadFile('terms-of-service.md', output);
  };

  const printOutput = () => {
    if (!output) {
      alert("Please generate a Terms of Service first.");
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
        <title>Terms of Service</title>
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
              <Scale className="w-12 h-12 text-cyan-400" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Terms of Service Generator
              </h1>
            </div>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Generate a clear Terms of Service for your website or app
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
          <div className="grid md:grid-cols-2 gap-6">
            {/* Company & Site */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Company & Site</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Company / Provider name
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
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Website or App name / URL
                  </label>
                  <input
                    type="text"
                    name="site"
                    value={formData.site}
                    onChange={handleInputChange}
                    placeholder="ExampleApp – https://example.com"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                  <p className="text-xs text-slate-500 mt-2">Shown as the service covered by these terms.</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Contact email for support/legal
                  </label>
                  <input
                    type="email"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder="support@example.com"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Effective date
                  </label>
                  <input
                    type="date"
                    name="effective"
                    value={formData.effective}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Governing law / jurisdiction
                  </label>
                  <input
                    type="text"
                    name="jurisdiction"
                    value={formData.jurisdiction}
                    onChange={handleInputChange}
                    placeholder="State of California, USA"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Key Clauses */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Key Clauses</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Acceptable use summary
                  </label>
                  <textarea
                    name="aup"
                    value={formData.aup}
                    onChange={handleInputChange}
                    placeholder="No illegal activity, malware, scraping without permission, spam, or attempts to bypass security."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Accounts & eligibility
                  </label>
                  <textarea
                    name="accounts"
                    value={formData.accounts}
                    onChange={handleInputChange}
                    placeholder="You must be at least 13, provide accurate information, and keep credentials secure."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Payments, renewals, refunds
                  </label>
                  <textarea
                    name="payments"
                    value={formData.payments}
                    onChange={handleInputChange}
                    placeholder="Subscriptions renew automatically unless canceled. Fees are non-refundable except where required by law."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Intellectual property
                  </label>
                  <textarea
                    name="ip"
                    value={formData.ip}
                    onChange={handleInputChange}
                    placeholder="All content, trademarks, and software are owned by the Company. Users retain rights to their own content."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Privacy & Security</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Privacy policy URL
                  </label>
                  <input
                    type="text"
                    name="privacy"
                    value={formData.privacy}
                    onChange={handleInputChange}
                    placeholder="https://example.com/privacy"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Security practices (high-level)
                  </label>
                  <textarea
                    name="security"
                    value={formData.security}
                    onChange={handleInputChange}
                    placeholder="Encryption in transit, access controls, logging, and regular updates."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Warranties & disclaimers
                  </label>
                  <textarea
                    name="warranty"
                    value={formData.warranty}
                    onChange={handleInputChange}
                    placeholder="Service provided 'as is' without warranties of any kind."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Liability cap
                  </label>
                  <input
                    type="text"
                    name="liability"
                    value={formData.liability}
                    onChange={handleInputChange}
                    placeholder="Liability limited to fees paid in the previous 12 months."
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Administration */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Administration</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Termination
                  </label>
                  <textarea
                    name="termination"
                    value={formData.termination}
                    onChange={handleInputChange}
                    placeholder="We may suspend or terminate accounts for breaches. You may cancel at any time."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Dispute resolution
                  </label>
                  <textarea
                    name="dispute"
                    value={formData.dispute}
                    onChange={handleInputChange}
                    placeholder="Good-faith negotiations, then binding arbitration in the specified jurisdiction."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Changes to terms
                  </label>
                  <textarea
                    name="changes"
                    value={formData.changes}
                    onChange={handleInputChange}
                    placeholder="We will post updates here and notify users when material changes occur. Continued use means acceptance."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Notices address
                  </label>
                  <textarea
                    name="notices"
                    value={formData.notices}
                    onChange={handleInputChange}
                    placeholder="Acme, Inc., 123 Main St, City, State ZIP, USA. Email: legal@example.com"
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={generateTOS}
              className="flex-1 min-w-[200px] bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <FileText className="w-5 h-5" />
              <span>Generate Terms of Service</span>
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
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">Generated Terms of Service</h3>
            <textarea
              value={output}
              readOnly
              placeholder="Your generated Terms of Service will appear here..."
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
              <strong className="text-cyan-400">Legal Disclaimer:</strong> This generator is provided for educational purposes only and does not constitute legal advice. Laws and requirements vary by jurisdiction and industry. The generated Terms of Service is a starting template and may not address all obligations, risks, or use cases for your business. You should consult a qualified attorney to review and tailor the final document. Using this page does not create an attorney-client relationship. No warranties are made regarding the completeness, accuracy, or suitability of the generated content.
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
