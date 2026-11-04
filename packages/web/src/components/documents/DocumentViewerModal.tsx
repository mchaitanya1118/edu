import React, { useState } from 'react';
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  HardDrive,
  Eye,
  FileCheck,
  User,
  Building2,
  Printer,
  Sparkles,
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useToast } from '../ui/Toast';

export type ViewableDocument = {
  id?: string;
  name: string;
  docType?: string;
  studentName?: string;
  uploadedAt?: string;
  size?: string;
  status?: 'Verified' | 'Pending Review' | 'Uploaded' | 'Action Required';
  verifiedBy?: string;
  sha256?: string;
  pages?: number;
};

interface DocumentViewerModalProps {
  document: ViewableDocument | null;
  onClose: () => void;
  onDownload?: (doc: ViewableDocument) => void;
}

export function DocumentViewerModal({
  document,
  onClose,
  onDownload,
}: DocumentViewerModalProps) {
  const { toast } = useToast();
  const [zoom, setZoom] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  if (!document) return null;

  const handleDownload = () => {
    if (onDownload) {
      onDownload(document);
    } else {
      toast(`Downloaded ${document.name} (PDF Document)`, 'success');
    }
  };

  const handlePrint = () => {
    toast(`Sent ${document.name} to printer queue`, 'info');
  };

  const docName = document.name;
  const isPassport = docName.toLowerCase().includes('passport');
  const isSOP = docName.toLowerCase().includes('statement') || docName.toLowerCase().includes('purpose') || docName.toLowerCase().includes('gte');
  const isTranscript = docName.toLowerCase().includes('transcript') || docName.toLowerCase().includes('academic');
  const isEnglish = docName.toLowerCase().includes('english') || docName.toLowerCase().includes('ielts') || docName.toLowerCase().includes('test');
  const isOSHC = docName.toLowerCase().includes('oshc') || docName.toLowerCase().includes('health') || docName.toLowerCase().includes('bupa');

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div
        className={`bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 ${
          isFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-5xl h-[92vh]'
        }`}
      >
        {/* Top Header Bar */}
        <div className="h-14 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between shrink-0 text-white">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold truncate text-white max-w-[200px] sm:max-w-md">
                  {document.name}
                </h3>
                <Badge
                  variant={
                    document.status === 'Verified' || document.status === 'Uploaded'
                      ? 'success'
                      : 'warning'
                  }
                  className="text-[10px] shrink-0"
                >
                  {document.status || 'Verified'}
                </Badge>
              </div>
              <p className="text-[11px] text-slate-400 truncate hidden sm:block">
                {document.studentName ? `Student: ${document.studentName} • ` : ''}
                {document.docType || 'CRICOS Compliance Document'} • {document.size || '1.8 MB'}
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center bg-slate-800/80 rounded-xl p-0.5 border border-slate-700/60">
              <button
                type="button"
                onClick={() => setZoom((prev) => Math.max(50, prev - 15))}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/60 transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono text-slate-300 px-2 min-w-[44px] text-center">
                {zoom}%
              </span>
              <button
                type="button"
                onClick={() => setZoom((prev) => Math.min(175, prev + 15))}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/60 transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            <Button
              size="sm"
              variant="secondary"
              onClick={handlePrint}
              className="hidden md:inline-flex bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 h-8 px-2.5 text-xs gap-1"
              title="Print Document"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </Button>

            <Button
              size="sm"
              onClick={handleDownload}
              className="bg-blue-600 hover:bg-blue-500 text-white h-8 px-3 text-xs gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </Button>

            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer ml-1"
              title="Close Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewer Workspace */}
        <div className="flex-1 overflow-auto bg-slate-950 p-4 sm:p-8 flex justify-center items-start">
          <div
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            className="transition-transform duration-150 ease-out w-full max-w-2xl bg-white text-slate-900 rounded-xl shadow-2xl p-8 sm:p-12 relative border border-slate-200"
          >
            {/* Authenticity Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.035]">
              <span className="text-7xl font-black uppercase rotate-[-30deg] tracking-widest text-slate-900 select-none">
                VERIFIED SUBCLASS 500
              </span>
            </div>

            {/* Document Header */}
            <div className="border-b-2 border-slate-900 pb-5 mb-6 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-blue-700 block mb-1">
                  COMMONWEALTH OF AUSTRALIA • PRISMS &amp; ESOS VERIFIED
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {isPassport
                    ? 'INTERNATIONAL TRAVEL PASSPORT BIO PAGE'
                    : isSOP
                    ? 'GENUINE STUDENT (GS) / GTE APPLICANT STATEMENT'
                    : isTranscript
                    ? 'OFFICIAL ACADEMIC TRANSCRIPT & RECORD'
                    : isEnglish
                    ? 'IELTS ACADEMIC ENGLISH TEST REPORT'
                    : isOSHC
                    ? 'OVERSEAS STUDENT HEALTH COVER (OSHC) POLICY'
                    : 'INTERNATIONAL ADMISSIONS COMPLIANCE FILING'}
                </h1>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Reference File: <span className="font-mono font-semibold">{document.name}</span>
                </p>
              </div>

              <div className="text-right shrink-0">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  AUTHENTICATED
                </div>
                <p className="text-[10px] font-mono text-slate-400 mt-1">
                  SHA: {document.sha256 || 'e3b0c442...8b4567'}
                </p>
              </div>
            </div>

            {/* Dynamic Document Content Body based on type */}
            {isPassport && (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="col-span-1 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg h-36 flex flex-col items-center justify-center border border-blue-200 text-blue-700">
                    <User className="w-12 h-12 text-blue-600 mb-1" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Passport Photo</span>
                    <span className="text-[9px] text-slate-500">ICAO Compliant</span>
                  </div>
                  <div className="col-span-2 space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Given Names / Surname</span>
                      <span className="text-sm font-bold text-slate-900">{document.studentName || 'SILVA MATEO'}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Nationality</span>
                        <span className="font-bold text-slate-800">COLOMBIA (COL)</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Passport Number</span>
                        <span className="font-mono font-bold text-blue-700">CO9928114</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Date of Birth</span>
                        <span className="font-medium text-slate-800">18 MAY 2001</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Expiry Date</span>
                        <span className="font-medium text-emerald-700 font-bold">14 OCT 2031</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Machine Readable Zone (MRZ) */}
                <div className="p-3.5 bg-slate-950 text-emerald-400 rounded-lg font-mono text-[11px] sm:text-xs tracking-widest leading-relaxed border border-slate-800 overflow-x-auto">
                  <p>P&lt;COL&lt;SILVA&lt;&lt;MATEO&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</p>
                  <p>CO99281143COL0105184M3110148&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;06</p>
                </div>
              </div>
            )}

            {isSOP && (
              <div className="space-y-4 text-xs leading-relaxed text-slate-700">
                <p className="font-semibold text-slate-900">
                  To: The Department of Home Affairs (Subclass 500 Student Visa Assessment Unit)
                </p>
                <p>
                  <strong>Subject:</strong> Genuine Student (GS) Criterion Statement of Purpose for International Study in Australia.
                </p>
                <p className="text-justify">
                  I hereby declare my genuine intention to undertake the Diploma of Leadership &amp; Management at Australian Pacific College (CRICOS 03812M). My career objective is to return to Colombia to assume operations management within South American multinational enterprise logistics. The Australian Vocational Education and Training (VET) framework provides practical, ASQA-accredited skills unachievable through domestic university curricula.
                </p>
                <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-200 text-[11px] text-blue-900 space-y-1">
                  <p className="font-bold">GS Capability Matrix Cleared:</p>
                  <p>• Verified economic background and familial ties to home country.</p>
                  <p>• Tuition and 12-month living expenses (A$29,710) fully funded via approved institutional guarantor.</p>
                </div>
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Applicant Signature</p>
                    <p className="font-serif italic font-bold text-sm text-blue-900 mt-1">Mateo Silva</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Date of Execution</p>
                    <p className="font-mono text-xs font-semibold text-slate-800 mt-1">02 November 2026</p>
                  </div>
                </div>
              </div>
            )}

            {isTranscript && (
              <div className="space-y-4 text-xs">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div>
                    <p className="font-bold text-slate-900">INSTITUTO DE BACHILLERATO BOGOTÁ</p>
                    <p className="text-[11px] text-slate-500">Ministry of National Education Registration #88192</p>
                  </div>
                  <Badge variant="success">GPA 3.8 / 4.0</Badge>
                </div>

                <table className="w-full text-left border-collapse border border-slate-200">
                  <thead>
                    <tr className="bg-slate-100 text-[10px] uppercase font-bold text-slate-600">
                      <th className="p-2 border border-slate-200">Academic Subject</th>
                      <th className="p-2 border border-slate-200 text-center">Grade</th>
                      <th className="p-2 border border-slate-200 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-2 border border-slate-200 font-medium">Business Mathematics &amp; Statistics</td>
                      <td className="p-2 border border-slate-200 text-center font-bold text-emerald-700">A (94%)</td>
                      <td className="p-2 border border-slate-200 text-center">Completed</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-slate-200 font-medium">English as a Foreign Language (Advanced)</td>
                      <td className="p-2 border border-slate-200 text-center font-bold text-emerald-700">A (96%)</td>
                      <td className="p-2 border border-slate-200 text-center">Completed</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-slate-200 font-medium">Economics &amp; Commercial Law</td>
                      <td className="p-2 border border-slate-200 text-center font-bold text-emerald-700">A- (91%)</td>
                      <td className="p-2 border border-slate-200 text-center">Completed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {isEnglish && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 block">IDP • British Council • Cambridge English</span>
                    <h3 className="text-base font-black text-slate-900">IELTS ACADEMIC TEST REPORT FORM</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-red-600 font-mono">6.5</span>
                    <p className="text-[10px] font-bold text-slate-600">OVERALL BAND</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="text-[10px] text-slate-400 font-bold">LISTENING</p>
                    <p className="text-sm font-bold font-mono text-slate-900 mt-0.5">7.0</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="text-[10px] text-slate-400 font-bold">READING</p>
                    <p className="text-sm font-bold font-mono text-slate-900 mt-0.5">6.5</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="text-[10px] text-slate-400 font-bold">WRITING</p>
                    <p className="text-sm font-bold font-mono text-slate-900 mt-0.5">6.0</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="text-[10px] text-slate-400 font-bold">SPEAKING</p>
                    <p className="text-sm font-bold font-mono text-slate-900 mt-0.5">6.5</p>
                  </div>
                </div>
                <p className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                  ✔ Meets Subclass 500 CRICOS Direct Entry Minimum (IELTS 6.0 Equivalent).
                </p>
              </div>
            )}

            {!isPassport && !isSOP && !isTranscript && !isEnglish && (
              <div className="space-y-4 text-xs text-slate-700">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <p className="font-bold text-slate-900">Certificate of Compliance &amp; Authenticity</p>
                  <p>
                    This document has been ingested into the AusEdu Connect secure vault. Content has been scanned for ASQA Standard compliance and verified by the designated Education Agency and Institution Admissions Team.
                  </p>
                  <div className="pt-2 border-t border-slate-200 flex justify-between text-[11px] text-slate-500 font-mono">
                    <span>STATUS: VALID &amp; ENROLLED</span>
                    <span>ENCRYPTION: AES-256 GCM</span>
                  </div>
                </div>
              </div>
            )}

            {/* Document Footer */}
            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>DOC REF: {document.id || 'AEC-DOC-2026-991'}</span>
              <span>PAGE 1 OF {document.pages || 1}</span>
              <span>CONFIDENTIAL - FOR VISA &amp; ADMISSIONS ONLY</span>
            </div>
          </div>
        </div>

        {/* Bottom Information Footer Bar */}
        <div className="h-12 bg-slate-900 border-t border-slate-800 px-4 sm:px-6 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified &amp; Stored securely in AusEdu Connect
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:inline">
              Uploaded: {document.uploadedAt || 'Today'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700 h-7 text-xs"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

