import React, { useState } from 'react';
import { Lock, Copy, Download, Printer, RotateCcw, ArrowLeft, FileText, Code, Trash2 } from 'lucide-react';

export default function SoftwareDesignDocument() {
  const [activeStep, setActiveStep] = useState('project');
  const [components, setComponents] = useState([]);
  const [output, setOutput] = useState('');

  // Project basics
  const [project, setProject] = useState({
    projectName: '',
    docVersion: '',
    authors: '',
    docDate: '',
    docPurpose: '',
    audience: '',
    systemOverview: ''
  });

  // Context & requirements
  const [context, setContext] = useState({
    problemStatement: '',
    goals: '',
    stakeholders: '',
    functionalSummary: '',
    nonFunctionalSummary: '',
    assumptions: '',
    constraints: ''
  });

  // Architecture
  const [architecture, setArchitecture] = useState({
    archStyle: '',
    techStack: '',
    systemContext: '',
    archOverview: '',
    keyDecisions: ''
  });

  // Current component form
  const [currentComponent, setCurrentComponent] = useState({
    name: '',
    type: '',
    responsibilities: '',
    interfaces: '',
    data: '',
    notes: ''
  });

  // Data & interfaces
  const [dataModel, setDataModel] = useState({
    dataOverview: '',
    keyEntities: '',
    dataLifecycle: '',
    externalInterfaces: '',
    errorHandling: ''
  });

  // Quality & risks
  const [quality, setQuality] = useState({
    performance: '',
    reliability: '',
    security: '',
    usability: '',
    risks: '',
    testing: ''
  });

  // Deployment & ops
  const [deployment, setDeployment] = useState({
    deploymentEnv: '',
    dependencies: '',
    monitoring: '',
    rollout: '',
    migration: '',
    futureWork: ''
  });

  const stepHints = {
    project: "Start with high level project information and an overview of the system.",
    context: "Capture the problem, goals, requirements, and important constraints.",
    architecture: "Describe the overall architectural approach and technology decisions.",
    components: "Break down the system into logical components with clear responsibilities.",
    data: "Document data models, interfaces, and how information flows through the system.",
    quality: "Define quality attributes, risks, and how the system will be validated.",
    deployment: "Explain deployment, operations, monitoring, and future considerations."
  };

  const handleProjectChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleContextChange = (e) => {
    setContext({ ...context, [e.target.name]: e.target.value });
  };

  const handleArchitectureChange = (e) => {
    setArchitecture({ ...architecture, [e.target.name]: e.target.value });
  };

  const handleComponentChange = (e) => {
    setCurrentComponent({ ...currentComponent, [e.target.name]: e.target.value });
  };

  const handleDataChange = (e) => {
    setDataModel({ ...dataModel, [e.target.name]: e.target.value });
  };

  const handleQualityChange = (e) => {
    setQuality({ ...quality, [e.target.name]: e.target.value });
  };

  const handleDeploymentChange = (e) => {
    setDeployment({ ...deployment, [e.target.name]: e.target.value });
  };

  const addComponent = () => {
    if (!currentComponent.name && !currentComponent.type && !currentComponent.responsibilities) {
      alert("Please enter at least a name, type, or responsibilities before adding a component.");
      return;
    }

    setComponents([...components, { ...currentComponent }]);
    setCurrentComponent({
      name: '',
      type: '',
      responsibilities: '',
      interfaces: '',
      data: '',
      notes: ''
    });
  };

  const removeComponent = (index) => {
    setComponents(components.filter((_, i) => i !== index));
  };

  const buildDocumentText = () => {
    const nl = "\n";
    const h1 = (s) => s + nl + "=".repeat(s.length) + nl + nl;
    const h2 = (s) => nl + s + nl + "-".repeat(s.length) + nl + nl;
    const h3 = (s) => nl + s + nl + nl;

    let text = "";

    const title = project.projectName ? project.projectName + " – Software Design Document" : "Software Design Document";
    text += h1(title);

    if (project.docVersion) text += "Version: " + project.docVersion + nl;
    if (project.authors) text += "Authors: " + project.authors + nl;
    if (project.docDate) text += "Date: " + project.docDate + nl;
    text += nl;

    text += h2("1. Introduction");
    if (project.docPurpose) {
      text += h3("1.1 Purpose");
      text += project.docPurpose + nl + nl;
    }
    if (project.audience) {
      text += h3("1.2 Intended audience");
      text += project.audience + nl + nl;
    }
    if (project.systemOverview) {
      text += h3("1.3 System overview");
      text += project.systemOverview + nl + nl;
    }

    text += h2("2. Context and requirements");
    if (context.problemStatement) {
      text += h3("2.1 Problem statement");
      text += context.problemStatement + nl + nl;
    }
    if (context.goals) {
      text += h3("2.2 Goals and objectives");
      text += context.goals + nl + nl;
    }
    if (context.stakeholders) {
      text += h3("2.3 Stakeholders");
      text += context.stakeholders + nl + nl;
    }
    if (context.functionalSummary) {
      text += h3("2.4 Functional requirements summary");
      text += context.functionalSummary + nl + nl;
    }
    if (context.nonFunctionalSummary) {
      text += h3("2.5 Non functional requirements summary");
      text += context.nonFunctionalSummary + nl + nl;
    }
    if (context.assumptions) {
      text += h3("2.6 Assumptions");
      text += context.assumptions + nl + nl;
    }
    if (context.constraints) {
      text += h3("2.7 Constraints");
      text += context.constraints + nl + nl;
    }

    text += h2("3. Architecture overview");
    if (architecture.archStyle) {
      text += h3("3.1 Architectural style");
      text += architecture.archStyle + nl + nl;
    }
    if (architecture.techStack) {
      text += h3("3.2 Technology stack");
      text += architecture.techStack + nl + nl;
    }
    if (architecture.systemContext) {
      text += h3("3.3 System context");
      text += architecture.systemContext + nl + nl;
    }
    if (architecture.archOverview) {
      text += h3("3.4 High level architecture");
      text += architecture.archOverview + nl + nl;
    }
    if (architecture.keyDecisions) {
      text += h3("3.5 Key design decisions");
      text += architecture.keyDecisions + nl + nl;
    }

    text += h2("4. Component design");
    if (!components.length) {
      text += "Component level details have not been captured in this generator. If components exist, document their responsibilities, interfaces, and dependencies here." + nl + nl;
    } else {
      components.forEach((c, idx) => {
        const label = "4." + (idx + 1) + " " + (c.name || "Component");
        text += h3(label);
        if (c.type) text += "Type or layer: " + c.type + nl + nl;
        if (c.responsibilities) {
          text += "Responsibilities:" + nl + c.responsibilities + nl + nl;
        }
        if (c.interfaces) {
          text += "Public interfaces:" + nl + c.interfaces + nl + nl;
        }
        if (c.data) {
          text += "Data handled:" + nl + c.data + nl + nl;
        }
        if (c.notes) {
          text += "Design notes:" + nl + c.notes + nl + nl;
        }
      });
    }

    text += h2("5. Data model and interfaces");
    if (dataModel.dataOverview) {
      text += h3("5.1 Data model overview");
      text += dataModel.dataOverview + nl + nl;
    }
    if (dataModel.keyEntities) {
      text += h3("5.2 Key entities");
      text += dataModel.keyEntities + nl + nl;
    }
    if (dataModel.dataLifecycle) {
      text += h3("5.3 Data lifecycle");
      text += dataModel.dataLifecycle + nl + nl;
    }
    if (dataModel.externalInterfaces) {
      text += h3("5.4 External interfaces and APIs");
      text += dataModel.externalInterfaces + nl + nl;
    }
    if (dataModel.errorHandling) {
      text += h3("5.5 Error handling and observability");
      text += dataModel.errorHandling + nl + nl;
    }

    text += h2("6. Quality attributes, risks, and testing");
    if (quality.performance) {
      text += h3("6.1 Performance and scalability");
      text += quality.performance + nl + nl;
    }
    if (quality.reliability) {
      text += h3("6.2 Reliability and availability");
      text += quality.reliability + nl + nl;
    }
    if (quality.security) {
      text += h3("6.3 Security considerations");
      text += quality.security + nl + nl;
    }
    if (quality.usability) {
      text += h3("6.4 Usability and accessibility");
      text += quality.usability + nl + nl;
    }
    if (quality.risks) {
      text += h3("6.5 Risks and tradeoffs");
      text += quality.risks + nl + nl;
    }
    if (quality.testing) {
      text += h3("6.6 Testing and validation strategy");
      text += quality.testing + nl + nl;
    }

    text += h2("7. Deployment and operations");
    if (deployment.deploymentEnv) {
      text += h3("7.1 Deployment environment");
      text += deployment.deploymentEnv + nl + nl;
    }
    if (deployment.dependencies) {
      text += h3("7.2 Dependencies and external services");
      text += deployment.dependencies + nl + nl;
    }
    if (deployment.monitoring) {
      text += h3("7.3 Monitoring and alerting");
      text += deployment.monitoring + nl + nl;
    }
    if (deployment.rollout) {
      text += h3("7.4 Release and rollout strategy");
      text += deployment.rollout + nl + nl;
    }
    if (deployment.migration) {
      text += h3("7.5 Migration and backward compatibility");
      text += deployment.migration + nl + nl;
    }
    if (deployment.futureWork) {
      text += h3("7.6 Open questions and future work");
      text += deployment.futureWork + nl + nl;
    }

    text += h2("8. Appendices");
    text += "Use this section to reference diagrams, sequence charts, API specifications, and any additional material that supports the design." + nl;

    return text;
  };

  const generateDocument = () => {
    const text = buildDocumentText();
    setOutput(text);
  };

  const resetForm = () => {
    if (!window.confirm("This will clear all fields and components. Continue?")) return;

    setProject({
      projectName: '',
      docVersion: '',
      authors: '',
      docDate: '',
      docPurpose: '',
      audience: '',
      systemOverview: ''
    });
    setContext({
      problemStatement: '',
      goals: '',
      stakeholders: '',
      functionalSummary: '',
      nonFunctionalSummary: '',
      assumptions: '',
      constraints: ''
    });
    setArchitecture({
      archStyle: '',
      techStack: '',
      systemContext: '',
      archOverview: '',
      keyDecisions: ''
    });
    setComponents([]);
    setCurrentComponent({
      name: '',
      type: '',
      responsibilities: '',
      interfaces: '',
      data: '',
      notes: ''
    });
    setDataModel({
      dataOverview: '',
      keyEntities: '',
      dataLifecycle: '',
      externalInterfaces: '',
      errorHandling: ''
    });
    setQuality({
      performance: '',
      reliability: '',
      security: '',
      usability: '',
      risks: '',
      testing: ''
    });
    setDeployment({
      deploymentEnv: '',
      dependencies: '',
      monitoring: '',
      rollout: '',
      migration: '',
      futureWork: ''
    });
    setOutput('');
    setActiveStep('project');
  };

  const copyOutput = async () => {
    if (!output) {
      alert("There is no design document text to copy yet. Generate the document first.");
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
      alert("There is no design document text to download yet. Generate the document first.");
      return;
    }
    downloadFile('software-design-document.txt', output);
  };

  const downloadMarkdown = () => {
    const text = buildDocumentText();
    if (!text.trim()) {
      alert("There is no content to export yet. Add details and generate the document.");
      return;
    }
    downloadFile('software-design-document.md', text);
  };

  const printOutput = () => {
    if (!output) {
      alert("There is no design document text to print yet. Generate the document first.");
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
        <title>Software Design Document</title>
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

  const renderStepContent = () => {
    switch (activeStep) {
      case 'project':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Project name <span className="text-xs text-slate-500 font-normal">(Required)</span>
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={project.projectName}
                  onChange={handleProjectChange}
                  placeholder="Example: SafeJourno Dashboard"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Document version <span className="text-xs text-slate-500 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="docVersion"
                  value={project.docVersion}
                  onChange={handleProjectChange}
                  placeholder="Example: 1.0, Draft 2"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Authors
                </label>
                <input
                  type="text"
                  name="authors"
                  value={project.authors}
                  onChange={handleProjectChange}
                  placeholder="Names or roles of primary authors"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="docDate"
                  value={project.docDate}
                  onChange={handleProjectChange}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Document purpose
              </label>
              <textarea
                name="docPurpose"
                value={project.docPurpose}
                onChange={handleProjectChange}
                placeholder="Explain why this design document exists, who it serves, and how it will be used."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Intended audience <span className="text-xs text-slate-500 font-normal">(Optional)</span>
              </label>
              <textarea
                name="audience"
                value={project.audience}
                onChange={handleProjectChange}
                placeholder="Describe who should read this document, such as engineers, product owners, security teams, or vendors."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                High level system overview
              </label>
              <textarea
                name="systemOverview"
                value={project.systemOverview}
                onChange={handleProjectChange}
                placeholder="Summarize what the system does and the main problems it solves in a short narrative."
                rows="4"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveStep('context')}
                className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                <span>Next step: Context & requirements</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        );

      case 'context':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Problem statement
              </label>
              <textarea
                name="problemStatement"
                value={context.problemStatement}
                onChange={handleContextChange}
                placeholder="Describe the core problem or opportunity this system addresses."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Goals and objectives
              </label>
              <textarea
                name="goals"
                value={context.goals}
                onChange={handleContextChange}
                placeholder="List the primary goals of the system and what success looks like for stakeholders."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Stakeholders <span className="text-xs text-slate-500 font-normal">(Optional)</span>
              </label>
              <textarea
                name="stakeholders"
                value={context.stakeholders}
                onChange={handleContextChange}
                placeholder="Capture key groups such as end users, operations, security, legal, and leadership."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Functional requirements summary
                </label>
                <textarea
                  name="functionalSummary"
                  value={context.functionalSummary}
                  onChange={handleContextChange}
                  placeholder="Provide a concise summary of main functional requirements or user capabilities."
                  rows="3"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Non functional requirements summary <span className="text-xs text-slate-500 font-normal">(Performance, security, etc.)</span>
                </label>
                <textarea
                  name="nonFunctionalSummary"
                  value={context.nonFunctionalSummary}
                  onChange={handleContextChange}
                  placeholder="Summarize performance, reliability, security, usability, and scalability expectations."
                  rows="3"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Assumptions <span className="text-xs text-slate-500 font-normal">(Optional)</span>
              </label>
              <textarea
                name="assumptions"
                value={context.assumptions}
                onChange={handleContextChange}
                placeholder="List any environmental or business assumptions that influence the design."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Constraints
              </label>
              <textarea
                name="constraints"
                value={context.constraints}
                onChange={handleContextChange}
                placeholder="Define important constraints such as technology choices, regulatory requirements, or deadlines."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setActiveStep('project')}
                className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to project basics</span>
              </button>
              <button
                onClick={() => setActiveStep('architecture')}
                className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                <span>Next step: Architecture</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        );

      case 'architecture':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Architectural style
              </label>
              <textarea
                name="archStyle"
                value={architecture.archStyle}
                onChange={handleArchitectureChange}
                placeholder="Example: Microservices, layered, event driven, serverless, monolith with modules, etc."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Technology stack
              </label>
              <textarea
                name="techStack"
                value={architecture.techStack}
                onChange={handleArchitectureChange}
                placeholder="List primary languages, frameworks, databases, cloud services, and key dependencies."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                System context
              </label>
              <textarea
                name="systemContext"
                value={architecture.systemContext}
                onChange={handleArchitectureChange}
                placeholder="Describe how this system interacts with external systems, users, and other actors."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                High level architecture
              </label>
              <textarea
                name="archOverview"
                value={architecture.archOverview}
                onChange={handleArchitectureChange}
                placeholder="Provide a narrative description of the major layers, tiers, or logical groupings."
                rows="4"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Key design decisions
              </label>
              <textarea
                name="keyDecisions"
                value={architecture.keyDecisions}
                onChange={handleArchitectureChange}
                placeholder="Document important architectural choices, trade offs, and the rationale behind them."
                rows="4"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setActiveStep('context')}
                className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to context</span>
              </button>
              <button
                onClick={() => setActiveStep('components')}
                className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                <span>Next step: Components</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        );

      case 'components':
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-cyan-400 mb-4">Add Component</h4>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-cyan-400 mb-2">Component name</label>
                    <input
                      type="text"
                      name="name"
                      value={currentComponent.name}
                      onChange={handleComponentChange}
                      placeholder="Example: UserAuthService"
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-cyan-400 mb-2">Type or layer</label>
                    <input
                      type="text"
                      name="type"
                      value={currentComponent.type}
                      onChange={handleComponentChange}
                      placeholder="Example: API Service, Database, Frontend Module"
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Responsibilities</label>
                  <textarea
                    name="responsibilities"
                    value={currentComponent.responsibilities}
                    onChange={handleComponentChange}
                    placeholder="What this component does, its role in the system."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Public interfaces</label>
                  <textarea
                    name="interfaces"
                    value={currentComponent.interfaces}
                    onChange={handleComponentChange}
                    placeholder="APIs, contracts, or methods exposed to other components."
                    rows="2"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Data handled</label>
                  <textarea
                    name="data"
                    value={currentComponent.data}
                    onChange={handleComponentChange}
                    placeholder="Key data structures, entities, or models this component works with."
                    rows="2"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Design notes</label>
                  <textarea
                    name="notes"
                    value={currentComponent.notes}
                    onChange={handleComponentChange}
                    placeholder="Any additional details, dependencies, or implementation notes."
                    rows="2"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>

                <button
                  onClick={addComponent}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                >
                  Add Component
                </button>
              </div>
            </div>

            {components.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-4">Added Components ({components.length})</h4>
                <div className="space-y-3">
                  {components.map((comp, index) => (
                    <div key={index} className="bg-slate-800/50 border border-slate-600 rounded-lg p-4 flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <span className="font-semibold text-white">{comp.name || '[Unnamed Component]'}</span>
                          {comp.type && <span className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300">{comp.type}</span>}
                        </div>
                        {comp.responsibilities && <p className="text-sm text-slate-400 line-clamp-2">{comp.responsibilities}</p>}
                      </div>
                      <button
                        onClick={() => removeComponent(index)}
                        className="ml-4 text-red-400 hover:text-red-300 transition-colors"
                        title="Remove component"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={() => setActiveStep('architecture')}
                className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to architecture</span>
              </button>
              <button
                onClick={() => setActiveStep('data')}
                className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                <span>Next step: Data & interfaces</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Data model overview
              </label>
              <textarea
                name="dataOverview"
                value={dataModel.dataOverview}
                onChange={handleDataChange}
                placeholder="Provide an overview of the data model approach and how information is organized."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Key entities
              </label>
              <textarea
                name="keyEntities"
                value={dataModel.keyEntities}
                onChange={handleDataChange}
                placeholder="List the main entities or domain objects and their relationships."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Data lifecycle
              </label>
              <textarea
                name="dataLifecycle"
                value={dataModel.dataLifecycle}
                onChange={handleDataChange}
                placeholder="Describe how data is created, modified, archived, and deleted."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                External interfaces and APIs
              </label>
              <textarea
                name="externalInterfaces"
                value={dataModel.externalInterfaces}
                onChange={handleDataChange}
                placeholder="Document external APIs, third party integrations, and data exchange protocols."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Error handling and observability
              </label>
              <textarea
                name="errorHandling"
                value={dataModel.errorHandling}
                onChange={handleDataChange}
                placeholder="Describe error handling patterns, logging, metrics, and tracing strategies."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setActiveStep('components')}
                className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to components</span>
              </button>
              <button
                onClick={() => setActiveStep('quality')}
                className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                <span>Next step: Quality & risks</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        );

      case 'quality':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Performance and scalability
              </label>
              <textarea
                name="performance"
                value={quality.performance}
                onChange={handleQualityChange}
                placeholder="Describe performance targets, expected load, and scalability approach."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Reliability and availability
              </label>
              <textarea
                name="reliability"
                value={quality.reliability}
                onChange={handleQualityChange}
                placeholder="Define uptime goals, redundancy, failover, and recovery strategies."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Security considerations
              </label>
              <textarea
                name="security"
                value={quality.security}
                onChange={handleQualityChange}
                placeholder="Document authentication, authorization, data protection, and security controls."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Usability and accessibility
              </label>
              <textarea
                name="usability"
                value={quality.usability}
                onChange={handleQualityChange}
                placeholder="Describe UX goals, accessibility standards, and ease of use requirements."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Risks and tradeoffs
              </label>
              <textarea
                name="risks"
                value={quality.risks}
                onChange={handleQualityChange}
                placeholder="Identify key technical risks, design tradeoffs, and mitigation approaches."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Testing and validation strategy
              </label>
              <textarea
                name="testing"
                value={quality.testing}
                onChange={handleQualityChange}
                placeholder="Describe unit, integration, system, and acceptance testing approaches."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setActiveStep('data')}
                className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to data & interfaces</span>
              </button>
              <button
                onClick={() => setActiveStep('deployment')}
                className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                <span>Next step: Deployment & ops</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        );

      case 'deployment':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Deployment environment
              </label>
              <textarea
                name="deploymentEnv"
                value={deployment.deploymentEnv}
                onChange={handleDeploymentChange}
                placeholder="Describe target deployment platforms, cloud providers, or infrastructure."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Dependencies and external services
              </label>
              <textarea
                name="dependencies"
                value={deployment.dependencies}
                onChange={handleDeploymentChange}
                placeholder="List key dependencies, third party services, and infrastructure components."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Monitoring and alerting
              </label>
              <textarea
                name="monitoring"
                value={deployment.monitoring}
                onChange={handleDeploymentChange}
                placeholder="Describe monitoring, alerting, and operational visibility requirements."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Release and rollout strategy
              </label>
              <textarea
                name="rollout"
                value={deployment.rollout}
                onChange={handleDeploymentChange}
                placeholder="Describe deployment process, rollback procedures, and release cadence."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Migration and backward compatibility
              </label>
              <textarea
                name="migration"
                value={deployment.migration}
                onChange={handleDeploymentChange}
                placeholder="Document data migration plans and backward compatibility requirements."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Open questions and future work
              </label>
              <textarea
                name="futureWork"
                value={deployment.futureWork}
                onChange={handleDeploymentChange}
                placeholder="List open questions, future enhancements, and technical debt to address."
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
              />
            </div>

            <div className="flex justify-start">
              <button
                onClick={() => setActiveStep('quality')}
                className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to quality & risks</span>
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
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
              <Code className="w-12 h-12 text-cyan-400" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Software Design Document Generator
              </h1>
            </div>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Capture architecture, components, data models, and quality attributes in one workflow. This generator
              helps you produce a complete software design document that is readable for engineers, stakeholders, and
              reviewers.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-lg text-sm">Project overview and context</span>
              <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-lg text-sm">Architecture and component breakdown</span>
              <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-lg text-sm">Data, interfaces, and quality attributes</span>
            </div>
          </div>

          {/* Security Badge */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-4 flex items-center justify-center space-x-3">
            <Lock className="w-6 h-6 text-cyan-400" />
            <span className="text-slate-300">Client-Side Processing - Your data never leaves your browser</span>
          </div>

          {/* Form Section */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            {/* Step Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { id: 'project', label: 'Project basics', num: '1' },
                { id: 'context', label: 'Context & requirements', num: '2' },
                { id: 'architecture', label: 'Architecture', num: '3' },
                { id: 'components', label: 'Components', num: '4' },
                { id: 'data', label: 'Data & interfaces', num: '5' },
                { id: 'quality', label: 'Quality & risks', num: '6' },
                { id: 'deployment', label: 'Deployment & ops', num: '7' }
              ].map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    activeStep === step.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-xs">{step.num}</span>
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
              ))}
            </div>

            {/* Step Hint */}
            <p className="text-sm text-slate-400 mb-6 italic">{stepHints[activeStep]}</p>

            {/* Step Content */}
            {renderStepContent()}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={generateDocument}
              className="flex-1 min-w-[200px] bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <FileText className="w-5 h-5" />
              <span>Generate Document</span>
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
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">Generated Software Design Document:</h3>
            <textarea
              value={output}
              readOnly
              placeholder="Your generated design document will appear here. Fill out each section at your own pace, then export the full design as text or Markdown for your templates and review workflows."
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
              <strong className="text-cyan-400">Important notice:</strong> This software design document generator provides sample structure and wording for informational and educational purposes. It does not constitute professional software engineering advice or a comprehensive design specification. Organizations and teams must tailor content to their specific technical requirements, architectural standards, and project constraints. Review and validate all generated content with qualified technical leads, architects, and stakeholders before use in production environments.
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
