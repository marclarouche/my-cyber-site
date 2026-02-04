import React, { useState } from 'react';
import { Shield, FileText, Users, Lock, AlertTriangle, Smartphone, Wifi, Database, Cloud, Mail, Key, Camera, Trash2, Download, BookOpen, Search, ArrowLeft, ChevronRight, ClipboardList, HardDrive, Globe, UserCheck } from 'lucide-react';

export default function PolicyGeneratorHub() {
  const [searchTerm, setSearchTerm] = useState('');

  const policyGenerators = [
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Acceptable Use Policy",
      description: "Define acceptable and prohibited uses of company technology, devices, and network resources.",
      category: "General",
      link: "/policy/acceptable-use",
      aboutLink: "/policy/acceptable-use/about"
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: "Password Policy",
      description: "Establish password strength requirements, rotation schedules, and secure password practices.",
      category: "Security",
      link: "/policy/password",
      aboutLink: "/policy/password/about"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Data Classification Policy",
      description: "Create a framework for categorizing and handling sensitive business information.",
      category: "Data Protection",
      link: "/policy/data-classification",
      aboutLink: "/policy/data-classification/about"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Remote Work Policy",
      description: "Set guidelines for secure remote work practices, VPN usage, and home office security.",
      category: "Operations",
      link: "/policy/remote-work",
      aboutLink: "/policy/remote-work/about"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "BYOD Policy",
      description: "Manage bring-your-own-device programs with security requirements and acceptable use guidelines.",
      category: "Operations",
      link: "/policy/byod",
      aboutLink: "/policy/byod/about"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email & Communication Policy",
      description: "Define proper email usage, phishing awareness, and secure communication practices.",
      category: "General",
      link: "/policy/email",
      aboutLink: "/policy/email/about"
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Incident Response Policy",
      description: "Establish procedures for identifying, responding to, and recovering from security incidents.",
      category: "Security",
      link: "/policy/incident-response",
      aboutLink: "/policy/incident-response/about"
    },
    {
      icon: <Trash2 className="w-8 h-8" />,
      title: "Data Retention Policy",
      description: "Set rules for how long different types of data should be kept and when to dispose of it.",
      category: "Data Protection",
      link: "/policy/data-retention",
      aboutLink: "/policy/data-retention/about"
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Access Control Policy",
      description: "Define who can access what information and under what circumstances.",
      category: "Security",
      link: "/policy/access-control",
      aboutLink: "/policy/access-control/about"
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud Security Policy",
      description: "Establish guidelines for using cloud services and protecting cloud-stored data.",
      category: "Security",
      link: "/policy/cloud-security",
      aboutLink: "/policy/cloud-security/about"
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "Network Security Policy",
      description: "Set standards for network access, firewall rules, and network monitoring.",
      category: "Security",
      link: "/policy/network-security",
      aboutLink: "/policy/network-security/about"
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Software Installation Policy",
      description: "Control what software can be installed and by whom to prevent malware and licensing issues.",
      category: "Operations",
      link: "/policy/software-installation",
      aboutLink: "/policy/software-installation/about"
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Social Media Policy",
      description: "Guide employees on appropriate social media use and protecting company reputation.",
      category: "General",
      link: "/policy/social-media",
      aboutLink: "/policy/social-media/about"
    },
    {
      icon: <HardDrive className="w-8 h-8" />,
      title: "Backup & Recovery Policy",
      description: "Define backup schedules, storage locations, and disaster recovery procedures.",
      category: "Operations",
      link: "/policy/backup-recovery",
      aboutLink: "/policy/backup-recovery/about"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Data Breach Response Policy",
      description: "Outline steps to take when a data breach occurs, including notification procedures.",
      category: "Security",
      link: "/policy/data-breach",
      aboutLink: "/policy/data-breach/about"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Internet Usage Policy",
      description: "Set boundaries for internet browsing during work hours and on company networks.",
      category: "General",
      link: "/policy/internet-usage",
      aboutLink: "/policy/internet-usage/about"
    },
    {
      icon: <ClipboardList className="w-8 h-8" />,
      title: "Vendor Management Policy",
      description: "Establish security requirements for third-party vendors and service providers.",
      category: "Operations",
      link: "/policy/vendor-management",
      aboutLink: "/policy/vendor-management/about"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Physical Security Policy",
      description: "Define physical access controls, visitor management, and facility security measures.",
      category: "Security",
      link: "/policy/physical-security",
      aboutLink: "/policy/physical-security/about"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Security Awareness Training Policy",
      description: "Mandate regular security training for all employees and track completion.",
      category: "General",
      link: "/policy/security-training",
      aboutLink: "/policy/security-training/about"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy Policy",
      description: "Document how your business collects, uses, and protects customer information.",
      category: "Data Protection",
      link: "/policy/privacy",
      aboutLink: "/policy/privacy/about"
    }
  ];

  const categories = ["All", "General", "Security", "Data Protection", "Operations"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPolicies = policyGenerators.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || policy.category === selectedCategory;
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
            <FileText className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-300">Free Policy Generators</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight">
            Business Policy Generators
          </h1>
          
          <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Create professional, customized security and compliance policies for your small business in minutes. All generators are free to use and produce download-ready documents.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search policy generators..."
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
        </div>
      </section>

      {/* Policy Cards Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredPolicies.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-400 mb-2">No policies found</h3>
              <p className="text-slate-500">Try adjusting your search or filter</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPolicies.map((policy, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1"
                >
                  {/* Icon and Category */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                      {policy.icon}
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      {policy.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                    {policy.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    {policy.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => window.location.href = policy.link}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Generate</span>
                    </button>
                    <button
                      onClick={() => window.location.href = policy.aboutLink}
                      className="px-4 py-2.5 rounded-lg font-semibold text-sm border border-slate-600 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-800 flex items-center justify-center"
                      title="Learn more about this policy"
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

      {/* Why Use Policy Generators Section */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Why Use Our Policy Generators?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
                <FileText className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Professional Templates</h3>
              <p className="text-slate-400">Industry-standard policy templates customized to your business needs and compliance requirements.</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
                <Download className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Download</h3>
              <p className="text-slate-400">Generate and download your policies immediately in professional PDF or DOCX format.</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
                <Shield className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">100% Free</h3>
              <p className="text-slate-400">All policy generators are completely free to use with no hidden fees or premium upgrades required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-cyan-900/30 to-blue-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Need Help Implementing Your Policies?</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Our security consultants can help you implement, train your team, and ensure compliance with your new policies.
          </p>
          <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-5 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center space-x-3">
            <Users className="w-6 h-6" />
            <span>Schedule a Consultation</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
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