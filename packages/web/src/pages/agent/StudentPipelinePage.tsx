import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  ArrowRight,
  Plus,
  UserCheck,
  Sparkles,
  DollarSign,
  TrendingUp,
  CreditCard,
  Building2,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ShieldCheck,
  X,
  ChevronRight,
  User,
  GraduationCap,
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

export type LeadCard = {
  id: string;
  student: string;
  nationality: string;
  avatarBg: string;
  course: string;
  provider: string;
  tuitionFee: number;
  commissionRate: number; // e.g. 22
  commissionAmount: number; // calculated AUD
  agreementRef: string;
  gteScore: number;
  intakeDate: string;
  stage: 'Quote Sent' | 'Offer Signed' | 'GTE & Payment' | 'CoE Issued';
};

const INITIAL_LEADS: LeadCard[] = [
  {
    id: 'LD-101',
    student: 'Camila Rojas',
    nationality: 'Brazil',
    avatarBg: 'bg-emerald-600',
    course: 'Cert IV in Marketing & Communication',
    provider: 'APC Brisbane',
    tuitionFee: 6750,
    commissionRate: 22,
    commissionAmount: 1485,
    agreementRef: 'APC-2026-T1',
    gteScore: 92,
    intakeDate: '14 Jul 2026',
    stage: 'Quote Sent',
  },
  {
    id: 'LD-102',
    student: 'Lucas Fernandez',
    nationality: 'Argentina',
    avatarBg: 'bg-blue-600',
    course: 'General English (ELICOS 24 Wks)',
    provider: 'Greenwich Sydney',
    tuitionFee: 6720,
    commissionRate: 20,
    commissionAmount: 1344,
    agreementRef: 'GRW-2026-T1',
    gteScore: 88,
    intakeDate: 'Weekly Monday',
    stage: 'Quote Sent',
  },
  {
    id: 'LD-103',
    student: 'Yuki Tanaka',
    nationality: 'Japan',
    avatarBg: 'bg-amber-600',
    course: 'General English (ELICOS 20 Wks)',
    provider: 'APC Melbourne',
    tuitionFee: 5600,
    commissionRate: 20,
    commissionAmount: 1120,
    agreementRef: 'APC-2026-T1',
    gteScore: 95,
    intakeDate: 'Weekly Monday',
    stage: 'Offer Signed',
  },
  {
    id: 'LD-104',
    student: 'Haruto Sato',
    nationality: 'Japan',
    avatarBg: 'bg-purple-600',
    course: 'Diploma of Business & Analytics',
    provider: 'ILSC Sydney',
    tuitionFee: 7400,
    commissionRate: 22,
    commissionAmount: 1628,
    agreementRef: 'ILSC-2026-HIGH',
    gteScore: 91,
    intakeDate: '07 Sep 2026',
    stage: 'GTE & Payment',
  },
  {
    id: 'LD-105',
    student: 'Mateo Silva',
    nationality: 'Colombia',
    avatarBg: 'bg-indigo-600',
    course: 'Diploma of Leadership & Management',
    provider: 'APC Sydney CBD',
    tuitionFee: 7000,
    commissionRate: 22,
    commissionAmount: 1540,
    agreementRef: 'APC-2026-T1',
    gteScore: 98,
    intakeDate: '14 Jul 2026',
    stage: 'CoE Issued',
  },
];

const STAGES: LeadCard['stage'][] = [
  'Quote Sent',
  'Offer Signed',
  'GTE & Payment',
  'CoE Issued',
];

