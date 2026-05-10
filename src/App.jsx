import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TOSGate from './TOSGate';

// Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const About = lazy(() => import('./pages/About'));
const Privacy = lazy(() => import('./pages/Privacy'));
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const Writing = lazy(() => import('./pages/Writing'));
const MissionControl = lazy(() => import('./pages/MissionControl'));
const AdminSetup = lazy(() => import('./pages/AdminSetup'));
const CloudflareSetup = lazy(() => import('./pages/CloudflareSetup'));
const SocialAutomation = lazy(() => import('./pages/SocialAutomation'));
const LiveDemoTool = lazy(() => import('./pages/LiveDemoTool'))


// Consultations
const IndividualConsultation = lazy(() => import('./consultations/IndividualConsultation'));
const PersonalAssessmentPreview = lazy(() => import('./consultations/PersonalAssessmentPreview'));
const BusinessAssessmentPreview = lazy(() => import('./consultations/BusinessAssessmentPreview'));
const SmallBusinessConsultation = lazy(() => import('./consultations/SmallBusinessConsultation'));
const StorageSetupIntake = lazy(() => import('./consultations/StorageSetupIntake'));
const PrivacyStorageConsultation = lazy(() => import('./consultations/PrivacyStorageConsultation'));
const PrivacyScoreCalculator = lazy(() => import('./PrivacyScoreCalculator'));
const CustomEmailSetup = lazy(() => import('./consultations/CustomEmailSetup'));
const NetworkIntakeForm = lazy(() => import('./consultations/NetworkIntakeForm'));
const PiholeFaq = lazy(() => import('./consultations/PiholeFaq'));
const PiholeWireguardFaq = lazy(() => import('./consultations/PiholeWireguardFaq'));
const PricingPage = lazy(() => import('./consultations/PricingPage'));
const HomeNetworkPrivacy = lazy(() => import('./consultations/HomeNetworkPrivacy'))


