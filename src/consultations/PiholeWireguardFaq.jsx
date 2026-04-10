import { useState } from 'react';
import { ArrowLeft, Plus, X, Shield, Eye, Settings, Lock, Wifi } from 'lucide-react';

const faqs = {
  basics: {
    label: 'The Basics',
    icon: Shield,
    items: [
      {
        q: 'What exactly is a DNS-level ad blocker?',
        a: 'Every time a device on your network loads a webpage or app, it makes DNS queries — essentially asking "what is the address of this server?" A DNS-level blocker intercepts those queries and refuses to resolve ones that point to known ad networks, tracking servers, and malicious domains. The request never leaves your network, so the ad or tracker is blocked before it ever loads.',
      },
      {
        q: 'How is this different from a browser ad blocker?',
        a: 'Browser-based ad blockers (like uBlock Origin) only protect that one browser on that one device. A DNS-level blocker protects your entire network — every phone, tablet, smart TV, gaming console, and IoT device — without installing anything on any of them. It also blocks tracking that happens outside of browsers entirely, such as within apps.',
      },
      {
        q: 'What hardware is used and where does it live?',
        a: 'We configure a Raspberry Pi — a small, low-power single-board computer roughly the size of a deck of cards — that you purchase using our hardware spec sheet. It runs continuously in the background near your router. If you add the WireGuard VPN option, it runs on the same device at no additional hardware cost. Power consumption is minimal, around 3–5 watts.',
      },
      {
        q: 'Will this slow down my internet?',
        a: 'No — in most cases it makes browsing feel slightly faster, because blocked requests never load at all. DNS resolution on the device itself is extremely fast, typically under 1 millisecond for cached queries. WireGuard has negligible overhead compared to older VPN protocols and is designed to be fast.',
      },
    ],
  },
  privacy: {
    label: 'Privacy & Security',
    icon: Eye,
    items: [
      {
        q: 'What kinds of threats does this block?',
        a: 'The service blocks DNS queries to known ad networks, third-party tracking servers, telemetry endpoints, and domains flagged as malicious or phishing-related. Blocklists are curated from multiple community-maintained sources and updated regularly. It does not replace a firewall or antivirus but adds a meaningful layer of network-level protection.',
      },
      {
        q: 'Can I see what is being blocked on my network?',
        a: 'Yes. The device runs a local web dashboard accessible from any browser on your network. It displays real-time and historical DNS query data, top blocked domains, per-device query counts, and block percentages. Your data stays on your local network and is never sent to any external service.',
      },
      {
        q: 'Does this log or store my browsing history?',
        a: 'The device logs DNS queries locally for dashboard display purposes. This data never leaves your network. Query logging can be configured or disabled entirely at your request. We do not have remote access to your device or its logs after installation unless you request remote support and explicitly grant access.',
      },
    ],
  },
  installation: {
    label: 'Installation & Support',
    icon: Settings,
    items: [
      {
        q: 'What does the installation process involve?',
        a: 'Installation is performed on-site and typically takes 60–90 minutes for Pi-hole only, or up to 2 hours for the Pi-hole + WireGuard combination. We configure the device, connect it to your network, set up and test all VPN client connections on your devices, and walk you through everything before we leave.',
      },
      {
        q: 'What happens if a website I use gets blocked by mistake?',
        a: 'False positives do occasionally occur, especially with newer or less common services. Any blocked domain can be whitelisted immediately through the dashboard or by contacting us. We configure the initial blocklists conservatively to minimize disruption to normal browsing.',
      },
      {
        q: 'What happens if the device loses power or fails?',
        a: 'The device is configured to restart automatically on power loss and resume both filtering and VPN service without any action on your part. In the unlikely event of hardware failure, your network falls back to standard DNS operation — internet access continues normally, just without filtering until the device is replaced.',
      },
      {
        q: 'Is ongoing maintenance required?',
        a: 'Blocklists update automatically. Occasional software updates are recommended every few months. There is no monthly subscription — we perform updates remotely on request or during a brief on-site service call. You only pay when you need us.',
      },
      {
        q: 'What if I get a new router or change my internet provider?',
        a: 'A router or ISP change can reset your DNS settings and port forwarding configuration. This is a quick fix — just give us a call and we can walk you through it remotely or schedule a service visit. It typically takes less than 15–30 minutes depending on your setup.',
      },
    ],
  },
  wireguard: {
    label: 'WireGuard VPN Add-on',
    icon: Lock,
    accent: true,
    items: [
      {
        q: 'What does the WireGuard VPN actually do?',
        a: 'WireGuard turns your Raspberry Pi into a personal VPN server. When enabled on your phone or laptop, all of your internet traffic routes through your home network — giving you remote access to your home devices and routing your DNS queries through your Pi-hole at the same time. This means your ad and tracker blocking follows you wherever you go, even on public WiFi.',
      },
      {
        q: 'What can I access remotely with this enabled?',
        a: 'Once connected via WireGuard, your phone or laptop behaves as if it is physically on your home network. You can access the Pi-hole dashboard, any networked devices such as a NAS or home server, and browse the internet with your home IP address. All traffic is encrypted end-to-end between your device and your home network.',
      },
      {
        q: 'Why does this matter on public WiFi?',
        a: 'Public WiFi networks at hotels, airports, and coffee shops are unencrypted and potentially monitored. Without a VPN, your DNS queries and unencrypted traffic are visible to anyone on the same network. With WireGuard active, your traffic is encrypted from your device to your home router before it reaches the internet — significantly reducing your exposure on untrusted networks.',
      },
      {
        q: 'How is WireGuard different from a commercial VPN service?',
        a: 'Commercial VPN services route your traffic through their own servers, meaning you are trusting that company with your data. With WireGuard on your own Raspberry Pi, you are the VPN provider — your traffic routes through your home internet connection and no third party is involved. You also get the added benefit of Pi-hole ad blocking on all connected devices automatically, which commercial VPNs do not provide.',
      },
      {
        q: 'How do I connect to it on my phone or laptop?',
        a: 'We install the free WireGuard app on your iOS or Android phone and configure your Mac or Windows laptop during the setup visit. Each device gets a unique configuration — we handle the setup and test each connection before we leave. Connecting is as simple as tapping a toggle in the WireGuard app. No technical knowledge is required after the initial setup.',
      },
      {
        q: 'Does my home internet connection need to meet any requirements?',
        a: 'Your router needs to support port forwarding, which the majority of consumer routers do. We configure this during installation. A static IP address from your ISP is ideal but not required — we configure dynamic DNS to handle connections reliably even if your home IP address changes. ISP-provided gateways that are fully locked down may limit options, which we assess during the initial consultation.',
      },
    ],
  },
};

