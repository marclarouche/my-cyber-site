import React from 'react';
import { Tv, ArrowLeft, Shield, Eye, Mic, Database, Wifi, Globe, Lock, AlertTriangle, CheckCircle, Radio } from 'lucide-react';

export default function AboutSmartTVPrivacyConfigurator() {
  const handleOpenTool = () => {
    window.location.href = '/tools/smart-tv-privacy-configurator';
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
              Smart TV Privacy Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              ACR & Surveillance
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Your Smart TV Is Watching You Back
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            What your television collects, who it sells it to, and exactly how to stop it — brand by brand.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">

          {/* 1. What Is a Smart TV Really Doing? */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Tv className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  1. What Is a Smart TV Really Doing?
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Modern smart TVs are advertising platforms first and televisions second. From the moment you power one on, it begins collecting data — not just from streaming apps, but from every input source: cable boxes, gaming consoles, Blu-ray players, and even ambient audio. This data is packaged and sold to advertisers, data brokers, and analytics firms.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  The business model is straightforward: manufacturers sell the TV hardware at or near cost, then monetize your attention and behavioral data for years afterward. A 2023 study found that smart TVs generate more ad revenue per user than smartphones — because your TV screen is the largest display in your home, active for hours each day.
                </p>
              </div>
            </div>
          </div>

          {/* 2. ACR: The Hidden Surveillance Engine */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Eye className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  2. ACR: The Hidden Surveillance Engine
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Automatic Content Recognition (ACR) is the most invasive feature most people have never heard of. It works by capturing a sample frame from your screen several times per second, converting it to a digital fingerprint, and matching it against a massive database of known content — movies, shows, ads, sports, news, and even video games.
                </p>
                <p className="text-slate-300 leading-relaxed mb-4">
                  ACR doesn't care what the source is. It monitors cable TV, streaming services, gaming consoles, Blu-ray players, and HDMI-connected devices equally. It builds a precise timeline of everything you watch, when you watch it, and how long you engage with it — then sells that data to advertisers who use it to target you across your phone, laptop, and other connected devices.
                </p>
                <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-red-300 mb-1">This is enabled by default on most smart TVs</p>
                      <p className="text-sm text-slate-300">
                        Samsung, LG, Vizio, TCL, Hisense, and Roku TVs all ship with ACR active out of the box. You agreed to it during the initial setup wizard — in a multi-page terms of service most users accept without reading. Disabling it is the single most impactful privacy action you can take.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. The Microphone Problem */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Mic className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  3. The Microphone Problem
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Built-in voice assistants — Samsung's Bixby, LG's ThinQ AI, Amazon Alexa, and Google Assistant — require a microphone that is always listening for a wake word. That microphone is physically inside your television, positioned in the center of your living room.
                </p>
                <p className="text-slate-300 leading-relaxed mb-4">
                  In 2015, Samsung's privacy policy explicitly stated that "personal or other sensitive information" spoken near the TV "will be among the data captured and transmitted to a third party." While policies have been reworded since, the underlying architecture hasn't changed — always-on microphones remain a live audio capture risk in your most private family space.
                </p>
                <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-cyan-300 mb-1">Best Practice</p>
                      <p className="text-sm text-slate-300">
                        Disable voice wake-word detection entirely if you don't use voice commands regularly. You can still use your remote to navigate. The convenience tradeoff is rarely worth the privacy cost.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Advertising IDs and Cross-Device Tracking */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Database className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  4. Advertising IDs and Cross-Device Tracking
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Every smart TV is assigned a persistent advertising identifier — a unique code that follows you across apps, sessions, and reboots. This ID is the anchor that connects your TV viewing behavior to your profile on other devices. When you see an ad on your phone for something you watched a documentary about on TV last night, that's your TV's advertising ID at work.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Data brokers purchase viewing data correlated to advertising IDs and combine it with location data, purchase history, social media activity, and browsing history to build comprehensive consumer profiles. You can limit this by resetting your advertising ID regularly and enabling any "Limit Ad Tracking" options your TV offers — steps our configurator walks you through for each brand.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Network Exposure: What Your TV Phones Home */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Wifi className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  5. Network Exposure: What Your TV Phones Home
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Security researchers who have monitored smart TV network traffic have found them making connections to dozens of third-party servers — ad networks, analytics platforms, content delivery systems, and manufacturer telemetry endpoints — even when the TV appears idle or powered off in standby mode.
                </p>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Unlike your phone or laptop, your smart TV almost certainly does not receive timely security patches. Many models stop receiving firmware updates within 2–3 years of manufacture, leaving known vulnerabilities unpatched. A compromised TV on your main home network can serve as a pivot point to reach computers, phones, and NAS storage on the same subnet.
                </p>
                <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-cyan-300 mb-1">Network Isolation Is the Strongest Defense</p>
                      <p className="text-sm text-slate-300">
                        Placing your TV on a dedicated IoT VLAN or guest Wi-Fi network prevents it from communicating with other devices on your primary network — regardless of what the TV's own settings say. This is a router-level control that no firmware update can undo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 6. App Permissions: The Third-Party Problem */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Globe className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  6. App Permissions: The Third-Party Problem
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Pre-installed smart TV apps are not passive. Streaming services, content guides, and even the TV's home screen launcher request permissions — location access, microphone access, storage permissions, and device identifiers — that extend data collection far beyond the manufacturer's own systems.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Many of these apps include Samba TV, a third-party ACR provider embedded in TVs from multiple manufacturers simultaneously. Samba TV has its own data-sharing agreements independent of the TV manufacturer, meaning disabling the manufacturer's ACR may not disable Samba TV's collection. Our configurator includes specific steps to address Samba TV where it is known to be present.
                </p>
              </div>
            </div>
          </div>

          {/* 7. The Firmware Update Reset Risk */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Radio className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  7. The Firmware Update Reset Risk
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  One of the most frustrating aspects of smart TV privacy is that firmware updates can silently re-enable settings you previously turned off. Manufacturers have re-enabled ACR, reset advertising IDs, and restored data-sharing agreements through routine software updates — sometimes with a new terms-of-service prompt, sometimes without any notice at all.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  This means privacy configuration is not a one-time task. After any major TV software update, it is worth revisiting your privacy settings to confirm they remain as you set them. Keeping a saved copy of your configuration checklist — which our tool lets you download — makes this re-audit fast and consistent.
                </p>
              </div>
            </div>
          </div>

          {/* 8. The Nuclear Option: Non-Smart TV + Streaming Stick */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Lock className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  8. The Most Private Setup: Non-Smart TV + External Streamer
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  If you are purchasing a new TV, the most privacy-preserving option is a "dumb" display — a high-quality monitor or a commercial-grade display without a smart platform — paired with a dedicated streaming device like an Apple TV 4K or Nvidia Shield Pro. This gives you full control over what software runs, with update schedules managed by a company whose business model is hardware and subscriptions rather than advertising data.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  For existing smart TVs, disabling Wi-Fi entirely and using only a wired Ethernet connection to a VLAN-isolated port — or disconnecting the TV from the internet altogether and using only an external streaming stick — eliminates the manufacturer's data collection almost entirely while preserving your streaming capability.
                </p>
              </div>
            </div>
          </div>

          {/* 9. What Our Configurator Covers */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Shield className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  9. What Our Configurator Covers
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  The Smart TV Privacy Configurator provides brand-specific, step-by-step instructions for 10 major TV platforms across six privacy categories: ACR tracking, voice and microphone access, advertising ID and personalization, network exposure, third-party app permissions, and router-level physical hardening.
                </p>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Every step is a clickable checkbox so you can track your progress and resume where you left off. When you're done, you can download a plain-text configuration report to save for your records — useful for verifying your settings after future firmware updates.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {[
                    { icon: <Eye className="w-4 h-4" />, label: 'ACR / Automatic Content Recognition', color: 'text-red-400' },
                    { icon: <Mic className="w-4 h-4" />, label: 'Voice Assistant & Microphone', color: 'text-orange-400' },
                    { icon: <Database className="w-4 h-4" />, label: 'Advertising ID & Personalization', color: 'text-orange-400' },
                    { icon: <Wifi className="w-4 h-4" />, label: 'Network & Smart Features', color: 'text-yellow-400' },
                    { icon: <Globe className="w-4 h-4" />, label: 'Third-Party App Permissions', color: 'text-yellow-400' },
                    { icon: <Lock className="w-4 h-4" />, label: 'Physical & Router-Level Hardening', color: 'text-blue-400' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-3 bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                      <span className={item.color}>{item.icon}</span>
                      <span className="text-sm text-slate-300">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <Tv className="w-5 h-5" />
              <span>📺 Open the Configurator Tool</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print this Guide</span>
            </button>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer and Important Notice:</strong> This page is provided for educational purposes only. Menu paths and setting names vary by TV model and firmware version. CyberLifeCoach and its affiliates make no warranties regarding the completeness or ongoing accuracy of the configuration steps provided, as manufacturers may change their software at any time. You are responsible for reviewing your own device's settings and privacy policies. CyberLifeCoach assumes no liability for outcomes arising from following these recommendations.
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
