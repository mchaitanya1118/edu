import React, { useState, useRef } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  FileText,
  Upload,
  CheckCircle2,
  Clock,
  Eye,
  Download,
  Search,
  Filter,
  ShieldCheck,
  Plus,
  X,
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';
import { DocumentViewerModal, ViewableDocument } from '../../components/documents/DocumentViewerModal';

export type StudentDocument = {
  id: string;
  student: string;
  docType: string;
  file: string;
  size: string;
  status: 'Verified' | 'Pending Review';
  updated: string;
  sha256?: string;
};

const INITIAL_STUDENT_DOCS: StudentDocument[] = [
  {
    id: 'SD-01',
    student: 'Mateo Silva',
    docType: 'Passport Bio Page & Colombian National ID',
    file: 'Mateo_Silva_Passport_2026.pdf',
    size: '2.4 MB',
    status: 'Verified',
    updated: '2 hours ago',
    sha256: '9f83ac12...b471',
  },
  {
    id: 'SD-02',
    student: 'Mateo Silva',
    docType: 'Genuine Student (GST / GTE) Statement',
    file: 'Mateo_Silva_GS_Statement_Signed.pdf',
    size: '1.2 MB',
    status: 'Verified',
    updated: '1 day ago',
    sha256: 'a127bc99...4401',
  },
  {
    id: 'SD-03',
    student: 'Yuki Tanaka',
    docType: 'IELTS Academic 6.5 Certificate',
    file: 'Yuki_Tanaka_IELTS_TRF.pdf',
    size: '880 KB',
    status: 'Pending Review',
    updated: '3 hours ago',
    sha256: 'd45290f1...7712',
  },
  {
    id: 'SD-04',
    student: 'Arjun Nair',
    docType: 'Undergraduate Academic Transcript & Degree',
    file: 'Arjun_Nair_BSc_Transcript.pdf',
    size: '3.1 MB',
    status: 'Verified',
    updated: '4 days ago',
    sha256: 'f8821903...bb21',
  },
  {
    id: 'SD-05',
    student: 'Camila Rojas',
    docType: 'Overseas Student Health Cover (OSHC) Policy',
    file: 'Camila_Rojas_OSHC_Bupa.pdf',
    size: '1.5 MB',
    status: 'Verified',
    updated: 'Just now',
    sha256: '190ab421...99ef',
  },
];

