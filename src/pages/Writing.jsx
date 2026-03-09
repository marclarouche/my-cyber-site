import React, { useState, useEffect } from 'react';
import { ExternalLink, ChevronRight, BookOpen, ArrowLeft } from 'lucide-react';

const RSS_URL =
  "https://api.rss2json.com/v1/api.json?rss_url=https://cyberlifecoach.substack.com/feed";

function ArticleCard({ article, index }) {
  const excerpt = article.description
    ? article.description.replace(/<[^>]+>/g, "").slice(0, 180) + "…"
    : "Click to read the full article on Substack.";

  const date = new Date(article.pubDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
      style={{ animationDelay: `${index * 0.15}s`, animation: "fadeSlideUp 0.6s ease both" }}
    >
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </div>
        <span className="text-xs text-slate-500 uppercase tracking-widest">{date}</span>
      </div>

      <h2 className="text-2xl font-bold mb-3 text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug">
        {article.title}
      </h2>

      <p className="text-slate-400 mb-6 leading-relaxed">
        {excerpt}
      </p>

      <div className="flex items-center space-x-2 text-cyan-400 group-hover:text-cyan-300 font-semibold">
        <span>Read on Substack</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </a>
  );
}

export default function Writing() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(RSS_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setArticles(data.items);
        } else {
          setError("Could not load articles.");
        }
      })
      .catch(() => setError("Could not load articles."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

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
            <a href="/" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30 mb-8">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-300">Featured Writing</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight">
            From the Newsletter
          </h1>

          <p className="text-xl text-slate-400 mb-4 max-w-2xl mx-auto leading-relaxed">
            Thoughts on AI, mindset, and living deliberately in a tech-driven world.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {loading && (
            <div className="text-center py-20">
              <div className="inline-flex items-center space-x-3 text-slate-500">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                </div>
                <span className="text-sm uppercase tracking-widest">Loading articles...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-950/30 border border-red-500/30 rounded-2xl p-6 text-center text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {articles.map((article, i) => (
              <ArticleCard key={article.guid || i} article={article} index={i} />
            ))}
          </div>

          {/* CTA */}
          {!loading && !error && (
            <div className="mt-12 text-center" style={{ animation: "fadeSlideUp 0.7s ease 0.4s both" }}>
              <a
                href="https://cyberlifecoach.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
              >
                <ExternalLink className="w-5 h-5" />
                <span>View All Articles on Substack</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-slate-500 mt-4 text-sm">New issues every week • Free to subscribe</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
