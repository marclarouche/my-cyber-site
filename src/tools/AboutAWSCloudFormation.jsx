// AboutCloudFormation.jsx
import React from "react";
import { ArrowLeft, Cloud, AlertTriangle } from "lucide-react";

export default function AboutCloudFormation() {
  const handleOpenTool = () => {
    // HTML points to: cloud-formation-generator.html
    // React tools route pattern used elsewhere: /tools/<tool-slug>
    window.location.href = "/tools/aws-cloud-formation";
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">
      {/* Navigation (match AboutEmailHeaderAnalyzer.jsx) */}
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

            <a
              href="/tools"
              className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tools Hub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero (icon + title layout) */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
              Infrastructure as Code
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              AWS CloudFormation
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-700">
              {/* Icon should be 12x12, cyan-400 */}
              <Cloud className="w-12 h-12 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                About the AWS CloudFormation Template Generator
              </h1>
              <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
                This guide explains how the generator works, when to use it, and how to keep your AWS environments safe while you
                experiment with infrastructure as code.
              </p>
              <p className="text-base text-cyan-400 font-semibold mt-2">
                A Veteran-Owned Business Committed to Your Digital Security
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* What this tool is designed to do */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">What this tool is designed to do</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              The AWS CloudFormation Template Generator is a gentle way to practice infrastructure as code without writing every
              line from scratch. You choose a few building blocks, and the page assembles a starter YAML template you can review,
              adjust, and deploy using your own AWS tools.
            </p>
            <p className="text-slate-300 leading-relaxed mb-6">
              It focuses on simple, repeatable patterns that are useful for learning and for small lab environments. The goal is to
              help you think in terms of templates and security by default, not to replace full blown architecture design.
            </p>

            <div className="bg-gradient-to-br from-cyan-900/25 to-blue-900/25 border border-cyan-500/30 rounded-2xl p-6">
              <div className="text-xs text-cyan-300 font-semibold uppercase tracking-wider mb-2">Key idea</div>
              <p className="text-slate-300 leading-relaxed">
                You stay in control. The generator creates text, you decide where and how it runs in your AWS accounts.
              </p>
            </div>
          </div>

          {/* How the generator works */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">How the generator works</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              The page runs entirely in your browser. When you fill in the form and press Generate, a small script builds a
              CloudFormation template string in memory and shows it in the output area.
            </p>

            <h3 className="text-xl font-bold mb-3 text-cyan-400">What it can include</h3>
            <ul className="space-y-2 text-slate-300 mb-6">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>A private S3 bucket with versioning, optional logging prefix, and public access blocking</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>A small EC2 instance with a security group for SSH and web traffic in a lab setting</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>A basic IAM role and instance profile for EC2, with managed policies like SSM access</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Simple Outputs to surface key values such as bucket name or instance ID</span>
              </li>
            </ul>

            <h3 className="text-xl font-bold mb-3 text-cyan-400">What it does not do</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>It does not call the AWS API or deploy stacks</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>It does not create or store AWS credentials</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>It does not validate limits or costs in your account</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>It does not replace a full security review or architecture design</span>
              </li>
            </ul>
          </div>

          {/* Who this tool is for */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Who this tool is for</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              The generator is meant for people who want a safe runway into CloudFormation without starting from a blank file every
              time. It can be helpful if you are in one of these situations.
            </p>

            <ul className="space-y-2 text-slate-300 mb-6">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>You are learning AWS and want small, readable templates to study</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>You support a lab or training environment and need quick starter stacks</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>You prefer to review generated YAML locally before ever touching AWS</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>You want a repeatable baseline with security minded defaults to extend later</span>
              </li>
            </ul>

            <p className="text-slate-500 italic">
              The templates are intentionally simple. For production, you will usually add more controls, monitoring, backups, and
              organization specific policies.
            </p>
          </div>

          {/* Quick start */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Quick start: using the template safely</h2>

            <h3 className="text-xl font-bold mb-2 text-cyan-400">Step one, choose your building blocks</h3>
            <p className="text-slate-300 leading-relaxed mb-5">
              On the main tool page, start by naming your stack and selecting an environment tag such as dev or lab. Decide whether
              you want a private S3 bucket, a small EC2 instance, an IAM role, or a combination of the three.
            </p>

            <h3 className="text-xl font-bold mb-2 text-cyan-400">Step two, review security related fields</h3>
            <p className="text-slate-300 leading-relaxed mb-5">
              Pay special attention to anything that affects exposure or permissions. This includes fields such as bucket name, public
              access blocking, EC2 security group rules, and IAM policies. For anything beyond a lab, use narrow CIDR ranges and
              principle of least privilege wherever possible.
            </p>

            <h3 className="text-xl font-bold mb-2 text-cyan-400">Step three, generate, read, and edit locally</h3>
            <p className="text-slate-300 leading-relaxed mb-5">
              Press the generate button, then scroll through the YAML. Make sure you understand what each resource does. If something
              looks too open for your use case, edit the template before deploying.
            </p>

            <h3 className="text-xl font-bold mb-2 text-cyan-400">Step four, deploy with your own tools</h3>
            <p className="text-slate-300 leading-relaxed">
              Save the template as template.yaml and use AWS CloudFormation, the AWS CLI, or your chosen deployment tool from your own
              machine and accounts. This keeps control of credentials and stack changes firmly in your hands.
            </p>
          </div>

          {/* Privacy, security, and limitations */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Privacy, security, and limitations</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              The generator is intentionally minimal. It has no server side component and no analytics. Everything you type stays
              inside the browser tab until you close or refresh the page.
            </p>

            <ul className="space-y-2 text-slate-300 mb-5">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>No templates are uploaded to CyberLife Coach servers</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>No AWS keys or secret values are requested or stored</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>You can clear the form and output at any time with a single click</span>
              </li>
            </ul>

            <p className="text-slate-300 leading-relaxed mb-2">
              That said, the tool cannot know your broader security requirements. Treat the output as a starting point rather than an
              approved standard. Always combine it with your own reviews, threat models, and organizational policies.
            </p>

            <p className="text-slate-500 italic">
              For formal guidance, refer to official AWS CloudFormation documentation and your internal security and compliance
              standards.
            </p>
          </div>

          {/* Buttons (must remain at bottom) */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <span className="text-lg">☁️</span>
              <span>Open the CloudFormation Tool</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print this Guide</span>
            </button>
          </div>

          {/* Legal Disclaimer (match AboutEmailHeaderAnalyzer.jsx format; bottom before footer) */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-8">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer and Important Notice:</strong> This AWS CloudFormation Template
              Generator and this companion guide are educational and productivity helpers. All input and all generation happen in your
              browser. No AWS credentials, stack data, or account identifiers are transmitted to CyberLife Coach or to any third party.
              The generated templates are examples only and are provided without warranty, support, or guarantee of fitness for any
              purpose. You are responsible for reviewing, testing, and hardening all infrastructure before deployment, especially in
              production or sensitive environments.
            </p>
          </div>

          {/* Small safety callout (non-invasive) */}
          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-2xl p-6 mb-10">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-300 leading-relaxed">
                Always review security group rules, bucket public access settings, and IAM permissions before deploying. Treat lab
                defaults as learning aids, not production standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (match reference style) */}
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
            <p>&copy; {new Date().getFullYear()} CyberLife Coach</p>
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
