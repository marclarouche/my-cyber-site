import React from 'react';
import { ArrowLeft, Mail, Shield, Lock, Eye, FileText } from 'lucide-react';

export default function Privacy() {
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

            <a href="/" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30 mb-6">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-300">Your Privacy Matters</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight">
            Privacy Policy
          </h1>
          
          <p className="text-lg text-slate-400 mb-4">
            Effective Date: November 08, 2025
          </p>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Welcome to CyberLifeCoach. Your privacy is central to how we build and deliver our tools. All tools now run locally in your browser, including our personal-assessment and business-assessment. They do not require or transmit personal information to our servers.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Section 1 */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-cyan-400">1. Information We Collect</h2>
            </div>
            <p className="text-slate-300 leading-relaxed mb-4">
              We designed our site and tools to avoid collecting personal data.
            </p>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 mt-1">•</span>
                <div>
                  <strong className="text-slate-300">We do not collect personal identifiers.</strong> We do not ask for or store your name, email address, phone number, or mailing address to use our tools.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 mt-1">•</span>
                <div>
                  <strong className="text-slate-300">Client-side processing.</strong> Inputs you provide to our tools are processed locally in your browser. The data stays on your device and is not sent to our servers.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 mt-1">•</span>
                <div>
                  <strong className="text-slate-300">Web server logs (limited).</strong> Our web server receives standard connection metadata, including your IP address and requested URL. These logs are used for basic operations and security, and are <strong className="text-cyan-300">purged every 24 hours</strong>.
                </div>
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-cyan-400">2. How We Use Information</h2>
            </div>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 mt-1">•</span>
                <div>
                  <strong className="text-slate-300">Operate and secure the website.</strong> Short-lived server logs (including IP addresses) help us keep the site available, troubleshoot issues, and mitigate abuse.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 mt-1">•</span>
                <div>
                  <strong className="text-slate-300">No profiling or marketing.</strong> We do not use server logs for advertising, profiling, or sale of data.
                </div>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-cyan-400">3. Data Storage and Protection</h2>
            </div>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 mt-1">•</span>
                <div>
                  <strong className="text-slate-300">Local-only tool data.</strong> Tool inputs and results remain on your device. When features use browser storage for preferences, they are stored locally (for example, localStorage) and never transmitted to us.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 mt-1">•</span>
                <div>
                  <strong className="text-slate-300">Server logs.</strong> Minimal connection logs that include IP addresses are retained for up to 24 hours and then automatically purged.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 mt-1">•</span>
                <div>
                  <strong className="text-slate-300">Security.</strong> We implement industry-standard controls to protect the site and infrastructure.
                </div>
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-cyan-400">4. Cookies, Local Storage, and Tracking</h2>
            </div>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 mt-1">•</span>
                <div>
                  <strong className="text-slate-300">No analytics or advertising cookies.</strong> We do not use third-party analytics, advertising tags, or cross-site tracking.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 mt-1">•</span>
                <div>
                  <strong className="text-slate-300">No tracking cookies.</strong> We do not set tracking or targeting cookies.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 mt-1">•</span>
                <div>
                  <strong className="text-slate-300">On-device preferences.</strong> Some features may store simple preferences in your browser (for example, acknowledging Terms of Service). These values reside on your device and are not shared with us.
                </div>
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-cyan-400">5. Your Rights</h2>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Depending on your location, you may have rights to access, correct, delete, or object to processing of personal data. Because we do not collect personal identifiers and retain only short-lived server logs, there is typically no account or profile for us to access. You can still contact us with questions, and we will assist where applicable. Server logs containing IP addresses are automatically deleted within 24 hours.
            </p>
          </div>

          {/* Section 6 */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-cyan-400">6. Compliance with Regulations</h2>
            </div>
            <p className="text-slate-400 leading-relaxed">
              We align our practices with applicable data protection laws, including the GDPR and the CCPA/CPRA. Our approach minimizes data collection by processing tool inputs locally, avoiding analytics and tracking cookies, and limiting server logs with a 24-hour retention period.
            </p>
          </div>

          {/* Section 7 */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-cyan-400">7. Changes to This Privacy Policy</h2>
            </div>
            <p className="text-slate-400 leading-relaxed">
              We may update this Privacy Policy as we improve the site and tools. Updates will be posted on this page. We encourage you to review it periodically.
            </p>
          </div>

          {/* Section 8 */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-cyan-400">8. GPC Opt-Out</h2>
            </div>
            <p className="text-slate-400 leading-relaxed">
              We respect the Global Privacy Control (GPC) signal sent by your browser. Since we do not collect personal data beyond short-lived server logs, no additional action is required on your part. If you have questions about how we handle data in relation to GPC, please contact us.
            </p>
          </div>

          {/* Section 9 */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-8">
            <div className="flex items-center space-x-3 mb-4">
              <Mail className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-cyan-300">9. Contact Us</h2>
            </div>
            <p className="text-slate-300 leading-relaxed mb-4">
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3">•</span>
                <div>
                  By email: <a href="mailto:CyberLifeCoach@proton.me" className="text-cyan-400 hover:text-cyan-300 underline transition-colors">CyberLifeCoach@proton.me</a>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3">•</span>
                <div>
                  By visiting this page on our website: <a href="mailto:cyberlifecoach@proton.me"a className="text-cyan-400 hover:text-cyan-300 underline transition-colors">Contact Us</a>
                </div>
             
              </li>
            </ul>
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
          <div className="text-slate-500 text-sm space-y-2">
            <p>&copy; 2025 CyberLifeCoach</p>
            <p className="text-cyan-400 font-semibold">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
          <div className="flex justify-center space-x-6 mt-6">
            <a href="/privacy" className="text-slate-400 hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="/about" className="text-slate-400 hover:text-cyan-400 transition-colors">About</a>
            <a href="mailto:cyberlifecoach@proton.me" className="text-slate-400 hover:text-cyan-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
