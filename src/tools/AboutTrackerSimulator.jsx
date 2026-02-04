import React from 'react';
import { Eye, ArrowLeft, AlertTriangle, Shield, Target, Activity, Lock, Globe } from 'lucide-react';

export default function AboutTrackerSimulator() {
  const handleOpenTool = () => {
    window.location.href = '/tools/tracker-simulator';
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
              Privacy Education Tool
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Visual Simulator
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About "Track Me If You Can"
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            This page explains what the Track Me If You Can simulator does, how it works, and how you can use it in workshops,
            classrooms, or personal learning. The tool runs entirely in your browser and no data leaves your device.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* What this simulator shows */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              What this simulator shows
            </h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              Track Me If You Can is a visual teaching tool that simulates how advertising networks, analytics platforms, and
              social media pixels try to follow you whenever you load a modern web page. Each colored dot represents a simulated
              tracker. The activity log on the right shows which ones are allowed and which ones are blocked.
            </p>
            <p className="text-slate-400 leading-relaxed">
              The goal is to give a clear "over the shoulder" view of tracking behaviour so regular users, families, and small
              teams can see why privacy tools matter, without exposing any real data or contacting live tracking services.
            </p>
          </div>

          {/* How the simulator works */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              How the simulator works
            </h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              The simulator is a self contained HTML file with JavaScript that creates virtual trackers when you click
              "Visit a new site". These trackers are fictional entries that never leave your browser. There are no real network
              requests and nothing is loaded from advertising or analytics platforms.
            </p>
            <ul className="space-y-3 text-slate-400 mb-6">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>When you click the button, the page generates a random set of simulated trackers.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Each tracker appears as a dot on the canvas to represent code running inside a page.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>The log records the company name, the type of tracker, and whether it was loaded or blocked.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>The counters at the top show totals for this single run of the simulation.</span>
              </li>
            </ul>
            
            <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-sm rounded-xl border border-yellow-500/30 p-6">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2 text-yellow-300">Important Technical Note</h3>
                  <p className="text-slate-300 leading-relaxed">
                    The tracker names and categories are for illustration only. They do not mean that any specific product or
                    company is active on your device. Everything you see is generated locally to help you understand concepts,
                    not to report on real browsing behaviour.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Using the privacy controls */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Using the privacy controls
            </h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              Two toggles let you explore how basic privacy tools change what happens in the simulation.
            </p>
            <ul className="space-y-4 text-slate-400 mb-4">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <div>
                  <strong className="text-slate-300">Block third party scripts</strong> simulates the effect of content blockers and strict browser settings.
                  When this is on, a portion of simulated trackers are marked as blocked. You can compare runs with the toggle on
                  and off to show the difference.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <div>
                  <strong className="text-slate-300">Use VPN</strong> changes the log messages to indicate that your location is hidden. This represents
                  how a virtual private network masks your IP address in a real world situation.
                </div>
              </li>
            </ul>
            <p className="text-slate-400 leading-relaxed">
              Together, these controls give you an approachable way to explain why privacy extensions, safer browser settings,
              and network tools can reduce tracking, while still reminding users that no single step removes all risk.
            </p>
          </div>

          {/* Ideas for workshops and training */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Ideas for workshops and training
            </h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              You can use this simulator in several ways during talks, webinars, and one to one coaching sessions.
            </p>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Run a simulation with everything turned off, then repeat with blocking and VPN switched on.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Ask participants to count how many trackers load in each scenario and discuss the change.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Use the log entries to introduce terms like analytics, retargeting, and social pixels.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Link the simulator to your broader guidance on safer browsers, extensions, and threat models.</span>
              </li>
            </ul>
          </div>

          {/* Privacy, safety, and limitations */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Privacy, safety, and limitations
            </h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              This simulator is designed for privacy friendly education. It never loads external scripts, sends network
              requests, or stores results on a remote server. It runs completely in your browser and you can even use it
              offline once the file is saved.
            </p>
            <p className="text-slate-400 leading-relaxed">
              At the same time, it is important to remember that this is a simplified model. Real websites, devices, and
              networks behave in more complex ways. Treat this tool as a starting point for conversations, not as a full
              diagnostic or compliance scanner.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <Eye className="w-5 h-5" />
              <span>Open Simulator</span>
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
              <strong className="text-cyan-400">Legal Notice:</strong> The Track Me If You Can simulator and this overview page are provided for educational and awareness purposes
              only. All tracker names, counts, and behaviours are simulated examples and do not represent live monitoring of
              your device, your network, or any specific service.
              No real tracking requests are sent, and no data leaves your computer. This content does not constitute legal,
              regulatory, or professional security advice and is supplied "as is" without warranty. Always consult qualified
              legal or security professionals and test changes in a safe environment before applying them to production
              systems, client networks, or high risk use cases.
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
