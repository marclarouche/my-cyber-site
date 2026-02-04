import React, { useState, useEffect } from 'react';
import { Shield, ArrowLeft, Copy, Download, Trash2, Settings, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function LinuxBaselineAssistant() {
  const [profile, setProfile] = useState('relaxed');
  const [selectedControls, setSelectedControls] = useState({});
  const [scriptOutput, setScriptOutput] = useState('');
  const [downloadFormat, setDownloadFormat] = useState('sh');

  // Control definitions
  const controls = [
    { key: 'telnetRemoval', title: 'Remove telnet package', description: 'Confirms telnet is not installed and documents the requirement to avoid legacy, unencrypted remote access on Ubuntu 24.04 LTS.', severity: 'critical', hint: 'Ensure the telnet package is not installed. Example: apt-get remove --purge telnet', relaxed: true, strict: true },
    { key: 'rshServerRemoval', title: 'Remove rsh-server package', description: 'Documents removal of insecure remote shell services such as rsh-server to prevent cleartext remote logins.', severity: 'critical', hint: 'Ensure rsh-server is not installed. Example: apt-get remove --purge rsh-server rsh-redone-server', relaxed: true, strict: true },
    { key: 'sshInstalled', title: 'Ensure SSH server is installed', description: 'Verifies that secure remote access is provided through openssh-server instead of legacy protocols like telnet or rsh.', severity: 'critical', hint: 'Ensure a supported OpenSSH server is installed and enabled. Example: apt-get install openssh-server', relaxed: true, strict: true },
    { key: 'singleUserAuth', title: 'Require auth for single-user and maintenance modes', description: 'Ensures rescue and emergency modes require credentials so that single-user boot is not an unguarded back door.', severity: 'critical', manual: true, hint: 'Require authentication for rescue and emergency targets. Example: ensure sulogin is configured for rescue/emergency in systemd units', relaxed: true, strict: true },
    { key: 'remoteXRestricted', title: 'Restrict remote X connections', description: 'Notes that remote X11 access should be disabled or limited to documented mission requirements to reduce exposure of graphical sessions.', severity: 'critical', manual: true, hint: 'Disable or tightly restrict remote X11 connections unless explicitly required', relaxed: true, strict: true },
    { key: 'noBlankPasswords', title: 'Prohibit accounts with blank passwords', description: 'Confirms that local user accounts do not use empty or null passwords, which would allow trivial compromise.', severity: 'critical', hint: 'Ensure no local accounts have blank passwords. Example: passwd -S and /etc/shadow review', relaxed: true, strict: true },
    { key: 'pamNoNullPasswords', title: 'Disallow null passwords in PAM', description: 'Ensures Pluggable Authentication Modules do not permit blank or null passwords, even if shadow data is misconfigured.', severity: 'critical', manual: true, hint: 'Ensure PAM rejects null passwords. Example: verify pam_unix.so and pam_pwquality settings disallow nullok', relaxed: true, strict: true },
    { key: 'noSshAutoLogin', title: 'Disable unattended or automatic SSH logins', description: 'Prevents unattended or automatic SSH sessions that could be exploited without active user presence.', severity: 'critical', hint: 'Disable unattended or automatic SSH logins. Example: avoid PasswordAuthentication with blank or embedded credentials and disable auto-login tooling', relaxed: true, strict: true },
    { key: 'fipsCrypto', title: 'Enable FIPS-validated cryptographic modules', description: 'Plans and tests NIST FIPS-validated crypto for the system. Strict profile only. Requires careful testing.', severity: 'critical', manual: true, hint: 'Plan and test NIST FIPS-validated crypto for the system. Example: review Ubuntu FIPS enablement and kernel options before enabling', relaxed: false, strict: true },
    { key: 'sudoGroupRestricted', title: 'Restrict sudo group membership', description: 'Limits sudo group membership to people who administer the system, reducing the risk of privilege escalation.', severity: 'critical', hint: 'Limit sudo group membership to people who administer the system. Example: getent group sudo', relaxed: true, strict: true },
    { key: 'fileIntegrityTool', title: 'Use a file integrity tool (AIDE)', description: 'Uses a file integrity tool such as AIDE to verify key system files and detect unauthorized changes.', severity: 'medium', hint: 'Use a file integrity tool such as AIDE to verify key system files', relaxed: true, strict: true },
    { key: 'aideConfigured', title: 'AIDE installed and configured', description: 'Ensures AIDE is installed, initialized, and configured with rules for critical paths.', severity: 'medium', hint: 'Install and initialize AIDE, then configure rules for critical paths. Example: apt-get install aide', relaxed: true, strict: true },
    { key: 'aideSchedule', title: 'Schedule AIDE scans regularly', description: 'Ensures AIDE or equivalent file integrity checks run at least every 30 days via cron or systemd timer.', severity: 'medium', hint: 'Ensure AIDE or equivalent file integrity checks run at least every 30 days via cron or systemd timer', relaxed: true, strict: true },
    { key: 'appFirewallInstalled', title: 'Install host firewall (ufw)', description: 'Installs a host firewall solution such as ufw or nftables front ends to control network traffic.', severity: 'medium', hint: 'Install a host firewall solution such as ufw or nftables front ends', relaxed: true, strict: true },
    { key: 'ufwEnabled', title: 'Enable and configure ufw', description: 'Configures and enables ufw with default deny inbound, allowing only needed services.', severity: 'medium', hint: 'Configure and enable ufw with default deny inbound, allow needed services only. Example: ufw enable', relaxed: true, strict: true },
    { key: 'apparmorInstalled', title: 'Install AppArmor packages', description: 'Ensures AppArmor packages are installed for mandatory access control.', severity: 'medium', hint: 'Ensure AppArmor packages are installed. Example: apt-get install apparmor apparmor-utils', relaxed: true, strict: true },
    { key: 'apparmorEnforced', title: 'Enable AppArmor enforcement', description: 'Ensures AppArmor is enabled and profiles are in enforce mode where appropriate.', severity: 'medium', hint: 'Ensure AppArmor is enabled and profiles are in enforce mode where appropriate', relaxed: true, strict: true },
    { key: 'libpamPwqualityInstalled', title: 'Install libpam-pwquality', description: 'Installs libpam-pwquality for password strength enforcement and complexity requirements.', severity: 'medium', hint: 'Install libpam-pwquality for password strength enforcement. Example: apt-get install libpam-pwquality', relaxed: true, strict: true },
    { key: 'sshFipsCiphers', title: 'Restrict SSH to FIPS-approved ciphers', description: 'Restricts SSH ciphers and key exchanges to FIPS-approved algorithms in sshd_config. Strict profile only.', severity: 'medium', hint: 'Restrict SSH ciphers and key exchanges to FIPS-approved algorithms in sshd_config', relaxed: false, strict: true },
    { key: 'sshMacAlgorithms', title: 'Configure strong SSH MAC algorithms', description: 'Configures SSH MAC algorithms to strong, FIPS-aligned choices in sshd_config. Strict profile only.', severity: 'medium', hint: 'Configure SSH MAC algorithms to strong, FIPS-aligned choices in sshd_config', relaxed: false, strict: true },
    { key: 'sessionIdleTimeout', title: 'Set session idle timeouts', description: 'Sets reasonable shell and SSH idle timeouts (TMOUT, ClientAliveInterval, ClientAliveCountMax) to terminate inactive sessions.', severity: 'medium', hint: 'Set reasonable shell and SSH idle timeouts (TMOUT, ClientAliveInterval, ClientAliveCountMax)', relaxed: true, strict: true },
    { key: 'passwordHashFips', title: 'Use FIPS-approved password hashing', description: 'Ensures passwords use a FIPS-approved hash such as SHA-512 in /etc/login.defs and PAM config.', severity: 'medium', hint: 'Ensure passwords use a FIPS-approved hash such as SHA-512 in /etc/login.defs and PAM config', relaxed: true, strict: true },
    { key: 'networkSessionTimeout', title: 'Terminate inactive remote sessions', description: 'Terminates remote sessions and traffic after the defined inactivity period (for example, 10 minutes). Strict profile only.', severity: 'medium', hint: 'Terminate remote sessions and traffic after the defined inactivity period (for example, 10 minutes)', relaxed: false, strict: true },
    { key: 'disableCoreDumps', title: 'Disable or restrict core dumps', description: 'Disables or tightly restricts kernel core dumps to avoid dumping sensitive memory contents.', severity: 'medium', hint: 'Disable or tightly restrict kernel core dumps to avoid dumping sensitive memory contents', relaxed: true, strict: true },
    { key: 'chronyInstalled', title: 'Install chrony for time sync', description: 'Installs chrony for reliable, secure time synchronization with NTP servers.', severity: 'low', hint: 'Install chrony for reliable, secure time synchronization. Example: apt-get install chrony', relaxed: true, strict: true },
    { key: 'loginDelay', title: 'Enforce login delay after failures', description: 'Enforces a delay (for example, four seconds) between failed login prompts to slow brute-force attacks.', severity: 'low', hint: 'Enforce a delay (for example, four seconds) between failed login prompts', relaxed: true, strict: true },
    { key: 'pamCachedAuth', title: 'Expire cached PAM authentications', description: 'Ensures cached PAM authentications expire after one day or are not used where not required. Strict profile only.', severity: 'low', hint: 'Ensure cached PAM authentications expire after one day or are not used where not required', relaxed: false, strict: true },
    { key: 'restrictDmesg', title: 'Restrict kernel message buffer access', description: 'Restricts access to kernel message buffer using dmesg_restrict and permissions. Strict profile only.', severity: 'low', hint: 'Restrict access to kernel message buffer, for example using dmesg_restrict and permissions', relaxed: false, strict: true }
  ];

  const profiles = {
    relaxed: controls.filter(c => c.relaxed).map(c => c.key),
    strict: controls.filter(c => c.strict).map(c => c.key)
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
    setScriptOutput('# No Ubuntu baseline controls selected.\n# Select at least one item, then generate the script again.');
  };

  const generateScript = (selection, profileName) => {
    const selectedKeys = Object.keys(selection).filter(k => selection[k]);
    
    if (!selectedKeys.length) {
      setScriptOutput('# No Ubuntu baseline controls selected.\n# Select at least one item, then generate the script again.');
      return;
    }

    const dateStr = new Date().toISOString();
    const profileLabel = profileName.charAt(0).toUpperCase() + profileName.slice(1);
    
    const lines = [];
    
    lines.push('# ===============================================');
    lines.push('# Ubuntu 24.04 LTS Security Baseline Script');
    lines.push('# Generated by Ubuntu Linux Security Baseline Assistant – CyberLife Coach');
    lines.push(`# Date: ${dateStr}`);
    lines.push(`# Profile: ${profileLabel}`);
    lines.push('#');
    lines.push('# This script is a checklist-style template based on selected STIG-inspired controls.');
    lines.push('# It does not automatically enforce every requirement. You must review, extend, and test');
    lines.push('# each section carefully before running on real systems.');
    lines.push('# ===============================================');
    lines.push('');
    lines.push('# Usage:');
    lines.push('#   1. Review each control block and adjust commands for your environment.');
    lines.push('#   2. Save as ubuntu-baseline.sh and make executable: chmod +x ubuntu-baseline.sh');
    lines.push('#   3. Run as root or via sudo on a non-production system first: sudo ./ubuntu-baseline.sh');
    lines.push('');
    lines.push('set -euo pipefail');
    lines.push('');
    lines.push('echo "[INFO] Starting Ubuntu 24.04 LTS baseline checklist..."');
    lines.push('');

    selectedKeys.forEach((key, index) => {
      const control = controls.find(c => c.key === key);
      if (!control) return;

      lines.push('');
      lines.push('# -----------------------------------------------');
      lines.push(`# Control ${index + 1}: ${control.title}`);
      lines.push(`# Severity : CAT ${control.severity === 'critical' ? 'I' : control.severity === 'medium' ? 'II' : 'III'}`);
      if (control.hint) {
        lines.push(`# Hint     : ${control.hint}`);
      }
      lines.push('#');
      lines.push('# Implement this control in line with your organization policies,');
      lines.push('# Ubuntu 24.04 LTS STIG guidance, and any regulatory or contract obligations.');
      lines.push('');
      lines.push(`echo "[INFO] Review control: ${control.title}";`);
      lines.push(`echo "       Severity: CAT ${control.severity === 'critical' ? 'I' : control.severity === 'medium' ? 'II' : 'III'}";`);
      if (control.hint) {
        lines.push(`echo "       Hint: ${control.hint}";`);
      }
      lines.push('echo "";');
    });

    lines.push('');
    lines.push('echo "[INFO] Baseline checklist script complete. Review output above and update controls as needed."');
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
    a.download = `ubuntu-baseline.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const criticalControls = controls.filter(c => c.severity === 'critical');
  const mediumControls = controls.filter(c => c.severity === 'medium');
  const lowControls = controls.filter(c => c.severity === 'low');

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
              CAT I
            </span>
          )}
          {control.severity === 'medium' && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-900/80 text-blue-200 border border-blue-500/70">
              CAT II
            </span>
          )}
          {control.severity === 'low' && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/80 text-slate-300 border border-slate-500/70">
              CAT III
            </span>
          )}
          {control.manual && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-900/80 text-yellow-200 border border-yellow-500/70">
              MANUAL
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
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Ubuntu 24.04 LTS</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Local, in-browser</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
             Linux OS Secure Setup
          </h1>
          
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
            Choose critical, medium, and low severity hardening steps and this assistant will build a bash script you can review, test, then run with sudo on Ubuntu 24.04 LTS systems you manage. This is a checklist-style template based on STIG-inspired controls. No data leaves your browser.
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
                Profiles blend severity and compatibility. Relaxed focuses on essential controls. Strict adds FIPS crypto and stricter timeout policies. Custom lets you hand-pick every item.
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
              <strong className="text-slate-300">Relaxed</strong> applies essential CAT I, CAT II, and CAT III controls. <strong className="text-slate-300">Strict</strong> adds FIPS-validated crypto and tighter session policies that may affect compatibility.
            </p>

            {/* Controls List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 mb-6" style={{scrollbarWidth: 'thin', scrollbarColor: 'rgba(148, 163, 184, 0.5) rgba(15, 23, 42, 0.5)'}}>
              {/* Critical Controls */}
              <div>
                <h3 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2 flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-2" />
                  Critical Controls (CAT I)
                </h3>
                <div className="space-y-2">
                  {criticalControls.map(control => (
                    <ControlItem key={control.key} control={control} />
                  ))}
                </div>
              </div>

              {/* Medium Controls */}
              <div>
                <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2 flex items-center">
                  <Info className="w-3 h-3 mr-2" />
                  Medium Priority (CAT II)
                </h3>
                <div className="space-y-2">
                  {mediumControls.map(control => (
                    <ControlItem key={control.key} control={control} />
                  ))}
                </div>
              </div>

              {/* Low Controls */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center">
                  <CheckCircle className="w-3 h-3 mr-2" />
                  Low Priority (CAT III)
                </h3>
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
                Review every line, test on a non-critical machine, then run with sudo privileges. This is a checklist template that documents requirements—you must implement the actual hardening steps.
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
              <p><strong className="text-slate-300">How to use:</strong> Save the script, review thoroughly, then run with sudo privileges on Ubuntu 24.04 LTS.</p>
              <p><strong className="text-slate-300">Important:</strong> This is a checklist template. You must implement actual hardening steps based on these controls.</p>
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
                <li>• Use this only on Ubuntu systems you own or are explicitly allowed to manage.</li>
                <li>• Create a backup or system snapshot before applying changes.</li>
                <li>• Generate the script and review every section, especially Strict profile items.</li>
                <li>• This is a checklist template—you must implement actual hardening commands.</li>
                <li>• Test on a non-critical machine first with sudo privileges.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Good next steps</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Save your script into version control or secure storage.</li>
                <li>• Document which baseline controls you applied and to which machines.</li>
                <li>• Consult Ubuntu 24.04 LTS STIG documentation for implementation details.</li>
                <li>• Revisit this baseline as your environment and risk profile evolve.</li>
                <li>• Coordinate with your security team before rolling out to production.</li>
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
                  This assistant runs entirely in your browser. Your selections and the generated script are not sent to CyberLife Coach, to any server, or to any third party. The output is a checklist template based on STIG-inspired controls and is provided for educational and informational use only. It is not a substitute for professional advice, does not guarantee compliance with any standard, and is used at your own risk. Always test in a safe environment, verify every line, and ensure you have reliable backups before making changes. Do not apply these settings to employer or school managed devices without explicit approval.
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
