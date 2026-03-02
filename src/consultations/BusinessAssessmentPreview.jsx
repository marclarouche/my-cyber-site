import React, { useState } from 'react';
import { Shield, ArrowLeft, Building, Server, Lock, Database, FileText, Users, Globe, AlertTriangle, Target, CheckCircle, Download, Printer, Calendar } from 'lucide-react';

export default function BusinessAssessmentPreview() {
  const [formData, setFormData] = useState({
    // Business Profile
    size: 'micro',
    regulated: 'none',
    // Identity and Access
    q1: '2',
    q2: '2',
    // Devices
    q3: '2',
    q4: '2',
    // Network
    q5: '2',
    q6: '2',
    // Data Protection
    q7: '2',
    q8: '2',
    // Policies and Training
    q9: '2',
    q10: '2',
    // Vendors and Email Security
    q11: '2',
    q12: '2',
    // Audit & Compliance
    ac1: '2',
    ac2: '2',
    ac3: '2',
    ac4: '2',
    // Security Controls
    sc1: '2',
    sc2: '2',
    sc3: '2',
    sc4: '2',
    // Vulnerability Management
    vm1: '2',
    vm2: '2',
    vm3: '2',
    vm4: '2'
  });

  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const val = (id) => Number.parseInt(formData[id] || "0", 10);

  const sectionFraction = (ids) => {
    const sum = ids.reduce((a, id) => a + val(id), 0);
    const max = ids.length * 2;
    return max ? (sum / max) : 0;
  };

  const focusAreas = () => {
    const sections = [
      { name: "Identity and access", ids: ["q1", "q2"], tip: "Standardize unique accounts and require multi-factor authentication for email and critical apps." },
      { name: "Devices", ids: ["q3", "q4"], tip: "Turn on automatic updates and enable full disk encryption on all laptops." },
      { name: "Network", ids: ["q5", "q6"], tip: "Harden the router and protect remote access using a VPN or a modern access control approach." },
      { name: "Data protection", ids: ["q7", "q8"], tip: "Use automated backups with version history and confirm you can restore data." },
      { name: "Policies and training", ids: ["q9", "q10"], tip: "Publish a short baseline policy set and run regular security awareness training." },
      { name: "Vendors and email security", ids: ["q11", "q12"], tip: "Review vendors before onboarding, and improve email authenticity protections to reduce spoofing risk." },
      { name: "Audit and compliance", ids: ["ac1", "ac2", "ac3", "ac4"], tip: "Document policies, perform access reviews, maintain an incident plan, and map any regulatory obligations." },
      { name: "Security controls", ids: ["sc1", "sc2", "sc3", "sc4"], tip: "Deploy endpoint protection, apply least privilege, enable logging, and use a hardened configuration baseline." },
      { name: "Vulnerability management", ids: ["vm1", "vm2", "vm3", "vm4"], tip: "Maintain an asset inventory, scan regularly, define patch timelines, and check for exposed services." }
    ];

    const scored = sections.map(s => ({ ...s, frac: sectionFraction(s.ids) }));
    scored.sort((a, b) => a.frac - b.frac);

    const picks = scored.filter(s => s.frac < 0.90).slice(0, 3);
    if (picks.length) return picks;

    return [
      { name: "Maintenance and review", tip: "Keep updates, access reviews, and backups on a monthly checklist so protections stay consistent." },
      { name: "Email and account protection", tip: "Keep multi-factor authentication enabled and review account access regularly." }
    ];
  };

  const contextHints = () => {
    const hints = [];
    if (formData.size !== "micro") hints.push("Assign an owner for routine security tasks and track progress monthly.");
    if (formData.regulated !== "none") hints.push("Identify where sensitive data lives and keep an incident response contact list.");
    if (formData.regulated === "heavy") hints.push("Consider a third-party review of backups, access control, and email security.");
    return hints.slice(0, 2);
  };

  const tierFromPercent = (p) => {
    if (p >= 0.75) return { band: "High readiness", note: "Your basics look solid. The next gains come from consistency and tightening a few weak spots." };
    if (p >= 0.55) return { band: "Medium readiness", note: "You have some protections in place, but a few gaps can still create meaningful risk. Focus on the top priorities first." };
    return { band: "Low readiness", note: "Several core controls are missing or uncertain. A small set of changes can reduce common business risks quickly." };
  };

  const calculate = () => {
    const ids = [
      "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12",
      "ac1", "ac2", "ac3", "ac4",
      "sc1", "sc2", "sc3", "sc4",
      "vm1", "vm2", "vm3", "vm4"
    ];
    const score = ids.map(val).reduce((a, b) => a + b, 0);
    const maxScore = ids.length * 2;
    const percent = maxScore ? (score / maxScore) : 0;

    const tier = tierFromPercent(percent);
    const areas = focusAreas();
    const hints = contextHints();

    setResults({ tier, areas, hints });
    setShowResults(true);
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const resetForm = () => {
    setFormData({
      size: 'micro',
      regulated: 'none',
      q1: '2', q2: '2', q3: '2', q4: '2', q5: '2', q6: '2',
      q7: '2', q8: '2', q9: '2', q10: '2', q11: '2', q12: '2',
      ac1: '2', ac2: '2', ac3: '2', ac4: '2',
      sc1: '2', sc2: '2', sc3: '2', sc4: '2',
      vm1: '2', vm2: '2', vm3: '2', vm4: '2'
    });
    setShowResults(false);
    setResults(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const downloadTxt = () => {
    if (!results) return;
    
    const focusText = results.areas.map(a => `• ${a.name}: ${a.tip}`).join('\n');
    const hintsText = results.hints.length ? results.hints.map(h => `• ${h}`).join('\n') : '• No additional notes';
    const date = new Date().toLocaleString();
    
    const text = `Small Business Cybersecurity Readiness Assessment (Preview)
Score band: ${results.tier.band}

Top Focus Areas
${focusText}

Context Hints
${hintsText}

Generated locally on ${date}.`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'small-business-assessment-preview.txt';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
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
              <a href="/small-business-consultation" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to QuickStart</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30 mb-8">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-300">Free Preview Assessment</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight">
            Small Business Cybersecurity Readiness Assessment
          </h1>
          
          <p className="text-lg text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get a short preview score and a few immediate tips. For the complete score and a written plan, book a paid QuickStart session.
          </p>
        </div>
      </section>

      {/* Assessment Form */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Business Profile */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <Building className="w-8 h-8 text-cyan-400" />
              <h2 className="text-2xl font-bold">Business Profile</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Business size</label>
                <select 
                  value={formData.size}
                  onChange={(e) => handleChange('size', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="micro">1 to 9 people</option>
                  <option value="small">10 to 49 people</option>
                  <option value="midsmall">50 to 249 people</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Regulated data</label>
                <select 
                  value={formData.regulated}
                  onChange={(e) => handleChange('regulated', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="none">None or minimal</option>
                  <option value="light">Some customer PII</option>
                  <option value="heavy">Payment data, health data, or highly sensitive info</option>
                </select>
              </div>
            </div>
          </div>

          {/* Assessment Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            
            {/* Identity and Access */}
            <div className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
              <div className="flex items-center space-x-3 mb-6">
                <Lock className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold">Identity and Access</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Unique accounts for staff</label>
                  <select 
                    value={formData.q1}
                    onChange={(e) => handleChange('q1', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2">All staff have separate logins</option>
                    <option value="1">Most have separate logins</option>
                    <option value="0">Some accounts are shared</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">MFA on email and critical apps</label>
                  <select 
                    value={formData.q2}
                    onChange={(e) => handleChange('q2', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2">Enabled for all</option>
                    <option value="1">Enabled for some</option>
                    <option value="0">Not enabled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Devices */}
            <div className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
              <div className="flex items-center space-x-3 mb-6">
                <Server className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold">Devices</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Device updates</label>
                  <select 
                    value={formData.q3}
                    onChange={(e) => handleChange('q3', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2">Automatic updates enabled</option>
                    <option value="1">Updates applied monthly</option>
                    <option value="0">Updates are inconsistent</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Disk encryption on laptops</label>
                  <select 
                    value={formData.q4}
                    onChange={(e) => handleChange('q4', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2">Enabled on all laptops</option>
                    <option value="1">Enabled on some laptops</option>
                    <option value="0">Not enabled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Network */}
            <div className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
              <div className="flex items-center space-x-3 mb-6">
                <Globe className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold">Network</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Router and Wi-Fi security</label>
                  <select 
                    value={formData.q5}
                    onChange={(e) => handleChange('q5', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2">Modern router, strong Wi-Fi, guest network separated</option>
                    <option value="1">Secure Wi-Fi, but limited segmentation</option>
                    <option value="0">Default settings or weak Wi-Fi controls</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Remote access</label>
                  <select 
                    value={formData.q6}
                    onChange={(e) => handleChange('q6', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2">VPN or zero-trust in place</option>
                    <option value="1">Limited remote access with passwords</option>
                    <option value="0">Open remote access or unknown</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Data Protection */}
            <div className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
              <div className="flex items-center space-x-3 mb-6">
                <Database className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold">Data Protection</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Backups with version history</label>
                  <select 
                    value={formData.q7}
                    onChange={(e) => handleChange('q7', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2">Automated backups, versioning, tested restore</option>
                    <option value="1">Backups exist but not tested recently</option>
                    <option value="0">No reliable backups</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">SaaS data backups</label>
                  <select 
                    value={formData.q8}
                    onChange={(e) => handleChange('q8', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2">Separate backups for SaaS tools</option>
                    <option value="1">Some SaaS exports taken</option>
                    <option value="0">Relying on vendor only</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Policies and Training */}
            <div className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold">Policies and Training</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Written baseline policies</label>
                  <select 
                    value={formData.q9}
                    onChange={(e) => handleChange('q9', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2">Core policies exist and are updated</option>
                    <option value="1">Some policies exist</option>
                    <option value="0">No written policies</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Security awareness</label>
                  <select 
                    value={formData.q10}
                    onChange={(e) => handleChange('q10', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2">Quarterly training with phishing practice</option>
                    <option value="1">Annual training only</option>
                    <option value="0">No training</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Vendors and Email Security */}
            <div className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
              <div className="flex items-center space-x-3 mb-6">
                <Users className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold">Vendors and Email Security</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Vendor risk checks</label>
                  <select 
                    value={formData.q11}
                    onChange={(e) => handleChange('q11', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2">Reviewed and approved vendors</option>
                    <option value="1">Basic checks for major vendors</option>
                    <option value="0">No vendor review process</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Email authentication (SPF, DKIM, DMARC)</label>
                  <select 
                    value={formData.q12}
                    onChange={(e) => handleChange('q12', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2">All configured correctly</option>
                    <option value="1">Some configured</option>
                    <option value="0">Not configured or unknown</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Audit & Compliance */}
            <div className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
              <div className="flex items-center space-x-3 mb-6">
                <CheckCircle className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold">Audit & Compliance</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Written security policies</label>
                  <select 
                    value={formData.ac1}
                    onChange={(e) => handleChange('ac1', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2">Documented and reviewed annually</option>
                    <option value="1">Partially documented or outdated</option>
                    <option value="0">No written policies in place</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Access reviews and permissions audits</label>
                  <select 
                    value={formData.ac2}
                    onChange={(e) => handleChange('ac2', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2">Performed quarterly</option>
                    <option value="1">Performed occasionally</option>
                    <option value="0">Not performed</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Incident response plan</label>
                  <select 
                    value={formData.ac3}
                    onChange={(e) => handleChange('ac3', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2">Documented and tested annually</option>
                    <option value="1">Draft exists but not tested</option>
                    <option value="0">No defined plan</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Regulatory obligations (GDPR, HIPAA, PCI, etc.)</label>
                  <select 
                    value={formData.ac4}
                    onChange={(e) => handleChange('ac4', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2">Mapped and monitored for changes</option>
                    <option value="1">Partially identified, not consistently reviewed</option>
                    <option value="0">Unknown or unmanaged</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Security Controls */}
            <div className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold">Security Controls</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Endpoint protection (AV/EDR)</label>
                  <select 
                    value={formData.sc1}
                    onChange={(e) => handleChange('sc1', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2">Deployed on all endpoints</option>
                    <option value="1">Deployed on most endpoints</option>
                    <option value="0">Not deployed or unknown</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Admin privileges</label>
                  <select 
                    value={formData.sc2}
                    onChange={(e) => handleChange('sc2', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2">Least privilege with approval process</option>
                    <option value="1">Some restrictions, not consistent</option>
                    <option value="0">Users have admin by default</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Logging and monitoring</label>
                  <select 
                    value={formData.sc3}
                    onChange={(e) => handleChange('sc3', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2">Centralized logging with alerting</option>
                    <option value="1">Logs retained locally, spot checks</option>
                    <option value="0">No logging or monitoring</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Secure configuration baseline</label>
                  <select 
                    value={formData.sc4}
                    onChange={(e) => handleChange('sc4', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2">Hardened baselines applied (e.g., CIS)</option>
                    <option value="1">Some hardening, not standardized</option>
                    <option value="0">Default configurations</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Vulnerability Management */}
            <div className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
              <div className="flex items-center space-x-3 mb-6">
                <Target className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold">Vulnerability Management</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Asset inventory</label>
                  <select 
                    value={formData.vm1}
                    onChange={(e) => handleChange('vm1', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2">Complete inventory of hardware and software</option>
                    <option value="1">Partial inventory</option>
                    <option value="0">No inventory</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Vulnerability scanning</label>
                  <select 
                    value={formData.vm2}
                    onChange={(e) => handleChange('vm2', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2">Automated monthly scanning</option>
                    <option value="1">Ad hoc or quarterly scanning</option>
                    <option value="0">No scanning</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Patch remediation SLAs</label>
                  <select 
                    value={formData.vm3}
                    onChange={(e) => handleChange('vm3', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2">Critical within 14 days, others within 30–60</option>
                    <option value="1">Targets exist but not enforced</option>
                    <option value="0">No defined SLAs</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">External exposure checks</label>
                  <select 
                    value={formData.vm4}
                    onChange={(e) => handleChange('vm4', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2">Regular checks for exposed services/domains</option>
                    <option value="1">Occasional checks</option>
                    <option value="0">No checks</option>
                  </select>
                </div>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={calculate}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>View Results</span>
            </button>
            <button 
              onClick={resetForm}
              className="px-8 py-4 rounded-lg font-semibold text-lg border-2 border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-900 flex items-center justify-center space-x-2"
            >
              <span>Clear Form</span>
            </button>
          </div>

          {/* Results Section */}
          {showResults && results && (
            <div id="results" className="space-y-8 animate-fadeIn">
              
              {/* Score Band */}
              <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/50 p-10 rounded-2xl text-center">
                <div className="text-sm uppercase tracking-wider text-cyan-400 mb-2">Preview Score Band</div>
                <div className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  {results.tier.band}
                </div>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">{results.tier.note}</p>
              </div>

              {/* Top Focus Areas */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700">
                <h3 className="text-2xl font-bold mb-6 flex items-center space-x-3">
                  <Target className="w-7 h-7 text-cyan-400" />
                  <span>Top Focus Areas</span>
                </h3>
                <ul className="space-y-4">
                  {results.areas.map((area, index) => (
                    <li key={index} className="flex items-start space-x-3 p-4 bg-slate-800/50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-cyan-300">{area.name}:</strong>
                        <span className="text-slate-300"> {area.tip}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Context Hints */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700">
                <h3 className="text-2xl font-bold mb-6 flex items-center space-x-3">
                  <AlertTriangle className="w-7 h-7 text-cyan-400" />
                  <span>Context Hints</span>
                </h3>
                <ul className="space-y-3">
                  {results.hints.length > 0 ? (
                    results.hints.map((hint, index) => (
                      <li key={index} className="flex items-start space-x-3 p-4 bg-slate-800/50 rounded-lg">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0 mt-2"></div>
                        <span className="text-slate-300">{hint}</span>
                      </li>
                    ))
                  ) : (
                    <li className="flex items-start space-x-3 p-4 bg-slate-800/50 rounded-lg">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0 mt-2"></div>
                      <span className="text-slate-300">No additional notes</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Upsell Section */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-cyan-400">Want the full report and prioritized plan?</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Book the paid <a href="/small-business-consultation" className="text-cyan-400 hover:text-cyan-300 underline">Small Business Cyber QuickStart</a> to receive a complete score breakdown, a step-by-step plan, and a written summary. Guidance only, no uploads, no passwords, and no customer PII.
                </p>
                
                <a   href="https://calendly.com/cyberlifecoach-proton/new-meeting"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                 >
                 <Calendar className="w-5 h-5" />
                 <span>Book QuickStart</span>
                </a>
               
              </div>

              {/* Meta Info */}
              <div className="text-center text-sm text-slate-500">
                Preview generated locally on {new Date().toLocaleDateString()}. No information was uploaded or stored.
              </div>

              {/* Action Buttons Row 2 */}
              <div className="flex flex-wrap gap-4 justify-center">
               
               <a href="https://calendly.com/cyberlifecoach-proton/new-meeting"
               target="_blank"
               rel="noopener noreferrer"
               className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
               >
              <Calendar className="w-5 h-5" />
              <span>Book QuickStart</span>
               </a>

               <button 
                  onClick={() => window.print()}
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold border-2 border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-900"
                >
                  <Printer className="w-5 h-5" />
                  <span>Print Preview</span>
                </button>
                <button 
                  onClick={downloadTxt}
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold border-2 border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-900"
                >
                  <Download className="w-5 h-5" />
                  <span>Download as Text</span>
                </button>
              </div>

            </div>
          )}

          {/* Legal Disclaimer */}
          <div className="mt-16 bg-yellow-500/10 border-2 border-yellow-500/30 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="bg-yellow-500/20 p-3 rounded-lg">
                  <Shield className="w-7 h-7 text-yellow-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-yellow-400">Legal Disclaimer</h3>
                <p className="text-slate-300 leading-relaxed">
                  This assessment is provided for informational purposes and does not constitute legal, compliance, or professional security advice. Security posture depends on your systems, processes, staff behavior, and changing threats. No responses are collected or stored. This preview is generated locally on your device.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="w-6 h-6 text-cyan-400" />
            <span className="font-bold text-lg">CyberLifeCoach</span>
          </div>
          <div className="text-slate-500 text-sm">
            <p>&copy; 2026 CyberLifeCoach</p>
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
