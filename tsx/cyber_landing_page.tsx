import React, { useState, useEffect } from 'react';
import { Shield, Lock, Eye, Calendar, BookOpen, Wrench, ChevronRight, Menu, X, ExternalLink } from 'lucide-react';

export default function CyberSecurityLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy Audits",
      description: "Comprehensive assessment of your digital footprint and privacy posture with actionable recommendations.",
      cta: "Schedule Audit"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Security Consulting",
      description: "Strategic guidance on implementing robust security frameworks tailored to your organization's needs.",
      cta: "Learn More"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Threat Assessment",
      description: "Identify vulnerabilities and potential threats before they become critical security incidents.",
      cta: "Get Started"
    }
  ];

  const products = [
    {
      title: "Privacy Fundamentals Course",
      description: "Master the essentials of digital privacy in 6 comprehensive modules",
      price: "$299"
    },
    {
      title: "Enterprise Security Blueprint",
      description: "Complete framework for building a security-first organization",
      price: "$799"
    },
    {
      title: "Privacy Toolkit Suite",
      description: "Curated collection of privacy-enhancing tools and configurations",
      price: "$149"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2 group cursor-pointer">
              <Shield className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                SecurePrivacy
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-slate-300 hover:text-cyan-400 transition-colors">Services</a>
              <a href="/policy-generators" className="text-slate-300 hover:text-cyan-400 transition-colors">Policy Generators</a>
              <a href="#products" className="text-slate-300 hover:text-cyan-400 transition-colors">Products</a>
              <a href="#tools" className="text-slate-300 hover:text-cyan-400 transition-colors">Tools</a>
              <a href="#about" className="text-slate-300 hover:text-cyan-400 transition-colors">About</a>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
                Book Consultation
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-slate-300 hover:text-cyan-400"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800">
            <div className="px-4 py-6 space-y-4">
              <a href="#services" className="block text-slate-300 hover:text-cyan-400 transition-colors">Services</a>
              <a href="/policy-generators" className="block text-slate-300 hover:text-cyan-400 transition-colors">Policy Generators</a>
              <a href="#products" className="block text-slate-300 hover:text-cyan-400 transition-colors">Products</a>
              <a href="#tools" className="block text-slate-300 hover:text-cyan-400 transition-colors">Tools</a>
              <a href="#about" className="block text-slate-300 hover:text-cyan-400 transition-colors">About</a>
              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 rounded-lg font-semibold">
                Book Consultation
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30 mb-8 hover:border-cyan-500/60 transition-all">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <span className="text-sm text-slate-300">Protecting Your Digital Identity</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight">
            Privacy Is Not Optional.
            <br />It's Essential.
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Expert cybersecurity consulting and privacy solutions for individuals and organizations who take their digital security seriously.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Schedule Privacy Audit</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-lg font-semibold text-lg border-2 border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-900">
              Explore Resources
            </button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "500+", label: "Audits Completed" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "15+", label: "Years Experience" },
              { value: "50+", label: "Enterprise Clients" }
            ].map((stat, index) => (
              <div key={index} className="text-center group cursor-default">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Core Services
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Comprehensive security solutions tailored to your unique threat landscape and privacy requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group bg-slate-900/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-2"
              >
                <div className="text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">{service.description}</p>
                <button className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-semibold group/btn">
                  <span>{service.cta}</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Courses & Products
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Self-paced learning resources and tools to enhance your privacy and security posture.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <BookOpen className="w-8 h-8 text-cyan-400" />
                  <span className="text-2xl font-bold text-cyan-400">{product.price}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{product.title}</h3>
                <p className="text-slate-400 mb-6">{product.description}</p>
                <button className="w-full bg-slate-800 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500 py-3 rounded-lg font-semibold transition-all duration-300">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Free Privacy Tools
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Start your privacy journey with our complimentary assessment tools and resources.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300">
              <Wrench className="w-10 h-10 text-cyan-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Privacy Score Calculator</h3>
              <p className="text-slate-400 mb-6">Get an instant assessment of your current privacy posture with actionable recommendations.</p>
              <button className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-semibold group">
                <span>Try Now</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300">
              <Eye className="w-10 h-10 text-cyan-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Data Breach Checker</h3>
              <p className="text-slate-400 mb-6">Discover if your personal information has been compromised in known data breaches.</p>
              <button className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-semibold group">
                <span>Check Now</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-sm p-12 rounded-3xl border border-cyan-500/30">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Stay Informed</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Follow our latest insights on privacy, security, and digital sovereignty.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <a href="#" className="group bg-slate-900/80 p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-gradient-to-br from-orange-500 to-red-600 p-3 rounded-lg">
                    <ExternalLink className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Substack Newsletter</h3>
                </div>
                <p className="text-slate-400 mb-4">In-depth articles and analysis on emerging privacy threats and solutions.</p>
                <div className="flex items-center space-x-2 text-cyan-400 group-hover:text-cyan-300 font-semibold">
                  <span>Subscribe</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              <a href="#" className="group bg-slate-900/80 p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-gradient-to-br from-red-600 to-red-700 p-3 rounded-lg">
                    <ExternalLink className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">YouTube Channel</h3>
                </div>
                <p className="text-slate-400 mb-4">Video tutorials, tool reviews, and security best practices explained simply.</p>
                <div className="flex items-center space-x-2 text-cyan-400 group-hover:text-cyan-300 font-semibold">
                  <span>Watch Now</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-cyan-900/30 to-blue-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Secure Your Privacy?</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Schedule a comprehensive privacy audit and receive a customized security roadmap for your organization.
          </p>
          <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-5 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center space-x-3">
            <Calendar className="w-6 h-6" />
            <span>Book Your Privacy Audit</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-slate-500 mt-6 text-sm">First 30 minutes complimentary • No obligation</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-6 h-6 text-cyan-400" />
                <span className="font-bold text-lg">SecurePrivacy</span>
              </div>
              <p className="text-slate-500 text-sm">Expert cybersecurity consulting for the privacy-conscious.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-cyan-400">Services</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Audits</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Security Consulting</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Threat Assessment</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-cyan-400">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Free Tools</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Courses</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Newsletter</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-cyan-400">Connect</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>&copy; 2026 SecurePrivacy Consulting. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}