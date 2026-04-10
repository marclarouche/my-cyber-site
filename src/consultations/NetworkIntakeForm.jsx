import { useState } from 'react';
import { ArrowLeft, AlertTriangle, Info, CheckCircle, Send } from 'lucide-react';

const initialForm = {
  firstName: '', lastName: '', email: '', phone: '', address: '',
  isp: '', connectionType: '', downloadSpeed: '', routerOwnership: '', routerModel: '',
  meshNetwork: '', totalDevices: '', cameras: '', guestNetwork: '', nas: '', vpnCurrent: '',
  iotDevices: [],
  serviceInterest: '', additionalNotes: '',
};

const iotOptions = [
  'Smart speakers (Amazon Echo, Google Home, Apple HomePod)',
  'Smart lighting (Philips Hue, Lutron, etc.)',
  'Smart thermostat (Nest, Ecobee, etc.)',
  'Smart TV or streaming devices',
  'Smart appliances (fridge, washer, dishwasher, etc.)',
  'Smart locks or doorbell (Ring, Schlage, etc.)',
  'Home automation hub (SmartThings, Home Assistant, Hubitat)',
  'Other IoT devices not listed',
];

function FieldLabel({ children, hint }) {
  return (
    <div className="mb-1.5">
      <label className="text-sm font-medium text-slate-300">{children}</label>
      {hint && <p className="text-xs text-slate-500 mt-0.5">{hint}</p>}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
    />
  );
}

