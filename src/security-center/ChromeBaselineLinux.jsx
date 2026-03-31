import React, { useState } from 'react';
import { Shield, ArrowLeft, Copy, Download, Trash2, Settings, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function ChromeBaselineLinux() {
  const [profile, setProfile] = useState('relaxed');
  const [selectedControls, setSelectedControls] = useState({});
  const [scriptOutput, setScriptOutput] = useState('');
  const [distro, setDistro] = useState('debian');

  // Chrome/Chromium policy paths per distro family
  const distroConfig = {
    debian: {
      label: 'Debian / Ubuntu',
      chromePath: '/etc/opt/chrome/policies/managed',
      chromiumPath: '/etc/chromium/policies/managed',
      backupBase: '/usr/local/CyberLifeCoach/ChromeBaseline',
      notes: 'Covers Debian, Ubuntu, Linux Mint, Pop!_OS, and derivatives.'
    },
    rhel: {
      label: 'Fedora / RHEL / CentOS',
      chromePath: '/etc/opt/chrome/policies/managed',
      chromiumPath: '/etc/chromium-browser/policies/managed',
      backupBase: '/usr/local/CyberLifeCoach/ChromeBaseline',
      notes: 'Covers Fedora, RHEL 8/9, CentOS Stream, AlmaLinux, and Rocky Linux.'
    },
    arch: {
      label: 'Arch / Manjaro',
      chromePath: '/etc/opt/chrome/policies/managed',
      chromiumPath: '/etc/chromium/policies/managed',
      backupBase: '/usr/local/CyberLifeCoach/ChromeBaseline',
      notes: 'Covers Arch Linux, Manjaro, EndeavourOS, and similar rolling-release distros.'
    }
  };

  // Chrome/Chromium control definitions with JSON policy values for Linux
  const chromeControls = {
    blockPopups: {
      id: 'Block pop-ups for all sites',
      title: 'Block pop-ups for all sites',
      description: 'Prevents intrusive pop-ups across all sites, reducing drive-by scams and fake system alerts. Sets DefaultPopupsSetting to 2 in the managed policy JSON.',
      recommended: true,
      policyKey: 'DefaultPopupsSetting',
      policyValue: 2,
      policyType: 'int',
      script: `# Block pop-ups in Chrome/Chromium
echo "Blocking unwanted pop-ups..."
write_policy_int "DefaultPopupsSetting" 2
# 2 = Block pop-ups for all sites.`,
      rollback: `# Roll back: remove pop-up policy key
remove_policy_key "DefaultPopupsSetting"`
    },
    safeBrowsing: {
      id: 'Enable Safe Browsing protection',
      title: 'Enable Safe Browsing protection',
      description: 'Enforces standard Safe Browsing so known malicious sites and dangerous downloads are blocked. Sets SafeBrowsingProtectionLevel to 1.',
      recommended: true,
      highImpact: true,
      policyKey: 'SafeBrowsingProtectionLevel',
      policyValue: 1,
      policyType: 'int',
      script: `# Enable Safe Browsing protection
echo "Enforcing Safe Browsing in Chrome/Chromium..."
write_policy_int "SafeBrowsingProtectionLevel" 1
# 1 = Standard Safe Browsing. Set to 2 for enhanced protection where appropriate.`,
      rollback: `# Roll back: remove Safe Browsing policy
remove_policy_key "SafeBrowsingProtectionLevel"`
    },
    hardenDownloads: {
      id: 'Tighten download restrictions',
      title: 'Tighten download restrictions',
      description: 'Applies a stricter download policy that blocks more unwanted or uncommon file types from the browser. Sets DownloadRestrictions to 2.',
      recommended: false,
      strict: true,
      policyKey: 'DownloadRestrictions',
      policyValue: 2,
      policyType: 'int',
      script: `# Tighten Chrome/Chromium download restrictions
echo "Applying stricter download restrictions..."
write_policy_int "DownloadRestrictions" 2
# 2 = Block dangerous downloads and warn on more unwanted content.`,
      rollback: `# Roll back: remove download restrictions policy
remove_policy_key "DownloadRestrictions"`
    },
    locationPrompt: {
      id: 'Block sites from tracking physical location',
      title: 'Block sites from tracking physical location',
      description: 'Prevents any site from accessing the user\'s physical location by default, in line with STIG V-221559. Sets DefaultGeolocationSetting to 2.',
      recommended: true,
      policyKey: 'DefaultGeolocationSetting',
      policyValue: 2,
      policyType: 'int',
      script: `# V-221559 Do not allow any site to track physical location
echo "Blocking sites from tracking physical location..."
write_policy_int "DefaultGeolocationSetting" 2
# 2 = Do not allow any site to track the user's physical location.`,
      rollback: `# Roll back: remove geolocation policy
remove_policy_key "DefaultGeolocationSetting"`
    },
    blockThirdPartyCookies: {
      id: 'Block third-party cookies',
      title: 'Block third-party cookies',
      description: 'Stops most cross-site tracking cookies while allowing core sign-in cookies to keep working. Sets BlockThirdPartyCookies to 1.',
      recommended: true,
      policyKey: 'BlockThirdPartyCookies',
      policyValue: 1,
      policyType: 'int',
      script: `# Block third-party cookies to reduce cross-site tracking
echo "Blocking third-party cookies..."
write_policy_int "BlockThirdPartyCookies" 1
# 1 = Block third-party cookies by policy.`,
      rollback: `# Roll back: remove third-party cookie policy
remove_policy_key "BlockThirdPartyCookies"`
    },
    blockWebUsb: {
      id: 'Block WebUSB access from sites',
      title: 'Block WebUSB access from sites',
      description: 'Prevents websites from talking directly to USB devices such as hardware tokens or lab equipment via WebUSB. Sets DefaultWebUsbGuardSetting to 2.',
      recommended: true,
      deviceSurface: true,
      policyKey: 'DefaultWebUsbGuardSetting',
      policyValue: 2,
      policyType: 'int',
      script: `# Block WebUSB access from websites
echo "Blocking WebUSB access from sites..."
write_policy_int "DefaultWebUsbGuardSetting" 2
# 2 = Block sites from directly talking to USB devices.`,
      rollback: `# Roll back: remove WebUSB guard policy
remove_policy_key "DefaultWebUsbGuardSetting"`
    },
    disableTelemetry: {
      id: 'Disable metrics and anonymized URL data to Google',
      title: 'Disable metrics and anonymized URL data to Google',
      description: 'Turns off Chrome/Chromium metrics reporting and URL-keyed anonymized data collection so crash reports and visited URLs are not sent upstream. Covers V-221575 and V-221597.',
      recommended: true,
      policyKey: 'MetricsReportingEnabled',
      policyValue: 0,
      policyType: 'int',
      script: `# V-221575 and V-221597 Disable metrics and URL-keyed anonymized data collection
echo "Disabling metrics reporting and anonymized URL-keyed data collection..."
write_policy_int "MetricsReportingEnabled" 0
write_policy_int "UrlKeyedAnonymizedDataCollectionEnabled" 0
# MetricsReportingEnabled = 0 stops usage and crash metrics.
# UrlKeyedAnonymizedDataCollectionEnabled = 0 stops URL-keyed anonymized data from being sent to Google.`,
      rollback: `# Roll back: remove metrics and URL-keyed data policy values
remove_policy_key "MetricsReportingEnabled"
remove_policy_key "UrlKeyedAnonymizedDataCollectionEnabled"`
    },
    syncDisabled: {
      id: 'Disable Google data synchronization (Sync)',
      title: 'Disable Google data synchronization (Sync)',
      description: 'Disables Google Sync so bookmarks, history, and profile data are not copied to Google servers, addressing V-221571. Sets SyncDisabled to true.',
      recommended: true,
      policyKey: 'SyncDisabled',
      policyValue: true,
      policyType: 'bool',
      script: `# V-221571 Disable Google data synchronization (Sync)
echo "Disabling Chrome/Chromium Sync..."
write_policy_bool "SyncDisabled" true
# true = Sync is disabled and the user cannot enable it.`,
      rollback: `# Roll back: remove SyncDisabled policy
remove_policy_key "SyncDisabled"`
    },
    revocationChecks: {
      id: 'Enable online certificate revocation checks',
      title: 'Enable online certificate revocation checks',
      description: 'Restores online OCSP and CRL checks so the browser verifies whether a certificate is revoked before trusting it, as required by V-221579.',
      recommended: true,
      policyKey: 'EnableOnlineRevocationChecks',
      policyValue: true,
      policyType: 'bool',
      script: `# V-221579 Enable online certificate revocation checks
echo "Enabling online certificate revocation checks (OCSP/CRL)..."
write_policy_bool "EnableOnlineRevocationChecks" true
# true = Chrome/Chromium performs online revocation checks for certificates.`,
      rollback: `# Roll back: remove revocation checks policy
remove_policy_key "EnableOnlineRevocationChecks"`
    },
    blockMicCamera: {
      id: 'Block microphone and camera access by default',
      title: 'Block microphone and camera access by default',
      description: 'Prevents all sites from accessing the microphone and camera without explicit user action. Sets DefaultMediaStreamSetting to 2. Users can still grant access per-site.',
      recommended: true,
      deviceSurface: true,
      policyKey: 'DefaultMediaStreamSetting',
      policyValue: 2,
      policyType: 'int',
      script: `# Block default microphone and camera access from websites
echo "Blocking default mic and camera access from sites..."
write_policy_int "DefaultMediaStreamSetting" 2
# 2 = Block sites from accessing camera and microphone by default.`,
      rollback: `# Roll back: remove media stream setting policy
remove_policy_key "DefaultMediaStreamSetting"`
    },
    disablePasswordManager: {
      id: 'Disable built-in Chrome password manager',
      title: 'Disable built-in Chrome password manager',
      description: 'Prevents Chrome from saving or autofilling passwords. Recommended for users who rely on a dedicated password manager like Bitwarden or 1Password.',
      recommended: false,
      strict: true,
      policyKey: 'PasswordManagerEnabled',
      policyValue: false,
      policyType: 'bool',
      script: `# Disable Chrome/Chromium built-in password manager
echo "Disabling built-in password manager..."
write_policy_bool "PasswordManagerEnabled" false
# false = Prevents Chrome from saving or autofilling passwords.
# Only apply this if users are actively using a dedicated password manager.`,
      rollback: `# Roll back: remove password manager policy
remove_policy_key "PasswordManagerEnabled"`
    },
    sessionOnlyCookies: {
      id: 'Use session-only, ephemeral profiles',
      title: 'Use session-only, ephemeral profiles',
      description: 'Treats Chrome/Chromium profiles as short-lived so data is discarded when the browser closes. This can sign users out frequently — test carefully before deploying.',
      recommended: false,
      veryStrict: true,
      policyKey: 'ForceEphemeralProfiles',
      policyValue: true,
      policyType: 'bool',
      script: `# Use ephemeral Chrome/Chromium profiles (session-only style)
echo "Enabling ephemeral profiles..."
write_policy_bool "ForceEphemeralProfiles" true
# true = Profile data is discarded when Chrome/Chromium closes.
# Apply only where this behavior has been tested and communicated to users.`,
      rollback: `# Roll back: remove ephemeral profiles policy
remove_policy_key "ForceEphemeralProfiles"`
    }
  };

  // Profile definitions
  const profiles = {
    relaxed: ['blockPopups', 'safeBrowsing', 'locationPrompt', 'blockThirdPartyCookies', 'blockWebUsb', 'disableTelemetry', 'syncDisabled', 'revocationChecks', 'blockMicCamera'],
    strict: ['blockPopups', 'safeBrowsing', 'locationPrompt', 'blockThirdPartyCookies', 'blockWebUsb', 'disableTelemetry', 'syncDisabled', 'revocationChecks', 'blockMicCamera', 'hardenDownloads', 'disablePasswordManager', 'sessionOnlyCookies']
  };

  const applyProfile = (profileName) => {
    if (profileName === 'custom') return;
    const profileKeys = profiles[profileName] || [];
    const newSelection = {};
    profileKeys.forEach(key => { newSelection[key] = true; });
    setSelectedControls(newSelection);
  };

  const handleProfileChange = (newProfile) => {
    setProfile(newProfile);
    if (newProfile !== 'custom') applyProfile(newProfile);
  };

  const handleControlToggle = (key) => {
    const newSelection = { ...selectedControls, [key]: !selectedControls[key] };
    setSelectedControls(newSelection);
    setProfile('custom');
  };

  const selectRecommended = () => {
    const newSelection = {};
    Object.keys(chromeControls).forEach(key => {
      if (chromeControls[key].recommended) newSelection[key] = true;
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
    const dc = distroConfig[distro];

    if (selectedKeys.length === 0) {
      setScriptOutput(`#!/usr/bin/env bash\n\n# No Chrome/Chromium controls selected.\n# Select at least one baseline action, then generate the script again.`);
      return;
    }

    const date = new Date().toISOString().split('T')[0];
    const profileLabel = profile === 'relaxed' ? 'Relaxed' : profile === 'strict' ? 'Strict' : 'Custom';
    const distroLabel = dc.label;
    let lines = [];

    lines.push('#!/usr/bin/env bash');
    lines.push('');
    lines.push('# ===============================================');
    lines.push('# Chrome / Chromium Security Baseline Script (Linux)');
    lines.push('# Generated by Chrome/Chromium Security Baseline Script Assistant – CyberLife Coach');
    lines.push('# Date: ' + date);
    lines.push('# Profile: ' + profileLabel);
    lines.push('# Distro family: ' + distroLabel);
    lines.push('#');
    lines.push('# This script writes a managed policy JSON file to:');
    lines.push('#   Chrome:   ' + dc.chromePath + '/cyberlifecoach_baseline.json');
    lines.push('#   Chromium: ' + dc.chromiumPath + '/cyberlifecoach_baseline.json');
    lines.push('#');
    lines.push('# It targets whichever browser directory exists on this system.');
    lines.push('# If both are present, both policy directories will be written.');
    lines.push('#');
    lines.push('# Review every line before running.');
    lines.push('# Test on a non-critical Linux system first and ensure you have backups.');
    lines.push('# Run this script with root privileges, for example:');
    lines.push('#   sudo bash ./chrome-linux-baseline.sh apply');
    lines.push('# ===============================================');
    lines.push('');
    lines.push('set -euo pipefail');
    lines.push('');
    lines.push('PROFILE_LABEL="' + profileLabel + '"');
    lines.push('CHROME_POLICY_DIR="' + dc.chromePath + '"');
    lines.push('CHROMIUM_POLICY_DIR="' + dc.chromiumPath + '"');
    lines.push('POLICY_FILE="cyberlifecoach_baseline.json"');
    lines.push('BACKUP_DIR="' + dc.backupBase + '"');
    lines.push('TIMESTAMP="$(date -u +\\"%Y-%m-%dT%H:%M:%SZ\\")"');
    lines.push('');
    lines.push('# -----------------------------------------------');
    lines.push('# Helper: build the policy JSON from selected controls');
    lines.push('# -----------------------------------------------');
    lines.push('');
    lines.push('build_policy_json() {');
    lines.push('  cat <<\'POLICY_JSON\'');
    lines.push('{');

    // Build JSON policy object from selected controls
    const jsonEntries = [];
    selectedKeys.forEach(key => {
      const control = chromeControls[key];
      if (!control) return;
      // Handle multi-key controls (telemetry has two keys)
      if (key === 'disableTelemetry') {
        jsonEntries.push(`  "MetricsReportingEnabled": 0`);
        jsonEntries.push(`  "UrlKeyedAnonymizedDataCollectionEnabled": 0`);
      } else {
        const val = control.policyType === 'bool'
          ? String(control.policyValue)
          : String(control.policyValue);
        jsonEntries.push(`  "${control.policyKey}": ${val}`);
      }
    });
    lines.push(jsonEntries.join(',\n'));
    lines.push('}');
    lines.push('POLICY_JSON');
    lines.push('}');
    lines.push('');
    lines.push('# -----------------------------------------------');
    lines.push('# Apply function');
    lines.push('# -----------------------------------------------');
    lines.push('');
    lines.push('apply_chrome_baseline() {');
    lines.push('  echo "Applying Chrome/Chromium security baseline (profile: $PROFILE_LABEL)..."');
    lines.push('  echo "Tip: Close all Chrome and Chromium windows before applying."');
    lines.push('  echo');
    lines.push('');
    lines.push('  local applied=0');
    lines.push('');
    lines.push('  for POLICY_DIR in "$CHROME_POLICY_DIR" "$CHROMIUM_POLICY_DIR"; do');
    lines.push('    if [ -d "$POLICY_DIR" ] || [ -d "$(dirname \\"$POLICY_DIR\\")" ]; then');
    lines.push('      echo "Writing policy to: $POLICY_DIR/$POLICY_FILE"');
    lines.push('      mkdir -p "$POLICY_DIR"');
    lines.push('      mkdir -p "$BACKUP_DIR"');
    lines.push('');
    lines.push('      # Back up existing policy file if present');
    lines.push('      if [ -f "$POLICY_DIR/$POLICY_FILE" ]; then');
    lines.push('        cp "$POLICY_DIR/$POLICY_FILE" "$BACKUP_DIR/${POLICY_FILE}.backup.$TIMESTAMP"');
    lines.push('        echo "  Existing policy backed up to $BACKUP_DIR/${POLICY_FILE}.backup.$TIMESTAMP"');
    lines.push('      fi');
    lines.push('');
    lines.push('      build_policy_json > "$POLICY_DIR/$POLICY_FILE"');
    lines.push('      chmod 644 "$POLICY_DIR/$POLICY_FILE"');
    lines.push('      echo "  Policy file written successfully."');
    lines.push('      applied=1');
    lines.push('    fi');
    lines.push('  done');
    lines.push('');
    lines.push('  if [ "$applied" -eq 0 ]; then');
    lines.push('    echo "No Chrome or Chromium policy directory found. Creating Chrome policy path and writing policy."');
    lines.push('    mkdir -p "$CHROME_POLICY_DIR"');
    lines.push('    build_policy_json > "$CHROME_POLICY_DIR/$POLICY_FILE"');
    lines.push('    chmod 644 "$CHROME_POLICY_DIR/$POLICY_FILE"');
    lines.push('    echo "Policy written to $CHROME_POLICY_DIR/$POLICY_FILE"');
    lines.push('  fi');
    lines.push('');
    lines.push('  echo');
    lines.push('  echo "Baseline apply complete. Restart Chrome or Chromium for all changes to take effect."');
    lines.push('  echo "You can verify applied policies by visiting chrome://policy or chromium://policy in the browser."');
    lines.push('}');
    lines.push('');
    lines.push('# -----------------------------------------------');
    lines.push('# Rollback function');
    lines.push('# -----------------------------------------------');
    lines.push('');
    lines.push('rollback_chrome_baseline() {');
    lines.push('  echo "Rolling back Chrome/Chromium baseline policy written by this script..."');
    lines.push('  echo');
    lines.push('');
    lines.push('  for POLICY_DIR in "$CHROME_POLICY_DIR" "$CHROMIUM_POLICY_DIR"; do');
    lines.push('    local target="$POLICY_DIR/$POLICY_FILE"');
    lines.push('    if [ -f "$target" ]; then');
    lines.push('      rm -f "$target"');
    lines.push('      echo "  Removed: $target"');
    lines.push('    else');
    lines.push('      echo "  Not found (skipping): $target"');
    lines.push('    fi');
    lines.push('  done');
    lines.push('');
    lines.push('  echo');
    lines.push('  echo "Rollback complete. Other policy files in the managed directory are not affected."');
    lines.push('  echo "Restart Chrome or Chromium to apply the rollback."');
    lines.push('}');
    lines.push('');
    lines.push('usage() {');
    lines.push('  echo "Usage: sudo bash $0 [apply|rollback]"');
    lines.push('  echo');
    lines.push('  echo "  apply    Write the baseline policy JSON to the managed policy directory"');
    lines.push('  echo "  rollback Remove the cyberlifecoach_baseline.json policy file"');
    lines.push('}');
    lines.push('');
    lines.push('case "${1:-}" in');
    lines.push('  apply)');
    lines.push('    apply_chrome_baseline');
    lines.push('    ;;');
    lines.push('  rollback)');
    lines.push('    rollback_chrome_baseline');
    lines.push('    ;;');
    lines.push('  *)');
    lines.push('    usage');
    lines.push('    exit 1');
    lines.push('    ;;');
    lines.push('esac');
    lines.push('');
    lines.push('# End of generated Chrome/Chromium Linux baseline script.');

    setScriptOutput(lines.join('\n'));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scriptOutput);
  };

  const downloadScript = (extension) => {
    if (!scriptOutput.trim()) return;
    const blob = new Blob([scriptOutput], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chrome-linux-baseline.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const dc = distroConfig[distro];

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
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Chrome / Chromium</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Linux</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Local, in-browser</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Chrome / Chromium Baseline Script Assistant (Linux)
          </h1>

          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            Choose your Linux distro family and a set of Chrome or Chromium hardening controls. This assistant will generate a bash script that writes a managed policy JSON file you can review, test, then deploy with root privileges. No data leaves your browser.
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
              <h2 className="text-2xl font-bold mb-2">Pick the Chrome / Chromium security controls</h2>
              <p className="text-slate-400 text-sm">
                Start with the relaxed profile, then move to strict if you are comfortable with more breakage. You can always regenerate and refine the script.
              </p>
            </div>

            {/* Distro Selector */}
            <div className="mb-6">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-3">Linux distro family</div>
              <div className="flex flex-wrap gap-3">
                {Object.entries(distroConfig).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => setDistro(key)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                      distro === key
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-lg shadow-cyan-500/20'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-cyan-500'
                    }`}
                  >
                    🐧 {val.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-2">{dc.notes}</p>
              <div className="mt-3 p-3 bg-slate-800/60 rounded-lg border border-slate-700 text-xs text-slate-400 space-y-1">
                <p><span className="text-slate-300 font-medium">Chrome policy path:</span> <code className="text-cyan-400">{dc.chromePath}/</code></p>
                <p><span className="text-slate-300 font-medium">Chromium policy path:</span> <code className="text-cyan-400">{dc.chromiumPath}/</code></p>
                <p className="text-slate-500 pt-1">The script writes to whichever paths exist on the system. If both are present, both are written.</p>
              </div>
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
              <strong className="text-slate-300">Relaxed</strong> keeps most sites working while blocking obvious tracking and scams. <strong className="text-slate-300">Strict</strong> adds tighter cookie, download, and password manager rules that may affect some workflows.
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
                        <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Recommended</span>
                      )}
                      {control.strict && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 border border-slate-600">More strict</span>
                      )}
                      {control.veryStrict && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">Very strict</span>
                      )}
                      {control.highImpact && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">High impact</span>
                      )}
                      {control.deviceSurface && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 border border-slate-600">Device surface</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{control.description}</p>
                  </div>
                </label>
              ))}
            </div>

            <p className="text-sm text-slate-500 mt-6">
              <strong className="text-slate-300">Tip:</strong> For most personal or small office Linux systems, Relaxed is a good starting point. Move to Strict only after you have tested how it affects logins, extensions, and existing workflows.
            </p>

            {/* Generate Button */}
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
              <h2 className="text-2xl font-bold mb-2">Generated Chrome / Chromium baseline bash script</h2>
              <p className="text-slate-400 text-sm">
                Review every line, test on a non-critical Linux system, then run with root privileges using sudo.
              </p>
            </div>

            {/* Script Textarea */}
            <textarea
              value={scriptOutput}
              readOnly
              className="w-full h-[450px] bg-slate-950/80 border border-slate-700 rounded-lg p-4 text-sm text-slate-300 font-mono resize-none focus:outline-none focus:border-cyan-500/50 custom-scrollbar mb-4"
              placeholder="Select your distro family and controls, then click 'Generate bash script' to build your Chrome/Chromium baseline for Linux..."
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
              <p><strong className="text-slate-300">How to use:</strong> Save the script as <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">chrome-linux-baseline.sh</code>, then run <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">sudo bash chrome-linux-baseline.sh apply</code> from a terminal.</p>
              <p><strong className="text-slate-300">Rollback:</strong> To remove the policy file written by this script, run <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">sudo bash chrome-linux-baseline.sh rollback</code>.</p>
              <p><strong className="text-slate-300">Verify:</strong> After applying, open Chrome or Chromium and visit <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">chrome://policy</code> to confirm the policies are active.</p>
              <p><strong className="text-slate-300">Scope of rollback:</strong> The rollback removes only the <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">cyberlifecoach_baseline.json</code> file. Other policy files in the managed directory are not affected.</p>
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
                <li>• Use this only on Linux systems you own or are explicitly allowed to manage.</li>
                <li>• Back up the existing policy directory with <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded text-xs">sudo cp -a /etc/opt/chrome /etc/opt/chrome.bak</code> before applying.</li>
                <li>• Select the correct distro family so the script targets the right policy paths.</li>
                <li>• Read the comments in the generated script before running each section.</li>
                <li>• Test on a non-critical Linux machine first using root or sudo privileges.</li>
                <li>• Close Chrome and Chromium windows before running the script.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Good next steps</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• After applying, open Chrome/Chromium and check <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded text-xs">chrome://policy</code> to verify active policies.</li>
                <li>• Save your adjusted script in a safe folder or version control.</li>
                <li>• Document which controls you applied and on which systems.</li>
                <li>• Consider using Ansible, Salt, or a similar tool to manage these files at scale.</li>
                <li>• Revisit this baseline as Chrome and your environment evolve.</li>
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
                  This assistant runs entirely in your browser. Your selections and the generated script are not sent to CyberLife Coach, to Google, or to any third party. The output is a generic starting point and is provided for educational and informational use only. It is not a substitute for professional advice, does not guarantee compliance with any standard, and is used at your own risk. Always test in a safe environment, verify every line, and ensure you have reliable backups before making changes. Do not apply these settings to employer or school managed devices without explicit approval, and do not bypass existing fleet management or enterprise change-control processes.
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
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(15, 23, 42, 0.5); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(100, 116, 139, 0.5); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(148, 163, 184, 0.7); }
      `}</style>
    </div>
  );
}
