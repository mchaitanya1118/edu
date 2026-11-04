import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  BookOpen,
  Globe,
  Star,
  ShieldCheck,
  CheckCircle2,
  Download,
  FileText,
  Building2,
  Sparkles,
  Percent,
  GraduationCap,
  ArrowUpRight,
  ChevronRight,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

export default function CourseDetailsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedCampus, setSelectedCampus] = useState('Sydney CBD (Kent St)');
  const [selectedIntake, setSelectedIntake] = useState('14 Jul 2026 (Term 3)');
  const [includeOSHC, setIncludeOSHC] = useState(true);

  const course = {
    title: 'Diploma of Leadership and Management',
    cricosCode: '104112A',
    nationalCode: 'BSB50420',
    provider: 'Australian Pacific College (APC)',
    providerCricos: '03812M',
    rto: '45123',
    sector: 'VET Business & Management',
    durationWeeks: 52,
    studyHoursPerWeek: 20,
    aqfLevel: 'AQF Level 5 (Diploma)',
    entryIelts: 'IELTS 5.5 (or APC Free Online Placement Test)',
    standardTuition: 8000,
    promoTuition: 6800,
    promoLabel: '15% Regional & CBD Bursary ($280/wk equivalent)',
    enrolmentFee: 200,
    materialFee: 0,
    commissionRate: 22,
    tier1Rate: 25,
    campuses: [
      { name: 'Sydney CBD (Kent St)', state: 'NSW', isRegional: false },
      { name: 'Manly Beach', state: 'NSW', isRegional: false },
      { name: 'Melbourne (Lonsdale St)', state: 'VIC', isRegional: false },
      { name: 'Brisbane (Creek St)', state: 'QLD', isRegional: false },
      { name: 'Gold Coast (Surfers Paradise)', state: 'QLD', isRegional: true },
    ],
    highlights: [
      'ESOS National Code 2018 & ASQA accredited curriculum',
      'Timetable options: 2 Full Days or Evening (4:30pm - 9:00pm)',
      'Direct pathway credit into Torrens University & CQU Bachelor degrees',
      'High visa grant rate (98.2%) with Genuine Student (GS) compliance assurance',
      'Gold Coast campus qualifies for Category 2 Regional Migration (+5 Points)',
    ],
    units: [
      { code: 'BSBCMM511', name: 'Communicate with influence', core: true },
      { code: 'BSBCRT511', name: 'Develop critical thinking in others', core: true },
      { code: 'BSBLDR522', name: 'Manage people performance', core: true },
      { code: 'BSBOPS502', name: 'Manage business operational plans', core: true },
      { code: 'BSBFIN501', name: 'Manage budgets and financial plans', core: false },
      { code: 'BSBSTR502', name: 'Facilitate continuous improvement', core: false },
    ],
  };

  const oshcAnnualCost = 640;
  const netTuition = course.promoTuition;
  const totalPackage = netTuition + course.enrolmentFee + (includeOSHC ? oshcAnnualCost : 0);
  const estimatedCommission = Math.round((netTuition * course.commissionRate) / 100);
  const initialDeposit = Math.round(totalPackage * 0.35);

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
            <Link to="/courses" className="hover:text-blue-600">Courses Catalog</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-blue-600 font-bold truncate max-w-xs">{course.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/quotes">
              <Button size="sm" className="gap-1.5 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                Build Student Quote
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Course Header */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold border border-blue-400/30">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                {course.provider}
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-white">
                CRICOS {course.cricosCode}
              </span>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-white/10 text-slate-300">
                {course.nationalCode}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                ASQA &amp; PRISMS Registered
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              {course.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Industry-standard vocational qualification equipping international candidates with advanced leadership, financial operations, critical thinking, and enterprise operational skills.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-400" />
                {course.durationWeeks} Weeks Duration (20 hrs/wk)
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                {course.aqfLevel}
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-amber-400" />
                {course.entryIelts}
              </span>
            </div>
          </div>
        </div>

        {/* Main 2-Column Grid: Course Particulars & Right Sticky Pricing / Commission */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2 Cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Facts Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-[11px] text-slate-500 block font-medium">Standard Tuition</span>
                <span className="text-base font-extrabold text-slate-400 line-through">A${course.standardTuition.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Annual CRICOS</span>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 shadow-2xs">
                <span className="text-[11px] text-emerald-800 block font-bold">Promo Tuition</span>
                <span className="text-lg font-extrabold text-emerald-700">A${course.promoTuition.toLocaleString()}</span>
                <span className="text-[10px] text-emerald-700 block mt-0.5">Save A$1,200</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-[11px] text-slate-500 block font-medium">Agent Base Rate</span>
                <span className="text-lg font-extrabold text-blue-700">{course.commissionRate}%</span>
                <span className="text-[10px] text-blue-600 block mt-0.5">+3% Tier-1 Bonus</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-[11px] text-slate-500 block font-medium">Offer Turnaround</span>
                <span className="text-lg font-extrabold text-purple-700">24 Hours</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Express CoE SLA</span>
              </div>
            </div>

            {/* Curriculum Units */}
            <Card className="p-5 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-3.5">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Accredited Units of Competency ({course.units.length} Subjects)
                </h3>
                <span className="text-[11px] font-semibold text-slate-500">Nationally Recognised Training</span>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {course.units.map((u) => (
                  <div key={u.code} className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {u.code}
                      </span>
                      <span className="font-semibold text-slate-800">{u.name}</span>
                    </div>
                    <Badge variant={u.core ? 'default' : 'secondary'} className="text-[10px]">
                      {u.core ? 'Core Unit' : 'Elective'}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Key Institutional Highlights */}
            <Card className="p-5 border border-slate-200 shadow-2xs">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Delivery Modes, Pathways &amp; Migration Advantages
              </h3>
              <div className="space-y-2">
                {course.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 p-2.5 rounded-lg bg-slate-50">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column: Interactive Quote & Commission Calculator */}
          <div className="space-y-5">
            <Card className="p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Enrolment &amp; Pricing Configuration
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">Quick Quote Calculator</h3>
              </div>

              {/* Campus Selector */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1 text-xs">Preferred Campus</label>
                <select
                  value={selectedCampus}
                  onChange={(e) => setSelectedCampus(e.target.value)}
                  className="w-full h-9 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
                >
                  {course.campuses.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name} {c.isRegional ? '★ Regional (+5 Pts)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Intake Selector */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1 text-xs">Intake Term</label>
                <select
                  value={selectedIntake}
                  onChange={(e) => setSelectedIntake(e.target.value)}
                  className="w-full h-9 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
                >
                  <option value="14 Jul 2026 (Term 3)">14 Jul 2026 (Term 3 Intake)</option>
                  <option value="07 Sep 2026 (Spring)">07 Sep 2026 (Spring Intake)</option>
                  <option value="19 Oct 2026 (Term 4)">19 Oct 2026 (Term 4 Intake)</option>
                </select>
              </div>

              {/* OSHC Checkbox */}
              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={includeOSHC}
                  onChange={(e) => setIncludeOSHC(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-0"
                />
                <div className="flex-1">
                  <span className="font-bold text-slate-900 block">Include Bupa / Allianz OSHC</span>
                  <span className="text-[11px] text-slate-500">12 Months Single Cover (+A${oshcAnnualCost})</span>
                </div>
              </label>

              {/* Itemized Fee Breakdown */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Tuition Fee (52 wks):</span>
                  <span className="font-semibold text-slate-900">A${course.promoTuition.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Enrolment Fee:</span>
                  <span className="font-semibold text-slate-900">A${course.enrolmentFee}</span>
                </div>
                {includeOSHC && (
                  <div className="flex justify-between text-slate-600">
                    <span>OSHC Health Cover:</span>
                    <span className="font-semibold text-slate-900">A${oshcAnnualCost}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                  <span>Total Payable:</span>
                  <span className="text-blue-700">A${totalPackage.toLocaleString()} AUD</span>
                </div>
                <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 flex justify-between text-xs font-semibold text-blue-950">
                  <span>PRISMS CoE Initial Deposit:</span>
                  <span className="font-extrabold text-blue-700">A${initialDeposit.toLocaleString()}</span>
                </div>
              </div>

              {/* Agent Commission Box */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
                  <span className="flex items-center gap-1">
                    <Percent className="w-3.5 h-3.5 text-emerald-600" />
                    Agent Recruitment Commission:
                  </span>
                  <span className="font-mono text-emerald-800 text-sm">
                    +A${estimatedCommission.toLocaleString()}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-900">
                  Calculated at {course.commissionRate}% base net tuition. Preferred Tier-1 partners earn A${Math.round((netTuition * course.tier1Rate) / 100).toLocaleString()} (25%).
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <Link to="/quotes" className="block">
                  <Button className="w-full text-xs font-bold">
                    Generate Student Quote
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
                <Button
                  variant="secondary"
                  className="w-full text-xs font-semibold"
                  onClick={() => toast(`Fact sheet & brochure downloaded for ${course.title}`, 'success')}
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Course Brochure (PDF)
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
