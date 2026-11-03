import React, { useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  Plus,
  Search,
  X,
  Eye,
  Download,
  LayoutGrid,
  List,
  CheckCircle2,
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

type StudentRecord = {
  id: string;
  name: string;
  email: string;
  nationality: string;
  passport: string;
  course: string;
  provider: string;
  campus: string;
  stage: 'Quote Sent' | 'Offer Signed' | 'CoE Issued' | 'Visa Granted';
  oshcIncluded: boolean;
  gsScore: number;
};

const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: 'STU-401',
    name: 'Mateo Silva',
    email: 'mateo.silva@gmail.com',
    nationality: 'Colombia',
    passport: 'CO9928114',
    course: 'Diploma of Leadership & Management',
    provider: 'Australian Pacific College',
    campus: 'Sydney CBD',
    stage: 'CoE Issued',
    oshcIncluded: true,
    gsScore: 94,
  },
  {
    id: 'STU-402',
    name: 'Yuki Tanaka',
    email: 'yuki.tanaka@yahoo.co.jp',
    nationality: 'Japan',
    passport: 'TK8841209',
    course: 'General English (20 Weeks)',
    provider: 'Greenwich College',
    campus: 'Melbourne',
    stage: 'Offer Signed',
    oshcIncluded: true,
    gsScore: 98,
  },
  {
    id: 'STU-403',
    name: 'Camila Rojas',
    email: 'camila.rojas@hotmail.com',
    nationality: 'Brazil',
    passport: 'BR4410922',
    course: 'Cert IV in Marketing & Communication',
    provider: 'Australian Pacific College',
    campus: 'Brisbane',
    stage: 'Quote Sent',
    oshcIncluded: false,
    gsScore: 87,
  },
  {
    id: 'STU-404',
    name: 'Arjun Nair',
    email: 'arjun.nair@outlook.com',
    nationality: 'India',
    passport: 'IN7751203',
    course: 'Advanced Diploma of IT',
    provider: 'ILSC Business College',
    campus: 'Sydney CBD',
    stage: 'Visa Granted',
    oshcIncluded: true,
    gsScore: 95,
  },
];

