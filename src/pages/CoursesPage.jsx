import React, { useState, useEffect } from 'react';
import {
  Shield, Search, Brain, Code, ChevronRight, ArrowLeft, X,
  Calendar, BookOpen, FlaskConical, HelpCircle, CheckCircle,
  Clock, Bell
} from 'lucide-react';

const courses = [
  {
    id: 'foundations',
    status: 'Coming soon',
    icon: <Search className="w-8 h-8" />,
    title: 'Foundations of OSINT',
    tagline: 'The complete starting point for open-source intelligence.',
    description:
      'A 6-week course covering the full OSINT investigation lifecycle. You will work through evidence collection and preservation, social media analysis, IP and geolocation techniques, image and metadata analysis, public records research, and professional report writing — all with step-by-step labs and scenario-based quizzes aligned to OSMOSIS exam objectives.',
    price: '$97',
    priceNote: 'One-time payment · Lifetime access',
    buyLabel: 'Enroll Now',
    buyUrl: '#',
    weeks: [
      'Best Practices & Investigation Planning',
      'Online Evidence: Collection & Preservation',
      'Social Networks, Email, IPs & Mapping',
      'Image, Video & Metadata Analysis',
      'Public Records & Business Entities',
      'Documentation, Reporting & Ethics',
    ],
    includes: [
      { icon: <BookOpen className="w-4 h-4" />, label: '6 weeks of lecture content' },
      { icon: <FlaskConical className="w-4 h-4" />, label: 'Step-by-step labs' },
      { icon: <HelpCircle className="w-4 h-4" />, label: 'Weekly quizzes with answer keys' },
      { icon: <Shield className="w-4 h-4" />, label: 'OSMOSIS exam prep' },
      { icon: <CheckCircle className="w-4 h-4" />, label: 'Certificate of completion' },
    ],
  },
  {
    id: 'python',
    status: 'Coming soon',
    icon: <Code className="w-8 h-8" />,
    title: 'Using Python OSINT Tools',
    tagline: 'Automate your investigations with Python.',
    description:
      'A 6-week course on building and running Python-based OSINT tooling. You will write scripts that automate collection, call external APIs, process metadata at scale, and build reusable investigation utilities. No prior Python experience required.',
    price: '$97',
    priceNote: 'One-time payment · Lifetime access',
    buyLabel: 'Enroll Now',
    buyUrl: '#',
    weeks: [
      'Python Basics for Investigators',
      'Working with APIs & Web Requests',
      'Username, Email & Social Automation',
      'Image & Metadata Processing',
      'Building Custom OSINT Scripts',
      'Full Investigation: End-to-End Build',
    ],
    includes: [
      { icon: <BookOpen className="w-4 h-4" />, label: '6 weeks of lecture content' },
      { icon: <FlaskConical className="w-4 h-4" />, label: 'Step-by-step code walkthroughs' },
      { icon: <HelpCircle className="w-4 h-4" />, label: 'Weekly quizzes with answer keys' },
      { icon: <CheckCircle className="w-4 h-4" />, label: 'Certificate of completion' },
    ],
  },
  {
    id: 'ai',
    status: 'Coming soon',
    icon: <Brain className="w-8 h-8" />,
    title: 'Introduction to AI and OSINT',
    tagline: 'Use AI tools to work faster and see further.',
    description:
      'A 6-week course on integrating AI into OSINT investigations. Covers LLM-assisted research, deepfake and synthetic media detection, AI-generated content identification, and the ethical boundaries of using AI in professional investigations.',
    price: '$97',
    priceNote: 'One-time payment · Lifetime access',
    buyLabel: 'Enroll Now',
    buyUrl: '#',
    weeks: [
      'How AI Applies to OSINT',
      'LLMs as Investigation Assistants',
      'Deepfake & Synthetic Media Detection',
      'AI Image & Video Analysis',
      'AI-Generated Content Identification',
      'Ethics, Bias & Responsible AI Use',
    ],
    includes: [
      { icon: <BookOpen className="w-4 h-4" />, label: '6 weeks of lecture content' },
      { icon: <FlaskConical className="w-4 h-4" />, label: 'Step-by-step tool walkthroughs' },
      { icon: <HelpCircle className="w-4 h-4" />, label: 'Weekly quizzes with answer keys' },
      { icon: <CheckCircle className="w-4 h-4" />, label: 'Certificate of completion' },
    ],
  },
];