// Policy Generators
const AcceptableUsePolicy = lazy(() => import('./policy-generators/AcceptableUsePolicy'));
const AboutAcceptableUsePolicy = lazy(() => import('./policy-generators/AboutAcceptableUsePolicy'));
const AccessControlPolicy = lazy(() => import('./policy-generators/AccessControlPolicy'));
const AboutAccessControlPolicy = lazy(() => import('./policy-generators/AboutAccessControlPolicy'));
const APIGenerator = lazy(() => import('./policy-generators/APIGenerator'));
const AboutAPIGenerator = lazy(() => import('./policy-generators/AboutAPIGenerator'));
const BreachNotificationPolicy = lazy(() => import('./policy-generators/BreachNotificationPolicy'));
const AboutBreachNotificationPolicy = lazy(() => import('./policy-generators/AboutBreachNotificationPolicy'));
const BYODPolicy = lazy(() => import('./policy-generators/BYODPolicy'));
const AboutBYODPolicy = lazy(() => import('./policy-generators/AboutBYODPolicy'));
const CCPACPRAPolicy = lazy(() => import('./policy-generators/CCPACPRAPolicy'));
const AboutCCPACPRAPolicy = lazy(() => import('./policy-generators/AboutCCPACPRAPolicy'));
const ChangeManagementPolicy = lazy(() => import('./policy-generators/ChangeManagementPolicy'));
const AboutChangeManagementPolicy = lazy(() => import('./policy-generators/AboutChangeManagementPolicy'));
const COPPAPrivacyPolicy = lazy(() => import('./policy-generators/COPPAPrivacyPolicy'));
const AboutCOPPAPrivacyPolicy = lazy(() => import('./policy-generators/AboutCOPPAPrivacyPolicy'));
const DataProcessingPolicy = lazy(() => import('./policy-generators/DataProcessingPolicy'));
const AboutDataProcessingPolicy = lazy(() => import('./policy-generators/AboutDataProcessingPolicy'));
const GDPRPrivacyPolicy = lazy(() => import('./policy-generators/GDPRPrivacyPolicy'));
const AboutGDPRPrivacyPolicy = lazy(() => import('./policy-generators/AboutGDPRPrivacyPolicy'));
const GrantProposalGenerator = lazy(() => import('./policy-generators/GrantProposalGenerator'));
const AboutGrantProposalGenerator = lazy(() => import('./policy-generators/AboutGrantProposalGenerator'));
const IncidentResponsePolicy = lazy(() => import('./policy-generators/IncidentResponsePolicy'));
const AboutIncidentResponsePolicy = lazy(() => import('./policy-generators/AboutIncidentResponsePolicy'));
const InternetUsagePolicy = lazy(() => import('./policy-generators/InternetUsagePolicy'));
const AboutInternetUsagePolicy = lazy(() => import('./policy-generators/AboutInternetUsagePolicy'));
const PasswordMFAPolicy = lazy(() => import('./policy-generators/PasswordMFAPolicy'));
const AboutPasswordMFAPolicy = lazy(() => import('./policy-generators/AboutPasswordMFAPolicy'));
const PentestingReportGenerator = lazy(() => import('./policy-generators/PentestingReportGenerator'));
const AboutPentestingReportGenerator = lazy(() => import('./policy-generators/AboutPentestingReportGenerator'));
const RemoteWorkPolicy = lazy(() => import('./policy-generators/RemoteWorkPolicy'));
const AboutRemoteWorkPolicy = lazy(() => import('./policy-generators/AboutRemoteWorkPolicy'));
const RequestForInformation = lazy(() => import('./policy-generators/RequestForInformation'));
const AboutRequestForInformation = lazy(() => import('./policy-generators/AboutRequestForInformation'));
const RequestForProposal = lazy(() => import('./policy-generators/RequestForProposal'));
const AboutRequestForProposal = lazy(() => import('./policy-generators/AboutRequestForProposal'));
const RequestForQuote = lazy(() => import('./policy-generators/RequestForQuote'));
const AboutRequestForQuote = lazy(() => import('./policy-generators/AboutRequestForQuote'));
const SecurityAwarenessPolicy = lazy(() => import('./policy-generators/SecurityAwarenessPolicy'));
const AboutSecurityAwarenessPolicy = lazy(() => import('./policy-generators/AboutSecurityAwarenessPolicy'));
const SocialMediaPolicy = lazy(() => import('./policy-generators/SocialMediaPolicy'));
const AboutSocialMediaPolicy = lazy(() => import('./policy-generators/AboutSocialMediaPolicy'));
const SoftwareDesignDocument = lazy(() => import('./policy-generators/SoftwareDesignDocument'));
const AboutSoftwareDesignDocument = lazy(() => import('./policy-generators/AboutSoftwareDesignDocument'));
const TermsOfService = lazy(() => import('./policy-generators/TermsOfService'));
const AboutTermsOfService = lazy(() => import('./policy-generators/AboutTermsOfService'));
const VendorThirdParty = lazy(() => import('./policy-generators/VendorThirdParty'));
const AboutVendorThirdParty = lazy(() => import('./policy-generators/AboutVendorThirdParty'));
const BusinessPolicyGeneratorHub = lazy(() => import('./policy-generators/BusinessPolicyGeneratorHub'));

