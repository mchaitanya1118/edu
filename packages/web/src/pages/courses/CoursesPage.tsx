import React, { useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  BookOpen,
  Plus,
  Search,
  Sparkles,
  MapPin,
  Clock,
  DollarSign,
  X,
  CheckCircle2,
  Sliders,
  Percent,
  TrendingUp,
  ShieldCheck,
  Building2,
  ArrowRight,
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';
import {
  CourseCommissionEditorModal,
  CourseCommissionConfig,
} from '../../components/courses/CourseCommissionEditorModal';

export type CourseItem = {
  id: string;
  name: string;
  cricosCode: string;
  nationalCode: string;
  provider: string;
  sector: 'ELICOS' | 'VET Business' | 'VET IT' | 'Higher Ed';
  campuses: string[];
  durationWeeks: number;
  standardFee: number;
  promoFee: number;
  promoLabel: string;
  materialFee: number;
  commissionRate: number; // default base percentage, e.g. 22
  tier1Rate: number; // e.g. 25
  platinumRate: number; // e.g. 28
  basis: 'Net Tuition' | 'Gross Standard Tuition' | 'Fixed AUD per Student';
  schedule: '50% CoE / 50% Census' | '100% on Census Date' | 'Trimester Pro-Rata';
  agreementRef: string;
  intakeBonusPercent: number;
  notes?: string;
};

const INITIAL_COURSES: CourseItem[] = [
  {
    id: 'CRS-01',
    name: 'General English (Beginner to Advanced)',
    cricosCode: '098412B',
    nationalCode: 'ELICOS-GE',
    provider: 'Australian Pacific College',
    sector: 'ELICOS',
    campuses: ['Sydney CBD', 'Melbourne', 'Brisbane'],
    durationWeeks: 20,
    standardFee: 7000,
    promoFee: 5600,
    promoLabel: '20% Q3 Scholarship ($280/wk)',
    materialFee: 200,
    commissionRate: 25,
    tier1Rate: 28,
    platinumRate: 30,
    basis: 'Net Tuition',
    schedule: '50% CoE / 50% Census',
    agreementRef: 'APC-ELICOS-2026-T1',
    intakeBonusPercent: 2,
    notes: '25% base commission across all 20-week English enrolments.',
  },
  {
    id: 'CRS-02',
    name: 'Diploma of Leadership and Management',
    cricosCode: '104112A',
    nationalCode: 'BSB50420',
    provider: 'Australian Pacific College',
    sector: 'VET Business',
    campuses: ['Sydney CBD', 'Melbourne', 'Brisbane'],
    durationWeeks: 52,
    standardFee: 8000,
    promoFee: 6800,
    promoLabel: '15% Regional & CBD Bursary',
    materialFee: 0,
    commissionRate: 22,
    tier1Rate: 25,
    platinumRate: 28,
    basis: 'Net Tuition',
    schedule: '50% CoE / 50% Census',
    agreementRef: 'APC-BSB50420-2026-T1',
    intakeBonusPercent: 3,
    notes: 'Preferred VET management stream. High visa conversion rate.',
  },
  {
    id: 'CRS-03',
    name: 'Certificate IV in Marketing and Communication',
    cricosCode: '105881E',
    nationalCode: 'BSB40820',
    provider: 'Greenwich College Australia',
    sector: 'VET Business',
    campuses: ['Sydney', 'Melbourne', 'Perth'],
    durationWeeks: 40,
    standardFee: 7600,
    promoFee: 6400,
    promoLabel: '$1,200 Tuition Waiver',
    materialFee: 150,
    commissionRate: 20,
    tier1Rate: 22,
    platinumRate: 25,
    basis: 'Net Tuition',
    schedule: '50% CoE / 50% Census',
    agreementRef: 'GRW-BSB40820-2026-T1',
    intakeBonusPercent: 0,
    notes: '20% base agency rate with +2% bonus upon 5 enrolled students.',
  },
  {
    id: 'CRS-04',
    name: 'Advanced Diploma of Information Technology',
    cricosCode: '108721M',
    nationalCode: 'ICT60220',
    provider: 'ILSC Greystone College',
    sector: 'VET IT',
    campuses: ['Sydney CBD', 'Brisbane', 'Adelaide'],
    durationWeeks: 78,
    standardFee: 10400,
    promoFee: 9200,
    promoLabel: 'Free Enrolment + Material Waiver',
    materialFee: 0,
    commissionRate: 22,
    tier1Rate: 25,
    platinumRate: 28,
    basis: 'Net Tuition',
    schedule: '50% CoE / 50% Census',
    agreementRef: 'ILSC-ICT60220-2026-T1',
    intakeBonusPercent: 0,
    notes: 'High demand telecommunications & cloud networking specialization.',
  },
];

export default function CoursesPage() {
  const { toast } = useToast();
  const [courses, setCourses] = useState<CourseItem[]>(INITIAL_COURSES);
  const [sectorFilter, setSectorFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCommissionCourse, setEditingCommissionCourse] = useState<CourseItem | null>(null);

  // Add course form states
  const [newName, setNewName] = useState('');
  const [newCricos, setNewCricos] = useState('');
  const [newStandardFee, setNewStandardFee] = useState('8400');
  const [newPromoFee, setNewPromoFee] = useState('7200');
  const [newCommissionRate, setNewCommissionRate] = useState<number>(22);
  const [newTier1Rate, setNewTier1Rate] = useState<number>(25);

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const promo = Number(newPromoFee) || 7200;
    const created: CourseItem = {
      id: `CRS-0${courses.length + 1}`,
      name: newName,
      cricosCode: newCricos || '109442K',
      nationalCode: 'BSB60420',
      provider: 'Australian Pacific College',
      sector: 'VET Business',
      campuses: ['Sydney CBD', 'Melbourne'],
      durationWeeks: 52,
      standardFee: Number(newStandardFee) || 8400,
      promoFee: promo,
      promoLabel: 'Launch Scholarship Applied',
      materialFee: 0,
      commissionRate: newCommissionRate,
      tier1Rate: newTier1Rate,
      platinumRate: newTier1Rate + 3,
      basis: 'Net Tuition',
      schedule: '50% CoE / 50% Census',
      agreementRef: `APC-${newCricos || '109442K'}-2026`,
      intakeBonusPercent: 0,
      notes: 'New accredited course publication with configured agency commission.',
    };
    setCourses([created, ...courses]);
    setNewName('');
    setNewCricos('');
    setShowAddModal(false);
    toast(`Published ${created.name} (CRICOS ${created.cricosCode}) with ${newCommissionRate}% Agent Commission`, 'success');
  };

  const handleSaveCommission = (updated: CourseCommissionConfig) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === updated.courseId
          ? {
              ...c,
              commissionRate: updated.commissionRate,
              tier1Rate: updated.tier1Rate || c.tier1Rate,
              platinumRate: updated.platinumRate || c.platinumRate,
              basis: updated.basis,
              schedule: updated.schedule,
              agreementRef: updated.agreementRef,
              intakeBonusPercent: updated.intakeBonusPercent,
              notes: updated.notes,
            }
          : c
      )
    );
    setEditingCommissionCourse(null);
  };

  const filtered = courses.filter((c) => {
    const matchesSector = sectorFilter === 'All' || c.sector === sectorFilter;
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.cricosCode.toLowerCase().includes(search.toLowerCase()) ||
      c.provider.toLowerCase().includes(search.toLowerCase());
    return matchesSector && matchesSearch;
  });

  const avgCommission = (courses.reduce((sum, c) => sum + c.commissionRate, 0) / courses.length).toFixed(1);

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="info">CRICOS National Register &amp; ESOS Standard 4</Badge>
              <span className="text-xs text-slate-400">Institutional Commission Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              CRICOS Courses &amp; Agent Commission Schedules
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Publish accredited courses, manage promotional scholarship pricing, and customize agency recruitment commission rates per course.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button onClick={() => setShowAddModal(true)} className="gap-1.5">
              <Plus className="w-4 h-4" />
              Publish CRICOS Course
            </Button>
          </div>
        </div>

        {/* 4 School Commission Summary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card className="p-5 border-l-4 border-l-blue-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Published CRICOS Courses
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-bold text-slate-900">{courses.length}</span>
              <Badge variant="info">Active</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">Across ELICOS, VET Business &amp; IT</p>
          </Card>

          <Card className="p-5 border-l-4 border-l-emerald-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Average Agency Commission
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-bold text-emerald-700">{avgCommission}%</span>
              <Badge variant="success">Standard Base</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">Weighted across all approved qualifications</p>
          </Card>

          <Card className="p-5 border-l-4 border-l-purple-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Preferred Agency Tier
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-bold text-purple-700">25.0%</span>
              <Badge variant="purple">Tier-1 Volume</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">Awarded upon &gt;5 enrolments annually</p>
          </Card>

          <Card className="p-5 border-l-4 border-l-amber-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Disbursement Schedule
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-xl font-bold text-amber-700">50% / 50%</span>
              <Badge variant="warning">Census Cleared</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">Initial deposit &amp; Term 2 census clearance</p>
          </Card>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-xl w-fit">
            {['All', 'ELICOS', 'VET Business', 'VET IT'].map((sec) => (
              <button
                key={sec}
                onClick={() => setSectorFilter(sec)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  sectorFilter === sec
                    ? 'bg-white text-blue-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search course title or CRICOS code..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>

        {/* Course Cards with Integrated Commission Section & School Edit Option */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((course) => {
            const calculatedPerStudent = Math.round((course.promoFee * course.commissionRate) / 100);
            const calculatedTier1 = Math.round((course.promoFee * course.tier1Rate) / 100);

            return (
              <Card
                key={course.id}
                className="p-6 flex flex-col justify-between hover:border-blue-300 transition-all shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Badge variant="info">{course.sector}</Badge>
                      <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        CRICOS {course.cricosCode}
                      </span>
                    </div>
                    <Badge variant="success">{course.promoLabel}</Badge>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{course.name}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">{course.provider}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {course.durationWeeks} Weeks
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {course.campuses.join(', ')}
                    </span>
                  </div>

                  {/* High Visibility Course Commission Box for Schools */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-50/90 via-teal-50/60 to-blue-50/60 border border-emerald-300/80 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4 text-emerald-600" />
                        Agent Commission for this Course
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-600 text-white font-mono">
                          {course.commissionRate}% Base
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700 font-mono">
                          {course.tier1Rate}% Tier-1
                        </span>
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between text-slate-700 pt-1">
                      <span>Per Enrolled Student ({course.commissionRate}%):</span>
                      <span className="font-mono font-bold text-sm text-emerald-700">
                        +A${calculatedPerStudent.toLocaleString()} AUD
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-emerald-200/70">
                      <span>Basis: <strong>{course.basis}</strong> ({course.schedule})</span>
                      <span className="font-mono text-slate-400">{course.agreementRef}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions: Tuition & Edit Commission */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Promotional Net Tuition</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-emerald-700">
                        ${course.promoFee.toLocaleString()} AUD
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ${course.standardFee.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* The School Commission Edit Action */}
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setEditingCommissionCourse(course)}
                      className="gap-1.5 border-emerald-300 text-emerald-800 bg-emerald-50 hover:bg-emerald-100"
                      title="Edit agency commission schedule for this course"
                    >
                      <Sliders className="w-3.5 h-3.5 text-emerald-600" />
                      Edit Commission
                    </Button>

                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        toast(`Copied CRICOS ${course.cricosCode} pricing & ${course.commissionRate}% commission to Quote Builder`, 'success')
                      }
                    >
                      Use in Quote
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Modal: Publish New CRICOS Course with Commission Fields */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-6 space-y-5 bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900">Publish New CRICOS Course</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleAddCourse} className="space-y-4">
                <Input
                  label="Course Title"
                  placeholder="e.g. Advanced Diploma of Leadership & Management"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                />
                <Input
                  label="CRICOS Course Code"
                  placeholder="e.g. 109442K"
                  value={newCricos}
                  onChange={(e) => setNewCricos(e.target.value)}
                  required
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Standard Tuition (AUD)"
                    type="number"
                    value={newStandardFee}
                    onChange={(e) => setNewStandardFee(e.target.value)}
                  />
                  <Input
                    label="Promo Tuition (AUD)"
                    type="number"
                    value={newPromoFee}
                    onChange={(e) => setNewPromoFee(e.target.value)}
                  />
                </div>

                {/* Course Commission Configuration Inputs */}
                <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-2 text-xs">
                  <span className="font-bold text-emerald-950 block">Set Agent Commission Rates for this Course</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                        Base Commission (%)
                      </label>
                      <input
                        type="number"
                        min="10"
                        max="40"
                        value={newCommissionRate}
                        onChange={(e) => setNewCommissionRate(Number(e.target.value))}
                        className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-lg font-mono font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                        Preferred Tier-1 (%)
                      </label>
                      <input
                        type="number"
                        min="15"
                        max="45"
                        value={newTier1Rate}
                        onChange={(e) => setNewTier1Rate(Number(e.target.value))}
                        className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-lg font-mono font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-emerald-800">
                    Estimated agent reward: A${Math.round(((Number(newPromoFee) || 7200) * newCommissionRate) / 100).toLocaleString()} AUD per student enrolment.
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <Button type="button" variant="secondary" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Publish Course &amp; Commission</Button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {/* Modal: Edit Course Commission by School */}
        {editingCommissionCourse && (
          <CourseCommissionEditorModal
            isOpen={Boolean(editingCommissionCourse)}
            config={{
              courseId: editingCommissionCourse.id,
              courseName: editingCommissionCourse.name,
              cricosCode: editingCommissionCourse.cricosCode,
              provider: editingCommissionCourse.provider,
              tuitionFee: editingCommissionCourse.promoFee,
              commissionRate: editingCommissionCourse.commissionRate,
              tier1Rate: editingCommissionCourse.tier1Rate,
              platinumRate: editingCommissionCourse.platinumRate,
              basis: editingCommissionCourse.basis,
              schedule: editingCommissionCourse.schedule,
              agreementRef: editingCommissionCourse.agreementRef,
              intakeBonusPercent: editingCommissionCourse.intakeBonusPercent,
              notes: editingCommissionCourse.notes,
            }}
            onClose={() => setEditingCommissionCourse(null)}
            onSave={handleSaveCommission}
          />
        )}
      </div>
    </AppLayout>
  );
}
