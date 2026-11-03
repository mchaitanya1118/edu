import React from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Users,
  FileText,
  Sparkles,
  DollarSign,
  ArrowUpRight,
  Kanban,
  Building2,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export default function AgentDashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Hero */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 p-6 sm:p-8 text-white shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Tier-1 Preferred Recruitment Partner
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Global Pathways Agency — Recruitment Hub
              </h1>
              <p className="text-sm text-blue-100 leading-relaxed">
                Compare live Australian CRICOS scholarships, generate itemized tuition quotes in 30 seconds, and track PRISMS CoE issuances.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link to="/agent/pipeline">
                <Button
                  variant="secondary"
                  className="bg-white/15 hover:bg-white/25 text-white border-white/20"
                >
                  <Kanban className="w-4 h-4" />
                  Open Kanban Pipeline
                </Button>
              </Link>
              <Link to="/quotes">
                <Button className="bg-white text-blue-700 hover:bg-blue-50 border-0">
                  <FileText className="w-4 h-4" />
                  Build Student Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card className="p-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Active Student Leads
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-bold text-slate-900">28</span>
              <Badge variant="info">+6 this week</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">Across Sydney, Melbourne & Brisbane</p>
          </Card>

          <Card className="p-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Quotes Sent (30d)
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-bold text-slate-900">19</span>
              <Badge variant="success">68% Acceptance</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">Avg. scholarship saving: $1,250 AUD</p>
          </Card>

          <Card className="p-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              PRISMS CoEs Issued
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-bold text-slate-900">14</span>
              <Badge variant="purple">100% GTE Pass</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">Ready for Subclass 500 lodgement</p>
          </Card>

          <Card className="p-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Commission Earned
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-bold text-emerald-700">$24,800</span>
              <Badge variant="success">22% Tier</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">AUD settled this quarter</p>
          </Card>
        </div>

        {/* Hot Scholarships */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Live Provider Scholarships Available to Quote
              </h2>
              <p className="text-xs text-slate-500">
                Automatically applied when you select these providers in the Quote Builder.
              </p>
            </div>
            <Link to="/portal">
              <Button variant="secondary" size="sm">
                View All Partner Schools
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="success">20% Off ELICOS</Badge>
                <span className="text-xs font-mono text-slate-500">CRICOS 03812M</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Australian Pacific College</h3>
              <p className="text-xs text-slate-600">
                General English at $280/wk (was $350/wk) + $0 Material Fee for Q3 intakes.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="warning">$1,500 Bursary</Badge>
                <span className="text-xs font-mono text-slate-500">CRICOS 02672K</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Greenwich College Australia</h3>
              <p className="text-xs text-slate-600">
                Diploma of Leadership & Management fee waiver for onshore visa extensions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="info">Free Enrolment</Badge>
                <span className="text-xs font-mono text-slate-500">CRICOS 02137M</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">ILSC Greystone College</h3>
              <p className="text-xs text-slate-600">
                $250 Enrolment Fee waived on all Adelaide & Brisbane VET packages.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
