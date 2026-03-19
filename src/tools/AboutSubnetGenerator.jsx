import React from 'react';
import { Network, ArrowLeft, Shield, CheckCircle, Globe } from 'lucide-react';

export default function AboutSubnetGenerator() {
  const handleOpenTool = () => {
    window.location.href = '/tools/subnet-generator';
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">
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

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
              Network Tools Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              IPv4 & IPv6
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <Network className="w-12 h-12 text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              About Subnetting
            </h1>
          </div>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            A short, exam-friendly overview of subnetting and how to use the CyberLife Coach Subnetting Generator.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Why subnetting still matters */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Why subnetting still matters
            </h2>
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-6 mb-4">
              <p className="text-slate-300 leading-relaxed mb-4">
                Every device on a network needs an address. Without some structure, that address space turns into chaos.
                Subnetting is the way we slice a larger network into smaller, organised pieces, with clear boundaries and
                predictable ranges.
              </p>
              <p className="text-slate-300 leading-relaxed mb-4">
                For students, subnetting questions appear everywhere. Certification exams such as CompTIA Network+ and
                Cisco CCNA expect you to calculate network ranges, host counts, and broadcast addresses quickly and
                confidently.
              </p>
              <p className="text-slate-300 leading-relaxed">
                For working administrators, subnetting is how you design networks that are efficient and secure, with
                room to grow without constant renumbering.
              </p>
            </div>
          </div>

          {/* Subnetting in one sentence */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Subnetting in one sentence
            </h2>
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-6">
              <p className="text-slate-300 leading-relaxed">
                A subnet is a smaller network carved out of a bigger one, defined by an address and a prefix length such
                as 192.168.10.0/24 or 2001:db8::/64.
              </p>
            </div>
          </div>

          {/* IPv4 subnetting essentials */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              IPv4 subnetting essentials
            </h2>
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                IPv4 addresses are 32 bits long. The prefix length tells you how many of those bits are used for the
                network portion. The remaining bits define host addresses inside that subnet.
              </p>
              <ul className="space-y-3 text-slate-300 mb-4">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Address and prefix together form the subnet, for example 192.168.10.0/24.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>A /24 prefix means 24 bits for the network and 8 bits for hosts.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Total addresses in the subnet equal 2 raised to the power of host bits, so a /24 has 2⁸ which is 256 addresses.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>In traditional IPv4 networks, the first and last addresses are reserved for network and broadcast.</span>
                </li>
              </ul>
              <p className="text-slate-300 leading-relaxed">
                The table you may have seen in textbooks lists each subnet mask, its binary form, and the number of
                available addresses. The Subnetting Generator recreates those values dynamically so that you can see
                the numbers change as you slide up and down the prefix sizes.
              </p>
            </div>
          </div>

          {/* IPv6 subnetting essentials */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              IPv6 subnetting essentials
            </h2>
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                IPv6 addresses are 128 bits long. The prefix works in the same way as IPv4, but the address space is
                so large that subnets are usually much bigger. For example, a common practice is to allocate a /64
                per local network segment.
              </p>
              <ul className="space-y-3 text-slate-300 mb-4">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>An IPv6 address such as 2001:db8:1234::1/64 reserves 64 bits for the network.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>The remaining 64 bits identify hosts inside that subnet and provide 2⁶⁴ possible interface identifiers.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Subnets are almost always discussed in terms of prefix length rather than address counts, because the numbers are enormous.</span>
                </li>
              </ul>
              <p className="text-slate-300 leading-relaxed">
                The Subnetting Generator shows IPv6 ranges in expanded eight block form. That deliberate choice helps
                you see the exact block where the prefix boundary sits, which is useful when you are learning or
                reviewing exam topics.
              </p>
            </div>
          </div>

          {/* How to use the Subnetting Generator */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              How to use the Subnetting Generator
            </h2>
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                The calculator page is split into two parts. One side focuses on the live IPv4 or IPv6 calculation.
                The other side lets you build a comparison table and run membership checks.
              </p>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Choose IPv4 or IPv6 at the top of the page.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Enter an address and prefix, then select Calculate. Key values such as network address, first host, last host, and total addresses appear immediately.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Select Add to comparison table to stash that subnet in a study list. You can add IPv4 and IPv6 entries together and compare them side by side.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Use the Host membership check to confirm whether a particular host belongs to a subnet, for example 192.168.10.15 in 192.168.10.0/24.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Next step */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Next step
            </h2>
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-6">
              <p className="text-slate-300 leading-relaxed">
                Ready to practice with real numbers?
                Open the calculator in a new tab and try a few of your own lab networks.
                You can keep this guide alongside it as a reminder of the core ideas.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <span>▶</span>
              <span>Open Subnetting Generator</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print This Page</span>
            </button>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Important notice:</strong> This guide and its companion calculator are provided for learning support and exam preparation.
              They do not perform any live network scanning, do not modify router or firewall settings, and do
              not contact any external service. Always validate addressing plans and security policies against
              your organization's standards and, where appropriate, against recognized frameworks such as
              NIST publications and vendor design guides.
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
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
