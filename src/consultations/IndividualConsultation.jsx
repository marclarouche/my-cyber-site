import React, { useState } from 'react';
import { Shield, Lock, Eye, Calendar, ChevronRight, CheckCircle, ArrowLeft, FileText, DollarSign } from 'lucide-react';

export default function IndividualConsultation() {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    socialMedia: [],
    devices: [],
    concerns: [],
    dataSharing: '',
    backups: '',
    passwords: '',
    twoFactor: '',
    vpn: '',
    additionalInfo: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (category, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This would typically send data to your backend
    alert('Free assessment submitted! Check your email for your privacy summary. To get your full detailed report, please schedule a paid consultation.');
  };

  const benefits = [
    "Comprehensive privacy assessment questionnaire",
    "Free summary of your current privacy posture",
    "Identification of critical vulnerabilities",
    "Prioritized action items",
    "Full detailed written report ($50)",
    "Personalized recommendations",
    "30-day email support included"
  ];

  const concerns = [
    "Identity theft protection",
    "Social media privacy",
    "Online tracking & ads",
    "Data breaches",
    "Password security",
    "Smart home devices",
    "Financial privacy",
    "Email security"
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center space-x-3 group cursor-pointer">
              <img 
                src="/logo.png" 
                alt="Your Company" 
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
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
                Schedule Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30 mb-8">
            <Eye className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-300">For Individuals</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight">
            Personal Privacy Consultation
          </h1>
          
          <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Take control of your digital footprint with a comprehensive privacy assessment tailored to your personal needs. Get a free summary and unlock your full detailed report for just $50.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <button 
  onClick={() => window.location.href = '/personal-assessment'}
  className="group bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
>
  <FileText className="w-5 h-5" />
  <span>Start Free Assessment</span>
  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
</button>
            <button className="px-8 py-4 rounded-lg font-semibold text-lg border-2 border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:bg-slate-900 flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Schedule Paid Consultation</span>
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
                <span className="text-2xl font-bold text-cyan-400">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Complete Questionnaire</h3>
              <p className="text-slate-400">Answer comprehensive questions about your digital life, privacy concerns, and current security practices.</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
                <span className="text-2xl font-bold text-cyan-400">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Receive Free Summary</h3>
              <p className="text-slate-400">Get an immediate overview of your privacy score and top vulnerabilities via email.</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
                <span className="text-2xl font-bold text-cyan-400">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Get Full Report</h3>
              <p className="text-slate-400">Schedule a $50 consultation to receive your detailed written report with actionable recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                What You'll Receive
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                Our individual privacy consultation provides a thorough assessment of your digital security posture with practical, actionable recommendations.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-cyan-500/30">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold mb-2">Pricing</h3>
                <div className="flex items-center justify-center space-x-2">
                  <DollarSign className="w-8 h-8 text-cyan-400" />
                  <span className="text-5xl font-bold text-cyan-400">50</span>
                </div>
                <p className="text-slate-400 mt-2">One-time consultation fee</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Free Assessment</span>
                    <span className="text-cyan-400">$0</span>
                  </div>
                  <p className="text-sm text-slate-400">Basic privacy summary via email</p>
                </div>

                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4 rounded-lg border border-cyan-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Full Report + Consultation</span>
                    <span className="text-cyan-400">$50</span>
                  </div>
                  <p className="text-sm text-slate-400">Detailed written report with personalized recommendations and 30-day support</p>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 rounded-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Questionnaire Modal */}
      {showQuestionnaire && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-12 flex items-center justify-center">
            <div className="bg-slate-900 rounded-2xl border border-cyan-500/30 max-w-3xl w-full p-8 relative">
              <button
                onClick={() => setShowQuestionnaire(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-cyan-400 transition-colors"
              >
                ✕
              </button>

              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Privacy Assessment Questionnaire
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Info */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-cyan-400">Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-cyan-400">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-cyan-400">Phone (Optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                {/* Privacy Concerns */}
                <div>
                  <label className="block text-sm font-semibold mb-3 text-cyan-400">What are your main privacy concerns? (Select all that apply)</label>
                  <div className="grid grid-cols-2 gap-3">
                    {concerns.map((concern) => (
                      <label key={concern} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.concerns.includes(concern)}
                          onChange={() => handleCheckboxChange('concerns', concern)}
                          className="w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-cyan-500"
                        />
                        <span className="text-sm text-slate-300">{concern}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <label className="block text-sm font-semibold mb-3 text-cyan-400">Which social media platforms do you use?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Facebook', 'Instagram', 'Twitter/X', 'LinkedIn', 'TikTok', 'Snapchat', 'YouTube', 'None'].map((platform) => (
                      <label key={platform} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.socialMedia.includes(platform)}
                          onChange={() => handleCheckboxChange('socialMedia', platform)}
                          className="w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-cyan-500"
                        />
                        <span className="text-sm text-slate-300">{platform}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Devices */}
                <div>
                  <label className="block text-sm font-semibold mb-3 text-cyan-400">What devices do you use regularly?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Smartphone', 'Laptop', 'Desktop', 'Tablet', 'Smart TV', 'Smart Home Devices', 'Wearables', 'Gaming Console'].map((device) => (
                      <label key={device} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.devices.includes(device)}
                          onChange={() => handleCheckboxChange('devices', device)}
                          className="w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-cyan-500"
                        />
                        <span className="text-sm text-slate-300">{device}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Security Practices */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-cyan-400">Do you use two-factor authentication?</label>
                  <select
                    name="twoFactor"
                    value={formData.twoFactor}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="">Select...</option>
                    <option value="yes-all">Yes, on all accounts</option>
                    <option value="yes-some">Yes, on some accounts</option>
                    <option value="no">No</option>
                    <option value="unsure">I'm not sure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-cyan-400">How do you manage passwords?</label>
                  <select
                    name="passwords"
                    value={formData.passwords}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="">Select...</option>
                    <option value="manager">Password manager</option>
                    <option value="browser">Browser saved passwords</option>
                    <option value="memory">Memory</option>
                    <option value="written">Written down</option>
                    <option value="same">Same password for multiple accounts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-cyan-400">Do you use a VPN?</label>
                  <select
                    name="vpn"
                    value={formData.vpn}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="">Select...</option>
                    <option value="always">Yes, always</option>
                    <option value="sometimes">Yes, sometimes</option>
                    <option value="no">No</option>
                    <option value="unsure">I don't know what a VPN is</option>
                  </select>
                </div>

                {/* Additional Info */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-cyan-400">Any additional information or specific concerns?</label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="Tell us more about your privacy goals..."
                  />
                </div>

                {/* Submit */}
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <p className="text-sm text-slate-300 mb-4">
                    <strong>What happens next:</strong> You'll receive a free privacy summary via email within 24 hours. To get your full detailed report with personalized recommendations, schedule a $50 consultation.
                  </p>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 rounded-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                  >
                    Submit Free Assessment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="w-6 h-6 text-cyan-400" />
            <span className="font-bold text-lg">SecurePrivacy</span>
          </div>
          <p className="text-slate-500 text-sm text-center">
          &copy; 2026 CyberLifeCoach | A Veteran-Owned Business Committed to Your Digital Security | All rights reserved.</p>
              </div>
      </footer>
    </div>
  );
}