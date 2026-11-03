'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Calendar, MapPin, Clock, DollarSign, Users, BookOpen, Globe, Star, Shield, CheckCircle, ArrowLeft, Download, FileText, ExternalLink, AlertTriangle, Info, Lock, Monitor, Building2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';

interface CourseDetail { title: string; description: string; items: string[] }

const course: CourseDetail = {
  title: 'C2 - EAL (English as an Additional Language)',
  description: 'A comprehensive English language program designed for students whose first language is not English. The course focuses on developing all four language skills: reading, writing, speaking, and listening.',
  items: [
    'Australian VET Quality Assurance (VAQA) accredited',
    '100% online or on-campus delivery available',
    'Small class sizes (max 15 students)',
    'Experienced native English speaking instructors',
    'Career support and pathway assistance',
    '20 hours classroom + 10 hours online weekly',
  ],
};

const feeSummary = [
  { label: 'Tuition Fee', value: '$2,400', note: 'Per 10 weeks', icon: DollarSign, color: 'from-indigo-500 to-violet-500' },
  { label: 'Enrolment Fee', value: '$750', note: 'Registration & admin', icon: CheckCircle, color: 'from-emerald-500 to-teal-500' },
  { label: 'Material Fee', value: '$150', note: 'Course materials & books', icon: BookOpen, color: 'from-amber-500 to-orange-500' },
];

const keyFacts = [
  { label: 'Provider Name', value: 'Nikkles Education Services', icon: Building2, color: 'border-indigo-500/20 bg-indigo-500/5' },
  { label: 'Course Code', value: 'C2', icon: FileText, color: 'border-amber-500/20 bg-amber-500/5' },
  { label: 'Course Category', value: 'ELICOS', icon: BookOpen, color: 'border-emerald-500/20 bg-emerald-500/5' },
  { label: 'Study Hours', value: '20 hrs/wk', icon: Clock, color: 'border-amber-500/20 bg-amber-500/5' },
  { label: 'Course Duration', value: '12 - 24 weeks', icon: Calendar, color: 'border-sky-500/20 bg-sky-500/5' },
  { label: 'Skipping Levels Allowed', value: 'Yes', icon: CheckCircle, color: 'border-emerald-500/20 bg-emerald-500/5' },
];

const pricingPlans = [
  { name: 'Standard', pricePerWeek: 640, duration: '10 weeks', durationLabel: '10 wks', isSelected: true },
  { name: 'Premium', pricePerWeek: 720, duration: '12 weeks', durationLabel: '12 wks', isSelected: false },
  { name: 'Express', pricePerWeek: 800, duration: '14 weeks', durationLabel: '14 wks', isSelected: false },
];

