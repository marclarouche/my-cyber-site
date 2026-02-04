import React from 'react';
import { Lock, ArrowLeft, AlertTriangle, Shield, Key, Mail, FileText, CheckCircle } from 'lucide-react';

export default function AboutPGPGenerator() {
  const handleOpenTool = () => {
    window.location.href = '/tools/pgp-generator';
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
              Encryption Tool
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              PGP/OpenPGP
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the PGP Key Generator & Message Encrypter
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            This page explains what the PGP tool does, how it keeps everything in your browser, and how to use it safely
            for practice, training, and small personal workflows without needing a full email client.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* What this tool does */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              What this tool does
            </h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              The PGP Key Generator and Message Encrypter gives you a simple way to work with OpenPGP keys in your browser.
              It helps you create a key pair, encrypt messages for someone else using their public key, and decrypt messages
              that were encrypted for you.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              Everything happens in the browser tab you are using. Keys and messages are handled in memory only. The page does
              not send your keys or messages to CyberLife Coach or to any other server as part of the cryptography process.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-cyan-400">You can use this tool to</h3>
                <ul className="space-y-2 text-slate-400">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Create a fresh OpenPGP key pair for testing and training</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Copy and share your public key so others can send you private messages</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Encrypt a message using someone else's public key</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Paste an encrypted message and decrypt it with your private key and passphrase</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-cyan-400">This tool is best suited for</h3>
                <ul className="space-y-2 text-slate-400">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Personal education and self study</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Cybersecurity training labs and classroom demos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Small experiments where you want to see PGP in action</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Practice before you move to a dedicated PGP email client</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-6">
              <div className="flex items-start space-x-4">
                <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2 text-cyan-300">Important focus</h3>
                  <p className="text-slate-300 leading-relaxed">
                    This is a lightweight, browser based toolkit. It is not intended to be your only long term key manager or the
                    core of a high risk operational security setup.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How it works under the hood */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              How it works under the hood
            </h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              The main PGP page loads the OpenPGP.js library directly into your browser. When you click the buttons to
              generate, encrypt, or decrypt, the library performs the cryptographic operations in the same tab that you see.
            </p>
            <ul className="space-y-2 text-slate-400 mb-4">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>No account or login is required to use the page</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>No key escrow or cloud backup is built in</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>No server side storage of keys or messages is built in</span>
              </li>
            </ul>
            <p className="text-slate-400 leading-relaxed">
              If you close the tab without copying your keys, they are gone. You are responsible for copying, saving,
              backing up, and revoking keys that you create with this tool.
            </p>
          </div>

          {/* Quick start guide */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Quick start guide
            </h2>
            <ol className="space-y-3 text-slate-400 mb-4">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">1.</span>
                <span>Open the PGP tool and go to the "Generate PGP key pair" tab.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">2.</span>
                <span>Enter a name, an email, and a strong passphrase, then generate a key pair.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">3.</span>
                <span>Copy the public key and share it with someone you trust, for example in a secure chat.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">4.</span>
                <span>Ask them to encrypt a message for you and send back the encrypted text.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-semibold">5.</span>
                <span>Paste your private key, your passphrase, and the encrypted message in the "Decrypt" tab and decrypt it.</span>
              </li>
            </ol>
            <p className="text-slate-400 leading-relaxed">
              This simple loop gives you a hands on feel for how public key encryption works in practice without needing to
              reconfigure your email client.
            </p>
          </div>

          {/* Two column sections */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* What this tool is not */}
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                What this tool is not
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                It is important to understand the limits. This browser page does not replace:
              </p>
              <ul className="space-y-2 text-slate-400 mb-4">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>A full PGP email integration with your mail client</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>A hardened, long term key management solution</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>A full security program for sensitive sources or high risk journalism</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>A password manager or secure secret vault</span>
                </li>
              </ul>
              <p className="text-slate-400 leading-relaxed">
                You can think of it as a focused "workbench" for testing and learning PGP, not an all purpose secure storage
                platform.
              </p>
            </div>

            {/* Good use cases */}
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Good use cases
              </h2>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Teaching students how public and private keys work</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Demonstrating encrypted messaging in workshops</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Checking that a public key someone sent you is usable</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Experimenting with key sizes and passphrases in a lab</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Security and best practices */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Security and privacy notes */}
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Security and privacy notes
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Even though cryptography happens in your browser, your overall privacy still depends on your device, your
                operating system, your browser extensions, and what else is running on the machine.
              </p>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Avoid generating or using keys on shared or untrusted computers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Keep your browser and operating system updated</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Be careful when pasting keys into other sites or chat tools</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Store key backups in a secure location under your control</span>
                </li>
              </ul>
            </div>

            {/* Best practice checklist */}
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Best practice checklist
              </h2>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Use a long, unique passphrase for each private key</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Create and safely store a revocation certificate in a separate place</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Document where you saved copies of your keys and who has access</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Retire and revoke old keys when you no longer need them</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <Lock className="w-5 h-5" />
              <span>Open PGP Tool</span>
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
              <strong className="text-cyan-400">Legal and Security Notice:</strong> This PGP explanation page and the underlying tool are provided for education, training, and personal
              experimentation. They do not provide legal, security, or compliance advice. To the best of our knowledge,
              cryptographic operations run in your browser and keys and messages are not transmitted to CyberLife Coach
              or to any external server as part of those operations. You are responsible for how you generate, export,
              store, and share any keys or ciphertext, including backups, revocation, and passphrase hygiene.
              <strong className="text-cyan-400"> No guarantees</strong> are made about cryptographic strength, implementation flaws, browser or
              device compromise, or compatibility with other OpenPGP tools. For high risk work or sensitive sources,
              use a dedicated, well reviewed PGP setup and seek expert guidance.
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
