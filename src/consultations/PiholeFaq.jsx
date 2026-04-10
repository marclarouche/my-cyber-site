import { useState } from 'react';
import { ArrowLeft, Plus, X, Shield, Wifi, Eye, Settings } from 'lucide-react';

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
        a: 'We configure a Raspberry Pi — a small, low-power single-board computer roughly the size of a deck of cards — that you purchase using our hardware spec sheet. It runs continuously in the background, typically placed near your router. Power consumption is minimal, around 3–5 watts, less than an LED nightlight.',
      },
      {
        q: 'Will this slow down my internet?',
        a: 'No — in most cases it makes browsing feel slightly faster, because blocked requests never load at all. DNS resolution on the device itself is extremely fast, typically under 1 millisecond for cached queries. You will not notice any latency impact during normal use.',
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
        a: 'Installation is performed on-site and typically takes 60–90 minutes. We configure the device, connect it to your network, update your router\'s DNS settings to point to the new device, verify all household devices are routing through it correctly, and walk you through the dashboard before we leave. You do not need to be technically experienced — we handle everything.',
      },
      {
        q: 'What happens if a website I use gets blocked by mistake?',
        a: 'False positives do occasionally occur, especially with newer or less common services. Any blocked domain can be whitelisted immediately through the dashboard or by contacting us. We also configure the initial blocklists conservatively to minimize disruption to normal browsing.',
      },
      {
        q: 'What happens if the device loses power or fails?',
        a: 'The device is configured to restart automatically on power loss and resume filtering without any action on your part. In the unlikely event of hardware failure, your network falls back to standard DNS operation — internet access continues normally, just without filtering until the device is replaced or repaired.',
      },
      {
        q: 'Is ongoing maintenance required?',
        a: 'Blocklists update automatically. Occasional software updates to the underlying system are recommended every few months. We perform updates remotely on request or during a brief on-site service call. There is no monthly subscription — you only pay when you need us.',
      },
      {
        q: 'What if I get a new router or change my internet provider?',
        a: 'A router or ISP change can reset your DNS settings, which means your Pi-hole stops filtering until reconfigured. This is a quick fix — just give us a call and we can walk you through it remotely or schedule a service visit. It typically takes less than 15 minutes.',
      },
    ],
  },
};

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-xl border transition-all duration-200 overflow-hidden ${open ? 'border-cyan-500/50 bg-slate-800/60' : 'border-slate-700 bg-slate-900/60'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 group"
      >
        <span className={`font-medium text-sm leading-relaxed transition-colors ${open ? 'text-cyan-300' : 'text-slate-200 group-hover:text-white'}`}>{q}</span>
        <span className={`flex-shrink-0 mt-0.5 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>
          {open ? <X className="w-4 h-4 text-cyan-400" /> : <Plus className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-slate-700/50 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

export default function PiholeFaq() {
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
        <div className="relative max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Network Privacy Service</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Home Network Ad & Tracker Blocking
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed mb-8">
            A network-level DNS filtering service that protects every device in your home from ads, trackers, and malicious domains — no software to install on each device.
          </p>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { num: '20–40%', label: 'of typical home DNS traffic is ads or trackers' },
              { num: 'Every', label: 'device on your network is protected automatically' },
              { num: 'Zero', label: 'software installs required on your devices' },
            ].map((s, i) => (
              <div key={i} className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-1">{s.num}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{s.label}</div>
              </div>
            ))}
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
                <div className="flex items-center gap-2 mb-4">
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">{section.label}</h2>
                </div>
                <div className="space-y-2">
                  {section.items.map((item, i) => <FaqItem key={i} {...item} />)}
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
