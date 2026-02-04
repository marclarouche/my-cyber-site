import React, { useState } from 'react';
import { Target, Copy, Download, Printer, RotateCcw, ArrowLeft, FileText, Shield } from 'lucide-react';

export default function GrantProposalGenerator() {
  const [formData, setFormData] = useState({
    orgName: '',
    funderName: '',
    projectTitle: '',
    requestedAmount: '',
    projectDuration: '',
    primaryContact: '',
    coverLetter: '',
    executiveSummary: '',
    statementOfNeed: '',
    projectDescription: '',
    budgetSummary: '',
    evaluationPlan: '',
    orgInformation: '',
    lettersSupportNotes: '',
    docDetermination: false,
    doc990: false,
    docFinancials: false,
    docAudited: false,
    docOrgChart: false,
    docBoardList: false,
    docStrategicPlan: false,
    docLettersSupport: false
  });

  const [output, setOutput] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const generateProposalText = () => {
    const orgName = formData.orgName.trim();
    const projectTitle = formData.projectTitle.trim();
    const executiveSummary = formData.executiveSummary.trim();
    const statementOfNeed = formData.statementOfNeed.trim();
    const projectDescription = formData.projectDescription.trim();
    const orgInformation = formData.orgInformation.trim();

    if (!orgName) {
      alert("Organization name is required.");
      return "";
    }
    if (!projectTitle) {
      alert("Project title is required.");
      return "";
    }
    if (!executiveSummary) {
      alert("Executive summary is required.");
      return "";
    }
    if (!statementOfNeed) {
      alert("Statement of need is required.");
      return "";
    }
    if (!projectDescription) {
      alert("Project description is required.");
      return "";
    }
    if (!orgInformation) {
      alert("Organizational information is required.");
      return "";
    }

    const funderName = formData.funderName.trim() || "";
    const requestedAmount = formData.requestedAmount.trim() || "";
    const projectDuration = formData.projectDuration.trim() || "";
    const primaryContact = formData.primaryContact.trim() || "";
    const coverLetter = formData.coverLetter.trim() || "";
    const budgetSummary = formData.budgetSummary.trim() || "A detailed line-item budget is included in the supporting documents.";
    const evaluationPlan = formData.evaluationPlan.trim() || "We will track key performance indicators and conduct regular impact assessments to measure outcomes.";
    const lettersSupportNotes = formData.lettersSupportNotes.trim();

    const sections = [];

    // Header
    let header = "Grant Proposal\n" +
      "==============\n\n" +
      "Organization: " + orgName + "\n" +
      "Project: " + projectTitle + "\n";

    if (funderName) {
      header += "Submitted to: " + funderName + "\n";
    }
    if (requestedAmount) {
      header += "Requested amount: " + requestedAmount + "\n";
    }
    if (projectDuration) {
      header += "Project duration: " + projectDuration + "\n";
    }
    if (primaryContact) {
      header += "Contact: " + primaryContact + "\n";
    }

    sections.push(header);

    // Cover letter
    if (coverLetter) {
      sections.push(
        "Cover Letter\n" +
        "============\n\n" +
        coverLetter + "\n"
      );
    }

    // Executive summary
    sections.push(
      "Executive Summary\n" +
      "=================\n\n" +
      executiveSummary + "\n"
    );

    // Statement of need
    sections.push(
      "Statement of Need\n" +
      "=================\n\n" +
      statementOfNeed + "\n"
    );

    // Project description
    sections.push(
      "Project Description\n" +
      "===================\n\n" +
      projectDescription + "\n"
    );

    // Budget summary
    sections.push(
      "Budget Summary\n" +
      "==============\n\n" +
      budgetSummary + "\n"
    );

    // Evaluation plan
    sections.push(
      "Evaluation Plan\n" +
      "===============\n\n" +
      evaluationPlan + "\n"
    );

    // Organizational information
    sections.push(
      "Organizational Information\n" +
      "==========================\n\n" +
      orgInformation + "\n"
    );

    // Letters of support and partnerships
    if (lettersSupportNotes) {
      sections.push(
        "Letters of Support and Partnerships\n" +
        "===================================\n\n" +
        lettersSupportNotes + "\n"
      );
    }

    // Supporting documents
    const attachments = [];

    if (formData.docDetermination) {
      attachments.push("IRS determination letter confirming tax exempt status.");
    }
    if (formData.doc990) {
      attachments.push("Most recent IRS Form 990.");
    }
    if (formData.docFinancials) {
      attachments.push("Current financial statements.");
    }
    if (formData.docAudited) {
      attachments.push("Most recent audited financial statements.");
    }
    if (formData.docOrgChart) {
      attachments.push("Organizational chart.");
    }
    if (formData.docBoardList) {
      attachments.push("Board of directors list with affiliations.");
    }
    if (formData.docStrategicPlan) {
      attachments.push("Current strategic plan.");
    }
    if (formData.docLettersSupport) {
      attachments.push("Letters of support from partners and community leaders.");
    }

    if (attachments.length > 0) {
      let attachText = "Supporting Documents and Attachments\n" +
        "====================================\n\n" +
        "The following supporting documents are included or available upon request:\n\n";

      attachments.forEach(att => {
        attachText += "- " + att + "\n";
      });

      sections.push(attachText);
    }

    return sections.join("\n\n");
  };

  const generateProposal = () => {
    const text = generateProposalText();
    if (text) {
      setOutput(text);
    }
  };

  const resetAll = () => {
    setFormData({
      orgName: '',
      funderName: '',
      projectTitle: '',
      requestedAmount: '',
      projectDuration: '',
      primaryContact: '',
      coverLetter: '',
      executiveSummary: '',
      statementOfNeed: '',
      projectDescription: '',
      budgetSummary: '',
      evaluationPlan: '',
      orgInformation: '',
      lettersSupportNotes: '',
      docDetermination: false,
      doc990: false,
      docFinancials: false,
      docAudited: false,
      docOrgChart: false,
      docBoardList: false,
      docStrategicPlan: false,
      docLettersSupport: false
    });
    setOutput('');
  };

  const copyOutput = async () => {
    if (!output.trim()) {
      alert("There is no generated proposal to copy yet.");
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      alert("Proposal text copied to clipboard.");
    } catch (e) {
      alert("Copy failed. Please copy manually.");
    }
  };

  const downloadFile = (filename, mimeType) => {
    if (!output.trim()) {
      alert("There is no generated proposal to download yet.");
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
    downloadFile("grant_proposal.txt", "text/plain");
  };

  const downloadMarkdown = () => {
    downloadFile("grant_proposal.md", "text/markdown");
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
      alert("There is no generated proposal to print yet.");
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
  <title>Grant Proposal - Print View</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #000; }
    h1 { font-size: 18px; margin: 0 0 16px; }
    pre { white-space: pre-wrap; word-wrap: break-word; font-family: "Courier New", monospace; font-size: 12px; line-height: 1.5; }
    @media print { body { margin: 20mm; } }
  </style>
</head>
<body>
  <pre>${escapeHtml(output)}</pre>
  <script>
    window.onload = function() {
      window.focus();
      window.print();
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
              <Target className="w-12 h-12 text-cyan-400" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Grant Proposal Generator
              </h1>
            </div>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Capture the core components of your nonprofit grant proposal and generate a structured draft that you can refine for each funder, including supporting documents and attachments.
            </p>
          </div>

          {/* Security Badge */}
          <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-xl p-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-3">
              <Shield className="w-6 h-6 text-cyan-400" />
              <span className="text-slate-300"><strong>Client-side only.</strong> Text is created in your browser and not uploaded.</span>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            <h3 className="text-2xl font-bold mb-2 text-cyan-400">Project and Organization Details</h3>
            <p className="text-slate-400 mb-6">
              Start with basic information about your organization, the funder, and the project. Required fields help keep the generated proposal complete and consistent.
            </p>

            <div className="space-y-6">
              {/* Organization name and Funder name */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Organization name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="orgName"
                    value={formData.orgName}
                    onChange={handleInputChange}
                    placeholder="Example: Hope Community Services"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Funder or program name:
                  </label>
                  <input
                    type="text"
                    name="funderName"
                    value={formData.funderName}
                    onChange={handleInputChange}
                    placeholder="Example: Smith Family Foundation"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>

              {/* Project title and Requested amount */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Project title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleInputChange}
                    placeholder="Example: Youth Digital Skills Initiative"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Requested amount:
                  </label>
                  <input
                    type="text"
                    name="requestedAmount"
                    value={formData.requestedAmount}
                    onChange={handleInputChange}
                    placeholder="Example: 75,000 USD"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>

              {/* Project duration and Primary contact */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Project duration:
                  </label>
                  <input
                    type="text"
                    name="projectDuration"
                    value={formData.projectDuration}
                    onChange={handleInputChange}
                    placeholder="Example: 12 months, July 2026 to June 2027"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Primary contact:
                  </label>
                  <input
                    type="text"
                    name="primaryContact"
                    value={formData.primaryContact}
                    onChange={handleInputChange}
                    placeholder="Name and title for the proposal contact"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>

              {/* Cover letter notes */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Cover letter notes:
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Key points or tone for the cover letter introduction."
                  rows="3"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>

              {/* Core Grant Components Section */}
              <div className="pt-6">
                <h3 className="text-2xl font-bold mb-2 text-cyan-400">Core Grant Components</h3>
                <p className="text-slate-400 mb-6">
                  Provide the required narrative sections. If optional fields are left blank, the generator will include a reasonable default paragraph you can refine.
                </p>
              </div>

              {/* Executive summary */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Executive summary <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="executiveSummary"
                  value={formData.executiveSummary}
                  onChange={handleInputChange}
                  placeholder="Short overview of the project, who it serves, and what you are requesting."
                  rows="4"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>

              {/* Statement of need */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Statement of need <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="statementOfNeed"
                  value={formData.statementOfNeed}
                  onChange={handleInputChange}
                  placeholder="Describe the problem or community need this project will address."
                  rows="4"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>

              {/* Project description */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Project description (objectives, methods, timeline, impact) <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  placeholder="How the project will work in practice, who does what, and expected outcomes."
                  rows="5"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>

              {/* Budget summary and Evaluation plan */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Budget summary:
                  </label>
                  <textarea
                    name="budgetSummary"
                    value={formData.budgetSummary}
                    onChange={handleInputChange}
                    placeholder="High level budget breakdown and any key cost categories."
                    rows="4"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Evaluation plan:
                  </label>
                  <textarea
                    name="evaluationPlan"
                    value={formData.evaluationPlan}
                    onChange={handleInputChange}
                    placeholder="How you will measure success, outputs, and outcomes."
                    rows="4"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>
              </div>

              {/* Organizational information */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Organizational information <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="orgInformation"
                  value={formData.orgInformation}
                  onChange={handleInputChange}
                  placeholder="Mission, history, key programs, population served, and geographic focus."
                  rows="4"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>

              {/* Letters of support and partnerships */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Letters of support and partnerships:
                </label>
                <textarea
                  name="lettersSupportNotes"
                  value={formData.lettersSupportNotes}
                  onChange={handleInputChange}
                  placeholder="Describe key partners, coalitions, or community leaders who support the work."
                  rows="3"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>

              {/* Supporting Documents Section */}
              <div className="pt-6">
                <h3 className="text-2xl font-bold mb-2 text-cyan-400">Supporting Documents</h3>
                <p className="text-slate-400 mb-6">
                  Tick the supporting documents you plan to include. The generator will add a structured attachments section.
                </p>
              </div>

              {/* Supporting documents checkboxes */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="docDetermination"
                    checked={formData.docDetermination}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
                  />
                  <span className="text-slate-300 group-hover:text-slate-100 transition-colors text-sm">
                    IRS determination letter
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="doc990"
                    checked={formData.doc990}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
                  />
                  <span className="text-slate-300 group-hover:text-slate-100 transition-colors text-sm">
                    IRS Form 990
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="docFinancials"
                    checked={formData.docFinancials}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
                  />
                  <span className="text-slate-300 group-hover:text-slate-100 transition-colors text-sm">
                    Financial statements
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="docAudited"
                    checked={formData.docAudited}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
                  />
                  <span className="text-slate-300 group-hover:text-slate-100 transition-colors text-sm">
                    Audited financial statements
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="docOrgChart"
                    checked={formData.docOrgChart}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
                  />
                  <span className="text-slate-300 group-hover:text-slate-100 transition-colors text-sm">
                    Organizational chart
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="docBoardList"
                    checked={formData.docBoardList}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
                  />
                  <span className="text-slate-300 group-hover:text-slate-100 transition-colors text-sm">
                    Board of directors list
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="docStrategicPlan"
                    checked={formData.docStrategicPlan}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
                  />
                  <span className="text-slate-300 group-hover:text-slate-100 transition-colors text-sm">
                    Strategic plan
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="docLettersSupport"
                    checked={formData.docLettersSupport}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
                  />
                  <span className="text-slate-300 group-hover:text-slate-100 transition-colors text-sm">
                    Letters of support
                  </span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={generateProposal}
                className="flex-1 min-w-[200px] bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <FileText className="w-5 h-5" />
                <span>Generate proposal</span>
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
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-cyan-400">Generated Grant Proposal</h3>
              <div className="flex gap-2">
                {formData.orgName && (
                  <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    Org: {formData.orgName}
                  </span>
                )}
                {formData.projectTitle && (
                  <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    Project: {formData.projectTitle}
                  </span>
                )}
              </div>
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Your generated grant proposal will appear here. Start by filling in the project and organization information, then choose 'Generate proposal'. You can copy, print, or download the document as plain text or Markdown."
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
              <strong className="text-cyan-400">Important notice:</strong> This grant proposal generator provides sample structure and wording for informational and educational purposes. It does not constitute professional grant writing, fundraising advice, or guarantee funding success. You are responsible for ensuring the resulting proposal aligns with funder requirements, accurately represents your organization's mission and capacity, and complies with all applicable regulations. Text is generated locally in your browser and is not transmitted to external servers.
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
