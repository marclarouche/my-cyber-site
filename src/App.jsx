import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Writing from './pages/Writing';
import MissionControl from './pages/MissionControl';
import AdminSetup from './pages/AdminSetup';
import CloudflareSetup from './pages/CloudflareSetup';
import SocialAutomation from './pages/SocialAutomation';
<Route path="/clc-ops/social-automation" element={<SocialAutomation />} />
import IndividualConsultation from './consultations/IndividualConsultation';
import PersonalAssessmentPreview from './consultations/PersonalAssessmentPreview';
import BusinessAssessmentPreview from './consultations/BusinessAssessmentPreview';
import SmallBusinessConsultation from './consultations/SmallBusinessConsultation';
import StorageSetupIntake from './consultations/StorageSetupIntake';
import PrivacyStorageConsultation from './consultations/PrivacyStorageConsultation';
import PrivacyScoreCalculator from './PrivacyScoreCalculator';

import TOSGate from './TOSGate';

{/* Put nested Business Policy hub routes BEFORE the parent Business Policy hub route */}
import AcceptableUsePolicy from './policy-generators/AcceptableUsePolicy';
import AboutAcceptableUsePolicy from './policy-generators/AboutAcceptableUsePolicy';
import AccessControlPolicy from './policy-generators/AccessControlPolicy';
import AboutAccessControlPolicy from './policy-generators/AboutAccessControlPolicy';
import APIGenerator from './policy-generators/APIGenerator';
import AboutAPIGenerator from './policy-generators/AboutAPIGenerator';
import BreachNotificationPolicy from './policy-generators/BreachNotificationPolicy';
import AboutBreachNotificationPolicy from './policy-generators/AboutBreachNotificationPolicy';
import BYODPolicy from './policy-generators/BYODPolicy';
import AboutBYODPolicy from './policy-generators/AboutBYODPolicy';
import CCPACPRAPolicy from './policy-generators/CCPACPRAPolicy';
import AboutCCPACPRAPolicy from './policy-generators/AboutCCPACPRAPolicy'
import ChangeManagementPolicy from './policy-generators/ChangeManagementPolicy';
import AboutChangeManagementPolicy from './policy-generators/AboutChangeManagementPolicy';
import COPPAPrivacyPolicy from './policy-generators/COPPAPrivacyPolicy';
import AboutCOPPAPrivacyPolicy from './policy-generators/AboutCOPPAPrivacyPolicy';
import DataProcessingPolicy from './policy-generators/DataProcessingPolicy';
import AboutDataProcessingPolicy from './policy-generators/AboutDataProcessingPolicy';
import GDPRPrivacyPolicy from './policy-generators/GDPRPrivacyPolicy';
import AboutGDPRPrivacyPolicy from './policy-generators/AboutGDPRPrivacyPolicy';
import GrantProposalGenerator from './policy-generators/GrantProposalGenerator';
import AboutGrantProposalGenerator from './policy-generators/AboutGrantProposalGenerator';
import IncidentResponsePolicy from './policy-generators/IncidentResponsePolicy';
import AboutIncidentResponsePolicy from './policy-generators/AboutIncidentResponsePolicy';
import InternetUsagePolicy from './policy-generators/InternetUsagePolicy';
import AboutInternetUsagePolicy from './policy-generators/AboutInternetUsagePolicy';
import PasswordMFAPolicy from './policy-generators/PasswordMFAPolicy';
import AboutPasswordMFAPolicy from './policy-generators/AboutPasswordMFAPolicy';
import PentestingReportGenerator from './policy-generators/PentestingReportGenerator';
import AboutPentestingReportGenerator from './policy-generators/AboutPentestingReportGenerator';
import RemoteWorkPolicy from './policy-generators/RemoteWorkPolicy';
import AboutRemoteWorkPolicy from './policy-generators/AboutRemoteWorkPolicy';
import RequestForInformation from './policy-generators/RequestForInformation';
import AboutRequestForInformation from './policy-generators/AboutRequestForInformation';
import RequestForProposal from './policy-generators/RequestForProposal';
import AboutRequestForProposal from './policy-generators/AboutRequestForProposal';
import RequestForQuote from './policy-generators/RequestForQuote';
import AboutRequestForQuote from './policy-generators/AboutRequestForQuote';
import SecurityAwarenessPolicy from './policy-generators/SecurityAwarenessPolicy';
import AboutSecurityAwarenessPolicy from './policy-generators/AboutSecurityAwarenessPolicy';
import SocialMediaPolicy from './policy-generators/SocialMediaPolicy';
import AboutSocialMediaPolicy from './policy-generators/AboutSocialMediaPolicy';
import SoftwareDesignDocument from './policy-generators/SoftwareDesignDocument';
import AboutSoftwareDesignDocument from './policy-generators/AboutSoftwareDesignDocument';
import TermsOfService from './policy-generators/TermsOfService';
import AboutTermsOfService from './policy-generators/AboutTermsOfService';
import VendorThirdParty from './policy-generators/VendorThirdParty';
import AboutVendorThirdParty from './policy-generators/AboutVendorThirdParty';
import BusinessPolicyGeneratorHub from './policy-generators/BusinessPolicyGeneratorHub';

