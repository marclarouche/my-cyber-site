import React, { useState } from 'react';
import { Shield, ArrowLeft, Server, HardDrive, Users, Lock, CheckCircle, Download, Printer } from 'lucide-react';

export default function StorageSetupIntake() {
  const [setupType, setSetupType] = useState('');
  const [formData, setFormData] = useState({
    // Contact Info
    fullName: '',
    email: '',
    timezone: '',
    preferredContact: 'email',
    
    // Data and Devices
    dataSize: '',
    deviceCount: '',
    dataTypes: '',
    currentStorage: '',
    
    // Home/Prosumer fields
    miniPcModel: '',
    ramAmount: '',
    bootDrive: '',
    mirrorDrives: '',
    remoteAccess: '',
    comfortLevel: '',
    homeGoals: '',
    
    // Business NAS fields
    userCount: '',
    nasPreference: '',
    businessNeeds: '',
    backupPriority: '',
    remoteAccessBusiness: '',
    complianceNotes: '',
    
    // Scheduling
    availability: '',
    notes: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSetupTypeChange = (type) => {
    setSetupType(type);
  };

  const handleDownload = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!setupType) {
      alert('Please select a setup type before downloading.');
      return;
    }
    if (!formData.fullName || !formData.email) {
      alert('Please fill in at least your name and email before downloading.');
      return;
    }

    // Generate text content
    const content = `STORAGE SETUP INTAKE FORM
Generated: ${new Date().toLocaleString()}

═══════════════════════════════════════════════════════════════

SETUP TYPE
${setupType === 'home_prosumer' ? 'Home & Prosumer Mini Server' : 'Small Business NAS'}

═══════════════════════════════════════════════════════════════

CONTACT INFORMATION
Name: ${formData.fullName}
Email: ${formData.email}
Timezone: ${formData.timezone || 'Not specified'}
Preferred Contact: ${formData.preferredContact}

═══════════════════════════════════════════════════════════════

DATA & DEVICES
Approximate Data Size: ${formData.dataSize || 'Not specified'}
Device Count: ${formData.deviceCount || 'Not specified'}
What You're Storing: ${formData.dataTypes || 'Not specified'}
Current Storage Location: ${formData.currentStorage || 'Not specified'}

═══════════════════════════════════════════════════════════════

${setupType === 'home_prosumer' ? `HOME & PROSUMER MINI SERVER DETAILS
Mini PC Model: ${formData.miniPcModel || 'Not specified'}
RAM: ${formData.ramAmount || 'Not specified'}
Boot Drive: ${formData.bootDrive || 'Not specified'}
Mirrored Storage Drives: ${formData.mirrorDrives || 'Not specified'}
Remote Access Needed: ${formData.remoteAccess || 'Not specified'}
Comfort Level: ${formData.comfortLevel || 'Not specified'}
Goals: ${formData.homeGoals || 'Not specified'}

═══════════════════════════════════════════════════════════════
` : ''}
${setupType === 'small_business_nas' ? `SMALL BUSINESS NAS DETAILS
User Count: ${formData.userCount || 'Not specified'}
NAS Platform Preference: ${formData.nasPreference || 'Not specified'}
Team Needs: ${formData.businessNeeds || 'Not specified'}
Backup Priority: ${formData.backupPriority || 'Not specified'}
Remote Access for Staff: ${formData.remoteAccessBusiness || 'Not specified'}
Compliance/Client Requirements: ${formData.complianceNotes || 'Not specified'}

═══════════════════════════════════════════════════════════════
` : ''}
SCHEDULING
Best Days/Times: ${formData.availability || 'Not specified'}
Additional Notes: ${formData.notes || 'Not specified'}

═══════════════════════════════════════════════════════════════

Please email this file to your CyberLifeCoach contact or attach it when 
booking your consultation session.
`;

    // Download as text file
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const filename = `storage-intake-${formData.fullName.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.txt`;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
    
    alert('Your intake form has been downloaded! Please email this file when booking your consultation.');
  };

  const handlePrint = () => {
    window.print();
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
            </a>

            <div className="flex items-center space-x-6">
              <a href="/privacy-storage-consultation" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Storage</span>
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
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Storage Setup Intake
            </h1>
            <p className="text-xl text-slate-300 mb-4">
              <strong>Select your setup type, then answer a few questions so we can recommend the safest, simplest path.</strong>
            </p>
            <p className="text-slate-400">
              This is guided setup using your hardware. You keep control of your accounts and data.
            </p>
          </div>

          {/* Privacy Boundary Callout */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-2xl p-6 mb-12">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="bg-cyan-500/20 p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-cyan-400">Privacy Boundary</h3>
                <p className="text-slate-300 leading-relaxed">
                  I do not request passwords, recovery codes, private keys, or personal files. If a login is needed, you sign in yourself during the session.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-cyan-400">Tell Me What You Want To Build</h2>
            <p className="text-slate-400">
              First choose a Home and Prosumer setup or a Small Business NAS. The form will adapt based on your selection.
            </p>
          </div>

          <form onSubmit={handleDownload} className="space-y-8">
            {/* Step 1: Choose Setup */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center space-x-3">
                <Server className="w-6 h-6" />
                <span>Step 1 — Choose your setup</span>
              </h3>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <label className={`flex-1 cursor-pointer ${setupType === 'home_prosumer' ? 'ring-2 ring-cyan-500' : ''}`}>
                  <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    setupType === 'home_prosumer' 
                      ? 'border-cyan-500 bg-cyan-500/10' 
                      : 'border-slate-700 bg-slate-800/50 hover:border-cyan-500/50'
                  }`}>
                    <input 
                      type="radio" 
                      name="setup_type" 
                      value="home_prosumer"
                      checked={setupType === 'home_prosumer'}
                      onChange={(e) => handleSetupTypeChange(e.target.value)}
                      className="sr-only"
                      required
                    />
                    <div className="flex items-center justify-center space-x-2">
                      <HardDrive className="w-5 h-5 text-cyan-400" />
                      <span className="font-semibold">Home and Prosumer Mini Server</span>
                    </div>
                  </div>
                </label>

                <label className={`flex-1 cursor-pointer ${setupType === 'small_business_nas' ? 'ring-2 ring-cyan-500' : ''}`}>
                  <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    setupType === 'small_business_nas' 
                      ? 'border-cyan-500 bg-cyan-500/10' 
                      : 'border-slate-700 bg-slate-800/50 hover:border-cyan-500/50'
                  }`}>
                    <input 
                      type="radio" 
                      name="setup_type" 
                      value="small_business_nas"
                      checked={setupType === 'small_business_nas'}
                      onChange={(e) => handleSetupTypeChange(e.target.value)}
                      className="sr-only"
                      required
                    />
                    <div className="flex items-center justify-center space-x-2">
                      <Users className="w-5 h-5 text-cyan-400" />
                      <span className="font-semibold">Small Business NAS</span>
                    </div>
                  </div>
                </label>
              </div>

              <p className="text-sm text-slate-400 italic">
                {setupType === 'home_prosumer' && 'Selected: Home and Prosumer Mini Server'}
                {setupType === 'small_business_nas' && 'Selected: Small Business NAS'}
                {!setupType && 'No selection yet.'}
              </p>
            </div>

            {/* Step 2: Contact Info */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-cyan-400">Step 2 — Your contact info</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-slate-300 mb-2 font-medium">
                    Full name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-slate-300 mb-2 font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="timezone" className="block text-slate-300 mb-2 font-medium">
                    Time zone
                  </label>
                  <input
                    id="timezone"
                    type="text"
                    placeholder="Example: Pacific, Eastern"
                    value={formData.timezone}
                    onChange={(e) => handleChange('timezone', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="preferredContact" className="block text-slate-300 mb-2 font-medium">
                    Preferred contact method
                  </label>
                  <select
                    id="preferredContact"
                    value={formData.preferredContact}
                    onChange={(e) => handleChange('preferredContact', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="email">Email</option>
                    <option value="video">Video call</option>
                    <option value="phone">Phone call</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Data and Devices */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-cyan-400">Step 3 — Your data and devices</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="dataSize" className="block text-slate-300 mb-2 font-medium">
                    Approximate data size
                  </label>
                  <select
                    id="dataSize"
                    value={formData.dataSize}
                    onChange={(e) => handleChange('dataSize', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="">Select one</option>
                    <option value="under_250gb">Under 250 GB</option>
                    <option value="250gb_1tb">250 GB to 1 TB</option>
                    <option value="1tb_4tb">1 TB to 4 TB</option>
                    <option value="4tb_plus">4 TB or more</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="deviceCount" className="block text-slate-300 mb-2 font-medium">
                    How many devices will connect
                  </label>
                  <select
                    id="deviceCount"
                    value={formData.deviceCount}
                    onChange={(e) => handleChange('deviceCount', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="">Select one</option>
                    <option value="1_3">1 to 3</option>
                    <option value="4_7">4 to 7</option>
                    <option value="8_10">8 to 10</option>
                    <option value="10_plus">More than 10</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="dataTypes" className="block text-slate-300 mb-2 font-medium">
                    What are you storing
                  </label>
                  <textarea
                    id="dataTypes"
                    rows="3"
                    placeholder="Examples: photos, documents, client files, invoices, videos"
                    value={formData.dataTypes}
                    onChange={(e) => handleChange('dataTypes', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="currentStorage" className="block text-slate-300 mb-2 font-medium">
                    Where is your data today
                  </label>
                  <textarea
                    id="currentStorage"
                    rows="2"
                    placeholder="Examples: Google Drive, Dropbox, OneDrive, external drives, USB sticks"
                    value={formData.currentStorage}
                    onChange={(e) => handleChange('currentStorage', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Home/Prosumer Section */}
            {setupType === 'home_prosumer' && (
              <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-2 border-cyan-500/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">Home and Prosumer Mini Server details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="miniPcModel" className="block text-slate-300 mb-2 font-medium">
                      Mini PC or server model
                    </label>
                    <input
                      id="miniPcModel"
                      type="text"
                      placeholder="Example: Beelink, Minisforum, Intel NUC"
                      value={formData.miniPcModel}
                      onChange={(e) => handleChange('miniPcModel', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="ramAmount" className="block text-slate-300 mb-2 font-medium">
                      RAM
                    </label>
                    <input
                      id="ramAmount"
                      type="text"
                      placeholder="Example: 8 GB, 16 GB"
                      value={formData.ramAmount}
                      onChange={(e) => handleChange('ramAmount', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="bootDrive" className="block text-slate-300 mb-2 font-medium">
                      Boot drive size
                    </label>
                    <input
                      id="bootDrive"
                      type="text"
                      placeholder="Example: 256 GB SSD"
                      value={formData.bootDrive}
                      onChange={(e) => handleChange('bootDrive', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="mirrorDrives" className="block text-slate-300 mb-2 font-medium">
                      Mirrored storage drives
                    </label>
                    <input
                      id="mirrorDrives"
                      type="text"
                      placeholder="Example: 2 x 4 TB"
                      value={formData.mirrorDrives}
                      onChange={(e) => handleChange('mirrorDrives', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="remoteAccess" className="block text-slate-300 mb-2 font-medium">
                      Remote access needed
                    </label>
                    <select
                      id="remoteAccess"
                      value={formData.remoteAccess}
                      onChange={(e) => handleChange('remoteAccess', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="">Select one</option>
                      <option value="no">No</option>
                      <option value="yes_tailscale">Yes, using Tailscale</option>
                      <option value="not_sure">Not sure</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="comfortLevel" className="block text-slate-300 mb-2 font-medium">
                      Comfort level
                    </label>
                    <select
                      id="comfortLevel"
                      value={formData.comfortLevel}
                      onChange={(e) => handleChange('comfortLevel', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="">Select one</option>
                      <option value="beginner">Beginner, I want simple steps</option>
                      <option value="intermediate">Intermediate, I can follow a checklist</option>
                      <option value="advanced">Advanced, I want more control</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="homeGoals" className="block text-slate-300 mb-2 font-medium">
                    What do you want it to do
                  </label>
                  <textarea
                    id="homeGoals"
                    rows="3"
                    placeholder="Examples: private file storage, photo backups, secure sharing with family, local backups"
                    value={formData.homeGoals}
                    onChange={(e) => handleChange('homeGoals', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>
              </div>
            )}

            {/* Business NAS Section */}
            {setupType === 'small_business_nas' && (
              <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-2 border-cyan-500/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">Small Business NAS details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="userCount" className="block text-slate-300 mb-2 font-medium">
                      How many users need access
                    </label>
                    <select
                      id="userCount"
                      value={formData.userCount}
                      onChange={(e) => handleChange('userCount', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="">Select one</option>
                      <option value="1_3">1 to 3</option>
                      <option value="4_7">4 to 7</option>
                      <option value="8_10">8 to 10</option>
                      <option value="10_plus">More than 10</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="nasPreference" className="block text-slate-300 mb-2 font-medium">
                      NAS platform preference
                    </label>
                    <select
                      id="nasPreference"
                      value={formData.nasPreference}
                      onChange={(e) => handleChange('nasPreference', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="">Select one</option>
                      <option value="synology">Synology</option>
                      <option value="qnap">QNAP</option>
                      <option value="already_have_one">We already have a NAS</option>
                      <option value="not_sure">Not sure</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="businessNeeds" className="block text-slate-300 mb-2 font-medium">
                    What does your team need
                  </label>
                  <textarea
                    id="businessNeeds"
                    rows="3"
                    placeholder="Examples: shared folders by role, client folders, scans and receipts, accounting backups"
                    value={formData.businessNeeds}
                    onChange={(e) => handleChange('businessNeeds', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="backupPriority" className="block text-slate-300 mb-2 font-medium">
                      Backup priority
                    </label>
                    <select
                      id="backupPriority"
                      value={formData.backupPriority}
                      onChange={(e) => handleChange('backupPriority', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="">Select one</option>
                      <option value="basic">Basic, recover from accidental deletion</option>
                      <option value="ransomware">Ransomware aware, snapshots and offline copy</option>
                      <option value="offsite">Offsite copy needed</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="remoteAccessBusiness" className="block text-slate-300 mb-2 font-medium">
                      Remote access for staff
                    </label>
                    <select
                      id="remoteAccessBusiness"
                      value={formData.remoteAccessBusiness}
                      onChange={(e) => handleChange('remoteAccessBusiness', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="">Select one</option>
                      <option value="no">No</option>
                      <option value="yes_limited">Yes, limited to approved devices</option>
                      <option value="not_sure">Not sure</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="complianceNotes" className="block text-slate-300 mb-2 font-medium">
                    Any compliance or client requirements
                  </label>
                  <textarea
                    id="complianceNotes"
                    rows="2"
                    placeholder="Examples: none, HIPAA, client confidentiality, retention rules"
                    value={formData.complianceNotes}
                    onChange={(e) => handleChange('complianceNotes', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Scheduling */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-cyan-400">Step 4 — Scheduling</h3>

              <div className="space-y-6">
                <div>
                  <label htmlFor="availability" className="block text-slate-300 mb-2 font-medium">
                    Best days and times
                  </label>
                  <textarea
                    id="availability"
                    rows="2"
                    placeholder="Example: weekdays after 3pm, Saturdays mornings"
                    value={formData.availability}
                    onChange={(e) => handleChange('availability', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="notes" className="block text-slate-300 mb-2 font-medium">
                    Anything else I should know
                  </label>
                  <textarea
                    id="notes"
                    rows="3"
                    placeholder="Include any constraints such as internet speed, router access, or special workflows"
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Download Instructions */}
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Shield className="w-5 h-5 text-cyan-400 mt-0.5" />
                </div>
                <div className="text-sm text-slate-300">
                  <p className="font-semibold text-cyan-400 mb-1">Privacy First</p>
                  <p>This form is processed locally in your browser. Download your completed intake form and email it separately or attach it when booking your consultation. No data is transmitted or stored by this page.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                type="submit"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download as Text</span>
              </button>
              <button 
                type="button"
                onClick={handlePrint}
                className="px-8 py-4 rounded-lg font-semibold text-lg border-2 border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-900 flex items-center justify-center space-x-2"
              >
                <Printer className="w-5 h-5" />
                <span>Print / Save as PDF</span>
              </button>
              <a 
                href="/privacy-storage-consultation"
                className="px-8 py-4 rounded-lg font-semibold text-lg border-2 border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-900 flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Booking</span>
              </a>
            </div>

            {/* Legal Disclaimer */}
            <div className="bg-yellow-500/10 border-2 border-yellow-500/30 rounded-2xl p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="bg-yellow-500/20 p-3 rounded-lg">
                    <Shield className="w-7 h-7 text-yellow-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-yellow-400">Legal Disclaimer</h3>
                  <p className="text-slate-300 leading-relaxed">
                    This intake is for planning and scoping only. This service provides educational guidance and guided setup. Mirrored or parity protected storage improves resilience but does not replace backups. You remain responsible for your accounts, your devices, and ongoing maintenance.
                  </p>
                </div>
              </div>
            </div>
          </form>
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
            <p>&copy; 2025 CyberLifeCoach</p>
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Print Styles */}
      <style>{`
        @media print {
          nav, footer, .no-print {
            display: none !important;
          }
          body {
            background: white !important;
            color: black !important;
          }
          .bg-slate-900, .bg-slate-800, .bg-gradient-to-br {
            background: white !important;
            border: 1px solid #ddd !important;
          }
          button[type="button"], a[href] {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
