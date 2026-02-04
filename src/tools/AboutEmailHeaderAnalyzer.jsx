import React from 'react';
import { Mail, ArrowLeft, AlertTriangle, Shield, CheckCircle, Clock, Eye } from 'lucide-react';

export default function AboutEmailHeaderAnalyzer() {
  const handleOpenTool = () => {
    window.location.href = '/tools/email-header-analyzer';
  };

  const handlePrint = () => {
    window.print();
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

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
              Email Security Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Header Analysis
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            How to Read Email Headers Manually
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            A practical, print-friendly guide to verifying sender identity, tracing delivery paths, and spotting red flags using the raw header.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-8 mb-8">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-cyan-300">Why This Matters</h2>
                <p className="text-slate-300 leading-relaxed">
                  Phishing messages are designed to make the content look trustworthy. The header tells you what actually happened.
                  It shows which servers handled the message, how long each hop took, and whether authentication checks passed.
                  If the body can mislead, the header is the audit trail.
                </p>
              </div>
            </div>
          </div>

          {/* What an Email Header Is */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              What an Email Header Is
            </h2>
            <p className="text-slate-400 leading-relaxed">
              The header is a block of metadata attached to every message. It lists the route the message took, which servers relayed it,
              when each hop occurred, and what authentication results were recorded. You can read it with no special tools, although a viewer
              helps format the output.
            </p>
          </div>

          {/* How to Copy the Full Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              How to Copy the Full Header
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Gmail on the web</h3>
                <ol className="space-y-3 text-slate-400">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">1.</span>
                    <span>Open the message.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">2.</span>
                    <span>Select the three dots menu near the reply button.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">3.</span>
                    <span>Choose <strong className="text-slate-300">Show original</strong>.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">4.</span>
                    <span>Click <strong className="text-slate-300">Copy to clipboard</strong> to capture the raw header.</span>
                  </li>
                </ol>
              </div>

              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Outlook on the web</h3>
                <ol className="space-y-3 text-slate-400">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">1.</span>
                    <span>Open the message.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">2.</span>
                    <span>Select the three dots menu at the top right.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">3.</span>
                    <span>Choose <strong className="text-slate-300">View</strong>, then <strong className="text-slate-300">View message details</strong> or <strong className="text-slate-300">View source</strong>.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">4.</span>
                    <span>Copy the header text.</span>
                  </li>
                </ol>
              </div>

              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Apple Mail (macOS)</h3>
                <ol className="space-y-3 text-slate-400">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">1.</span>
                    <span>Open the message.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">2.</span>
                    <span>From the menu bar, choose <strong className="text-slate-300">View</strong>, then <strong className="text-slate-300">Message</strong>, then <strong className="text-slate-300">All Headers</strong> or <strong className="text-slate-300">Raw Source</strong>.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">3.</span>
                    <span>Copy the full header block.</span>
                  </li>
                </ol>
              </div>

              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Outlook desktop</h3>
                <ol className="space-y-3 text-slate-400">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">1.</span>
                    <span>Open the message in its own window.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">2.</span>
                    <span>Select <strong className="text-slate-300">File</strong>, then <strong className="text-slate-300">Properties</strong>.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 font-semibold">3.</span>
                    <span>Copy everything in the <strong className="text-slate-300">Internet headers</strong> box.</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* What to Look For */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              What to Look For
            </h2>

            {/* 1. Authentication Results */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="w-6 h-6 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">1. Authentication Results</h3>
              </div>
              <p className="text-slate-500 mb-4 italic">These fields indicate whether the sending infrastructure is authorized to use the visible domain.</p>
              <ul className="space-y-2 text-slate-400 mb-4">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span><strong className="text-slate-300">SPF</strong> checks the sending IP against the domain's authorized list.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span><strong className="text-slate-300">DKIM</strong> verifies a cryptographic signature tied to the domain.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span><strong className="text-slate-300">DMARC</strong> states policy alignment and final pass or fail.</span>
                </li>
              </ul>
              
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-4 mb-4 overflow-x-auto">
                <pre className="text-xs text-cyan-300 font-mono whitespace-pre">
{`Authentication-Results: mx.example.net;
  spf=pass smtp.mailfrom=paypal.com;
  dkim=pass header.d=paypal.com;
  dmarc=pass (p=reject) header.from=paypal.com`}
                </pre>
              </div>

              <p className="text-slate-400">
                A consistent pass on all three is a good sign. A softfail or fail can be legitimate in rare forwarding cases, but in combination
                with other anomalies it raises risk.
              </p>
            </div>

            {/* 2. Identity Consistency */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-3">
                <CheckCircle className="w-6 h-6 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">2. Identity Consistency</h3>
              </div>
              <p className="text-slate-500 mb-4 italic">Compare the visible sender to the technical senders.</p>
              <ul className="space-y-2 text-slate-400 mb-4">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span><strong className="text-slate-300">From</strong> should match the organization you expect.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span><strong className="text-slate-300">Return-Path</strong> shows the bounce address. Large mismatches are suspicious.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span><strong className="text-slate-300">Sender</strong> and <strong className="text-slate-300">Reply-To</strong> should make sense for the brand.</span>
                </li>
              </ul>

              <div className="bg-slate-950 border border-slate-700 rounded-lg p-4 mb-4 overflow-x-auto">
                <pre className="text-xs text-cyan-300 font-mono whitespace-pre">
{`From: "PayPal" <service@paypal.com>
Reply-To: billing@random-domain.example
Return-Path: bounce@mailer.paypal.com`}
                </pre>
              </div>

              <p className="text-slate-400">
                A Reply-To on a different, unrelated domain often indicates a lure that diverts responses away from the brand.
              </p>
            </div>

            {/* 3. The Received Chain */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-6 h-6 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">3. The Received Chain</h3>
              </div>
              <p className="text-slate-500 mb-4 italic">Each mail server inserts a new <code className="text-cyan-400 bg-slate-800 px-2 py-1 rounded">Received:</code> line at the top. Read from bottom to top to trace the route.</p>

              <div className="bg-slate-950 border border-slate-700 rounded-lg p-4 mb-4 overflow-x-auto">
                <pre className="text-xs text-cyan-300 font-mono whitespace-pre">
{`Received: from mta-1.origin.example (203.0.113.10) by relay-2.example;
        Wed, 08 Oct 2025 10:14:00 -0700
Received: from relay-2.example by mx.yourdomain.net;
        Wed, 08 Oct 2025 10:14:05 -0700`}
                </pre>
              </div>

              <ul className="space-y-2 text-slate-400">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Look for unrecognized hosts that do not match the sender's infrastructure.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Watch timing gaps. Large unexplained delays can indicate relaying or manipulation.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Check private or reserved IPs that should not appear as public senders.</span>
                </li>
              </ul>
            </div>

            {/* 4. Message-ID and Date */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-3">
                <Eye className="w-6 h-6 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">4. Message-ID and Date</h3>
              </div>
              <p className="text-slate-400">
                <strong className="text-slate-300">Message-ID</strong> format usually reflects the sending system. Completely generic or malformed IDs can be a sign of poor infrastructure.
                A <strong className="text-slate-300">Date</strong> that disagrees with the Received timestamps is also suspicious.
              </p>
            </div>

            {/* 5. Red Flags */}
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h3 className="text-2xl font-bold text-white">5. Red Flags That Deserve Extra Caution</h3>
              </div>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>Authentication failures together with a Reply-To on a different domain.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>Links that differ from the brand's real domains.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>Requests for urgent action, gift cards, wire changes, or password resets you did not initiate.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Manual Workflow */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Quick Manual Workflow
            </h2>
            <ol className="space-y-4 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold text-xl">1.</span>
                <span>Copy the full header.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold text-xl">2.</span>
                <span>Check SPF, DKIM, and DMARC results.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold text-xl">3.</span>
                <span>Compare From, Reply-To, Return-Path, and Sender for consistency.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold text-xl">4.</span>
                <span>Read the Received chain from bottom to top and confirm the route is plausible.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold text-xl">5.</span>
                <span>Evaluate Message-ID and Date for normal formatting and alignment.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold text-xl">6.</span>
                <span>Decide. If multiple anomalies appear, treat the message as suspicious and verify through another channel.</span>
              </li>
            </ol>
          </div>

          {/* Using the Analyzer */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 text-cyan-300">
              Using the CyberLifeCoach Analyzer
            </h2>
            <p className="text-slate-300 leading-relaxed">
              You can validate your manual reading with the free analyzer. It runs entirely in your browser, processes data locally, and never uploads headers to a server.
              It summarizes SPF, DKIM, DMARC, highlights identity mismatches, and formats the Received chain with timing deltas.
            </p>
          </div>

          {/* Privacy Tips */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Privacy Tips When Sharing Headers
            </h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Headers may contain your email address and sometimes IP addresses. Redact personal details before posting screenshots.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>If you need help from a colleague, share only the header text, avoid attachments you cannot verify.</span>
              </li>
            </ul>
          </div>

          {/* Practice Example */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Practice Example
            </h2>
            <p className="text-slate-500 mb-4 italic">This is a small, synthetic snippet you can read without risk.</p>

            <div className="bg-slate-950 border border-slate-700 rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-xs text-cyan-300 font-mono whitespace-pre">
{`From: "Service" <notice@example-payments.com>
Reply-To: helpdesk@payments-support.example
Return-Path: bounces@mail.example-payments.com
Authentication-Results: mx.yourdomain.net; spf=softfail; dkim=fail; dmarc=fail
Received: from userpc.lan (192.0.2.20) by relay-unknown.example; Wed, 08 Oct 2025 10:11:02 -0700
Received: from relay-unknown.example by mx.yourdomain.net; Wed, 08 Oct 2025 10:12:10 -0700
Message-ID: <abc123@unknown>
Date: Wed, 08 Oct 2025 10:12:05 -0700`}
              </pre>
            </div>

            <p className="text-slate-400 leading-relaxed">
              Here, multiple signals align: failures on SPF, DKIM, and DMARC, an off-brand Reply-To, a private LAN address appearing as a sender,
              and a route through an unknown relay. Treat as suspicious and verify directly with the brand through a trusted channel.
            </p>
          </div>

          {/* Decision Reminder */}
          <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl border border-yellow-500/30 p-8 mb-8">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-yellow-300">Decision Reminder</h3>
                <p className="text-slate-300 leading-relaxed">
                  When in doubt, do not click links or open attachments. Contact the sender through a known address or log in directly by typing the site's URL yourself.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <Mail className="w-5 h-5" />
              <span>Open the Analyzer Tool</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print This Guide</span>
            </button>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer and Important Notice:</strong> This page and the Email Header Analyzer are provided for informational and educational purposes only.
              They do not constitute legal advice, security guarantees, or professional forensic analysis.
              Email headers can vary widely depending on mail providers, forwarding behavior, and security gateways.
              Always validate findings using multiple signals, trusted verification channels, and organizational policies
              before making security or business decisions. This tool is provided to assist with learning and investigation. It should never be your sole source of verification.
              Always confirm sender legitimacy using multiple sources, including direct domain lookup, official contact verification,
              and common sense review of message context.
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
