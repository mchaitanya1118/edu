import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  ArrowRight,
  Plus,
  UserCheck,
  Sparkles,
  DollarSign,
  TrendingUp,
  CreditCard,
  Building2,
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

export type LeadCard = {
  id: string;
  student: string;
  nationality: string;
  course: string;
  provider: string;
  tuitionFee: number;
  commissionRate: number; // e.g. 22
  commissionAmount: number; // calculated AUD
  agreementRef: string;
  stage: 'Quote Sent' | 'Offer Signed' | 'GTE & Payment' | 'CoE Issued';
};

const INITIAL_LEADS: LeadCard[] = [
  {
    id: 'LD-101',
    student: 'Camila Rojas',
    nationality: 'Brazil',
    course: 'Cert IV in Marketing',
    provider: 'APC Brisbane',
    tuitionFee: 6750,
    commissionRate: 22,
    commissionAmount: 1485,
    agreementRef: 'APC-2026-T1',
    stage: 'Quote Sent',
  },
  {
    id: 'LD-102',
    student: 'Lucas Fernandez',
    nationality: 'Argentina',
    course: 'General English (24 Wks)',
    provider: 'Greenwich Sydney',
    tuitionFee: 6720,
    commissionRate: 20,
    commissionAmount: 1344,
    agreementRef: 'GRW-2026-T1',
    stage: 'Quote Sent',
  },
  {
    id: 'LD-103',
    student: 'Yuki Tanaka',
    nationality: 'Japan',
    course: 'General English (20 Wks)',
    provider: 'APC Melbourne',
    tuitionFee: 5600,
    commissionRate: 20,
    commissionAmount: 1120,
    agreementRef: 'APC-2026-T1',
    stage: 'Offer Signed',
  },
  {
    id: 'LD-104',
    student: 'Haruto Sato',
    nationality: 'Japan',
    course: 'Diploma of Business',
    provider: 'ILSC Sydney',
    tuitionFee: 7400,
    commissionRate: 22,
    commissionAmount: 1628,
    agreementRef: 'ILSC-2026-HIGH',
    stage: 'GTE & Payment',
  },
  {
    id: 'LD-105',
    student: 'Mateo Silva',
    nationality: 'Colombia',
    course: 'Diploma of Leadership',
    provider: 'APC Sydney CBD',
    tuitionFee: 7000,
    commissionRate: 22,
    commissionAmount: 1540,
    agreementRef: 'APC-2026-T1',
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

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge variant="info">Admissions Kanban &amp; Commission Flow</Badge>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Student Application Pipeline &amp; Commission
            </h1>
            <p className="text-xs text-slate-500">
              Track student progression from quote to PRISMS CoE, with real-time commission earnings per candidate.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link to="/agent/commissions">
              <Button variant="secondary" className="gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                Commission Ledger
              </Button>
            </Link>
            <Link to="/quotes">
              <Button className="gap-1.5">
                <Plus className="w-4 h-4" />
                Build Student Quote
              </Button>
            </Link>
          </div>
        </div>

        {/* Pipeline Commission Summary Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900">
              Total Pipeline Tuition Value
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold font-mono text-slate-900">
                A${totalTuitionInPipeline.toLocaleString()}
              </span>
              <Badge variant="info">{leads.length} Students</Badge>
            </div>
            <p className="text-[11px] text-blue-700/80 mt-1">Gross tuition across all active stages</p>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900">
              Total Potential Agent Commission
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold font-mono text-emerald-700">
                A${totalCommissionInPipeline.toLocaleString()}
              </span>
              <Badge variant="success">Avg 21.2% Tier</Badge>
            </div>
            <p className="text-[11px] text-emerald-700/80 mt-1">Total receivable upon full CoE clearance</p>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-900">
              Unlocked &amp; CoE Issued
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold font-mono text-purple-700">
                A${clearedCommission.toLocaleString()}
              </span>
              <Badge variant="purple">Available</Badge>
            </div>
            <p className="text-[11px] text-purple-700/80 mt-1">Ready for withdrawal in Commission Ledger</p>
          </Card>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STAGES.map((stage) => {
            const stageItems = leads.filter((l) => l.stage === stage);
            const stageCommission = stageItems.reduce((acc, l) => acc + l.commissionAmount, 0);

            return (
              <div
                key={stage}
                className="bg-slate-100/90 border border-slate-200/80 rounded-2xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between px-1">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                      {stage}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-mono font-semibold">
                      +A${stageCommission.toLocaleString()} Comm.
                    </span>
                  </div>
                  <Badge variant="default">{stageItems.length}</Badge>
                </div>

                <div className="space-y-3">
                  {stageItems.map((item) => (
                    <Card key={item.id} className="p-4 space-y-2.5 shadow-2xs hover:border-blue-300 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold text-blue-600">
                          {item.id}
                        </span>
                        <span className="text-[11px] text-slate-500">{item.nationality}</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">{item.student}</h3>
                        <p className="text-xs text-slate-600 mt-0.5">{item.course}</p>
                        <p className="text-[11px] text-slate-400">{item.provider}</p>
                      </div>

                      {/* Prominent Agent Commission pill on every student card */}
                      <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-emerald-900 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-emerald-600" />
                            Commission ({item.commissionRate}%)
                          </span>
                          <span className="font-mono font-bold text-emerald-700">
                            +A${item.commissionAmount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                          <span>Tuition: A${item.tuitionFee.toLocaleString()}</span>
                          <span className="font-mono">{item.agreementRef}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">
                          Fee: A${item.tuitionFee.toLocaleString()}
                        </span>
                        {stage !== 'CoE Issued' ? (
                          <button
                            onClick={() => moveNext(item.id)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                          >
                            Advance <ArrowRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <span className="text-[11px] font-semibold text-emerald-700">
                            CoE Active ✓
                          </span>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
