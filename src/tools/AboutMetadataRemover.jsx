import React from 'react';
import { FileImage, ArrowLeft, Shield, AlertTriangle, CheckCircle, Eye, MapPin, User, Calendar, Camera, File, FileText, Music, Video } from 'lucide-react';

export default function AboutMetadataRemover() {
  const handleOpenTool = () => {
    window.location.href = '/tools/metadata-remover';
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
              Privacy Guide
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Metadata Removal
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Print-Friendly
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            About File Metadata
          </h1>
          <p className="text-lg text-slate-400 max-w-4xl leading-relaxed mb-3">
            What metadata is, why it matters for privacy, how to inspect it, and how to remove it safely.
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            A Veteran-Owned Business Committed to Your Digital Security
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          
          {/* What is metadata? */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              What is metadata?
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Metadata is "data about data." It describes a file and how it was created — such as the author, device, software, and timestamps. Some metadata helps with organization, but certain fields can expose private details when you share files.
            </p>

            <h3 className="text-xl font-bold mb-4 text-cyan-400">Common places metadata hides</h3>
            <div className="space-y-3 text-slate-300">
              <div className="flex items-start">
                <Camera className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <span className="inline-block bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded text-sm font-semibold mr-2">Photos</span>
                  <span>EXIF and XMP tags like GPS coordinates, camera model, lens, date taken, and thumbnails.</span>
                </div>
              </div>
              <div className="flex items-start">
                <File className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <span className="inline-block bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded text-sm font-semibold mr-2">PDF</span>
                  <span>"Info" dictionary and XMP packet, plus optional attachments with their own metadata.</span>
                </div>
              </div>
              <div className="flex items-start">
                <FileText className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <span className="inline-block bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded text-sm font-semibold mr-2">Office (DOCX, PPTX, XLSX)</span>
                  <span><code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded text-sm">docProps/</code> within the ZIP container, plus author and revision markers.</span>
                </div>
              </div>
              <div className="flex items-start">
                <Music className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <span className="inline-block bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded text-sm font-semibold mr-2">Audio/Video</span>
                  <span>ID3 or container tags for artist, device, and sometimes GPS or camera data.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Why it matters */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Why it matters
            </h2>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-red-400 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <strong className="text-red-400">Location leakage:</strong> GPS from photos can reveal where you live, work, or travel.
                </div>
              </li>
              <li className="flex items-start">
                <User className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <strong className="text-yellow-400">Identity & device fingerprinting:</strong> Author names, usernames, and company info can identify you.
                </div>
              </li>
              <li className="flex items-start">
                <Calendar className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <strong className="text-orange-400">Workflow exposure:</strong> Creation dates and software details can reveal project history.
                </div>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <strong className="text-red-400">Legal & safety risk:</strong> Sources, investigative locations, or internal document origins could be exposed.
                </div>
              </li>
            </ul>
          </div>

          {/* How to view metadata quickly */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              How to view metadata quickly
            </h2>
            <ul className="space-y-4 text-slate-300 mb-6">
              <li className="flex items-start">
                <Eye className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <strong className="text-cyan-400">Photos:</strong> Right-click properties on Windows or "Get Info" on macOS, or use photo apps showing EXIF. For deep inspection, try <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded text-sm">exiftool</code>.
                </div>
              </li>
              <li className="flex items-start">
                <Eye className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <strong className="text-cyan-400">PDF:</strong> Many viewers show limited properties; for full detail, use a PDF metadata viewer or <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded text-sm">exiftool</code>.
                </div>
              </li>
              <li className="flex items-start">
                <Eye className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <strong className="text-cyan-400">Office:</strong> In Word, Excel, or PowerPoint, select File → Info to see document properties.
                </div>
              </li>
            </ul>

            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">
                  <strong className="text-cyan-400">Tip:</strong> After cleaning a file, inspect the cleaned copy to confirm metadata is gone before sharing.
                </p>
              </div>
            </div>
          </div>

          {/* How removal works in our tool */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              How removal works in our tool
            </h2>
            <ul className="space-y-4 text-slate-300 mb-6">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <strong className="text-cyan-400">Images (JPEG/PNG):</strong> Redrawn in your browser, removing EXIF and GPS tags.
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <strong className="text-cyan-400">PDF:</strong> Clears Title, Author, Subject, Keywords, and Creator fields, and removes XMP metadata.
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <strong className="text-cyan-400">Office (DOCX/PPTX/XLSX):</strong> Rebuilds files without <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded text-sm">docProps</code> and scrubs common author/date markers.
                </div>
              </li>
            </ul>

            <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-sm rounded-xl border border-yellow-500/30 p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">
                  <strong className="text-yellow-400">Important:</strong> The tool does not alter document content such as tracked changes, hidden sheets, or embedded files.
                </p>
              </div>
            </div>
          </div>

          {/* Common fields and risks */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Common fields and risks
            </h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="pb-3 pr-4 text-cyan-400 font-semibold w-1/4">Format</th>
                    <th className="pb-3 pr-4 text-cyan-400 font-semibold">Typical Fields</th>
                    <th className="pb-3 text-cyan-400 font-semibold">Risk Example</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800">
                    <td className="py-4 pr-4">Photos (EXIF/IPTC/XMP)</td>
                    <td className="py-4 pr-4">GPS, date taken, camera make/model, lens, orientation</td>
                    <td className="py-4">Reveals home location or travel routes</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-4 pr-4">PDF (Info/XMP)</td>
                    <td className="py-4 pr-4">Title, author, subject, keywords, creator, producer</td>
                    <td className="py-4">Identifies author or company</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-4 pr-4">DOCX/PPTX/XLSX (OOXML)</td>
                    <td className="py-4 pr-4"><code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded text-sm">docProps</code>, last modified by, revision history</td>
                    <td className="py-4">Leaks usernames or corporate identity</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-4">Audio/Video</td>
                    <td className="py-4 pr-4">Artist, device, recording location</td>
                    <td className="py-4">Links content to an individual or place</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold mb-4 text-cyan-400">Trusted workflow tips</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Keep originals offline; share only cleaned copies.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>For sensitive cases, verify results using <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded text-sm">exiftool</code>.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Consider exporting to formats that naturally hold less metadata.</span>
              </li>
            </ul>
          </div>

          {/* Quick checklist before sharing */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Quick checklist before sharing
            </h2>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5 mr-3" />
                <span>Always work on a <strong className="text-cyan-400">copy</strong> of the original file.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5 mr-3" />
                <span>Clean the copy using <em>Meta-Data Remover</em> or similar tools.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5 mr-3" />
                <span>Re-open the cleaned file and confirm blank fields.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5 mr-3" />
                <span>Remove tracked changes, comments, or hidden sheets.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5 mr-3" />
                <span>Double-check embedded images, thumbnails, or attachments.</span>
              </li>
            </ul>
          </div>

          {/* Myths vs. Reality */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Myths vs. Reality
            </h2>
            <div className="space-y-6 text-slate-300">
              <div className="bg-slate-950/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-start space-x-3 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="font-semibold text-red-400">Myth: "If I screenshot a photo, metadata is gone."</p>
                </div>
                <p className="ml-8 text-slate-400"><em>Reality:</em> Screenshots may still contain device or app data.</p>
              </div>

              <div className="bg-slate-950/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-start space-x-3 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="font-semibold text-red-400">Myth: "PDF export removes everything."</p>
                </div>
                <p className="ml-8 text-slate-400"><em>Reality:</em> Many editors keep XMP and Info fields intact.</p>
              </div>

              <div className="bg-slate-950/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-start space-x-3 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="font-semibold text-red-400">Myth: "Removing author is enough."</p>
                </div>
                <p className="ml-8 text-slate-400"><em>Reality:</em> Other fields like GPS, dates, and revision data remain.</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleOpenTool}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <FileImage className="w-5 h-5" />
              <span>🧼 Open Meta-Data Remover</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-all"
            >
              <span className="text-lg">🖨️</span>
              <span>Print this Guide</span>
            </button>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-cyan-400">Legal Disclaimer:</strong> Meta-Data Remover runs entirely in your browser and attempts to remove image EXIF, PDF Info/XMP, and Office <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded text-xs">docProps</code>. Results can vary by file and application. This tool does not alter document content such as comments, tracked changes, hidden sheets, embedded files, scripts, or attachments. You are responsible for verifying outputs before sharing and for using the tool legally and ethically. No warranties are provided, and CyberLife Coach is not liable for loss, misuse, or non-compliance. Always follow local laws and organizational policies.
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
            <p>&copy; {new Date().getFullYear()} CyberLife Coach</p>
            <p className="text-slate-600">A Veteran-Owned Business Committed to Your Digital Security</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