export default function CourseDetails() {
  const navigate = useNavigate();
  const [chosenPlan, setChosenPlan] = useState(pricingPlans[0]);
  const [studyingMode, setStudyingMode] = useState('Online');
  const [promotions, setPromotions] = useState<{ promoName: string; selected: boolean }[]>([
    { promoName: 'Q1 LATAM & SE Asia Special', selected: true },
    { promoName: 'Standard Rate', selected: false },
  ]);
  const [studentOutcomes, setStudentOutcomes] = useState([
    { name: 'Sarah M.', outcome: 'Visa refused - incomplete docs' },
    { name: 'James W.', outcome: 'Visa refused - wrong docs' },
    { name: 'Emma L.', outcome: 'Visa refused - inadequate income' },
  ]);

  const selectedDuration = parseInt(chosenPlan.duration, 10);
  const selectedPrice = chosenPlan.pricePerWeek * selectedDuration;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}><ArrowLeft className="w-3.5 h-3.5" /> Back</Button>
        <div className="flex-1" />
        <div className="flex items-center gap-2 text-xs text-white/40">
          <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> VAQA Accredited</span>
          <span className="flex items-center gap-1"><Star className="w-3 h-3" /> 4.8 rating</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-indigo-500/10 via-card to-violet-500/5 rounded-2xl border border-indigo-500/10 p-6">
            <h1 className="text-2xl font-bold text-foreground">{course.title}</h1>
            <p className="text-sm text-white/50 mt-2 max-w-3xl">{course.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {['VAQA Accredited', '100% Online', 'Max 15 students', 'Career Support'].map(tag => (
                <Badge key={tag} variant="default" className="text-[10px]">{tag}</Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {feeSummary.map(f => (
              <Card key={f.label} className="p-5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-3`}>
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm text-white/40 mb-0.5">{f.label}</p>
                <p className="text-lg font-bold text-foreground">{f.value}</p>
                <p className="text-[11px] text-white/30">{f.note}</p>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {keyFacts.map(f => (
              <Card key={f.label} className={`p-4 border ${f.color}`}>
                <f.icon className="w-4 h-4 text-white/40 mb-1.5" />
                <p className="text-xs text-white/30">{f.label}</p>
                <p className="text-sm font-semibold text-foreground mt-0.5">{f.value}</p>
              </Card>
            ))}
          </div>

          <Card className="p-5 border-border/70">
            <h3 className="text-base font-semibold text-foreground mb-4">Case Studies</h3>
            <div className="space-y-4">
              {studentOutcomes.map((s, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.name}</p>
                    <p className="text-xs text-white/40">{s.outcome}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {pricingPlans.map(plan => {
              const isSelected = chosenPlan.name === plan.name;
              return (
                <div
                  key={plan.name}
                  className={`rounded-xl cursor-pointer transition-all ${isSelected ? 'ring-1 ring-indigo-500/40' : ''}`}
                  onClick={() => setChosenPlan(plan)}
                >
                  <Card className={`p-4 ${isSelected ? 'border-indigo-500/40 bg-indigo-500/5' : 'border-border/70 hover:border-indigo-500/20'}`}>
                    <h3 className="text-sm font-semibold text-foreground">{plan.name}</h3>
                    <p className="text-2xl font-bold text-foreground mt-1">{formatCurrency(plan.pricePerWeek)}/wk</p>
                    <p className="text-xs text-white/40">{plan.duration}</p>
                    <div className="mt-3 w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${isSelected ? 'bg-indigo-500' : 'bg-indigo-500/30'}`} style={{ width: '100%' }} />
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>

          <Card className="p-5 border-border/70">
            <h3 className="text-base font-semibold text-foreground mb-4">Study Options</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Online', 'On-Campus'].map(mode => (
                <button
                  key={mode}
                  onClick={() => setStudyingMode(mode)}
                  className={`p-4 rounded-xl border text-left transition-all ${studyingMode === mode ? 'border-indigo-500/30 bg-indigo-500/5' : 'border-border/70 hover:border-indigo-500/20'}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className={`w-4 h-4 ${studyingMode === mode ? 'text-indigo-400' : 'text-white/40'}`} />
                    <span className="font-medium text-foreground">{mode}</span>
                  </div>
                  <p className="text-xs text-white/40 mt-1">{mode === 'Online' ? 'Fully remote with live tutor support' : 'Attend classes at our Sydney HQ'}</p>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-5 border-border/70">
            <h3 className="text-base font-semibold text-foreground mb-4">Available Promotions</h3>
            <div className="space-y-2">
              {promotions.map(p => (
                <label key={p.promoName} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all">
                  <input type="checkbox" checked={p.selected} onChange={() => setPromotions(ps => ps.map(x => x.promoName === p.promoName ? { ...x, selected: !x.selected } : x))} className="rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500/20" />
                  <span className={`text-sm font-medium ${p.selected ? 'text-foreground' : 'text-white/40'}`}>{p.promoName}</span>
                </label>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="p-5 border-border/70">
            <h3 className="text-base font-semibold text-foreground mb-4">Prerequisites</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Language Requirement', value: 'IELTS overall 4.5 or equivalent', icon: Lock } as const,
                { label: 'Enrollment', value: 'New and current students', icon: Users } as const,
                { label: 'Study Mode', value: 'Online or on-campus', icon: Monitor } as const,
              ].map(item => (
                <li key={item.label} className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="w-3 h-3 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-white/40">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-5 border-border/70">
            <h3 className="text-base font-semibold text-foreground mb-3">General English Courses</h3>
            <div className="space-y-2">
              {[
                { name: 'Beginner', code: 'ELICOS-002', pace: '4 hrs/wk' },
                { name: 'Pre-Intermediate', code: 'ELICOS-003', pace: '4 hrs/wk' },
                { name: 'Intermediate', code: 'ELICOS-INT', pace: '4 hrs/wk' },
                { name: 'Upper-Intermediate', code: 'ELICOS-UPPER', pace: '4 hrs/wk' },
                { name: 'Advanced', code: 'ELICOS-ADV', pace: '4 hrs/wk' },
              ].map(c => (
                <div key={c.code} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <div>
                    <p className="text-sm font-medium text-foreground">{c.name}</p>
                    <p className="text-[11px] text-white/30">{c.code}</p>
                  </div>
                  <span className="text-xs text-white/40">{c.pace}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function formatCurrency(n: number) {
  return '$' + Math.round(n).toLocaleString('en-AU');
}
