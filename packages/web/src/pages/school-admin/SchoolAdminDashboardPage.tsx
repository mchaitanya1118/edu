import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Building2,
  BookOpen,
  Users,
  Sparkles,
  FileCheck,
  Plus,
  CheckCircle2,
  MapPin,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Send,
  Eye,
  Download,
  X,
  Sliders,
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

type ApplicationItem = {
  id: string;
  student: string;
  nationality: string;
  passport: string;
  agency: string;
  course: string;
  cricos: string;
  campus: string;
  intake: string;
  tuition: string;
  status: string;
  gteVerified: boolean;
  gteScore: number;
  coeNumber?: string;
};

const INITIAL_APPLICATIONS: ApplicationItem[] = [
  {
    id: 'APP-9041',
    student: 'Mateo Silva',
    nationality: 'Colombia',
    passport: 'CO9928114',
    agency: 'Latino Study Hub',
    course: 'Diploma of Leadership & Management',
    cricos: '104112A',
    campus: 'Sydney CBD',
    intake: '14 Jul 2026',
    tuition: '$7,200',
    status: 'Awaiting CoE',
    gteVerified: true,
    gteScore: 94,
  },
  {
    id: 'APP-9042',
    student: 'Yuki Tanaka',
    nationality: 'Japan',
    passport: 'TK8841209',
    agency: 'Tokyo Edu Partners',
    course: 'General English (20 Weeks)',
    cricos: '098412B',
    campus: 'Melbourne',
    intake: '03 Aug 2026',
    tuition: '$5,600',
    status: 'Payment Verified',
    gteVerified: true,
    gteScore: 98,
  },
  {
    id: 'APP-9045',
    student: 'Camila Rojas',
    nationality: 'Brazil',
    passport: 'BR4410922',
    agency: 'Global Pathways BR',
    course: 'Cert IV in Marketing & Communication',
    cricos: '105881E',
    campus: 'Brisbane',
    intake: '14 Jul 2026',
    tuition: '$6,800',
    status: 'GTE Review',
    gteVerified: false,
    gteScore: 86,
  },
  {
    id: 'APP-9049',
    student: 'Arjun Nair',
    nationality: 'India',
    passport: 'IN7751203',
    agency: 'Southern Cross Admissions',
    course: 'Advanced Diploma of IT',
    cricos: '108721M',
    campus: 'Sydney CBD',
    intake: '07 Sep 2026',
    tuition: '$9,400',
    status: 'Offer Issued',
    gteVerified: true,
    gteScore: 92,
  },
];

const INITIAL_CAMPUS_CAPACITY = [
  {
    campus: 'Sydney CBD Flagship',
    address: 'Level 4, 189 Kent St, Sydney NSW 2000',
    enrolled: 640,
    cap: 750,
    activeCourses: 9,
  },
  {
    campus: 'Melbourne Central',
    address: '250 Collins St, Melbourne VIC 3000',
    enrolled: 410,
    cap: 500,
    activeCourses: 7,
  },
  {
    campus: 'Brisbane Riverside',
    address: '120 Creek St, Brisbane QLD 4000',
    enrolled: 235,
    cap: 350,
    activeCourses: 5,
  },
];

const PUBLISHED_COURSES = [
  {
    name: 'General English (ELICOS)',
    cricos: '098412B',
    standardRate: '$350/wk',
    promoRate: '$280/wk',
    promoTag: '20% Q3 Scholarship',
    enrolments: 412,
    intakeStatus: 'Open • Weekly Monday',
  },
  {
    name: 'Diploma of Leadership & Management',
    cricos: '104112A',
    standardRate: '$8,000/yr',
    promoRate: '$6,800/yr',
    promoTag: '15% LATAM & EU Grant',
    enrolments: 289,
    intakeStatus: 'Open • 14 Jul 2026',
  },
  {
    name: 'Certificate IV in Marketing & Communication',
    cricos: '105881E',
    standardRate: '$7,600/yr',
    promoRate: '$6,400/yr',
    promoTag: '$1,200 Fee Waiver',
    enrolments: 194,
    intakeStatus: 'Open • 14 Jul 2026',
  },
  {
    name: 'Advanced Diploma of Information Technology',
    cricos: '108721M',
    standardRate: '$10,400/yr',
    promoRate: '$9,200/yr',
    promoTag: 'Free Material Fee',
    enrolments: 156,
    intakeStatus: 'Filling Fast • 07 Sep 2026',
  },
];