// Tools
const EmailHeaderAnalyzer = lazy(() => import('./tools/EmailHeaderAnalyzer'));
const AboutEmailHeaderAnalyzer = lazy(() => import('./tools/AboutEmailHeaderAnalyzer'));
const PasswordGenerator = lazy(() => import('./tools/PasswordGenerator'));
const AboutPasswordGenerator = lazy(() => import('./tools/AboutPasswordGenerator'));
const PassphraseGenerator = lazy(() => import('./tools/PassphraseGenerator'));
const AboutPassphraseGenerator = lazy(() => import('./tools/AboutPassphraseGenerator'));
const PrivateDNS = lazy(() => import('./tools/PrivateDNS'));
const AboutPrivateDNS = lazy(() => import('./tools/AboutPrivateDNS'));
const URLRiskReview = lazy(() => import('./tools/URLRiskReview'));
const AboutURLRiskReview = lazy(() => import('./tools/AboutURLRiskReview'));
const WiFiChecklist = lazy(() => import('./tools/WiFiChecklist'));
const AboutWiFiChecklist = lazy(() => import('./tools/AboutWiFiChecklist'));
const EncryptDecrypt = lazy(() => import('./tools/EncryptDecrypt'));
const AboutEncryptDecrypt = lazy(() => import('./tools/AboutEncryptDecrypt'));
const FirewallConfigurator = lazy(() => import('./tools/FirewallConfigurator'));
const AboutFirewallConfigurator = lazy(() => import('./tools/AboutFirewallConfigurator'));
const ThreatModel = lazy(() => import('./tools/ThreatModel'));
const AboutThreatModel = lazy(() => import('./tools/AboutThreatModel'));
const MetadataRemover = lazy(() => import('./tools/MetadataRemover'));
const AboutMetadataRemover = lazy(() => import('./tools/AboutMetadataRemover'));
const FileHashCalculator = lazy(() => import('./tools/FileHashCalculator'));
const AboutFileHashCalculator = lazy(() => import('./tools/AboutFileHashCalculator'));
const QRCodeGenerator = lazy(() => import('./tools/QRCodeGenerator'));
const AboutQRCodeGenerator = lazy(() => import('./tools/AboutQRCodeGenerator'));
const WhatIsMyIP = lazy(() => import('./tools/WhatIsMyIP'));
const AboutWhatIsMyIP = lazy(() => import('./tools/AboutWhatIsMyIP'));
const DNSLookup = lazy(() => import('./tools/DNSLookup'));
const AboutDNSLookup = lazy(() => import('./tools/AboutDNSLookup'));
const RegexGenerator = lazy(() => import('./tools/RegexGenerator'));
const AboutRegexGenerator = lazy(() => import('./tools/AboutRegexGenerator'));
const BreachLookup = lazy(() => import('./tools/BreachLookup'));
const AboutBreachLookup = lazy(() => import('./tools/AboutBreachLookup'));
const DigitalRiskCalculator = lazy(() => import('./tools/DigitalRiskCalculator'));
const AboutDigitalRiskCalculator = lazy(() => import('./tools/AboutDigitalRiskCalculator'));
const TrackerSimulator = lazy(() => import('./tools/TrackerSimulator'));
const AboutTrackerSimulator = lazy(() => import('./tools/AboutTrackerSimulator'));
const MACGenerator = lazy(() => import('./tools/MACGenerator'));
const AboutMACGenerator = lazy(() => import('./tools/AboutMACGenerator'));
const PGPGenerator = lazy(() => import('./tools/PGPGenerator'));
const AboutPGPGenerator = lazy(() => import('./tools/AboutPGPGenerator'));
const SubnetGenerator = lazy(() => import('./tools/SubnetGenerator'));
const AboutSubnetGenerator = lazy(() => import('./tools/AboutSubnetGenerator'));
const JSONXMLFormatter = lazy(() => import('./tools/JSONXMLFormatter'));
const AboutJSONXMLFormatter = lazy(() => import('./tools/AboutJSONXMLFormatter'));
const AnsibleGenerator = lazy(() => import('./tools/AnsibleGenerator'));
const AboutAnsibleGenerator = lazy(() => import('./tools/AboutAnsibleGenerator'));
const AWSCloudFormation = lazy(() => import('./tools/AWSCloudFormation'));
const AboutAWSCloudFormation = lazy(() => import('./tools/AboutAWSCloudFormation'));
const PasswordBreachChecker = lazy(() => import('./tools/PasswordBreachChecker'));
const AboutPasswordBreachChecker = lazy(() => import('./tools/AboutPasswordBreachChecker'));
const PrivacyPlaybookGenerator = lazy(() => import('./tools/PrivacyPlaybookGenerator'));
const AboutPrivacyPlaybookGenerator = lazy(() => import('./tools/AboutPrivacyPlaybookGenerator'));
const FingerPrintAuditor = lazy(() => import('./tools/FingerPrintAuditor'));
const AboutFingerPrintAuditor = lazy(() => import('./tools/AboutFingerPrintAuditor'));
const TOSSummarizer = lazy(() => import('./tools/TOSSummarizer'));
const AboutTOSSummarizer = lazy(() => import('./tools/AboutTOSSummarizer'));
const LogfileFinder = lazy(() => import('./tools/LogfileFinder'));
const AboutLogfileFinder = lazy(() => import('./tools/AboutLogfileFinder'));
const SecureSmartphoneChooser = lazy(() => import('./tools/SecureSmartphoneChooser'));
const AboutSecureSmartphoneChooser = lazy(() => import('./tools/AboutSecureSmartphoneChooser'));
const AISecurityAssessment = lazy(() => import('./tools/AISecurityAssessment'));
const AboutAISecurityAssessment = lazy(() => import('./tools/AboutAISecurityAssessment'));
const APIAuthorizationHealthCheck = lazy(() => import('./tools/APIAuthorizationHealthCheck'));
const AboutAPIAuthorizationHealthCheck = lazy(() => import('./tools/AboutAPIAuthorizationHealthCheck'));
const DigitalFootprintScanner = lazy(() => import('./tools/DigitalFootprintScanner'));
const AboutDigitalFootprintScanner = lazy(() => import('./tools/AboutDigitalFootprintScanner'));
const GovernmentImpersonationScamDetector = lazy(() => import('./tools/GovernmentImpersonationScamDetector'));
const AboutGovernmentImpersonationScamDetector = lazy(() => import('./tools/AboutGovernmentImpersonationScamDetector'));
const TravelDataExposureAssessor = lazy(() => import('./tools/TravelDataExposureAssessor'));
const AboutTravelDataExposureAssessor = lazy(() => import('./tools/AboutTravelDataExposureAssessor'));
const SmartTVPrivacyConfigurator = lazy(() => import('./tools/SmartTVPrivacyConfigurator'));
const AboutSmartTVPrivacyConfigurator = lazy(() => import('./tools/AboutSmartTVPrivacyConfigurator'));
const GitSecretsScanner = lazy(() => import('./tools/GitSecretsScanner'));
const AboutGitSecretsScanner = lazy(() => import('./tools/AboutGitSecretsScanner'));
const ImageCompressor = lazy(() => import('./tools/ImageCompressor'));
const AboutImageCompressor = lazy(() => import('./tools/AboutImageCompressor'));
const PDFCompressor = lazy(() => import('./tools/PDFCompressor'));
const AboutPDFCompressor = lazy(() => import('./tools/AboutPDFCompressor'));
const ToolsHub = lazy(() => import('./tools/ToolsHub'));

