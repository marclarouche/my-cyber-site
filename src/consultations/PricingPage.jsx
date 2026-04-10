import { Shield, CheckCircle, AlertTriangle, ArrowLeft, Phone, Wrench, Package } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/home-network-privacy" className="flex items-center space-x-3 group cursor-pointer">
              <img src="/logo.png" alt="CyberLifeCoach" className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:brightness-125 transition-all duration-300">
                CyberLifeCoach
              </span>
            </a>
            <button onClick={() => window.location.href = '/home-network-privacy'}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-all duration-300 border border-slate-700 hover:border-cyan-500">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home Network Privacy</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Transparent Pricing</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">On-Site Installation</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">No Hidden Fees</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Service Pricing
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
            All installations are performed on-site and include full configuration, device setup, and a walk-through before we leave. You purchase your own hardware using our spec sheet — we handle everything else. No hidden fees, no subscriptions.
          </p>
        </div>
      </section>

      {/* Hardware Note Banner */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6 flex items-start gap-4">
            <Package className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-300 mb-1">You supply the hardware — we supply the expertise</p>
              <p className="text-sm text-slate-400 leading-relaxed">
                We provide a detailed hardware specification sheet so you can order exactly what's needed before your installation date. This keeps costs transparent and eliminates any hardware liability. Typical hardware cost runs <span className="text-slate-300 font-medium">$80–$150</span> depending on the configuration you choose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-6">

            {/* Tier 1 */}
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 flex flex-col">
              <div className="mb-6">
                <span className="text-xs px-3 py-1 rounded-full bg-slate-700 text-slate-300 border border-slate-600">Standard</span>
                <h2 className="text-xl font-bold mt-3 mb-1">Pi-hole — Network Ad Blocking</h2>
                <p className="text-sm text-slate-400 leading-relaxed">DNS-level ad and tracker blocking for every device on your home network. No browser extensions needed.</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold text-white">$275</span>
                <span className="text-slate-500 text-sm ml-2">flat fee · labor only</span>
                <p className="text-xs text-slate-500 mt-1">Hardware purchased separately using our spec sheet</p>
              </div>
              <hr className="border-slate-700 mb-6" />
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">What's included</p>
              <div className="space-y-3 flex-1">
                {[
                  'Pi-hole installation & configuration',
                  'Router DNS configuration',
                  'Blocklist setup & auto-updates enabled',
                  'DNSSEC & upstream DNS (Cloudflare/Quad9)',
                  'All household devices verified',
                  'Dashboard walk-through before we leave',
                  '30 days post-installation support',
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Tier 2 - Featured */}
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border-2 border-cyan-500/60 p-8 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-bl from-cyan-500/20 to-transparent w-32 h-32 rounded-bl-full" />
              <div className="mb-6">
                <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">Recommended</span>
                <h2 className="text-xl font-bold mt-3 mb-1">Pi-hole + WireGuard VPN</h2>
                <p className="text-sm text-slate-400 leading-relaxed">Everything in standard, plus a personal VPN server so your protection follows you anywhere — on public WiFi, traveling, or at work.</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold text-white">$425</span>
                <span className="text-slate-500 text-sm ml-2">flat fee · labor only</span>
                <p className="text-xs text-slate-500 mt-1">Hardware purchased separately using our spec sheet</p>
              </div>
              <hr className="border-slate-700 mb-6" />
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Everything in standard, plus</p>
              <div className="space-y-3 flex-1">
                {[
                  'WireGuard VPN server configured on same device',
                  'Client setup on iOS & Android phones',
                  'Client setup on Mac or Windows laptop',
                  'Port forwarding & dynamic DNS configured',
                  'Pi-hole protection active on all VPN devices',
                  'All connections tested before we leave',
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Complexity note */}
          <p className="text-sm text-slate-500 text-center mb-12">
            Pricing is for standard home networks. Mesh systems, multiple access points, or ISP-locked gateways may require additional time — we assess this during your free consultation before you commit.
          </p>

          {/* Service Calls */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Wrench className="w-5 h-5 text-cyan-400" />
              <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Ongoing Support — As Needed</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-800/60 rounded-xl p-5 text-center border border-slate-700">
                <div className="text-3xl font-bold text-white mb-1">$50</div>
                <div className="text-sm text-slate-400">site visit fee</div>
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">Applied to every on-site service call regardless of scope</p>
              </div>
              <div className="bg-slate-800/60 rounded-xl p-5 text-center border border-slate-700">
                <div className="text-3xl font-bold text-white mb-1">$100</div>
                <div className="text-sm text-slate-400">per hour</div>
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">Billed in 30-minute increments after the first hour</p>
              </div>
              <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700 flex flex-col justify-center">
                <p className="text-sm text-slate-300 leading-relaxed">No monthly subscription required. If something needs attention — a whitelist update, a firmware change that reset your DNS, or anything else — just reach out and we'll schedule a visit. <span className="text-cyan-400">You only pay when you need us.</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/20 rounded-2xl p-10 text-center">
          <Phone className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">Not sure which option is right for you?</h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">We're happy to assess your network before you commit to anything. Complete the intake form and we'll follow up to discuss your setup.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/home-network-privacy/network-intake-form" className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105">
              Complete Network Assessment
            </a>
            <a href="https://cyberlifecoach.pro" className="px-8 py-3 rounded-lg font-semibold border border-slate-600 hover:border-cyan-500 transition-all hover:bg-slate-800">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/logo.png" alt="CyberLifeCoach" className="h-8 w-auto hover:scale-125 hover:brightness-125 transition-all duration-300" />
            <span className="font-bold text-lg hover:text-cyan-400 transition-all duration-300">CyberLifeCoach</span>
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
