import { useState } from 'react';
import { ArrowLeft, Monitor, Wifi, Eye, ChevronRight, AlertTriangle, CheckCircle, Terminal, Copy } from 'lucide-react';

const steps = [
  {
    id: 1,
    phase: 'Before the Visit',
    title: 'Install Docker Desktop on Your MacBook',
    icon: Monitor,
    content: (
      <div className="space-y-4 text-sm text-slate-400 leading-relaxed">
        <p>Download Docker Desktop from <a href="https://www.docker.com/products/docker-desktop/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300">docker.com/products/docker-desktop</a>. Choose the correct version for your Mac:</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <p className="font-medium text-slate-300 mb-1">Apple Silicon (M1/M2/M3/M4)</p>
            <p className="text-xs text-slate-500">Download the Apple Silicon build</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <p className="font-medium text-slate-300 mb-1">Intel Mac</p>
            <p className="text-xs text-slate-500">Download the Intel/x86-64 build</p>
          </div>
        </div>
        <p>Not sure which you have? Run this in Terminal:</p>
        <CodeBlock code="uname -m" note="arm64 = Apple Silicon · x86_64 = Intel" />
        <p>Once installed, you'll see the Docker whale icon in your menu bar when it's running.</p>
      </div>
    ),
  },
  {
    id: 2,
    phase: 'Before the Visit',
    title: 'Run Pi-hole in Docker',
    icon: Terminal,
    content: (
      <div className="space-y-4 text-sm text-slate-400 leading-relaxed">
        <p>Create a file called <code className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300 text-xs">docker-compose.yml</code> anywhere on your Mac with the following contents:</p>
        <CodeBlock code={`version: "3"
services:
  pihole:
    image: pihole/pihole:latest
    container_name: pihole
    ports:
      - "53:53/tcp"
      - "53:53/udp"
      - "8080:80/tcp"
    environment:
      TZ: 'America/Los_Angeles'
      WEBPASSWORD: 'cyberlife'
    volumes:
      - pihole_data:/etc/pihole
      - dnsmasq_data:/etc/dnsmasq.d
    restart: unless-stopped
volumes:
  pihole_data:
  dnsmasq_data:`} />
        <p>Then start it with:</p>
        <CodeBlock code="docker compose up -d" note="Pi-hole will be running at http://localhost:8080/admin" />
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-300">Port 53 is the DNS port. On some Macs, a system service may already be using port 53. If you see a conflict error, see the note below about disabling mDNSResponder temporarily.</p>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    phase: 'Before the Visit',
    title: 'Enable Internet Sharing / Hotspot',
    icon: Wifi,
    content: (
      <div className="space-y-4 text-sm text-slate-400 leading-relaxed">
        <p>Your MacBook will share its internet connection over WiFi so the prospect's devices connect to it — and route all DNS through your Pi-hole container.</p>
        <div className="space-y-3">
          {[
            'Go to System Settings → General → Sharing',
            'Click Internet Sharing',
            'Share your connection from: Wi-Fi (or Ethernet if connected via cable)',
            'To computers using: Wi-Fi',
            'Set a recognizable hotspot name — e.g. "CyberLifeCoach Demo"',
            'Turn Internet Sharing ON',
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
              <span>{s}</span>
            </div>
          ))}
        </div>
        <p>Then manually set your MacBook's DNS (in the hotspot network settings) to <code className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300 text-xs">127.0.0.1</code> so hotspot clients route DNS through your Pi-hole container.</p>
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-300">macOS Sequoia changed some hotspot settings. If Internet Sharing doesn't appear in the expected location, go to System Settings → General → Sharing and look for it there. The DNS override may need to be done via <code className="bg-yellow-900/30 px-1 rounded">networksetup</code> in Terminal.</p>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    phase: 'At the Prospect Visit',
    title: 'Connect Their Devices to Your Hotspot',
    icon: Wifi,
    content: (
      <div className="space-y-4 text-sm text-slate-400 leading-relaxed">
        <p>Ask the prospect to connect one or more of their devices to your "CyberLifeCoach Demo" hotspot — their phone works great for this.</p>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-2">
          <p className="font-medium text-slate-300 text-xs uppercase tracking-wider">Best devices to demonstrate with</p>
          <div className="space-y-1.5">
            {[
              { d: 'Smart TV', note: 'Often the most shocking — hundreds of telemetry calls per hour' },
              { d: 'Their phone', note: 'Easy to connect, immediate results visible' },
              { d: 'Amazon Echo / Google Home', note: 'Constant background DNS traffic to home servers' },
              { d: 'Gaming console', note: 'Significant telemetry and ad-related traffic' },
            ].map(({ d, note }) => (
              <div key={d} className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div><span className="text-slate-300">{d}</span> <span className="text-slate-500 text-xs">— {note}</span></div>
              </div>
            ))}
          </div>
        </div>
        <p>Let the device sit for 2–3 minutes without anyone actively using it. Background traffic alone is usually enough to make the point.</p>
      </div>
    ),
  },
  {
    id: 5,
    phase: 'At the Prospect Visit',
    title: 'Show Them the Dashboard',
    icon: Eye,
    content: (
      <div className="space-y-4 text-sm text-slate-400 leading-relaxed">
        <p>Open your MacBook browser and go to:</p>
        <CodeBlock code="http://localhost:8080/admin" note="Password: cyberlife (or whatever you set in docker-compose.yml)" />
        <p>Walk them through what they're seeing:</p>
        <div className="space-y-3">
          {[
            { label: 'Total DNS queries', talk: 'Every one of these is a request a device on your network made — apps, TVs, phones, all of it.' },
            { label: 'Queries blocked', talk: 'These never reached the internet. Ads, trackers, telemetry — stopped before they loaded.' },
            { label: 'Top blocked domains', talk: 'Recognize any of these? That Samsung TV just tried to reach analytics servers 47 times in three minutes.' },
            { label: 'Per-client breakdown', talk: 'We can see exactly which device is making which requests. This is your own network — fully visible for the first time.' },
          ].map(({ label, talk }) => (
            <div key={label} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <p className="font-medium text-cyan-300 text-xs mb-1">{label}</p>
              <p className="text-xs text-slate-400 italic">"{talk}"</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 6,
    phase: 'After the Visit',
    title: 'Tear Down the Demo',
    icon: Terminal,
    content: (
      <div className="space-y-4 text-sm text-slate-400 leading-relaxed">
        <p>When you're done, stop the Pi-hole container and turn off Internet Sharing:</p>
        <CodeBlock code="docker compose down" note="This stops Pi-hole and frees up port 53" />
        <p>Turn off Internet Sharing in System Settings → General → Sharing, then reconnect your own network to its normal DNS settings.</p>
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-cyan-300">The Pi-hole container and its data persist between demos. Next time just run <code className="bg-cyan-900/30 px-1 rounded">docker compose up -d</code> again and it picks up where it left off.</p>
        </div>
      </div>
    ),
  },
];

function CodeBlock({ code, note }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative">
      <pre className="bg-slate-950 border border-slate-700 rounded-lg p-4 text-xs text-cyan-300 font-mono overflow-x-auto whitespace-pre-wrap">{code}</pre>
      <button onClick={copy} className="absolute top-2 right-2 p-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-colors">
        {copied ? <CheckCircle className="w-3.5 h-3.5 text-cyan-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
      </button>
      {note && <p className="text-xs text-slate-500 mt-1.5 italic">{note}</p>}
    </div>
  );
}

export default function LiveDemoTool() {
  const [activeStep, setActiveStep] = useState(1);
  const current = steps.find(s => s.id === activeStep);
  const phases = [...new Set(steps.map(s => s.phase))];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/security-center" className="flex items-center space-x-3 group cursor-pointer">
              <img src="/logo.png" alt="CyberLifeCoach" className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">CyberLifeCoach</span>
            </a>
            <button onClick={() => window.location.href = '/clc-ops'}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-all duration-300 border border-slate-700 hover:border-cyan-500">
              <ArrowLeft className="w-4 h-4" /><span>Back to Mission Control</span>
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
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Internal Tool</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Prospect Demo Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Live Network Demo
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
            Run Pi-hole in Docker on your MacBook, share your hotspot, and let a prospect's own devices show them exactly what's happening on their network. Nothing sells this service better than a customer watching their own TV make 400 calls to tracking servers.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

          {/* Step Navigator */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 sticky top-28">
              <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">Demo Steps</p>
              {phases.map(phase => (
                <div key={phase} className="mb-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">{phase}</p>
                  <div className="space-y-1">
                    {steps.filter(s => s.phase === phase).map(step => {
                      const Icon = step.icon;
                      return (
                        <button
                          key={step.id}
                          onClick={() => setActiveStep(step.id)}
                          className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                            activeStep === step.id
                              ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300'
                              : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-transparent'
                          }`}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <span className="leading-tight">{step.title}</span>
                          {activeStep === step.id && <ChevronRight className="w-3 h-3 ml-auto flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs text-slate-500 uppercase tracking-wider">{current.phase}</span>
              </div>
              <h2 className="text-2xl font-bold mb-6 text-white">
                <span className="text-cyan-500 mr-2">{current.id}.</span>{current.title}
              </h2>
              {current.content}

              {/* Navigation */}
              <div className="flex justify-between mt-10 pt-6 border-t border-slate-700">
                <button
                  onClick={() => setActiveStep(s => Math.max(1, s - 1))}
                  disabled={activeStep === 1}
                  className="px-5 py-2 rounded-lg border border-slate-700 text-sm text-slate-400 hover:border-cyan-500 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => setActiveStep(s => Math.min(steps.length, s + 1))}
                  disabled={activeStep === steps.length}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
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
