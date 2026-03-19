import React from 'react';
import { ShieldAlert, ArrowLeft, Shield, Lock, AlertTriangle, CheckCircle, XCircle, Phone } from 'lucide-react';

export default function AboutGovernmentImpersonationScamDetector() {
  const handleOpenTool = () => {
    window.location.href = '/tools/government-impersonation-scam-detector';
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">

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
            <a href="/tools" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tools Hub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
              Scam Awareness Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Consumer Safety
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Government Impersonation Scams
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            A practical reference for recognising, responding to, and reporting scam calls, texts, and emails that impersonate federal agencies
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">

          {/* Lead */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-8 mb-8">
            <p className="text-slate-300 text-lg leading-relaxed">
              Government impersonation scams are consistently ranked among the top fraud types reported to the FTC. Scammers pretend to be the IRS, Social Security Administration, FBI, Medicare, and other agencies to create panic and extract money or personal information. Knowing what real agencies actually do — and never do — is the most effective defence.
            </p>
          </div>

          {/* What is a government impersonation scam? */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              What Is a Government Impersonation Scam?
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              A government impersonation scam occurs when a fraudster contacts you by phone, text, or email while pretending to represent a federal or state agency. Their goal is to either steal money directly — typically via gift cards, wire transfer, or cryptocurrency — or to steal your identity by extracting your Social Security number, bank account details, or other sensitive information.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              What makes these scams effective is the combination of authority and fear. The caller sounds official, uses agency names and fake badge numbers, and creates a sense of immediate danger — an arrest warrant, a suspended Social Security number, a seized package. The panic this creates short-circuits normal judgement.
            </p>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-amber-300 mb-2">Scale of the problem</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    The FTC reports that government impersonation scams cost Americans hundreds of millions of dollars annually. The Social Security Administration alone receives over 500,000 scam reports per year. Seniors are disproportionately targeted but people of all ages and backgrounds are victimised.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* The agencies most commonly impersonated */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Agencies Most Commonly Impersonated
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Each agency has specific rules about how it operates. Scammers rely on you not knowing those rules. The table below summarises what each real agency will and will never do.
            </p>

            <div className="space-y-5">

              {/* IRS */}
              <div className="border border-slate-700 rounded-xl overflow-hidden">
                <div className="bg-slate-800/60 px-5 py-3 flex items-center gap-3">
                  <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="font-bold text-white">IRS — Internal Revenue Service</span>
                  <span className="ml-auto font-mono text-xs text-cyan-400">1-800-829-1040 · irs.gov</span>
                </div>
                <div className="px-5 py-4">
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /><span>Never calls you first — all legitimate IRS contact begins with a mailed letter</span></li>
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /><span>Never demands immediate payment without allowing you to question or appeal</span></li>
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /><span>Never requires gift cards, wire transfers, or cryptocurrency as payment</span></li>
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /><span>Never threatens to send police or immigration agents for non-payment over the phone</span></li>
                  </ul>
                </div>
              </div>

              {/* SSA */}
              <div className="border border-slate-700 rounded-xl overflow-hidden">
                <div className="bg-slate-800/60 px-5 py-3 flex items-center gap-3">
                  <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="font-bold text-white">SSA — Social Security Administration</span>
                  <span className="ml-auto font-mono text-xs text-cyan-400">1-800-772-1213 · ssa.gov</span>
                </div>
                <div className="px-5 py-4">
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /><span>Cannot suspend or cancel your Social Security number — this is simply not possible</span></li>
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /><span>Never threatens arrest for failing to confirm your SSN over the phone</span></li>
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /><span>Never asks you to verify your SSN by calling a number they provide in the same call</span></li>
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /><span>Never demands payment via gift cards or cryptocurrency to restore benefits</span></li>
                  </ul>
                </div>
              </div>

              {/* FBI/DEA */}
              <div className="border border-slate-700 rounded-xl overflow-hidden">
                <div className="bg-slate-800/60 px-5 py-3 flex items-center gap-3">
                  <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="font-bold text-white">FBI / DEA / Federal Law Enforcement</span>
                  <span className="ml-auto font-mono text-xs text-cyan-400">tips.fbi.gov · ic3.gov</span>
                </div>
                <div className="px-5 py-4">
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /><span>Never calls to offer immunity or warn you of an investigation in exchange for money</span></li>
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /><span>Never demands payment to avoid arrest — agents make arrests, they do not negotiate fees by phone</span></li>
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /><span>Never conducts official financial business or transactions over the phone</span></li>
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /><span>Never asks you to keep the call secret from family members or your attorney</span></li>
                  </ul>
                </div>
              </div>

              {/* Medicare */}
              <div className="border border-slate-700 rounded-xl overflow-hidden">
                <div className="bg-slate-800/60 px-5 py-3 flex items-center gap-3">
                  <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="font-bold text-white">Medicare / Medicaid</span>
                  <span className="ml-auto font-mono text-xs text-cyan-400">1-800-633-4227 · medicare.gov</span>
                </div>
                <div className="px-5 py-4">
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /><span>Never calls to ask for your Medicare number to send a replacement card — they already have it</span></li>
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /><span>Never offers free equipment in exchange for your Medicare or Social Security number</span></li>
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /><span>Never asks you to pay a fee to keep your coverage active</span></li>
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /><span>Never threatens to cancel coverage unless you provide payment immediately by phone</span></li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          {/* The four categories of red flags */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              The Four Categories of Red Flags
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Every government impersonation scam contains signals that reveal it as fraudulent. The detector tool scores input across four categories, each weighted by how reliably it predicts a scam.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-4 p-5 rounded-xl border border-red-500/20 bg-red-900/10">
                <div className="w-10 h-10 rounded-full bg-red-900/40 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Pressure tactics</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Arrest threats, urgent deadlines, being told not to hang up, and demands for secrecy. These are designed to prevent you from thinking clearly or consulting anyone. Real government agencies do not operate under artificial time pressure and will never tell you not to speak to a lawyer or family member.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 rounded-xl border border-orange-500/20 bg-orange-900/10">
                <div className="w-10 h-10 rounded-full bg-orange-900/40 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Payment red flags — the strongest signal of all</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Gift cards carry the highest weight in the scoring system because no legitimate government agency anywhere in the world accepts gift cards as payment — ever. The same applies to wire transfers, cryptocurrency, and prepaid debit cards. The moment any of these payment methods is requested, the interaction is a scam regardless of how official the caller sounds.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 rounded-xl border border-purple-500/20 bg-purple-900/10">
                <div className="w-10 h-10 rounded-full bg-purple-900/40 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Identity signals</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Unsolicited requests for your Social Security number, bank account details, or date of birth. Also includes spoofed caller IDs — technology makes it trivial for scammers to make calls appear to come from a legitimate government phone number. Seeing a real IRS or SSA number on your caller ID does not confirm the caller is legitimate.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 rounded-xl border border-amber-500/20 bg-amber-900/10">
                <div className="w-10 h-10 rounded-full bg-amber-900/40 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Procedure violations</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Contact that violates how the agency actually operates — the IRS calling without sending a letter first, a Social Security number being described as "suspended," a package containing drugs with your name on it at customs, or an offer to make a legal problem disappear in exchange for payment. Each of these directly contradicts documented agency procedures.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-blue-300 mb-2">How the verdict is calculated</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    The tool assigns a weight to each red flag based on how reliably it indicates fraud. A single gift card request scores 20 points alone — enough for a probable scam verdict without any other signals. Combining that with an arrest threat and a request for your SSN pushes the score into almost certain scam territory. The four verdicts are: No red flags detected, Suspicious — verify first, Probable scam, and Almost certain scam.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What to do when you receive a suspicious contact */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              What to Do When It Happens
            </h2>
            <ol className="space-y-5 mb-6">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">1.</span>
                <div>
                  <strong className="text-slate-200">Hang up immediately.</strong>
                  <span className="text-slate-400"> You are never obligated to stay on the line. No real government agency will penalise you for ending a call. If it is a genuine agency, they will contact you again by mail.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">2.</span>
                <div>
                  <strong className="text-slate-200">Do not pay anything.</strong>
                  <span className="text-slate-400"> No gift cards, no wire transfers, no cryptocurrency, no prepaid debit cards. If you have already paid, contact your bank or the payment provider immediately — some funds can still be recovered.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">3.</span>
                <div>
                  <strong className="text-slate-200">Do not call back the number they gave you.</strong>
                  <span className="text-slate-400"> Look up the agency's official number independently on their .gov website. The callback number a scammer provides will connect you back to them, not to the real agency.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">4.</span>
                <div>
                  <strong className="text-slate-200">Verify with the real agency.</strong>
                  <span className="text-slate-400"> Call the official number from the agency's .gov website. Ask if there is genuinely any issue with your account. In the vast majority of cases there will be nothing — the whole premise was fabricated.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">5.</span>
                <div>
                  <strong className="text-slate-200">Tell someone you trust.</strong>
                  <span className="text-slate-400"> Scammers depend on isolation. Telling a family member or friend immediately breaks that dynamic and helps protect others — most people who share what happened discover someone they know has received the same call.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-4 font-bold text-xl flex-shrink-0">6.</span>
                <div>
                  <strong className="text-slate-200">Report it.</strong>
                  <span className="text-slate-400"> Report to the FTC at reportfraud.ftc.gov and to the relevant agency's Inspector General. Every report contributes to enforcement action and helps protect the next potential victim.</span>
                </div>
              </li>
            </ol>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6">
              <div className="flex items-start space-x-3">
                <Lock className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-blue-300 mb-2">If you already paid</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Contact your bank immediately if you wired money or provided account details. For gift cards, call the card issuer's fraud line — numbers are on the back of the card — and explain you were scammed. For cryptocurrency, contact the exchange you used. Speed matters: the sooner you act, the better the chance of recovery.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Who is most at risk */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Who Is Most at Risk — and Why
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Government impersonation scams are not limited to any demographic, but certain groups are disproportionately targeted because scammers adjust their approach based on vulnerability.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Group</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Why scammers target them</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400">
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">Seniors (65+)</td>
                    <td className="py-3 px-4">More likely to be home, more trusting of authority figures, and may have accumulated savings</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">Non-native English speakers</td>
                    <td className="py-3 px-4">Less familiar with how U.S. agencies actually operate and may fear immigration consequences</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">People with unpaid taxes or debts</td>
                    <td className="py-3 px-4">A real underlying concern makes the threat feel plausible, even when the caller is fraudulent</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">Small business owners</td>
                    <td className="py-3 px-4">Targeted with tax fraud claims, business licence threats, and fake regulatory violations</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4">Anyone in a stressful period</td>
                    <td className="py-3 px-4">Stress reduces critical thinking and makes urgent demands harder to resist</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-blue-300 mb-2">The single most effective protection</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Simply knowing that no government agency will ever ask for gift cards, wire transfers, or cryptocurrency as payment eliminates the vast majority of financial losses from these scams. Share that one fact with every person in your life.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Real agency contact numbers */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Official Contact Numbers — Reference Card
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Keep these numbers saved. Always use these to verify — never use a number provided by the caller.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Agency</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Official phone</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Official website</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Report fraud to</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400">
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-semibold text-slate-300">IRS</td>
                    <td className="py-3 px-4 font-mono text-cyan-300">1-800-829-1040</td>
                    <td className="py-3 px-4">irs.gov</td>
                    <td className="py-3 px-4">tigta.gov/hotline</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-semibold text-slate-300">SSA</td>
                    <td className="py-3 px-4 font-mono text-cyan-300">1-800-772-1213</td>
                    <td className="py-3 px-4">ssa.gov</td>
                    <td className="py-3 px-4">oig.ssa.gov/report</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-semibold text-slate-300">FBI</td>
                    <td className="py-3 px-4 font-mono text-cyan-300">tips.fbi.gov</td>
                    <td className="py-3 px-4">fbi.gov</td>
                    <td className="py-3 px-4">ic3.gov</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-semibold text-slate-300">CBP / ICE</td>
                    <td className="py-3 px-4 font-mono text-cyan-300">1-877-227-5511</td>
                    <td className="py-3 px-4">cbp.gov</td>
                    <td className="py-3 px-4">reportfraud.ftc.gov</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-semibold text-slate-300">Medicare</td>
                    <td className="py-3 px-4 font-mono text-cyan-300">1-800-633-4227</td>
                    <td className="py-3 px-4">medicare.gov</td>
                    <td className="py-3 px-4">oig.hhs.gov/fraud</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-semibold text-slate-300">FTC (all scams)</td>
                    <td className="py-3 px-4 font-mono text-cyan-300">1-877-382-4357</td>
                    <td className="py-3 px-4">ftc.gov</td>
                    <td className="py-3 px-4">reportfraud.ftc.gov</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-500 italic">
              Print this table and keep it near your phone. It takes seconds to verify a call — and it can save thousands of dollars.
            </p>
          </div>

          {/* Print-Friendly Notes */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Print-Friendly Notes
            </h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3">•</span>
                <span>This guide is designed to print cleanly — use it for awareness training, family discussions, or to keep near a shared phone.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3">•</span>
                <span>The reference card above is particularly useful printed — cut it out and keep it with your phone or on your refrigerator.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3">•</span>
                <span>Share this page directly with seniors, family members, or anyone in your community who may be at elevated risk.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3">•</span>
                <span>The tool itself requires no account, no download, and no technical knowledge — it is designed to be usable by anyone.</span>
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <ShieldAlert className="w-5 h-5" />
              <span>Open the Scam Detector</span>
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
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer and Important Notice:</strong> This page and the associated tool are provided for educational and informational purposes only. Red flag detection is based on publicly available FTC and FBI scam guidance and is not a substitute for professional legal or financial advice. CyberLifeCoach and its affiliates make no warranties regarding the completeness or accuracy of scam signal detection. If you believe you are the victim of a crime, contact law enforcement directly. All rights reserved.
            </p>
          </div>

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
            <p>&copy; {new Date().getFullYear()} CyberLifeCoach</p>
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
