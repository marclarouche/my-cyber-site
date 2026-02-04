import React, { useState, useRef } from 'react';
import { FileText, ArrowLeft, Search, Trash2, Upload, Shield } from 'lucide-react';

export default function TOSSummarizer() {
  const [policyText, setPolicyText] = useState('');
  const [fileName, setFileName] = useState('');
  const [summaryText, setSummaryText] = useState('');
  const [flagSummary, setFlagSummary] = useState([]);
  const [flagNote, setFlagNote] = useState('No analysis yet. When you run the tool, this section will list themes such as mandatory arbitration, broad sharing, or unilateral changes, if they are detected.');
  const [clausesList, setClausesList] = useState([]);
  const [dataOverview, setDataOverview] = useState('');
  const [dataTags, setDataTags] = useState([]);
  const [notification, setNotification] = useState('');
  
  const fileInputRef = useRef(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // Concern patterns
  const concernPatterns = [
    {
      id: 'arbitration_waiver',
      label: 'Mandatory arbitration and class action waiver',
      keywords: [
        'binding arbitration',
        'mandatory arbitration',
        'arbitration agreement',
        'class action waiver',
        'waive your right to participate in a class action',
        'waive any right to a class action',
        'waive your right to sue',
        'waiver of class'
      ],
      weight: 3
    },
    {
      id: 'data_sharing_broad',
      label: 'Broad data sharing with third parties',
      keywords: [
        'share your information with third parties',
        'share your information with our partners',
        'trusted partners',
        'affiliates and service providers',
        'third party partners',
        'third party service providers'
      ],
      weight: 2
    },
    {
      id: 'tracking_profiling',
      label: 'Extensive tracking and profiling',
      keywords: [
        'cookies and similar technologies',
        'cookies and other tracking technologies',
        'behavioral advertising',
        'interest based advertising',
        'personalized advertising',
        'profiling and analytics',
        'analytics providers',
        'tracking technologies'
      ],
      weight: 2
    },
    {
      id: 'unilateral_changes',
      label: 'We can change this policy at any time',
      keywords: [
        'we may modify this policy at any time',
        'we may update this policy at any time',
        'we may change these terms at any time',
        'subject to change at any time',
        'at our sole discretion',
        'without prior notice to you'
      ],
      weight: 3
    },
    {
      id: 'data_retention',
      label: 'Long or unclear data retention',
      keywords: [
        'retain your information',
        'retain personal information',
        'for as long as necessary',
        'for as long as we have a legitimate business interest',
        'for as long as required by law'
      ],
      weight: 1
    },
    {
      id: 'broad_license_content',
      label: 'Broad license to your content',
      keywords: [
        'worldwide, royalty free, sublicensable license',
        'irrevocable license',
        'perpetual license',
        'to use, reproduce, modify, distribute',
        'license to use your content'
      ],
      weight: 3
    },
    {
      id: 'jurisdiction_law',
      label: 'One sided jurisdiction and governing law',
      keywords: [
        'governed by the laws of',
        'exclusive jurisdiction of the courts',
        'venue shall be',
        'you agree to submit to the jurisdiction'
      ],
      weight: 1
    },
    {
      id: 'children',
      label: 'Children and age restrictions',
      keywords: [
        'not intended for children',
        'we do not knowingly collect',
        'under the age of 13',
        'under the age of 16',
        "children's privacy"
      ],
      weight: 1
    }
  ];

  const dataSignals = [
    { id: 'cookies', label: 'Cookies and tracking', keywords: ['cookies', 'tracking technologies', 'web beacons'] },
    { id: 'analytics', label: 'Analytics tools', keywords: ['analytics', 'google analytics', 'measurement'] },
    { id: 'ads', label: 'Advertising and profiling', keywords: ['advertising', 'interest based', 'behavioural advertising', 'behavioral advertising', 'personalized ads'] },
    { id: 'sell_share', label: 'Sell or share data', keywords: ['sell your personal information', 'sale of personal information', 'share your personal information with third parties for their own purposes'] },
    { id: 'rights', label: 'User rights mentioned', keywords: ['access your information', 'delete your information', 'correct your information', 'object to processing', 'data portability'] },
    { id: 'security', label: 'Security measures', keywords: ['we take reasonable measures', 'security measures', 'protect your information', 'encryption'] }
  ];

  const resetOutputs = () => {
    setSummaryText('Once you paste a policy and select "Summarize policy", a short overview will appear here that points to how the document handles collection, use, sharing, and your choices.');
    setFlagSummary([]);
    setFlagNote('No analysis yet. When you run the tool, this section will list themes such as mandatory arbitration, broad sharing, or unilateral changes, if they are detected.');
    setClausesList([]);
    setDataOverview('This section looks for mentions of cookies, analytics, advertising, selling or sharing data, and user rights. It is a rough indicator, not a complete inventory.');
    setDataTags([]);
  };

  const basicClean = (text) => {
    // If HTML was pasted or loaded, strip tags
    const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(text);
    if (looksLikeHtml) {
      text = text.replace(/<script[\s\S]*?<\/script>/gi, '');
      text = text.replace(/<style[\s\S]*?<\/style>/gi, '');
      text = text.replace(/<[^>]+>/g, ' ');
    }
    text = text.replace(/\r\n/g, '\n');
    text = text.replace(/\t/g, ' ');
    text = text.replace(/\u00a0/g, ' ');
    text = text.replace(/\n{3,}/g, '\n\n');
    return text.trim();
  };

  const splitIntoSentences = (text) => {
    const rough = text.split(/(?<=[.!?])\s+(?=[A-Z0-9])/);
    const sentences = [];
    rough.forEach((s) => {
      const trimmed = s.trim();
      if (trimmed.length > 0) {
        sentences.push(trimmed);
      }
    });
    return sentences;
  };

  const analyzePolicy = () => {
    if (!policyText.trim()) {
      resetOutputs();
      setSummaryText('No text detected. Paste a privacy policy or Terms of Service first, then run the summarizer.');
      showNotification('Please enter policy text first');
      return;
    }

    const cleaned = basicClean(policyText);
    const sentences = splitIntoSentences(cleaned);

    if (!sentences.length) {
      resetOutputs();
      setSummaryText('The text could not be segmented into sentences. Try pasting a simpler, plain text version of the policy.');
      showNotification('Could not parse policy text');
      return;
    }

    // Build objects
    const sentenceObjs = sentences.map((text, index) => {
      const lc = text.toLowerCase();
      return {
        index: index,
        text,
        lc,
        score: 0,
        flags: []
      };
    });

    // Detect concerns
    const flagCounts = {};
    const flaggedSentences = [];

    sentenceObjs.forEach((s) => {
      let score = 0;

      // Base score for summary
      if (s.text.length > 40) score += 1;
      if (s.text.length > 120) score += 1;

      // Important words
      const importantWords = [
        'collect',
        'use your information',
        'share your information',
        'sell your information',
        'personal data',
        'personal information',
        'cookies',
        'analytics',
        'advertising',
        'rights',
        'control',
        'delete',
        'retain',
        'security',
        'terminate',
        'dispute',
        'arbitration'
      ];
      importantWords.forEach((w) => {
        if (s.lc.includes(w)) {
          score += 1;
        }
      });

      // Patterns
      concernPatterns.forEach((pattern) => {
        let matchedForThisPattern = false;
        for (const kw of pattern.keywords) {
          if (s.lc.includes(kw.toLowerCase())) {
            matchedForThisPattern = true;
            break;
          }
        }
        if (matchedForThisPattern) {
          s.flags.push(pattern.id);
          score += pattern.weight;
          flagCounts[pattern.id] = (flagCounts[pattern.id] || 0) + 1;
        }
      });

      s.score = score;
      if (s.flags.length > 0) {
        flaggedSentences.push(s);
      }
    });

    // Build plain language summary from top scoring sentences
    const sortedForSummary = [...sentenceObjs].sort((a, b) => b.score - a.score);
    const summaryPieces = sortedForSummary.slice(0, 8);

    if (summaryPieces.length) {
      const summaryTexts = summaryPieces.map(s => s.text);
      setSummaryText('Quick overview.\n\n' + summaryTexts.join('\n\n'));
    } else {
      setSummaryText('The summarizer did not find any sentences worth highlighting with its basic scoring. You may want to skim the policy directly.');
    }

    // Build flag summary
    if (Object.keys(flagCounts).length === 0) {
      setFlagSummary([]);
      setFlagNote('No known red flag patterns detected based on this demo\'s simple keyword list. You still need to read the policy for nuance, context, and issues that are not covered here.');
      setClausesList([]);
    } else {
      setFlagNote('These themes are based on heuristic keyword matching and may not always reflect risk in your specific situation.');
      
      const flagList = Object.entries(flagCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([id, count]) => {
          const pattern = concernPatterns.find(p => p.id === id);
          return pattern ? { label: pattern.label, count } : null;
        })
        .filter(Boolean);
      
      setFlagSummary(flagList);

      // Show flagged sentences
      const maxClauseLines = 120;
      const limitedFlagged = flaggedSentences
        .slice()
        .sort((a, b) => a.index - b.index)
        .slice(0, maxClauseLines);

      const clauses = limitedFlagged.map((s) => {
        // Simple highlight: highlight first keyword of first matched pattern
        let highlighted = null;
        for (const pid of s.flags) {
          const patt = concernPatterns.find((p) => p.id === pid);
          if (!patt) continue;
          for (const kw of patt.keywords) {
            const idx = s.lc.indexOf(kw.toLowerCase());
            if (idx !== -1) {
              highlighted = { text: s.text, keyword: s.text.substring(idx, idx + kw.length), index: idx };
              break;
            }
          }
          if (highlighted) break;
        }
        
        return {
          index: s.index,
          text: s.text,
          highlighted
        };
      });

      setClausesList(clauses);

      if (flaggedSentences.length > maxClauseLines) {
        // Add note about truncation
        showNotification(`Showing first ${maxClauseLines} flagged sentences`);
      }
    }

    // Build data and tracking overview
    const lcWhole = cleaned.toLowerCase();
    const presentSignals = [];
    dataSignals.forEach((sig) => {
      let present = false;
      for (const kw of sig.keywords) {
        if (lcWhole.includes(kw.toLowerCase())) {
          present = true;
          break;
        }
      }
      if (present) {
        presentSignals.push(sig);
      }
    });

    if (presentSignals.length) {
      setDataOverview(
        'High level signals.\n\nThis policy mentions topics related to ' +
        presentSignals.map((s) => s.label.toLowerCase()).join(', ') +
        '. That does not mean those practices are harmful, but it is a useful nudge to read those sections carefully.'
      );
      setDataTags(presentSignals.map(s => s.label));
    } else {
      setDataOverview('No common tracking and data usage keywords from this demo\'s list were detected. That does not mean tracking is absent, only that the wording may be different from the phrases this page looks for.');
      setDataTags([]);
    }

    showNotification('Policy analysis complete');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFileName('');
      return;
    }

    setFileName(`${file.name} (${file.size} bytes)`);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result || '';
      setPolicyText(text);
      resetOutputs();
    };
    reader.readAsText(file);
  };

  const clearAll = () => {
    setPolicyText('');
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    resetOutputs();
    showNotification('Cleared all inputs');
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-8 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <FileText className="w-12 h-12 text-cyan-400" />
            <div>
              <div className="text-sm text-cyan-400 font-semibold mb-2">CyberLife Coach · Security Center Demo</div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Privacy Policy & Terms of Service Summarizer
              </h1>
              <p className="text-slate-400 mt-2">
                Paste a privacy policy or Terms of Service and this demo will surface a short plain language summary,
                highlight common concerning clauses, and give you a quick view of data collection and sharing topics.
                Everything runs locally in your browser and is meant as a highlighter, not a lawyer.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <div className="inline-flex items-center space-x-2 bg-green-900/20 border border-green-500/40 rounded-full px-4 py-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-green-400">Client-side only, no uploads</span>
            </div>
            <div className="inline-flex items-center space-x-2 bg-blue-900/20 border border-blue-500/40 rounded-full px-4 py-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-blue-400">Heuristic demo, not legal advice</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative max-w-7xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Input */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-2">1. Paste or upload a policy</h2>
              <p className="text-sm text-slate-400">Short to medium length policies work best.</p>
            </div>

            <p className="text-slate-300 text-sm mb-6">
              Use this helper on public, non confidential policies that you are allowed to review locally. It works best
              when you paste the text of a single privacy policy or Terms of Service at a time.
            </p>

            <div className="mb-4">
              <label className="block text-sm text-slate-400 mb-2">Paste policy text here</label>
              <textarea
                value={policyText}
                onChange={(e) => setPolicyText(e.target.value)}
                placeholder='Paste a privacy policy or Terms of Service here. For example start from headings such as "Information we collect", "How we use your information", or "Your rights and choices".'
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors min-h-[300px] resize-y"
              />
            </div>

            <div className="flex items-center gap-3 mb-6">
              <label className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all cursor-pointer flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Select text file…</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.md,.text,.html"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              {fileName && (
                <span className="text-sm text-slate-400">{fileName}</span>
              )}
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={analyzePolicy}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Summarize policy</span>
              </button>
              <button
                onClick={clearAll}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all flex items-center space-x-2"
              >
                <Trash2 className="w-5 h-5" />
                <span>Clear</span>
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div className="bg-cyan-900/10 border border-cyan-500/30 rounded-lg p-3 text-sm text-cyan-300">
                <strong>Tip.</strong> Try pasting from one service at a time instead of multiple websites.
              </div>
              <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-3 text-sm text-green-300">
                <strong>Safe.</strong> Text stays in your browser, nothing is sent to CyberLife Coach.
              </div>
            </div>

            <div className="bg-orange-900/10 border border-orange-500/30 rounded-lg p-4 text-sm text-orange-300">
              <strong>Important.</strong> This is a conceptual, AI lite demo. It uses keywords and simple pattern matching rather than full natural
              language understanding. It is intended to nudge you to read certain areas more carefully, not to certify a
              service as safe or unsafe.
            </div>
          </div>

          {/* Right: Results */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-2">2. Review the highlights</h2>
              <p className="text-sm text-slate-400">Summaries update after each analysis.</p>
            </div>

            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-slate-950 rounded-xl p-6 border border-slate-700">
                <div className="text-sm font-semibold text-cyan-400 mb-4">
                  SUMMARY <span className="text-slate-500">· Plain language snapshot</span>
                </div>
                <div className="text-slate-300 text-sm whitespace-pre-wrap">
                  {summaryText}
                </div>
              </div>

              {/* Potential Concerns */}
              <div className="bg-slate-950 rounded-xl p-6 border border-slate-700">
                <div className="text-sm font-semibold text-cyan-400 mb-4">
                  POTENTIAL CONCERNS <span className="text-slate-500">· Common red flag themes</span>
                </div>
                
                {flagSummary.length > 0 ? (
                  <>
                    <ul className="space-y-2 mb-4">
                      {flagSummary.map((flag, idx) => (
                        <li key={idx} className="flex justify-between items-start">
                          <span className="text-orange-400 font-medium">{flag.label}</span>
                          <span className="text-slate-500 text-xs">
                            ({flag.count} sentence{flag.count !== 1 ? 's' : ''} flagged)
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-slate-400 mb-4">{flagNote}</p>
                    
                    <div className="max-h-96 overflow-y-auto space-y-2 bg-slate-900 rounded-lg p-4 border border-slate-700">
                      {clausesList.map((clause, idx) => (
                        <div key={idx} className="text-sm">
                          <span className="text-cyan-400 font-mono">#{clause.index + 1}:</span>{' '}
                          <span className="text-slate-300">
                            {clause.highlighted ? (
                              <>
                                {clause.text.substring(0, clause.highlighted.index)}
                                <span className="bg-yellow-500/20 text-yellow-300 px-1 rounded">
                                  {clause.highlighted.keyword}
                                </span>
                                {clause.text.substring(clause.highlighted.index + clause.highlighted.keyword.length)}
                              </>
                            ) : (
                              clause.text
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-slate-400">{flagNote}</p>
                )}
              </div>

              {/* Data & Tracking */}
              <div className="bg-slate-950 rounded-xl p-6 border border-slate-700">
                <div className="text-sm font-semibold text-cyan-400 mb-4">
                  DATA & TRACKING <span className="text-slate-500">· Quick signal view</span>
                </div>
                <div className="text-slate-300 text-sm whitespace-pre-wrap mb-4">
                  {dataOverview}
                </div>
                {dataTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {dataTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Limitations */}
              <div className="bg-red-900/10 border border-red-500/30 rounded-xl p-6">
                <div className="text-sm font-semibold text-red-400 mb-4">
                  LIMITATIONS <span className="text-slate-500">· Read this before you trust it</span>
                </div>
                <div className="space-y-3 text-sm text-slate-300">
                  <p>
                    <strong className="text-red-400">This is not legal advice.</strong> It does not replace reading the policy yourself, talking to
                    a lawyer, or considering the laws that apply in your country or region.
                  </p>
                  <p>
                    The tool may miss important issues or over highlight harmless boilerplate. It does not understand your
                    specific risk, your business context, or how any clauses would be interpreted in court.
                  </p>
                  <p>
                    Treat the output as a reading aid that helps you decide where to slow down, not as a verdict about
                    whether using a service is acceptable for you or your organization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-12">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Important notice & Legal disclaimer:</strong> This Privacy Policy and Terms of Service Summarizer runs entirely in your browser. The text you paste or load
            into this page is not sent to CyberLife Coach, to browser vendors, or to any third party by this tool. No copy
            of your input is stored or logged by CyberLife Coach.
            <br /><br />
            This page is a conceptual, heuristic demo that uses keyword based pattern matching and simple scoring to surface
            sections that may deserve closer human review. It is not a lawyer, not a substitute for reading the original
            document, and not a source of legal, regulatory, or compliance advice. No warranty or guarantee is given that
            any clause will be detected or interpreted correctly.
            <br /><br />
            Always review the original policy, consider your own risk tolerance and regulatory obligations, and consult a
            qualified professional if you need legal or compliance guidance. By using this page, you agree that you are
            solely responsible for any decisions you make based on the results.
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
            <p className="text-slate-600">Analysis happens entirely in your browser. No data is sent anywhere.</p>
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
