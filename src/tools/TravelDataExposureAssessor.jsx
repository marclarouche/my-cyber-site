import React, { useState } from 'react';
import { Plane, ArrowLeft, Shield, AlertTriangle, ChevronRight, ChevronDown, BookOpen, RotateCcw, ExternalLink, CheckCircle, XCircle, Info } from 'lucide-react';

// ─── Scoring weights ────────────────────────────────────────────────────────
const SCORING = {
  // Section 1 — Booking Habits
  booking_ota_major: 14,          // Expedia, Booking.com, etc.
  booking_ota_aggregator: 10,     // Google Flights, Kayak, Hopper
  booking_direct: 0,
  booking_mobile_app_ota: 6,      // extra exposure via app permissions
  booking_saved_profile: 8,       // stored profile = persistent record

  // Section 2 — Loyalty Programs
  loyalty_airline: 10,
  loyalty_hotel: 8,
  loyalty_car: 6,
  loyalty_aggregator_app: 12,     // TripIt, AwardWallet = cross-program aggregation

  // Section 3 — Payment Method
  payment_travel_rewards: 10,     // Chase Sapphire, Amex Platinum — rich spend data
  payment_personal_card: 6,
  payment_corporate_card: 8,
  payment_debit: 4,
  payment_digital_wallet: 2,
  payment_cash: 0,

  // Section 4 — Travel Profile
  profile_international: 12,
  profile_frequent: 10,           // monthly+
  profile_occasional: 4,          // 3–12x/year
  profile_rare: 0,                // 1–2x/year
  profile_major_hub: 8,           // DFW, ATL, ORD, LAX, JFK
  profile_tsa_precheck: 6,        // biometric enrollment
  profile_global_entry: 8,
  profile_clear: 10,              // private biometric database

  // Section 5 — Data Sharing Behaviors
  behavior_tmc: 10,               // travel management company
  behavior_calendar_sync: 8,
  behavior_hotel_wifi: 10,
  behavior_email_links: 6,
};

