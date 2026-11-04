import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Users,
  GraduationCap,
  FileText,
  Eye,
  BookOpen,
  Building2,
  Sparkles,
  Clock,
  ShieldCheck,
  DollarSign,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Download,
  ArrowUpRight,
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

const STATS = [
  {
    label: 'Active CRICOS Courses',
    value: '24',
    change: '+3 new accredited',
    positive: true,
    icon: BookOpen,
    color: 'bg-blue-50 text-blue-600 border border-blue-200',
  },
  {
    label: 'Open Quotes & Offers',
    value: '38',
    change: '+14 this week',
    positive: true,
    icon: FileText,
    color: 'bg-amber-50 text-amber-600 border border-amber-200',
  },
  {
    label: 'Enrolled International Students',
    value: '1,420',
    change: '+86 Q3 intake',
    positive: true,
    icon: GraduationCap,
    color: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
  },
  {
    label: 'Agency Commission Disbursed',
    value: 'A$184.2k',
    change: '100% on-time SLA',
    positive: true,
    icon: DollarSign,
    color: 'bg-purple-50 text-purple-600 border border-purple-200',
  },
];

const RECENT_QUOTES = [
  {
    id: 'QT-2026-881',
    course: 'Diploma of Leadership & Management',
    cricos: '104112A',
    provider: 'Australian Pacific College',
    student: 'Mateo Silva',
    nationality: 'Colombia',
    amount: 'A$6,800',
    commission: 'A$1,496 (22%)',
    status: 'ACCEPTED' as const,
    date: 'Today, 2:15 PM',
  },
  {
    id: 'QT-2026-882',
    course: 'General English (ELICOS 24wks)',
    cricos: '098412B',
    provider: 'Greenwich English College',
    student: 'Yuki Tanaka',
    nationality: 'Japan',
    amount: 'A$6,720',
    commission: 'A$1,680 (25%)',
    status: 'SENT' as const,
    date: 'Today, 11:30 AM',
  },
  {
    id: 'QT-2026-883',
    course: 'Cert IV in Marketing & Communication',
    cricos: '105881E',
    provider: 'Australian Pacific College',
    student: 'Camila Rojas',
    nationality: 'Chile',
    amount: 'A$6,400',
    commission: 'A$1,408 (22%)',
    status: 'OFFER_ISSUED' as const,
    date: 'Yesterday',
  },
  {
    id: 'QT-2026-884',
    course: 'Adv Diploma of Information Technology',
    cricos: '108721M',
    provider: 'ILSC Greystone College',
    student: 'Arjun Mehta',
    nationality: 'India',
    amount: 'A$9,200',
    commission: 'A$2,024 (22%)',
    status: 'DRAFT' as const,
    date: '02 Nov 2026',
  },
  {
    id: 'QT-2026-885',
    course: 'Certificate III in Commercial Cookery',
    cricos: '089123C',
    provider: 'Lexis Training Australia',
    student: 'Lucas Ferrari',
    nationality: 'Brazil',
    amount: 'A$11,500',
    commission: 'A$2,875 (25%)',
    status: 'PENDING' as const,
    date: '01 Nov 2026',
  },
];

const QUICK_ACTIONS = [
  {
    label: 'Build Student Quote',
    desc: 'Generate multi-currency PDF quote',
    href: '/quotes',
    icon: FileText,
    variant: 'blue',
  },
  {
    label: 'Explore Partner Schools',
    desc: 'CRICOS directory & commissions',
    href: '/portal',
    icon: Building2,
    variant: 'emerald',
  },
  {
    label: 'Student CRM & CoEs',
    desc: 'Track PRISMS status & GTE score',
    href: '/students',
    icon: Users,
    variant: 'indigo',
  },
  {
    label: 'Promos & Scholarships',
    desc: 'Manage live fee waivers & grants',
    href: '/provider-promo',
    icon: Sparkles,
    variant: 'amber',
  },
];

const INTAKE_SCHEDULE = [
  { name: 'July 2026 General Intake', date: '14 Jul 2026', daysLeft: 18, fillRate: 92, status: 'Closing Soon' },
  { name: 'Weekly Monday ELICOS Intake', date: 'Every Monday', daysLeft: 4, fillRate: 78, status: 'Open' },
  { name: 'September 2026 Spring Term', date: '07 Sep 2026', daysLeft: 73, fillRate: 46, status: 'Open' },
  { name: 'October 2026 Term 4 Intake', date: '19 Oct 2026', daysLeft: 115, fillRate: 25, status: 'Scheduled' },
];

