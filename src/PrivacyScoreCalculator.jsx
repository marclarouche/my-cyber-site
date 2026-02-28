import React, { useState, useEffect } from 'react';
import {
  Shield, Lock, Eye, Calendar, ChevronRight, Menu, X,
  CheckCircle, AlertTriangle, XCircle, RefreshCw,
  Smartphone, Wifi, Globe, Database, Mail, Users,
  ArrowRight, ArrowLeft, ExternalLink
} from 'lucide-react';

// ── QUESTIONS ─────────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: 'devices',
    label: 'Device Security',
    icon: Smartphone,
    color: 'cyan',
    questions: [
      {
        id: 'q1',
        text: 'Do you use a unique, strong password or PIN on all your devices (phone, laptop, tablet)?',
        weight: 3,
      },
      {
        id: 'q2',
        text: 'Is full-disk encryption enabled on your laptop and phone?',
        weight: 3,
      },
      {
        id: 'q3',
        text: 'Do you keep your operating system and apps updated within 48 hours of a security patch?',
        weight: 2,
      },
      {
        id: 'q4',
        text: 'Do you use a reputable antivirus / endpoint protection tool?',
        weight: 2,
      },
    ],
  },
  {
    id: 'accounts',
    label: 'Account & Password Hygiene',
    icon: Lock,
    color: 'blue',
    questions: [
      {
        id: 'q5',
        text: 'Do you use a password manager (e.g. Bitwarden, 1Password) to generate and store unique passwords?',
        weight: 4,
      },
      {
        id: 'q6',
        text: 'Do you have multi-factor authentication (MFA) enabled on your email account?',
        weight: 4,
      },
      {
        id: 'q7',
        text: 'Do you have MFA enabled on your financial and social media accounts?',
        weight: 3,
      },
      {
        id: 'q8',
        text: 'Have you checked if your email has appeared in a data breach (e.g. haveibeenpwned.com)?',
        weight: 2,
      },
    ],
  },
  {
    id: 'browsing',
    label: 'Browsing & Network',
    icon: Wifi,
    color: 'teal',
    questions: [
      {
        id: 'q9',
        text: 'Do you use a privacy-focused browser or browser extensions (e.g. uBlock Origin, Privacy Badger)?',
        weight: 2,
      },
      {
        id: 'q10',
        text: 'Do you avoid using public Wi-Fi without a VPN?',
        weight: 3,
      },
      {
        id: 'q11',
        text: 'Do you regularly clear cookies and browser history, or use private/incognito mode for sensitive browsing?',
        weight: 2,
      },
      {
        id: 'q12',
        text: 'Is your home router running the latest firmware with a strong admin password (not the default)?',
        weight: 3,
      },
    ],
  },
  {
    id: 'data',
    label: 'Data & Digital Footprint',
    icon: Database,
    color: 'indigo',
    questions: [
      {
        id: 'q13',
        text: 'Have you reviewed and limited the permissions apps have on your phone (location, camera, contacts)?',
        weight: 3,
      },
      {
        id: 'q14',
        text: 'Do you avoid sharing your real phone number online by using a secondary number or alias?',
        weight: 2,
      },
      {
        id: 'q15',
        text: 'Have you searched for your name online to see what personal data is publicly accessible?',
        weight: 2,
      },
      {
        id: 'q16',
        text: 'Do you opt out of data broker sites or use a service to remove your information?',
        weight: 3,
      },
    ],
  },
  {
    id: 'communications',
    label: 'Communications',
    icon: Mail,
    color: 'sky',
    questions: [
      {
        id: 'q17',
        text: 'Do you use an encrypted messaging app (e.g. Signal, Element) for sensitive conversations?',
        weight: 3,
      },
      {
        id: 'q18',
        text: 'Do you use a privacy-focused email provider or email aliases (e.g. SimpleLogin, ProtonMail)?',
        weight: 3,
      },
      {
        id: 'q19',
        text: 'Can you identify phishing emails and do you avoid clicking links in unsolicited messages?',
        weight: 4,
      },
      {
        id: 'q20',
        text: 'Do you avoid sharing sensitive information (SSN, banking details) over email or text?',
        weight: 3,
      },
    ],
  },
];

