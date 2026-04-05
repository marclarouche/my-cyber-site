import { useState } from "react";
import {
  Mail, Shield, Globe, CheckCircle, ChevronRight,
  Lock, Zap, Users, ExternalLink, Calendar, ArrowLeft, ArrowRight
} from "lucide-react";

const providers = [
  {
    id: "proton",
    name: "Proton Mail",
    badge: "PM",
    color: "#6d4aff",
    colorLight: "rgba(109,74,255,0.12)",
    colorBorder: "rgba(109,74,255,0.35)",
    tagline: "Swiss Privacy. Zero Compromise.",
    description:
      "End-to-end encrypted by default. Based in Geneva, Switzerland — outside US and EU jurisdiction. Zero-knowledge architecture means even Proton cannot read your mail.",
    highlights: ["End-to-end encryption", "Swiss jurisdiction", "Zero-knowledge", "Open-source apps"],
    bestFor: "Entrepreneurs who handle sensitive client data or need legal-grade confidentiality.",
    link: "https://proton.me/mail",
  },
  {
    id: "tuta",
    name: "Tuta",
    badge: "TU",
    color: "#e63946",
    colorLight: "rgba(230,57,70,0.10)",
    colorBorder: "rgba(230,57,70,0.3)",
    tagline: "Open Source. Fully Encrypted.",
    description:
      "Tuta encrypts your entire mailbox — including subject lines and sender metadata. Fully open-source and based in Germany, with a built-in encrypted calendar included.",
    highlights: ["Subject line encryption", "Encrypted calendar", "Fully open-source", "GDPR-compliant"],
    bestFor: "Founders who want total encryption coverage including calendar and contacts.",
    link: "https://tuta.com",
  },
];

const steps = [
  {
    num: "01",
    title: "Choose Your Domain",
    desc: "We help you pick a professional domain that matches your brand. Works with Namecheap, Cloudflare, GoDaddy, and most registrars.",
    icon: <Globe className="w-5 h-5" />,
  },
  {
    num: "02",
    title: "Select Your Provider",
    desc: "Pick Proton Mail or Tuta based on your priorities — both give you iron-clad privacy. We'll walk you through the differences.",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    num: "03",
    title: "DNS Configuration",
    desc: "We configure MX, SPF, DKIM, and DMARC records correctly — the technical layer most people get wrong.",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    num: "04",
    title: "Done With You",
    desc: "Live walkthrough session — you'll understand exactly what was set up and how to manage it going forward.",
    icon: <Users className="w-5 h-5" />,
  },
];

const features = [
  "Custom domain selection & registration guidance",
  "Proton Mail or Tuta setup & full configuration",
  "DNS records: MX, SPF, DKIM, DMARC — done right",
  "Professional address tied to your brand",
  "Live walkthrough session — done with you",
  "Migration help from Gmail, Outlook, or other providers",
  "Privacy-first from day one — no Big Tech",
  "Works with any registrar: Namecheap, Cloudflare, GoDaddy & more",
];

const faqs = [
  {
    q: "Do I need to already own a domain?",
    a: "No. We'll help you find and register the right domain as part of the setup process. If you already have one, we work with what you have.",
  },
  {
    q: "Can I keep my existing emails?",
    a: "Yes. We can help you migrate emails from Gmail, Outlook, or other providers into your new encrypted inbox.",
  },
  {
    q: "What's the difference between Proton and Tuta?",
    a: "Both are excellent. Proton is Swiss-based with a strong enterprise ecosystem. Tuta is German-based, encrypts metadata including subject lines, and includes an encrypted calendar. We'll help you choose based on your needs.",
  },
  {
    q: "How long does setup take?",
    a: "Most setups complete in a single 60–90 minute session. DNS propagation can take up to 24–48 hours, but your inbox is usually live within the hour.",
  },
  {
    q: "Is this a one-time fee?",
    a: "Yes — the $97 covers the full setup session. Your ongoing cost is just whatever your email provider charges (Proton and Tuta both have free tiers and paid plans).",
  },
];

