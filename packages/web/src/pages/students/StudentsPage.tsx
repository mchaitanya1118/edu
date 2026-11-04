import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  Plus,
  Search,
  X,
  Eye,
  Download,
  LayoutGrid,
  List,
  CheckCircle2,
  DollarSign,
  Sparkles,
  CreditCard,
  ShieldCheck,
  Clock,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

export type StudentRecord = {
  id: string;
  name: string;
  email: string;
  nationality: string;
  passport: string;
  course: string;
  provider: string;
  campus: string;
  stage: 'Quote Sent' | 'Offer Signed' | 'CoE Issued' | 'Visa Granted';
  oshcIncluded: boolean;
  gsScore: number;
  tuitionFee: number;
  commissionRate: number; // e.g. 22
  commissionTier: string;
  commissionAmount: number; // AUD
  commissionStatus: 'Disbursed' | 'Available for Payout' | 'Pending Reconciliation' | 'Pending Commencement';
  agreementRef: string;
  intakeTerm: string;
  rctiNumber: string;
  milestones: { label: string; amount: number; cleared: boolean; date: string }[];
};

const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: 'STU-401',
    name: 'Mateo Silva',
    email: 'mateo.silva@gmail.com',
    nationality: 'Colombia',
    passport: 'CO9928114',
    course: 'Diploma of Leadership & Management',
    provider: 'Australian Pacific College',
    campus: 'Sydney CBD',
    stage: 'CoE Issued',
    oshcIncluded: true,
    gsScore: 94,
    tuitionFee: 14800,
    commissionRate: 22,
    commissionTier: 'Preferred Tier-1',
    commissionAmount: 3256,
    commissionStatus: 'Available for Payout',
    agreementRef: 'APC-2026-T1-AGY',
    intakeTerm: 'Term 3 • Jul 2026',
    rctiNumber: 'RCTI-2026-081',
    milestones: [
      { label: 'Initial Deposit & CoE Clearance (50%)', amount: 1628, cleared: true, date: '02 Nov 2026' },
      { label: 'Term 2 Census Date Clearance (50%)', amount: 1628, cleared: true, date: '04 Nov 2026' },
    ],
  },
  {
    id: 'STU-402',
    name: 'Yuki Tanaka',
    email: 'yuki.tanaka@yahoo.co.jp',
    nationality: 'Japan',
    passport: 'TK8841209',
    course: 'General English (20 Weeks)',
    provider: 'Greenwich College',
    campus: 'Melbourne',
    stage: 'Offer Signed',
    oshcIncluded: true,
    gsScore: 98,
    tuitionFee: 5600,
    commissionRate: 20,
    commissionTier: 'Standard Agency',
    commissionAmount: 1120,
    commissionStatus: 'Pending Reconciliation',
    agreementRef: 'GRW-2026-T1-AGY',
    intakeTerm: 'Term 4 • Oct 2026',
    rctiNumber: 'RCTI-PENDING-092',
    milestones: [
      { label: 'Initial Deposit (50%)', amount: 560, cleared: true, date: '25 Oct 2026' },
      { label: 'Course Commencement / Census (50%)', amount: 560, cleared: false, date: 'Scheduled Nov 2026' },
    ],
  },
  {
    id: 'STU-403',
    name: 'Camila Rojas',
    email: 'camila.rojas@hotmail.com',
    nationality: 'Brazil',
    passport: 'BR4410922',
    course: 'Cert IV in Marketing & Communication',
    provider: 'Australian Pacific College',
    campus: 'Brisbane',
    stage: 'Quote Sent',
    oshcIncluded: false,
    gsScore: 87,
    tuitionFee: 6750,
    commissionRate: 22,
    commissionTier: 'Preferred Tier-1',
    commissionAmount: 1485,
    commissionStatus: 'Pending Commencement',
    agreementRef: 'APC-2026-T1-AGY',
    intakeTerm: 'Term 1 • Jan 2027',
    rctiNumber: 'RCTI-PENDING-101',
    milestones: [
      { label: 'Offer Acceptance & CoE (50%)', amount: 742.5, cleared: false, date: 'Pending Intake' },
      { label: 'Census Date Clearance (50%)', amount: 742.5, cleared: false, date: 'Pending Intake' },
    ],
  },
  {
    id: 'STU-404',
    name: 'Arjun Nair',
    email: 'arjun.nair@outlook.com',
    nationality: 'India',
    passport: 'IN7751203',
    course: 'Advanced Diploma of IT',
    provider: 'ILSC Business College',
    campus: 'Sydney CBD',
    stage: 'Visa Granted',
    oshcIncluded: true,
    gsScore: 95,
    tuitionFee: 16500,
    commissionRate: 25,
    commissionTier: 'High-Volume Platinum',
    commissionAmount: 4125,
    commissionStatus: 'Disbursed',
    agreementRef: 'ILSC-2026-HIGH-AGY',
    intakeTerm: 'Term 2 • Apr 2026',
    rctiNumber: 'RCTI-2026-064',
    milestones: [
      { label: 'Initial Tuition Clearance (50%)', amount: 2062.5, cleared: true, date: '15 Apr 2026' },
      { label: 'Term 2 Census Date (50%)', amount: 2062.5, cleared: true, date: '28 Oct 2026' },
    ],
  },
  {
    id: 'STU-405',
    name: 'Lucas Fernandez',
    email: 'lucas.fernandez@gmail.com',
    nationality: 'Argentina',
    passport: 'AR5518291',
    course: 'General English (24 Weeks)',
    provider: 'Greenwich College',
    campus: 'Sydney',
    stage: 'Quote Sent',
    oshcIncluded: true,
    gsScore: 91,
    tuitionFee: 6720,
    commissionRate: 20,
    commissionTier: 'Standard Agency',
    commissionAmount: 1344,
    commissionStatus: 'Pending Commencement',
    agreementRef: 'GRW-2026-T1-AGY',
    intakeTerm: 'Term 3 • Jul 2026',
    rctiNumber: 'RCTI-PENDING-093',
    milestones: [
      { label: 'Deposit Clearance (50%)', amount: 672, cleared: false, date: 'Pending CoE' },
      { label: 'Commencement Clearance (50%)', amount: 672, cleared: false, date: 'Pending CoE' },
    ],
  },
  {
    id: 'STU-406',
    name: 'Haruto Sato',
    email: 'haruto.sato@yahoo.co.jp',
    nationality: 'Japan',
    passport: 'JP3391024',
    course: 'Diploma of Business',
    provider: 'ILSC Greystone College',
    campus: 'Sydney CBD',
    stage: 'CoE Issued',
    oshcIncluded: true,
    gsScore: 96,
    tuitionFee: 7400,
    commissionRate: 22,
    commissionTier: 'Preferred Tier-1',
    commissionAmount: 1628,
    commissionStatus: 'Available for Payout',
    agreementRef: 'ILSC-2026-HIGH-AGY',
    intakeTerm: 'Term 3 • Jul 2026',
    rctiNumber: 'RCTI-2026-085',
    milestones: [
      { label: 'CoE Clearance (50%)', amount: 814, cleared: true, date: '12 Sep 2026' },
      { label: 'Census Clearance (50%)', amount: 814, cleared: true, date: '03 Nov 2026' },
    ],
  },
];

