import React, { useState, useEffect } from 'react';
import { Code, Copy, Download, Printer, RotateCcw, ArrowLeft, FileText, AlertCircle, Lightbulb } from 'lucide-react';

export default function APIGenerator() {
  const [formData, setFormData] = useState({
    orgName: '',
    apiName: '',
    apiStyle: 'rest',
    specFormat: 'openapi-yaml',
    docTool: 'redoc',
    hosting: 'github-pages',
    audience: '',
    summary: '',
    security: '',
    envs: '',
    sdks: '',
    versioning: '',
    includeSheets: false
  });

  const [output, setOutput] = useState('');
  const [badges, setBadges] = useState({
    spec: 'OpenAPI',
    tool: 'Redoc'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  useEffect(() => {
    updateBadges();
  }, [formData.specFormat, formData.docTool]);

  const getSpecLabel = (val) => {
    const map = {
      'openapi-yaml': 'OpenAPI',
      'openapi-json': 'OpenAPI',
      'asyncapi': 'AsyncAPI',
      'postman': 'Postman',
      'code-first': 'Code-first'
    };
    return map[val] || 'OpenAPI';
  };

  const getToolLabel = (val) => {
    const map = {
      'swagger': 'Swagger UI',
      'redoc': 'Redoc',
      'slate': 'Slate',
      'postman-docs': 'Postman',
      'custom': 'Custom'
    };
    return map[val] || 'Redoc';
  };

  const updateBadges = () => {
    setBadges({
      spec: getSpecLabel(formData.specFormat),
      tool: getToolLabel(formData.docTool)
    });
  };

  const buildStyleText = (style) => {
    const map = {
      'rest': 'This is a REST API following HTTP JSON conventions. Endpoints correspond to resources, use standard HTTP verbs (GET, POST, PUT, DELETE), and return JSON payloads. Each endpoint and parameter will be documented in the specification, with example requests and responses.',
      'graphql': 'This API uses GraphQL, exposing a single endpoint where clients can shape queries and retrieve exactly the data they need. The specification will define the schema, queries, mutations, and any subscriptions, along with type descriptions.',
      'event': 'This API is event driven, leveraging message brokers, WebSockets, or streaming platforms. The specification will describe event schemas, channels, and delivery patterns so consumers understand how to subscribe to and process messages.',
      'rpc': 'This API uses RPC or gRPC for remote procedure calls. The specification will cover available procedures, request and response definitions, and any protocol buffers or service descriptors. Examples will include sample method calls.',
      'mixed': 'This API uses a combination of patterns, such as REST endpoints plus event streams or a GraphQL layer. Documentation will segment each interface clearly, noting when to use REST vs events vs query based access.'
    };
    return map[style] || map['rest'];
  };

  const buildApproachParagraph = (spec, tool) => {
    const specMap = {
      'openapi-yaml': 'The source of truth is an OpenAPI specification file in YAML format',
      'openapi-json': 'The source of truth is an OpenAPI specification file in JSON format',
      'asyncapi': 'The source of truth is an AsyncAPI specification file describing events, channels, and message schemas',
      'postman': 'The source of truth is a Postman collection exporting endpoints, parameters, authentication, and examples',
      'code-first': 'The source of truth is the API code itself, with inline annotations that tools like Doxygen or Javadoc can extract'
    };
    
    const toolMap = {
      'swagger': 'This spec will be rendered into interactive documentation using Swagger UI',
      'redoc': 'This spec will be rendered into clean, responsive documentation using Redoc',
      'slate': 'This spec will be rendered into static documentation with Slate',
      'postman-docs': 'This collection will be published as hosted Postman documentation',
      'custom': 'This spec will be converted to a custom static site or integrated into an existing developer portal'
    };

    const specText = specMap[spec] || specMap['openapi-yaml'];
    const toolText = toolMap[tool] || toolMap['redoc'];
    
    return `${specText}. ${toolText}, keeping the documentation in sync with the actual API implementation. As the specification evolves, the documentation site updates automatically or through a simple build step.`;
  };

  const buildToolsTable = (includeSheets) => {
    if (includeSheets) {
      return `| Tool | Type | Spec Support | Notes |
|------|------|--------------|-------|
| Swagger UI | Interactive | OpenAPI | Widely used, test calls in browser |
| Redoc | Static | OpenAPI | Clean design, fast loading |
| Slate | Static | Any (manual) | Highly customizable Markdown based |
| Stoplight | Platform | OpenAPI, AsyncAPI | Design, mock, docs in one |
| Postman | Platform | Postman Collections | Integrated testing and collaboration |
| AsyncAPI Studio | Interactive | AsyncAPI | For event driven APIs |`;
    } else {
      return `- **Swagger UI**: Interactive documentation for OpenAPI specs, lets users test calls directly in the browser.
- **Redoc**: A clean, responsive static site generator for OpenAPI specs.
- **Slate**: Highly customizable Markdown based documentation, not spec driven but flexible.
- **Stoplight**: A full platform for designing, mocking, and documenting APIs with OpenAPI or AsyncAPI.
- **Postman**: Offers hosted docs from Postman collections, integrates testing and collaboration.
- **AsyncAPI Studio**: An interactive tool for documenting event driven APIs.`;
    }
  };

  const generatePlan = () => {
    const orgName = formData.orgName.trim() || 'Your Organization';
    const apiName = formData.apiName.trim() || 'Your API';
    const audience = formData.audience.trim();
    const summary = formData.summary.trim();

    if (!audience || !summary) {
      alert('Please fill in at least the primary audience and a short API description.');
      return;
    }

    const sections = [];
    
    sections.push(`# ${apiName} Documentation Strategy\n`);
    sections.push(`**Organization**: ${orgName}\n`);
    sections.push(`**Generated**: ${new Date().toLocaleDateString()}\n\n---\n`);
    
    sections.push(`## 1. Purpose and audience\n\n${summary}\n\n**Primary audience**: ${audience}\n`);
    
    sections.push(`## 2. API style and usage model\n\n${buildStyleText(formData.apiStyle)}\n`);
    
    sections.push(`## 3. How documentation will be generated\n\n${buildApproachParagraph(formData.specFormat, formData.docTool)}\n`);
    
    sections.push(`## 4. Security and authentication\n`);
    if (formData.security.trim()) {
      sections.push(`${formData.security}\n`);
    } else {
      sections.push(`Security and authentication schemes such as API keys, OAuth 2.0, or mTLS will be documented in a dedicated section. Each example will show how to include credentials in requests while following least privilege principles.\n`);
    }
    
    sections.push(`## 5. Environments and base URLs\n`);
    if (formData.envs.trim()) {
      sections.push(`${formData.envs}\n`);
    } else {
      sections.push(`Documentation will call out sandbox, staging, and production environments, including base URLs and any regional endpoints that apply.\n`);
    }
    
    sections.push(`## 6. Language examples and SDKs\n`);
    if (formData.sdks.trim()) {
      sections.push(`${formData.sdks}\n`);
    } else {
      sections.push(`Where practical, examples will be provided in at least one mainstream language or HTTP client, along with curl snippets that can be tried directly from the command line.\n`);
    }
    
    sections.push(`## 7. Versioning and change management\n`);
    if (formData.versioning.trim()) {
      sections.push(`${formData.versioning}\n`);
    } else {
      sections.push(`The documentation site will clearly indicate the current stable version of the API, as well as any deprecated endpoints or upcoming breaking changes. A short change log will summarize recent updates.\n`);
    }
    
    sections.push(`## 8. Popular tools for documentation generation\n\nThe following tools are commonly used to turn specification files into readable documentation sites:\n\n${buildToolsTable(formData.includeSheets)}\n`);
    
    let hostingText = '';
    if (formData.hosting === 'github-pages') {
      hostingText = 'Documentation will be published as a static site, suitable for hosting on GitHub Pages, Amazon S3, Netlify, or similar services.';
    } else if (formData.hosting === 'internal-portal') {
      hostingText = 'Documentation will be integrated into an internal developer portal or wiki, aligning with existing authentication and access controls.';
    } else if (formData.hosting === 'saas') {
      hostingText = 'Documentation will be hosted by a third party vendor that specializes in API design, testing, and documentation.';
    } else {
      hostingText = 'Documentation may be split between a public site for external developers and an internal portal for private or experimental endpoints.';
    }
    
    sections.push(`## 9. Hosting and distribution\n\n${hostingText}\n`);
    
    sections.push(`## 10. Next steps\n\n- Finalize the initial specification file for the API.\n- Connect the specification to the chosen documentation tool.\n- Add authentication, environment, and language examples.\n- Review the generated site with stakeholders and refine wording.\n- Establish a simple workflow for keeping the spec and docs in sync with each release.\n`);

    setOutput(sections.join('\n'));
  };

  const resetAll = () => {
    setFormData({
      orgName: '',
      apiName: '',
      apiStyle: 'rest',
      specFormat: 'openapi-yaml',
      docTool: 'redoc',
      hosting: 'github-pages',
      audience: '',
      summary: '',
      security: '',
      envs: '',
      sdks: '',
      versioning: '',
      includeSheets: false
    });
    setOutput('');
  };

  const fillSample = () => {
    setFormData({
      orgName: 'CyberLife Coach',
      apiName: 'Digital Risk Scoring API',
      apiStyle: 'rest',
      specFormat: 'openapi-yaml',
      docTool: 'redoc',
      hosting: 'github-pages',
      audience: 'Internal platform teams and selected partner developers who need to evaluate digital risk scores and enrich user profiles securely.',
      summary: 'The Digital Risk Scoring API exposes risk assessment, scoring, and explanation endpoints that help internal and partner systems evaluate account risk in real time.',
      security: 'All requests are authenticated with API keys scoped per client. High risk endpoints may later be moved to OAuth 2.0 with client credentials. TLS is required for all environments.',
      envs: 'Sandbox: https://sandbox-risk-api.example.com\nProduction: https://risk-api.example.com\nAdditional regional endpoints may be added as adoption grows.',
      sdks: 'Initial examples will focus on curl, JavaScript (fetch), and Python (requests). Additional language snippets can be added based on developer demand.',
      versioning: 'Version v1 is considered stable. Breaking changes will be introduced under a new version prefix, with at least 6 months notice for any deprecations.',
      includeSheets: true
    });
  };

  const copyOutput = async () => {
    if (!output.trim()) {
      alert("Please generate a plan first.");
      return;
    }
    try {
      await navigator.clipboard.writeText(output);
      alert("API documentation plan copied to clipboard.");
    } catch (e) {
      alert("Copy failed. Please copy manually.");
    }
  };

  const downloadFile = (filename, mimeType) => {
    if (!output.trim()) {
      alert("Please generate a plan first.");
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

  const downloadText = () => downloadFile("api_docs_plan.txt", "text/plain");
  const downloadMarkdown = () => downloadFile("api_docs_plan.md", "text/markdown");

  const printOutput = () => {
    if (!output.trim()) {
      alert("Please generate a plan first.");
      return;
    }
    const win = window.open("", "_blank", "noopener,noreferrer");
    if (!win) {
      alert("Pop-up blocked. Please allow pop-ups to print/save as PDF.");
      return;
    }

    const escapeHtml = (str) => {
      const map = { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" };
      return String(str).replace(/[&<>"']/g, m => map[m]);
    };

    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>API Docs Plan - Print View</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #000; }
    h1 { font-size: 18px; margin: 0 0 16px; }
    pre { white-space: pre-wrap; word-wrap: break-word; font-family: "Courier New", monospace; font-size: 12px; line-height: 1.5; }
    @media print { body { margin: 20mm; } }
  </style>
</head>
<body>
  <h1>API Documentation Plan</h1>
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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
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

            <a 
              href="/policy-generators"
              className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Business Policy Hub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30 mb-6">
              <Code className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-slate-300">API and Developer Tools</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              API Documentation Strategy Generator
            </h1>
            
            <p className="text-xl text-slate-400">
              Generate a structured plan for modern API documentation using OpenAPI, AsyncAPI, Postman collections, and tools like Swagger UI and Redoc
            </p>
          </div>

          {/* Security Badge */}
          <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-xl p-4 mb-8 flex items-center justify-center space-x-3">
            <AlertCircle className="w-6 h-6 text-cyan-400" />
            <span className="text-slate-300"><strong>Client-side only.</strong> Text is generated in your browser and not uploaded.</span>
          </div>

          {/* Form */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-2">API and Documentation Inputs</h3>
              <p className="text-sm text-slate-400">
                Fill in the basics of your API and documentation goals. The generator will produce a Markdown plan that explains how your documentation will be built from a machine readable spec and rendered with modern tools.
              </p>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Organization name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="orgName"
                    value={formData.orgName}
                    onChange={handleInputChange}
                    placeholder="Example: CyberLife Coach Platform"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    API name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="apiName"
                    value={formData.apiName}
                    onChange={handleInputChange}
                    placeholder="Example: CyberLife Risk Scoring API"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>

              {/* API Style and Spec */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    API style <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="apiStyle"
                    value={formData.apiStyle}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  >
                    <option value="rest">REST (HTTP JSON)</option>
                    <option value="graphql">GraphQL</option>
                    <option value="event">Event driven (Kafka, WebSockets, etc.)</option>
                    <option value="rpc">RPC or gRPC</option>
                    <option value="mixed">Mixed / hybrid</option>
                  </select>
                  <p className="text-sm text-slate-500 mt-2">This adjusts how the generator talks about flows and usage patterns.</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Specification format <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="specFormat"
                    value={formData.specFormat}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  >
                    <option value="openapi-yaml">OpenAPI (YAML)</option>
                    <option value="openapi-json">OpenAPI (JSON)</option>
                    <option value="asyncapi">AsyncAPI (for events)</option>
                    <option value="postman">Postman collection</option>
                    <option value="code-first">Code first (Doxygen, Javadoc, etc.)</option>
                  </select>
                  <p className="text-sm text-slate-500 mt-2">The spec is the single source of truth for endpoints, parameters, and responses.</p>
                </div>
              </div>

              {/* Documentation Tool and Hosting */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Documentation tool
                  </label>
                  <select
                    name="docTool"
                    value={formData.docTool}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  >
                    <option value="swagger">Swagger UI</option>
                    <option value="redoc">Redoc</option>
                    <option value="slate">Slate</option>
                    <option value="postman-docs">Postman hosted docs</option>
                    <option value="custom">Custom static site or portal</option>
                  </select>
                  <p className="text-sm text-slate-500 mt-2">Used to render the spec into an interactive or static HTML site.</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Docs hosting
                  </label>
                  <select
                    name="hosting"
                    value={formData.hosting}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  >
                    <option value="github-pages">Static hosting (GitHub Pages, S3, Netlify)</option>
                    <option value="internal-portal">Internal developer portal or wiki</option>
                    <option value="saas">Hosted vendor docs (Postman, Stoplight, etc.)</option>
                    <option value="mixed">Mixed internal and public hosting</option>
                  </select>
                </div>
              </div>

              {/* Audience and Summary */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Primary audience <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="audience"
                    value={formData.audience}
                    onChange={handleInputChange}
                    placeholder="Example: Internal developers, external partners, or public third party developers."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Short API description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleInputChange}
                    placeholder="One or two sentences describing what the API does and who it serves."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>
              </div>

              {/* Security and Environments */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Security and auth model
                  </label>
                  <textarea
                    name="security"
                    value={formData.security}
                    onChange={handleInputChange}
                    placeholder="Example: OAuth 2.0, API keys, mTLS, IP allow lists, tenant isolation expectations."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Environments and base URLs
                  </label>
                  <textarea
                    name="envs"
                    value={formData.envs}
                    onChange={handleInputChange}
                    placeholder="Example: Sandbox, staging, production, and any regional API endpoints."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>
              </div>

              {/* SDKs and Versioning */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Languages or SDKs to highlight
                  </label>
                  <textarea
                    name="sdks"
                    value={formData.sdks}
                    onChange={handleInputChange}
                    placeholder="Example: JavaScript, Python, Java, Go, CLI examples."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Versioning and lifecycle notes
                  </label>
                  <textarea
                    name="versioning"
                    value={formData.versioning}
                    onChange={handleInputChange}
                    placeholder="Example: v1 stable, deprecation policy, how breaking changes are handled."
                    rows="3"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 resize-none"
                  />
                </div>
              </div>

              {/* Include Sheets Checkbox */}
              <div>
                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="includeSheets"
                    checked={formData.includeSheets}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
                  />
                  <div>
                    <span className="text-slate-300 group-hover:text-slate-100 transition-colors font-semibold">
                      Include an Export to Sheets friendly tools table
                    </span>
                    <p className="text-sm text-slate-500 mt-1">Adds a Markdown table of popular doc tools that can be pasted into Sheets or Excel.</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={generatePlan}
                className="flex-1 min-w-[180px] bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <FileText className="w-5 h-5" />
                <span>Generate API docs plan</span>
              </button>
              <button
                onClick={resetAll}
                className="flex-1 min-w-[150px] bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Clear form</span>
              </button>
              <button
                onClick={fillSample}
                className="flex-1 min-w-[180px] bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 border border-slate-600"
              >
                <Lightbulb className="w-5 h-5" />
                <span>Fill with sample values</span>
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-cyan-400">Generated API documentation plan</h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full text-xs font-semibold">
                  Spec: {badges.spec}
                </span>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-full text-xs font-semibold">
                  Tool: {badges.tool}
                </span>
              </div>
            </div>

            <textarea
              value={output}
              readOnly
              placeholder="Your generated API documentation plan will appear here. Start by filling in the API details, specification format, and documentation tooling, then choose 'Generate API docs plan'."
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

            <p className="text-sm text-slate-500 mt-4">You can copy, print, or download the document as plain text or Markdown.</p>
          </div>

          {/* Legal Disclaimer */}
          <div className="mt-8 bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Note:</strong> This generator produces a planning document for informational purposes. It does not constitute technical architecture advice or guarantee that the selected tools will meet all organizational requirements. Review the generated plan with your development and security teams before implementation.
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
