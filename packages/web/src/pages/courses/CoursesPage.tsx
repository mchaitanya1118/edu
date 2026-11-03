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
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

type CourseItem = {
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
  },
];

export default function CoursesPage() {
  const { toast } = useToast();
  const [courses, setCourses] = useState<CourseItem[]>(INITIAL_COURSES);
  const [sectorFilter, setSectorFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newName, setNewName] = useState('');
  const [newCricos, setNewCricos] = useState('');
  const [newStandardFee, setNewStandardFee] = useState('8400');
  const [newPromoFee, setNewPromoFee] = useState('7200');

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
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
      promoFee: Number(newPromoFee) || 7200,
      promoLabel: 'Launch Scholarship Applied',
      materialFee: 0,
    };
    setCourses([created, ...courses]);
    setNewName('');
    setNewCricos('');
    setShowAddModal(false);
    toast(`Published ${created.name} (CRICOS ${created.cricosCode})`, 'success');
  };

  const filtered = courses.filter((c) => {
    const matchesSector = sectorFilter === 'All' || c.sector === sectorFilter;
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.cricosCode.toLowerCase().includes(search.toLowerCase()) ||
      c.provider.toLowerCase().includes(search.toLowerCase());
    return matchesSector && matchesSearch;
  });

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="info">CRICOS National Register</Badge>
              <span className="text-xs text-slate-400">Live Tuition & Promotional Pricing</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              CRICOS Courses & Scholarship Pricing Catalog
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Publish accredited ELICOS, VET, and Higher Education programs with real-time promotional tuition rates.
            </p>
          </div>

          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4" />
            Publish CRICOS Course
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-xl w-fit">
            {['All', 'ELICOS', 'VET Business', 'VET IT'].map((sec) => (
              <button
                key={sec}
                onClick={() => setSectorFilter(sec)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
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

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((course) => (
            <Card
              key={course.id}
              className="p-6 flex flex-col justify-between hover:border-blue-300 transition-all"
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
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Promotional Tuition</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-emerald-700">
                      ${course.promoFee.toLocaleString()} AUD
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ${course.standardFee.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() =>
                    toast(`Copied CRICOS ${course.cricosCode} pricing to Quote Builder`, 'success')
                  }
                >
                  Use in Quote
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-6 space-y-5">
              <div className="flex items-center justify-between">
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
                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="secondary" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Publish Course</Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
