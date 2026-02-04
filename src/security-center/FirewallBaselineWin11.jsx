import React, { useState, useEffect } from 'react';
import { Shield, ArrowLeft, Copy, Download, Trash2, Settings, AlertTriangle, CheckCircle, Info, Star } from 'lucide-react';

export default function FirewallBaselineWin11() {
  const [selectedControls, setSelectedControls] = useState({
    service: true,
    baselineProfiles: true,
    logging: true,
    noPublicNotify: false
  });
  const [scriptOutput, setScriptOutput] = useState('');

  // Control definitions
  const controls = [
    {
      key: 'service',
      title: 'Ensure firewall service is Automatic and running',
      description: 'Verify that the Windows Defender Firewall service (mpssvc) is set to Automatic startup and is running so profile settings actually take effect.',
      recommended: true,
      impact: 'High impact'
    },
    {
      key: 'baselineProfiles',
      title: 'Enable all profiles and block unsolicited inbound traffic',
      description: 'Turn on Domain, Private, and Public firewall profiles and set the default inbound action to block unexpected connections that do not match an allow rule.',
      recommended: true,
      impact: 'High impact'
    },
    {
      key: 'logging',
      title: 'Enable basic logging for all profiles',
      description: 'Configure logging of blocked and allowed connections for all profiles to a single log file under the standard Windows Firewall log folder.',
      recommended: true,
      impact: false,
      badge: 'Visibility'
    },
    {
      key: 'noPublicNotify',
      title: 'Reduce noisy notifications on Public profile',
      description: 'Turn off the firewall notification prompt when apps are blocked on Public networks, which can reduce click-through fatigue on travel Wi-Fi.',
      recommended: false,
      impact: false,
      badge: 'Usability'
    }
  ];

  const controlSnippets = {
    service: {
      script: `# Ensure Windows Defender Firewall service is Automatic and running
Write-Host "Checking Windows Defender Firewall service (mpssvc)..." -ForegroundColor Cyan
$svc = Get-Service -Name "mpssvc" -ErrorAction Stop
if ($svc.StartType -ne "Automatic") {
    Write-Host "Setting mpssvc startup type to Automatic." -ForegroundColor Yellow
    Set-Service -Name "mpssvc" -StartupType Automatic
}
if ($svc.Status -ne "Running") {
    Write-Host "Starting mpssvc service." -ForegroundColor Yellow
    Start-Service -Name "mpssvc"
}
Write-Host "Windows Defender Firewall service is Automatic and running." -ForegroundColor Green`
    },
    baselineProfiles: {
      script: `# Enable firewall and block unsolicited inbound traffic for all profiles
Write-Host "Applying firewall baseline to Domain, Private, and Public profiles..." -ForegroundColor Cyan
Set-NetFirewallProfile -Profile Domain,Private,Public -Enabled True -DefaultInboundAction Block
Write-Host "Firewall profiles enabled and default inbound action set to Block." -ForegroundColor Green`
    },
    logging: {
      script: `# Enable basic firewall logging for all profiles
Write-Host "Enabling basic logging for all firewall profiles..." -ForegroundColor Cyan
$logPath = "$env:SystemRoot\\\\system32\\\\LogFiles\\\\Firewall\\\\pfirewall.log"
Set-NetFirewallProfile -Profile Domain,Private,Public -LogFileName $logPath -LogBlocked True -LogAllowed True -LogMaxSizeKilobytes 16384
Write-Host "Logging configured for Domain, Private, and Public profiles at $logPath." -ForegroundColor Green`
    },
    noPublicNotify: {
      script: `# Reduce firewall notifications on Public profile
Write-Host "Reducing firewall notifications on Public profile..." -ForegroundColor Cyan
Set-NetFirewallProfile -Profile Public -NotifyOnListen False
Write-Host "Public profile notifications adjusted." -ForegroundColor Green`
    }
  };

  useEffect(() => {
    generateScript();
  }, []);

  const handleControlToggle = (key) => {
    const newSelection = { ...selectedControls, [key]: !selectedControls[key] };
    setSelectedControls(newSelection);
  };

  const selectRecommended = () => {
    const newSelection = {};
    controls.forEach(control => {
      newSelection[control.key] = control.recommended;
    });
    setSelectedControls(newSelection);
  };

  const clearAll = () => {
    const newSelection = {};
    controls.forEach(control => {
      newSelection[control.key] = false;
    });
    setSelectedControls(newSelection);
    generateScript(newSelection);
  };

  const generateScript = (selection = selectedControls) => {
    const selectedKeys = Object.keys(selection).filter(k => selection[k]);
    const script = buildScript(selectedKeys);
    setScriptOutput(script);
  };

  const buildScript = (selectedKeys) => {
    const dateStr = new Date().toISOString().slice(0, 10);
    const lines = [];

    if (!selectedKeys.length) {
      lines.push('# No baseline actions were selected when this script was generated.');
      lines.push('# Reopen the assistant, choose at least one control, and generate the script again.');
      return lines.join('\n');
    }

    // Header
    lines.push('# ===============================================');
    lines.push('# Windows Defender Firewall Baseline Script');
    lines.push('# Generated by Firewall Baseline Assistant – CyberLife Coach');
    lines.push('# Date: ' + dateStr);
    lines.push('#');
    lines.push('# This script defines two functions:');
    lines.push('#   Invoke-FirewallBaseline        – apply the selected baseline actions.');
    lines.push('#   Invoke-FirewallBaselineRollback – restore the backed-up profile settings.');
    lines.push('#');
    lines.push('# Usage (from an elevated PowerShell session in this folder):');
    lines.push('#   .\\FirewallBaselineScript.ps1');
    lines.push('#   Invoke-FirewallBaseline');
    lines.push('#   # If needed later:');
    lines.push('#   Invoke-FirewallBaselineRollback');
    lines.push('# ===============================================');
    lines.push('');
    lines.push('Set-StrictMode -Version Latest');
    lines.push('$ErrorActionPreference = "Stop"');
    lines.push('$BackupPath = Join-Path $PSScriptRoot "FirewallBaselineBackup.json"');
    lines.push('');

    // Helper functions
    lines.push('function Get-FirewallProfileSnapshot {');
    lines.push('    Get-NetFirewallProfile -Profile Domain,Private,Public | Select-Object Name, Enabled, DefaultInboundAction, DefaultOutboundAction, LogFileName, LogBlocked, LogAllowed, LogMaxSizeKilobytes');
    lines.push('}');
    lines.push('');
    lines.push('function Save-FirewallBaselineBackup {');
    lines.push('    param(');
    lines.push('        [string]$Path');
    lines.push('    )');
    lines.push('    $snapshot = Get-FirewallProfileSnapshot');
    lines.push('    $snapshot | ConvertTo-Json -Depth 4 | Set-Content -Path $Path -Encoding UTF8');
    lines.push('}');
    lines.push('');

    // Apply function
    lines.push('function Invoke-FirewallBaseline {');
    lines.push('    Write-Host "Starting Windows Defender Firewall baseline..." -ForegroundColor Cyan');
    lines.push('    if (-not (Test-Path -LiteralPath $BackupPath)) {');
    lines.push('        Write-Host "Saving current firewall profile settings to $BackupPath" -ForegroundColor Cyan');
    lines.push('        Save-FirewallBaselineBackup -Path $BackupPath');
    lines.push('        Write-Host "Backup created." -ForegroundColor Green');
    lines.push('    } else {');
    lines.push('        Write-Host "Backup already exists at $BackupPath (will not overwrite)." -ForegroundColor Yellow');
    lines.push('    }');
    lines.push('');
    lines.push('    # Apply selected baseline actions');

    selectedKeys.forEach(key => {
      const snippet = controlSnippets[key];
      if (snippet && snippet.script) {
        lines.push(snippet.script.trimEnd());
        lines.push('');
      }
    });

    lines.push('    Write-Host "Firewall baseline complete." -ForegroundColor Green');
    lines.push('}');
    lines.push('');

    // Rollback function
    lines.push('function Invoke-FirewallBaselineRollback {');
    lines.push('    Write-Host "Attempting to roll back firewall profile settings from backup..." -ForegroundColor Cyan');
    lines.push('    if (-not (Test-Path -LiteralPath $BackupPath)) {');
    lines.push('        Write-Warning "No backup file found at $BackupPath. Nothing to roll back to."');
    lines.push('        return');
    lines.push('    }');
    lines.push('');
    lines.push('    try {');
    lines.push('        $json = Get-Content -Path $BackupPath -Raw');
    lines.push('        $profiles = $json | ConvertFrom-Json');
    lines.push('    } catch {');
    lines.push('        Write-Warning "Unable to read or parse $BackupPath. Rollback aborted."');
    lines.push('        return');
    lines.push('    }');
    lines.push('');
    lines.push('    foreach ($p in $profiles) {');
    lines.push('        if (-not $p.Name) { continue }');
    lines.push('        Write-Host "Restoring profile $($p.Name)..." -ForegroundColor Cyan');
    lines.push('        Set-NetFirewallProfile -Profile $p.Name \\');
    lines.push('            -Enabled $p.Enabled \\');
    lines.push('            -DefaultInboundAction $p.DefaultInboundAction \\');
    lines.push('            -DefaultOutboundAction $p.DefaultOutboundAction \\');
    lines.push('            -LogFileName $p.LogFileName \\');
    lines.push('            -LogBlocked $p.LogBlocked \\');
    lines.push('            -LogAllowed $p.LogAllowed \\');
    lines.push('            -LogMaxSizeKilobytes $p.LogMaxSizeKilobytes');
    lines.push('    }');
    lines.push('');
    lines.push('    Write-Host "Firewall profiles restored from backup snapshot." -ForegroundColor Green');
    lines.push('}');
    lines.push('');
    lines.push('# End of generated firewall baseline script.');

    return lines.join('\n');
  };

  const copyToClipboard = () => {
    if (scriptOutput) {
      navigator.clipboard.writeText(scriptOutput).catch(err => {
        console.warn('Clipboard write failed:', err);
      });
    }
  };

  const downloadScript = (format) => {
    if (!scriptOutput.trim()) return;

    const content = scriptOutput.replace(/\n/g, '\r\n');
    const extension = format === 'txt' ? 'txt' : 'ps1';
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FirewallBaselineScript.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
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

            <a href="/security-center/firewall-hardening-hub" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Firewall Hardening Hub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-wider">
              Firewall Baseline Assistant
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 border border-slate-600">
              Windows Defender Firewall
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 border border-slate-600">
              Local, in-browser helper
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Generate a Windows Defender Firewall baseline with rollback support
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl">
            Select a small set of profile-level hardening actions, then download a PowerShell script with{' '}
            <code className="text-cyan-400 font-semibold">Invoke-FirewallBaseline</code> and{' '}
            <code className="text-cyan-400 font-semibold">Invoke-FirewallBaselineRollback</code>. The helper runs locally in your browser and does not upload any data.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Controls Card */}
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">
                Step 1 · Choose your firewall baseline controls
              </div>
              <h2 className="text-xl font-bold mb-2">Pick the changes you want this script to enforce.</h2>
              <p className="text-sm text-slate-400 mb-6">
                Start with the recommended items for most home and small business systems, then adjust based on your apps, games, and services.
              </p>

              <div className="space-y-3 mb-6">
                {controls.map(control => (
                  <div
                    key={control.key}
                    onClick={() => handleControlToggle(control.key)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedControls[control.key]
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-slate-700 hover:border-slate-600 bg-slate-800/30'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedControls[control.key] || false}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 rounded accent-cyan-500"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-2 mb-1">
                          <h3 className="font-semibold text-sm">{control.title}</h3>
                          {control.recommended && (
                            <span className="text-xs px-2 py-0.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-400">
                              Recommended
                            </span>
                          )}
                          {control.impact && (
                            <span className="text-xs px-2 py-0.5 rounded-full border border-yellow-500/40 bg-yellow-500/10 text-yellow-400">
                              {control.impact}
                            </span>
                          )}
                          {control.badge && (
                            <span className="text-xs px-2 py-0.5 rounded-full border border-slate-500/40 bg-slate-500/10 text-slate-300">
                              {control.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{control.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-slate-100">Tip:</strong> You can regenerate the script any time. If something misbehaves, use{' '}
                  <code className="text-cyan-400 font-semibold">Invoke-FirewallBaselineRollback</code> to restore the backed-up profile settings.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={selectRecommended}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transition-all font-semibold shadow-lg shadow-cyan-500/20"
                >
                  <Star className="w-4 h-4" />
                  <span>Select recommended</span>
                </button>
                <button
                  onClick={clearAll}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-slate-700 hover:border-red-500 transition-all hover:bg-red-500/10 text-red-400 font-semibold"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear all</span>
                </button>
                <button
                  onClick={() => generateScript()}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-slate-700 hover:border-cyan-500 transition-all hover:bg-slate-800 font-semibold"
                >
                  <Settings className="w-4 h-4" />
                  <span>Generate script with rollback</span>
                </button>
              </div>
            </div>

            {/* Output Card */}
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">
                Step 2 · Review, test, then run
              </div>
              <h2 className="text-xl font-bold mb-2">Firewall baseline PowerShell script</h2>
              <p className="text-sm text-slate-400 mb-4">
                The output includes <code className="text-cyan-400 font-semibold">Invoke-FirewallBaseline</code> and{' '}
                <code className="text-cyan-400 font-semibold">Invoke-FirewallBaselineRollback</code>. Review, test on a non-critical system, then run from an elevated PowerShell session.
              </p>

              <div className="relative mb-4">
                <textarea
                  value={scriptOutput}
                  readOnly
                  className="w-full h-96 p-4 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-slate-300 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Script will appear here..."
                />
              </div>

              <div className="flex flex-wrap gap-3 mb-4">
                <button
                  onClick={copyToClipboard}
                  disabled={!scriptOutput}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold border border-slate-700 hover:border-cyan-500 transition-all hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy to clipboard</span>
                </button>
                <button
                  onClick={() => downloadScript('ps1')}
                  disabled={!scriptOutput}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold border border-slate-700 hover:border-cyan-500 transition-all hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  <span>Download as .ps1</span>
                </button>
                <button
                  onClick={() => downloadScript('txt')}
                  disabled={!scriptOutput}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold border border-slate-700 hover:border-cyan-500 transition-all hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  <span>Download as .txt</span>
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-400">
                <p>
                  <strong className="text-slate-300">How to use:</strong> save the script, open PowerShell as Administrator, change into the folder, and run{' '}
                  <code className="text-cyan-400">Set-ExecutionPolicy -Scope Process RemoteSigned</code> for that session. Then run{' '}
                  <code className="text-cyan-400">.\FirewallBaselineScript.ps1</code>, followed by{' '}
                  <code className="text-cyan-400">Invoke-FirewallBaseline</code>. To roll back to your saved snapshot, run{' '}
                  <code className="text-cyan-400">Invoke-FirewallBaselineRollback</code>.
                </p>
                <p>
                  <strong className="text-slate-300">Rollback scope:</strong> the rollback function restores a JSON snapshot of the firewall profiles that was created the first time you ran the baseline. It only touches profile-level settings captured in that snapshot, not every possible firewall rule on the system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">
            How to use this firewall assistant safely
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-3">Before you apply the baseline</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Make a backup or snapshot of at least one test machine.</li>
                <li>• Generate the script and read the comments above each section.</li>
                <li>• Remove or adjust anything that does not fit your environment.</li>
                <li>• Test on a non-critical system or VM before rolling out more widely.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Good next steps</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Save the script to version control or a secured admin share.</li>
                <li>• Document which baseline you applied and to which hosts.</li>
                <li>• Review logs periodically to confirm the firewall is behaving as expected.</li>
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
                  This assistant runs entirely in your browser. Your selections and the generated script are not sent to CyberLife Coach, to any server, or to any third party. The output is a generic starting point and is provided for educational and informational use only. It is not a substitute for professional advice, does not guarantee compliance with any standard, and is used at your own risk. Always test in a safe environment, verify every line, and ensure you have reliable backups before making changes.
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
            <Shield className="w-6 h-6 text-cyan-400" />
            <span className="font-bold text-lg">CyberLifeCoach</span>
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