export default function SchoolAdminDashboardPage() {
  const { toast } = useToast();
  const [applications, setApplications] = useState<ApplicationItem[]>(INITIAL_APPLICATIONS);
  const [selectedCampus, setSelectedCampus] = useState<string>('All');
  const [selectedIntake, setSelectedIntake] = useState<string>('All');
  const [inspectedApp, setInspectedApp] = useState<ApplicationItem | null>(null);
  const [campusList, setCampusList] = useState(INITIAL_CAMPUS_CAPACITY);
  const [capModalOpen, setCapModalOpen] = useState(false);

  const handleIssueCoE = (id: string, student: string) => {
    const generatedCoE = `COE-26-${Math.floor(100000 + Math.random() * 899999)}`;
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? { ...app, status: 'CoE Issued', gteVerified: true, coeNumber: generatedCoE }
          : app
      )
    );
    if (inspectedApp?.id === id) {
      setInspectedApp({
        ...inspectedApp,
        status: 'CoE Issued',
        gteVerified: true,
        coeNumber: generatedCoE,
      });
    }
    toast(`PRISMS CoE (${generatedCoE}) issued and dispatched for ${student}`, 'success');
  };

  const filteredApplications = applications.filter((a) => {
    const matchCampus = selectedCampus === 'All' || a.campus === selectedCampus;
    const matchIntake = selectedIntake === 'All' || a.intake === selectedIntake;
    return matchCampus && matchIntake;
  });

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Executive Provider Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 sm:p-8 text-white shadow-sm border border-slate-800">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                CRICOS Provider #03812M • ASQA Compliant (98.4%)
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Australian Pacific College — Provider Command Center
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                Manage multi-campus CRICOS capacity, approve PRISMS Confirmation of Enrolments (CoEs),
                and broadcast real-time scholarship campaigns to 42+ partner agencies worldwide.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button
                variant="secondary"
                onClick={() =>
                  toast('Exported PRISMS Enrolment & CoE Batch Report (.csv)', 'success')
                }
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                <Download className="w-4 h-4" />
                Export PRISMS CSV
              </Button>
              <Link to="/school-admin/documents">
                <Button
                  variant="secondary"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  <FileCheck className="w-4 h-4" />
                  ASQA Compliance Vault
                </Button>
              </Link>
              <Link to="/provider-promo">
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white border-0 shadow-sm">
                  <Sparkles className="w-4 h-4" />
                  Create Scholarship Promo
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Executive KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Active CRICOS Courses
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <BookOpen className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-slate-900">12</span>
              <Badge variant="info">3 Campuses</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              ELICOS, Business, Marketing &amp; IT streams
            </p>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Live Agency Promos
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-slate-900">4</span>
              <Badge variant="warning">Up to 20% Off</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Syndicated to 42 verified partner agencies
            </p>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Total Enrolled Students
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Users className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-slate-900">1,285</span>
              <Badge variant="success">+18.4% YoY</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              80.3% of total 1,600 CRICOS allocation
            </p>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Q3 Tuition Cleared
              </span>
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <DollarSign className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-slate-900">$1.42M</span>
              <Badge variant="purple">14 CoEs Pending</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              AUD settled via Flywire &amp; Stripe Escrow
            </p>
          </Card>
        </div>

        {/* Main Two-Column Grid: Admissions & CoE Queue + Campus Capacity */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left 2 Columns: PRISMS CoE & Offer Approval Queue */}
          <Card className="xl:col-span-2 p-0 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900">
                    Admissions &amp; PRISMS CoE Approval Queue
                  </h2>
                  <Badge variant="info">{filteredApplications.length} Active</Badge>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Inspect Genuine Student (GS) risk scores and issue PRISMS Confirmation of Enrolments.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={selectedIntake}
                  onChange={(e) => setSelectedIntake(e.target.value)}
                  className="h-8 rounded-xl border border-slate-200 bg-slate-50 px-2.5 text-xs font-semibold text-slate-700"
                >
                  <option value="All">All Intakes</option>
                  <option value="14 Jul 2026">14 Jul 2026</option>
                  <option value="03 Aug 2026">03 Aug 2026</option>
                  <option value="07 Sep 2026">07 Sep 2026</option>
                </select>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  {['All', 'Sydney CBD', 'Melbourne', 'Brisbane'].map((campus) => (
                    <button
                      key={campus}
                      onClick={() => setSelectedCampus(campus)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        selectedCampus === campus
                          ? 'bg-white text-slate-900 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {campus}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredApplications.map((app) => (
                <div
                  key={app.id}
                  className="p-5 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                        {app.id}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">{app.student}</h3>
                      <span className="text-xs text-slate-500">({app.nationality})</span>
                      {app.gteVerified ? (
                        <Badge variant="success">GS Score: {app.gteScore}/100</Badge>
                      ) : (
                        <Badge variant="warning">GS Review ({app.gteScore}/100)</Badge>
                      )}
                      {app.coeNumber && (
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {app.coeNumber}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-medium text-slate-700">
                      {app.course}{' '}
                      <span className="text-slate-400 font-mono">• CRICOS {app.cricos}</span>
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-0.5">
                      <span className="inline-flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        {app.agency}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {app.campus}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        Intake: {app.intake}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="text-right mr-2">
                      <p className="text-sm font-bold text-slate-900">{app.tuition}</p>
                      <p className="text-[11px] text-slate-500">{app.status}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setInspectedApp(app)}
                      title="Inspect Application & GTE Dossier"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Inspect
                    </Button>
                    {app.status === 'CoE Issued' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        CoE Dispatched
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleIssueCoE(app.id, app.student)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Issue CoE
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Synced directly with Australian Department of Education PRISMS API
              </span>
              <Link
                to="/students"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
              >
                View All Enrolments
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>

          {/* Right Column: Campus CRICOS Capacity & Allocation */}
          <Card className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-lg font-bold text-slate-900">CRICOS Campus Capacity</h2>
                <button
                  type="button"
                  onClick={() => setCapModalOpen(true)}
                  className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  Adjust Caps
                </button>
              </div>
              <p className="text-xs text-slate-500 mb-6">
                Real-time student seat utilization against ASQA approved campus caps.
              </p>

              <div className="space-y-5">
                {campusList.map((item) => {
                  const pct = Math.round((item.enrolled / item.cap) * 100);
                  return (
                    <div
                      key={item.campus}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">{item.campus}</h3>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {item.address}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                          {pct}% Full
                        </span>
                      </div>

                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            pct > 85 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                        <span>
                          <strong className="text-slate-800">{item.enrolled}</strong> / {item.cap}{' '}
                          seats occupied
                        </span>
                        <span>{item.activeCourses} CRICOS streams</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-900">Next ASQA Capacity Audit</p>
                <p className="text-[11px] text-slate-500">Scheduled for 15 October 2026</p>
              </div>
              <Link to="/school-admin/documents">
                <Button variant="secondary" size="sm">
                  Audit Pack
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Published Courses & Live Agency Scholarship Matrix */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Published CRICOS Catalog &amp; Active Agency Scholarships
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Pricing and promotional rules below are automatically applied when agents build student quotes.
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <Link to="/courses">
                <Button variant="secondary" size="sm">
                  <BookOpen className="w-3.5 h-3.5" />
                  Manage Catalog
                </Button>
              </Link>
              <Link to="/provider-promo">
                <Button size="sm">
                  <Plus className="w-3.5 h-3.5" />
                  New Scholarship Rule
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PUBLISHED_COURSES.map((course) => (
              <div
                key={course.cricos}
                className="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-blue-300 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      CRICOS {course.cricos}
                    </span>
                    <Badge variant="success">{course.promoTag}</Badge>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug mb-3">
                    {course.name}
                  </h3>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-500">Promo Tuition</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs text-slate-400 line-through">
                        {course.standardRate}
                      </span>
                      <span className="text-base font-bold text-emerald-700">
                        {course.promoRate}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{course.intakeStatus}</span>
                    <span className="font-semibold text-slate-700">
                      {course.enrolments} enrolled
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Slide-Over Student Application & PRISMS CoE Inspector Drawer */}
        {inspectedApp && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end">
            <div className="w-full max-w-lg bg-white h-full shadow-2xl border-l border-slate-200 p-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-600">
                      {inspectedApp.id} • Passport {inspectedApp.passport}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                      {inspectedApp.student} ({inspectedApp.nationality})
                    </h3>
                    <p className="text-xs text-slate-500">
                      Submitted by {inspectedApp.agency}
                    </p>
                  </div>
                  <button
                    onClick={() => setInspectedApp(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">CRICOS Course</span>
                    <span className="font-bold text-slate-900">
                      {inspectedApp.course} ({inspectedApp.cricos})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Campus &amp; Intake</span>
                    <span className="font-semibold text-slate-800">
                      {inspectedApp.campus} • {inspectedApp.intake}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Initial Tuition Deposit</span>
                    <span className="font-bold text-emerald-700">
                      {inspectedApp.tuition} AUD (Escrow Verified)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Genuine Student (GS) Score</span>
                    <span className="font-bold text-blue-600">{inspectedApp.gteScore} / 100</span>
                  </div>
                </div>

                {inspectedApp.coeNumber && (
                  <div className="p-4 rounded-2xl bg-emerald-950 text-white space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                      PRISMS Confirmation of Enrolment Certificate
                    </span>
                    <p className="text-base font-mono font-bold">{inspectedApp.coeNumber}</p>
                    <p className="text-xs text-emerald-200">
                      Registered with Australian Department of Education &amp; Home Affairs Subclass 500 system.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <Button variant="secondary" onClick={() => setInspectedApp(null)}>
                  Close
                </Button>
                {inspectedApp.status !== 'CoE Issued' ? (
                  <Button onClick={() => handleIssueCoE(inspectedApp.id, inspectedApp.student)}>
                    <Send className="w-4 h-4" />
                    Approve &amp; Issue PRISMS CoE
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={() =>
                      toast(`Downloaded CoE PDF (${inspectedApp.coeNumber})`, 'info')
                    }
                  >
                    <Download className="w-4 h-4" />
                    Download CoE PDF
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal: Adjust Campus Caps */}
        {capModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">
                  Adjust ASQA Approved Campus Caps
                </h3>
                <button
                  onClick={() => setCapModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                {campusList.map((c, idx) => (
                  <div
                    key={c.campus}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-900">{c.campus}</p>
                      <p className="text-[11px] text-slate-500">Enrolled: {c.enrolled}</p>
                    </div>
                    <input
                      type="number"
                      value={c.cap}
                      onChange={(e) => {
                        const val = Number(e.target.value) || c.enrolled;
                        setCampusList((prev) =>
                          prev.map((item, i) => (i === idx ? { ...item, cap: val } : item))
                        );
                      }}
                      className="w-24 h-9 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-bold text-slate-900"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  onClick={() => {
                    setCapModalOpen(false);
                    toast('Campus CRICOS seat allocations updated', 'success');
                  }}
                >
                  Save Allocations
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
