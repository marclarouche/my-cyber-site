import React from 'react';
import { Plane, ArrowLeft, Shield, AlertTriangle, CheckCircle, Lock, Info, ExternalLink } from 'lucide-react';

export default function AboutTravelDataExposureAssessor() {
  const handleOpenTool = () => {
    window.location.href = '/tools/travel-data-exposure-assessor';
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">

      {/* ── NAVIGATION ──────────────────────────────────────────── */}
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

            <a href="/tools" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tools Hub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
              Privacy Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Travel Data
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Government Surveillance
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Travel Data Exposure:<br />What You Need to Know
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            A practical reference for understanding how your booking habits, loyalty programs, and payment methods create a data trail — and what you can do about it.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* ── BODY ────────────────────────────────────────────────── */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">

          {/* Lead */}
          <div className="pc rounded-2xl border border-slate-700 p-8 mb-8">
            <p className="text-slate-300 text-lg leading-relaxed">
              Every time you book a flight, earn loyalty points, or swipe a travel rewards card, a data record is created. Under the ARC/CBP Traveler Information Program (TIP), much of that commercial data is legally shareable with U.S. Customs and Border Protection — and retained for decades. Most travelers have no idea this is happening.
            </p>
          </div>

          {/* What Is the TIP Program? */}
          <div className="pc rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              What Is the TIP Program?
            </h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              The Traveler Information Program is a data-sharing framework between the Airlines Reporting Corporation (ARC) — the industry clearinghouse that processes airline ticket transactions — and U.S. Customs and Border Protection (CBP). Under TIP, ARC provides CBP with access to commercial travel records including:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                'Full passenger name and contact information',
                'Complete itinerary including routing, layovers, and seat selection',
                'Payment method and partial card data',
                'Booking channel (OTA, direct, travel agent)',
                'Loyalty program membership identifiers',
                'Companion traveler records linked by booking',
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-400">{item}</span>
                </li>
              ))}
            </ul>
            <div className="pc rounded-xl border border-slate-700 p-6">
              <div className="flex items-start space-x-3">
                <Info className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-blue-300 mb-2">Retention Window</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Under certain risk criteria, CBP may retain Passenger Name Records (PNRs) for U.S. persons for up to 75 years. For non-U.S. persons, standard retention is 15 years. This data can be accessed by other federal law enforcement agencies under information-sharing agreements.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* The Five Exposure Vectors */}
          <div className="pc rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              The Five Exposure Vectors
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Your travel data exposure comes from five distinct sources, each feeding different pipelines. Understanding them is the first step to reducing your footprint.
            </p>

            <div className="space-y-5">
              {[
                {
                  number: '01',
                  title: 'Booking Channel',
                  body: 'Online Travel Agencies (OTAs) like Expedia, Booking.com, and Hotels.com sit between you and the airline or hotel. Every booking creates a commercial record in their system, which may be retained, sold to data brokers, or shared with government partners. Booking direct eliminates this intermediary layer entirely.',
                },
                {
                  number: '02',
                  title: 'Loyalty Program Enrollment',
                  body: 'Airline and hotel loyalty programs maintain detailed travel histories tied to your identity. These records are among the most comprehensive behavioral datasets in commercial use. Points aggregator apps (TripIt, AwardWallet) compound this by pulling data from multiple programs into a single privately-held profile.',
                },
                {
                  number: '03',
                  title: 'Payment Method',
                  body: 'Travel rewards cards like Chase Sapphire and Amex Platinum generate rich merchant-category spend records. Card issuers sell anonymized — and sometimes re-identifiable — spend data to data brokers. The more travel-specific your card, the more granular the profiling it enables.',
                },
                {
                  number: '04',
                  title: 'Trusted Traveler Programs',
                  body: 'TSA PreCheck and Global Entry enroll your biometrics into government databases (DHS IDENT). CLEAR goes further — it is a private company that retains iris scans and fingerprints outside of FOIA protections, with the ability to share data with partners and respond to legal process independently of your knowledge.',
                },
                {
                  number: '05',
                  title: 'Secondary Behaviors',
                  body: 'Connecting travel apps to your Gmail or calendar, using hotel Wi-Fi without a VPN, and clicking links in booking confirmation emails all create secondary exposure points. Calendar syncing in particular often grants broader email access than travelers realize.',
                },
              ].map((item) => (
                <div key={item.number} className="flex gap-5">
                  <span className="text-3xl font-bold text-cyan-500/40 flex-shrink-0 w-10 leading-tight">{item.number}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-sm">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk by Booking Method */}
          <div className="pc rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Risk by Booking Method
            </h2>
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Method</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Data Intermediaries</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Relative Risk</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400 text-sm">
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">Direct with airline / hotel</td>
                    <td className="py-3 px-4">Airline or hotel only</td>
                    <td className="py-3 px-4 text-green-400 font-semibold">Lowest</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">Aggregator (Google Flights, Kayak)</td>
                    <td className="py-3 px-4">Aggregator + airline</td>
                    <td className="py-3 px-4 text-yellow-400 font-semibold">Moderate</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">Major OTA (Expedia, Booking.com)</td>
                    <td className="py-3 px-4">OTA + ARC pipeline + airline</td>
                    <td className="py-3 px-4 text-orange-400 font-semibold">High</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">Corporate TMC (Concur, Amex GBT)</td>
                    <td className="py-3 px-4">TMC + employer + ARC + airline</td>
                    <td className="py-3 px-4 text-red-400 font-semibold">Highest</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Trusted Traveler Programs Compared */}
          <div className="pc rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Trusted Traveler Programs: What You're Trading
            </h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Program</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Who Holds Biometrics</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">FOIA Covered?</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Privacy Note</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400 text-sm">
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-semibold text-slate-200">TSA PreCheck</td>
                    <td className="py-3 px-4">DHS / TSA</td>
                    <td className="py-3 px-4 text-green-400">Yes</td>
                    <td className="py-3 px-4">Government-held; subject to federal privacy protections</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-semibold text-slate-200">Global Entry</td>
                    <td className="py-3 px-4">DHS / CBP (IDENT)</td>
                    <td className="py-3 px-4 text-green-400">Yes</td>
                    <td className="py-3 px-4">Shared across federal law enforcement under ISAs</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-semibold text-slate-200">CLEAR</td>
                    <td className="py-3 px-4">Alclear LLC (private company)</td>
                    <td className="py-3 px-4 text-red-400">No</td>
                    <td className="py-3 px-4">Private policy governs use; partner sharing permitted; no government oversight</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="pc rounded-xl border border-slate-700 p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-amber-300 mb-2">CLEAR Is Different</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Unlike government programs, CLEAR is operated by a for-profit company. Your iris scans and fingerprints are retained by Alclear LLC and governed by their privacy policy, which permits sharing with business partners and responding to legal process — including civil subpoenas, not just criminal warrants. Canceling CLEAR and requesting data deletion is your right under their policy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What You Can Do */}
          <div className="pc rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              What You Can Do
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Reducing your travel data exposure does not require giving up convenience entirely. Prioritize the highest-impact changes first.
            </p>
            <ol className="space-y-5 mb-6">
              {[
                {
                  label: 'Book direct whenever possible.',
                  detail: 'Airline and hotel direct bookings bypass OTA data pipelines entirely. Even a small price premium is often worth the privacy benefit for frequent travelers.',
                },
                {
                  label: 'Audit your loyalty program footprint.',
                  detail: 'Keep only the loyalty programs you actively use and earn meaningful value from. Cancel dormant memberships. Revoke access from any points aggregator apps.',
                },
                {
                  label: 'Use a travel-specific virtual card.',
                  detail: 'Services like Privacy.com let you generate single-use or merchant-locked virtual card numbers. This limits merchant-level spend profiling and eliminates linkability across bookings.',
                },
                {
                  label: 'Revoke email and calendar access from travel apps.',
                  detail: 'Go to myaccount.google.com/permissions and revoke any travel app access. Use manual entry or forward confirmation emails to a dedicated inbox instead.',
                },
                {
                  label: 'Always use a VPN on hotel and airport Wi-Fi.',
                  detail: 'Mullvad, ProtonVPN, and IVPN are strong privacy-respecting options. Enable your VPN before connecting, not after.',
                },
                {
                  label: 'Consider whether CLEAR is worth the trade-off.',
                  detail: 'TSA PreCheck provides similar queue benefits with government-held, FOIA-covered biometrics. CLEAR stores your data with a private company under their own policy.',
                },
                {
                  label: 'File a FOIA request with CBP.',
                  detail: 'You can request a copy of any travel records CBP holds on you by submitting a FOIA request through the DHS portal at dhs.gov/foia. This is your legal right as a U.S. person.',
                },
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">{i + 1}.</span>
                  <div>
                    <strong className="text-slate-200">{item.label}</strong>
                    <span className="text-slate-400"> {item.detail}</span>
                  </div>
                </li>
              ))}
            </ol>
            <div className="pc rounded-xl border border-slate-700 p-6">
              <div className="flex items-start space-x-3">
                <Lock className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-blue-300 mb-2">Tip</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    You do not need to do everything at once. Run the Travel Data Exposure Assessor to identify your specific highest-risk habits, then address them one at a time starting with the highest-priority recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Understanding Your Score */}
          <div className="pc rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Understanding Your Risk Score
            </h2>
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Score Range</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Risk Level</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">What It Means</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400 text-sm">
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-mono text-green-400">0 – 25</td>
                    <td className="py-3 px-4 text-green-400 font-semibold">Low Exposure</td>
                    <td className="py-3 px-4">Minimal data pipeline involvement. You book direct, limit loyalty exposure, and practice good data hygiene.</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-mono text-amber-400">26 – 60</td>
                    <td className="py-3 px-4 text-amber-400 font-semibold">Moderate Exposure</td>
                    <td className="py-3 px-4">Your travel data flows through several commercial pipelines. Several high-impact changes are available to you.</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-mono text-red-400">61 – 100</td>
                    <td className="py-3 px-4 text-red-400 font-semibold">High Exposure</td>
                    <td className="py-3 px-4">Your data is actively flowing through multiple systems that are legally shareable with CBP. Prioritized action is recommended.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-500 italic">
              Scores are educational estimates based on documented commercial data-sharing practices. They are not legal assessments.
            </p>
          </div>

          {/* Frequently Asked Questions */}
          <div className="pc rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: 'Is this only a concern for international travelers?',
                  a: 'No. While international travel triggers Advance Passenger Information (API) requirements that send data directly to CBP, domestic OTA bookings also feed into ARC data pipelines that are accessible to CBP under TIP. Frequent domestic travelers who use OTAs and loyalty programs carry meaningful exposure.',
                },
                {
                  q: 'Does booking direct actually protect my data?',
                  a: 'Booking direct significantly reduces your exposure by eliminating the OTA intermediary. However, the airline or hotel still creates a booking record. The key benefit is that your data stays within one organization\'s privacy policy rather than flowing through multiple commercial aggregators.',
                },
                {
                  q: 'Can I opt out of the TIP program?',
                  a: 'There is no direct consumer opt-out from the ARC/CBP TIP data-sharing arrangement, as it operates at the industry level between ARC and CBP. Your best levers are reducing the richness of the commercial data created in the first place — primarily by booking direct and limiting loyalty program enrollment.',
                },
                {
                  q: 'Is my data safe once it\'s with the government?',
                  a: 'Government-held travel data is subject to federal privacy law and FOIA, which provides some accountability. However, DHS shares data across federal law enforcement agencies under information-sharing agreements. The existence of the data — regardless of legal protections — creates long-term risk in the event of future policy changes or data breaches.',
                },
                {
                  q: 'Does this tool send any of my answers anywhere?',
                  a: 'No. This tool runs entirely in your browser using React state. No answers, scores, or results are transmitted to any server, stored in any database, or accessible to CyberLifeCoach or any third party.',
                },
              ].map((faq, i) => (
                <div key={i} className="border-b border-slate-800 pb-5 last:border-0 last:pb-0">
                  <h3 className="text-slate-200 font-semibold mb-2">{faq.q}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Substack cross-link */}
          <div className="pc rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white text-xl mb-2">Read the Full Investigation</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Our deep-dive article (Article 23) covers the ARC/CBP TIP program in full — what it is, the legal basis, who has your data, case examples, and exactly how to file a FOIA request to see your own CBP travel record.
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

          {/* Print-Friendly Notes */}
          <div className="pc rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Print-Friendly Notes
            </h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3">•</span>
                <span>This guide is optimized for printing. Use the Print button below to save a physical copy for reference.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3">•</span>
                <span>Store any printed copy in a secure location, separate from travel documents.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3">•</span>
                <span>This guide is suitable for personal security awareness, team training, or sharing with frequent-traveler colleagues.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3">•</span>
                <span>Do not annotate printed copies with personal travel details or loyalty account numbers.</span>
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <Plane className="w-5 h-5" />
              <span>Open the Travel Data Exposure Assessor</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print This Guide</span>
            </button>
          </div>

          {/* Legal Disclaimer */}
          <div className="pc rounded-xl border border-slate-700 p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer and Important Notice:</strong> This page is provided for educational and informational purposes only. CyberLifeCoach and its affiliates make no warranties regarding the completeness, accuracy, or currency of the information presented. Data-sharing laws, agency policies, and commercial privacy practices change — verify current practices independently. Nothing on this page constitutes legal advice. You are responsible for your own privacy and security decisions. CyberLifeCoach assumes no liability for outcomes resulting from use of this guide or the associated tool.
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
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ── PRINT-ONLY HEADER (hidden on screen) ───────────────── */}
      <div className="print-header">
        <h1>Travel Data Exposure Risk Assessor — Reference Guide</h1>
        <p>CyberLifeCoach &nbsp;|&nbsp; cyberlifecoach.pro &nbsp;|&nbsp; A Veteran-Owned Business Committed to Your Digital Security</p>
        <p>Printed {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* ── PRINT-ONLY FOOTER (hidden on screen) ───────────────── */}
      <div className="print-footer">
        © {new Date().getFullYear()} CyberLifeCoach · cyberlifecoach.pro · For educational purposes only. Not legal advice.
      </div>

      {/* ── PRINT STYLES ────────────────────────────────────────── */}
      <style>{`
        /* Hide print-only elements on screen */
        .print-header,
        .print-footer {
          display: none;
        }

        /* Card class used on every content section */
        .pc {
          background: #1e293b;
        }

        @media print {
          @page {
            margin: 1.8cm 1.5cm;
            size: A4;
          }

          /* ── Nuclear reset: force white bg + dark text on everything ── */
          html, body, #root, div, section, article, aside, main,
          p, span, h1, h2, h3, h4, h5, h6,
          ul, ol, li, table, thead, tbody, tr, th, td,
          a, strong, em, small, label {
            background: white !important;
            background-image: none !important;
            background-color: white !important;
            color: #111 !important;
            -webkit-text-fill-color: #111 !important;
            box-shadow: none !important;
            text-shadow: none !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }

          /* ── Card sections: visible border instead of dark bg ── */
          .pc {
            background: white !important;
            border: 1px solid #bbb !important;
            border-radius: 6px !important;
            padding: 16px !important;
            margin-bottom: 16px !important;
            break-inside: avoid;
            page-break-inside: avoid;
          }

          /* Hide nav, footer, buttons, decorative blobs */
          nav,
          footer,
          button,
          .animate-pulse,
          .blur-3xl {
            display: none !important;
          }

          /* Show print-only elements */
          .print-header,
          .print-footer {
            display: block !important;
          }

          .print-header {
            text-align: center;
            margin-bottom: 1.5rem;
            padding-bottom: 0.75rem;
            border-bottom: 2px solid #0e7490 !important;
          }
          .print-header h1 {
            font-size: 1.3rem !important;
            font-weight: 700 !important;
            color: #0e7490 !important;
            -webkit-text-fill-color: #0e7490 !important;
          }
          .print-header p {
            font-size: 0.72rem !important;
            color: #555 !important;
            -webkit-text-fill-color: #555 !important;
          }

          .print-footer {
            text-align: center;
            margin-top: 2rem;
            padding-top: 0.75rem;
            border-top: 1px solid #ccc !important;
            font-size: 0.7rem !important;
          }

          /* Remove top padding left by fixed nav */
          section:first-of-type {
            padding-top: 0.5rem !important;
          }

          /* Section h2 headings: teal */
          h2 {
            color: #0e7490 !important;
            -webkit-text-fill-color: #0e7490 !important;
            page-break-after: avoid;
            break-after: avoid;
          }

          /* FAQ question headings */
          h3 {
            color: #0e7490 !important;
            -webkit-text-fill-color: #0e7490 !important;
          }

          /* Numbered vector labels */
          span.text-3xl {
            color: #0e7490 !important;
            -webkit-text-fill-color: #0e7490 !important;
          }

          /* Tables */
          table {
            width: 100% !important;
            border-collapse: collapse !important;
            font-size: 0.78rem !important;
          }
          th {
            color: #0e7490 !important;
            -webkit-text-fill-color: #0e7490 !important;
            border-bottom: 2px solid #0e7490 !important;
            padding: 6px 8px !important;
            text-align: left !important;
          }
          td {
            border-bottom: 1px solid #ddd !important;
            padding: 6px 8px !important;
          }
          tr:last-child td { border-bottom: none !important; }
          tr { break-inside: avoid; page-break-inside: avoid; }

          /* Risk colour overrides in tables */
          .text-green-400  { color: #166534 !important; -webkit-text-fill-color: #166534 !important; }
          .text-yellow-400 { color: #92400e !important; -webkit-text-fill-color: #92400e !important; }
          .text-orange-400 { color: #9a3412 !important; -webkit-text-fill-color: #9a3412 !important; }
          .text-red-400    { color: #991b1b !important; -webkit-text-fill-color: #991b1b !important; }
          .text-amber-400  { color: #92400e !important; -webkit-text-fill-color: #92400e !important; }

          /* Links */
          a {
            color: #0e7490 !important;
            -webkit-text-fill-color: #0e7490 !important;
            text-decoration: underline !important;
          }

          /* Hide gradient CTA anchor-buttons */
          a[class*="from-cyan"],
          a[class*="bg-gradient"] {
            display: none !important;
          }

          /* SVG icons */
          svg { color: #0e7490 !important; stroke: #0e7490 !important; }
        }
      `}</style>

    </div>
  );
}
