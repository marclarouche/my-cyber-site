import React, { useState } from 'react';
import { Shield, ArrowLeft, Copy, Download, Trash2, Settings, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function ChromeBaselinemacOS() {
  const [profile, setProfile] = useState('relaxed');
  const [selectedControls, setSelectedControls] = useState({});
  const [scriptOutput, setScriptOutput] = useState('');

  // Chrome control definitions with script snippets for macOS
  const chromeControls = {
    blockPopups: {
      id: 'Block pop-ups for all sites',
      title: 'Block pop-ups for all sites',
      description: 'Turns off intrusive pop-ups across the board, which reduces drive-by scams and fake system alerts.',
      recommended: true,
      script: `# Block pop-ups in Chrome
echo "Blocking unwanted pop-ups in Chrome..."
set_policy_int "DefaultPopupsSetting" 2
# 2 = Block pop-ups for all sites.`,
      rollback: `# Roll back: remove Chrome pop-up policy if present
delete_policy_key "DefaultPopupsSetting"`
    },
    safeBrowsing: {
      id: 'Enable Safe Browsing protection',
      title: 'Enable Safe Browsing protection',
      description: 'Enforces Safe Browsing for Chrome so known malicious sites and downloads are blocked before they land on disk.',
      recommended: true,
      highImpact: true,
      script: `# Enable Safe Browsing protection in Chrome
echo "Enforcing Safe Browsing protection in Chrome..."
set_policy_int "SafeBrowsingProtectionLevel" 1
# 1 = Standard Safe Browsing. Set to 2 manually if enhanced protection is required everywhere.`,
      rollback: `# Roll back: remove Safe Browsing policy value
delete_policy_key "SafeBrowsingProtectionLevel"`
    },
    hardenDownloads: {
      id: 'Tighten download restrictions',
      title: 'Tighten download restrictions',
      description: 'Applies a stricter download policy that blocks more unwanted or uncommon files from the browser side.',
      recommended: false,
      strict: true,
      script: `# Tighten Chrome download restrictions
echo "Applying stricter download restrictions in Chrome..."
set_policy_int "DownloadRestrictions" 2
# 2 = Block dangerous downloads and warn on more unwanted content.`,
      rollback: `# Roll back: remove download restrictions policy
delete_policy_key "DownloadRestrictions"`
    },
    locationPrompt: {
      id: 'Block sites from tracking physical location',
      title: 'Block sites from tracking physical location',
      description: 'Configures Chrome so no site is allowed to track the user\'s physical location by default, in line with STIG V-221559.',
      recommended: true,
      script: `# V-221559 Do not allow any site to track physical location
echo "Blocking sites from tracking physical location in Chrome..."
set_policy_int "DefaultGeolocationSetting" 2
# 2 = Do not allow any site to track the user's physical location.`,
      rollback: `# Roll back: remove geolocation default policy
delete_policy_key "DefaultGeolocationSetting"`
    },
    blockThirdPartyCookies: {
      id: 'Block third party cookies',
      title: 'Block third party cookies',
      description: 'Stops most cross-site tracking cookies while allowing core sign-in cookies to keep working for day to day browsing.',
      recommended: true,
      script: `# Block third-party cookies to reduce cross-site tracking
echo "Blocking third-party cookies in Chrome..."
set_policy_int "BlockThirdPartyCookies" 1
# 1 = Block third-party cookies by policy.`,
      rollback: `# Roll back: remove third-party cookie policy
delete_policy_key "BlockThirdPartyCookies"`
    },
    blockWebUsb: {
      id: 'Block WebUSB access from sites',
      title: 'Block WebUSB access from sites',
      description: 'Prevents websites from talking directly to USB devices such as hardware tokens or lab equipment via WebUSB.',
      recommended: true,
      deviceSurface: true,
      script: `# Block WebUSB access from websites
echo "Blocking WebUSB access from sites..."
set_policy_int "DefaultWebUsbGuardSetting" 2
# 2 = Block sites from directly talking to USB devices.`,
      rollback: `# Roll back: remove WebUSB guard setting
delete_policy_key "DefaultWebUsbGuardSetting"`
    },
    disableTelemetry: {
      id: 'Disable metrics and anonymized URL data to Google',
      title: 'Disable metrics and anonymized URL data to Google',
      description: 'Turns off Chrome metrics reporting and URL-keyed anonymized data collection so crash reports and visited URLs are not sent upstream, satisfying V-221575 and V-221597.',
      recommended: true,
      script: `# V-221575 and V-221597 Disable Chrome metrics and URL-keyed anonymized data collection
echo "Disabling Chrome metrics reporting and anonymized URL-keyed data collection..."
set_policy_int "MetricsReportingEnabled" 0
set_policy_int "UrlKeyedAnonymizedDataCollectionEnabled" 0
# MetricsReportingEnabled = 0 stops Chrome usage and crash metrics.
# UrlKeyedAnonymizedDataCollectionEnabled = 0 stops URL-keyed anonymized data from being sent to Google.`,
      rollback: `# Roll back: remove metrics and URL-keyed anonymized data policy values
delete_policy_key "MetricsReportingEnabled"
delete_policy_key "UrlKeyedAnonymizedDataCollectionEnabled"`
    },
    syncDisabled: {
      id: 'Disable Google data synchronization (Sync)',
      title: 'Disable Google data synchronization (Sync)',
      description: 'Disables Google Sync so bookmarks, history, and other profile data are not copied to Google servers, addressing V-221571.',
      recommended: true,
      script: `# V-221571 Disable Google data synchronization (Sync)
echo "Disabling Chrome Sync so data is not stored on Google servers..."
set_policy_int "SyncDisabled" 1
# 1 = Sync is disabled and the user cannot enable it.`,
      rollback: `# Roll back: remove SyncDisabled policy
delete_policy_key "SyncDisabled"`
    },
    firewallTraversal: {
      id: 'Disable firewall traversal for Chrome Remote Desktop host',
      title: 'Disable firewall traversal for Chrome Remote Desktop host',
      description: 'Prevents remote clients from bypassing firewalls using STUN and relay servers to reach this Mac, implementing V-221558.',
      recommended: true,
      remoteAccess: true,
      script: `# V-221558 Disable firewall traversal from Chrome Remote Desktop host
echo "Disabling Chrome Remote Desktop host firewall traversal..."
set_policy_int "RemoteAccessHostFirewallTraversal" 0
# 0 = Disallow firewall traversal, preventing remote clients from bypassing firewall controls using STUN and relay.`,
      rollback: `# Roll back: remove RemoteAccessHostFirewallTraversal policy
delete_policy_key "RemoteAccessHostFirewallTraversal"`
    },
    revocationChecks: {
      id: 'Enable online certificate revocation checks',
      title: 'Enable online certificate revocation checks',
      description: 'Restores online OCSP and CRL checks so Chrome verifies whether certificates are revoked before trusting them, as required by V-221579.',
      recommended: true,
      script: `# V-221579 Enable online certificate revocation checks
echo "Enabling online certificate revocation checks (OCSP and CRL) in Chrome..."
set_policy_int "EnableOnlineRevocationChecks" 1
# 1 = Chrome performs online revocation checks for certificates.`,
      rollback: `# Roll back: remove EnableOnlineRevocationChecks policy
delete_policy_key "EnableOnlineRevocationChecks"`
    },
    sessionOnlyCookies: {
      id: 'Use session-only, ephemeral profiles',
      title: 'Use session-only, ephemeral profiles',
      description: 'Treats Chrome profiles as short lived so data is discarded when Chrome closes. This behaves like session-only cookies and can sign users out frequently, so test carefully first.',
      recommended: false,
      veryStrict: true,
      script: `# Use ephemeral Chrome profiles (approximate "session-only" behavior)
echo "Enabling ephemeral Chrome profiles (session-only style)..."
set_policy_int "ForceEphemeralProfiles" 1
# This can cause Chrome to discard profile data and sign-ins when the browser closes.
# Apply only where this behavior has been tested and communicated to users.`,
      rollback: `# Roll back: remove ForceEphemeralProfiles policy
delete_policy_key "ForceEphemeralProfiles"`
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
      setScriptOutput(`#!/usr/bin/env bash

# No Chrome controls selected.
# Select at least one baseline action, then generate the script again.`);
      return;
    }

    const date = new Date().toISOString().split('T')[0];
    const profileLabel = profile === 'relaxed' ? 'Relaxed' : profile === 'strict' ? 'Strict' : 'Custom';
    let lines = [];

    lines.push('#!/usr/bin/env bash');
    lines.push('');
    lines.push('# ===============================================');
    lines.push('# Chrome Security Baseline Script (macOS)');
    lines.push('# Generated by Chrome Security Baseline Script Assistant – CyberLife Coach');
    lines.push('# Date: ' + date);
    lines.push('# Profile: ' + profileLabel);
    lines.push('#');
    lines.push('# This script writes Chrome policy keys into:');
    lines.push('#   /Library/Managed Preferences/com.google.Chrome.plist');
    lines.push('# using /usr/libexec/PlistBuddy.');
    lines.push('#');
    lines.push('# Review every line before running.');
    lines.push('# Test on a non-critical Mac first and ensure you have backups and a rollback plan.');
    lines.push('# Run this script from Terminal using sudo, for example:');
    lines.push('#   sudo bash ./chrome-macos-baseline.sh apply');
    lines.push('# ===============================================');
    lines.push('');
    lines.push('set -euo pipefail');
    lines.push('');
    lines.push('PROFILE_LABEL="' + profileLabel + '"');
    lines.push('POLICY_PLIST="/Library/Managed Preferences/com.google.Chrome.plist"');
    lines.push('BACKUP_DIR="/usr/local/CyberLifeCoach/ChromeBaseline"');
    lines.push('TIMESTAMP="$(date -u +\\"%Y-%m-%dT%H:%M:%SZ\\")"');
    lines.push('');
    lines.push('PLISTBUDDY="/usr/libexec/PlistBuddy"');
    lines.push('if [ ! -x "$PLISTBUDDY" ]; then');
    lines.push('  echo "PlistBuddy not found at $PLISTBUDDY. This script is intended for macOS." >&2');
    lines.push('  exit 1');
    lines.push('fi');
    lines.push('');
    lines.push('ensure_dirs() {');
    lines.push('  sudo mkdir -p "$(dirname \\"$POLICY_PLIST\\")" "$BACKUP_DIR";');
    lines.push('}');
    lines.push('');
    lines.push('backup_plist() {');
    lines.push('  if [ -f "$POLICY_PLIST" ]; then');
    lines.push('    local backup_file="$BACKUP_DIR/com.google.Chrome.plist.backup.$TIMESTAMP";');
    lines.push('    sudo cp "$POLICY_PLIST" "$backup_file";');
    lines.push('    echo "Existing policy plist backed up to: $backup_file";');
    lines.push('  else');
    lines.push('    echo "No existing com.google.Chrome.plist found in managed preferences. A new one will be created."');
    lines.push('  fi');
    lines.push('}');
    lines.push('');
    lines.push('set_policy_int() {');
    lines.push('  local key="$1"');
    lines.push('  local value="$2"');
    lines.push('  if sudo "$PLISTBUDDY" -c "Print :$key" "$POLICY_PLIST" >/dev/null 2>&1; then');
    lines.push('    sudo "$PLISTBUDDY" -c "Set :$key $value" "$POLICY_PLIST";');
    lines.push('  else');
    lines.push('    sudo "$PLISTBUDDY" -c "Add :$key integer $value" "$POLICY_PLIST";');
    lines.push('  fi');
    lines.push('}');
    lines.push('');
    lines.push('delete_policy_key() {');
    lines.push('  local key="$1"');
    lines.push('  sudo "$PLISTBUDDY" -c "Delete :$key" "$POLICY_PLIST" >/dev/null 2>&1 || true');
    lines.push('}');
    lines.push('');
    lines.push('apply_chrome_baseline() {');
    lines.push('  echo "Applying Chrome security baseline (profile: $PROFILE_LABEL)..."');
    lines.push('  ensure_dirs');
    lines.push('  backup_plist');
    lines.push('  echo "Writing managed policy keys into $POLICY_PLIST"');
    lines.push('  echo');
    lines.push('  echo "Tip: Make sure Chrome is closed while you apply these changes."');
    lines.push('');

    selectedKeys.forEach(key => {
      const control = chromeControls[key];
      if (control && control.script) {
        control.script.split('\n').forEach(line => {
          lines.push('  ' + line);
        });
        lines.push('');
      }
    });

    lines.push('  echo "Baseline apply complete. You may need to restart Chrome for all changes to take effect."');
    lines.push('}');
    lines.push('');
    lines.push('rollback_chrome_baseline() {');
    lines.push('  echo "Rolling back Chrome security baseline keys created by this script..."');
    lines.push('  ensure_dirs');
    lines.push('  if [ ! -f "$POLICY_PLIST" ]; then');
    lines.push('    echo "Managed preferences plist not found at $POLICY_PLIST. Nothing to roll back."');
    lines.push('    return 0');
    lines.push('  fi');
    lines.push('');

    selectedKeys.forEach(key => {
      const control = chromeControls[key];
      if (control && control.rollback) {
        control.rollback.split('\n').forEach(line => {
          lines.push('  ' + line);
        });
        lines.push('');
      }
    });

    lines.push('  echo "Rollback complete. Other tools or profiles may still enforce additional Chrome policies."');
    lines.push('}');
    lines.push('');
    lines.push('usage() {');
    lines.push('  echo "Usage: sudo bash $0 [apply|rollback]"');
    lines.push('  echo');
    lines.push('  echo "  apply    Apply the selected Chrome baseline settings to com.google.Chrome.plist"');
    lines.push('  echo "  rollback Remove the specific keys created by this script"');
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
    lines.push('# End of generated Chrome macOS baseline script.');
    
    setScriptOutput(lines.join('\n'));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scriptOutput);
  };

  const downloadScript = (extension) => {
    if (!scriptOutput.trim()) return;
    
    const content = scriptOutput;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    // Use .sh for bash scripts, otherwise use the requested extension
    if (extension === 'ps1') {
      a.download = `chrome-macos-baseline.sh`;
    } else {
      a.download = `chrome-macos-baseline.${extension}`;
    }
    
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
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">macOS</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Local, in-browser</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Chrome Baseline Script Assistant (macOS)
          </h1>
          
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            Choose a focused set of Chrome hardening steps and this assistant will build a bash script you can review, test, then run from Terminal on macOS systems you manage. No data leaves your browser.
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
                Start with the relaxed profile, then move to strict if you are comfortable with more breakage. You can always regenerate and refine the script.
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
                <span>Generate bash script</span>
              </button>
            </div>
          </div>

          {/* Script Output Panel */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="mb-6">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">Step 2 · Review, test, then run</div>
              <h2 className="text-2xl font-bold mb-2">Generated Chrome baseline bash script</h2>
              <p className="text-slate-400 text-sm">
                Review every line, test on a non-critical Mac, then run from Terminal using sudo.
              </p>
            </div>

            {/* Script Textarea */}
            <textarea
              value={scriptOutput}
              readOnly
              className="w-full h-[450px] bg-slate-950/80 border border-slate-700 rounded-lg p-4 text-sm text-slate-300 font-mono resize-none focus:outline-none focus:border-cyan-500/50 custom-scrollbar mb-4"
              placeholder="Select your controls and click 'Generate bash script' to create your Chrome baseline script for macOS..."
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
              <p><strong className="text-slate-300">How to use:</strong> Save the script as something like <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">chrome-macos-baseline.sh</code>, then from Terminal run <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">sudo bash chrome-macos-baseline.sh apply</code> to apply the selected policies.</p>
              <p><strong className="text-slate-300">Rollback:</strong> To roll back the specific Chrome policy keys created by this script, run <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">sudo bash chrome-macos-baseline.sh rollback</code> from Terminal.</p>
              <p><strong className="text-slate-300">Scope of rollback:</strong> The rollback mode only removes policy keys created by this assistant under <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">/Library/Managed Preferences/com.google.Chrome.plist</code>. It does not override MDM profiles or other management tools.</p>
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
                <li>• Generate the script and read the comments above each command.</li>
                <li>• Remove anything that does not fit your environment or policies.</li>
                <li>• Test first on a non-critical Mac from Terminal with sudo permissions.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Good next steps</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Save your adjusted script in a safe folder or version control.</li>
                <li>• Document which controls you applied, and on which systems.</li>
                <li>• Consider moving long-term settings into an MDM profile.</li>
                <li>• Revisit this baseline as Chrome and your needs evolve.</li>
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
                  This assistant runs entirely in your browser. Your selections and the generated script are not sent to CyberLife Coach, to Google, or to any third party. The output is a generic starting point and is provided for educational and informational use only. It is not a substitute for professional advice, does not guarantee compliance with any standard, and is used at your own risk. Always test in a safe environment, verify every line, and ensure you have reliable backups before making changes. Do not apply these settings to employer or school managed devices without explicit approval, and do not bypass existing MDM profiles or enterprise management tools.
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
