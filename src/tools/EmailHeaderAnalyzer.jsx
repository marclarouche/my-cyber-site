import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';

export default function EmailHeaderAnalyzer() {
  const [headers, setHeaders] = useState('');
  const [redact, setRedact] = useState(true);
  const [analysis, setAnalysis] = useState(null);

  // Utility functions from original
  const unfold = (raw) => {
    if (!raw) return '';
    return raw.replace(/\r\n([\t ])/g, " $1").replace(/\n([\t ])/g, " $1");
  };

  const parseHeaders = (raw) => {
    const text = unfold(raw.trim());
    const lines = text.split(/\r?\n/);
    const headers = [];
    let cur = null;
    for (const line of lines) {
      const m = line.match(/^(.*?):\s*(.*)$/);
      if (m) {
        cur = { name: m[1].trim(), value: m[2] };
        headers.push(cur);
      } else if (/^\s+/.test(line) && cur) {
        cur.value += ' ' + line.trim();
      }
    }
    const map = new Map();
    for (const h of headers) {
      const key = h.name.toLowerCase();
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(h.value);
    }
    return { list: headers, map };
  };

  const parseAuthResults = (arVals) => {
    const res = { spf: null, dkim: null, dmarc: null, raw: arVals };
    if (!arVals) return res;
    const join = arVals.join(' \n ');
    const spf = join.match(/spf=(pass|fail|softfail|neutral)/i);
    const dkim = join.match(/dkim=(pass|fail|none)/i);
    const dmarc = join.match(/dmarc=(pass|fail|bestguesspass|none)/i);
    res.spf = spf ? spf[1].toLowerCase() : null;
    res.dkim = dkim ? dkim[1].toLowerCase() : null;
    res.dmarc = dmarc ? dmarc[1].toLowerCase() : null;
    return res;
  };

  const parseReceived = (recVals) => {
    if (!recVals) return [];
    const hops = recVals.map(v => v).reverse().map((v, idx) => {
      const from = (v.match(/from\s+([^;\n]+)/i) || [])[1] || '';
      const by = (v.match(/by\s+([^;\n]+)/i) || [])[1] || '';
      const withm = (v.match(/with\s+([^;\n]+)/i) || [])[1] || '';
      const dateStr = (v.split(';').slice(-1)[0] || '').trim();
      const at = Date.parse(dateStr) || null;
      const ip = (v.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/) || [])[0] || '';
      return { i: idx + 1, from: from.trim(), by: by.trim(), with: withm.trim(), at, raw: v.trim(), ip };
    });
    for (let i = 1; i < hops.length; i++) {
      const prev = hops[i - 1];
      const cur = hops[i];
      if (prev.at && cur.at) {
        cur.deltaSec = Math.round((cur.at - prev.at) / 1000);
      } else {
        cur.deltaSec = null;
      }
    }
    return hops;
  };

  const redactText = (s) => {
    return s
      .replace(/[A-Z0-9._%+-]+@([A-Z0-9.-]+\.[A-Z]{2,})/gi, (m, dom) => {
        const name = m.split('@')[0];
        return name.slice(0, 1) + "***@" + dom;
      })
      .replace(/\b(\d{1,3}\.){3}\d{1,3}\b/g, ip => ip.split('.').map((p, i) => i < 2 ? p : 'x').join('.'));
  };

  const domainOfEmail = (h) => {
    const m = (h || '').match(/[<\(]?([A-Z0-9._%+-]+)@([A-Z0-9.-]+\.[A-Z]{2,})/i);
    return m ? m[2].toLowerCase() : null;
  };

  const domainOfMsgId = (h) => {
    const m = (h || '').match(/@([A-Z0-9.-]+\.[A-Z]{2,})>/i);
    return m ? m[1].toLowerCase() : null;
  };

  const scoreFindings = ({ auth, keys, hops }) => {
    let score = 0;
    const notes = [];
    if (auth.spf === 'fail') { score += 30; notes.push({ sev: 'bad', msg: 'SPF failed' }); }
    else if (auth.spf === 'softfail') { score += 15; notes.push({ sev: 'warn', msg: 'SPF softfail' }); }
    if (auth.dkim === 'fail') { score += 25; notes.push({ sev: 'bad', msg: 'DKIM failed' }); }
    if (auth.dmarc === 'fail') { score += 35; notes.push({ sev: 'bad', msg: 'DMARC failed' }); }

    const fromDom = domainOfEmail(keys.from);
    const rpathDom = domainOfEmail(keys.returnpath);
    const replyDom = domainOfEmail(keys.replyto);
    const msgidDom = domainOfMsgId(keys.msgid);

    if (fromDom && rpathDom && fromDom !== rpathDom) {
      score += 15; notes.push({ sev: 'warn', msg: `From domain ${fromDom} differs from Return-Path ${rpathDom}` });
    }
    if (fromDom && replyDom && replyDom !== fromDom) {
      score += 15; notes.push({ sev: 'warn', msg: `Reply-To domain ${replyDom} differs from From ${fromDom}` });
    }
    if (fromDom && msgidDom && msgidDom !== fromDom) {
      score += 5; notes.push({ sev: 'warn', msg: `Message-ID domain ${msgidDom} differs from From ${fromDom}` });
    }

    for (const h of hops) {
      if (typeof h.deltaSec === 'number' && Math.abs(h.deltaSec) > 3600) {
        score += 10; notes.push({ sev: 'warn', msg: 'Unusual gap between hops > 60 minutes' }); break;
      }
    }

    let label = 'Unknown', badge = 'warn';
    if (score <= 10) { label = 'Low risk'; badge = 'ok' }
    else if (score <= 35) { label = 'Caution'; badge = 'warn' }
    else { label = 'Suspicious'; badge = 'bad' }

    return { score, label, badge, notes };
  };

  const analyze = () => {
    const raw = headers.trim();
    if (!raw) {
      alert('Please paste full raw headers first.');
      return;
    }

    const { map } = parseHeaders(raw);
    const auth = parseAuthResults(map.get('authentication-results'));
    const rec = parseReceived(map.get('received'));
    const keys = {
      from: (map.get('from') || [''])[0] || '',
      replyto: (map.get('reply-to') || [''])[0] || '',
      returnpath: (map.get('return-path') || [''])[0] || '',
      sender: (map.get('sender') || [''])[0] || '',
      msgid: (map.get('message-id') || [''])[0] || '',
      subject: (map.get('subject') || [''])[0] || '',
      date: (map.get('date') || [''])[0] || ''
    };

    const scored = scoreFindings({ auth, keys, hops: rec });

    setAnalysis({
      scored,
      auth,
      keys,
      hops: rec
    });
  };

  const loadDemo = () => {
    const demo = `Delivered-To: user@example.com
Received: by mx.google.com with SMTP id demo12345; Fri, 03 Oct 2025 11:24:59 -0700 (PDT)
Received: from mail.sender.example (mail.sender.example. [203.0.113.45]) by mx.google.com with ESMTPS id demo-in-1 for <user@example.com>; Fri, 03 Oct 2025 11:24:20 -0700 (PDT)
Return-Path: <bounce@mailer.sender.example>
From: "Sender Support" <support@sender.example>
Reply-To: "Support" <noreply@forms.example>
Subject: Your account alert
Message-ID: <CAF12345@mail.sender.example>
Date: Fri, 03 Oct 2025 18:24:18 +0000
Authentication-Results: mx.google.com; spf=softfail (google.com: domain of transitioning bounce@mailer.sender.example does not designate 203.0.113.45 as permitted sender) smtp.mailfrom=bounce@mailer.sender.example; dkim=pass header.i=@sender.example header.s=default header.b=ABC123; dmarc=none (p=none dis=none) header.from=sender.example`;
    setHeaders(demo);
    // Auto-analyze after loading demo
    setTimeout(() => {
      const raw = demo.trim();
      const { map } = parseHeaders(raw);
      const auth = parseAuthResults(map.get('authentication-results'));
      const rec = parseReceived(map.get('received'));
      const keys = {
        from: (map.get('from') || [''])[0] || '',
        replyto: (map.get('reply-to') || [''])[0] || '',
        returnpath: (map.get('return-path') || [''])[0] || '',
        sender: (map.get('sender') || [''])[0] || '',
        msgid: (map.get('message-id') || [''])[0] || '',
        subject: (map.get('subject') || [''])[0] || '',
        date: (map.get('date') || [''])[0] || ''
      };
      const scored = scoreFindings({ auth, keys, hops: rec });
      setAnalysis({ scored, auth, keys, hops: rec });
    }, 100);
  };

  const clearAll = () => {
    setHeaders('');
    setAnalysis(null);
  };

  const getBadgeClass = (badge) => {
    if (badge === 'ok') return 'bg-green-500/20 text-green-300 border-green-500/40';
    if (badge === 'warn') return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
    if (badge === 'bad') return 'bg-red-500/20 text-red-300 border-red-500/40';
    return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
  };

  const getSevBadgeClass = (sev) => {
    if (sev === 'ok') return 'bg-green-500/20 text-green-300 border-green-500/40';
    if (sev === 'warn') return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
    if (sev === 'bad') return 'bg-red-500/20 text-red-300 border-red-500/40';
    return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/tools" className="flex items-center space-x-3 group cursor-pointer">
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

      {/* Hero/Header */}
      <section className="relative pt-32 pb-8 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <Mail className="w-12 h-12 text-cyan-400" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Email Header Analyzer
              </h1>
              <p className="text-slate-400 mt-2">Private, client-side analysis — no data leaves this page</p>
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="px-4 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={loadDemo}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
              title="Load a safe sample header for testing"
            >
              Load Sample
            </button>
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
            >
              Clear
            </button>
            <button
              onClick={analyze}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg text-white font-semibold transition-all shadow-lg shadow-cyan-500/25"
            >
              Analyze Headers
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Input Section */}
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
              <label className="block text-sm text-slate-400 mb-2">Paste full raw headers here</label>
              <textarea
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
                placeholder="Paste the full raw email headers... e.g. Delivered-To, Received, From, Return-Path, Message-ID, Authentication-Results, etc."
                className="w-full h-64 bg-slate-950 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 font-mono text-sm resize-none"
              />
              <div className="mt-3">
                <label className="flex items-center space-x-2 text-sm text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={redact}
                    onChange={(e) => setRedact(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
                  />
                  <span>Redact emails and IPs in outputs</span>
                </label>
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-sm text-slate-400 mb-1">Overall risk</div>
                  <div className="text-5xl font-black text-slate-100">
                    {analysis ? analysis.scored.score : '—'}
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-lg border text-sm font-semibold ${analysis ? getBadgeClass(analysis.scored.badge) : 'bg-slate-500/20 text-slate-300 border-slate-500/40'}`}>
                  {analysis ? analysis.scored.label : 'N/A'}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                  <div className="text-xs text-slate-400 mb-1">SPF</div>
                  <div className="text-lg font-bold text-slate-200">
                    {analysis ? (analysis.auth.spf || 'n/a') : 'n/a'}
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                  <div className="text-xs text-slate-400 mb-1">DKIM</div>
                  <div className="text-lg font-bold text-slate-200">
                    {analysis ? (analysis.auth.dkim || 'n/a') : 'n/a'}
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                  <div className="text-xs text-slate-400 mb-1">DMARC</div>
                  <div className="text-lg font-bold text-slate-200">
                    {analysis ? (analysis.auth.dmarc || 'n/a') : 'n/a'}
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-400">
                This quick score is a heuristic. Always corroborate with content and context.
              </div>
            </div>
          </div>

          {/* Findings */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Findings</h2>
            {!analysis ? (
              <p className="text-sm text-slate-400">No analysis yet.</p>
            ) : analysis.scored.notes.length === 0 ? (
              <div className="flex items-start space-x-3">
                <span className={`px-3 py-1 rounded-lg border text-sm font-semibold ${getBadgeClass('ok')}`}>
                  No obvious red flags found
                </span>
                <span className="text-sm text-slate-400">
                  This does not guarantee the message is safe. Consider content and context.
                </span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-2 px-3 text-slate-400 font-semibold">Severity</th>
                      <th className="text-left py-2 px-3 text-slate-400 font-semibold">Observation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.scored.notes.map((note, idx) => (
                      <tr key={idx} className="border-b border-slate-800">
                        <td className="py-3 px-3">
                          <span className={`px-3 py-1 rounded-lg border text-xs font-semibold uppercase ${getSevBadgeClass(note.sev)}`}>
                            {note.sev}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-300">{note.msg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Received Path */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Received Path</h2>
            {!analysis || analysis.hops.length === 0 ? (
              <p className="text-sm text-slate-400">No hops parsed yet.</p>
            ) : (
              <div className="space-y-3">
                {analysis.hops.map((hop) => {
                  const raw = redact ? redactText(hop.raw) : hop.raw;
                  const delta = hop.deltaSec == null ? '—' : (hop.deltaSec > 0 ? '+' + hop.deltaSec : hop.deltaSec) + 's';
                  return (
                    <details key={hop.i} className="bg-slate-800/50 rounded-lg p-4">
                      <summary className="cursor-pointer text-sm font-semibold text-slate-200 hover:text-cyan-400 transition-colors">
                        <strong>Hop {hop.i}</strong> from <code className="text-cyan-400">{hop.from || ''}</code> to{' '}
                        <code className="text-cyan-400">{hop.by || ''}</code>
                        {hop.with && <> via <code className="text-cyan-400">{hop.with}</code></>}
                        {hop.at && <> at <code className="text-slate-400">{new Date(hop.at).toString()}</code></>}
                        <span className="text-slate-500 ml-2">Δ {delta}</span>
                      </summary>
                      <pre className="mt-3 text-xs text-slate-400 whitespace-pre-wrap break-words bg-slate-950 p-3 rounded border border-slate-700">
                        {raw}
                      </pre>
                    </details>
                  );
                })}
              </div>
            )}
          </div>

          {/* Key Header Fields */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Key Header Fields</h2>
            {!analysis ? (
              <p className="text-sm text-slate-400">—</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-2 px-3 text-slate-400 font-semibold">Field</th>
                      <th className="text-left py-2 px-3 text-slate-400 font-semibold">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['From', analysis.keys.from],
                      ['Reply-To', analysis.keys.replyto],
                      ['Return-Path', analysis.keys.returnpath],
                      ['Sender', analysis.keys.sender],
                      ['Message-ID', analysis.keys.msgid],
                      ['Subject', analysis.keys.subject],
                      ['Date', analysis.keys.date]
                    ].map(([field, value]) => (
                      <tr key={field} className="border-b border-slate-800">
                        <td className="py-3 px-3 text-slate-300 font-semibold">{field}</td>
                        <td className="py-3 px-3 text-slate-400 break-all">
                          {redact ? redactText(value || '') : (value || '')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* How to Read Email Headers */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">How to Read Email Headers</h2>
            <p className="text-sm text-slate-400 mb-4">
              Start with authentication, then trace delivery, then compare identities.
            </p>
            <div className="space-y-3">
              <details open className="bg-slate-800/50 rounded-lg p-4">
                <summary className="cursor-pointer text-sm font-semibold text-slate-200 hover:text-cyan-400 transition-colors">
                  Step 1. Check authentication results
                </summary>
                <p className="mt-2 text-sm text-slate-400">
                  Look for <code className="text-cyan-400">Authentication-Results</code> or{' '}
                  <code className="text-cyan-400">Received-SPF</code>. You want SPF, DKIM, and DMARC to pass. 
                  Fails or softfails increase risk. A pass does not guarantee safety if alignment is off.
                </p>
              </details>

              <details className="bg-slate-800/50 rounded-lg p-4">
                <summary className="cursor-pointer text-sm font-semibold text-slate-200 hover:text-cyan-400 transition-colors">
                  Step 2. Trace the delivery path
                </summary>
                <p className="mt-2 text-sm text-slate-400">
                  Read <code className="text-cyan-400">Received:</code> headers from bottom to top. Confirm the first 
                  public facing server for the sending domain and watch for sudden jumps, private addresses exposed to 
                  the public internet, and unusual time gaps.
                </p>
              </details>

              <details className="bg-slate-800/50 rounded-lg p-4">
                <summary className="cursor-pointer text-sm font-semibold text-slate-200 hover:text-cyan-400 transition-colors">
                  Step 3. Compare identities
                </summary>
                <p className="mt-2 text-sm text-slate-400">
                  Compare domains across <code className="text-cyan-400">From</code>,{' '}
                  <code className="text-cyan-400">Return-Path</code>,{' '}
                  <code className="text-cyan-400">Reply-To</code>, and the domain in{' '}
                  <code className="text-cyan-400">Message-ID</code>. Mismatches can be benign forwarding or signs of spoofing.
                </p>
              </details>

              <details className="bg-slate-800/50 rounded-lg p-4">
                <summary className="cursor-pointer text-sm font-semibold text-slate-200 hover:text-cyan-400 transition-colors">
                  Step 4. Consider context
                </summary>
                <p className="mt-2 text-sm text-slate-400">
                  Even with clean headers, unexpected invoices, password resets, or urgent requests can still be malicious. 
                  Verify through a known channel before acting.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8 px-4">
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
          </div>
        </div>
      </footer>
    </div>
  );
}
