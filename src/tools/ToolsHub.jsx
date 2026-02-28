import React, { useState } from 'react';
import { Shield, Mail, Key, Lock, Wifi, FileText, Zap, Network, AlertTriangle, Image, Hash, QrCode, Globe, Search, Code, Database, Calculator, Eye, Cpu, Fingerprint, FileCode, Cloud, CheckCircle, FileSearch, ArrowLeft, ChevronRight, BookOpen, Wrench } from 'lucide-react';

export default function ToolsHub() {
  const [searchTerm, setSearchTerm] = useState('');

  const tools = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Header Analyzer",
      description: "Analyze email headers to trace sender information, detect spoofing, and identify potential phishing attempts.",
      category: "Analysis",
      link: "/tools/email-header-analyzer",
      aboutLink: "/tools/about-email-header-analyzer"
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: "Strong Password Generator",
      description: "Create cryptographically secure passwords with customizable length, character types, and complexity requirements.",
      category: "Security",
      link: "/tools/password-generator",
      aboutLink: "/tools/about-password-generator"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Passphrase Builder",
      description: "Generate memorable yet secure passphrases using random word combinations and custom separators.",
      category: "Security",
      link: "/tools/passphrase-generator",
      aboutLink: "/tools/about-passphrase-generator"
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "Private DNS Status",
      description: "Check if your DNS queries are encrypted and identify which DNS provider you're using for privacy analysis.",
      category: "Privacy",
      link: "/tools/private-dns",
      aboutLink: "/tools/about-private-dns"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "URL Risk Preview",
      description: "Safely preview suspicious URLs and check for malware, phishing, and other security threats before clicking.",
      category: "Analysis",
      link: "/tools/url-risk-review",
      aboutLink: "/tools/about-url-risk-review"
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "Wi-Fi Risk Checklist",
      description: "Evaluate your wireless network security with a comprehensive checklist of common vulnerabilities.",
      category: "Network",
      link: "/tools/wifi-checklist",
      aboutLink: "/tools/about-wifi-checklist"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Encrypt / Decrypt Tool",
      description: "Encrypt and decrypt text using various algorithms including AES, RSA, and more for secure communications.",
      category: "Encryption",
      link: "/tools/encrypt-decrypt",
      aboutLink: "/tools/about-encrypt-decrypt"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Firewall Configurator Tool",
      description: "Generate firewall rules and configurations for various platforms including iptables, UFW, and Windows Firewall.",
      category: "Network",
      link: "/tools/firewall-configurator",
      aboutLink: "/tools/about-firewall-configurator"
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Threat Model Tool",
      description: "Create and visualize threat models for your applications and infrastructure to identify security gaps.",
      category: "Analysis",
      link: "/tools/threat-model",
      aboutLink: "/tools/about-threat-model"
    },
    {
      icon: <Image className="w-8 h-8" />,
      title: "Meta Data Tool",
      description: "Extract and remove metadata from images and documents to protect your privacy when sharing files.",
      category: "Privacy",
      link: "/tools/metadata-remover",
      aboutLink: "/tools/about-metadata-remover"
    },
    {
      icon: <Hash className="w-8 h-8" />,
      title: "File Hash Tool",
      description: "Calculate file hashes (MD5, SHA-1, SHA-256) to verify file integrity and detect tampering.",
      category: "Security",
      link: "/tools/file-hash-calculator",
      aboutLink: "/tools/about-file-hash-calculator"
    },
    {
      icon: <QrCode className="w-8 h-8" />,
      title: "QR Code Tool",
      description: "Generate and decode QR codes with customizable options for URLs, text, and contact information.",
      category: "Utility",
      link: "/tools/qr-code-generator",
      aboutLink: "/tools/about-qr-code-generator"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "What's my IP Tool",
      description: "Discover your public IP address, location, ISP information, and whether you're using a VPN or proxy.",
      category: "Network",
      link: "/tools/what-is-my-ip",
      aboutLink: "/tools/about-what-is-my-ip"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "DNS Lookup Tool",
      description: "Perform DNS queries to retrieve A, AAAA, MX, TXT, and other DNS records for any domain.",
      category: "Network",
      link: "/tools/dns-lookup",
      aboutLink: "/tools/about-dns-lookup"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Regex Pattern Builder",
      description: "Build, test, and validate regular expressions with real-time pattern matching and explanation.",
      category: "Development",
      link: "/tools/regex-generator",
      aboutLink: "/tools/about-regex-generator"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Breach Exposure Lookup",
      description: "Check if your email address or username has been exposed in known data breaches and leaks.",
      category: "Privacy",
      link: "/tools/breach-lookup",
      aboutLink: "/tools/about-breach-lookup"
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Digital Risk Calculator",
      description: "Assess your digital risk score based on online habits, security practices, and privacy settings.",
      category: "Analysis",
      link: "/tools/digital-risk-calculator",
      aboutLink: "/tools/about-digital-risk-calculator"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Tracker Simulator",
      description: "Visualize how tracking scripts follow you across the web and learn about third-party tracking.",
      category: "Privacy",
      link: "/tools/tracker-simulator",
      aboutLink: "/tools/about-tracker-simulator"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "MAC Generator",
      description: "Generate random or custom MAC addresses for network interface testing and privacy purposes.",
      category: "Network",
      link: "/tools/mac-generator",
      aboutLink: "/tools/about-mac-generator"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "PGP Key Generator",
      description: "Create PGP/GPG key pairs for encrypted email communication and digital signatures.",
      category: "Encryption",
      link: "/tools/pgp-generator",
      aboutLink: "/tools/about-pgp-generator"
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "Subnetting Generator",
      description: "Calculate subnet masks, network ranges, and host addresses for IP network planning.",
      category: "Network",
      link: "/tools/subnet-generator",
      aboutLink: "/tools/about-subnet-generator"
    },
    {
      icon: <FileCode className="w-8 h-8" />,
      title: "JSON XML Formatter",
      description: "Format, validate, and convert between JSON and XML with syntax highlighting and error detection.",
      category: "Development",
      link: "/tools/json-xml-formatter",
      aboutLink: "/tools/about-json-xml-formatter"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Ansible Generator",
      description: "Generate Ansible playbooks and configurations for automated infrastructure deployment and management.",
      category: "Development",
      link: "/tools/ansible-generator",
      aboutLink: "/tools/about-ansible-generator"
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "AWS Cloud Formation",
      description: "Create AWS CloudFormation templates for infrastructure as code deployment and resource management.",
      category: "Development",
      link: "/tools/aws-cloud-formation",
      aboutLink: "/tools/about-aws-cloud-formation"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Password Breach Checker",
      description: "Verify if your passwords have been compromised in data breaches using secure hash comparisons.",
      category: "Security",
      link: "/tools/password-breach-checker",
      aboutLink: "/tools/about-password-breach-checker"
    },
    {
      icon: <Fingerprint className="w-8 h-8" />,
      title: "Fingerprint Auditor",
      description: "Analyze your browser's digital fingerprint to see what information websites can track about you.",
      category: "Privacy",
      link: "/tools/finger-print-auditor",
      aboutLink: "/tools/about-finger-print-auditor"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Privacy TOS Summarizer",
      description: "Analyze and summarize lengthy Terms of Service and Privacy Policies into clear, understandable points.",
      category: "Privacy",
      link: "/tools/tos-summarizer",
      aboutLink: "/tools/about-tos-summarizer"
    },
    {
      icon: <FileSearch className="w-8 h-8" />,
      title: "Logfile Pattern Finder",
      description: "Search and analyze log files to identify patterns, errors, and security incidents efficiently.",
      category: "Analysis",
      link: "/tools/logfile-finder",
      aboutLink: "/tools/about-logfile-finder"
    }
  ];

  const categories = ["All", "Security", "Privacy", "Network", "Analysis", "Encryption", "Development", "Utility"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30 mb-8">
            <Wrench className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-300">Free Privacy & Security Tools</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight">
            Privacy & Security Tools
          </h1>
          
          <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Professional-grade security tools and privacy utilities for individuals and businesses. All tools are free to use and run directly in your browser for maximum privacy.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg pl-12 pr-4 py-4 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tool Count */}
          <p className="text-slate-500 mt-6">
            Showing {filteredTools.length} of {tools.length} tools
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredTools.length === 0 ? (
            <div className="text-center py-20">
              <Wrench className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-400 mb-2">No tools found</h3>
              <p className="text-slate-500">Try adjusting your search or filter</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1"
                >
                  {/* Icon and Category */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                      {tool.icon}
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      {tool.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                    {tool.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => window.location.href = tool.link}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <Wrench className="w-4 h-4" />
                      <span>Use Tool</span>
                    </button>
                    <button
                      onClick={() => window.location.href = tool.aboutLink}
                      className="px-4 py-2.5 rounded-lg font-semibold text-sm border border-slate-600 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-800 flex items-center justify-center"
                      title="Learn more about this tool"
                    >
                      <BookOpen className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Use Our Tools Section */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Why Use Our Tools?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
                <Shield className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Client-Side Processing</h3>
              <p className="text-slate-400">All tools run in your browser. Your data never leaves your device, ensuring maximum privacy and security.</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
                <Zap className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fast & Reliable</h3>
              <p className="text-slate-400">Professional-grade tools optimized for speed and accuracy. No registration or installation required.</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
                <CheckCircle className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Always Free</h3>
              <p className="text-slate-400">All 28 tools are completely free with no hidden fees, premium tiers, or usage limits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-cyan-900/30 to-blue-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Need Custom Security Solutions?</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Our security experts can build custom tools and solutions tailored to your specific business needs.
          </p>
          
           <a href="https://calendly.com/cyberlifecoach-proton/new-meeting"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-5 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center space-x-3"
            >
           <Shield className="w-6 h-6" />
            <span>Schedule a Consultation</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </a>
      
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
    </div>
  );
}