// Security Center
const SecurityCenterHub = lazy(() => import('./security-center/SecurityCenterHub'));
const Windows11HardeningTool = lazy(() => import('./security-center/Windows11HardeningTool'));
const AboutWindows11Tool = lazy(() => import('./security-center/AboutWindows11Tool'));
const MacOSHardeningTool = lazy(() => import('./security-center/MacOSHardeningTool'));
const AboutmacOSTool = lazy(() => import('./security-center/AboutmacOSTool'));
const LinuxHardeningTool = lazy(() => import('./security-center/LinuxHardeningTool'));
const AboutLinuxTool = lazy(() => import('./security-center/AboutLinuxTool'));

// Browser Hardening
const EdgeBaselineWin11 = lazy(() => import('./security-center/EdgeBaselineWin11'));
const AboutEdgeBaselineWin11 = lazy(() => import('./security-center/AboutEdgeBaselineWin11'));
const ChromeBaselineWin11 = lazy(() => import('./security-center/ChromeBaselineWin11'));
const AboutChromeBaselineWin11 = lazy(() => import('./security-center/AboutChromeBaselineWin11'));
const FirefoxBaselineWin11 = lazy(() => import('./security-center/FirefoxBaselineWin11'));
const AboutFirefoxBaselineWin11 = lazy(() => import('./security-center/AboutFirefoxBaselineWin11'));
const ChromeBaselinemacOS = lazy(() => import('./security-center/ChromeBaselinemacOS'));
const AboutChromeBaselinemacOS = lazy(() => import('./security-center/AboutChromeBaselinemacOS'));
const FirefoxBaselinemacOS = lazy(() => import('./security-center/FirefoxBaselinemacOS'));
const AboutFirefoxBaselinemacOS = lazy(() => import('./security-center/AboutFirefoxBaselinemacOS'));
const ChromeBaselineLinux = lazy(() => import('./security-center/ChromeBaselineLinux'));
const AboutChromeBaselineLinux = lazy(() => import('./security-center/AboutChromeBaselineLinux'));
const FirefoxBaselineLinux = lazy(() => import('./security-center/FirefoxBaselineLinux'));
const AboutFirefoxBaselineLinux = lazy(() => import('./security-center/AboutFirefoxBaselineLinux'));
const BrowserHardeningHub = lazy(() => import('./security-center/BrowserHardeningHub'));
const AboutBrowserHub = lazy(() => import('./security-center/AboutBrowserHub'));