export default function DashboardPage() {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('Current Term (Q3 2026)');

  return (
    <AppLayout>
      <div className="space-y-7 pb-12">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="success">PRISMS Connected</Badge>
              <span className="text-xs text-slate-400">National Code 2018 Certified</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Executive Platform Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Unified operational overview for recruitment agents, admissions coordinators, and institutional leadership.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="h-9 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-600 shadow-2xs"
            >
              <option value="Current Term (Q3 2026)">Current Term (Q3 2026)</option>
              <option value="Next Term (Q4 2026)">Next Term (Q4 2026)</option>
              <option value="Entire Academic Year 2026">Entire Academic Year 2026</option>
            </select>
            <Link to="/quotes">
              <Button size="sm">
                <FileText className="w-3.5 h-3.5" />
                New Quote
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Primary KPI Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <Card key={s.label} className="p-5 hover:border-blue-300 transition-all border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {s.change}
                </span>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{s.value}</p>
              <p className="text-xs font-medium text-slate-500 mt-1">{s.label}</p>
            </Card>
          ))}
        </div>

        {/* 4 Interactive Quick Action Cards */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              High-Frequency Operations
            </h2>
            <span className="text-xs text-blue-600 font-semibold">1-Click Direct Launch</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {QUICK_ACTIONS.map((action) => {
              const colorStyles: Record<string, string> = {
                blue: 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20',
                emerald: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/20',
                indigo: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/20',
                amber: 'bg-amber-600 text-white hover:bg-amber-700 shadow-amber-500/20',
              };

              return (
                <NavLink
                  key={action.label}
                  to={action.href}
                  className="block text-decoration-none group"
                >
                  <Card className="p-4 border border-slate-200/80 hover:border-blue-400 transition-all duration-150 h-full flex flex-col justify-between group-hover:shadow-md">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${colorStyles[action.variant]} shadow-sm`}>
                          <action.icon className="w-4 h-4" />
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {action.label}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 leading-snug">{action.desc}</p>
                    </div>
                  </Card>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Main 2-Column Section: Recent Quotes & Intakes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Recent Quotes & Applications (2 Cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="overflow-hidden border border-slate-200">
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Recent Enrolment Quotes &amp; CoEs</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Live status from Australian educational institutions</p>
                </div>
                <Link to="/quotes">
                  <Button variant="secondary" size="sm" className="text-xs">
                    View All ({RECENT_QUOTES.length})
                  </Button>
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4">Student &amp; Nationality</th>
                      <th className="py-3 px-4">CRICOS Course &amp; School</th>
                      <th className="py-3 px-4 text-right">Tuition</th>
                      <th className="py-3 px-4 text-center">Commission</th>
                      <th className="py-3 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {RECENT_QUOTES.map((q) => {
                      const statusVariant: Record<string, { label: string; badge: 'success' | 'info' | 'warning' | 'default' }> = {
                        ACCEPTED: { label: 'Accepted & Paid', badge: 'success' },
                        SENT: { label: 'Sent to Student', badge: 'info' },
                        OFFER_ISSUED: { label: 'Offer Issued', badge: 'info' },
                        DRAFT: { label: 'Draft Quote', badge: 'default' },
                        PENDING: { label: 'Pending Assessment', badge: 'warning' },
                      };

                      const currentStatus = statusVariant[q.status] || { label: q.status, badge: 'default' };

                      return (
                        <tr key={q.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-900 block">{q.student}</span>
                            <span className="text-[11px] text-slate-500">{q.nationality} • {q.id}</span>
                          </td>
                          <td className="py-3.5 px-4 max-w-xs">
                            <span className="font-semibold text-slate-800 block truncate">{q.course}</span>
                            <span className="text-[11px] text-slate-500 block truncate">{q.provider}</span>
                          </td>
                          <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                            {q.amount}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                              {q.commission}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <Badge variant={currentStatus.badge}>
                              {currentStatus.label}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Quick Banner: National Code 2018 Assurance */}
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0" />
                <div>
                  <span className="font-bold text-blue-950 block">ESOS Framework &amp; GTE Compliance Engine Active</span>
                  <p className="text-blue-900 mt-0.5">
                    All quotes strictly calculate certified CRICOS tuition fees and automatically generate compliant written agreements.
                  </p>
                </div>
              </div>
              <Link to="/courses" className="shrink-0">
                <Button size="sm" variant="secondary" className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50 text-xs">
                  Review CRICOS Rules
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Intake Countdown & System Notifications */}
          <div className="space-y-6">
            {/* Upcoming Australian Academic Intakes */}
            <Card className="p-5 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Upcoming CRICOS Intakes
                </h3>
                <span className="text-[11px] font-bold text-slate-400">2026 Academic Calendar</span>
              </div>

              <div className="space-y-3.5">
                {INTAKE_SCHEDULE.map((intake) => (
                  <div key={intake.name} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{intake.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        intake.daysLeft <= 20 ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {intake.daysLeft} days left
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Date: <strong className="text-slate-700">{intake.date}</strong></span>
                      <span>Capacity: <strong className="text-slate-700">{intake.fillRate}% Filled</strong></span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${intake.fillRate > 85 ? 'bg-amber-500' : 'bg-blue-600'}`}
                        style={{ width: `${intake.fillRate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Platform Audit & Activity Log */}
            <Card className="p-5 border border-slate-200">
              <div className="flex items-center justify-between mb-3.5">
                <h3 className="text-sm font-bold text-slate-900">Compliance &amp; Finance Activity</h3>
                <span className="text-[11px] text-slate-400">Live Feed</span>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  { title: 'PRISMS CoE Issued for Mateo Silva (COE-26-8812)', time: '12m ago', color: 'bg-emerald-500' },
                  { title: 'A$1,496 Commission milestone scheduled for release', time: '45m ago', color: 'bg-purple-500' },
                  { title: 'New 20% Scholarship published for APC ELICOS', time: '2h ago', color: 'bg-blue-500' },
                  { title: 'GTE financial proof verified for Camila Rojas', time: '4h ago', color: 'bg-amber-500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 pb-2.5 border-b border-slate-100 last:border-0 last:pb-0">
                    <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${item.color}`} />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-slate-800 leading-snug">{item.title}</p>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
