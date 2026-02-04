// AboutAnsibleGenerator.jsx
import React from "react";
import { ArrowLeft, Code, AlertTriangle } from "lucide-react";

export default function AboutAnsibleGenerator() {
  const handleOpenTool = () => {
    window.location.href = "/tools/ansible-generator";
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

      {/* Hero (icon/title layout pattern) */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
              Automation Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Ansible Playbooks
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-700">
              {/* Icon 12x12, cyan-400 */}
              <Code className="w-12 h-12 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                About the Ansible Playbook Generator
              </h1>
              <p className="text-lg text-slate-400 max-w-4xl leading-relaxed">
                A friendly bridge between learning Ansible and writing your own production ready automation.
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
          {/* What Ansible does */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">What Ansible does in plain language</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Ansible is an automation engine. It connects to your systems and applies a series of small, predictable changes.
              Those changes are described in a playbook, which is simply a YAML file that lists tasks. Each task uses a module
              such as a package installer or a user manager.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Instead of logging into ten servers and repeating the same commands, you describe the desired state once in a
              playbook. Ansible then works through your inventory and brings each host into that state.
            </p>
          </div>

          {/* Why a generator can help */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Why a generator can help</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Many people learn faster when they can see a clean example and then adjust it. That is the idea behind this
              generator. It does not try to cover every Ansible feature. Instead, it focuses on a few common patterns that
              appear in training labs and real world baselines.
            </p>

            <ul className="list-disc pl-6 space-y-2 text-slate-300 leading-relaxed mb-6">
              <li>Simple play header with hosts, become, and gather facts.</li>
              <li>Optional admin user with sudo rights for Linux or an administrators group on Windows.</li>
              <li>Package installation using the right module for Linux or Windows.</li>
              <li>Service management to keep key services running and enabled at boot.</li>
              <li>A small optional SSH hardening block for Linux servers.</li>
            </ul>

            <div className="bg-gradient-to-br from-cyan-900/25 to-blue-900/25 border border-cyan-500/30 rounded-2xl p-6">
              <div className="text-xs text-cyan-300 font-semibold uppercase tracking-wider mb-2">
                Learning by reading the YAML
              </div>
              <p className="text-slate-300 leading-relaxed">
                After the generator builds a playbook, slow down and read it line by line. Notice how indentation and module
                names work. That habit turns the generator into a study partner rather than a black box.
              </p>
            </div>
          </div>

          {/* How to use the generator */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">How to use the generator</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              The generator page is split into a configuration form on the left and a read only YAML panel on the right. You
              control what appears in the playbook through a handful of choices.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300 leading-relaxed mb-4">
              <li>Fill in the play name, a hosts pattern, and a short description if you want.</li>
              <li>Choose the target platform such as Linux server, Linux workstation, or Windows host.</li>
              <li>
                Decide if you want to create an admin user. If you do, set the username, shell, and sudo or administrator
                group option.
              </li>
              <li>Paste a public SSH key if you want the playbook to configure key based logins on Linux.</li>
              <li>List packages and services that should be present and running.</li>
              <li>Select the quick security options if you want a basic firewall or SSH hardening step.</li>
              <li>Use the example pattern chips to pre fill the form for a Linux baseline or a simple web server.</li>
            </ul>
            <p className="text-slate-300 leading-relaxed">
              When you press generate, the right side panel shows the full YAML. You can copy it to your clipboard or download
              it as playbook.yml. From there you can edit it in your favourite editor and run it with ansible-playbook in your
              own lab or environment.
            </p>
          </div>

          {/* Where security fits in */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Where security fits in</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              This generator is not a complete hardening framework. It would not claim to fully implement security guides such
              as CIS benchmarks or vendor baselines. It does, however, point you in a helpful direction.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300 leading-relaxed mb-4">
              <li>Creating a dedicated admin account instead of logging in as root or a built in administrator.</li>
              <li>Using SSH key authentication instead of passwords on Linux where appropriate.</li>
              <li>Adding a basic SSH configuration block that disables root logins and common attack paths.</li>
              <li>Ensuring a firewall component is present so that you can later define a proper policy.</li>
            </ul>
            <p className="text-slate-300 leading-relaxed">
              As you grow more comfortable with Ansible you can take these ideas and extend them into full roles that match
              your own policies and reference frameworks.
            </p>
          </div>

          {/* Privacy and local only design */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Privacy and local only design</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              The generator follows the same privacy principles as the rest of CyberLife Coach. It is a static page that runs
              entirely in your browser. There is no server side processing for your inputs.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300 leading-relaxed mb-4">
              <li>Hostnames, group names, and descriptions remain on your device.</li>
              <li>Generated playbooks are not uploaded or logged.</li>
              <li>You choose when and where to save the YAML file.</li>
            </ul>
            <p className="text-slate-300 leading-relaxed">
              This makes the tool safe for classroom environments, home labs, and early planning for more sensitive
              deployments.
            </p>
          </div>

          {/* Next step */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Next step</h2>
            <p className="text-slate-300 leading-relaxed">
              If you have not visited the generator yet, open it in a new tab, try one of the example patterns, and then
              experiment. Change a setting and see what that does to the YAML. Over time you will need the generator less,
              because you will start to write the same patterns by hand.
            </p>
          </div>

          {/* Legal Disclaimer (match AboutEmailHeaderAnalyzer.jsx format, positioned before footer) */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-8">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer and Important Notice:</strong> This guide and the associated
              generator are provided for education and light productivity only. They do not connect to your hosts, do not
              execute Ansible, and do not change your systems. Always review any generated playbooks, align them with your own
              standards and change control processes, and test carefully in non production environments first.
            </p>
          </div>

          {/* Bottom actions (same location pattern, cyan/blue gradient buttons) */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mb-10 no-print">
            <button
              type="button"
              onClick={handleOpenTool}
              className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <span className="text-lg">🚀</span>
              <span>Open the Ansible Generator</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 border border-slate-600 rounded-xl text-slate-100 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print this Guide</span>
            </button>
          </div>

          {/* Small callout to reinforce intent (optional, non-invasive) */}
          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-300 leading-relaxed">
                Always treat generated YAML as a starting point. Review, adapt to your environment, and validate in a lab
                before using it in production.
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
            <p>&copy; {new Date().getFullYear()} CyberLifeCoach</p>
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