const QUESTIONS = [
  {
    id: 'booking',
    section: 'Booking Habits',
    icon: '🛒',
    description: 'How you purchase travel directly affects which commercial data pipelines capture your itinerary.',
    fields: [
      {
        id: 'booking_channel',
        label: 'How do you primarily book flights and hotels?',
        type: 'radio',
        options: [
          { value: 'direct', label: 'Direct with airline / hotel website', score: 0 },
          { value: 'ota_aggregator', label: 'Aggregator (Google Flights, Kayak, Hopper)', score: 10 },
          { value: 'ota_major', label: 'Major OTA (Expedia, Booking.com, Hotels.com)', score: 14 },
          { value: 'agent', label: 'Travel agent or corporate TMC', score: 10 },
        ]
      },
      {
        id: 'booking_device',
        label: 'Do you primarily book using a mobile app from an OTA or aggregator?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes — mobile app', score: 6 },
          { value: 'no', label: 'No — browser only', score: 0 },
        ]
      },
      {
        id: 'booking_profile',
        label: 'Do you have a saved account/profile with any OTA or booking site?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes', score: 8 },
          { value: 'no', label: 'No — I always book as a guest', score: 0 },
        ]
      },
    ]
  },
  {
    id: 'loyalty',
    section: 'Loyalty & Rewards',
    icon: '🏆',
    description: 'Loyalty programs are among the richest commercial data sources shared with ARC, CBP, and marketing partners.',
    fields: [
      {
        id: 'loyalty_airline',
        label: 'Are you a member of any airline loyalty program?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes', score: 10 },
          { value: 'no', label: 'No', score: 0 },
        ]
      },
      {
        id: 'loyalty_hotel',
        label: 'Are you a member of any hotel loyalty program?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes', score: 8 },
          { value: 'no', label: 'No', score: 0 },
        ]
      },
      {
        id: 'loyalty_car',
        label: 'Are you a member of any car rental loyalty program?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes', score: 6 },
          { value: 'no', label: 'No', score: 0 },
        ]
      },
      {
        id: 'loyalty_aggregator',
        label: 'Do you use a points aggregator or trip tracking app (TripIt, AwardWallet, App in the Air)?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes', score: 12 },
          { value: 'no', label: 'No', score: 0 },
        ]
      },
    ]
  },
  {
    id: 'payment',
    section: 'Payment Method',
    icon: '💳',
    description: 'Your payment instrument determines how much purchase-level data is shared with issuers, networks, and government systems.',
    fields: [
      {
        id: 'payment_method',
        label: 'What payment method do you primarily use when booking travel?',
        type: 'radio',
        options: [
          { value: 'cash', label: 'Cash / prepaid card', score: 0 },
          { value: 'digital_wallet', label: 'Apple Pay / Google Pay', score: 2 },
          { value: 'debit', label: 'Debit card', score: 4 },
          { value: 'personal_card', label: 'General personal credit card', score: 6 },
          { value: 'corporate_card', label: 'Corporate credit card', score: 8 },
          { value: 'travel_rewards', label: 'Travel rewards card (Chase Sapphire, Amex Platinum, etc.)', score: 10 },
        ]
      },
    ]
  },
  {
    id: 'profile',
    section: 'Travel Profile',
    icon: '🌍',
    description: 'Your travel volume and hub usage determine your exposure frequency to government surveillance checkpoints.',
    fields: [
      {
        id: 'travel_scope',
        label: 'Do you travel internationally?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes — international travel', score: 12 },
          { value: 'no', label: 'No — domestic only', score: 0 },
        ]
      },
      {
        id: 'travel_frequency',
        label: 'How often do you fly?',
        type: 'radio',
        options: [
          { value: 'rare', label: '1–2 times per year', score: 0 },
          { value: 'occasional', label: '3–12 times per year', score: 4 },
          { value: 'frequent', label: 'Monthly or more (business traveler)', score: 10 },
        ]
      },
      {
        id: 'hub_airports',
        label: 'Do you regularly connect through major hub airports (DFW, ATL, ORD, LAX, JFK, MIA)?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes', score: 8 },
          { value: 'no', label: 'No — smaller regional airports', score: 0 },
        ]
      },
      {
        id: 'trusted_traveler',
        label: 'Are you enrolled in any trusted traveler programs?',
        type: 'checkbox_multi',
        options: [
          { value: 'precheck', label: 'TSA PreCheck', score: 6 },
          { value: 'global_entry', label: 'Global Entry', score: 8 },
          { value: 'clear', label: 'CLEAR (biometric)', score: 10 },
          { value: 'none', label: 'None of the above', score: 0, exclusive: true },
        ]
      },
    ]
  },
  {
    id: 'behavior',
    section: 'Data Sharing Behaviors',
    icon: '📡',
    description: 'These habits determine how much secondary exposure your travel data receives beyond the primary booking.',
    fields: [
      {
        id: 'tmc_usage',
        label: 'Do you book through a corporate Travel Management Company (TMC) like Concur, Amex GBT, or BCD?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes', score: 10 },
          { value: 'no', label: 'No', score: 0 },
        ]
      },
      {
        id: 'calendar_sync',
        label: 'Have you connected your Google Calendar or email to any travel app to auto-import bookings?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes', score: 8 },
          { value: 'no', label: 'No', score: 0 },
        ]
      },
      {
        id: 'hotel_wifi',
        label: 'Do you use hotel or airport Wi-Fi without a VPN?',
        type: 'radio',
        options: [
          { value: 'always', label: 'Always — no VPN', score: 10 },
          { value: 'sometimes', label: 'Sometimes', score: 5 },
          { value: 'never', label: 'Never — always use VPN', score: 0 },
        ]
      },
      {
        id: 'email_links',
        label: 'Do you click links in airline or hotel confirmation emails to manage bookings?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes — frequently', score: 6 },
          { value: 'sometimes', label: 'Sometimes', score: 3 },
          { value: 'no', label: 'No — I go direct to the site', score: 0 },
        ]
      },
    ]
  }
];