export default function StudentsPage() {
  const { toast } = useToast();
  const [students, setStudents] = useState<StudentRecord[]>(INITIAL_STUDENTS);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [inspectedStudent, setInspectedStudent] = useState<StudentRecord | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newNationality, setNewNationality] = useState('Brazil');
  const [newCourse, setNewCourse] = useState('Diploma of Leadership & Management');
  const [newTuition, setNewTuition] = useState<number>(14000);
  const [newRate, setNewRate] = useState<number>(22);

  // KPI aggregates
  const totalCommission = students.reduce((acc, s) => acc + s.commissionAmount, 0);
  const availablePayout = students
    .filter((s) => s.commissionStatus === 'Available for Payout')
    .reduce((acc, s) => acc + s.commissionAmount, 0);
  const disbursedTotal = students
    .filter((s) => s.commissionStatus === 'Disbursed')
    .reduce((acc, s) => acc + s.commissionAmount, 0);

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const calcCommission = Math.round((newTuition * newRate) / 100);
    const created: StudentRecord = {
      id: `STU-${Math.floor(410 + Math.random() * 90)}`,
      name: newName,
      email: newEmail || 'student@educonnect.au',
      nationality: newNationality,
      passport: 'PA8831900',
      course: newCourse,
      provider: 'Australian Pacific College',
      campus: 'Sydney CBD',
      stage: 'Quote Sent',
      oshcIncluded: true,
      gsScore: 92,
      tuitionFee: newTuition,
      commissionRate: newRate,
      commissionTier: `${newRate}% Agency Tier`,
      commissionAmount: calcCommission,
      commissionStatus: 'Pending Commencement',
      agreementRef: 'APC-2026-T1-AGY',
      intakeTerm: 'Term 1 • 2027',
      rctiNumber: `RCTI-PENDING-${Math.floor(100 + Math.random() * 900)}`,
      milestones: [
        { label: 'Initial Deposit (50%)', amount: calcCommission / 2, cleared: false, date: 'Pending CoE' },
        { label: 'Census Clearance (50%)', amount: calcCommission / 2, cleared: false, date: 'Pending CoE' },
      ],
    };
    setStudents([created, ...students]);
    setNewName('');
    setNewEmail('');
    setShowAddModal(false);
    toast(`${created.name} registered! Agent commission: A$${calcCommission.toLocaleString()} (${newRate}%)`, 'success');
  };

  const advanceStage = (id: string) => {
    const order: StudentRecord['stage'][] = [
      'Quote Sent',
      'Offer Signed',
      'CoE Issued',
      'Visa Granted',
    ];
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const nextIdx = Math.min(order.indexOf(s.stage) + 1, order.length - 1);
        const nextStage = order[nextIdx];
        const nextStatus =
          nextStage === 'Visa Granted'
            ? 'Disbursed'
            : nextStage === 'CoE Issued'
            ? 'Available for Payout'
            : s.commissionStatus;
        return { ...s, stage: nextStage, commissionStatus: nextStatus };
      })
    );
    toast('Student milestone advanced & commission ledger updated', 'success');
  };

  const handleClaimStudentCommission = (id: string, name: string, amount: number) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, commissionStatus: 'Disbursed' } : s))
    );
    if (inspectedStudent?.id === id) {
      setInspectedStudent((prev) => (prev ? { ...prev, commissionStatus: 'Disbursed' } : null));
    }
    toast(`Commission of A$${amount.toLocaleString()} claimed for ${name}. RCTI generated.`, 'success');
  };

  const filtered = students.filter((s) => {
    const matchesStage = stageFilter === 'All' || s.stage === stageFilter;
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.course.toLowerCase().includes(search.toLowerCase()) ||
      s.nationality.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase());
    return matchesStage && matchesSearch;
  });

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="info">Subclasses 500 &amp; 485 Ready</Badge>
              <span className="text-xs text-slate-400">PRISMS &amp; Commission Tracking</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              International Students &amp; Agent Commission CRM
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Manage student admissions from initial quote to Subclass 500 Visa grant, with live commission calculation per student.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <Link to="/agent/commissions">
              <Button variant="secondary" className="gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                Commission Ledger
              </Button>
            </Link>
            <Button
              variant="secondary"
              onClick={() => toast('Exported Students & Commission Ledger (.csv)', 'success')}
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4" />
              Register New Student
            </Button>
          </div>
        </div>

        {/* 4 Financial & Commission KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card className="p-5 border-l-4 border-l-blue-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Student Enrolments
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-bold text-slate-900">{students.length}</span>
              <Badge variant="info">Subclass 500</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">Active international candidates</p>
          </Card>

          <Card className="p-5 border-l-4 border-l-emerald-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Commission from Students
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-bold text-emerald-700">
                A${totalCommission.toLocaleString()}
              </span>
              <Badge variant="success">20%–25% Tier</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">Earned across all active student enrollments</p>
          </Card>

          <Card className="p-5 border-l-4 border-l-purple-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Available for Payout
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-bold text-purple-700">
                A${availablePayout.toLocaleString()}
              </span>
              <Badge variant="purple">Census Passed</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">Ready for instant withdrawal or RCTI</p>
          </Card>

          <Card className="p-5 border-l-4 border-l-amber-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Disbursed to Date
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-bold text-amber-700">
                A${disbursedTotal.toLocaleString()}
              </span>
              <Badge variant="warning">Settled</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">Paid directly to agency account</p>
          </Card>
        </div>

        {/* Filter Bar + View Mode Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-xl w-fit flex-wrap">
            {['All', 'Quote Sent', 'Offer Signed', 'CoE Issued', 'Visa Granted'].map((st) => (
              <button
                key={st}
                onClick={() => setStageFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  stageFilter === st
                    ? 'bg-white text-blue-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search student, nationality, course..."
                className="w-full h-9 bg-white border border-slate-200 rounded-xl pl-9 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg cursor-pointer ${
                  viewMode === 'list' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Student Directory (List or Grid) */}
        {viewMode === 'list' ? (
          <Card className="p-0 overflow-hidden shadow-xs">
            <div className="divide-y divide-slate-100">
              {filtered.map((student) => (
                <div
                  key={student.id}
                  className="p-5 hover:bg-slate-50/80 transition-colors flex flex-col xl:flex-row xl:items-center justify-between gap-4 cursor-pointer"
                  onClick={() => setInspectedStudent(student)}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {student.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-slate-500">
                          {student.id}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">{student.name}</h3>
                        <Badge variant="default">{student.nationality}</Badge>
                        <Badge
                          variant={
                            student.stage === 'Visa Granted' || student.stage === 'CoE Issued'
                              ? 'success'
                              : student.stage === 'Offer Signed'
                              ? 'purple'
                              : 'info'
                          }
                        >
                          {student.stage}
                        </Badge>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          GS: {student.gsScore}%
                        </span>
                      </div>
                      <p className="text-xs font-medium text-slate-700">
                        {student.course} •{' '}
                        <span className="text-slate-500">
                          {student.provider} ({student.campus})
                        </span>
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {student.email} • Passport {student.passport} • {student.intakeTerm}
                      </p>
                    </div>
                  </div>

                  {/* Agent Commission Info Block for Each Student */}
                  <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap justify-between xl:justify-end shrink-0 pt-2 xl:pt-0 border-t xl:border-t-0 border-slate-100">
                    <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-left min-w-[200px]">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-emerald-900 flex items-center gap-1">
                          <DollarSign className="w-3 h-3 text-emerald-600" />
                          Agent Commission
                        </span>
                        <span className="font-bold text-emerald-700 font-mono">
                          {student.commissionRate}% Tier
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between mt-1">
                        <span className="font-mono font-bold text-sm text-emerald-700">
                          +A${student.commissionAmount.toLocaleString()} AUD
                        </span>
                        <span className="text-[10px] text-slate-500">
                          Fee: A${student.tuitionFee.toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center justify-between text-[10px]">
                        <span className={`font-semibold ${
                          student.commissionStatus === 'Disbursed'
                            ? 'text-purple-700'
                            : student.commissionStatus === 'Available for Payout'
                            ? 'text-emerald-700'
                            : 'text-amber-700'
                        }`}>
                          ● {student.commissionStatus}
                        </span>
                        <span className="font-mono text-slate-400">{student.rctiNumber}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setInspectedStudent(student)}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Commission &amp; 360°
                      </Button>
                      {student.stage !== 'Visa Granted' && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => advanceStage(student.id)}
                        >
                          Advance
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ) : (
          /* Grid View with Agent Commission Display */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((student) => (
              <Card
                key={student.id}
                className="p-5 flex flex-col justify-between space-y-4 hover:border-blue-300 transition-all cursor-pointer shadow-xs"
                onClick={() => setInspectedStudent(student)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                      {student.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{student.name}</h3>
                      <p className="text-xs text-slate-500">
                        {student.nationality} • {student.id}
                      </p>
                    </div>
                  </div>
                  <Badge variant={student.stage === 'Visa Granted' ? 'success' : 'purple'}>
                    {student.stage}
                  </Badge>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                  <p className="font-bold text-slate-900">{student.course}</p>
                  <p className="text-slate-500">
                    {student.provider} — {student.campus}
                  </p>
                </div>

                {/* Agent Commission Box on Card */}
                <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-emerald-900">Agent Commission ({student.commissionRate}%)</span>
                    <span className="font-mono font-bold text-sm text-emerald-700">
                      A${student.commissionAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-emerald-200/60">
                    <span>Course: A${student.tuitionFee.toLocaleString()}</span>
                    <span className="font-semibold text-emerald-700">{student.commissionStatus}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
                  <span className="text-xs font-semibold text-emerald-700">
                    GS Score: {student.gsScore}%
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setInspectedStudent(student)}
                    >
                      Inspect
                    </Button>
                    {student.stage !== 'Visa Granted' && (
                      <Button size="sm" onClick={() => advanceStage(student.id)}>
                        Advance
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Student 360 Profile Drawer with Full Commission Breakdown */}
        {inspectedStudent && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
            <div className="w-full max-w-lg bg-white h-full shadow-2xl border-l border-slate-200 p-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-600">
                      {inspectedStudent.id} • Passport {inspectedStudent.passport}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                      {inspectedStudent.name} ({inspectedStudent.nationality})
                    </h3>
                    <p className="text-xs text-slate-500">{inspectedStudent.email} • {inspectedStudent.intakeTerm}</p>
                  </div>
                  <button
                    onClick={() => setInspectedStudent(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Highlighted Agent Commission Breakdown Card */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 border border-emerald-300 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      Agent Commission from this Student
                    </span>
                    <Badge variant="success">{inspectedStudent.commissionRate}% Tier</Badge>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Course Net Tuition:</span>
                      <span className="font-mono font-semibold text-slate-900">
                        A${inspectedStudent.tuitionFee.toLocaleString()} AUD
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Agreed Rate ({inspectedStudent.commissionTier}):</span>
                      <span className="font-mono font-semibold text-emerald-700">
                        {inspectedStudent.commissionRate}%
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Agreement Code:</span>
                      <span className="font-mono text-slate-700">{inspectedStudent.agreementRef}</span>
                    </div>
                    <div className="border-t border-emerald-200 pt-2 flex justify-between items-baseline">
                      <span className="font-bold text-slate-900">Total Commission Earned:</span>
                      <span className="font-mono font-bold text-lg text-emerald-700">
                        A${inspectedStudent.commissionAmount.toLocaleString()} AUD
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-emerald-200/80 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">
                      Status: <strong className="text-emerald-700">{inspectedStudent.commissionStatus}</strong>
                    </span>
                    {inspectedStudent.commissionStatus === 'Available for Payout' && (
                      <Button
                        size="sm"
                        onClick={() =>
                          handleClaimStudentCommission(
                            inspectedStudent.id,
                            inspectedStudent.name,
                            inspectedStudent.commissionAmount
                          )
                        }
                        className="bg-emerald-600 hover:bg-emerald-700 text-white h-8 text-xs"
                      >
                        Claim Payout Now
                      </Button>
                    )}
                  </div>
                </div>

                {/* Milestone Disbursement Schedule */}
                <div className="space-y-2 text-xs">
                  <span className="font-bold uppercase tracking-wider text-slate-500 block">
                    Commission Payment Milestones
                  </span>
                  {inspectedStudent.milestones.map((m, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex items-center justify-between ${
                        m.cleared
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {m.cleared ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Clock className="w-4 h-4 text-slate-400" />
                        )}
                        <div>
                          <p className="font-bold">{m.label}</p>
                          <p className="text-[10px] text-slate-400">{m.date}</p>
                        </div>
                      </div>
                      <span className="font-mono font-bold">A${m.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Subclass 500 Visa & Admissions Checklist */}
                <div className="space-y-2.5 text-xs">
                  <span className="font-bold uppercase tracking-wider text-slate-400 block">
                    Subclass 500 Visa &amp; Admissions Checklist
                  </span>
                  {[
                    'Valid Passport Bio Page & National ID Verified',
                    'Genuine Student (GS) Financial Capacity Cleared',
                    'English Proficiency (IELTS 6.0 / Internal Placement) Met',
                    inspectedStudent.oshcIncluded
                      ? 'Overseas Student Health Cover (OSHC) Policy Issued'
                      : 'OSHC Policy Pending External Upload',
                  ].map((item) => (
                    <div
                      key={item}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-medium text-slate-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 mt-6">
                <Button variant="secondary" onClick={() => setInspectedStudent(null)}>
                  Close
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => toast(`Downloaded tax invoice ${inspectedStudent.rctiNumber} (.pdf)`, 'success')}
                  >
                    Download RCTI
                  </Button>
                  {inspectedStudent.stage !== 'Visa Granted' && (
                    <Button
                      onClick={() => {
                        advanceStage(inspectedStudent.id);
                        setInspectedStudent(null);
                      }}
                    >
                      Advance Enrolment
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Register New Student with Commission Inputs */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-6 space-y-5 bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900">Register International Student</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleCreateStudent} className="space-y-4">
                <Input
                  label="Student Full Name"
                  placeholder="e.g. Sofia Martinez"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="sofia@email.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                />
                <Input
                  label="Nationality"
                  value={newNationality}
                  onChange={(e) => setNewNationality(e.target.value)}
                />
                <Input
                  label="Target CRICOS Course"
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Course Tuition (AUD)
                    </label>
                    <input
                      type="number"
                      value={newTuition}
                      onChange={(e) => setNewTuition(Number(e.target.value))}
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Agency Tier (%)
                    </label>
                    <select
                      value={newRate}
                      onChange={(e) => setNewRate(Number(e.target.value))}
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600"
                    >
                      <option value={20}>20% (Standard)</option>
                      <option value={22}>22% (Preferred Tier 1)</option>
                      <option value={25}>25% (Platinum Volume)</option>
                    </select>
                  </div>
                </div>

                {/* Instant dynamic commission calculation preview */}
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                  <span className="text-emerald-900 font-semibold">Calculated Agent Commission:</span>
                  <span className="font-mono font-bold text-sm text-emerald-700">
                    A${Math.round((newTuition * newRate) / 100).toLocaleString()} AUD
                  </span>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <Button type="button" variant="secondary" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Profile &amp; Ledger</Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
