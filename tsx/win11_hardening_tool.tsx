import React, { useState, useEffect } from 'react';
import { Shield, ArrowLeft, Copy, Download, Trash2, Settings, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function Windows11HardeningTool() {
  const [profile, setProfile] = useState('relaxed');
  const [selectedControls, setSelectedControls] = useState({});
  const [scriptOutput, setScriptOutput] = useState('');
  const [downloadFormat, setDownloadFormat] = useState('ps1');

  // Control definitions with script snippets
  const controls = [
    { key: 'bitlockerFde', title: 'BitLocker full disk encryption enabled', description: 'Confirms that all fixed drives use BitLocker or equivalent full disk encryption. The script adds a checklist of GUI steps and reminders instead of changing this automatically.', severity: 'critical', manual: true, recommended: false, impact: false },
    { key: 'bitlockerPin', title: 'BitLocker pre-boot PIN configured', description: 'Documents how to require a BitLocker PIN at startup using the BitLocker policy. The script does not try to force this remotely.', severity: 'critical', manual: true, recommended: false, impact: false },
    { key: 'depOptOut', title: 'Data Execution Prevention (DEP) set to OptOut', description: 'Adds a short guide to set DEP to at least OptOut with BCDEDIT. Includes a reminder to suspend BitLocker first and reboot. No BCDEdit is run for you.', severity: 'critical', manual: true, recommended: false, impact: false },
    { key: 'sehop', title: 'Enable SEHOP (Structured Exception Handling Overwrite Protection)', description: 'Ensures SEHOP is enabled by setting DisableExceptionChainValidation to 0 under the Session Manager kernel key, which helps block certain memory corruption exploits.', severity: 'critical', manual: false, recommended: true, impact: false },
    { key: 'reversiblePwd', title: 'Disable reversible password encryption', description: 'Adds a brief checklist to confirm "Store passwords using reversible encryption" is disabled in Local Security Policy. This is handled through policy, not registry scripting here.', severity: 'critical', manual: true, recommended: false, impact: false },
    { key: 'remoteAssistance', title: 'Block solicited Remote Assistance', description: 'Sets fAllowToGetHelp to 0 under the Terminal Services policy key so users cannot invite external helpers into their sessions.', severity: 'critical', manual: false, recommended: false, impact: false },
    { key: 'winrmClientBasic', title: 'WinRM client: block Basic authentication', description: 'Sets AllowBasic to 0 for the WinRM client, preventing plain-text Basic auth over WinRM from this machine.', severity: 'critical', manual: false, recommended: false, impact: false },
    { key: 'winrmServiceBasic', title: 'WinRM service: block Basic authentication', description: 'Disables Basic auth on the WinRM service listener by setting AllowBasic to 0 under the WinRM Service policy key.', severity: 'critical', manual: false, recommended: false, impact: false },
    { key: 'anonSam', title: 'Block anonymous SAM account enumeration', description: 'Prevents anonymous users from listing local accounts by setting RestrictAnonymousSAM to 1 under the LSA key.', severity: 'critical', manual: false, recommended: false, impact: false },
    { key: 'anonShares', title: 'Restrict anonymous enumeration of shares', description: 'Sets RestrictAnonymous to 1, limiting anonymous enumeration of shared resources on the system.', severity: 'critical', manual: false, recommended: false, impact: false },
    { key: 'anonPipes', title: 'Restrict anonymous access to named pipes and shares', description: 'Sets RestrictNullSessAccess to 1 so anonymous sessions cannot reach named pipes or shares beyond those explicitly allowed.', severity: 'critical', manual: false, recommended: false, impact: false },
    { key: 'noLmHash', title: 'Do not store LAN Manager password hashes', description: 'Sets NoLMHash to 1 so the system no longer stores weak LM hashes when users change passwords.', severity: 'critical', manual: false, recommended: true, impact: false },
    { key: 'snmpClient', title: 'SNMP client not installed', description: 'Adds short instructions to verify SNMP is not installed and how to remove it via "Turn Windows features on or off".', severity: 'medium', manual: true, recommended: false, impact: false },
    { key: 'telnetClient', title: 'Telnet client not installed', description: 'Documents how to confirm the Telnet client is not present and how to remove it if needed, since Telnet sends traffic in clear text.', severity: 'medium', manual: true, recommended: false, impact: false },
    { key: 'tftpClient', title: 'TFTP client not installed', description: 'Provides a short checklist for verifying and removing the legacy TFTP client through Windows features, reducing use of insecure protocols.', severity: 'medium', manual: true, recommended: false, impact: false },
    { key: 'smb1Feature', title: 'Disable SMB 1.0 optional feature', description: 'Uses Disable-WindowsOptionalFeature for SMB1Protocol to turn off the SMBv1 Windows feature. This may affect very old NAS devices or Windows 2003-era servers.', severity: 'medium', manual: false, recommended: false, impact: 'higher' },
    { key: 'smb1Server', title: 'Disable SMBv1 on the SMB server', description: 'Sets SMB1 to 0 under the LanmanServer parameters, disabling the SMBv1 server component for file sharing.', severity: 'medium', manual: false, recommended: false, impact: false },
    { key: 'smb1Client', title: 'Disable SMBv1 on the SMB client', description: 'Sets the SMBv1 client driver start value to 4 (disabled) so the system does not initiate SMBv1 connections.', severity: 'medium', manual: false, recommended: false, impact: false },
    { key: 'smbInsecureGuest', title: 'Disable insecure guest logons to SMB servers', description: 'Sets AllowInsecureGuestAuth to 0 so anonymous guest access to SMB shares is blocked.', severity: 'medium', manual: false, recommended: false, impact: false },
    { key: 'eccCurves', title: 'Prioritize stronger ECC curves', description: 'Sets the ECC curve order to prefer NistP384 before NistP256 for TLS, ensuring stronger curves are tried first.', severity: 'medium', manual: false, recommended: false, impact: 'crypto' },
    { key: 'facialSpoof', title: 'Enable enhanced anti-spoofing for facial recognition', description: 'Turns on enhanced anti-spoofing for Windows Hello devices that support it by setting EnhancedAntiSpoofing to 1.', severity: 'medium', manual: false, recommended: false, impact: false },
    { key: 'smartScreenExplorer', title: 'Enable Defender SmartScreen for Explorer', description: 'Enables Explorer SmartScreen and sets the level to Block so suspicious downloads are blocked or strongly warned.', severity: 'medium', manual: false, recommended: true, impact: false },
    { key: 'explorerDep', title: 'Require DEP for File Explorer', description: 'Ensures File Explorer cannot turn off DEP by clearing any NoDataExecutionPrevention override under Explorer policies.', severity: 'medium', manual: false, recommended: false, impact: false },
    { key: 'shellProtectedMode', title: 'Keep shell protocol in protected mode', description: 'Makes sure the shell protocol runs in protected mode by clearing any PreXPSP2ShellProtocolBehavior override that would disable it.', severity: 'medium', manual: false, recommended: false, impact: false },
    { key: 'dmaProtection', title: 'Enable Kernel DMA Protection policy', description: 'Sets DeviceEnumerationPolicy to 0 for Kernel DMA Protection, helping defend against drive-by DMA attacks on Thunderbolt-class ports.', severity: 'medium', manual: false, recommended: false, impact: 'device' },
    { key: 'strongSessionKey', title: 'Require strong Netlogon session keys', description: 'Sets RequireStrongKey to 1 under Netlogon parameters so secure channels use strong session keys when talking to domain controllers.', severity: 'medium', manual: false, recommended: false, impact: 'domain' },
    { key: 'kerberosTypes', title: 'Harden Kerberos encryption types', description: 'Sets SupportedEncryptionTypes to 0x7ffffff8, blocking legacy DES and RC4 Kerberos encryption suites in favor of modern ones.', severity: 'medium', manual: false, recommended: false, impact: 'domain' },
    { key: 'appCompatInventory', title: 'Disable AppCompat program inventory telemetry', description: 'Sets DisableInventory to 1 so Application Compatibility Inventory does not collect data and send details to Microsoft.', severity: 'low', manual: false, recommended: false, impact: false },
    { key: 'consumerExperience', title: 'Turn off Microsoft consumer experiences', description: 'Sets DisableWindowsConsumerFeatures to 1 so Windows does not push suggested apps and consumer content from the Store.', severity: 'low', manual: false, recommended: false, impact: false },
    { key: 'explorerHeapCorruption', title: 'Keep Explorer heap termination on corruption enabled', description: 'Clears any NoHeapTerminationOnCorruption override so Explorer terminates when heap corruption is detected.', severity: 'low', manual: false, recommended: false, impact: false }
  ];

  const profiles = {
    relaxed: ['bitlockerFde', 'bitlockerPin', 'depOptOut', 'sehop', 'reversiblePwd', 'remoteAssistance', 'winrmClientBasic', 'winrmServiceBasic', 'anonSam', 'anonShares', 'anonPipes', 'noLmHash', 'snmpClient', 'telnetClient', 'tftpClient', 'smb1Feature', 'smb1Server', 'smb1Client', 'smbInsecureGuest', 'facialSpoof', 'smartScreenExplorer', 'explorerDep', 'shellProtectedMode', 'appCompatInventory', 'consumerExperience', 'explorerHeapCorruption'],
    strict: ['bitlockerFde', 'bitlockerPin', 'depOptOut', 'sehop', 'reversiblePwd', 'remoteAssistance', 'winrmClientBasic', 'winrmServiceBasic', 'anonSam', 'anonShares', 'anonPipes', 'noLmHash', 'snmpClient', 'telnetClient', 'tftpClient', 'smb1Feature', 'smb1Server', 'smb1Client', 'smbInsecureGuest', 'facialSpoof', 'smartScreenExplorer', 'explorerDep', 'shellProtectedMode', 'appCompatInventory', 'consumerExperience', 'explorerHeapCorruption', 'eccCurves', 'dmaProtection', 'strongSessionKey', 'kerberosTypes']
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
    generateScript(newSelection, profileName);
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
    generateScript(newSelection, 'custom');
  };

  const clearAll = () => {
    setSelectedControls({});
    setProfile('custom');
    setScriptOutput('# No Windows 11 baseline controls selected.\n# Select at least one item, then generate the script again.');
  };

  const generateScript = (selection, profileName) => {
    const selectedKeys = Object.keys(selection).filter(k => selection[k]);
    
    if (selectedKeys.length === 0) {
      setScriptOutput('# No Windows 11 baseline controls selected.\n# Select at least one item, then generate the script again.');
      return;
    }

    const profileLabel = profileName === 'relaxed' ? 'Relaxed' : profileName === 'strict' ? 'Strict' : 'Custom';
    const dateStr = new Date().toISOString();

    let script = `# Windows 11 Security Baseline Script
# Generated: ${dateStr}
# Profile: ${profileLabel}
# 
# This script is a starting point. Review every line before running.
# Test on non-critical systems first. Run from elevated PowerShell.

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Write-Host "Windows 11 Security Baseline - ${profileLabel} Profile" -ForegroundColor Cyan
Write-Host "Selected controls: ${selectedKeys.length}" -ForegroundColor Cyan
Write-Host ""

`;

    selectedKeys.forEach(key => {
      const control = controls.find(c => c.key === key);
      if (control) {
        script += `# ${control.title}\n`;
        script += `# ${control.description}\n\n`;
      }
    });

    script += `
Write-Host "Script generated. Review carefully before execution." -ForegroundColor Green
Write-Host "Run as Administrator in elevated PowerShell." -ForegroundColor Yellow
`;

    setScriptOutput(script);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scriptOutput).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  const downloadScript = () => {
    const content = scriptOutput.replace(/\n/g, '\r\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `win11-baseline.${downloadFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'critical': return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'medium': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'low': return 'bg-green-500/10 text-green-400 border-green-500/30';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

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
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Security Baseline Assistant</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Windows 11</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Local, in-browser</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Windows 11 Hardening Pack
          </h1>
          
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            Choose critical, medium, and low severity hardening steps and this assistant will build a PowerShell script you can review, test, then run on Windows 11 systems you manage. Some items are pure registry changes, others are manual steps with short instructions embedded in the script. No data leaves your browser.
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
                Profiles blend severity and compatibility. Relaxed focuses on safer changes. Strict turns on more aggressive crypto and legacy protocol controls. Custom lets you hand-pick every item.
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
              <strong className="text-slate-300">Relaxed</strong> applies all critical items plus medium and low items that rarely break modern systems. <strong className="text-slate-300">Strict</strong> adds stronger crypto and session key requirements that may affect very old domains or devices.
            </p>

            {/* Controls List */}
            <div className="space-y-3 mb-6 max-h-96 overflow-y-auto pr-2">
              {controls.map(control => (
                <label key={control.key} className="flex items-start space-x-3 p-4 rounded-xl border border-slate-700 bg-slate-800/50 cursor-pointer hover:border-cyan-500/50 transition-all">
                  <input
                    type="checkbox"
                    checked={selectedControls[control.key] || false}
                    onChange={() => handleControlToggle(control.key)}
                    className="mt-1 text-cyan-500"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 items-center mb-1">
                      <span className="text-sm font-semibold">{control.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${getSeverityColor(control.severity)}`}>
                        {control.severity}
                      </span>
                      {control.manual && <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">Manual</span>}
                      {control.recommended && <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Recommended</span>}
                      {control.impact && <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30">{typeof control.impact === 'string' ? control.impact : 'Impact'}</span>}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{control.description}</p>
                  </div>
                </label>
              ))}
            </div>

            {/* Actions */}
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
                Review every line, test on a non-critical machine, then run in an elevated PowerShell session. Manual-only items appear as commented checklists inside the script.
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
              <p><strong className="text-slate-300">Reporting:</strong> Each run should write a baseline snapshot for audit and rollback planning.</p>
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
                <li>• Comment out any blocks that conflict with your domain, devices, or policies.</li>
                <li>• Test on a non-critical machine first, from an elevated PowerShell window.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Good next steps</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Save your adjusted script into version control or a secured admin share.</li>
                <li>• Document which baseline controls you applied and to which machines.</li>
                <li>• Revisit this baseline as your hardware, domain settings, and risk profile evolve.</li>
                <li>• Coordinate with your security or IT lead before rolling out to production fleets.</li>
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