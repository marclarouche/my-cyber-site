import React, { useState, useEffect } from 'react';
import { Database, ArrowLeft, Shield, AlertTriangle, CheckCircle, Lock, Mail, Key, Eye, CreditCard, Smartphone, ExternalLink } from 'lucide-react';

export default function AboutBreachLookup() {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleClearAll = () => {
    setCheckedItems({});
    alert('All checklist items cleared.');
  };

  // Handle keyboard shortcut (Ctrl+Shift+C or Cmd+Shift+C)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === 'KeyC') {
        handleClearAll();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenHIBP = () => {
    window.open('https://haveibeenpwned.com/', '_blank', 'noopener,noreferrer');
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
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
              Breach Response Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Interactive Checklist
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Found on Have I Been Pwned — What To Do
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            Work through this prioritized checklist to secure your accounts and reduce risk after a data breach.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Privacy Notice */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
              <p className="text-slate-300">
                This checklist runs entirely in your browser. No data is sent anywhere.
              </p>
            </div>
          </div>

          {/* 1) Confirm what was exposed */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              1) Confirm what was exposed
            </h2>
            <div className="space-y-4">
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['breach-source'] || false}
                  onChange={() => handleCheckboxChange('breach-source')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  Note the breached service and the breach date, not the date you discovered it.
                </span>
              </label>
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['data-types'] || false}
                  onChange={() => handleCheckboxChange('data-types')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  Check which data types were leaked, for example email, password hashes, names, addresses, phone numbers, DOB, MFA info.
                </span>
              </label>
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['reuse-audit'] || false}
                  onChange={() => handleCheckboxChange('reuse-audit')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  List any other accounts where you reused the same or similar password.
                </span>
              </label>
            </div>
            <div className="mt-6 bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-sm rounded-xl border border-yellow-500/30 p-4">
              <p className="text-sm text-slate-300">
                <AlertTriangle className="w-4 h-4 text-yellow-400 inline mr-2" />
                Password reuse is the number one risk. Attackers try the same credentials on many sites.
              </p>
            </div>
          </div>

          {/* 2) Fix the affected account first */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              2) Fix the affected account first
            </h2>
            <div className="space-y-4">
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['change-password'] || false}
                  onChange={() => handleCheckboxChange('change-password')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  Change the password immediately. Use a unique, long passphrase that you have never used elsewhere.
                </span>
              </label>
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['mfa-on'] || false}
                  onChange={() => handleCheckboxChange('mfa-on')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  Turn on multi-factor authentication. Prefer an authenticator app or hardware security key over SMS.
                </span>
              </label>
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['signout-sessions'] || false}
                  onChange={() => handleCheckboxChange('signout-sessions')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  Sign out of all other sessions and browsers from the account's security page.
                </span>
              </label>
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['app-passwords'] || false}
                  onChange={() => handleCheckboxChange('app-passwords')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  Revoke application passwords, API keys, and third-party app access that you no longer need.
                </span>
              </label>
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['recovery-review'] || false}
                  onChange={() => handleCheckboxChange('recovery-review')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  Review recovery email, phone, and security questions. Remove outdated options and set answers that are not guessable.
                </span>
              </label>
            </div>
          </div>

          {/* 3) Stop the ripple effect from password reuse */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              3) Stop the ripple effect from password reuse
            </h2>
            <div className="space-y-4">
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['manager'] || false}
                  onChange={() => handleCheckboxChange('manager')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  Adopt a password manager and store a unique password for every account.
                </span>
              </label>
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['reuse-hunt'] || false}
                  onChange={() => handleCheckboxChange('reuse-hunt')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  Identify other accounts that reused the same password and change those next, starting with email, banking, payroll, and social media.
                </span>
              </label>
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['aliases'] || false}
                  onChange={() => handleCheckboxChange('aliases')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  Consider using email aliases or plus-addressing for future signups to identify which service leaked your address.
                </span>
              </label>
            </div>
          </div>

          {/* 4) Prioritize your email account */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              4) Prioritize your email account
            </h2>
            <div className="space-y-4">
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['email-mfa'] || false}
                  onChange={() => handleCheckboxChange('email-mfa')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  Enable MFA on your main email and set a unique passphrase.
                </span>
              </label>
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['email-forwarding'] || false}
                  onChange={() => handleCheckboxChange('email-forwarding')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  Check for unauthorized forwarding rules and inbox filters that auto-delete or forward messages.
                </span>
              </label>
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['email-tokens'] || false}
                  onChange={() => handleCheckboxChange('email-tokens')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  Review connected apps and OAuth tokens. Remove anything you do not recognize.
                </span>
              </label>
            </div>
          </div>

          {/* 5) Monitor for fraud and phishing */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              5) Monitor for fraud and phishing
            </h2>
            <div className="space-y-4">
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['phish-training'] || false}
                  onChange={() => handleCheckboxChange('phish-training')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  Be skeptical of urgent messages about account recovery or payment issues. Navigate to sites manually rather than using links.
                </span>
              </label>
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['alerts'] || false}
                  onChange={() => handleCheckboxChange('alerts')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  Turn on security alerts for logins, password changes, and new devices where available.
                </span>
              </label>
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['finance-monitor'] || false}
                  onChange={() => handleCheckboxChange('finance-monitor')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  Watch bank and card statements. Set up transaction alerts through your bank.
                </span>
              </label>
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['hibp-notify'] || false}
                  onChange={() => handleCheckboxChange('hibp-notify')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  Subscribe to breach notifications from Have I Been Pwned for ongoing monitoring.
                </span>
              </label>
            </div>
          </div>

          {/* 6) Add optional financial protections */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              6) Add optional financial protections
            </h2>
            <div className="space-y-4 mb-6">
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['fraud-alert'] || false}
                  onChange={() => handleCheckboxChange('fraud-alert')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  Place a fraud alert with a credit bureau if you suspect identity abuse.
                </span>
              </label>
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['credit-freeze'] || false}
                  onChange={() => handleCheckboxChange('credit-freeze')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  Consider a credit freeze to stop new credit being opened in your name. Unfreeze temporarily when needed.
                </span>
              </label>
            </div>

            <div className="overflow-x-auto mb-4">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="pb-3 pr-4 text-cyan-400 font-semibold">Bureau</th>
                    <th className="pb-3 text-cyan-400 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800">
                    <td className="py-3 pr-4">Experian</td>
                    <td className="py-3">Fraud alert or credit freeze</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 pr-4">Equifax</td>
                    <td className="py-3">Fraud alert or credit freeze</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">TransUnion</td>
                    <td className="py-3">Fraud alert or credit freeze</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-4">
              <p className="text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-cyan-400 inline mr-2" />
                Check your country's consumer protection site for local equivalents if you are outside the United States.
              </p>
            </div>
          </div>

          {/* 7) Device and network hygiene */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              7) Device and network hygiene
            </h2>
            <div className="space-y-4">
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['updates'] || false}
                  onChange={() => handleCheckboxChange('updates')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  Update your devices and browsers, then reboot to apply patches.
                </span>
              </label>
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['malware-scan'] || false}
                  onChange={() => handleCheckboxChange('malware-scan')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  Run a reputable malware scan if you suspect compromise.
                </span>
              </label>
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['sim-swap'] || false}
                  onChange={() => handleCheckboxChange('sim-swap')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  Ask your mobile carrier about a SIM-swap lock or account PIN.
                </span>
              </label>
            </div>
          </div>

          {/* 8) Special situations */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              8) Special situations
            </h2>
            <div className="space-y-4">
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['work-report'] || false}
                  onChange={() => handleCheckboxChange('work-report')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  If this involves a work account, notify your employer or security team and follow internal policy.
                </span>
              </label>
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['gov-ids'] || false}
                  onChange={() => handleCheckboxChange('gov-ids')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  If government ID numbers were exposed, check your government's guidance for added protections and monitoring.
                </span>
              </label>
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['children'] || false}
                  onChange={() => handleCheckboxChange('children')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  If a child's account is affected, change credentials, enable MFA, and monitor for identity misuse.
                </span>
              </label>
            </div>
          </div>

          {/* 9) Prevention going forward */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              9) Prevention going forward
            </h2>
            <div className="space-y-4">
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['unique-everywhere'] || false}
                  onChange={() => handleCheckboxChange('unique-everywhere')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  Keep passwords unique everywhere and let your manager suggest strong ones.
                </span>
              </label>
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['keys'] || false}
                  onChange={() => handleCheckboxChange('keys')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  Consider hardware security keys for important accounts such as email, banking, domain registrars, and cloud consoles.
                </span>
              </label>
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems['backup-codes'] || false}
                  onChange={() => handleCheckboxChange('backup-codes')}
                  className="mt-1 mr-3 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-slate-200">
                  Store MFA backup codes securely and keep an up-to-date account recovery plan.
                </span>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenHIBP}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <Database className="w-5 h-5" />
              <span>Open Have I Been Pwned</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print</span>
            </button>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer and Important Notice:</strong> © CyberLife Coach Tools — Informational only. Use responsibly and in accordance with the law.
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
            <p>&copy; {new Date().getFullYear()} CyberLife Coach Tools</p>
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
