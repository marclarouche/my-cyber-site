import React, { useState } from 'react';
import { Shield, Monitor, Apple, Server, Globe, Network, Cloud, Building, FileText, ArrowLeft, ChevronRight, BookOpen, Lock, Wrench, CheckCircle, Zap, Download, Users } from 'lucide-react';

export default function SecurityCenterHub() {
  const [searchTerm, setSearchTerm] = useState('');

  const securityTools = [
    {
      icon: <Monitor className="w-10 h-10" />,
      title: "Windows 11 Secure Setup",
      description: "Comprehensive PowerShell scripts and Group Policy configurations to secure Windows 11 workstations with industry best practices.",
      platform: "Windows",
      difficulty: "Intermediate",
      link: "/security-center/windows-11-hardening",
      aboutLink: "/security-center/about-windows11-tool"
    },
    {
      icon: <Apple className="w-10 h-10" />,
      title: "macOS Secure Setup",
      description: "Automated configuration scripts to harden macOS systems with privacy settings, firewall rules, and security controls.",
      platform: "macOS",
      difficulty: "Intermediate",
      link: "/security-center/macos-secure-setup",
      aboutLink: "/security-center/about-macos-tool"
    },
    {
      icon: <Server className="w-10 h-10" />,
      title: "Linux Secure Setup",
      description: "Bash scripts and configurations for hardening Linux distributions including Ubuntu, Debian, CentOS, and RHEL.",
      platform: "Linux",
      difficulty: "Advanced",
      link: "/security-center/linux-secure-setup",
      aboutLink: "/security-center/about-linux-tool"
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: "Browser Hardening Hub",
      description: "Security configurations and extensions for Chrome, Firefox, Edge, and Safari to maximize privacy and block threats.",
      platform: "Cross-Platform",
      difficulty: "Beginner",
      link: "/security-center/browser-hardening-hub",
      aboutLink: "/security-center/about-browser-hub"
    },
    {
      icon: <Network className="w-10 h-10" />,
      title: "Firewall Hardening Hub",
      description: "Generate firewall rules and baseline configurations for Windows Firewall, iptables, UFW, and pfSense.",
      platform: "Cross-Platform",
      difficulty: "Advanced",
      link: "/security-center/firewall-hardening-hub",
      aboutLink: "/security-center/about-firewall-hub"
    },
    {
      icon: <Cloud className="w-10 h-10" />,
      title: "OneDrive Lockdown",
      description: "Configure OneDrive for Business with maximum security settings, compliance controls, and data loss prevention.",
      platform: "Cloud",
      difficulty: "Intermediate",
      link: "/security-center/onedrive-lockdown-tool",
      aboutLink: "/security-center/about-onedrive-tool"
    },
    {
      icon: <Building className="w-10 h-10" />,
      title: "Small Business Security Assessment",
      description: "Interactive assessment tool that generates a customized security action plan with prioritized recommendations.",
      platform: "Assessment",
      difficulty: "Beginner",
      link: "/security-center/small-business-eval",
      aboutLink: "/security-center/about-smb-assessment"
    },
    {
      icon: <FileText className="w-10 h-10" />,
      title: "Office 365 Baseline Assistant",
      description: "Security baseline configurations for Microsoft 365 including Exchange, Teams, SharePoint, and Azure AD settings.",
      platform: "Cloud",
      difficulty: "Intermediate",
      link: "/security-center/office365-lockdown-tool",
      aboutLink: "/security-center/about-office365-lockdown"
    }
  ];

  const platforms = ["All", "Windows", "macOS", "Linux", "Cloud", "Cross-Platform", "Assessment"];
  const [selectedPlatform, setSelectedPlatform] = useState("All");

  const filteredTools = securityTools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = selectedPlatform === "All" || tool.platform === selectedPlatform;
    return matchesSearch && matchesPlatform;
  });

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case "Beginner": return "bg-green-500/10 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
      case "Advanced": return "bg-red-500/10 text-red-400 border-red-500/30";
      default: return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
    }
  };

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
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-300">Security Configuration Tools</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight">
            Security Center
          </h1>
          
          <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Enterprise-grade security hardening scripts and configuration tools for Windows, macOS, Linux, and cloud platforms. Generate customized security controls in minutes.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Wrench className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search security tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg pl-12 pr-4 py-4 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
              />
            </div>
          </div>

          {/* Platform Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {platforms.map((platform) => (
              <button
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  selectedPlatform === platform
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {platform}
              </button>
            ))}
          </div>

          {/* Tool Count */}
          <p className="text-slate-500 mt-6">
            {filteredTools.length} security configuration {filteredTools.length === 1 ? 'tool' : 'tools'}
          </p>
        </div>
      </section>

      {/* Security Tools Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredTools.length === 0 ? (
            <div className="text-center py-20">
              <Shield className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-400 mb-2">No tools found</h3>
              <p className="text-slate-500">Try adjusting your search or filter</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {filteredTools.map((tool, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2"
                >
                  {/* Icon and Badges */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                      {tool.icon}
                    </div>
                    <div className="flex gap-2">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        {tool.platform}
                      </span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getDifficultyColor(tool.difficulty)}`}>
                        {tool.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                    {tool.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 mb-8 leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => window.location.href = tool.link}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 rounded-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <Wrench className="w-5 h-5" />
                      <span>Open Tool</span>
                    </button>
                    <button
                      onClick={() => window.location.href = tool.aboutLink}
                      className="px-6 py-3.5 rounded-lg font-semibold border border-slate-600 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-800 flex items-center justify-center"
                      title="Learn more about this tool"
                    >
                      <BookOpen className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Why Use Security Center?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
                <Zap className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Deployment</h3>
              <p className="text-slate-400">Generate production-ready security scripts in seconds. Copy, customize, and deploy immediately to your systems.</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
                <CheckCircle className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Industry Best Practices</h3>
              <p className="text-slate-400">All configurations follow CIS Benchmarks, NIST guidelines, and security frameworks used by Fortune 500 companies.</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
                <Lock className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fully Customizable</h3>
              <p className="text-slate-400">Adjust security levels, disable specific controls, and tailor configurations to your organization's unique requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-500/10 border-2 border-yellow-500/30 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="bg-yellow-500/20 p-3 rounded-lg">
                  <Shield className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-yellow-400">Important Security Notice</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  These security hardening scripts make significant system changes. Always test in a non-production environment first. Some configurations may impact application compatibility or user experience. Back up your systems before applying any security controls.
                </p>
                <p className="text-slate-400 text-sm">
                  For enterprise deployments or assistance with implementation, schedule a consultation with me.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-cyan-900/30 to-blue-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Need Help Implementing These Controls?</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            I can help you deploy, test, and maintain these security configurations across your entire infrastructure.
          </p>
          
          <a href="https://calendly.com/cyberlifecoach-proton/new-meeting"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-5 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center space-x-3"
          >
            <Users className="w-6 h-6" />
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