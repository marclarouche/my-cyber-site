import React from 'react';
import { Code, ArrowLeft, AlertTriangle, Shield, FileText, CheckCircle, Info, Zap, Lock } from 'lucide-react';

export default function AboutJSONXMLFormatter() {
  const handleOpenTool = () => {
    window.open('/tools/json-xml-formatter', '_blank', 'noopener,noreferrer');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center space-x-3 group cursor-pointer">
              <img 
                src="/logo.png" 
                alt="CyberLifeCoach" 
                className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300" 
              />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:brightness-125 transition-all duration-300">
                CyberLifeCoach
              </span>
            </a>

            <a href="/tools" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tools Hub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
              About this utility
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              JSON & XML
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the JSON / XML Formatter and Validator
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            This page explains what the formatter does, how it uses your browser's built-in parsing features, and how to use it safely when you are working with API responses, logs, or sample data that might mirror production systems.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2">
              {/* What this tool actually does */}
              <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  What this tool actually does
                </h2>
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  The JSON / XML Formatter and Validator takes structured text that you paste into the page, checks that it is syntactically valid, and, when possible, returns a clean, indented version that is easier to read. Everything happens locally in your browser window without sending data to a server.
                </p>

                <h3 className="text-2xl font-bold mb-3 text-cyan-400">Two formats, one simple workflow</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Many people work with JSON and XML every day. They see them in API responses, logs, configuration files, and exports from other tools. When the data is minified or slightly broken, it can be difficult to understand at a glance. The formatter gives you a simple way to:
                </p>
                <ul className="space-y-2 text-slate-400 mb-6">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Validate that the text actually counts as well-formed JSON or XML.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Reflow it with indentation so nested structures are obvious.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Copy the cleaned version into other tools, documentation, or test cases.</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-bold mb-3 text-cyan-400">How JSON mode works</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  In JSON mode, the tool relies on the native JSON engine built into your browser. It behaves the same way that a modern JavaScript application would behave when it parses JSON from an API.
                </p>
                <ul className="space-y-2 text-slate-400 mb-4">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>First it calls <code className="text-cyan-300 bg-slate-800 px-2 py-0.5 rounded">JSON.parse()</code> on the input and waits for a success or a syntax error.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>On success it uses <code className="text-cyan-300 bg-slate-800 px-2 py-0.5 rounded">JSON.stringify()</code> with indentation to produce a nicely formatted version.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>On failure it surfaces the error message from the parser to help you locate the problem.</span>
                  </li>
                </ul>
                <p className="text-slate-500 leading-relaxed mb-6 italic">
                  This means the tool enforces strict JSON rules. It does not accept comments, trailing commas, or single quotes around keys, which helps you catch subtle issues before data reaches production code.
                </p>

                <h3 className="text-2xl font-bold mb-3 text-cyan-400">How XML mode works</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  In XML mode, the tool uses the browser's XML parsing and serialization features. The browser tries to turn your text into a document tree and reports any problems it encounters along the way.
                </p>
                <ul className="space-y-2 text-slate-400 mb-4">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>The input is fed into <code className="text-cyan-300 bg-slate-800 px-2 py-0.5 rounded">DOMParser</code> with the <code className="text-cyan-300 bg-slate-800 px-2 py-0.5 rounded">application/xml</code> content type.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>The tool then checks for a special internal element that browsers create when the XML is not well-formed.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>If parsing succeeds, it uses <code className="text-cyan-300 bg-slate-800 px-2 py-0.5 rounded">XMLSerializer</code> and a simple indentation function to show the structure clearly.</span>
                  </li>
                </ul>
                <p className="text-slate-500 leading-relaxed mb-6 italic">
                  This approach is ideal for quick checks such as confirming that tags are properly nested or that you have a single root element. It is not meant to replace full schema validation with XSD or Relax NG.
                </p>

                <h3 className="text-2xl font-bold mb-3 text-cyan-400">Typical ways to use this page</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  The formatter is designed for quick, everyday tasks that help reduce friction when you are working with structured text.
                </p>
                <ul className="space-y-2 text-slate-400 mb-6">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Cleaning up JSON from an API response before adding it to documentation, tickets, or an incident report.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Validating small XML configuration snippets before you commit them or share them with a team.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Inspecting sample data from training materials, blog posts, or vendor portals without relying on an online third-party service.</span>
                  </li>
                </ul>

                <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-6">
                  <div className="flex items-start space-x-4">
                    <Info className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-slate-300 leading-relaxed">
                        The page does not store or log what you paste. Once you navigate away or close the tab, the content is gone. If you are working with very sensitive production data, consider masking or redacting values before using any tool, even one that runs locally in your browser.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-1">
              {/* Quick Snapshot */}
              <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-6 mb-8">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">Quick snapshot</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Client side only, no uploads</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  The formatter does not call external APIs or send your text to any backend. It simply uses the JavaScript and XML engines that are already present in your browser.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mr-3 mt-2 flex-shrink-0"></div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      JSON validation errors come directly from the same parser that web applications rely on, which gives you realistic feedback about how your data will behave.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mr-3 mt-2 flex-shrink-0"></div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      XML checks are based on well-formedness. They help you catch missing closing tags and similar structural issues before you move on to more advanced schema validation.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mr-3 mt-2 flex-shrink-0"></div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Nothing is saved, logged, or transmitted by this page. If you do not copy or download the formatted output, it stays in your browser tab.
                    </p>
                  </li>
                </ul>
              </div>

              {/* Who this is for */}
              <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Who this is for</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mr-3 mt-2 flex-shrink-0"></div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Developers and administrators who want a quick sanity check before committing or deploying changes.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mr-3 mt-2 flex-shrink-0"></div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Analysts and technical writers who copy JSON or XML from tools into documentation, tickets, or training material and want it to be readable.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mr-3 mt-2 flex-shrink-0"></div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Learners who are still getting comfortable with the structure of these formats and want immediate feedback if something is off.
                    </p>
                  </li>
                </ul>
              </div>

              {/* What this page does not do */}
              <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">What this page does not do</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 italic">
                  The formatter is not a full validator for business rules, schemas, or security constraints. It does not check whether fields are present, values are safe, or payloads comply with a specific API specification. Those tasks still belong to your application tests, schema tools, and security reviews.
                </p>

                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                    <span className="text-xs text-slate-400">No network calls</span>
                  </div>
                  <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                    <span className="text-xs text-slate-400">Suits quick checks</span>
                  </div>
                  <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                    <span className="text-xs text-slate-400">Friendly for non-experts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <Code className="w-5 h-5" />
              <span>Open JSON-XML Formatter</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print This Page</span>
            </button>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal and Usage Notice:</strong> This JSON / XML Formatter and Validator runs entirely in your browser, does not send your input to any remote server, and does not create lasting logs of the data you paste. No warranty is provided for data correctness or safety.
            </p>
          </div>
        </div>
      </section>

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
            <p>&copy; 2025 CyberLifeCoach</p>
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