function FaqItem({ q, a, accent }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-xl border transition-all duration-200 overflow-hidden ${
      open
        ? accent ? 'border-blue-400/50 bg-blue-900/20' : 'border-cyan-500/50 bg-slate-800/60'
        : accent ? 'border-blue-500/30 bg-slate-900/40' : 'border-slate-700 bg-slate-900/60'
    }`}>
      <button onClick={() => setOpen(!open)} className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 group">
        <span className={`font-medium text-sm leading-relaxed transition-colors ${open ? (accent ? 'text-blue-300' : 'text-cyan-300') : 'text-slate-200 group-hover:text-white'}`}>{q}</span>
        <span className={`flex-shrink-0 mt-0.5 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>
          {open
            ? <X className={`w-4 h-4 ${accent ? 'text-blue-400' : 'text-cyan-400'}`} />
            : <Plus className={`w-4 h-4 text-slate-500 group-hover:${accent ? 'text-blue-400' : 'text-cyan-400'}`} />}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-slate-700/50 pt-4">{a}</div>
      )}
    </div>
  );
}

export default function PiholeWireguardFaq() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/home-network-privacy" className="flex items-center space-x-3 group cursor-pointer">
              <img src="/logo.png" alt="CyberLifeCoach" className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">CyberLifeCoach</span>
            </a>
            <button onClick={() => window.location.href = '/home-network-privacy'}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-all duration-300 border border-slate-700 hover:border-cyan-500">
              <ArrowLeft className="w-4 h-4" /><span>Back to Home Network Privacy</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-blue-500/10 rounded-full filter blur-2xl animate-pulse" style={{animationDelay:'1s'}} />
        <div className="relative max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Network Privacy Service</span>
            <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">+ VPN Protection</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Pi-hole + WireGuard VPN
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed mb-8">
            Network-level ad and tracker blocking for every device at home, plus a personal VPN server that extends your protection to every network you connect to.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { num: '20–40%', label: 'of typical home DNS traffic is ads or trackers' },
              { num: 'Every', label: 'device protected — at home and on the road' },
              { num: 'Zero', label: 'third parties involved — you own your VPN' },
            ].map((s, i) => (
              <div key={i} className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-1">{s.num}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WireGuard Banner */}
      <section className="px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border border-blue-500/30 rounded-2xl p-6 flex items-center gap-4">
            <Lock className="w-8 h-8 text-blue-400 flex-shrink-0" />
            <div>
              <p className="font-semibold text-blue-300 mb-1">Take your protection with you</p>
              <p className="text-sm text-slate-400 leading-relaxed">Add a WireGuard VPN server to your Raspberry Pi and connect securely to your home network from anywhere — same device, no additional hardware required.</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {['iPhone', 'Android', 'Mac', 'Windows', 'Linux'].map(d => (
                  <span key={d} className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">{d}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto space-y-10">
          {Object.values(faqs).map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.label}>
                <div className={`flex items-center gap-2 mb-4 ${section.accent ? 'text-blue-400' : 'text-cyan-400'}`}>
                  <Icon className="w-4 h-4" />
                  <h2 className="text-xs font-semibold uppercase tracking-wider">{section.label}</h2>
                </div>
                <div className="space-y-2">
                  {section.items.map((item, i) => <FaqItem key={i} {...item} accent={section.accent} />)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/20 rounded-2xl p-8 text-center">
          <p className="text-slate-300 mb-4">Have a question not covered here?</p>
          <a href="mailto:cyberlifecoach@proton.me" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">Contact us at cyberlifecoach.pro</a>
          <span className="text-slate-500 mx-3">—</span>
          <span className="text-slate-400 text-sm">we're happy to walk through your specific setup before you commit to anything.</span>
        </div>
      </section>

      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/logo.png" alt="CyberLifeCoach" className="h-8 w-auto hover:scale-125 hover:brightness-125 transition-all duration-300" />
            <span className="font-bold text-lg hover:text-cyan-400 transition-all duration-300">CyberLifeCoach</span>
          </div>
          <div className="text-slate-500 text-sm">
            <p>&copy; 2026 CyberLifeCoach</p>
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
