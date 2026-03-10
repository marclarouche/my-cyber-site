import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, Shield, RefreshCw, Send, Copy, CheckCircle,
  AlertTriangle, Eye, EyeOff, Zap, Clock, ExternalLink,
  Edit3, X, ChevronRight, Loader, Lock, Key
} from 'lucide-react';

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const RSS_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://cyberlifecoach.substack.com/feed';
const BLUESKY_HANDLE = 'cyberlifecoach.bsky.social'; // update if different
const MAX_BSKY_CHARS = 300;

// ── HELPERS ───────────────────────────────────────────────────────────────────
function charCount(text) {
  // Bluesky counts URLs as 26 chars regardless of actual length
  return text.replace(/https?:\/\/\S+/g, '                          ').length;
}

function formatPubDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
}

function linkedinText(article) {
  return `🔐 New from CyberLifeCoach:

${article.title}

${stripHtml(article.description || '').slice(0, 200)}...

Read the full article → ${article.link}

#CyberSecurity #Privacy #DigitalSafety #InfoSec #CyberLifeCoach`;
}

// ── CREDENTIALS MODAL ─────────────────────────────────────────────────────────
function CredentialsModal({ onConfirm }) {
  const [claudeKey, setClaudeKey] = useState('');
  const [bskyPass, setBskyPass]   = useState('');
  const [showClaude, setShowClaude] = useState(false);
  const [showBsky, setShowBsky]     = useState(false);

  const valid = claudeKey.trim().startsWith('sk-ant-') && bskyPass.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Session Credentials</h2>
            <p className="text-slate-400 text-xs">Keys live in memory only — cleared when tab closes</p>
          </div>
        </div>

        <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
          <Shield className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
          <p className="text-slate-300 text-xs leading-relaxed">
            These credentials are never stored to disk, localStorage, or any server. They exist only in this browser tab's memory and are gone when you close it. Pull them from <strong className="text-cyan-400">ProtonPass</strong>.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {/* Claude API Key */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">
              Claude API Key <span className="text-slate-500 font-normal text-xs">(username field in ProtonPass)</span>
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showClaude ? 'text' : 'password'}
                value={claudeKey}
                onChange={e => setClaudeKey(e.target.value)}
                placeholder="sk-ant-api03-..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-10 py-3 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button onClick={() => setShowClaude(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                {showClaude ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Bluesky App Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">
              Bluesky App Password <span className="text-slate-500 font-normal text-xs">(password field in ProtonPass)</span>
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showBsky ? 'text' : 'password'}
                value={bskyPass}
                onChange={e => setBskyPass(e.target.value)}
                placeholder="xxxx-xxxx-xxxx-xxxx"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-10 py-3 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button onClick={() => setShowBsky(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                {showBsky ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => onConfirm(claudeKey.trim(), bskyPass.trim())}
          disabled={!valid}
          className={`w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl transition-all duration-300 ${
            valid
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105'
              : 'bg-slate-800 text-slate-600 cursor-not-allowed'
          }`}
        >
          <Zap className="w-4 h-4" />
          Start Session
        </button>
      </div>
    </div>
  );
}

