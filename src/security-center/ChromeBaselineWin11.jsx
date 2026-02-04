import React, { useState } from 'react';
import { Shield, ArrowLeft, Copy, Download, Trash2, Settings, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function ChromeBaselineWin11() {
  const [profile, setProfile] = useState('relaxed');
  const [selectedControls, setSelectedControls] = useState({});
  const [scriptOutput, setScriptOutput] = useState('');

  // Chrome control definitions with script snippets
  const chromeControls = {
    blockPopups: {
      id: 'Block pop-ups for all sites',
      title: 'Block pop-ups for all sites',
      description: 'Turns off intrusive pop-ups globally, which reduces drive-by scams and fake system alerts.',
      recommended: true,
      script: `# Block pop-ups in Chrome
Write-Host "Blocking unwanted pop-ups in Chrome..." -ForegroundColor Cyan
Set-ChromePolicyValue -Name "DefaultPopupsSetting" -Type DWord -Value 2
# 2 = Block pop-ups for all sites.`,
      rollback: `# Roll back: remove Chrome pop-up policy if present
Remove-ChromePolicyValue -Name "DefaultPopupsSetting"`
    },
    safeBrowsing: {
      id: 'Enable Safe Browsing protection',
      title: 'Enable Safe Browsing protection',
      description: 'Enforces Safe Browsing so known malicious sites and downloads are blocked before they land on disk.',
      recommended: true,
      highImpact: true,
      script: `# Enable Safe Browsing protection in Chrome
Write-Host "Enforcing Safe Browsing protection in Chrome..." -ForegroundColor Cyan
Set-ChromePolicyValue -Name "SafeBrowsingProtectionLevel" -Type DWord -Value 1
# 1 = Standard Safe Browsing. Set to 2 manually if enhanced protection is required everywhere.`,
      rollback: `# Roll back: remove Safe Browsing policy value
Remove-ChromePolicyValue -Name "SafeBrowsingProtectionLevel"`
    },
    hardenDownloads: {
      id: 'Tighten download restrictions',
      title: 'Tighten download restrictions',
      description: 'Applies a stricter download policy that blocks more unwanted or uncommon files from the browser side.',
      recommended: false,
      strict: true,
      script: `# Tighten Chrome download restrictions
Write-Host "Applying stricter download restrictions in Chrome..." -ForegroundColor Cyan
Set-ChromePolicyValue -Name "DownloadRestrictions" -Type DWord -Value 2
# 2 = Block dangerous downloads and warn on more unwanted content.`,
      rollback: `# Roll back: remove download restrictions policy
Remove-ChromePolicyValue -Name "DownloadRestrictions"`
    },
    locationPrompt: {
      id: 'Block sites from tracking physical location',
      title: 'Block sites from tracking physical location',
      description: 'Configures Chrome so no site is allowed to track the user\'s physical location by default, mirroring STIG control V-221559 behavior on Windows.',
      recommended: true,
      script: `# Block sites from tracking physical location (similar to STIG V-221559)
Write-Host "Blocking sites from tracking physical location in Chrome..." -ForegroundColor Cyan
Set-ChromePolicyValue -Name "DefaultGeolocationSetting" -Type DWord -Value 2
# 2 = Do not allow any site to track the user's physical location.`,
      rollback: `# Roll back: remove geolocation default policy
Remove-ChromePolicyValue -Name "DefaultGeolocationSetting"`
    },
    blockThirdPartyCookies: {
      id: 'Block third party cookies',
      title: 'Block third party cookies',
      description: 'Stops most cross-site tracking cookies while allowing core sign-in cookies to keep working for day to day browsing.',
      recommended: true,
      script: `# Block third-party cookies to reduce cross-site tracking
Write-Host "Blocking third-party cookies in Chrome..." -ForegroundColor Cyan
Set-ChromePolicyValue -Name "BlockThirdPartyCookies" -Type DWord -Value 1
# 1 = Block third-party cookies by policy.`,
      rollback: `# Roll back: remove third-party cookie policy
Remove-ChromePolicyValue -Name "BlockThirdPartyCookies"`
    },
    blockWebUsb: {
      id: 'Block WebUSB access from sites',
      title: 'Block WebUSB access from sites',
      description: 'Prevents websites from talking directly to USB devices such as hardware tokens or lab equipment via WebUSB.',
      recommended: true,
      deviceSurface: true,
      script: `# Block WebUSB access from websites
Write-Host "Blocking WebUSB access from sites..." -ForegroundColor Cyan
Set-ChromePolicyValue -Name "DefaultWebUsbGuardSetting" -Type DWord -Value 2
# 2 = Block sites from directly talking to USB devices.`,
      rollback: `# Roll back: remove WebUSB guard setting
Remove-ChromePolicyValue -Name "DefaultWebUsbGuardSetting"`
    },
    disableTelemetry: {
      id: 'Disable metrics and anonymized URL data to Google',
      title: 'Disable metrics and anonymized URL data to Google',
      description: 'Turns off Chrome metrics reporting and URL-keyed anonymized data collection so crash reports and visited URLs are not sent upstream, satisfying V-221575 and V-221597 style requirements.',
      recommended: true,
      script: `# Disable Chrome metrics and URL-keyed anonymized data collection
Write-Host "Disabling Chrome metrics reporting and anonymized URL-keyed data collection..." -ForegroundColor Cyan
Set-ChromePolicyValue -Name "MetricsReportingEnabled" -Type DWord -Value 0
Set-ChromePolicyValue -Name "UrlKeyedAnonymizedDataCollectionEnabled" -Type DWord -Value 0
# MetricsReportingEnabled = 0 stops Chrome usage and crash metrics.
# UrlKeyedAnonymizedDataCollectionEnabled = 0 stops URL-keyed anonymized data from being sent to Google.`,
      rollback: `# Roll back: remove metrics and URL-keyed anonymized data policy values
Remove-ChromePolicyValue -Name "MetricsReportingEnabled"
Remove-ChromePolicyValue -Name "UrlKeyedAnonymizedDataCollectionEnabled"`
    },
    syncDisabled: {
      id: 'Disable Google data synchronization (Sync)',
      title: 'Disable Google data synchronization (Sync)',
      description: 'Disables Google Sync so bookmarks, history, and other profile data are not copied to Google servers.',
      recommended: true,
      script: `# Disable Google data synchronization (Sync)
Write-Host "Disabling Chrome Sync so data is not stored on Google servers..." -ForegroundColor Cyan
Set-ChromePolicyValue -Name "SyncDisabled" -Type DWord -Value 1
# 1 = Sync is disabled and the user cannot enable it.`,
      rollback: `# Roll back: remove SyncDisabled policy
Remove-ChromePolicyValue -Name "SyncDisabled"`
    },
    firewallTraversal: {
      id: 'Disable firewall traversal for Chrome Remote Desktop host',
      title: 'Disable firewall traversal for Chrome Remote Desktop host',
      description: 'Prevents remote clients from bypassing firewalls using STUN and relay servers to reach this Windows host.',
      recommended: true,
      remoteAccess: true,
      script: `# Disable firewall traversal from Chrome Remote Desktop host
Write-Host "Disabling Chrome Remote Desktop host firewall traversal..." -ForegroundColor Cyan
Set-ChromePolicyValue -Name "RemoteAccessHostFirewallTraversal" -Type DWord -Value 0
# 0 = Disallow firewall traversal, preventing remote clients from bypassing firewall controls using STUN and relay.`,
      rollback: `# Roll back: remove RemoteAccessHostFirewallTraversal policy
Remove-ChromePolicyValue -Name "RemoteAccessHostFirewallTraversal"`
    },
    revocationChecks: {
      id: 'Enable online certificate revocation checks',
      title: 'Enable online certificate revocation checks',
      description: 'Ensures Chrome performs online OCSP and CRL checks so revoked certificates are not silently trusted.',
      recommended: true,
      script: `# Enable online certificate revocation checks
Write-Host "Enabling online certificate revocation checks (OCSP and CRL) in Chrome..." -ForegroundColor Cyan
Set-ChromePolicyValue -Name "EnableOnlineRevocationChecks" -Type DWord -Value 1
# 1 = Chrome performs online revocation checks for certificates.`,
      rollback: `# Roll back: remove EnableOnlineRevocationChecks policy
Remove-ChromePolicyValue -Name "EnableOnlineRevocationChecks"`
    },
    sessionOnlyCookies: {
      id: 'Use session-only, ephemeral profiles',
      title: 'Use session-only, ephemeral profiles',
      description: 'Treats Chrome profiles as short lived so data is discarded when Chrome closes. This behaves like session-only cookies and can sign users out frequently, so test carefully first.',
      recommended: false,
      veryStrict: true,
      script: `# Use ephemeral Chrome profiles (approximate "session-only" behavior)
Write-Host "Enabling ephemeral Chrome profiles (session-only style)..." -ForegroundColor Cyan
Set-ChromePolicyValue -Name "ForceEphemeralProfiles" -Type DWord -Value 1
# This can cause Chrome to discard profile data and sign-ins when the browser closes.
# Apply only where this behavior has been tested and communicated to users.`,
      rollback: `# Roll back: remove ForceEphemeralProfiles policy
Remove-ChromePolicyValue -Name "ForceEphemeralProfiles"`
    }
  };

  // Profile definitions
  const profiles = {
    relaxed: ['blockPopups', 'safeBrowsing', 'locationPrompt', 'blockThirdPartyCookies', 'blockWebUsb', 'disableTelemetry', 'syncDisabled', 'firewallTraversal', 'revocationChecks'],
    strict: ['blockPopups', 'safeBrowsing', 'locationPrompt', 'blockThirdPartyCookies', 'blockWebUsb', 'disableTelemetry', 'syncDisabled', 'firewallTraversal', 'revocationChecks', 'hardenDownloads', 'sessionOnlyCookies']
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
    Object.keys(chromeControls).forEach(key => {
      if (chromeControls[key].recommended) {
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
      setScriptOutput(`# No Chrome controls selected.
# Select at least one baseline action, then generate the script again.`);
      return;
    }

    const date = new Date().toISOString().split('T')[0];
    const profileLabel = profile === 'relaxed' ? 'Relaxed' : profile === 'strict' ? 'Strict' : 'Custom';
    let lines = [];

    lines.push('# Chrome Security Baseline Script (Windows 11)');
    lines.push('# Generated by Chrome Security Baseline Script Assistant – CyberLife Coach');
    lines.push('# Date: ' + date);
    lines.push('# Profile: ' + profileLabel);
    lines.push('#');
    lines.push('# This script writes Chrome policy values under:');
    lines.push('#   HKLM:\\SOFTWARE\\Policies\\Google\\Chrome');
    lines.push('#');
    lines.push('# Review every line before running.');
    lines.push('# Test on a non-critical Windows 11 system first and ensure you have backups and a rollback plan.');
    lines.push('# Run this script from an elevated PowerShell session, for example:');
    lines.push('#   .\\chrome-win11-baseline.ps1 -Mode Apply');
    lines.push('# To roll back the specific keys created by this script:');
    lines.push('#   .\\chrome-win11-baseline.ps1 -Mode Rollback');
    lines.push('#');
    lines.push('');

    lines.push('param(');
    lines.push('    [ValidateSet("Apply","Rollback")]');
    lines.push('    [string]$Mode = "Apply"');
    lines.push(')');
    lines.push('');
    lines.push('Set-StrictMode -Version Latest');
    lines.push('$ErrorActionPreference = "Stop"');
    lines.push('');
    lines.push('$ProfileLabel = "' + profileLabel + '"');
    lines.push('$PolicyPath  = "HKLM:\\\\SOFTWARE\\\\Policies\\\\Google\\\\Chrome"');
    lines.push('$BackupRoot  = "C:\\\\SecurityTools\\\\ChromeBaseline"');
    lines.push('$Timestamp   = Get-Date -Format "yyyy-MM-ddTHH-mm-ssZ"');
    lines.push('');
    lines.push('function Ensure-ChromePolicyPath {');
    lines.push('    if (-not (Test-Path -Path $PolicyPath)) {');
    lines.push('        New-Item -Path $PolicyPath -Force | Out-Null');
    lines.push('    }');
    lines.push('    if (-not (Test-Path -Path $BackupRoot)) {');
    lines.push('        New-Item -Path $BackupRoot -ItemType Directory -Force | Out-Null');
    lines.push('    }');
    lines.push('}');
    lines.push('');
    lines.push('function Backup-ChromePolicy {');
    lines.push('    if (Test-Path -Path $PolicyPath) {');
    lines.push('        $backupFile = Join-Path $BackupRoot ("ChromePolicy.backup.{0}.reg" -f $Timestamp)');
    lines.push('        Write-Host "Backing up existing Chrome policy key to $backupFile" -ForegroundColor Yellow');
    lines.push('        & reg.exe export "HKLM\\SOFTWARE\\Policies\\Google\\Chrome" "$backupFile" /y | Out-Null');
    lines.push('    } else {');
    lines.push('        Write-Host "No existing HKLM\\SOFTWARE\\Policies\\Google\\Chrome key found. A new one will be created." -ForegroundColor Yellow');
    lines.push('    }');
    lines.push('}');
    lines.push('');
    lines.push('function Set-ChromePolicyValue {');
    lines.push('    param(');
    lines.push('        [Parameter(Mandatory)] [string]$Name,');
    lines.push('        [Parameter(Mandatory)] [ValidateSet("String","DWord")] [string]$Type,');
    lines.push('        [Parameter(Mandatory)] [Object]$Value');
    lines.push('    )');
    lines.push('');
    lines.push('    if (-not (Test-Path -Path $PolicyPath)) {');
    lines.push('        New-Item -Path $PolicyPath -Force | Out-Null');
    lines.push('    }');
    lines.push('');
    lines.push('    if ($Type -eq "DWord") {');
    lines.push('        if (Get-ItemProperty -Path $PolicyPath -Name $Name -ErrorAction SilentlyContinue) {');
    lines.push('            Set-ItemProperty -Path $PolicyPath -Name $Name -Value ([int]$Value) -Type DWord');
    lines.push('        } else {');
    lines.push('            New-ItemProperty -Path $PolicyPath -Name $Name -PropertyType DWord -Value ([int]$Value) -Force | Out-Null');
    lines.push('        }');
    lines.push('    } else {');
    lines.push('        if (Get-ItemProperty -Path $PolicyPath -Name $Name -ErrorAction SilentlyContinue) {');
    lines.push('            Set-ItemProperty -Path $PolicyPath -Name $Name -Value ([string]$Value) -Type String');
    lines.push('        } else {');
    lines.push('            New-ItemProperty -Path $PolicyPath -Name $Name -PropertyType String -Value ([string]$Value) -Force | Out-Null');
    lines.push('        }');
    lines.push('    }');
    lines.push('}');
    lines.push('');
    lines.push('function Remove-ChromePolicyValue {');
    lines.push('    param(');
    lines.push('        [Parameter(Mandatory)] [string]$Name');
    lines.push('    )');
    lines.push('');
    lines.push('    if (Test-Path -Path $PolicyPath) {');
    lines.push('        if (Get-ItemProperty -Path $PolicyPath -Name $Name -ErrorAction SilentlyContinue) {');
    lines.push('            Remove-ItemProperty -Path $PolicyPath -Name $Name -ErrorAction SilentlyContinue');
    lines.push('        }');
    lines.push('    }');
    lines.push('}');
    lines.push('');
    lines.push('function Apply-ChromeBaseline {');
    lines.push('    Write-Host "Applying Chrome security baseline (profile: $ProfileLabel)..." -ForegroundColor Cyan');
    lines.push('    Ensure-ChromePolicyPath');
    lines.push('    Backup-ChromePolicy');
    lines.push('    Write-Host "Writing policy values under $PolicyPath" -ForegroundColor Cyan');
    lines.push('');

    selectedKeys.forEach(key => {
      const control = chromeControls[key];
      if (control && control.script) {
        control.script.split('\n').forEach(line => {
          lines.push('    ' + line);
        });
        lines.push('');
      }
    });

    lines.push('    Write-Host "Baseline apply complete. Restart Chrome for all changes to take effect." -ForegroundColor Green');
    lines.push('}');
    lines.push('');
    lines.push('function Undo-ChromeBaseline {');
    lines.push('    Write-Host "Rolling back Chrome security baseline keys created by this script..." -ForegroundColor Yellow');
    lines.push('    Ensure-ChromePolicyPath');
    lines.push('');

    selectedKeys.forEach(key => {
      const control = chromeControls[key];
      if (control && control.rollback) {
        control.rollback.split('\n').forEach(line => {
          lines.push('    ' + line);
        });
        lines.push('');
      }
    });

    lines.push('    Write-Host "Rollback complete. Other tools or policies may still enforce additional Chrome settings." -ForegroundColor Green');
    lines.push('}');
    lines.push('');
    lines.push('switch ($Mode) {');
    lines.push('    "Apply"    { Apply-ChromeBaseline }');
    lines.push('    "Rollback" { Undo-ChromeBaseline }');
    lines.push('    default    {');
    lines.push('        Write-Host "Usage: .\\chrome-win11-baseline.ps1 -Mode Apply|Rollback" -ForegroundColor Yellow');
    lines.push('        exit 1');
    lines.push('    }');
    lines.push('}');
    lines.push('');
    lines.push('# End of generated Chrome Windows 11 baseline script.');
    
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
    a.download = `chrome-win11-baseline.${extension}`;
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
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Google Chrome</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Local, in-browser</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Chrome Baseline Script Assistant
          </h1>
          
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            Choose a focused set of Chrome hardening steps and this assistant will build a PowerShell script you can review, test, then run from an elevated console on Windows 11 systems you manage. No data leaves your browser.
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
              <h2 className="text-2xl font-bold mb-2">Pick the Chrome security controls</h2>
              <p className="text-slate-400 text-sm">
                Start with the Relaxed profile, then move to Strict if you are comfortable with more breakage. You can always regenerate and refine the script.
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
              <strong className="text-slate-300">Relaxed</strong> keeps most sites working while blocking obvious tracking and scams. <strong className="text-slate-300">Strict</strong> adds tighter cookie and download rules and may break some sign-ins or remote access tools.
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
              {Object.entries(chromeControls).map(([key, control]) => (
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
                      {control.highImpact && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                          High impact
                        </span>
                      )}
                      {control.deviceSurface && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 border border-slate-600">
                          Device surface
                        </span>
                      )}
                      {control.remoteAccess && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 border border-slate-600">
                          Remote access
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{control.description}</p>
                  </div>
                </label>
              ))}
            </div>

            <p className="text-sm text-slate-500 mt-6">
              <strong className="text-slate-300">Tip:</strong> For most personal or small office systems, Relaxed is a good starting point. Move to Strict only after you have tested how it affects logins, Chrome Remote Desktop, and extensions.
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
              <h2 className="text-2xl font-bold mb-2">Generated Chrome baseline PowerShell script</h2>
              <p className="text-slate-400 text-sm">
                Review every line, test on a non-critical Windows 11 system, then run from an elevated PowerShell session.
              </p>
            </div>

            {/* Script Textarea */}
            <textarea
              value={scriptOutput}
              readOnly
              className="w-full h-[450px] bg-slate-950/80 border border-slate-700 rounded-lg p-4 text-sm text-slate-300 font-mono resize-none focus:outline-none focus:border-cyan-500/50 custom-scrollbar mb-4"
              placeholder="Select your controls and click 'Generate PowerShell script' to create your Chrome baseline script..."
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
              <p><strong className="text-slate-300">How to use:</strong> Save the script as something like <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">chrome-win11-baseline.ps1</code>, then from an elevated PowerShell session run <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">.\chrome-win11-baseline.ps1 -Mode Apply</code> to apply the selected policies.</p>
              <p><strong className="text-slate-300">Rollback:</strong> To roll back the specific Chrome policy values created by this script on that machine, run <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">.\chrome-win11-baseline.ps1 -Mode Rollback</code> from an elevated PowerShell window.</p>
              <p><strong className="text-slate-300">Scope of rollback:</strong> The rollback mode only removes policy values created by this assistant under <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">HKLM:\SOFTWARE\Policies\Google\Chrome</code>. It does not override existing GPOs, MDM policies, or user-level Chrome settings.</p>
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
                <li>• Create a backup or restore point for at least one test system.</li>
                <li>• Export existing Chrome policy keys before changes using: <code className="text-cyan-400 text-xs">reg export "HKLM\SOFTWARE\Policies\Google\Chrome" ".\chrome-policy-backup.reg" /y</code></li>
                <li>• Generate the script and read the comments above each command.</li>
                <li>• Remove anything that does not fit your environment or policies.</li>
                <li>• Test first on a non-critical system from an elevated PowerShell console.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Good next steps</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Save your adjusted script in a safe folder or version control.</li>
                <li>• Document which controls you applied, and on which systems.</li>
                <li>• Consider moving long-term settings into GPO, Intune, or another MDM.</li>
                <li>• Revisit your baseline as Chrome and your needs evolve.</li>
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
                  This assistant runs entirely in your browser. Your selections and the generated script are not sent to CyberLife Coach, to Google, or to any third party. The output is a generic starting point and is provided for educational and informational use only. It is not a substitute for professional advice, does not guarantee compliance with any standard, and is used at your own risk. Always test in a safe environment, verify every line, and ensure you have reliable backups before making changes. Do not apply these settings to employer or school managed devices without explicit approval, and do not bypass existing Group Policy, Intune, or other enterprise management tools.
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