function Select({ value, onChange, options, placeholder }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors appearance-none"
    >
      <option value="">{placeholder || '— select one —'}</option>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

function Alert({ type, children }) {
  const styles = {
    warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300',
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
  };
  const Icon = type === 'warning' ? AlertTriangle : Info;
  return (
    <div className={`flex items-start gap-3 mt-3 p-3 rounded-lg border text-xs leading-relaxed ${styles[type]}`}>
      <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" />
      {children}
    </div>
  );
}

export default function NetworkIntakeForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));
  const toggleIot = (item) => setForm(f => ({
    ...f,
    iotDevices: f.iotDevices.includes(item)
      ? f.iotDevices.filter(i => i !== item)
      : [...f.iotDevices, item],
  }));

  const handleSubmit = () => {
    if (!form.firstName || !form.email || !form.serviceInterest) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold mb-3">We received your assessment</h2>
          <p className="text-slate-400 leading-relaxed mb-6">
            Thank you for completing the network assessment form. We'll review your setup details and reach out within one business day to discuss your options and answer any questions.
          </p>
          <a href="https://cyberlifecoach.pro" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
            Return to CyberLifeCoach.pro
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/home-network-privacy" className="flex items-center space-x-3 group cursor-pointer">
              <img src="/logo.png" alt="CyberLifeCoach" className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">CyberLifeCoach</span>
            </a>
            <button onClick={() => window.location.href = '/home-network-privacy'}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-all duration-300 border border-slate-700 hover:border-cyan-500">
              <ArrowLeft className="w-4 h-4" /><span>Back to Home Network Privacy</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-10 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="relative max-w-3xl mx-auto">
          <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 mb-4 inline-block">Pre-Installation Questionnaire</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Network Assessment Form
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Please complete this form before booking. It helps us understand your home network, provide an accurate quote, and flag anything that may require a consultation before installation. This typically takes 3–5 minutes.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto space-y-8">

          {/* Contact */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-6">Your Contact Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><FieldLabel>First name</FieldLabel><Input value={form.firstName} onChange={set('firstName')} placeholder="Jane" /></div>
                <div><FieldLabel>Last name</FieldLabel><Input value={form.lastName} onChange={set('lastName')} placeholder="Smith" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><FieldLabel>Email address</FieldLabel><Input value={form.email} onChange={set('email')} type="email" placeholder="jane@example.com" /></div>
                <div><FieldLabel>Phone number</FieldLabel><Input value={form.phone} onChange={set('phone')} placeholder="(555) 555-5555" /></div>
              </div>
              <div><FieldLabel>Service address</FieldLabel><Input value={form.address} onChange={set('address')} placeholder="123 Main St, City, State" /></div>
            </div>
          </div>

          {/* Internet Service */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-6">Internet Service</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><FieldLabel>Internet service provider (ISP)</FieldLabel><Input value={form.isp} onChange={set('isp')} placeholder="e.g. Spectrum, AT&T, Comcast" /></div>
                <div>
                  <FieldLabel>Connection type</FieldLabel>
                  <Select value={form.connectionType} onChange={set('connectionType')} options={[
                    {value:'fiber',label:'Fiber optic'},{value:'cable',label:'Cable'},
                    {value:'5g',label:'5G home internet'},{value:'dsl',label:'DSL'},
                    {value:'satellite',label:'Satellite'},{value:'unsure',label:'Not sure'},
                  ]} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel>Approximate download speed</FieldLabel>
                  <Select value={form.downloadSpeed} onChange={set('downloadSpeed')} options={[
                    {value:'under100',label:'Under 100 Mbps'},{value:'100to500',label:'100–500 Mbps'},
                    {value:'500to1g',label:'500 Mbps–1 Gbps'},{value:'over1g',label:'Over 1 Gbps'},
                    {value:'unsure',label:'Not sure'},
                  ]} />
                </div>
                <div>
                  <FieldLabel>Router/gateway ownership</FieldLabel>
                  <Select value={form.routerOwnership} onChange={set('routerOwnership')} options={[
                    {value:'own',label:'I own my router'},{value:'isp',label:'Rented/provided by ISP'},
                    {value:'both',label:'ISP gateway + my own router'},{value:'unsure',label:'Not sure'},
                  ]} />
                </div>
              </div>
              <div>
                <FieldLabel hint={'Check the label on the bottom or back of your router. E.g. "Netgear Nighthawk RAX50" or "Arris SBG8300"'}>Router/gateway make and model</FieldLabel>
                <Input value={form.routerModel} onChange={set('routerModel')} placeholder="e.g. Netgear Nighthawk RAX50" />
              </div>
              <div>
                <FieldLabel>Do you have a mesh network or multiple access points?</FieldLabel>
                <Select value={form.meshNetwork} onChange={set('meshNetwork')} options={[
                  {value:'no',label:'No — single router only'},
                  {value:'mesh',label:'Yes — mesh system (e.g. Eero, Orbi, Google Nest)'},
                  {value:'aps',label:'Yes — separate access points'},
                  {value:'unsure',label:'Not sure'},
                ]} />
                {(form.meshNetwork === 'mesh' || form.meshNetwork === 'aps') && (
                  <Alert type="warning">Mesh systems and multi-access-point networks require additional DNS configuration and may extend installation time. We will confirm compatibility during your consultation.</Alert>
                )}
              </div>
            </div>
          </div>

          {/* Devices */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-6">Devices on Your Network</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel hint="Phones, laptops, tablets, TVs, consoles, smart speakers, etc.">Total number of devices</FieldLabel>
                  <Select value={form.totalDevices} onChange={set('totalDevices')} options={[
                    {value:'1-10',label:'1–10 devices'},{value:'11-25',label:'11–25 devices'},
                    {value:'26-50',label:'26–50 devices'},{value:'50+',label:'More than 50 devices'},
                  ]} />
                </div>
                <div>
                  <FieldLabel hint="Include indoor, outdoor, and doorbell cameras">Number of security cameras</FieldLabel>
                  <Select value={form.cameras} onChange={set('cameras')} options={[
                    {value:'none',label:'None'},{value:'1-5',label:'1–5 cameras'},
                    {value:'6-10',label:'6–10 cameras'},{value:'11-19',label:'11–19 cameras'},
                    {value:'20+',label:'20 or more cameras'},
                  ]} />
                </div>
              </div>

              <div>
                <FieldLabel hint="Select all that apply">IoT and smart home devices</FieldLabel>
                <div className="mt-2 space-y-2">
                  {iotOptions.map(opt => (
                    <label key={opt} className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-700 hover:border-slate-600 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={form.iotDevices.includes(opt)}
                        onChange={() => toggleIot(opt)}
                        className="accent-cyan-500"
                      />
                      <span className="text-sm text-slate-300">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <FieldLabel>Do you have a guest network enabled?</FieldLabel>
                <Select value={form.guestNetwork} onChange={set('guestNetwork')} options={[
                  {value:'yes',label:'Yes'},{value:'no',label:'No'},{value:'unsure',label:'Not sure'},
                ]} />
                {form.guestNetwork === 'yes' && (
                  <Alert type="info">Guest networks require separate DNS configuration to route through Pi-hole. We will handle this during installation.</Alert>
                )}
              </div>

              <div>
                <FieldLabel>Do you have a NAS, home server, or network-attached storage?</FieldLabel>
                <Select value={form.nas} onChange={set('nas')} options={[
                  {value:'yes',label:'Yes'},{value:'no',label:'No'},
                ]} />
              </div>

              <div>
                <FieldLabel>Do you use a VPN service currently?</FieldLabel>
                <Select value={form.vpnCurrent} onChange={set('vpnCurrent')} options={[
                  {value:'commercial',label:'Yes — commercial VPN (NordVPN, ExpressVPN, etc.)'},
                  {value:'work',label:'Yes — work/corporate VPN'},
                  {value:'no',label:'No'},
                ]} />
                {(form.vpnCurrent === 'commercial' || form.vpnCurrent === 'work') && (
                  <Alert type="info">Existing VPN configurations may interact with Pi-hole DNS settings. We will assess compatibility and adjust the setup accordingly.</Alert>
                )}
              </div>
            </div>
          </div>

          {/* Service Interest */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-6">Service Interest</h2>
            <div className="space-y-4">
              <div>
                <FieldLabel>Which service are you interested in?</FieldLabel>
                <Select value={form.serviceInterest} onChange={set('serviceInterest')} options={[
                  {value:'pihole',label:'Pi-hole — Network Ad Blocking ($275)'},
                  {value:'pihole-vpn',label:'Pi-hole + WireGuard VPN ($425)'},
                  {value:'unsure',label:'Not sure yet — I want a consultation first'},
                ]} />
              </div>
              <div>
                <FieldLabel hint="Anything else we should know about your setup, concerns, or questions">Additional notes</FieldLabel>
                <textarea
                  value={form.additionalNotes}
                  onChange={set('additionalNotes')}
                  placeholder="Optional — anything else you'd like us to know..."
                  rows={4}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!form.firstName || !form.email || !form.serviceInterest}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-[1.01] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            <Send className="w-5 h-5" />
            Submit Network Assessment
          </button>
          <p className="text-xs text-slate-500 text-center">We'll review your submission and follow up within one business day.</p>
        </div>
      </section>

      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/logo.png" alt="CyberLifeCoach" className="h-8 w-auto hover:scale-125 hover:brightness-125 transition-all duration-300" />
            <span className="font-bold text-lg hover:text-cyan-400 transition-all duration-300">CyberLifeCoach</span>
          </div>
          <div className="text-slate-500 text-sm">
            <p>&copy; 2026 CyberLifeCoach</p>
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
