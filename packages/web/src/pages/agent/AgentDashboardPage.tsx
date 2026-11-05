import React, { useState } from 'react';
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
  TrendingUp,
  CreditCard,
  ChevronRight,
  ShieldCheck,
  Award,
  Globe,
  MapPin,
  Calendar,
  Filter,
  Search,
  ExternalLink,
  Percent,
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

export default function AgentDashboardPage() {
  const { toast } = useToast();
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedStudentFilter, setSelectedStudentFilter] = useState<string>('All');

  const topStudentCommissions = [
    {
      id: 'STU-404',
      name: 'Arjun Nair',
      nationality: 'India',
      avatarBg: 'bg-indigo-600',
      course: 'Advanced Diploma of IT (Cloud Networking)',
      cricos: '108721M',
      provider: 'ILSC Greystone College',
      tuition: 16500,
      rate: 25,
      commission: 4125,
      disbursed: 2062,
      pending: 2063,
      status: 'Disbursed',
      coeRef: 'COE-26-881230',
    },
    {
      id: 'STU-401',
      name: 'Mateo Silva',
      nationality: 'Colombia',
      avatarBg: 'bg-emerald-600',
      course: 'Diploma of Leadership & Management',
      cricos: '104112A',
      provider: 'Australian Pacific College',
      tuition: 14800,
      rate: 22,
      commission: 3256,
      disbursed: 1628,
      pending: 1628,
      status: 'Available for Payout',
      coeRef: 'COE-26-904122',
    },
    {
      id: 'STU-406',
      name: 'Haruto Sato',
      nationality: 'Japan',
      avatarBg: 'bg-amber-600',
      course: 'Diploma of Business & Analytics',
      cricos: '105881E',
      provider: 'ILSC Sydney CBD',
      tuition: 7400,
      rate: 22,
      commission: 1628,
      disbursed: 0,
      pending: 1628,
      status: 'Available for Payout',
      coeRef: 'COE-26-774011',
    },
    {
      id: 'STU-403',
      name: 'Camila Rojas',
      nationality: 'Chile',
      avatarBg: 'bg-purple-600',
      course: 'Cert IV in Marketing & Communication',
      cricos: '105881E',
      provider: 'Australian Pacific College',
      tuition: 6750,
      rate: 22,
      commission: 1485,
      disbursed: 0,
      pending: 1485,
      status: 'Pending Commencement',
      coeRef: 'COE-26-662910',
    },
  ];

  const filteredStudents = topStudentCommissions.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.course.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.provider.toLowerCase().includes(studentSearch.toLowerCase());
    const matchesStatus =
      selectedStudentFilter === 'All' || s.status === selectedStudentFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AppLayout>
      <div className="space-y-7 pb-12">
        {/* Top Header & Agency Status Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-700">Recruitment Hub</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-medium text-slate-500">Global Pathways Agency (AU-AGY-8820)</span>
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              <Award className="w-3 h-3 text-blue-600" />
              Tier-1 Platinum Partner
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/quotes">
              <Button size="sm">
                <FileText className="w-3.5 h-3.5" />
                Build Student Quote
              </Button>
            </Link>
            <Link to="/agent/pipeline">
              <Button variant="secondary" size="sm">
                <Kanban className="w-3.5 h-3.5" />
                Pipeline Kanban
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-white border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Tier-1 Preferred Agency • Up to 28% Commission
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Global Pathways Agency — Agency Recruitment Hub
              </h1>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-xl">
                Real-time CRICOS tuition quoting, automatic promotional scholarship calculation, transparent student commission disbursement, and instant PRISMS CoE tracking.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link to="/agent/commissions">
                <Button
                  variant="glass"
                  className="gap-2 text-xs font-bold"
                >
                  <DollarSign className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span className="text-white">Commission Ledger (A$24.8k)</span>
                </Button>
              </Link>
              <Link to="/quotes">
                <Button
                  variant="white"
                  className="gap-2 text-xs font-bold text-slate-900 shadow-md hover:bg-slate-50"
                >
                  <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-slate-900 font-extrabold tracking-tight">New 30s Quote</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Primary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/students" className="block group">
            <Card className="p-5 h-full group-hover:border-blue-400 transition-all border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Active Student Leads
                </span>
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex items-baseline justify-between mt-2.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">28</span>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                  +6 this week
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">Across Sydney, Melbourne, Brisbane &amp; Perth</p>
            </Card>
          </Link>

          <Link to="/quotes" className="block group">
            <Card className="p-5 h-full group-hover:border-blue-400 transition-all border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Quotes Sent (30d)
                </span>
                <FileText className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex items-baseline justify-between mt-2.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">19</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  68% Offer Rate
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">Avg. student scholarship saving: A$1,350</p>
            </Card>
          </Link>

          <Link to="/agent/pipeline" className="block group">
            <Card className="p-5 h-full group-hover:border-blue-400 transition-all border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  PRISMS CoEs Issued
                </span>
                <ShieldCheck className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex items-baseline justify-between mt-2.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">14</span>
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                  100% GTE Pass
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">Ready for Subclass 500 visa lodgement</p>
            </Card>
          </Link>

          <Link to="/agent/commissions" className="block group">
            <Card className="p-5 h-full border-l-4 border-l-emerald-600 group-hover:border-emerald-500 transition-all shadow-2xs bg-emerald-50/20">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Agency Commissions
                </span>
                <ArrowUpRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div className="flex items-baseline justify-between mt-2.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700">A$24,800</span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  22%-25% Tier
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                <strong className="text-emerald-700">A$8,450</strong> available for instant payout →
              </p>
            </Card>
          </Link>
        </div>

        {/* Student Commission Earnings by Candidate */}
        <Card className="p-5 sm:p-6 border border-slate-200 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Commission Earned by Enrolled Student
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Itemized agency recruitment commission earned for each international candidate under ESOS National Code Standard 4.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link to="/agent/commissions">
                <Button variant="secondary" size="sm" className="gap-1 text-xs">
                  Full Ledger <ChevronRight className="w-3 h-3" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              {['All', 'Available for Payout', 'Disbursed', 'Pending Commencement'].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStudentFilter(st)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedStudentFilter === st
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {st === 'All' ? 'All Candidates' : st}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                placeholder="Search candidate name or course..."
                className="w-full h-8 bg-slate-50 hover:bg-white border border-slate-200 rounded-lg pl-8 pr-3 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="p-4 rounded-xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:shadow-xs transition-all space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono font-bold text-blue-600">{student.id}</span>
                    <Badge
                      variant={
                        student.status === 'Disbursed'
                          ? 'purple'
                          : student.status === 'Available for Payout'
                          ? 'success'
                          : 'info'
                      }
                      className="text-[10px]"
                    >
                      {student.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-full ${student.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                      {student.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">{student.name}</h3>
                      <span className="text-[10px] text-slate-500 font-medium">{student.nationality} • {student.coeRef}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 font-semibold line-clamp-1">{student.course}</p>
                  <p className="text-[11px] text-slate-500">{student.provider}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200/80">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-emerald-950">Recruitment Commission</span>
                      <span className="font-mono font-extrabold text-sm text-emerald-700">
                        +A${student.commission.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>Tuition: A${student.tuition.toLocaleString()}</span>
                      <span className="font-bold text-emerald-700">{student.rate}% Tier Rate</span>
                    </div>
                  </div>

                  <Link to="/agent/commissions">
                    <Button variant="secondary" size="sm" className="w-full text-xs h-7.5">
                      View Payout Terms
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Live Partner Scholarships Available to Quote */}
        <Card className="p-5 sm:p-6 border border-slate-200 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Live CRICOS Provider Scholarships
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Broadcasted pricing rules automatically applied when you select these providers in the Quote Builder.
              </p>
            </div>
            <Link to="/portal">
              <Button variant="secondary" size="sm" className="text-xs">
                View All 52+ Partner Schools
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 transition-all space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Badge variant="success">20% Off ELICOS</Badge>
                  <span className="text-[11px] font-mono text-slate-500">CRICOS 03812M</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">Australian Pacific College (APC)</h3>
                <p className="text-xs text-slate-600 mt-1 leading-snug">
                  General English at A$280/wk (standard $350) + $0 Material Fee for Q3 intakes across Sydney, Melbourne &amp; Brisbane.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-700">22% Agent Commission</span>
                <Link to="/quotes">
                  <Button size="sm" className="h-7 text-xs px-2.5">
                    Quote Now
                  </Button>
                </Link>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 transition-all space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Badge variant="warning">A$1,500 Regional Bursary</Badge>
                  <span className="text-[11px] font-mono text-slate-500">CRICOS 02672K</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">Greenwich College Australia</h3>
                <p className="text-xs text-slate-600 mt-1 leading-snug">
                  Diploma of Leadership &amp; Management fee waiver + Perth regional visa Category 2 migration points.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-700">20% Agent Commission</span>
                <Link to="/quotes">
                  <Button size="sm" className="h-7 text-xs px-2.5">
                    Quote Now
                  </Button>
                </Link>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 transition-all space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Badge variant="info">Free Enrolment Fee</Badge>
                  <span className="text-[11px] font-mono text-slate-500">CRICOS 02137M</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">ILSC &amp; Greystone College</h3>
                <p className="text-xs text-slate-600 mt-1 leading-snug">
                  A$250 Enrolment Fee waived on all Adelaide &amp; Brisbane VET IT &amp; Business courses with flexible timetables.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-700">20% Agent Commission</span>
                <Link to="/quotes">
                  <Button size="sm" className="h-7 text-xs px-2.5">
                    Quote Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
