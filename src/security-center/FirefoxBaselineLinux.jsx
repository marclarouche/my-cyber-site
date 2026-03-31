import React, { useState } from 'react';
import { Shield, ArrowLeft, Copy, Download, Trash2, Settings, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function FirefoxBaselineLinux() {
  const [profile, setProfile] = useState('relaxed');
  const [selectedControls, setSelectedControls] = useState({});
  const [scriptOutput, setScriptOutput] = useState('');
  const [distro, setDistro] = useState('debian');

  // Firefox policies.json path per distro family
  const distroConfig = {
    debian: {
      label: 'Debian / Ubuntu',
      firefoxPath: '/usr/lib/firefox/distribution',
      firefoxEsrPath: '/usr/lib/firefox-esr/distribution',
      backupBase: '/usr/local/CyberLifeCoach/FirefoxBaseline',
      notes: 'Covers Debian, Ubuntu, Linux Mint, Pop!_OS, and derivatives. Firefox ESR path is also checked.'
    },
    rhel: {
      label: 'Fedora / RHEL / CentOS',
      firefoxPath: '/usr/lib64/firefox/distribution',
      firefoxEsrPath: '/etc/firefox/policies',
      backupBase: '/usr/local/CyberLifeCoach/FirefoxBaseline',
      notes: 'Covers Fedora, RHEL 8/9, CentOS Stream, AlmaLinux, and Rocky Linux.'
    },
    arch: {
      label: 'Arch / Manjaro',
      firefoxPath: '/usr/lib/firefox/distribution',
      firefoxEsrPath: '/usr/lib/firefox-esr/distribution',
      backupBase: '/usr/local/CyberLifeCoach/FirefoxBaseline',
      notes: 'Covers Arch Linux, Manjaro, EndeavourOS, and similar rolling-release distros.'
    }
  };

  // Firefox control definitions using policies.json keys
  const firefoxControls = {
    disableTelemetry: {
      id: 'Disable Firefox telemetry and data reporting',
      title: 'Disable Firefox telemetry and data reporting',
      description: 'Turns off Firefox telemetry, crash reporting, health reports, and the new tab sponsored content feed so usage data is not sent to Mozilla.',
      recommended: true,
      policyBlock: {
        DisableTelemetry: true,
        DisableFirefoxStudies: true,
        OverrideFirstRunPage: '',
        FirefoxHome: {
          Search: true,
          TopSites: false,
          SponsoredTopSites: false,
          Highlights: false,
          Pocket: false,
          SponsoredPocket: false,
          Snippets: false,
          Locked: false
        }
      },
      script: `# Disable Firefox telemetry, studies, and sponsored new tab content
echo "Disabling Firefox telemetry and data reporting..."
add_policy "DisableTelemetry" "true"
add_policy "DisableFirefoxStudies" "true"
add_policy "OverrideFirstRunPage" '""'`,
      rollback: `# Roll back: remove telemetry and studies policy keys
remove_policy "DisableTelemetry"
remove_policy "DisableFirefoxStudies"
remove_policy "OverrideFirstRunPage"`
    },
    trackingProtection: {
      id: 'Enable Enhanced Tracking Protection (Strict)',
      title: 'Enable Enhanced Tracking Protection (Strict)',
      description: 'Forces Enhanced Tracking Protection to Strict mode, blocking trackers, fingerprinters, cryptominers, and cross-site tracking cookies across all browsing.',
      recommended: true,
      highImpact: true,
      policyBlock: {
        EnableTrackingProtection: {
          Value: true,
          Locked: true,
          Cryptomining: true,
          Fingerprinting: true,
          EmailTracking: true
        }
      },
      script: `# Enable Enhanced Tracking Protection in Strict mode
echo "Enabling Enhanced Tracking Protection (Strict) in Firefox..."
# Written directly into the policies JSON block — see full JSON output below.`,
      rollback: `# Roll back: remove tracking protection policy
remove_policy "EnableTrackingProtection"`
    },
    tlsMinVersion: {
      id: 'Enforce minimum TLS 1.2',
      title: 'Enforce minimum TLS 1.2',
      description: 'Prevents Firefox from negotiating TLS connections below version 1.2, blocking insecure legacy protocols. Modern sites all support TLS 1.2 or higher.',
      recommended: true,
      policyBlock: {
        SSLVersionMin: 'tls1.2'
      },
      script: `# Enforce minimum TLS version 1.2
echo "Setting minimum TLS version to 1.2 in Firefox..."
add_policy "SSLVersionMin" '"tls1.2"'`,
      rollback: `# Roll back: remove TLS minimum version policy
remove_policy "SSLVersionMin"`
    },
    blockPopups: {
      id: 'Block pop-up windows',
      title: 'Block pop-up windows',
      description: 'Prevents sites from opening unrequested pop-up windows, reducing drive-by scam windows and fake system alert overlays.',
      recommended: true,
      policyBlock: {
        PopupBlocking: {
          Default: true,
          Locked: false
        }
      },
      script: `# Block pop-up windows in Firefox
echo "Blocking pop-up windows in Firefox..."
# Written into the policies JSON block.`,
      rollback: `# Roll back: remove popup blocking policy
remove_policy "PopupBlocking"`
    },
    disableFormAutofill: {
      id: 'Disable form autofill and address capture',
      title: 'Disable form autofill and address capture',
      description: 'Prevents Firefox from capturing and autofilling addresses and payment information in web forms, reducing stored personal data in the browser profile.',
      recommended: false,
      strict: true,
      policyBlock: {
        OfferToSaveLogins: false,
        PasswordManagerEnabled: false
      },
      script: `# Disable Firefox form autofill and saved logins
echo "Disabling form autofill and saved logins..."
add_policy "OfferToSaveLogins" "false"
add_policy "PasswordManagerEnabled" "false"`,
      rollback: `# Roll back: remove autofill and login manager policies
remove_policy "OfferToSaveLogins"
remove_policy "PasswordManagerEnabled"`
    },
    disableSync: {
      id: 'Disable Firefox Sync',
      title: 'Disable Firefox Sync',
      description: 'Prevents Firefox from syncing bookmarks, history, passwords, and other profile data to Mozilla servers via a Firefox Account. Keeps browsing data local.',
      recommended: true,
      policyBlock: {
        DisableFirefoxAccounts: true
      },
      script: `# Disable Firefox Sync (Firefox Accounts)
echo "Disabling Firefox Sync and Firefox Accounts..."
add_policy "DisableFirefoxAccounts" "true"`,
      rollback: `# Roll back: remove Firefox Accounts / Sync policy
remove_policy "DisableFirefoxAccounts"`
    },
    httpsOnly: {
      id: 'Enable HTTPS-Only Mode',
      title: 'Enable HTTPS-Only Mode',
      description: 'Forces Firefox to upgrade connections to HTTPS wherever possible and warns when a secure connection cannot be made. Reduces exposure to unencrypted HTTP traffic.',
      recommended: true,
      highImpact: true,
      policyBlock: {
        HttpsOnlyMode: 'force_enabled'
      },
      script: `# Enable HTTPS-Only Mode in Firefox
echo "Enabling HTTPS-Only Mode..."
add_policy "HttpsOnlyMode" '"force_enabled"'`,
      rollback: `# Roll back: remove HTTPS-Only Mode policy
remove_policy "HttpsOnlyMode"`
    },
    disableScreenshots: {
      id: 'Disable Firefox Screenshots tool',
      title: 'Disable Firefox Screenshots tool',
      description: 'Removes the built-in Firefox Screenshots extension to reduce potential data exposure pathways through the browser\'s cloud screenshot feature.',
      recommended: false,
      strict: true,
      policyBlock: {
        DisabledCiphers: {}
      },
      script: `# Disable Firefox Screenshots extension
echo "Disabling Firefox Screenshots..."
add_policy "DisableFirefoxScreenshots" "true"`,
      rollback: `# Roll back: remove screenshots disable policy
remove_policy "DisableFirefoxScreenshots"`
    },
    dnsOverHttps: {
      id: 'Configure DNS over HTTPS (DoH)',
      title: 'Configure DNS over HTTPS (DoH)',
      description: 'Sets Firefox to use Cloudflare\'s encrypted DNS over HTTPS resolver, preventing DNS queries from being observed on the local network. Can be changed to another provider.',
      recommended: true,
      policyBlock: {
        DNSOverHTTPS: {
          Enabled: true,
          ProviderURL: 'https://mozilla.cloudflare-dns.com/dns-query',
          Locked: false
        }
      },
      script: `# Configure DNS over HTTPS in Firefox
echo "Enabling DNS over HTTPS (Cloudflare resolver)..."
# Written into the policies JSON block.`,
      rollback: `# Roll back: remove DNS over HTTPS policy
remove_policy "DNSOverHTTPS"`
    },
    blockCamera: {
      id: 'Block camera and microphone by default',
      title: 'Block camera and microphone by default',
      description: 'Prevents all websites from accessing the device camera and microphone without explicit user permission. Users can still grant access per-site.',
      recommended: true,
      deviceSurface: true,
      policyBlock: {
        Permissions: {
          Camera: { BlockNewRequests: true, Locked: false },
          Microphone: { BlockNewRequests: true, Locked: false }
        }
      },
      script: `# Block camera and microphone access by default
echo "Blocking default camera and microphone access from websites..."
# Written into the policies JSON block.`,
      rollback: `# Roll back: remove permissions policy
remove_policy "Permissions"`
    },
    disablePocket: {
      id: 'Disable Pocket integration',
      title: 'Disable Pocket integration',
      description: 'Removes the Pocket save button and integration from Firefox, preventing articles from being sent to Pocket\'s servers and reducing third-party data sharing.',
      recommended: true,
      policyBlock: {
        DisablePocket: true
      },
      script: `# Disable Pocket integration in Firefox
echo "Disabling Pocket integration..."
add_policy "DisablePocket" "true"`,
      rollback: `# Roll back: remove Pocket disable policy
remove_policy "DisablePocket"`
    },
    searchSuggestionsOff: {
      id: 'Disable search suggestions (privacy mode)',
      title: 'Disable search suggestions (privacy mode)',
      description: 'Turns off address bar and search box suggestions that send partial queries to search engines as you type. Reduces keystroke data sent to third parties.',
      recommended: false,
      strict: true,
      policyBlock: {
        SearchSuggestEnabled: false
      },
      script: `# Disable search suggestions in Firefox
echo "Disabling search suggestions..."
add_policy "SearchSuggestEnabled" "false"`,
      rollback: `# Roll back: remove search suggestions policy
remove_policy "SearchSuggestEnabled"`
    }
  };

  // Profile definitions
  const profiles = {
    relaxed: [
      'disableTelemetry', 'trackingProtection', 'tlsMinVersion',
      'blockPopups', 'disableSync', 'httpsOnly', 'dnsOverHttps',
      'blockCamera', 'disablePocket'
    ],
    strict: [
      'disableTelemetry', 'trackingProtection', 'tlsMinVersion',
      'blockPopups', 'disableSync', 'httpsOnly', 'dnsOverHttps',
      'blockCamera', 'disablePocket', 'disableFormAutofill',
      'disableScreenshots', 'searchSuggestionsOff'
    ]
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
    Object.keys(firefoxControls).forEach(key => {
      if (firefoxControls[key].recommended) newSelection[key] = true;
    });
    setSelectedControls(newSelection);
    setProfile('custom');
  };

  const clearAll = () => {
    setSelectedControls({});
    setProfile('custom');
  };

  const buildPoliciesJson = (selectedKeys) => {
    // Start with a base policies object
    const policies = {};

    selectedKeys.forEach(key => {
      const control = firefoxControls[key];
      if (!control || !control.policyBlock) return;

      // Special overrides for controls that need specific keys
      if (key === 'disableScreenshots') {
        policies['DisableFirefoxScreenshots'] = true;
        return;
      }

      // Merge each key from the control's policyBlock into the policies object
      Object.entries(control.policyBlock).forEach(([pkey, pval]) => {
        // Deep merge for nested objects
        if (typeof pval === 'object' && !Array.isArray(pval) && policies[pkey] && typeof policies[pkey] === 'object') {
          policies[pkey] = { ...policies[pkey], ...pval };
        } else {
          policies[pkey] = pval;
        }
      });
    });

    return JSON.stringify({ policies }, null, 2);
  };

  const buildScript = () => {
    const selectedKeys = Object.keys(selectedControls).filter(key => selectedControls[key]);
    const dc = distroConfig[distro];

    if (selectedKeys.length === 0) {
      setScriptOutput(`#!/usr/bin/env bash\n\n# No Firefox controls selected.\n# Select at least one baseline action, then generate the script again.`);
      return;
    }

    const date = new Date().toISOString().split('T')[0];
    const profileLabel = profile === 'relaxed' ? 'Relaxed' : profile === 'strict' ? 'Strict' : 'Custom';
    const distroLabel = dc.label;
    const policiesJson = buildPoliciesJson(selectedKeys);

    let lines = [];

    lines.push('#!/usr/bin/env bash');
    lines.push('');
    lines.push('# ===============================================');
    lines.push('# Firefox Security Baseline Script (Linux)');
    lines.push('# Generated by Firefox Security Baseline Script Assistant – CyberLife Coach');
    lines.push('# Date: ' + date);
    lines.push('# Profile: ' + profileLabel);
    lines.push('# Distro family: ' + distroLabel);
    lines.push('#');
    lines.push('# This script writes a policies.json file to:');
    lines.push('#   ' + dc.firefoxPath + '/policies.json');
    lines.push('#   ' + dc.firefoxEsrPath + '/policies.json  (if the directory exists)');
    lines.push('#');
    lines.push('# The script targets whichever Firefox distribution paths exist on this system.');
    lines.push('#');
    lines.push('# Review every line before running.');
    lines.push('# Test on a non-critical Linux system first and ensure you have backups.');
    lines.push('# Run this script with root privileges, for example:');
    lines.push('#   sudo bash ./firefox-linux-baseline.sh apply');
    lines.push('# ===============================================');
    lines.push('');
    lines.push('set -euo pipefail');
    lines.push('');
    lines.push('PROFILE_LABEL="' + profileLabel + '"');
    lines.push('FIREFOX_DIR="' + dc.firefoxPath + '"');
    lines.push('FIREFOX_ESR_DIR="' + dc.firefoxEsrPath + '"');
    lines.push('POLICY_FILE="policies.json"');
    lines.push('BACKUP_DIR="' + dc.backupBase + '"');
    lines.push('TIMESTAMP="$(date -u +\\"%Y-%m-%dT%H:%M:%SZ\\")"');
    lines.push('');
    lines.push('# -----------------------------------------------');
    lines.push('# The generated policies.json content');
    lines.push('# -----------------------------------------------');
    lines.push('');
    lines.push('POLICIES_JSON=\'');
    lines.push(policiesJson);
    lines.push('\'');
    lines.push('');
    lines.push('# -----------------------------------------------');
    lines.push('# Apply function');
    lines.push('# -----------------------------------------------');
    lines.push('');
    lines.push('apply_firefox_baseline() {');
    lines.push('  echo "Applying Firefox security baseline (profile: $PROFILE_LABEL)..."');
    lines.push('  echo "Tip: Close all Firefox windows before applying."');
    lines.push('  echo');
    lines.push('');
    lines.push('  local applied=0');
    lines.push('');
    lines.push('  for FF_DIR in "$FIREFOX_DIR" "$FIREFOX_ESR_DIR"; do');
    lines.push('    # Check if the parent directory exists (Firefox is installed)');
    lines.push('    if [ -d "$(dirname \\"$FF_DIR\\")" ] || [ -d "$FF_DIR" ]; then');
    lines.push('      echo "Writing policy to: $FF_DIR/$POLICY_FILE"');
    lines.push('      mkdir -p "$FF_DIR"');
    lines.push('      mkdir -p "$BACKUP_DIR"');
    lines.push('');
    lines.push('      # Back up existing policies.json if present');
    lines.push('      if [ -f "$FF_DIR/$POLICY_FILE" ]; then');
    lines.push('        cp "$FF_DIR/$POLICY_FILE" "$BACKUP_DIR/${POLICY_FILE}.backup.$TIMESTAMP"');
    lines.push('        echo "  Existing policies.json backed up to $BACKUP_DIR/${POLICY_FILE}.backup.$TIMESTAMP"');
    lines.push('      fi');
    lines.push('');
    lines.push('      echo "$POLICIES_JSON" > "$FF_DIR/$POLICY_FILE"');
    lines.push('      chmod 644 "$FF_DIR/$POLICY_FILE"');
    lines.push('      echo "  policies.json written successfully."');
    lines.push('      applied=1');
    lines.push('    fi');
    lines.push('  done');
    lines.push('');
    lines.push('  if [ "$applied" -eq 0 ]; then');
    lines.push('    echo "No Firefox distribution directory found. Writing policy to the standard path."');
    lines.push('    mkdir -p "$FIREFOX_DIR"');
    lines.push('    echo "$POLICIES_JSON" > "$FIREFOX_DIR/$POLICY_FILE"');
    lines.push('    chmod 644 "$FIREFOX_DIR/$POLICY_FILE"');
    lines.push('    echo "Policy written to $FIREFOX_DIR/$POLICY_FILE"');
    lines.push('  fi');
    lines.push('');
    lines.push('  echo');
    lines.push('  echo "Baseline apply complete. Restart Firefox for all changes to take effect."');
    lines.push('  echo "You can verify applied policies by visiting about:policies in Firefox."');
    lines.push('}');
    lines.push('');
    lines.push('# -----------------------------------------------');
    lines.push('# Rollback function');
    lines.push('# -----------------------------------------------');
    lines.push('');
    lines.push('rollback_firefox_baseline() {');
    lines.push('  echo "Rolling back Firefox baseline policies written by this script..."');
    lines.push('  echo');
    lines.push('');
    lines.push('  for FF_DIR in "$FIREFOX_DIR" "$FIREFOX_ESR_DIR"; do');
    lines.push('    local target="$FF_DIR/$POLICY_FILE"');
    lines.push('    if [ -f "$target" ]; then');
    lines.push('      rm -f "$target"');
    lines.push('      echo "  Removed: $target"');
    lines.push('    else');
    lines.push('      echo "  Not found (skipping): $target"');
    lines.push('    fi');
    lines.push('  done');
    lines.push('');
    lines.push('  echo');
    lines.push('  echo "Rollback complete. Restart Firefox to apply the rollback."');
    lines.push('  echo "If a backup was saved in $BACKUP_DIR, you can restore it manually."');
    lines.push('}');
    lines.push('');
    lines.push('usage() {');
    lines.push('  echo "Usage: sudo bash $0 [apply|rollback]"');
    lines.push('  echo');
    lines.push('  echo "  apply    Write the Firefox policies.json to the distribution directory"');
    lines.push('  echo "  rollback Remove the policies.json file written by this script"');
    lines.push('}');
    lines.push('');
    lines.push('case "${1:-}" in');
    lines.push('  apply)');
    lines.push('    apply_firefox_baseline');
    lines.push('    ;;');
    lines.push('  rollback)');
    lines.push('    rollback_firefox_baseline');
    lines.push('    ;;');
    lines.push('  *)');
    lines.push('    usage');
    lines.push('    exit 1');
    lines.push('    ;;');
    lines.push('esac');
    lines.push('');
    lines.push('# End of generated Firefox Linux baseline script.');

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
    a.download = `firefox-linux-baseline.${extension}`;
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
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Firefox</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Linux</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Local, in-browser</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Firefox Baseline Script Assistant (Linux)
          </h1>

          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            Choose your Linux distro family and a set of Firefox hardening controls. This assistant generates a bash script that writes a <code className="text-cyan-400 bg-slate-800/60 px-1.5 py-0.5 rounded text-base">policies.json</code> file to Firefox's distribution directory. Review it, test it, then deploy with root privileges. No data leaves your browser.
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
              <h2 className="text-2xl font-bold mb-2">Pick the Firefox security controls</h2>
              <p className="text-slate-400 text-sm">
                Start with the relaxed profile for everyday systems. Move to strict only after testing, as some controls affect saved logins, search behavior, and third-party sign-ins.
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
                <p><span className="text-slate-300 font-medium">Firefox policy path:</span> <code className="text-cyan-400">{dc.firefoxPath}/policies.json</code></p>
                <p><span className="text-slate-300 font-medium">Firefox ESR path:</span> <code className="text-cyan-400">{dc.firefoxEsrPath}/policies.json</code></p>
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
              <strong className="text-slate-300">Relaxed</strong> enables tracking protection, HTTPS-Only, and telemetry controls while keeping logins and search suggestions working. <strong className="text-slate-300">Strict</strong> adds password manager removal, screenshot disabling, and search suggestion blocking.
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
              {Object.entries(firefoxControls).map(([key, control]) => (
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
              <strong className="text-slate-300">Tip:</strong> Firefox's policies.json approach works on all Linux distros without needing a package manager or GPO. The file is read at browser launch, so a restart is always required after applying changes.
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
              <h2 className="text-2xl font-bold mb-2">Generated Firefox baseline bash script</h2>
              <p className="text-slate-400 text-sm">
                Review every line, test on a non-critical Linux system, then run with root privileges using sudo.
              </p>
            </div>

            {/* Script Textarea */}
            <textarea
              value={scriptOutput}
              readOnly
              className="w-full h-[450px] bg-slate-950/80 border border-slate-700 rounded-lg p-4 text-sm text-slate-300 font-mono resize-none focus:outline-none focus:border-cyan-500/50 custom-scrollbar mb-4"
              placeholder="Select your distro family and controls, then click 'Generate bash script' to build your Firefox baseline for Linux..."
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
              <p><strong className="text-slate-300">How to use:</strong> Save the script as <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">firefox-linux-baseline.sh</code>, then run <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">sudo bash firefox-linux-baseline.sh apply</code> from a terminal.</p>
              <p><strong className="text-slate-300">Rollback:</strong> To remove the policies.json written by this script, run <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">sudo bash firefox-linux-baseline.sh rollback</code>.</p>
              <p><strong className="text-slate-300">Verify:</strong> After applying, open Firefox and visit <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">about:policies</code> to confirm which policies are active and whether any errors were reported.</p>
              <p><strong className="text-slate-300">Scope of rollback:</strong> The rollback removes only the <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">policies.json</code> file written by this script. Other files in the distribution directory are not affected.</p>
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
                <li>• Back up any existing policies.json with <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded text-xs">sudo cp policies.json policies.json.bak</code> before applying.</li>
                <li>• Select the correct distro family so the script targets the right Firefox paths.</li>
                <li>• Review the embedded policies.json block in the script before running.</li>
                <li>• Test on a non-critical Linux machine first with root or sudo privileges.</li>
                <li>• Close all Firefox windows before running the script.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Good next steps</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• After applying, open Firefox and visit <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded text-xs">about:policies</code> to verify active policies.</li>
                <li>• Save your adjusted script in version control or a secure folder.</li>
                <li>• Document which controls you applied and on which machines.</li>
                <li>• For fleet deployments, consider using Ansible, Salt, or a similar config management tool to distribute the policies.json file.</li>
                <li>• Revisit this baseline as Firefox and your environment evolve.</li>
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
                  This assistant runs entirely in your browser. Your selections and the generated script are not sent to CyberLife Coach, to Mozilla, or to any third party. The output is a generic starting point and is provided for educational and informational use only. It is not a substitute for professional advice, does not guarantee compliance with any standard, and is used at your own risk. Always test in a safe environment, verify every line, and ensure you have reliable backups before making changes. Do not apply these settings to employer or school managed devices without explicit approval, and do not bypass existing fleet management or enterprise change-control processes.
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