const TOTAL_WEIGHT = CATEGORIES.reduce(
  (sum, cat) => sum + cat.questions.reduce((s, q) => s + q.weight, 0),
  0
);

// ── SCORE BANDS ───────────────────────────────────────────────────────────────
function getScoreBand(pct) {
  if (pct >= 85) return {
    label: 'Privacy Champion',
    grade: 'A',
    color: 'emerald',
    hex: '#10b981',
    message: "You're operating at an elite level. Your privacy posture is strong across the board. A professional audit can identify the last few gaps and keep you ahead of emerging threats.",
    urgency: 'low',
  };
  if (pct >= 65) return {
    label: 'Competent But Exposed',
    grade: 'B',
    color: 'cyan',
    hex: '#06b6d4',
    message: "You have solid foundations but there are meaningful gaps that attackers or data brokers could exploit. A targeted consultation would prioritize exactly where to focus next.",
    urgency: 'medium',
  };
  if (pct >= 40) return {
    label: 'At Risk',
    grade: 'C',
    color: 'amber',
    hex: '#f59e0b',
    message: "Several critical areas need attention. Your current posture leaves you vulnerable to identity theft, account takeovers, and data broker exposure. Let's build a roadmap together.",
    urgency: 'high',
  };
  return {
    label: 'Critically Exposed',
    grade: 'D',
    color: 'red',
    hex: '#ef4444',
    message: "Your privacy and security posture requires immediate attention. You are at significant risk. A consultation would give you a clear, prioritized action plan to start protecting yourself today.",
    urgency: 'critical',
  };
}

function getCategoryScore(category, answers) {
  const maxWeight = category.questions.reduce((s, q) => s + q.weight, 0);
  const earned = category.questions.reduce((s, q) => {
    const a = answers[q.id];
    if (a === 'yes') return s + q.weight;
    if (a === 'partial') return s + q.weight * 0.5;
    return s;
  }, 0);
  return Math.round((earned / maxWeight) * 100);
}

