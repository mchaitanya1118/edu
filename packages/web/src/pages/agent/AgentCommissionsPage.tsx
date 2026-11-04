import React, { useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  DollarSign,
  Search,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Calculator,
  Building2,
  FileText,
  User,
  GraduationCap,
  Calendar,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  X,
  CreditCard,
  TrendingUp,
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

export type StudentCommissionEntry = {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  nationality: string;
  provider: string;
  cricosCode: string;
  course: string;
  intakeTerm: string;
  tuitionFee: number;
  commissionRate: number; // percentage, e.g. 22
  commissionTier: string;
  commissionAmount: number; // calculated AUD
  status: 'Disbursed' | 'Available for Payout' | 'Pending Reconciliation' | 'Pending Commencement';
  agreementRef: string;
  rctiNumber: string;
  paidDate?: string;
  milestones: {
    label: string;
    amount: number;
    percent: number;
    cleared: boolean;
    date: string;
  }[];
};

export const INITIAL_STUDENT_COMMISSIONS: StudentCommissionEntry[] = [
  {
    id: 'COM-STU-001',
    studentId: 'STU-401',
    studentName: 'Mateo Silva',
    studentEmail: 'mateo.silva@gmail.com',
    nationality: 'Colombia',
    provider: 'Australian Pacific College',
    cricosCode: '03812M',
    course: 'Diploma of Leadership & Management',
    intakeTerm: 'Term 3 • Jul 2026',
    tuitionFee: 14800,
    commissionRate: 22,
    commissionTier: 'Preferred Tier-1',
    commissionAmount: 3256,
    status: 'Available for Payout',
    agreementRef: 'APC-2026-T1-AGY',
    rctiNumber: 'RCTI-2026-081',
    milestones: [
      {
        label: 'Initial Tuition Clearance (50%)',
        amount: 1628,
        percent: 50,
        cleared: true,
        date: '02 Nov 2026',
      },
      {
        label: 'Term 2 Census Date (50%)',
        amount: 1628,
        percent: 50,
        cleared: true,
        date: '04 Nov 2026',
      },
    ],
  },
  {
    id: 'COM-STU-002',
    studentId: 'STU-404',
    studentName: 'Arjun Nair',
    studentEmail: 'arjun.nair@outlook.com',
    nationality: 'India',
    provider: 'ILSC Business College',
    cricosCode: '02137M',
    course: 'Advanced Diploma of IT',
    intakeTerm: 'Term 2 • Apr 2026',
    tuitionFee: 16500,
    commissionRate: 25,
    commissionTier: 'High-Volume Platinum',
    commissionAmount: 4125,
    status: 'Disbursed',
    agreementRef: 'ILSC-2026-HIGH-AGY',
    rctiNumber: 'RCTI-2026-064',
    paidDate: '28 Oct 2026',
    milestones: [
      {
        label: 'Initial Tuition Clearance (50%)',
        amount: 2062.5,
        percent: 50,
        cleared: true,
        date: '15 Apr 2026',
      },
      {
        label: 'Term 2 Census Date (50%)',
        amount: 2062.5,
        percent: 50,
        cleared: true,
        date: '28 Oct 2026',
      },
    ],
  },
  {
    id: 'COM-STU-003',
    studentId: 'STU-402',
    studentName: 'Yuki Tanaka',
    studentEmail: 'yuki.tanaka@yahoo.co.jp',
    nationality: 'Japan',
    provider: 'Greenwich College',
    cricosCode: '02672K',
    course: 'General English (20 Weeks ELICOS)',
    intakeTerm: 'Term 4 • Oct 2026',
    tuitionFee: 5600,
    commissionRate: 20,
    commissionTier: 'Standard Agency',
    commissionAmount: 1120,
    status: 'Pending Reconciliation',
    agreementRef: 'GRW-2026-T1-AGY',
    rctiNumber: 'RCTI-PENDING-092',
    milestones: [
      {
        label: 'Deposit & Letter of Offer (50%)',
        amount: 560,
        percent: 50,
        cleared: true,
        date: '25 Oct 2026',
      },
      {
        label: 'Course Commencement / Census (50%)',
        amount: 560,
        percent: 50,
        cleared: false,
        date: 'Scheduled Nov 2026',
      },
    ],
  },
  {
    id: 'COM-STU-004',
    studentId: 'STU-403',
    studentName: 'Camila Rojas',
    studentEmail: 'camila.rojas@hotmail.com',
    nationality: 'Brazil',
    provider: 'Australian Pacific College',
    cricosCode: '03812M',
    course: 'Cert IV in Marketing & Communication',
    intakeTerm: 'Term 1 • Jan 2027',
    tuitionFee: 6750,
    commissionRate: 22,
    commissionTier: 'Preferred Tier-1',
    commissionAmount: 1485,
    status: 'Pending Commencement',
    agreementRef: 'APC-2026-T1-AGY',
    rctiNumber: 'RCTI-PENDING-101',
    milestones: [
      {
        label: 'Offer Acceptance & CoE (50%)',
        amount: 742.5,
        percent: 50,
        cleared: false,
        date: 'Pending Intake',
      },
      {
        label: 'Census Date Clearance (50%)',
        amount: 742.5,
        percent: 50,
        cleared: false,
        date: 'Pending Intake',
      },
    ],
  },
  {
    id: 'COM-STU-005',
    studentId: 'STU-405',
    studentName: 'Lucas Fernandez',
    studentEmail: 'lucas.fernandez@gmail.com',
    nationality: 'Argentina',
    provider: 'Greenwich College',
    cricosCode: '02672K',
    course: 'General English (24 Weeks)',
    intakeTerm: 'Term 3 • Jul 2026',
    tuitionFee: 6720,
    commissionRate: 20,
    commissionTier: 'Standard Agency',
    commissionAmount: 1344,
    status: 'Pending Reconciliation',
    agreementRef: 'GRW-2026-T1-AGY',
    rctiNumber: 'RCTI-PENDING-093',
    milestones: [
      {
        label: 'Deposit & Letter of Offer (50%)',
        amount: 672,
        percent: 50,
        cleared: true,
        date: '29 Oct 2026',
      },
      {
        label: 'Commencement Clearance (50%)',
        amount: 672,
        percent: 50,
        cleared: false,
        date: 'Scheduled Nov 2026',
      },
    ],
  },
  {
    id: 'COM-STU-006',
    studentId: 'STU-406',
    studentName: 'Haruto Sato',
    studentEmail: 'haruto.sato@yahoo.co.jp',
    nationality: 'Japan',
    provider: 'ILSC Greystone College',
    cricosCode: '02137M',
    course: 'Diploma of Business',
    intakeTerm: 'Term 3 • Jul 2026',
    tuitionFee: 7400,
    commissionRate: 22,
    commissionTier: 'Preferred Tier-1',
    commissionAmount: 1628,
    status: 'Available for Payout',
    agreementRef: 'ILSC-2026-HIGH-AGY',
    rctiNumber: 'RCTI-2026-085',
    milestones: [
      {
        label: 'Initial CoE Clearance (50%)',
        amount: 814,
        percent: 50,
        cleared: true,
        date: '12 Sep 2026',
      },
      {
        label: 'Census Date Clearance (50%)',
        amount: 814,
        percent: 50,
        cleared: true,
        date: '03 Nov 2026',
      },
    ],
  },
];

export default function AgentCommissionsPage() {
  const { toast } = useToast();
  const [commissions, setCommissions] = useState<StudentCommissionEntry[]>(INITIAL_STUDENT_COMMISSIONS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [providerFilter, setProviderFilter] = useState<string>('All');
  const [selectedCommission, setSelectedCommission] = useState<StudentCommissionEntry | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showPayoutModal, setShowPayoutModal] = useState(false);

  // Calculator inputs
  const [calcTuition, setCalcTuition] = useState<number>(12000);
  const [calcRate, setCalcRate] = useState<number>(22);
  const [calcWeeks, setCalcWeeks] = useState<number>(40);

  // Computed metrics
  const totalEarned = commissions.reduce((sum, item) => sum + item.commissionAmount, 0);
  const availablePayout = commissions
    .filter((item) => item.status === 'Available for Payout')
    .reduce((sum, item) => sum + item.commissionAmount, 0);
  const pendingRecon = commissions
    .filter((item) => item.status === 'Pending Reconciliation')
    .reduce((sum, item) => sum + item.commissionAmount, 0);
  const disbursedTotal = commissions
    .filter((item) => item.status === 'Disbursed')
    .reduce((sum, item) => sum + item.commissionAmount, 0);

  const filtered = commissions.filter((c) => {
    const matchesSearch =
      c.studentName.toLowerCase().includes(search.toLowerCase()) ||
      c.course.toLowerCase().includes(search.toLowerCase()) ||
      c.studentId.toLowerCase().includes(search.toLowerCase()) ||
      c.rctiNumber.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesProvider = providerFilter === 'All' || c.provider === providerFilter;
    return matchesSearch && matchesStatus && matchesProvider;
  });

  const handleClaimSingle = (id: string, name: string, amount: number) => {
    setCommissions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'Disbursed', paidDate: 'Today' } : c))
    );
    if (selectedCommission?.id === id) {
      setSelectedCommission((prev) => (prev ? { ...prev, status: 'Disbursed', paidDate: 'Today' } : null));
    }
    toast(`Successfully claimed A$${amount.toLocaleString()} for student ${name}. RCTI generated.`, 'success');
  };

  const handleClaimAllAvailable = () => {
    setCommissions((prev) =>
      prev.map((c) => (c.status === 'Available for Payout' ? { ...c, status: 'Disbursed', paidDate: 'Today' } : c))
    );
    setShowPayoutModal(false);
    toast(`Payout batch initiated! A$${availablePayout.toLocaleString()} transferred to Agency Account.`, 'success');
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="purple">ESOS Act Standard 4 Verified</Badge>
              <span className="text-xs text-slate-400">Live Provider Commission Ledger</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Agent Commission Ledger by Student
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Track itemized recruitment commissions earned from each enrolled international student across CRICOS partner institutions.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <Button
              variant="secondary"
              onClick={() => setShowCalculator(true)}
              className="gap-1.5"
            >
              <Calculator className="w-4 h-4 text-blue-600" />
              Commission Calculator
            </Button>
            <Button
              onClick={() => setShowPayoutModal(true)}
              disabled={availablePayout === 0}
              className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <CreditCard className="w-4 h-4" />
              Request Payout (A${availablePayout.toLocaleString()})
            </Button>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card className="p-5 border-l-4 border-l-blue-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Student Commission
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-bold text-slate-900">
                A${totalEarned.toLocaleString()}
              </span>
              <Badge variant="info">{commissions.length} Students</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">Calculated across all enrolled courses</p>
          </Card>

          <Card className="p-5 border-l-4 border-l-emerald-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Available for Payout
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-bold text-emerald-700">
                A${availablePayout.toLocaleString()}
              </span>
              <Badge variant="success">Census Cleared</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">Ready for instant bank transfer or RCTI</p>
          </Card>

          <Card className="p-5 border-l-4 border-l-amber-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Pending Reconciliation
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-bold text-amber-700">
                A${pendingRecon.toLocaleString()}
              </span>
              <Badge variant="warning">Pre-Census</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">Awaiting Term census date sign-off</p>
          </Card>

          <Card className="p-5 border-l-4 border-l-purple-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Disbursed to Date
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-bold text-purple-700">
                A${disbursedTotal.toLocaleString()}
              </span>
              <Badge variant="purple">Settled</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">Paid directly to agency operating account</p>
          </Card>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-xl flex-wrap">
              {['All', 'Available for Payout', 'Pending Reconciliation', 'Disbursed'].map((st) => (
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

            <select
              value={providerFilter}
              onChange={(e) => setProviderFilter(e.target.value)}
              className="h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-600"
            >
              <option value="All">All Partner Institutions</option>
              <option value="Australian Pacific College">Australian Pacific College (APC)</option>
              <option value="Greenwich College">Greenwich College</option>
              <option value="ILSC Business College">ILSC Greystone College</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search student, course, RCTI #..."
                className="w-full h-9 bg-white border border-slate-200 rounded-xl pl-9 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
              />
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => toast('Exported Agent Commission Ledger (.csv)', 'success')}
              className="gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              CSV
            </Button>
          </div>
        </div>

        {/* Student Commission Ledger Table */}
        <Card className="p-0 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4">Student & ID</th>
                  <th className="py-3.5 px-4">CRICOS Provider & Course</th>
                  <th className="py-3.5 px-4 text-right">Tuition Fee</th>
                  <th className="py-3.5 px-4 text-center">Agency Tier</th>
                  <th className="py-3.5 px-4 text-right">Agent Commission</th>
                  <th className="py-3.5 px-4">Milestone Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/60 transition-colors group cursor-pointer"
                    onClick={() => setSelectedCommission(item)}
                  >
                    {/* Student Info */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {item.studentName
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {item.studentName}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">({item.studentId})</span>
                          </div>
                          <p className="text-[11px] text-slate-400">{item.nationality} • {item.studentEmail}</p>
                        </div>
                      </div>
                    </td>

                    {/* Course & Provider */}
                    <td className="py-4 px-4">
                      <p className="font-semibold text-slate-800 line-clamp-1">{item.course}</p>
                      <p className="text-[11px] text-slate-500">
                        {item.provider} • <span className="font-mono text-slate-400">{item.cricosCode}</span>
                      </p>
                      <span className="inline-block mt-0.5 text-[10px] text-blue-600 font-medium">
                        {item.intakeTerm}
                      </span>
                    </td>

                    {/* Tuition Fee */}
                    <td className="py-4 px-4 text-right font-mono font-semibold text-slate-700">
                      A${item.tuitionFee.toLocaleString()}
                    </td>

                    {/* Agency Tier */}
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        <Sparkles className="w-3 h-3 text-blue-500" />
                        {item.commissionRate}%
                      </span>
                      <p className="text-[10px] text-slate-400 mt-0.5">{item.commissionTier}</p>
                    </td>

                    {/* Gross Commission AUD */}
                    <td className="py-4 px-4 text-right">
                      <span className="font-bold text-sm text-emerald-700 font-mono">
                        +A${item.commissionAmount.toLocaleString()}
                      </span>
                      <p className="text-[10px] text-slate-400">Net after promotion</p>
                    </td>

                    {/* Milestone Status */}
                    <td className="py-4 px-4">
                      <Badge
                        variant={
                          item.status === 'Disbursed'
                            ? 'purple'
                            : item.status === 'Available for Payout'
                            ? 'success'
                            : item.status === 'Pending Reconciliation'
                            ? 'warning'
                            : 'info'
                        }
                      >
                        {item.status}
                      </Badge>
                      <p className="text-[10px] text-slate-400 mt-1 font-mono">{item.rctiNumber}</p>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setSelectedCommission(item)}
                          className="h-8 px-2.5 text-xs"
                        >
                          Breakdown
                        </Button>
                        {item.status === 'Available for Payout' && (
                          <Button
                            size="sm"
                            onClick={() => handleClaimSingle(item.id, item.studentName, item.commissionAmount)}
                            className="h-8 px-2.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                          >
                            Claim
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Active Provider Agreements Overview */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Active Provider Agency Agreements & Commission Tiers
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Standardised recruitment contracts compliant with ESOS National Code 2018 (Standard 4).
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              Agency Status: Accredited Tier 1
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">Australian Pacific College</span>
                <Badge variant="success">22% Preferred</Badge>
              </div>
              <p className="text-xs text-slate-600">
                CRICOS 03812M • Ref: <span className="font-mono">APC-2026-T1-AGY</span>
              </p>
              <div className="pt-2 border-t border-slate-200/70 text-[11px] text-slate-500 space-y-1">
                <p>• 50% paid on initial CoE tuition clearance</p>
                <p>• 50% paid on Term 2 census date</p>
                <p className="font-semibold text-emerald-700">Minimum spend threshold: Met (A$40,000+)</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">ILSC & Greystone College</span>
                <Badge variant="purple">25% Platinum</Badge>
              </div>
              <p className="text-xs text-slate-600">
                CRICOS 02137M • Ref: <span className="font-mono">ILSC-2026-HIGH-AGY</span>
              </p>
              <div className="pt-2 border-t border-slate-200/70 text-[11px] text-slate-500 space-y-1">
                <p>• Accelerated 25% tier for &gt;10 student enrolments</p>
                <p>• Includes ELICOS and Vocational pathways</p>
                <p className="font-semibold text-emerald-700">Automated RCTI generation enabled</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">Greenwich English College</span>
                <Badge variant="info">20% Standard</Badge>
              </div>
              <p className="text-xs text-slate-600">
                CRICOS 02672K • Ref: <span className="font-mono">GRW-2026-T1-AGY</span>
              </p>
              <div className="pt-2 border-t border-slate-200/70 text-[11px] text-slate-500 space-y-1">
                <p>• 20% on all General English & Cambridge terms</p>
                <p>• Milestone release after 4 weeks of attendance</p>
                <p className="font-semibold text-blue-700">Eligible for +2% boost upon 15 CoEs</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Student Commission Detail Drawer */}
        {selectedCommission && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
            <div className="w-full max-w-xl bg-white h-full shadow-2xl border-l border-slate-200 p-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                {/* Drawer Header */}
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-blue-600">
                        {selectedCommission.studentId}
                      </span>
                      <Badge variant="default">{selectedCommission.nationality}</Badge>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mt-1">
                      {selectedCommission.studentName}
                    </h2>
                    <p className="text-xs text-slate-500">{selectedCommission.studentEmail}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCommission(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Course & Agreement Details */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">CRICOS Institution</span>
                    <span className="text-xs font-mono text-slate-500">{selectedCommission.cricosCode}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">{selectedCommission.provider}</p>
                  <p className="text-xs text-slate-600">{selectedCommission.course}</p>
                  <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate-500">
                    <span>Intake Term: <strong>{selectedCommission.intakeTerm}</strong></span>
                    <span>Agreement: <strong className="font-mono">{selectedCommission.agreementRef}</strong></span>
                  </div>
                </div>

                {/* Commission Calculation Breakdown Card */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50/80 to-indigo-50/60 border border-blue-200 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center justify-between">
                    <span>Commission Calculation Formula</span>
                    <span className="font-mono">{selectedCommission.commissionRate}% Agency Share</span>
                  </h3>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Total Course Net Tuition:</span>
                      <span className="font-mono font-bold text-slate-900">
                        A${selectedCommission.tuitionFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Agreed Agency Percentage ({selectedCommission.commissionTier}):</span>
                      <span className="font-mono font-bold text-blue-700">
                        × {selectedCommission.commissionRate}%
                      </span>
                    </div>
                    <div className="border-t border-blue-200 pt-2 flex justify-between items-baseline">
                      <span className="font-bold text-slate-900 text-sm">Gross Commission from Student:</span>
                      <span className="font-mono font-bold text-lg text-emerald-700">
                        A${selectedCommission.commissionAmount.toLocaleString()} AUD
                      </span>
                    </div>
                  </div>
                </div>

                {/* Staged Milestones & Disbursement Schedule */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Payment Milestones & Census Clearance
                  </h3>
                  <div className="space-y-2.5">
                    {selectedCommission.milestones.map((m, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border flex items-center justify-between ${
                          m.cleared
                            ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            {m.cleared ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Clock className="w-4 h-4 text-slate-400" />
                            )}
                            <span className="text-xs font-bold">{m.label}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 pl-6">{m.date}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-xs">
                            A${m.amount.toLocaleString()}
                          </span>
                          <p className="text-[10px] text-slate-400">{m.cleared ? 'Cleared' : 'Pending'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RCTI Invoice Reference */}
                <div className="p-3.5 rounded-xl bg-slate-100/80 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500">Recipient Created Tax Invoice (RCTI):</span>
                    <p className="font-mono font-bold text-slate-900">{selectedCommission.rctiNumber}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => toast(`Downloaded tax invoice ${selectedCommission.rctiNumber} (.pdf)`, 'success')}
                    className="gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download RCTI
                  </Button>
                </div>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3 mt-6">
                <Button variant="secondary" onClick={() => setSelectedCommission(null)}>
                  Close
                </Button>
                {selectedCommission.status === 'Available for Payout' ? (
                  <Button
                    onClick={() =>
                      handleClaimSingle(
                        selectedCommission.id,
                        selectedCommission.studentName,
                        selectedCommission.commissionAmount
                      )
                    }
                    className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
                  >
                    <CreditCard className="w-4 h-4" />
                    Claim A${selectedCommission.commissionAmount.toLocaleString()} Now
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => toast('Milestone notification sent to provider admissions', 'info')}
                  >
                    Request Provider Census Review
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Live Interactive Commission Calculator Modal */}
        {showCalculator && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="max-w-md w-full p-6 space-y-5 bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-bold text-slate-900">Live Commission Calculator</h3>
                </div>
                <button
                  onClick={() => setShowCalculator(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Student Net Tuition Fee (AUD)
                  </label>
                  <input
                    type="number"
                    value={calcTuition}
                    onChange={(e) => setCalcTuition(Number(e.target.value))}
                    step="500"
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Agency Commission Tier (%)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[15, 20, 22, 25].map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => setCalcRate(rate)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          calcRate === rate
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {rate}%
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 text-center space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Estimated Agent Commission Earned
                  </span>
                  <p className="text-3xl font-mono font-bold text-emerald-700">
                    A${Math.round((calcTuition * calcRate) / 100).toLocaleString()} AUD
                  </p>
                  <p className="text-[11px] text-emerald-600">
                    Per student enrolment (A${Math.round(((calcTuition * calcRate) / 100) / 2).toLocaleString()} per 50% milestone)
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <Button variant="secondary" onClick={() => setShowCalculator(false)}>
                  Close
                </Button>
                <Button onClick={() => setShowCalculator(false)}>
                  Apply to Quote
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Request Batch Payout Modal */}
        {showPayoutModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="max-w-md w-full p-6 space-y-5 bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-bold text-slate-900">Confirm Commission Payout Batch</h3>
                </div>
                <button
                  onClick={() => setShowPayoutModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <p>
                  You are about to submit a payout claim for all census-cleared student commissions:
                </p>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                  <div className="flex justify-between text-slate-700">
                    <span>Eligible Students:</span>
                    <span className="font-bold">
                      {commissions.filter((c) => c.status === 'Available for Payout').length} Students
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Total Payout Transfer:</span>
                    <span className="font-mono font-bold text-base text-emerald-700">
                      A${availablePayout.toLocaleString()} AUD
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px] pt-1 border-t border-emerald-200">
                    <span>Recipient Account:</span>
                    <span className="font-mono">BSB 082-001 • Acc 448192801</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400">
                  Electronic funds transfer (EFT) will settle within 1–2 Australian business days. RCTIs will be automatically filed in your Document Vault.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <Button variant="secondary" onClick={() => setShowPayoutModal(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleClaimAllAvailable}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Authorize Batch Payout
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

