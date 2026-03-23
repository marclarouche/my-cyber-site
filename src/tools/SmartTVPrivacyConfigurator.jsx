import React, { useState } from 'react';
import { ArrowLeft, Tv, ChevronRight, ChevronDown, ChevronUp, Shield, AlertTriangle, CheckCircle, XCircle, Info, Download, RotateCcw, Eye, Mic, Wifi, Database, Radio, Globe, Lock } from 'lucide-react';

const TV_BRANDS = [
  { id: 'samsung', label: 'Samsung (Tizen)' },
  { id: 'lg', label: 'LG (webOS)' },
  { id: 'sony', label: 'Sony (Google TV / Android TV)' },
  { id: 'vizio', label: 'Vizio (SmartCast)' },
  { id: 'tcl', label: 'TCL (Google TV / Roku TV)' },
  { id: 'hisense', label: 'Hisense (VIDAA / Google TV)' },
  { id: 'roku', label: 'Roku TV' },
  { id: 'amazon', label: 'Amazon Fire TV' },
  { id: 'philips', label: 'Philips (Android TV)' },
  { id: 'other', label: 'Other / Generic Android TV' },
];

const RISK_CATEGORIES = [
  {
    id: 'acr',
    icon: <Eye className="w-5 h-5" />,
    label: 'ACR — Automatic Content Recognition',
    shortLabel: 'ACR Tracking',
    riskLevel: 'critical',
    description: 'ACR silently captures frames of everything you watch — cable, streaming, gaming, even external devices — and sells viewing data to advertisers. This is the #1 privacy threat on smart TVs.',
    steps: {
      samsung: [
        'Open Settings → Support → Terms & Privacy',
        'Select "Viewing Information Services" and toggle OFF',
        'Then go to Settings → General & Privacy → Privacy Choices',
        'Disable "Internet-based Advertising" and "Viewing Information Services"',
        'Navigate to Settings → Support → Terms & Privacy → Samsung Privacy Notice → toggle all OFF',
      ],
      lg: [
        'Press the Gear/Settings button on remote',
        'Go to General → About This TV → User Agreements',
        'Disable "Live Plus" (this is LG\'s ACR service)',
        'Also disable "Viewing Information" under User Agreements',
        'Go back to General → Additional Settings → Home Settings → Disable "Home Dashboard" data sharing',
      ],
      sony: [
        'Go to Settings → Device Preferences → Sony Bravia Privacy',
        'Select "Samba Interactive TV" or "Interactive TV" — toggle OFF',
        'Go to Settings → Apps → See all Apps → Samba TV → Disable or restrict permissions',
        'Open Settings → Device Preferences → Usage & Diagnostics → toggle OFF',
        'Under Google TV: Settings → Privacy → Usage & Diagnostics → OFF',
      ],
      vizio: [
        'Press Menu on remote → System → Reset & Admin',
        'Select "Viewing Data" and toggle OFF',
        'Go to Menu → System → Privacy Policy → Disable "ACR" / "Smart Interactivity"',
        'Also disable under Menu → System → Terms & Privacy → toggle all sharing OFF',
      ],
      tcl: [
        'For Roku TV: Home → Settings → Privacy → Smart TV Experience → uncheck "Use Info from TV Inputs"',
        'For Google TV: Settings → Privacy → Ads → opt out of Ads Personalization',
        'Also: Settings → Device Preferences → Usage & Diagnostics → OFF',
        'Go to Settings → Privacy → Financial Info → toggle OFF all sharing',
      ],
      hisense: [
        'Go to Settings → General → About → User Agreements',
        'Disable "Personalized Advertising" and "Data Sharing"',
        'For VIDAA: Settings → System → Privacy → toggle all OFF',
        'For Google TV variant: Settings → Privacy → Usage & Diagnostics → OFF',
      ],
      roku: [
        'Home → Settings → Privacy → Smart TV Experience',
        'Uncheck "Use Info from TV Inputs" — this is Roku\'s ACR toggle',
        'Go to Settings → Privacy → Advertising → check "Limit Ad Tracking"',
        'Also: Settings → Privacy → Microphone → Disable if not using voice features',
      ],
      amazon: [
        'Go to Settings → Preferences → Privacy Settings',
        'Disable "Collect App and Over-The-Air Usage Data"',
        'Also disable "Interest-based Ads"',
        'Navigate to Settings → Preferences → Privacy Settings → Device Usage Data → OFF',
      ],
      philips: [
        'Press Home → Settings → TV Settings → Privacy Settings',
        'Disable "Viewing Data Sharing" or "ACR" toggle',
        'Go to Settings → Android TV Settings → Device Preferences → Usage & Diagnostics → OFF',
        'Also: Settings → Google Settings → Ads → Opt out of Ads Personalization',
      ],
      other: [
        'Go to Settings → Privacy or Device Preferences → Usage & Diagnostics → OFF',
        'Look for "Viewing Data", "Smart TV Experience", or "ACR" — disable all',
        'Check Settings → Google Settings (if Android) → Ads → Opt out of personalization',
        'Review any "User Agreements" or "Terms & Privacy" menus and disable all optional data sharing',
      ],
    },
  },
  {
    id: 'voice',
    icon: <Mic className="w-5 h-5" />,
    label: 'Voice Assistant & Microphone Access',
    shortLabel: 'Voice / Mic',
    riskLevel: 'high',
    description: 'Built-in voice assistants (Alexa, Google Assistant, Bixby, ThinQ AI) keep microphones active for wake words. This creates a live audio capture risk in your living room.',
    steps: {
      samsung: [
        'Go to Settings → General & Privacy → Voice → Voice Wake-up → toggle OFF',
        'Disable Bixby: Settings → General & Privacy → Bixby Settings → Voice Wake-up OFF',
        'Navigate to Settings → Support → Terms & Privacy → Voice Recognition Services → toggle OFF',
      ],
      lg: [
        'Go to Settings → General → AI Service → Voice Recognition → toggle OFF',
        'Disable ThinQ AI: Settings → General → AI Service → AI Sound Pro → OFF',
        'Also disable: Settings → General → SIMPLINK settings → wake-on-voice features OFF',
      ],
      sony: [
        'Go to Settings → Device Preferences → Google Assistant → toggle OFF if not needed',
        'Settings → Apps → Permissions → Microphone → revoke for all non-essential apps',
        'If using Google TV: Settings → Privacy → Microphone → manage app permissions',
      ],
      vizio: [
        'Go to Menu → System → Voice Services → disable all or limit to manual activation only',
        'If using AirPlay/Chromecast: disable in Settings → Extras → Chromecast Built-in',
      ],
      tcl: [
        'For Roku: Settings → Privacy → Microphone → limit permissions per-app',
        'Disable Voice Search wake-word if not actively used: Settings → Remote & Devices',
        'For Google TV: Settings → Privacy → Microphone → revoke from unused apps',
      ],
      hisense: [
        'Go to Settings → General → Microphone or Voice Services → disable wake-word detection',
        'Review app microphone permissions: Settings → Apps → Permissions → Microphone',
      ],
      roku: [
        'Settings → Privacy → Microphone → set to "Disabled" or manage per-channel',
        'Go to Settings → Remote & Devices → Voice Remote → configure or disable',
      ],
      amazon: [
        'Go to Settings → Alexa → Alexa Privacy → Manage Your Alexa Data',
        'Disable wake word if not needed: Settings → Alexa → Wake Word → OFF',
        'Review: Settings → Alexa → Alexa Privacy → Review Voice History',
      ],
      philips: [
        'Settings → Android TV Settings → Apps → Permissions → Microphone → revoke non-essential',
        'If Google Assistant enabled: Settings → Google Settings → disable always-on listening',
      ],
      other: [
        'Navigate to Settings → Apps → Permissions → Microphone — revoke all non-essential apps',
        'Find and disable any "Voice Wake-up" or "Always-On" voice detection features',
        'For Google Assistant variants: Settings → Google Settings → disable "OK Google" detection on TV',
      ],
    },
  },
  {
    id: 'ads',
    icon: <Database className="w-5 h-5" />,
    label: 'Advertising ID & Personalization',
    shortLabel: 'Ad Tracking',
    riskLevel: 'high',
    description: 'Every smart TV assigns you an advertising identifier used to build a behavioral profile. This ID connects your TV viewing to your mobile devices, shopping behavior, and web browsing.',
    steps: {
      samsung: [
        'Go to Settings → General & Privacy → Privacy Choices',
        'Select "Internet-based Advertising" → toggle OFF',
        'Also: Settings → General & Privacy → Privacy Choices → "Reset Advertising ID"',
        'Disable cross-device tracking: Settings → General & Privacy → Privacy Choices → Device Linking → OFF',
      ],
      lg: [
        'Press Settings → General → About This TV → User Agreements',
        'Disable "Personalized Advertising"',
        'Go to Settings → General → Additional Settings → Home Settings → disable ad personalization',
      ],
      sony: [
        'Settings → Device Preferences → Ads → Reset Advertising ID',
        'Check "Opt out of Ads Personalization" checkbox',
        'For Google TV: Settings → Privacy → Ads → Delete Advertising ID (most private option)',
      ],
      vizio: [
        'Menu → System → Reset & Admin → Viewing Data → OFF',
        'Menu → System → Terms & Privacy → disable "Personalized Advertising"',
      ],
      tcl: [
        'Roku: Settings → Privacy → Advertising → Limit Ad Tracking → ON',
        'Roku: Settings → Privacy → Advertising → Reset Advertising Identifier',
        'Google TV: Settings → Privacy → Ads → Delete Advertising ID',
      ],
      hisense: [
        'Settings → General → About → User Agreements → disable "Personalized Advertising"',
        'For VIDAA: Settings → System → Privacy → Advertising → Limit Ad Tracking',
      ],
      roku: [
        'Settings → Privacy → Advertising → check "Limit Ad Tracking"',
        'Also: Settings → Privacy → Advertising → Reset Advertising Identifier (do this periodically)',
      ],
      amazon: [
        'Settings → Preferences → Privacy Settings → Interest-based Ads → OFF',
        'Settings → Preferences → Privacy Settings → Collect App and Over-The-Air Usage Data → OFF',
      ],
      philips: [
        'Settings → Android TV Settings → Google Settings → Ads → Opt out of Ads Personalization',
        'Also: Settings → Android TV Settings → Google Settings → Ads → Reset Advertising ID',
      ],
      other: [
        'Look under Settings → Privacy or Google Settings → Ads → "Opt out of personalization" or "Limit Ad Tracking"',
        'Reset your Advertising ID if the option exists — this creates a fresh identifier',
        'For Android TV: Settings → Device Preferences → Google Settings → Ads',
      ],
    },
  },
  {
    id: 'network',
    icon: <Wifi className="w-5 h-5" />,
    label: 'Network & Smart Features Exposure',
    shortLabel: 'Network Exposure',
    riskLevel: 'medium',
    description: 'Smart TVs run constant background network connections — for app updates, ad servers, analytics pings, and content recommendations. Limiting unnecessary connectivity reduces your attack surface.',
    steps: {
      samsung: [
        'Disable HbbTV (Hybrid Broadcast Broadband TV): Settings → Broadcasting → Expert Settings → HbbTV Settings → OFF',
        'Turn off automatic software updates during off-hours: Settings → Support → Software Update → Auto Update → OFF (manually check for updates monthly)',
        'Disable Samsung Smart TV Background Data: Settings → Network → Expert Settings → turn off IP Remote',
      ],
      lg: [
        'Go to Settings → Connection → Wi-Fi → uncheck automatic network connect if not needed',
        'Disable HbbTV: Settings → General → System → Additional Settings → Data Broadcast → OFF',
        'Turn off Magic Remote pointer data: Settings → General → Additional Settings → Pointer Options',
      ],
      sony: [
        'Go to Settings → Network → Remote Start → toggle OFF (prevents wake-on-LAN attacks)',
        'Settings → Device Preferences → About → System update → set to manual',
        'Disable "Control remotely": Settings → Network → IP Control → OFF',
      ],
      vizio: [
        'Menu → Network → disable "Auto Power On" if present',
        'Limit background app refresh: close unused apps from the home screen',
        'Consider VLAN isolation on your router — put TV on separate network segment',
      ],
      tcl: [
        'Review app permissions: Settings → System → Advanced System Settings → App Permissions',
        'Disable auto-launch features and background app activity where available',
        'Put TV on IoT VLAN via your router for network-level isolation',
      ],
      hisense: [
        'Settings → General → Network → disable any "TV Everywhere" or remote access features',
        'Disable auto update: Settings → System → About → System Update → manual only',
      ],
      roku: [
        'Settings → System → Power → Fast TV Start → OFF (reduces persistent network activity)',
        'Settings → System → Advanced System Settings → External Control → Disable',
      ],
      amazon: [
        'Settings → Preferences → Notification Settings → disable all unless critical',
        'Consider keeping Alexa features minimal to reduce persistent connection activity',
      ],
      philips: [
        'Settings → Android TV Settings → Connectivity → reduce background sync',
        'Settings → Network → Remote Start → OFF',
        'Manually update when needed rather than automatic background updates',
      ],
      other: [
        'Disable remote access / IP Control features in Network Settings',
        'Turn off "Fast Start" or "Quick Boot" features that keep network active while TV appears off',
        'Review your router settings — place your TV on a dedicated IoT VLAN if possible',
        'Manually manage updates rather than allowing automatic background downloads',
      ],
    },
  },
  {
    id: 'apps',
    icon: <Globe className="w-5 h-5" />,
    label: 'Third-Party App Permissions',
    shortLabel: 'App Permissions',
    riskLevel: 'medium',
    description: 'Pre-installed and downloaded apps often request excessive permissions — location, microphone, storage, and device ID. Auditing and restricting these significantly reduces your data exposure.',
    steps: {
      samsung: [
        'Go to Settings → General & Privacy → App Settings',
        'Review each app → Permissions → revoke Location, Microphone, Camera for any app that doesn\'t strictly need it',
        'Uninstall or disable unused pre-installed apps: Settings → Support → Device Care → Storage → Apps',
      ],
      lg: [
        'Settings → General → System → Safety → Application Lock → lock apps that shouldn\'t be accessing data',
        'Review: Settings → General → About This TV → User Agreements → App Agreement individually',
        'Delete unused apps from LG Content Store to reduce attack surface',
      ],
      sony: [
        'Settings → Apps → See all apps → review each → Permissions → revoke unnecessary access',
        'Force-stop unused apps: Settings → Apps → [App Name] → Force Stop',
        'Disable apps you cannot uninstall: Settings → Apps → [App Name] → Disable',
      ],
      vizio: [
        'Review connected apps in Menu → SmartCast Apps',
        'Remove any apps you haven\'t used in 30+ days',
        'Revoke permissions via Settings → Apps → individual app → Permissions where available',
      ],
      tcl: [
        'Roku: Go to each app channel → press * on remote → Remove Channel for any unused app',
        'Google TV: Settings → Apps → See all apps → review permissions → revoke unnecessary',
      ],
      hisense: [
        'Settings → Apps → Installed Apps → review each → Permissions → restrict as needed',
        'Remove unused pre-installed apps to reduce background data collection',
      ],
      roku: [
        'Press * (asterisk) on any channel → Remove Channel to delete unused apps',
        'Settings → Privacy → Channels → review what data each channel accesses',
        'Only install channels from official Roku Channel Store',
      ],
      amazon: [
        'Settings → Applications → Manage Installed Applications → review each → Permissions',
        'Turn on: Settings → Security & Privacy → Apps from Unknown Sources → OFF (verify this is disabled)',
        'Remove unused apps: long-press on app tile → Remove from Library',
      ],
      philips: [
        'Settings → Android TV Settings → Apps → See all apps → review permissions → revoke unnecessary',
        'Disable pre-installed apps you don\'t use: Settings → Apps → [App Name] → Disable',
        'Ensure Settings → Security → Unknown Sources is OFF',
      ],
      other: [
        'Navigate to Settings → Apps → review each installed app\'s permissions',
        'Revoke Location, Microphone, and Storage permissions from any app that doesn\'t clearly need them',
        'Uninstall or disable all pre-installed apps you never use',
        'Never install apps from unknown or unofficial sources',
      ],
    },
  },
  {
    id: 'physical',
    icon: <Lock className="w-5 h-5" />,
    label: 'Physical & Router-Level Hardening',
    shortLabel: 'Physical / Router',
    riskLevel: 'low',
    description: 'Network-level isolation provides the strongest protection because it works regardless of in-TV settings (which can reset after firmware updates). These are set-it-and-forget-it improvements.',
    steps: {
      samsung: [
        'On your router: create an IoT VLAN or guest network — move your Samsung TV to it',
        'Block your TV\'s MAC address from reaching your main LAN devices (prevent lateral movement)',
        'Use DNS-level blocking (Pi-hole, NextDNS, or your router\'s ad-blocking DNS) to block Samsung analytics endpoints: samsungaos.com, samsungelectronics.com tracking domains',
        'Physically cover your TV\'s built-in camera if it has one (check model specs)',
        'Use a smart plug on a schedule if you want to cut power to the TV entirely when sleeping',
      ],
      lg: [
        'Move LG TV to IoT VLAN on your router — isolate from computers and phones',
        'Use DNS blocking to filter: lgtvsdp.com, lgsmarttv.club, lgappstv.com analytics domains',
        'Check if your LG TV model has a camera — physically cover if present',
        'Consider a smart plug timer to cut power when TV is not in use for extended periods',
      ],
      sony: [
        'Place on IoT/guest VLAN — block access to your main LAN subnet',
        'Block via router DNS: xperia-ads.sonymobile.com, pubads.g.doubleclick.net (Google Ads)',
        'Physical camera check: some Sony models have pop-up cameras — cover when not in use',
      ],
      vizio: [
        'Vizio has had multiple FTC actions for data collection — strong VLAN isolation is especially recommended',
        'Use NextDNS or Pi-hole to block Vizio\'s data collection endpoints',
        'Router-level blocking: viziotv.com analytics subdomains',
      ],
      tcl: [
        'IoT VLAN isolation strongly recommended for TCL/Roku devices',
        'Block: roku.com analytics subdomains, Samba TV endpoints via DNS',
        'Check router firewall logs to see what domains your TCL TV contacts',
      ],
      hisense: [
        'Move to IoT VLAN — Hisense VIDAA sends data to servers that can be DNS-blocked',
        'Consider using a travel router with OpenWRT between your TV and main router for granular control',
      ],
      roku: [
        'Roku actively resists VPN usage and has broad data sharing agreements',
        'Move to IoT VLAN: Settings → Network → check assigned IP → block on router from reaching LAN',
        'Block Samba TV endpoints at DNS level: sambanetwork.com, analytics.roku.com',
      ],
      amazon: [
        'Fire TV sends significant data to Amazon\'s analytics infrastructure — VLAN isolation is important',
        'Use Pi-hole to block: device-metrics-us.amazon.com, fls-na.amazon.com',
        'Physically check Fire TV Stick placement — ensure microphone direction is not near private conversations',
      ],
      philips: [
        'Move to IoT VLAN — Android TV base means broad Google telemetry applies',
        'Block at DNS level: google-analytics.com, googleadservices.com for this device',
        'Check if Philips model has built-in camera — cover if present',
      ],
      other: [
        'Most important step: put your TV on a dedicated IoT VLAN or guest Wi-Fi network',
        'Set up DNS-level blocking (Pi-hole, NextDNS free tier) to filter analytics and ad server traffic',
        'Check if your TV model has a built-in camera — cover with opaque tape or sticker when not in video calling',
        'Review your router\'s traffic logs to identify what domains your TV contacts regularly',
        'Consider a smart plug schedule to completely cut power when TV is unused for extended periods',
      ],
    },
  },
];

