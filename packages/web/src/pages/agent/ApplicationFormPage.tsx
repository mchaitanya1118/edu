import { useState, useEffect } from 'react';
import { X, Upload, CheckCircle2, AlertCircle, FileText, CreditCard, BookOpen, Globe, ShieldCheck, ChevronRight, MapPin, GraduationCap, DollarSign } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { isAgent } from '../../hooks/useAuth';

// ── Step Configuration ──────────────────────────────────
const ALL_STEPS = [
  { key: 'personal', label: 'Personal & Contact' },
  { key: 'passport', label: 'Passport & Visa' },
  { key: 'course', label: 'Course & Study Plan' },
  { key: 'education', label: 'Education & OSHC' },
  { key: 'documents', label: 'Documents & Submit' },
  { key: 'internal', label: 'Agency Tracking 🔐' },
];

const STUDENT_NAME = 'Priya Sharma';
const TARGET_SCHOOL = 'Sydney International College';

// ── Component ───────────────────────────────────────────
export default function EduConnectApplication() {
  const { role } = useAuth();
  const agencyOnly = isAgent(role);
  const STEPS = agencyOnly ? ALL_STEPS : ALL_STEPS.filter(s => s.key !== 'internal');
  const TOTAL_STEPS = STEPS.length;
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);

  // Clamp step to visible range when role/steps change
  useEffect(() => {
    if (step >= TOTAL_STEPS) setStep(Math.max(0, TOTAL_STEPS - 1));
  }, [TOTAL_STEPS, step]);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Application Submitted Successfully!</h1>
          <p className="text-gray-500 mt-2 max-w-md">Your application has been sent to Sydney International College. You&apos;ll receive a confirmation email shortly.</p>
        </div>
        <Button variant="outline">Back to Pipeline</Button>
      </div>
    );
  }

  return (
    <div className="relative z-50">
      {/* Darkened backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={() => setModalOpen(false)} />

      {/* Centered Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
        <div
          className="w-full max-w-7xl max-h-[92vh] overflow-hidden rounded-2xl shadow-2xl bg-white text-slate-900 pointer-events-auto flex flex-col"
          style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}
        >

          {/* ════════════ Header Bar ════════════ */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white shrink-0">
            <div className="flex items-center gap-3">
              {/* School Logo Placeholder */}
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-md">
                <BuildingIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900 leading-tight">Submit New Student Application</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-gray-500">{TARGET_SCHOOL}</span>
                  <span className="text-gray-300">·</span>
                  <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4">
                    {STUDENT_NAME}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Close button */}
            <button onClick={() => setModalOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ════════════ Progress Stepper ════════════ */}
          <div className="border-b border-gray-100 px-6 py-3 bg-gray-50/80 shrink-0">
            <div className="flex items-center justify-between gap-2">
              {STEPS.map((s, i) => {
                const isActive = i === step;
                const isCompleted = i < step;
                return (
                  <div key={s.key} className="flex items-center flex-1 last:flex-initial">
                    <button
                      onClick={() => i <= step && setStep(i)}
                      disabled={i > step}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all w-full ${
                        isActive
                          ? 'bg-white border-2 border-primary text-primary shadow-sm'
                          : isCompleted
                            ? 'bg-emerald-50 border border-emerald-200 text-emerald-700 hover:border-emerald-300'
                            : 'bg-transparent border border-transparent text-gray-400 cursor-default'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        isCompleted ? 'bg-emerald-500 text-white' : isActive ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <StepIcon index={i} />}
                      </span>
                      <span className="hidden sm:inline truncate">{s.label}</span>
                    </button>
                    {i < STEPS.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 mx-1 hidden lg:block" />
                    )}
                  </div>
                );
              })}
            </div>
            {/* Progress bar */}
            <div className="mt-3 h-1.5 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-in-out"
                style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
              />
            </div>
          </div>

          {/* ════════════ Body: 2-Column Layout ════════════ */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex gap-6 p-6 min-h-0">

              {/* Left: Form Area */}
              <div className="flex-1 min-w-0">
                {step === 0 && renderPersonalForm()}
                {step === 1 && renderPassportVisaForm()}
                {step === 2 && renderCourseStudyForm()}
                {step === 3 && renderEducationOSHCForm()}
                {step === 4 && renderDocumentsForm()}
                {step === 5 && renderCommissionTrackingForm()}
              </div>

              {/* Right: Context Sidebar */}
              <div className="w-72 shrink-0 hidden xl:block">
                <div className="sticky top-0 space-y-4">
                  {/* Application Summary Card */}
                  <Card className="p-4 space-y-4 bg-slate-50 border-gray-200">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Application Summary</h3>

                    {/* Selected Course & Institution */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Selected Course</p>
                        <p className="text-sm font-semibold text-gray-900 leading-snug">Diploma of Business (BSB50120)</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <BuildingIcon className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-xs text-gray-500">{TARGET_SCHOOL}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Campus &amp; Duration</p>
                        <div className="flex items-center gap-1.5 text-xs text-gray-700">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          <span>Sydney CBD Campus</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-700 mt-1">
                          <BookOpen className="w-3.5 h-3.5 text-gray-400" />
                          <span>2 Years Full-Time</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Estimated Initial Deposit</p>
                        <p className="text-lg font-bold text-gray-900">$4,500 AUD</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-3">
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Document Completion</p>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                          <div className="h-full rounded-full bg-emerald-500" style={{ width: '80%' }} />
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-600 whitespace-nowrap">4 of 5</span>
                      </div>
                      <p className="text-[10px] text-gray-400">required documents attached</p>
                    </div>
                  </Card>

                  {/* Quick Tip */}
                  <div className="rounded-xl bg-sky-50 border border-sky-100 p-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[11px] font-semibold text-sky-700">Pro Tip</p>
                        <p className="text-[10px] text-sky-600 mt-0.5 leading-relaxed">All fields marked with <strong>*</strong> are mandatory for visa processing.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ════════════ Footer Bar ════════════ */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50 shrink-0">
            {/* Left Action */}
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
              Save as Draft
            </Button>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {step > 0 && (
                <Button variant="outline" size="sm" className="text-xs" onClick={() => setStep(s => s - 1)}>
                  Back
                </Button>
              )}
              {step < TOTAL_STEPS - 1 ? (
                <Button size="sm" className="text-xs" onClick={() => setStep(s => Math.min(s + 1, TOTAL_STEPS - 1))}>
                  Next Step <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              ) : (
                <Button size="sm" className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setSubmitted(true)}>
                  Finalise & Submit Application
                </Button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ── Small inline icons ──────────────────────────────────
function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01 M16 6h.01 M12 6h.01 M8 10h.01 M16 10h.01 M12 10h.01 M8 14h.01 M16 14h.01 M12 14h.01" />
    </svg>
  );
}

function StepIcon({ index }: { index: number }) {
  // Simple inline SVG icons per step
  switch (index) {
    case 0: return <Globe className="w-3.5 h-3.5" />;
    case 1: return <FileText className="w-3.5 h-3.5" />;
    case 2: return <GraduationCap className="w-3.5 h-3.5" />;
    case 3: return <BookOpen className="w-3.5 h-3.5" />;
    case 4: return <Upload className="w-3.5 h-3.5" />;
    default: return <ChevronRight className="w-3.5 h-3.5" />;
  }
}

// ── Generic Form Field ──────────────────────────────────
function FormField({ label, required, type = 'text', placeholder, options }: {
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
}) {
  const id = `form-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {options ? (
        <select id={id} className="w-full h-9 rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm bg-white text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30">
          {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      ) : (
        <Input id={id} type={type} placeholder={placeholder} className="bg-white text-slate-900 border-[#E2E8F0] placeholder:text-slate-400 [&::-webkit-calendar-picker-indicator]:cursor-pointer" />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ══ Step Renders
// ═══════════════════════════════════════════════════════════

// ── Step 1: Personal & Contact ──────────────────────────
function renderPersonalForm() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Globe className="w-5 h-5 text-primary" />
        <h3 className="text-sm font-bold text-gray-900">Personal Information</h3>
      </div>

      {/* Section: Identity */}
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Identity Details</p>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Full Name" required placeholder="Enter your full legal name" />
          <FormField label="Date of Birth" required type="date" placeholder="DD/MM/YYYY" />
          <FormField label="Gender" required options={[{ value: '', label: 'Select gender...' }, { value: 'M', label: 'Male' }, { value: 'F', label: 'Female' }, { value: 'O', label: 'Other' }]} />
          <FormField label="Country of Citizenship" required options={[{ value: '', label: 'Select country...' }, { value: 'IN', label: 'India 🇮🇳' }, { value: 'CN', label: 'China 🇨🇳' }, { value: 'SA', label: 'Saudi Arabia 🇸🇦' }, { value: 'BR', label: 'Brazil 🇧🇷' }, { value: 'JP', label: 'Japan 🇯🇵' }]} />
        </div>
      </div>

      {/* Section: Language & Contact */}
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Contact &amp; Language</p>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="First Language" required options={[{ value: '', label: 'Select language...' }, { value: 'EN', label: 'English' }, { value: 'ZH', label: 'Chinese (Mandarin)' }, { value: 'HI', label: 'Hindi' }, { value: 'AR', label: 'Arabic' }]} />
          <FormField label="Email Address" required type="email" placeholder="your.email@example.com" />
          <FormField label="Phone Number" required placeholder="+61 4XX XXX XXX" />
          <FormField label="Current Residential Address" placeholder="Street, Suburb, State, Postcode, Country" />
        </div>
      </div>
    </div>
  );
}

// ── Step 2: Passport & Visa ─────────────────────────────
function renderPassportVisaForm() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-primary" />
        <h3 className="text-sm font-bold text-gray-900">Passport &amp; Visa Information</h3>
      </div>

      {/* Section: Passport */}
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Passport Details</p>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Passport Number" required placeholder="e.g., K8123456" />
          <FormField label="Passport Expiry Date" required type="date" />
          <FormField label="USI (Unique Student Identifier)" placeholder="Enter your USI if available" />
          <FormField label="Place of Issue" placeholder="City/Country where passport was issued" />
        </div>
      </div>

      {/* Section: Australian Visa */}
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Australian Visa Status</p>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Australian Visa Subclass" required options={[
            { value: '', label: 'Select subclass...' },
            { value: '500', label: 'Student Visa (Subclass 500)' },
            { value: '590', label: 'Guarantor Visa (Subclass 590)' },
            { value: 'bridging', label: 'Bridging Visa' },
            { value: 'tourist', label: 'Tourist Visa (Subclass 600)' },
            { value: 'none', label: 'Not currently in Australia' },
          ]} />
          <FormField label="Current Visa Expiry" type="date" />
        </div>
        <div className="mt-3">
          <FormField label="Have you previously applied for an Australian student visa?" required options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
        </div>
        <div className="mt-3">
          <FormField label="Previous Visa Reference Number" placeholder="If applicable" />
        </div>
      </div>

      {/* Info Box */}
      <div className="rounded-xl bg-amber-50 border border-amber-100 p-3">
        <div className="flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] font-semibold text-amber-700">Visa Notice</p>
            <p className="text-[10px] text-amber-600 mt-0.5 leading-relaxed">You must hold or be eligible for a Student Visa (Subclass 500) to commence studies in Australia. We will assist with your visa application upon offer acceptance.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Step 3: Course & Study Plan ─────────────────────────
function renderCourseStudyForm() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <GraduationCap className="w-5 h-5 text-primary" />
        <h3 className="text-sm font-bold text-gray-900">Course Selection &amp; Study Plan</h3>
      </div>

      {/* Section: Intake & Timetable */}
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Intake &amp; Schedule</p>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Intake Month" required options={[
            { value: '', label: 'Select intake month...' },
            { value: 'jan-26', label: 'January 2026 — Trimester 1' },
            { value: 'apr-26', label: 'April 2026 — Trimester 2' },
            { value: 'jul-26', label: 'July 2026 — Trimester 3' },
            { value: 'oct-26', label: 'October 2026 — Trimester 4' },
          ]} />
          <FormField label="Timetable Option" required options={[
            { value: '', label: 'Select timetable...' },
            { value: 'full', label: 'Full-Time (Standard)' },
            { value: 'part', label: 'Part-Time (Flexible)' },
            { value: 'online', label: 'Online / Remote' },
          ]} />
        </div>
      </div>

      {/* Section: Tuition Deposit Preference Toggle */}
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Tuition Deposit Preference</p>
        <div className="flex items-stretch gap-4">
          {/* 50% Deposit — active */}
          <button type="button" className="flex-1 rounded-xl border-2 border-primary bg-blue-50 p-4 text-left transition-all hover:shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-gray-900">50% Deposit</span>
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed">Pay half the tuition fee upfront and the balance before each trimester begins. Ideal for managing cash flow.</p>
            <div className="mt-2 text-[10px] font-semibold text-primary">Selected ✓</div>
          </button>
          {/* 100% Upfront */}
          <button type="button" className="flex-1 rounded-xl border-2 border-[#E2E8F0] p-4 text-left transition-all hover:border-gray-300 hover:shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-bold text-gray-900">100% Upfront</span>
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed">Pay the full tuition fee at enrollment. May qualify for early-payment discounts at some institutions.</p>
          </button>
        </div>
      </div>

      {/* Section: English Proficiency */}
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">English Proficiency</p>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="English Proficiency Test" required options={[
            { value: '', label: 'Select test type...' },
            { value: 'ielts', label: 'IELTS Academic' },
            { value: 'pte', label: 'PTE Academic' },
            { value: 'toefl', label: 'TOEFL iBT' },
            { value: 'cau', label: 'Cambridge C1 Advanced' },
          ]} />
          <FormField label="Overall Score" required placeholder="e.g., 6.5 (IELTS) or 58 (PTE)" />
        </div>
        <div className="mt-3">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Test Date" type="date" placeholder="When did you take the test?" />
            <FormField label="Test Report Number" placeholder="Reference number from test provider" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Step 4: Education & OSHC ────────────────────────────
function renderEducationOSHCForm() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-primary" />
        <h3 className="text-sm font-bold text-gray-900">Education History &amp; Health Cover</h3>
      </div>

      {/* Section: Academic Background */}
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Academic Background</p>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Highest Qualification Completed" required options={[
            { value: '', label: 'Select qualification...' },
            { value: 'yr10', label: 'Year 10' },
            { value: 'yr11', label: 'Year 11' },
            { value: 'yr12', label: 'Year 12 / High School Diploma' },
            { value: 'cert3', label: 'Vocational Certificate III' },
            { value: 'cert4', label: 'Vocational Certificate IV' },
            { value: 'diploma', label: 'Diploma' },
            { value: 'bachelor', label: "Bachelor's Degree" },
            { value: 'master', label: "Master's Degree" },
            { value: 'phd', label: 'PhD' },
          ]} />
          <FormField label="Institution Name" required placeholder="Name of previous school or university" />
        </div>
        <div className="mt-3">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Year of Completion" type="number" placeholder="e.g., 2024" />
            <FormField label="GPA / Final Grade" placeholder="e.g., 3.5 or 75%" />
          </div>
        </div>
      </div>

      {/* Section: OSHC */}
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Overseas Student Health Cover (OSHC)</p>
        <FormField label="OSHC Health Cover Type" required options={[
          { value: '', label: 'Select cover type...' },
          { value: 'single', label: 'Single Cover (You Only)' },
          { value: 'couple', label: 'Couple Cover (You + Partner)' },
          { value: 'family', label: 'Family Cover (You + Dependents)' },
        ]} />
      </div>

      {/* Info Box */}
      <div className="rounded-xl bg-sky-50 border border-sky-100 p-3">
        <div className="flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] font-semibold text-sky-700">OSHC Coverage</p>
            <p className="text-[10px] text-sky-600 mt-0.5 leading-relaxed">AusEdu Connect offers comprehensive OSHC cover starting from $1,200/year through our partner providers (Allianz Health, nbea, Bupa). We will arrange your policy once your Confirmation of Enrolment (CoE) is received.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Step 5: Documents & Submit ──────────────────────────
function renderDocumentsForm() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Upload className="w-5 h-5 text-primary" />
        <h3 className="text-sm font-bold text-gray-900">Required Documents</h3>
      </div>

      {/* Drag-and-drop upload area */}
      <div className="rounded-xl border-2 border-dashed border-[#E2E8F0] p-6 text-center hover:border-blue-300 hover:bg-blue-50/20 transition-all cursor-pointer group">
        <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2 group-hover:text-blue-500 transition-colors" />
        <p className="text-sm font-semibold text-gray-600">Drag &amp; drop files here, or <span className="text-primary underline cursor-pointer">browse to upload</span></p>
        <p className="text-[10px] text-gray-400 mt-1">Accepts PDF, PNG, JPG — Max 10MB per file</p>
      </div>

      {/* Uploaded documents list */}
      <div className="space-y-2">
        {[
          { name: 'Passport.pdf', status: 'uploaded' as const },
          { name: 'Transcript_HighSchool.pdf', status: 'pending' as const },
          { name: 'Statement_of_Purpose.pdf', status: 'uploaded' as const },
          { name: 'English_Test_Report.pdf', status: 'pending' as const },
        ].map((doc, idx) => (
          <div key={idx} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
            doc.status === 'uploaded'
              ? 'border-emerald-200 bg-emerald-50/30'
              : 'border-[#E2E8F0] bg-white hover:border-gray-200'
          }`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              doc.status === 'uploaded' ? 'bg-emerald-100' : 'bg-gray-100'
            }`}>
              <FileText className={`w-4 h-4 ${
                doc.status === 'uploaded' ? 'text-emerald-600' : 'text-gray-400'
              }`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{doc.name}</p>
            </div>
            <div className="shrink-0">
              {doc.status === 'uploaded' ? (
                <Badge variant="success" className="text-[10px] px-1.5 py-0 h-5">Uploaded ✔</Badge>
              ) : (
                <Badge variant="warning" className="text-[10px] px-1.5 py-0 h-5">Pending ⏳</Badge>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Declaration */}
      <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
          <span className="text-xs text-gray-700 leading-relaxed">
            I confirm that all information provided is accurate and complete. I understand that any false or misleading information may result in visa refusal or cancellation.
          </span>
        </label>
      </div>
    </div>
  );
}

// ── Step 6: Internal Agency Tracking (Agent-Only View) ────────────
function renderCommissionTrackingForm() {
  const [commissionRate, setCommissionRate] = useState<number>(20);
  const [commissionType, setCommissionType] = useState<'percent' | 'flat'>('percent');
  const netTuition = 4560; // from selected course — calculated dynamically in production
  const estimatedCommission = commissionType === 'percent'
    ? Math.round(netTuition * (commissionRate / 100))
    : commissionRate;

  return (
    <div className="space-y-6">
      {/* 🔐 Privacy Badge */}
      <div className="rounded-xl bg-purple-50 border border-purple-200 px-4 py-3 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
        <p className="text-xs font-semibold text-purple-700">
          🔐 Private Internal Data — Hidden from student quotes and client views.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-emerald-600" />
        <h3 className="text-sm font-bold text-gray-900">Agency Commission Setup</h3>
      </div>

      {/* Two-column rate input */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Commission Rate</label>
          <input
            type="number"
            min={0}
            max={50}
            value={commissionRate}
            onChange={(e) => setCommissionRate(Math.max(0, Number(e.target.value)))}
            className="w-full h-10 px-3 py-2.5 text-sm border border-[#E2E8F0] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Commission Type</label>
          <select
            value={commissionType}
            onChange={(e) => setCommissionType(e.target.value as 'percent' | 'flat')}
            className="w-full h-10 px-3 py-2.5 text-sm border border-[#E2E8F0] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 appearance-none cursor-pointer pr-8"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m7 15 5 5 5-5'/%3E%3Cpath d='m7 9 5-5 5 5'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center', paddingRight: '28px' }}
          >
            <option value="percent">% Tuition %</option>
            <option value="flat">$ Flat Fee</option>
          </select>
        </div>
      </div>

      {/* Calculated Revenue Card */}
      <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 p-5">
        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Estimated Commission Revenue</p>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-extrabold text-emerald-700">
            ${estimatedCommission.toLocaleString()}
          </span>
          <span className="text-xs text-emerald-600 pb-1">AUD per course</span>
        </div>
        <p className="text-[11px] text-emerald-600/70 mt-1.5">
          Based on {commissionType === 'percent' ? `${commissionRate}%` : `$${commissionRate}`} × ${netTuition.toLocaleString()} AUD net tuition ({STUDENT_NAME})
        </p>
      </div>

      {/* Commission Summary Preview */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-2">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2">Pipeline Impact</p>
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Current Pipeline Revenue</span>
          <span className="font-medium text-gray-700">$12,480 AUD</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">After Adding This Student</span>
          <span className="font-bold text-emerald-600">${(12480 + estimatedCommission).toLocaleString()} AUD</span>
        </div>
        <div className="h-px bg-gray-200 my-1" />
        <div className="flex justify-between text-xs">
          <span className="text-emerald-700 font-semibold">Incremental Growth</span>
          <span className="font-bold text-emerald-700">+{((estimatedCommission / 12480) * 100).toFixed(1)}%</span>
        </div>
      </div>

      {/* Notes field */}
      <div>
        <label htmlFor="commission-notes" className="block text-xs font-semibold text-gray-600 mb-1.5">Internal Notes (Optional)</label>
        <textarea
          id="commission-notes"
          rows={3}
          placeholder="Add any internal notes about this commission arrangement..."
          className="w-full px-3 py-2.5 text-sm border border-[#E2E8F0] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 resize-none"
        />
      </div>
    </div>
  );
}
