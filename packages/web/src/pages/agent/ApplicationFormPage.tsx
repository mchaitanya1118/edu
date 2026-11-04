import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  CreditCard,
  BookOpen,
  Globe,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  MapPin,
  GraduationCap,
  DollarSign,
  Eye,
  Building2,
  Save,
  Clock,
  Sparkles,
  ArrowLeft,
  Send,
} from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { isAgent } from '../../hooks/useAuth';
import { useToast } from '../../components/ui/Toast';
import { DocumentViewerModal, ViewableDocument } from '../../components/documents/DocumentViewerModal';

// ── Step Configuration ──────────────────────────────────
const ALL_STEPS = [
  { key: 'personal', label: 'Personal & Contact', icon: Globe },
  { key: 'passport', label: 'Passport & Visa', icon: FileText },
  { key: 'course', label: 'Course & Study Plan', icon: GraduationCap },
  { key: 'education', label: 'Education & OSHC', icon: BookOpen },
  { key: 'documents', label: 'Documents & Submit', icon: Upload },
  { key: 'internal', label: 'Agency Tracking 🔐', icon: DollarSign },
];

const STUDENT_NAME = 'Priya Sharma';
const TARGET_SCHOOL = 'Sydney International College';

export default function EduConnectApplication() {
  const navigate = useNavigate();
  const { role } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const agencyOnly = isAgent(role);
  const STEPS = agencyOnly ? ALL_STEPS : ALL_STEPS.filter(s => s.key !== 'internal');
  const TOTAL_STEPS = STEPS.length;
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<ViewableDocument | null>(null);

  // Agency Commission form state
  const [commissionRate, setCommissionRate] = useState<number>(20);
  const [commissionType, setCommissionType] = useState<'percent' | 'flat'>('percent');
  const netTuition = 4560;
  const estimatedCommission = commissionType === 'percent'
    ? Math.round(netTuition * (commissionRate / 100))
    : commissionRate;

  const [appDocs, setAppDocs] = useState([
    { id: 'DOC-1', name: 'Passport.pdf', docType: 'Passport Bio Page', status: 'uploaded' as const, size: '2.4 MB', date: '02 Nov 2026' },
    { id: 'DOC-2', name: 'Transcript_HighSchool.pdf', docType: 'Academic Transcript', status: 'pending' as const, size: '1.8 MB', date: 'Pending' },
    { id: 'DOC-3', name: 'Statement_of_Purpose.pdf', docType: 'Genuine Student Statement', status: 'uploaded' as const, size: '1.2 MB', date: '02 Nov 2026' },
    { id: 'DOC-4', name: 'English_Test_Report.pdf', docType: 'IELTS Academic TRF', status: 'pending' as const, size: '950 KB', date: 'Pending' },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const newFiles = Array.from(files).map((f, i) => ({
      id: `DOC-NEW-${Date.now()}-${i}`,
      name: f.name,
      docType: f.name.toLowerCase().includes('passport')
        ? 'Passport Bio Page'
        : f.name.toLowerCase().includes('transcript')
        ? 'Academic Transcript'
        : f.name.toLowerCase().includes('english') || f.name.toLowerCase().includes('ielts')
        ? 'English Test Report'
        : 'Uploaded Admissions Document',
      status: 'uploaded' as const,
      size: `${Math.max(0.1, Number((f.size / (1024 * 1024)).toFixed(1)))} MB`,
      date: 'Just now',
    }));
    setAppDocs((prev) => [...newFiles, ...prev]);
    toast(`Uploaded ${files.length} document(s) successfully! Click "View" to preview.`, 'success');
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  // Clamp step to visible range when role/steps change
  useEffect(() => {
    if (step >= TOTAL_STEPS) setStep(Math.max(0, TOTAL_STEPS - 1));
  }, [TOTAL_STEPS, step]);

  const handleSaveDraft = () => {
    toast('Application draft saved successfully to your offline vault.', 'success');
  };

  const handleSubmitApplication = () => {
    setSubmitted(true);
    toast('Application submitted successfully to Sydney International College Admissions!', 'success');
  };

  if (submitted) {
    return (
      <AppLayout>
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
          <Card className="p-8 sm:p-12 text-center bg-white border border-slate-200 shadow-xl rounded-2xl space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-emerald-50 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                PRISMS Pending Ref: SIC-2026-APP-8842
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                Application Submitted Successfully!
              </h1>
              <p className="text-sm text-slate-600 mt-2 max-w-lg mx-auto leading-relaxed">
                Your international admissions application for <strong>{STUDENT_NAME}</strong> has been transmitted to <strong>{TARGET_SCHOOL}</strong>.
                The admissions registry will review the Genuine Student assessment and issue an unconditional Letter of Offer within 24–48 hours.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 max-w-md mx-auto text-left space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-500">Target Institution:</span>
                <span className="font-semibold text-slate-900">{TARGET_SCHOOL}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Enrolled Course:</span>
                <span className="font-semibold text-slate-900">Diploma of Business (BSB50120)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Commencement:</span>
                <span className="font-semibold text-slate-900">July 2026 (Trimester 3)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200">
                <span className="text-slate-500">Projected Agency Commission:</span>
                <span className="font-bold text-emerald-700 font-mono">A${estimatedCommission.toLocaleString()} AUD</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Button onClick={() => navigate('/agent/pipeline')} className="w-full sm:w-auto text-xs font-bold gap-2">
                Return to Student Pipeline
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" onClick={() => navigate('/agent/quotes')} className="w-full sm:w-auto text-xs font-semibold">
                Generate Accompanying Quote
              </Button>
            </div>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6 max-w-7xl mx-auto pb-16">
        {/* ════════════ Header & Breadcrumbs ════════════ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Link to="/agent/dashboard" className="hover:text-blue-600 transition-colors">Agent Hub</Link>
              <span>/</span>
              <Link to="/agent/pipeline" className="hover:text-blue-600 transition-colors">Pipeline</Link>
              <span>/</span>
              <span className="text-slate-900 font-medium">New Student Application</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Admissions Application Wizard
                </h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-slate-500 font-medium">{TARGET_SCHOOL}</span>
                  <span className="text-slate-300">•</span>
                  <Badge variant="default" className="text-[11px] font-semibold bg-blue-50 text-blue-700 border-blue-200">
                    Candidate: {STUDENT_NAME}
                  </Badge>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500">CRICOS Provider 03456A</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="gap-1.5 text-xs text-slate-600 border-slate-300 hover:bg-slate-50">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </Button>
            <Button variant="outline" size="sm" onClick={handleSaveDraft} className="gap-1.5 text-xs text-slate-600 border-slate-300 hover:bg-slate-50">
              <Save className="w-3.5 h-3.5" /> Save Draft
            </Button>
          </div>
        </div>

        {/* ════════════ Stepper Navigation ════════════ */}
        <Card className="p-2 sm:p-3 bg-white border border-slate-200 shadow-2xs rounded-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {STEPS.map((s, i) => {
              const isActive = i === step;
              const isCompleted = i < step;
              const StepIcon = s.icon;
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => i <= step && setStep(i)}
                  disabled={i > step}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : isCompleted
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 hover:bg-emerald-100/70'
                      : 'bg-slate-50 text-slate-400 border border-transparent cursor-not-allowed opacity-75'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <StepIcon className="w-3.5 h-3.5" />}
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[10px] opacity-75 leading-none">Step {i + 1}</span>
                    <span className="block truncate font-bold mt-0.5">{s.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="mt-2.5 mx-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500"
              style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </Card>

        {/* ════════════ Body: 2-Column Responsive Layout ════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Form Step Area (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="p-6 sm:p-8 bg-white border border-slate-200 shadow-2xs rounded-2xl">
              {step === 0 && renderPersonalForm()}
              {step === 1 && renderPassportVisaForm()}
              {step === 2 && renderCourseStudyForm()}
              {step === 3 && renderEducationOSHCForm()}
              {step === 4 && (
                renderDocumentsForm(
                  appDocs,
                  (doc) =>
                    setViewingDoc({
                      id: doc.id,
                      name: doc.name,
                      docType: doc.docType,
                      studentName: STUDENT_NAME,
                      uploadedAt: doc.date,
                      size: doc.size,
                      status: 'Verified',
                    }),
                  handleTriggerUpload,
                  fileInputRef,
                  handleFileUpload
                )
              )}
              {step === 5 && (
                renderCommissionTrackingForm(
                  commissionRate,
                  setCommissionRate,
                  commissionType,
                  setCommissionType,
                  netTuition,
                  estimatedCommission
                )
              )}

              {/* Step Navigation Controls */}
              <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-100">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={step === 0}
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="text-xs font-semibold gap-1.5 border-slate-300 text-slate-700 disabled:opacity-40"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Previous Step
                </Button>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={handleSaveDraft} className="text-xs text-slate-500 hover:text-slate-900">
                    Save Draft
                  </Button>
                  {step < TOTAL_STEPS - 1 ? (
                    <Button
                      size="sm"
                      onClick={() => setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1))}
                      className="text-xs font-bold gap-1.5 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20"
                    >
                      Continue to Next Step
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={handleSubmitApplication}
                      className="text-xs font-bold gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Finalise &amp; Submit Application
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Context Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Admissions Summary Card */}
            <Card className="p-5 bg-white border border-slate-200 shadow-2xs rounded-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Application Dossier
                </span>
                <Badge variant="default" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">
                  Step {step + 1} of {TOTAL_STEPS}
                </Badge>
              </div>

              {/* Selected Institution & Course */}
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Selected Course
                  </span>
                  <p className="text-sm font-bold text-slate-900 leading-snug">Diploma of Business (BSB50120)</p>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-600">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>{TARGET_SCHOOL}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Campus</span>
                    <span className="font-semibold text-slate-800">Sydney CBD</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Duration</span>
                    <span className="font-semibold text-slate-800">2 Years (FT)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Estimated Deposit Required
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-extrabold text-slate-900">A$4,500</span>
                    <span className="text-xs text-slate-500 font-medium">AUD</span>
                  </div>
                  <span className="text-[11px] text-slate-400">50% upfront tuition deposit for CoE release</span>
                </div>
              </div>

              {/* Document Readiness Bar */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-700">Admissions Checklist</span>
                  <span className="font-bold text-emerald-600">
                    {appDocs.filter((d) => d.status === 'uploaded').length} of {appDocs.length} Ready
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                    style={{
                      width: `${(appDocs.filter((d) => d.status === 'uploaded').length / appDocs.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </Card>

            {/* Compliance & ESOS Guidance Box */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border border-blue-200/80 p-5 space-y-2.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-xs font-bold text-blue-900">ESOS &amp; Genuine Student Guard</span>
              </div>
              <p className="text-xs text-blue-800/80 leading-relaxed">
                All uploaded documents are verified against the Australian Department of Home Affairs Genuine Student (GS) standard. Ensure certified colour scans for rapid PRISMS registration.
              </p>
            </div>

            {/* Agency Projected Commission Mini-Card */}
            {agencyOnly && (
              <Card className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl">
                <div className="flex items-center gap-2 mb-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-bold text-emerald-900">Projected Agency Commission</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-extrabold text-emerald-700">A${estimatedCommission.toLocaleString()}</span>
                  <span className="text-xs text-emerald-600">AUD</span>
                </div>
                <p className="text-[11px] text-emerald-700/80 mt-1">
                  Calculated at {commissionRate}% net course tuition upon PRISMS CoE issue and census date clearance.
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Uploaded Document Viewer Modal */}
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

// ── Generic Form Field Component ────────────────────────
function FormField({
  label,
  required,
  type = 'text',
  placeholder,
  options,
}: {
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
}) {
  const id = `form-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-bold text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {options ? (
        <select
          id={id}
          className="w-full h-10 rounded-xl border border-slate-200 px-3.5 py-2 text-sm bg-white text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 transition-all cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className="bg-white text-slate-900 border-slate-200 h-10 rounded-xl placeholder:text-slate-400 focus-visible:ring-blue-500/30 focus-visible:border-blue-500"
        />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ══ Step Forms
// ═══════════════════════════════════════════════════════════

function renderPersonalForm() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
        <Globe className="w-5 h-5 text-blue-600" />
        <div>
          <h3 className="text-base font-bold text-slate-900">Personal &amp; Contact Information</h3>
          <p className="text-xs text-slate-500">Provide legal name as recorded on official passport.</p>
        </div>
      </div>

      <div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Identity Details</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Full Legal Name" required placeholder="e.g. Priya Sharma" />
          <FormField label="Date of Birth" required type="date" />
          <FormField
            label="Gender"
            required
            options={[
              { value: '', label: 'Select gender...' },
              { value: 'F', label: 'Female' },
              { value: 'M', label: 'Male' },
              { value: 'O', label: 'Other' },
            ]}
          />
          <FormField
            label="Country of Citizenship"
            required
            options={[
              { value: 'IN', label: 'India 🇮🇳' },
              { value: 'CN', label: 'China 🇨🇳' },
              { value: 'BR', label: 'Brazil 🇧🇷' },
              { value: 'JP', label: 'Japan 🇯🇵' },
              { value: 'NP', label: 'Nepal 🇳🇵' },
              { value: 'CO', label: 'Colombia 🇨🇴' },
            ]}
          />
        </div>
      </div>

      <div className="pt-2">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Contact &amp; Language</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="First Language"
            required
            options={[
              { value: 'HI', label: 'Hindi' },
              { value: 'EN', label: 'English' },
              { value: 'ZH', label: 'Mandarin' },
              { value: 'ES', label: 'Spanish' },
              { value: 'PT', label: 'Portuguese' },
            ]}
          />
          <FormField label="Email Address" required type="email" placeholder="priya.sharma@example.com" />
          <FormField label="Phone / WhatsApp" required placeholder="+91 98765 43210" />
          <FormField label="Current Residential Address" placeholder="Flat 402, Lotus Towers, New Delhi" />
        </div>
      </div>
    </div>
  );
}

function renderPassportVisaForm() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
        <FileText className="w-5 h-5 text-blue-600" />
        <div>
          <h3 className="text-base font-bold text-slate-900">Passport &amp; Visa Information</h3>
          <p className="text-xs text-slate-500">Australian immigration compliance data under Subclass 500.</p>
        </div>
      </div>

      <div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Passport Details</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Passport Number" required placeholder="e.g. M8923412" />
          <FormField label="Passport Expiry Date" required type="date" />
          <FormField label="Place of Issue" placeholder="New Delhi, India" />
          <FormField label="Unique Student Identifier (USI)" placeholder="If already held in Australia" />
        </div>
      </div>

      <div className="pt-2">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Australian Visa Status</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Current Australian Visa"
            required
            options={[
              { value: 'none', label: 'Offshore (Not currently in Australia)' },
              { value: '500', label: 'Student Visa (Subclass 500)' },
              { value: '600', label: 'Visitor Visa (Subclass 600)' },
              { value: '485', label: 'Graduate Temporary (Subclass 485)' },
              { value: '010', label: 'Bridging Visa A' },
            ]}
          />
          <FormField label="Current Visa Expiry Date" type="date" />
        </div>
      </div>

      <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-800">Home Affairs Visa Requirement</p>
            <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
              Student must have at least 6 months validity remaining on their passport prior to enrolment commencement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderCourseStudyForm() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
        <GraduationCap className="w-5 h-5 text-blue-600" />
        <div>
          <h3 className="text-base font-bold text-slate-900">Course Selection &amp; Study Plan</h3>
          <p className="text-xs text-slate-500">CRICOS course selection and intake calendar.</p>
        </div>
      </div>

      <div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Intake &amp; Timetable</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Intake Term"
            required
            options={[
              { value: 'jul-26', label: 'July 2026 — Trimester 3 (Recommended)' },
              { value: 'oct-26', label: 'October 2026 — Trimester 4' },
              { value: 'jan-27', label: 'January 2027 — Trimester 1' },
            ]}
          />
          <FormField
            label="Class Schedule Preference"
            required
            options={[
              { value: 'morning', label: 'Morning Session (08:30 – 12:45)' },
              { value: 'afternoon', label: 'Afternoon Session (13:15 – 17:30)' },
              { value: 'evening', label: 'Evening Session (17:45 – 21:30)' },
              { value: 'weekend', label: 'Weekend Intensive' },
            ]}
          />
        </div>
      </div>

      <div className="pt-2">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Tuition Deposit Structure</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border-2 border-blue-600 bg-blue-50/50 cursor-pointer">
            <div className="flex items-center gap-2 mb-1.5">
              <CreditCard className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-slate-900">50% Initial Deposit</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pay 50% tuition now to generate the electronic Confirmation of Enrolment (CoE) for visa filing.
            </p>
            <span className="inline-block mt-2 text-[10px] font-bold uppercase text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
              Selected ✓
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 cursor-pointer">
            <div className="flex items-center gap-2 mb-1.5">
              <CreditCard className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-bold text-slate-900">100% Upfront Term Payment</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pay the complete academic year upfront and receive the 5% early settlement discount.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">English Language Proficiency</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormField
            label="Test Provider"
            required
            options={[
              { value: 'ielts', label: 'IELTS Academic' },
              { value: 'pte', label: 'PTE Academic' },
              { value: 'toefl', label: 'TOEFL iBT' },
              { value: 'internal', label: 'College Internal Placement' },
            ]}
          />
          <FormField label="Overall Band Score" required placeholder="e.g. 6.5 (min 6.0 each)" />
          <FormField label="Test Date" type="date" />
        </div>
      </div>
    </div>
  );
}

function renderEducationOSHCForm() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
        <BookOpen className="w-5 h-5 text-blue-600" />
        <div>
          <h3 className="text-base font-bold text-slate-900">Education Background &amp; OSHC Health Cover</h3>
          <p className="text-xs text-slate-500">Highest qualifications and compulsory Australian medical insurance.</p>
        </div>
      </div>

      <div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Academic Credentials</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Highest Level Completed"
            required
            options={[
              { value: 'bachelor', label: "Bachelor's Degree (AQF Level 7)" },
              { value: 'diploma', label: 'Diploma / Advanced Diploma (AQF 5/6)' },
              { value: 'yr12', label: 'Year 12 / Higher Secondary' },
              { value: 'master', label: "Master's Degree (AQF Level 9)" },
            ]}
          />
          <FormField label="Awarding Institution" required placeholder="e.g. University of Delhi" />
          <FormField label="Year of Graduation" type="number" placeholder="2024" />
          <FormField label="Grade / GPA" placeholder="First Class Honours / 78%" />
        </div>
      </div>

      <div className="pt-2">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">OSHC Policy Setup</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="OSHC Coverage Policy"
            required
            options={[
              { value: 'single', label: 'Single Policy (Student Only) — A$580/yr' },
              { value: 'couple', label: 'Dual Family (Student + Partner) — A$2,850/yr' },
              { value: 'family', label: 'Multi Family (Student + Partner + Dependents) — A$4,900/yr' },
            ]}
          />
          <FormField
            label="Preferred Insurer"
            options={[
              { value: 'allianz', label: 'Allianz Care Australia' },
              { value: 'bupa', label: 'Bupa Global Australia' },
              { value: 'medibank', label: 'Medibank Comprehensive' },
              { value: 'nib', label: 'nib OSHC' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function renderDocumentsForm(
  docs: Array<{ id: string; name: string; docType: string; status: 'uploaded' | 'pending'; size: string; date: string }>,
  onViewDoc: (doc: { id: string; name: string; docType: string; status: 'uploaded' | 'pending'; size: string; date: string }) => void,
  onTriggerUpload: () => void,
  fileInputRef: React.RefObject<HTMLInputElement>,
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <Upload className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="text-base font-bold text-slate-900">Admissions Documents &amp; Evidence</h3>
            <p className="text-xs text-slate-500">Upload certified files for admissions review.</p>
          </div>
        </div>
        <Badge variant="default" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
          {docs.filter((d) => d.status === 'uploaded').length} of {docs.length} Uploaded
        </Badge>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={onFileUpload}
        accept=".pdf,.png,.jpg,.jpeg"
      />

      {/* Upload Drag & Drop Box */}
      <div
        onClick={onTriggerUpload}
        className="rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center hover:border-blue-500 hover:bg-blue-50/20 transition-all cursor-pointer group"
      >
        <Upload className="w-9 h-9 text-slate-400 mx-auto mb-2 group-hover:text-blue-600 transition-colors" />
        <p className="text-sm font-bold text-slate-800">
          Drag &amp; drop certified documents here, or <span className="text-blue-600 underline">browse files</span>
        </p>
        <p className="text-xs text-slate-400 mt-1">Accepts PDF, PNG, JPG — Max 15MB per file</p>
      </div>

      {/* Uploaded Documents List */}
      <div className="space-y-2.5">
        {docs.map((doc) => (
          <div
            key={doc.id}
            className={`flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-all ${
              doc.status === 'uploaded'
                ? 'border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50/60'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  doc.status === 'uploaded' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'
                }`}
              >
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{doc.name}</p>
                <p className="text-[11px] text-slate-500">
                  {doc.docType} • {doc.size} {doc.date !== 'Pending' ? `• Uploaded ${doc.date}` : ''}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {doc.status === 'uploaded' ? (
                <>
                  <Badge variant="default" className="text-[10px] px-2 py-0.5 h-6 bg-emerald-100 text-emerald-800 border-emerald-200 font-bold">
                    Uploaded ✔
                  </Badge>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => onViewDoc(doc)}
                    className="h-8 px-2.5 text-xs font-semibold gap-1.5 border-slate-300 hover:border-blue-400 hover:text-blue-700 bg-white"
                    title="View and preview uploaded document"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-600" />
                    View
                  </Button>
                </>
              ) : (
                <>
                  <Badge variant="default" className="text-[10px] px-2 py-0.5 h-6 bg-amber-50 text-amber-800 border-amber-200 font-bold">
                    Pending ⏳
                  </Badge>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={onTriggerUpload}
                    className="h-8 px-2.5 text-xs font-semibold gap-1 text-slate-700 hover:text-slate-900 bg-white"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Upload
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" defaultChecked />
          <span className="text-xs text-slate-700 leading-relaxed">
            I certify that all uploaded documentation has been verified as authentic and original. I acknowledge that falsified records will result in PRISMS CoE cancellation under ESOS National Code Standard 8.
          </span>
        </label>
      </div>
    </div>
  );
}

function renderCommissionTrackingForm(
  commissionRate: number,
  setCommissionRate: (r: number) => void,
  commissionType: 'percent' | 'flat',
  setCommissionType: (t: 'percent' | 'flat') => void,
  netTuition: number,
  estimatedCommission: number
) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-purple-50 border border-purple-200 px-4 py-3 flex items-center gap-2.5">
        <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
        <p className="text-xs font-semibold text-purple-900">
          🔐 Confidential Agency Tracking — Never displayed to students or on formal letters of offer.
        </p>
      </div>

      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
        <DollarSign className="w-5 h-5 text-emerald-600" />
        <div>
          <h3 className="text-base font-bold text-slate-900">Agency Commission Setup</h3>
          <p className="text-xs text-slate-500">Configure recruiter payout terms according to institution agreement.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Commission Rate</label>
          <input
            type="number"
            min={0}
            max={50}
            value={commissionRate}
            onChange={(e) => setCommissionRate(Math.max(0, Number(e.target.value)))}
            className="w-full h-10 px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Commission Type</label>
          <select
            value={commissionType}
            onChange={(e) => setCommissionType(e.target.value as 'percent' | 'flat')}
            className="w-full h-10 px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 cursor-pointer"
          >
            <option value="percent">% of Net Tuition</option>
            <option value="flat">Fixed AUD Flat Fee</option>
          </select>
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-6 space-y-2">
        <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
          Projected Recruiter Remittance
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-extrabold text-emerald-800">
            A${estimatedCommission.toLocaleString()}
          </span>
          <span className="text-xs font-bold text-emerald-700">AUD Net Commission</span>
        </div>
        <p className="text-xs text-emerald-700/80 leading-relaxed">
          Calculated on {commissionType === 'percent' ? `${commissionRate}%` : `Flat A$${commissionRate}`} of A${netTuition.toLocaleString()} AUD net tuition for {STUDENT_NAME}.
        </p>
      </div>

      <div>
        <label htmlFor="notes" className="block text-xs font-bold text-slate-700 mb-1.5">Agency Notes (Optional)</label>
        <textarea
          id="notes"
          rows={3}
          placeholder="Enter internal recruiter notes or agreement references..."
          className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-white text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 resize-none"
        />
      </div>
    </div>
  );
}
