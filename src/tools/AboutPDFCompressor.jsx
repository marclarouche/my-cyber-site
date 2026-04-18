import React from 'react';
import { FileText, ArrowLeft, Shield, Lock, Eye, CheckCircle, AlertTriangle, Database, Zap } from 'lucide-react';

export default function AboutPDFCompressor() {
  const handleOpenTool = () => { window.location.href = '/tools/pdf-compressor'; };
  const handlePrint = () => { window.print(); };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">

      {/* ── Nav ── */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center space-x-3 group cursor-pointer">
              <img src="/logo.png" alt="CyberLifeCoach"
                className="h-10 w-auto group-hover:brightness-125 group-hover:scale-110 transition-all duration-300" />
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
              PDF Compression Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Privacy & Performance
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            PDF Compression & Document Privacy
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            Why PDF file size matters, what's hiding inside your documents, and how to share them safely.
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
                  1. Why PDF File Size Matters
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  Oversized PDFs create real problems: email servers reject attachments over 10–25 MB, slow uploads frustrate clients, and large files consume storage on mobile devices quickly. A single scanned document can balloon to 50 MB or more when images are embedded at full resolution. Compression brings those files to a manageable size without sacrificing readability.
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
                  2. What's Hidden Inside a PDF
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  PDFs can contain far more than the text you see. Before sharing any document, be aware of these hidden data risks:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: 'Author & editor names', desc: 'The name of the person who created or last modified the document is often embedded in metadata.' },
                    { title: 'Revision history', desc: 'Some PDFs contain track-changes data or version history that reveals earlier drafts.' },
                    { title: 'Embedded fonts & assets', desc: 'Unused fonts and images can bloat file size while revealing details about the software used.' },
                    { title: 'GPS coordinates', desc: 'If the PDF was created from photos taken on a phone, EXIF data including location may be embedded.' },
                    { title: 'Comments & annotations', desc: 'Internal review comments may be invisible in the rendered view but still present in the file.' },
                    { title: 'Software fingerprints', desc: 'The creation tool (Word version, Adobe version, OS) is typically recorded in the file header.' },
                  ].map(item => (
                    <div key={item.title} className="flex items-start gap-3 bg-slate-800/50 rounded-xl border border-slate-600 p-4">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-slate-200 mb-1">{item.title}</p>
                        <p className="text-xs text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl border border-cyan-500/30 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300">
                      <span className="text-cyan-300 font-semibold">Tip: </span>
                      Re-encoding a PDF through our tool strips most document metadata automatically — a useful first step before sharing sensitive documents externally. For complete sanitization of highly sensitive files, pair this with CyberLifeCoach's <strong className="text-cyan-400">Meta Data Tool</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <Database className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  3. How Browser-Side PDF Compression Works
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Our tool uses <strong className="text-cyan-400">PDF-lib</strong>, a pure JavaScript library, to parse and re-encode your PDF entirely inside the browser. Here's what happens:
                </p>
                <div className="space-y-3">
                  {[
                    { step: '1', text: "The PDF is read into memory using JavaScript's File API — no network request is made." },
                    { step: '2', text: 'PDF-lib parses the document structure, identifying embedded images, fonts, and objects.' },
                    { step: '3', text: 'The document is re-serialized using object stream compression, which packs PDF objects more efficiently.' },
                    { step: '4', text: 'Embedded JPEG and PNG images are re-encoded via the Canvas API at your chosen quality level.' },
                    { step: '5', text: 'The compressed file is offered as a direct browser download — it never touches a server.' },
                  ].map(item => (
                    <div key={item.step} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs font-bold flex items-center justify-center">
                        {item.step}
                      </span>
                      <p className="text-sm text-slate-300">{item.text}</p>
                    </div>
                  ))}
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
                  4. Realistic Expectations by Document Type
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="text-left py-2 pr-4 text-cyan-400 font-semibold">Document Type</th>
                        <th className="text-left py-2 pr-4 text-cyan-400 font-semibold">Typical Savings</th>
                        <th className="text-left py-2 text-cyan-400 font-semibold">Why</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300 divide-y divide-slate-700/50">
                      {[
                        ['Scanned documents', '40–70%', 'Embedded bitmaps compress very well'],
                        ['Photo-heavy reports', '30–60%', 'JPEG re-encoding reduces image data'],
                        ['Word / Office exports', '10–30%', 'Redundant objects and fonts removed'],
                        ['Text-only PDFs', '5–15%', 'Little image data to compress'],
                        ['Already-optimized PDFs', '<5%', 'Most gains already realized'],
                      ].map(([type, savings, why]) => (
                        <tr key={type}>
                          <td className="py-2.5 pr-4 font-medium">{type}</td>
                          <td className="py-2.5 pr-4 text-emerald-400 font-semibold">{savings}</td>
                          <td className="py-2.5 text-slate-400">{why}</td>
                        </tr>
                      ))}
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
                  5. Why Not to Use Cloud-Based PDF Tools for Sensitive Documents
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Popular online PDF tools (including many well-known ones) upload your file to their servers for processing. For everyday documents this may be acceptable, but consider the risk before uploading:
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    'Tax returns or financial statements',
                    'Medical records or insurance documents',
                    'Legal contracts or NDAs',
                    'HR files or employee records',
                    'Business proposals with proprietary data',
                    'Any document marked Confidential',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-2 bg-slate-800/50 rounded-xl border border-slate-600 px-4 py-3">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                      <span className="text-sm text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                  Our browser-side tool eliminates this risk entirely. The file never leaves your machine.
                </p>
              </div>
            </div>
          </div>

          {/* 6 */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              6. Best Practices Before Sharing Any PDF
            </h2>
            <div className="space-y-3">
              {[
                'Always keep the original uncompressed file in a secure location before compressing for distribution.',
                'Check compressed output visually — particularly for documents with fine text, signatures, or charts.',
                'For legal or compliance documents, verify that compression does not affect digital signatures.',
                'Use password protection for sensitive PDFs, separate from compression.',
                'Consider using CyberLifeCoach\'s Meta Data Tool in addition to compression for thorough document sanitization.',
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-300">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <FileText className="w-5 h-5" />
              <span>📄 Open the PDF Compressor</span>
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
              <strong className="text-cyan-400">Legal Disclaimer and Important Notice:</strong> This page is provided for educational purposes only. CyberLifeCoach and its affiliates make no warranties regarding completeness or accuracy. Always retain original uncompressed documents for archival and legal purposes. Browser-based PDF compression has inherent limitations compared to native server-side tools; results will vary by document type. You are responsible for verifying the quality and integrity of any compressed file before distribution.
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/logo.png" alt="CyberLifeCoach"
              className="h-8 w-auto transition-all duration-300 hover:scale-125 hover:brightness-125" />
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
