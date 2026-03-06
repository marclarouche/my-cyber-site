// About.jsx
import React, { useEffect } from "react";
import { ArrowLeft, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function About() {
  // Preserve "tos-gate.js" behavior (loaded in original <head>)
  useEffect(() => {
    const existing = document.querySelector('script[data-tos-gate="true"]');
    if (existing) return;

    const s = document.createElement("script");
    s.src = "/js/tos-gate.js";
    s.async = true;
    s.dataset.tosGate = "true";
    document.head.appendChild(s);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation (match ToolsHub.jsx) */}
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

      {/* Spacer for fixed nav */}
      <div className="h-20" />

      {/* ToolsHub-style fading circles background (ported from ToolsHub.jsx hero) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>

        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Page Content */}
        <div className="relative">
          {/* About Section */}
          <section id="about-us" className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent leading-tight">
                  About
                </h1>
                <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
                  CyberLifeCoach is built around practical security, privacy, and clarity. Here is who I am, what I stand for, and why these tools exist.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 max-w-5xl mx-auto">
                {/* Left panel */}
                <div className="bg-slate-900/70 border border-cyan-500/20 rounded-2xl overflow-hidden shadow-xl shadow-black/20">
                 

<div className="relative overflow-hidden" style={{ height: "320px" }}>
  <img
    src="/marc.webp"
    alt="Marc photo"
    className="w-full h-full object-cover object-top"
  />
  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900/90 to-transparent" />
</div>


                  <div className="p-6">
                    <p className="text-slate-400 m-0">Clear, practical guidance. No panic. No gimmicks.</p>
                  </div>
                </div>

                {/* Right panel */}
                <div className="bg-slate-900/70 border border-cyan-500/20 rounded-2xl shadow-xl shadow-black/20">
                  <div className="p-6">
                    <h2 className="text-3xl font-bold text-white mb-4">Marc Larouche</h2>
                    <p className="text-slate-400 leading-relaxed mb-6">
                      Marc Larouche is a retired U.S. Navy cybersecurity professional with over 20 years of experience in protecting and educating others about digital security.
                      With a passion for empowering individuals and small businesses, Marc combines his extensive IT expertise and a knack for teaching to help clients secure their
                      online presence and achieve peace of mind in the digital world. As the founder of CyberLife Coach, Marc is dedicated to simplifying cybersecurity,
                      offering practical solutions, and guiding clients toward stronger digital habits for personal and professional success.
                    </p>

                    <h3 className="text-cyan-400 font-bold text-lg mb-2">Education & Certifications</h3>
                    <ul className="list-disc pl-5 text-slate-400 space-y-2 mb-6">
                      <li>Bachelor of Science, University of Michigan</li>
                      <li>Master’s in Business Administration, Knowledge Management Systems, California Intercontinental University</li>
                      <li>Certified Information Systems Security Professional (CISSP)</li>
                      <li>Certified Ethical Hacker (CEHv9) EC-Council</li>
                      <li>Certified Blockchain Business Foundations, BTA</li>
                      <li>Certified Technical Writer, California State University Dominguez Hills</li>
                    </ul>

                    <h3 className="text-cyan-400 font-bold text-lg mb-2">Hobbies & Interests</h3>
                    <p className="text-slate-400 leading-relaxed">
                      When he's not writing, Marc enjoys reading, learning coding, and hitting the coffee shop with his little Basset Hound, Rascal. He is also an avid traveler,
                      always eager to explore new cultures and experiences.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mission row */}
              <div className="max-w-5xl mx-auto mt-10">
                <div className="bg-slate-900/70 border border-cyan-500/20 rounded-2xl shadow-xl shadow-black/20">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-cyan-400 mb-3">My Mission</h2>
                    <p className="text-slate-400 leading-relaxed">
                      My mission is to protect people, not harvest data. I teach privacy and cybersecurity in plain language, with step by step guidance that reduces tracking,
                      prevents account takeovers, and makes safer digital habits feel manageable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-cyan-500/20 px-4 pt-14 pb-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
          <a href="/" className="group">
            <img
              src="/logo.png"
              alt="CyberLifeCoach"
              className="h-14 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
            />
          </a>

          <div className="flex flex-wrap items-center justify-center gap-8">
            <a href="/privacy" className="text-slate-400 hover:text-cyan-400 transition-colors">
              Privacy Policy
            </a>
            <a href="/about" className="text-slate-400 hover:text-cyan-400 transition-colors">
              About Us
            </a>
            <a href="mailto:cyberlifecoach@proton.me" className="text-slate-400 hover:text-cyan-400 transition-colors">Contact</a>
            
          </div>

          <div className="flex items-center gap-6" aria-label="Social media">
            <a href="#" aria-label="Facebook" className="text-slate-400 hover:text-cyan-400 transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" aria-label="Twitter" className="text-slate-400 hover:text-cyan-400 transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-slate-400 hover:text-cyan-400 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" aria-label="Instagram" className="text-slate-400 hover:text-cyan-400 transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
          </div>

          <p className="text-center text-slate-500 text-sm">
            © 2025 CyberLifeCoach |{" "}
            <span className="text-cyan-400 font-semibold">A Veteran-Owned Business Committed to Your Digital Security</span>{" "}
            | All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
