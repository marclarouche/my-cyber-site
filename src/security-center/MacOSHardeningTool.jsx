import React, { useState, useEffect } from 'react';
import { Shield, ArrowLeft, Copy, Download, Trash2, Settings, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function MacOSBaselineAssistant() {
  const [profile, setProfile] = useState('relaxed');
  const [selectedControls, setSelectedControls] = useState({});
  const [scriptOutput, setScriptOutput] = useState('');
  const [downloadFormat, setDownloadFormat] = useState('sh');

  // Control definitions with script snippets
  const controls = [
    {
      key: 'filevaultEnforced',
      title: 'Enforce FileVault full-disk encryption',
      description: 'FileVault 2 encrypts the entire startup disk. Consult Apple and organization policy for proper rollout, including user education and escrow of recovery keys.',
      severity: 'critical',
      manual: true,
      recommended: true,
      impact: false,
      script: `  # filevaultEnforced
  echo "[MANUAL] Enforce FileVault full-disk encryption"
  echo "  1. Open System Settings > Privacy & Security > FileVault"
  echo "  2. Turn on FileVault if not enabled"
  echo "  3. Record or escrow the recovery key in your organization's key management solution"
  echo "  4. Confirm encryption is in progress or complete"`,
      rollback: `  # filevaultEnforced rollback
  echo "[MANUAL] FileVault can be disabled in System Settings > Privacy & Security > FileVault"
  echo "  (Requires admin privileges and may take time to decrypt)"` },
    {
      key: 'sipEnabled',
      title: 'System Integrity Protection (SIP) enabled',
      description: 'SIP protects system files and processes from modification. Disabling SIP is strongly discouraged except for advanced development scenarios. Verify with csrutil status.',
      severity: 'critical',
      manual: true,
      recommended: true,
      impact: false,
      script: `  # sipEnabled
  echo "[MANUAL] System Integrity Protection (SIP) should remain enabled"
  echo "  1. Boot into macOS Recovery (Command-R at startup)"
  echo "  2. Open Terminal from Utilities menu"
  echo "  3. Run: csrutil status"
  echo "  4. If disabled, run: csrutil enable"
  echo "  5. Reboot normally"`,
      rollback: `  # sipEnabled rollback
  echo "[MANUAL] SIP can be disabled in Recovery mode with: csrutil disable"
  echo "  (Not recommended for production systems)"` },
    {
      key: 'sshdFips',
      title: 'sshd: require FIPS 140-2 approved ciphers',
      description: 'Restricts sshd to FIPS-approved ciphers. Older SSH clients may lose connectivity. Test thoroughly.',
      severity: 'critical',
      manual: false,
      recommended: false,
      impact: 'higher',
      script: `  # sshdFips
  echo "[INFO] Configuring sshd to require FIPS 140-2 approved ciphers..."
  SSH_CONFIG="/etc/ssh/sshd_config"
  if [ -f "$SSH_CONFIG" ]; then
    grep -q "^Ciphers " "$SSH_CONFIG" 2>/dev/null && sed -i '' '/^Ciphers /d' "$SSH_CONFIG"
    echo "Ciphers aes128-cbc,aes192-cbc,aes256-cbc,aes128-ctr,aes192-ctr,aes256-ctr" >> "$SSH_CONFIG"
    echo "[INFO] sshd Ciphers line added. Restart sshd or reboot to apply."
  else
    echo "[WARN] $SSH_CONFIG not found. SSH may not be enabled."
  fi`,
      rollback: `  # sshdFips rollback
  SSH_CONFIG="/etc/ssh/sshd_config"
  if [ -f "$SSH_CONFIG" ]; then
    sed -i '' '/^Ciphers aes128-cbc,aes192-cbc,aes256-cbc,aes128-ctr,aes192-ctr,aes256-ctr/d' "$SSH_CONFIG"
    echo "[INFO] Removed FIPS cipher restriction from sshd_config"
  fi` },
    {
      key: 'sshFipsClient',
      title: 'ssh client: require FIPS 140-2 approved ciphers',
      description: 'Restricts the SSH client to FIPS-approved ciphers. May prevent connecting to older servers.',
      severity: 'critical',
      manual: false,
      recommended: false,
      impact: 'higher',
      script: `  # sshFipsClient
  echo "[INFO] Configuring ssh client to require FIPS 140-2 approved ciphers..."
  SSH_CLIENT_CONFIG="/etc/ssh/ssh_config"
  if [ -f "$SSH_CLIENT_CONFIG" ]; then
    grep -q "^  Ciphers " "$SSH_CLIENT_CONFIG" 2>/dev/null && sed -i '' '/^  Ciphers /d' "$SSH_CLIENT_CONFIG"
    echo "  Ciphers aes128-cbc,aes192-cbc,aes256-cbc,aes128-ctr,aes192-ctr,aes256-ctr" >> "$SSH_CLIENT_CONFIG"
    echo "[INFO] ssh client Ciphers line added."
  else
    echo "[WARN] $SSH_CLIENT_CONFIG not found."
  fi`,
      rollback: `  # sshFipsClient rollback
  SSH_CLIENT_CONFIG="/etc/ssh/ssh_config"
  if [ -f "$SSH_CLIENT_CONFIG" ]; then
    sed -i '' '/^  Ciphers aes128-cbc,aes192-cbc,aes256-cbc,aes128-ctr,aes192-ctr,aes256-ctr/d' "$SSH_CLIENT_CONFIG"
    echo "[INFO] Removed FIPS cipher restriction from ssh_config"
  fi` },
    {
      key: 'sshDisablePasswordAuth',
      title: 'SSH: disable password authentication',
      description: 'Forces SSH key-based authentication only. Ensure SSH keys are deployed before applying.',
      severity: 'critical',
      manual: false,
      recommended: false,
      impact: 'higher',
      script: `  # sshDisablePasswordAuth
  echo "[INFO] Disabling SSH password authentication..."
  SSH_CONFIG="/etc/ssh/sshd_config"
  if [ -f "$SSH_CONFIG" ]; then
    grep -q "^PasswordAuthentication " "$SSH_CONFIG" 2>/dev/null && sed -i '' '/^PasswordAuthentication /d' "$SSH_CONFIG"
    echo "PasswordAuthentication no" >> "$SSH_CONFIG"
    echo "[INFO] SSH password authentication disabled. Restart sshd or reboot to apply."
  else
    echo "[WARN] $SSH_CONFIG not found."
  fi`,
      rollback: `  # sshDisablePasswordAuth rollback
  SSH_CONFIG="/etc/ssh/sshd_config"
  if [ -f "$SSH_CONFIG" ]; then
    sed -i '' '/^PasswordAuthentication no/d' "$SSH_CONFIG"
    echo "PasswordAuthentication yes" >> "$SSH_CONFIG"
    echo "[INFO] Re-enabled SSH password authentication"
  fi` },
    {
      key: 'disableTftpService',
      title: 'Disable TFTP service',
      description: 'TFTP is unencrypted and rarely needed. Disabling it reduces attack surface.',
      severity: 'critical',
      manual: false,
      recommended: true,
      impact: false,
      script: `  # disableTftpService
  echo "[INFO] Disabling TFTP service..."
  if launchctl list | grep -q "com.apple.tftpd"; then
    launchctl unload -w /System/Library/LaunchDaemons/tftp.plist 2>/dev/null || echo "[WARN] Could not unload tftp.plist"
  fi
  echo "[INFO] TFTP service disabled."`,
      rollback: `  # disableTftpService rollback
  echo "[INFO] Re-enabling TFTP service..."
  launchctl load -w /System/Library/LaunchDaemons/tftp.plist 2>/dev/null || echo "[WARN] Could not load tftp.plist"` },
    {
      key: 'gatekeeperEnabled',
      title: 'Gatekeeper enabled',
      description: 'Gatekeeper verifies downloaded applications are from identified developers. Essential for preventing malware.',
      severity: 'critical',
      manual: false,
      recommended: true,
      impact: false,
      script: `  # gatekeeperEnabled
  echo "[INFO] Enabling Gatekeeper..."
  spctl --master-enable 2>/dev/null || echo "[WARN] Could not enable Gatekeeper"
  echo "[INFO] Gatekeeper enabled."`,
      rollback: `  # gatekeeperEnabled rollback
  echo "[INFO] Disabling Gatekeeper..."
  spctl --master-disable 2>/dev/null || echo "[WARN] Could not disable Gatekeeper"` },
    {
      key: 'gatekeeperBlockUnidentified',
      title: 'Gatekeeper: block unidentified applications',
      description: 'Prevents running apps from unidentified developers. May require user bypass for some legitimate software.',
      severity: 'critical',
      manual: false,
      recommended: false,
      impact: 'higher',
      script: `  # gatekeeperBlockUnidentified
  echo "[INFO] Configuring Gatekeeper to block unidentified apps..."
  spctl --global-disable 2>/dev/null || echo "[WARN] Could not configure Gatekeeper global setting"
  defaults write /Library/Preferences/com.apple.security GKAutoRearm -bool true 2>/dev/null || true
  echo "[INFO] Gatekeeper set to block unidentified apps."`,
      rollback: `  # gatekeeperBlockUnidentified rollback
  echo "[INFO] Allowing unidentified apps (with user confirmation)..."
  spctl --global-enable 2>/dev/null || echo "[WARN] Could not enable global setting"
  defaults delete /Library/Preferences/com.apple.security GKAutoRearm 2>/dev/null || true` },
    {
      key: 'adminPasswordForSystemPrefs',
      title: 'Require admin password for System Preferences',
      description: 'Forces authentication before changing system settings. Recommended for shared workstations.',
      severity: 'critical',
      manual: false,
      recommended: false,
      impact: false,
      script: `  # adminPasswordForSystemPrefs
  echo "[INFO] Requiring admin password for System Preferences..."
  security authorizationdb write system.preferences authenticate-admin 2>/dev/null || echo "[WARN] Could not set authorization policy"
  echo "[INFO] Admin password now required for System Preferences."`,
      rollback: `  # adminPasswordForSystemPrefs rollback
  echo "[INFO] Removing admin password requirement for System Preferences..."
  security authorizationdb write system.preferences authenticate-session-owner 2>/dev/null || echo "[WARN] Could not reset policy"` },
    {
      key: 'auditLogsNoAcls',
      title: 'Audit logs: do not contain ACLs',
      description: 'Removes ACLs from audit logs to simplify permissions and improve security.',
      severity: 'critical',
      manual: false,
      recommended: true,
      impact: false,
      script: `  # auditLogsNoAcls
  echo "[INFO] Removing ACLs from audit logs..."
  chmod -N /var/audit/* 2>/dev/null || echo "[WARN] Could not remove ACLs from audit logs"
  echo "[INFO] ACLs removed from audit logs."`,
      rollback: `  # auditLogsNoAcls rollback
  echo "[MANUAL] Restoring ACLs requires backup or manual configuration"` },
    {
      key: 'auditFolderNoAcls',
      title: 'Audit folder: do not contain ACLs',
      description: 'Removes ACLs from the audit folder directory itself.',
      severity: 'critical',
      manual: false,
      recommended: true,
      impact: false,
      script: `  # auditFolderNoAcls
  echo "[INFO] Removing ACLs from /var/audit folder..."
  chmod -N /var/audit 2>/dev/null || echo "[WARN] Could not remove ACLs from /var/audit"
  echo "[INFO] ACLs removed from audit folder."`,
      rollback: `  # auditFolderNoAcls rollback
  echo "[MANUAL] Restoring ACLs requires backup or manual configuration"` },
    {
      key: 'rootLoginDisabled',
      title: 'Disable root login',
      description: 'Prevents direct root login. Use sudo instead for better accountability.',
      severity: 'critical',
      manual: false,
      recommended: true,
      impact: false,
      script: `  # rootLoginDisabled
  echo "[INFO] Disabling root login..."
  dscl . -create /Users/root UserShell /usr/bin/false 2>/dev/null || echo "[WARN] Could not set root shell"
  echo "[INFO] Root login disabled."`,
      rollback: `  # rootLoginDisabled rollback
  echo "[INFO] Re-enabling root login..."
  dscl . -create /Users/root UserShell /bin/bash 2>/dev/null || echo "[WARN] Could not reset root shell"` },
    {
      key: 'sudoLogEvents',
      title: 'Log sudo events',
      description: 'Ensures sudo usage is logged for auditing and forensics.',
      severity: 'critical',
      manual: false,
      recommended: true,
      impact: false,
      script: `  # sudoLogEvents
  echo "[INFO] Configuring sudo to log all events..."
  SUDOERS_LOG="/etc/sudoers.d/cyberlifecoach_sudo_log"
  echo "Defaults logfile=/var/log/sudo.log" > "$SUDOERS_LOG"
  echo "Defaults log_input,log_output" >> "$SUDOERS_LOG"
  chmod 440 "$SUDOERS_LOG"
  echo "[INFO] Sudo logging configured."`,
      rollback: `  # sudoLogEvents rollback
  SUDOERS_LOG="/etc/sudoers.d/cyberlifecoach_sudo_log"
  if [ -f "$SUDOERS_LOG" ]; then
    rm -f "$SUDOERS_LOG"
    echo "[INFO] Sudo logging configuration removed"
  fi` },
    {
      key: 'sshDisableRootLogin',
      title: 'SSH: disable root login',
      description: 'Prevents root SSH access. Forces use of sudo for administrative tasks.',
      severity: 'critical',
      manual: false,
      recommended: true,
      impact: false,
      script: `  # sshDisableRootLogin
  echo "[INFO] Disabling SSH root login..."
  SSH_CONFIG="/etc/ssh/sshd_config"
  if [ -f "$SSH_CONFIG" ]; then
    grep -q "^PermitRootLogin " "$SSH_CONFIG" 2>/dev/null && sed -i '' '/^PermitRootLogin /d' "$SSH_CONFIG"
    echo "PermitRootLogin no" >> "$SSH_CONFIG"
    echo "[INFO] SSH root login disabled. Restart sshd or reboot to apply."
  else
    echo "[WARN] $SSH_CONFIG not found."
  fi`,
      rollback: `  # sshDisableRootLogin rollback
  SSH_CONFIG="/etc/ssh/sshd_config"
  if [ -f "$SSH_CONFIG" ]; then
    sed -i '' '/^PermitRootLogin no/d' "$SSH_CONFIG"
    echo "PermitRootLogin yes" >> "$SSH_CONFIG"
    echo "[INFO] Re-enabled SSH root login"
  fi` },
    {
      key: 'smbSharingDisabled',
      title: 'Disable SMB file sharing',
      description: 'Disables SMB/CIFS file sharing to reduce attack surface. Re-enable if file sharing is required.',
      severity: 'medium',
      manual: false,
      recommended: false,
      impact: 'higher',
      script: `  # smbSharingDisabled
  echo "[INFO] Disabling SMB file sharing..."
  launchctl unload -w /System/Library/LaunchDaemons/com.apple.smbd.plist 2>/dev/null || echo "[WARN] Could not unload SMB daemon"
  defaults write /Library/Preferences/SystemConfiguration/com.apple.smb.server EnabledServices -array 2>/dev/null || true
  echo "[INFO] SMB file sharing disabled."`,
      rollback: `  # smbSharingDisabled rollback
  echo "[INFO] Re-enabling SMB file sharing..."
  launchctl load -w /System/Library/LaunchDaemons/com.apple.smbd.plist 2>/dev/null || echo "[WARN] Could not load SMB daemon"` },
    {
      key: 'webServerDisabled',
      title: 'Disable built-in web server',
      description: 'Disables Apache web server. Most users do not need this service running.',
      severity: 'medium',
      manual: false,
      recommended: true,
      impact: false,
      script: `  # webServerDisabled
  echo "[INFO] Disabling built-in web server..."
  apachectl stop 2>/dev/null || echo "[INFO] Web server not running"
  launchctl unload -w /System/Library/LaunchDaemons/org.apache.httpd.plist 2>/dev/null || echo "[WARN] Could not unload httpd"
  echo "[INFO] Built-in web server disabled."`,
      rollback: `  # webServerDisabled rollback
  echo "[INFO] Re-enabling built-in web server..."
  launchctl load -w /System/Library/LaunchDaemons/org.apache.httpd.plist 2>/dev/null || echo "[WARN] Could not load httpd"
  apachectl start 2>/dev/null || echo "[INFO] Web server started"` },
    {
      key: 'usageDataDisabled',
      title: 'Disable diagnostic and usage data sharing',
      description: 'Stops sending diagnostic data to Apple. May reduce personalized support.',
      severity: 'medium',
      manual: false,
      recommended: false,
      impact: false,
      script: `  # usageDataDisabled
  echo "[INFO] Disabling diagnostic and usage data sharing..."
  defaults write /Library/Application\\ Support/CrashReporter/DiagnosticMessagesHistory.plist AutoSubmit -bool false 2>/dev/null || true
  defaults write /Library/Application\\ Support/CrashReporter/DiagnosticMessagesHistory.plist ThirdPartyDataSubmit -bool false 2>/dev/null || true
  echo "[INFO] Diagnostic and usage data sharing disabled."`,
      rollback: `  # usageDataDisabled rollback
  echo "[INFO] Re-enabling diagnostic and usage data sharing..."
  defaults write /Library/Application\\ Support/CrashReporter/DiagnosticMessagesHistory.plist AutoSubmit -bool true 2>/dev/null || true
  defaults write /Library/Application\\ Support/CrashReporter/DiagnosticMessagesHistory.plist ThirdPartyDataSubmit -bool true 2>/dev/null || true` },
    {
      key: 'siriAudioDisabled',
      title: 'Disable Siri audio recording and processing',
      description: 'Stops Siri from recording and processing audio for privacy. Reduces Siri functionality.',
      severity: 'medium',
      manual: false,
      recommended: false,
      impact: 'higher',
      script: `  # siriAudioDisabled
  echo "[INFO] Disabling Siri audio recording..."
  defaults write com.apple.assistant.support "Siri Data Sharing Opt-In Status" -int 2 2>/dev/null || true
  defaults write com.apple.Siri StatusMenuVisible -bool false 2>/dev/null || true
  echo "[INFO] Siri audio recording disabled."`,
      rollback: `  # siriAudioDisabled rollback
  echo "[INFO] Re-enabling Siri..."
  defaults delete com.apple.assistant.support "Siri Data Sharing Opt-In Status" 2>/dev/null || true
  defaults write com.apple.Siri StatusMenuVisible -bool true 2>/dev/null || true` },
    {
      key: 'spotlightNoSearchDataSharing',
      title: 'Spotlight: disable search data sharing',
      description: 'Prevents Spotlight from sending search queries to Apple.',
      severity: 'medium',
      manual: false,
      recommended: false,
      impact: false,
      script: `  # spotlightNoSearchDataSharing
  echo "[INFO] Disabling Spotlight search data sharing..."
  defaults write com.apple.Safari UniversalSearchEnabled -bool false 2>/dev/null || true
  defaults write com.apple.Safari SuppressSearchSuggestions -bool true 2>/dev/null || true
  echo "[INFO] Spotlight search data sharing disabled."`,
      rollback: `  # spotlightNoSearchDataSharing rollback
  echo "[INFO] Re-enabling Spotlight search suggestions..."
  defaults write com.apple.Safari UniversalSearchEnabled -bool true 2>/dev/null || true
  defaults write com.apple.Safari SuppressSearchSuggestions -bool false 2>/dev/null || true` },
    {
      key: 'passwordLength14',
      title: 'Require minimum password length of 14 characters',
      description: 'Enforces strong password policy. May require users to update passwords.',
      severity: 'medium',
      manual: false,
      recommended: true,
      impact: 'higher',
      script: `  # passwordLength14
  echo "[INFO] Setting minimum password length to 14 characters..."
  pwpolicy -setglobalpolicy "minChars=14" 2>/dev/null || echo "[WARN] Could not set password policy"
  echo "[INFO] Minimum password length set to 14 characters."`,
      rollback: `  # passwordLength14 rollback
  echo "[INFO] Resetting password length to default (8)..."
  pwpolicy -setglobalpolicy "minChars=8" 2>/dev/null || echo "[WARN] Could not reset password policy"` },
    {
      key: 'appFirewallEnabled',
      title: 'Enable application firewall',
      description: 'Enables the built-in application firewall to control incoming connections.',
      severity: 'medium',
      manual: false,
      recommended: true,
      impact: false,
      script: `  # appFirewallEnabled
  echo "[INFO] Enabling application firewall..."
  /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on 2>/dev/null || echo "[WARN] Could not enable firewall"
  echo "[INFO] Application firewall enabled."`,
      rollback: `  # appFirewallEnabled rollback
  echo "[INFO] Disabling application firewall..."
  /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate off 2>/dev/null || echo "[WARN] Could not disable firewall"` },
    {
      key: 'secureBootFull',
      title: 'Set Secure Boot to Full Security',
      description: 'Requires Apple-signed OS only. Provides strongest boot security on Apple Silicon.',
      severity: 'low',
      manual: true,
      recommended: false,
      impact: false,
      script: `  # secureBootFull
  echo "[MANUAL] Set Secure Boot to Full Security"
  echo "  1. Restart and hold Power button until 'Loading startup options' appears"
  echo "  2. Select Options, then continue"
  echo "  3. Choose Startup Security Utility from Utilities menu"
  echo "  4. Select 'Full Security' and require Apple-signed OS"
  echo "  5. Restart normally"`,
      rollback: `  # secureBootFull rollback
  echo "[MANUAL] Change Secure Boot settings in Startup Security Utility (see apply steps)"` },
    {
      key: 'xprotectGatekeeperAutoUpdates',
      title: 'Enable automatic XProtect and Gatekeeper updates',
      description: 'Keeps malware definitions current. Strongly recommended for all systems.',
      severity: 'low',
      manual: false,
      recommended: true,
      impact: false,
      script: `  # xprotectGatekeeperAutoUpdates
  echo "[INFO] Enabling automatic XProtect and Gatekeeper updates..."
  defaults write /Library/Preferences/com.apple.SoftwareUpdate ConfigDataInstall -bool true 2>/dev/null || true
  defaults write /Library/Preferences/com.apple.SoftwareUpdate CriticalUpdateInstall -bool true 2>/dev/null || true
  echo "[INFO] Automatic XProtect and Gatekeeper updates enabled."`,
      rollback: `  # xprotectGatekeeperAutoUpdates rollback
  echo "[INFO] Disabling automatic security updates..."
  defaults write /Library/Preferences/com.apple.SoftwareUpdate ConfigDataInstall -bool false 2>/dev/null || true
  defaults write /Library/Preferences/com.apple.SoftwareUpdate CriticalUpdateInstall -bool false 2>/dev/null || true` }
  ];

  const profiles = {
    relaxed: [
      'filevaultEnforced',
      'sipEnabled',
      'disableTftpService',
      'gatekeeperEnabled',
      'auditLogsNoAcls',
      'auditFolderNoAcls',
      'rootLoginDisabled',
      'sudoLogEvents',
      'sshDisableRootLogin',
      'webServerDisabled',
      'passwordLength14',
      'appFirewallEnabled',
      'xprotectGatekeeperAutoUpdates'
    ],
    strict: [
      'filevaultEnforced',
      'sipEnabled',
      'sshdFips',
      'sshFipsClient',
      'sshDisablePasswordAuth',
      'disableTftpService',
      'gatekeeperEnabled',
      'gatekeeperBlockUnidentified',
      'adminPasswordForSystemPrefs',
      'auditLogsNoAcls',
      'auditFolderNoAcls',
      'rootLoginDisabled',
      'sudoLogEvents',
      'sshDisableRootLogin',
      'smbSharingDisabled',
      'webServerDisabled',
      'usageDataDisabled',
      'siriAudioDisabled',
      'spotlightNoSearchDataSharing',
      'passwordLength14',
      'appFirewallEnabled',
      'secureBootFull',
      'xprotectGatekeeperAutoUpdates'
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
  };

  const clearAll = () => {
    setSelectedControls({});
    setProfile('custom');
    setScriptOutput('# No macOS baseline controls selected.\n# Select at least one item, then generate the script again.');
  };

  const generateScript = (selection, profileName) => {
    const selectedKeys = Object.keys(selection).filter(k => selection[k]);
    
    if (selectedKeys.length === 0) {
      setScriptOutput('# No macOS baseline controls selected.\n# Select at least one item, then generate the script again.');
      return;
    }

    const dateStr = new Date().toISOString();
    const profileLabel = profileName === 'relaxed' ? 'Relaxed' : profileName === 'strict' ? 'Strict' : 'Custom';
    
    const selectedArrayLiteral = selectedKeys.map(k => `"${k}"`).join(' ');
    
    const lines = [];
    
    lines.push('# ===============================================');
    lines.push('# macOS Security Baseline Script');
    lines.push('# Generated by macOS Security Baseline Script Assistant – CyberLife Coach');
    lines.push(`# Date: ${dateStr}`);
    lines.push(`# Profile: ${profileLabel}`);
    lines.push('#');
    lines.push('# This script applies selected macOS hardening steps then writes simple JSON');
    lines.push('# snapshots before and after changes under:');
    lines.push('#   /usr/local/CyberLifeCoach/Reports/MacOSBaseline');
    lines.push('#');
    lines.push('# Review every line before running.');
    lines.push('# Test on a non-critical system first and ensure you have backups and a rollback plan.');
    lines.push('# Run this script from a root or sudo-enabled shell:');
    lines.push('#   sudo bash ./macos-baseline.sh apply');
    lines.push('# ===============================================');
    lines.push('');
    lines.push('set -euo pipefail');
    lines.push('');
    lines.push(`PROFILE_NAME="${profileLabel}"`);
    lines.push('REPORT_DIR="/usr/local/CyberLifeCoach/Reports/MacOSBaseline"');
    lines.push('mkdir -p "$REPORT_DIR" 2>/dev/null || true');
    lines.push('');
    lines.push(`SELECTED_CONTROLS=(${selectedArrayLiteral})`);
    lines.push('');
    
    lines.push('write_state() {');
    lines.push('  local phase="$1"');
    lines.push('  local hostname osVersion ts outfile controlsJson');
    lines.push('  hostname="$(hostname -s 2>/dev/null || echo "unknown")"');
    lines.push('  osVersion="$(sw_vers -productVersion 2>/dev/null || echo "unknown")"');
    lines.push('  ts="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"');
    lines.push('  outfile="$REPORT_DIR/macos-baseline-${phase}-$(date +"%Y%m%d%H%M%S").json"');
    lines.push('  if [ "${#SELECTED_CONTROLS[@]}" -gt 0 ]; then');
    lines.push('    controlsJson=$(printf \'"%s",\' "${SELECTED_CONTROLS[@]}" | sed \'s/,$//\')');
    lines.push('  else');
    lines.push('    controlsJson=""');
    lines.push('  fi');
    lines.push('  /usr/bin/printf \'{\\n  "hostname": "%s",\\n  "osVersion": "%s",\\n  "phase": "%s",\\n  "timestamp": "%s",\\n  "profile": "%s",\\n  "selectedControls": [%s]\\n}\\n\' \\');
    lines.push('    "$hostname" \\');
    lines.push('    "$osVersion" \\');
    lines.push('    "$phase" \\');
    lines.push('    "$ts" \\');
    lines.push('    "$PROFILE_NAME" \\');
    lines.push('    "$controlsJson" > "$outfile"');
    lines.push('  echo "[INFO] Wrote baseline ${phase} snapshot to $outfile"');
    lines.push('}');
    lines.push('');
    
    lines.push('apply_baseline() {');
    lines.push('  echo "[INFO] Applying selected macOS baseline controls..."');
    selectedKeys.forEach(key => {
      const control = controls.find(c => c.key === key);
      if (control && control.script) {
        lines.push('');
        lines.push(control.script);
      }
    });
    lines.push('  echo "[INFO] Baseline apply block finished. Review warnings above for any manual follow-up."');
    lines.push('}');
    lines.push('');
    
    lines.push('rollback_baseline() {');
    lines.push('  echo "[INFO] Running rollback helper for selected controls..."');
    selectedKeys.forEach(key => {
      const control = controls.find(c => c.key === key);
      if (control && control.rollback) {
        lines.push('');
        lines.push(control.rollback);
      }
    });
    lines.push('  echo "[INFO] Rollback helper block finished. Some changes (profiles, SIP, FileVault) remain manual."');
    lines.push('}');
    lines.push('');
    
    lines.push('mode="${1:-apply}"');
    lines.push('case "$mode" in');
    lines.push('  apply)');
    lines.push('    write_state "pre";');
    lines.push('    apply_baseline;');
    lines.push('    write_state "post";');
    lines.push('    ;;');
    lines.push('  rollback)');
    lines.push('    rollback_baseline;');
    lines.push('    ;;');
    lines.push('  *)');
    lines.push('    echo "Usage: $0 [apply|rollback]" 1>&2;');
    lines.push('    exit 1;');
    lines.push('    ;;');
    lines.push('esac');
    lines.push('');
    
    setScriptOutput(lines.join('\n'));
  };

  const handleCopy = () => {
    if (scriptOutput) {
      navigator.clipboard.writeText(scriptOutput);
    }
  };

  const handleDownload = () => {
    if (!scriptOutput) return;
    
    const ext = downloadFormat === 'txt' ? 'txt' : 'sh';
    const blob = new Blob([scriptOutput], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `macos-baseline.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const criticalControls = controls.filter(c => c.severity === 'critical');
  const mediumControls = controls.filter(c => c.severity === 'medium');
  const lowControls = controls.filter(c => c.severity === 'low');

  const selectedCount = Object.values(selectedControls).filter(Boolean).length;

  const ControlItem = ({ control }) => (
    <div
      onClick={() => handleControlToggle(control.key)}
      className="flex items-start space-x-3 p-3 rounded-xl border border-slate-700 bg-gradient-to-br from-blue-900/20 to-slate-900/90 hover:border-cyan-500 hover:from-cyan-900/30 hover:to-slate-900 transition-all cursor-pointer hover:-translate-y-0.5"
    >
      <input
        type="checkbox"
        checked={selectedControls[control.key] || false}
        onChange={() => {}}
        className="mt-0.5 accent-cyan-500 scale-105"
      />
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="font-semibold text-sm">{control.title}</span>
          {control.severity === 'critical' && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-red-900/80 text-red-200 border border-red-500/70">
              CRITICAL
            </span>
          )}
          {control.severity === 'medium' && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-900/80 text-blue-200 border border-blue-500/70">
              MEDIUM
            </span>
          )}
          {control.manual && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-900/80 text-yellow-200 border border-yellow-500/70">
              MANUAL
            </span>
          )}
          {control.impact === 'higher' && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-900/80 text-amber-200 border border-amber-500/70">
              IMPACT
            </span>
          )}
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
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">macOS</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Local, in-browser</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            macOS Secure Setup
          </h1>
          
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            Choose critical, medium, and low severity hardening steps and this assistant will build a bash script you can review, test, then run with sudo on macOS systems you manage. Some items are automated commands, others are manual steps with short instructions embedded in the script. No data leaves your browser.
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
                Profiles blend severity and compatibility. Relaxed focuses on safer changes. Strict turns on more aggressive hardening and privacy controls. Custom lets you hand-pick every item.
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
              <strong className="text-slate-300">Relaxed</strong> applies all critical items plus medium and low items that rarely break modern systems. <strong className="text-slate-300">Strict</strong> adds stronger hardening that may affect compatibility or workflows.
            </p>

            {/* Controls List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 mb-6" style={{scrollbarWidth: 'thin', scrollbarColor: 'rgba(148, 163, 184, 0.5) rgba(15, 23, 42, 0.5)'}}>
              {/* Critical Controls */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider">Critical Priority</h3>
                </div>
                <div className="space-y-2">
                  {criticalControls.map(control => (
                    <ControlItem key={control.key} control={control} />
                  ))}
                </div>
              </div>

              {/* Medium Controls */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Info className="w-4 h-4 text-blue-400" />
                  <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">Medium Priority</h3>
                </div>
                <div className="space-y-2">
                  {mediumControls.map(control => (
                    <ControlItem key={control.key} control={control} />
                  ))}
                </div>
              </div>

              {/* Low Controls */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <CheckCircle className="w-4 h-4 text-slate-400" />
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Low Priority</h3>
                </div>
                <div className="space-y-2">
                  {lowControls.map(control => (
                    <ControlItem key={control.key} control={control} />
                  ))}
                </div>
              </div>
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
                Review every line, test on a non-critical machine, then run with sudo privileges. Manual-only items appear as commented checklists inside the script.
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
                onClick={handleCopy}
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
                <option value="sh">Download as .sh</option>
                <option value="txt">Download as .txt</option>
              </select>
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold border border-slate-700 hover:border-cyan-500 transition-all hover:bg-slate-800"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-400">
              <p><strong className="text-slate-300">How to use:</strong> Save the script, review thoroughly, then run with sudo privileges.</p>
              <p><strong className="text-slate-300">Reporting:</strong> Each run creates JSON snapshots for audit and rollback planning.</p>
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
                <li>• Use this only on macOS systems you own or are explicitly allowed to manage.</li>
                <li>• Create a Time Machine backup or system snapshot before applying changes.</li>
                <li>• Generate the script and review every section, especially Strict profile items.</li>
                <li>• Comment out any blocks that conflict with your workflows or policies.</li>
                <li>• Test on a non-critical machine first with sudo privileges.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Good next steps</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Save your adjusted script into version control or secure storage.</li>
                <li>• Document which baseline controls you applied and to which machines.</li>
                <li>• Revisit this baseline as your hardware and risk profile evolve.</li>
                <li>• Coordinate with your security team before rolling out to production fleets.</li>
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
