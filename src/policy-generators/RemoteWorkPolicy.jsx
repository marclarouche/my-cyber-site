import React, { useState } from 'react';
import { Lock, Copy, Download, Printer, RotateCcw, ArrowLeft, FileText, Wifi, Shield } from 'lucide-react';

export default function RemoteWorkPolicy() {
  const [formData, setFormData] = useState({
    company: '',
    owner: '',
    appliesTo: '',
    effective: '',
    wifi: 'WPA3',
    guestSsid: 'Required',
    dns: '',
    prohibitedNets: '',
    vpnReq: 'Always On',
    vpnTypes: '',
    split: 'Disabled',
    vpnMfa: 'Required',
    deviceTypes: '',
    fde: 'Required',
    lockTimeout: '',
    patchCadence: '',
    edr: '',
    adminRights: 'Not Permitted',
    classifications: '',
    storage: '',
    sharing: '',
    backups: '',
    workspaceReq: '',
    speakers: 'Prohibited',
    paper: '',
    incidents: '',
    ack: 'Required',
    review: ''
  });

  const [output, setOutput] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePolicy = () => {
    const company = formData.company.trim() || "Acme, Inc.";
    const owner = formData.owner.trim() || "IT Security";
    const applies = formData.appliesTo.trim() || "All employees and contractors";
    const effective = formData.effective || new Date().toLocaleDateString();

    const wifi = formData.wifi || "WPA3";
    const guestSsid = formData.guestSsid || "Required";
    const dns = formData.dns.trim() || "Quad9 or Cloudflare for Teams";
    const prohibitedNets = formData.prohibitedNets.trim() || "Open Wi-Fi without VPN";

    const vpnReq = formData.vpnReq || "Always On";
    const vpnTypes = formData.vpnTypes.trim() || "WireGuard, IKEv2, TLS VPN";
    const split = formData.split || "Disabled";
    const vpnMfa = formData.vpnMfa || "Required";

    const deviceTypes = formData.deviceTypes.trim() || "Company-managed laptops";
    const fde = formData.fde || "Required";
    const lockTimeout = formData.lockTimeout.trim() || "10";
    const patchCadence = formData.patchCadence.trim() || "Critical within 7 days, others within 30 days";
    const edr = formData.edr.trim() || "Microsoft Defender for Business";
    const adminRights = formData.adminRights || "Not Permitted";

    const classes = formData.classifications.trim() || "Public, Internal, Confidential with controls";
    const storage = formData.storage.trim() || "Company OneDrive, SharePoint";
    const sharing = formData.sharing.trim() || "Links with expiry, no personal email or drives";
    const backups = formData.backups.trim() || "Automated daily with versioning";

    const workspaceReq = formData.workspaceReq.trim() || "Private space, privacy screen, clean desk";
    const speakers = formData.speakers || "Prohibited";
    const paper = formData.paper.trim() || "Secure storage and shredding";
    const incidents = formData.incidents.trim() || "security@example.com";

    const ack = formData.ack || "Required";
    const review = formData.review.trim() || "Annual review";

    const text = `
${company} Remote Work Policy
Effective Date: ${effective}
Policy Owner: ${owner}
Scope: ${applies}

1. Purpose
This policy defines minimum requirements for secure remote work so people can access company resources safely and protect company data outside company premises.

2. Roles and Applicability
This policy applies to ${applies}. Managers are responsible for communicating requirements and ensuring compliance. The policy owner ${owner} maintains and updates this document.

3. Network Requirements
3.1 Home and remote networks must use at least ${wifi} security on wireless access points.
3.2 Use of a separate or guest SSID for work devices is ${guestSsid.toLowerCase()}.
3.3 Devices should use secure DNS such as ${dns}.
3.4 The following networks are not permitted: ${prohibitedNets}.
3.5 Public networks may only be used with approved protections as described in the VPN section.

4. VPN Standards
4.1 VPN usage is ${vpnReq.toLowerCase()}.
4.2 Only the following VPN types or products are approved: ${vpnTypes}.
4.3 Split tunneling is ${split.toLowerCase()}.
4.4 Multi-factor authentication for VPN is ${vpnMfa.toLowerCase()}.

5. Device Hardening
5.1 Allowed device types: ${deviceTypes}.
5.2 Full disk encryption is ${fde.toLowerCase()}.
5.3 Screen lock must activate after ${lockTimeout} minutes of inactivity.
5.4 Operating system and application patching cadence: ${patchCadence}.
5.5 Endpoint protection and response: ${edr}.
5.6 Local administrator rights are ${adminRights.toLowerCase()}.

6. Data Handling
6.1 Data classifications permitted offsite: ${classes}.
6.2 Approved storage locations: ${storage}.
6.3 File sharing rules: ${sharing}.
6.4 Backups: ${backups}. Users must not disable backup agents.
6.5 Sensitive data must not be printed unless expressly required and secured as described below.

7. Workspace Security
7.1 Minimum workspace requirements: ${workspaceReq}.
7.2 Smart speakers and always-listening assistants are ${speakers.toLowerCase()} in work areas.
7.3 Physical documents must follow this rule: ${paper}.
7.4 Screens must be positioned to prevent shoulder surfing and protected with privacy filters where appropriate.

8. Acceptable Use
8.1 Personal use must not interfere with security controls.
8.2 Unapproved software, cloud services, and storage are not allowed for company data.
8.3 Data must be accessed only through approved methods and endpoints.

9. Incident Reporting
9.1 Suspected loss, theft, malware, or data exposure must be reported immediately via ${incidents}.
9.2 Users must cooperate with investigation and remediation instructions.

10. Monitoring and Privacy
10.1 Company devices and services may be monitored consistent with law and company policy.
10.2 Users must acknowledge that work activities on company devices are subject to monitoring.

11. Policy Acknowledgment and Review
11.1 Employee acknowledgment is ${ack.toLowerCase()} prior to remote access.
11.2 This policy will be reviewed ${review} and after significant changes in risk, technology, or regulation.

12. Exceptions
12.1 Exceptions require written approval from the policy owner and documented compensating controls.

13. Enforcement
13.1 Violations may result in access restriction and corrective action according to HR and company policy.

Document Control
Owner: ${owner}
Effective Date: ${effective}
Review Cycle: ${review}
    `.trim();

    setOutput(text);
  };

  const resetAll = () => {
    setFormData({
      company: '',
      owner: '',
      appliesTo: '',
      effective: '',
      wifi: 'WPA3',
      guestSsid: 'Required',
      dns: '',
      prohibitedNets: '',
      vpnReq: 'Always On',
      vpnTypes: '',
      split: 'Disabled',
      vpnMfa: 'Required',
      deviceTypes: '',
      fde: 'Required',
      lockTimeout: '',
      patchCadence: '',
      edr: '',
      adminRights: 'Not Permitted',
      classifications: '',
      storage: '',
      sharing: '',
      backups: '',
      workspaceReq: '',
      speakers: 'Prohibited',
      paper: '',
      incidents: '',
      ack: 'Required',
      review: ''
    });
    setOutput('');
  };

  const copyOutput = async () => {
    if (!output) {
      alert("Please generate a policy first.");
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      alert("Copied to clipboard.");
    } catch (e) {
      alert("Copy failed. Please copy manually.");
    }
  };

  const downloadFile = (filename, mimeType) => {
    if (!output) {
      alert("Please generate a policy first.");
      return;
    }

    const blob = new Blob([output], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  };

  const downloadText = () => {
    downloadFile("remote-work-policy.txt", "text/plain");
  };

  const downloadMarkdown = () => {
    downloadFile("remote-work-policy.md", "text/markdown");
  };

  const escapeHtml = (str) => {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return String(str).replace(/[&<>"']/g, m => map[m]);
  };

  const printOutput = () => {
    if (!output) {
      alert("Please generate a policy first.");
      return;
    }

    const win = window.open("", "_blank", "noopener,noreferrer");
    if (!win) {
      alert("Pop-up blocked. Please allow pop-ups to print/save as PDF.");
      return;
    }

    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Remote Work Policy</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #000; }
    h1 { font-size: 18px; margin: 0 0 16px; }
    pre { white-space: pre-wrap; word-wrap: break-word; font-family: "Courier New", monospace; font-size: 12px; line-height: 1.5; }
    @media print { body { margin: 20mm; } }
  </style>
</head>
<body>
  <h1>Remote Work Policy</h1>
  <pre>${escapeHtml(output)}</pre>
  <script>
    window.onload = function() {
      window.focus();
      window.print();
      setTimeout(function(){ window.close(); }, 300);
    };
  <\/script>
</body>
</html>`;

    win.document.open();
    win.document.write(html);
    win.document.close();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
<div className="flex items-center space-x-3 group cursor-pointer">
              <img 
                src="/logo.png" 
                alt="CyberLifeCoach" 
                className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300" 
              />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:brightness-125 transition-all duration-300">
                CyberLifeCoach
              </span>
            </div>
          <button
            onClick={() => window.location.href = '/policy-generators'}
            className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Business Policy Hub</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Wifi className="w-12 h-12 text-cyan-400" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Remote Work Policy Generator
              </h1>
            </div>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Cover network requirements, VPN usage, device hardening, data handling, and workspace security for distributed teams
            </p>
            <p className="text-lg text-cyan-400 font-semibold mt-2">
              A Veteran-Owned Business Committed to Your Digital Security
            </p>
          </div>

          {/* Security Badge */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-4 flex items-center justify-center space-x-3">
            <Lock className="w-6 h-6 text-cyan-400" />
            <span className="text-slate-300">Client-Side Processing - Your data never leaves your browser</span>
          </div>

          {/* Form Section */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            <div className="space-y-6">
              {/* Organization and Scope */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-cyan-400 border-b border-slate-700 pb-2">Organization and Scope</h3>
                
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Company Name:
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Acme, Inc."
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Policy Owner or Department:
                  </label>
                  <input
                    type="text"
                    name="owner"
                    value={formData.owner}
                    onChange={handleInputChange}
                    placeholder="IT Security, GRC, HR"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Applies To:
                  </label>
                  <input
                    type="text"
                    name="appliesTo"
                    value={formData.appliesTo}
                    onChange={handleInputChange}
                    placeholder="Employees, contractors, interns, vendors"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Effective Date:
                  </label>
                  <input
                    type="date"
                    name="effective"
                    value={formData.effective}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                  <p className="text-sm text-slate-500 mt-2">If left blank, today's date will be used.</p>
                </div>
              </div>

              {/* Network Requirements */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-cyan-400 border-b border-slate-700 pb-2 mt-8">Network Requirements</h3>
                
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Minimum Wi-Fi Security:
                  </label>
                  <select
                    name="wifi"
                    value={formData.wifi}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  >
                    <option>WPA3</option>
                    <option>WPA2</option>
                    <option>Enterprise 802.1X</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Guest or Separate SSID Required for Work Devices:
                  </label>
                  <select
                    name="guestSsid"
                    value={formData.guestSsid}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  >
                    <option>Required</option>
                    <option>Recommended</option>
                    <option>Not Required</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    DNS Filtering or Secure Resolver:
                  </label>
                  <input
                    type="text"
                    name="dns"
                    value={formData.dns}
                    onChange={handleInputChange}
                    placeholder="Quad9, Cloudflare for Teams, NextDNS"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Prohibited Networks:
                  </label>
                  <input
                    type="text"
                    name="prohibitedNets"
                    value={formData.prohibitedNets}
                    onChange={handleInputChange}
                    placeholder="Open Wi-Fi without VPN, shared hotspots"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>

              {/* VPN Standards */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-cyan-400 border-b border-slate-700 pb-2 mt-8">VPN Standards</h3>
                
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    VPN Requirement:
                  </label>
                  <select
                    name="vpnReq"
                    value={formData.vpnReq}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  >
                    <option>Always On</option>
                    <option>Required for Sensitive Apps</option>
                    <option>Not Required</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Approved VPN Types:
                  </label>
                  <input
                    type="text"
                    name="vpnTypes"
                    value={formData.vpnTypes}
                    onChange={handleInputChange}
                    placeholder="WireGuard, IKEv2, TLS VPN"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Split Tunneling:
                  </label>
                  <select
                    name="split"
                    value={formData.split}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  >
                    <option>Disabled</option>
                    <option>Allowed with Approval</option>
                    <option>Allowed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    MFA for VPN:
                  </label>
                  <select
                    name="vpnMfa"
                    value={formData.vpnMfa}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  >
                    <option>Required</option>
                    <option>Recommended</option>
                    <option>Not Required</option>
                  </select>
                </div>
              </div>

              {/* Device Hardening */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-cyan-400 border-b border-slate-700 pb-2 mt-8">Device Hardening</h3>
                
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Allowed Device Types:
                  </label>
                  <input
                    type="text"
                    name="deviceTypes"
                    value={formData.deviceTypes}
                    onChange={handleInputChange}
                    placeholder="Company-managed laptops, BYOD with MDM enrollment"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Full Disk Encryption:
                  </label>
                  <select
                    name="fde"
                    value={formData.fde}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  >
                    <option>Required</option>
                    <option>Recommended</option>
                    <option>Not Required</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Screen Lock Timeout (minutes):
                  </label>
                  <input
                    type="number"
                    name="lockTimeout"
                    value={formData.lockTimeout}
                    onChange={handleInputChange}
                    placeholder="10"
                    min="1"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Patching Cadence:
                  </label>
                  <input
                    type="text"
                    name="patchCadence"
                    value={formData.patchCadence}
                    onChange={handleInputChange}
                    placeholder="Critical within 7 days, others within 30 days"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    EDR or Anti-Malware:
                  </label>
                  <input
                    type="text"
                    name="edr"
                    value={formData.edr}
                    onChange={handleInputChange}
                    placeholder="Microsoft Defender for Business, CrowdStrike, Malwarebytes"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Administrator Rights:
                  </label>
                  <select
                    name="adminRights"
                    value={formData.adminRights}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  >
                    <option>Not Permitted</option>
                    <option>Permitted with Just-In-Time Elevation</option>
                    <option>Permitted</option>
                  </select>
                </div>
              </div>

              {/* Data Handling */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-cyan-400 border-b border-slate-700 pb-2 mt-8">Data Handling</h3>
                
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Data Classifications Allowed Offsite:
                  </label>
                  <input
                    type="text"
                    name="classifications"
                    value={formData.classifications}
                    onChange={handleInputChange}
                    placeholder="Public, Internal, Confidential with controls"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Approved Storage Locations:
                  </label>
                  <input
                    type="text"
                    name="storage"
                    value={formData.storage}
                    onChange={handleInputChange}
                    placeholder="Company OneDrive, SharePoint, encrypted containers"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    File Sharing Rules:
                  </label>
                  <input
                    type="text"
                    name="sharing"
                    value={formData.sharing}
                    onChange={handleInputChange}
                    placeholder="Email links with expiry and MFA, no personal clouds"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Backup Expectations:
                  </label>
                  <input
                    type="text"
                    name="backups"
                    value={formData.backups}
                    onChange={handleInputChange}
                    placeholder="Automated endpoint backup daily with 30-day versioning"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>

              {/* Workspace Security */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-cyan-400 border-b border-slate-700 pb-2 mt-8">Workspace Security</h3>
                
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Workspace Requirements:
                  </label>
                  <input
                    type="text"
                    name="workspaceReq"
                    value={formData.workspaceReq}
                    onChange={handleInputChange}
                    placeholder="Private area, lockable room, privacy screen, clean desk"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Use of Smart Speakers:
                  </label>
                  <select
                    name="speakers"
                    value={formData.speakers}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  >
                    <option>Prohibited</option>
                    <option>Allowed for non-work only</option>
                    <option>Allowed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Physical Document Handling:
                  </label>
                  <input
                    type="text"
                    name="paper"
                    value={formData.paper}
                    onChange={handleInputChange}
                    placeholder="Secure storage, cross-cut shredding, no photos of screens"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Incident Reporting Channel:
                  </label>
                  <input
                    type="text"
                    name="incidents"
                    value={formData.incidents}
                    onChange={handleInputChange}
                    placeholder="security@example.com, hotline, ticket system"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>

              {/* Acknowledgment */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-cyan-400 border-b border-slate-700 pb-2 mt-8">Acknowledgment</h3>
                
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Employee Acknowledgment Required:
                  </label>
                  <select
                    name="ack"
                    value={formData.ack}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  >
                    <option>Required</option>
                    <option>Recommended</option>
                    <option>Not Required</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Review Frequency:
                  </label>
                  <input
                    type="text"
                    name="review"
                    value={formData.review}
                    onChange={handleInputChange}
                    placeholder="Annual review or after major change"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={generatePolicy}
                className="flex-1 min-w-[200px] bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <FileText className="w-5 h-5" />
                <span>Generate Policy</span>
              </button>
              <button
                onClick={resetAll}
                className="flex-1 min-w-[200px] bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">Generated Remote Work Policy:</h3>
            <textarea
              value={output}
              readOnly
              placeholder="Your generated policy will appear here."
              rows="20"
              className="w-full bg-slate-950 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-100 font-mono text-sm resize-none"
            />

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-4 mt-6">
              <button
                onClick={copyOutput}
                className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <Copy className="w-5 h-5" />
                <span>Copy</span>
              </button>
              <button
                onClick={downloadText}
                className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                <span>Download TXT</span>
              </button>
              <button
                onClick={downloadMarkdown}
                className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                <span>Download Markdown</span>
              </button>
              <button
                onClick={printOutput}
                className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <Printer className="w-5 h-5" />
                <span>Print/Save as PDF</span>
              </button>
            </div>

            <p className="text-sm text-slate-500 mt-4">Tip: Print/Save as PDF uses your browser print dialog. Choose Save as PDF.</p>
          </div>

          {/* Legal Disclaimer */}
          <div className="mt-8 bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer:</strong> This tool is provided for informational purposes only and does not constitute legal or cybersecurity advice. The generated Remote Work Policy template is a starting point and may not meet all organizational, compliance, or jurisdiction-specific requirements. Consult qualified security and legal professionals before adopting or implementing the generated policy. Use of this tool does not create an attorney client relationship. No warranties are made regarding completeness, accuracy, or suitability for a particular purpose.
            </p>
          </div>
        </div>
      </div>

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
