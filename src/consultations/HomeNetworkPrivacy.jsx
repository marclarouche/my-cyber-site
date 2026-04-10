import React from 'react';
import { Shield, Wifi, Lock, ChevronRight, ArrowLeft, CheckCircle, FileText, HelpCircle, DollarSign, Smartphone, Tv, Cpu, Router, Wand2, Sparkles } from 'lucide-react';

const ORBIT_RADIUS = 100;

const ORBITING_DEVICES = [
  { id: 'phone', IconComponent: Smartphone, label: 'Phone', angle: 0, color: 'text-blue-400' },
  { id: 'tv', IconComponent: Tv, label: 'TV', angle: 72, color: 'text-cyan-400' },
  { id: 'iot', IconComponent: Cpu, label: 'IoT', angle: 144, color: 'text-teal-400' },
  { id: 'tablet', IconComponent: Smartphone, label: 'Tablet', angle: 216, color: 'text-blue-300' },
  { id: 'console', IconComponent: Cpu, label: 'Console', angle: 288, color: 'text-cyan-300' },
];

function calculateOrbitPosition(angle) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: Math.cos(rad) * ORBIT_RADIUS,
    y: Math.sin(rad) * ORBIT_RADIUS,
  };
}

const LINKS_HUB = [
  { id: 'pricing', icon: DollarSign, title: 'Pricing', desc: 'Full breakdown of installation costs and service call rates.', href: '/home-network-privacy/pricing-page', cta: 'View Pricing' },
  { id: 'faq', icon: HelpCircle, title: 'Pi-hole FAQ', desc: 'Common questions about how DNS blocking works and what to expect.', href: '/home-network-privacy/pi-hole-faq', cta: 'Read FAQ' },
  { id: 'faq-vpn', icon: Lock, title: 'Pi-hole + VPN FAQ', desc: 'Everything about the WireGuard add-on and remote protection.', href: '/home-network-privacy/pi-hole-wireguard-faq', cta: 'Read FAQ' },
  { id: 'intake', icon: FileText, title: 'Network Assessment', desc: 'Start here — 3–5 minutes to help us understand your setup.', href: '/home-network-privacy/network-intake-form', cta: 'Start Assessment', primary: true },
];

