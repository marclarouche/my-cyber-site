import React, { useState } from 'react';
import { Shield, ArrowLeft, Copy, Download, Trash2, Settings, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function FirefoxBaselineWin11() {
  const [profile, setProfile] = useState('relaxed');
  const [selectedControls, setSelectedControls] = useState({});
  const [scriptOutput, setScriptOutput] = useState('');

  // Firefox control definitions with script snippets
  const firefoxControls = {
    tlsMin: {
      id: 'Enforce TLS 1.2 or higher',
      title: 'Enforce TLS 1.2 or higher',
      description: 'Blocks SSL 2.0/3.0 and older TLS versions so Firefox only speaks TLS 1.2 or above, aligning with the Firefox STIG TLS requirements.',
      recommended: true,
      critical: true,
      cryptoHardening: true,
      script: `# Enforce minimum TLS version 1.2 for Firefox
Write-Host "Setting Firefox TLS minimum to 1.2..." -ForegroundColor Cyan
$policies["SSLVersionMin"] = "tls1.2"
`
    },
    blockPopups: {
      id: 'Block pop-up windows from sites',
      title: 'Block pop-up windows from sites',
      description: 'Blocks pop-ups created as pages load, which reduces scam overlays, fake alerts, and distracting advertising windows.',
      recommended: true,
      script: `# Block pop-up windows from websites
Write-Host "Enabling Firefox pop-up blocking..." -ForegroundColor Cyan
$policies["PopupBlocking"] = @{
    Default = $true
    Locked  = $true
}
`
    },
    disableTelemetry: {
      id: 'Disable background telemetry to Mozilla',
      title: 'Disable background telemetry to Mozilla',
      description: 'Turns off Firefox background submission of technical data and usage reports to Mozilla so DoD-style endpoints do not leak environment details.',
      recommended: true,
      script: `# Disable background telemetry submissions to Mozilla
Write-Host "Disabling Firefox telemetry..." -ForegroundColor Cyan
$policies["DisableTelemetry"] = $true
`
    },
    disableSearchSuggest: {
      id: 'Disable search suggestions in the address bar',
      title: 'Disable search suggestions in the address bar',
      description: 'Prevents live search suggestions from being sent as you type, so unintentional queries are not transmitted to search providers.',
      recommended: true,
      script: `# Disable search suggestions in the address bar
Write-Host "Disabling Firefox search suggestions..." -ForegroundColor Cyan
$policies["SearchSuggestEnabled"] = $false
`
    },
    fingerprintingProtection: {
      id: 'Enable fingerprinting protection',
      title: 'Enable fingerprinting protection',
      description: 'Enables Firefox tracking protection against fingerprinting scripts that try to build a unique profile from your browser and device configuration.',
      recommended: true,
      trackerBlocking: true,
      script: `# Enable fingerprinting protection in tracking protection
Write-Host "Enabling Firefox fingerprinting protection..." -ForegroundColor Cyan
if (-not $policies.ContainsKey("EnableTrackingProtection")) {
    $policies["EnableTrackingProtection"] = @{}
}
$policies["EnableTrackingProtection"]["Fingerprinting"] = $true
`
    },
    cryptominingProtection: {
      id: 'Enable cryptomining protection',
      title: 'Enable cryptomining protection',
      description: 'Blocks known cryptomining scripts that silently abuse the CPU to mine cryptocurrency while users browse.',
      recommended: true,
      resourceProtection: true,
      script: `# Enable cryptomining protection in tracking protection
Write-Host "Enabling Firefox cryptomining protection..." -ForegroundColor Cyan
if (-not $policies.ContainsKey("EnableTrackingProtection")) {
    $policies["EnableTrackingProtection"] = @{}
}
$policies["EnableTrackingProtection"]["Cryptomining"] = $true
`
    },
    disableDeprecatedCiphers: {
      id: 'Disable deprecated TLS cipher suites',
      title: 'Disable deprecated TLS cipher suites',
      description: 'Disables weak cipher TLS_RSA_WITH_3DES_EDE_CBC_SHA so legacy sites depending on it can no longer negotiate that algorithm.',
      recommended: false,
      strict: true,
      legacyImpact: true,
      script: `# Disable deprecated TLS cipher suites (3DES)
Write-Host "Disabling deprecated TLS cipher TLS_RSA_WITH_3DES_EDE_CBC_SHA..." -ForegroundColor Cyan
if (-not $policies.ContainsKey("DisabledCiphers")) {
    $policies["DisabledCiphers"] = @{}
}
$policies["DisabledCiphers"]["TLS_RSA_WITH_3DES_EDE_CBC_SHA"] = $true
`
    },
    disableDoH: {
      id: 'Disable DNS over HTTPS (DoH)',
      title: 'Disable DNS over HTTPS (DoH)',
      description: 'Turns off application-level DoH so DNS stays under local or enterprise control instead of being tunneled to external resolvers.',
      recommended: true,
      script: `# Disable DNS over HTTPS (DoH)
Write-Host "Disabling DNS over HTTPS (DoH) in Firefox..." -ForegroundColor Cyan
$policies["DNSOverHTTPS"] = @{
    Enabled = $false
}
`
    },
    disableFeedback: {
      id: 'Disable Firefox feedback reporting menus',
      title: 'Disable Firefox feedback reporting menus',
      description: 'Disables feedback and deceptive-site reporting menu items so users cannot send site reports directly from managed browsers.',
      recommended: false,
      optionalLockdown: true,
      script: `# Disable Firefox feedback commands (Submit Feedback, Report Deceptive Site, etc.)
Write-Host "Disabling Firefox feedback reporting commands..." -ForegroundColor Cyan
$policies["DisableFeedbackCommands"] = $true
`
    },
    disableDevTools: {
      id: 'Disable Firefox Developer Tools',
      title: 'Disable Firefox Developer Tools',
      description: 'Turns off built-in Developer Tools, reducing accidental exposure of detailed browser, plug-in, and application information on production systems.',
      recommended: false,
      veryStrict: true,
      script: `# Disable Firefox Developer Tools on managed systems
Write-Host "Disabling Firefox Developer Tools..." -ForegroundColor Cyan
$policies["DisableDeveloperTools"] = $true
`
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
      setScriptOutput(`# No Firefox controls selected.
# Select at least one baseline action, then generate the script again.`);
      return;
    }

    const date = new Date().toISOString().split('T')[0];
    const profileLabel = profile === 'relaxed' ? 'Relaxed' : profile === 'strict' ? 'Strict' : 'Custom';
    let lines = [];

    lines.push('# ===============================================');
    lines.push('# Firefox Security Baseline Script (Windows 11)');
    lines.push('# Generated by Firefox Security Baseline Script Assistant – CyberLife Coach');
    lines.push('# Date: ' + date);
    lines.push('# Profile: ' + profileLabel);
    lines.push('#');
    lines.push('# This script writes a Firefox policies.json file under the distribution folder,');
    lines.push('# using the enterprise policies documented by Mozilla and the Firefox STIG.');
    lines.push('#');
    lines.push('# Default target (adjust if needed):');
    lines.push('#   C:\\Program Files\\Mozilla Firefox\\distribution\\policies.json');
    lines.push('# or on some systems:');
    lines.push('#   C:\\Program Files (x86)\\Mozilla Firefox\\distribution\\policies.json');
    lines.push('#');
    lines.push('# Review every line before running.');
    lines.push('# Test on a non-critical system first and ensure you have backups and a rollback plan.');
    lines.push('# Run this script from an elevated PowerShell session (Run as Administrator).');
    lines.push('# ===============================================');
    lines.push('');
    lines.push('Set-StrictMode -Version Latest');
    lines.push('$ErrorActionPreference = "Stop"');
    lines.push('');
    lines.push('function Get-FirefoxPaths {');
    lines.push('    param(');
    lines.push('        [string] $PreferredRoot = "C:\\Program Files\\Mozilla Firefox"');
    lines.push('    )');
    lines.push('');
    lines.push('    $root = $PreferredRoot');
    lines.push('    if (-not (Test-Path $root)) {');
    lines.push('        $alt = "C:\\Program Files (x86)\\Mozilla Firefox"');
    lines.push('        if (Test-Path $alt) {');
    lines.push('            $root = $alt');
    lines.push('        }');
    lines.push('    }');
    lines.push('');
    lines.push('    $distributionDir = Join-Path $root "distribution"');
    lines.push('    $policyFile      = Join-Path $distributionDir "policies.json"');
    lines.push('');
    lines.push('    [PSCustomObject]@{');
    lines.push('        Root            = $root');
    lines.push('        DistributionDir = $distributionDir');
    lines.push('        PolicyFile      = $policyFile');
    lines.push('    }');
    lines.push('}');
    lines.push('');
    lines.push('function Invoke-FirefoxBaseline {');
    lines.push('    Write-Host "Applying Firefox security baseline (profile: ' + profileLabel + ')..." -ForegroundColor Cyan');
    lines.push('');
    lines.push('    # Adjust this if Firefox is installed somewhere else.');
    lines.push('    $paths = Get-FirefoxPaths');
    lines.push('    $firefoxRoot = $paths.Root');
    lines.push('    $distributionDir = $paths.DistributionDir');
    lines.push('    $policyFile = $paths.PolicyFile');
    lines.push('');
    lines.push('    if (-not (Test-Path $firefoxRoot)) {');
    lines.push('        Write-Host "Firefox install directory not found at $firefoxRoot." -ForegroundColor Red');
    lines.push('        Write-Host "Update the script to point at the correct Firefox path, then try again." -ForegroundColor Yellow');
    lines.push('        return');
    lines.push('    }');
    lines.push('');
    lines.push('    if (-not (Test-Path $distributionDir)) {');
    lines.push('        Write-Host "Creating distribution directory at $distributionDir..." -ForegroundColor DarkCyan');
    lines.push('        New-Item -ItemType Directory -Path $distributionDir -Force | Out-Null');
    lines.push('    }');
    lines.push('');
    lines.push('    if (Test-Path $policyFile) {');
    lines.push('        $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"');
    lines.push('        $backupPath = "$policyFile.$timestamp.bak"');
    lines.push('        Copy-Item -Path $policyFile -Destination $backupPath -Force');
    lines.push('        Write-Host "Existing policies.json backed up to: $backupPath" -ForegroundColor Yellow');
    lines.push('    } else {');
    lines.push('        Write-Host "No existing policies.json found. A new file will be created." -ForegroundColor DarkCyan');
    lines.push('    }');
    lines.push('');
    lines.push('    $policies = [ordered]@{}');
    lines.push('');
    lines.push('    # You can comment out any sections below that you do not want to apply.');
    lines.push('');

    selectedKeys.forEach(key => {
      const control = firefoxControls[key];
      if (control && control.script) {
        control.script.split('\n').forEach(line => {
          lines.push('    ' + line);
        });
      }
    });

    lines.push('    $rootObject = [ordered]@{');
    lines.push('        policies = $policies');
    lines.push('    }');
    lines.push('');
    lines.push('    $json = $rootObject | ConvertTo-Json -Depth 5');
    lines.push('    $json | Set-Content -Path $policyFile -Encoding UTF8');
    lines.push('');
    lines.push('    Write-Host "Firefox policies.json written to: $policyFile" -ForegroundColor Green');
    lines.push('    Write-Host "Restart Firefox for all settings to take effect." -ForegroundColor Green');
    lines.push('}');
    lines.push('');
    lines.push('function Invoke-FirefoxBaselineRollback {');
    lines.push('    Write-Host "Rolling back Firefox policies.json using the most recent backup..." -ForegroundColor Yellow');
    lines.push('');
    lines.push('    $paths = Get-FirefoxPaths');
    lines.push('    $policyFile = $paths.PolicyFile');
    lines.push('');
    lines.push('    $backupPattern = "$policyFile.*.bak"');
    lines.push('    $backups = Get-ChildItem -Path $backupPattern -ErrorAction SilentlyContinue |');
    lines.push('               Sort-Object LastWriteTime -Descending');
    lines.push('');
    lines.push('    if (-not $backups -or $backups.Count -eq 0) {');
    lines.push('        Write-Host "No policies.json backup files found matching $backupPattern." -ForegroundColor DarkYellow');
    lines.push('        Write-Host "Nothing to roll back. You may delete policies.json manually if needed." -ForegroundColor DarkYellow');
    lines.push('        return');
    lines.push('    }');
    lines.push('');
    lines.push('    $latest = $backups[0]');
    lines.push('    Copy-Item -Path $latest.FullName -Destination $policyFile -Force');
    lines.push('    Write-Host "Restored policies.json from backup: $($latest.FullName)" -ForegroundColor Green');
    lines.push('}');
    lines.push('');
    lines.push('# To apply these settings, run:');
    lines.push('#   Invoke-FirefoxBaseline');
    lines.push('# To roll back to the most recent backup, run:');
    lines.push('#   Invoke-FirefoxBaselineRollback');
    lines.push('');
    lines.push('# End of generated Firefox baseline script.');
    
    setScriptOutput(lines.join('\n'));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scriptOutput);
  };

  const downloadScript = (extension) => {
    if (!scriptOutput.trim()) return;
    
    const content = scriptOutput.replace(/\r\n/g, '\n').replace(/\n/g, '\r\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `firefox-baseline.${extension}`;
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
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Local, in-browser</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Firefox Baseline Script Assistant
          </h1>
          
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            Generate a Firefox security baseline PowerShell script for Windows 11. Choose a focused set of TLS, tracking protection, DNS, telemetry, and tooling controls, then test and run the script on systems you manage. No data leaves your browser.
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
              <strong className="text-slate-300">Relaxed</strong> keeps most sites usable while blocking obvious tracking and leakage. <strong className="text-slate-300">Strict</strong> adds tighter crypto, DNS, and tooling controls that may affect troubleshooting and a few legacy sites.
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
                <span>Generate PowerShell script</span>
              </button>
            </div>
          </div>

          {/* Script Output Panel */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="mb-6">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">Step 2 · Review, test, then run</div>
              <h2 className="text-2xl font-bold mb-2">Generated Firefox baseline PowerShell script</h2>
              <p className="text-slate-400 text-sm">
                Review every line, test on a non-critical system, then run from an elevated PowerShell session.
              </p>
            </div>

            {/* Script Textarea */}
            <textarea
              value={scriptOutput}
              readOnly
              className="w-full h-[450px] bg-slate-950/80 border border-slate-700 rounded-lg p-4 text-sm text-slate-300 font-mono resize-none focus:outline-none focus:border-cyan-500/50 custom-scrollbar mb-4"
              placeholder="Select your controls and click 'Generate PowerShell script' to create your Firefox baseline script..."
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
                onClick={() => downloadScript('ps1')}
                className="flex items-center space-x-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download .ps1</span>
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
              <p><strong className="text-slate-300">How to use:</strong> Save the script as something like <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">firefox-baseline.ps1</code>, open PowerShell as Administrator, and run <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">Invoke-FirefoxBaseline</code> to write <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">policies.json</code> into Firefox's <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">distribution</code> folder. To revert to the last backup, run <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">Invoke-FirefoxBaselineRollback</code>.</p>
              <p><strong className="text-slate-300">Rollback scope:</strong> The rollback function restores the most recent <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">policies.json</code> backup created by this script. It does not touch other enterprise tools, GPOs, or user-level about:config changes.</p>
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
                <li>• Use this only on Windows 11 systems that you manage yourself.</li>
                <li>• Back up at least one test machine or create a full image / restore point.</li>
                <li>• Generate the script and read the comments above each command.</li>
                <li>• Remove anything that does not fit your environment or policy requirements.</li>
                <li>• Run on a non-critical device first from an elevated PowerShell window.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">What the script changes</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Creates or updates <code className="text-cyan-400 text-xs bg-slate-800 px-1 py-0.5 rounded">policies.json</code> under Firefox's <code className="text-cyan-400 text-xs bg-slate-800 px-1 py-0.5 rounded">distribution</code> folder.</li>
                <li>• Applies the selected TLS, tracking protection, DNS, telemetry, and tooling controls.</li>
                <li>• Keeps a timestamped backup of any existing <code className="text-cyan-400 text-xs bg-slate-800 px-1 py-0.5 rounded">policies.json</code> before overwriting it.</li>
                <li>• Provides a rollback function that restores the most recent backup file.</li>
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
                  This assistant runs entirely in your browser. Your selections and the generated script are not sent to CyberLife Coach, to Mozilla, or to any third party. The output is a generic starting point and is provided for educational and informational use only. It is not a substitute for professional advice, does not guarantee compliance with any standard, and is used at your own risk. Always test in a safe environment, verify every line, and ensure you have reliable backups before making changes. Do not apply these settings to employer or school managed devices without explicit approval, and do not bypass existing GPOs, MDM profiles, or enterprise change-control processes.
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
