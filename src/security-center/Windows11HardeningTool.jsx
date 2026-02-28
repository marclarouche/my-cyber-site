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
    //generateScript(newSelection, 'custom');//
  };

  const clearAll = () => {
    setSelectedControls({});
    setProfile('custom');
    setScriptOutput('# No Windows 11 baseline controls selected.\n# Select at least one item, then generate the script again.');
  };

const generateScript = (selection, profileName) => {
  const selectedKeys = Object.keys(selection).filter(k => selection[k]);
  
  if (!selectedKeys.length) {
    setScriptOutput('# No Windows 11 baseline controls selected.\n# Select at least one item, then generate the script again.');
    return;
  }

  const dateStr = new Date().toISOString();
  const profileLabel = profileName === 'relaxed' ? 'Relaxed' : profileName === 'strict' ? 'Strict' : 'Custom';

  const CONTROL_SNIPPETS = {
    bitlockerFde: {
      script: '# ---------------------------------------------------------------------------\n# MANUAL CHECKLIST: BitLocker full disk encryption (Critical)\n# ---------------------------------------------------------------------------\nWrite-Host "Manual task: Verify BitLocker full disk encryption is enabled on all fixed drives." -ForegroundColor Cyan\n# V-253259 – Ensure BitLocker (or equivalent FDE) is enabled for the OS drive and all fixed data drives.\n#\n# Quick steps (per device):\n#   1. Open Control Panel > BitLocker Drive Encryption.\n#   2. Confirm the OS drive and any fixed data drives show "BitLocker on".\n#   3. If any fixed drive shows "Turn on BitLocker", enable it and complete the wizard.\n#   4. Store recovery keys in a safe place (not on the same device).\n#   5. For VDIs refreshed on logoff or AVD with no data at rest, this may be Not Applicable.\n#\n# Note: This script does not attempt to enable BitLocker automatically.',
      rollback: '# BitLocker configuration is not changed by this script. Review drive encryption manually if needed.'
    },
    bitlockerPin: {
      script: '# ---------------------------------------------------------------------------\n# MANUAL CHECKLIST: BitLocker pre-boot PIN (Critical)\n# ---------------------------------------------------------------------------\nWrite-Host "Manual task: Confirm BitLocker pre-boot PIN is required where appropriate." -ForegroundColor Cyan\n# V-253260 – Require additional authentication at startup (for example TPM + PIN).\n#\n# Quick steps (per device or via GPO):\n#   1. Open gpedit.msc.\n#   2. Browse to:\n#        Computer Configuration > Administrative Templates >\n#        Windows Components > BitLocker Drive Encryption > Operating System Drives.\n#   3. Edit "Require additional authentication at startup".\n#   4. Set it to "Enabled" and configure the TPM + PIN options required by your policy.\n#   5. Apply the policy and configure a PIN on each device as appropriate.\n#\n# BitLocker boot authentication is intentionally left as a manual change in this script.',
      rollback: '# To relax BitLocker pre-boot PIN requirements, adjust the same Group Policy setting described above.'
    },
    depOptOut: {
      script: '# ---------------------------------------------------------------------------\n# MANUAL CHECKLIST: System-wide Data Execution Prevention (DEP)\n# ---------------------------------------------------------------------------\nWrite-Host "Manual task: Configure system-wide DEP to at least OptOut (or AlwaysOn)." -ForegroundColor Cyan\n# V-253283 – DEP must be configured to at least OptOut.\n#\n# WARNING: Always suspend BitLocker before changing BCD settings on encrypted systems.\n#\n# Suggested steps:\n#   1. Open an elevated Command Prompt or PowerShell (Run as administrator).\n#   2. Run:  BCDEDIT /enum {current}\n#   3. Check the "nx" value. If it is not "OptOut" or "AlwaysOn", then:\n#   4. After suspending BitLocker if applicable, run:\n#        BCDEDIT /set {current} nx OptOut\n#      or choose the stricter option:\n#        BCDEDIT /set {current} nx AlwaysOn\n#   5. Reboot the system to apply the setting.\n#\n# Note: Applications that are incompatible with DEP can be opted out via System Properties > Advanced > Performance > Settings > DEP tab.',
      rollback: '# To change DEP behavior later, rerun BCDEDIT with the desired nx setting (OptOut, AlwaysOn, or another approved option).'
    },
    sehop: {
      script: '# Enable Structured Exception Handling Overwrite Protection (SEHOP)\nWrite-Host "Enabling SEHOP protection..." -ForegroundColor Cyan\n$sehopPath = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel"\nif (-not (Test-Path $sehopPath)) {\n    New-Item -Path $sehopPath -Force | Out-Null\n}\nNew-ItemProperty -Path $sehopPath -Name "DisableExceptionChainValidation" -Value 0 -PropertyType DWord -Force | Out-Null',
      rollback: '# Roll back SEHOP setting (restore default behavior where possible)\n$sehopPath = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel"\nif (Test-Path $sehopPath) {\n    Remove-ItemProperty -Path $sehopPath -Name "DisableExceptionChainValidation" -ErrorAction SilentlyContinue\n}'
    },
    reversiblePwd: {
      script: '# MANUAL CHECKLIST: Disable reversible password encryption\nWrite-Host "Manual task: Confirm reversible password encryption is disabled in local or domain policy." -ForegroundColor Cyan\n# In Local Security Policy or Group Policy, ensure:\n#   Computer Configuration > Windows Settings > Security Settings > Account Policies > Password Policy\n#     "Store passwords using reversible encryption" is set to Disabled.\n# This script does not attempt to override domain password policies.',
      rollback: '# No automated rollback for reversible password encryption. Adjust local or domain password policies as needed.'
    },
    remoteAssistance: {
      script: '# Block solicited Remote Assistance\nWrite-Host "Disabling solicited Remote Assistance..." -ForegroundColor Cyan\n$raKey = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows NT\\Terminal Services"\nif (-not (Test-Path $raKey)) {\n    New-Item -Path $raKey -Force | Out-Null\n}\nNew-ItemProperty -Path $raKey -Name "fAllowToGetHelp" -Value 0 -PropertyType DWord -Force | Out-Null',
      rollback: '# Roll back Remote Assistance solicited help setting\n$raKey = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows NT\\Terminal Services"\nif (Test-Path $raKey) {\n    Remove-ItemProperty -Path $raKey -Name "fAllowToGetHelp" -ErrorAction SilentlyContinue\n}'
    },
    winrmClientBasic: {
      script: '# Disable Basic authentication for WinRM client\nWrite-Host "Disabling WinRM client Basic authentication..." -ForegroundColor Cyan\n$winrmClientKey = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\WinRM\\Client"\nif (-not (Test-Path $winrmClientKey)) {\n    New-Item -Path $winrmClientKey -Force | Out-Null\n}\nNew-ItemProperty -Path $winrmClientKey -Name "AllowBasic" -Value 0 -PropertyType DWord -Force | Out-Null',
      rollback: '# Roll back WinRM client Basic authentication setting\n$winrmClientKey = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\WinRM\\Client"\nif (Test-Path $winrmClientKey) {\n    Remove-ItemProperty -Path $winrmClientKey -Name "AllowBasic" -ErrorAction SilentlyContinue\n}'
    },
    winrmServiceBasic: {
      script: '# Disable Basic authentication for WinRM service\nWrite-Host "Disabling WinRM service Basic authentication..." -ForegroundColor Cyan\n$winrmServiceKey = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\WinRM\\Service"\nif (-not (Test-Path $winrmServiceKey)) {\n    New-Item -Path $winrmServiceKey -Force | Out-Null\n}\nNew-ItemProperty -Path $winrmServiceKey -Name "AllowBasic" -Value 0 -PropertyType DWord -Force | Out-Null',
      rollback: '# Roll back WinRM service Basic authentication setting\n$winrmServiceKey = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\WinRM\\Service"\nif (Test-Path $winrmServiceKey) {\n    Remove-ItemProperty -Path $winrmServiceKey -Name "AllowBasic" -ErrorAction SilentlyContinue\n}'
    },
    anonSam: {
      script: '# Block anonymous SAM account enumeration\nWrite-Host "Blocking anonymous SAM account enumeration..." -ForegroundColor Cyan\n$lsaKey = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Lsa"\nif (-not (Test-Path $lsaKey)) {\n    New-Item -Path $lsaKey -Force | Out-Null\n}\nNew-ItemProperty -Path $lsaKey -Name "RestrictAnonymousSAM" -Value 1 -PropertyType DWord -Force | Out-Null',
      rollback: '# Roll back anonymous SAM enumeration setting\n$lsaKey = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Lsa"\nif (Test-Path $lsaKey) {\n    Remove-ItemProperty -Path $lsaKey -Name "RestrictAnonymousSAM" -ErrorAction SilentlyContinue\n}'
    },
    anonShares: {
      script: '# Restrict anonymous enumeration of shares\nWrite-Host "Restricting anonymous enumeration of shares..." -ForegroundColor Cyan\n$lsaKey = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Lsa"\nif (-not (Test-Path $lsaKey)) {\n    New-Item -Path $lsaKey -Force | Out-Null\n}\nNew-ItemProperty -Path $lsaKey -Name "RestrictAnonymous" -Value 1 -PropertyType DWord -Force | Out-Null',
      rollback: '# Roll back anonymous shares enumeration setting\n$lsaKey = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Lsa"\nif (Test-Path $lsaKey) {\n    Remove-ItemProperty -Path $lsaKey -Name "RestrictAnonymous" -ErrorAction SilentlyContinue\n}'
    },
    anonPipes: {
      script: '# Restrict anonymous access to named pipes and shares\nWrite-Host "Restricting anonymous access to named pipes and shares..." -ForegroundColor Cyan\n$srvKey = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\LanmanServer\\Parameters"\nif (-not (Test-Path $srvKey)) {\n    New-Item -Path $srvKey -Force | Out-Null\n}\nNew-ItemProperty -Path $srvKey -Name "RestrictNullSessAccess" -Value 1 -PropertyType DWord -Force | Out-Null',
      rollback: '# Roll back anonymous access restriction to named pipes and shares\n$srvKey = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\LanmanServer\\Parameters"\nif (Test-Path $srvKey) {\n    Remove-ItemProperty -Path $srvKey -Name "RestrictNullSessAccess" -ErrorAction SilentlyContinue\n}'
    },
    noLmHash: {
      script: '# Do not store LAN Manager password hashes\nWrite-Host "Disabling storage of LAN Manager (LM) password hashes..." -ForegroundColor Cyan\n$lsaKey = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Lsa"\nif (-not (Test-Path $lsaKey)) {\n    New-Item -Path $lsaKey -Force | Out-Null\n}\nNew-ItemProperty -Path $lsaKey -Name "NoLMHash" -Value 1 -PropertyType DWord -Force | Out-Null',
      rollback: '# Roll back LM hash storage setting\n$lsaKey = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Lsa"\nif (Test-Path $lsaKey) {\n    Remove-ItemProperty -Path $lsaKey -Name "NoLMHash" -ErrorAction SilentlyContinue\n}'
    },
    snmpClient: {
      script: '# MANUAL CHECKLIST: SNMP client not installed\nWrite-Host "Manual task: Verify SNMP client is not installed." -ForegroundColor Cyan\n# Open Control Panel > Programs > Turn Windows features on or off.\n# Ensure "Simple Network Management Protocol (SNMP)" is not enabled.\n# If it is enabled and not required, uncheck it and reboot as appropriate.',
      rollback: '# If SNMP removal caused issues, re-enable SNMP client through Windows Features if required and approved.'
    },
    telnetClient: {
      script: '# MANUAL CHECKLIST: Telnet client not installed\nWrite-Host "Manual task: Verify Telnet client is not installed." -ForegroundColor Cyan\n# Open Control Panel > Programs > Turn Windows features on or off.\n# Confirm "Telnet Client" is not enabled. If enabled and not required, uncheck it.\n# Telnet sends traffic in clear text and should not be used on modern networks.',
      rollback: '# If Telnet is needed for legacy troubleshooting, re-enable "Telnet Client" via Windows Features with care.'
    },
    tftpClient: {
      script: '# MANUAL CHECKLIST: TFTP client not installed\nWrite-Host "Manual task: Verify TFTP client is not installed." -ForegroundColor Cyan\n# Open Control Panel > Programs > Turn Windows features on or off.\n# Confirm "TFTP Client" is not enabled. If enabled and not required, uncheck it.\n# TFTP offers no encryption or authentication and should generally be avoided.',
      rollback: '# If TFTP is needed in a lab, re-enable "TFTP Client" only on non-production systems.'
    },
    smb1Feature: {
      script: '# Disable SMB 1.0 optional feature\nWrite-Host "Disabling SMB 1.0 optional feature..." -ForegroundColor Cyan\ntry {\n    Disable-WindowsOptionalFeature -Online -FeatureName "SMB1Protocol" -NoRestart -ErrorAction Stop\n} catch {\n    Write-Host "Could not disable SMB1Protocol feature (it may already be removed or unavailable)." -ForegroundColor DarkYellow\n}',
      rollback: '# Roll back SMB 1.0 optional feature (not recommended)\nWrite-Host "If you must re-enable SMB 1.0, run:" -ForegroundColor Yellow\nWrite-Host "  Enable-WindowsOptionalFeature -Online -FeatureName SMB1Protocol -All" -ForegroundColor Yellow'
    },
    smb1Server: {
      script: '# Disable SMBv1 server component\nWrite-Host "Disabling SMBv1 server component..." -ForegroundColor Cyan\n$srvKey = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\LanmanServer\\Parameters"\nif (-not (Test-Path $srvKey)) {\n    New-Item -Path $srvKey -Force | Out-Null\n}\nNew-ItemProperty -Path $srvKey -Name "SMB1" -Value 0 -PropertyType DWord -Force | Out-Null',
      rollback: '# Roll back SMBv1 server component (not recommended)\n$srvKey = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\LanmanServer\\Parameters"\nif (Test-Path $srvKey) {\n    Remove-ItemProperty -Path $srvKey -Name "SMB1" -ErrorAction SilentlyContinue\n}'
    },
    smb1Client: {
      script: '# Disable SMBv1 client driver\nWrite-Host "Disabling SMBv1 client driver..." -ForegroundColor Cyan\n$cliKey = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\mrxsmb10"\nif (Test-Path $cliKey) {\n    New-ItemProperty -Path $cliKey -Name "Start" -Value 4 -PropertyType DWord -Force | Out-Null\n} else {\n    Write-Host "SMBv1 client driver key not found (likely already removed)." -ForegroundColor DarkYellow\n}',
      rollback: '# Roll back SMBv1 client driver (not recommended)\n$cliKey = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\mrxsmb10"\nif (Test-Path $cliKey) {\n    # Default is often 2 (Automatic) on older builds; confirm in your environment before changing.\n    Remove-ItemProperty -Path $cliKey -Name "Start" -ErrorAction SilentlyContinue\n}'
    },
    smbInsecureGuest: {
      script: '# Disable insecure guest logons to SMB servers\nWrite-Host "Disabling insecure SMB guest logons..." -ForegroundColor Cyan\n$polKey = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\LanmanWorkstation\\Parameters"\nif (-not (Test-Path $polKey)) {\n    New-Item -Path $polKey -Force | Out-Null\n}\nNew-ItemProperty -Path $polKey -Name "AllowInsecureGuestAuth" -Value 0 -PropertyType DWord -Force | Out-Null',
      rollback: '# Roll back insecure guest logon policy (not recommended)\n$polKey = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\LanmanWorkstation\\Parameters"\nif (Test-Path $polKey) {\n    Remove-ItemProperty -Path $polKey -Name "AllowInsecureGuestAuth" -ErrorAction SilentlyContinue\n}'
    },
    eccCurves: {
      script: '# Prioritize stronger ECC curves\nWrite-Host "Setting ECC curve priority (NistP384 before NistP256)..." -ForegroundColor Cyan\n$tlsKey = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Cryptography\\Configuration\\SSL\\0010002"\nif (-not (Test-Path $tlsKey)) {\n    New-Item -Path $tlsKey -Force | Out-Null\n}\n$curves = "NistP384","NistP256"\nNew-ItemProperty -Path $tlsKey -Name "EccCurves" -Value ($curves -join ",") -PropertyType String -Force | Out-Null',
      rollback: '# Roll back ECC curve priority setting\n$tlsKey = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Cryptography\\Configuration\\SSL\\0010002"\nif (Test-Path $tlsKey) {\n    Remove-ItemProperty -Path $tlsKey -Name "EccCurves" -ErrorAction SilentlyContinue\n}'
    },
    facialSpoof: {
      script: '# Enable enhanced anti-spoofing for Windows Hello facial recognition\nWrite-Host "Enabling enhanced anti-spoofing for Windows Hello (where supported)..." -ForegroundColor Cyan\n$helloKey = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Biometrics\\FacialFeatures"\nif (-not (Test-Path $helloKey)) {\n    New-Item -Path $helloKey -Force | Out-Null\n}\nNew-ItemProperty -Path $helloKey -Name "EnhancedAntiSpoofing" -Value 1 -PropertyType DWord -Force | Out-Null',
      rollback: '# Roll back enhanced anti-spoofing policy\n$helloKey = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Biometrics\\FacialFeatures"\nif (Test-Path $helloKey) {\n    Remove-ItemProperty -Path $helloKey -Name "EnhancedAntiSpoofing" -ErrorAction SilentlyContinue\n}'
    },
    smartScreenExplorer: {
      script: '# Enable Windows Defender SmartScreen for Explorer\nWrite-Host "Enabling Defender SmartScreen for File Explorer..." -ForegroundColor Cyan\n$smKey = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\System"\nif (-not (Test-Path $smKey)) {\n    New-Item -Path $smKey -Force | Out-Null\n}\nNew-ItemProperty -Path $smKey -Name "EnableSmartScreen" -Value 1 -PropertyType DWord -Force | Out-Null\nNew-ItemProperty -Path $smKey -Name "ShellSmartScreenLevel" -Value "Block" -PropertyType String -Force | Out-Null',
      rollback: '# Roll back Explorer SmartScreen policy\n$smKey = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\System"\nif (Test-Path $smKey) {\n    Remove-ItemProperty -Path $smKey -Name "EnableSmartScreen" -ErrorAction SilentlyContinue\n    Remove-ItemProperty -Path $smKey -Name "ShellSmartScreenLevel" -ErrorAction SilentlyContinue\n}'
    },
    explorerDep: {
      script: '# Require DEP for File Explorer\nWrite-Host "Ensuring DEP remains enabled for File Explorer..." -ForegroundColor Cyan\n$expKey = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\Explorer"\nif (-not (Test-Path $expKey)) {\n    New-Item -Path $expKey -Force | Out-Null\n}\n# Clear any configuration that would allow Explorer to turn DEP off.\nRemove-ItemProperty -Path $expKey -Name "NoDataExecutionPrevention" -ErrorAction SilentlyContinue',
      rollback: '# No rollback required: default is to leave DEP protections in place for Explorer.\n# If you previously relied on NoDataExecutionPrevention for a legacy add-in, re-add that value manually (not recommended).'
    },
    shellProtectedMode: {
      script: '# Keep shell protocol in protected mode\nWrite-Host "Ensuring shell protocol is kept in protected mode..." -ForegroundColor Cyan\n$shellKey = "HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Shell Extensions"\n# Clear legacy behavior override if present.\nif (Test-Path $shellKey) {\n    Remove-ItemProperty -Path $shellKey -Name "PreXPSP2ShellProtocolBehavior" -ErrorAction SilentlyContinue\n}',
      rollback: '# No rollback required: default is to run shell protocols in protected mode.\n# Re-adding PreXPSP2ShellProtocolBehavior to relax protections is strongly discouraged.'
    },
    dmaProtection: {
      script: '# Enable Kernel DMA Protection policy where supported\nWrite-Host "Configuring Kernel DMA Protection policy..." -ForegroundColor Cyan\n$dmaKey = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\Kernel DMA Protection"\nif (-not (Test-Path $dmaKey)) {\n    New-Item -Path $dmaKey -Force | Out-Null\n}\nNew-ItemProperty -Path $dmaKey -Name "DeviceEnumerationPolicy" -Value 0 -PropertyType DWord -Force | Out-Null\n# 0 = Block external DMA devices until the user signs in or unlocks the screen (where hardware supports it).',
      rollback: '# Roll back Kernel DMA Protection policy\n$dmaKey = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\Kernel DMA Protection"\nif (Test-Path $dmaKey) {\n    Remove-ItemProperty -Path $dmaKey -Name "DeviceEnumerationPolicy" -ErrorAction SilentlyContinue\n}'
    },
    strongSessionKey: {
      script: '# Require strong Netlogon session keys\nWrite-Host "Requiring strong Netlogon session keys..." -ForegroundColor Cyan\n$netKey = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Netlogon\\Parameters"\nif (-not (Test-Path $netKey)) {\n    New-Item -Path $netKey -Force | Out-Null\n}\nNew-ItemProperty -Path $netKey -Name "RequireStrongKey" -Value 1 -PropertyType DWord -Force | Out-Null',
      rollback: '# Roll back strong Netlogon key requirement\n$netKey = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Netlogon\\Parameters"\nif (Test-Path $netKey) {\n    Remove-ItemProperty -Path $netKey -Name "RequireStrongKey" -ErrorAction SilentlyContinue\n}'
    },
    kerberosTypes: {
      script: '# Harden Kerberos encryption types\nWrite-Host "Hardening Kerberos supported encryption types..." -ForegroundColor Cyan\n$kdcKey = "HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\\Kerberos"\nif (-not (Test-Path $kdcKey)) {\n    New-Item -Path $kdcKey -Force | Out-Null\n}\n# 0x7ffffff8 disables legacy DES and RC4 while allowing modern AES (per hardening guidance).\nNew-ItemProperty -Path $kdcKey -Name "SupportedEncryptionTypes" -Value 0x7ffffff8 -PropertyType DWord -Force | Out-Null',
      rollback: '# Roll back Kerberos SupportedEncryptionTypes (use with care)\n$kdcKey = "HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\\Kerberos"\nif (Test-Path $kdcKey) {\n    Remove-ItemProperty -Path $kdcKey -Name "SupportedEncryptionTypes" -ErrorAction SilentlyContinue\n}'
    },
    appCompatInventory: {
      script: '# Disable AppCompat program inventory telemetry\nWrite-Host "Disabling Application Compatibility Inventory telemetry..." -ForegroundColor Cyan\n$acKey = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\AppCompat"\nif (-not (Test-Path $acKey)) {\n    New-Item -Path $acKey -Force | Out-Null\n}\nNew-ItemProperty -Path $acKey -Name "DisableInventory" -Value 1 -PropertyType DWord -Force | Out-Null',
      rollback: '# Roll back AppCompat inventory telemetry setting\n$acKey = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\AppCompat"\nif (Test-Path $acKey) {\n    Remove-ItemProperty -Path $acKey -Name "DisableInventory" -ErrorAction SilentlyContinue\n}'
    },
    consumerExperience: {
      script: '# Turn off Microsoft consumer experiences\nWrite-Host "Turning off Microsoft consumer experiences..." -ForegroundColor Cyan\n$ceKey = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\CloudContent"\nif (-not (Test-Path $ceKey)) {\n    New-Item -Path $ceKey -Force | Out-Null\n}\nNew-ItemProperty -Path $ceKey -Name "DisableWindowsConsumerFeatures" -Value 1 -PropertyType DWord -Force | Out-Null',
      rollback: '# Roll back Microsoft consumer experiences policy\n$ceKey = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\CloudContent"\nif (Test-Path $ceKey) {\n    Remove-ItemProperty -Path $ceKey -Name "DisableWindowsConsumerFeatures" -ErrorAction SilentlyContinue\n}'
    },
    explorerHeapCorruption: {
      script: '# Keep Explorer heap termination on corruption enabled\nWrite-Host "Ensuring Explorer terminates on heap corruption..." -ForegroundColor Cyan\n$expKey = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\Explorer"\nif (-not (Test-Path $expKey)) {\n    New-Item -Path $expKey -Force | Out-Null\n}\nRemove-ItemProperty -Path $expKey -Name "NoHeapTerminationOnCorruption" -ErrorAction SilentlyContinue',
      rollback: '# No rollback required: default behavior is to terminate on heap corruption.\n# Re-introducing NoHeapTerminationOnCorruption is discouraged.'
    }
  };

  const lines = [];
  lines.push('# ===============================================');
  lines.push('# Windows 11 Security Baseline Script');
  lines.push('# Generated by Windows 11 Security Baseline Script Assistant – CyberLife Coach');
  lines.push('# Date: ' + dateStr);
  lines.push('# Profile: ' + profileLabel);
  lines.push('#');
  lines.push('# This script applies Windows 11 hardening steps, then writes a simple JSON');
  lines.push('# baseline snapshot before and after changes under:');
  lines.push('#   C:\\SecurityTools\\Reports\\Win11Baseline');
  lines.push('#');
  lines.push('# Review every line before running.');
  lines.push('# Test on a non-critical system first and ensure you have backups and a rollback plan.');
  lines.push('# Run this script from an elevated PowerShell session (Run as administrator).');
  lines.push('# ===============================================');
  lines.push('');
  lines.push('Set-StrictMode -Version Latest');
  lines.push('$ErrorActionPreference = "Stop"');
  lines.push('');
  lines.push('function Get-Win11BaselineState {');
  lines.push('    [CmdletBinding()]');
  lines.push('    param(');
  lines.push('        [string[]] $SelectedKeys');
  lines.push('    )');
  lines.push('');
  lines.push('    $os = Get-CimInstance Win32_OperatingSystem -ErrorAction SilentlyContinue');
  lines.push('    $version = if ($os) { $os.Version } else { $null }');
  lines.push('');
  lines.push('    $state = [ordered]@{');
  lines.push('        MachineName       = $env:COMPUTERNAME');
  lines.push('        OSVersion         = $version');
  lines.push('        CollectionTimeUtc = (Get-Date).ToUniversalTime().ToString("o")');
  lines.push('        SelectedKeys      = $SelectedKeys');
  lines.push('    }');
  lines.push('');
  lines.push('    return $state');
  lines.push('}');
  lines.push('');
  lines.push('function Export-Win11BaselineReport {');
  lines.push('    [CmdletBinding()]');
  lines.push('    param(');
  lines.push('        [Parameter(Mandatory = $true)]');
  lines.push('        [ValidateSet("Pre","Post")]');
  lines.push('        [string] $Phase,');
  lines.push('');
  lines.push('        [string[]] $SelectedKeys');
  lines.push('    )');
  lines.push('');
  lines.push('    $basePath = "C:\\SecurityTools\\Reports\\Win11Baseline"');
  lines.push('    if (-not (Test-Path $basePath)) {');
  lines.push('        New-Item -Path $basePath -ItemType Directory -Force | Out-Null');
  lines.push('    }');
  lines.push('');
  lines.push('    $state = Get-Win11BaselineState -SelectedKeys $SelectedKeys');
lines.push('    $timestamp = (Get-Date).ToString("yyyyMMdd_HHmmss")');
lines.push('    $fileName  = "Win11Baseline_{0}_{1}_{2}.json" -f $Phase, $env:COMPUTERNAME, $timestamp');
lines.push('    $fullPath  = Join-Path $basePath $fileName');
lines.push('');
lines.push('    $state | ConvertTo-Json -Depth 4 | Set-Content -Path $fullPath -Encoding UTF8');
lines.push('    Write-Host ("{0} baseline report written to: {1}" -f $Phase, $fullPath) -ForegroundColor Cyan');
lines.push('');
lines.push('    return $fullPath');
lines.push('}');
lines.push('');
lines.push('function Invoke-Win11Baseline {');
lines.push('    [CmdletBinding()]');
lines.push('    param(');
lines.push('        [string[]] $SelectedKeys');
lines.push('    )');
lines.push('');
lines.push('    if (-not $SelectedKeys -or $SelectedKeys.Count -eq 0) {');
lines.push('        Write-Host "No controls selected. Nothing to apply." -ForegroundColor Yellow');
lines.push('        return');
lines.push('    }');
lines.push('');
lines.push('    Write-Host "Selected controls:" -ForegroundColor Cyan');
lines.push('    $SelectedKeys | ForEach-Object { "  - $_" }');
lines.push('    Write-Host ""');
lines.push('');
lines.push('    Write-Host "Collecting PRE-change baseline snapshot..." -ForegroundColor Cyan');
lines.push('    $preReport = Export-Win11BaselineReport -Phase Pre -SelectedKeys $SelectedKeys');
lines.push('');
lines.push('    Write-Host "Applying Windows 11 baseline controls..." -ForegroundColor Cyan');
lines.push('    Write-Host ""');
lines.push('');
lines.push('    # You can comment out any control blocks below that you do not want to apply.');
lines.push('');
lines.push('    # --- Begin selected hardening items ---');
lines.push('');
selectedKeys.forEach(key => {
const definition = CONTROL_SNIPPETS[key];
if (definition && definition.script) {
definition.script.split('\n').forEach(line => {
lines.push('    ' + line);
});
lines.push('');
}
});
lines.push('    # --- End selected hardening items ---');
lines.push('');
lines.push('    Write-Host "Collecting POST-change baseline snapshot..." -ForegroundColor Cyan');
lines.push('    $postReport = Export-Win11BaselineReport -Phase Post -SelectedKeys $SelectedKeys');
lines.push('');
lines.push('    Write-Host ""');
lines.push('    Write-Host "Windows 11 baseline completed." -ForegroundColor Green');
lines.push('    Write-Host ("Pre-change report : {0}" -f $preReport) -ForegroundColor Green');
lines.push('    Write-Host ("Post-change report: {0}" -f $postReport) -ForegroundColor Green');
lines.push('    Write-Host ""');
lines.push('    Write-Host "Reminder: BitLocker, DEP, and Windows Features marked as MANUAL must still be verified by hand." -ForegroundColor Yellow');
lines.push('}');
lines.push('');
lines.push('function Invoke-Win11BaselineRollback {');
lines.push('    [CmdletBinding()]');
lines.push('    param(');
lines.push('        [string[]] $SelectedKeys');
lines.push('    )');
lines.push('');
lines.push('    if (-not $SelectedKeys -or $SelectedKeys.Count -eq 0) {');
lines.push('        Write-Host "No controls selected for rollback. Use the same list of keys you applied." -ForegroundColor Yellow');
lines.push('        return');
lines.push('    }');
lines.push('');
lines.push('    Write-Host "Rolling back registry-based Windows 11 baseline controls selected by this assistant..." -ForegroundColor Yellow');
lines.push('    Write-Host "Selected controls:" -ForegroundColor Yellow');
lines.push('    $SelectedKeys | ForEach-Object { "  - $_" }');
lines.push('    Write-Host ""');
lines.push('');
lines.push('    # This rollback only removes registry values created by this assistant for the controls you selected.');
lines.push('    # It does not undo Group Policy Objects, BCDEdit changes, BitLocker settings, or Windows Features changed manually.');
lines.push('');
selectedKeys.forEach(key => {
const definition = CONTROL_SNIPPETS[key];
if (definition && definition.rollback) {
definition.rollback.split('\n').forEach(line => {
lines.push('    ' + line);
});
lines.push('');
}
});
lines.push('    Write-Host ""');
lines.push('    Write-Host "Rollback complete for registry-based items. Review BitLocker, DEP, and Windows Features manually." -ForegroundColor Yellow');
lines.push('}');
lines.push('');
lines.push('# Helper: the list of controls baked into this script at generation time.');
lines.push('$selectedKeys = @(');
selectedKeys.forEach((key, index) => {
lines.push('    "' + key + '"' + (index < selectedKeys.length - 1 ? ',' : ''));
});
lines.push(')');
lines.push('');
lines.push('# To apply the baseline:');
lines.push('#   Invoke-Win11Baseline -SelectedKeys $selectedKeys');
lines.push('#');
lines.push('# To roll back registry-based parts of this baseline:');
lines.push('#   Invoke-Win11BaselineRollback -SelectedKeys $selectedKeys');
lines.push('');
lines.push('Write-Host "Script loaded. Review, then run Invoke-Win11Baseline when ready." -ForegroundColor Cyan');
setScriptOutput(lines.join('\n'));
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

            <button
  onClick={() => window.location.href = '/security-center'}
  className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-all duration-300 border border-slate-700 hover:border-cyan-500"
>
  <ArrowLeft className="w-4 h-4" />
  <span>Back to Security Center</span>
</button>

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
            Windows 11 Secure Setup
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