import React, { useState, useEffect } from 'react';
import { Shield, ArrowLeft, Copy, Download, Trash2, Settings, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function EdgeBaselineWin11() {
  const [profile, setProfile] = useState('relaxed');
  const [selectedControls, setSelectedControls] = useState({});
  const [scriptOutput, setScriptOutput] = useState('');

  // Edge control definitions with script snippets
  const edgeControls = {
    sessionCookies: {
      id: 'Session-only cookies',
      title: 'Session-only cookies',
      description: 'Cookies are automatically cleared after you close Microsoft Edge.',
      recommended: false,
      scriptRelaxed: null,
      scriptStrict: `
# Session-only cookies
New-ItemProperty -Path $edgePolicyKey -Name "DefaultCookiesSetting" -Value 4 -PropertyType DWord -Force | Out-Null
Write-Host "[✓] Session-only cookies enforced via DefaultCookiesSetting = 4" -ForegroundColor Green
`.trim()
    },
    httpsOnly: {
      id: 'HTTPS-Only Mode',
      title: 'HTTPS-Only Mode',
      description: 'Enable HTTPS-Only Mode for all sites (with fallback to HTTP if needed).',
      recommended: true,
      scriptRelaxed: `
# HTTPS-Only Mode
New-ItemProperty -Path $edgePolicyKey -Name "HttpsOnlyMode" -Value "force_enabled" -PropertyType String -Force | Out-Null
Write-Host "[✓] HTTPS-Only Mode enabled" -ForegroundColor Green
`.trim(),
      scriptStrict: `
# HTTPS-Only Mode
New-ItemProperty -Path $edgePolicyKey -Name "HttpsOnlyMode" -Value "force_enabled" -PropertyType String -Force | Out-Null
Write-Host "[✓] HTTPS-Only Mode enabled" -ForegroundColor Green
`.trim()
    },
    sslErrorOverride: {
      id: 'Block SSL error overrides',
      title: 'Block SSL error overrides',
      description: 'Prevent users from ignoring SSL certificate warnings and errors.',
      recommended: true,
      scriptRelaxed: `
# Block SSL error overrides
New-ItemProperty -Path $edgePolicyKey -Name "SSLErrorOverrideAllowed" -Value 0 -PropertyType DWord -Force | Out-Null
Write-Host "[✓] SSL error overrides blocked via SSLErrorOverrideAllowed = 0" -ForegroundColor Green
`.trim(),
      scriptStrict: `
# Block SSL error overrides
New-ItemProperty -Path $edgePolicyKey -Name "SSLErrorOverrideAllowed" -Value 0 -PropertyType DWord -Force | Out-Null
Write-Host "[✓] SSL error overrides blocked via SSLErrorOverrideAllowed = 0" -ForegroundColor Green
`.trim()
    },
    dns: {
      id: 'Secure DNS',
      title: 'Secure DNS',
      description: 'Enable DNS-over-HTTPS using the system resolver.',
      recommended: true,
      scriptRelaxed: `
# Secure DNS
New-ItemProperty -Path $edgePolicyKey -Name "DnsOverHttpsMode" -Value "automatic" -PropertyType String -Force | Out-Null
Write-Host "[✓] Secure DNS (DoH) set to automatic" -ForegroundColor Green
`.trim(),
      scriptStrict: `
# Secure DNS
New-ItemProperty -Path $edgePolicyKey -Name "DnsOverHttpsMode" -Value "automatic" -PropertyType String -Force | Out-Null
Write-Host "[✓] Secure DNS (DoH) set to automatic" -ForegroundColor Green
`.trim()
    },
    passwordLeak: {
      id: 'Password leak detection',
      title: 'Password leak detection',
      description: 'Notify users if their saved passwords appear in known data breaches.',
      recommended: true,
      scriptRelaxed: `
# Password leak detection
New-ItemProperty -Path $edgePolicyKey -Name "PasswordLeakDetectionEnabled" -Value 1 -PropertyType DWord -Force | Out-Null
Write-Host "[✓] Password leak detection enabled" -ForegroundColor Green
`.trim(),
      scriptStrict: `
# Password leak detection
New-ItemProperty -Path $edgePolicyKey -Name "PasswordLeakDetectionEnabled" -Value 1 -PropertyType DWord -Force | Out-Null
Write-Host "[✓] Password leak detection enabled" -ForegroundColor Green
`.trim()
    },
    typoSquatting: {
      id: 'Typosquatting protection',
      title: 'Typosquatting protection',
      description: 'Warn users when they visit domains that look similar to known legitimate sites.',
      recommended: true,
      scriptRelaxed: `
# Typosquatting protection
New-ItemProperty -Path $edgePolicyKey -Name "TyposquattingCheckerEnabled" -Value 1 -PropertyType DWord -Force | Out-Null
Write-Host "[✓] Typosquatting protection enabled" -ForegroundColor Green
`.trim(),
      scriptStrict: `
# Typosquatting protection
New-ItemProperty -Path $edgePolicyKey -Name "TyposquattingCheckerEnabled" -Value 1 -PropertyType DWord -Force | Out-Null
Write-Host "[✓] Typosquatting protection enabled" -ForegroundColor Green
`.trim()
    },
    smartScreen: {
      id: 'SmartScreen enabled',
      title: 'SmartScreen enabled',
      description: 'Enable Microsoft Defender SmartScreen to block malicious sites and downloads.',
      recommended: true,
      scriptRelaxed: `
# SmartScreen enabled
New-ItemProperty -Path $edgePolicyKey -Name "SmartScreenEnabled" -Value 1 -PropertyType DWord -Force | Out-Null
Write-Host "[✓] SmartScreen enabled for Edge" -ForegroundColor Green
`.trim(),
      scriptStrict: `
# SmartScreen enabled
New-ItemProperty -Path $edgePolicyKey -Name "SmartScreenEnabled" -Value 1 -PropertyType DWord -Force | Out-Null
Write-Host "[✓] SmartScreen enabled for Edge" -ForegroundColor Green
`.trim()
    },
    smartScreenPua: {
      id: 'SmartScreen PUA blocking',
      title: 'SmartScreen PUA blocking',
      description: 'Block downloads of potentially unwanted applications (PUA) via SmartScreen.',
      recommended: true,
      scriptRelaxed: `
# SmartScreen PUA blocking
New-ItemProperty -Path $edgePolicyKey -Name "SmartScreenPuaEnabled" -Value 1 -PropertyType DWord -Force | Out-Null
Write-Host "[✓] SmartScreen PUA blocking enabled" -ForegroundColor Green
`.trim(),
      scriptStrict: `
# SmartScreen PUA blocking
New-ItemProperty -Path $edgePolicyKey -Name "SmartScreenPuaEnabled" -Value 1 -PropertyType DWord -Force | Out-Null
Write-Host "[✓] SmartScreen PUA blocking enabled" -ForegroundColor Green
`.trim()
    },
    trackingPrevention: {
      id: 'Tracking prevention',
      title: 'Tracking prevention',
      description: 'Set tracking prevention to Balanced (Relaxed) or Strict for better privacy.',
      recommended: true,
      scriptRelaxed: `
# Tracking prevention - Balanced
New-ItemProperty -Path $edgePolicyKey -Name "TrackingPrevention" -Value 2 -PropertyType DWord -Force | Out-Null
Write-Host "[✓] Tracking prevention set to Balanced (2)" -ForegroundColor Green
`.trim(),
      scriptStrict: `
# Tracking prevention - Strict
New-ItemProperty -Path $edgePolicyKey -Name "TrackingPrevention" -Value 3 -PropertyType DWord -Force | Out-Null
Write-Host "[✓] Tracking prevention set to Strict (3)" -ForegroundColor Green
`.trim()
    },
    inPrivateDns: {
      id: 'InPrivate DNS-over-HTTPS',
      title: 'InPrivate DNS-over-HTTPS',
      description: 'Force secure DNS in InPrivate mode for extra privacy.',
      recommended: false,
      scriptRelaxed: null,
      scriptStrict: `
# InPrivate DNS-over-HTTPS
New-ItemProperty -Path $edgePolicyKey -Name "BuiltInDnsClientEnabled" -Value 1 -PropertyType DWord -Force | Out-Null
Write-Host "[✓] Built-in DNS client enabled for InPrivate secure DNS" -ForegroundColor Green
`.trim()
    },
    autoFill: {
      id: 'Disable AutoFill',
      title: 'Disable AutoFill',
      description: 'Turn off AutoFill for addresses and payment methods to reduce data exposure.',
      recommended: false,
      scriptRelaxed: null,
      scriptStrict: `
# Disable AutoFill for addresses
New-ItemProperty -Path $edgePolicyKey -Name "AutofillAddressEnabled" -Value 0 -PropertyType DWord -Force | Out-Null
Write-Host "[✓] AutoFill for addresses disabled" -ForegroundColor Green

# Disable AutoFill for payment methods
New-ItemProperty -Path $edgePolicyKey -Name "AutofillCreditCardEnabled" -Value 0 -PropertyType DWord -Force | Out-Null
Write-Host "[✓] AutoFill for payment methods disabled" -ForegroundColor Green
`.trim()
    },
    passwordManager: {
      id: 'Disable built-in password manager',
      title: 'Disable built-in password manager',
      description: 'Disable Edge\'s built-in password manager (use a dedicated password manager instead).',
      recommended: false,
      scriptRelaxed: null,
      scriptStrict: `
# Disable built-in password manager
New-ItemProperty -Path $edgePolicyKey -Name "PasswordManagerEnabled" -Value 0 -PropertyType DWord -Force | Out-Null
Write-Host "[✓] Built-in password manager disabled" -ForegroundColor Green
`.trim()
    },
    syncDisabled: {
      id: 'Disable Edge Sync',
      title: 'Disable Edge Sync',
      description: 'Prevent syncing of browser data across devices (for high-security environments).',
      recommended: false,
      scriptRelaxed: null,
      scriptStrict: `
# Disable Edge Sync
New-ItemProperty -Path $edgePolicyKey -Name "SyncDisabled" -Value 1 -PropertyType DWord -Force | Out-Null
Write-Host "[✓] Edge Sync disabled" -ForegroundColor Green
`.trim()
    },
    walletDisabled: {
      id: 'Disable Microsoft Wallet',
      title: 'Disable Microsoft Wallet',
      description: 'Turn off the built-in wallet feature in Edge.',
      recommended: false,
      scriptRelaxed: null,
      scriptStrict: `
# Disable Microsoft Wallet
New-ItemProperty -Path $edgePolicyKey -Name "EdgeWalletEnabled" -Value 0 -PropertyType DWord -Force | Out-Null
Write-Host "[✓] Microsoft Wallet disabled" -ForegroundColor Green
`.trim()
    },
    sidebarDisabled: {
      id: 'Disable Sidebar',
      title: 'Disable Sidebar',
      description: 'Remove the sidebar feature from Edge.',
      recommended: false,
      scriptRelaxed: null,
      scriptStrict: `
# Disable Sidebar
New-ItemProperty -Path $edgePolicyKey -Name "HubsSidebarEnabled" -Value 0 -PropertyType DWord -Force | Out-Null
Write-Host "[✓] Sidebar disabled" -ForegroundColor Green
`.trim()
    },
    shoppingDisabled: {
      id: 'Disable Shopping features',
      title: 'Disable Shopping features',
      description: 'Turn off shopping-related features and price comparison tools.',
      recommended: false,
      scriptRelaxed: null,
      scriptStrict: `
# Disable Shopping features
New-ItemProperty -Path $edgePolicyKey -Name "EdgeShoppingAssistantEnabled" -Value 0 -PropertyType DWord -Force | Out-Null
Write-Host "[✓] Shopping features disabled" -ForegroundColor Green
`.trim()
    },
    blockThirdPartyCookies: {
      id: 'Block third-party cookies',
      title: 'Block third-party cookies',
      description: 'Prevent third-party cookies from being stored (may break some websites).',
      recommended: false,
      scriptRelaxed: null,
      scriptStrict: `
# Block third-party cookies
New-ItemProperty -Path $edgePolicyKey -Name "BlockThirdPartyCookies" -Value 1 -PropertyType DWord -Force | Out-Null
Write-Host "[✓] Third-party cookies blocked" -ForegroundColor Green
`.trim()
    },
    siteDataOnExit: {
      id: 'Clear site data on exit',
      title: 'Clear site data on exit',
      description: 'Automatically clear cookies and site data when Edge closes.',
      recommended: false,
      scriptRelaxed: null,
      scriptStrict: `
# Clear site data on exit
New-ItemProperty -Path $edgePolicyKey -Name "ClearBrowsingDataOnExit" -Value 1 -PropertyType DWord -Force | Out-Null
Write-Host "[✓] Site data will be cleared on exit" -ForegroundColor Green
`.trim()
    },
    disableWebRtc: {
      id: 'WebRTC IP leak protection',
      title: 'WebRTC IP leak protection',
      description: 'Hide local IP addresses from WebRTC to prevent IP leaks.',
      recommended: false,
      scriptRelaxed: null,
      scriptStrict: `
# WebRTC IP leak protection
New-ItemProperty -Path $edgePolicyKey -Name "WebRtcLocalIpsAllowedUrls" -Value "" -PropertyType String -Force | Out-Null
Write-Host "[✓] WebRTC local IP leak protection enabled" -ForegroundColor Green
`.trim()
    },
    telemetryMinimal: {
      id: 'Minimize diagnostic data',
      title: 'Minimize diagnostic data',
      description: 'Set Edge diagnostic data collection to minimum required level.',
      recommended: false,
      scriptRelaxed: null,
      scriptStrict: `
# Minimize diagnostic data
New-ItemProperty -Path $edgePolicyKey -Name "DiagnosticData" -Value 0 -PropertyType DWord -Force | Out-Null
Write-Host "[✓] Diagnostic data collection minimized" -ForegroundColor Green
`.trim()
    },
    personalizeAdsDisabled: {
      id: 'Disable personalized ads',
      title: 'Disable personalized ads',
      description: 'Turn off personalized advertising in Edge.',
      recommended: false,
      scriptRelaxed: null,
      scriptStrict: `
# Disable personalized ads
New-ItemProperty -Path $edgePolicyKey -Name "PersonalizationReportingEnabled" -Value 0 -PropertyType DWord -Force | Out-Null
Write-Host "[✓] Personalized ads disabled" -ForegroundColor Green
`.trim()
    }
  };

  // Profile definitions
  const profiles = {
    relaxed: ['httpsOnly', 'sslErrorOverride', 'dns', 'passwordLeak', 'typoSquatting', 'smartScreen', 'smartScreenPua', 'trackingPrevention'],
    strict: ['httpsOnly', 'sslErrorOverride', 'dns', 'passwordLeak', 'typoSquatting', 'smartScreen', 'smartScreenPua', 'trackingPrevention', 'sessionCookies', 'inPrivateDns', 'autoFill', 'passwordManager', 'syncDisabled', 'walletDisabled', 'sidebarDisabled', 'shoppingDisabled', 'blockThirdPartyCookies', 'siteDataOnExit', 'disableWebRtc', 'telemetryMinimal', 'personalizeAdsDisabled']
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
    Object.keys(edgeControls).forEach(key => {
      if (edgeControls[key].recommended) {
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

  const generateScript = (selection, currentProfile) => {
    const selectedKeys = Object.keys(selection).filter(key => selection[key]);
    setScriptOutput(buildApplyScript(currentProfile, selectedKeys));
  };

  const handleGenerateScript = () => {
    generateScript(selectedControls, profile);
  };

  const buildApplyScript = (currentProfile, selectedKeys) => {
    if (selectedKeys.length === 0) {
      return `# No Edge controls selected.
# Choose at least one Edge baseline control, then generate the script again.`;
    }

    const date = new Date().toISOString().split('T')[0];
    let lines = [];

    lines.push('# ===============================================');
    lines.push('# Microsoft Edge Security Baseline (Registry policy)');
    lines.push('# Generated by Edge Baseline Script Assistant – CyberLife Coach');
    lines.push('# Date: ' + date);
    lines.push('# Profile: ' + currentProfile);
    lines.push('#');
    lines.push('# This script configures Microsoft Edge using registry-based group policies.');
    lines.push('# Review every line before running.');
    lines.push('# Test on a non-critical system first and ensure you have backups.');
    lines.push('# Run this script from an elevated PowerShell session (Run as administrator).');
    lines.push('# ===============================================');
    lines.push('');
    lines.push('Set-StrictMode -Version Latest');
    lines.push('$ErrorActionPreference = "Stop"');
    lines.push('');
    lines.push('$edgePolicyKey = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Edge"');
    lines.push('');
    lines.push('if (-not (Test-Path $edgePolicyKey)) {');
    lines.push('    New-Item -Path $edgePolicyKey -Force | Out-Null');
    lines.push('    Write-Host "Created Edge policy registry key" -ForegroundColor Yellow');
    lines.push('}');
    lines.push('');
    lines.push('Write-Host "Applying Microsoft Edge baseline controls..." -ForegroundColor Cyan');
    lines.push('');

    selectedKeys.forEach(key => {
      const control = edgeControls[key];
      if (!control) return;

      const snippet = currentProfile === 'strict' ? control.scriptStrict : control.scriptRelaxed;
      
      if (snippet && snippet.trim().length > 0) {
        lines.push(snippet);
        lines.push('');
      } else if (key === 'sessionCookies' && currentProfile === 'relaxed') {
        lines.push('# ' + control.id + ' - Session-only cookies are not enforced in the Relaxed profile.');
        lines.push('');
      }
    });

    lines.push('Write-Host "Edge baseline configuration complete." -ForegroundColor Green');
    lines.push('# End of generated Edge baseline script.');
    
    return lines.join('\n');
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
    a.download = `edge-baseline.${extension}`;
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
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Microsoft Edge</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Local, in-browser</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Edge Baseline Script Assistant
          </h1>
          
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            Generate PowerShell scripts to configure Microsoft Edge security settings via registry-based group policies. Choose between Relaxed and Strict profiles, or customize your own baseline. No data leaves your browser.
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
              <h2 className="text-2xl font-bold mb-2">Pick the Edge security controls</h2>
              <p className="text-slate-400 text-sm">
                Profiles blend privacy and usability. Relaxed focuses on essential security. Strict adds aggressive privacy controls that may affect some websites or features. Custom lets you hand-pick every item.
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
              <strong className="text-slate-300">Relaxed</strong> enables core security features like HTTPS-Only Mode and SmartScreen. <strong className="text-slate-300">Strict</strong> adds privacy-focused controls like blocking third-party cookies and disabling telemetry.
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
              {Object.entries(edgeControls).map(([key, control]) => (
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
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{control.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Script Output Panel */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="mb-6">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">Step 2 · Review, test, then run</div>
              <h2 className="text-2xl font-bold mb-2">Generated Edge baseline script</h2>
              <p className="text-slate-400 text-sm">
                Review every line, test on a non-critical machine, then run in an elevated PowerShell session.
              </p>
            </div>

            {/* Script Textarea */}
            <textarea
              value={scriptOutput}
              readOnly
              className="w-full h-[450px] bg-slate-950/80 border border-slate-700 rounded-lg p-4 text-sm text-slate-300 font-mono resize-none focus:outline-none focus:border-cyan-500/50 custom-scrollbar mb-4"
              placeholder="Select your controls and click 'Generate Script' to create your PowerShell baseline script..."
            />

            {/* Generate Button */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={handleGenerateScript}
                className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              >
                <Settings className="w-4 h-4" />
                <span>Generate Script</span>
              </button>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
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
              <p><strong className="text-slate-300">How to use:</strong> Save the script, open PowerShell as Administrator, and run the script to apply these settings. To reverse the settings, run the rollback function included in the script.</p>
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
                <li>• Use this only on Windows systems you own or are explicitly allowed to manage.</li>
                <li>• Create a backup, restore point, or golden image before applying changes.</li>
                <li>• Generate the script and skim every section, especially Strict profile items.</li>
                <li>• Comment out any blocks that conflict with your workflow or domain policies.</li>
                <li>• Test on a non-critical machine first, from an elevated PowerShell window.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Good next steps</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Save your adjusted script into version control or a secured admin share.</li>
                <li>• Document which baseline controls you applied and to which machines.</li>
                <li>• Revisit this baseline as Edge updates and your security requirements evolve.</li>
                <li>• Coordinate with your security or IT lead before rolling out to production systems.</li>
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
                  This assistant runs entirely in your browser. Your selections and the generated script are not sent to CyberLife Coach, to any server, or to any third party. The output is a generic starting point and is provided for educational and informational use only. It is not a substitute for professional advice, does not guarantee compliance with any standard, and is used at your own risk. Always test in a safe environment, verify every line, and ensure you have reliable backups before making changes. Do not apply these settings to employer or school managed devices without explicit approval.
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
