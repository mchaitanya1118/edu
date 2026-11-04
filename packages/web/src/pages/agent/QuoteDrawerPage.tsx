import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Plus,
  FileText,
  X,
  MapPin,
  Clock,
  Calendar,
  Save,
  Download,
  User,
  Globe,
  Building2,
  ArrowLeft,
  Star,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Sparkles,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { useToast } from '../../components/ui/Toast';

interface Course {
  code: string;
  name: string;
  category: string;
  duration: string;
  pricePerWeek: number;
  campusAndPathway: string;
  provider: string;
  campusAddress: string;
  cricosCode: string;
  materialPerWeek: number;
}

const AVAILABLE_COURSES: Course[] = [
  {
    code: 'SIT30816',
    name: 'Certificate III in Commercial Cookery',
    category: 'VET Hospitality',
    duration: '52 weeks (1 Year)',
    pricePerWeek: 420,
    campusAndPathway: 'Sydney Central Campus',
    provider: 'Sydney International College',
    campusAddress: 'Sydney CBD, NSW 2000',
    cricosCode: '097314C',
    materialPerWeek: 12,
  },
  {
    code: 'SIT50022',
    name: 'Diploma of Hospitality Management',
    category: 'VET Hospitality',
    duration: '78 weeks (1.5 Years)',
    pricePerWeek: 450,
    campusAndPathway: 'Melbourne Campus',
    provider: 'Australian Pacific College (APC)',
    campusAddress: 'Melbourne CBD, VIC 3000',
    cricosCode: '104112A',
    materialPerWeek: 10,
  },
  {
    code: 'ICT50220',
    name: 'Diploma of Information Technology',
    category: 'VET Information Tech',
    duration: '52 weeks (1 Year)',
    pricePerWeek: 440,
    campusAndPathway: 'Brisbane Campus',
    provider: 'Greenwich Management Institute',
    campusAddress: 'Brisbane CBD, QLD 4000',
    cricosCode: '108392J',
    materialPerWeek: 8,
  },
];