export default function StudentsPage() {
  const { toast } = useToast();
  const [students, setStudents] = useState<StudentRecord[]>(INITIAL_STUDENTS);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [inspectedStudent, setInspectedStudent] = useState<StudentRecord | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newNationality, setNewNationality] = useState('Brazil');
  const [newCourse, setNewCourse] = useState('Diploma of Leadership & Management');

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const created: StudentRecord = {
      id: `STU-${Math.floor(410 + Math.random() * 90)}`,
      name: newName,
      email: newEmail || 'student@educonnect.au',
      nationality: newNationality,
      passport: 'PA8831900',
      course: newCourse,
      provider: 'Australian Pacific College',
      campus: 'Sydney CBD',
      stage: 'Quote Sent',
      oshcIncluded: true,
      gsScore: 92,
    };
    setStudents([created, ...students]);
    setNewName('');
    setNewEmail('');
    setShowAddModal(false);
    toast(`${created.name} added to Enrolments CRM`, 'success');
  };

  const advanceStage = (id: string) => {
    const order: StudentRecord['stage'][] = [
      'Quote Sent',
      'Offer Signed',
      'CoE Issued',
      'Visa Granted',
    ];
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const nextIdx = Math.min(order.indexOf(s.stage) + 1, order.length - 1);
        return { ...s, stage: order[nextIdx] };
      })
    );
    toast('Student enrolment milestone advanced', 'success');
  };

  const filtered = students.filter((s) => {
    const matchesStage = stageFilter === 'All' || s.stage === stageFilter;
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.course.toLowerCase().includes(search.toLowerCase()) ||
      s.nationality.toLowerCase().includes(search.toLowerCase());
    return matchesStage && matchesSearch;
  });

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="info">Subclasses 500 &amp; 485 Ready</Badge>
              <span className="text-xs text-slate-400">PRISMS &amp; OSHC Integrated</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              International Students &amp; Enrolments CRM
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Track student applications from initial quote through Letter of Offer, PRISMS CoE, and Subclass 500 Visa grant.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="secondary"
              onClick={() => toast('Exported Students & Visa CRM Ledger (.csv)', 'success')}
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4" />
              Register New Student
            </Button>
          </div>
        </div>

        {/* Filter Bar + View Mode Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-xl w-fit flex-wrap">
            {['All', 'Quote Sent', 'Offer Signed', 'CoE Issued', 'Visa Granted'].map((st) => (
              <button
                key={st}
                onClick={() => setStageFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  stageFilter === st
                    ? 'bg-white text-blue-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search student, nationality..."
                className="w-full h-9 bg-white border border-slate-200 rounded-xl pl-9 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg cursor-pointer ${
                  viewMode === 'list' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Student Directory (List or Grid) */}
        {viewMode === 'list' ? (
          <Card className="p-0 overflow-hidden">
            <div className="divide-y divide-slate-100">
              {filtered.map((student) => (
                <div
                  key={student.id}
                  className="p-5 hover:bg-slate-50/80 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {student.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-slate-500">
                          {student.id}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">{student.name}</h3>
                        <Badge variant="default">{student.nationality}</Badge>
                        <Badge
                          variant={
                            student.stage === 'Visa Granted' || student.stage === 'CoE Issued'
                              ? 'success'
                              : student.stage === 'Offer Signed'
                              ? 'purple'
                              : 'info'
                          }
                        >
                          {student.stage}
                        </Badge>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          GS Readiness: {student.gsScore}%
                        </span>
                      </div>
                      <p className="text-xs font-medium text-slate-700">
                        {student.course} •{' '}
                        <span className="text-slate-500">
                          {student.provider} ({student.campus})
                        </span>
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {student.email} • Passport {student.passport} •{' '}
                        {student.oshcIncluded ? 'OSHC Health Cover Bundled' : 'OSHC External'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setInspectedStudent(student)}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      360° Profile
                    </Button>
                    {student.stage !== 'Visa Granted' && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => advanceStage(student.id)}
                      >
                        Advance Milestone
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((student) => (
              <Card key={student.id} className="p-5 flex flex-col justify-between space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                      {student.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{student.name}</h3>
                      <p className="text-xs text-slate-500">
                        {student.nationality} • {student.passport}
                      </p>
                    </div>
                  </div>
                  <Badge variant="success">{student.stage}</Badge>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                  <p className="font-bold text-slate-900">{student.course}</p>
                  <p className="text-slate-500">
                    {student.provider} — {student.campus}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-xs font-semibold text-emerald-700">
                    GS Score: {student.gsScore}%
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setInspectedStudent(student)}
                    >
                      Inspect
                    </Button>
                    {student.stage !== 'Visa Granted' && (
                      <Button size="sm" onClick={() => advanceStage(student.id)}>
                        Advance
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Student 360 Profile Drawer */}
        {inspectedStudent && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end">
            <div className="w-full max-w-lg bg-white h-full shadow-2xl border-l border-slate-200 p-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-600">
                      {inspectedStudent.id} • Passport {inspectedStudent.passport}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                      {inspectedStudent.name} ({inspectedStudent.nationality})
                    </h3>
                    <p className="text-xs text-slate-500">{inspectedStudent.email}</p>
                  </div>
                  <button
                    onClick={() => setInspectedStudent(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2.5 text-xs">
                  <span className="font-bold uppercase tracking-wider text-slate-400 block">
                    Subclass 500 Visa &amp; Admissions Checklist
                  </span>
                  {[
                    'Valid Passport Bio Page & National ID Verified',
                    'Genuine Student (GS) Financial Capacity Cleared',
                    'English Proficiency (IELTS 6.0 / Internal Placement) Met',
                    inspectedStudent.oshcIncluded
                      ? 'Overseas Student Health Cover (OSHC) Policy Issued'
                      : 'OSHC Policy Pending External Upload',
                  ].map((item) => (
                    <div
                      key={item}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-medium text-slate-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Button variant="secondary" onClick={() => setInspectedStudent(null)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    advanceStage(inspectedStudent.id);
                    setInspectedStudent(null);
                  }}
                >
                  Advance Enrolment Stage
                </Button>
              </div>
            </div>
          </div>
        )}

        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Register International Student</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleCreateStudent} className="space-y-4">
                <Input
                  label="Student Full Name"
                  placeholder="e.g. Sofia Martinez"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="sofia@email.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                />
                <Input
                  label="Nationality"
                  value={newNationality}
                  onChange={(e) => setNewNationality(e.target.value)}
                />
                <Input
                  label="Target CRICOS Course"
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                />
                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="secondary" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Profile</Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
