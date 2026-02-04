import React, { useState } from 'react';
import { Eye, ArrowLeft, Globe, Code, Target, Users, Shield, AlertTriangle } from 'lucide-react';

export default function TrackerSimulator() {
  const [activeTab, setActiveTab] = useState('url');
  const [urlInput, setUrlInput] = useState('');
  const [htmlInput, setHtmlInput] = useState('');
  const [blockTrackers, setBlockTrackers] = useState(true);
  const [analysis, setAnalysis] = useState(null);
  const [urlStatus, setUrlStatus] = useState('');
  const [notification, setNotification] = useState('');

  // Common tracker patterns
  const trackerPatterns = {
    analytics: [
      { pattern: /google-analytics\.com|googletagmanager\.com|ga\.js|analytics\.js/i, name: 'Google Analytics', category: 'Analytics' },
      { pattern: /adobe.*analytics|omniture\.com/i, name: 'Adobe Analytics', category: 'Analytics' },
      { pattern: /matomo\.org|piwik/i, name: 'Matomo', category: 'Analytics' },
      { pattern: /segment\.com|segment\.io/i, name: 'Segment', category: 'Analytics' },
      { pattern: /mixpanel\.com/i, name: 'Mixpanel', category: 'Analytics' }
    ],
    advertising: [
      { pattern: /doubleclick\.net|googlesyndication\.com/i, name: 'Google Ads', category: 'Advertising' },
      { pattern: /facebook\.net.*fbevents|connect\.facebook/i, name: 'Facebook Pixel', category: 'Advertising' },
      { pattern: /adnxs\.com|adtech/i, name: 'AppNexus', category: 'Advertising' },
      { pattern: /criteo\.com/i, name: 'Criteo', category: 'Advertising' },
      { pattern: /adsrvr\.org/i, name: 'The Trade Desk', category: 'Advertising' }
    ],
    social: [
      { pattern: /facebook\.com.*sdk|fb\.me/i, name: 'Facebook SDK', category: 'Social Widget' },
      { pattern: /twitter\.com.*widgets/i, name: 'Twitter Widget', category: 'Social Widget' },
      { pattern: /linkedin\.com.*platform/i, name: 'LinkedIn Widget', category: 'Social Widget' },
      { pattern: /pinterest\.com.*pinit/i, name: 'Pinterest Widget', category: 'Social Widget' }
    ],
    tracking: [
      { pattern: /hotjar\.com/i, name: 'Hotjar', category: 'Behavioral Tracking' },
      { pattern: /mouseflow\.com/i, name: 'Mouseflow', category: 'Behavioral Tracking' },
      { pattern: /crazyegg\.com/i, name: 'Crazy Egg', category: 'Behavioral Tracking' },
      { pattern: /fullstory\.com/i, name: 'FullStory', category: 'Behavioral Tracking' }
    ]
  };

  const exampleSites = {
    news: {
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Example News Site</title>
  <script src="https://www.googletagmanager.com/gtag/js?id=GA-123456"></script>
  <script src="https://connect.facebook.net/en_US/fbevents.js"></script>
  <script src="https://static.doubleclick.net/instream/ad_status.js"></script>
</head>
<body>
  <h1>Breaking News Today</h1>
  <div id="ad-banner"></div>
  <script src="https://www.google-analytics.com/analytics.js"></script>
  <p>Latest news article content here...</p>
</body>
</html>`,
      name: 'News Website'
    },
    ecommerce: {
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Example E-commerce</title>
  <script src="https://www.googletagmanager.com/gtag/js"></script>
  <script src="https://connect.facebook.net/en_US/fbevents.js"></script>
  <script src="https://static.criteo.net/js/ld/ld.js"></script>
</head>
<body>
  <h1>Shop Our Products</h1>
  <div class="products">Product listings...</div>
  <script src="https://www.google-analytics.com/analytics.js"></script>
</body>
</html>`,
      name: 'E-commerce Site'
    },
    blog: {
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Personal Blog</title>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
  <script src="https://www.google-analytics.com/analytics.js"></script>
</head>
<body>
  <h1>My Blog Post</h1>
  <div class="ad-container">
    <ins class="adsbygoogle"></ins>
  </div>
  <p>Blog content here...</p>
</body>
</html>`,
      name: 'Blog with Ads'
    },
    social: {
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Social Media Integration</title>
  <script src="https://connect.facebook.net/en_US/sdk.js"></script>
  <script async src="https://platform.twitter.com/widgets.js"></script>
  <script src="https://www.linkedin.com/platform/js/secureAnonymousFramework"></script>
</head>
<body>
  <h1>Share This Page</h1>
  <div class="fb-like"></div>
  <div class="twitter-share-button"></div>
  <script src="https://www.google-analytics.com/analytics.js"></script>
</body>
</html>`,
      name: 'Social Media Widgets'
    }
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const detectTrackers = (html) => {
    const trackers = [];
    const allPatterns = [
      ...trackerPatterns.analytics,
      ...trackerPatterns.advertising,
      ...trackerPatterns.social,
      ...trackerPatterns.tracking
    ];

    allPatterns.forEach(tracker => {
      if (tracker.pattern.test(html)) {
        trackers.push(tracker);
      }
    });

    return trackers;
  };

  const calculatePrivacyScore = (trackers) => {
    const baseScore = 100;
    const deduction = trackers.length * 8;
    const score = Math.max(0, baseScore - deduction);
    
    let rating, color;
    if (score >= 80) {
      rating = 'Excellent';
      color = 'text-green-400';
    } else if (score >= 60) {
      rating = 'Good';
      color = 'text-blue-400';
    } else if (score >= 40) {
      rating = 'Fair';
      color = 'text-yellow-400';
    } else if (score >= 20) {
      rating = 'Poor';
      color = 'text-orange-400';
    } else {
      rating = 'Critical';
      color = 'text-red-400';
    }

    return { score, rating, color };
  };

  const sanitizeHtml = (html, shouldBlock) => {
    if (!shouldBlock) return html;

    let sanitized = html;
    const allPatterns = [
      ...trackerPatterns.analytics,
      ...trackerPatterns.advertising,
      ...trackerPatterns.social,
      ...trackerPatterns.tracking
    ];

    // Remove script tags containing tracker patterns
    allPatterns.forEach(tracker => {
      const scriptRegex = new RegExp(`<script[^>]*${tracker.pattern.source}[^>]*>.*?</script>`, 'gis');
      sanitized = sanitized.replace(scriptRegex, '<!-- Tracker blocked -->');
    });

    return sanitized;
  };

  const analyzeContent = (html, source) => {
    const trackers = detectTrackers(html);
    const privacyScore = calculatePrivacyScore(trackers);
    const sanitizedHtml = sanitizeHtml(html, blockTrackers);

    const categoryCounts = {
      Analytics: trackers.filter(t => t.category === 'Analytics').length,
      Advertising: trackers.filter(t => t.category === 'Advertising').length,
      'Social Widget': trackers.filter(t => t.category === 'Social Widget').length,
      'Behavioral Tracking': trackers.filter(t => t.category === 'Behavioral Tracking').length
    };

    setAnalysis({
      trackers,
      privacyScore,
      sanitizedHtml,
      categoryCounts,
      source
    });

    showNotification(`Analysis complete: ${trackers.length} tracker${trackers.length !== 1 ? 's' : ''} detected`);
  };

  const handleAnalyzeUrl = async () => {
    if (!urlInput.trim()) {
      setUrlStatus('Please enter a URL');
      return;
    }

    setUrlStatus('Note: Cross-origin restrictions prevent fetching external URLs. Use HTML input or examples instead.');
    showNotification('Direct URL fetching is restricted by browser security. Try pasting HTML or using an example.');
  };

  const handleAnalyzeHtml = () => {
    if (!htmlInput.trim()) {
      showNotification('Please paste some HTML code first');
      return;
    }

    analyzeContent(htmlInput, 'Pasted HTML');
  };

  const handleExample = (exampleKey) => {
    const example = exampleSites[exampleKey];
    if (example) {
      setHtmlInput(example.html);
      analyzeContent(example.html, example.name);
      setActiveTab('html');
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Analytics':
        return <Target className="w-5 h-5" />;
      case 'Advertising':
        return <AlertTriangle className="w-5 h-5" />;
      case 'Social Widget':
        return <Users className="w-5 h-5" />;
      case 'Behavioral Tracking':
        return <Eye className="w-5 h-5" />;
      default:
        return <Shield className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Analytics':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'Advertising':
        return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      case 'Social Widget':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      case 'Behavioral Tracking':
        return 'text-red-400 bg-red-500/10 border-red-500/30';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
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
          <div className="flex items-center space-x-4 mb-4">
            <Eye className="w-12 h-12 text-cyan-400" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Tracker Blocker Simulator
              </h1>
              <p className="text-slate-400 mt-2">
                Paste a URL or HTML snippet to analyze embedded trackers and simulate what happens when they are blocked.
                <strong className="text-cyan-400 ml-1">All processing happens locally in your browser.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 pb-20">
        {/* Input Section */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8 mb-6">
          {/* Tabs */}
          <div className="flex space-x-2 mb-6 bg-slate-950 p-2 rounded-xl border border-slate-700">
            <button
              onClick={() => setActiveTab('url')}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                activeTab === 'url'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Globe className="w-5 h-5" />
              <span>Analyze URL</span>
            </button>
            <button
              onClick={() => setActiveTab('html')}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                activeTab === 'html'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Code className="w-5 h-5" />
              <span>Paste HTML</span>
            </button>
            <button
              onClick={() => setActiveTab('example')}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                activeTab === 'example'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Target className="w-5 h-5" />
              <span>Example Sites</span>
            </button>
          </div>

          {/* URL Tab */}
          {activeTab === 'url' && (
            <div>
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors mb-4"
              />
              <div className="flex items-center justify-between flex-wrap gap-3">
                <button
                  onClick={handleAnalyzeUrl}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                >
                  Analyze URL
                </button>
                {urlStatus && (
                  <p className="text-yellow-400 text-sm">{urlStatus}</p>
                )}
              </div>
            </div>
          )}

          {/* HTML Tab */}
          {activeTab === 'html' && (
            <div>
              <textarea
                value={htmlInput}
                onChange={(e) => setHtmlInput(e.target.value)}
                placeholder="Paste HTML code here..."
                spellCheck="false"
                rows={12}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 font-mono text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors resize-none mb-4"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleAnalyzeHtml}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                >
                  Analyze HTML
                </button>
                <button
                  onClick={() => setHtmlInput('')}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all"
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Example Tab */}
          {activeTab === 'example' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => handleExample('news')}
                className="px-6 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all hover:border-cyan-500"
              >
                📰 News Website
              </button>
              <button
                onClick={() => handleExample('ecommerce')}
                className="px-6 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all hover:border-cyan-500"
              >
                🛒 E-commerce Site
              </button>
              <button
                onClick={() => handleExample('blog')}
                className="px-6 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all hover:border-cyan-500"
              >
                ✍️ Blog with Ads
              </button>
              <button
                onClick={() => handleExample('social')}
                className="px-6 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-semibold transition-all hover:border-cyan-500"
              >
                👥 Social Media Widgets
              </button>
            </div>
          )}

          {/* Block Trackers Toggle */}
          <div className="flex items-center space-x-3 mt-6 pt-6 border-t border-slate-700">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={blockTrackers}
                onChange={(e) => {
                  setBlockTrackers(e.target.checked);
                  if (analysis) {
                    setAnalysis({
                      ...analysis,
                      sanitizedHtml: sanitizeHtml(htmlInput || analysis.sanitizedHtml, e.target.checked)
                    });
                  }
                }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
            <span className="text-slate-300 font-medium">Simulate blocking trackers in the preview</span>
          </div>
        </section>

        {/* Results Section */}
        {analysis && (
          <>
            {/* Statistics */}
            <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8 mb-6">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6">📊 Tracker Statistics</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-950 rounded-lg p-4 border border-slate-700">
                  <div className="text-3xl font-bold text-cyan-400">{analysis.trackers.length}</div>
                  <div className="text-sm text-slate-400 mt-1">Total Trackers</div>
                </div>
                <div className="bg-slate-950 rounded-lg p-4 border border-slate-700">
                  <div className="text-3xl font-bold text-blue-400">{analysis.categoryCounts.Analytics}</div>
                  <div className="text-sm text-slate-400 mt-1">Analytics</div>
                </div>
                <div className="bg-slate-950 rounded-lg p-4 border border-slate-700">
                  <div className="text-3xl font-bold text-orange-400">{analysis.categoryCounts.Advertising}</div>
                  <div className="text-sm text-slate-400 mt-1">Advertising</div>
                </div>
                <div className="bg-slate-950 rounded-lg p-4 border border-slate-700">
                  <div className="text-3xl font-bold text-purple-400">{analysis.categoryCounts['Social Widget']}</div>
                  <div className="text-sm text-slate-400 mt-1">Social Widgets</div>
                </div>
              </div>

              {/* Privacy Score */}
              <div className={`bg-slate-950 rounded-xl p-6 border border-slate-700`}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-slate-200">Privacy Score</h4>
                  <span className={`text-2xl font-bold ${analysis.privacyScore.color}`}>
                    {analysis.privacyScore.score}/100
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden mb-2">
                  <div
                    className={`h-full ${analysis.privacyScore.color.replace('text-', 'bg-')} transition-all duration-1000`}
                    style={{ width: `${analysis.privacyScore.score}%` }}
                  ></div>
                </div>
                <p className="text-sm text-slate-400">
                  Rating: <span className={`font-semibold ${analysis.privacyScore.color}`}>{analysis.privacyScore.rating}</span>
                </p>
              </div>
            </section>

            {/* Detected Trackers */}
            <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8 mb-6">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6">🔍 Detected Trackers</h3>
              
              {analysis.trackers.length === 0 ? (
                <p className="text-slate-400 text-center py-8">No trackers detected in this content.</p>
              ) : (
                <div className="space-y-3">
                  {analysis.trackers.map((tracker, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-4 rounded-lg border ${getCategoryColor(tracker.category)}`}
                    >
                      <div className="flex items-center space-x-3">
                        {getCategoryIcon(tracker.category)}
                        <div>
                          <div className="font-semibold">{tracker.name}</div>
                          <div className="text-sm opacity-75">{tracker.category}</div>
                        </div>
                      </div>
                      {blockTrackers && (
                        <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-bold border border-red-500/40">
                          Blocked
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Blocking Simulation */}
            <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8 mb-6">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6">⚙️ Blocking Simulation</h3>
              
              <div className="space-y-4">
                <div className="bg-slate-950 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300 font-semibold">Blocking Status</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      blockTrackers 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/40' 
                        : 'bg-slate-700 text-slate-400 border border-slate-600'
                    }`}>
                      {blockTrackers ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">
                    {blockTrackers 
                      ? `${analysis.trackers.length} tracker${analysis.trackers.length !== 1 ? 's' : ''} blocked in the preview below`
                      : 'Trackers are not being blocked in the preview'}
                  </p>
                </div>

                {blockTrackers && analysis.trackers.length > 0 && (
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <h4 className="text-green-400 font-semibold mb-2">Performance Impact</h4>
                    <p className="text-sm text-slate-300">
                      Blocking {analysis.trackers.length} tracker{analysis.trackers.length !== 1 ? 's' : ''} may reduce page load time by approximately{' '}
                      {Math.round(analysis.trackers.length * 150)}ms and save ~{Math.round(analysis.trackers.length * 25)}KB of data transfer.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Preview */}
            <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">👁️ Preview (Sanitized)</h3>
              <p className="text-slate-400 mb-4">
                This preview attempts to show how the page might look once tracking scripts and third party beacons are removed.
              </p>
              
              <div className="bg-slate-950 border border-slate-700 rounded-lg overflow-hidden">
                <div className="bg-slate-900 px-4 py-2 border-b border-slate-700 flex items-center space-x-2">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-slate-500 ml-3">Sanitized Preview</span>
                </div>
                <div className="p-6 bg-white text-slate-900 min-h-[300px] max-h-[600px] overflow-auto">
                  <div dangerouslySetInnerHTML={{ __html: analysis.sanitizedHtml }} />
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Legal Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-6">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Important Notice & Legal Disclaimer:</strong> This Tracker Blocker Simulator is a client-side educational tool.
            All parsing and simulation logic runs in your browser and the HTML you analyze is not uploaded to CyberLife Coach or stored on any server.
            The classifications of trackers, ads, analytics, social widgets, and behavioral scripts are heuristic and may not fully reflect how a real browser or content blocker behaves.
            Results are provided without warranty and are not a substitute for professional security or legal advice.
          </p>
        </div>

        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-12">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-cyan-400">Usage Warning:</strong> Do not use this tool to bypass security controls on employer-managed or school-managed systems.
            Always review changes with your organization's security or privacy team before adjusting production configurations.
            This tool is for educational purposes only and does not provide real-time blocking capabilities.
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
            <p className="text-slate-600">Analysis happens entirely in your browser. No data is sent anywhere.</p>
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
