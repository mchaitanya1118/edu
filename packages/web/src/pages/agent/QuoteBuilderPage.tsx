import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {
  FileText,
  Download,
  Clock,
  Calendar,
  DollarSign,
  ShieldCheck,
  Users,
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Building2,
  GraduationCap,
  Send,
  Printer,
  X,
  CreditCard,
  Plus,
} from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { useToast } from '../../components/ui/Toast';

interface StudentOption {
  id: string;
  name: string;
  country: string;
  flag: string;
  email: string;
}

const mockStudents: StudentOption[] = [
  { id: 's1', name: 'Mateo Silva', country: 'Colombia', flag: '🇨🇴', email: 'mateo.silva@gmail.com' },
  { id: 's2', name: 'Priya Sharma', country: 'India', flag: '🇮🇳', email: 'priya.sharma@example.com' },
  { id: 's16', name: 'Mei Lin Chen', country: 'Taiwan', flag: '🇹🇼', email: 'mei.chen@twmail.com' },
  { id: 's4', name: 'Fatima Al-Rashid', country: 'Saudi Arabia', flag: '🇸🇦', email: 'fatima.rashid@ksa.net' },
  { id: 's3', name: 'Thiago Oliveira', country: 'Brazil', flag: '🇧🇷', email: 'thiago.br@gmail.com' },
  { id: 's5', name: 'Aiko Tanaka', country: 'Japan', flag: '🇯🇵', email: 'aiko.tanaka@jp-tokyo.org' },
];

const mockCourses = [
  {
    id: 'CRS-01',
    name: 'General English (CRICOS 098412B)',
    provider: 'Sydney International College',
    cricos: '03456A',
    weeklyRate: 380,
    materialPerWeek: 6,
    enrolmentFee: 250,
    promoThreshold: 20,
    freeWeeksBonus: 4,
  },
  {
    id: 'CRS-02',
    name: 'Diploma of Leadership and Management (CRICOS 104112A)',
    provider: 'Australian Pacific College (APC)',
    cricos: '03812M',
    weeklyRate: 450,
    materialPerWeek: 8,
    enrolmentFee: 250,
    promoThreshold: 24,
    freeWeeksBonus: 4,
  },
  {
    id: 'CRS-03',
    name: 'Commercial Cookery Certificate III (CRICOS 097314C)',
    provider: 'Sydney International College',
    cricos: '03456A',
    weeklyRate: 550,
    materialPerWeek: 12,
    enrolmentFee: 300,
    promoThreshold: 20,
    freeWeeksBonus: 2,
  },
  {
    id: 'CRS-04',
    name: 'Diploma of Information Technology (CRICOS 108392J)',
    provider: 'Greenwich English College & Management Institute',
    cricos: '02644C',
    weeklyRate: 480,
    materialPerWeek: 10,
    enrolmentFee: 250,
    promoThreshold: 24,
    freeWeeksBonus: 4,
  },
];

type TimetablePref = 'morning' | 'afternoon' | 'evening';