export default function CustomEmailSetup() {
  const [activeProvider, setActiveProvider] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const provider = providers[activeProvider];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      {/* Nav */}
      <nav className="fixed w-full z-50 bg-slate-900/90 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <a href="/" className="flex items-center space-x-3 group cursor-pointer">
            <img
              src="/logo.png"
              alt="CyberLifeCoach"
              className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              CyberLifeCoach
            </span>
          </a>
          
          
         <div className="flex items-center space-x-6">
            <a href="/" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </a>
            <a
              href="https://calendly.com/cyberlifecoach-proton/new-meeting"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 text-sm"
            >
              Book Consultation
            </a>
          </div>
          </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-40 pb-8 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30 mb-8">
            <Mail className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-300">New Service — Now Available</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight">
            Own Your Inbox.<br />Own Your Identity.
          </h1>

          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Your email shouldn't live on Google's servers under Google's brand.
            Get a custom domain and an encrypted private inbox — built for solopreneurs
            who take their digital presence seriously.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/cyberlifecoach-proton/new-meeting"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Your Setup Session</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-4 rounded-lg font-semibold text-lg border-2 border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-900 flex items-center justify-center space-x-2"
            >
              <span>See How It Works</span>
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-500" /> No Big Tech required</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-500" /> $97 one-time setup</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-500" /> Done-with-you session</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-500" /> Privacy-first from day one</span>
          </div>
        </div>
      </section>
      {/* Why Own Your Domain */}
<section className="py-8 px-4">
  <div className="max-w-5xl mx-auto">
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10">
      <p className="text-slate-400 text-lg leading-relaxed mb-8">
        Think of your email like your home address. Using a free provider is like renting an apartment —
        it works, but you don't control the property. A custom domain is like owning your home.
        You decide where it lives, how it's secured, and when to move it.
      </p>

      <p className="text-slate-300 font-semibold mb-6">This shift matters for three key reasons:</p>

      <div className="space-y-6">
        <div className="flex gap-4">
          <span className="text-cyan-400 font-black text-lg w-6 flex-shrink-0">1</span>
          <div>
            <h4 className="font-bold text-white mb-1">Identity Portability</h4>
            <p className="text-slate-400 leading-relaxed">If you ever switch email providers, your address stays the same. No mass account updates, no lost contacts.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <span className="text-cyan-400 font-black text-lg w-6 flex-shrink-0">2</span>
          <div>
            <h4 className="font-bold text-white mb-1">Privacy Control</h4>
            <p className="text-slate-400 leading-relaxed">You can choose providers that align with your values — including those that minimize data collection or use end-to-end encryption.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <span className="text-cyan-400 font-black text-lg w-6 flex-shrink-0">3</span>
          <div>
            <h4 className="font-bold text-white mb-1">Security Ownership</h4>
            <p className="text-slate-400 leading-relaxed">You gain access to advanced protections like domain authentication, which helps prevent hackers and scammers from impersonating you.</p>
          </div>
          </div>
          <div className="flex gap-4">
         <span className="text-cyan-400 font-black text-lg w-6 flex-shrink-0">4</span>
        <div>
         <h4 className="font-bold text-white mb-1">Brand Identity</h4>
         <p className="text-slate-400 leading-relaxed">A custom domain signals professionalism and credibility. 
         Sending from <span className="text-slate-300 font-medium">you@yourbrand.com</span> tells clients 
         you're serious about your business — in a way that a Gmail or Outlook address simply can't.</p>
       </div>
       </div>
      </div>

      <div className="mt-8 pt-8 border-t border-slate-800">
        <p className="text-slate-300 leading-relaxed">
          In a world where phishing and identity theft are common, that control isn't just useful.
          <span className="text-cyan-400 font-semibold"> It's necessary.</span>
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Provider Comparison */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Two Providers. Both Exceptional.
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              We support setup for either Proton Mail or Tuta. Toggle between them to see which is right for you.
            </p>
          </div>

          {/* Toggle */}
          <div className="flex gap-4 justify-center mb-10">
            {providers.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActiveProvider(i)}
                className="flex items-center gap-3 px-6 py-3 rounded-xl border font-semibold text-sm transition-all duration-200"
                style={{
                  borderColor: activeProvider === i ? p.color : "rgba(255,255,255,0.1)",
                  background: activeProvider === i ? p.colorLight : "transparent",
                  color: activeProvider === i ? "#fff" : "#888",
                }}
              >
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: p.color }}
                >
                  {p.badge}
                </span>
                {p.name}
              </button>
            ))}
          </div>

          {/* Provider card */}
          <div
            className="rounded-2xl border p-10 transition-all duration-300"
            style={{
              background: provider.colorLight,
              borderColor: provider.colorBorder,
            }}
          >
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: provider.color }}
                  >
                    {provider.badge}
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold">{provider.name}</h3>
                    <p className="text-sm" style={{ color: provider.color }}>{provider.tagline}</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed mb-6">{provider.description}</p>
                <p className="text-sm text-slate-500">
                  <span className="font-semibold text-slate-400">Best for:</span> {provider.bestFor}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-4">Key Features</h4>
                <ul className="space-y-3 mb-8">
                  {provider.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: provider.color }} />
                      {h}
                    </li>
                  ))}
                </ul>
                <a
                  href={provider.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                  style={{ color: provider.color }}
                >
                  Visit {provider.name} <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-slate-400 text-lg">Four steps. One session. Done right the first time.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-cyan-500/30 to-transparent z-0" />
                )}
                <div className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-black text-slate-700">{step.num}</span>
                    <span className="text-cyan-400">{step.icon}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Everything Included
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                No hidden extras, no upsells. The $97 setup fee covers everything from domain selection through a live walkthrough with you.
              </p>
              <ul className="space-y-4">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-10 relative overflow-hidden">
              <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">One-Time Investment</span>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-6xl font-black text-white">$97</span>
                  <span className="text-slate-500 mb-2">setup fee</span>
                </div>
                <p className="text-slate-500 text-sm mt-1">
                  Ongoing cost = your provider's plan (free tiers available on both Proton & Tuta)
                </p>
              </div>

              <div className="border-t border-slate-800 pt-6 mb-8">
                <p className="text-slate-400 text-sm leading-relaxed">
                  A professional, encrypted email address tied to your own domain signals trust to clients and partners — and keeps your business identity completely yours.
                </p>
              </div>

              <a
                href="https://calendly.com/cyberlifecoach-proton/new-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-[1.02]"
              >
                Claim Your Domain →
              </a>

              <p className="text-center text-slate-600 text-xs mt-4">
                Works with Namecheap · Cloudflare · GoDaddy & more
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Common Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-all duration-200 hover:border-slate-700"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                >
                  <span className="font-semibold text-slate-200">{faq.q}</span>
                  <ChevronRight
                    className="w-5 h-5 text-slate-500 flex-shrink-0 transition-transform duration-200"
                    style={{ transform: openFaq === i ? "rotate(90deg)" : "rotate(0deg)" }}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-slate-800 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-cyan-900/30 to-blue-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <Lock className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Ready to ditch Big Tech email?</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Book a setup session and you'll walk away with a professional, encrypted inbox on your own domain — in under two hours.
          </p>
          <a
            href="https://calendly.com/cyberlifecoach-proton/new-meeting"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-5 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
          >
            <Calendar className="w-6 h-6" />
            <span>Book Your Setup Session</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-slate-600 text-sm mt-5">$97 one-time · No ongoing fees from us</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="CyberLifeCoach" className="h-8 w-auto hover:brightness-125 transition-all duration-300" />
            <span className="font-bold text-lg hover:text-cyan-400 transition-colors">CyberLifeCoach</span>
          </div>
          <p className="text-slate-500 text-sm text-center">
            © 2026 CyberLifeCoach | A Veteran-Owned Business Committed to Your Digital Security
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="/#services" className="hover:text-cyan-400 transition-colors">Services</a>
            <a href="/about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="mailto:cyberlifecoach@proton.me" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
