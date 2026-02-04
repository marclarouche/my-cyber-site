import React, { useState, useEffect } from 'react';
import { Shield, ArrowLeft, Copy, Download, Trash2, Settings, AlertTriangle } from 'lucide-react';

export default function OneDriveBaselineAssistant() {
  const [profile, setProfile] = useState('relaxed');
  const [selectedControls, setSelectedControls] = useState({});
  const [scriptOutput, setScriptOutput] = useState('');
  const [downloadFormat, setDownloadFormat] = useState('ps1');

  // Control definitions with script snippets
  const controlSnippets = {
    disableHttpCreds: {
      title: 'Disable usernames and passwords in URLs',
      description: 'Stops links that try to embed credentials directly in the URL, which reduces spoofing and phishing risk when content launches from OneDrive or Office.',
      recommended: true,
      scriptLines: [
        '# Disable usernames and passwords in URLs for groove.exe',
        'Write-Host "Disabling usernames and passwords in URLs for groove.exe..." -ForegroundColor Cyan',
        '$featureControlBase = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl"',
        '$featurePath = Join-Path $featureControlBase "FEATURE_HTTP_USERNAME_PASSWORD_DISABLE"',
        'if (-not (Test-Path $featurePath)) {',
        '    New-Item -Path $featurePath -Force | Out-Null',
        '}',
        'New-ItemProperty -Path $featurePath -Name "groove.exe" -Value 1 -PropertyType DWord -Force | Out-Null',
        '# 1 = Disable username and password usage in URLs for groove.exe.'
      ],
      rollbackLines: [
        '# Roll back: remove username/password in URL setting for groove.exe',
        'Write-Host "Rolling back username/password URL setting for groove.exe..." -ForegroundColor Yellow',
        '$featureControlBase = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl"',
        '$featurePath = Join-Path $featureControlBase "FEATURE_HTTP_USERNAME_PASSWORD_DISABLE"',
        'if (Test-Path $featurePath) {',
        '    Remove-ItemProperty -Path $featurePath -Name "groove.exe" -ErrorAction SilentlyContinue',
        '}'
      ]
    },
    savedFromUrl: {
      title: 'Enforce "saved from URL" Internet zone markings',
      description: 'Keeps the "downloaded from the Internet" mark on files so Windows continues to treat them as Internet-zone content instead of silently trusting them.',
      recommended: true,
      scriptLines: [
        '# Enforce saved-from-URL mark so Internet zone is preserved',
        'Write-Host "Enforcing saved-from-URL marks for groove.exe..." -ForegroundColor Cyan',
        '$featureControlBase = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl"',
        '$featurePath = Join-Path $featureControlBase "FEATURE_UNC_SAVEDFILECHECK"',
        'if (-not (Test-Path $featurePath)) {',
        '    New-Item -Path $featurePath -Force | Out-Null',
        '}',
        'New-ItemProperty -Path $featurePath -Name "groove.exe" -Value 1 -PropertyType DWord -Force | Out-Null',
        '# 1 = Enforce saved-from-URL checks so files retain Internet-zone behavior.'
      ],
      rollbackLines: [
        '# Roll back: remove saved-from-URL enforcement for groove.exe',
        'Write-Host "Rolling back saved-from-URL enforcement for groove.exe..." -ForegroundColor Yellow',
        '$featureControlBase = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl"',
        '$featurePath = Join-Path $featureControlBase "FEATURE_UNC_SAVEDFILECHECK"',
        'if (Test-Path $featurePath) {',
        '    Remove-ItemProperty -Path $featurePath -Name "groove.exe" -ErrorAction SilentlyContinue',
        '}'
      ]
    },
    validateNavigateUrl: {
      title: 'Validate navigation URLs',
      description: 'Forces the underlying browser engine to validate navigation targets so malformed or tampered URLs opened by OneDrive are less likely to be used.',
      recommended: true,
      scriptLines: [
        '# Validate navigation URLs launched by groove.exe',
        'Write-Host "Enabling navigation URL validation for groove.exe..." -ForegroundColor Cyan',
        '$featureControlBase = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl"',
        '$featurePath = Join-Path $featureControlBase "FEATURE_VALIDATE_NAVIGATE_URL"',
        'if (-not (Test-Path $featurePath)) {',
        '    New-Item -Path $featurePath -Force | Out-Null',
        '}',
        'New-ItemProperty -Path $featurePath -Name "groove.exe" -Value 1 -PropertyType DWord -Force | Out-Null',
        '# 1 = Validate navigation URLs before use.'
      ],
      rollbackLines: [
        '# Roll back: remove navigation URL validation for groove.exe',
        'Write-Host "Rolling back navigation URL validation for groove.exe..." -ForegroundColor Yellow',
        '$featureControlBase = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl"',
        '$featurePath = Join-Path $featureControlBase "FEATURE_VALIDATE_NAVIGATE_URL"',
        'if (Test-Path $featurePath) {',
        '    Remove-ItemProperty -Path $featurePath -Name "groove.exe" -ErrorAction SilentlyContinue',
        '}'
      ]
    },
    windowRestrictions: {
      title: 'Apply scripted window restrictions',
      description: 'Makes it harder for scripts to open deceptive or hidden windows that could mimic system prompts or trusted sites when launched from Office content.',
      recommended: true,
      tags: ['UI surface'],
      scriptLines: [
        '# Apply scripted window restrictions for groove.exe',
        'Write-Host "Enabling scripted window restrictions for groove.exe..." -ForegroundColor Cyan',
        '$featureControlBase = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl"',
        '$featurePath = Join-Path $featureControlBase "FEATURE_WINDOW_RESTRICTIONS"',
        'if (-not (Test-Path $featurePath)) {',
        '    New-Item -Path $featurePath -Force | Out-Null',
        '}',
        'New-ItemProperty -Path $featurePath -Name "groove.exe" -Value 1 -PropertyType DWord -Force | Out-Null',
        '# 1 = Apply scripted window restrictions for this process.'
      ],
      rollbackLines: [
        '# Roll back: remove window restrictions setting for groove.exe',
        'Write-Host "Rolling back scripted window restrictions for groove.exe..." -ForegroundColor Yellow',
        '$featureControlBase = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl"',
        '$featurePath = Join-Path $featureControlBase "FEATURE_WINDOW_RESTRICTIONS"',
        'if (Test-Path $featurePath) {',
        '    Remove-ItemProperty -Path $featurePath -Name "groove.exe" -ErrorAction SilentlyContinue',
        '}'
      ]
    },
    popupManagement: {
      title: 'Block pop ups from embedded browser sessions',
      description: 'Reduces noisy or malicious pop ups that might appear when OneDrive or Office load external pages for sharing or file previews.',
      recommended: true,
      scriptLines: [
        '# Block pop ups for embedded browser sessions used by groove.exe',
        'Write-Host "Blocking pop ups for groove.exe sessions..." -ForegroundColor Cyan',
        '$featureControlBase = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl"',
        '$featurePath = Join-Path $featureControlBase "FEATURE_WEBOC_POPUPMANAGEMENT"',
        'if (-not (Test-Path $featurePath)) {',
        '    New-Item -Path $featurePath -Force | Out-Null',
        '}',
        'New-ItemProperty -Path $featurePath -Name "groove.exe" -Value 1 -PropertyType DWord -Force | Out-Null',
        '# 1 = Enable pop up management for this process.'
      ],
      rollbackLines: [
        '# Roll back: remove pop up management setting for groove.exe',
        'Write-Host "Rolling back pop up management for groove.exe..." -ForegroundColor Yellow',
        '$featureControlBase = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl"',
        '$featurePath = Join-Path $featureControlBase "FEATURE_WEBOC_POPUPMANAGEMENT"',
        'if (Test-Path $featurePath) {',
        '    Remove-ItemProperty -Path $featurePath -Name "groove.exe" -ErrorAction SilentlyContinue',
        '}'
      ]
    },
    restrictFileDownload: {
      title: 'Restrict scripted file downloads',
      description: 'Tightens download behavior so silent or scripted downloads are less likely, which helps contain drive-by payloads and unwanted executables.',
      recommended: true,
      impact: true,
      scriptLines: [
        '# Restrict scripted file downloads for groove.exe',
        'Write-Host "Restricting scripted file downloads for groove.exe..." -ForegroundColor Cyan',
        '$featureControlBase = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl"',
        '$featurePath = Join-Path $featureControlBase "FEATURE_RESTRICT_FILEDOWNLOAD"',
        'if (-not (Test-Path $featurePath)) {',
        '    New-Item -Path $featurePath -Force | Out-Null',
        '}',
        'New-ItemProperty -Path $featurePath -Name "groove.exe" -Value 1 -PropertyType DWord -Force | Out-Null',
        '# 1 = Restrict scripted file downloads for this process.'
      ],
      rollbackLines: [
        '# Roll back: remove file download restriction for groove.exe',
        'Write-Host "Rolling back file download restrictions for groove.exe..." -ForegroundColor Yellow',
        '$featureControlBase = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl"',
        '$featurePath = Join-Path $featureControlBase "FEATURE_RESTRICT_FILEDOWNLOAD"',
        'if (Test-Path $featurePath) {',
        '    Remove-ItemProperty -Path $featurePath -Name "groove.exe" -ErrorAction SilentlyContinue',
        '}'
      ]
    },
    zoneElevation: {
      title: 'Block zone elevation for web content',
      description: 'Prevents Internet-zone content opened by OneDrive from quietly moving into a more trusted zone like the local machine zone.',
      recommended: true,
      scriptLines: [
        '# Prevent zone elevation for content launched by groove.exe',
        'Write-Host "Preventing zone elevation for groove.exe..." -ForegroundColor Cyan',
        '$featureControlBase = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl"',
        '$featurePath = Join-Path $featureControlBase "FEATURE_ZONE_ELEVATION"',
        'if (-not (Test-Path $featurePath)) {',
        '    New-Item -Path $featurePath -Force | Out-Null',
        '}',
        'New-ItemProperty -Path $featurePath -Name "groove.exe" -Value 1 -PropertyType DWord -Force | Out-Null',
        '# 1 = Block zone elevation attempts for this process.'
      ],
      rollbackLines: [
        '# Roll back: remove zone elevation restriction for groove.exe',
        'Write-Host "Rolling back zone elevation restriction for groove.exe..." -ForegroundColor Yellow',
        '$featureControlBase = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl"',
        '$featurePath = Join-Path $featureControlBase "FEATURE_ZONE_ELEVATION"',
        'if (Test-Path $featurePath) {',
        '    Remove-ItemProperty -Path $featurePath -Name "groove.exe" -ErrorAction SilentlyContinue',
        '}'
      ]
    },
    restrictActiveXInstall: {
      title: 'Restrict ActiveX installs',
      description: 'Reduces prompts to install legacy ActiveX controls from pages that OneDrive or Office might launch, which closes off a class of older exploit paths.',
      recommended: true,
      tags: ['Legacy surface'],
      scriptLines: [
        '# Restrict ActiveX installs for content launched by groove.exe',
        'Write-Host "Restricting ActiveX installs for groove.exe..." -ForegroundColor Cyan',
        '$featureControlBase = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl"',
        '$featurePath = Join-Path $featureControlBase "FEATURE_RESTRICT_ACTIVEXINSTALL"',
        'if (-not (Test-Path $featurePath)) {',
        '    New-Item -Path $featurePath -Force | Out-Null',
        '}',
        'New-ItemProperty -Path $featurePath -Name "groove.exe" -Value 1 -PropertyType DWord -Force | Out-Null',
        '# 1 = Restrict ActiveX installation prompts for this process.'
      ],
      rollbackLines: [
        '# Roll back: remove ActiveX install restriction for groove.exe',
        'Write-Host "Rolling back ActiveX install restriction for groove.exe..." -ForegroundColor Yellow',
        '$featureControlBase = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl"',
        '$featurePath = Join-Path $featureControlBase "FEATURE_RESTRICT_ACTIVEXINSTALL"',
        'if (Test-Path $featurePath) {',
        '    Remove-ItemProperty -Path $featurePath -Name "groove.exe" -ErrorAction SilentlyContinue',
        '}'
      ]
    }
  };

  const profiles = {
    relaxed: [
      'disableHttpCreds',
      'savedFromUrl',
      'validateNavigateUrl',
      'windowRestrictions',
      'popupManagement',
      'zoneElevation',
      'restrictActiveXInstall'
    ],
    strict: [
      'disableHttpCreds',
      'savedFromUrl',
      'validateNavigateUrl',
      'windowRestrictions',
      'popupManagement',
      'restrictFileDownload',
      'zoneElevation',
      'restrictActiveXInstall'
    ]
  };

  useEffect(() => {
    applyProfile(profile);
  }, []);

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

  const clearAll = () => {
    setSelectedControls({});
    setProfile('custom');
    setScriptOutput('# No OneDrive controls selected.\n# Select at least one action or pick a profile, then generate the script again.');
  };

  const generateScript = (selection, profileName) => {
    const selectedKeys = Object.keys(selection).filter(k => selection[k]);
    
    if (!selectedKeys.length) {
      setScriptOutput('# No OneDrive controls selected.\n# Select at least one action or pick a profile, then generate the script again.');
      return;
    }

    const dateStr = new Date().toISOString().slice(0, 10);
    let profileLabel;
    switch (profileName) {
      case 'relaxed':
        profileLabel = 'Relaxed (core protections)';
        break;
      case 'strict':
        profileLabel = 'Strict (all controls)';
        break;
      default:
        profileLabel = 'Custom';
        break;
    }

    const lines = [];

    lines.push('# ===============================================');
    lines.push('# OneDrive Security Baseline Script (groove.exe FeatureControl)');
    lines.push('# Generated by OneDrive Security Baseline Script Assistant – CyberLife Coach');
    lines.push(`# Date: ${dateStr}`);
    lines.push(`# Profile: ${profileLabel}`);
    lines.push('#');
    lines.push('# This script writes Internet Explorer FeatureControl entries for groove.exe under:');
    lines.push('#   HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl');
    lines.push('#');
    lines.push('# Review every line before running.');
    lines.push('# Test on a non-critical system first and ensure you have backups and a rollback plan.');
    lines.push('# Run this script from an elevated PowerShell session (Run as administrator).');
    lines.push('# ===============================================');
    lines.push('');
    lines.push('Set-StrictMode -Version Latest');
    lines.push('$ErrorActionPreference = "Stop"');
    lines.push('');
    lines.push('function Invoke-OneDriveBaseline {');
    lines.push('    Write-Host "Applying OneDrive security baseline FeatureControl settings for groove.exe..." -ForegroundColor Cyan');
    lines.push('    # Each section below creates or updates a FeatureControl key for groove.exe.');
    lines.push('    # Comment out any blocks you do not want to enforce.');
    lines.push('');

    selectedKeys.forEach(key => {
      const definition = controlSnippets[key];
      if (definition && definition.scriptLines) {
        definition.scriptLines.forEach(line => {
          lines.push('    ' + line);
        });
        lines.push('');
      }
    });

    lines.push('}');
    lines.push('');
    lines.push('function Invoke-OneDriveBaselineRollback {');
    lines.push('    Write-Host "Rolling back OneDrive FeatureControl settings for groove.exe created by this script..." -ForegroundColor Yellow');
    lines.push('    # This rollback only removes groove.exe values for the controls you generated here.');
    lines.push('    # It does not restore other policy sources or previous registry states.');
    lines.push('');

    selectedKeys.forEach(key => {
      const definition = controlSnippets[key];
      if (definition && definition.rollbackLines) {
        definition.rollbackLines.forEach(line => {
          lines.push('    ' + line);
        });
        lines.push('');
      }
    });

    lines.push('    Write-Host "Rollback complete. Some settings may still be enforced by other policies." -ForegroundColor Yellow');
    lines.push('}');
    lines.push('');
    lines.push('# To apply these settings, run:');
    lines.push('#   Invoke-OneDriveBaseline');
    lines.push('# To roll back these settings, run:');
    lines.push('#   Invoke-OneDriveBaselineRollback');
    lines.push('');
    lines.push('# End of generated OneDrive baseline script.');

    setScriptOutput(lines.join('\n'));
  };

  const copyToClipboard = () => {
    if (scriptOutput) {
      navigator.clipboard.writeText(scriptOutput);
    }
  };

  const downloadScript = () => {
    if (!scriptOutput) return;
    
    const ext = downloadFormat === 'txt' ? 'txt' : 'ps1';
    const blob = new Blob([scriptOutput], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `onedrive-baseline.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const ControlItem = ({ controlKey, control }) => (
    <div
      onClick={() => handleControlToggle(controlKey)}
      className="flex items-start space-x-3 p-3 rounded-xl border border-slate-700 bg-gradient-to-br from-blue-900/20 to-slate-900/90 hover:border-cyan-500 hover:from-cyan-900/30 hover:to-slate-900 transition-all cursor-pointer hover:-translate-y-0.5"
    >
      <input
        type="checkbox"
        checked={selectedControls[controlKey] || false}
        onChange={() => {}}
        className="mt-0.5 accent-cyan-500 scale-105"
      />
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="font-semibold text-sm">{control.title}</span>
          {control.recommended && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-900/80 text-green-200 border border-green-500/70">
              Recommended
            </span>
          )}
          {control.impact && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-900/80 text-amber-200 border border-amber-500/70">
              Higher impact
            </span>
          )}
          {control.tags && control.tags.map((tag, idx) => (
            <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-slate-700/80 text-slate-300 border border-slate-500/70">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">{control.description}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/security-center" className="flex items-center space-x-3 group cursor-pointer">
              <img 
                src="/logo.png" 
                alt="CyberLifeCoach" 
                className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300" 
              />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:brightness-125 transition-all duration-300">
                CyberLifeCoach
              </span>
            </a>

            <a href="/security-center" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Security Center</span>
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
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">OneDrive Security</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Windows 11</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Local, in-browser</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            OneDrive Lockdown Tool
          </h1>
          
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            Generate a PowerShell script that applies Internet Explorer FeatureControl settings for OneDrive (groove.exe) to reduce phishing, zone elevation, and scripted download risks. Pick Relaxed or Strict, review the output, then run in an elevated PowerShell session.
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
              <h2 className="text-2xl font-bold mb-2">Pick the protections you want</h2>
              <p className="text-slate-400 text-sm">
                These FeatureControl registry values limit how OneDrive (groove.exe) renders Internet content. Choose a profile or toggle items individually.
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
                    onChange={() => handleProfileChange(p)}
                    className="text-cyan-500"
                  />
                  <span className="text-sm capitalize">{p}</span>
                </label>
              ))}
            </div>

            <p className="text-sm text-slate-500 mb-6">
              <strong className="text-slate-300">Relaxed</strong> applies core protections that are unlikely to break everyday OneDrive usage. <strong className="text-slate-300">Strict</strong> adds more aggressive download restrictions. <strong className="text-slate-300">Custom</strong> lets you toggle individual controls by hand.
            </p>

            {/* Controls List */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 mb-6" style={{scrollbarWidth: 'thin', scrollbarColor: 'rgba(148, 163, 184, 0.5) rgba(15, 23, 42, 0.5)'}}>
              {Object.entries(controlSnippets).map(([key, control]) => (
                <ControlItem key={key} controlKey={key} control={control} />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => generateScript(selectedControls, profile)}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Settings className="w-5 h-5" />
                <span>Generate Script</span>
              </button>
              <button
                onClick={clearAll}
                className="px-6 py-3 rounded-lg font-semibold border border-slate-700 hover:border-cyan-500 transition-all hover:bg-slate-800 flex items-center space-x-2"
              >
                <Trash2 className="w-5 h-5" />
                <span>Clear All</span>
              </button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="mb-4">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">Step 2 · Review, test, then run</div>
              <h2 className="text-2xl font-bold mb-2">Generated Script</h2>
              <p className="text-slate-400 text-sm">
                Review every line, test on a non-critical machine, then run in an elevated PowerShell session. The script includes both apply and rollback functions.
              </p>
            </div>

            <textarea
              value={scriptOutput}
              readOnly
              spellCheck={false}
              className="w-full h-96 bg-slate-950 border border-slate-700 rounded-lg p-4 font-mono text-xs text-slate-300 resize-none focus:outline-none focus:border-cyan-500"
            />

            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-4 py-2 rounded-lg font-semibold hover:bg-cyan-500/20 transition-all"
              >
                <Copy className="w-4 h-4" />
                <span>Copy to Clipboard</span>
              </button>
              <select
                value={downloadFormat}
                onChange={(e) => setDownloadFormat(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
              >
                <option value="ps1">Download as .ps1</option>
                <option value="txt">Download as .txt</option>
              </select>
              <button
                onClick={downloadScript}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold border border-slate-700 hover:border-cyan-500 transition-all hover:bg-slate-800"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-400">
              <p><strong className="text-slate-300">How to use:</strong> Save the script, open PowerShell as Administrator, and review before execution.</p>
              <p><strong className="text-slate-300">Rollback:</strong> Run Invoke-OneDriveBaselineRollback to remove these FeatureControl entries.</p>
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
                <li>• Use this only on Windows devices that you manage yourself.</li>
                <li>• Back up at least one test system or create a restore point.</li>
                <li>• Generate the script and read the comments above each command.</li>
                <li>• Remove anything that does not fit your environment or policies.</li>
                <li>• Run on a non-critical device first, from an elevated PowerShell window.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Good next steps</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Save your adjusted script in a safe folder or version control.</li>
                <li>• Document which controls you applied and to which systems.</li>
                <li>• Revisit your baseline as your OneDrive usage and risk profile evolve.</li>
                <li>• For domain-joined or regulated environments, work with your IT or security team.</li>
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
    </div>
  );
}
