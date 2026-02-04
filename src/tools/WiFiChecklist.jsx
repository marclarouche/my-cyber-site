import React, { useState } from 'react';
import { Wifi, ArrowLeft, Printer, ChevronRight, CheckCircle } from 'lucide-react';

export default function WiFiChecklist() {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const expandAll = () => {
    const allSections = ['windows', 'macos', 'linux'];
    const expanded = {};
    allSections.forEach(section => {
      expanded[section] = true;
    });
    setExpandedSections(expanded);
  };

  const collapseAll = () => {
    setExpandedSections({});
  };

  const clearAllCheckboxes = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-3 group">
              <img 
                src="/logo.png" 
                alt="CyberLifeCoach" 
                className="h-10 w-auto transition-all duration-300 group-hover:scale-110 group-hover:brightness-125" 
              />
              <span className="font-bold text-xl transition-all duration-300 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
                CyberLifeCoach
              </span>
            </a>

            {/* Back to Tools Hub */}
            <a href="/tools" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tools Hub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <section className="pt-12 pb-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-4 rounded-2xl border border-cyan-500/30">
              <Wifi className="w-12 h-12 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                Wi-Fi Risk Checklist
              </h1>
              <p className="text-slate-400 text-lg">
                A practical, printable checklist for cafés, hotels, airports, and coworking spaces. Verify networks, use a VPN, and avoid risky logins.
              </p>
            </div>
          </div>

          {/* Action Buttons - Same location as original HTML */}
          <div className="flex flex-wrap gap-3 mb-6 no-print">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg text-white font-semibold transition-all shadow-lg shadow-cyan-500/25"
            >
              <Printer className="w-5 h-5" />
              <span>Print this checklist</span>
            </button>
            <button
              onClick={expandAll}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
            >
              Expand all
            </button>
            <button
              onClick={collapseAll}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
            >
              Collapse all
            </button>
            <button
              onClick={clearAllCheckboxes}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
            >
              Clear all checkboxes
            </button>
          </div>

          {/* Privacy Notice */}
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mb-8">
            <p className="text-cyan-300 text-sm font-semibold">
              This page runs entirely in your browser. No data is sent anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-12 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* Section 1: Pre-trip setup */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">1) Pre-trip setup</h2>
            <div className="space-y-3">
              <CheckboxItem id="update-os-browsers" label="Update your OS and browsers, then reboot." />
              <CheckboxItem id="full-disk-encryption" label="Turn on full-disk encryption, screen lock, and auto-lock timer." />
              <CheckboxItem id="install-test-vpn" label="Install and test your VPN, set 'auto-connect on untrusted Wi-Fi' if available." />
              <CheckboxItem id="password-manager-mfa" label="Use a password manager and multi-factor authentication for key accounts." />
              <CheckboxItem id="disable-unused-sharing" label="Disable or remove unused sharing services, remote access tools, and old VPN profiles." />
              <CheckboxItem id="limited-user-account" label="Create a limited user account for travel if you handle sensitive data." />
              <CheckboxItem id="usb-data-blocker" label="Pack a USB power-only 'data blocker' for public charging and a webcam cover." />
            </div>
          </div>

          {/* Section 2: Choosing a network */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">2) Choosing a network</h2>
            <div className="space-y-3">
              <CheckboxItem id="ask-staff-network" label="Ask staff for the exact network name and whether a captive portal appears." />
              <CheckboxItem id="prefer-wpa2-3" label="Prefer password-protected WPA2/3 networks over open networks." />
              <CheckboxItem id="avoid-lookalike-names" label="Avoid look-alike names, weak signals, and networks that still appear when staff say Wi-Fi is down." />
              <CheckboxItem id="captive-portal-certificate" label="If a captive portal asks to install a certificate or profile, cancel and ask staff." />
            </div>
          </div>

          {/* Section 3: Before you browse */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">3) Before you browse</h2>
            <div className="space-y-3">
              <CheckboxItem id="vpn-before-browse" label="Turn on your VPN before opening websites or apps." />
              <CheckboxItem id="network-type-public" label="Set the network type to Public, not Private or Home." />
              <CheckboxItem id="system-firewall" label="Turn on the system firewall, turn off file sharing and network discovery." />
              <CheckboxItem id="disable-auto-join" label="Disable auto-join or auto-connect for this network." />
              <CheckboxItem id="browser-profile-travel" label="Use a separate browser profile for travel; keep extensions minimal." />
              <CheckboxItem id="prefer-https" label="Prefer HTTPS, and do not click through certificate warnings." />
            </div>
          </div>

          {/* Section 4: Safe behavior while connected */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">4) Safe behavior while connected</h2>
            <div className="space-y-3">
              <CheckboxItem id="avoid-banking-vpn" label="Avoid banking, payroll, admin panels, or cloud consoles unless the VPN is active." />
              <CheckboxItem id="no-reuse-passwords" label="Do not reuse passwords and do not save new passwords on public Wi-Fi." />
              <CheckboxItem id="no-software-public" label="Do not install new software or browser extensions on public networks." />
              <CheckboxItem id="no-download-attachments" label="Avoid downloading attachments or unverified files; scan them at home." />
              <CheckboxItem id="trust-https-sites" label="Trust the padlock icon only on sites you typed yourself or reached from bookmarks." />
              <CheckboxItem id="check-url-spelling" label="Check spelling and domain carefully, especially after clicking email links." />
            </div>
          </div>

          {/* Section 5: Before you disconnect */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">5) Before you disconnect</h2>
            <div className="space-y-3">
              <CheckboxItem id="log-out-all" label="Log out of all sites and apps, clear browser cache if needed." />
              <CheckboxItem id="forget-network" label="Forget the network so your device will not auto-connect again." />
              <CheckboxItem id="turn-off-wifi" label="Turn off Wi-Fi until you reach a known trusted location." />
              <CheckboxItem id="delete-temp-files" label="Delete temporary files or profiles you created for travel, if any." />
            </div>
          </div>

          {/* OS-Specific Sections */}
          {/* Windows */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden">
            <button
              onClick={() => toggleSection('windows')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
            >
              <span className="text-xl font-bold text-cyan-400">Windows (10 / 11) quick steps</span>
              <ChevronRight className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${expandedSections.windows ? 'rotate-90' : ''}`} />
            </button>
            {expandedSections.windows && (
              <div className="px-6 pb-6 space-y-3">
                <CheckboxItem id="win-public-network" label="Set network to Public: Settings, Network & Internet, Wi-Fi, your network, Properties, Public network." />
                <CheckboxItem id="win-defender-firewall" label="Turn on Windows Defender Firewall: Windows Security, Firewall & network protection." />
                <CheckboxItem id="win-disable-discovery" label="Turn off Network discovery and File and printer sharing: Control Panel, Network and Sharing Center, Advanced sharing settings." />
                <CheckboxItem id="win-disable-auto-connect" label="Disable auto-connect: Settings, Network & Internet, Wi-Fi, Manage known networks, select network, turn off Connect automatically." />
                <CheckboxItem id="win-secure-dns" label="Use secure DNS in browser if not on VPN: Edge/Chrome Settings, Privacy and security, Security, Use secure DNS." />
                <CheckboxItem id="win-random-mac" label="Randomize MAC where supported: Settings, Network & Internet, Wi-Fi, Manage known networks, Use random hardware addresses." />
              </div>
            )}
          </div>

          {/* macOS */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden">
            <button
              onClick={() => toggleSection('macos')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
            >
              <span className="text-xl font-bold text-cyan-400">macOS (Monterey or newer) quick steps</span>
              <ChevronRight className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${expandedSections.macos ? 'rotate-90' : ''}`} />
            </button>
            {expandedSections.macos && (
              <div className="px-6 pb-6 space-y-3">
                <CheckboxItem id="macos-firewall" label="Turn on Firewall: System Settings, Privacy & Security, Firewall On." />
                <CheckboxItem id="macos-disable-sharing" label="Disable File Sharing, Screen Sharing, and similar services: System Settings, General, Sharing." />
                <CheckboxItem id="macos-auto-join-off" label="Set Auto-Join Off for the café network: System Settings, Wi-Fi, Details, uncheck Auto-Join." />
                <CheckboxItem id="macos-limit-discovery" label="Limit discovery features: System Settings, General, AirDrop & Handoff, set Receiving to Off when not needed." />
                <CheckboxItem id="macos-vpn-dns" label="Use a VPN, or install a trusted encrypted DNS profile if VPN is unavailable." />
              </div>
            )}
          </div>

          {/* Linux */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden">
            <button
              onClick={() => toggleSection('linux')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
            >
              <span className="text-xl font-bold text-cyan-400">Linux (Ubuntu / Debian / Fedora) quick steps</span>
              <ChevronRight className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${expandedSections.linux ? 'rotate-90' : ''}`} />
            </button>
            {expandedSections.linux && (
              <div className="px-6 pb-6 space-y-3">
                <CheckboxItem id="linux-firewall" label={<>Enable a firewall: Ubuntu/Debian <code className="bg-slate-800 px-2 py-1 rounded text-cyan-400">sudo ufw enable</code>, or Fedora <code className="bg-slate-800 px-2 py-1 rounded text-cyan-400">sudo firewall-cmd --set-default-zone=public</code>.</>} />
                <CheckboxItem id="linux-disable-sharing" label={<>Disable sharing services you do not need: <code className="bg-slate-800 px-2 py-1 rounded text-cyan-400">sudo systemctl disable --now smbd nmbd avahi-daemon</code>.</>} />
                <CheckboxItem id="linux-random-mac" label="Set Wi-Fi to randomized MAC in NetworkManager connection settings." />
                <CheckboxItem id="linux-avoid-auto-connect" label="Avoid auto-connect: edit the connection in NetworkManager, uncheck Connect automatically." />
                <CheckboxItem id="linux-prefer-vpn" label={<>Prefer VPN; alternatively consider encrypted DNS via <code className="bg-slate-800 px-2 py-1 rounded text-cyan-400">/etc/systemd/resolved.conf</code> with <code className="bg-slate-800 px-2 py-1 rounded text-cyan-400">DNSOverTLS=yes</code>.</>} />
              </div>
            )}
          </div>

          {/* Section: Minimal "carry-with" rules */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Minimal "carry-with" rules</h2>
            <div className="space-y-3">
              <CheckboxItem id="verify-ssid" label="Verify the exact SSID with a human." />
              <CheckboxItem id="vpn-on-first" label="VPN on first, browser second." />
              <CheckboxItem id="public-network-firewall" label="Public network profile and firewall on." />
              <CheckboxItem id="no-sensitive-logins" label="No sensitive logins without VPN." />
              <CheckboxItem id="forget-network-minimal" label="Forget the network when done." />
            </div>
          </div>

          {/* Section: Red flags — disconnect now */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-red-700/50 p-6">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Red flags — disconnect now</h2>
            <div className="space-y-3">
              <CheckboxItem id="captive-portal-cert" label="Captive portal demands a device certificate or root certificate." />
              <CheckboxItem id="ssl-warnings" label="Repeated SSL warnings on well-known sites." />
              <CheckboxItem id="network-drops" label="The network drops and reappears with a slightly different name." />
              <CheckboxItem id="unfamiliar-extension" label="Browser shows an unfamiliar extension or default search suddenly changes." />
              <CheckboxItem id="network-offline-visible" label="Staff say the network is offline, yet a similarly named network is visible." />
            </div>
          </div>

          {/* Section: If you think you slipped */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">If you think you slipped</h2>
            <div className="space-y-3">
              <CheckboxItem id="change-passwords" label="Change passwords for any site you used, do it on a trusted network." />
              <CheckboxItem id="revoke-tokens" label="Revoke tokens and sessions in account security pages or your password manager." />
              <CheckboxItem id="mfa-auth" label="Turn on multi-factor authentication if it was off." />
              <CheckboxItem id="watch-alerts" label="Watch statements and security alerts for the next few days." />
            </div>
          </div>

          {/* Section: Optional hardening for frequent travelers */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Optional hardening for frequent travelers</h2>
            <div className="space-y-3">
              <CheckboxItem id="travel-user-account" label="Create a separate local user account just for travel, keep data minimal." />
              <CheckboxItem id="privacy-screen" label="Use a privacy screen and position yourself away from shoulder-surfers." />
              <CheckboxItem id="usb-data-disable" label="Disable USB data on your phone if you use it for tethering." />
              <CheckboxItem id="spare-browser-profile" label="Keep a spare browser profile with zero extensions and strict HTTPS-only mode." />
              <CheckboxItem id="offline-contacts" label="Maintain an offline copy of emergency contacts and recovery codes." />
            </div>
          </div>

        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-cyan-400 mb-3">Legal Disclaimer</h3>
            <p className="text-sm text-slate-500 mb-4">Please read before using the Wi-Fi Risk Checklist.</p>
            <div className="space-y-3 text-sm text-slate-400 leading-relaxed">
              <p>
                This Wi-Fi Risk Checklist is provided for educational purposes only. Menu labels, settings locations, and security features 
                vary by operating system version, device model, manufacturer, and regional configuration. While we strive to provide accurate 
                and up-to-date guidance, you should always verify steps with official documentation for your specific device and OS version.
              </p>
              <p>
                The checklist represents best practices based on common security recommendations, but no checklist can guarantee complete 
                protection against all threats. Network security is complex and constantly evolving. Your security posture depends on many 
                factors beyond this checklist, including the networks you connect to, the services you use, and your overall security practices.
              </p>
              <p>
                CyberLifeCoach and its affiliates make no warranties, expressed or implied, regarding the completeness, accuracy, or 
                applicability of this checklist to your specific situation. You are solely responsible for implementing appropriate security 
                measures for your devices and data. This checklist should be used as one component of a comprehensive security strategy.
              </p>
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
            <p>&copy; {new Date().getFullYear()} CyberLifeCoach Tools</p>
            <p className="text-slate-600">Educational use only. Menus and labels vary by OS version and device model.</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          nav {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// Checkbox Item Component
function CheckboxItem({ id, label }) {
  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
      <input
        type="checkbox"
        id={id}
        className="mt-1 w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
      />
      <label
        htmlFor={id}
        className="text-slate-300 cursor-pointer flex-1 leading-relaxed"
      >
        {label}
      </label>
    </div>
  );
}
