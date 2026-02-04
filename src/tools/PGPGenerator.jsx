import React, { useState, useEffect } from 'react';
import { Lock, ArrowLeft, Key, Shield, Download, Copy, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

export default function PGPGenerator() {
  const [activeTab, setActiveTab] = useState('generate');
  const [openpgp, setOpenpgp] = useState(null);
  const [notification, setNotification] = useState('');

  // Generate tab state
  const [genName, setGenName] = useState('');
  const [genEmail, setGenEmail] = useState('');
  const [genPassphrase, setGenPassphrase] = useState('');
  const [genBits, setGenBits] = useState('4096');
  const [genStatus, setGenStatus] = useState({ message: 'Ready to generate a fresh key pair.', type: 'neutral' });
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  // Encrypt tab state
  const [encryptPublicKey, setEncryptPublicKey] = useState('');
  const [encryptMessage, setEncryptMessage] = useState('');
  const [encryptStatus, setEncryptStatus] = useState({ message: 'Paste a public key and a message, then encrypt.', type: 'neutral' });
  const [encryptedMessage, setEncryptedMessage] = useState('');

  // Decrypt tab state
  const [decryptPrivateKey, setDecryptPrivateKey] = useState('');
  const [decryptPassphrase, setDecryptPassphrase] = useState('');
  const [decryptMessage, setDecryptMessage] = useState('');
  const [decryptStatus, setDecryptStatus] = useState({ message: 'Paste your private key, passphrase, and encrypted message to decrypt.', type: 'neutral' });
  const [decryptedMessage, setDecryptedMessage] = useState('');

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // Load OpenPGP.js library
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/openpgp@5.11.1/dist/openpgp.min.js';
    script.async = true;
    script.onload = () => {
      setOpenpgp(window.openpgp);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGenerateKeys = async () => {
    if (!openpgp) {
      setGenStatus({ message: 'OpenPGP library is still loading. Please wait.', type: 'error' });
      return;
    }

    const name = genName.trim() || 'User';
    const email = genEmail.trim() || 'user@example.com';
    const passphrase = genPassphrase;
    const bits = parseInt(genBits, 10) || 4096;

    if (!passphrase) {
      setGenStatus({ message: 'Please choose a passphrase for the private key.', type: 'error' });
      return;
    }

    setGenStatus({ message: 'Generating key pair in your browser. This may take a moment.', type: 'loading' });
    setPublicKey('');
    setPrivateKey('');

    try {
      const userIDs = [{ name, email }];

      const { privateKey: privKey, publicKey: pubKey } = await openpgp.generateKey({
        type: 'rsa',
        rsaBits: bits,
        userIDs,
        passphrase
      });

      setPublicKey(pubKey);
      setPrivateKey(privKey);
      setGenStatus({ message: 'Key pair generated successfully in memory only. Remember to copy and store your keys safely.', type: 'success' });
      showNotification('Key pair generated successfully');
    } catch (err) {
      console.error(err);
      setGenStatus({ message: 'Key generation failed. Check browser performance and try again.', type: 'error' });
      showNotification('Key generation failed');
    }
  };

  const handleClearKeys = () => {
    setPublicKey('');
    setPrivateKey('');
    setGenStatus({ message: 'Outputs cleared. Ready to generate a new key pair.', type: 'success' });
    showNotification('Outputs cleared');
  };

  const handleCopy = async (text, label, setStatus) => {
    try {
      if (!text || !text.trim()) {
        setStatus({ message: `Nothing to copy for ${label}.`, type: 'error' });
        return;
      }
      await navigator.clipboard.writeText(text);
      setStatus({ message: `${label} copied to clipboard.`, type: 'success' });
      showNotification(`${label} copied`);
    } catch (err) {
      console.error(err);
      setStatus({ message: `Could not copy ${label} to clipboard.`, type: 'error' });
      showNotification('Copy failed');
    }
  };

  const handleEncrypt = async () => {
    if (!openpgp) {
      setEncryptStatus({ message: 'OpenPGP library is still loading. Please wait.', type: 'error' });
      return;
    }

    const armoredPublic = encryptPublicKey.trim();
    const messageText = encryptMessage;

    if (!armoredPublic) {
      setEncryptStatus({ message: 'Paste a recipient public key first.', type: 'error' });
      return;
    }
    if (!messageText) {
      setEncryptStatus({ message: 'Type a message to encrypt.', type: 'error' });
      return;
    }

    setEncryptStatus({ message: 'Encrypting message locally.', type: 'loading' });
    setEncryptedMessage('');

    try {
      const publicKeyObj = await openpgp.readKey({ armoredKey: armoredPublic });
      const message = await openpgp.createMessage({ text: messageText });

      const encrypted = await openpgp.encrypt({
        message,
        encryptionKeys: publicKeyObj
      });

      setEncryptedMessage(encrypted);
      setEncryptStatus({ message: 'Message encrypted successfully. Share the ciphertext with your recipient.', type: 'success' });
      showNotification('Message encrypted successfully');
    } catch (err) {
      console.error(err);
      setEncryptStatus({ message: 'Encryption failed. Ensure the public key is valid OpenPGP text.', type: 'error' });
      showNotification('Encryption failed');
    }
  };

  const handleClearEncrypt = () => {
    setEncryptPublicKey('');
    setEncryptMessage('');
    setEncryptedMessage('');
    setEncryptStatus({ message: 'Inputs cleared. Ready for a new encryption task.', type: 'success' });
    showNotification('Inputs cleared');
  };

  const handleDecrypt = async () => {
    if (!openpgp) {
      setDecryptStatus({ message: 'OpenPGP library is still loading. Please wait.', type: 'error' });
      return;
    }

    const armoredPrivate = decryptPrivateKey.trim();
    const passphrase = decryptPassphrase;
    const encryptedText = decryptMessage.trim();

    if (!armoredPrivate) {
      setDecryptStatus({ message: 'Paste your private key first.', type: 'error' });
      return;
    }
    if (!passphrase) {
      setDecryptStatus({ message: 'Enter the passphrase that protects your private key.', type: 'error' });
      return;
    }
    if (!encryptedText) {
      setDecryptStatus({ message: 'Paste an encrypted message to decrypt.', type: 'error' });
      return;
    }

    setDecryptStatus({ message: 'Decrypting message in your browser, using your private key.', type: 'loading' });
    setDecryptedMessage('');

    try {
      const privateKeyObj = await openpgp.readPrivateKey({ armoredKey: armoredPrivate });
      const decryptedKey = await openpgp.decryptKey({ privateKey: privateKeyObj, passphrase });
      const message = await openpgp.readMessage({ armoredMessage: encryptedText });

      const { data } = await openpgp.decrypt({
        message,
        decryptionKeys: decryptedKey
      });

      setDecryptedMessage(data);
      setDecryptStatus({ message: 'Message decrypted successfully in memory only.', type: 'success' });
      showNotification('Message decrypted successfully');
    } catch (err) {
      console.error(err);
      setDecryptStatus({ message: 'Decryption failed. Check your key, passphrase, and ciphertext.', type: 'error' });
      showNotification('Decryption failed');
    }
  };

  const handleClearDecrypt = () => {
    setDecryptPrivateKey('');
    setDecryptPassphrase('');
    setDecryptMessage('');
    setDecryptedMessage('');
    setDecryptStatus({ message: 'Inputs cleared. Ready for another decryption.', type: 'success' });
    showNotification('Inputs cleared');
  };

  const StatusIndicator = ({ status }) => {
    const getStatusIcon = () => {
      if (status.type === 'success') return <CheckCircle className="w-5 h-5 text-green-400" />;
      if (status.type === 'error') return <AlertCircle className="w-5 h-5 text-red-400" />;
      if (status.type === 'loading') return <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />;
      return null;
    };

    const getStatusColor = () => {
      if (status.type === 'success') return 'text-green-400';
      if (status.type === 'error') return 'text-red-400';
      if (status.type === 'loading') return 'text-cyan-400';
      return 'text-slate-400';
    };

    return (
      <div className="flex items-center space-x-2 py-3">
        {getStatusIcon()}
        <span className={`text-sm ${getStatusColor()}`}>{status.message}</span>
      </div>
    );
  };

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
          <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
            <div className="flex items-center space-x-4">
              <Lock className="w-12 h-12 text-cyan-400" />
              <div>
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                    PGP Key Generator & Message Encrypter
                  </h1>
                  <span className="flex items-center space-x-2 bg-cyan-500/10 text-cyan-400 px-4 py-1.5 rounded-full text-sm font-semibold border border-cyan-500/30">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                    <span>Local only PGP toolkit</span>
                  </span>
                </div>
                <p className="text-slate-400 mt-2">
                  Generate OpenPGP key pairs, encrypt messages for others, and decrypt messages sent to you. Everything runs in your browser memory, nothing is uploaded to any server.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap mt-4">
            <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold border border-blue-500/30">
              Client side only
            </span>
            <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold border border-blue-500/30">
              OpenPGP.js
            </span>
            <span className="text-sm text-slate-400">Best suited for personal education, training labs, and small experiments.</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-[0.4fr,1fr] gap-6">
          {/* Sidebar - Action Selection */}
          <aside className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6 h-fit">
            <h2 className="text-xl font-bold text-cyan-400 mb-3">Choose an action</h2>
            <p className="text-sm text-slate-400 mb-6">
              Start by creating a key pair for yourself, then use your public key to receive encrypted messages. 
              Use someone else's public key when you want to send them a private message.
            </p>

            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('generate')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'generate'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                <Key className="w-5 h-5" />
                <span>Generate PGP key pair</span>
              </button>

              <button
                onClick={() => setActiveTab('encrypt')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'encrypt'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                <Shield className="w-5 h-5" />
                <span>Encrypt a message</span>
              </button>

              <button
                onClick={() => setActiveTab('decrypt')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'decrypt'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                <Download className="w-5 h-5" />
                <span>Decrypt a message</span>
              </button>
            </div>
          </aside>

          {/* Main Panel */}
          <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
            {/* Generate Keys Tab */}
            {activeTab === 'generate' && (
              <div>
                <h2 className="text-2xl font-bold text-cyan-400 mb-6">Generate PGP Key Pair</h2>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2 font-semibold">Name (for User ID)</label>
                    <input
                      type="text"
                      value={genName}
                      onChange={(e) => setGenName(e.target.value)}
                      placeholder="Example: Jane Doe"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2 font-semibold">Email (for User ID)</label>
                    <input
                      type="email"
                      value={genEmail}
                      onChange={(e) => setGenEmail(e.target.value)}
                      placeholder="Example: jane@example.com"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2 font-semibold">Key passphrase</label>
                    <input
                      type="password"
                      value={genPassphrase}
                      onChange={(e) => setGenPassphrase(e.target.value)}
                      placeholder="Choose a strong passphrase"
                      autoComplete="new-password"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors"
                    />
                    <p className="text-xs text-slate-500 mt-1">Used to protect your private key. Do not forget this.</p>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2 font-semibold">Key size</label>
                    <select
                      value={genBits}
                      onChange={(e) => setGenBits(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors"
                    >
                      <option value="2048">RSA 2048 bit (faster)</option>
                      <option value="3072">RSA 3072 bit</option>
                      <option value="4096">RSA 4096 bit (stronger, slower)</option>
                    </select>
                    <p className="text-xs text-slate-500 mt-1">Larger keys can take longer to generate in the browser.</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-4">
                  <button
                    onClick={handleGenerateKeys}
                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                  >
                    <Key className="w-5 h-5" />
                    <span>Generate key pair</span>
                  </button>
                  <button
                    onClick={handleClearKeys}
                    className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span>Clear outputs</span>
                  </button>
                </div>

                <StatusIndicator status={genStatus} />

                {/* Public Key Output */}
                <div className="mt-6 bg-slate-950 rounded-xl border border-slate-700 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
                    <span className="text-sm text-slate-400 font-semibold">Public key (share this with others)</span>
                    <button
                      onClick={() => handleCopy(publicKey, 'Public key', setGenStatus)}
                      className="flex items-center space-x-1 text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-slate-300 font-semibold transition-all"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </button>
                  </div>
                  <pre className="p-4 text-xs text-slate-300 font-mono overflow-x-auto max-h-48 whitespace-pre-wrap break-all">
                    {publicKey || 'Public key will appear here after generation'}
                  </pre>
                </div>

                {/* Private Key Output */}
                <div className="mt-4 bg-slate-950 rounded-xl border border-red-700/50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-red-700/50 bg-red-900/10">
                    <span className="text-sm text-red-400 font-semibold">Private key (keep secret, store safely)</span>
                    <button
                      onClick={() => handleCopy(privateKey, 'Private key', setGenStatus)}
                      className="flex items-center space-x-1 text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-slate-300 font-semibold transition-all"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </button>
                  </div>
                  <pre className="p-4 text-xs text-slate-300 font-mono overflow-x-auto max-h-48 whitespace-pre-wrap break-all">
                    {privateKey || 'Private key will appear here after generation'}
                  </pre>
                </div>
              </div>
            )}

            {/* Encrypt Tab */}
            {activeTab === 'encrypt' && (
              <div>
                <h2 className="text-2xl font-bold text-cyan-400 mb-6">Encrypt a Message</h2>

                <div className="space-y-6 mb-6">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2 font-semibold">Recipient public key</label>
                    <textarea
                      value={encryptPublicKey}
                      onChange={(e) => setEncryptPublicKey(e.target.value)}
                      placeholder="Paste the recipient's ASCII armored PGP public key here."
                      rows={8}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 font-mono text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors resize-none"
                    />
                    <p className="text-xs text-slate-500 mt-1">You can paste your own public key or any other OpenPGP compatible public key block.</p>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2 font-semibold">Message to encrypt</label>
                    <textarea
                      value={encryptMessage}
                      onChange={(e) => setEncryptMessage(e.target.value)}
                      placeholder="Write or paste the message you want to encrypt."
                      rows={6}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors resize-none"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-4">
                  <button
                    onClick={handleEncrypt}
                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                  >
                    <Shield className="w-5 h-5" />
                    <span>Encrypt message</span>
                  </button>
                  <button
                    onClick={handleClearEncrypt}
                    className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span>Clear</span>
                  </button>
                </div>

                <StatusIndicator status={encryptStatus} />

                {/* Encrypted Message Output */}
                <div className="mt-6 bg-slate-950 rounded-xl border border-slate-700 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
                    <span className="text-sm text-slate-400 font-semibold">Encrypted message</span>
                    <button
                      onClick={() => handleCopy(encryptedMessage, 'Encrypted message', setEncryptStatus)}
                      className="flex items-center space-x-1 text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-slate-300 font-semibold transition-all"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </button>
                  </div>
                  <pre className="p-4 text-xs text-slate-300 font-mono overflow-x-auto max-h-64 whitespace-pre-wrap break-all">
                    {encryptedMessage || 'Encrypted message will appear here'}
                  </pre>
                </div>
              </div>
            )}

            {/* Decrypt Tab */}
            {activeTab === 'decrypt' && (
              <div>
                <h2 className="text-2xl font-bold text-cyan-400 mb-6">Decrypt a Message</h2>

                <div className="space-y-6 mb-6">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2 font-semibold">Your private key</label>
                    <textarea
                      value={decryptPrivateKey}
                      onChange={(e) => setDecryptPrivateKey(e.target.value)}
                      placeholder="Paste your ASCII armored PGP private key here."
                      rows={8}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 font-mono text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors resize-none"
                    />
                    <p className="text-xs text-slate-500 mt-1">This never leaves your browser and is only held in memory for this session.</p>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2 font-semibold">Private key passphrase</label>
                    <input
                      type="password"
                      value={decryptPassphrase}
                      onChange={(e) => setDecryptPassphrase(e.target.value)}
                      placeholder="Passphrase used when the key was created"
                      autoComplete="current-password"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2 font-semibold">Encrypted message</label>
                    <textarea
                      value={decryptMessage}
                      onChange={(e) => setDecryptMessage(e.target.value)}
                      placeholder="Paste the encrypted PGP message here."
                      rows={8}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 font-mono text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors resize-none"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-4">
                  <button
                    onClick={handleDecrypt}
                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                  >
                    <Download className="w-5 h-5" />
                    <span>Decrypt message</span>
                  </button>
                  <button
                    onClick={handleClearDecrypt}
                    className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span>Clear</span>
                  </button>
                </div>

                <StatusIndicator status={decryptStatus} />

                {/* Decrypted Message Output */}
                <div className="mt-6 bg-slate-950 rounded-xl border border-slate-700 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
                    <span className="text-sm text-slate-400 font-semibold">Decrypted message</span>
                    <button
                      onClick={() => handleCopy(decryptedMessage, 'Decrypted message', setDecryptStatus)}
                      className="flex items-center space-x-1 text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-slate-300 font-semibold transition-all"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </button>
                  </div>
                  <pre className="p-4 text-xs text-slate-300 overflow-x-auto max-h-64 whitespace-pre-wrap break-all">
                    {decryptedMessage || 'Decrypted message will appear here'}
                  </pre>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Legal Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-6">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Legal Disclaimer:</strong> This PGP Key Generator & Message Encrypter is provided for educational purposes, personal communication security, and training.
            All cryptographic operations run entirely in your browser using OpenPGP.js. No keys, messages, or passphrases are transmitted to any server or stored anywhere except your browser's memory during the session.
            Results are provided without warranty. For production or high-security environments, consider using established GPG/PGP clients with proper key management practices.
          </p>
        </div>

        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-12">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Important Security Notice:</strong> Store your private keys securely offline. Never share your private key or passphrase with anyone.
            This tool uses OpenPGP.js v5.11.1 loaded from a CDN. Browser-based cryptography is convenient but may not meet all security requirements for sensitive operations.
            For critical security needs, use dedicated PGP software like GnuPG running on a secure, offline system. Always verify the authenticity of public keys before encrypting sensitive information.
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
            <p className="text-slate-600">All cryptographic operations happen in your browser. No data is transmitted.</p>
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
