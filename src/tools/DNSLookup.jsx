import React, { useState, useRef } from 'react';
import { Search, ArrowLeft, Copy, CheckCircle, AlertTriangle } from 'lucide-react';

export default function DNSLookup() {
  const [domain, setDomain] = useState('');
  const [selectedTypes, setSelectedTypes] = useState(new Set(['A', 'AAAA', 'MX', 'TXT']));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);
  const [notification, setNotification] = useState('');

  const recordTypes = ['A', 'AAAA', 'MX', 'TXT', 'CNAME', 'NS', 'SOA'];

  const RECORD_HELP = {
    A: 'IPv4 address records mapping the domain name to an IP.',
    AAAA: 'IPv6 address records for modern networking.',
    MX: 'Mail exchange servers responsible for receiving email.',
    TXT: 'Text records often used for verification, SPF, DMARC, etc.',
    CNAME: 'Alias record pointing this name to another canonical name.',
    NS: 'Authoritative name servers for the zone.',
    SOA: 'Zone primary server and timing parameters.'
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const normalizeDomain = (input) => {
    let val = (input || '').trim().toLowerCase();
    val = val.replace(/^(https?:\/\/)?(www\.)?/, '');
    val = val.replace(/\/.*$/, '');
    return val;
  };

  const timeoutFetch = (url, opts, ms) => {
    return Promise.race([
      fetch(url, opts),
      new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))
    ]);
  };

  const toggleType = (type) => {
    const newSet = new Set(selectedTypes);
    if (newSet.has(type)) {
      newSet.delete(type);
    } else {
      newSet.add(type);
    }
    setSelectedTypes(newSet);
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showNotification('Copied to clipboard');
    } catch (err) {
      showNotification('Copy failed');
      console.error('Copy failed:', err);
    }
  };

  const lookup = async () => {
    setError('');
    const normalizedDomain = normalizeDomain(domain);
    
    if (!normalizedDomain) {
      setError('Please enter a valid domain name.');
      return;
    }
    
    if (selectedTypes.size === 0) {
      setError('Please select at least one record type.');
      return;
    }

    setIsLoading(true);
    setResults(null);

    const recordResults = {};
    const opts = {
      method: 'GET',
      cache: 'no-store',
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
      mode: 'cors',
      headers: { 'Accept': 'application/dns-json' }
    };

    try {
      await Promise.all(
        Array.from(selectedTypes).map(async (type) => {
          const url = `https://dns.google/resolve?name=${encodeURIComponent(normalizedDomain)}&type=${encodeURIComponent(type)}&_=${Date.now()}`;
          try {
            const res = await timeoutFetch(url, opts, 8000);
            const json = await res.json();
            recordResults[type] = json;
          } catch (err) {
            recordResults[type] = { _error: String(err?.message || err || 'request failed') };
          }
        })
      );

      const allErrored = Array.from(selectedTypes).every(t => recordResults[t]?._error);
      if (allErrored) {
        setError('All lookups failed. Check your network or try again later.');
        setIsLoading(false);
        return;
      }

      setResults({ domain: normalizedDomain, records: recordResults });
    } catch (err) {
      console.error(err);
      setError('Unexpected error during lookup.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      lookup();
    }
  };

  const renderRecordTable = (type, data) => {
    const answers = Array.isArray(data?.Answer) ? data.Answer : [];
    
    if (answers.length === 0) {
      return (
        <div className="text-center py-4 text-slate-400">
          No records found
        </div>
      );
    }

    if (type === 'A' || type === 'AAAA') {
      return (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-cyan-500/10">
                <th className="text-left p-3 text-cyan-400 font-bold text-sm">IP Address</th>
                <th className="text-left p-3 text-cyan-400 font-bold text-sm">TTL</th>
                <th className="text-left p-3 text-cyan-400 font-bold text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {answers.map((record, idx) => (
                <tr key={idx} className="border-b border-slate-700 hover:bg-cyan-500/5">
                  <td className="p-3 text-slate-300 break-all">{record.data}</td>
                  <td className="p-3">
                    <span className="inline-block bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded text-xs font-bold">
                      {record.TTL ?? '—'}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleCopy(record.data)}
                      className="px-3 py-1 border border-cyan-500 text-cyan-400 rounded hover:bg-cyan-500/15 transition-all text-xs font-bold"
                    >
                      Copy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (type === 'MX') {
      return (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-cyan-500/10">
                <th className="text-left p-3 text-cyan-400 font-bold text-sm">Mail Server</th>
                <th className="text-left p-3 text-cyan-400 font-bold text-sm">Priority</th>
                <th className="text-left p-3 text-cyan-400 font-bold text-sm">TTL</th>
              </tr>
            </thead>
            <tbody>
              {answers.map((record, idx) => {
                const parts = String(record.data || '').split(/\s+/);
                const priority = parts.shift() || '';
                const server = parts.join(' ');
                return (
                  <tr key={idx} className="border-b border-slate-700 hover:bg-cyan-500/5">
                    <td className="p-3 text-slate-300 break-all">{server}</td>
                    <td className="p-3">
                      <span className="inline-block bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded text-xs font-bold">
                        {priority}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="inline-block bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded text-xs font-bold">
                        {record.TTL ?? '—'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    if (type === 'TXT') {
      return (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-cyan-500/10">
                <th className="text-left p-3 text-cyan-400 font-bold text-sm">Text Value</th>
                <th className="text-left p-3 text-cyan-400 font-bold text-sm">TTL</th>
                <th className="text-left p-3 text-cyan-400 font-bold text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {answers.map((record, idx) => {
                let val = String(record.data ?? '');
                if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                  val = val.slice(1, -1);
                }
                return (
                  <tr key={idx} className="border-b border-slate-700 hover:bg-cyan-500/5">
                    <td className="p-3 text-slate-300 break-all">{val}</td>
                    <td className="p-3">
                      <span className="inline-block bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded text-xs font-bold">
                        {record.TTL ?? '—'}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleCopy(val)}
                        className="px-3 py-1 border border-cyan-500 text-cyan-400 rounded hover:bg-cyan-500/15 transition-all text-xs font-bold"
                      >
                        Copy
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    if (type === 'SOA') {
      return (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-cyan-500/10">
                <th className="text-left p-3 text-cyan-400 font-bold text-sm">Field</th>
                <th className="text-left p-3 text-cyan-400 font-bold text-sm">Value</th>
              </tr>
            </thead>
            <tbody>
              {answers.map((record, idx) => {
                const parts = String(record.data || '').split(/\s+/);
                const rows = [
                  ['Primary NS', parts[0] ?? ''],
                  ['Admin Email', parts[1] ?? ''],
                  ['Serial', parts[2] ?? ''],
                  ['Refresh', (parts[3] ?? '') + 's'],
                  ['Retry', (parts[4] ?? '') + 's'],
                  ['Expire', (parts[5] ?? '') + 's'],
                  ['Min TTL', (parts[6] ?? '') + 's']
                ];
                return rows.map(([field, value], i) => (
                  <tr key={`${idx}-${i}`} className="border-b border-slate-700 hover:bg-cyan-500/5">
                    <td className="p-3 text-slate-300">{field}</td>
                    <td className="p-3 text-slate-300 break-all">{value}</td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>
      );
    }

    // Default table for CNAME, NS, and other types
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-cyan-500/10">
              <th className="text-left p-3 text-cyan-400 font-bold text-sm">Value</th>
              <th className="text-left p-3 text-cyan-400 font-bold text-sm">TTL</th>
              <th className="text-left p-3 text-cyan-400 font-bold text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((record, idx) => (
              <tr key={idx} className="border-b border-slate-700 hover:bg-cyan-500/5">
                <td className="p-3 text-slate-300 break-all">{String(record.data || '')}</td>
                <td className="p-3">
                  <span className="inline-block bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded text-xs font-bold">
                    {record.TTL ?? '—'}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleCopy(String(record.data || ''))}
                    className="px-3 py-1 border border-cyan-500 text-cyan-400 rounded hover:bg-cyan-500/15 transition-all text-xs font-bold"
                  >
                    Copy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
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
            <Search className="w-12 h-12 text-cyan-400" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                DNS Record Lookup Tool
              </h1>
              <p className="text-slate-400 mt-2">Perform DNS queries to retrieve A, AAAA, MX, TXT, and other DNS records for any domain.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto px-4 pb-20">
        {/* Search Controls */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6 mb-6">
          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter domain (e.g., example.com)"
              className="flex-1 min-w-[260px] bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors"
            />
            <button
              onClick={lookup}
              disabled={isLoading}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? 'Searching...' : 'Lookup'}
            </button>
          </div>
        </section>

        {/* Record Type Pills */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6 mb-6">
          <h3 className="text-sm text-slate-400 mb-3 font-semibold">Select Record Types:</h3>
          <div className="flex flex-wrap gap-2">
            {recordTypes.map((type) => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                  selectedTypes.has(type)
                    ? 'bg-cyan-500/15 border-2 border-cyan-500 text-cyan-400'
                    : 'bg-slate-950 border-2 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </section>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/40 rounded-xl p-4 mb-6 flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400">Querying DNS records...</p>
          </div>
        )}

        {/* Results */}
        {results && !isLoading && (
          <section className="space-y-6">
            {/* Domain Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8 text-center">
              <h2 className="text-3xl font-bold text-cyan-400 mb-2">{results.domain}</h2>
              <p className="text-slate-400">DNS Records Analysis</p>
            </div>

            {/* Record Blocks */}
            {recordTypes.map((type) => {
              if (!selectedTypes.has(type) || !results.records[type]) return null;
              
              const recordData = results.records[type];
              const answers = Array.isArray(recordData?.Answer) ? recordData.Answer : [];
              
              return (
                <div key={type} className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
                  <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                    <h3 className="text-xl font-bold text-cyan-400">{type} Records</h3>
                    <span className="bg-cyan-500/15 text-cyan-400 border border-cyan-500 px-3 py-1 rounded-full text-sm font-bold">
                      {answers.length} record{answers.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div className="bg-cyan-500/5 border-l-4 border-cyan-500 p-3 rounded mb-4">
                    <p className="text-slate-400 text-sm">{RECORD_HELP[type] || 'DNS records'}</p>
                  </div>

                  {renderRecordTable(type, recordData)}
                </div>
              );
            })}
          </section>
        )}
      </main>

      {/* Legal Disclaimer */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-6">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Legal Disclaimer:</strong> This tool queries public DNS records via Google's DNS-over-HTTPS service.
            Results are provided "as-is" with no warranties. DNS information is publicly available data.
            Use of this tool is your responsibility and must comply with applicable laws and policies.
          </p>
        </div>

        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-12">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Data Privacy:</strong> This application sends DNS queries to Google's public DNS-over-HTTPS API (dns.google).
            The domain names you query are transmitted to Google's servers for resolution. No other data is collected or transmitted.
            All processing happens client-side in your browser.
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
            <p className="text-slate-600">DNS lookups performed via Google DNS-over-HTTPS.</p>
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

      <style jsx>{`
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
