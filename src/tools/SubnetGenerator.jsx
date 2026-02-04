import React, { useState, useEffect } from 'react';
import { Network, ArrowLeft, Calculator, Plus, CheckCircle, AlertCircle } from 'lucide-react';

export default function SubnetGenerator() {
  const [mode, setMode] = useState('ipv4');
  const [notification, setNotification] = useState('');

  // IPv4 state
  const [ipv4Address, setIpv4Address] = useState('');
  const [ipv4Prefix, setIpv4Prefix] = useState('24');
  const [ipv4Mask, setIpv4Mask] = useState('');
  const [ipv4Output, setIpv4Output] = useState(null);
  const [ipv4Error, setIpv4Error] = useState('');

  // IPv6 state
  const [ipv6Address, setIpv6Address] = useState('');
  const [ipv6Prefix, setIpv6Prefix] = useState('64');
  const [ipv6Output, setIpv6Output] = useState(null);
  const [ipv6Error, setIpv6Error] = useState('');

  // Comparison table
  const [comparisonTable, setComparisonTable] = useState([]);

  // Membership check
  const [membershipHost, setMembershipHost] = useState('');
  const [membershipSubnet, setMembershipSubnet] = useState('');
  const [membershipResult, setMembershipResult] = useState('');
  const [membershipError, setMembershipError] = useState('');

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // IPv4 subnet mask calculation
  const calculateSubnetMask = (prefix) => {
    const prefixNum = parseInt(prefix, 10);
    if (prefixNum < 0 || prefixNum > 32) return '';
    
    const mask = [];
    for (let i = 0; i < 4; i++) {
      const bits = Math.min(Math.max(prefixNum - (i * 8), 0), 8);
      const octet = (0xFF << (8 - bits)) & 0xFF;
      mask.push(octet);
    }
    return mask.join('.');
  };

  // Update mask when prefix changes
  useEffect(() => {
    const mask = calculateSubnetMask(ipv4Prefix);
    setIpv4Mask(mask);
  }, [ipv4Prefix]);

  // IPv4 calculations
  const calculateIPv4 = () => {
    setIpv4Error('');
    setIpv4Output(null);

    const address = ipv4Address.trim();
    const prefix = parseInt(ipv4Prefix, 10);

    if (!address) {
      setIpv4Error('Please enter an IPv4 address');
      return;
    }

    // Validate IPv4 address
    const octets = address.split('.');
    if (octets.length !== 4 || !octets.every(o => {
      const num = parseInt(o, 10);
      return !isNaN(num) && num >= 0 && num <= 255;
    })) {
      setIpv4Error('Invalid IPv4 address format');
      return;
    }

    if (prefix < 0 || prefix > 32) {
      setIpv4Error('Prefix must be between 0 and 32');
      return;
    }

    try {
      // Convert address to 32-bit integer
      const ipInt = octets.reduce((acc, octet) => (acc << 8) | parseInt(octet, 10), 0) >>> 0;
      
      // Calculate network mask
      const mask = prefix === 0 ? 0 : ((0xFFFFFFFF << (32 - prefix)) >>> 0);
      
      // Network address
      const networkInt = (ipInt & mask) >>> 0;
      
      // Broadcast address
      const broadcastInt = (networkInt | (~mask >>> 0)) >>> 0;
      
      // First and last host
      const firstHostInt = prefix === 32 ? networkInt : (networkInt + 1) >>> 0;
      const lastHostInt = prefix === 32 ? networkInt : (broadcastInt - 1) >>> 0;
      
      // Wildcard mask
      const wildcardInt = (~mask >>> 0);
      
      // Total addresses and usable hosts
      const totalAddresses = prefix === 32 ? 1 : Math.pow(2, 32 - prefix);
      const usableHosts = prefix === 32 ? 1 : prefix === 31 ? 2 : Math.max(0, totalAddresses - 2);
      
      // Convert integers back to dotted decimal
      const intToIP = (int) => [
        (int >>> 24) & 0xFF,
        (int >>> 16) & 0xFF,
        (int >>> 8) & 0xFF,
        int & 0xFF
      ].join('.');

      // Binary mask representation
      const maskBinary = octets.map((_, i) => {
        const bits = Math.min(Math.max(prefix - (i * 8), 0), 8);
        return '1'.repeat(bits) + '0'.repeat(8 - bits);
      }).join('.');

      setIpv4Output({
        network: intToIP(networkInt),
        broadcast: intToIP(broadcastInt),
        firstHost: intToIP(firstHostInt),
        lastHost: intToIP(lastHostInt),
        wildcardMask: intToIP(wildcardInt),
        totalAddresses: totalAddresses.toLocaleString(),
        usableHosts: usableHosts.toLocaleString(),
        binaryMask: maskBinary,
        prefix
      });

      showNotification('IPv4 subnet calculated');
    } catch (err) {
      console.error(err);
      setIpv4Error('Calculation failed. Please check your input.');
    }
  };

  // IPv6 helper functions
  const expandIPv6 = (address) => {
    // Remove leading zeros and expand ::
    const parts = address.split('::');
    const left = parts[0] ? parts[0].split(':') : [];
    const right = parts[1] ? parts[1].split(':') : [];
    
    const missingParts = 8 - left.length - right.length;
    const middle = Array(missingParts).fill('0000');
    
    const allParts = [...left, ...middle, ...right];
    return allParts.map(p => p.padStart(4, '0')).join(':');
  };

  const ipv6ToBigInt = (address) => {
    const expanded = expandIPv6(address);
    const parts = expanded.split(':');
    let result = BigInt(0);
    
    for (let i = 0; i < parts.length; i++) {
      result = (result << BigInt(16)) | BigInt(parseInt(parts[i], 16));
    }
    return result;
  };

  const bigIntToIPv6 = (int) => {
    const parts = [];
    for (let i = 0; i < 8; i++) {
      parts.unshift((int & BigInt(0xFFFF)).toString(16).padStart(4, '0'));
      int = int >> BigInt(16);
    }
    return parts.join(':');
  };

  // IPv6 calculations
  const calculateIPv6 = () => {
    setIpv6Error('');
    setIpv6Output(null);

    const address = ipv6Address.trim();
    const prefix = parseInt(ipv6Prefix, 10);

    if (!address) {
      setIpv6Error('Please enter an IPv6 address');
      return;
    }

    if (prefix < 0 || prefix > 128) {
      setIpv6Error('Prefix must be between 0 and 128');
      return;
    }

    try {
      // Validate and expand IPv6 address
      const expanded = expandIPv6(address);
      
      // Convert to BigInt
      const ipInt = ipv6ToBigInt(address);
      
      // Calculate network mask
      const mask = prefix === 0 ? BigInt(0) : ((BigInt(2) ** BigInt(128) - BigInt(1)) << BigInt(128 - prefix));
      
      // Network address
      const networkInt = ipInt & mask;
      
      // Last address in subnet
      const lastInt = networkInt | ((BigInt(2) ** BigInt(128 - prefix)) - BigInt(1));
      
      // First address
      const firstInt = networkInt + BigInt(1);
      
      // Address space
      const addressSpace = BigInt(2) ** BigInt(128 - prefix);
      const addressSpaceStr = addressSpace < BigInt(1e15) 
        ? addressSpace.toLocaleString() 
        : `2^${128 - prefix}`;

      setIpv6Output({
        network: bigIntToIPv6(networkInt),
        firstAddress: bigIntToIPv6(firstInt),
        lastAddress: bigIntToIPv6(lastInt),
        addressSpace: addressSpaceStr,
        expanded: expanded,
        prefix
      });

      showNotification('IPv6 subnet calculated');
    } catch (err) {
      console.error(err);
      setIpv6Error('Invalid IPv6 address format or calculation failed');
    }
  };

  // Add to comparison table
  const addIPv4ToTable = () => {
    if (!ipv4Output) {
      showNotification('Calculate subnet first');
      return;
    }

    const entry = {
      version: 'IPv4',
      network: `${ipv4Output.network}/${ipv4Output.prefix}`,
      range: `${ipv4Output.firstHost} - ${ipv4Output.lastHost}`,
      size: ipv4Output.usableHosts
    };

    setComparisonTable([...comparisonTable, entry]);
    showNotification('Added to comparison table');
  };

  const addIPv6ToTable = () => {
    if (!ipv6Output) {
      showNotification('Calculate subnet first');
      return;
    }

    const entry = {
      version: 'IPv6',
      network: `${ipv6Output.network}/${ipv6Output.prefix}`,
      range: `${ipv6Output.firstAddress} - ${ipv6Output.lastAddress}`,
      size: ipv6Output.addressSpace
    };

    setComparisonTable([...comparisonTable, entry]);
    showNotification('Added to comparison table');
  };

  // Membership check
  const checkMembership = () => {
    setMembershipError('');
    setMembershipResult('');

    const host = membershipHost.trim();
    const subnet = membershipSubnet.trim();

    if (!host || !subnet) {
      setMembershipError('Please provide both a host address and a subnet (CIDR)');
      return;
    }

    try {
      // Determine if IPv4 or IPv6
      if (subnet.includes(':')) {
        // IPv6 check
        const [subnetAddr, prefixStr] = subnet.split('/');
        const prefix = parseInt(prefixStr, 10);
        
        const hostInt = ipv6ToBigInt(host);
        const subnetInt = ipv6ToBigInt(subnetAddr);
        const mask = prefix === 0 ? BigInt(0) : ((BigInt(2) ** BigInt(128) - BigInt(1)) << BigInt(128 - prefix));
        
        const isInSubnet = (hostInt & mask) === (subnetInt & mask);
        setMembershipResult(isInSubnet 
          ? '✅ The host IS part of the subnet.' 
          : '❌ The host is NOT part of the subnet.');
      } else {
        // IPv4 check
        const [subnetAddr, prefixStr] = subnet.split('/');
        const prefix = parseInt(prefixStr, 10);
        
        const hostOctets = host.split('.').map(Number);
        const subnetOctets = subnetAddr.split('.').map(Number);
        
        if (hostOctets.length !== 4 || subnetOctets.length !== 4) {
          throw new Error('Invalid IP format');
        }
        
        const hostInt = hostOctets.reduce((acc, o) => (acc << 8) | o, 0) >>> 0;
        const subnetInt = subnetOctets.reduce((acc, o) => (acc << 8) | o, 0) >>> 0;
        const mask = prefix === 0 ? 0 : ((0xFFFFFFFF << (32 - prefix)) >>> 0);
        
        const isInSubnet = (hostInt & mask) === (subnetInt & mask);
        setMembershipResult(isInSubnet 
          ? '✅ The host IS part of the subnet.' 
          : '❌ The host is NOT part of the subnet.');
      }
    } catch (err) {
      console.error(err);
      setMembershipError('Invalid host or subnet format');
    }
  };

  // Generate prefix options for IPv4
  const ipv4PrefixOptions = Array.from({ length: 33 }, (_, i) => i);

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
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <Network className="w-12 h-12 text-cyan-400" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Subnetting Generator
              </h1>
              <p className="text-slate-400 mt-2">
                Learn and practice subnetting without sending any IP addresses to a server. This calculator runs entirely in your browser
                and supports IPv4 and IPv6, including quick comparison of multiple subnets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mode Toggle */}
      <section className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex space-x-3 bg-slate-900 p-2 rounded-xl border border-slate-700 w-fit">
          <button
            onClick={() => setMode('ipv4')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              mode === 'ipv4'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <div>IPv4</div>
            <div className="text-xs opacity-75">students and exams</div>
          </button>
          <button
            onClick={() => setMode('ipv6')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              mode === 'ipv6'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <div>IPv6</div>
            <div className="text-xs opacity-75">modern networks</div>
          </button>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Calculators */}
          <div className="space-y-6">
            {/* IPv4 Calculator */}
            {mode === 'ipv4' && (
              <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-cyan-400 mb-2">IPv4 subnet calculator</h2>
                    <p className="text-sm text-slate-400">Enter an address and prefix, then review the key values used in exams and real networks.</p>
                  </div>
                  <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold border border-blue-500/30 whitespace-nowrap">
                    /0 to /32
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2 font-semibold">IPv4 address</label>
                    <input
                      type="text"
                      value={ipv4Address}
                      onChange={(e) => setIpv4Address(e.target.value)}
                      placeholder="192.168.10.35"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 font-mono focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2 font-semibold">Prefix length</label>
                    <select
                      value={ipv4Prefix}
                      onChange={(e) => setIpv4Prefix(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors"
                    >
                      {ipv4PrefixOptions.map(p => (
                        <option key={p} value={p}>/{p}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2 font-semibold">Subnet mask</label>
                    <input
                      type="text"
                      value={ipv4Mask}
                      readOnly
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-4">
                  <button
                    onClick={calculateIPv4}
                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                  >
                    <Calculator className="w-5 h-5" />
                    <span>Calculate subnet</span>
                  </button>
                  <button
                    onClick={addIPv4ToTable}
                    className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add to comparison table</span>
                  </button>
                </div>

                {ipv4Error && (
                  <div className="flex items-center space-x-2 text-red-400 mb-4">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm">{ipv4Error}</span>
                  </div>
                )}

                {ipv4Output && (
                  <div className="grid md:grid-cols-2 gap-3 mb-4">
                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                      <div className="text-xs text-cyan-400 font-semibold mb-1">Network address</div>
                      <div className="text-lg font-mono text-cyan-300">{ipv4Output.network}</div>
                    </div>
                    <div className="bg-slate-950 border border-slate-700 rounded-lg p-4">
                      <div className="text-xs text-slate-400 font-semibold mb-1">Broadcast</div>
                      <div className="text-lg font-mono text-slate-300">{ipv4Output.broadcast}</div>
                    </div>
                    <div className="bg-slate-950 border border-slate-700 rounded-lg p-4">
                      <div className="text-xs text-slate-400 font-semibold mb-1">First host</div>
                      <div className="text-lg font-mono text-slate-300">{ipv4Output.firstHost}</div>
                    </div>
                    <div className="bg-slate-950 border border-slate-700 rounded-lg p-4">
                      <div className="text-xs text-slate-400 font-semibold mb-1">Last host</div>
                      <div className="text-lg font-mono text-slate-300">{ipv4Output.lastHost}</div>
                    </div>
                    <div className="bg-slate-950 border border-slate-700 rounded-lg p-4">
                      <div className="text-xs text-slate-400 font-semibold mb-1">Wildcard mask</div>
                      <div className="text-lg font-mono text-slate-300">{ipv4Output.wildcardMask}</div>
                    </div>
                    <div className="bg-slate-950 border border-slate-700 rounded-lg p-4">
                      <div className="text-xs text-slate-400 font-semibold mb-1">Total addresses</div>
                      <div className="text-lg font-mono text-slate-300">{ipv4Output.totalAddresses}</div>
                    </div>
                    <div className="bg-slate-950 border border-slate-700 rounded-lg p-4">
                      <div className="text-xs text-slate-400 font-semibold mb-1">Usable hosts</div>
                      <div className="text-lg font-mono text-slate-300">{ipv4Output.usableHosts}</div>
                    </div>
                    <div className="bg-slate-950 border border-slate-700 rounded-lg p-4 md:col-span-2">
                      <div className="text-xs text-slate-400 font-semibold mb-1">Binary mask</div>
                      <div className="text-sm font-mono text-slate-300 break-all">{ipv4Output.binaryMask}</div>
                    </div>
                  </div>
                )}

                <p className="text-xs text-slate-500">
                  <strong>Tip for exam practice.</strong> Try changing the prefix length and watch how the network,
                  broadcast and host counts react.
                </p>
              </section>
            )}

            {/* IPv6 Calculator */}
            {mode === 'ipv6' && (
              <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-cyan-400 mb-2">IPv6 subnet calculator</h2>
                    <p className="text-sm text-slate-400">Work with IPv6 prefixes and see the expanded network range for learning and design.</p>
                  </div>
                  <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold border border-blue-500/30 whitespace-nowrap">
                    /0 to /128
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2 font-semibold">IPv6 address</label>
                    <input
                      type="text"
                      value={ipv6Address}
                      onChange={(e) => setIpv6Address(e.target.value)}
                      placeholder="2001:db8:1234::1"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 font-mono focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2 font-semibold">Prefix length</label>
                    <input
                      type="number"
                      min="0"
                      max="128"
                      value={ipv6Prefix}
                      onChange={(e) => setIpv6Prefix(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-4">
                  <button
                    onClick={calculateIPv6}
                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                  >
                    <Calculator className="w-5 h-5" />
                    <span>Calculate subnet</span>
                  </button>
                  <button
                    onClick={addIPv6ToTable}
                    className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add to comparison table</span>
                  </button>
                </div>

                {ipv6Error && (
                  <div className="flex items-center space-x-2 text-red-400 mb-4">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm">{ipv6Error}</span>
                  </div>
                )}

                {ipv6Output && (
                  <div className="grid md:grid-cols-2 gap-3 mb-4">
                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 md:col-span-2">
                      <div className="text-xs text-cyan-400 font-semibold mb-1">Network prefix</div>
                      <div className="text-base font-mono text-cyan-300 break-all">{ipv6Output.network}</div>
                    </div>
                    <div className="bg-slate-950 border border-slate-700 rounded-lg p-4">
                      <div className="text-xs text-slate-400 font-semibold mb-1">First address</div>
                      <div className="text-sm font-mono text-slate-300 break-all">{ipv6Output.firstAddress}</div>
                    </div>
                    <div className="bg-slate-950 border border-slate-700 rounded-lg p-4">
                      <div className="text-xs text-slate-400 font-semibold mb-1">Last address</div>
                      <div className="text-sm font-mono text-slate-300 break-all">{ipv6Output.lastAddress}</div>
                    </div>
                    <div className="bg-slate-950 border border-slate-700 rounded-lg p-4">
                      <div className="text-xs text-slate-400 font-semibold mb-1">Address space</div>
                      <div className="text-lg font-mono text-slate-300">{ipv6Output.addressSpace}</div>
                    </div>
                    <div className="bg-slate-950 border border-slate-700 rounded-lg p-4 md:col-span-2">
                      <div className="text-xs text-slate-400 font-semibold mb-1">Expanded form</div>
                      <div className="text-sm font-mono text-slate-300 break-all">{ipv6Output.expanded}</div>
                    </div>
                  </div>
                )}

                <p className="text-xs text-slate-500">
                  For IPv6 the address space is enormous. This tool shows the prefix in fully expanded
                  eight block form to make subnet boundaries easier to see.
                </p>
              </section>
            )}
          </div>

          {/* Right Column - Comparison & Membership */}
          <div className="space-y-6">
            {/* Subnet Comparison */}
            <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-cyan-400 mb-2">Subnet comparison</h2>
                <p className="text-sm text-slate-400">Build a small study table of IPv4 and IPv6 subnets to compare ranges and sizes.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left p-3 text-xs font-semibold text-slate-400">Version</th>
                      <th className="text-left p-3 text-xs font-semibold text-slate-400">Network / Prefix</th>
                      <th className="text-left p-3 text-xs font-semibold text-slate-400">Range</th>
                      <th className="text-left p-3 text-xs font-semibold text-slate-400">Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonTable.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-6 text-center text-slate-500 text-sm">
                          No subnets added yet. Calculate a subnet and click "Add to comparison table".
                        </td>
                      </tr>
                    ) : (
                      comparisonTable.map((entry, idx) => (
                        <tr key={idx} className="border-b border-slate-700 hover:bg-slate-800/50">
                          <td className="p-3 text-sm">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              entry.version === 'IPv4' 
                                ? 'bg-blue-500/10 text-blue-400' 
                                : 'bg-purple-500/10 text-purple-400'
                            }`}>
                              {entry.version}
                            </span>
                          </td>
                          <td className="p-3 text-sm font-mono text-slate-300">{entry.network}</td>
                          <td className="p-3 text-xs font-mono text-slate-400 break-all">{entry.range}</td>
                          <td className="p-3 text-sm text-slate-300">{entry.size}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-slate-500 mt-4">
                Use this table to test overlap or summarise an addressing plan. All values stay in your browser.
              </p>
            </section>

            {/* Host Membership Check */}
            <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-cyan-400 mb-2">Host membership check</h2>
                <p className="text-sm text-slate-400">Quickly see whether a host address belongs to a given subnet.</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-slate-400 mb-2 font-semibold">Host address</label>
                  <input
                    type="text"
                    value={membershipHost}
                    onChange={(e) => setMembershipHost(e.target.value)}
                    placeholder="192.168.10.15 or 2001:db8::10"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 font-mono focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2 font-semibold">Subnet (CIDR)</label>
                  <input
                    type="text"
                    value={membershipSubnet}
                    onChange={(e) => setMembershipSubnet(e.target.value)}
                    placeholder="192.168.10.0/24 or 2001:db8::/64"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 font-mono focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors"
                  />
                </div>
              </div>

              <button
                onClick={checkMembership}
                className="w-full px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 mb-4"
              >
                Check membership
              </button>

              {membershipError && (
                <div className="flex items-center space-x-2 text-red-400 mb-4">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{membershipError}</span>
                </div>
              )}

              {membershipResult && (
                <div className="bg-slate-950 border border-slate-700 rounded-lg p-4">
                  <p className="text-slate-300">{membershipResult}</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* Legal Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-6">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Legal Disclaimer:</strong> This Subnetting Generator is an educational visualization tool.
            All calculations run locally in your browser and no IP addresses, prefixes or results are transmitted to CyberLife Coach
            or to any third-party service. The calculator does not change your network configuration.
            Results are provided without warranty and should always be verified before use in production environments or exam scenarios.
          </p>
        </div>

        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-12">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Educational Resource:</strong> Want a gentle walkthrough of subnetting before using the calculator?
            This tool is designed for learning and practice. For production network planning, always consult with network professionals
            and use enterprise-grade IP address management (IPAM) tools. Practice with different prefix lengths to understand how subnet sizes change.
          </p>
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
            <p className="text-slate-600">All calculations happen in your browser. No data is transmitted.</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg shadow-cyan-500/50 animate-fade-in z-50">
          {notification}
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
