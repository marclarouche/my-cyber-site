import React from 'react';
import { Database, ArrowLeft, ExternalLink } from 'lucide-react';

export default function BreachLookup() {
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-8 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <Database className="w-12 h-12 text-cyan-400" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Breach Exposure Lookup
              </h1>
              <p className="text-slate-400 mt-2">Check if your email address or username has been exposed in known data breaches and leaks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative max-w-5xl mx-auto px-4 pb-20">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">About This Tool</h2>
          <p className="text-slate-300 mb-6">
            We recommend using <strong>Have I Been Pwned</strong>, a trusted service created by security expert Troy Hunt. 
            This free tool allows you to check if your email address or phone number has appeared in any known data breaches.
          </p>
          
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 text-blue-300">Why Have I Been Pwned?</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Trusted by millions worldwide and recommended by security professionals</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Monitors over 12 billion compromised accounts from 600+ breaches</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Completely free to use with no registration required</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Regular updates with new breach data as it becomes available</span>
              </li>
            </ul>
          </div>

          <a
            href="https://haveibeenpwned.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 text-lg"
          >
            <span>Check Your Email on Have I Been Pwned</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>

        {/* Privacy Note */}
        <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6 mb-6">
          <p className="text-sm text-slate-300 leading-relaxed">
            <strong className="text-green-400">Privacy Note:</strong> When you use Have I Been Pwned, your email is sent to their servers for checking. 
            The service is operated by a reputable security researcher and takes privacy seriously. However, as with any online service, 
            you should review their privacy policy before use.
          </p>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="max-w-5xl mx-auto px-4 pb-8">
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-6">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Legal Disclaimer:</strong> This page provides a referral to Have I Been Pwned, a third-party service operated by Troy Hunt.
            CyberLifeCoach does not operate, control, or maintain Have I Been Pwned. Use of that service is subject to their terms and privacy policy.
            We provide this referral for informational purposes only and assume no responsibility for the service's accuracy, availability, or any consequences of its use.
            Always verify breach information through multiple sources and take appropriate security measures.
          </p>
        </div>

        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-12">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Data Privacy:</strong> This page does not perform any breach lookups or collect any personal information.
            When you click the link to Have I Been Pwned, you will be redirected to their website where their privacy policy applies.
            No data from this page is transmitted to CyberLifeCoach servers. This is a simple informational page running entirely in your browser.
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
            <p className="text-slate-600">Connecting you to trusted security resources.</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
