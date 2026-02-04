import React, { useState, useEffect, useRef } from 'react';
import { Globe, ArrowLeft, RefreshCw, Copy, Printer, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export default function WhatIsMyIP() {
  const [ipInfo, setIpInfo] = useState({
    ip: '203.0.113.42',
    location: 'Example City, EX',
    isp: 'Example ISP',
    connectionType: 'Demo',
    securityStatus: 'Offline demo (local only)',
    protocol: 'IPv4',
    responseTime: '—',
    proxyStatus: '—',
    vpnStatus: '—'
  });
  
  const [status, setStatus] = useState({ type: 'ok', message: 'Offline demo mode (no network calls)' });
  const [isLoading, setIsLoading] = useState(false);
  const [privacyGuard, setPrivacyGuard] = useState(false);
  const [provider, setProvider] = useState('offline');
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [notification, setNotification] = useState('');
  const [liveApproved, setLiveApproved] = useState(false);
  
  const retryTimerRef = useRef(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const updateStatus = (type, message) => {
    setStatus({ type, message });
  };

  const scheduleRetry = (label = 'Re-trying after network change…') => {
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
    }
    updateStatus('', label);
    retryTimerRef.current = setTimeout(() => runLookup(), 1500);
  };

  // Helper functions
  const bust = (url) => {
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}_=${Date.now()}`;
  };

  const timeoutFetch = (url, opts, ms) => {
    return Promise.race([
      fetch(url, opts),
      new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))
    ]);
  };

  const getPublicIP = async (prov) => {
    if (prov === 'cloudflare') return await getCloudflareIP();
    return await getIpifyIP();
  };

  const getCloudflareIP = async () => {
    const res = await timeoutFetch(bust('https://www.cloudflare.com/cdn-cgi/trace'), {
      method: 'GET',
      cache: 'no-store',
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
      mode: 'cors'
    }, 7000);
    if (!res.ok) throw new Error(`cloudflare ${res.status}`);
    const txt = await res.text();
    const line = txt.split('\n').find(l => l.startsWith('ip='));
    const ip = line ? line.split('=')[1].trim() : '';
    if (!ip) throw new Error('No IP in trace');
    return { ip, protocol: ip.includes(':') ? 'IPv6' : 'IPv4', source: 'cloudflare' };
  };

  const getIpifyIP = async () => {
    const opts = {
      method: 'GET',
      cache: 'no-store',
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
      mode: 'cors',
      headers: { 'Accept': 'application/json' }
    };
    const endpoints = [
      'https://api64.ipify.org?format=json',
      'https://api.ipify.org?format=json'
    ];
    let lastErr;
    for (const ep of endpoints) {
      try {
        const res = await timeoutFetch(bust(ep), opts, 7000);
        if (!res.ok) throw new Error(`ipify ${res.status}`);
        const data = await res.json();
        const ip = data.ip || '';
        if (!ip) throw new Error('Empty IP');
        return { ip, protocol: ip.includes(':') ? 'IPv6' : 'IPv4', source: 'ipify' };
      } catch (e) {
        lastErr = e;
      }
    }
    throw lastErr || new Error('IP lookup failed');
  };

  const getGeoISP = async () => {
    const opts = {
      method: 'GET',
      cache: 'no-store',
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
      mode: 'cors',
      headers: { 'Accept': 'application/json' }
    };

    try {
      const res1 = await timeoutFetch(bust('https://ipapi.co/json/'), opts, 7000);
      if (res1.ok) {
        const d = await res1.json();
        const city = [d.city, d.region, d.country_name].filter(Boolean).join(', ');
        const org = d.org || d.org_name || d.asn || 'Unknown';
        return { location: city || 'Unknown', isp: org, connection: d.version || '—' };
      }
    } catch (err) {
      console.error('ipapi lookup failed:', err);
    }

    const res2 = await timeoutFetch(bust('https://ipwho.is/'), opts, 7000);
    const j = await res2.json();
    const city = [j.city, j.region, j.country].filter(Boolean).join(', ');
    const org = j.connection?.org || j.connection?.isp || 'Unknown';
    const version = (j.success && (j.ip || '').includes(':')) ? 'IPv6' : 'IPv4';
    return { location: city || 'Unknown', isp: org, connection: version };
  };

  const offlineDemo = () => {
    return {
      ip: '203.0.113.42',
      protocol: 'IPv4',
      location: 'Example City, EX',
      isp: 'Example ISP',
      connectionType: 'Demo',
      securityStatus: 'Offline demo (local only)',
      responseTime: '—',
      proxyStatus: '—',
      vpnStatus: '—'
    };
  };

  const fillOffline = () => {
    const demo = offlineDemo();
    setIpInfo(demo);
    updateStatus('ok', 'Offline demo mode (no network calls)');
  };

  const runLookup = async () => {
    if (!liveApproved || provider === 'offline') {
      setIsLoading(false);
      fillOffline();
      return;
    }

    setIsLoading(true);
    updateStatus('', 'Contacting provider securely…');

    const t0 = performance.now();
    try {
      const [ipRes, metaRes] = await Promise.all([getPublicIP(provider), getGeoISP()]);
      const t1 = performance.now();

      const maybeVPN = /vpn|hosting|cloud|proxy|colo/i.test(String(metaRes.isp));

      setIpInfo({
        ip: ipRes.ip || 'Unavailable',
        protocol: ipRes.protocol || '—',
        responseTime: `${Math.max(1, Math.round(t1 - t0))} ms`,
        location: metaRes.location || 'Unknown',
        isp: metaRes.isp || 'Unknown',
        connectionType: metaRes.connection || (ipRes.protocol || '—'),
        proxyStatus: maybeVPN ? 'Possible' : 'Not detected',
        vpnStatus: maybeVPN ? 'Possible' : 'Not detected',
        securityStatus: (ipRes.source === 'cloudflare')
          ? 'Retrieved via Cloudflare Trace with minimal requests.'
          : 'Minimal requests via ipify; consider a VPN for additional privacy.'
      });

      let statusText;
      if (ipRes.source === 'cloudflare') {
        statusText = maybeVPN ? 'Cloudflare Trace ok. Connection may be VPN/Proxy.' : 'Cloudflare Trace ok.';
      } else {
        statusText = maybeVPN ? 'ipify ok. Connection may be VPN/Proxy.' : 'ipify ok.';
      }
      updateStatus(maybeVPN ? 'warn' : 'ok', statusText);
    } catch (e) {
      console.error(e);
      setIpInfo({
        ip: 'Unavailable',
        protocol: '—',
        location: 'Unavailable',
        isp: 'Unavailable',
        connectionType: '—',
        responseTime: '—',
        proxyStatus: '—',
        vpnStatus: '—',
        securityStatus: 'Lookup failed'
      });
      updateStatus('bad', 'Lookup failed. Try Refresh, switch provider, or go Offline.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrivacyGuardChange = () => {
    if (!privacyGuard) {
      setShowModal(true);
    } else {
      setLiveApproved(false);
      setProvider('offline');
      setPrivacyGuard(false);
      runLookup();
    }
  };

  const enableLive = () => {
    setLiveApproved(true);
    setPrivacyGuard(true);
    if (provider === 'offline') setProvider('ipify');
    setShowModal(false);
    runLookup();
  };

  const keepOffline = () => {
    setLiveApproved(false);
    setPrivacyGuard(false);
    setProvider('offline');
    setShowModal(false);
    runLookup();
  };

  const handleProviderChange = (newProvider) => {
    if (!liveApproved && newProvider !== 'offline') {
      setProvider('offline');
      setPrivacyGuard(false);
      setShowModal(true);
      return;
    }
    setProvider(newProvider);
    if (liveApproved) runLookup();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ipInfo.ip.trim());
      showNotification('IP address copied to clipboard');
    } catch (e) {
      showNotification('Copy failed');
      console.error('Clipboard copy failed:', e);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    fillOffline();

    // Network event listeners
    const handleOnline = () => scheduleRetry('Connection restored. Re-trying…');
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        scheduleRetry('Re-checking after returning to tab…');
      }
    };

    window.addEventListener('online', handleOnline);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const navConn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (navConn && 'onchange' in navConn) {
      navConn.addEventListener('change', () => scheduleRetry('Network changed. Re-trying…'));
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
      }
    };
  }, []);

  const getStatusIcon = () => {
    if (status.type === 'ok') return <CheckCircle className="w-5 h-5 text-green-400" />;
    if (status.type === 'warn') return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
    if (status.type === 'bad') return <AlertTriangle className="w-5 h-5 text-red-400" />;
    return null;
  };

  const getStatusColor = () => {
    if (status.type === 'ok') return 'text-green-400';
    if (status.type === 'warn') return 'text-yellow-400';
    if (status.type === 'bad') return 'text-red-400';
    return 'text-slate-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
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
        
        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <Globe className="w-12 h-12 text-cyan-400" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                What's My IP Address?
              </h1>
              <p className="text-slate-400 mt-2">Discover your public IP and basic network information. This page starts in <strong>Offline Demo</strong> mode for privacy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto px-4 pb-20">
        {/* Controls Section */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6 mb-6">
          <div className="space-y-6">
            {/* Privacy Guard and Provider */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacyGuard}
                    onChange={handlePrivacyGuardChange}
                    className="w-5 h-5 rounded border-slate-600 bg-slate-950 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
                  />
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm font-semibold">Privacy Guard</span>
                  </div>
                </label>
                <p className="text-xs text-slate-400 mt-2 ml-8">
                  Enable to allow live lookups. Otherwise the page stays offline.
                </p>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Provider:</label>
                <select
                  value={provider}
                  onChange={(e) => handleProviderChange(e.target.value)}
                  disabled={!privacyGuard}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="offline">Offline Demo (no network)</option>
                  <option value="ipify">ipify + geo (live)</option>
                  <option value="cloudflare">Cloudflare Trace + geo (live)</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 no-print">
              <button
                onClick={runLookup}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Refresh</span>
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
              >
                <Copy className="w-5 h-5" />
                <span>Copy IP</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
              >
                <Printer className="w-5 h-5" />
                <span>Print</span>
              </button>
            </div>
          </div>
        </section>

        {/* IP Information Section */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6 text-cyan-400">Your Public IP Information</h2>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-slate-400">Gathering network information…</p>
            </div>
          ) : (
            <>
              {/* IP Display */}
              <div className="bg-slate-950 rounded-xl p-6 mb-6 border border-slate-700">
                <div className="text-center">
                  <div className="text-sm text-slate-400 mb-2">Your Public IP Address</div>
                  <div className="text-4xl font-bold text-cyan-400 mb-4 font-mono">{ipInfo.ip}</div>
                  
                  <div className={`flex items-center justify-center space-x-2 ${getStatusColor()}`}>
                    {getStatusIcon()}
                    <span className="text-sm">{status.message}</span>
                  </div>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-950 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-2">Location</h3>
                  <p className="text-slate-300">{ipInfo.location}</p>
                </div>
                
                <div className="bg-slate-950 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-2">ISP / Org</h3>
                  <p className="text-slate-300">{ipInfo.isp}</p>
                </div>
                
                <div className="bg-slate-950 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-2">Connection</h3>
                  <p className="text-slate-300">{ipInfo.connectionType}</p>
                </div>
                
                <div className="bg-slate-950 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-2">Security Status</h3>
                  <p className="text-slate-300">{ipInfo.securityStatus}</p>
                </div>
              </div>
            </>
          )}
        </section>

        {/* Technical Details Section */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-cyan-400">Technical Details</h2>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>

          {showDetails && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-950 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Protocol</h3>
                <p className="text-slate-300">{ipInfo.protocol}</p>
              </div>
              
              <div className="bg-slate-950 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Response Time</h3>
                <p className="text-slate-300">{ipInfo.responseTime}</p>
              </div>
              
              <div className="bg-slate-950 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Proxy Detection</h3>
                <p className="text-slate-300">{ipInfo.proxyStatus}</p>
              </div>
              
              <div className="bg-slate-950 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">VPN Detection</h3>
                <p className="text-slate-300">{ipInfo.vpnStatus}</p>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Legal Disclaimer */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-6">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Legal Disclaimer:</strong> Enabling live lookups sends requests to the selected provider and shares your public IP for lookup.
            Results are provided "as-is" with no warranties. Use of this tool is your responsibility and must comply with applicable laws and policies.
          </p>
        </div>

        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-12">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Data Privacy:</strong> This application runs as a fully client-side web tool. In offline mode, no network requests are made. 
            When live lookups are enabled, minimal requests are sent to the selected provider (ipify or Cloudflare) and geolocation services to retrieve your IP and location data. 
            No data is stored or transmitted elsewhere.
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

      {/* Privacy Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">Enable Live Lookups?</h3>
            <p className="text-slate-400 mb-4">
              This will contact the selected provider and share your public IP to retrieve network information.
            </p>
            <p className="text-slate-400 mb-6">
              Your current mode is Offline Demo. You can switch back at any time.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 no-print">
              <button
                onClick={enableLive}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
              >
                Enable Live Lookups
              </button>
              <button
                onClick={keepOffline}
                className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
              >
                Keep Offline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg shadow-cyan-500/50 animate-fade-in z-50">
          {notification}
        </div>
      )}

      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