// Firewall
const FirewallBaselineWin11 = lazy(() => import('./security-center/FirewallBaselineWin11'));
const FirewallBaselinemacOS = lazy(() => import('./security-center/FirewallBaselinemacOS'));
const FirewallBaselineUbuntu = lazy(() => import('./security-center/FirewallBaselineUbuntu'));
const AboutFirewallWin11 = lazy(() => import('./security-center/AboutFirewallWin11'));
const AboutFirewallmacOS = lazy(() => import('./security-center/AboutFirewallmacOS'));
const AboutFirewallUbuntu = lazy(() => import('./security-center/AboutFirewallUbuntu'));
const FirewallHardeningHub = lazy(() => import('./security-center/FirewallHardeningHub'));
const AboutFirewallTool = lazy(() => import('./security-center/AboutFirewallTool'));

// Other Security Center
const OneDriveLockdownTool = lazy(() => import('./security-center/OneDriveLockdownTool'));
const AboutOneDriveTool = lazy(() => import('./security-center/AboutOneDriveTool'));
const SmallBusinessEval = lazy(() => import('./security-center/SmallBusinessEval'));
const AboutSMBAssessment = lazy(() => import('./security-center/AboutSMBAssessment'));
const Office365LockdownTool = lazy(() => import('./security-center/Office365LockdownTool'));
const AboutOffice365Tool = lazy(() => import('./security-center/AboutOffice365Tool'));

export default function App() {
  return (
    <TOSGate>
      <Router>
        <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clc-ops" element={<MissionControl />} />
            <Route path="/clc-ops/social-setup" element={<AdminSetup />} />
            <Route path="/clc-ops/social-automation" element={<SocialAutomation />} />
            <Route path="/clc-ops/cloudflare-setup" element={<CloudflareSetup />} />
            <Route path="clc-ops/live-demo-tool" element={<LiveDemoTool />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/personal-assessment" element={<PersonalAssessmentPreview />} />
            <Route path="/individual-consultation" element={<IndividualConsultation />} />
            <Route path="/small-business-consultation" element={<SmallBusinessConsultation />} />
            <Route path="/business-assessment-preview" element={<BusinessAssessmentPreview />} />
            <Route path="/storage-setup-intake" element={<StorageSetupIntake />} />
            <Route path="/privacy-storage-consultation" element={<PrivacyStorageConsultation />} />
            <Route path="/privacy-score" element={<PrivacyScoreCalculator />} />
            <Route path="/custom-email-setup" element={<CustomEmailSetup />} />
            <Route path="/home-network-privacy" element={<HomeNetworkPrivacy />} />
            <Route path="/home-network-privacy/network-intake-form" element={<NetworkIntakeForm />} />
            <Route path="/home-network-privacy/pi-hole-faq" element={<PiholeFaq />} />
            <Route path="/home-network-privacy/pi-hole-wireguard-faq" element={<PiholeWireguardFaq />} />
            <Route path="/home-network-privacy/pricing-page" element={<PricingPage />} />

            {/* Policy Generators */}
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

            {/* Tools */}
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
            <Route path="/tools/image-compressor" element={<ImageCompressor />} />
            <Route path="/tools/about-image-compressor" element={<AboutImageCompressor />} />
            <Route path="/tools/about-pdf-compressor" element={<AboutPDFCompressor />} />
            <Route path="/tools/pdf-compressor" element={<PDFCompressor />} />
            {/* <Route path="/tools" element={<ToolsHub />} /> */}

            {/* Security Center */}
            <Route path="/security-center/windows-11-hardening" element={<Windows11HardeningTool />} />
            <Route path="/security-center/about-windows11-tool" element={<AboutWindows11Tool />} />
            <Route path="/security-center/macos-secure-setup" element={<MacOSHardeningTool />} />
            <Route path="/security-center/about-macos-tool" element={<AboutmacOSTool />} />
            <Route path="/security-center/linux-secure-setup" element={<LinuxHardeningTool />} />
            <Route path="/security-center/about-linux-tool" element={<AboutLinuxTool />} />

            {/* Browser Hardening */}
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

            {/* Firewall */}
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
            {/* <Route path="/security-center" element={<SecurityCenterHub />} /> */}
          </Routes>
        </Suspense>
      </Router>
    </TOSGate>
  );
}
