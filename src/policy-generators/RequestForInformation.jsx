import React, { useState } from 'react';
import { Lock, Copy, Download, Printer, RotateCcw, ArrowLeft, FileText, FileSearch, CheckCircle } from 'lucide-react';

export default function RequestForInformation() {
  const [formData, setFormData] = useState({
    rfiTitle: '',
    rfiId: '',
    orgName: '',
    orgAddress: '',
    orgSummary: '',
    coordName: '',
    coordTitle: '',
    coordEmail: '',
    coordPhone: '',
    responseDeadline: '',
    questionDeadline: '',
    purposeStatement: '',
    needStatement: '',
    projectGoals: '',
    scopeInquiry: '',
    vendorBackgroundQuestions: '',
    experienceQuestions: '',
    capabilityQuestions: '',
    implementationQuestions: '',
    submissionMethod: '',
    formatRequirements: '',
    evaluationCriteria: '',
    confidentiality: ''
  });

  const [output, setOutput] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateRFI = () => {
    const {
      rfiTitle,
      rfiId,
      orgName,
      orgAddress,
      orgSummary,
      coordName,
      coordTitle,
      coordEmail,
      coordPhone,
      responseDeadline,
      questionDeadline,
      purposeStatement,
      needStatement,
      projectGoals,
      scopeInquiry,
      vendorBackgroundQuestions,
      experienceQuestions,
      capabilityQuestions,
      implementationQuestions,
      submissionMethod,
      formatRequirements,
      evaluationCriteria,
      confidentiality
    } = formData;

    // Validation
    if (!rfiTitle.trim()) {
      alert("Please provide an RFI title.");
      return;
    }
    if (!orgName.trim()) {
      alert("Please provide the issuing organization name.");
      return;
    }
    if (!coordName.trim()) {
      alert("Please provide the RFI coordinator name.");
      return;
    }
    if (!coordEmail.trim()) {
      alert("Please provide the coordinator email.");
      return;
    }
    if (!purposeStatement.trim()) {
      alert("Please provide the purpose of this RFI.");
      return;
    }
    if (!needStatement.trim()) {
      alert("Please provide a statement of need or challenge.");
      return;
    }
    if (!scopeInquiry.trim()) {
      alert("Please provide the scope of inquiry.");
      return;
    }

    const sections = [];

    // Header
    let header = `# ${rfiTitle}\n\n`;
    if (rfiId) {
      header += `**RFI ID:** ${rfiId}\n\n`;
    }
    header += `**Issued by:** ${orgName}\n\n`;
    if (orgAddress) {
      header += `**Address:** ${orgAddress}\n\n`;
    }
    if (orgSummary) {
      header += `**About the organization**\n\n${orgSummary}\n\n`;
    }
    header += "---\n";
    sections.push(header);

    // Contact and deadlines
    let contact = "## 1. Contact information and deadlines\n\n";
    contact += `**RFI coordinator:** ${coordName}`;
    if (coordTitle) contact += `, ${coordTitle}`;
    contact += `\n\n`;
    contact += `**Email:** ${coordEmail}\n\n`;
    if (coordPhone) {
      contact += `**Phone:** ${coordPhone}\n\n`;
    }
    if (responseDeadline) {
      contact += `**Response deadline:** ${responseDeadline}\n\n`;
    }
    if (questionDeadline) {
      contact += `**Vendor question deadline:** ${questionDeadline}\n\n`;
    }
    contact += "All questions or clarifications regarding this RFI should be directed to the coordinator listed above.\n";
    sections.push(contact);

    // Purpose and context
    let context = "## 2. Purpose and project context\n\n";
    context += "**Purpose of this RFI**\n\n";
    context += purposeStatement + "\n\n";
    context += "**Statement of need or challenge**\n\n";
    context += needStatement + "\n\n";
    if (projectGoals) {
      context += "**Project context and goals**\n\n";
      context += projectGoals + "\n\n";
    }
    context += "**Scope of inquiry**\n\n";
    context += scopeInquiry + "\n";
    sections.push(context);

    // Fallback questions
    const backgroundFallback = 
      "- Brief company history, including year founded, ownership, and primary lines of business.\n" +
      "- Number of employees and geographic locations where you operate.\n" +
      "- Overview of your financial stability and ability to support multi-year engagements.\n" +
      "- Description of your typical customer profile and key industry focus areas.";
    
    const experienceFallback = 
      "- Description of experience delivering similar solutions or services.\n" +
      "- At least two client examples or case studies that are comparable in size or complexity.\n" +
      "- Contactable references, where allowed, including organization name and engagement type.\n" +
      "- Summary of any relevant industry certifications or quality frameworks (for example ISO, SOC 2).";
    
    const capabilitiesFallback = 
      "- Description of your product or service capabilities as they relate to the scope of inquiry.\n" +
      "- High level technical architecture, deployment model, and core technology stack.\n" +
      "- Integration capabilities with common platforms and systems.\n" +
      "- Security, privacy, and compliance features that are relevant.\n" +
      "- Scalability considerations, including performance and capacity limits.\n" +
      "- Any dependencies or constraints that the customer should be aware of.";
    
    const implementationFallback = 
      "- Typical implementation or onboarding approach, including key phases and timelines.\n" +
      "- Roles and responsibilities for both your team and the customer.\n" +
      "- Training and knowledge transfer options for end users and administrators.\n" +
      "- Support model, hours of coverage, and service level practices.\n" +
      "- Ongoing account management and escalation paths.";

    // Questionnaire
    let questionnaire = "## 3. Requested information (questionnaire)\n\n";
    questionnaire += "The following questions focus on vendor capabilities, experience, and fit. Pricing and detailed commercial terms may be requested separately in a future RFQ or RFP.\n\n";
    
    questionnaire += "### 3.1 Vendor and company background\n\n";
    questionnaire += (vendorBackgroundQuestions.trim() || backgroundFallback) + "\n\n";
    
    questionnaire += "### 3.2 Experience and credentials\n\n";
    questionnaire += (experienceQuestions.trim() || experienceFallback) + "\n\n";
    
    questionnaire += "### 3.3 Product or service capabilities\n\n";
    questionnaire += (capabilityQuestions.trim() || capabilitiesFallback) + "\n\n";
    
    questionnaire += "### 3.4 Implementation and support model\n\n";
    questionnaire += (implementationQuestions.trim() || implementationFallback) + "\n";
    
    sections.push(questionnaire);

    // Response instructions
    let response = "## 4. Response instructions and format\n\n";
    
    response += "**Submission method**\n\n";
    if (submissionMethod.trim()) {
      response += submissionMethod + "\n\n";
    } else {
      response += "Please submit your written response as a single document to the RFI coordinator listed above by the response deadline.\n\n";
    }
    
    response += "**Format requirements**\n\n";
    if (formatRequirements.trim()) {
      response += formatRequirements + "\n\n";
    } else {
      response += "Responses should be clear, concise, and organized following the section numbers in this RFI. A common format such as PDF or a widely readable text document is preferred.\n\n";
    }
    
    response += "**Evaluation criteria**\n\n";
    if (evaluationCriteria.trim()) {
      response += evaluationCriteria + "\n\n";
    } else {
      response += "Responses will be reviewed based on technical capabilities, relevant experience, alignment with the stated scope and goals, and overall clarity of information provided.\n\n";
    }
    
    sections.push(response);

    // Confidentiality
    let conf = "## 5. Confidentiality and non-binding notice\n\n";
    if (confidentiality.trim()) {
      conf += confidentiality + "\n\n";
    } else {
      conf += "Information provided in response to this RFI will be treated as confidential to the extent permitted by applicable policies and law. Vendors should clearly mark any proprietary or sensitive content in their responses.\n\n";
    }
    conf += `This RFI is for information gathering and planning purposes only. It is not a solicitation for bids or proposals, and it does not create any obligation on the part of ${orgName} to issue a subsequent RFQ or RFP, award a contract, or proceed with any specific solution or vendor.\n`;
    
    sections.push(conf);

    const finalText = sections.join("\n\n");
    setOutput(finalText);
  };

  const resetForm = () => {
    setFormData({
      rfiTitle: '',
      rfiId: '',
      orgName: '',
      orgAddress: '',
      orgSummary: '',
      coordName: '',
      coordTitle: '',
      coordEmail: '',
      coordPhone: '',
      responseDeadline: '',
      questionDeadline: '',
      purposeStatement: '',
      needStatement: '',
      projectGoals: '',
      scopeInquiry: '',
      vendorBackgroundQuestions: '',
      experienceQuestions: '',
      capabilityQuestions: '',
      implementationQuestions: '',
      submissionMethod: '',
      formatRequirements: '',
      evaluationCriteria: '',
      confidentiality: ''
    });
    setOutput('');
  };

  const copyOutput = async () => {
    if (!output) {
      alert("There is no generated RFI to copy yet.");
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      alert("RFI text copied to clipboard.");
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
      alert("There is no generated RFI to download yet.");
      return;
    }
    downloadFile('rfi_document.txt', output);
  };

  const downloadMarkdown = () => {
    if (!output) {
      alert("There is no generated RFI to download yet.");
      return;
    }
    downloadFile('rfi_document.md', output);
  };

  const printOutput = () => {
    if (!output) {
      alert("There is no generated RFI to print yet.");
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
        <title>Request for Information</title>
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
              <FileSearch className="w-12 h-12 text-cyan-400" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Request for Information (RFI) Generator
              </h1>
            </div>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Create a structured, non-binding RFI to explore market capabilities when you are not yet ready for a formal RFP or RFQ.
            </p>
          </div>

          {/* Security Badge */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-4 flex items-center justify-center space-x-3">
            <Lock className="w-6 h-6 text-cyan-400" />
            <span className="text-slate-300"><strong>Client-side only.</strong> RFI text is generated in your browser and not uploaded.</span>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-3 justify-center">
            {formData.orgName && (
              <div className="flex items-center space-x-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-2 rounded-lg">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Organization: {formData.orgName}</span>
              </div>
            )}
            {formData.scopeInquiry && (
              <div className="flex items-center space-x-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-2 rounded-lg">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Scope defined</span>
              </div>
            )}
          </div>

          {/* Form Section */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            <h3 className="text-2xl font-bold text-cyan-400 mb-2">RFI Setup and Questionnaire</h3>
            <p className="text-slate-400 mb-6">
              Capture administrative details, project context, and the capability-focused questions you want vendors to answer.
              You can keep the default wording or override it with your own.
            </p>

            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    RFI title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="rfiTitle"
                    value={formData.rfiTitle}
                    onChange={handleInputChange}
                    placeholder="Example: RFI for Managed Security Services"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    RFI identifier
                  </label>
                  <input
                    type="text"
                    name="rfiId"
                    value={formData.rfiId}
                    onChange={handleInputChange}
                    placeholder="Example: RFI-2026-001"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Issuing organization <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="orgName"
                    value={formData.orgName}
                    onChange={handleInputChange}
                    placeholder="Organization name"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Organization address
                  </label>
                  <input
                    type="text"
                    name="orgAddress"
                    value={formData.orgAddress}
                    onChange={handleInputChange}
                    placeholder="Address or main location"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Organization background
                </label>
                <textarea
                  name="orgSummary"
                  value={formData.orgSummary}
                  onChange={handleInputChange}
                  placeholder="Short description of your organization, who you serve, and your overall mission."
                  rows="3"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>

              {/* Coordinator Information */}
              <div className="border-t border-slate-700 pt-6">
                <h4 className="text-lg font-semibold text-cyan-400 mb-4">Contact Information</h4>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-cyan-400 mb-2">
                      RFI coordinator name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="coordName"
                      value={formData.coordName}
                      onChange={handleInputChange}
                      placeholder="Primary point of contact"
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-cyan-400 mb-2">
                      RFI coordinator title
                    </label>
                    <input
                      type="text"
                      name="coordTitle"
                      value={formData.coordTitle}
                      onChange={handleInputChange}
                      placeholder="Example: Procurement Manager"
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-semibold text-cyan-400 mb-2">
                      Coordinator email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="coordEmail"
                      value={formData.coordEmail}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-cyan-400 mb-2">
                      Coordinator phone
                    </label>
                    <input
                      type="tel"
                      name="coordPhone"
                      value={formData.coordPhone}
                      onChange={handleInputChange}
                      placeholder="+1 555 123 4567"
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-semibold text-cyan-400 mb-2">
                      Response deadline
                    </label>
                    <input
                      type="text"
                      name="responseDeadline"
                      value={formData.responseDeadline}
                      onChange={handleInputChange}
                      placeholder="Example: 30 April 2026, 17:00 Pacific Time"
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-cyan-400 mb-2">
                      Vendor question deadline
                    </label>
                    <input
                      type="text"
                      name="questionDeadline"
                      value={formData.questionDeadline}
                      onChange={handleInputChange}
                      placeholder="Example: 16 April 2026, 17:00 Pacific Time"
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                    />
                  </div>
                </div>
              </div>

              {/* Purpose and Context */}
              <div className="border-t border-slate-700 pt-6">
                <h4 className="text-lg font-semibold text-cyan-400 mb-4">Purpose and Context</h4>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-cyan-400 mb-2">
                      Purpose of this RFI <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="purposeStatement"
                      value={formData.purposeStatement}
                      onChange={handleInputChange}
                      placeholder="Why you are issuing this RFI and what you hope to learn."
                      rows="3"
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-cyan-400 mb-2">
                      Statement of need or challenge <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="needStatement"
                      value={formData.needStatement}
                      onChange={handleInputChange}
                      placeholder="High level description of the business problem or opportunity."
                      rows="3"
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-cyan-400 mb-2">
                        Project context and goals
                      </label>
                      <textarea
                        name="projectGoals"
                        value={formData.projectGoals}
                        onChange={handleInputChange}
                        placeholder="Key objectives, desired business outcomes, and any expected timeline."
                        rows="3"
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-cyan-400 mb-2">
                        Scope of inquiry <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        name="scopeInquiry"
                        value={formData.scopeInquiry}
                        onChange={handleInputChange}
                        placeholder="Example: cloud based HR platform, managed IT security services, data integration across global offices, etc."
                        rows="3"
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Questionnaire Sections */}
              <div className="border-t border-slate-700 pt-6">
                <h4 className="text-lg font-semibold text-cyan-400 mb-4">Questionnaire Sections</h4>
                <p className="text-sm text-slate-400 mb-6">If left blank, standard questions will be used for each section.</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-cyan-400 mb-2">
                      Vendor and company background
                    </label>
                    <textarea
                      name="vendorBackgroundQuestions"
                      value={formData.vendorBackgroundQuestions}
                      onChange={handleInputChange}
                      placeholder="Questions about company history, size, locations, ownership, and financial stability."
                      rows="3"
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                    />
                    <p className="text-xs text-slate-500 mt-2">If left blank, a standard vendor background set will be used.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-cyan-400 mb-2">
                      Experience and credentials
                    </label>
                    <textarea
                      name="experienceQuestions"
                      value={formData.experienceQuestions}
                      onChange={handleInputChange}
                      placeholder="Requests for case studies, similar engagements, client references, and certifications."
                      rows="3"
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                    />
                    <p className="text-xs text-slate-500 mt-2">If left blank, a standard experience and credentials section will be used.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-cyan-400 mb-2">
                      Product or service capabilities
                    </label>
                    <textarea
                      name="capabilityQuestions"
                      value={formData.capabilityQuestions}
                      onChange={handleInputChange}
                      placeholder="Questions about features, architecture, integration, security, performance, and scalability."
                      rows="3"
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                    />
                    <p className="text-xs text-slate-500 mt-2">If left blank, a default capability question block will be included.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-cyan-400 mb-2">
                      Implementation and support model
                    </label>
                    <textarea
                      name="implementationQuestions"
                      value={formData.implementationQuestions}
                      onChange={handleInputChange}
                      placeholder="Questions about implementation approach, timelines, training, support, and service levels."
                      rows="3"
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                    />
                    <p className="text-xs text-slate-500 mt-2">If left blank, a standard implementation and support section will be used.</p>
                  </div>
                </div>
              </div>

              {/* Response Instructions */}
              <div className="border-t border-slate-700 pt-6">
                <h4 className="text-lg font-semibold text-cyan-400 mb-4">Response Instructions</h4>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-cyan-400 mb-2">
                      Submission method
                    </label>
                    <textarea
                      name="submissionMethod"
                      value={formData.submissionMethod}
                      onChange={handleInputChange}
                      placeholder="Example: Email a single PDF document to the coordinator."
                      rows="2"
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-cyan-400 mb-2">
                        Format requirements
                      </label>
                      <textarea
                        name="formatRequirements"
                        value={formData.formatRequirements}
                        onChange={handleInputChange}
                        placeholder="File types, naming conventions, section order, and any page or word limits."
                        rows="3"
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-cyan-400 mb-2">
                        Evaluation criteria
                      </label>
                      <textarea
                        name="evaluationCriteria"
                        value={formData.evaluationCriteria}
                        onChange={handleInputChange}
                        placeholder="How you will review and compare responses, such as technical fit, relevant experience, and clarity."
                        rows="3"
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-cyan-400 mb-2">
                      Confidentiality statement
                    </label>
                    <textarea
                      name="confidentiality"
                      value={formData.confidentiality}
                      onChange={handleInputChange}
                      placeholder="How vendor responses will be handled, and whether the RFI is non-binding."
                      rows="2"
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={generateRFI}
                className="flex-1 min-w-[200px] bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <FileText className="w-5 h-5" />
                <span>Generate RFI</span>
              </button>
              <button
                onClick={resetForm}
                className="flex-1 min-w-[200px] bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">Generated Request for Information:</h3>
            <textarea
              value={output}
              readOnly
              placeholder="Your generated RFI will appear here. Fill in the required fields above and click Generate RFI."
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
              <strong className="text-cyan-400">Legal Disclaimer:</strong> This tool is provided for informational purposes only and does not constitute legal or procurement advice. The generated Request for Information (RFI) template is a starting point and may not meet all organizational, compliance, or jurisdiction-specific requirements. Consult qualified procurement and legal professionals before issuing the generated RFI. Use of this tool does not create an attorney client relationship. No warranties are made regarding completeness, accuracy, or suitability for a particular purpose.
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
