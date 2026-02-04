import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowLeft, Eye, EyeOff, Shield } from 'lucide-react';

export default function PasswordBreachChecker() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strengthLevel, setStrengthLevel] = useState(0);
  const [strengthText, setStrengthText] = useState('');
  const [hashPrefix, setHashPrefix] = useState('');
  const [hashSuffix, setHashSuffix] = useState('');
  const [resultTitle, setResultTitle] = useState('Result');
  const [resultText, setResultText] = useState('');
  const [breachDetails, setBreachDetails] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [notification, setNotification] = useState('');

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // SHA-1 hash function
  const sha1 = async (str) => {
    const buffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-1', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex.toUpperCase();
  };

  // Password strength calculation
  const calculateStrength = (pass) => {
    if (!pass) {
      return { level: 0, text: '', percentage: 0 };
    }

    let score = 0;
    const checks = {
      length: pass.length >= 8,
      longLength: pass.length >= 12,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      numbers: /[0-9]/.test(pass),
      special: /[^A-Za-z0-9]/.test(pass),
    };

    if (checks.length) score += 1;
    if (checks.longLength) score += 1;
    if (checks.uppercase) score += 1;
    if (checks.lowercase) score += 1;
    if (checks.numbers) score += 1;
    if (checks.special) score += 1;

    let level = 0;
    let text = '';
    let percentage = 0;

    if (score <= 2) {
      level = 1;
      text = 'Weak';
      percentage = 25;
    } else if (score <= 4) {
      level = 2;
      text = 'Fair';
      percentage = 50;
    } else if (score === 5) {
      level = 3;
      text = 'Good';
      percentage = 75;
    } else {
      level = 4;
      text = 'Strong';
      percentage = 100;
    }

    return { level, text, percentage };
  };

  // Update hash display
  useEffect(() => {
    const updateHash = async () => {
      if (password) {
        const hash = await sha1(password);
        setHashPrefix(hash.substring(0, 5));
        setHashSuffix(hash.substring(5));

        const strength = calculateStrength(password);
        setStrengthLevel(strength.level);
        setStrengthText(strength.text);
      } else {
        setHashPrefix('');
        setHashSuffix('');
        setStrengthLevel(0);
        setStrengthText('');
      }
    };

    updateHash();
  }, [password]);

  const checkBreach = async () => {
    if (!password) return;

    setIsChecking(true);
    setResultTitle('Checking...');
    setResultText('Querying breach database...');
    setBreachDetails('');

    try {
      const hash = await sha1(password);
      const prefix = hash.substring(0, 5);
      const suffix = hash.substring(5);

      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      if (!response.ok) {
        throw new Error('Failed to query breach database');
      }

      const data = await response.text();
      const lines = data.split('\n');
      let breachCount = 0;

      for (const line of lines) {
        const [hashSuffix, count] = line.split(':');
        if (hashSuffix === suffix) {
          breachCount = parseInt(count, 10);
          break;
        }
      }

      if (breachCount > 0) {
        setResultTitle('⚠️ Password Found in Breaches');
        setResultText(`This password has been seen ${breachCount.toLocaleString()} times in data breaches.`);
        setBreachDetails(
          'This password is compromised and should not be used. Choose a unique, strong password that has not appeared in breaches.'
        );
        showNotification('Password found in breach database');
      } else {
        setResultTitle('✅ Password Not Found');
        setResultText('This password has not been found in known data breaches.');
        setBreachDetails(
          'While this password does not appear in breach records, ensure it follows best practices: unique per site, strong complexity, and stored in a password manager.'
        );
        showNotification('Password not found in breaches');
      }
    } catch (error) {
      setResultTitle('❌ Error');
      setResultText('Could not complete the breach check.');
      setBreachDetails(
        'There was an error connecting to the breach database. Please check your internet connection and try again.'
      );
      showNotification('Error checking breach database');
    } finally {
      setIsChecking(false);
    }
  };

  const getStrengthColor = () => {
    switch (strengthLevel) {
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-orange-500';
      case 3:
        return 'bg-yellow-500';
      case 4:
        return 'bg-green-500';
      default:
        return 'bg-slate-700';
    }
  };

  const getStrengthWidth = () => {
    switch (strengthLevel) {
      case 1:
        return 'w-1/4';
      case 2:
        return 'w-1/2';
      case 3:
        return 'w-3/4';
      case 4:
        return 'w-full';
      default:
        return 'w-0';
    }
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-8 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <CheckCircle className="w-12 h-12 text-cyan-400" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Secure Password Breach Checker
              </h1>
              <p className="text-slate-400 mt-2">
                Check whether a password has appeared in known data breaches while keeping it on your device.
                <strong className="text-cyan-400"> Your password never leaves your browser.</strong> Only the first five characters of its SHA-1 hash
                are sent to the Have I Been Pwned range API using the k-Anonymity model.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative max-w-5xl mx-auto px-4 pb-20">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">Check a password safely</h2>

          <div className="mb-6">
            <label className="block text-sm text-slate-400 mb-2">Password to check</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type a password to evaluate"
                autoComplete="off"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 pr-12 text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
              />
            </div>
          </div>

          {/* Strength Meter */}
          {password && (
            <>
              <div className="mb-2">
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getStrengthColor()} ${getStrengthWidth()} transition-all duration-300`}
                  ></div>
                </div>
              </div>
              <div className="text-sm text-slate-400 mb-4">
                Password strength: <span className={`font-semibold ${
                  strengthLevel === 1 ? 'text-red-400' :
                  strengthLevel === 2 ? 'text-orange-400' :
                  strengthLevel === 3 ? 'text-yellow-400' :
                  strengthLevel === 4 ? 'text-green-400' : 'text-slate-400'
                }`}>{strengthText || 'Enter a password'}</span>
              </div>

              {/* Hash Visual */}
              <div className="bg-slate-950 rounded-lg p-4 mb-6 border border-slate-700">
                <div className="text-sm text-slate-400 mb-2">Hash (SHA-1):</div>
                <div className="font-mono text-xs break-all">
                  <span className="text-cyan-400 font-bold">{hashPrefix}</span>
                  <span className="text-slate-500">{hashSuffix}</span>
                </div>
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={checkBreach}
              disabled={!password || isChecking}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isChecking ? 'Checking...' : 'Check for breaches'}
            </button>
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all flex items-center space-x-2"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              <span>{showPassword ? 'Hide' : 'Show'}</span>
            </button>
          </div>

          {/* Results */}
          {resultText && (
            <div className="bg-slate-950 rounded-xl p-6 border border-slate-700 mb-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">{resultTitle}</h3>
              <p className="text-slate-300 mb-3">{resultText}</p>
              {breachDetails && (
                <p className="text-sm text-slate-400 bg-slate-900 rounded-lg p-4 border border-slate-700">
                  {breachDetails}
                </p>
              )}
            </div>
          )}

          {/* Privacy Notice */}
          <div className="bg-cyan-900/10 border border-cyan-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>How this protects your privacy</span>
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span><strong className="text-cyan-400">k-Anonymity query</strong>, only the first five characters of the hash prefix are shared.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span><strong className="text-cyan-400">Local hashing</strong>, the SHA-1 hash is calculated in your browser.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span><strong className="text-cyan-400">No full hash transmission</strong>, the complete hash and password remain on your device.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span><strong className="text-cyan-400">Transparent logic</strong>, the JavaScript file can be inspected for reassurance.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="max-w-5xl mx-auto px-4 pb-8">
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-12">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Important notice & Legal disclaimer:</strong> This Secure Password Breach Checker is a client side educational tool. All hashing takes place in your browser
            and only a partial hash prefix is sent to the Have I Been Pwned range API endpoint. Neither your full hash nor
            your plaintext password are transmitted to CyberLife Coach or stored by this page. Results are based on third
            party breach data and are provided without warranty. A password that does not appear in breach records is not
            automatically safe and should still follow modern best practices such as unique passwords per site and the use
            of a reputable password manager. Do not enter work managed or shared passwords without approval from your
            organization's security team.
          </p>
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
            <p className="text-slate-600">Analysis happens entirely in your browser. No data is sent anywhere.</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg shadow-cyan-500/50 animate-fade-in z-50">
          {notification}
        </div>
      )}
    </div>
  );
}
