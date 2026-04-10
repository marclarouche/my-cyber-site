import React, { useState, useEffect } from 'react';
import { Shield, Settings, Radio, ArrowLeft, ChevronRight, Lock, CheckCircle, Clock, Zap } from 'lucide-react';

export default function MissionControl() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const ops = [
    {
      number: '01',
      icon: <Settings className="w-8 h-8" />,
      title: 'Social Automation Setup',
      description: 'Configure your Substack RSS feed, Bluesky App Password, and Claude API key. One-time setup — everything you need to run the automation dashboard.',
      cta: 'Open Setup Guide',
      href: '/clc-ops/social-setup',
      tag: 'Reference',
      tagColor: 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
      time: '~12 min • One time',
    },
    {
      number: '02',
      icon: <Radio className="w-8 h-8" />,
      title: 'Social Automation Dashboard',
      description: 'Fetch your latest Substack articles, generate AI-drafted posts with one click, edit if needed, and publish to Bluesky. Copy-paste to LinkedIn in seconds.',
      cta: 'Open Dashboard',
      href: '/clc-ops/social-automation',
      tag: 'Active Tool',
      tagColor: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
      time: 'Use after each article',
    },
    {
      number: '03',
      icon: <Shield className="w-8 h-8" />,
      title: 'Cloudflare Access Setup',
      description: "Step-by-step walkthrough of Cloudflare DNS migration, Zero Trust configuration, and Access policy setup. If you're reading this — it worked.",
      cta: 'View Guide',
      href: '/clc-ops/cloudflare-setup',
      tag: 'Complete ✅',
      tagColor: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
      time: 'Already done',
    },
  ];

  const stats = [
    { icon: <CheckCircle className="w-5 h-5" />, label: 'Access Control', value: 'Cloudflare Zero Trust' },
    { icon: <Lock className="w-5 h-5" />,         label: 'Auth Method',    value: 'One-Time PIN' },
    { icon: <Zap className="w-5 h-5" />,           label: 'Session',        value: '24 Hours' },
    { icon: <Clock className="w-5 h-5" />,         label: 'Local Time',     value: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) },
  ];

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
      `}</style>

      {/* ── NAV ── */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
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
              <span>Back to Site</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          {/* Ping badge */}
          <div className="inline-flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30 mb-8 hover:border-cyan-500/60 transition-all">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <span className="text-sm text-slate-300">Secure Session Active — Authenticated via Cloudflare Zero Trust</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight">
            Mission Control
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Internal operations dashboard. Only you can see this.
          </p>

          {/* Stats row */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <div key={i} className="text-center group cursor-default">
                <div className="flex justify-center text-cyan-400 mb-3 group-hover:text-cyan-300 group-hover:scale-110 transition-all duration-300 wobble-icon">
                  {s.icon}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">{s.label}</div>
                <div className="text-sm font-bold text-slate-300 group-hover:text-cyan-300 transition-colors">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPS CARDS ── */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Operations
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Three tools. One mission — publish great content and stay secure doing it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ops.map((op, i) => (
              <div key={i} className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 group flex flex-col">
                {/* Number + tag */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-black text-slate-800 group-hover:text-slate-700 transition-colors">{op.number}</span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${op.tagColor}`}>{op.tag}</span>
                </div>

                {/* Icon */}
                <div className="text-cyan-400 mb-5 group-hover:text-cyan-300 transition-colors wobble-icon">
                  {op.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3">{op.title}</h3>
                <p className="text-slate-400 mb-3 leading-relaxed flex-1">{op.description}</p>
                <p className="text-slate-600 text-xs mb-6 flex items-center gap-1.5">
                  <Clock className="w-3 h-3" /> {op.time}
                </p>

                {/* CTA */}
                <a
                  href={op.href}
                  className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-semibold group/link"
                >
                  <span>{op.cta}</span>
                  <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECURITY NOTE ── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-sm p-12 rounded-3xl border border-cyan-500/30">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How This Page Is Protected</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Everything under <code className="text-cyan-400 bg-slate-900/60 px-2 py-0.5 rounded text-sm font-mono">/clc-ops/*</code> is intercepted at Cloudflare's edge before React even loads.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {[
                { icon: <Lock className="w-6 h-6" />,        title: 'Zero passwords in your codebase',  desc: 'Auth is handled entirely by Cloudflare — nothing sensitive in your React source.' },
                { icon: <Shield className="w-6 h-6" />,      title: 'Edge-level interception',          desc: 'Requests never reach NearlyFreeSpeech unless Cloudflare approves them first.' },
                { icon: <CheckCircle className="w-6 h-6" />, title: 'Email OTP only',                   desc: 'A 6-digit code sent to your ProtonMail. No password to steal or guess.' },
                { icon: <Zap className="w-6 h-6" />,         title: 'Covers all /clc-ops/* routes',     desc: 'One Access policy protects every ops page automatically — no per-page config.' },
              ].map((item, i) => (
                <div key={i} className="group bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
                  <div className="text-cyan-400 mb-3 group-hover:text-cyan-300 transition-colors wobble-icon">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
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
            <p className="text-slate-600">Mission Control — Internal Use Only</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
