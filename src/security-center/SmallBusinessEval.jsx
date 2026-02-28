import React, { useState } from 'react';
import { Shield, ArrowLeft, Download, BarChart3, AlertTriangle } from 'lucide-react';

export default function SmallBusinessEval() {
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState(null);

  // Section definitions
  const sectionInfo = {
    governance: { label: "Governance and profile", questions: [] },
    assets: { label: "Assets and data", questions: [] },
    iam: { label: "Identity and access", questions: [] },
    endpoint: { label: "Endpoints and servers", questions: [] },
    network: { label: "Network and remote access", questions: [] },
    appsec: { label: "Apps, web, and email", questions: [] },
    data: { label: "Data protection and backups", questions: [] },
    detect: { label: "Logging and detection", questions: [] },
    respond: { label: "Incident response and recovery", questions: [] },
    vendors: { label: "Vendors and third parties", questions: [] },
    pci: { label: "Payments and PCI DSS", questions: [] }
  };

  // Questions data
  const questions = [
    // Section 1: Governance and risk management profile
    { id: 'q1_1', section: 'governance', text: '1.1 Do you have a written security or information risk policy, even if brief, that is accessible to staff?', meta: 'Includes acceptable use policies, remote work guidelines, or basic security rules.', options: [
      { value: '3', label: 'Documented and accessible' },
      { value: '2', label: 'Basic guidelines exist' },
      { value: '1', label: 'Informal or verbal only' },
      { value: '0', label: 'None' }
    ]},
    { id: 'q1_2', section: 'governance', text: '1.2 Is there a named person or team responsible for security decisions or resolving security questions?', meta: 'Could be an owner, director, IT lead, or managed service provider contact.', options: [
      { value: '3', label: 'Clearly defined' },
      { value: '2', label: 'Mostly defined' },
      { value: '1', label: 'Informal only' },
      { value: '0', label: 'Not defined' }
    ]},
    { id: 'q1_3', section: 'governance', text: '1.3 Have you identified the most important business services that must stay available or be restored first?', meta: 'Examples include booking systems, point of sale, finance, email, or patient scheduling.', options: [
      { value: '3', label: 'Fully identified and documented' },
      { value: '2', label: 'Informally identified' },
      { value: '1', label: 'Partially considered' },
      { value: '0', label: 'Not identified' }
    ]},
    { id: 'q1_4', section: 'governance', text: '1.4 Do you maintain a simple, up to date register of key regulations, contracts, or insurance obligations that mention security or privacy?', meta: 'For example cyber insurance terms, data protection laws, or client contracts that reference security controls.', options: [
      { value: '3', label: 'Comprehensive register' },
      { value: '2', label: 'Partial register' },
      { value: '1', label: 'Ad hoc awareness' },
      { value: '0', label: 'No register' }
    ]},

    // Section 2: Asset inventory and data classification
    { id: 'q2_1', section: 'assets', text: '2.1 Do you maintain a list of laptops, desktops, servers, and key mobile devices that access business data?', meta: 'Inventory should include owner, location, and basic technical details.', options: [
      { value: '3', label: 'Complete and current list' },
      { value: '2', label: 'Mostly complete' },
      { value: '1', label: 'Partial or outdated' },
      { value: '0', label: 'No inventory' }
    ]},
    { id: 'q2_2', section: 'assets', text: '2.2 Do you keep a record of the main software and cloud services in use, including who administers each one?', meta: 'Examples include email platforms, CRM, finance, file storage, and web hosting.', options: [
      { value: '3', label: 'Documented and maintained' },
      { value: '2', label: 'Documented but not updated' },
      { value: '1', label: 'Informal only' },
      { value: '0', label: 'Not tracked' }
    ]},
    { id: 'q2_3', section: 'assets', text: '2.3 Have you identified which data sets are sensitive, for example cardholder data, health records, financial details, or confidential client information?', meta: 'Includes where that data is stored and which systems process it.', options: [
      { value: '3', label: 'Fully identified and documented' },
      { value: '2', label: 'Mostly identified' },
      { value: '1', label: 'Rough idea only' },
      { value: '0', label: 'Not identified' }
    ]},
    { id: 'q2_4', section: 'assets', text: '2.4 Do you have a simple classification or tagging approach for documents and systems, such as public, internal, confidential?', meta: 'Tags can be informal but should drive how data is protected and shared.', options: [
      { value: '3', label: 'Defined and used consistently' },
      { value: '2', label: 'Rough guidelines' },
      { value: '1', label: 'Ad hoc' },
      { value: '0', label: 'No classification' }
    ]},

    // Section 3: Identity, authentication, and authorization
    { id: 'q3_1', section: 'iam', text: '3.1 Are unique user accounts created for each person who accesses business systems, rather than sharing passwords?', meta: 'Shared accounts make auditing and user offboarding difficult or impossible.', options: [
      { value: '3', label: 'All individual accounts' },
      { value: '2', label: 'Mostly individual accounts' },
      { value: '1', label: 'Some shared accounts' },
      { value: '0', label: 'Widely shared accounts' }
    ]},
    { id: 'q3_2', section: 'iam', text: '3.2 Are password policies or passphrases enforced with minimum length requirements, for instance at least twelve to fourteen characters?', meta: 'Longer passwords help resist brute force and credential stuffing attacks.', options: [
      { value: '3', label: '12+ characters enforced' },
      { value: '2', label: '8+ characters enforced' },
      { value: '1', label: 'Weak or default only' },
      { value: '0', label: 'No policy' }
    ]},
    { id: 'q3_3', section: 'iam', text: '3.3 Is multi factor authentication enabled for important systems, especially email, finance, and admin consoles?', meta: 'MFA significantly reduces the impact of stolen or guessed passwords.', options: [
      { value: '3', label: 'Enabled widely' },
      { value: '2', label: 'Enabled for critical systems' },
      { value: '1', label: 'Enabled for a few systems' },
      { value: '0', label: 'Not enabled' }
    ]},
    { id: 'q3_4', section: 'iam', text: '3.4 Are administrative privileges restricted to people who genuinely need them, and separate from day to day user accounts where possible?', meta: 'Reduces the chance of accidental or malicious misuse of powerful permissions.', options: [
      { value: '3', label: 'Restricted and separated' },
      { value: '2', label: 'Somewhat restricted' },
      { value: '1', label: 'Loosely controlled' },
      { value: '0', label: 'Most users have admin' }
    ]},
    { id: 'q3_5', section: 'iam', text: '3.5 When staff leave or change roles, are their accounts disabled or updated promptly?', meta: 'Orphaned accounts can be used by insiders or attackers to gain unauthorized access.', options: [
      { value: '3', label: 'Consistently updated' },
      { value: '2', label: 'Usually updated' },
      { value: '1', label: 'Sometimes forgotten' },
      { value: '0', label: 'Rarely updated' }
    ]},

    // Section 4: Endpoint and server security
    { id: 'q4_1', section: 'endpoint', text: '4.1 Are desktop and laptop operating systems kept up to date with security patches, preferably set to auto update or centrally managed?', meta: 'Timely patching fixes known security flaws that attackers routinely exploit.', options: [
      { value: '3', label: 'Automated or centrally managed' },
      { value: '2', label: 'Mostly patched regularly' },
      { value: '1', label: 'Occasionally patched' },
      { value: '0', label: 'Rarely or never patched' }
    ]},
    { id: 'q4_2', section: 'endpoint', text: '4.2 Are anti malware tools installed on endpoints and servers, with signatures or definitions kept up to date?', meta: 'Could be cloud managed endpoint detection or classic antivirus products.', options: [
      { value: '3', label: 'Deployed and updated' },
      { value: '2', label: 'Deployed but not always current' },
      { value: '1', label: 'Deployed on a few devices' },
      { value: '0', label: 'Not deployed or very outdated' }
    ]},
    { id: 'q4_3', section: 'endpoint', text: '4.3 Are host firewalls or personal firewalls enabled on endpoints when they connect to untrusted networks?', meta: 'Reduces exposure to network based attacks on public or home networks.', options: [
      { value: '3', label: 'Enabled and enforced' },
      { value: '2', label: 'Enabled on most devices' },
      { value: '1', label: 'Enabled on a few devices' },
      { value: '0', label: 'Disabled or unknown' }
    ]},
    { id: 'q4_4', section: 'endpoint', text: '4.4 Are servers that run critical applications kept up to date, with unnecessary services disabled?', meta: 'Reduces attack surface by removing unneeded network ports and features.', options: [
      { value: '3', label: 'Regularly patched and hardened' },
      { value: '2', label: 'Mostly patched' },
      { value: '1', label: 'Occasionally patched' },
      { value: '0', label: 'Rarely or never patched' }
    ]},

    // Section 5: Network security and remote access
    { id: 'q5_1', section: 'network', text: '5.1 Are network firewalls configured with explicit rules that restrict inbound and outbound traffic?', meta: 'Includes internet edge devices and cloud security groups.', options: [
      { value: '3', label: 'Rules defined and reviewed' },
      { value: '2', label: 'Basic rules configured' },
      { value: '1', label: 'Minimal restrictions' },
      { value: '0', label: 'Default open' }
    ]},
    { id: 'q5_2', section: 'network', text: '5.2 Are guest and staff wireless networks separated, with encryption enabled and strong passphrases?', meta: 'Guest devices should not have direct access to internal business systems.', options: [
      { value: '3', label: 'Segmented and secured' },
      { value: '2', label: 'Some separation' },
      { value: '1', label: 'Single shared network' },
      { value: '0', label: 'Open or weakly protected' }
    ]},
    { id: 'q5_3', section: 'network', text: '5.3 Is remote access, for example VPN or remote desktop, restricted and protected with multi factor authentication?', meta: 'If no remote access is allowed, you can mark this not applicable.', options: [
      { value: '3', label: 'Strongly protected' },
      { value: '2', label: 'Some protections' },
      { value: '1', label: 'Basic authentication only' },
      { value: '0', label: 'Open or unmanaged' },
      { value: 'na', label: 'Not applicable' }
    ]},

    // Section 6: Application, website, and email security
    { id: 'q6_1', section: 'appsec', text: '6.1 Is your main website and any web applications kept patched and maintained by you or a trusted provider?', meta: 'Includes content management systems, plugins, and custom code.', options: [
      { value: '3', label: 'Regularly patched and monitored' },
      { value: '2', label: 'Patched occasionally' },
      { value: '1', label: 'Rarely patched' },
      { value: '0', label: 'Not maintained' }
    ]},
    { id: 'q6_2', section: 'appsec', text: '6.2 Are basic email protections such as spam filtering and malware scanning in place and monitored?', meta: 'Could be built into your email platform or managed by a service provider.', options: [
      { value: '3', label: 'Strong and monitored' },
      { value: '2', label: 'Basic protections' },
      { value: '1', label: 'Minimal protections' },
      { value: '0', label: 'None or unknown' }
    ]},
    { id: 'q6_3', section: 'appsec', text: '6.3 Are stronger security settings available in your email or collaboration platform, such as suspicious login alerts, geo restrictions, or safe link checks, and are they configured?', meta: 'Settings vary by provider but often include advanced phishing protections.', options: [
      { value: '3', label: 'Tuned and actively used' },
      { value: '2', label: 'Some enabled' },
      { value: '1', label: 'Defaults only' },
      { value: '0', label: 'Not reviewed' }
    ]},

    // Section 7: Data protection, encryption, and backups
    { id: 'q7_1', section: 'data', text: '7.1 Are full disk encryption features enabled on laptops and other portable devices that store business data?', meta: 'For example BitLocker, FileVault, or mobile device encryption.', options: [
      { value: '3', label: 'Enabled on all relevant devices' },
      { value: '2', label: 'Enabled on most devices' },
      { value: '1', label: 'Enabled on a few devices' },
      { value: '0', label: 'Not enabled' }
    ]},
    { id: 'q7_2', section: 'data', text: '7.2 Are regular backups taken for critical systems and data, including at least one copy that is offline or logically separated?', meta: 'Backups should be tested periodically so that restores are known to work.', options: [
      { value: '3', label: 'Regular, tested, and separated' },
      { value: '2', label: 'Regular but rarely tested' },
      { value: '1', label: 'Occasional backups' },
      { value: '0', label: 'No reliable backups' }
    ]},
    { id: 'q7_3', section: 'data', text: '7.3 Is sensitive data in transit protected with secure protocols such as TLS when transmitted over networks or the internet?', meta: 'Includes websites, remote access tools, and file transfers.', options: [
      { value: '3', label: 'Always encrypted in transit' },
      { value: '2', label: 'Mostly encrypted' },
      { value: '1', label: 'Mixed' },
      { value: '0', label: 'Often unencrypted' }
    ]},

    // Section 8: Logging, monitoring, and detection
    { id: 'q8_1', section: 'detect', text: '8.1 Are important systems configured to log security relevant events such as login attempts, admin actions, and configuration changes?', meta: 'Includes cloud services, servers, endpoints, and network devices where possible.', options: [
      { value: '3', label: 'Logging on most critical systems' },
      { value: '2', label: 'Limited logging' },
      { value: '1', label: 'Minimal logging' },
      { value: '0', label: 'No logging configured' }
    ]},
    { id: 'q8_2', section: 'detect', text: '8.2 Are important alerts, such as suspicious sign in events or malware detections, reviewed and acted on within a reasonable time?', meta: 'Could be performed by internal staff or a managed service provider.', options: [
      { value: '3', label: 'Reviewed routinely' },
      { value: '2', label: 'Reviewed occasionally' },
      { value: '1', label: 'Rarely reviewed' },
      { value: '0', label: 'Not reviewed' }
    ]},

    // Section 9: Incident response and recovery
    { id: 'q9_1', section: 'respond', text: '9.1 Do you have a simple incident response or disaster recovery plan that covers what to do if critical systems go down or a breach is suspected?', meta: 'Does not need to be formal but should list key contacts, steps, and backup restoration procedures.', options: [
      { value: '3', label: 'Documented and tested' },
      { value: '2', label: 'Documented but not tested' },
      { value: '1', label: 'Informal only' },
      { value: '0', label: 'No plan' }
    ]},
    { id: 'q9_2', section: 'respond', text: '9.2 Are contact details for legal, law enforcement, cyber insurance, and key vendors readily available if you need to escalate an incident?', meta: 'Preparation speeds up containment and reporting when an incident occurs.', options: [
      { value: '3', label: 'Current and accessible' },
      { value: '2', label: 'Mostly available' },
      { value: '1', label: 'Partially documented' },
      { value: '0', label: 'Not documented' }
    ]},
    { id: 'q9_3', section: 'respond', text: '9.3 Have you tested restoring critical data or systems from backups within the last year?', meta: 'Backup tests verify that restores actually work when you need them.', options: [
      { value: '3', label: 'Tested within last year' },
      { value: '2', label: 'Tested but over a year ago' },
      { value: '1', label: 'Never tested but backups exist' },
      { value: '0', label: 'No backups or tests' }
    ]},

    // Section 10: Vendor and third party risk management
    { id: 'q10_1', section: 'vendors', text: '10.1 Are the key vendors and service providers who handle your data, host systems, or deliver security services documented and reviewed periodically?', meta: 'Includes cloud platforms, managed service providers, SaaS tools, and payment processors.', options: [
      { value: '3', label: 'Documented and reviewed' },
      { value: '2', label: 'Informally tracked' },
      { value: '1', label: 'Partial awareness' },
      { value: '0', label: 'Not tracked' }
    ]},
    { id: 'q10_2', section: 'vendors', text: '10.2 Do contracts or agreements with critical vendors include security or data handling requirements, such as how they protect data or notify you of breaches?', meta: 'Helps ensure that vendors follow acceptable security standards aligned with your obligations.', options: [
      { value: '3', label: 'Security clauses in place' },
      { value: '2', label: 'Some security mentions' },
      { value: '1', label: 'Generic only' },
      { value: '0', label: 'Not reviewed' }
    ]},
    { id: 'q10_3', section: 'vendors', text: '10.3 Are vendor provided credentials, for example admin accounts in third party tools, kept secure and rotated if staff leave or roles change?', meta: 'Orphaned or known vendor passwords increase risk of unauthorized vendor access.', options: [
      { value: '3', label: 'Managed and rotated' },
      { value: '2', label: 'Managed but not rotated' },
      { value: '1', label: 'Ad hoc management' },
      { value: '0', label: 'Not managed' }
    ]},

    // Section 11: Payment card and PCI DSS considerations
    { id: 'q11_1', section: 'pci', text: '11.1 If you accept credit or debit cards, do you use a PCI DSS validated third party processor or gateway that handles card data on your behalf?', meta: 'If you do not handle card data at all, mark this not applicable.', options: [
      { value: '3', label: 'Validated third party handles all card data' },
      { value: '2', label: 'Mostly outsourced but some card data touches our systems' },
      { value: '1', label: 'Unclear how card data is handled' },
      { value: '0', label: 'We handle card data directly without PCI compliance' },
      { value: 'na', label: 'Not applicable' }
    ]},
    { id: 'q11_2', section: 'pci', text: '11.2 If card data is stored, transmitted, or processed by your organization, are you aware of and working toward PCI DSS compliance requirements?', meta: 'Requirements include secure storage, encryption in transit, access controls, and vulnerability scanning. If no card data touches your systems, mark not applicable.', options: [
      { value: '3', label: 'Aware and working on compliance' },
      { value: '2', label: 'Aware but limited progress' },
      { value: '1', label: 'Limited awareness' },
      { value: '0', label: 'Not aware or not addressing' },
      { value: 'na', label: 'Not applicable' }
    ]},
    { id: 'q11_3', section: 'pci', text: '11.3 If you accept card payments in person using card terminals or point of sale systems, are those devices on a separate network segment from your main business network?', meta: 'Reduces exposure if payment devices are compromised. Mark not applicable if no in person card payments.', options: [
      { value: '3', label: 'Segregated network' },
      { value: '2', label: 'Some separation' },
      { value: '1', label: 'Same network as business systems' },
      { value: '0', label: 'Unknown or no segmentation' },
      { value: 'na', label: 'Not applicable' }
    ]},
  ];

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateScore = () => {
    const sectionScore = {};
    const sectionMax = {};

    Object.keys(sectionInfo).forEach(sec => {
      sectionScore[sec] = 0;
      sectionMax[sec] = 0;
    });

    let totalScore = 0;
    let totalMax = 0;

    questions.forEach(q => {
      const answer = answers[q.id];
      const section = q.section;

      if (!answer) {
        // Unanswered counts as zero but still counts toward max
        sectionMax[section] += 3;
        totalMax += 3;
        return;
      }

      if (answer === 'na') {
        // Not applicable, ignore from denominator
        return;
      }

      const numeric = parseInt(answer, 10);
      if (!Number.isNaN(numeric)) {
        sectionScore[section] += numeric;
        sectionMax[section] += 3;
        totalScore += numeric;
        totalMax += 3;
      }
    });

    const scoreResults = {
      sections: sectionScore,
      maxScores: sectionMax,
      total: totalScore,
      totalMax: totalMax
    };

    setScores(scoreResults);
  };

  const formatPercent = (score, max) => {
    if (!max) return 'n/a';
    return ((score / max) * 100).toFixed(0) + '%';
  };

  const getScoreClass = (score, max) => {
    if (!max) return '';
    const pct = (score / max) * 100;
    if (pct >= 80) return 'text-green-400';
    if (pct >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const buildNarrative = () => {
    if (!scores) return '';
    
    const { total, totalMax } = scores;
    if (totalMax === 0) return 'No questions scored yet.';

    const pct = ((total / totalMax) * 100).toFixed(0);
    let narrative = '';

    if (pct >= 80) {
      narrative = 'Your overall security posture appears strong. Continue maintaining these practices and stay alert for emerging threats.';
    } else if (pct >= 50) {
      narrative = 'Your security posture is moderate. There are opportunities to strengthen controls in several areas. Focus on the lower scoring sections to improve your overall resilience.';
    } else {
      narrative = 'Your security posture has significant gaps. Prioritize improving identity management, endpoint protection, and backup practices. Consider engaging a security professional or managed service provider.';
    }

    return narrative;
  };

  const buildPlainTextSummary = () => {
    if (!scores) return '';
    
    const { sections, maxScores, total, totalMax } = scores;
    const dateStr = new Date().toLocaleDateString();
    
    let text = `Small Business Security Assessment Summary\n`;
    text += `Date: ${dateStr}\n`;
    text += `Overall Score: ${total} / ${totalMax} (${formatPercent(total, totalMax)})\n\n`;
    text += `Section Scores:\n`;
    text += `-`.repeat(60) + '\n';

    Object.keys(sectionInfo).forEach(sec => {
      const score = sections[sec] || 0;
      const max = maxScores[sec] || 0;
      text += `${sectionInfo[sec].label.padEnd(35)} ${score}/${max} (${formatPercent(score, max)})\n`;
    });

    text += `\n${buildNarrative()}\n`;
    
    return text;
  };

  const buildMarkdownSummary = () => {
    if (!scores) return '';
    
    const { sections, maxScores, total, totalMax } = scores;
    const dateStr = new Date().toLocaleDateString();
    
    let md = `# Small Business Security Assessment Summary\n\n`;
    md += `**Date:** ${dateStr}  \n`;
    md += `**Overall Score:** ${total} / ${totalMax} (${formatPercent(total, totalMax)})\n\n`;
    md += `## Section Scores\n\n`;
    md += `| Section | Score | Percentage |\n`;
    md += `|---------|-------|------------|\n`;

    Object.keys(sectionInfo).forEach(sec => {
      const score = sections[sec] || 0;
      const max = maxScores[sec] || 0;
      md += `| ${sectionInfo[sec].label} | ${score}/${max} | ${formatPercent(score, max)} |\n`;
    });

    md += `\n## Summary\n\n${buildNarrative()}\n`;
    
    return md;
  };

  const downloadText = () => {
    const text = buildPlainTextSummary();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'security-assessment.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadMarkdown = () => {
    const md = buildMarkdownSummary();
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'security-assessment.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const QuestionGroup = ({ question }) => (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
      <div className="font-semibold text-sm mb-2">{question.text}</div>
      <div className="text-xs text-slate-400 mb-3">{question.meta}</div>
      <div className="flex flex-wrap gap-2">
        {question.options.map((option, idx) => (
          <label key={idx} className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-slate-700 bg-slate-900/50 cursor-pointer hover:border-cyan-500 transition-all text-sm">
            <input
              type="radio"
              name={question.id}
              value={option.value}
              checked={answers[question.id] === option.value}
              onChange={() => handleAnswerChange(question.id, option.value)}
              className="text-cyan-500"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  // Group questions by section
  const questionsBySection = {};
  questions.forEach(q => {
    if (!questionsBySection[q.section]) {
      questionsBySection[q.section] = [];
    }
    questionsBySection[q.section].push(q);
  });

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

           <button
  onClick={() => window.location.href = '/security-center'}
  className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-all duration-300 border border-slate-700 hover:border-cyan-500"
>
  <ArrowLeft className="w-4 h-4" />
  <span>Back to Security Center</span>
</button>
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
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Security Assessment</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Small Business</span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Local, in-browser</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Small Business Security Assessment
          </h1>
          
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-4">
            This brief, practical assessment helps small businesses understand their current security posture and identify areas for improvement. It covers eleven key topic areas, from governance and identity management through to payment security and vendor risk.
          </p>
          
          <p className="text-sm text-slate-400 max-w-4xl leading-relaxed">
            Answer each question as honestly as you can. Your answers stay local in your browser and are not sent to any server. Once complete, you can calculate scores, see which sections need the most attention, and download a summary to share with your team or advisors.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Questions Panel */}
          <div className="lg:col-span-2 space-y-8">
            {Object.keys(sectionInfo).map((sectionKey, idx) => (
              <div key={sectionKey} className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
                <h2 className="text-xl font-bold mb-2 text-cyan-400">{idx + 1}. {sectionInfo[sectionKey].label}</h2>
                <div className="space-y-4">
                  {questionsBySection[sectionKey]?.map(question => (
                    <QuestionGroup key={question.id} question={question} />
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
              <button
                onClick={calculateScore}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Calculate Scores</span>
              </button>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
              <p className="text-sm text-slate-400 mb-4">
                This assessment focuses on a practical subset of security and privacy questions tailored to real-world small businesses. It does not cover every control in STIG, NIST, CIS, or PCI DSS. Instead, it gives you a clear, actionable starting point to understand your posture and reduce your attack surface.
              </p>
              
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-2">Important Notice and Legal Disclaimer</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      This assessment and any generated summaries are provided for educational and informational use only. They do not replace professional advice and they do not guarantee compliance with DISA STIGs, NIST CSF, CIS Controls, PCI DSS, GDPR, or any other framework, law, or contract. All logic runs locally in your browser and any output stays on your systems unless you choose to share it. You are responsible for how you interpret and act on the results. Always verify findings against your own environment, involve qualified professionals where appropriate, and ensure you have reliable backups and incident response plans before making significant changes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4 text-cyan-400">Results</h2>
              
              {scores ? (
                <>
                  <div className="mb-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                    <div className="text-sm text-slate-400 mb-1">Overall Score</div>
                    <div className="text-2xl font-bold">
                      {scores.total} / {scores.totalMax}
                    </div>
                    <div className={`text-lg font-semibold ${getScoreClass(scores.total, scores.totalMax)}`}>
                      {formatPercent(scores.total, scores.totalMax)}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-slate-300 mb-3">Section Scores</h3>
                    <div className="space-y-2">
                      {Object.keys(sectionInfo).map(sec => {
                        const score = scores.sections[sec] || 0;
                        const max = scores.maxScores[sec] || 0;
                        return (
                          <div key={sec} className="flex justify-between items-center text-sm">
                            <span className="text-slate-400">{sectionInfo[sec].label}</span>
                            <span className={getScoreClass(score, max)}>
                              {score}/{max} ({formatPercent(score, max)})
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                    <div className="text-sm font-semibold text-slate-300 mb-2">Summary</div>
                    <p className="text-xs text-slate-400 leading-relaxed">{buildNarrative()}</p>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={downloadText}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-semibold bg-slate-800 border border-slate-700 hover:border-cyan-500 transition-all hover:bg-slate-700"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Text</span>
                    </button>
                    
                    <button
                      onClick={downloadMarkdown}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-semibold bg-slate-800 border border-slate-700 hover:border-cyan-500 transition-all hover:bg-slate-700"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Markdown</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Answer questions and click "Calculate Scores" to see your results.</p>
                </div>
              )}
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
