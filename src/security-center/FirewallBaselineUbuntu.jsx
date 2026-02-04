import React, { useState, useEffect } from 'react';
import { Shield, ArrowLeft, Copy, Download, Trash2, Settings, AlertTriangle, CheckCircle, Info, Star } from 'lucide-react';

export default function FirewallBaselineUbuntu() {
  const [selectedControls, setSelectedControls] = useState({
    defaultDenyIn: true,
    defaultAllowOut: true,
    enableUfw: true,
    statusVerbose: true,
    allowSSH: false,
    allowHTTP: false,
    allowHTTPS: false,
    allowSamba: false,
    allowVNC: false
  });
  const [scriptOutput, setScriptOutput] = useState('');
  const [downloadFormat, setDownloadFormat] = useState('sh');

  // Control definitions
  const essentialControls = [
    {
      key: 'defaultDenyIn',
      title: 'Set default policy: deny incoming',
      description: 'sudo ufw default deny incoming blocks all connection attempts to your computer by default. Only traffic you explicitly allow will get through.',
      badge: 'Crucial',
      badgeColor: 'yellow'
    },
    {
      key: 'defaultAllowOut',
      title: 'Set default policy: allow outgoing',
      description: 'sudo ufw default allow outgoing lets your apps reach the internet normally, keeping web browsing, updates, and streaming services working as expected.',
      badge: 'Standard',
      badgeColor: 'cyan'
    },
    {
      key: 'enableUfw',
      title: 'Enable UFW',
      description: 'sudo ufw enable activates the firewall with the rules and defaults you have set. UFW will ask you to confirm the change the first time you run this.',
      badge: 'Required',
      badgeColor: 'cyan'
    },
    {
      key: 'statusVerbose',
      title: 'Show verbose status after changes',
      description: 'sudo ufw status verbose confirms that UFW is active and shows your current default policies and any explicit allow rules.',
      badge: null,
      badgeColor: null
    }
  ];

  const optionalControls = [
    {
      key: 'allowSSH',
      title: 'Allow SSH (port 22/tcp)',
      description: 'sudo ufw allow ssh or sudo ufw allow 22/tcp is useful if you connect to this Ubuntu system remotely from another device, for example a laptop on your home network.'
    },
    {
      key: 'allowHTTP',
      title: 'Allow HTTP (port 80/tcp)',
      description: 'sudo ufw allow http or sudo ufw allow 80/tcp is only needed if you are hosting a local website or test application that other devices should reach.'
    },
    {
      key: 'allowHTTPS',
      title: 'Allow HTTPS (port 443/tcp)',
      description: 'sudo ufw allow https or sudo ufw allow 443/tcp is for secure web traffic if your hosted site or app uses HTTPS.'
    },
    {
      key: 'allowSamba',
      title: 'Allow Samba file sharing',
      description: 'sudo ufw allow Samba exposes SMB file sharing to your local network so Windows and other machines can reach shared folders on this Ubuntu system.'
    },
    {
      key: 'allowVNC',
      title: 'Allow VNC/remote desktop (port 5900/tcp)',
      description: 'sudo ufw allow 5900/tcp is only needed if you use a VNC or remote desktop client to view and control this Ubuntu desktop from another device.'
    }
  ];

  useEffect(() => {
    generateScript();
  }, []);

  const handleControlToggle = (key) => {
    const newSelection = { ...selectedControls, [key]: !selectedControls[key] };
    setSelectedControls(newSelection);
  };

  const selectRecommended = () => {
    const newSelection = {
      defaultDenyIn: true,
      defaultAllowOut: true,
      enableUfw: true,
      statusVerbose: true,
      allowSSH: false,
      allowHTTP: false,
      allowHTTPS: false,
      allowSamba: false,
      allowVNC: false
    };
    setSelectedControls(newSelection);
  };

  const clearAll = () => {
    const newSelection = {};
    [...essentialControls, ...optionalControls].forEach(control => {
      newSelection[control.key] = false;
    });
    setSelectedControls(newSelection);
    generateScript(newSelection);
  };

  const generateScript = (selection = selectedControls) => {
    const script = buildScript(selection);
    setScriptOutput(script);
  };

  const buildScript = (options) => {
    const denyIn = !!options.defaultDenyIn;
    const allowOut = !!options.defaultAllowOut;
    const enableUfw = !!options.enableUfw;
    const statusVerbose = !!options.statusVerbose;
    const allowSSH = !!options.allowSSH;
    const allowHTTP = !!options.allowHTTP;
    const allowHTTPS = !!options.allowHTTPS;
    const allowSamba = !!options.allowSamba;
    const allowVNC = !!options.allowVNC;

    const lines = [];

    // Check if nothing is selected
    if (!denyIn && !allowOut && !enableUfw && !statusVerbose && !allowSSH && !allowHTTP && !allowHTTPS && !allowSamba && !allowVNC) {
      lines.push('# No Ubuntu UFW firewall controls were selected when this script was generated.');
      lines.push('# Select at least one control and generate the script again.');
      return lines.join('\n');
    }

    lines.push('#!/bin/bash');
    lines.push('#');
    lines.push('# Ubuntu UFW Firewall Baseline Script');
    lines.push('# Generated by Ubuntu Firewall Baseline Assistant – CyberLife Coach');
    lines.push('#');
    lines.push('# This script backs up your current UFW configuration, then applies baseline');
    lines.push('# firewall settings. Run with "apply" to configure UFW or "rollback" to restore');
    lines.push('# the most recent backup.');
    lines.push('#');
    lines.push('# Usage:');
    lines.push('#   sudo ./firewall-baseline-ubuntu.sh apply');
    lines.push('#   sudo ./firewall-baseline-ubuntu.sh rollback');
    lines.push('#');
    lines.push('# Backup location: /var/backups/ufw-baseline');
    lines.push('');
    lines.push('set -euo pipefail');
    lines.push('');
    lines.push('BACKUP_ROOT="/var/backups/ufw-baseline"');
    lines.push('');
    lines.push('log() {');
    lines.push('  echo "[$(date "+%F %T")] $*"');
    lines.push('}');
    lines.push('');
    lines.push('err() {');
    lines.push('  echo "[$(date "+%F %T")] ERROR: $*" >&2');
    lines.push('}');
    lines.push('');
    lines.push('check_prereqs() {');
    lines.push('  if [ "$EUID" -ne 0 ]; then');
    lines.push('    err "This script must be run as root (use sudo)."');
    lines.push('    exit 1');
    lines.push('  fi');
    lines.push('');
    lines.push('  if ! command -v ufw >/dev/null 2>&1; then');
    lines.push('    err "UFW not found. Install it with: sudo apt-get install ufw"');
    lines.push('    exit 1');
    lines.push('  fi');
    lines.push('}');
    lines.push('');
    lines.push('backup_ufw_config() {');
    lines.push('  log "Backing up /etc/ufw to $BACKUP_ROOT..."');
    lines.push('');
    lines.push('  if [ ! -d "$BACKUP_ROOT" ]; then');
    lines.push('    mkdir -p "$BACKUP_ROOT" || {');
    lines.push('      err "Failed to create backup directory at $BACKUP_ROOT."');
    lines.push('      exit 1');
    lines.push('    }');
    lines.push('  fi');
    lines.push('');
    lines.push('  local timestamp');
    lines.push('  timestamp="$(date +%Y%m%d_%H%M%S)"');
    lines.push('  local archive="$BACKUP_ROOT/ufw-config-$timestamp.tar.gz"');
    lines.push('');
    lines.push('  tar -czf "$archive" -C /etc ufw 2>/dev/null || {');
    lines.push('    err "Failed to create UFW config backup."');
    lines.push('    exit 1');
    lines.push('  }');
    lines.push('');
    lines.push('  log "Backup saved to: $archive"');
    lines.push('}');
    lines.push('');
    lines.push('rollback_latest_backup() {');
    lines.push('  if [ ! -d "$BACKUP_ROOT" ]; then');
    lines.push('    err "No backup directory at $BACKUP_ROOT. Nothing to roll back to."');
    lines.push('    exit 1');
    lines.push('  fi');
    lines.push('');
    lines.push('  local latest');
    lines.push('  latest="$(ls -1t "$BACKUP_ROOT"/ufw-config-*.tar.gz 2>/dev/null | head -n 1 || true)"');
    lines.push('');
    lines.push('  if [ -z "$latest" ]; then');
    lines.push('    err "No backup archive found in $BACKUP_ROOT."');
    lines.push('    exit 1');
    lines.push('  fi');
    lines.push('');
    lines.push('  log "Restoring UFW config from: $latest"');
    lines.push('');
    lines.push('  tar -xzf "$latest" -C /etc || {');
    lines.push('    err "Failed to extract backup archive."');
    lines.push('    exit 1');
    lines.push('  }');
    lines.push('');
    lines.push('  log "Reloading UFW after rollback..."');
    lines.push('  sudo ufw reload || log "UFW reload returned an error, but config may still be restored."');
    lines.push('');
    lines.push('  log "Rollback completed. Review ufw status to confirm expected rules."');
    lines.push('}');
    lines.push('');
    lines.push('apply_baseline() {');

    if (!denyIn && !allowOut && !enableUfw && !allowSSH && !allowHTTP && !allowHTTPS && !allowSamba && !allowVNC && !statusVerbose) {
      lines.push('  log "No UFW actions were selected when this script was generated. Nothing to do."');
      lines.push('  return 0');
    } else {
      if (denyIn) {
        lines.push('  log "Setting default policy: deny incoming..."');
        lines.push('  sudo ufw default deny incoming');
        lines.push('');
      }
      if (allowOut) {
        lines.push('  log "Setting default policy: allow outgoing..."');
        lines.push('  sudo ufw default allow outgoing');
        lines.push('');
      }
      if (allowSSH) {
        lines.push('  log "Allowing SSH (22/tcp)..."');
        lines.push('  sudo ufw allow ssh');
        lines.push('');
      }
      if (allowHTTP) {
        lines.push('  log "Allowing HTTP (80/tcp)..."');
        lines.push('  sudo ufw allow http');
        lines.push('');
      }
      if (allowHTTPS) {
        lines.push('  log "Allowing HTTPS (443/tcp)..."');
        lines.push('  sudo ufw allow https');
        lines.push('');
      }
      if (allowSamba) {
        lines.push('  log "Allowing Samba file sharing..."');
        lines.push('  sudo ufw allow Samba');
        lines.push('');
      }
      if (allowVNC) {
        lines.push('  log "Allowing VNC/remote desktop (5900/tcp)..."');
        lines.push('  sudo ufw allow 5900/tcp');
        lines.push('');
      }
      if (enableUfw) {
        lines.push('  log "Enabling UFW. You may be asked to confirm..."');
        lines.push('  sudo ufw enable');
        lines.push('');
      }
      if (statusVerbose) {
        lines.push('  log "Showing \\"ufw status verbose\\" after changes:"');
        lines.push('  sudo ufw status verbose');
        lines.push('');
      }
    }

    lines.push('}');
    lines.push('');
    lines.push('usage() {');
    lines.push('  cat <<EOF');
    lines.push('Usage: sudo $0 [apply|rollback]');
    lines.push('');
    lines.push('  apply      Backup /etc/ufw, then apply the selected UFW baseline settings.');
    lines.push('  rollback   Restore the most recent UFW backup from:');
    lines.push('             $BACKUP_ROOT');
    lines.push('');
    lines.push('Examples:');
    lines.push('  sudo $0 apply');
    lines.push('  sudo $0 rollback');
    lines.push('EOF');
    lines.push('}');
    lines.push('');
    lines.push('main() {');
    lines.push('  local action="${1:-}"');
    lines.push('');
    lines.push('  if [ -z "$action" ]; then');
    lines.push('    usage');
    lines.push('    exit 1');
    lines.push('  fi');
    lines.push('');
    lines.push('  log "Ubuntu UFW firewall baseline script starting."');
    lines.push('  check_prereqs');
    lines.push('');
    lines.push('  case "$action" in');
    lines.push('    apply)');
    lines.push('      log "This will create a backup of /etc/ufw, then apply the UFW settings listed in the header comments."');
    if (denyIn) {
      lines.push('      log "- Incoming connections will be denied by default."');
    }
    if (allowOut) {
      lines.push('      log "- Outgoing connections will be allowed by default."');
    }
    if (allowSSH || allowHTTP || allowHTTPS || allowSamba || allowVNC) {
      lines.push('      log "- One or more service-specific allow rules will be added."');
    }
    lines.push('      log "- A compressed backup of /etc/ufw will be stored under $BACKUP_ROOT."');
    lines.push('');
    lines.push('      read -r -p "Continue and apply these firewall changes? [y/N]: " answer');
    lines.push('      answer="${answer:-N}"');
    lines.push('      if [ "$answer" != "y" ] && [ "$answer" != "Y" ]; then');
    lines.push('        log "Aborting at user request. No changes were made."');
    lines.push('        exit 0');
    lines.push('      fi');
    lines.push('');
    lines.push('      backup_ufw_config');
    lines.push('      apply_baseline');
    lines.push('      log "Done. Review the output above for any errors or prompts."');
    lines.push('      ;;');
    lines.push('');
    lines.push('    rollback)');
    lines.push('      rollback_latest_backup');
    lines.push('      ;;');
    lines.push('');
    lines.push('    *)');
    lines.push('      err "Unknown action: $action"');
    lines.push('      usage');
    lines.push('      exit 1');
    lines.push('      ;;');
    lines.push('  esac');
    lines.push('}');
    lines.push('');
    lines.push('main "$@"');
    lines.push('');

    return lines.join('\n');
  };

  const copyToClipboard = () => {
    if (scriptOutput) {
      navigator.clipboard.writeText(scriptOutput).catch(err => {
        console.warn('Clipboard write failed:', err);
      });
    }
  };

  const downloadScript = () => {
    if (!scriptOutput.trim()) return;

    const extension = downloadFormat === 'txt' ? 'txt' : 'sh';
    const blob = new Blob([scriptOutput], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `firewall-baseline-ubuntu.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getBadgeColor = (color) => {
    switch (color) {
      case 'cyan':
        return 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400';
      case 'yellow':
        return 'border-yellow-500/40 bg-yellow-500/10 text-yellow-400';
      default:
        return 'border-slate-500/40 bg-slate-500/10 text-slate-300';
    }
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
              Security Baseline Script Assistant
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 border border-slate-600">
              Ubuntu + UFW
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 border border-slate-600">
              Local, in-browser helper
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Generate an Ubuntu UFW firewall baseline script
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl">
            This assistant prepares a Bash script that configures Ubuntu's Uncomplicated Firewall (UFW) for a typical home user baseline. It sets default policies, enables the firewall, and can add common service rules like SSH or HTTP/HTTPS. The script automatically backs up your UFW configuration before applying changes and supports rollback. No data leaves your browser.
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
                Step 1 · Choose your UFW baseline
              </div>
              <h2 className="text-xl font-bold mb-2">Essential UFW defaults for most home users.</h2>
              <p className="text-sm text-slate-400 mb-6">
                For a typical home desktop or laptop, you usually want to block unsolicited inbound traffic, allow outbound traffic, and enable UFW. Additional allow rules are only needed when you intentionally host services.
              </p>

              <div className="space-y-3 mb-6">
                {essentialControls.map(control => (
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
                          {control.badge && (
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${getBadgeColor(control.badgeColor)}`}>
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

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-slate-100">Note:</strong> On Ubuntu, UFW is a user-friendly front end to the iptables engine, which is often installed but left doing very little by default. These commands wake it up with a sensible baseline. The generated script automatically backs up <code className="text-cyan-400">/etc/ufw</code> before it makes changes.
                </p>
              </div>

              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">
                Optional · Only if this Ubuntu box runs services
              </div>
              <p className="text-sm text-slate-400 mb-4">
                Add allow rules only when this Ubuntu machine is hosting something that other devices need to reach, such as SSH, a personal website, or a file share. If you never use these services, leave them unchecked.
              </p>

              <div className="space-y-3 mb-6">
                {optionalControls.map(control => (
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
                        <h3 className="font-semibold text-sm mb-1">{control.title}</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">{control.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => generateScript()}
                  className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transition-all font-semibold shadow-lg shadow-cyan-500/20"
                >
                  <Settings className="w-4 h-4" />
                  <span>Generate script</span>
                </button>
                <button
                  onClick={selectRecommended}
                  className="flex items-center space-x-2 px-6 py-3 rounded-lg border border-slate-700 hover:border-cyan-500 transition-all hover:bg-slate-800 font-semibold"
                >
                  <Star className="w-4 h-4" />
                  <span>Select recommended</span>
                </button>
                <button
                  onClick={clearAll}
                  className="flex items-center space-x-2 px-6 py-3 rounded-lg border border-slate-700 hover:border-red-500 transition-all hover:bg-red-500/10 text-red-400 font-semibold"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear all</span>
                </button>
              </div>
            </div>

            {/* Output Card */}
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">
                Step 2 · Copy, review, then run
              </div>
              <h2 className="text-xl font-bold mb-2">Generated Ubuntu UFW firewall baseline script</h2>
              <p className="text-sm text-slate-400 mb-4">
                Review every line, test on a non-critical Ubuntu system, then run it from a terminal. The script supports{' '}
                <code className="text-cyan-400">apply</code> and <code className="text-cyan-400">rollback</code> modes and automatically backs up{' '}
                <code className="text-cyan-400">/etc/ufw</code> before applying changes.
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
                
                <select
                  value={downloadFormat}
                  onChange={(e) => setDownloadFormat(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                >
                  <option value="sh">Download as .sh</option>
                  <option value="txt">Download as .txt</option>
                </select>

                <button
                  onClick={downloadScript}
                  disabled={!scriptOutput}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold border border-slate-700 hover:border-cyan-500 transition-all hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  <span>Download file</span>
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-400">
                <p>
                  <strong className="text-slate-300">How to use:</strong> Save the output as{' '}
                  <code className="text-cyan-400">firewall-baseline-ubuntu.sh</code>, make it executable with{' '}
                  <code className="text-cyan-400">chmod +x firewall-baseline-ubuntu.sh</code>, then run:
                </p>
                <p>
                  <code className="text-cyan-400">sudo ./firewall-baseline-ubuntu.sh apply</code> to create a backup of{' '}
                  <code className="text-cyan-400">/etc/ufw</code> and apply the selected baseline.{' '}
                  <code className="text-cyan-400">sudo ./firewall-baseline-ubuntu.sh rollback</code> to restore the most recent backup from{' '}
                  <code className="text-cyan-400">/var/backups/ufw-baseline</code> and reload UFW.
                </p>
                <p>
                  <strong className="text-slate-300">Tip:</strong> Whenever you change your service mix (for example you stop using VNC or shut down a web server), regenerate a fresh script with only the rules you still need and run it again to keep your attack surface small.
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
            How to use this assistant safely
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-3">Before you run the script</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Use this only on Ubuntu systems that you own or are authorized to manage.</li>
                <li>• Make sure you understand which services (if any) you actually host on this machine.</li>
                <li>• Start with the recommended baseline, then add service rules only when you truly need them.</li>
                <li>• Ensure <code className="text-cyan-400">/var/backups/ufw-baseline</code> is on a disk with enough space for compressed copies of <code className="text-cyan-400">/etc/ufw</code>.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">What the script does</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Creates a timestamped <code className="text-cyan-400">tar.gz</code> backup of <code className="text-cyan-400">/etc/ufw</code> before applying changes.</li>
                <li>• Can set default policies for incoming and outgoing connections.</li>
                <li>• Enables UFW so the firewall enforces your rules.</li>
                <li>• Can add common <code className="text-cyan-400">allow</code> rules for SSH, HTTP/HTTPS, Samba, and VNC.</li>
                <li>• Provides a <code className="text-cyan-400">rollback</code> mode that restores the latest archive and reloads UFW.</li>
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
                  This assistant runs entirely in your browser. Your selections and the generated script are not sent to CyberLife Coach or to any third party. The output is a generic starting point and is provided for educational and informational use only. It is not a substitute for professional advice, does not guarantee compliance with any standard, and is used at your own risk. Always review each command, test first on a non-critical system, and make sure you understand how these rules interact with your router, ISP modem, and any other security tools. Do not apply these settings to employer or school managed devices without explicit approval.
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