{/* Put nested Tools Hub  routes BEFORE the parent Tools hub route */}
import EmailHeaderAnalyzer from './tools/EmailHeaderAnalyzer';
import AboutEmailHeaderAnalyzer from './tools/AboutEmailHeaderAnalyzer';
import PasswordGenerator from './tools/PasswordGenerator';
import AboutPasswordGenerator from './tools/AboutPasswordGenerator';
import PassphraseGenerator from './tools/PassphraseGenerator';
import AboutPassphraseGenerator from './tools/AboutPassphraseGenerator';
import PrivateDNS from './tools/PrivateDNS';
import AboutPrivateDNS from './tools/AboutPrivateDNS';
import URLRiskReview from './tools/URLRiskReview';
import AboutURLRiskReview from './tools/AboutURLRiskReview';
import WiFiChecklist from './tools/WiFiChecklist';
import AboutWiFiChecklist from './tools/AboutWiFiChecklist';
import EncryptDecrypt from './tools/EncryptDecrypt';
import AboutEncryptDecrypt from './tools/AboutEncryptDecrypt';
import FirewallConfigurator from './tools/FirewallConfigurator';
import AboutFirewallConfigurator from './tools/AboutFirewallConfigurator';
import ThreatModel from './tools/ThreatModel';
import AboutThreatModel from './tools/AboutThreatModel';
import MetadataRemover from './tools/MetadataRemover';
import AboutMetadataRemover from './tools/AboutMetadataRemover';
import FileHashCalculator from './tools/FileHashCalculator';
import AboutFileHashCalculator from './tools/AboutFileHashCalculator';
import QRCodeGenerator from './tools/QRCodeGenerator';
import AboutQRCodeGenerator from './tools/AboutQRCodeGenerator';
import WhatIsMyIP from './tools/WhatIsMyIP';
import AboutWhatIsMyIP from './tools/AboutWhatIsMyIP';
import DNSLookup from './tools/DNSLookup';
import AboutDNSLookup from './tools/AboutDNSLookup';
import RegexGenerator from './tools/RegexGenerator';
import AboutRegexGenerator from './tools/AboutRegexGenerator';
import BreachLookup from './tools/BreachLookup';
import AboutBreachLookup from './tools/AboutBreachLookup';
import DigitalRiskCalculator from './tools/DigitalRiskCalculator';
import AboutDigitalRiskCalculator from './tools/AboutDigitalRiskCalculator';
import TrackerSimulator from './tools/TrackerSimulator';
import AboutTrackerSimulator from './tools/AboutTrackerSimulator';
import MACGenerator from './tools/MACGenerator';
import AboutMACGenerator from './tools/AboutMACGenerator';
import PGPGenerator from './tools/PGPGenerator';
import AboutPGPGenerator from './tools/AboutPGPGenerator';
import SubnetGenerator from './tools/SubnetGenerator';
import AboutSubnetGenerator from './tools/AboutSubnetGenerator';
import JSONXMLFormatter from './tools/JSONXMLFormatter';
import AboutJSONXMLFormatter from './tools/AboutJSONXMLFormatter';
import AnsibleGenerator from './tools/AnsibleGenerator';
import AboutAnsibleGenerator from './tools/AboutAnsibleGenerator';
import AWSCloudFormation from './tools/AWSCloudFormation';
import AboutAWSCloudFormation from './tools/AboutAWSCloudFormation';
import PasswordBreachChecker from './tools/PasswordBreachChecker';
import AboutPasswordBreachChecker from './tools/AboutPasswordBreachChecker';
import AboutPrivacyPlaybookGenerator from './tools/AboutPrivacyPlaybookGenerator';
import PrivacyPlaybookGenerator from './tools/PrivacyPlaybookGenerator';
import FingerPrintAuditor from './tools/FingerPrintAuditor';
import AboutFingerPrintAuditor from './tools/AboutFingerPrintAuditor';
import TOSSummarizer from './tools/TOSSummarizer';
import AboutTOSSummarizer from './tools/AboutTOSSummarizer';
import LogfileFinder from './tools/LogfileFinder';
import AboutLogfileFinder from './tools/AboutLogfileFinder';
import SecureSmartphoneChooser from './tools/SecureSmartphoneChooser';
import AboutSecureSmartphoneChooser from './tools/AboutSecureSmartphoneChooser';
import AboutAISecurityAssessment from './tools/AboutAISecurityAssessment';
import AISecurityAssessment from './tools/AISecurityAssessment';
import APIAuthorizationHealthCheck from './tools/APIAuthorizationHealthCheck';
import AboutAPIAuthorizationHealthCheck from './tools/AboutAPIAuthorizationHealthCheck';
import DigitalFootprintScanner from './tools/DigitalFootprintScanner';
import AboutDigitalFootprintScanner from './tools/AboutDigitalFootprintScanner';
import GovernmentImpersonationScamDetector from './tools/GovernmentImpersonationScamDetector';
import AboutGovernmentImpersonationScamDetector from './tools/AboutGovernmentImpersonationScamDetector';
import TravelDataExposureAssessor from './tools/TravelDataExposureAssessor';
import AboutTravelDataExposureAssessor from './tools/AboutTravelDataExposureAssessor';
import SmartTVPrivacyConfigurator from './tools/SmartTVPrivacyConfigurator';
import AboutSmartTVPrivacyConfigurator from './tools/AboutSmartTVPrivacyConfigurator';
import GitSecretsScanner from './tools/GitSecretsScanner';
import AboutGitSecretsScanner from './tools/AboutGitSecretsScanner';
import ToolsHub from './tools/ToolsHub';


