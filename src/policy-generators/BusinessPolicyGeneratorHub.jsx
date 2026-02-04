import React, { useState } from 'react';
import { Shield, FileText, Users, Lock, AlertTriangle, Smartphone, Wifi, Database, Cloud, Mail, Key, Camera, Trash2, Download, BookOpen, Search, ArrowLeft, ChevronRight, ClipboardList, HardDrive, Globe, UserCheck, Scale, DollarSign, FileSearch, Wrench, Target, Bug, Code, Megaphone, GraduationCap } from 'lucide-react';

export default function PolicyGeneratorHub() {
  const [searchTerm, setSearchTerm] = useState('');

  const policyGenerators = [
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Acceptable Use Policy",
      description: "Define acceptable and prohibited uses of company technology, devices, and network resources.",
      category: "General",
      link: "/policy-generators/acceptable-use-policy",
      aboutLink: "/policy-generators/about-acceptable-use-policy"
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Access Control Policy",
      description: "Define who can access what information and under what circumstances.",
      category: "Security",
      link: "/policy-generators/access-control-policy",
      aboutLink: "/policy-generators/about-access-control-policy"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "API Document",
      description: "Generate comprehensive API documentation with endpoints, authentication, and usage examples.",
      category: "Technical",
      link: "/policy-generators/api-generator",
      aboutLink: "/policy-generators/about-api-generator"
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Breach Notification Policy",
      description: "Outline steps to take when a data breach occurs, including notification procedures.",
      category: "Security",
      link: "/policy-generators/breach-notification-policy",
      aboutLink: "/policy-generators/about-breach-notification-policy"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "BYOD Policy",
      description: "Manage bring-your-own-device programs with security requirements and acceptable use guidelines.",
      category: "Operations",
      link: "/policy-generators/byod-policy",
      aboutLink: "/policy-generators/about-byod-policy"
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: "CCPA Privacy Policy",
      description: "Create a California Consumer Privacy Act compliant privacy policy for your business.",
      category: "Compliance",
      link: "/policy-generators/ccpa-cpra-policy",
      aboutLink: "/policy-generators/about-ccpa-cpra-policy"
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Change Management",
      description: "Establish procedures for managing changes to systems, processes, and infrastructure.",
      category: "Operations",
      link: "/policy-generators/change-management-policy",
      aboutLink: "/policy-generators/about-change-management-policy"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "COPPA Policy",
      description: "Create a Children's Online Privacy Protection Act compliant policy for services used by children.",
      category: "Compliance",
      link: "/policy-generators/coppa-privacy-policy",
      aboutLink: "/policy-generators/about-coppa-privacy-policy"
    },
    {
      icon: <Trash2 className="w-8 h-8" />,
      title: "Data Processing Agreement",
      description: "Set rules for how long different types of data should be kept and when to dispose of it.",
      category: "Data Protection",
      link: "/policy-generators/data-processing-policy",
      aboutLink: "/policy-generators/about-data-processing-policy"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "GDPR Privacy Policy",
      description: "Generate a General Data Protection Regulation compliant privacy policy for EU compliance.",
      category: "Compliance",
      link: "/policy-generators/gdpr-privacy-policy",
      aboutLink: "/policy-generators/about-gdpr-privacy-policy"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Grant Proposal",
      description: "Create professional grant proposals with objectives, budgets, and expected outcomes.",
      category: "Business",
      link: "/policy-generators/grant-proposal-generator",
      aboutLink: "/policy-generators/about-grant-proposal-generator"
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Incident Response Policy",
      description: "Establish procedures for identifying, responding to, and recovering from security incidents.",
      category: "Security",
      link: "/policy-generators/incident-response-policy",
      aboutLink: "/policy-generators/about-incident-response-policy"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Internet Usage Policy",
      description: "Set boundaries for internet browsing during work hours and on company networks.",
      category: "General",
      link: "/policy-generators/internet-usage-policy",
      aboutLink: "/policy-generators/about-internet-usage-policy"
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: "Password & MFA Policy",
      description: "Establish password strength requirements, rotation schedules, and multi-factor authentication standards.",
      category: "Security",
      link: "/policy-generators/password-mfa-policy",
      aboutLink: "/policy-generators/about-password-mfa-policy"
    },
    {
      icon: <Bug className="w-8 h-8" />,
      title: "Pen-testing Report",
      description: "Generate comprehensive penetration testing reports with findings, vulnerabilities, and remediation steps.",
      category: "Technical",
      link: "/policy-generators/pentesting-report-generator",
      aboutLink: "/policy-generators/about-pentesting-report-generator"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Remote Work Policy",
      description: "Set guidelines for secure remote work practices, VPN usage, and home office security.",
      category: "Operations",
      link: "/policy-generators/remote-work-policy",
      aboutLink: "/policy-generators/about-remote-work-policy"
    },
    {
      icon: <FileSearch className="w-8 h-8" />,
      title: "Request for Information",
      description: "Create detailed RFI documents to gather information from potential vendors and partners.",
      category: "Business",
      link: "/policy-generators/request-for-information",
      aboutLink: "/policy-generators/about-request-for-information"
    },
    {
      icon: <ClipboardList className="w-8 h-8" />,
      title: "Request for Proposal",
      description: "Generate professional RFP documents to solicit proposals from vendors and service providers.",
      category: "Business",
      link: "/policy-generators/request-for-proposal",
      aboutLink: "/policy-generators/about-request-for-proposal"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Request for Quote",
      description: "Create RFQ documents to request pricing and quotes from suppliers and vendors.",
      category: "Business",
      link: "/policy-generators/request-for-quote",
      aboutLink: "/policy-generators/about-request-for-quote"
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Security Awareness Training Policy",
      description: "Mandate regular security training for all employees and track completion.",
      category: "General",
      link: "/policy-generators/security-awareness-policy",
      aboutLink: "/policy-generators/about-security-awareness-policy"
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Social Media Policy",
      description: "Guide employees on appropriate social media use and protecting company reputation.",
      category: "General",
      link: "/policy-generators/social-media-policy",
      aboutLink: "/policy-generators/about-social-media-policy"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Software Design Document",
      description: "Create detailed software design documentation with architecture, components, and specifications.",
      category: "Technical",
      link: "/policy-generators/software-design-document",
      aboutLink: "/policy-generators/about-software-design-document"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Terms Of Service",
      description: "Generate comprehensive terms of service agreements for your website or application.",
      category: "Compliance",
      link: "/policy-generators/terms-of-service",
      aboutLink: "/policy-generators/about-terms-of-service"
    },
    {
      icon: <ClipboardList className="w-8 h-8" />,
      title: "Vendor & Third Party Security",
      description: "Establish security requirements for third-party vendors and service providers.",
      category: "Operations",
      link: "/policy-generators/vendor-third-party",
      aboutLink: "/policy-generators/about-vendor-third-party"
    }
  ];

  const categories = ["All", "General", "Security", "Data Protection", "Operations", "Compliance", "Business", "Technical"];
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
            <a href="/browser-hardening-hub" className="flex items-center space-x-3 group cursor-pointer">
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
              <span>Back to Home</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Policy Generators</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Free to Use</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Instant Download</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Business Policy Hub
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
