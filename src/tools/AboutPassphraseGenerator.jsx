import React from 'react';
import { Key, ArrowLeft, Shield, Lock, AlertTriangle, CheckCircle } from 'lucide-react';

export default function AboutPassphraseGenerator() {
  const handleOpenTool = () => {
    window.location.href = '/tools/passphrase-generator';
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
              Password Management
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Passphrase Best Practices
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            A quick, practical reference for when and how to use passphrases effectively
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Lead Section */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-8 mb-8">
            <p className="text-slate-300 text-lg leading-relaxed">
              Passphrases offer the best balance between security and memorability. Instead of short, complex passwords,
              they use a sequence of random words that are easy to recall yet extremely hard to guess.
            </p>
          </div>

          {/* What is a Passphrase? */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              What is a Passphrase?
            </h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              A passphrase is a password made of multiple random words, for example:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="text-cyan-300 font-mono bg-slate-950 border border-slate-700 rounded-lg px-4 py-2">
                planet-forest-window-lantern
              </li>
              <li className="text-cyan-300 font-mono bg-slate-950 border border-slate-700 rounded-lg px-4 py-2">
                coffee river sunset mountain
              </li>
            </ul>
            <p className="text-slate-400 leading-relaxed">
              Each additional random word adds bits of entropy, which is a measure of unpredictability, making the overall
              phrase resistant to brute-force attacks.
            </p>
          </div>

          {/* Why Choose a Passphrase? */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Why Choose a Passphrase?
            </h2>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-slate-200">High entropy.</strong>
                  <span className="text-slate-400"> Each random word typically adds about 11 to 13 bits of strength.</span>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-slate-200">Easier recall.</strong>
                  <span className="text-slate-400"> Familiar words are simpler to remember than complex character strings.</span>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-slate-200">Better usability.</strong>
                  <span className="text-slate-400"> People are less likely to write them down or reuse them across accounts.</span>
                </div>
              </li>
            </ul>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-blue-300 mb-2">Note</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    When generated with a secure wordlist, a five to six word passphrase can exceed the security of a sixteen character
                    random password.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* When to Use Passphrases */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              When to Use Passphrases
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Choose passphrases whenever you need both strong security and memorability.
            </p>

            <h3 className="text-xl font-bold mb-4 text-cyan-400">Ideal Scenarios</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Situation</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Why it's ideal</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400">
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">Master passwords, such as for a password manager</td>
                    <td className="py-3 px-4">You will type it manually and need to remember it reliably.</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">Encryption keys for files or drives</td>
                    <td className="py-3 px-4">Long, random, and recallable makes recovery easier without weakening security.</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">SSH, VPN, or GPG keys</td>
                    <td className="py-3 px-4">Reduces the chance of forgetting while maintaining strong protection.</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">Wi-Fi networks</td>
                    <td className="py-3 px-4">Easier for family or guests to enter securely without resorting to weak phrases.</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">Personal logins that you memorize, such as email or device admin</td>
                    <td className="py-3 px-4">Simpler to recall and harder to guess or phish.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold mb-4 text-cyan-400">Avoid For</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Situation</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Use instead</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400">
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">Shared accounts</td>
                    <td className="py-3 px-4">A strong, random password stored in a password manager.</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">Short-lived or temporary accounts</td>
                    <td className="py-3 px-4">A simpler unique password is acceptable.</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">Auto-filled accounts</td>
                    <td className="py-3 px-4">A random password managed by your password manager.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* How Many Words Should You Use? */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              How Many Words Should You Use?
            </h2>
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Words</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Approximate strength</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Recommended use</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400">
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-mono text-cyan-300">3 words</td>
                    <td className="py-3 px-4">About 39 bits</td>
                    <td className="py-3 px-4">Only for low-risk uses</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-mono text-cyan-300">4 words</td>
                    <td className="py-3 px-4">About 52 bits</td>
                    <td className="py-3 px-4">Medium security</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-mono text-cyan-300">5 words</td>
                    <td className="py-3 px-4">About 65 bits</td>
                    <td className="py-3 px-4">Strong</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-mono text-cyan-300">6+ words</td>
                    <td className="py-3 px-4">78+ bits</td>
                    <td className="py-3 px-4">Excellent, suitable for master or encryption keys</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-500 italic">
              Entropy assumes an EFF Diceware style list of about seven thousand seven hundred and seventy six words.
            </p>
          </div>

          {/* Best Practices */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Best Practices
            </h2>
            <ol className="space-y-4 mb-6">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">1.</span>
                <div>
                  <strong className="text-slate-200">Use a secure generator.</strong>
                  <span className="text-slate-400"> Do not invent phrases yourself. The Passphrase Helper uses browser-only randomness and local wordlists for privacy.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">2.</span>
                <div>
                  <strong className="text-slate-200">Avoid meaningful phrases.</strong>
                  <span className="text-slate-400"> Phrases such as "ilovemycat" or "sunsetinthewest" are easy to guess. Randomness is what provides security.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">3.</span>
                <div>
                  <strong className="text-slate-200">Add separators wisely.</strong>
                  <span className="text-slate-400"> Hyphens, spaces, or periods improve readability without reducing strength.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">4.</span>
                <div>
                  <strong className="text-slate-200">Never reuse passphrases.</strong>
                  <span className="text-slate-400"> Treat each one like a unique key.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">5.</span>
                <div>
                  <strong className="text-slate-200">Store securely if needed.</strong>
                  <span className="text-slate-400"> Use a password manager or encrypted notes for backups.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">6.</span>
                <div>
                  <strong className="text-slate-200">Review critical passphrases periodically.</strong>
                  <span className="text-slate-400"> This is especially important for encryption or administrator use.</span>
                </div>
              </li>
            </ol>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6">
              <div className="flex items-start space-x-3">
                <Lock className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-blue-300 mb-2">Tip</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Print-friendly guidance is available below. If you print this page, keep the physical copy in a secure location and never write your actual passphrases on it.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Print-Friendly Notes */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Print-Friendly Notes
            </h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3">•</span>
                <span>Keep any printed copy in a secure place that is separate from your computer.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3">•</span>
                <span>Do not write your real passphrases on printed sheets.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3">•</span>
                <span>Use printed material for training or security awareness only.</span>
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <Key className="w-5 h-5" />
              <span>Open the Passphrase Builder</span>
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
              You are responsible for choosing and maintaining passphrases according to your own risk tolerance and organizational policy. Never store passphrases in plain text.
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