{/* Put nested Security Center Hub  routes BEFORE the parent Security Center hub route */}
import SecurityCenterHub from './security-center/SecurityCenterHub';
import Windows11HardeningTool from './security-center/Windows11HardeningTool';
import AboutWindows11Tool from './security-center/AboutWindows11Tool';
import MacOSHardeningTool from './security-center/MacOSHardeningTool';
import AboutmacOSTool from './security-center/AboutmacOSTool';
import LinuxHardeningTool from './security-center/LinuxHardeningTool';
import AboutLinuxTool from './security-center/AboutLinuxTool';

{/* Put nested Browser Hardening hub routes BEFORE the parent Browser Hardedning hub route */}
import EdgeBaselineWin11 from './security-center/EdgeBaselineWin11';
import AboutEdgeBaselineWin11 from './security-center/AboutEdgeBaselineWin11';
import ChromeBaselineWin11 from './security-center/ChromeBaselineWin11';
import AboutChromeBaselineWin11 from './security-center/AboutChromeBaselineWin11';
import FirefoxBaselineWin11 from './security-center/FirefoxBaselineWin11';
import AboutFirefoxBaselineWin11 from './security-center/AboutFirefoxBaselineWin11';
import ChromeBaselinemacOS from './security-center/ChromeBaselinemacOS';
import AboutChromeBaselinemacOS from './security-center/AboutChromeBaselinemacOS';
import FirefoxBaselinemacOS from './security-center/FirefoxBaselinemacOS';
import AboutFirefoxBaselinemacOS from './security-center/AboutFirefoxBaselinemacOS';
import ChromeBaselineLinux from './security-center/ChromeBaselineLinux';
import AboutChromeBaselineLinux from './security-center/AboutChromeBaselineLinux';
import FirefoxBaselineLinux from './security-center/FirefoxBaselineLinux';
import AboutFirefoxBaselineLinux from './security-center/AboutFirefoxBaselineLinux';
import BrowserHardeningHub from './security-center/BrowserHardeningHub';
import AboutBrowserHub from './security-center/AboutBrowserHub';

