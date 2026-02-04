import React, { useState, useEffect } from 'react';
import { Lock, Copy, Download, Printer, RotateCcw, ArrowLeft, FileText, ClipboardList } from 'lucide-react';

export default function RequestForProposal() {
  const [formData, setFormData] = useState({
    orgName: '',
    projectTitle: '',
    rfpType: 'tech-writing',
    detailLevel: 'standard',
    scopeSummary: '',
    deliverables: '',
    budget: '',
    timeline: '',
    evaluationCriteria: '',
    mandatoryRequirements: '',
    standards: '',
    deadline: '',
    contactName: '',
    contactEmail: ''
  });

  const [output, setOutput] = useState('');
  const [typeBadge, setTypeBadge] = useState('Technical writing and documentation services');
  const [detailBadge, setDetailBadge] = useState('Standard');

  const rfpTypes = {
    'tech-writing': 'Technical writing and documentation services',
    'cybersecurity': 'Cybersecurity consulting and implementation',
    'software-dev': 'Software or application development',
    'it-infra': 'IT infrastructure and system integration',
    'generic': 'General professional services'
  };

  const detailLevels = {
    'simple': 'Simple',
    'standard': 'Standard',
    'enterprise': 'Enterprise'
  };

  useEffect(() => {
    setTypeBadge(rfpTypes[formData.rfpType]);
    setDetailBadge(detailLevels[formData.detailLevel]);
  }, [formData.rfpType, formData.detailLevel]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateRFP = () => {
    const {
      orgName,
      projectTitle,
      rfpType,
      detailLevel,
      scopeSummary,
      deliverables,
      budget,
      timeline,
      evaluationCriteria,
      mandatoryRequirements,
      standards,
      deadline,
      contactName,
      contactEmail
    } = formData;

    // Validation
    if (!orgName || !projectTitle || !scopeSummary || !contactName || !contactEmail) {
      alert("Please complete the required fields: organization name, project title, scope summary, contact name, and contact email.");
      return;
    }

    const typeLabel = rfpTypes[rfpType];
    const today = new Date();
    const issuedDate = today.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    const sections = [];

    // Header
    sections.push(
      `# Request for Proposal (RFP)\n${orgName}\n${projectTitle}\n\nIssued: ${issuedDate}\nRFP Type: ${typeLabel}\n`
    );

    // Introduction
    sections.push(
      `## 1. Introduction and overview\n\n${orgName} is inviting qualified vendors to submit proposals for **${projectTitle}**. The purpose of this Request for Proposal is to identify a partner that can provide reliable, high quality services while aligning with our technical, security, and documentation standards.\n\nThis RFP has been prepared and is being coordinated by the technical documentation and project management team on behalf of ${orgName}.`
    );

    // Background
    let backgroundBody = `## 2. Organizational and project background\n\n${orgName} is seeking support for the following initiative:\n\n${scopeSummary}\n\nVendors should assume close collaboration with the internal technical leads, product owners, and documentation stakeholders throughout the engagement.`;

    if (detailLevel !== "simple") {
      backgroundBody += `\n\nThe selected vendor will be expected to understand our current environment, existing documentation assets, and any relevant compliance or quality frameworks before proposing specific approaches or deliverables.`;
    }

    sections.push(backgroundBody);

    // Scope of work
    let scopeBody = `## 3. Scope of work\n\nThe scope of this RFP covers services required to successfully deliver the project described in the background section. At a minimum, proposals should address:\n\n- The proposed approach and methodology for the work\n- A description of project phases and key milestones\n- The roles and responsibilities of both the vendor and ${orgName}`;

    if (deliverables) {
      scopeBody += `\n\n### 3.1 Expected deliverables\n\nThe following deliverables are currently anticipated. Vendors are welcome to recommend refinements or additions.\n\n${deliverables}\n`;
    }

    if (detailLevel === "enterprise") {
      scopeBody += `\n\n### 3.2 Collaboration and review expectations\n\nThe selected vendor will be expected to:\n\n- Participate in regular check in meetings with the project team\n- Provide progress updates and review drafts at agreed milestones\n- Incorporate feedback from subject matter experts and editors\n`;
    }

    sections.push(scopeBody);

    // Technical requirements
    let techHeader = "## 4. Technical and security requirements";
    let techBody = "";

    if (rfpType === "tech-writing") {
      techBody = `\n\nProposals should describe the vendor's experience with technical documentation in complex or regulated environments. Areas of interest include:\n\n- Experience writing for engineers, administrators, and end users\n- Ability to work with existing style guides and terminology\n- Familiarity with common documentation tools, formats, and publishing workflows\n- Experience operating in security aware or compliance focused organizations`;
    } else if (rfpType === "cybersecurity") {
      techBody = `\n\nProposals should outline the vendor's cybersecurity experience and capabilities. Areas of interest include:\n\n- Experience with threat modeling, security controls, and practical implementation\n- Familiarity with endpoint, network, and cloud security\n- Experience working with security baselines and hardening guides\n- Ability to present findings and recommendations in clear, actionable language for both technical and non technical stakeholders`;
    } else if (rfpType === "software-dev") {
      techBody = `\n\nProposals should describe the vendor's software engineering capabilities and technical stack. Areas of interest include:\n\n- Experience delivering production grade applications\n- Familiarity with modern development practices, version control, and CI/CD\n- Approaches for testing, quality assurance, and documentation\n- Experience with secure coding practices and basic application security testing`;
    } else if (rfpType === "it-infra") {
      techBody = `\n\nProposals should describe the vendor's experience with IT infrastructure and systems integration. Areas of interest include:\n\n- Experience with network, server, or cloud infrastructure\n- Familiarity with monitoring, observability, and support models\n- Approaches to configuration management, change control, and runbooks\n- Ability to document architectures, configurations, and operational procedures`;
    } else {
      techBody = `\n\nProposals should clearly outline the vendor's technical capabilities and approach, including:\n\n- Relevant domain experience\n- Tools and platforms commonly used\n- Approaches to quality assurance and documentation\n- Any security or privacy considerations that apply to the work`;
    }

    if (standards) {
      techBody += `\n\n### 4.1 Standards and frameworks\n\nWhere applicable, work should align with the following standards, frameworks, or internal guidelines:\n\n${standards}\n`;
    }

    if (detailLevel === "enterprise") {
      techBody += `\n\n### 4.2 Data protection and confidentiality\n\nVendors must describe how they handle confidential information, project artifacts, and access to environments. Where relevant, proposals should briefly address:\n\n- Data protection controls for project materials\n- Handling of credentials, keys, and access tokens\n- Approach to secure development or consulting practices\n- Any standard security certifications or attestations held by the organization`;
    }

    sections.push(techHeader + techBody);

    // Timeline
    let timelineBody = "## 5. Project timeline";

    if (timeline) {
      timelineBody += `\n\nThe current target schedule is as follows:\n\n${timeline}\n\nVendors should propose a realistic schedule that aligns with these goals. Alternative phasing or milestones can be suggested if they provide a clearer or more manageable delivery plan.`;
    } else {
      timelineBody += `\n\nVendors should propose a realistic schedule for completing the work, including major phases and milestones.`;
    }

    sections.push(timelineBody);

    // Budget
    let budgetBody = "## 6. Budget and pricing";

    if (budget) {
      budgetBody += `\n\nThe anticipated budget range for this engagement is:\n\n${budget}\n\nVendors should provide a transparent breakdown of pricing, including any assumptions about scope, hours, or deliverables.`;
    } else {
      budgetBody += `\n\nVendors should provide clear and transparent pricing, including assumptions about scope, hours, and deliverables.`;
    }

    if (detailLevel === "enterprise") {
      budgetBody += `\n\nWhere applicable, please identify any optional components that can be treated as separate work packages or change requests.`;
    }

    sections.push(budgetBody);

    // Vendor qualifications
    let vendorBody = `## 7. Vendor qualifications and experience\n\nProposals should include a concise overview of the vendor's relevant experience, including:\n\n- Background in similar projects or industries\n- Representative client engagements or case studies\n- Experience collaborating with documentation, product, and security teams\n- Any relevant certifications or specialized expertise`;

    if (detailLevel === "enterprise") {
      vendorBody += `\n\nVendors are encouraged to provide links to public documentation, knowledge bases, or published work that illustrate their writing quality and approach to complex technical topics.`;
    }

    sections.push(vendorBody);

    // Evaluation criteria
    let evalBody = "## 8. Evaluation criteria";

    if (evaluationCriteria) {
      evalBody += `\n\n${evaluationCriteria}`;
    } else {
      evalBody += `\n\nProposals will be evaluated based on a combination of factors that may include experience, quality of proposed approach, clarity of communication, alignment with our requirements, and overall value.`;
    }

    if (detailLevel === "enterprise") {
      evalBody += `\n\n${orgName} reserves the right to request clarifications, conduct interviews or presentations with shortlisted vendors, and verify references prior to final selection.`;
    }

    sections.push(evalBody);

    // Submission instructions
    let instructionsBody = "## 9. Proposal submission instructions";

    if (deadline) {
      instructionsBody += `\n\nProposals should be submitted by **${deadline}**. Late submissions may not be considered.`;
    }

    instructionsBody += `\n\nProposals should be submitted electronically in PDF or another widely readable format. At a minimum, proposals should include:\n\n- An executive summary\n- A description of the proposed approach and methodology\n- A summary of deliverables and milestones\n- Relevant experience and qualifications\n- Pricing and any key assumptions\n- Primary contact details`;

    if (detailLevel === "enterprise") {
      instructionsBody += `\n\nWhere applicable, please also include:\n\n- A brief implementation or onboarding plan\n- A description of how risks and dependencies will be managed\n- Any standard contractual terms or conditions that you expect to govern the engagement.`;
    }

    sections.push(instructionsBody);

    // Contact
    let contactBody = `## 10. Contact and questions\n\nAll communications regarding this RFP should be directed to:\n\n${contactName}\n${orgName}\nEmail: ${contactEmail}\n`;

    if (detailLevel !== "simple") {
      contactBody += `\nVendors should not contact other team members directly about this RFP unless explicitly invited to do so. Questions may be consolidated and, where appropriate, anonymized and shared with all participating vendors.`;
    }

    sections.push(contactBody);

    // General terms (enterprise only)
    if (detailLevel === "enterprise") {
      sections.push(
        `## 11. General terms\n\nThis RFP does not commit ${orgName} to award a contract or proceed with any proposal. ${orgName} reserves the right to accept or reject any or all proposals, to cancel or modify this RFP process, and to negotiate the scope, pricing, and terms with one or more vendors as needed.`
      );
    }

    const finalText = sections.join("\n\n");
    setOutput(finalText);
  };

  const resetForm = () => {
    setFormData({
      orgName: '',
      projectTitle: '',
      rfpType: 'tech-writing',
      detailLevel: 'standard',
      scopeSummary: '',
      deliverables: '',
      budget: '',
      timeline: '',
      evaluationCriteria: '',
      mandatoryRequirements: '',
      standards: '',
      deadline: '',
      contactName: '',
      contactEmail: ''
    });
    setOutput('');
  };

  const copyOutput = async () => {
    if (!output) {
      alert("There is no generated RFP to copy yet.");
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      alert("RFP text copied to clipboard.");
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
      alert("There is no generated RFP to download yet.");
      return;
    }
    downloadFile('rfp_document.txt', output);
  };

  const downloadMarkdown = () => {
    if (!output) {
      alert("There is no generated RFP to download yet.");
      return;
    }
    downloadFile('rfp_document.md', output);
  };

  const printOutput = () => {
    if (!output) {
      alert("There is no generated RFP to print yet.");
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
        <title>Request for Proposal</title>
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
              <ClipboardList className="w-12 h-12 text-cyan-400" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Request for Proposal (RFP) Generator
              </h1>
            </div>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Generate a structured, professional RFP for technical writing, cybersecurity, software projects, or general IT services. Choose the type, level of detail, and key project details, then export in your preferred format.
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
            <h3 className="text-2xl font-bold text-cyan-400 mb-2">Project and RFP Settings</h3>
            <p className="text-slate-400 mb-6">
              Fill in the essentials of your project. The generator will produce a complete RFP written in the voice of
              a technical documentation manager that you can refine against your own templates.
            </p>

            <div className="space-y-6">
              {/* Basic Info */}
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
                    placeholder="Example: CyberLife Coach Consulting"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Project title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleInputChange}
                    placeholder="Example: Technical Documentation Support for SaaS Platform"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>

              {/* RFP Type and Detail Level */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    RFP type <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="rfpType"
                    value={formData.rfpType}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  >
                    <option value="tech-writing">Technical writing and documentation services</option>
                    <option value="cybersecurity">Cybersecurity consulting and implementation</option>
                    <option value="software-dev">Software or application development</option>
                    <option value="it-infra">IT infrastructure and system integration</option>
                    <option value="generic">General professional services</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-2">This choice tailors the language, examples, and emphasis in the RFP.</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Detail level <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="detailLevel"
                    value={formData.detailLevel}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  >
                    <option value="simple">Simple: lean, 1-3 page RFP</option>
                    <option value="standard">Standard: multi-section RFP</option>
                    <option value="enterprise">Enterprise: detailed, highly structured RFP</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-2">You can start simple and regenerate at a more detailed level later.</p>
                </div>
              </div>

              {/* Scope and Deliverables */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Scope summary <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="scopeSummary"
                    value={formData.scopeSummary}
                    onChange={handleInputChange}
                    placeholder="Short description of what you want the vendor to deliver."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Key deliverables
                  </label>
                  <textarea
                    name="deliverables"
                    value={formData.deliverables}
                    onChange={handleInputChange}
                    placeholder="Example: Knowledge base articles, user guides, API docs, review cycles, style guide alignment."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>
              </div>

              {/* Budget and Timeline */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Budget range
                  </label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="Example: USD 25,000 - 60,000"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Target timeline
                  </label>
                  <input
                    type="text"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    placeholder="Example: Start Q1, complete by end of Q2"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>

              {/* Evaluation and Requirements */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Evaluation criteria
                  </label>
                  <textarea
                    name="evaluationCriteria"
                    value={formData.evaluationCriteria}
                    onChange={handleInputChange}
                    placeholder="Example: Relevant experience, writing samples, security posture, pricing, references."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Mandatory requirements
                  </label>
                  <textarea
                    name="mandatoryRequirements"
                    value={formData.mandatoryRequirements}
                    onChange={handleInputChange}
                    placeholder="Example: Experience with SOC 2, NIST CSF, or ISO 27001 aligned environments."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>
              </div>

              {/* Standards and Deadline */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Technical standards or frameworks
                  </label>
                  <textarea
                    name="standards"
                    value={formData.standards}
                    onChange={handleInputChange}
                    placeholder="Example: NIST SP 800-53, NIST CSF, ISO 27001, GDPR, internal style guidelines."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Proposal submission deadline
                  </label>
                  <input
                    type="text"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    placeholder="Example: 15 March 2026, 17:00 Pacific Time"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Primary contact name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="Example: Technical Documentation Manager"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Primary contact email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={generateRFP}
                className="flex-1 min-w-[200px] bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <FileText className="w-5 h-5" />
                <span>Generate RFP</span>
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
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-cyan-400">Generated RFP Document</h3>
              <div className="flex gap-2">
                <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  Type: {typeBadge}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  Detail: {detailBadge}
                </span>
              </div>
            </div>
            
            <textarea
              value={output}
              readOnly
              placeholder="Your generated RFP will appear here. Start by filling in the project information and selecting the RFP type and detail level, then choose 'Generate RFP'. You can copy, print, or download the document as plain text or Markdown."
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
              <strong className="text-cyan-400">Legal Disclaimer:</strong> This generator produces an RFP template for informational purposes only and does not constitute legal, procurement, or contracting advice. RFP requirements and public or private procurement rules vary by jurisdiction, industry, and contract. Consult qualified counsel and your procurement stakeholders to tailor, approve, and maintain your final RFP and evaluation process. Use of this tool does not create an attorney client relationship and no warranties are provided.
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
