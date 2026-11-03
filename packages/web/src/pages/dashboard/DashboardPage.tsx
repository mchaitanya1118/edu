'use client';

import { NavLink } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { TrendingUp, TrendingDown, ArrowRight, Users, GraduationCap, FileText, Eye, BookOpen } from 'lucide-react';

const stats = [
  { label: 'Active Courses', value: '12', change: '+2 this month', positive: true, icon: BookOpen, color: 'bg-blue-500/10 text-blue-400' },
  { label: 'Open Quotes', value: '7', change: '-3 vs last week', positive: false, icon: FileText, color: 'bg-amber-500/10 text-amber-400' },
  { label: 'New Leads', value: '24', change: '+5 this week', positive: true, icon: Users, color: 'bg-emerald-500/10 text-emerald-400' },
  { label: 'Total Enrolled', value: '1,248', change: '+32 new', positive: true, icon: GraduationCap, color: 'bg-indigo-500/10 text-indigo-400' },
];

const recentQuotes = [
  { course: 'Health & Physical Education', quote: 'Q-1042', student: 'J. Beckett', amount: '$3,200', status: 'DRAFT' as const },
  { course: 'English for Academic Purposes', quote: 'Q-1038', student: 'M. Okafor', amount: '$4,800', status: 'PENDING' as const },
  { course: 'Business Management', quote: 'Q-1035', student: 'A. Nguyen', amount: '$3,600', status: 'IN_PROGRESS' as const },
  { course: 'IT & Computer Science', quote: 'Q-1031', student: 'R. Patel', amount: '$2,900', status: 'APPROVED' as const },
  { course: 'Biology Foundation', quote: 'Q-1028', student: 'S. Kim', amount: '$2,900', status: 'REJECTED' as const },
];

const quickActions = [
  { label: 'Create Quote', desc: 'New quote request', href: '/quotes', primary: true, icon: FileText },
  { label: 'Add Student', desc: 'Register a lead', href: '/students', primary: false, icon: Users, accentColor: 'emerald' },
  { label: 'View Reports', desc: 'Analytics & insights', href: '#', primary: false, icon: Eye, accentColor: 'amber' },
  { label: 'Manage Courses', desc: 'Catalog management', href: '/courses', primary: false, icon: GraduationCap, accentColor: 'violet' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted mt-0.5">Overview of your education platform activity</p>
      </div>

      {/* Stats cards — clean, spacious, clear hierarchy */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5 card-hoverable">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${s.color}`}>
                <s.icon className="w-[18px] h-[18px]" />
              </div>
              <span className={`flex items-center gap-1 text-xs font-medium ${s.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                {s.positive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {s.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground leading-none">{s.value}</p>
            <p className="text-sm text-muted mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Quick Actions — one primary, rest are clean outlined cards */}
      <div>
        <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((a) => {
            if (a.primary) {
              return (
                <NavLink
                  key={a.label}
                  to={a.href}
                  style={{ textDecoration: 'none' }}
                >
                  <div className="bg-primary text-white flex flex-col gap-1.5 p-4 rounded-xl group shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all cursor-pointer">
                    <div className="flex items-center gap-2">
                      <a.icon className="w-4 h-4" />
                      <span className="text-sm font-semibold">{a.label}</span>
                    </div>
                    <span className="text-xs opacity-80">{a.desc}</span>
                    <ArrowRight className="w-4 h-4 self-end opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ml-auto" />
                  </div>
                </NavLink>
              );
            }
            const accentMap: Record<string, string> = {
              emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/15',
              amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/15',
              violet: 'text-violet-400 bg-violet-500/10 border-violet-500/20 hover:bg-violet-500/15',
            };
            const cls = accentMap[a.accentColor || 'emerald'] || 'text-foreground bg-card border-border/70 hover:bg-white/5';
            return (
              <NavLink
                key={a.label}
                to={a.href}
                style={{ textDecoration: 'none' }}
              >
                <div className={`${cls} flex flex-col gap-1.5 p-4 rounded-xl border group transition-all hover:shadow-sm cursor-pointer`}>
                  <div className="flex items-center gap-2">
                    <a.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{a.label}</span>
                  </div>
                  <span className="text-xs opacity-70">{a.desc}</span>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Recent Quotes table — cleaner styling */}
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border/60">
          <h2 className="text-sm font-semibold text-foreground">Recent Quotes</h2>
          <Badge variant="outline" className="text-[11px]">Last 5</Badge>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Quote Ref</TableHead>
              <TableHead>Student</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentQuotes.map((r) => (
              <TableRow key={r.quote}>
                <TableCell className="font-medium max-w-[200px] truncate">{r.course}</TableCell>
                <TableCell className="font-mono text-xs text-muted">{r.quote}</TableCell>
                <TableCell>{r.student}</TableCell>
                <TableCell className="text-right font-semibold tabular-nums">{r.amount}</TableCell>
                <TableCell>
                  <Badge variant={
                    r.status === 'APPROVED' ? 'success' :
                    r.status === 'REJECTED' ? 'destructive' :
                    r.status === 'PENDING' ? 'warning' :
                    r.status === 'IN_PROGRESS' ? 'info' :
                    'secondary'
                  }>
                    {r.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Activity + Notifications side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Activity Feed */}
        <Card className="lg:col-span-3">
          <div className="px-5 pt-4 pb-2">
            <h2 className="text-sm font-semibold text-foreground">Activity Feed</h2>
          </div>
          <div className="px-5 pb-4 space-y-0 divide-y divide-border/40">
            {[
              { event: 'Quote Q-1042 created by J. Beckett', dot: 'bg-blue-500', time: '10 min ago' },
              { event: 'Student M. Okafor moved to QUALIFIED', dot: 'bg-emerald-500', time: '25 min ago' },
              { event: 'Course BIO101 updated — schedule changed', dot: 'bg-amber-500', time: '1 hour ago' },
              { event: 'Payment $4,800 received from A. Nguyen', dot: 'bg-emerald-500', time: '2 hours ago' },
              { event: 'New enrollment: R. Patel in HLTH101', dot: 'bg-violet-500', time: '3 hours ago' },
            ].map((item, i) => (
              <div key={i} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${item.dot}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground">{item.event}</p>
                    <p className="text-[11px] text-muted mt-0.5">{item.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Notifications */}
        <Card className="lg:col-span-2">
          <div className="px-5 pt-4 pb-2">
            <h2 className="text-sm font-semibold text-foreground">Notifications</h2>
          </div>
          <div className="px-5 pb-4 space-y-2.5">
            {[
              { title: 'Payment due', desc: 'Q-1038 payment expires in 3 days', urgent: true },
              { title: 'New lead', desc: 'K. Sharma showed interest in ENG101', urgent: false },
              { title: 'Schedule update', desc: 'BIO101 moved to next semester', urgent: false },
            ].map((n, i) => (
              <div key={i} className={`rounded-lg p-3 border ${n.urgent ? 'bg-red-500/10 border-red-500/20' : 'bg-white/5 border-border/60'}`}>
                <div className="flex items-start gap-2.5">
                  <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${n.urgent ? 'bg-red-400' : 'bg-muted'}`} />
                  <div className="min-w-0">
                    <p className={`text-sm font-medium ${n.urgent ? 'text-red-400' : 'text-foreground'}`}>{n.title}</p>
                    <p className={`text-xs mt-0.5 ${n.urgent ? 'text-red-300/80' : 'text-muted'}`}>{n.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
