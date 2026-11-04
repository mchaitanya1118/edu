import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  FileText,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Download,
  Eye,
  GraduationCap,
  Sparkles,
  CreditCard,
  Building2,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Clock,
  Percent,
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';
import { DocumentViewerModal, ViewableDocument } from '../../components/documents/DocumentViewerModal';

export default function StudentProfilePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'documents' | 'commission'>('overview');
  const [viewingDoc, setViewingDoc] = useState<ViewableDocument | null>(null);

  const student = {
    id: 'STU-401',
    name: 'Mateo Silva',
    email: 'mateo.silva@gmail.com',
    phone: '+61 412 889 012',
    nationality: 'Colombia',
    passportNumber: 'CO9928114',
    passportExpiry: '14 May 2031',
    dob: '18 Aug 2000 (26 yrs)',
    address: '42 Wentworth Ave, Surry Hills NSW 2010',
    visaStatus: 'Subclass 500 (Lodged)',
    visaExpiry: '30 Aug 2027',
    gsScore: 94,
    riskRating: 'Low Risk (Tier 1)',
    coeRef: 'COE-26-904122',
    intakeTerm: 'Term 3 • 14 Jul 2026',
    enrolledCourse: {
      name: 'Diploma of Leadership and Management',
      cricosCode: '104112A',
      nationalCode: 'BSB50420',
      provider: 'Australian Pacific College (APC)',
      campus: 'Sydney CBD (Kent St)',
      durationWeeks: 52,
      tuitionFee: 14800,
      materialFee: 0,
      enrolmentFee: 200,
    },
    commission: {
      rate: 22,
      tier: 'Preferred Tier-1 Partner',
      totalAmount: 3256,
      status: 'Available for Payout',
      agreementRef: 'APC-2026-T1-AGY',
      rctiNumber: 'RCTI-2026-081',
      milestones: [
        { label: 'Milestone 1: CoE Confirmation Deposit (50%)', amount: 1628, cleared: true, date: '02 Nov 2026' },
        { label: 'Milestone 2: Term 2 Census Date (50%)', amount: 1628, cleared: true, date: '04 Nov 2026' },
      ],
    },
    documents: [
      { id: 'DOC-1', name: 'Passport_Bio_Page_Silva_Mateo.pdf', docType: 'Passport Bio Page', status: 'verified', size: '2.1 MB', date: '01 Nov 2026' },
      { id: 'DOC-2', name: 'Genuine_Student_Statement_GS_Final.pdf', docType: 'Genuine Student Statement', status: 'verified', size: '1.4 MB', date: '02 Nov 2026' },
      { id: 'DOC-3', name: 'IELTS_Academic_TRF_6.5.pdf', docType: 'English Test Report', status: 'verified', size: '880 KB', date: '28 Oct 2026' },
      { id: 'DOC-4', name: 'Financial_Capacity_Bank_Statement.pdf', docType: 'Financial Evidence', status: 'verified', size: '3.6 MB', date: '02 Nov 2026' },
      { id: 'DOC-5', name: 'PRISMS_Confirmation_Of_Enrolment_COE.pdf', docType: 'CoE Confirmation', status: 'verified', size: '920 KB', date: '03 Nov 2026' },
    ],
  };

  const handleClaimCommission = () => {
    toast(`Commission payment request of A$${student.commission.totalAmount.toLocaleString()} submitted. Remittance advice dispatched.`, 'success');
  };

  return (
    <AppLayout>
      <div className="space-y-7 pb-12">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1 font-semibold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <Link to="/students" className="hover:text-blue-600">Students CRM</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-blue-600 font-bold">{student.name} ({student.id})</span>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/quotes">
              <Button size="sm" variant="secondary" className="text-xs">
                Generate Additional Quote
              </Button>
            </Link>
            <Button size="sm" onClick={() => toast(`Student dossier exported for ${student.name}`, 'success')} className="text-xs">
              <Download className="w-3.5 h-3.5" />
              Export Candidate Dossier
            </Button>
          </div>
        </div>

        {/* Candidate Profile Hero Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-extrabold text-2xl flex items-center justify-center shadow-md shrink-0">
                {student.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold text-slate-900">{student.name}</h1>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    {student.id}
                  </span>
                  <Badge variant="success">{student.visaStatus}</Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                  <span className="flex items-center gap-1 font-medium text-slate-700">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    Nationality: {student.nationality}
                  </span>
                  <span>•</span>
                  <span>Passport: <strong className="font-mono text-slate-800">{student.passportNumber}</strong></span>
                  <span>•</span>
                  <span>PRISMS CoE: <strong className="font-mono text-blue-700">{student.coeRef}</strong></span>
                </div>
              </div>
            </div>

            {/* GS Score & Commission Metric */}
            <div className="flex items-center gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[120px]">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">GTE Risk Score</span>
                <span className="text-xl font-extrabold text-emerald-700 block mt-0.5">{student.gsScore}%</span>
                <span className="text-[10px] text-emerald-800 font-medium">Low Risk (Tier 1)</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center min-w-[140px]">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">Agent Commission</span>
                <span className="text-xl font-extrabold text-emerald-700 block mt-0.5">A${student.commission.totalAmount.toLocaleString()}</span>
                <span className="text-[10px] text-emerald-800 font-bold">{student.commission.status}</span>
              </div>
            </div>
          </div>

          {/* Profile Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100">
            {[
              { key: 'overview', label: 'Candidate Overview' },
              { key: 'courses', label: 'Enrolled Course & CoE' },
              { key: 'documents', label: `Compliance Vault (${student.documents.length})` },
              { key: 'commission', label: 'Commission Schedule' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-5 border border-slate-200 shadow-2xs space-y-3.5">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <User className="w-4 h-4 text-blue-600" />
                Personal Particulars &amp; Contact
              </h3>
              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">Full Legal Name:</span>
                  <span className="font-semibold text-slate-900">{student.name}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">Date of Birth:</span>
                  <span className="font-semibold text-slate-900">{student.dob}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">Email Address:</span>
                  <span className="font-semibold text-slate-900">{student.email}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">Australian Mobile:</span>
                  <span className="font-semibold text-slate-900">{student.phone}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">Residential Address:</span>
                  <span className="font-semibold text-slate-900 text-right max-w-xs">{student.address}</span>
                </div>
              </div>
            </Card>

            <Card className="p-5 border border-slate-200 shadow-2xs space-y-3.5">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Passport &amp; Immigration Compliance
              </h3>
              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">Passport Number:</span>
                  <span className="font-mono font-bold text-slate-900">{student.passportNumber}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">Passport Expiry:</span>
                  <span className="font-semibold text-slate-900">{student.passportExpiry}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">Visa Subclass:</span>
                  <span className="font-semibold text-slate-900">Student Visa (Subclass 500)</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">Visa Valid Through:</span>
                  <span className="font-semibold text-blue-700">{student.visaExpiry}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">Health Cover (OSHC):</span>
                  <span className="font-semibold text-emerald-700">Bupa International Active</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* TAB 2: ENROLLED COURSES */}
        {activeTab === 'courses' && (
          <Card className="p-6 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">{student.enrolledCourse.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {student.enrolledCourse.provider} • CRICOS {student.enrolledCourse.cricosCode}
                </p>
              </div>
              <Badge variant="success">Confirmed PRISMS CoE</Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block">Campus</span>
                <strong className="text-slate-900">{student.enrolledCourse.campus}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Commencement</span>
                <strong className="text-blue-700">{student.intakeTerm}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Duration</span>
                <strong className="text-slate-900">{student.enrolledCourse.durationWeeks} Weeks</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Total Tuition</span>
                <strong className="text-emerald-700">A${student.enrolledCourse.tuitionFee.toLocaleString()} AUD</strong>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Link to="/agent/course-details">
                <Button size="sm" variant="secondary" className="text-xs">
                  Inspect Course Syllabus &amp; Units
                </Button>
              </Link>
            </div>
          </Card>
        )}

        {/* TAB 3: DOCUMENTS */}
        {activeTab === 'documents' && (
          <Card className="p-0 overflow-hidden border border-slate-200 shadow-2xs">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">Student Compliance Artifacts &amp; Transcripts</h3>
              <span className="text-xs text-slate-500">{student.documents.length} verified documents</span>
            </div>

            <div className="divide-y divide-slate-100">
              {student.documents.map((doc) => (
                <div key={doc.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{doc.name}</p>
                      <p className="text-[11px] text-slate-500">{doc.docType} • {doc.size} • Uploaded {doc.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        setViewingDoc({
                          id: doc.id,
                          name: doc.name,
                          docType: doc.docType,
                          status: 'Verified',
                          size: doc.size,
                          uploadedAt: doc.date,
                        })
                      }
                      className="text-xs h-7.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View Document
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* TAB 4: COMMISSION */}
        {activeTab === 'commission' && (
          <Card className="p-6 border border-slate-200 shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded">
                  ESOS National Code 2018 Standard 4 Agreement
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Agency Commission Schedule &amp; RCTI</h3>
                <p className="text-xs text-slate-500">Recruitment commission payable for {student.name} ({student.enrolledCourse.provider}).</p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-2xl font-extrabold text-emerald-700 block">
                  A${student.commission.totalAmount.toLocaleString()} AUD
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {student.commission.rate}% Net Tuition Rate ({student.commission.tier})
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Milestone Disbursement Plan:</span>
              <div className="space-y-2">
                {student.commission.milestones.map((m, i) => (
                  <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900 block">{m.label}</span>
                        <span className="text-[11px] text-slate-500">Cleared Date: {m.date}</span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-emerald-700 text-sm">A${m.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">RCTI Invoice Ref: <strong className="font-mono text-slate-800">{student.commission.rctiNumber}</strong></span>
              <Button size="sm" onClick={handleClaimCommission} className="text-xs font-bold">
                <CreditCard className="w-3.5 h-3.5" />
                Submit Remittance Payout Request
              </Button>
            </div>
          </Card>
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