// ─── Score to Risk mapping ───────────────────────────────────────────────────
function getRiskProfile(score) {
  if (score <= 25) return {
    label: 'Low Exposure',
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.1)',
    borderColor: 'rgba(16,185,129,0.3)',
    percent: Math.round((score / 25) * 33),
    summary: 'Your travel data footprint is relatively contained. You rely on direct booking, limit loyalty program enrollment, and practice good data hygiene.',
  };
  if (score <= 60) return {
    label: 'Moderate Exposure',
    color: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.1)',
    borderColor: 'rgba(245,158,11,0.3)',
    percent: 33 + Math.round(((score - 26) / 34) * 34),
    summary: 'Your booking habits create a meaningful data trail across commercial and potentially government systems. Several easy wins can reduce your exposure significantly.',
  };
  return {
    label: 'High Exposure',
    color: '#ef4444',
    bgColor: 'rgba(239,68,68,0.1)',
    borderColor: 'rgba(239,68,68,0.3)',
    percent: 67 + Math.round(((score - 61) / 60) * 33),
    summary: 'Your travel data is actively flowing through multiple commercial pipelines that are legally shareable with CBP and other agencies under the TIP framework. Action is recommended.',
  };
}

// ─── Personalized findings generator ────────────────────────────────────────
function generateFindings(answers) {
  const findings = [];

  if (answers.booking_channel === 'ota_major') {
    findings.push({
      icon: '⚠️',
      severity: 'high',
      title: 'OTA Booking Creates Persistent Commercial Record',
      detail: 'Major OTAs like Expedia and Booking.com participate in ARC (Airlines Reporting Corporation) data pipelines. Your itinerary, payment method, and travel companion data are legally shareable with CBP under the Traveler Information Program (TIP).'
    });
  }

  if (answers.booking_profile === 'yes') {
    findings.push({
      icon: '🗂️',
      severity: 'medium',
      title: 'Saved Profile = Persistent Linked Identity',
      detail: 'A saved OTA account links all your bookings into a unified travel history that is retained indefinitely and can be subpoenaed or accessed via data-sharing agreements.'
    });
  }

  if (answers.loyalty_aggregator === 'yes') {
    findings.push({
      icon: '🔗',
      severity: 'high',
      title: 'Points Aggregator Creates Cross-Program Profile',
      detail: 'Apps like TripIt and AwardWallet pull data from multiple loyalty programs into a single profile — creating a comprehensive travel history richer than any single program holds. This profile is held by a private company with its own privacy policy.'
    });
  }

  if (answers.payment_method === 'travel_rewards') {
    findings.push({
      icon: '💳',
      severity: 'high',
      title: 'Travel Rewards Card = Richest Spend Profiling',
      detail: 'Premium travel cards like Chase Sapphire and Amex Platinum maintain detailed merchant-category purchase records. Issuers sell anonymized (and sometimes not-so-anonymized) spend data to data brokers. Your travel patterns are part of this.'
    });
  }

  if (answers.travel_scope === 'yes') {
    findings.push({
      icon: '🛂',
      severity: 'high',
      title: 'International Travel = CBP Advance Passenger Info',
      detail: 'Every international booking generates Advance Passenger Information (API) and Passenger Name Records (PNR) sent to CBP. Under TIP, this data is retained for up to 75 years for US persons under certain criteria.'
    });
  }

  if (answers.trusted_traveler && answers.trusted_traveler.includes('clear')) {
    findings.push({
      icon: '🧬',
      severity: 'high',
      title: 'CLEAR Stores Your Biometrics in a Private Database',
      detail: 'Unlike TSA PreCheck (government-held), CLEAR is a private company that retains your iris scans and fingerprints. Their privacy policy permits sharing with partners and in response to legal process. This data is not under FOIA protection.'
    });
  }

  if (answers.trusted_traveler && answers.trusted_traveler.includes('global_entry')) {
    findings.push({
      icon: '🏛️',
      severity: 'medium',
      title: 'Global Entry = Biometrics in CBP\'s IDENT Database',
      detail: 'Global Entry enrollment puts your fingerprints and photo into IDENT, the DHS biometric database. This data is shared across federal law enforcement agencies under current information-sharing agreements.'
    });
  }

  if (answers.calendar_sync === 'yes') {
    findings.push({
      icon: '📅',
      severity: 'medium',
      title: 'Calendar Sync Exposes Itinerary to Third Parties',
      detail: 'Granting travel apps access to your Gmail or Google Calendar gives them read access to all your booking confirmations — and often your contacts and other email contents depending on the scope requested.'
    });
  }

  if (answers.hotel_wifi === 'always') {
    findings.push({
      icon: '📶',
      severity: 'medium',
      title: 'Unprotected Hotel Wi-Fi Exposes In-Transit Traffic',
      detail: 'Hotel and airport networks are commonly monitored or compromised. Without a VPN, your device traffic — including login sessions for travel apps — is visible to network operators and potential attackers.'
    });
  }

  if (answers.tmc_usage === 'yes') {
    findings.push({
      icon: '🏢',
      severity: 'medium',
      title: 'Corporate TMC Centralizes Your Full Travel Record',
      detail: 'Travel Management Companies like Amex GBT, Concur, and BCD hold comprehensive corporate travel records. These are subject to corporate data retention policies, M&A transfers, and government requests separate from your employer\'s control.'
    });
  }

  // Always add at least one finding
  if (findings.length === 0) {
    findings.push({
      icon: '✅',
      severity: 'low',
      title: 'Strong Data Hygiene Detected',
      detail: 'Your travel habits show deliberate data minimization. Your primary risk areas are inherent to flying itself — the best remaining step is reviewing your payment and Wi-Fi practices periodically.'
    });
  }

  return findings;
}