export default function QuoteDrawerPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedCourse, setSelectedCourse] = useState<Course>(AVAILABLE_COURSES[0]);
  const [durationWeeks, setDurationWeeks] = useState(24);
  const [candidateName, setCandidateName] = useState('Maria Santos');
  const [candidateEmail, setCandidateEmail] = useState('maria.santos@email.com');
  const [candidateCountry, setCandidateCountry] = useState('Brazil');
  const [includePathwayBundle, setIncludePathwayBundle] = useState(true);
  const [pathwayCourse, setPathwayCourse] = useState<Course>(AVAILABLE_COURSES[1]);
  const [pathwayDurationWeeks, setPathwayDurationWeeks] = useState(52);
  const [saved, setSaved] = useState(false);

  // Financial calculations
  const course1Tuition = selectedCourse.pricePerWeek * durationWeeks;
  const course1Material = selectedCourse.materialPerWeek * durationWeeks;

  const course2Tuition = includePathwayBundle ? pathwayCourse.pricePerWeek * pathwayDurationWeeks : 0;
  const course2Material = includePathwayBundle ? pathwayCourse.materialPerWeek * pathwayDurationWeeks : 0;

  const enrolmentFee = 250;
  const bundleScholarshipDiscount = includePathwayBundle ? 1200 : 400; // Bundle bonus

  const totalGrossTuition = course1Tuition + course2Tuition;
  const totalMaterials = course1Material + course2Material;
  const totalNetPackage = totalGrossTuition + totalMaterials + enrolmentFee - bundleScholarshipDiscount;
  const initialDeposit = Math.round(totalNetPackage * 0.30); // 30% initial deposit
  const estimatedAgencyCommission = Math.round(totalGrossTuition * 0.22); // 22% commission

  const handleSaveQuote = () => {
    setSaved(true);
    toast(`Saved pathway quote for ${candidateName}!`, 'success');
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExportPDF = () => {
    toast(`Exported Formal Pathway Quote PDF for ${candidateName}!`, 'success');
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-7xl mx-auto pb-16">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Link to="/agent/dashboard" className="hover:text-blue-600 transition-colors">Agent Hub</Link>
              <span>/</span>
              <Link to="/agent/quotes" className="hover:text-blue-600 transition-colors">Quotes</Link>
              <span>/</span>
              <span className="text-slate-900 font-medium">Packaged Pathway Quote</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Packaged Course Pathway Quotation
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Package ELICOS / VET Certificate + Diploma pathways with bundled scholarship savings.
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
              onClick={() => navigate('/agent/quotes')}
              className="gap-1.5 text-xs text-slate-700 border-slate-300 hover:bg-slate-50 font-semibold"
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" /> All Quotes
            </Button>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Courses & Packaging (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Candidate Header Card */}
            <Card className="p-5 bg-white border border-slate-200 shadow-2xs rounded-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900">Student Profile</h3>
                </div>
                <Badge variant="default" className="text-[10px] bg-blue-50 text-blue-700 border-blue-200">
                  Subclass 500 Eligible
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Student Full Name</label>
                  <Input
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className="h-10 rounded-xl border-slate-200 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <Input
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                    className="h-10 rounded-xl border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Country of Citizenship</label>
                  <select
                    value={candidateCountry}
                    onChange={(e) => setCandidateCountry(e.target.value)}
                    className="w-full h-10 px-3 text-xs border border-slate-200 rounded-xl bg-white font-medium cursor-pointer"
                  >
                    <option value="Brazil">Brazil 🇧🇷</option>
                    <option value="Colombia">Colombia 🇨🇴</option>
                    <option value="India">India 🇮🇳</option>
                    <option value="Japan">Japan 🇯🇵</option>
                    <option value="Taiwan">Taiwan 🇹🇼</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Primary Course Card */}
            <Card className="p-5 sm:p-6 bg-white border border-slate-200 shadow-2xs rounded-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900">Stage 1: Primary Course Qualification</h3>
                </div>
                <Badge variant="default" className="text-[11px] font-mono bg-slate-100 text-slate-700">
                  CRICOS: {selectedCourse.cricosCode}
                </Badge>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Select Course</label>
                <select
                  value={selectedCourse.code}
                  onChange={(e) => {
                    const found = AVAILABLE_COURSES.find((c) => c.code === e.target.value);
                    if (found) setSelectedCourse(found);
                  }}
                  className="w-full h-11 px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white text-slate-900 font-semibold cursor-pointer"
                >
                  {AVAILABLE_COURSES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name} ({c.provider}) — A${c.pricePerWeek}/wk
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Duration ({durationWeeks} Weeks)
                  </label>
                  <input
                    type="range"
                    min={12}
                    max={52}
                    step={4}
                    value={durationWeeks}
                    onChange={(e) => setDurationWeeks(parseInt(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-500 mt-0.5 block">
                    {durationWeeks} wks × A${selectedCourse.pricePerWeek} = A${course1Tuition.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-700 mb-1">Campus Location</span>
                  <span className="text-xs font-semibold text-slate-800 block p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    {selectedCourse.campusAddress}
                  </span>
                </div>
              </div>
            </Card>

            {/* Packaging Pathway Bundle */}
            <Card
              className={`p-5 sm:p-6 transition-all rounded-2xl border ${
                includePathwayBundle
                  ? 'bg-blue-50/40 border-blue-200 shadow-2xs'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Stage 2: Packaged Pathway Course</h3>
                    <p className="text-[11px] text-slate-500">Dual CoE package for single visa grant</p>
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includePathwayBundle}
                    onChange={(e) => setIncludePathwayBundle(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs font-bold text-slate-700">Include in Bundle</span>
                </label>
              </div>

              {includePathwayBundle && (
                <div className="pt-4 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Pathway Course</label>
                    <select
                      value={pathwayCourse.code}
                      onChange={(e) => {
                        const found = AVAILABLE_COURSES.find((c) => c.code === e.target.value);
                        if (found) setPathwayCourse(found);
                      }}
                      className="w-full h-11 px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white text-slate-900 font-semibold cursor-pointer"
                    >
                      {AVAILABLE_COURSES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name} — {c.provider} (A${c.pricePerWeek}/wk)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Pathway Duration ({pathwayDurationWeeks} Weeks)
                      </label>
                      <input
                        type="range"
                        min={26}
                        max={104}
                        step={13}
                        value={pathwayDurationWeeks}
                        onChange={(e) => setPathwayDurationWeeks(parseInt(e.target.value))}
                        className="w-full accent-blue-600 cursor-pointer"
                      />
                      <span className="text-[11px] text-slate-500 mt-0.5 block">
                        {pathwayDurationWeeks} wks × A${pathwayCourse.pricePerWeek} = A${course2Tuition.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-700 mb-1">Pathway Campus</span>
                      <span className="text-xs font-semibold text-slate-800 block p-2.5 rounded-lg bg-white border border-slate-200">
                        {pathwayCourse.campusAddress}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Right Column: Financial Summary & Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Package Summary Card */}
            <Card className="p-5 sm:p-6 bg-white border border-slate-200 shadow-2xs rounded-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Pathway Quotation Summary
                  </span>
                </div>
                <Badge variant="default" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200 font-bold">
                  {includePathwayBundle ? '2-Stage Dual CoE' : 'Single CoE'}
                </Badge>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Stage 1: {selectedCourse.code}</span>
                  <span className="font-mono text-slate-800 font-bold">A${course1Tuition.toLocaleString()}</span>
                </div>

                {includePathwayBundle && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Stage 2: {pathwayCourse.code}</span>
                    <span className="font-mono text-slate-800 font-bold">A${course2Tuition.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-slate-600">
                  <span>Enrolment &amp; Administration Fee</span>
                  <span className="font-mono">A${enrolmentFee.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-slate-600">
                  <span>Course Materials Total</span>
                  <span className="font-mono">A${totalMaterials.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-emerald-700 font-semibold pt-1 border-t border-slate-100">
                  <span>Package Pathway Scholarship Rebate</span>
                  <span className="font-mono font-bold">-A${bundleScholarshipDiscount.toLocaleString()}</span>
                </div>

                <div className="pt-3 border-t-2 border-slate-200 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-extrabold text-slate-900 block">Total Net Package</span>
                    <span className="text-[10px] text-slate-400">All inclusive</span>
                  </div>
                  <span className="text-2xl font-extrabold text-slate-900 font-mono">
                    A${totalNetPackage.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Milestone Box */}
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">Initial CoE Release Deposit</span>
                  <span className="font-mono font-bold text-blue-700 text-sm">
                    A${initialDeposit.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Remaining Balance on Census</span>
                  <span className="font-mono text-slate-700">
                    A${(totalNetPackage - initialDeposit).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Agency Commission */}
              <div className="rounded-xl bg-emerald-50/70 border border-emerald-200 p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                    Total Agency Commission (22%)
                  </span>
                  <span className="text-xs text-emerald-700">Across full packaged pathway</span>
                </div>
                <span className="text-lg font-extrabold text-emerald-700 font-mono">
                  A${estimatedAgencyCommission.toLocaleString()} AUD
                </span>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="default"
                size="lg"
                className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/20 text-xs"
                onClick={handleSaveQuote}
              >
                <Save className="w-4 h-4" /> {saved ? 'Saved ✓' : 'Save Pathway Quote'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleExportPDF}
                className="gap-2 border-slate-300 text-slate-700 text-xs font-semibold bg-white hover:bg-slate-50"
              >
                <Download className="w-4 h-4" /> Export PDF
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
