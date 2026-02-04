import React from 'react';
import { Lock, ArrowLeft, Shield, Key, CheckCircle, AlertTriangle } from 'lucide-react';

export default function AboutEncryptDecrypt() {
  const handleOpenTool = () => {
    window.location.href = '/tools/encrypt-decrypt';
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
              Security Tool Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Encryption
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Client-Side Only
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About the Encrypt/Decrypt Tool
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            Secure your sensitive data with browser-based encryption that never leaves your device.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Introduction */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-8 mb-8">
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              This local-only tool allows you to encrypt and decrypt sensitive text or files using strong cryptography
              — directly in your browser, without any data ever leaving your device.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              It's designed for safe use on public Wi-Fi networks (coffee shops, hotels, airports) where you may not
              trust the network but still need to exchange confidential messages or protect sensitive documents.
            </p>
          </div>

          {/* Privacy First Notice */}
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-semibold text-blue-300 mb-2">Privacy First</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  This tool operates entirely offline using the browser's native{' '}
                  <code className="text-cyan-300 font-mono bg-slate-950 px-2 py-1 rounded text-sm">Web Crypto API</code>.
                  It uses AES-256-GCM with PBKDF2 (SHA-256) key derivation.
                </p>
              </div>
            </div>
          </div>

          {/* How to Use It */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              How to Use It
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold text-xl flex-shrink-0">1.</span>
                <div>
                  <span className="text-slate-300">Select whether you want to </span>
                  <strong className="text-slate-200">encrypt</strong>
                  <span className="text-slate-300"> or </span>
                  <strong className="text-slate-200">decrypt</strong>
                  <span className="text-slate-300">.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold text-xl flex-shrink-0">2.</span>
                <span className="text-slate-300">Enter your text or upload a file.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold text-xl flex-shrink-0">3.</span>
                <span className="text-slate-300">Provide a strong passphrase (or generate one).</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold text-xl flex-shrink-0">4.</span>
                <span className="text-slate-300">Click "Process" and copy or download the result.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 font-bold text-xl flex-shrink-0">5.</span>
                <span className="text-slate-300">Use the exact same passphrase to decrypt.</span>
              </li>
            </ul>
          </div>

          {/* Best Practices */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Best Practices
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  Always use long, random passphrases. The tool can generate one for you.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  Never reuse encryption passphrases across different purposes or people.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  Store encrypted files securely, and share passphrases through trusted channels only.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  If you're unsure about a result, test decryption before deleting originals.
                </span>
              </li>
            </ul>
          </div>

          {/* Technical Details */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Technical Details
            </h2>
            <div className="space-y-4 text-slate-400">
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Encryption Algorithm</h3>
                <p className="text-sm">
                  <strong className="text-slate-300">AES-256-GCM</strong> (Advanced Encryption Standard with Galois/Counter Mode)
                  provides authenticated encryption, ensuring both confidentiality and integrity.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Key Derivation</h3>
                <p className="text-sm">
                  <strong className="text-slate-300">PBKDF2 with SHA-256</strong> transforms your passphrase into a secure encryption key,
                  using multiple iterations to resist brute-force attacks.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Client-Side Processing</h3>
                <p className="text-sm">
                  All encryption and decryption happens in your browser using the native{' '}
                  <code className="text-cyan-300 font-mono bg-slate-900 px-2 py-1 rounded">Web Crypto API</code>.
                  Your data never touches our servers.
                </p>
              </div>
            </div>
          </div>

          {/* Security Considerations */}
          <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl border border-yellow-500/30 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-yellow-300">
                Security Considerations
              </h2>
            </div>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">⚠️</span>
                <span>
                  <strong>Passphrase strength is critical.</strong> A weak passphrase can be cracked even with strong encryption.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">⚠️</span>
                <span>
                  <strong>Store passphrases separately.</strong> Never save your passphrase with the encrypted file.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">⚠️</span>
                <span>
                  <strong>Lost passphrases cannot be recovered.</strong> If you forget your passphrase, the encrypted data is permanently inaccessible.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">⚠️</span>
                <span>
                  <strong>Use secure channels.</strong> Share passphrases through secure, trusted communication methods only.
                </span>
              </li>
            </ul>
          </div>

          {/* Use Cases */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Common Use Cases
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Key className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Protecting Sensitive Documents</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Encrypt personal documents, financial records, or confidential business files before storing them in cloud services or sending via email.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Lock className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Secure Communications</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Exchange encrypted messages with colleagues or clients when end-to-end encrypted messaging isn't available.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Temporary File Protection</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Secure files on shared computers or USB drives that you need to access temporarily but don't want to leave unprotected.
                </p>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-cyan-400">Public Wi-Fi Safety</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Encrypt sensitive data before transmitting over untrusted networks like coffee shop or hotel Wi-Fi.
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
              <Lock className="w-5 h-5" />
              <span>Open Encrypt/Decrypt Tool</span>
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
              <strong className="text-cyan-400">Legal Disclaimer and Important Notice:</strong> This tool is provided "as-is" with no warranty of any kind. It is your responsibility to use it legally and ethically. We are not liable for any data loss, security incidents, or misuse. Using encryption may be regulated or restricted in certain jurisdictions. Always comply with your local laws and regulations.
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