{/* Put nested firewall hub routes BEFORE the parent firewall hub route */}
import FirewallBaselineWin11 from './security-center/FirewallBaselineWin11';
import FirewallBaselinemacOS from './security-center/FirewallBaselinemacOS';
import FirewallBaselineUbuntu from './security-center/FirewallBaselineUbuntu';
import AboutFirewallWin11 from './security-center/AboutFirewallWin11';
import AboutFirewallmacOS from './security-center/AboutFirewallmacOS';
import AboutFirewallUbuntu from './security-center/AboutFirewallUbuntu';
import FirewallHardeningHub from './security-center/FirewallHardeningHub';
import AboutFirewallTool from './security-center/AboutFirewallTool';

import OneDriveLockdownTool from './security-center/OneDriveLockdownTool';
import AboutOneDriveTool from './security-center/AboutOneDriveTool';
import SmallBusinessEval from './security-center/SmallBusinessEval';
import AboutSMBAssessment from './security-center/AboutSMBAssessment';
import Office365LockdownTool from './security-center/Office365LockdownTool';
import AboutOffice365Tool from './security-center/AboutOffice365Tool';


export default function App() {
  return (
    <TOSGate>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clc-ops" element={<MissionControl />} />
        <Route path="/clc-ops/social-setup" element={<AdminSetup />} />
        <Route path="/clc-ops/social-automation" element={<SocialAutomation />} />
        <Route path="/clc-ops/cloudflare-setup" element={<CloudflareSetup />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/personal-assessment" element={<PersonalAssessmentPreview />} />
        <Route path="/individual-consultation" element={<IndividualConsultation />} />
        <Route path="/small-business-consultation" element={<SmallBusinessConsultation />} />
        <Route path="/business-assessment-preview" element={<BusinessAssessmentPreview />} />
        <Route path="/storage-setup-intake" element={<StorageSetupIntake />} />
        <Route path="/privacy-storage-consultation" element={<PrivacyStorageConsultation />} />
        <Route path="/privacy-score" element={<PrivacyScoreCalculator />} />

       {/* Put nested Business Policy hub routes BEFORE the parent Business Policy hub route */} 
       <Route path="/policy-generators/acceptable-use-policy" element={<AcceptableUsePolicy />} />
       <Route path="/policy-generators/about-acceptable-use-policy" element={<AboutAcceptableUsePolicy />} />
       <Route path="/policy-generators/access-control-policy" element={<AccessControlPolicy />} />
       <Route path="/policy-generators/about-access-control-policy" element={<AboutAccessControlPolicy />} />
       <Route path="/policy-generators/api-generator" element={<APIGenerator />} />
       <Route path="/policy-generators/about-api-generator" element={<AboutAPIGenerator />} />
       <Route path="/policy-generators/breach-notification-policy" element={<BreachNotificationPolicy />} />
       <Route path="/policy-generators/about-breach-notification-policy" element={<AboutBreachNotificationPolicy />} />
       <Route path="/policy-generators/byod-policy" element={<BYODPolicy />} />
       <Route path="/policy-generators/about-byod-policy" element={<AboutBYODPolicy />} />
       <Route path="/policy-generators/ccpa-cpra-policy" element={<CCPACPRAPolicy />} />
       <Route path="/policy-generators/about-ccpa-cpra-policy" element={<AboutCCPACPRAPolicy />} />
       <Route path="/policy-generators/change-management-policy" element={<ChangeManagementPolicy />} />
       <Route path="/policy-generators/about-change-management-policy" element={<AboutChangeManagementPolicy />} />
       <Route path="/policy-generators/coppa-privacy-policy" element={<COPPAPrivacyPolicy />} />
       <Route path="/policy-generators/about-coppa-privacy-policy" element={<AboutCOPPAPrivacyPolicy />} />
       <Route path="/policy-generators/data-processing-policy" element={<DataProcessingPolicy />} />
       <Route path="/policy-generators/about-data-processing-policy" element={<AboutDataProcessingPolicy />} />
       <Route path="/policy-generators/gdpr-privacy-policy" element={<GDPRPrivacyPolicy />} />
       <Route path="/policy-generators/about-gdpr-privacy-policy" element={<AboutGDPRPrivacyPolicy />} />
       <Route path="/policy-generators/grant-proposal-generator" element={<GrantProposalGenerator />} />
       <Route path="/policy-generators/about-grant-proposal-generator" element={<AboutGrantProposalGenerator />} />
       <Route path="/policy-generators/incident-response-policy" element={<IncidentResponsePolicy />} />
       <Route path="/policy-generators/about-incident-response-policy" element={<AboutIncidentResponsePolicy />} />
       <Route path="/policy-generators/internet-usage-policy" element={<InternetUsagePolicy />} />
       <Route path="/policy-generators/about-internet-usage-policy" element={<AboutInternetUsagePolicy />} />
       <Route path="/policy-generators/password-mfa-policy" element={<PasswordMFAPolicy />} />
       <Route path="/policy-generators/about-password-mfa-policy" element={<AboutPasswordMFAPolicy />} />
       <Route path="/policy-generators/pentesting-report-generator" element={<PentestingReportGenerator />} />
       <Route path="/policy-generators/about-pentesting-report-generator" element={<AboutPentestingReportGenerator />} />
       <Route path="/policy-generators/remote-work-policy" element={<RemoteWorkPolicy />} />
       <Route path="/policy-generators/about-remote-work-policy" element={<AboutRemoteWorkPolicy />} />
       <Route path="/policy-generators/request-for-information" element={<RequestForInformation />} />
       <Route path="/policy-generators/about-request-for-information" element={<AboutRequestForInformation />} />
       <Route path="/policy-generators/request-for-proposal" element={<RequestForProposal />} />
       <Route path="/policy-generators/about-request-for-proposal" element={<AboutRequestForProposal />} />
       <Route path="/policy-generators/request-for-quote" element={<RequestForQuote />} />
       <Route path="/policy-generators/about-request-for-quote" element={<AboutRequestForQuote />} />
       <Route path="/policy-generators/security-awareness-policy" element={<SecurityAwarenessPolicy />} />
       <Route path="/policy-generators/about-security-awareness-policy" element={<AboutSecurityAwarenessPolicy />} />
       <Route path="/policy-generators/social-media-policy" element={<SocialMediaPolicy />} />
       <Route path="/policy-generators/about-social-media-policy" element={<AboutSocialMediaPolicy />} />
       <Route path="/policy-generators/software-design-document" element={<SoftwareDesignDocument />} />
       <Route path="/policy-generators/about-software-design-document" element={<AboutSoftwareDesignDocument />} />
       <Route path="/policy-generators/terms-of-service" element={<TermsOfService />} />
       <Route path="/policy-generators/about-terms-of-service" element={<AboutTermsOfService />} />
       <Route path="/policy-generators/vendor-third-party" element={<VendorThirdParty />} />
       <Route path="/policy-generators/about-vendor-third-party" element={<AboutVendorThirdParty />} />
       <Route path="/policy-generators" element={<BusinessPolicyGeneratorHub />} />

       {/* Put nested Tool hub routes BEFORE the parent Tool hub route */} 
        <Route path="/tools/email-header-analyzer" element={<EmailHeaderAnalyzer />} />
        <Route path="/tools/about-email-header-analyzer" element={<AboutEmailHeaderAnalyzer />} />
        <Route path="/tools/password-generator" element={<PasswordGenerator />} />
        <Route path="/tools/about-password-generator" element={<AboutPasswordGenerator />} />
        <Route path="/tools/passphrase-generator" element={<PassphraseGenerator />} />
        <Route path="/tools/about-passphrase-generator" element={<AboutPassphraseGenerator />} />
        <Route path="/tools/private-dns" element={<PrivateDNS />} />
        <Route path="/tools/about-private-dns" element={<AboutPrivateDNS />} />
        <Route path="/tools/url-risk-review" element={<URLRiskReview />} />
        <Route path="/tools/about-url-risk-review" element={<AboutURLRiskReview />} />
        <Route path="/tools/wifi-checklist" element={<WiFiChecklist />} />
        <Route path="/tools/about-wifi-checklist" element={<AboutWiFiChecklist />} />
        <Route path="/tools/encrypt-decrypt" element={<EncryptDecrypt />} />
        <Route path="/tools/about-encrypt-decrypt" element={<AboutEncryptDecrypt />} /> 
        <Route path="/tools/firewall-configurator" element={<FirewallConfigurator />} />
        <Route path="/tools/about-firewall-configurator" element={<AboutFirewallConfigurator />} />
        <Route path="/tools/threat-model" element={<ThreatModel />} />
        <Route path="/tools/about-threat-model" element={<AboutThreatModel />} />
        <Route path="/tools/metadata-remover" element={<MetadataRemover />} />
        <Route path="/tools/about-metadata-remover" element={<AboutMetadataRemover />} />
        <Route path="/tools/file-hash-calculator" element={<FileHashCalculator />} />
        <Route path="/tools/about-file-hash-calculator" element={<AboutFileHashCalculator />} />
        <Route path="/tools/qr-code-generator" element={<QRCodeGenerator />} />
        <Route path="/tools/about-qr-code-generator" element={<AboutQRCodeGenerator />} />
        <Route path="/tools/what-is-my-ip" element={<WhatIsMyIP />} />
        <Route path="/tools/about-what-is-my-ip" element={<AboutWhatIsMyIP />} />
        <Route path="/tools/dns-lookup" element={<DNSLookup />} />
        <Route path="/tools/about-dns-lookup" element={<AboutDNSLookup />} />
        <Route path="/tools/regex-generator" element={<RegexGenerator />} />
        <Route path="/tools/about-regex-generator" element={<AboutRegexGenerator />} />
        <Route path="/tools/breach-lookup" element={<BreachLookup />} />
        <Route path="/tools/about-breach-lookup" element={<AboutBreachLookup />} />
        <Route path="/tools/digital-risk-calculator" element={<DigitalRiskCalculator />} />
        <Route path="/tools/about-digital-risk-calculator" element={<AboutDigitalRiskCalculator />} />
        <Route path="/tools/tracker-simulator" element={<TrackerSimulator />} />
        <Route path="/tools/about-tracker-simulator" element={<AboutTrackerSimulator />} />
        <Route path="/tools/mac-generator" element={<MACGenerator />} />
        <Route path="/tools/about-mac-generator" element={<AboutMACGenerator />} />
        <Route path="/tools/pgp-generator" element={<PGPGenerator />} />
        <Route path="/tools/about-pgp-generator" element={<AboutPGPGenerator />} />
        <Route path="/tools/subnet-generator" element={<SubnetGenerator />} />
        <Route path="/tools/about-subnet-generator" element={<AboutSubnetGenerator />} />
        <Route path="/tools/json-xml-formatter" element={<JSONXMLFormatter />} />
        <Route path="/tools/about-json-xml-formatter" element={<AboutJSONXMLFormatter />} />
        <Route path="/tools/ansible-generator" element={<AnsibleGenerator />} />
        <Route path="/tools/about-ansible-generator" element={<AboutAnsibleGenerator />} />
        <Route path="/tools/aws-cloud-formation" element={<AWSCloudFormation />} />
        <Route path="/tools/about-aws-cloud-formation" element={<AboutAWSCloudFormation />} />
        <Route path="/tools/password-breach-checker" element={<PasswordBreachChecker />} />
        <Route path="/tools/about-password-breach-checker" element={<AboutPasswordBreachChecker />} />
        <Route path="/tools/about-privacy-playbook-generator" element={<AboutPrivacyPlaybookGenerator />} />
        <Route path="/tools/privacy-playbook-generator" element={<PrivacyPlaybookGenerator />} />
        <Route path="/tools/finger-print-auditor" element={<FingerPrintAuditor />} />
        <Route path="/tools/about-finger-print-auditor" element={<AboutFingerPrintAuditor />} />
        <Route path="/tools/tos-summarizer" element={<TOSSummarizer />} />
        <Route path="/tools/about-tos-summarizer" element={<AboutTOSSummarizer />} />
        <Route path="/tools/logfile-finder" element={<LogfileFinder />} />
        <Route path="/tools/about-logfile-finder" element={<AboutLogfileFinder />} />
        <Route path="/tools/secure-smartphone-chooser" element={<SecureSmartphoneChooser />} />
        <Route path="/tools/about-secure-smartphone-chooser" element={<AboutSecureSmartphoneChooser />} />
        <Route path="/tools/about-ai-security-assessment" element={<AboutAISecurityAssessment />} />
        <Route path="/tools/ai-security-assessment" element={<AISecurityAssessment />} />
        <Route path="/tools/api-authorization-health-check" element={<APIAuthorizationHealthCheck />} />
        <Route path="/tools/about-api-authorization-health-check" element={<AboutAPIAuthorizationHealthCheck />} />
        <Route path="/tools/digital-footprint-scanner" element={<DigitalFootprintScanner />} />
        <Route path="/tools/about-digital-footprint-scanner" element={<AboutDigitalFootprintScanner />} />
        <Route path="/tools/government-impersonation-scam-detector" element={<GovernmentImpersonationScamDetector />} />
        <Route path="/tools/about-government-impersonation-scam-detector" element={<AboutGovernmentImpersonationScamDetector />} />
        <Route path="/tools/travel-data-exposure-assessor" element={<TravelDataExposureAssessor />} />
        <Route path="/tools/about-travel-data-exposure-assessor" element={<AboutTravelDataExposureAssessor />} />
        <Route path="/tools/smart-tv-privacy-configurator" element={<SmartTVPrivacyConfigurator />} />
        <Route path="/tools/about-smart-tv-privacy-configurator" element={<AboutSmartTVPrivacyConfigurator />} />
        <Route path="/tools/git-secrets-scanner" element={<GitSecretsScanner />} />
        <Route path="/tools/about-git-secrets-scanner" element={<AboutGitSecretsScanner />} />
        <Route path="/tools" element={<ToolsHub />} />
        
        {/* Put nested routes BEFORE the parent route */}
        <Route path="/security-center/windows-11-hardening" element={<Windows11HardeningTool />} />
        <Route path="/security-center/about-windows11-tool" element={<AboutWindows11Tool />} />
        <Route path="/security-center/macos-secure-setup" element={<MacOSHardeningTool />} />
        <Route path="/security-center/about-macos-tool" element={<AboutmacOSTool />} />
        <Route path="/security-center/linux-secure-setup" element={<LinuxHardeningTool />} />
        <Route path="/security-center/about-linux-tool" element={<AboutLinuxTool />} />

        {/* Put nested Browser Hardening hub routes BEFORE the parent Browser Hardedning hub route */}
        <Route path="/security-center/browser-hardening-hub/edge-baseline-win11" element={<EdgeBaselineWin11 />} />
        <Route path="/security-center/browser-hardening-hub/about-edge-baseline-win11" element={<AboutEdgeBaselineWin11 />} />
        <Route path="/security-center/browser-hardening-hub/chrome-baseline-win11" element={<ChromeBaselineWin11 />} />
        <Route path="/security-center/browser-hardening-hub/about-chrome-baseline-win11" element={<AboutChromeBaselineWin11 />} />
        <Route path="/security-center/browser-hardening-hub/firefox-baseline-win11" element={<FirefoxBaselineWin11 />} />
        <Route path="/security-center/browser-hardening-hub/about-firefox-baseline-win11" element={<AboutFirefoxBaselineWin11 />} />
        <Route path="/security-center/browser-hardening-hub/chrome-baseline-macos" element={<ChromeBaselinemacOS />} />
        <Route path="/security-center/browser-hardening-hub/about-chrome-baseline-macos" element={<AboutChromeBaselinemacOS />} />
        <Route path="/security-center/browser-hardening-hub/firefox-baseline-macos" element={<FirefoxBaselinemacOS />} />
        <Route path="/security-center/browser-hardening-hub/about-firefox-baseline-macos" element={<AboutFirefoxBaselinemacOS />} />
        <Route path="/security-center/browser-hardening-hub/chrome-baseline-linux" element={<ChromeBaselineLinux />} />
        <Route path="/security-center/browser-hardening-hub/about-chrome-baseline-linux" element={<AboutChromeBaselineLinux />} />
        <Route path="/security-center/browser-hardening-hub/firefox-baseline-linux" element={<FirefoxBaselineLinux />} />
        <Route path="/security-center/browser-hardening-hub/about-firefox-baseline-linux" element={<AboutFirefoxBaselineLinux />} />
        <Route path="/security-center/browser-hardening-hub" element={<BrowserHardeningHub />} />
        <Route path="/security-center/about-browser-hub" element={<AboutBrowserHub />} />
        
        {/* Put nested firewall hub routes BEFORE the parent firewall hub route */}
        <Route path="/security-center/firewall-hardening-hub/firewall-baseline-win11" element={<FirewallBaselineWin11 />} />
        <Route path="/security-center/firewall-hardening-hub/about-firewall-win11" element={<AboutFirewallWin11 />} />
        <Route path="/security-center/firewall-hardening-hub/firewall-baseline-macos" element={<FirewallBaselinemacOS />} />
        <Route path="/security-center/firewall-hardening-hub/about-firewall-macos" element={<AboutFirewallmacOS />} />
        <Route path="/security-center/firewall-hardening-hub/firewall-baseline-ubuntu" element={<FirewallBaselineUbuntu />} />
        <Route path="/security-center/firewall-hardening-hub/about-firewall-ubuntu" element={<AboutFirewallUbuntu />} />
        <Route path="/security-center/firewall-hardening-hub" element={<FirewallHardeningHub />} />
        <Route path="/security-center/about-firewall-hub" element={<AboutFirewallTool />} />

        <Route path="/security-center/onedrive-lockdown-tool" element={<OneDriveLockdownTool />} />
        <Route path="/security-center/about-onedrive-tool" element={<AboutOneDriveTool />} />
        <Route path="/security-center/small-business-eval" element={<SmallBusinessEval />} />
        <Route path="/security-center/about-smb-assessment" element={<AboutSMBAssessment />} />
        <Route path="/security-center/office365-lockdown-tool" element={<Office365LockdownTool />} />
        <Route path="/security-center/about-office365-lockdown" element={<AboutOffice365Tool />} />
        <Route path="/security-center" element={<SecurityCenterHub />} />
      </Routes>
    </Router>
    </TOSGate>
  );
}