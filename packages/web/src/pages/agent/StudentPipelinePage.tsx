import React, { useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Plus, UserCheck, Sparkles } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

type LeadCard = {
  id: string;
  student: string;
  nationality: string;
  course: string;
  provider: string;
  value: string;
  stage: 'Quote Sent' | 'Offer Signed' | 'GTE & Payment' | 'CoE Issued';
};

const INITIAL_LEADS: LeadCard[] = [
  {
    id: 'LD-101',
    student: 'Camila Rojas',
    nationality: 'Brazil',
    course: 'Cert IV in Marketing',
    provider: 'APC Brisbane',
    value: '$6,750 AUD',
    stage: 'Quote Sent',
  },
  {
    id: 'LD-102',
    student: 'Lucas Fernandez',
    nationality: 'Argentina',
    course: 'General English (24 Wks)',
    provider: 'Greenwich Sydney',
    value: '$6,720 AUD',
    stage: 'Quote Sent',
  },
  {
    id: 'LD-103',
    student: 'Yuki Tanaka',
    nationality: 'Japan',
    course: 'General English (20 Wks)',
    provider: 'APC Melbourne',
    value: '$5,600 AUD',
    stage: 'Offer Signed',
  },
  {
    id: 'LD-104',
    student: 'Haruto Sato',
    nationality: 'Japan',
    course: 'Diploma of Business',
    provider: 'ILSC Sydney',
    value: '$7,400 AUD',
    stage: 'GTE & Payment',
  },
  {
    id: 'LD-105',
    student: 'Mateo Silva',
    nationality: 'Colombia',
    course: 'Diploma of Leadership',
    provider: 'APC Sydney CBD',
    value: '$7,000 AUD',
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

  const moveNext = (id: string) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id !== id) return l;
        const nextIdx = Math.min(STAGES.indexOf(l.stage) + 1, STAGES.length - 1);
        return { ...l, stage: STAGES[nextIdx] };
      })
    );
    toast('Student card moved to next admissions stage', 'success');
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge variant="info">Interactive Admissions Kanban</Badge>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Student Application Pipeline
            </h1>
            <p className="text-xs text-slate-500">
              Advance students from initial promotional quote to PRISMS Confirmation of Enrolment (CoE).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STAGES.map((stage) => {
            const stageItems = leads.filter((l) => l.stage === stage);
            return (
              <div
                key={stage}
                className="bg-slate-100/90 border border-slate-200/80 rounded-2xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    {stage}
                  </span>
                  <Badge variant="default">{stageItems.length}</Badge>
                </div>

                <div className="space-y-3">
                  {stageItems.map((item) => (
                    <Card key={item.id} className="p-4 space-y-2.5 shadow-2xs">
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
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-700">{item.value}</span>
                        {stage !== 'CoE Issued' && (
                          <button
                            onClick={() => moveNext(item.id)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                          >
                            Next <ArrowRight className="w-3 h-3" />
                          </button>
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