const RISK_COLORS = {
  critical: { bg: 'bg-red-900/30', border: 'border-red-500/40', badge: 'bg-red-500/20 text-red-300 border-red-500/40', dot: 'bg-red-500', label: 'Critical Risk' },
  high: { bg: 'bg-orange-900/20', border: 'border-orange-500/40', badge: 'bg-orange-500/20 text-orange-300 border-orange-500/40', dot: 'bg-orange-500', label: 'High Risk' },
  medium: { bg: 'bg-yellow-900/20', border: 'border-yellow-500/40', badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40', dot: 'bg-yellow-500', label: 'Medium Risk' },
  low: { bg: 'bg-blue-900/20', border: 'border-blue-500/40', badge: 'bg-blue-500/20 text-blue-300 border-blue-500/40', dot: 'bg-blue-500', label: 'Best Practice' },
};

export default function SmartTVPrivacyConfigurator() {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [completed, setCompleted] = useState({});
  const [showResults, setShowResults] = useState(false);

  const toggleStep = (categoryId, stepIndex) => {
    const key = `${categoryId}-${stepIndex}`;
    setCompleted(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isCategoryComplete = (categoryId, brandId) => {
    const cat = RISK_CATEGORIES.find(c => c.id === categoryId);
    if (!cat || !brandId) return false;
    const steps = cat.steps[brandId] || cat.steps['other'];
    return steps.every((_, i) => completed[`${categoryId}-${i}`]);
  };

  const completedCount = RISK_CATEGORIES.filter(c => isCategoryComplete(c.id, selectedBrand)).length;
  const totalCount = RISK_CATEGORIES.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const getScoreLabel = () => {
    if (progressPct === 100) return { label: 'Fully Hardened', color: 'text-green-400' };
    if (progressPct >= 66) return { label: 'Mostly Secured', color: 'text-cyan-400' };
    if (progressPct >= 33) return { label: 'Partially Configured', color: 'text-yellow-400' };
    return { label: 'Needs Attention', color: 'text-red-400' };
  };

  const handleReset = () => {
    setCompleted({});
    setExpandedCategory(null);
    setShowResults(false);
  };

  const generateTextReport = () => {
    const brand = TV_BRANDS.find(b => b.id === selectedBrand)?.label || 'Unknown TV';
    const lines = [
      'SMART TV PRIVACY CONFIGURATION REPORT',
      `Generated: ${new Date().toLocaleDateString()}`,
      `TV Brand / Platform: ${brand}`,
      `Configuration Score: ${progressPct}% (${completedCount}/${totalCount} categories complete)`,
      '─'.repeat(50),
      '',
    ];
    RISK_CATEGORIES.forEach(cat => {
      const steps = cat.steps[selectedBrand] || cat.steps['other'];
      const done = steps.filter((_, i) => completed[`${cat.id}-${i}`]).length;
      lines.push(`[${isCategoryComplete(cat.id, selectedBrand) ? '✓' : ' '}] ${cat.shortLabel} — ${done}/${steps.length} steps completed`);
      steps.forEach((step, i) => {
        lines.push(`  ${completed[`${cat.id}-${i}`] ? '[x]' : '[ ]'} ${step}`);
      });
      lines.push('');
    });
    lines.push('Generated by CyberLifeCoach.pro — Smart TV Privacy Configurator');
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SmartTV_Privacy_Config_${selectedBrand}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const scoreInfo = getScoreLabel();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center space-x-3 group cursor-pointer">
              <img
                src="/logo.png"
                alt="CyberLifeCoach"
                className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:brightness-125 transition-all duration-300">
                CyberLifeCoach
              </span>
            </a>
            <a href="/tools" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tools Hub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-8 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute top-10 right-20 w-48 h-48 bg-blue-600 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
                  Privacy Tool
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  Step-by-Step Guide
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  Client-Side
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Smart TV Privacy Configurator
              </h1>
              <p className="text-slate-400 text-sm max-w-2xl">
                Your smart TV is watching you back. Select your brand and follow the step-by-step guide to disable ACR tracking, silence your microphone, limit ad profiling, and lock down your network exposure.
              </p>
            </div>

            {selectedBrand && (
              <div className="hidden md:flex flex-col items-center ml-8 bg-slate-900/80 border border-slate-700 rounded-2xl p-5 min-w-[140px]">
                <div className="text-3xl font-bold text-cyan-400">{progressPct}%</div>
                <div className={`text-xs font-semibold mt-1 ${scoreInfo.color}`}>{scoreInfo.label}</div>
                <div className="w-full bg-slate-800 rounded-full h-2 mt-3">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  ></div>
                </div>
                <div className="text-xs text-slate-500 mt-2">{completedCount} / {totalCount} categories</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Brand Selector */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-2">
                <Tv className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-100">Step 1: Select Your TV Brand</h2>
                <p className="text-xs text-slate-400 mt-0.5">Settings menus vary significantly between manufacturers</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {TV_BRANDS.map(brand => (
                <button
                  key={brand.id}
                  onClick={() => {
                    setSelectedBrand(brand.id);
                    setCompleted({});
                    setExpandedCategory(null);
                    setShowResults(false);
                  }}
                  className={`px-3 py-3 rounded-xl text-xs font-semibold border transition-all duration-200 text-center leading-tight ${
                    selectedBrand === brand.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500 text-cyan-300'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                  }`}
                >
                  {brand.label}
                </button>
              ))}
            </div>
          </div>

          {/* Info Banner */}
          {!selectedBrand && (
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-5 flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-300">
                Select your TV brand above to see brand-specific privacy settings. Each manufacturer hides these controls in different menus — this tool surfaces the exact steps so you don't have to hunt.
              </p>
            </div>
          )}

          {/* ACR Warning Banner */}
          {selectedBrand && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-5 flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-300 mb-1">Start with ACR — it's the most important step</p>
                <p className="text-sm text-red-300/80">
                  Automatic Content Recognition (ACR) technology captures frames of everything on your screen — including content from external devices like cable boxes, gaming consoles, and Blu-ray players. It runs by default on most smart TVs and sends your viewing data to data brokers. Disabling it is the single highest-impact privacy action you can take.
                </p>
              </div>
            </div>
          )}

          {/* Category Checklist */}
          {selectedBrand && RISK_CATEGORIES.map((cat) => {
            const steps = cat.steps[selectedBrand] || cat.steps['other'];
            const colors = RISK_COLORS[cat.riskLevel];
            const isExpanded = expandedCategory === cat.id;
            const doneCount = steps.filter((_, i) => completed[`${cat.id}-${i}`]).length;
            const allDone = doneCount === steps.length;

            return (
              <div
                key={cat.id}
                className={`rounded-2xl border transition-all duration-300 ${colors.bg} ${colors.border}`}
              >
                {/* Category Header */}
                <button
                  onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`rounded-lg p-2 border ${colors.badge}`}>
                      {cat.icon}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-bold text-slate-100 text-sm md:text-base">{cat.label}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${colors.badge}`}>
                          {colors.label}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          {steps.map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full transition-all ${completed[`${cat.id}-${i}`] ? 'bg-cyan-400' : 'bg-slate-700'}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-slate-400">{doneCount}/{steps.length} steps</span>
                        {allDone && (
                          <span className="flex items-center space-x-1 text-xs text-green-400 font-semibold">
                            <CheckCircle className="w-3 h-3" />
                            <span>Complete</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {/* Expanded Steps */}
                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-slate-700/50">
                    <p className="text-sm text-slate-400 mt-4 mb-5 leading-relaxed">{cat.description}</p>
                    <div className="space-y-3">
                      {steps.map((step, i) => {
                        const key = `${cat.id}-${i}`;
                        const isDone = completed[key];
                        return (
                          <div
                            key={i}
                            onClick={() => toggleStep(cat.id, i)}
                            className={`flex items-start space-x-3 p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                              isDone
                                ? 'bg-cyan-900/20 border-cyan-500/30'
                                : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                            }`}
                          >
                            <div className="flex-shrink-0 mt-0.5">
                              {isDone ? (
                                <CheckCircle className="w-5 h-5 text-cyan-400" />
                              ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-slate-600" />
                              )}
                            </div>
                            <p className={`text-sm leading-relaxed transition-colors ${isDone ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                              {step}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Progress Summary & Actions */}
          {selectedBrand && (
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
              <h3 className="text-lg font-bold text-slate-100 mb-5 flex items-center space-x-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                <span>Configuration Summary</span>
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {RISK_CATEGORIES.map(cat => {
                  const done = isCategoryComplete(cat.id, selectedBrand);
                  return (
                    <div key={cat.id} className={`flex items-center space-x-2 p-3 rounded-lg border ${done ? 'bg-cyan-900/20 border-cyan-500/30' : 'bg-slate-800/40 border-slate-700'}`}>
                      {done ? <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" /> : <XCircle className="w-4 h-4 text-slate-600 flex-shrink-0" />}
                      <span className={`text-xs font-semibold ${done ? 'text-cyan-300' : 'text-slate-500'}`}>{cat.shortLabel}</span>
                    </div>
                  );
                })}
              </div>

              {/* Score bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Overall Privacy Score</span>
                  <span className={`font-bold ${scoreInfo.color}`}>{progressPct}% — {scoreInfo.label}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-700"
                    style={{ width: `${progressPct}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={generateTextReport}
                  className="flex items-center justify-center space-x-2 flex-1 px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-cyan-500/25"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Configuration Report</span>
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center space-x-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl font-semibold text-sm text-slate-300 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          )}

          {/* Pro Tips */}
          {selectedBrand && (
            <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-6">
              <h4 className="text-sm font-bold text-cyan-400 mb-3 flex items-center space-x-2">
                <Info className="w-4 h-4" />
                <span>Important Notes</span>
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-start space-x-2">
                  <span className="text-cyan-500 flex-shrink-0 mt-0.5">→</span>
                  <span>Firmware updates can silently re-enable some of these settings. Check your privacy settings after every major TV software update.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-cyan-500 flex-shrink-0 mt-0.5">→</span>
                  <span>Menu paths may differ slightly between TV model years. If a path doesn't match, search your TV's Settings for the keywords listed in each step.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-cyan-500 flex-shrink-0 mt-0.5">→</span>
                  <span>Router-level isolation (VLAN) is the strongest protection — it prevents data collection regardless of in-TV settings.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-cyan-500 flex-shrink-0 mt-0.5">→</span>
                  <span>Consider a streaming stick (Apple TV, Nvidia Shield) on a non-smart TV as the most privacy-preserving alternative to a smart TV platform.</span>
                </li>
              </ul>
            </div>
          )}

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer:</strong> This tool provides general privacy guidance based on publicly documented TV settings. Menu paths may vary by model and firmware version. CyberLifeCoach assumes no liability for outcomes from following these recommendations. For enterprise or business environments, consult a qualified security professional. All processing happens in your browser — no data leaves this page.
            </p>
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
            <p>&copy; {new Date().getFullYear()} CyberLifeCoach</p>
            <p className="text-slate-600">All processing happens entirely in your browser. No data is sent anywhere.</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