export default function HomeNetworkPrivacy() {
  const [prompt, setPrompt] = React.useState('');
  const [enhancedPrompt, setEnhancedPrompt] = React.useState('');
  const [isEnhancing, setIsEnhancing] = React.useState(false);

  const enhancePrompt = React.useCallback(() => {
    if (!prompt.trim()) return;
    setIsEnhancing(true);
    const enhancements = [
      `I'd like to understand more about: ${prompt}`,
      `Could you elaborate on the specifics of "${prompt}" and provide detailed context?`,
      `For the topic of "${prompt}", consider including relevant background information, specific use cases, and desired outcomes.`,
      `Additional context for "${prompt}": Please specify your current situation, what you've already tried, and what specific help you need.`,
    ];
    const enhanced = enhancements[Math.floor(Math.random() * enhancements.length)];
    setTimeout(() => {
      setEnhancedPrompt(enhanced);
      setIsEnhancing(false);
    }, 800);
  }, [prompt]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <style>{`
        @keyframes wobble {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        .group:hover .wobble-icon {
          animation: wobble 0.4s ease-in-out;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .float { animation: float 4s ease-in-out infinite; }
        .float-delay { animation: float 4s ease-in-out infinite; animation-delay: 1.5s; }
      `}</style>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center space-x-3 group cursor-pointer">
              <img src="/logo.png" alt="CyberLifeCoach" className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300" />
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

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/30 to-transparent" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">On-Site Installation Service</span>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">San Bernardino County & Surrounding Areas</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight">
                Home Network Privacy Installation
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed mb-8">
                Every device in your home is making calls you never authorized — to ad networks, data brokers, and telemetry servers. We install a DNS-level filter that stops them all, network-wide, without touching a single device.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/home-network-privacy/network-intake-form"
                  className="group bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Get a Free Assessment</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="/home-network-privacy/pricing-page"
                  className="px-8 py-4 rounded-lg font-semibold text-lg border-2 border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-900 flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>View Pricing</span>
                </a>
              </div>
            </div>

            {/* Animated network diagram */}
            <div className="relative hidden lg:flex items-center justify-center h-80">
              {/* Router center */}
              <div className="absolute z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border-2 border-cyan-500/50 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Router className="w-8 h-8 text-cyan-400" />
              </div>
              {/* Pi-hole shield ring */}
              <div className="absolute w-36 h-36 rounded-full border-2 border-dashed border-cyan-500/30 animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute w-52 h-52 rounded-full border border-slate-700/50" />
              {/* Device icons orbiting */}
              {ORBITING_DEVICES.map(({ id, IconComponent, label, angle, color }) => {
                const Icon = IconComponent;
                const { x, y } = calculateOrbitPosition(angle);
                return (
                  <div key={id} className="absolute flex flex-col items-center gap-1"
                    style={{ transform: `translate(${x}px, ${y}px)` }}>
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <span className="text-xs text-slate-500">{label}</span>
                  </div>
                );
              })}
              {/* Shield label */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-full border border-cyan-500/30">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-xs text-cyan-400 font-medium">Pi-hole DNS Filter Active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's actually happening section */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              What's Happening on Your Network Right Now
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Before we install anything, we can show you exactly what your devices are doing — live, on a screen you can read.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { num: '20–40%', label: 'of all DNS traffic on a typical home network goes to ad networks and trackers', color: 'text-red-400' },
              { num: '100s', label: 'of calls per hour from a smart TV — most before you even touch the remote', color: 'text-orange-400' },
              { num: '0', label: 'software installs on your devices — one Pi-hole filters the entire network', color: 'text-cyan-400' },
            ].map((s, i) => (
              <div key={i} className="bg-slate-950 rounded-2xl border border-slate-700 p-8 text-center">
                <div className={`text-5xl font-black mb-3 ${s.color}`}>{s.num}</div>
                <p className="text-slate-400 leading-relaxed">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/20 rounded-2xl p-8 text-center">
            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
              We bring a live demo to your home — connect your own devices and watch the dashboard fill up in real time. Most people are genuinely shocked by what they see. <span className="text-cyan-400 font-medium">The demo is free and there's no obligation.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Two service tiers */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Two Ways to Protect Your Network</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Both options are installed on-site. You purchase the hardware using our spec sheet — we handle everything else.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Standard */}
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 flex flex-col">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Pi-hole</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Network-wide ad and tracker blocking. Every device protected automatically — phones, TVs, consoles, smart home devices.</p>
              </div>
              <div className="text-3xl font-bold text-white mb-1">$275 <span className="text-sm font-normal text-slate-500">labor · hardware separate</span></div>
              <hr className="border-slate-700 my-6" />
              <div className="space-y-3 flex-1">
                {['Pi-hole installation & DNS configuration', 'Router DNS setup', 'Blocklist configuration & auto-updates', 'All household devices verified', 'Dashboard walk-through'].map((f, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </div>
                ))}
              </div>
              <a href="/home-network-privacy/pi-hole-faq"
                className="mt-8 flex items-center justify-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                <HelpCircle className="w-4 h-4" />
                Frequently Asked Questions
              </a>
            </div>

            {/* Recommended */}
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border-2 border-cyan-500/60 p-8 flex flex-col relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold">Recommended</span>
              </div>
              <div className="absolute top-0 right-0 bg-gradient-to-bl from-cyan-500/10 to-transparent w-40 h-40 rounded-bl-full" />
              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Pi-hole + WireGuard VPN</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Everything in standard, plus a personal VPN server. Your protection follows you to coffee shops, hotels, and airports.</p>
              </div>
              <div className="text-3xl font-bold text-white mb-1">$425 <span className="text-sm font-normal text-slate-500">labor · hardware separate</span></div>
              <hr className="border-slate-700 my-6" />
              <div className="space-y-3 flex-1">
                {['Everything in Pi-hole standard', 'WireGuard VPN server on same device', 'Client setup on phones & laptops', 'Port forwarding & dynamic DNS', 'Pi-hole protection on all VPN devices'].map((f, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </div>
                ))}
              </div>
              <a href="/home-network-privacy/pi-hole-wireguard-faq"
                className="mt-8 flex items-center justify-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                <HelpCircle className="w-4 h-4" />
                Pi-hole + VPN FAQ
              </a>
            </div>
          </div>

          <div className="text-center mt-8">
            <a href="/home-network-privacy/pricing-page"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
              <DollarSign className="w-4 h-4" />
              Full pricing details including service calls
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-slate-400 text-lg">From inquiry to protected network in a few simple steps.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { num: '01', title: 'Complete the Assessment', desc: 'Fill out our network questionnaire so we can understand your setup and flag anything that needs a consultation first.', color: 'border-cyan-500/40' },
              { num: '02', title: 'Order Your Hardware', desc: 'We send you a precise spec sheet. You order the exact components — typically $80–$150 total from Amazon or similar.', color: 'border-blue-500/40' },
              { num: '03', title: 'We Come to You', desc: 'On-site installation typically takes 60–90 minutes. We configure everything and verify every device before we leave.', color: 'border-cyan-500/40' },
              { num: '04', title: 'Protected — and Yours', desc: "You own the hardware, you own the dashboard. If you ever need support, we're available for service calls.", color: 'border-blue-500/40' },
            ].map((step, i) => (
              <div key={i} className={`bg-slate-950 rounded-2xl border ${step.color} p-6 relative`}>
                <div className="text-4xl font-black text-slate-800 mb-4">{step.num}</div>
                <h3 className="font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                {i < 3 && <ChevronRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-700 z-10" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Links hub */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Everything You Need to Know</h2>
            <p className="text-slate-400">Explore the details before you commit to anything.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {LINKS_HUB.map(({ id, icon, title, desc, href, cta, primary }) => (
              <a key={id} href={href}
                className={`group rounded-2xl border p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 ${primary ? 'bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-cyan-500/40 hover:border-cyan-400' : 'bg-slate-900/80 border-slate-700 hover:border-cyan-500/50'}`}>
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 group-hover:border-cyan-500/50 transition-colors wobble-icon">
                  {icon === DollarSign && <DollarSign className="w-5 h-5 text-cyan-400" />}
                  {icon === HelpCircle && <HelpCircle className="w-5 h-5 text-cyan-400" />}
                  {icon === Lock && <Lock className="w-5 h-5 text-cyan-400" />}
                  {icon === FileText && <FileText className="w-5 h-5 text-cyan-400" />}
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed flex-1 mb-4">{desc}</p>
                <div className="flex items-center gap-1.5 text-sm text-cyan-400 font-medium group-hover:text-cyan-300 transition-colors">
                  {cta} <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-cyan-900/30 to-blue-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <Wifi className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to See What Your Network Is Doing?</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Complete the network assessment and we'll reach out to discuss your setup — no commitment required. Or contact us directly if you have questions first.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/home-network-privacy/network-intake-form"
              className="group bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-3">
              <FileText className="w-5 h-5" />
              <span>Start Free Assessment</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="mailto:cyberlifecoach@proton.me"
              className="px-10 py-4 rounded-lg font-semibold text-lg border-2 border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-900">
              Contact Us First
            </a>
          </div>
          <p className="text-slate-500 mt-6 text-sm">We follow up within one business day.</p>
        </div>
      </section>

      {/* Enhance Prompt Tool */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Wand2 className="w-6 h-6 text-cyan-400" />
              <h2 className="text-3xl font-bold">Enhance Your Prompt</h2>
            </div>
            <p className="text-slate-400">
              Type a prompt below and click the button to enhance it with additional context, clarification, and improved wording.
            </p>
          </div>
          
          <div className="bg-slate-950 rounded-2xl border border-slate-700 p-6">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your prompt here (e.g., How do I secure my home network?)"
              className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
            />
            
            <button
              onClick={enhancePrompt}
              disabled={isEnhancing || !prompt.trim()}
              className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isEnhancing ? (
                <>
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  <span>Enhancing...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  <span>Enhance Prompt</span>
                </>
              )}
            </button>
            
            {enhancedPrompt && (
              <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-cyan-500/30">
                <div className="flex items-center gap-2 text-cyan-400 font-medium mb-2">
                  <Sparkles className="w-4 h-4" />
                  Enhanced Prompt:
                </div>
                <p className="text-slate-300 leading-relaxed">{enhancedPrompt}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/logo.png" alt="CyberLifeCoach" className="h-8 w-auto hover:scale-125 hover:brightness-125 transition-all duration-300" />
            <span className="font-bold text-lg hover:text-cyan-400 hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] transition-all duration-300">CyberLifeCoach</span>
          </div>
          <div className="text-slate-500 text-sm">
            <p>&copy; 2026 CyberLifeCoach</p>
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