export default function QuoteBuilder() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedStudent, setSelectedStudent] = useState<StudentOption>(mockStudents[0]);
  const [selectedCourse, setSelectedCourse] = useState(mockCourses[0]);
  const [enrolWeeks, setEnrolWeeks] = useState<number>(24);
  const [startDate, setStartDate] = useState<string>('2027-01-15');
  const [timetablePref, setTimetablePref] = useState<TimetablePref>('morning');
  const [includeOSHC, setIncludeOSHC] = useState<boolean>(true);
  const [oshsType, setOshsType] = useState<'single' | 'family'>('single');
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);

  // Financial calculations
  const tuitionPerWeek = selectedCourse.weeklyRate;
  const materialFeePerWeek = selectedCourse.materialPerWeek;
  const enrolmentFee = selectedCourse.enrolmentFee;
  const oshsWeeklySingle = 12.5;
  const oshsWeeklyFamily = 48.0;
  const depositRate = 0.35; // 35% upfront deposit for CoE

  const promoThreshold = selectedCourse.promoThreshold;
  const freeWeeks = enrolWeeks >= promoThreshold ? selectedCourse.freeWeeksBonus : 0;
  const billableWeeks = Math.max(1, enrolWeeks - freeWeeks);
  const hasPromo = freeWeeks > 0;

  const tuitionCost = billableWeeks * tuitionPerWeek;
  const originalTuition = enrolWeeks * tuitionPerWeek;
  const scholarshipSavings = originalTuition - tuitionCost;
  const materialCost = enrolWeeks * materialFeePerWeek;
  const oshsCost = includeOSHC ? (oshsType === 'single' ? oshsWeeklySingle : oshsWeeklyFamily) * enrolWeeks : 0;
  const totalPackageValue = tuitionCost + enrolmentFee + materialCost + oshsCost;
  const initialDeposit = totalPackageValue * depositRate;
  const balanceDue = totalPackageValue - initialDeposit;
  const estimatedCommission = Math.round(tuitionCost * 0.22); // 22% average commission

  const handleExportPDF = () => {
    toast(`Exported PDF Offer & Quote for ${selectedStudent.name}!`, 'success');
  };

  const handleEmailQuote = () => {
    toast(`Email quotation sent to ${selectedStudent.email}!`, 'success');
  };

  const handleSaveToPipeline = () => {
    toast(`Quote saved and linked to ${selectedStudent.name} in Student Pipeline!`, 'success');
    navigate('/agent/pipeline');
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-7xl mx-auto pb-16">
        {/* ════════════ Header & Breadcrumbs ════════════ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Link to="/agent/dashboard" className="hover:text-blue-600 transition-colors">Agent Hub</Link>
              <span>/</span>
              <Link to="/agent/quotes" className="hover:text-blue-600 transition-colors">Quotes</Link>
              <span>/</span>
              <span className="text-slate-900 font-medium">Interactive Quote Builder</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Student Tuition Quote Builder
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Calculate CRICOS tuition, scholarship deductions, OSHC health cover, and recruiter commission.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(-1)}
              className="gap-1.5 text-xs text-slate-600 border-slate-300 hover:bg-slate-50"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreviewModal(true)}
              className="gap-1.5 text-xs text-slate-700 border-slate-300 hover:bg-slate-50 font-semibold"
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" /> Preview Letter of Offer
            </Button>
          </div>
        </div>

        {/* ════════════ Main Grid ════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Form Parameters (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1. Student Selection Card */}
            <Card className="p-5 sm:p-6 bg-white border border-slate-200 shadow-2xs rounded-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900">1. Select Candidate</h3>
                </div>
                <Link
                  to="/agent/quick-add-student"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-3.5 h-3.5" /> Quick Add Student
                </Link>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Assigned International Student</label>
                <select
                  value={selectedStudent.id}
                  onChange={(e) => {
                    const found = mockStudents.find((s) => s.id === e.target.value);
                    if (found) setSelectedStudent(found);
                  }}
                  className="w-full h-11 px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white text-slate-900 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 transition-all cursor-pointer"
                >
                  {mockStudents.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.flag} {s.name} ({s.country}) — {s.email}
                    </option>
                  ))}
                </select>
              </div>
            </Card>

            {/* 2. Institution & Course Parameters */}
            <Card className="p-5 sm:p-6 bg-white border border-slate-200 shadow-2xs rounded-2xl space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">2. Institution &amp; Study Configuration</h3>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">CRICOS Course &amp; Provider</label>
                <select
                  value={selectedCourse.id}
                  onChange={(e) => {
                    const found = mockCourses.find((c) => c.id === e.target.value);
                    if (found) setSelectedCourse(found);
                  }}
                  className="w-full h-11 px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white text-slate-900 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 transition-all cursor-pointer"
                >
                  {mockCourses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} — {c.provider} (A${c.weeklyRate}/wk)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Duration Slider + Number */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label htmlFor="duration-weeks" className="block text-xs font-bold text-slate-700">Enrolment Duration</label>
                    <span className="text-xs font-mono font-bold text-blue-600">{enrolWeeks} Weeks</span>
                  </div>
                  <Input
                    id="duration-weeks"
                    type="number"
                    min={1}
                    max={104}
                    value={enrolWeeks}
                    onChange={(e) => setEnrolWeeks(Math.max(1, parseInt(e.target.value) || 1))}
                    className="h-10 rounded-xl border-slate-200 text-sm font-semibold"
                  />
                  <input
                    type="range"
                    min={4}
                    max={52}
                    step={2}
                    value={enrolWeeks}
                    onChange={(e) => setEnrolWeeks(parseInt(e.target.value))}
                    className="w-full mt-2 accent-blue-600 cursor-pointer"
                  />
                </div>

                {/* Target Start Date */}
                <div>
                  <label htmlFor="start-date" className="block text-xs font-bold text-slate-700 mb-1.5">Target Commencement Date</label>
                  <Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="h-10 rounded-xl border-slate-200 text-sm font-semibold [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">CRICOS Term Census Date</span>
                </div>
              </div>

              {/* Timetable Preferences */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Study Session &amp; Timetable</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { key: 'morning' as TimetablePref, label: 'Morning', time: '08:15 – 12:35', emoji: '☀️' },
                    { key: 'afternoon' as TimetablePref, label: 'Afternoon', time: '13:00 – 17:20', emoji: '⛅' },
                    { key: 'evening' as TimetablePref, label: 'Evening', time: '17:30 – 21:30', emoji: '🌙' },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setTimetablePref(opt.key)}
                      className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all text-center ${
                        timetablePref === opt.key
                          ? 'border-blue-600 bg-blue-50/60 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <span className="text-lg">{opt.emoji}</span>
                      <span className={`text-xs font-bold mt-1 ${timetablePref === opt.key ? 'text-blue-700' : 'text-slate-800'}`}>
                        {opt.label}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5">{opt.time}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* OSHC Toggle */}
              <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-sky-700" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        Overseas Student Health Cover (OSHC)
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Mandatory under Subclass 500 visa condition 8501
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIncludeOSHC(!includeOSHC)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      includeOSHC ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                        includeOSHC ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {includeOSHC && (
                  <div className="pt-2 border-t border-sky-200/60 flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-700">Policy Type:</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setOshsType('single')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                          oshsType === 'single'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        Single (A$12.50/wk)
                      </button>
                      <button
                        type="button"
                        onClick={() => setOshsType('family')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                          oshsType === 'family'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        Dual / Family (A$48.00/wk)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right Column: Financial Breakdown & Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Promotion Notification */}
            {hasPromo ? (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 shadow-2xs">
                <span className="text-xl">🎉</span>
                <div>
                  <p className="text-xs font-bold text-emerald-900">Scholarship Promo Applied!</p>
                  <p className="text-xs text-emerald-700 mt-0.5 leading-relaxed">
                    Enrolled {enrolWeeks} weeks (≥ {promoThreshold} wks) — student receives{' '}
                    <strong>{freeWeeks} weeks tuition-free</strong>. Saving of <strong>A${scholarshipSavings.toLocaleString()} AUD</strong>.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 leading-relaxed">
                  Tip: Enrol <strong>{promoThreshold - enrolWeeks} more weeks</strong> to unlock the{' '}
                  <strong>{selectedCourse.freeWeeksBonus} weeks free scholarship</strong>!
                </p>
              </div>
            )}

            {/* Cost Breakdown Card */}
            <Card className="p-5 sm:p-6 bg-white border border-slate-200 shadow-2xs rounded-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Official Fee Breakdown
                  </span>
                </div>
                <Badge variant="default" className="text-[10px] bg-blue-50 text-blue-700 border-blue-200 font-bold">
                  AUD Currency
                </Badge>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Gross Tuition Fee</span>
                  <span className="text-slate-500 font-mono">
                    {enrolWeeks} wks × A${tuitionPerWeek}/wk = A${originalTuition.toLocaleString()}
                  </span>
                </div>

                {hasPromo && (
                  <div className="flex justify-between items-center text-emerald-700 font-medium">
                    <span>Scholarship Credit ({freeWeeks} wks)</span>
                    <span className="font-mono font-bold">-A${scholarshipSavings.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between items-center font-bold text-slate-900 pt-1 border-t border-slate-100">
                  <span>Net Tuition Payable</span>
                  <span className="font-mono text-sm">A${tuitionCost.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-slate-600 pt-1">
                  <span>Enrolment &amp; Registration Fee</span>
                  <span className="font-mono">A${enrolmentFee.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-slate-600">
                  <span>Materials &amp; Learning Resources</span>
                  <span className="font-mono">
                    {enrolWeeks} wks × A${materialFeePerWeek} = A${materialCost.toLocaleString()}
                  </span>
                </div>

                {includeOSHC && (
                  <div className="flex justify-between items-center text-slate-600">
                    <span>OSHC Medical Cover ({oshsType})</span>
                    <span className="font-mono">A${Math.round(oshsCost).toLocaleString()}</span>
                  </div>
                )}

                <div className="pt-3 border-t-2 border-slate-200 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-extrabold text-slate-900 block">Total Package Value</span>
                    <span className="text-[10px] text-slate-400">All fees inclusive</span>
                  </div>
                  <span className="text-2xl font-extrabold text-slate-900 font-mono">
                    A${totalPackageValue.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Payment Schedule Box */}
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Payment Milestones
                </span>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-bold text-slate-800">Initial Deposit (for CoE Release)</span>
                  </div>
                  <span className="font-mono font-bold text-blue-700 text-sm">
                    A${Math.round(initialDeposit).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-slate-600">Balance on Census Date</span>
                  </div>
                  <span className="font-mono font-bold text-slate-700">
                    A${Math.round(balanceDue).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Projected Agency Commission Box */}
              <div className="rounded-xl bg-emerald-50/70 border border-emerald-200 p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                    Agency Commission (22%)
                  </span>
                  <span className="text-xs text-emerald-700 mt-0.5 block">Disbursed upon census clearance</span>
                </div>
                <span className="text-lg font-extrabold text-emerald-700 font-mono">
                  A${estimatedCommission.toLocaleString()} AUD
                </span>
              </div>
            </Card>

            {/* Quick Actions Card */}
            <Card className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2.5">
              <Button
                onClick={handleSaveToPipeline}
                className="w-full text-xs font-bold gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 h-10"
              >
                <ChevronRight className="w-4 h-4" /> Save &amp; Add to Student Pipeline
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={handleExportPDF}
                  className="text-xs font-semibold gap-1.5 border-slate-300 text-slate-700 hover:bg-slate-50 h-9"
                >
                  <Download className="w-3.5 h-3.5" /> Export PDF
                </Button>
                <Button
                  variant="outline"
                  onClick={handleEmailQuote}
                  className="text-xs font-semibold gap-1.5 border-slate-300 text-slate-700 hover:bg-slate-50 h-9"
                >
                  <Send className="w-3.5 h-3.5" /> Email Quote
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* ════════════ Letter of Offer Preview Modal ════════════ */}
        {showPreviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Letter of Offer &amp; Written Agreement</h3>
                    <p className="text-xs text-slate-500">Official quotation document generated for {selectedStudent.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Document Body */}
              <div className="p-8 overflow-y-auto space-y-6 text-slate-800 text-xs leading-relaxed bg-white font-sans">
                <div className="flex justify-between items-start pb-4 border-b border-slate-200">
                  <div>
                    <h2 className="text-lg font-extrabold text-blue-900 uppercase tracking-tight">
                      {selectedCourse.provider}
                    </h2>
                    <p className="text-slate-500 text-[11px]">CRICOS Provider Code: {selectedCourse.cricos}</p>
                    <p className="text-slate-500 text-[11px]">Sydney Central Campus, NSW 2000, Australia</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-slate-500">REF: QT-2027-{selectedStudent.id}</span>
                    <p className="text-[11px] text-slate-400">Date: {new Date().toLocaleDateString('en-AU')}</p>
                  </div>
                </div>

                <div>
                  <p className="font-bold text-slate-900">Dear {selectedStudent.name},</p>
                  <p className="mt-1">
                    We are pleased to offer you conditional admission into <strong>{selectedCourse.name}</strong> under the Education Services for Overseas Students (ESOS) Act 2000.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div><span className="text-slate-400">Student Name:</span> <strong>{selectedStudent.name}</strong></div>
                    <div><span className="text-slate-400">Nationality:</span> <strong>{selectedStudent.country} {selectedStudent.flag}</strong></div>
                    <div><span className="text-slate-400">Commencement:</span> <strong>{startDate}</strong></div>
                    <div><span className="text-slate-400">Duration:</span> <strong>{enrolWeeks} Weeks</strong></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Financial Summary (AUD)</h4>
                  <table className="w-full border-collapse border border-slate-200 text-left text-xs">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="p-2 border border-slate-200">Description</th>
                        <th className="p-2 border border-slate-200 text-right">Amount (AUD)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 border border-slate-200">Course Tuition ({enrolWeeks} weeks)</td>
                        <td className="p-2 border border-slate-200 text-right font-mono">A${originalTuition.toLocaleString()}</td>
                      </tr>
                      {hasPromo && (
                        <tr className="text-emerald-700">
                          <td className="p-2 border border-slate-200">Scholarship Promo ({freeWeeks} wks tuition)</td>
                          <td className="p-2 border border-slate-200 text-right font-mono">-A${scholarshipSavings.toLocaleString()}</td>
                        </tr>
                      )}
                      <tr>
                        <td className="p-2 border border-slate-200">Enrolment &amp; Administration Fee</td>
                        <td className="p-2 border border-slate-200 text-right font-mono">A${enrolmentFee.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-slate-200">Materials Fee</td>
                        <td className="p-2 border border-slate-200 text-right font-mono">A${materialCost.toLocaleString()}</td>
                      </tr>
                      {includeOSHC && (
                        <tr>
                          <td className="p-2 border border-slate-200">OSHC Health Cover ({oshsType})</td>
                          <td className="p-2 border border-slate-200 text-right font-mono">A${Math.round(oshsCost).toLocaleString()}</td>
                        </tr>
                      )}
                      <tr className="font-bold bg-slate-50 text-slate-900">
                        <td className="p-2 border border-slate-200">Total Enrolment Package</td>
                        <td className="p-2 border border-slate-200 text-right font-mono text-sm">A${totalPackageValue.toLocaleString()}</td>
                      </tr>
                      <tr className="font-bold text-blue-700">
                        <td className="p-2 border border-slate-200">Initial Deposit Required for CoE</td>
                        <td className="p-2 border border-slate-200 text-right font-mono text-sm">A${Math.round(initialDeposit).toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-[11px] text-slate-500 italic">
                  * This written agreement complies with the National Code of Practice for Providers of Education and Training to Overseas Students 2018 Standard 2 &amp; Standard 3.
                </p>
              </div>

              {/* Footer */}
              <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between bg-slate-50">
                <Button variant="ghost" size="sm" onClick={() => setShowPreviewModal(false)} className="text-xs">
                  Close
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleExportPDF} className="gap-1.5 text-xs font-semibold">
                    <Printer className="w-3.5 h-3.5" /> Print / Save PDF
                  </Button>
                  <Button size="sm" onClick={() => { setShowPreviewModal(false); handleSaveToPipeline(); }} className="gap-1.5 text-xs font-bold">
                    Confirm &amp; Link to Pipeline
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