function Modal({ course, onClose }) {
  const [email, setEmail] = useState('');
  const [notified, setNotified] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleNotify = () => {
    if (!email.includes('@') || !email.includes('.')) {
      setEmailError(true);
      setTimeout(() => setEmailError(false), 1500);
      return;
    }
    setNotified(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-cyan-500/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-cyan-400 transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="mb-4">
            {course.status === 'live' ? (
              <span className="inline-flex items-center space-x-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold px-3 py-1 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span>Now Available</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1.5 bg-slate-800 border border-slate-700 text-slate-400 text-xs font-semibold px-3 py-1 rounded-full">
                <Clock className="w-3 h-3" />
                <span>Coming Soon</span>
              </span>
            )}
          </div>

          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            {course.title}
          </h2>
          <p className="text-slate-400 mb-6 leading-relaxed">{course.description}</p>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-3">Course Outline</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {course.weeks.map((week, i) => (
                <div key={i} className="flex items-start space-x-3 bg-slate-950 border border-slate-800 rounded-lg px-4 py-3">
                  <span className="text-xs font-semibold text-cyan-500 mt-0.5 whitespace-nowrap">Week {i + 1}</span>
                  <span className="text-sm text-slate-300">{week}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-3">What's Included</h3>
            <ul className="space-y-2">
              {course.includes.map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-slate-300 text-sm">
                  <span className="text-cyan-400">{item.icon}</span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {course.status === 'live' ? (
            <div className="border-t border-slate-800 pt-6">
              <div className="flex items-baseline justify-between mb-4 flex-wrap gap-2">
                <span className="text-4xl font-bold text-white">{course.price}</span>
                <span className="text-sm text-slate-500">{course.priceNote}</span>
              </div>
              <a
                href={course.buyUrl}
                className="group flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-[1.02]"
              >
                <span>{course.buyLabel}</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ) : (
            <div className="border-t border-slate-800 pt-6">
              <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-3">
                Get notified when this launches
              </h3>
              {notified ? (
                <div className="flex items-center space-x-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl px-4 py-3 text-cyan-400 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>You're on the list. We'll email you when it's ready.</span>
                </div>
              ) : (
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleNotify(); }}
                    placeholder="your@email.com"
                    className={`flex-1 bg-slate-950 border rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 text-sm outline-none transition-colors ${
                      emailError ? 'border-red-500' : 'border-slate-700 focus:border-cyan-500'
                    }`}
                  />
                  <button
                    onClick={handleNotify}
                    className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap"
                  >
                    <Bell className="w-4 h-4" />
                    <span>Notify Me</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course, onOpen }) {
  const isLive = course.status === 'live';

  return (
    <div
      onClick={() => onOpen(course)}
      className={`group relative bg-slate-950 rounded-2xl border transition-all duration-300 flex flex-col cursor-pointer ${
        isLive
          ? 'border-slate-800 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1'
          : 'border-slate-800/60 opacity-70 hover:opacity-85 hover:border-slate-700'
      }`}
    >
      {isLive && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-cyan-500 to-blue-600 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}

      <div className="p-8 flex flex-col flex-1">
        <div className="mb-5">
          {isLive ? (
            <span className="inline-flex items-center space-x-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold px-3 py-1 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>Now Available</span>
            </span>
          ) : (
            <span className="inline-flex items-center space-x-1.5 bg-slate-800 border border-slate-700 text-slate-500 text-xs font-semibold px-3 py-1 rounded-full">
              <Clock className="w-3 h-3" />
              <span>Coming Soon</span>
            </span>
          )}
        </div>

        <div className={`mb-5 transition-colors duration-300 ${isLive ? 'text-cyan-400 group-hover:text-cyan-300' : 'text-slate-600'}`}>
          {course.icon}
        </div>

        <h3 className={`text-xl font-bold mb-2 ${isLive ? 'text-slate-100' : 'text-slate-500'}`}>
          {course.title}
        </h3>
        <p className={`text-sm mb-5 flex-1 leading-relaxed ${isLive ? 'text-slate-400' : 'text-slate-600'}`}>
          {course.tagline}
        </p>

        <div className="flex items-center space-x-4 mb-6 text-xs">
          <span className={`flex items-center space-x-1.5 ${isLive ? 'text-slate-500' : 'text-slate-700'}`}>
            <Calendar className="w-3.5 h-3.5" />
            <span>6 weeks</span>
          </span>
          <span className={`flex items-center space-x-1.5 ${isLive ? 'text-slate-500' : 'text-slate-700'}`}>
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Labs included</span>
          </span>
          <span className={`flex items-center space-x-1.5 ${isLive ? 'text-slate-500' : 'text-slate-700'}`}>
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Quizzes</span>
          </span>
        </div>

        <button
          className={`flex items-center justify-center space-x-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
            isLive
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.02]'
              : 'bg-slate-900 border border-slate-700 text-slate-500 hover:border-slate-600 hover:text-slate-400'
          }`}
        >
          {isLive ? (
            <>
              <span>View Course</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </>
          ) : (
            <>
              <Bell className="w-4 h-4" />
              <span>Get Notified</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    document.body.style.overflow = activeModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeModal]);

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
            <div className="flex items-center space-x-6">
              <a href="/" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30 mb-8">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-300">OSINT Training Courses</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight">
            Learn to Find What Others Miss.
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Practical, self-paced courses built for investigators, analysts, and anyone looking to learn OSINT. Every course includes lecture content, hands-on labs, and quizzes.
          </p>

          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { icon: <Calendar className="w-6 h-6" />, label: '6 Weeks Per Course', sub: 'Self-paced' },
              { icon: <FlaskConical className="w-6 h-6" />, label: 'Step-by-Step Labs', sub: 'Code & tool walkthroughs' },
              { icon: <Shield className="w-6 h-6" />, label: 'OSMOSIS Aligned', sub: 'Exam-ready content' },
            ].map((item, i) => (
              <div key={i} className="group cursor-default">
                <div className="flex justify-center text-cyan-400 mb-2 group-hover:text-cyan-300 group-hover:scale-110 transition-all duration-300 wobble-icon">
                  {item.icon}
                </div>
                <div className="text-sm font-semibold text-slate-300">{item.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              All Courses
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Three courses available now. Each one is self-paced with labs, quizzes, and a certificate.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} onOpen={setActiveModal} />
            ))}
          </div>
        </div>
      </section>

      {/* Bundle */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-10 text-center">
            <span className="inline-flex items-center space-x-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold px-3 py-1 rounded-full mb-6">
              <span>Best Value</span>
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              Complete OSINT Bundle
            </h2>
            <p className="text-slate-400 mb-6 max-w-xl mx-auto">
              All three courses in one purchase. Foundations, Python tooling, and AI integration — the full curriculum from beginner to advanced.
            </p>
            <ul className="space-y-2 mb-8 text-sm text-slate-300 inline-block text-left">
              {courses.map((c, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>{c.title}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-baseline justify-center space-x-3 mb-8">
              <span className="text-5xl font-bold text-white">$247</span>
              <div className="text-left">
                <span className="block text-slate-500 line-through text-sm">$291 individually</span>
                <span className="block text-cyan-400 text-sm font-semibold">Save $44</span>
              </div>
            </div>
            <a
              href="https://cyberlifecoach.gumroad.com/l/YOUR-BUNDLE-SLUG"
              className="group inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-[1.02]"
            >
              <span>Get the Bundle</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-slate-500 text-sm mt-4">One-time payment · Lifetime access · All three courses</p>
          </div>
        </div>
      </section>

      {/* How the Courses Work */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How the Courses Work</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Every course follows the same format so you always know what to expect.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: <BookOpen className="w-8 h-8" />, title: 'Lecture Content', desc: 'Written modules you can read at your own pace. No video required — works on any device.' },
              { icon: <FlaskConical className="w-8 h-8" />, title: 'Hands-On Labs', desc: 'Step-by-step walkthroughs using real free tools against fictional targets. No gray areas.' },
              { icon: <HelpCircle className="w-8 h-8" />, title: 'Weekly Quizzes', desc: 'Scenario-based questions with full answer keys and explanations. Built to OSMOSIS difficulty.' },
              { icon: <CheckCircle className="w-8 h-8" />, title: 'Certificate', desc: 'Downloadable certificate of completion for each course you finish.' },
            ].map((item, i) => (
              <div key={i} className="group bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
                <div className="text-cyan-400 mb-5 group-hover:text-cyan-300 transition-colors wobble-icon">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-cyan-900/30 to-blue-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Start With Foundations</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Foundations of OSINT is available now. Six weeks, at your own pace, with everything you need to investigate like a professional.
          </p>
          <button
            onClick={() => setActiveModal(courses[0])}
            className="group bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-5 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center space-x-3"
          >
            <BookOpen className="w-6 h-6" />
            <span>View Foundations of OSINT</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-slate-500 mt-6 text-sm">$97 · One-time payment · Lifetime access</p>
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
            <p>&copy; 2026 CyberLifeCoach</p>
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {activeModal && (
        <Modal course={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
}