export default function AgentDocumentsPage() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [docs, setDocs] = useState<StudentDocument[]>(INITIAL_STUDENT_DOCS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewingDoc, setViewingDoc] = useState<ViewableDocument | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // New doc form state
  const [newStudent, setNewStudent] = useState('Mateo Silva');
  const [newType, setNewType] = useState('Passport Bio Page & ID');
  const [newFileName, setNewFileName] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const uploaded = Array.from(files).map((f, idx) => ({
      id: `SD-${Math.floor(10 + Math.random() * 89)}`,
      student: newStudent || 'Enrolled Candidate',
      docType: newType || 'Admissions Document',
      file: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
      status: 'Verified' as const,
      updated: 'Just now',
      sha256: '88e210fa...4102',
    }));
    setDocs((prev) => [...uploaded, ...prev]);
    setShowUploadModal(false);
    toast(`Uploaded ${files.length} document(s) successfully! You can now click "View" to preview.`, 'success');
  };

  const handleManualUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;
    const formatted = newFileName.endsWith('.pdf') ? newFileName : `${newFileName}.pdf`;
    const created: StudentDocument = {
      id: `SD-${Math.floor(10 + Math.random() * 89)}`,
      student: newStudent,
      docType: newType,
      file: formatted,
      size: '2.1 MB',
      status: 'Verified',
      updated: 'Just now',
      sha256: '99ca1029...dd14',
    };
    setDocs([created, ...docs]);
    setNewFileName('');
    setShowUploadModal(false);
    toast(`Document ${formatted} uploaded to vault!`, 'success');
  };

  const filtered = docs.filter((d) => {
    const matchesSearch =
      d.file.toLowerCase().includes(search.toLowerCase()) ||
      d.student.toLowerCase().includes(search.toLowerCase()) ||
      d.docType.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Hidden genuine file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileUpload}
          accept=".pdf,.png,.jpg,.jpeg"
        />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="info">Subclass 500 Visa Checklist</Badge>
              <span className="text-xs text-slate-400">ESOS &amp; PRISMS Document Repository</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Student Visa &amp; Admissions Document Vault
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Securely store, upload, and inspect verified student passports, English test scores, OSHC policies, and Genuine Student statements.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
              className="gap-1.5"
            >
              <Upload className="w-4 h-4 text-blue-600" />
              Quick File Drop
            </Button>
            <Button
              onClick={() => setShowUploadModal(true)}
              className="gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Upload Student Document
            </Button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-xl w-fit flex-wrap">
            {['All', 'Verified', 'Pending Review'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === st
                    ? 'bg-white text-blue-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search file, student, doc type..."
              className="w-full h-9 bg-white border border-slate-200 rounded-xl pl-9 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>

        {/* Documents Ledger with View Option */}
        <Card className="p-0 overflow-hidden shadow-xs">
          <div className="divide-y divide-slate-100">
            {filtered.map((d) => (
              <div
                key={d.id}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-slate-900">{d.file}</h3>
                      <Badge variant={d.status === 'Verified' ? 'success' : 'warning'}>
                        {d.status}
                      </Badge>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {d.size}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Student: <strong className="text-slate-800">{d.student}</strong> • {d.docType}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Uploaded {d.updated} • Checksum SHA-256: <span className="font-mono">{d.sha256}</span>
                    </p>
                  </div>
                </div>

                {/* View and Action Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                      setViewingDoc({
                        id: d.id,
                        name: d.file,
                        docType: d.docType,
                        studentName: d.student,
                        uploadedAt: d.updated,
                        size: d.size,
                        status: d.status,
                        sha256: d.sha256,
                      })
                    }
                    className="gap-1.5 h-8 text-xs font-semibold text-blue-700 bg-blue-50/80 hover:bg-blue-100 border-blue-200"
                    title="View and preview document"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-600" />
                    View Document
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toast(`Downloaded ${d.file} from vault`, 'success')}
                    className="h-8 px-2.5 text-xs text-slate-600 hover:text-slate-900"
                    title="Download file"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-6 space-y-4 bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900">Upload Student Visa Document</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleManualUploadSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Student Candidate
                  </label>
                  <select
                    value={newStudent}
                    onChange={(e) => setNewStudent(e.target.value)}
                    className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-600"
                  >
                    <option value="Mateo Silva">Mateo Silva (STU-401)</option>
                    <option value="Yuki Tanaka">Yuki Tanaka (STU-402)</option>
                    <option value="Camila Rojas">Camila Rojas (STU-403)</option>
                    <option value="Arjun Nair">Arjun Nair (STU-404)</option>
                    <option value="Lucas Fernandez">Lucas Fernandez (STU-405)</option>
                    <option value="Haruto Sato">Haruto Sato (STU-406)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Document Category
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-600"
                  >
                    <option value="Passport Bio Page & ID">Passport Bio Page &amp; National ID</option>
                    <option value="Genuine Student (GS / GTE) Statement">Genuine Student (GS) Statement</option>
                    <option value="IELTS Academic TRF Certificate">English Language Proficiency Report</option>
                    <option value="Academic Transcript & Degree">Academic Records &amp; Transcripts</option>
                    <option value="Overseas Student Health Cover (OSHC)">OSHC Policy Certificate</option>
                    <option value="Financial Bank Statement Guarantor">Financial Capacity &amp; Bank Letter</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Document File Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mateo_Silva_Bank_Statement.pdf"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    required
                    className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs gap-1"
                  >
                    <Upload className="w-3.5 h-3.5" /> Select Local File
                  </Button>
                  <div className="flex gap-2">
                    <Button type="button" variant="secondary" onClick={() => setShowUploadModal(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Upload &amp; Verify</Button>
                  </div>
                </div>
              </form>
            </Card>
          </div>
        )}

        {/* Document Viewer Modal */}
        {viewingDoc && (
          <DocumentViewerModal
            document={viewingDoc}
            onClose={() => setViewingDoc(null)}
          />
        )}
      </div>
    </AppLayout>
  );
}
