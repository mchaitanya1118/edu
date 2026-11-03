import React, { useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Download,
  Eye,
  Trash2,
  ShieldCheck,
  Search,
  Check,
  X,
  Clock,
  Sparkles,
  CheckCheck,
  History,
  FileArchive,
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

type ComplianceDoc = {
  id: string;
  name: string;
  category: 'Institution Accreditation' | 'Course Material' | 'Campus Safety' | 'Agent Agreement';
  courseName?: string;
  cricosCode?: string;
  status: 'Verified' | 'Pending Review' | 'Action Required';
  updatedAt: string;
  expiryDate: string;
  version: string;
  size: string;
  auditorNote: string;
};

const INITIAL_DOCS: ComplianceDoc[] = [
  {
    id: 'DOC-101',
    name: 'CRICOS_Provider_Registration_Certificate_2026.pdf',
    category: 'Institution Accreditation',
    status: 'Verified',
    updatedAt: '12 Oct 2026',
    expiryDate: '31 Dec 2029',
    version: 'v3.2',
    size: '1.8 MB',
    auditorNote: 'TEQSA & ASQA registration verified through Dec 2029.',
  },
  {
    id: 'DOC-102',
    name: 'ASQA_RTO_Scope_of_Registration_45123.pdf',
    category: 'Institution Accreditation',
    status: 'Verified',
    updatedAt: '09 Oct 2026',
    expiryDate: '30 Jun 2028',
    version: 'v2.4',
    size: '2.4 MB',
    auditorNote: 'Includes BSB50420 and ICT60220 training package updates.',
  },
  {
    id: 'DOC-103',
    name: 'BSB50420_Diploma_Leadership_TAS_and_Brochure.pdf',
    category: 'Course Material',
    courseName: 'Diploma of Leadership & Management',
    cricosCode: '104112A',
    status: 'Verified',
    updatedAt: '18 Oct 2026',
    expiryDate: '31 Dec 2027',
    version: 'v4.0',
    size: '5.1 MB',
    auditorNote: 'Training & Assessment Strategy approved for 2026 intakes.',
  },
  {
    id: 'DOC-104',
    name: 'ELICOS_General_English_Curriculum_Matrix.pdf',
    category: 'Course Material',
    courseName: 'General English (ELICOS)',
    cricosCode: '098412B',
    status: 'Pending Review',
    updatedAt: '01 Nov 2026',
    expiryDate: '31 Dec 2027',
    version: 'v1.9',
    size: '3.9 MB',
    auditorNote: 'Awaiting academic dean sign-off on Cambridge C1 module.',
  },
  {
    id: 'DOC-105',
    name: 'Sydney_Kent_St_Campus_Fire_&_Work_Safety_Audit.pdf',
    category: 'Campus Safety',
    status: 'Verified',
    updatedAt: '28 Sep 2026',
    expiryDate: '28 Sep 2027',
    version: 'v2.1',
    size: '4.2 MB',
    auditorNote: 'Cleared for 750 concurrent international students.',
  },
  {
    id: 'DOC-106',
    name: 'Brisbane_Campus_Floorplan_Lease_Addendum.pdf',
    category: 'Campus Safety',
    status: 'Action Required',
    updatedAt: '29 Oct 2026',
    expiryDate: '15 Nov 2026',
    version: 'v1.2',
    size: '2.7 MB',
    auditorNote: 'Requires updated council occupancy certificate signature.',
  },
  {
    id: 'DOC-107',
    name: 'Standard_ESOS_International_Agency_Agreement_2026.pdf',
    category: 'Agent Agreement',
    status: 'Verified',
    updatedAt: '15 Oct 2026',
    expiryDate: '31 Dec 2028',
    version: 'v5.0',
    size: '1.4 MB',
    auditorNote: 'Standard 6 ESOS National Code 2018 compliant agency contract.',
  },
];

export default function SchoolAdminDocumentsPage() {
  const { toast } = useToast();
  const [docs, setDocs] = useState<ComplianceDoc[]>(INITIAL_DOCS);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Upload & Inspector States
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [inspectedDoc, setInspectedDoc] = useState<ComplianceDoc | null>(null);
  const [auditReportOpen, setAuditReportOpen] = useState(false);

  const [newDocName, setNewDocName] = useState('');
  const [newDocCategory, setNewDocCategory] = useState<ComplianceDoc['category']>('Course Material');
  const [newDocCourse, setNewDocCourse] = useState('Diploma of Leadership & Management');

  const handleVerify = (id: string) => {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: 'Verified', auditorNote: 'Manually approved by Compliance Officer.' }
          : d
      )
    );
    if (inspectedDoc?.id === id) {
      setInspectedDoc({
        ...inspectedDoc,
        status: 'Verified',
        auditorNote: 'Manually approved by Compliance Officer.',
      });
    }
    toast('Compliance document marked as Verified', 'success');
  };

  const handleBulkApproveAll = () => {
    setDocs((prev) =>
      prev.map((d) =>
        d.status !== 'Verified'
          ? { ...d, status: 'Verified', auditorNote: 'Bulk approved during Q3 ASQA Readiness Review.' }
          : d
      )
    );
    toast('All pending compliance artifacts marked as Verified (100% Audit Ready)', 'success');
  };

  const handleFlag = (id: string) => {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: 'Action Required', auditorNote: 'Flagged for revision by Admin.' }
          : d
      )
    );
    if (inspectedDoc?.id === id) {
      setInspectedDoc({
        ...inspectedDoc,
        status: 'Action Required',
        auditorNote: 'Flagged for revision by Admin.',
      });
    }
    toast('Revision requested for compliance document', 'info');
  };

  const handleDelete = (id: string) => {
    setDocs((prev) => prev.filter((d) => d.id !== id));
    if (inspectedDoc?.id === id) setInspectedDoc(null);
    toast('Document removed from compliance vault', 'info');
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;
    const formattedName = newDocName.endsWith('.pdf') ? newDocName : `${newDocName}.pdf`;
    const created: ComplianceDoc = {
      id: `DOC-${Math.floor(110 + Math.random() * 890)}`,
      name: formattedName,
      category: newDocCategory,
      courseName: newDocCategory === 'Course Material' ? newDocCourse : undefined,
      cricosCode: newDocCategory === 'Course Material' ? '104112A' : undefined,
      status: 'Verified',
      updatedAt: 'Just now',
      expiryDate: '31 Dec 2028',
      version: 'v1.0',
      size: '2.1 MB',
      auditorNote: 'Uploaded and verified via Provider Portal.',
    };
    setDocs([created, ...docs]);
    setNewDocName('');
    setUploadModalOpen(false);
    toast(`Uploaded ${formattedName} to ASQA Vault`, 'success');
  };

  const filteredDocs = docs.filter((doc) => {
    const matchesCategory = filterCategory === 'All' || doc.category === filterCategory;
    const matchesStatus = statusFilter === 'All' || doc.status === statusFilter;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.courseName || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const verifiedCount = docs.filter((d) => d.status === 'Verified').length;
  const pendingCount = docs.filter((d) => d.status !== 'Verified').length;
  const compliancePercentage = docs.length ? Math.round((verifiedCount / docs.length) * 100) : 100;

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Page Header with Extended Action Options */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="success">ASQA &amp; ESOS National Code 2018</Badge>
              <span className="text-xs text-slate-400 font-mono">RTO #45123 • CRICOS 03812M</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Accreditation &amp; Course Compliance Vault
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Manage mandatory CRICOS registration certificates, Training &amp; Assessment Strategies (TAS), and campus safety audits.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              variant="secondary"
              onClick={() => setAuditReportOpen(true)}
              className="border-indigo-200 bg-indigo-50/70 text-indigo-700 hover:bg-indigo-100"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Run AI ASQA Audit Scan
            </Button>

            {pendingCount > 0 && (
              <Button variant="secondary" onClick={handleBulkApproveAll}>
                <CheckCheck className="w-4 h-4 text-emerald-600" />
                Approve All Pending ({pendingCount})
              </Button>
            )}

            <Button
              variant="secondary"
              onClick={() =>
                toast('Exported complete RTO #45123 ASQA Audit Pack (.zip)', 'success')
              }
            >
              <FileArchive className="w-4 h-4" />
              Export Audit Pack
            </Button>

            <Button onClick={() => setUploadModalOpen(true)}>
              <Upload className="w-4 h-4" />
              Upload Artifact
            </Button>
          </div>
        </div>

        {/* Compliance Summary Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Card className="p-6 bg-gradient-to-br from-emerald-50/80 via-white to-white border-emerald-200/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Overall Audit Readiness
              </span>
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-slate-900">{compliancePercentage}%</span>
              <Badge variant="success">
                {verifiedCount} of {docs.length} Verified
              </Badge>
            </div>
            <div className="w-full h-2 rounded-full bg-emerald-100 mt-4 overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all"
                style={{ width: `${compliancePercentage}%` }}
              />
            </div>
            <p className="text-xs text-slate-600 mt-3">
              All core CRICOS provider certificates are active and syndicated to partner agencies.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Mandatory Checklist
              </span>
              <Badge variant="info">4 Core Pillars</Badge>
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="flex items-center gap-2 font-medium text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  CRICOS Provider Registration (03812M)
                </span>
                <span className="text-emerald-700 font-semibold">Valid 2029</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="flex items-center gap-2 font-medium text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ASQA Scope of Registration (45123)
                </span>
                <span className="text-emerald-700 font-semibold">Verified</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="flex items-center gap-2 font-medium text-slate-800">
                  <Clock className="w-4 h-4 text-amber-500" />
                  ELICOS 2026 Curriculum Matrix
                </span>
                <span className="text-amber-700 font-semibold">In Review</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="flex items-center gap-2 font-medium text-slate-800">
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                  Brisbane Occupancy Addendum
                </span>
                <span className="text-rose-600 font-semibold">Signature Due</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 flex flex-col justify-between bg-slate-900 text-white border-slate-800">
            <div>
              <Badge variant="info" className="bg-blue-500/20 text-blue-300 border-blue-400/30 mb-3">
                Agency Syndication Active
              </Badge>
              <h3 className="text-base font-bold text-white">
                Instant Course Brochure Distribution
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Whenever a Course Material PDF is marked as <strong>Verified</strong>, all 42
                partner agencies receive the updated intake brochure in their quote builder.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Last synced: 4 mins ago</span>
              <span className="text-emerald-400 font-semibold">● Live Sync</span>
            </div>
          </Card>
        </div>

        {/* Multi-Dimensional Filter & Ledger */}
        <Card className="p-0 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {[
                'All',
                'Institution Accreditation',
                'Course Material',
                'Campus Safety',
                'Agent Agreement',
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    filterCategory === cat
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              {/* Status Filter Select */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-auto h-9 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-600"
              >
                <option value="All">Status: All ({docs.length})</option>
                <option value="Verified">Verified Only</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Action Required">Action Required</option>
              </select>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by file or course..."
                  className="w-full h-9 bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-5 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      doc.status === 'Verified'
                        ? 'bg-emerald-50 text-emerald-600'
                        : doc.status === 'Pending Review'
                        ? 'bg-amber-50 text-amber-600'
                        : 'bg-rose-50 text-rose-600'
                    }`}
                  >
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-slate-900">{doc.name}</span>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        {doc.version}
                      </span>
                      <Badge
                        variant={
                          doc.status === 'Verified'
                            ? 'success'
                            : doc.status === 'Pending Review'
                            ? 'warning'
                            : 'error'
                        }
                      >
                        {doc.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600">{doc.auditorNote}</p>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-0.5">
                      <span className="font-medium text-slate-600">{doc.category}</span>
                      {doc.courseName && (
                        <>
                          <span>•</span>
                          <span className="text-blue-600 font-medium">
                            {doc.courseName} ({doc.cricosCode})
                          </span>
                        </>
                      )}
                      <span>•</span>
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>Updated {doc.updatedAt}</span>
                      <span>•</span>
                      <span className="text-slate-500">Valid thru {doc.expiryDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setInspectedDoc(doc)}
                    title="Inspect Document & Audit History"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Inspect
                  </Button>

                  {doc.status !== 'Verified' && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleVerify(doc.id)}
                      className="text-emerald-700 border-emerald-200 bg-emerald-50 hover:bg-emerald-100"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Approve
                    </Button>
                  )}
                  {doc.status === 'Verified' && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleFlag(doc.id)}
                      className="text-amber-700 hover:bg-amber-50"
                    >
                      Request Revision
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => toast(`Downloading ${doc.name}...`, 'info')}
                  >
                    <Download className="w-3.5 h-3.5" />
                  </Button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete Artifact"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Slide-Over Document Inspector & Version History Drawer */}
        {inspectedDoc && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end">
            <div className="w-full max-w-lg bg-white h-full shadow-2xl border-l border-slate-200 p-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-blue-600">
                        {inspectedDoc.id} • {inspectedDoc.version}
                      </span>
                      <Badge
                        variant={
                          inspectedDoc.status === 'Verified'
                            ? 'success'
                            : inspectedDoc.status === 'Pending Review'
                            ? 'warning'
                            : 'error'
                        }
                      >
                        {inspectedDoc.status}
                      </Badge>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-1 break-all">
                      {inspectedDoc.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setInspectedDoc(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
                  <div>
                    <span className="text-slate-400 block">Category</span>
                    <span className="font-bold text-slate-900">{inspectedDoc.category}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Valid Until</span>
                    <span className="font-bold text-slate-900">{inspectedDoc.expiryDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">File Size</span>
                    <span className="font-bold text-slate-900">{inspectedDoc.size}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">SHA-256 Checksum</span>
                    <span className="font-mono text-emerald-700 font-semibold">8f94d2...e41b</span>
                  </div>
                </div>

                {/* Auditor Notes */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Compliance Auditor Note
                  </span>
                  <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-slate-800">
                    {inspectedDoc.auditorNote}
                  </div>
                </div>

                {/* Version Audit Trail */}
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5" />
                    Immutable Version History
                  </span>
                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-900">
                          {inspectedDoc.version} (Current Active Artifact)
                        </p>
                        <p className="text-slate-500">Uploaded by Dr. Yuki Tanaka • {inspectedDoc.updatedAt}</p>
                      </div>
                      <Badge variant="success">Active</Badge>
                    </div>
                    <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-600">v1.0 (Initial Registration Filing)</p>
                        <p className="text-slate-400">Archived 14 Jan 2026</p>
                      </div>
                      <span className="text-[11px] text-slate-400">Archived</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <Button
                  variant="secondary"
                  onClick={() => toast(`Downloading ${inspectedDoc.name}...`, 'info')}
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
                <div className="flex items-center gap-2">
                  {inspectedDoc.status !== 'Verified' ? (
                    <Button onClick={() => handleVerify(inspectedDoc.id)}>
                      <Check className="w-4 h-4" />
                      Approve &amp; Verify
                    </Button>
                  ) : (
                    <Button variant="secondary" onClick={() => handleFlag(inspectedDoc.id)}>
                      Flag for Revision
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI ASQA Audit Scan Modal */}
        {auditReportOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="w-full max-w-lg p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      AI ASQA &amp; ESOS Compliance Scan
                    </h3>
                    <p className="text-xs text-slate-500">
                      Automated National Code 2018 Standard 1–11 Verification
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setAuditReportOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-emerald-950">
                      Standard 1 &amp; 2: Marketing &amp; Student Information (100% Pass)
                    </p>
                    <p className="text-emerald-800 mt-0.5">
                      All published course brochures display CRICOS #03812M and RTO #45123 clearly.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-emerald-950">
                      Standard 4: Education Agents Written Agreements (100% Pass)
                    </p>
                    <p className="text-emerald-800 mt-0.5">
                      42 active agency agreements signed with mandatory ESOS termination &amp; monitoring clauses.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-amber-950">
                      Standard 11: CRICOS Campus Capacity &amp; Premises (1 Action Item)
                    </p>
                    <p className="text-amber-800 mt-0.5">
                      Brisbane campus lease addendum requires updated council signature before 15 Nov 2026.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="secondary" onClick={() => setAuditReportOpen(false)}>
                  Close Report
                </Button>
                <Button
                  onClick={() => {
                    handleBulkApproveAll();
                    setAuditReportOpen(false);
                  }}
                >
                  Resolve &amp; Verify All Artifacts
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Upload Modal */}
        {uploadModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="w-full max-w-lg p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Upload Compliance or Course Document
                  </h3>
                  <p className="text-xs text-slate-500">
                    Files are encrypted and logged against RTO #45123 audit trail.
                  </p>
                </div>
                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUploadSubmit} className="space-y-4">
                <Input
                  label="Document Filename"
                  placeholder="e.g. BSB50420_Assessment_Guide_2026.pdf"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  required
                />

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Compliance Category
                  </label>
                  <select
                    value={newDocCategory}
                    onChange={(e) =>
                      setNewDocCategory(e.target.value as ComplianceDoc['category'])
                    }
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="Course Material">Course Material &amp; Brochure</option>
                    <option value="Institution Accreditation">Institution Accreditation</option>
                    <option value="Campus Safety">Campus Safety &amp; Occupancy</option>
                    <option value="Agent Agreement">Agent Agreement</option>
                  </select>
                </div>

                {newDocCategory === 'Course Material' && (
                  <Input
                    label="Associated CRICOS Course"
                    value={newDocCourse}
                    onChange={(e) => setNewDocCourse(e.target.value)}
                  />
                )}

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setUploadModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Upload className="w-4 h-4" />
                    Upload &amp; Verify
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