// ── COMPONENTS ────────────────────────────────────────────────────────────────
function AnswerButton({ value, selected, onClick, children }) {
  const styles = {
    yes: selected
      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
      : 'border-slate-700 text-slate-400 hover:border-emerald-500/50 hover:text-emerald-400',
    partial: selected
      ? 'bg-amber-500/20 border-amber-500 text-amber-400'
      : 'border-slate-700 text-slate-400 hover:border-amber-500/50 hover:text-amber-400',
    no: selected
      ? 'bg-red-500/20 border-red-500 text-red-400'
      : 'border-slate-700 text-slate-400 hover:border-red-500/50 hover:text-red-400',
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg border transition-all duration-200 font-medium text-sm ${styles[value]}`}
    >
      {value === 'yes' && <CheckCircle className="w-4 h-4" />}
      {value === 'partial' && <AlertTriangle className="w-4 h-4" />}
      {value === 'no' && <XCircle className="w-4 h-4" />}
      <span>{children}</span>
    </button>
  );
}

function RadialScore({ pct, band }) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const dash = (pct / 100) * circumference;
  return (
    <div className="relative flex items-center justify-center w-52 h-52 mx-auto">
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r={radius} fill="none" stroke="#1e293b" strokeWidth="12" />
        <circle
          cx="100" cy="100" r={radius} fill="none"
          stroke={band.hex} strokeWidth="12"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </svg>
      <div className="text-center z-10">
        <div className="text-5xl font-bold" style={{ color: band.hex }}>{pct}</div>
        <div className="text-slate-400 text-sm mt-1">out of 100</div>
        <div className="text-xs font-bold mt-2 px-3 py-1 rounded-full" style={{ backgroundColor: band.hex + '22', color: band.hex }}>
          Grade {band.grade}
        </div>
      </div>
    </div>
  );
}

function CategoryBar({ category, score }) {
  const Icon = category.icon;
  const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
  return (
    <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Icon className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-300">{category.label}</span>
        </div>
        <span className="text-sm font-bold" style={{ color }}>{score}%</span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// ── NAV COMPONENT ─────────────────────────────────────────────────────────────
function Nav({ scrolled, isMenuOpen, setIsMenuOpen }) {
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="/" className="flex items-center space-x-3 group cursor-pointer">
            <img src="/logo.png" alt="CyberLifeCoach" className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              CyberLifeCoach
            </span>
          </a>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-slate-300 hover:text-cyan-400 transition-colors">Services</a>
            <a href="/policy-generators" className="text-slate-300 hover:text-cyan-400 transition-colors">Policy Generators</a>
            <a href="#products" className="text-slate-300 hover:text-cyan-400 transition-colors">Products</a>
            <a href="/security-center" className="text-slate-300 hover:text-cyan-400 transition-colors">Security Center</a>
            <a href="/tools" className="text-slate-300 hover:text-cyan-400 transition-colors">Tools</a>
            <a href="/about" className="text-slate-300 hover:text-cyan-400 transition-colors">About</a>
            
            <a href="https://calendly.com/cyberlifecoach-proton/new-meeting"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
            >
            Book Consultation
            </a>

          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-300 hover:text-cyan-400">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <div className="px-4 py-6 space-y-4">
            <a href="#services" className="block text-slate-300 hover:text-cyan-400 transition-colors">Services</a>
            <a href="/policy-generators" className="block text-slate-300 hover:text-cyan-400 transition-colors">Policy Generators</a>
            <a href="#products" className="block text-slate-300 hover:text-cyan-400 transition-colors">Products</a>
            <a href="/security-center" className="block text-slate-300 hover:text-cyan-400 transition-colors">Security Center</a>
            <a href="/tools" className="block text-slate-300 hover:text-cyan-400 transition-colors">Tools</a>
            <a href="/about" className="block text-slate-300 hover:text-cyan-400 transition-colors">About</a>
            <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 rounded-lg font-semibold">Book Consultation</button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ── FOOTER COMPONENT ─────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.png" alt="CyberLifeCoach" className="h-8 w-auto" />
              <span className="font-bold text-lg hover:text-cyan-400 transition-colors">CyberLifeCoach</span>
            </div>
            <p className="text-slate-500 text-sm">Expert cybersecurity consulting for the privacy-conscious.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-cyan-400">Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="/individual-consultation" className="hover:text-cyan-400 transition-colors">Privacy Audits</a></li>
              <li><a href="/small-business-consultation" className="hover:text-cyan-400 transition-colors">Security Consulting</a></li>
              <li><a href="/tools/threat-model" className="hover:text-cyan-400 transition-colors">Threat Assessment</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-cyan-400">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="https://cyberlifecoach.pro/Tools/tools.html" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Free Tools</a></li>
              <li><a href="https://cyberlifecoach.pro/courses.html" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Courses</a></li>
              <li><a href="https://cyberlifecoach.substack.com/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Newsletter</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-cyan-400">Connect</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="mailto:cyberlifecoach@proton.me" className="hover:text-cyan-400 transition-colors">Contact</a></li>
              <li><a href="http://www.linkedin.com/in/marcjlarouche" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">LinkedIn</a></li>
              <li><a href="https://bsky.app/profile/cyberlifecoach.bsky.social" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Bluesky</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© 2026 CyberLifeCoach | A Veteran-Owned Business Committed to Your Digital Security | All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function PrivacyScoreCalculator() {
  const [phase, setPhase] = useState('intro'); // intro | quiz | results
  const [activeCat, setActiveCat] = useState(0);
  const [answers, setAnswers] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset animated state when leaving results phase
  useEffect(() => {
    if (phase === 'results') {
      setTimeout(() => setAnimated(true), 100);
    } else {
      setTimeout(() => setAnimated(false), 100);
    }
  }, [phase]);

  const category = CATEGORIES[activeCat];
  const allAnswered = category.questions.every(q => answers[q.id]);

  const earnedWeight = Object.entries(answers).reduce((sum, [id, val]) => {
    const q = CATEGORIES.flatMap(c => c.questions).find(q => q.id === id);
    if (!q) return sum;
    if (val === 'yes') return sum + q.weight;
    if (val === 'partial') return sum + q.weight * 0.5;
    return sum;
  }, 0);
  const score = Math.round((earnedWeight / TOTAL_WEIGHT) * 100);
  const band = getScoreBand(score);

  const weakCategories = CATEGORIES
    .map(cat => ({ cat, score: getCategoryScore(cat, answers) }))
    .filter(({ score }) => score < 60)
    .sort((a, b) => a.score - b.score);

  function handleAnswer(qId, val) {
    setAnswers(prev => ({ ...prev, [qId]: val }));
  }

  function handleNext() {
    if (activeCat < CATEGORIES.length - 1) {
      setActiveCat(activeCat + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setPhase('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleBack() {
    if (activeCat > 0) {
      setActiveCat(activeCat - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setPhase('intro');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleReset() {
    setAnswers({});
    setActiveCat(0);
    setPhase('intro');
    setAnimated(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── INTRO PHASE ───────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Nav scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <section className="relative pt-36 pb-24 px-4 overflow-hidden">
          {/* Background glows */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-24 left-1/4 w-80 h-80 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" />
            <div className="absolute bottom-24 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="relative max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30 mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
              </span>
              <span className="text-sm text-slate-300">Free Instant Assessment</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight">
              Privacy Score
              <br />Calculator
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Answer 20 questions across 5 privacy categories and get an instant score with a personalized breakdown of your digital security posture.
            </p>

            {/* Category pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon;
                return (
                  <div key={cat.id} className="flex items-center space-x-2 bg-slate-900/80 px-4 py-2 rounded-full border border-slate-700 text-slate-300 text-sm">
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span>{cat.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-12">
              {[['20', 'Questions'], ['5', 'Categories'], ['~5 min', 'To Complete']].map(([val, lbl]) => (
                <div key={lbl} className="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
                  <div className="text-2xl font-bold text-cyan-400">{val}</div>
                  <div className="text-sm text-slate-500">{lbl}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setPhase('quiz')}
              className="group bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center space-x-3"
            >
              <Shield className="w-5 h-5" />
              <span>Start My Assessment</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-slate-600 text-sm mt-4">No email required. Results are instant and private.</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // ── QUIZ PHASE ────────────────────────────────────────────────────────────
  if (phase === 'quiz') {
    const Icon = category.icon;
    const answeredCount = category.questions.filter(q => answers[q.id]).length;

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Nav scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div className="max-w-2xl mx-auto px-4 pt-32 pb-24">

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-slate-500 mb-2">
              <span>Category {activeCat + 1} of {CATEGORIES.length}</span>
              <span>{Math.round(((activeCat) / CATEGORIES.length) * 100)}% complete</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${((activeCat + 1) / CATEGORIES.length) * 100}%` }}
              />
            </div>
            {/* Category dots */}
            <div className="flex justify-between mt-3">
              {CATEGORIES.map((cat, i) => {
                const CatIcon = cat.icon;
                const done = i < activeCat;
                const active = i === activeCat;
                return (
                  <div key={cat.id} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      done ? 'bg-emerald-500/20 border-emerald-500' :
                      active ? 'bg-cyan-500/20 border-cyan-500' :
                      'bg-slate-900 border-slate-700'
                    }`}>
                      {done
                        ? <CheckCircle className="w-4 h-4 text-emerald-400" />
                        : <CatIcon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-slate-600'}`} />
                      }
                    </div>
                    <span className={`text-xs mt-1 hidden sm:block ${active ? 'text-cyan-400' : done ? 'text-emerald-400' : 'text-slate-600'}`}>
                      {cat.label.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Category header */}
          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-2xl p-6 mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-cyan-500/10 p-2 rounded-lg border border-cyan-500/20">
                <Icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-xl font-bold">{category.label}</h2>
            </div>
            <p className="text-slate-400 text-sm">{answeredCount} of {category.questions.length} questions answered</p>
          </div>

          {/* Questions */}
          <div className="space-y-4 mb-8">
            {category.questions.map((q, qi) => {
              const answered = answers[q.id];
              return (
                <div
                  key={q.id}
                  className={`bg-slate-900 rounded-xl border p-5 transition-all duration-200 ${
                    answered ? 'border-slate-700' : 'border-slate-800'
                  }`}
                >
                  <div className="flex items-start space-x-3 mb-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-500 font-bold mt-0.5">
                      {qi + 1}
                    </span>
                    <p className="text-slate-200 leading-relaxed">{q.text}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 ml-9">
                    <AnswerButton value="yes" selected={answered === 'yes'} onClick={() => handleAnswer(q.id, 'yes')}>Yes</AnswerButton>
                    <AnswerButton value="partial" selected={answered === 'partial'} onClick={() => handleAnswer(q.id, 'partial')}>Partially</AnswerButton>
                    <AnswerButton value="no" selected={answered === 'no'} onClick={() => handleAnswer(q.id, 'no')}>No</AnswerButton>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Nav buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-lg border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{activeCat === 0 ? 'Back to Intro' : 'Previous'}</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!allAnswered}
              className={`group flex items-center space-x-2 px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                allAnswered
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105'
                  : 'bg-slate-800 text-slate-600 cursor-not-allowed'
              }`}
            >
              <span>{activeCat === CATEGORIES.length - 1 ? 'See My Score' : 'Next Category'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {!allAnswered && (
            <p className="text-center text-slate-600 text-sm mt-3">
              Answer all {category.questions.length} questions to continue
            </p>
          )}
        </div>
        <Footer />
      </div>
    );
  }

  // ── RESULTS PHASE ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Nav scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className="max-w-3xl mx-auto px-4 pt-32 pb-24">

        {/* Hero score */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 bg-slate-900/50 px-4 py-2 rounded-full border border-cyan-500/30 mb-6">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-300">Your Privacy Assessment</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Privacy Score Results</h1>
          <p className="text-slate-400">Based on your answers across {CATEGORIES.length} security categories</p>
        </div>

        {/* Score card */}
        <div className={`bg-gradient-to-br from-slate-900 to-slate-900/80 border rounded-3xl p-8 mb-6 text-center transition-all duration-700 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ borderColor: band.hex + '44' }}>
          <RadialScore pct={animated ? score : 0} band={band} />
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-2" style={{ color: band.hex }}>{band.label}</h2>
            <p className="text-slate-400 max-w-lg mx-auto leading-relaxed">{band.message}</p>
          </div>
        </div>

        {/* Category breakdown */}
        <div className={`mb-6 transition-all duration-700 delay-200 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h3 className="text-lg font-semibold mb-4 text-slate-300">Category Breakdown</h3>
          <div className="space-y-3">
            {CATEGORIES.map(cat => (
              <CategoryBar key={cat.id} category={cat} score={getCategoryScore(cat, answers)} />
            ))}
          </div>
        </div>

        {/* Weak areas */}
        {weakCategories.length > 0 && (
          <div className={`bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 mb-6 transition-all duration-700 delay-300 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h3 className="font-semibold text-amber-300">Priority Areas to Address</h3>
            </div>
            <ul className="space-y-2">
              {weakCategories.map(({ cat, score }) => (
                <li key={cat.id} className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">{cat.label}</span>
                  <span className="text-amber-400 font-semibold">{score}% — needs work</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <div className={`bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-3xl p-8 text-center transition-all duration-700 delay-500 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="mb-2 text-2xl">
            {band.urgency === 'critical' ? '🚨' : band.urgency === 'high' ? '⚠️' : band.urgency === 'medium' ? '🔍' : '✅'}
          </div>
          <h3 className="text-2xl font-bold mb-3">
            {band.urgency === 'low'
              ? 'Keep Your Edge Sharp'
              : band.urgency === 'medium'
              ? 'Close the Gaps'
              : 'Take Action Now'}
          </h3>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            {band.urgency === 'low'
              ? 'Even strong postures have blind spots. A 30-minute consultation can identify what automated tools miss.'
              : 'I\'ll walk you through a prioritized action plan tailored to your specific weak areas. First 30 minutes are on me.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:marc@cyberlifecoach.pro?subject=Privacy%20Score%20Consultation%20Request&body=Hi%20Marc%2C%20I%20just%20completed%20the%20Privacy%20Score%20Calculator%20and%20scored%20" 
              className="group bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Book a Free Consultation</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={handleReset}
              className="flex items-center justify-center space-x-2 px-6 py-4 rounded-lg border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200 transition-all duration-200"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retake Assessment</span>
            </button>
          </div>
          <p className="text-slate-600 text-xs mt-4">First 30 minutes complimentary · No obligation</p>
        </div>

        {/* Share score nudge */}
        <p className="text-center text-slate-600 text-sm mt-8">
          Score: {score}/100 · {band.label} · via CyberLifeCoach Privacy Score Calculator
        </p>
      </div>
      <Footer />
    </div>
  );
}
