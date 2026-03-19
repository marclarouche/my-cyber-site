import React from 'react';
import { Footprints, ArrowLeft, Shield, AlertTriangle, CheckCircle, Lock, Eye, Search, Database, Printer } from 'lucide-react';

export default function AboutDigitalFootprintScanner() {
  const handleOpenTool = () => {
    window.location.href = '/tools/digital-footprint-scanner';
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
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
              Privacy Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Digital Privacy
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Understanding Your Digital Footprint
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            A practical guide to what a digital footprint is, how it gets built without your knowledge, and how to measure and reduce it
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">

          {/* Lead */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-8 mb-8">
            <p className="text-slate-300 text-lg leading-relaxed">
              Every account you create, every website you visit, every breach that includes your email, all of it contributes to a digital profile that data brokers, advertisers, and bad actors can access. The Digital Footprint Scanner helps you see that profile before someone else does, then gives you a scored, prioritised plan to shrink it.
              Breach lookup and username scan results are illustrative estimates. Full live scanning coming soon.
            </p>
          </div>

          {/* What is a Digital Footprint? */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              What Is a Digital Footprint?
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Your digital footprint is the collection of all data that exists about you online, some you created intentionally, and much of it gathered without your awareness. It falls into two categories:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-cyan-400 mb-3">Active footprint</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">Data you knowingly share online:</p>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li className="flex items-start"><span className="text-cyan-400 mr-2 flex-shrink-0">•</span>Social media posts and profile information</li>
                  <li className="flex items-start"><span className="text-cyan-400 mr-2 flex-shrink-0">•</span>Account registrations and newsletter signups</li>
                  <li className="flex items-start"><span className="text-cyan-400 mr-2 flex-shrink-0">•</span>Forum comments and product reviews</li>
                  <li className="flex items-start"><span className="text-cyan-400 mr-2 flex-shrink-0">•</span>Photos uploaded to public platforms</li>
                </ul>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-amber-400 mb-3">Passive footprint</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">Data collected without your direct knowledge:</p>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li className="flex items-start"><span className="text-amber-400 mr-2 flex-shrink-0">•</span>Browsing history gathered by tracking scripts</li>
                  <li className="flex items-start"><span className="text-amber-400 mr-2 flex-shrink-0">•</span>Your email in data breaches you never knew happened</li>
                  <li className="flex items-start"><span className="text-amber-400 mr-2 flex-shrink-0">•</span>Public records sold to data brokers</li>
                  <li className="flex items-start"><span className="text-amber-400 mr-2 flex-shrink-0">•</span>Purchase history shared by retailers with third parties</li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-blue-300 mb-2">Why it matters</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    The passive footprint is the dangerous one, it grows silently and is exploited by scammers, stalkers, and identity thieves. Most people are unaware of how large theirs has become until something goes wrong.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How the Scanner Works */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              How the Scanner Works
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              The tool runs four independent checks and combines them into a single Footprint Score from 0 to 100. A higher score means greater exposure. Each check contributes a weighted portion of the final score.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-4 p-5 rounded-xl border border-red-500/20 bg-red-900/10">
                <div className="w-10 h-10 rounded-full bg-red-900/40 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-white">Breach Exposure</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-red-900/40 border border-red-500/30 text-red-300 font-semibold">35% of score</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Checks your email address against known data breach databases. If your email appears in a breach, the check returns the service name, breach date, and what data types were exposed — passwords, phone numbers, physical addresses, and more. This carries the most weight because a confirmed breach means your data is already in criminal marketplaces.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 rounded-xl border border-amber-500/20 bg-amber-900/10">
                <div className="w-10 h-10 rounded-full bg-amber-900/40 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                  <Search className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-white">Data Broker Risk</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-900/40 border border-amber-500/30 text-amber-300 font-semibold">25% of score</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Estimates exposure across the major data broker categories, people-search sites, marketing brokers, background-check services, and public records aggregators. If you provide your full name, the scanner surfaces which categories almost certainly hold records on you and links directly to their opt-out pages so you can begin removals.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 rounded-xl border border-purple-500/20 bg-purple-900/10">
                <div className="w-10 h-10 rounded-full bg-purple-900/40 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-white">Username Linkability</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 font-semibold">15% of score</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Scans 24 major platforms to determine how many use the same username you provided. When the same handle appears across Reddit, GitHub, Instagram, LinkedIn, and a dozen other services, anyone can aggregate your posts, comments, and activity into a complete profile of your opinions, interests, and habits, without hacking anything.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 rounded-xl border border-cyan-500/20 bg-cyan-900/10">
                <div className="w-10 h-10 rounded-full bg-cyan-900/40 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-white">Habits &amp; Behaviour Quiz</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-900/40 border border-cyan-500/30 text-cyan-300 font-semibold">25% of score</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Thirteen questions covering password reuse, two-factor authentication, social media sharing, app permissions, VPN habits, and more. This is the only module scored entirely locally in your browser, nothing is transmitted anywhere. Your behaviour patterns often matter as much as what's already leaked.
                  </p>
                </div>
              </div>
            </div>

            {/* Score table */}
            <h3 className="text-xl font-bold mb-4 text-cyan-400">What Your Score Means</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Score range</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Grade</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">What it means</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400">
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-mono text-green-400">0 – 20</td>
                    <td className="py-3 px-4 font-bold text-green-400">A</td>
                    <td className="py-3 px-4">Minimal exposure — strong habits, few or no breaches</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-mono text-lime-400">21 – 40</td>
                    <td className="py-3 px-4 font-bold text-lime-400">B</td>
                    <td className="py-3 px-4">Low exposure — a few gaps worth closing</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-mono text-amber-400">41 – 60</td>
                    <td className="py-3 px-4 font-bold text-amber-400">C</td>
                    <td className="py-3 px-4">Moderate exposure — real risks that need attention</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-mono text-orange-400">61 – 80</td>
                    <td className="py-3 px-4 font-bold text-orange-400">D</td>
                    <td className="py-3 px-4">High exposure — act on the action steps promptly</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-mono text-red-400">81 – 100</td>
                    <td className="py-3 px-4 font-bold text-red-400">F</td>
                    <td className="py-3 px-4">Critical exposure — significant remediation needed now</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Data Brokers Explained */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              What Are Data Brokers and Why Should You Care?
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Data brokers are companies that collect, aggregate, and sell personal information, your name, address, employer, relatives, financial status, purchase history, and more. They operate largely in the background and most people have never heard of them despite being listed on dozens of these sites.
            </p>

            <h3 className="text-xl font-bold mb-4 text-cyan-400">The major categories</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Category</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Examples</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Risk level</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400">
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">People-search sites</td>
                    <td className="py-3 px-4">Spokeo, WhitePages, BeenVerified, Intelius</td>
                    <td className="py-3 px-4 text-red-400 font-semibold">High</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">Marketing data brokers</td>
                    <td className="py-3 px-4">Acxiom, LexisNexis, Epsilon, CoreLogic</td>
                    <td className="py-3 px-4 text-red-400 font-semibold">High</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">Background check services</td>
                    <td className="py-3 px-4">Instant Checkmate, TruthFinder, US Search</td>
                    <td className="py-3 px-4 text-amber-400 font-semibold">Medium</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">Social aggregators</td>
                    <td className="py-3 px-4">Pipl, FullContact, Clearbit</td>
                    <td className="py-3 px-4 text-amber-400 font-semibold">Medium</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">Voter and public records</td>
                    <td className="py-3 px-4">VoterRecords.com, FamilyTreeNow</td>
                    <td className="py-3 px-4 text-slate-400 font-semibold">Lower</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-amber-300 mb-2">The ARC / CBP situation</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    In June 2024 it was revealed that the Airlines Reporting Corporation (ARC), a data broker partially owned by major U.S. airlines had been supplying passenger travel records to U.S. Customs and Border Protection since 2024. The contract even prohibited DHS from disclosing ARC's involvement. This is an example of data broker exposure creating government surveillance risk without passengers ever consenting or being notified.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Understanding Breach Exposure */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Understanding Breach Exposure
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              A data breach occurs when an attacker gains unauthorised access to a company's database and steals personal records. Your email address is the key that links you across breaches, and once it appears in one, it tends to appear in more over time as stolen databases are combined and resold.
            </p>

            <h3 className="text-xl font-bold mb-4 text-cyan-400">What each data type means when exposed</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Data type</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Immediate risk</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">What to do</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400">
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 text-red-300 font-semibold">Passwords</td>
                    <td className="py-3 px-4">Credential stuffing attacks against all your accounts</td>
                    <td className="py-3 px-4">Change immediately on that site and any site sharing the password</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 text-orange-300 font-semibold">Email addresses</td>
                    <td className="py-3 px-4">Targeted phishing, spam, and social engineering</td>
                    <td className="py-3 px-4">Be extra vigilant with incoming messages; consider an alias</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 text-amber-300 font-semibold">Phone numbers</td>
                    <td className="py-3 px-4">SIM-swap attacks, SMS phishing (smishing)</td>
                    <td className="py-3 px-4">Contact carrier to add a SIM lock PIN</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 text-amber-300 font-semibold">Physical addresses</td>
                    <td className="py-3 px-4">Mail fraud, targeted burglary, stalking risk</td>
                    <td className="py-3 px-4">Monitor credit and consider a PO box for new signups</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 text-slate-300 font-semibold">Names</td>
                    <td className="py-3 px-4">Identity enrichment for targeted attacks</td>
                    <td className="py-3 px-4">Use a credit freeze if combined with other sensitive data</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6">
              <div className="flex items-start space-x-3">
                <Lock className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-blue-300 mb-2">How the breach check stays private</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    The scanner uses a k-anonymity model for email lookups. Only a short anonymised prefix of a hash derived from your email is ever transmitted, your actual email address is never sent anywhere. This is the same privacy model used by HaveIBeenPwned, the industry-standard breach database.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Best Practices for Reducing Your Footprint
            </h2>
            <ol className="space-y-5 mb-6">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">1.</span>
                <div>
                  <strong className="text-slate-200">Use a unique password for every account.</strong>
                  <span className="text-slate-400"> Password reuse is the single biggest enabler of credential-stuffing attacks. A password manager eliminates the memorisation burden.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">2.</span>
                <div>
                  <strong className="text-slate-200">Enable two-factor authentication on every critical account.</strong>
                  <span className="text-slate-400"> Priority order: email, financial accounts, social media. Even if your password is breached, 2FA blocks the attacker.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">3.</span>
                <div>
                  <strong className="text-slate-200">Use separate email addresses for different purposes.</strong>
                  <span className="text-slate-400"> One for important accounts, one for shopping and signups, one for everything else. This contains breaches and limits cross-linking.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">4.</span>
                <div>
                  <strong className="text-slate-200">Use different usernames across platforms.</strong>
                  <span className="text-slate-400"> A unique handle per platform prevents anyone from aggregating your activity across the web into a single profile.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">5.</span>
                <div>
                  <strong className="text-slate-200">Submit opt-out requests to data brokers regularly.</strong>
                  <span className="text-slate-400"> Opt-outs are not permanent, brokers re-acquire data. Plan to repeat the process every six to twelve months for the highest risk sites.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">6.</span>
                <div>
                  <strong className="text-slate-200">Review app permissions before installing.</strong>
                  <span className="text-slate-400"> Location, microphone, and contact access handed to apps becomes data those apps can monetise or lose in a breach.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">7.</span>
                <div>
                  <strong className="text-slate-200">Rescan every three to six months.</strong>
                  <span className="text-slate-400"> New breaches happen constantly. A clean scan today does not guarantee a clean scan in six months. Regular checks let you catch and respond to new exposures quickly.</span>
                </div>
              </li>
            </ol>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-blue-300 mb-2">Tip</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    After running the scanner, use your action steps list as the starting point for your personalised Privacy Playbook. The Privacy Playbook Generator on this site turns your risk profile into a structured four week action plan you can follow at your own pace.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy and Limitations */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Privacy Commitments and Tool Limitations
            </h2>

            <h3 className="text-xl font-bold mb-4 text-cyan-400">What the tool does not do</h3>
            <ul className="space-y-3 text-slate-400 mb-6">
              <li className="flex items-start">
                <span className="text-slate-500 mr-3 flex-shrink-0">•</span>
                <span>It does not store, log, or transmit your email address, name, username, or quiz answers to any server.</span>
              </li>
              <li className="flex items-start">
                <span className="text-slate-500 mr-3 flex-shrink-0">•</span>
                <span>It does not access your actual accounts, devices, or files.</span>
              </li>
              <li className="flex items-start">
                <span className="text-slate-500 mr-3 flex-shrink-0">•</span>
                <span>It does not guarantee completeness, new breaches occur daily and some broker databases are not publicly accessible.</span>
              </li>
              <li className="flex items-start">
                <span className="text-slate-500 mr-3 flex-shrink-0">•</span>
                <span>The username scan checks a fixed list of 24 platforms and cannot cover the entire internet.</span>
              </li>
            </ul>

            <h3 className="text-xl font-bold mb-4 text-cyan-400">Print-Friendly Notes</h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3">•</span>
                <span>This guide is designed to print cleanly. Use it for security awareness training or personal reference.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3">•</span>
                <span>Do not print your actual scan results if they contain sensitive information about your breaches or accounts.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3">•</span>
                <span>Download the text report from within the tool if you need a portable record it can be stored in an encrypted folder.</span>
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <Footprints className="w-5 h-5" />
              <span>Open the Digital Footprint Scanner</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
            >
              <Printer className="w-5 h-5" />
              <span>Print This Guide</span>
            </button>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer and Important Notice:</strong> This page and the associated tool are provided for educational and informational purposes only. CyberLifeCoach and its affiliates make no warranties regarding the completeness, accuracy, or timeliness of breach or broker data. Scan results are estimates, they are not a guarantee that your data is or is not exposed. You are responsible for taking appropriate action based on your own risk tolerance. Never rely solely on a single tool for security decisions. CyberLifeCoach assumes no liability for outcomes resulting from use of this page or tool.
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
