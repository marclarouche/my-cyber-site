import React, { useState, useEffect } from 'react';
import { Shield, ArrowLeft, Copy, Download, Trash2, Settings, AlertTriangle } from 'lucide-react';

export default function Office365LockdownTool() {
  const [profile, setProfile] = useState('relaxed');
  const [selectedControls, setSelectedControls] = useState({});
  const [scriptOutput, setScriptOutput] = useState('');
  const [downloadFormat, setDownloadFormat] = useState('ps1');

  // Office executables for IE feature controls
  const OFFICE_EXES = [
    "winword.exe",
    "excel.exe",
    "powerpnt.exe",
    "outlook.exe",
    "msaccess.exe",
    "onenote.exe",
    "visio.exe",
    "project.exe"
  ];

  // Control definitions with PowerShell snippets
  const controlSnippets = {
    blockMacrosInternet: {
      title: 'Block macros in Office files from the Internet (Access)',
      description: 'Sets blockcontentexecutionfrominternet = 1 for Access under HKCU\\Software\\Policies\\Microsoft\\Office\\16.0\\access\\security so macros in files from the Internet are blocked even if a user tries to enable all macros.',
      severity: 'medium',
      recommended: true,
      script: `# ---------------------------------------------------------------------------
# STIG: Block macros from running in Office files from the Internet (Access)
# HKCU\\Software\\Policies\\Microsoft\\Office\\16.0\\access\\security
# ---------------------------------------------------------------------------
Write-Host "Enforcing 'Block macros from running in Office files from the Internet' for Access..." -ForegroundColor Cyan
$accessSecKey = "HKCU:\\Software\\Policies\\Microsoft\\Office\\16.0\\access\\security"
if (-not (Test-Path $accessSecKey)) {
    New-Item -Path $accessSecKey -Force | Out-Null
}
New-ItemProperty -Path $accessSecKey -Name "blockcontentexecutionfrominternet" -Value 1 -PropertyType DWord -Force | Out-Null`,
      rollback: `# Roll back: Block macros from running in Office files from the Internet (Access)
$accessSecKey = "HKCU:\\Software\\Policies\\Microsoft\\Office\\16.0\\access\\security"
if (Test-Path $accessSecKey) {
    Remove-ItemProperty -Path $accessSecKey -Name "blockcontentexecutionfrominternet" -ErrorAction SilentlyContinue
}`
    },
    macroRuntimeScan: {
      title: 'Enable VBA macro runtime scan for all documents',
      description: 'Sets macroruntimescanscope = 2 under HKCU\\Software\\Policies\\Microsoft\\Office\\16.0\\common\\security so the VBA runtime reports high risk macro behavior to AV for all documents with enabled macros.',
      severity: 'medium',
      recommended: true,
      script: `# ---------------------------------------------------------------------------
# STIG: Macro Runtime Scan Scope enabled for all documents
# HKCU\\Software\\Policies\\Microsoft\\Office\\16.0\\common\\security
# ---------------------------------------------------------------------------
Write-Host "Enforcing Macro Runtime Scan Scope = 'Enable for all documents'..." -ForegroundColor Cyan
$macroScanKey = "HKCU:\\Software\\Policies\\Microsoft\\Office\\16.0\\common\\security"
if (-not (Test-Path $macroScanKey)) {
    New-Item -Path $macroScanKey -Force | Out-Null
}
# 2 = Enable for all documents
New-ItemProperty -Path $macroScanKey -Name "macroruntimescanscope" -Value 2 -PropertyType DWord -Force | Out-Null`,
      rollback: `# Roll back: Macro Runtime Scan Scope
$macroScanKey = "HKCU:\\Software\\Policies\\Microsoft\\Office\\16.0\\common\\security"
if (Test-Path $macroScanKey) {
    Remove-ItemProperty -Path $macroScanKey -Name "macroruntimescanscope" -ErrorAction SilentlyContinue
}`
    },
    activeXSafeMode: {
      title: 'Initialize ActiveX controls in safe mode',
      description: 'Sets UFIControls = 6 in HKCU\\Software\\Policies\\Microsoft\\Office\\common\\security so SFI controls run in safe mode with persisted data and non SFI controls prompt before loading with persisted values.',
      severity: 'medium',
      tags: ['Legacy ActiveX'],
      script: `# ---------------------------------------------------------------------------
# STIG: ActiveX Control Initialization in Safe Mode
# HKCU\\Software\\Policies\\Microsoft\\Office\\common\\security
# ---------------------------------------------------------------------------
Write-Host "Enforcing ActiveX initialization in Safe Mode (UFIControls = 6)..." -ForegroundColor Cyan
$activexKey = "HKCU:\\Software\\Policies\\Microsoft\\Office\\common\\security"
if (-not (Test-Path $activexKey)) {
    New-Item -Path $activexKey -Force | Out-Null
}
# 6 = If SFI, load in safe mode with persisted values, prompt and restrict unsafe controls
New-ItemProperty -Path $activexKey -Name "UFIControls" -Value 6 -PropertyType DWord -Force | Out-Null`,
      rollback: `# Roll back: ActiveX Control Initialization
$activexKey = "HKCU:\\Software\\Policies\\Microsoft\\Office\\common\\security"
if (Test-Path $activexKey) {
    Remove-ItemProperty -Path $activexKey -Name "UFIControls" -ErrorAction SilentlyContinue
}`
    },
    localMachineZoneLockdown: {
      title: 'Enable Local Machine Zone Lockdown Security',
      description: 'Enables the IE Local Machine Zone lockdown feature for common Office executables under HKLM\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl\\FEATURE_LOCALMACHINE_LOCKDOWN so content cannot silently jump from Internet to local zone.',
      severity: 'medium',
      tags: ['IE feature control'],
      script: `# ---------------------------------------------------------------------------
# STIG: Local Machine Zone Lockdown Security enabled for Office programs
# HKLM\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl\\FEATURE_LOCALMACHINE_LOCKDOWN
# ---------------------------------------------------------------------------
Write-Host "Enabling Local Machine Zone Lockdown for common Office executables..." -ForegroundColor Cyan
$lmzKey = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl\\FEATURE_LOCALMACHINE_LOCKDOWN"
if (-not (Test-Path $lmzKey)) {
    New-Item -Path $lmzKey -Force | Out-Null
}
$officeExes = @(${OFFICE_EXES.map(e => `"${e}"`).join(", ")})
foreach ($exe in $officeExes) {
    New-ItemProperty -Path $lmzKey -Name $exe -Value 1 -PropertyType DWord -Force | Out-Null
}`,
      rollback: `# Roll back: Local Machine Zone Lockdown settings for Office executables
$lmzKey = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl\\FEATURE_LOCALMACHINE_LOCKDOWN"
if (Test-Path $lmzKey) {
    $officeExes = @(${OFFICE_EXES.map(e => `"${e}"`).join(", ")})
    foreach ($exe in $officeExes) {
        Remove-ItemProperty -Path $lmzKey -Name $exe -ErrorAction SilentlyContinue
    }
}`
    },
    objectCachingProtection: {
      title: 'Enable Object Caching Protection for Office programs',
      description: 'Sets feature_object_caching protection to 1 for Office executables so cached objects are handled with stricter controls when hosted by IE components.',
      severity: 'medium',
      tags: ['IE feature control'],
      script: `# ---------------------------------------------------------------------------
# STIG: Object Caching Protection enabled for Office programs
# HKLM\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl\\FEATURE_OBJECT_CACHING
# ---------------------------------------------------------------------------
Write-Host "Enabling Object Caching Protection for common Office executables..." -ForegroundColor Cyan
$cacheKey = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl\\FEATURE_OBJECT_CACHING"
if (-not (Test-Path $cacheKey)) {
    New-Item -Path $cacheKey -Force | Out-Null
}
$officeExes = @(${OFFICE_EXES.map(e => `"${e}"`).join(", ")})
foreach ($exe in $officeExes) {
    New-ItemProperty -Path $cacheKey -Name $exe -Value 1 -PropertyType DWord -Force | Out-Null
}`,
      rollback: `# Roll back: Object Caching Protection for Office executables
$cacheKey = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl\\FEATURE_OBJECT_CACHING"
if (Test-Path $cacheKey) {
    $officeExes = @(${OFFICE_EXES.map(e => `"${e}"`).join(", ")})
    foreach ($exe in $officeExes) {
        Remove-ItemProperty -Path $cacheKey -Name $exe -ErrorAction SilentlyContinue
    }
}`
    },
    zoneElevationProtection: {
      title: 'Enable Protection from Zone Elevation',
      description: 'Enables the IE feature FEATURE_ZONE_ELEVATION for common Office executables under ...feature_zone_elevation so Internet zone pages cannot silently escalate to local machine zone code.',
      severity: 'medium',
      tags: ['IE feature control'],
      script: `# ---------------------------------------------------------------------------
# STIG: Protection from Zone Elevation enabled
# HKLM\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl\\FEATURE_ZONE_ELEVATION
# ---------------------------------------------------------------------------
Write-Host "Enabling Protection from Zone Elevation for common Office executables..." -ForegroundColor Cyan
$zoneKey = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl\\FEATURE_ZONE_ELEVATION"
if (-not (Test-Path $zoneKey)) {
    New-Item -Path $zoneKey -Force | Out-Null
}
$officeExes = @(${OFFICE_EXES.map(e => `"${e}"`).join(", ")})
foreach ($exe in $officeExes) {
    New-ItemProperty -Path $zoneKey -Name $exe -Value 1 -PropertyType DWord -Force | Out-Null
}`,
      rollback: `# Roll back: Protection from Zone Elevation for Office executables
$zoneKey = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl\\FEATURE_ZONE_ELEVATION"
if (Test-Path $zoneKey) {
    $officeExes = @(${OFFICE_EXES.map(e => `"${e}"`).join(", ")})
    foreach ($exe in $officeExes) {
        Remove-ItemProperty -Path $zoneKey -Name $exe -ErrorAction SilentlyContinue
    }
}`
    },
    restrictActiveXInstall: {
      title: 'Restrict ActiveX installation in Office host contexts',
      description: 'Turns on FEATURE_RESTRICT_ACTIVEXINSTALL for Office executables so ActiveX install prompts are blocked when content is hosted via IE components inside Office.',
      severity: 'medium',
      tags: ['Legacy ActiveX'],
      script: `# ---------------------------------------------------------------------------
# STIG: Restrict ActiveX installation for Office programs
# HKLM\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl\\FEATURE_RESTRICT_ACTIVEXINSTALL
# ---------------------------------------------------------------------------
Write-Host "Restricting ActiveX installation for common Office executables..." -ForegroundColor Cyan
$restrictKey = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl\\FEATURE_RESTRICT_ACTIVEXINSTALL"
if (-not (Test-Path $restrictKey)) {
    New-Item -Path $restrictKey -Force | Out-Null
}
$officeExes = @(${OFFICE_EXES.map(e => `"${e}"`).join(", ")})
foreach ($exe in $officeExes) {
    New-ItemProperty -Path $restrictKey -Name $exe -Value 1 -PropertyType DWord -Force | Out-Null
}`,
      rollback: `# Roll back: Restrict ActiveX Install for Office executables
$restrictKey = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl\\FEATURE_RESTRICT_ACTIVEXINSTALL"
if (Test-Path $restrictKey) {
    $officeExes = @(${OFFICE_EXES.map(e => `"${e}"`).join(", ")})
    foreach ($exe in $officeExes) {
        Remove-ItemProperty -Path $restrictKey -Name $exe -ErrorAction SilentlyContinue
    }
}`
    },
    scriptedWindowRestrictions: {
      title: 'Enforce scripted window security restrictions',
      description: 'Enables FEATURE_WINDOW_RESTRICTIONS for Office executables so script hosted content cannot spoof OS dialogs, hide windows off screen, or capture input unexpectedly.',
      severity: 'medium',
      tags: ['Pop-up / spoofing'],
      script: `# ---------------------------------------------------------------------------
# STIG: Scripted Window Security Restrictions enabled
# HKLM\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl\\FEATURE_WINDOW_RESTRICTIONS
# ---------------------------------------------------------------------------
Write-Host "Enforcing Scripted Window Security Restrictions for common Office executables..." -ForegroundColor Cyan
$winRestrictKey = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl\\FEATURE_WINDOW_RESTRICTIONS"
if (-not (Test-Path $winRestrictKey)) {
    New-Item -Path $winRestrictKey -Force | Out-Null
}
$officeExes = @(${OFFICE_EXES.map(e => `"${e}"`).join(", ")})
foreach ($exe in $officeExes) {
    New-ItemProperty -Path $winRestrictKey -Name $exe -Value 1 -PropertyType DWord -Force | Out-Null
}`,
      rollback: `# Roll back: Scripted Window Security Restrictions for Office executables
$winRestrictKey = "HKLM:\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl\\FEATURE_WINDOW_RESTRICTIONS"
if (Test-Path $winRestrictKey) {
    $officeExes = @(${OFFICE_EXES.map(e => `"${e}"`).join(", ")})
    foreach ($exe in $officeExes) {
        Remove-ItemProperty -Path $winRestrictKey -Name $exe -ErrorAction SilentlyContinue
    }
}`
    },
    vbaExcelSignedOnly: {
      title: 'Block unsigned VBA macros in Excel',
      description: 'Sets vbawarnings = 3 under HKCU\\Software\\Policies\\Microsoft\\Office\\16.0\\excel\\security so only digitally signed macros are allowed. Unsigned macros are blocked without prompts.',
      severity: 'medium',
      recommended: true,
      script: `# ---------------------------------------------------------------------------
# STIG: VBA Macros not digitally signed must be blocked in Excel
# HKCU\\Software\\Policies\\Microsoft\\Office\\16.0\\excel\\security
# ---------------------------------------------------------------------------
Write-Host "Enforcing Excel VBA macro policy: only digitally signed macros allowed..." -ForegroundColor Cyan
$excelSecKey = "HKCU:\\Software\\Policies\\Microsoft\\Office\\16.0\\excel\\security"
if (-not (Test-Path $excelSecKey)) {
    New-Item -Path $excelSecKey -Force | Out-Null
}
# 3 = Disable VBA macros except digitally signed macros
New-ItemProperty -Path $excelSecKey -Name "vbawarnings" -Value 3 -PropertyType DWord -Force | Out-Null`,
      rollback: `# Roll back: Excel VBA macro warning setting
$excelSecKey = "HKCU:\\Software\\Policies\\Microsoft\\Office\\16.0\\excel\\security"
if (Test-Path $excelSecKey) {
    Remove-ItemProperty -Path $excelSecKey -Name "vbawarnings" -ErrorAction SilentlyContinue
}`
    },
    connectedContent: {
      title: 'Disable connected experiences that download online content',
      description: 'Sets DownloadContentDisabled = 2 under HKCU\\Software\\Policies\\Microsoft\\Office\\16.0\\common\\privacy to turn off cloud backed experiences that automatically fetch online content.',
      severity: 'medium',
      recommended: true,
      script: `# ---------------------------------------------------------------------------
# STIG: Connected experiences that download online content must be disabled
# HKCU\\Software\\Policies\\Microsoft\\Office\\16.0\\common\\privacy
# ---------------------------------------------------------------------------
Write-Host "Disabling connected experiences that download online content..." -ForegroundColor Cyan
$privacyKey = "HKCU:\\Software\\Policies\\Microsoft\\Office\\16.0\\common\\privacy"
if (-not (Test-Path $privacyKey)) {
    New-Item -Path $privacyKey -Force | Out-Null
}
# 2 = Disabled
New-ItemProperty -Path $privacyKey -Name "DownloadContentDisabled" -Value 2 -PropertyType DWord -Force | Out-Null`,
      rollback: `# Roll back: Connected experiences download content setting
$privacyKey = "HKCU:\\Software\\Policies\\Microsoft\\Office\\16.0\\common\\privacy"
if (Test-Path $privacyKey) {
    Remove-ItemProperty -Path $privacyKey -Name "DownloadContentDisabled" -ErrorAction SilentlyContinue
}`
    },
    connectedExperiencesOptional: {
      title: 'Disable additional optional connected experiences',
      description: 'Sets ControllerConnectedServicesEnabled = 2 so additional optional cloud backed experiences are disabled across Office.',
      severity: 'medium',
      recommended: true,
      script: `# ---------------------------------------------------------------------------
# STIG: Additional optional connected experiences must be disabled
# HKCU\\Software\\Policies\\Microsoft\\Office\\16.0\\common\\privacy
# ---------------------------------------------------------------------------
Write-Host "Disabling additional optional connected experiences..." -ForegroundColor Cyan
$privacyKey = "HKCU:\\Software\\Policies\\Microsoft\\Office\\16.0\\common\\privacy"
if (-not (Test-Path $privacyKey)) {
    New-Item -Path $privacyKey -Force | Out-Null
}
# 2 = Disabled
New-ItemProperty -Path $privacyKey -Name "ControllerConnectedServicesEnabled" -Value 2 -PropertyType DWord -Force | Out-Null`,
      rollback: `# Roll back: Additional optional connected experiences setting
$privacyKey = "HKCU:\\Software\\Policies\\Microsoft\\Office\\16.0\\common\\privacy"
if (Test-Path $privacyKey) {
    Remove-ItemProperty -Path $privacyKey -Name "ControllerConnectedServicesEnabled" -ErrorAction SilentlyContinue
}`
    }
  };

  // Profile definitions
  const relaxedKeys = [
    "blockMacrosInternet",
    "macroRuntimeScan",
    "vbaExcelSignedOnly",
    "connectedContent",
    "connectedExperiencesOptional"
  ];

  const strictKeys = Object.keys(controlSnippets);

  useEffect(() => {
    applyProfile(profile);
  }, []);

  const applyProfile = (profileName) => {
    if (profileName === 'custom') return;
    
    const profileKeys = profileName === 'relaxed' ? relaxedKeys : strictKeys;
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
    setScriptOutput('# No controls selected. Choose at least one Office 365 control and try again.');
  };

  const generateScript = (selection, profileName) => {
    const selectedKeys = Object.keys(selection).filter(k => selection[k]);
    
    if (!selectedKeys.length) {
      setScriptOutput('# No controls selected. Choose at least one Office 365 control and try again.');
      return;
    }

    const dateStr = new Date().toISOString();
    
    const lines = [];
    
    lines.push('# =====================================================================');
    lines.push('# Office 365 Baseline Script');
    lines.push('# Generated by Office 365 Baseline Script Assistant – CyberLife Coach');
    lines.push(`# Date: ${dateStr}`);
    lines.push('#');
    lines.push('# This script applies registry-based Office 2016/Office 365 hardening');
    lines.push('# controls inspired by DISA STIG guidance for:');
    lines.push('#   - Macros and macro runtime scanning');
    lines.push('#   - ActiveX and IE-hosted Office security features');
    lines.push('#   - Connected experiences and privacy');
    lines.push('#');
    lines.push('# Review every line before running.');
    lines.push('# Test on a non-critical system first and ensure you have backups.');
    lines.push('# Run this script from an elevated PowerShell session (Run as administrator).');
    lines.push('# =====================================================================');
    lines.push('');
    lines.push('Set-StrictMode -Version Latest');
    lines.push('$ErrorActionPreference = "Stop"');
    lines.push('');
    lines.push('# Track which controls are included in this instance of the script');
    lines.push('$SelectedControls = @(');
    selectedKeys.forEach(k => {
      lines.push(`    '${k}'`);
    });
    lines.push(')');
    lines.push('');
    lines.push('function Invoke-O365Baseline {');
    lines.push('    [CmdletBinding()]');
    lines.push('    param()');
    lines.push('');
    lines.push('    Write-Host ""');
    lines.push('    Write-Host "Applying Office 365 baseline controls..." -ForegroundColor Cyan');
    lines.push('    Write-Host "This focuses on Office 16.0 policy paths and common IE feature controls." -ForegroundColor DarkCyan');
    lines.push('    Write-Host ""');
    lines.push('');

    selectedKeys.forEach(key => {
      const definition = controlSnippets[key];
      if (definition && definition.script) {
        lines.push(definition.script);
        lines.push('');
      }
    });

    lines.push('}');
    lines.push('');
    lines.push('function Invoke-O365BaselineRollback {');
    lines.push('    [CmdletBinding()]');
    lines.push('    param()');
    lines.push('');
    lines.push('    Write-Host ""');
    lines.push('    Write-Host "Attempting to roll back Office 365 baseline controls where possible..." -ForegroundColor Yellow');
    lines.push('    Write-Host "Only keys created by this script are targeted. Existing policies may still apply." -ForegroundColor DarkYellow');
    lines.push('    Write-Host ""');
    lines.push('');

    selectedKeys.forEach(key => {
      const definition = controlSnippets[key];
      if (definition && definition.rollback) {
        lines.push(definition.rollback);
        lines.push('');
      }
    });

    lines.push('}');
    lines.push('');
    lines.push('Write-Host ""');
    lines.push('Write-Host "Office 365 Baseline Script loaded." -ForegroundColor Green');
    lines.push('Write-Host "Selected controls:" -ForegroundColor Green');
    lines.push('$SelectedControls | ForEach-Object { Write-Host "  - $_" -ForegroundColor Green }');
    lines.push('Write-Host ""');
    lines.push('Write-Host "Run \'Invoke-O365Baseline\' to apply the baseline." -ForegroundColor Cyan');
    lines.push('Write-Host "Run \'Invoke-O365BaselineRollback\' to attempt rollback for supported keys." -ForegroundColor Cyan');

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
    a.download = `office365-baseline.${ext}`;
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
          {control.severity === 'medium' && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-900/80 text-blue-200 border border-blue-500/70">
              CAT II
            </span>
          )}
          {control.recommended && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-900/80 text-green-200 border border-green-500/70">
              Recommended
            </span>
          )}
          {control.tags && control.tags.map((tag, idx) => (
            <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-amber-900/80 text-amber-200 border border-amber-500/70">
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
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Office 365 Security</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Office 2016 / Office 365</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Local, in-browser</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Office 365 Baseline Script Assistant
          </h1>
          
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            Choose which Office 365 controls you want from the DISA STIG based catalog, then generate a PowerShell script that writes the matching registry-based policies for Office 2016/Office 365 ProPlus style installs. Review, test, then run it on Windows systems you manage. No data leaves your browser.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Controls Panel */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="mb-6">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">Step 1 · Choose your Office 365 controls</div>
              <h2 className="text-2xl font-bold mb-2">Pick the protections you want in your script.</h2>
              <p className="text-slate-400 text-sm">
                Profiles blend strictness and compatibility. Relaxed focuses on safer macro and privacy controls. Strict turns on the full STIG style baseline, including legacy IE feature protections and ActiveX limits. Custom lets you hand pick each control.
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

            <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-slate-700">
              <p className="text-xs font-semibold text-slate-300 mb-2">Profile cheat sheet</p>
              <ul className="text-xs text-slate-400 space-y-1">
                <li>• <strong className="text-slate-300">Relaxed</strong> focuses on macro and privacy controls that rarely break everyday work.</li>
                <li>• <strong className="text-slate-300">Strict</strong> includes everything in Relaxed plus aggressive legacy IE and ActiveX protections.</li>
                <li>• <strong className="text-slate-300">Custom</strong> keeps your current checkboxes and lets you build a one of a kind mix.</li>
              </ul>
            </div>

            {/* Controls List */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 mb-6" style={{scrollbarWidth: 'thin', scrollbarColor: 'rgba(148, 163, 184, 0.5) rgba(15, 23, 42, 0.5)'}}>
              {Object.entries(controlSnippets).map(([key, control]) => (
                <ControlItem key={key} controlKey={key} control={control} />
              ))}
            </div>

            <p className="text-xs text-slate-500 mb-6">
              <strong className="text-slate-300">Tip:</strong> For most home and small business environments, Relaxed is a sensible default. Use Strict for hardened builds where legacy ActiveX or embedded IE behaviors are not required.
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => generateScript(selectedControls, profile)}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Settings className="w-5 h-5" />
                <span>Generate PowerShell Script</span>
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
              <h2 className="text-2xl font-bold mb-2">Generated Office 365 baseline script</h2>
              <p className="text-slate-400 text-sm">
                Review every line, test on a non critical machine, then run this from an elevated PowerShell session on Windows devices running Office 2016 style Office (16.0 registry paths). The script focuses on registry based controls and includes a companion rollback function for keys it creates.
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
                <span>Download File</span>
              </button>
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-400">
              <p><strong className="text-slate-300">How to use:</strong> Save the contents to a file such as <code className="text-cyan-400">office365-baseline.ps1</code>, right click PowerShell and choose <em>Run as administrator</em>, then run <code className="text-cyan-400">.\office365-baseline.ps1</code>. Once loaded, apply settings with <code className="text-cyan-400">Invoke-O365Baseline</code> and attempt rollback (for supported keys) with <code className="text-cyan-400">Invoke-O365BaselineRollback</code>.</p>
              <p><strong className="text-slate-300">Scope:</strong> This helper targets the Office 16.0 policy paths and common IE feature controls used by Office host processes. Always confirm they match your tenant and deployment model, especially if you are using newer Microsoft 365 Apps channels or additional policy templates.</p>
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
                <li>• Use this only on systems and tenants you are explicitly allowed to manage.</li>
                <li>• Create backups or configuration exports of existing Office policy keys before applying changes.</li>
                <li>• Generate the script and skim every section, especially Strict profile IE/ActiveX controls.</li>
                <li>• Comment out any blocks that conflict with organization wide GPO or MDM baselines.</li>
                <li>• Test on a non critical machine joined to a representative tenant or domain first.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Good next steps</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Save your adjusted script into version control or a secured admin repository.</li>
                <li>• Document which STIG style rules you enforced and how they map to your policies.</li>
                <li>• Coordinate with your security, compliance, or messaging teams before broad rollout.</li>
                <li>• Revisit this baseline when Office channels, add-ins, or browser integrations change.</li>
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
                  This assistant runs entirely in your browser. Your selections and the generated script are not sent to CyberLife Coach, to Microsoft, or to any third party. The output is a generic starting point based on registry style interpretations of publicly available Office 2016/Office 365 STIG guidance and is provided for educational and informational use only. It is not a substitute for professional advice and does not guarantee compliance with any standard or policy. Always test in a safe environment, verify every line, and ensure you have reliable backups before making changes. Do not apply these settings to employer or school managed devices without explicit approval and alignment with existing GPO or MDM baselines.
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
