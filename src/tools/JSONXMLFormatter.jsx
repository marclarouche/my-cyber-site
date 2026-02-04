import React, { useState, useRef, useEffect } from 'react';
import { FileCode, ArrowLeft, Copy, Check } from 'lucide-react';

export default function JSONXMLFormatter() {
  const [currentMode, setCurrentMode] = useState('json');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [status, setStatus] = useState({ type: 'info', message: 'Waiting for input' });
  const [messages, setMessages] = useState([]);
  const [notification, setNotification] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const msgPlaceholderRef = useRef(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const addMessage = (type, text) => {
    setMessages(prev => [...prev, { type, text }]);
  };

  const setStatusState = (type, message) => {
    setStatus({ type, message });
  };

  const setMode = (mode) => {
    setCurrentMode(mode);
    setInputText('');
    setOutputText('');
    setStatusState('info', 'Waiting for input');
    clearMessages();
  };

  const showCopyStatus = () => {
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 1600);
  };

  const copyOutput = () => {
    const text = (outputText || '').trim();
    if (!text) return;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          showCopyStatus();
          showNotification('Copied to clipboard');
        })
        .catch(() => legacyCopy(text));
    } else {
      legacyCopy(text);
    }
  };

  const legacyCopy = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showCopyStatus();
      showNotification('Copied to clipboard');
    } catch (e) {
      console.error('Copy failed', e);
    }
    document.body.removeChild(textarea);
  };

  const formatJson = (raw) => {
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      return {
        ok: false,
        formatted: '',
        error: error && error.message ? String(error.message) : 'Invalid JSON'
      };
    }
    const formatted = JSON.stringify(parsed, null, 2);
    return {
      ok: true,
      formatted: formatted,
      error: ''
    };
  };

  const prettyPrintXmlString = (xml) => {
    const PADDING = '  ';
    const reg = /(>)(<)(\/*)/g;
    let formatted = '';
    let pad = 0;

    xml = xml.replace(/\r?\n/g, '');
    xml = xml.replace(reg, '$1\n$2$3');
    const lines = xml.split('\n');

    lines.forEach(function (line) {
      if (!line.trim()) return;
      let indent = 0;
      if (line.match(/^<\/\w/)) {
        pad = Math.max(pad - 1, 0);
      } else if (line.match(/^<\w([^>]*[^/])?>.*$/) && !line.match(/<\/\w/)) {
        indent = 0;
      } else if (line.match(/^<\w[^>]*\/>/)) {
        indent = 0;
      } else {
        indent = 0;
      }

      const padding = PADDING.repeat(pad);
      formatted += padding + line.trim() + '\n';

      if (line.match(/^<\w([^>]*[^/])?>.*$/) && !line.match(/<\/\w/)) {
        pad += 1;
      }
    });

    return formatted.trimEnd();
  };

  const formatXml = (raw) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(raw, 'application/xml');
    const errorNode = doc.getElementsByTagName('parsererror')[0];
    if (errorNode) {
      const msg = errorNode.textContent || 'Invalid XML structure';
      return {
        ok: false,
        formatted: '',
        error: msg.replace(/\s+/g, ' ').trim()
      };
    }
    const serializer = new XMLSerializer();
    const xmlString = serializer.serializeToString(doc);
    const formatted = prettyPrintXmlString(xmlString);
    return {
      ok: true,
      formatted: formatted,
      error: ''
    };
  };

  const validateOnly = (raw) => {
    if (!raw.trim()) {
      setStatusState('warn', 'No input provided');
      clearMessages();
      addMessage('warn', 'Paste JSON or XML into the input panel before running validation.');
      setOutputText('');
      return;
    }

    clearMessages();

    if (currentMode === 'json') {
      const result = formatJson(raw);
      if (result.ok) {
        setStatusState('good', 'JSON is syntactically valid');
        addMessage(
          'good',
          'JSON.parse accepted this input, which means it is syntactically valid JSON. You can now safely use it in your application or format it if needed.'
        );
      } else {
        setStatusState('bad', 'JSON validation failed');
        addMessage(
          'bad',
          'JSON.parse reported an error: ' + result.error
        );
        addMessage(
          'info',
          'Common problems include missing commas, trailing commas, single quotes instead of double quotes, and comments, which are not allowed in strict JSON.'
        );
      }
    } else {
      const result = formatXml(raw);
      if (result.ok) {
        setStatusState('good', 'XML is syntactically valid');
        addMessage(
          'good',
          'The browser\'s XML parser accepted this input. Tags are properly nested and the document is well formed.'
        );
      } else {
        setStatusState('bad', 'XML validation failed');
        addMessage(
          'bad',
          'The XML parser reported an error: ' + result.error
        );
        addMessage(
          'info',
          'Check that all tags are closed, attributes are quoted, and there is a single root element.'
        );
      }
    }
  };

  const formatAndValidate = (raw) => {
    if (!raw.trim()) {
      setStatusState('warn', 'No input provided');
      clearMessages();
      addMessage('warn', 'Paste JSON or XML into the input panel before running format and validate.');
      setOutputText('');
      return;
    }

    clearMessages();

    if (currentMode === 'json') {
      const result = formatJson(raw);
      if (result.ok) {
        setOutputText(result.formatted);
        setStatusState('good', 'JSON is valid and has been formatted');
        addMessage(
          'good',
          'The JSON input parsed successfully and has been pretty printed. This makes it easier to scan keys, arrays, and nested objects.'
        );
      } else {
        setOutputText('');
        setStatusState('bad', 'JSON validation failed');
        addMessage(
          'bad',
          'JSON.parse reported an error: ' + result.error
        );
        addMessage(
          'info',
          'Remember that strict JSON requires double quoted keys and values, no comments, and no trailing commas.'
        );
      }
    } else {
      const result = formatXml(raw);
      if (result.ok) {
        setOutputText(result.formatted);
        setStatusState('good', 'XML is valid and has been formatted');
        addMessage(
          'good',
          'The XML input was parsed into a document tree and re-serialised with indentation so that nested elements are easier to follow.'
        );
      } else {
        setOutputText('');
        setStatusState('bad', 'XML validation failed');
        addMessage(
          'bad',
          'The XML parser reported an error: ' + result.error
        );
        addMessage(
          'info',
          'Pay attention to the line and column hints in the error message; they often point directly to the missing bracket or quote.'
        );
      }
    }
  };

  const handleFormatValidate = () => {
    formatAndValidate(inputText);
  };

  const handleValidateOnly = () => {
    validateOnly(inputText);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setStatusState('info', 'Waiting for input');
    clearMessages();
  };

  const handleInputKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      handleFormatValidate();
    }
  };

  const getStatusColor = () => {
    switch (status.type) {
      case 'good':
        return 'text-green-400';
      case 'warn':
        return 'text-yellow-400';
      case 'bad':
        return 'text-red-400';
      default:
        return 'text-cyan-400';
    }
  };

  const getMessageColor = (type) => {
    switch (type) {
      case 'good':
        return 'bg-green-900/20 border-green-500/40 text-green-200';
      case 'warn':
        return 'bg-yellow-900/20 border-yellow-500/40 text-yellow-200';
      case 'bad':
        return 'bg-red-900/20 border-red-500/40 text-red-200';
      default:
        return 'bg-cyan-900/20 border-cyan-500/40 text-cyan-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-8 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <FileCode className="w-12 h-12 text-cyan-400" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                JSON / XML Formatter and Validator
              </h1>
              <p className="text-slate-400 mt-2">Validate and format JSON or XML documents with real-time syntax checking. Pretty print your data structures for easier debugging and readability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-[7fr_5fr] gap-6">
          {/* Left Column - Editor */}
          <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-2xl border border-slate-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <span>Format & Validate</span>
                <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  Client-Side
                </span>
              </h2>
            </div>

            <p className="text-sm text-slate-400 mb-4">
              Paste JSON or XML into the input below, then choose to either validate only or format and validate. Your data never leaves your browser.
            </p>

            {/* Mode Tabs */}
            <div className="inline-flex rounded-full p-1 bg-slate-950 border border-slate-700 mb-4 gap-1">
              <button
                onClick={() => setMode('json')}
                className={`rounded-full px-4 py-2 text-sm transition-all duration-200 flex items-center space-x-2 ${
                  currentMode === 'json'
                    ? 'bg-cyan-500/20 text-cyan-100 shadow-[0_0_0_1px_rgba(56,189,248,0.7)]'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${
                  currentMode === 'json' 
                    ? 'bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]' 
                    : 'bg-slate-600'
                }`}></span>
                <span>JSON</span>
              </button>
              <button
                onClick={() => setMode('xml')}
                className={`rounded-full px-4 py-2 text-sm transition-all duration-200 flex items-center space-x-2 ${
                  currentMode === 'xml'
                    ? 'bg-cyan-500/20 text-cyan-100 shadow-[0_0_0_1px_rgba(56,189,248,0.7)]'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${
                  currentMode === 'xml' 
                    ? 'bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]' 
                    : 'bg-slate-600'
                }`}></span>
                <span>XML</span>
              </button>
            </div>

            {/* Editor Grid */}
            <div className="grid lg:grid-cols-2 gap-4 mb-6">
              {/* Input Column */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs text-slate-400 uppercase tracking-wider">Input</label>
                  <span className="text-xs text-slate-500">Paste or type here</span>
                </div>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder={currentMode === 'json' ? 'Paste JSON here...' : 'Paste XML here...'}
                  className="w-full min-h-[280px] max-h-[400px] resize-y rounded-xl border border-slate-700 bg-slate-950/90 text-slate-300 p-3 font-mono text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  spellCheck="false"
                />
              </div>

              {/* Output Column */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs text-slate-400 uppercase tracking-wider">Output</label>
                  <span className="text-xs text-slate-500">Formatted result</span>
                </div>
                <div className="relative">
                  <textarea
                    value={outputText}
                    readOnly
                    placeholder="Formatted output will appear here..."
                    className="w-full min-h-[280px] max-h-[400px] resize-y rounded-xl border border-slate-700 bg-slate-950/90 text-slate-300 p-3 font-mono text-sm focus:outline-none"
                    spellCheck="false"
                  />
                  {outputText && (
                    <button
                      onClick={copyOutput}
                      className="absolute top-3 right-3 p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-600 transition-all group"
                      title="Copy to clipboard"
                    >
                      {copySuccess ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleFormatValidate}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
              >
                Format & Validate
              </button>
              <button
                onClick={handleValidateOnly}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
              >
                Validate Only
              </button>
              <button
                onClick={handleClear}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
              >
                Clear
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-3">
              Keyboard shortcut: <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 font-mono">Ctrl+Enter</kbd> or <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 font-mono">⌘+Enter</kbd> to format and validate
            </p>
          </div>

          {/* Right Column - Status & Messages */}
          <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-2xl border border-slate-700 p-6">
            <h2 className="text-xl font-semibold mb-6">Status & Messages</h2>

            {/* Status Display */}
            <div className="mb-6 p-4 bg-slate-950/90 rounded-xl border border-slate-700">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  status.type === 'good' ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]' :
                  status.type === 'warn' ? 'bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]' :
                  status.type === 'bad' ? 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]' :
                  'bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]'
                }`}></div>
                <span className={`font-semibold ${getStatusColor()}`}>{status.message}</span>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-3">
              {messages.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <p className="text-sm">No messages yet.</p>
                  <p className="text-xs mt-2">Validation results will appear here.</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border text-sm leading-relaxed ${getMessageColor(msg.type)}`}
                  >
                    {msg.text}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="max-w-5xl mx-auto px-4 pb-8">
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-6">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Legal Disclaimer:</strong> This tool is provided for convenience and educational purposes. 
            While we strive for accuracy, the formatting and validation results should not be considered authoritative 
            for production systems. Always verify critical data with official validators and test thoroughly. The creator 
            assumes no responsibility for data loss, errors, or issues arising from use of this tool.
          </p>
        </div>

        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-12">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Data Privacy:</strong> This application runs entirely as a client-side tool 
            in your browser. All JSON and XML parsing, validation, and formatting happens locally using native JavaScript APIs 
            (JSON.parse, DOMParser, XMLSerializer). No data is transmitted to any server or third-party service. 
            If you save this page locally, it will continue to function completely offline.
          </p>
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
            <p>&copy; {new Date().getFullYear()} CyberLifeCoach</p>
            <p className="text-slate-600">All processing happens in your browser. No data is sent anywhere.</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg shadow-cyan-500/50 animate-fade-in z-50">
          {notification}
        </div>
      )}
    </div>
  );
}
