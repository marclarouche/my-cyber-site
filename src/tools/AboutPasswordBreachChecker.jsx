// AboutPasswordBreachChecker.jsx
import React from "react";
import { ArrowLeft, KeyRound, AlertTriangle } from "lucide-react";

export default function AboutPasswordBreachChecker() {
  const handleOpenTool = () => {
    // HTML points to: breach-checker.html
    window.location.href = "/tools/password-breach-checker";
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">
      {/* Navigation (match AboutEmailHeaderAnalyzer.jsx) */}
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

            <a
              href="/tools"
              className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tools Hub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero (icon/title layout pattern) */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
              Password Safety Tool
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Breach Checking
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-700">
              {/* Icon should be 12x12, cyan-400 */}
              <KeyRound className="w-12 h-12 text-cyan-400" />
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                About the Secure Password Breach Checker
              </h1>
              <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
                The Secure Password Breach Checker helps you see whether a password has appeared in known data breaches while
                keeping the raw password on your device. It uses the Have I Been Pwned range API and the k-Anonymity model,
                sending only the first five characters of the password’s SHA-1 hash rather than the password itself.
              </p>
              <p className="text-base text-cyan-400 font-semibold">
                A Veteran-Owned Business Committed to Your Digital Security
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Card 1 */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">What this tool is designed to do</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              This helper lets you test a password against the public Have I Been Pwned breach corpus without revealing the
              password to CyberLife Coach. It is useful for checking whether a password is already known to attackers, which is
              a strong signal that you should retire it everywhere it is used.
            </p>
            <p className="text-slate-300 leading-relaxed mb-6">
              It is aimed at individuals, families, small organizations, and security conscious users who want a quick privacy
              respecting way to spot obviously unsafe passwords before reusing them on important accounts.
            </p>

            <div className="bg-gradient-to-br from-cyan-900/25 to-blue-900/25 border border-cyan-500/30 rounded-2xl p-6 mb-6">
              <div className="text-xs text-cyan-300 font-semibold uppercase tracking-wider mb-2">Quick facts</div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Local hashing in your browser</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>k-Anonymity range query to HIBP</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-white">When this checker is a good fit</h2>
            <p className="text-slate-300 leading-relaxed mb-3">The Secure Password Breach Checker works best when you:</p>
            <ul className="space-y-2 text-slate-300 mb-4">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Are evaluating a personal password before reusing it on a new site.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Are helping a friend or family member understand why a password should be replaced.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Want a safer way to demonstrate breach checking during a workshop or training session.</span>
              </li>
            </ul>
            <p className="text-slate-300 leading-relaxed mb-6">
              It should not be treated as an authorization to keep using a password. A password that does not appear in breach
              records can still be weak, guessable, or reused across multiple services.
            </p>

            <div className="bg-slate-950 border border-slate-700 rounded-2xl p-6">
              <div className="text-xs text-cyan-300 font-semibold uppercase tracking-wider mb-2">Important habit</div>
              <p className="text-slate-300 leading-relaxed">
                The safest practice is to use a unique, random password for every account and store them in a reputable password
                manager. The breach checker is there to catch obvious problems, not to certify that a password is strong enough.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Privacy first design</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              The checker performs all hashing in your browser using SHA-1. The full hash and the plaintext password stay on your
              device. The page then sends only the first five characters of the uppercase hash prefix to the Have I Been Pwned
              range API and compares the suffixes locally.
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
              <strong className="text-slate-200">In practice, the flow looks like this.</strong>
            </p>
            <ul className="space-y-2 text-slate-300 mb-8">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>You type a password into the field on the breach checker page.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Your browser computes its SHA-1 hash and displays the prefix and suffix for transparency.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Only the first five characters of that hash prefix are sent to HIBP’s range endpoint.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>HIBP returns a list of matching suffixes and counts for that prefix.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>The page checks locally whether your full hash appears in that list and shows a result.</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 text-white">Safe use and limitations</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              The tool is careful about what it sends, but there are still important boundaries to respect:
            </p>
            <ul className="space-y-2 text-slate-300 mb-4">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  Do not enter shared, administrative, or work managed passwords unless your organization explicitly allows this
                  kind of check.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  A “not found in breaches” result does not guarantee safety. A short or common password can still be guessed
                  quickly even if it has never been leaked before.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  Results depend on third party breach data. New breaches may not yet be included, and some older breaches may
                  never be captured.
                </span>
              </li>
            </ul>
            <p className="text-slate-300 leading-relaxed mb-6">
              The checker is a quick indicator, not an intrusion detection system or a full credential management solution. You
              should still enable multi factor authentication where possible and rotate passwords if you suspect any compromise.
            </p>

            <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-cyan-300 font-semibold uppercase tracking-wider mb-2">
                    Use it as a warning light
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Treat a positive breach hit as a red light for that password and a strong nudge to change it everywhere it
                    was used. Treat a clean result as a yellow light that still requires good hygiene and unique passwords.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer (match AboutEmailHeaderAnalyzer.jsx format, positioned before footer) */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-8">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Important information:</strong> This Secure Password Breach Checker is a client
              side educational tool intended to help you understand whether a password appears in the public Have I Been Pwned
              breach corpus. All hashing is performed in your browser and only a partial SHA-1 hash prefix is sent to the HIBP
              range API endpoint. Neither your full hash nor your plaintext password are transmitted to CyberLife Coach or stored
              by this page.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed mt-4">
              <strong className="text-cyan-400">Legal disclaimer:</strong> The checker does not guarantee that a password is safe
              or secure and should not be relied upon as your only security control. A password that does not appear in breach
              data can still be weak, reused, or exposed by other means. Results are based on third party data and are provided
              “as is” without any warranty of completeness, accuracy, or fitness for a particular purpose. This page does not
              provide legal, financial, or professional security advice. Always follow modern password best practices, use unique
              credentials per site, enable multi factor authentication where available, and consult your organization’s security
              team or a qualified professional before changing high value or work related passwords.
            </p>
          </div>

          {/* Bottom actions (buttons remain at bottom like HTML) */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mb-10 no-print">
            <button
              type="button"
              onClick={handleOpenTool}
              className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <span className="text-lg">🧰</span>
              <span>Open Secure Password Breach Checker</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 border border-slate-600 rounded-xl text-slate-100 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print this page</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer (match reference style) */}
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
            <p>&copy; {new Date().getFullYear()} CyberLife Coach</p>
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
