import React, { useState, useEffect, useMemo } from 'react';
import { Shield, ArrowLeft, Plus, Printer, Trash2, AlertTriangle } from 'lucide-react';

export default function ThreatModel() {
  const EMOJI_ASSETS = [
    "✉️ Primary Email",
    "💳 Checking Account",
    "📱 iPhone",
    "💻 Laptop",
    "📷 Photo Library",
    "🗂️ Cloud Docs",
    "🏠 Smart Home",
    "🔑 Password Vault"
  ];

  const EMOJI_THREATS = [
    "🎣 Phishing",
    "🧳 Lost/Stolen",
    "🪲 Tracking",
    "💤 Stalker/Harassment",
    "💥 Accidental Deletion",
    "🪪 Identity Fraud",
    "🦠 Malware"
  ];

  const LIKELIHOOD = ["Low", "Medium", "High"];
  const IMPACT = ["Low", "Medium", "High"];
  const STATUS = ["Not started", "Doing", "Done"];

  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('clc_quick_model_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading saved data:', e);
    }
    return [
      {
        id: 'QM-0001',
        asset: '💳 Checking Account',
        threat: '🎣 Phishing',
        likelihood: 'High',
        impact: 'High',
        oneStep: 'Turn on app 2FA',
        owner: 'Me',
        due: '',
        status: 'Not started'
      },
      {
        id: 'QM-0002',
        asset: '📱 iPhone',
        threat: '🧳 Lost/Stolen',
        likelihood: 'Medium',
        impact: 'High',
        oneStep: 'Enable passcode + Find My',
        owner: 'Me',
        due: '',
        status: 'Not started'
      }
    ];
  });

  const [notification, setNotification] = useState('');

  useEffect(() => {
    localStorage.setItem('clc_quick_model_v1', JSON.stringify(items));
  }, [items]);

  const scoreFromLabel = (value) => {
    if (value === "Low") return 1;
    if (value === "Medium") return 2;
    if (value === "High") return 3;
    return 0;
  };

  const heatFromScore = (score) => {
    if (!score) return "";
    if (score >= 7) return "High";
    if (score >= 4) return "Medium";
    return "Low";
  };

  const summary = useMemo(() => {
    const counts = { High: 0, Medium: 0, Low: 0 };
    let dueThisWeek = 0;
    let overdue = 0;
    const today = new Date();
    const in7 = new Date();
    in7.setDate(today.getDate() + 7);

    items.forEach(item => {
      const score = scoreFromLabel(item.likelihood) * scoreFromLabel(item.impact);
      const heat = heatFromScore(score);
      if (heat) counts[heat] += 1;

      if (item.due && (item.status === 'Not started' || item.status === 'Doing')) {
        const dueDate = new Date(item.due);
        if (dueDate < today) overdue++;
        if (dueDate >= today && dueDate <= in7) dueThisWeek++;
      }
    });

    return { counts, dueThisWeek, overdue };
  }, [items]);

  const addItem = () => {
    const newId = `QM-${String(1000 + items.length + 1).slice(1)}`;
    setItems(prev => [...prev, {
      id: newId,
      asset: '✉️ Primary Email',
      threat: '🎣 Phishing',
      likelihood: '',
      impact: '',
      oneStep: '',
      owner: 'Me',
      due: '',
      status: 'Not started'
    }]);
    showNotification('Item added');
  };

  const updateItem = (id, key, value) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, [key]: value } : item
    ));
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
    showNotification('Item removed');
  };

  const clearAll = () => {
    if (window.confirm('Clear all items? This cannot be undone.')) {
      setItems([]);
      localStorage.removeItem('clc_quick_model_v1');
      showNotification('All items cleared');
    }
  };

  const printPDF = () => {
    window.print();
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const SummaryCard = ({ label, value }) => (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-6 text-center">
      <div className="text-sm text-slate-400 mb-2">{label}</div>
      <div className="text-3xl font-bold text-cyan-400">{value}</div>
    </div>
  );

  const HeatBadge = ({ heat }) => {
    if (!heat) return <span className="text-slate-500">—</span>;
    
    const colors = {
      High: 'bg-red-500/20 text-red-300 border-red-500/40',
      Medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
      Low: 'bg-green-500/20 text-green-300 border-green-500/40'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${colors[heat]}`}>
        {heat}
      </span>
    );
  };

  const Dropdown = ({ value, options, onChange, ariaLabel }) => (
    <select
      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-300 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
      aria-label={ariaLabel || "Select"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select…</option>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );

  const SelectOrInput = ({ value, options, onChange, placeholder, ariaLabel }) => {
    const [mode, setMode] = useState(value ? (options.includes(value) ? 'select' : 'input') : 'select');

    return (
      <div className="flex gap-2">
        {mode === 'select' ? (
          <select
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-300 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            aria-label={ariaLabel || "Select"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">Select…</option>
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : (
          <input
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-300 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            aria-label={ariaLabel || "Input"}
            placeholder={placeholder || "Type here"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
        <button
          type="button"
          className="px-3 py-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors no-print"
          onClick={() => setMode(m => m === 'select' ? 'input' : 'select')}
        >
          {mode === 'select' ? 'Custom' : 'List'}
        </button>
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
        
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
              Security Tool
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Client-Side Only
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Quick Threat Model Builder
          </h1>
          <p className="text-slate-400 text-lg">
            A simple, printable threat model builder. Pick what matters, rate likelihood and impact, add one small fix, then save to PDF.
          </p>
        </div>
      </section>

      {/* Sticky Action Bar */}
      <div className="sticky top-20 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 no-print">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-cyan-400">Threat Model Entries</h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={addItem}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg text-white font-semibold transition-all shadow-lg shadow-cyan-500/25"
              >
                <Plus className="w-4 h-4" />
                <span>Add item</span>
              </button>
              <button
                onClick={printPDF}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg text-white font-semibold transition-all shadow-lg shadow-cyan-500/25"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={clearAll}
                className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="relative max-w-7xl mx-auto px-4 py-8 pb-20">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <SummaryCard label="High risks" value={summary.counts.High} />
          <SummaryCard label="Medium risks" value={summary.counts.Medium} />
          <SummaryCard label="Low risks" value={summary.counts.Low} />
          <SummaryCard label="Due this week" value={summary.dueThisWeek} />
          <SummaryCard label="Overdue" value={summary.overdue} />
        </div>

        <p className="text-sm text-slate-400 mb-6 no-print">
          Add up to ten items that matter most. Choose Likelihood and Impact. Write one small fix. Print when done. All data stays in this browser.
        </p>

        {/* Table */}
        <div className="overflow-x-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Asset</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Threat</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Likelihood</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Impact</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Risk</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Heat</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">One-Step Fix</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Owner</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Due</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider no-print"></th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan={12} className="px-4 py-8 text-center text-slate-500">
                    No items yet. Click "Add item".
                  </td>
                </tr>
              )}
              {items.map(item => {
                const score = scoreFromLabel(item.likelihood) * scoreFromLabel(item.impact);
                const heat = heatFromScore(score);

                return (
                  <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3 text-slate-300 font-mono text-xs">{item.id}</td>
                    <td className="px-4 py-3" style={{ minWidth: '200px' }}>
                      <SelectOrInput
                        value={item.asset}
                        options={EMOJI_ASSETS}
                        onChange={(v) => updateItem(item.id, 'asset', v)}
                        ariaLabel="Asset"
                      />
                    </td>
                    <td className="px-4 py-3" style={{ minWidth: '200px' }}>
                      <SelectOrInput
                        value={item.threat}
                        options={EMOJI_THREATS}
                        onChange={(v) => updateItem(item.id, 'threat', v)}
                        ariaLabel="Threat"
                      />
                    </td>
                    <td className="px-4 py-3" style={{ minWidth: '140px' }}>
                      <Dropdown
                        value={item.likelihood}
                        options={LIKELIHOOD}
                        onChange={(v) => updateItem(item.id, 'likelihood', v)}
                        ariaLabel="Likelihood"
                      />
                    </td>
                    <td className="px-4 py-3" style={{ minWidth: '140px' }}>
                      <Dropdown
                        value={item.impact}
                        options={IMPACT}
                        onChange={(v) => updateItem(item.id, 'impact', v)}
                        ariaLabel="Impact"
                      />
                    </td>
                    <td className="px-4 py-3 text-center text-slate-300 font-semibold">
                      {score || ""}
                    </td>
                    <td className="px-4 py-3">
                      <HeatBadge heat={heat} />
                    </td>
                    <td className="px-4 py-3" style={{ minWidth: '200px' }}>
                      <input
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-300 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder="One tiny fix"
                        value={item.oneStep}
                        onChange={(e) => updateItem(item.id, 'oneStep', e.target.value)}
                        aria-label="One-step fix"
                      />
                    </td>
                    <td className="px-4 py-3" style={{ minWidth: '120px' }}>
                      <input
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-300 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder="Owner"
                        value={item.owner}
                        onChange={(e) => updateItem(item.id, 'owner', e.target.value)}
                        aria-label="Owner"
                      />
                    </td>
                    <td className="px-4 py-3" style={{ minWidth: '160px' }}>
                      <input
                        type="date"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-300 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                        value={item.due}
                        onChange={(e) => updateItem(item.id, 'due', e.target.value)}
                        aria-label="Due date"
                      />
                    </td>
                    <td className="px-4 py-3" style={{ minWidth: '140px' }}>
                      <Dropdown
                        value={item.status}
                        options={STATUS}
                        onChange={(v) => updateItem(item.id, 'status', v)}
                        ariaLabel="Status"
                      />
                    </td>
                    <td className="px-4 py-3 no-print">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="px-3 py-1.5 bg-red-900/20 hover:bg-red-900/40 border border-red-500/40 rounded-lg text-red-300 text-xs font-semibold transition-all"
                        type="button"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-slate-400 mt-6">
          <strong>Tip:</strong> Keep it under ten items. Print to PDF when finished. Your entries are saved locally (no upload).
        </p>
      </section>

      {/* Legal Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Legal Disclaimer:</strong> This tool is provided "as-is" with no warranty of any kind. It is intended for educational and awareness purposes only.
            CyberLife Coach is not liable for any outcomes, misuse, or data loss. Always apply security controls responsibly and in accordance
            with organizational policies and local laws.
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
            <p className="text-slate-600">Your entries are saved locally in this browser. No data is sent anywhere.</p>
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

      {/* Custom Styles */}
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

        @media print {
          .no-print {
            display: none !important;
          }
          
          nav {
            position: relative !important;
          }
          
          .sticky {
            position: relative !important;
          }
          
          body {
            background: white !important;
            color: black !important;
          }
          
          table {
            background: white !important;
            color: black !important;
          }
          
          th, td {
            border: 1px solid #ccc !important;
            background: white !important;
            color: black !important;
          }
        }
      `}</style>
    </div>
  );
}