export default function AgentPipelinePage() {
  const { toast } = useToast();
  const [leads, setLeads] = useState<LeadCard[]>(INITIAL_LEADS);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New lead form
  const [newStudent, setNewStudent] = useState('');
  const [newNationality, setNewNationality] = useState('Brazil');
  const [newCourse, setNewCourse] = useState('Diploma of Leadership & Management');
  const [newProvider, setNewProvider] = useState('Australian Pacific College');
  const [newTuition, setNewTuition] = useState('7200');
  const [newCommissionRate, setNewCommissionRate] = useState('22');

  const totalTuitionInPipeline = leads.reduce((sum, l) => sum + l.tuitionFee, 0);
  const totalCommissionInPipeline = leads.reduce((sum, l) => sum + l.commissionAmount, 0);
  const clearedCommission = leads
    .filter((l) => l.stage === 'CoE Issued')
    .reduce((sum, l) => sum + l.commissionAmount, 0);

  const moveNext = (id: string) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id !== id) return l;
        const nextIdx = Math.min(STAGES.indexOf(l.stage) + 1, STAGES.length - 1);
        const nextStage = STAGES[nextIdx];
        if (nextStage === 'CoE Issued') {
          toast(
            `CoE Issued for ${l.student}! Commission of A$${l.commissionAmount.toLocaleString()} is now unlocked for payout.`,
            'success'
          );
        } else {
          toast(`${l.student} advanced to ${nextStage}`, 'success');
        }
        return { ...l, stage: nextStage };
      })
    );
  };

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.trim()) return;

    const tuition = Number(newTuition) || 7200;
    const rate = Number(newCommissionRate) || 22;
    const commAmount = Math.round((tuition * rate) / 100);

    const created: LeadCard = {
      id: `LD-${Math.floor(106 + Math.random() * 50)}`,
      student: newStudent,
      nationality: newNationality,
      avatarBg: 'bg-blue-600',
      course: newCourse,
      provider: newProvider,
      tuitionFee: tuition,
      commissionRate: rate,
      commissionAmount: commAmount,
      agreementRef: 'APC-2026-T1',
      gteScore: 90,
      intakeDate: '14 Jul 2026',
      stage: 'Quote Sent',
    };

    setLeads([created, ...leads]);
    setNewStudent('');
    setShowAddModal(false);
    toast(`Candidate ${created.student} added to admissions pipeline`, 'success');
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.student.toLowerCase().includes(search.toLowerCase()) ||
      l.course.toLowerCase().includes(search.toLowerCase()) ||
      l.nationality.toLowerCase().includes(search.toLowerCase()) ||
      l.provider.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="info">Admissions Kanban Engine</Badge>
              <span className="text-xs text-slate-400 font-mono">CRICOS &amp; PRISMS Synced</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Student Application Pipeline &amp; Commission Flow
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Track student progression from initial quote to PRISMS CoE with itemized agency commission values at each stage.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link to="/agent/commissions">
              <Button variant="secondary" size="sm" className="gap-1.5 text-xs">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                Commission Ledger
              </Button>
            </Link>
            <Button size="sm" onClick={() => setShowAddModal(true)} className="gap-1.5 text-xs">
              <Plus className="w-3.5 h-3.5" />
              Add Candidate Lead
            </Button>
          </div>
        </div>

        {/* 3 Pipeline Financial Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4.5 bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/40 border border-blue-200 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900">
              Total Pipeline Tuition Value
            </span>
            <div className="flex items-baseline justify-between mt-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900">
                A${totalTuitionInPipeline.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full">
                {leads.length} Candidates
              </span>
            </div>
            <p className="text-[11px] text-blue-700/80 mt-1.5">Gross contracted tuition across all 4 stages</p>
          </Card>

          <Card className="p-4.5 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/40 border border-emerald-200 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-950">
              Total Potential Agency Commission
            </span>
            <div className="flex items-baseline justify-between mt-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-700">
                A${totalCommissionInPipeline.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                Avg 21.4% Rate
              </span>
            </div>
            <p className="text-[11px] text-emerald-800/80 mt-1.5">Full recruitment entitlement upon CoE census</p>
          </Card>

          <Card className="p-4.5 bg-gradient-to-br from-purple-50/70 via-white to-violet-50/40 border border-purple-200 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-950">
              CoE Issued &amp; Unlocked Commission
            </span>
            <div className="flex items-baseline justify-between mt-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-700">
                A${clearedCommission.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-purple-800 bg-purple-100/80 px-2 py-0.5 rounded-full">
                Available Now
              </span>
            </div>
            <p className="text-[11px] text-purple-800/80 mt-1.5">Ready for 14-day escrow disbursement</p>
          </Card>
        </div>

        {/* Quick Search and Filter Bar */}
        <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search candidate, course or nationality..."
              className="w-full h-8 bg-slate-50 hover:bg-white border border-slate-200 rounded-lg pl-8 pr-3 text-xs text-slate-900 focus:outline-none focus:border-blue-600 transition-all"
            />
          </div>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
            Drag or click &apos;Advance Stage&apos; to trigger GTE and PRISMS milestones
          </span>
        </div>

        {/* Kanban Board Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STAGES.map((stage) => {
            const stageItems = filteredLeads.filter((l) => l.stage === stage);
            const stageTuition = stageItems.reduce((acc, l) => acc + l.tuitionFee, 0);
            const stageCommission = stageItems.reduce((acc, l) => acc + l.commissionAmount, 0);

            const stageHeaders: Record<string, { badge: string; color: string }> = {
              'Quote Sent': { badge: 'bg-blue-100 text-blue-800', color: 'border-t-blue-500' },
              'Offer Signed': { badge: 'bg-amber-100 text-amber-800', color: 'border-t-amber-500' },
              'GTE & Payment': { badge: 'bg-indigo-100 text-indigo-800', color: 'border-t-indigo-500' },
              'CoE Issued': { badge: 'bg-emerald-100 text-emerald-800', color: 'border-t-emerald-500' },
            };

            return (
              <div
                key={stage}
                className={`bg-slate-100/80 border border-slate-200/90 border-t-4 ${stageHeaders[stage].color} rounded-2xl p-3.5 space-y-3 flex flex-col justify-between`}
              >
                <div className="space-y-3">
                  {/* Column Header */}
                  <div className="flex items-center justify-between px-1">
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 block">
                        {stage}
                      </span>
                      <span className="text-[11px] text-emerald-700 font-mono font-bold">
                        A${stageCommission.toLocaleString()} Comm
                      </span>
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${stageHeaders[stage].badge}`}
                    >
                      {stageItems.length}
                    </span>
                  </div>

                  {/* Cards inside column */}
                  <div className="space-y-3 min-h-[350px]">
                    {stageItems.length === 0 ? (
                      <div className="h-40 rounded-xl border border-dashed border-slate-200 flex flex-col items-center justify-center p-4 text-center">
                        <User className="w-5 h-5 text-slate-300 mb-1" />
                        <span className="text-xs text-slate-400">No candidates in this stage</span>
                      </div>
                    ) : (
                      stageItems.map((lead) => (
                        <div
                          key={lead.id}
                          className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-150 space-y-2.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                              {lead.id}
                            </span>
                            <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                              GTE Score: <strong className="text-emerald-700">{lead.gteScore}%</strong>
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-full ${lead.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                              {lead.student.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-900 leading-snug">{lead.student}</h4>
                              <span className="text-[10px] text-slate-500 font-medium">{lead.nationality} • Intake: {lead.intakeDate}</span>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-slate-700 line-clamp-1">{lead.course}</p>
                            <p className="text-[11px] text-slate-500">{lead.provider}</p>
                          </div>

                          {/* Commission Tag */}
                          <div className="p-2 rounded-lg bg-emerald-50/90 border border-emerald-200/80 flex items-center justify-between text-xs">
                            <span className="font-semibold text-emerald-950">Earn:</span>
                            <span className="font-mono font-extrabold text-emerald-700">
                              +A${lead.commissionAmount.toLocaleString()} ({lead.commissionRate}%)
                            </span>
                          </div>

                          {/* Move action */}
                          {stage !== 'CoE Issued' ? (
                            <button
                              type="button"
                              onClick={() => moveNext(lead.id)}
                              className="w-full inline-flex items-center justify-center gap-1 text-[11px] font-bold py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white transition-all cursor-pointer"
                            >
                              Advance Stage <ArrowRight className="w-3 h-3" />
                            </button>
                          ) : (
                            <span className="w-full inline-flex items-center justify-center gap-1 text-[11px] font-bold py-1 rounded-lg bg-emerald-100 text-emerald-800">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> CoE Dispatched
                            </span>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/80 text-[10px] text-slate-500 flex justify-between">
                  <span>Tuition Vol:</span>
                  <span className="font-bold text-slate-700">A${stageTuition.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Add New Lead to Pipeline */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-6 space-y-4 bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Add Candidate to Admissions Pipeline</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddLead} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Student Full Name</label>
                  <Input
                    placeholder="e.g. Sofia Morales"
                    value={newStudent}
                    onChange={(e) => setNewStudent(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Nationality</label>
                    <select
                      value={newNationality}
                      onChange={(e) => setNewNationality(e.target.value)}
                      className="w-full h-9 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
                    >
                      <option value="Brazil">Brazil</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Japan">Japan</option>
                      <option value="India">India</option>
                      <option value="Spain">Spain</option>
                      <option value="Thailand">Thailand</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Provider School</label>
                    <select
                      value={newProvider}
                      onChange={(e) => setNewProvider(e.target.value)}
                      className="w-full h-9 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
                    >
                      <option value="Australian Pacific College">Australian Pacific College</option>
                      <option value="Greenwich College">Greenwich College</option>
                      <option value="ILSC Greystone">ILSC Greystone</option>
                      <option value="Lexis English">Lexis English</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">CRICOS Course Name</label>
                  <Input
                    value={newCourse}
                    onChange={(e) => setNewCourse(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Tuition Fee (AUD)</label>
                    <Input
                      type="number"
                      value={newTuition}
                      onChange={(e) => setNewTuition(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Commission Rate (%)</label>
                    <Input
                      type="number"
                      value={newCommissionRate}
                      onChange={(e) => setNewCommissionRate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <Button type="button" variant="secondary" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Candidate Lead</Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
