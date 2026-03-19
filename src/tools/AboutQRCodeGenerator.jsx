import React from 'react';
import { QrCode, ArrowLeft, Shield, AlertTriangle, CheckCircle, Eye, Link as LinkIcon, Wifi, Smartphone, Lock, ExternalLink } from 'lucide-react';

export default function AboutQRCodeGenerator() {
  const handleOpenTool = () => {
    window.location.href = '/tools/qr-code-generator';
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
              QR Code Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Security Tool
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About • QR Code Security Tool
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            Understand QR Codes and Use Them Safely
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
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <p className="text-lg text-slate-300 leading-relaxed">
              A quick primer on how QR codes work, where they help, and how to avoid common privacy and security pitfalls.
            </p>
          </div>

          {/* What Is a QR Code? */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              What Is a QR Code?
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              A QR code is a two-dimensional barcode that encodes data such as a website link, a Wi-Fi configuration, contact details, or an app action. Your camera or scanner reads the pattern and converts it back into readable text or a command.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <LinkIcon className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <span className="text-slate-300">Links can open a website or app page.</span>
              </div>
              <div className="flex items-start">
                <Smartphone className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <span className="text-slate-300">Contact cards can add entries to your address book.</span>
              </div>
              <div className="flex items-start">
                <Wifi className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <span className="text-slate-300">Wi-Fi codes can set up a network name and password automatically.</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <span className="text-slate-300">Payment and ticketing codes can confirm purchases or entry.</span>
              </div>
            </div>
          </div>

          {/* How Do QR Codes Work? */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              How Do QR Codes Work?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-950/50 border border-slate-700 rounded-xl p-6">
                <p className="text-slate-300 leading-relaxed mb-4">
                  When you scan a QR code, the scanner reads the modules, corrects small errors, and outputs the embedded data. If the data is a link, the scanner can preview it or open it in your browser.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Error correction helps a scan succeed even with small scratches or logos. Bigger or higher-density codes can hold more data.
                </p>
              </div>

              <div className="bg-slate-950/50 border border-slate-700 rounded-xl p-6">
                <p className="text-slate-300 leading-relaxed">
                  There are two broad link styles. A static link always points to the same destination. A dynamic link points to a short URL that can later redirect somewhere else, which is useful for campaigns and analytics but can increase privacy risk if ownership changes.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy and Security Risks to Watch */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Privacy and Security Risks to Watch
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Unexpected Destinations */}
              <div className="bg-slate-950/50 border border-red-500/30 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                  <h3 className="text-xl font-bold text-red-400">Unexpected Destinations</h3>
                </div>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Codes can hide long or shortened links. A malicious code can lead to a phishing site, a fake login page, or a prompt to install unsafe apps.
                </p>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    <span>Read the domain carefully before you tap through.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    <span>Avoid entering passwords after a scan unless you trust the site.</span>
                  </li>
                </ul>
              </div>

              {/* Tracking and Redirection */}
              <div className="bg-slate-950/50 border border-yellow-500/30 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Eye className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-yellow-400">Tracking and Redirection</h3>
                </div>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Campaign links can include tracking parameters. Dynamic codes can change destinations later. That's convenient for publishers, yet it may reveal more about your browsing than you intend.
                </p>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Prefer codes from sources you trust.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Consider removing obvious tracking parameters before sharing links.</span>
                  </li>
                </ul>
              </div>

              {/* Wi-Fi Join Codes */}
              <div className="bg-slate-950/50 border border-orange-500/30 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Wifi className="w-6 h-6 text-orange-400" />
                  <h3 className="text-xl font-bold text-orange-400">Wi-Fi Join Codes</h3>
                </div>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Wi-Fi QR codes can autofill a network name and password. Review the network name and make sure you trust the location before you connect.
                </p>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    <span>Confirm the SSID matches what the venue posted.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    <span>Avoid open networks when possible.</span>
                  </li>
                </ul>
              </div>

              {/* Scanner Apps and Permissions */}
              <div className="bg-slate-950/50 border border-cyan-500/30 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Smartphone className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-bold text-cyan-400">Scanner Apps and Permissions</h3>
                </div>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Modern phones scan codes with the built-in camera. Extra scanner apps may request contacts, location, or background data they do not need.
                </p>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Use your phone's default camera when possible.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>Review app permissions regularly.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How This Tool Handles Your Data */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              How This Tool Handles Your Data
            </h2>

            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-6">
              <div className="flex items-start space-x-4">
                <Shield className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-cyan-300 mb-3">Data Privacy</p>
                  <p className="text-slate-300 leading-relaxed">
                    This application runs as a <strong className="text-cyan-400">fully client-side web tool</strong>. QR decoding is performed using
                    <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm mx-1">jsQR</code> and QR generation uses <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded text-sm mx-1">QRCode.js</code>, both executing locally in your browser.
                    <strong className="text-cyan-400"> No remote APIs are contacted</strong>, and <strong className="text-cyan-400">no QR data is transmitted off-device</strong>.
                    If you save this page locally, the tool continues to operate offline.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Questions */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Quick Questions
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-950/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <h3 className="text-lg font-bold text-cyan-400">Can QR codes contain malware?</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  The code itself is just text. Risk appears when a link opens a harmful site or prompts unsafe downloads. Your best defense is careful review of the domain and the action requested.
                </p>
              </div>

              <div className="bg-slate-950/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Lock className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <h3 className="text-lg font-bold text-cyan-400">Do you store the images I upload?</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  No. Images are processed in memory inside your browser and are not sent anywhere. Closing the page clears the session.
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
              <QrCode className="w-5 h-5" />
              <span>📷 Open the QR Tool</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print</span>
            </button>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer:</strong> This page and the associated QR Code Security Tool are provided for general information and education. The checks and guidance shown here are based on simple client-side logic and should not be relied upon as a sole method to establish safety, authenticity, identity, or trustworthiness. You are responsible for the choices you make after scanning or opening links. The creator assumes no liability for misuse, data loss, or incidents arising from use of this page or tool.
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
            <p>&copy; {new Date().getFullYear()} CyberLife Coach</p>
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
