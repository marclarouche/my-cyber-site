import React, { useState, useEffect } from 'react';
import { Lock, Copy, Download, Printer, RotateCcw, ArrowLeft, FileText, DollarSign } from 'lucide-react';

export default function RequestForQuote() {
  const [formData, setFormData] = useState({
    orgName: '',
    rfqTitle: '',
    rfqRef: '',
    purchaseType: 'both',
    contactName: '',
    contactEmail: '',
    responseDeadline: '',
    questionDeadline: '',
    orgOverview: '',
    needSummary: '',
    goodsDetails: '',
    servicesDetails: '',
    schedule: '',
    acceptanceCriteria: '',
    submissionMethod: '',
    pricingTemplate: '',
    pricingValidity: '',
    paymentTerms: '',
    warranties: '',
    termsConditions: '',
    mandatoryRequirements: '',
    evaluationNotes: '',
    decisionEmphasis: 'cost-primary'
  });

  const [output, setOutput] = useState('');
  const [typeBadge, setTypeBadge] = useState('Goods and services');
  const [decisionBadge, setDecisionBadge] = useState('Cost-primary');

  const purchaseTypes = {
    'goods': 'Goods',
    'services': 'Services',
    'both': 'Goods and services'
  };

  const decisionEmphases = {
    'cost-primary': 'Cost-primary',
    'balanced': 'Balanced',
    'value-risk': 'Value and risk'
  };

  useEffect(() => {
    setTypeBadge(purchaseTypes[formData.purchaseType]);
    setDecisionBadge(decisionEmphases[formData.decisionEmphasis]);
  }, [formData.purchaseType, formData.decisionEmphasis]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateRFQ = () => {
    const {
      orgName,
      rfqTitle,
      rfqRef,
      purchaseType,
      contactName,
      contactEmail,
      responseDeadline,
      questionDeadline,
      orgOverview,
      needSummary,
      goodsDetails,
      servicesDetails,
      schedule,
      acceptanceCriteria,
      submissionMethod,
      pricingTemplate,
      pricingValidity,
      paymentTerms,
      warranties,
      termsConditions,
      mandatoryRequirements,
      evaluationNotes,
      decisionEmphasis
    } = formData;

    // Validation
    if (!orgName || !rfqTitle || !contactName || !contactEmail || !responseDeadline || !needSummary || !schedule || !submissionMethod) {
      alert("Please complete all required fields: organization name, RFQ title, contact name, contact email, response deadline, statement of need, delivery schedule, and submission method.");
      return;
    }

    const sections = [];
    const today = new Date();
    const issuedDate = today.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    // Header
    let header = `# Request for Quotation (RFQ)\n\n${orgName}\n${rfqTitle}\n\n`;
    if (rfqRef) {
      header += `**RFQ Reference:** ${rfqRef}\n`;
    }
    header += `**Issued:** ${issuedDate}\n`;
    sections.push(header);

    // Introduction
    let intro = "## 1. Introduction and purpose\n\n";
    if (orgOverview) {
      intro += `${orgOverview}\n\n`;
    }
    intro += `${orgName} is issuing this Request for Quotation (RFQ) to obtain firm pricing for `;
    
    if (purchaseType === "goods") {
      intro += "the goods described in this document.";
    } else if (purchaseType === "services") {
      intro += "the services described in this document.";
    } else {
      intro += "the goods and services described in this document.";
    }
    
    intro += " This RFQ defines clear requirements and expects suppliers to submit competitive, compliant quotations that facilitate an efficient evaluation process.\n";
    sections.push(intro);

    // Contact and deadlines
    let contact = "## 2. Contact and deadlines\n\n";
    contact += `**Primary contact:** ${contactName}\n`;
    contact += `**Email:** ${contactEmail}\n\n`;
    contact += `**Quotation submission deadline:** ${responseDeadline}\n\n`;
    
    if (questionDeadline) {
      contact += `**Vendor question deadline:** ${questionDeadline}\n\n`;
    }
    
    contact += `All questions should be directed to the primary contact. Late quotations may not be accepted.\n`;
    sections.push(contact);

    // Scope and requirements
    let scope = "## 3. Scope and requirements\n\n";
    scope += `**Statement of need**\n\n${needSummary}\n\n`;
    
    if (goodsDetails) {
      scope += `**Product specifications**\n\n${goodsDetails}\n\n`;
    }
    
    if (servicesDetails) {
      scope += `**Service scope**\n\n${servicesDetails}\n\n`;
    }
    
    scope += `**Delivery or performance schedule**\n\n${schedule}\n\n`;
    
    if (acceptanceCriteria) {
      scope += `**Inspection and acceptance criteria**\n\n${acceptanceCriteria}\n\n`;
    }
    sections.push(scope);

    // Submission and pricing
    let submission = "## 4. Submission and pricing instructions\n\n";
    submission += `**Submission method**\n\n${submissionMethod}\n\n`;
    
    if (pricingTemplate) {
      submission += `**Pricing format**\n\n${pricingTemplate}\n\n`;
    } else {
      submission += `**Pricing format**\n\nQuotations should itemize unit prices, quantities, and total costs. Taxes, shipping, and any other fees should be clearly separated. Optional items or alternatives may be included separately.\n\n`;
    }
    
    if (pricingValidity) {
      submission += `**Pricing validity:** ${pricingValidity}\n\n`;
    }
    
    if (paymentTerms) {
      submission += `**Payment terms:** ${paymentTerms}\n\n`;
    }
    
    if (warranties) {
      submission += `**Warranties and guarantees**\n\n${warranties}\n\n`;
    }
    
    if (termsConditions) {
      submission += `**Terms and conditions**\n\n${termsConditions}\n\n`;
    }
    sections.push(submission);

    // Evaluation
    let evaluation = "## 5. Evaluation criteria\n\n";
    
    if (mandatoryRequirements) {
      evaluation += `**Mandatory requirements**\n\n${mandatoryRequirements}\n\n`;
    } else {
      evaluation += `**Mandatory requirements**\n\nSuppliers must be able to meet all specifications, schedules, and conditions described in this RFQ. Failure to meet one or more critical requirements may result in disqualification.\n\n`;
    }
    
    evaluation += `**Evaluation approach**\n\n`;
    
    if (decisionEmphasis === "balanced") {
      evaluation += `Quotations will be evaluated primarily on total cost, but also on overall quality, ability to meet the required schedule, and alignment with the defined specifications and mandatory requirements.\n\n`;
    } else if (decisionEmphasis === "value-risk") {
      evaluation += `Quotations will be evaluated on total cost, quality, risk profile, and lifecycle value, including factors such as support, reliability, and long term fit with the organization environment.\n\n`;
    } else {
      evaluation += `Quotations will be evaluated primarily on total cost among suppliers who can demonstrate compliance with the specifications, schedule, and mandatory requirements.\n\n`;
    }
    
    if (evaluationNotes) {
      evaluation += `${evaluationNotes}\n\n`;
    }
    sections.push(evaluation);

    // General terms
    let terms = "## 6. General terms and reservations\n\n";
    terms += `${orgName} reserves the right to clarify any aspect of a quotation, to accept or reject any or all quotations in whole or in part, and to cancel or modify this RFQ without obligation at any time.\n\n`;
    terms += `Issuance of this RFQ does not commit ${orgName} to award a contract or to pay any costs incurred in preparing or submitting a quotation.\n`;
    sections.push(terms);

    const finalText = sections.join("\n");
    setOutput(finalText);
  };

  const resetForm = () => {
    setFormData({
      orgName: '',
      rfqTitle: '',
      rfqRef: '',
      purchaseType: 'both',
      contactName: '',
      contactEmail: '',
      responseDeadline: '',
      questionDeadline: '',
      orgOverview: '',
      needSummary: '',
      goodsDetails: '',
      servicesDetails: '',
      schedule: '',
      acceptanceCriteria: '',
      submissionMethod: '',
      pricingTemplate: '',
      pricingValidity: '',
      paymentTerms: '',
      warranties: '',
      termsConditions: '',
      mandatoryRequirements: '',
      evaluationNotes: '',
      decisionEmphasis: 'cost-primary'
    });
    setOutput('');
  };

  const copyOutput = async () => {
    if (!output) {
      alert("There is no generated RFQ to copy yet.");
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      alert("RFQ text copied to clipboard.");
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
      alert("There is no generated RFQ to download yet.");
      return;
    }
    downloadFile('rfq.txt', output);
  };

  const downloadMarkdown = () => {
    if (!output) {
      alert("There is no generated RFQ to download yet.");
      return;
    }
    downloadFile('rfq.md', output);
  };

  const printOutput = () => {
    if (!output) {
      alert("There is no generated RFQ to print yet.");
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
        <title>Request for Quotation</title>
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
              <DollarSign className="w-12 h-12 text-cyan-400" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Request for Quotation (RFQ) Generator
              </h1>
            </div>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Generate a structured RFQ when your requirements are clear and the primary decision factor is cost. Capture specifications, schedules, and commercial terms in a repeatable format.
            </p>
          </div>

          {/* Security Badge */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-4 flex items-center justify-center space-x-3">
            <Lock className="w-6 h-6 text-cyan-400" />
            <span className="text-slate-300"><strong>Client-side only.</strong> RFQ text is generated in your browser and not uploaded.</span>
          </div>

          {/* Form Section */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            <h3 className="text-2xl font-bold text-cyan-400 mb-2">RFQ Setup and Requirements</h3>
            <p className="text-slate-400 mb-6">
              Fill in the core details for your RFQ. The generator will create a clear, vendor ready document
              that focuses on what you need, when you need it, and how pricing should be presented.
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
                    RFQ title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="rfqTitle"
                    value={formData.rfqTitle}
                    onChange={handleInputChange}
                    placeholder="Example: Managed Endpoint Security Services"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    RFQ reference number
                  </label>
                  <input
                    type="text"
                    name="rfqRef"
                    value={formData.rfqRef}
                    onChange={handleInputChange}
                    placeholder="Example: RFQ-2025-07"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Purchase type <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="purchaseType"
                    value={formData.purchaseType}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  >
                    <option value="goods">Goods (products, hardware, licenses)</option>
                    <option value="services">Services (professional or managed services)</option>
                    <option value="both">Goods and services</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-2">This adjusts language in the scope and pricing sections.</p>
                </div>
              </div>

              {/* Contact Info */}
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
                    placeholder="Example: Procurement Manager"
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

              {/* Deadlines */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Response submission deadline <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="responseDeadline"
                    value={formData.responseDeadline}
                    onChange={handleInputChange}
                    placeholder="Example: 15 March 2026, 17:00 Pacific Time"
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
                    placeholder="Example: 5 March 2026, end of day"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>

              {/* Organization Overview */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Issuing organization overview
                </label>
                <textarea
                  name="orgOverview"
                  value={formData.orgOverview}
                  onChange={handleInputChange}
                  placeholder="Short description of your organization, mission, and operating context."
                  rows="3"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>

              {/* Statement of Need */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Definitive statement of need <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="needSummary"
                  value={formData.needSummary}
                  onChange={handleInputChange}
                  placeholder="Describe the business problem and what this RFQ aims to purchase."
                  rows="3"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>

              {/* Goods and Services Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Product specifications (if goods)
                  </label>
                  <textarea
                    name="goodsDetails"
                    value={formData.goodsDetails}
                    onChange={handleInputChange}
                    placeholder="Part numbers, models, quantities, technical specs, materials, standards."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Service scope (if services)
                  </label>
                  <textarea
                    name="servicesDetails"
                    value={formData.servicesDetails}
                    onChange={handleInputChange}
                    placeholder="Tasks, deliverables, hours, SLAs, skills, performance expectations."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>
              </div>

              {/* Schedule and Acceptance */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Delivery or performance schedule <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleInputChange}
                    placeholder="Required delivery dates, phase dates, go live targets, or completion dates."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Inspection and acceptance criteria
                  </label>
                  <textarea
                    name="acceptanceCriteria"
                    value={formData.acceptanceCriteria}
                    onChange={handleInputChange}
                    placeholder="Tests, quality thresholds, documentation, sign off conditions."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>
              </div>

              {/* Submission and Pricing */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Submission method and format <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="submissionMethod"
                    value={formData.submissionMethod}
                    onChange={handleInputChange}
                    placeholder="Email address or portal, subject line, file formats, required templates."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Pricing instructions
                  </label>
                  <textarea
                    name="pricingTemplate"
                    value={formData.pricingTemplate}
                    onChange={handleInputChange}
                    placeholder="How to structure unit price, total price, taxes, shipping, and optional items."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>
              </div>

              {/* Pricing Validity and Payment */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Pricing validity period
                  </label>
                  <input
                    type="text"
                    name="pricingValidity"
                    value={formData.pricingValidity}
                    onChange={handleInputChange}
                    placeholder="Example: Prices must remain firm for at least 90 days."
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Payment terms
                  </label>
                  <input
                    type="text"
                    name="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={handleInputChange}
                    placeholder="Example: Net 30 days after accepted delivery."
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>

              {/* Warranties and Terms */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Warranties and guarantees
                  </label>
                  <textarea
                    name="warranties"
                    value={formData.warranties}
                    onChange={handleInputChange}
                    placeholder="Product warranties, service guarantees, response time commitments."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Terms and conditions
                  </label>
                  <textarea
                    name="termsConditions"
                    value={formData.termsConditions}
                    onChange={handleInputChange}
                    placeholder="Reference to your standard terms, liability, insurance, confidentiality, termination."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>
              </div>

              {/* Requirements and Evaluation */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Mandatory requirements checklist
                  </label>
                  <textarea
                    name="mandatoryRequirements"
                    value={formData.mandatoryRequirements}
                    onChange={handleInputChange}
                    placeholder="Requirements vendors must confirm, such as certifications, delivery dates, or locations."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Evaluation notes
                  </label>
                  <textarea
                    name="evaluationNotes"
                    value={formData.evaluationNotes}
                    onChange={handleInputChange}
                    placeholder="Brief explanation of how cost, compliance, and any other factors will be considered."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>
              </div>

              {/* Decision Emphasis */}
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Decision emphasis
                </label>
                <select
                  name="decisionEmphasis"
                  value={formData.decisionEmphasis}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                >
                  <option value="cost-primary">Cost-primary: Lowest cost among compliant quotations</option>
                  <option value="balanced">Balanced: Cost plus quality, schedule, and requirements alignment</option>
                  <option value="value-risk">Value and risk: Total cost of ownership, lifecycle value, and risk profile</option>
                </select>
                <p className="text-xs text-slate-500 mt-2">This setting affects how the evaluation section describes your decision approach.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={generateRFQ}
                className="flex-1 min-w-[200px] bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <FileText className="w-5 h-5" />
                <span>Generate RFQ</span>
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
              <h3 className="text-2xl font-bold text-cyan-400">Generated RFQ Document</h3>
              <div className="flex gap-2">
                <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  Type: {typeBadge}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  Decision: {decisionBadge}
                </span>
              </div>
            </div>
            
            <textarea
              value={output}
              readOnly
              placeholder="Your generated RFQ will appear here. Fill in the required fields above, then click Generate RFQ."
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
              <strong className="text-cyan-400">Legal Disclaimer:</strong> This tool is provided for informational purposes only and does not constitute legal or procurement advice. The generated Request for Quotation (RFQ) template is a starting point and may not meet all organizational, compliance, or jurisdiction-specific requirements. Consult qualified procurement and legal professionals before issuing the generated RFQ. Use of this tool does not create an attorney client relationship. No warranties are made regarding completeness, accuracy, or suitability for a particular purpose.
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
