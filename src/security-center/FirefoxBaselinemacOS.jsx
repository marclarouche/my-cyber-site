import React, { useState } from 'react';
import { Shield, ArrowLeft, Copy, Download, Trash2, Settings, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function FirefoxBaselinemacOS() {
  const [profile, setProfile] = useState('relaxed');
  const [selectedControls, setSelectedControls] = useState({});
  const [scriptOutput, setScriptOutput] = useState('');

  // Firefox control definitions with JSON snippets for macOS
  const firefoxControls = {
    tlsMin: {
      id: 'Enforce TLS 1.2 or higher',
      title: 'Enforce TLS 1.2 or higher',
      description: 'Blocks SSL 2.0, SSL 3.0, and older TLS versions so Firefox only speaks TLS 1.2 or newer, aligning with the Firefox STIG transport requirements.',
      recommended: true,
      critical: true,
      cryptoHardening: true,
      json: `"SSLVersionMin": "tls1.2"`
    },
    blockPopups: {
      id: 'Block pop-up windows from sites',
      title: 'Block pop-up windows from sites',
      description: 'Blocks pop-ups created as pages load, which reduces scam overlays, fake alerts, and distracting advertising windows.',
      recommended: true,
      json: `"PopupBlocking": {
  "Default": true,
  "Locked": true
}`
    },
    disableTelemetry: {
      id: 'Disable background telemetry to Mozilla',
      title: 'Disable background telemetry to Mozilla',
      description: 'Turns off Firefox background submission of technical data and usage reports so managed Macs do not leak environment details upstream.',
      recommended: true,
      json: `"DisableTelemetry": true`
    },
    disableSearchSuggest: {
      id: 'Disable search suggestions in the address bar',
      title: 'Disable search suggestions in the address bar',
      description: 'Stops live search suggestions as you type, so partial queries are not constantly transmitted to search providers from sensitive devices.',
      recommended: true,
      json: `"SearchSuggestEnabled": false`
    },
    fingerprintingProtection: {
      id: 'Enable fingerprinting protection',
      title: 'Enable fingerprinting protection',
      description: 'Enables Firefox tracking protection against fingerprinting scripts that try to build a unique profile from your browser and device configuration.',
      recommended: true,
      trackerBlocking: true,
      json: `"EnableTrackingProtection": {
  "Fingerprinting": true
}`
    },
    cryptominingProtection: {
      id: 'Enable cryptomining protection',
      title: 'Enable cryptomining protection',
      description: 'Blocks known cryptomining scripts that silently abuse CPU resources to mine cryptocurrency while users browse.',
      recommended: true,
      resourceProtection: true,
      json: `"CryptominingProtection": true`
    },
    disableDeprecatedCiphers: {
      id: 'Disable deprecated TLS cipher suites',
      title: 'Disable deprecated TLS cipher suites',
      description: 'Disables the weak cipher TLS_RSA_WITH_3DES_EDE_CBC_SHA so older servers that rely on it can no longer negotiate that algorithm.',
      recommended: false,
      strict: true,
      legacyImpact: true,
      json: `"DisabledCiphers": {
  "TLS_RSA_WITH_3DES_EDE_CBC_SHA": true
}`
    },
    disableDoH: {
      id: 'Disable DNS over HTTPS (DoH)',
      title: 'Disable DNS over HTTPS (DoH)',
      description: 'Turns off application-level DoH so DNS stays under local or enterprise control instead of being tunneled to external resolvers outside your visibility.',
      recommended: true,
      json: `"DNSOverHTTPS": {
  "Enabled": false
}`
    },
    disableFeedback: {
      id: 'Disable Firefox feedback reporting menus',
      title: 'Disable Firefox feedback reporting menus',
      description: 'Disables feedback and deceptive-site reporting menu items so users cannot send site reports directly from managed browsers.',
      recommended: false,
      optionalLockdown: true,
      json: `"DisableFeedbackCommands": true`
    },
    disableDevTools: {
      id: 'Disable Firefox Developer Tools',
      title: 'Disable Firefox Developer Tools',
      description: 'Turns off built-in Developer Tools, reducing accidental exposure of detailed browser, plug-in, and application information on production systems.',
      recommended: false,
      veryStrict: true,
      json: `"DisableDeveloperTools": true`
    }
  };

  // Profile definitions
  const profiles = {
    relaxed: ['tlsMin', 'blockPopups', 'disableTelemetry', 'disableSearchSuggest', 'fingerprintingProtection', 'cryptominingProtection', 'disableDoH'],
    strict: ['tlsMin', 'blockPopups', 'disableTelemetry', 'disableSearchSuggest', 'fingerprintingProtection', 'cryptominingProtection', 'disableDoH', 'disableDeprecatedCiphers', 'disableFeedback', 'disableDevTools']
  };

  const applyProfile = (profileName) => {
    if (profileName === 'custom') return;
    
    const profileKeys = profiles[profileName] || [];
    const newSelection = {};
    profileKeys.forEach(key => {
      newSelection[key] = true;
    });
    setSelectedControls(newSelection);
  };

  const handleProfileChange = (newProfile) => {
    setProfile(newProfile);
    if (newProfile !== 'custom') {
      applyProfile(newProfile);
    }
  };

  const handleControlToggle = (key) => {
    const newSelection = { ...selectedControls, [key]: !selectedControls[key] };
    setSelectedControls(newSelection);
    setProfile('custom');
  };

  const selectRecommended = () => {
    const newSelection = {};
    Object.keys(firefoxControls).forEach(key => {
      if (firefoxControls[key].recommended) {
        newSelection[key] = true;
      }
    });
    setSelectedControls(newSelection);
    setProfile('custom');
  };

  const clearAll = () => {
    setSelectedControls({});
    setProfile('custom');
  };

  const buildScript = () => {
    const selectedKeys = Object.keys(selectedControls).filter(key => selectedControls[key]);
    
    if (selectedKeys.length === 0) {
      setScriptOutput(`#!/usr/bin/env bash

# No Firefox controls selected.
# Select at least one baseline action, then generate the script again.`);
      return;
    }

    const date = new Date().toISOString().split('T')[0];
    const profileLabel = profile === 'relaxed' ? 'Relaxed' : profile === 'strict' ? 'Strict' : 'Custom';
    let lines = [];

    lines.push('#!/usr/bin/env bash');
    lines.push('');
    lines.push('# ===============================================');
    lines.push('# Firefox Security Baseline Script (macOS)');
    lines.push('# Generated by Firefox Security Baseline Script Assistant – CyberLife Coach');
    lines.push('# Date: ' + date);
    lines.push('# Profile: ' + profileLabel);
    lines.push('#');
    lines.push('# This script writes a Firefox policies.json file into:');
    lines.push('#   /Applications/Firefox.app/Contents/Resources/distribution/policies.json');
    lines.push('# using a simple bash helper that backs up any existing file first.');
    lines.push('#');
    lines.push('# Review every line before running.');
    lines.push('# Test on a non-critical Mac first and ensure you have backups and a rollback plan.');
    lines.push('# Run this script from Terminal using sudo, for example:');
    lines.push('#   sudo bash ./firefox-macos-baseline.sh apply');
    lines.push('# ===============================================');
    lines.push('');
    lines.push('set -euo pipefail');
    lines.push('');
    lines.push('PROFILE_LABEL="' + profileLabel + '"');
    lines.push('FIREFOX_APP="/Applications/Firefox.app"');
    lines.push('DIST_DIR="$FIREFOX_APP/Contents/Resources/distribution"');
    lines.push('POLICY_FILE="$DIST_DIR/policies.json"');
    lines.push('BACKUP_DIR="/usr/local/CyberLifeCoach/FirefoxBaseline"');
    lines.push('TIMESTAMP="$(date -u +\\"%Y-%m-%dT%H:%M:%SZ\\")"');
    lines.push('');
    lines.push('ensure_dirs() {');
    lines.push('  sudo mkdir -p "$DIST_DIR" "$BACKUP_DIR";');
    lines.push('}');
    lines.push('');
    lines.push('backup_policy() {');
    lines.push('  if [ -f "$POLICY_FILE" ]; then');
    lines.push('    local backup_file="$BACKUP_DIR/policies.json.$TIMESTAMP.bak";');
    lines.push('    sudo cp "$POLICY_FILE" "$backup_file";');
    lines.push('    echo "Existing policies.json backed up to: $backup_file"');
    lines.push('  else');
    lines.push('    echo "No existing policies.json found. A new file will be created."');
    lines.push('  fi');
    lines.push('}');
    lines.push('');
    lines.push('write_policy_json() {');
    lines.push('  cat << \'EOF\' | sudo tee "$POLICY_FILE" > /dev/null');
    lines.push('{');
    lines.push('  "policies": {');

    const policySnippets = selectedKeys
      .map(key => firefoxControls[key] && firefoxControls[key].json)
      .filter(Boolean);

    policySnippets.forEach((snippet, index) => {
      const isLast = index === policySnippets.length - 1;
      const snippetLines = snippet.trimEnd().split('\n');
      snippetLines.forEach((line, lineIndex) => {
        let out = line;
        if (lineIndex === snippetLines.length - 1 && !isLast) {
          out = out + ',';
        }
        lines.push('    ' + out);
      });
    });

    lines.push('  }');
    lines.push('}');
    lines.push('EOF');
    lines.push('  echo "Firefox policies.json written to: $POLICY_FILE"');
    lines.push('}');
    lines.push('');
    lines.push('apply_firefox_baseline() {');
    lines.push('  echo "Applying Firefox security baseline (profile: $PROFILE_LABEL)..."');
    lines.push('  ensure_dirs');
    lines.push('  backup_policy');
    lines.push('  write_policy_json');
    lines.push('  echo "Baseline apply complete. Restart Firefox for all changes to take effect."');
    lines.push('}');
    lines.push('');
    lines.push('rollback_firefox_baseline() {');
    lines.push('  echo "Rolling back Firefox policies.json using the most recent backup..."');
    lines.push('  if [ ! -d "$BACKUP_DIR" ]; then');
    lines.push('    echo "Backup directory not found at $BACKUP_DIR. Nothing to roll back."');
    lines.push('    return 0');
    lines.push('  fi');
    lines.push('  local latest backup_pattern="$BACKUP_DIR/policies.json.*.bak"');
    lines.push('  latest="$(ls -1t $backup_pattern 2>/dev/null | head -n 1 || true)"');
    lines.push('  if [ -z "$latest" ]; then');
    lines.push('    echo "No policies.json backups found in $BACKUP_DIR. Nothing to roll back."');
    lines.push('    return 0');
    lines.push('  fi');
    lines.push('  sudo cp "$latest" "$POLICY_FILE"');
    lines.push('  echo "Restored policies.json from backup: $latest"');
    lines.push('}');
    lines.push('');
    lines.push('usage() {');
    lines.push('  echo "Usage: sudo bash $0 [apply|rollback]"');
    lines.push('  echo');
    lines.push('  echo "  apply     Apply the selected Firefox baseline settings to policies.json"');
    lines.push('  echo "  rollback  Restore the most recent policies.json backup created by this script"');
    lines.push('}');
    lines.push('');
    lines.push('case "${1:-}" in');
    lines.push('  apply)');
    lines.push('    apply_firefox_baseline');
    lines.push('    ;;');
    lines.push('  rollback)');
    lines.push('    rollback_firefox_baseline');
    lines.push('    ;;');
    lines.push('  *)');
    lines.push('    usage');
    lines.push('    exit 1');
    lines.push('    ;;');
    lines.push('esac');
    lines.push('');
    lines.push('# End of generated Firefox macOS baseline script.');
    
    setScriptOutput(lines.join('\n'));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scriptOutput);
  };

  const downloadScript = (extension) => {
    if (!scriptOutput.trim()) return;
    
    const content = scriptOutput;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `firefox-macos-baseline.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/browser-hardening-hub" className="flex items-center space-x-3 group cursor-pointer">
              <img 
                src="/logo.png" 
                alt="CyberLifeCoach" 
                className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300" 
              />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:brightness-125 transition-all duration-300">
                CyberLifeCoach
              </span>
            </a>

            <a href="/security-center/browser-hardening-hub" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Browser Hardening Hub</span>
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
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Browser Security Baseline</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Mozilla Firefox</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">macOS</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Local, in-browser</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Firefox Baseline Script Assistant (macOS)
          </h1>
          
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            Generate a Firefox security baseline bash script for macOS. Choose a focused set of TLS, tracking protection, DNS, telemetry, and tooling controls, then test and run the script on Macs you manage. No data leaves your browser.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
          
          {/* Controls Panel */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="mb-6">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">Step 1 · Choose your controls</div>
              <h2 className="text-2xl font-bold mb-2">Pick the Firefox security controls</h2>
              <p className="text-slate-400 text-sm">
                Start with the relaxed profile, then move to strict once you are comfortable with the impact. You can always regenerate and refine the script.
              </p>
            </div>

            {/* Profile Selection */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider self-center">Profiles:</span>
              {['relaxed', 'strict', 'custom'].map(p => (
                <label key={p} className="flex items-center space-x-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-800 cursor-pointer hover:border-cyan-500 transition-all">
                  <input
                    type="radio"
                    name="profile"
                    value={p}
                    checked={profile === p}
                    onChange={(e) => handleProfileChange(e.target.value)}
                    className="text-cyan-500"
                  />
                  <span className="text-sm capitalize">{p}</span>
                </label>
              ))}
            </div>

            <p className="text-sm text-slate-500 mb-6">
              <strong className="text-slate-300">Relaxed</strong> keeps most sites usable while blocking obvious tracking and leakage. <strong className="text-slate-300">Strict</strong> adds tighter crypto, DNS, and tooling controls that may affect troubleshooting and a few legacy endpoints.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={selectRecommended}
                className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Select Recommended</span>
              </button>
              <button
                onClick={clearAll}
                className="flex items-center space-x-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            </div>

            {/* Controls List */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {Object.entries(firefoxControls).map(([key, control]) => (
                <label
                  key={key}
                  className="flex items-start space-x-3 p-4 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl border border-slate-700 cursor-pointer hover:border-cyan-500/50 hover:bg-slate-800/80 transition-all"
                >
                  <input
                    type="checkbox"
                    checked={selectedControls[key] || false}
                    onChange={() => handleControlToggle(key)}
                    className="mt-1 accent-cyan-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-2 mb-1">
                      <span className="text-sm font-semibold text-slate-200">{control.title}</span>
                      {control.recommended && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          Recommended
                        </span>
                      )}
                      {control.critical && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                          Critical
                        </span>
                      )}
                      {control.strict && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 border border-slate-600">
                          More strict
                        </span>
                      )}
                      {control.veryStrict && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                          Very strict
                        </span>
                      )}
                      {control.cryptoHardening && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          Crypto hardening
                        </span>
                      )}
                      {control.legacyImpact && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                          Legacy impact
                        </span>
                      )}
                      {control.trackerBlocking && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
                          Tracker blocking
                        </span>
                      )}
                      {control.resourceProtection && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          Resource protection
                        </span>
                      )}
                      {control.optionalLockdown && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 border border-slate-600">
                          Optional lockdown
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{control.description}</p>
                  </div>
                </label>
              ))}
            </div>

            <p className="text-sm text-slate-500 mt-6">
              <strong className="text-slate-300">Tip:</strong> For most personal or small office systems, Relaxed is a good starting point. Move to Strict only after you have tested how it affects Firefox functionality and legacy sites.
            </p>

            {/* Generate Button - Moved here after controls */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={buildScript}
                className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              >
                <Settings className="w-4 h-4" />
                <span>Generate bash script</span>
              </button>
            </div>
          </div>

          {/* Script Output Panel */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="mb-6">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">Step 2 · Review, test, then run</div>
              <h2 className="text-2xl font-bold mb-2">Generated Firefox baseline bash script</h2>
              <p className="text-slate-400 text-sm">
                Review every line, test on a non-critical Mac, then run with sudo from Terminal.
              </p>
            </div>

            {/* Script Textarea */}
            <textarea
              value={scriptOutput}
              readOnly
              className="w-full h-[450px] bg-slate-950/80 border border-slate-700 rounded-lg p-4 text-sm text-slate-300 font-mono resize-none focus:outline-none focus:border-cyan-500/50 custom-scrollbar mb-4"
              placeholder="Select your controls and click 'Generate bash script' to create your Firefox baseline script for macOS..."
            />

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </button>
              <button
                onClick={() => downloadScript('sh')}
                className="flex items-center space-x-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download .sh</span>
              </button>
              <button
                onClick={() => downloadScript('txt')}
                className="flex items-center space-x-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download .txt</span>
              </button>
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-400">
              <p><strong className="text-slate-300">How to use:</strong> Save the script as something like <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">firefox-macos-baseline.sh</code>, mark it executable with <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">chmod +x firefox-macos-baseline.sh</code>, then run <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">sudo ./firefox-macos-baseline.sh apply</code> on a test Mac. To restore the most recent backup of <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">policies.json</code>, run <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">sudo ./firefox-macos-baseline.sh rollback</code>.</p>
              <p><strong className="text-slate-300">Scope of rollback:</strong> The rollback block only restores <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">policies.json</code> backups created by this script under <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">/usr/local/CyberLifeCoach/FirefoxBaseline</code>. It does not touch other MDM profiles, configuration profiles, or user-level Firefox settings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">How to use this assistant safely</div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-3">Before you run the script</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Use this only on Macs that you manage yourself.</li>
                <li>• Back up at least one test system or create a full image or snapshot.</li>
                <li>• Quit Firefox before applying changes so the file is not overwritten while open.</li>
                <li>• Generate the script and read the comments above each section.</li>
                <li>• Remove anything that does not fit your environment or policies.</li>
                <li>• Test first on a non-critical Mac from a root or <code className="text-cyan-400 text-xs bg-slate-800 px-1 py-0.5 rounded">sudo</code>-enabled shell.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">What the script changes</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Targets <code className="text-cyan-400 text-xs bg-slate-800 px-1 py-0.5 rounded">/Applications/Firefox.app</code> by default.</li>
                <li>• Creates the <code className="text-cyan-400 text-xs bg-slate-800 px-1 py-0.5 rounded">distribution</code> directory if needed.</li>
                <li>• Backs up any existing <code className="text-cyan-400 text-xs bg-slate-800 px-1 py-0.5 rounded">policies.json</code> into a timestamped backup folder.</li>
                <li>• Writes a new <code className="text-cyan-400 text-xs bg-slate-800 px-1 py-0.5 rounded">policies.json</code> based on your chosen controls.</li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-8 h-8 text-yellow-400 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-2">Important Notice</h4>
                <p className="text-sm text-slate-300 leading-relaxed mb-3">
                  This assistant runs entirely in your browser. Your selections and the generated bash script are not sent to CyberLife Coach, to Mozilla, or to any third party. The output is a generic starting point and is provided for educational and informational use only. It is not a substitute for professional advice, does not guarantee compliance with any standard, and is used at your own risk. Always test in a safe environment, verify every line, and ensure you have reliable backups before making changes. Do not apply these settings to employer or school managed devices without explicit approval, and do not bypass existing MDM profiles or enterprise change-control processes.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/30">No warranty or guarantees</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">Local only, no data leaves this device</span>
                </div>
              </div>
            </div>
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
            <p>&copy; 2026 CyberLifeCoach</p>
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.7);
        }
      `}</style>
    </div>
  );
}