// ── ARTICLE CARD ──────────────────────────────────────────────────────────────
function ArticleCard({ article, credentials, onPostSuccess }) {
  const [draft, setDraft]           = useState('');
  const [drafting, setDrafting]     = useState(false);
  const [draftError, setDraftError] = useState('');
  const [posting, setPosting]       = useState(false);
  const [postError, setPostError]   = useState('');
  const [posted, setPosted]         = useState(false);
  const [copied, setCopied]         = useState(false);
  const [copiedLI, setCopiedLI]     = useState(false);
  const [editing, setEditing]       = useState(false);

  const chars = charCount(draft);
  const overLimit = chars > MAX_BSKY_CHARS;

  // ── Draft via Claude API ──
  async function generateDraft() {
    setDrafting(true);
    setDraftError('');
    setDraft('');
    try {
      const excerpt = stripHtml(article.description || '').slice(0, 400);
      const prompt = `You are a cybersecurity social media writer for CyberLifeCoach.pro, a veteran-owned digital security coaching business.

Write a Bluesky post promoting this article. Requirements:
- Maximum 260 characters (leave room for the URL)
- Hook in the first line — make it punchy and curiosity-driven
- Written for everyday people, not IT pros
- End with 2-3 relevant hashtags like #CyberSecurity #Privacy #DigitalSafety
- Do NOT include the URL — it will be appended automatically
- Do NOT use quotes around the post
- Tone: urgent but approachable, like a trusted friend warning you

Article title: ${article.title}
Article excerpt: ${excerpt}

Reply with ONLY the post text, nothing else.`;

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': credentials.claudeKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || `API error ${res.status}`);
      }

      const data = await res.json();
      const text = data.content?.find(b => b.type === 'text')?.text?.trim() || '';
      setDraft(text + '\n\n' + article.link);
    } catch (e) {
      setDraftError(e.message);
    } finally {
      setDrafting(false);
    }
  }

  // ── Post to Bluesky ──
  async function postToBluesky() {
    setPosting(true);
    setPostError('');
    try {
      // 1. Create session
      const sessionRes = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: BLUESKY_HANDLE,
          password: credentials.bskyPass,
        }),
      });
      if (!sessionRes.ok) {
        const err = await sessionRes.json();
        throw new Error(err.message || 'Bluesky auth failed');
      }
      const session = await sessionRes.json();
      const accessJwt = session.accessJwt;
      const did = session.did;

      // 2. Build facets (detect URLs for link cards)
      const postText = draft;
      const facets = [];
      const urlRegex = /https?:\/\/\S+/g;
      let match;
      const encoder = new TextEncoder();
      while ((match = urlRegex.exec(postText)) !== null) {
        const urlStart = encoder.encode(postText.slice(0, match.index)).length;
        const urlEnd   = urlStart + encoder.encode(match[0]).length;
        facets.push({
          index: { byteStart: urlStart, byteEnd: urlEnd },
          features: [{ $type: 'app.bsky.richtext.facet#link', uri: match[0] }],
        });
      }

      // 3. Create post
      const postBody = {
        repo: did,
        collection: 'app.bsky.feed.post',
        record: {
          $type: 'app.bsky.feed.post',
          text: postText,
          facets,
          createdAt: new Date().toISOString(),
        },
      };

      const postRes = await fetch('https://bsky.social/xrpc/com.atproto.repo.createRecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessJwt}`,
        },
        body: JSON.stringify(postBody),
      });

      if (!postRes.ok) {
        const err = await postRes.json();
        throw new Error(err.message || 'Post failed');
      }

      setPosted(true);
      onPostSuccess(article.link);
    } catch (e) {
      setPostError(e.message);
    } finally {
      setPosting(false);
    }
  }

  function copyDraft() {
    navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function copyLinkedIn() {
    navigator.clipboard.writeText(linkedinText(article));
    setCopiedLI(true);
    setTimeout(() => setCopiedLI(false), 2000);
  }

  if (posted) {
    return (
      <div className="bg-emerald-900/20 border border-emerald-500/40 rounded-2xl p-6 flex items-center gap-4">
        <CheckCircle className="w-8 h-8 text-emerald-400 flex-shrink-0" />
        <div>
          <p className="font-bold text-emerald-400">Posted to Bluesky ✓</p>
          <p className="text-slate-400 text-sm mt-0.5">{article.title}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300">
      {/* Article info */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white text-lg leading-snug mb-1">{article.title}</h3>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-slate-500 text-xs">
              <Clock className="w-3 h-3" />
              {formatPubDate(article.pubDate)}
            </span>
            <a href={article.link} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-cyan-400 text-xs hover:text-cyan-300 transition-colors">
              <ExternalLink className="w-3 h-3" /> View article
            </a>
          </div>
        </div>
        {/* LinkedIn copy */}
        <button
          onClick={copyLinkedIn}
          className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold transition-all duration-300 ${
            copiedLI
              ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
              : 'border-slate-600 hover:border-blue-500/50 hover:bg-blue-500/10 text-slate-300 hover:text-blue-300'
          }`}
        >
          {copiedLI ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copiedLI ? 'Copied!' : 'Copy for LinkedIn'}
        </button>
      </div>

      {/* Draft section */}
      {!draft && !drafting && (
        <button
          onClick={generateDraft}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300"
        >
          <Zap className="w-4 h-4" /> Generate Bluesky Draft
        </button>
      )}

      {drafting && (
        <div className="flex items-center justify-center gap-3 py-6 text-cyan-400">
          <Loader className="w-5 h-5 animate-spin" />
          <span className="text-sm font-medium">Claude is drafting your post…</span>
        </div>
      )}

      {draftError && (
        <div className="bg-red-900/20 border border-red-500/40 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-400 text-sm font-semibold">Draft failed</p>
            <p className="text-slate-400 text-xs mt-0.5">{draftError}</p>
            <button onClick={generateDraft} className="text-cyan-400 text-xs mt-2 hover:text-cyan-300 transition-colors">
              Try again →
            </button>
          </div>
        </div>
      )}

      {draft && !drafting && (
        <div className="space-y-3">
          {/* Preview / edit area */}
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Bluesky Preview</span>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold ${overLimit ? 'text-red-400' : chars > 270 ? 'text-amber-400' : 'text-slate-500'}`}>
                  {chars}/{MAX_BSKY_CHARS}
                </span>
                <button onClick={() => setEditing(v => !v)}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-400 transition-colors">
                  <Edit3 className="w-3.5 h-3.5" />
                  {editing ? 'Done editing' : 'Edit'}
                </button>
              </div>
            </div>

            {/* Bluesky card mockup */}
            <div className="bg-slate-950 border border-slate-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white">C</div>
                <div>
                  <p className="text-white text-sm font-semibold">CyberLifeCoach</p>
                  <p className="text-slate-500 text-xs">@{BLUESKY_HANDLE}</p>
                </div>
              </div>
              {editing ? (
                <textarea
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  rows={6}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 text-sm leading-relaxed focus:outline-none focus:border-cyan-500 resize-none transition-colors"
                />
              ) : (
                <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{draft}</p>
              )}
            </div>
          </div>

          {overLimit && (
            <div className="flex items-center gap-2 text-red-400 text-xs">
              <AlertTriangle className="w-3.5 h-3.5" />
              Post exceeds 300 characters — edit before posting
            </div>
          )}

          {postError && (
            <div className="bg-red-900/20 border border-red-500/40 rounded-xl p-3 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 text-sm font-semibold">Post failed</p>
                <p className="text-slate-400 text-xs mt-0.5">{postError}</p>
              </div>
            </div>
          )}

          {/* Action row */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={postToBluesky}
              disabled={posting || overLimit}
              className={`flex-1 flex items-center justify-center gap-2 font-bold py-3 rounded-xl transition-all duration-300 ${
                posting || overLimit
                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105'
              }`}
            >
              {posting ? (
                <><Loader className="w-4 h-4 animate-spin" /> Posting…</>
              ) : (
                <><Send className="w-4 h-4" /> Post to Bluesky</>
              )}
            </button>
            <button onClick={copyDraft}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border font-semibold text-sm transition-all duration-300 ${
                copied
                  ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                  : 'border-slate-600 hover:border-cyan-500/50 text-slate-300'
              }`}
            >
              {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button onClick={generateDraft}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-600 hover:border-slate-500 text-slate-400 hover:text-slate-200 font-semibold text-sm transition-all duration-300"
              title="Regenerate draft"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function SocialAutomation() {
  const [credentials, setCredentials] = useState(null);
  const [articles, setArticles]       = useState([]);
  const [loading, setLoading]         = useState(false);
  const [loadError, setLoadError]     = useState('');
  const [lastChecked, setLastChecked] = useState(null);
  const [postedUrls, setPostedUrls]   = useState([]);
  const [toast, setToast]             = useState('');
  const pollRef = useRef(null);

  // ── Auto-poll every 15 minutes once session is active ──
  useEffect(() => {
    if (!credentials) return;
    fetchFeed();
    pollRef.current = setInterval(fetchFeed, 15 * 60 * 1000);
    return () => clearInterval(pollRef.current);
  }, [credentials]);

  async function fetchFeed() {
    setLoading(true);
    setLoadError('');
    try {
      const res  = await fetch(RSS_URL);
      const data = await res.json();
      if (data.status !== 'ok') throw new Error('RSS feed error');
      const items = (data.items || []).slice(0, 3).map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: item.description || item.content || '',
        guid: item.guid || item.link,
      }));
      setArticles(items);
      setLastChecked(new Date());
    } catch (e) {
      setLoadError(e.message || 'Failed to load RSS feed');
    } finally {
      setLoading(false);
    }
  }

  function handlePostSuccess(url) {
    setPostedUrls(prev => [...prev, url]);
    showToast('✅ Posted to Bluesky!');
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">

      {/* ── CREDENTIALS MODAL ── */}
      {!credentials && (
        <CredentialsModal onConfirm={(claudeKey, bskyPass) => setCredentials({ claudeKey, bskyPass })} />
      )}

      {/* ── NAV ── */}
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
            <a href="/clc-ops" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Mission Control</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ── CONTENT ── */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">
              <Shield className="w-4 h-4" /> Mission Control — Social Automation
            </div>
            <h1 className="text-4xl font-black text-white mb-2">Social Automation</h1>
            <p className="text-slate-400">
              Fetch your latest Substack posts, generate Bluesky drafts with Claude, review and post — plus copy LinkedIn text in one click.
            </p>
          </div>

          {/* Status bar */}
          {credentials && (
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-5 mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                {/* Session status */}
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-300 text-sm font-semibold">Session active</span>
                </div>
                {/* Auto-poll status */}
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-slate-400 text-sm">Auto-polling every 15 min</span>
                </div>
                {/* Last checked */}
                {lastChecked && (
                  <span className="text-slate-500 text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Last checked {lastChecked.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </div>
              <button
                onClick={fetchFeed}
                disabled={loading}
                className="flex items-center gap-2 bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 font-semibold text-sm px-4 py-2 rounded-lg transition-all duration-300"
              >
                {loading ? <Loader className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                {loading ? 'Checking…' : 'Check Now'}
              </button>
            </div>
          )}

          {/* Load error */}
          {loadError && (
            <div className="bg-red-900/20 border border-red-500/40 rounded-xl p-4 flex items-start gap-3 mb-6">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 font-semibold text-sm">Feed error</p>
                <p className="text-slate-400 text-xs mt-0.5">{loadError}</p>
              </div>
            </div>
          )}

          {/* Loading skeleton */}
          {loading && articles.length === 0 && (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 animate-pulse">
                  <div className="h-5 bg-slate-800 rounded w-3/4 mb-3" />
                  <div className="h-3 bg-slate-800 rounded w-1/3 mb-4" />
                  <div className="h-10 bg-slate-800 rounded-xl" />
                </div>
              ))}
            </div>
          )}

          {/* Article cards */}
          {!loading && articles.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Latest 3 Articles</h2>
                <span className="text-xs text-slate-500">Skip any you've already posted</span>
              </div>
              {articles.map(article => (
                <ArticleCard
                  key={article.guid}
                  article={article}
                  credentials={credentials}
                  onPostSuccess={handlePostSuccess}
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && !loadError && articles.length === 0 && credentials && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-slate-600" />
              </div>
              <p className="text-slate-400 font-semibold">No articles loaded yet</p>
              <p className="text-slate-600 text-sm mt-1">Hit "Check Now" to fetch your latest Substack posts</p>
            </div>
          )}

          {/* LinkedIn instructions */}
          {articles.length > 0 && (
            <div className="mt-10 bg-gradient-to-br from-blue-900/20 to-slate-900 border border-blue-500/30 rounded-2xl p-6">
              <h3 className="font-bold text-blue-300 mb-2 flex items-center gap-2">
                <span className="text-lg">💼</span> LinkedIn — Manual Workflow
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">
                Click <strong className="text-white">"Copy for LinkedIn"</strong> on any article above to get a formatted post with title, excerpt, link, and hashtags.
                Paste directly into LinkedIn. Post twice a week for best reach.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Monday + Thursday', 'or Tuesday + Friday', '9–11am or 4–6pm local time'].map(tip => (
                  <span key={tip} className="bg-slate-800 border border-slate-700 text-slate-400 text-xs px-3 py-1.5 rounded-lg">{tip}</span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── FOOTER ── */}
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
            <p className="text-slate-600">Mission Control — Internal Use Only</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ── TOAST ── */}
      {toast && (
        <div className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg shadow-cyan-500/50 z-50 font-semibold">
          {toast}
        </div>
      )}

    </div>
  );
}