// ─── Recommendations ─────────────────────────────────────────────────────────
function generateRecommendations(answers, score) {
  const recs = [];

  if (answers.booking_channel !== 'direct') {
    recs.push({ priority: 'High', action: 'Book direct with airlines and hotels whenever possible. Direct bookings bypass OTA data pipelines entirely.' });
  }
  if (answers.loyalty_aggregator === 'yes') {
    recs.push({ priority: 'High', action: 'Revoke TripIt / AwardWallet access to your email and loyalty accounts. Use a spreadsheet or manual log instead.' });
  }
  if (answers.trusted_traveler && answers.trusted_traveler.includes('clear')) {
    recs.push({ priority: 'High', action: 'Consider canceling CLEAR. Your biometrics in a private database carry unique long-term risk that TSA PreCheck (government-held, FOIA-covered) does not.' });
  }
  if (answers.calendar_sync === 'yes') {
    recs.push({ priority: 'High', action: 'Revoke email and calendar permissions from all travel apps. Review connected apps at myaccount.google.com/permissions.' });
  }
  if (answers.hotel_wifi === 'always' || answers.hotel_wifi === 'sometimes') {
    recs.push({ priority: 'Medium', action: 'Use a reputable VPN on all hotel and airport Wi-Fi. Mullvad, ProtonVPN, and IVPN are strong privacy-respecting options.' });
  }
  if (answers.booking_profile === 'yes') {
    recs.push({ priority: 'Medium', action: 'Switch to guest checkout for OTA bookings. Delete any saved profiles you no longer need.' });
  }
  if (answers.payment_method === 'travel_rewards') {
    recs.push({ priority: 'Medium', action: 'Consider using a privacy-focused virtual card (Privacy.com) for travel bookings to limit merchant-level spend profiling.' });
  }
  if (answers.email_links === 'yes' || answers.email_links === 'sometimes') {
    recs.push({ priority: 'Low', action: 'Navigate directly to airline/hotel sites instead of clicking email links. This prevents tracking pixels from logging your open time, device, and location.' });
  }

  // Universal
  recs.push({ priority: 'Low', action: 'Review the ARC/CBP TIP framework and submit a FOIA request to CBP to see what data they hold on your travel history.' });

  return recs;
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function TravelDataExposureAssessor() {
  const [answers, setAnswers] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [expandedFinding, setExpandedFinding] = useState(null);
  const [notification, setNotification] = useState('');

  const totalSections = QUESTIONS.length;

  function handleRadio(fieldId, value, score) {
    setAnswers(prev => ({ ...prev, [fieldId]: value, [`${fieldId}_score`]: score }));
  }

  function handleCheckboxMulti(fieldId, optionValue, optionScore, isExclusive, allOptions) {
    setAnswers(prev => {
      const current = prev[fieldId] || [];
      if (isExclusive) {
        return { ...prev, [fieldId]: [optionValue], [`${fieldId}_score`]: 0 };
      }
      // Remove exclusive option if present
      const withoutExclusive = current.filter(v => {
        const opt = allOptions.find(o => o.value === v);
        return !opt?.exclusive;
      });
      let updated;
      if (withoutExclusive.includes(optionValue)) {
        updated = withoutExclusive.filter(v => v !== optionValue);
      } else {
        updated = [...withoutExclusive, optionValue];
      }
      const totalScore = updated.reduce((sum, v) => {
        const opt = allOptions.find(o => o.value === v);
        return sum + (opt?.score || 0);
      }, 0);
      return { ...prev, [fieldId]: updated, [`${fieldId}_score`]: totalScore };
    });
  }

  function isSectionComplete(sectionIdx) {
    const section = QUESTIONS[sectionIdx];
    return section.fields.every(field => {
      if (field.type === 'radio') return answers[field.id] !== undefined;
      if (field.type === 'checkbox_multi') {
        const vals = answers[field.id] || [];
        return vals.length > 0;
      }
      return true;
    });
  }

  function calculateTotalScore() {
    let total = 0;
    QUESTIONS.forEach(section => {
      section.fields.forEach(field => {
        total += answers[`${field.id}_score`] || 0;
      });
    });
    // Normalize to 0–100
    const maxPossible = 183;
    return Math.min(100, Math.round((total / maxPossible) * 100));
  }

  function handleNext() {
    if (!isSectionComplete(currentSection)) {
      showNotification('Please answer all questions before continuing.');
      return;
    }
    if (currentSection < totalSections - 1) {
      setCurrentSection(s => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleBack() {
    if (currentSection > 0) {
      setCurrentSection(s => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleReset() {
    setAnswers({});
    setCurrentSection(0);
    setShowResults(false);
    setExpandedFinding(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showNotification(msg) {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  }

  const score = showResults ? calculateTotalScore() : 0;
  const risk = showResults ? getRiskProfile(score) : null;
  const findings = showResults ? generateFindings(answers) : [];
  const recommendations = showResults ? generateRecommendations(answers, score) : [];

  const severityColor = { high: '#ef4444', medium: '#f59e0b', low: '#10b981' };
  const priorityColor = { High: '#ef4444', Medium: '#f59e0b', Low: '#10b981' };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* ── NAV ─────────────────────────────────────────────────── */}
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
              <a href="/tools" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Tools</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30 mb-8">
            <Plane className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-300">Privacy · Assessment Tool</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight">
            Travel Data Exposure<br />Risk Assessor
          </h1>

          <p className="text-lg text-slate-400 mb-6 max-w-2xl mx-auto leading-relaxed">
            Your booking habits, loyalty programs, and payment methods create a commercial data trail that is legally shareable with CBP and other agencies under the ARC/TIP framework. Find out how exposed you are — in under 3 minutes.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-cyan-400" /> 100% client-side</span>
            <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-cyan-400" /> No data stored</span>
            <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-cyan-400" /> No account needed</span>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ────────────────────────────────────────── */}
      <section className="py-8 px-4 pb-24">
        <div className="max-w-3xl mx-auto">

          {!showResults ? (
            <>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-xs text-slate-500 mb-2">
                  <span>Section {currentSection + 1} of {totalSections}</span>
                  <span>{Math.round(((currentSection) / totalSections) * 100)}% complete</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
                    style={{ width: `${((currentSection) / totalSections) * 100}%` }}
                  />
                </div>
                <div className="flex mt-3 gap-1">
                  {QUESTIONS.map((q, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                        i < currentSection ? 'bg-cyan-500' :
                        i === currentSection ? 'bg-cyan-400/50' :
                        'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Section Card */}
              {(() => {
                const section = QUESTIONS[currentSection];
                return (
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8 mb-6">
                    {/* Section Header */}
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{section.icon}</span>
                      <h2 className="text-xl font-bold text-white">{section.section}</h2>
                    </div>
                    <p className="text-sm text-slate-400 mb-8 leading-relaxed border-l-2 border-cyan-500/40 pl-4">
                      {section.description}
                    </p>

                    {/* Fields */}
                    <div className="space-y-8">
                      {section.fields.map((field) => (
                        <div key={field.id}>
                          <p className="text-slate-200 font-semibold mb-4">{field.label}</p>

                          {field.type === 'radio' && (
                            <div className="space-y-2">
                              {field.options.map((opt) => (
                                <label
                                  key={opt.value}
                                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                                    answers[field.id] === opt.value
                                      ? 'border-cyan-500 bg-cyan-500/10 text-white'
                                      : 'border-slate-700 bg-slate-900/50 text-slate-300 hover:border-slate-600 hover:bg-slate-800/50'
                                  }`}
                                >
                                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                    answers[field.id] === opt.value
                                      ? 'border-cyan-400 bg-cyan-400'
                                      : 'border-slate-600'
                                  }`}>
                                    {answers[field.id] === opt.value && (
                                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                    )}
                                  </div>
                                  <input
                                    type="radio"
                                    name={field.id}
                                    value={opt.value}
                                    checked={answers[field.id] === opt.value}
                                    onChange={() => handleRadio(field.id, opt.value, opt.score)}
                                    className="sr-only"
                                  />
                                  <span className="text-sm">{opt.label}</span>
                                </label>
                              ))}
                            </div>
                          )}

                          {field.type === 'checkbox_multi' && (
                            <div className="space-y-2">
                              {field.options.map((opt) => {
                                const selected = (answers[field.id] || []).includes(opt.value);
                                return (
                                  <label
                                    key={opt.value}
                                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                                      selected
                                        ? 'border-cyan-500 bg-cyan-500/10 text-white'
                                        : 'border-slate-700 bg-slate-900/50 text-slate-300 hover:border-slate-600 hover:bg-slate-800/50'
                                    }`}
                                  >
                                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                      selected ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'
                                    }`}>
                                      {selected && <CheckCircle className="w-3 h-3 text-white" />}
                                    </div>
                                    <input
                                      type="checkbox"
                                      checked={selected}
                                      onChange={() => handleCheckboxMulti(field.id, opt.value, opt.score, opt.exclusive || false, field.options)}
                                      className="sr-only"
                                    />
                                    <span className="text-sm">{opt.label}</span>
                                  </label>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                {currentSection > 0 && (
                  <button
                    onClick={handleBack}
                    className="px-6 py-3 rounded-xl border border-slate-600 hover:border-cyan-500 text-slate-300 hover:text-white transition-all duration-200 font-semibold"
                  >
                    ← Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  {currentSection < totalSections - 1 ? (
                    <>Next Section <ChevronRight className="w-5 h-5" /></>
                  ) : (
                    <>Get My Risk Score <Plane className="w-5 h-5" /></>
                  )}
                </button>
              </div>
            </>
          ) : (
            /* ── RESULTS ──────────────────────────────────────────── */
            <>
              {/* Score Card */}
              <div
                className="rounded-2xl border p-8 mb-6 text-center"
                style={{ borderColor: risk.borderColor, backgroundColor: risk.bgColor }}
              >
                <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: risk.color }}>
                  Your Travel Exposure Risk Score
                </p>

                {/* Score Circle */}
                <div className="relative w-40 h-40 mx-auto my-6">
                  <svg className="w-40 h-40 -rotate-90" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="68" fill="none" stroke="#1e293b" strokeWidth="12" />
                    <circle
                      cx="80" cy="80" r="68"
                      fill="none"
                      stroke={risk.color}
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 68}`}
                      strokeDashoffset={`${2 * Math.PI * 68 * (1 - risk.percent / 100)}`}
                      style={{ transition: 'stroke-dashoffset 1s ease-out', filter: `drop-shadow(0 0 8px ${risk.color}60)` }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold" style={{ color: risk.color }}>{score}</span>
                    <span className="text-xs text-slate-500 mt-1">out of 100</span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-3" style={{ color: risk.color }}>{risk.label}</h2>
                <p className="text-slate-300 text-sm leading-relaxed max-w-xl mx-auto">{risk.summary}</p>
              </div>

              {/* Findings */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6 mb-6">
                <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  Personalized Findings
                </h3>
                <div className="space-y-3">
                  {findings.map((f, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-slate-700 overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFinding(expandedFinding === i ? null : i)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{f.icon}</span>
                          <div>
                            <span
                              className="text-xs font-bold uppercase tracking-wider mr-2"
                              style={{ color: severityColor[f.severity] }}
                            >
                              {f.severity}
                            </span>
                            <span className="text-sm font-semibold text-white">{f.title}</span>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ml-2 ${expandedFinding === i ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {expandedFinding === i && (
                        <div className="px-4 pb-4 pt-1">
                          <p className="text-sm text-slate-400 leading-relaxed border-l-2 border-slate-600 pl-3">{f.detail}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6 mb-6">
                <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-400" />
                  Recommended Actions
                </h3>
                <div className="space-y-3">
                  {recommendations.map((rec, i) => (
                    <div key={i} className="flex gap-3 p-4 rounded-xl border border-slate-700 bg-slate-900/40">
                      <span
                        className="text-xs font-bold uppercase tracking-wider mt-0.5 flex-shrink-0 w-14"
                        style={{ color: priorityColor[rec.priority] }}
                      >
                        {rec.priority}
                      </span>
                      <p className="text-sm text-slate-300 leading-relaxed">{rec.action}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Substack CTA */}
              <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-2xl border border-cyan-500/30 p-6 mb-6">
                <div className="flex items-start gap-4">
                  <Info className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-white mb-2">Want the Full Story on ARC/CBP&apos;s TIP Program?</h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      Our deep-dive article covers exactly what the Traveler Information Program is, who has your data, and what your legal rights are — including how to file a FOIA request to CBP.
                    </p>
                    <a
                      href="https://cyberlifecoach.substack.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
                    >
                      Read Article 23 on Substack <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Retake / More Tools */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleReset}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-600 hover:border-cyan-500 text-slate-300 hover:text-white transition-all duration-200 font-semibold"
                >
                  <RotateCcw className="w-4 h-4" /> Retake Assessment
                </button>
                <a
                  href="/tools"
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-[1.02]"
                >
                  <BookOpen className="w-4 h-4" /> Explore More Tools
                </a>
              </div>
            </>
          )}

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-5 mt-8">
            <p className="text-xs text-slate-500 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer:</strong> This tool runs entirely in your browser. No answers are transmitted, stored, or logged anywhere. Scores are educational estimates based on publicly documented data-sharing practices and are not legal advice. CyberLifeCoach assumes no liability for outcomes resulting from use of this tool. Laws and data-sharing agreements change — verify current practices independently.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
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
            <p>&copy; {new Date().getFullYear()} CyberLifeCoach</p>
            <p className="text-slate-600">Analysis happens entirely in your browser. No data is sent anywhere.</p>
            <p>A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Toast */}
      {notification && (
        <div className="fixed bottom-8 right-8 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in z-50 text-sm font-semibold">
          {notification}
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </div>
  );
}
