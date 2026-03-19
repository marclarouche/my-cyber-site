import React from 'react';
import { Globe, ArrowLeft, Shield, AlertTriangle, CheckCircle, Eye, Link as LinkIcon, Lock } from 'lucide-react';

export default function AboutURLRiskReview() {
  const handleOpenTool = () => {
    window.location.href = '/tools/url-risk-review';
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
              Security Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              URL Safety
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            URL Safety Basics
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            A quick, practical guide to spotting risky links before you click.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Client-Side Notice */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-semibold text-blue-300 mb-2">Note</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  This page is client-side only. It does not collect or transmit any data.
                </p>
              </div>
            </div>
          </div>

          {/* How to Read a URL */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              How to Read a URL
            </h2>
            <p className="text-slate-500 mb-6 italic">
              Focus on the <strong className="text-slate-400">registered domain</strong> and treat everything else as noise.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Good Example */}
              <div className="bg-slate-950 border border-green-700/50 rounded-lg p-6">
                <pre className="text-xs text-cyan-300 font-mono mb-4 overflow-x-auto whitespace-pre-wrap break-all">
                  https://<span className="text-green-400 font-bold">login</span>.<span className="text-green-400 font-bold">paypal</span>.<span className="text-green-400 font-bold">com</span>/security?ref=email
                </pre>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-slate-300">Registered domain:</strong> paypal.com</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-slate-300">Subdomain:</strong> login (owned by paypal.com)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-slate-300">Scheme:</strong> https (encrypted)</span>
                  </li>
                </ul>
              </div>

              {/* Bad Example */}
              <div className="bg-slate-950 border border-red-700/50 rounded-lg p-6">
                <pre className="text-xs text-cyan-300 font-mono mb-4 overflow-x-auto whitespace-pre-wrap break-all">
                  https://<span className="text-red-400 font-bold">paypal-secure-login</span>.<span className="text-red-400 font-bold">support</span>.<span className="text-yellow-400 font-bold">example</span>.<span className="text-yellow-400 font-bold">com</span>/
                </pre>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-start">
                    <AlertTriangle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Looks like PayPal, but the registered domain is <strong className="text-red-400">example.com</strong></span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Words to the left of the domain can mislead</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* High-Risk Signals */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              High-Risk Signals
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Signal</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Why it matters</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Example</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400">
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">"@" in the authority</td>
                    <td className="py-3 px-4">Everything before "@" can be a decoy; the real host is to the right</td>
                    <td className="py-3 px-4">
                      <code className="text-xs text-red-400 font-mono bg-slate-950 px-2 py-1 rounded break-all">
                        https://secure-login.paypal.com@evil.example.net/
                      </code>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">Internationalized or look-alike characters</td>
                    <td className="py-3 px-4">Homoglyphs (e.g., l vs I) and IDNs can mimic trusted brands</td>
                    <td className="py-3 px-4">
                      <code className="text-xs text-red-400 font-mono bg-slate-950 px-2 py-1 rounded break-all">
                        https://paypaI-login.example.net/
                      </code>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">URL shorteners</td>
                    <td className="py-3 px-4">Hide the destination; often used to bypass filters</td>
                    <td className="py-3 px-4">
                      <code className="text-xs text-red-400 font-mono bg-slate-950 px-2 py-1 rounded break-all">
                        https://bit.ly/abc123
                      </code>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">IP-literal hosts</td>
                    <td className="py-3 px-4">No clear brand identity</td>
                    <td className="py-3 px-4">
                      <code className="text-xs text-red-400 font-mono bg-slate-950 px-2 py-1 rounded break-all">
                        http://185.199.110.153/signin
                      </code>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">Uncommon ports</td>
                    <td className="py-3 px-4">Legit sites rarely need ports other than 443/80</td>
                    <td className="py-3 px-4">
                      <code className="text-xs text-red-400 font-mono bg-slate-950 px-2 py-1 rounded break-all">
                        https://login.example.com:8080/
                      </code>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">Suspicious keywords</td>
                    <td className="py-3 px-4">"verify", "reset", "secure", "appeal", "invoice", etc. in path or query</td>
                    <td className="py-3 px-4">
                      <code className="text-xs text-red-400 font-mono bg-slate-950 px-2 py-1 rounded break-all">
                        https://brand.example.com/support/verify-account
                      </code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Five-Second URL Check */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Five-Second URL Check
            </h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span>Read the domain from right to left and stop at the last two labels, e.g., <code className="text-cyan-300 font-mono bg-slate-950 px-2 py-1 rounded text-sm">example.com</code></span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span>Ignore everything before the domain, especially if you see words like "secure" or brand names</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span>Hover to preview the real destination before you click</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span>If a link came from email or text, navigate to the site manually instead</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span>When in doubt, use the <strong className="text-cyan-300">URL Risk Checker</strong> to inspect static signals offline</span>
              </li>
            </ul>
          </div>

          {/* About URL Schemes */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              About URL Schemes
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Common Schemes */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Common</h3>
                <ul className="space-y-2 text-slate-400">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-slate-300 font-mono">https://</strong> encrypted web</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-slate-300 font-mono">http://</strong> unencrypted, avoid for logins</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-slate-300 font-mono">mailto:</strong> opens your email app</span>
                  </li>
                </ul>
              </div>

              {/* Be Cautious */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-yellow-400">Be Cautious</h3>
                <ul className="space-y-2 text-slate-400">
                  <li className="flex items-start">
                    <AlertTriangle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-slate-300 font-mono">javascript:</strong> can execute code</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-slate-300 font-mono">data:</strong> embeds content directly</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-slate-300 font-mono">file:</strong> local file access; should not appear on websites</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tracking Parameters to Know */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Tracking Parameters to Know
            </h2>
            <p className="text-slate-500 mb-4 italic">
              These don't always mean "phish," but they add noise and can expose personal data if shared.
            </p>
            <pre className="text-sm text-cyan-300 font-mono bg-slate-950 border border-slate-700 rounded-lg p-4 mb-4 overflow-x-auto">
              utm_source, utm_campaign, gclid, fbclid, mc_eid, msclkid, ref, affiliate, session, token
            </pre>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span>Remove trackers before sharing a link</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span>Avoid clicking shortened links that add or hide trackers</span>
              </li>
            </ul>
          </div>

          {/* Common Parameters Explained */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent flex items-center">
              <span className="mr-2">🧩</span> Common Parameters Explained
            </h2>
            <p className="text-slate-500 mb-6 italic">
              These don't always mean phishing, but they can reveal tracking data and sometimes personal information if shared.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Parameter</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Platform / Meaning</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Purpose</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400">
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">
                      <code className="text-cyan-300 font-mono text-sm">utm_source</code>,{' '}
                      <code className="text-cyan-300 font-mono text-sm">utm_medium</code>,{' '}
                      <code className="text-cyan-300 font-mono text-sm">utm_campaign</code>
                    </td>
                    <td className="py-3 px-4">Google Analytics (Urchin Tracking Module)</td>
                    <td className="py-3 px-4">Identify which email, ad, or post brought you to a site.</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">
                      <code className="text-cyan-300 font-mono text-sm">gclid</code>
                    </td>
                    <td className="py-3 px-4">Google Ads Click ID</td>
                    <td className="py-3 px-4">Connects ad clicks to Google Ads conversions.</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">
                      <code className="text-cyan-300 font-mono text-sm">fbclid</code>
                    </td>
                    <td className="py-3 px-4">Facebook Click ID</td>
                    <td className="py-3 px-4">Tracks users clicking outbound links from Facebook.</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">
                      <code className="text-cyan-300 font-mono text-sm">mc_eid</code>
                    </td>
                    <td className="py-3 px-4">Mailchimp Email ID</td>
                    <td className="py-3 px-4">Identifies which subscriber opened a newsletter link.</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">
                      <code className="text-cyan-300 font-mono text-sm">msclkid</code>
                    </td>
                    <td className="py-3 px-4">Microsoft Ads Click ID</td>
                    <td className="py-3 px-4">Used by Bing Ads to attribute conversions.</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">
                      <code className="text-cyan-300 font-mono text-sm">ref</code>
                    </td>
                    <td className="py-3 px-4">Referral Code</td>
                    <td className="py-3 px-4">Indicates where the visitor came from (affiliate, forum, etc.).</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">
                      <code className="text-cyan-300 font-mono text-sm">affiliate</code>
                    </td>
                    <td className="py-3 px-4">Affiliate / Partner ID</td>
                    <td className="py-3 px-4">Identifies which partner referred the sale for commission.</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">
                      <code className="text-cyan-300 font-mono text-sm">session</code>,{' '}
                      <code className="text-cyan-300 font-mono text-sm">token</code>
                    </td>
                    <td className="py-3 px-4">Session or temporary identifiers</td>
                    <td className="py-3 px-4">Track sessions or authenticate users, sometimes leaking unique IDs if shared.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6">
              <div className="flex items-start space-x-3">
                <Lock className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-blue-300 mb-2">🔒 Tip</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    You can safely remove these parameters before sharing a link — everything after the{' '}
                    <code className="text-cyan-300 font-mono bg-slate-950 px-2 py-1 rounded">?</code> is usually optional.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What To Do If a Link Looks Suspicious */}
          <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl border border-yellow-500/30 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
              <h2 className="text-3xl font-bold text-yellow-300">
                What To Do If a Link Looks Suspicious
              </h2>
            </div>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start">
                <span className="text-red-400 mr-3 text-xl">✕</span>
                <span>Do not enter credentials or MFA codes</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 text-xl">✕</span>
                <span>Close the tab and navigate to the site manually</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 text-xl">✕</span>
                <span>Use a separate device or VM if you must investigate</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 text-xl">✕</span>
                <span>Report the message to your provider or security team</span>
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <Globe className="w-5 h-5" />
              <span>Open URL Risk Tool</span>
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
              <strong className="text-cyan-400">Legal Disclaimer and Important Notice:</strong> This page is provided for educational purposes only. CyberLifeCoach and its affiliates make no warranties regarding completeness or accuracy.
              Always verify domains and context through trusted channels before entering credentials, payment details, or MFA codes.
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
            <p>&copy; {new Date().getFullYear()} CyberLifeCoach</p>
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
