import React from 'react';
import { Image, ArrowLeft, Shield, Zap, Lock, Eye, CheckCircle, AlertTriangle } from 'lucide-react';

export default function AboutImageCompressor() {
  const handleOpenTool = () => {
    window.location.href = '/tools/image-compressor';
  };
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">

      {/* ── Nav ── */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center space-x-3 group cursor-pointer">
              <img src="/logo.png" alt="CyberLifeCoach" className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300" />
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

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
              Image Compression Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Privacy & Performance
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Why Compress Your Images?
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            Smaller images load faster, use less bandwidth, and leak less metadata — here's what you need to know.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">

          {/* 1 */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Zap className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  1. Page Speed & Core Web Vitals
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  Images are typically the largest assets on a web page. Unoptimized images hurt Google's <strong className="text-cyan-400">Largest Contentful Paint (LCP)</strong> score, directly affecting search rankings and user experience. A well-compressed image loads in milliseconds instead of seconds — especially on mobile connections.
                </p>
              </div>
            </div>
          </div>

          {/* 2 */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Lock className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  2. Privacy — Hidden Metadata in Images
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Every photo taken on a smartphone or camera can contain <strong className="text-cyan-400">EXIF metadata</strong> — including GPS coordinates, device model, timestamp, and even software version. When you share or upload that image, you may be sharing your exact location without realising it.
                </p>
                <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-cyan-300 mb-1">Tip</p>
                      <p className="text-sm text-slate-300">
                        Re-encoding an image through the browser's Canvas API (as our tool does) strips most EXIF metadata automatically, providing a basic layer of privacy protection.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Image className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  3. Understanding Lossy vs. Lossless Compression
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  There are two main approaches to image compression:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-xl border border-slate-600 p-4">
                    <p className="font-bold text-cyan-300 mb-2">Lossy (JPEG / WebP)</p>
                    <p className="text-sm text-slate-400">Permanently removes some image data to achieve dramatic file size reductions. The quality setting controls the trade-off — 75% is often indistinguishable from the original to the human eye.</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl border border-slate-600 p-4">
                    <p className="font-bold text-cyan-300 mb-2">Lossless (PNG)</p>
                    <p className="text-sm text-slate-400">Preserves every pixel perfectly. PNG re-encoding strips metadata and applies better internal compression, typically saving 10–30% without any visible quality loss.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Eye className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  4. Choosing the Right Quality Setting
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Higher is not always better. Here's a practical guide for common use cases:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="text-left py-2 pr-4 text-cyan-400 font-semibold">Quality</th>
                        <th className="text-left py-2 pr-4 text-cyan-400 font-semibold">Best For</th>
                        <th className="text-left py-2 text-cyan-400 font-semibold">Typical Savings</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300">
                      <tr className="border-b border-slate-700/50">
                        <td className="py-2 pr-4 font-semibold">60–70%</td>
                        <td className="py-2 pr-4">Blog thumbnails, social media previews</td>
                        <td className="py-2 text-emerald-400">60–75%</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-2 pr-4 font-semibold">70–80%</td>
                        <td className="py-2 pr-4">General web images, product photos</td>
                        <td className="py-2 text-emerald-400">50–65%</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-2 pr-4 font-semibold">80–90%</td>
                        <td className="py-2 pr-4">Portfolio images, hero banners</td>
                        <td className="py-2 text-emerald-400">35–50%</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-semibold">90–95%</td>
                        <td className="py-2 pr-4">Print-ready, near-lossless archiving</td>
                        <td className="py-2 text-slate-400">10–30%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* 5 */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Shield className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  5. Why Client-Side Processing Matters
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Many online image tools upload your files to a remote server to process them. This creates several privacy and security risks — your images could be stored, analyzed, or leaked. Our tool runs entirely inside your browser using the HTML5 Canvas API, so <strong className="text-cyan-400">your files never leave your device</strong>.
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  {['No uploads to any server', 'No accounts or sign-in required', 'No tracking or logging of files'].map(item => (
                    <div key={item} className="flex items-center gap-2 bg-slate-800/50 rounded-xl border border-slate-600 px-4 py-3">
                      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span className="text-sm text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 6 */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  6. When NOT to Compress
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  Avoid heavy compression for images that will be printed at large sizes, medical or legal documents that require exact fidelity, or source files you intend to edit further. Always keep an uncompressed original in a safe location before compressing for distribution.
                </p>
              </div>
            </div>
          </div>

          {/* 7 */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              7. Format Comparison: JPEG vs. PNG vs. WebP
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Choosing the right format is as important as compression quality. As a general rule: use JPEG for photographs, PNG for graphics with transparency or sharp edges, and WebP when browser compatibility allows — it offers superior compression for both scenarios.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <Image className="w-5 h-5" />
              <span>🖼️ Open the Image Compressor</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print this Guide</span>
            </button>
          </div>

          {/* Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer and Important Notice:</strong> This page is provided for educational purposes only. CyberLifeCoach and its affiliates make no warranties regarding completeness or accuracy. Always retain original uncompressed files for archival purposes. You are responsible for evaluating the quality of compressed images before distribution.
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/logo.png" alt="CyberLifeCoach" className="h-8 w-auto transition-all duration-300 hover:scale-125 hover:brightness-125" />
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
