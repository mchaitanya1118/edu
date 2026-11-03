import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  MapPin,
  BookOpen,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  Search,
  Eye,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

type PartnerSchool = {
  id: string;
  name: string;
  rto: string;
  cricos: string;
  states: string[];
  sectors: string[];
  campuses: string[];
  coursesCount: number;
  commissionRate: number;
  commissionTier: string;
  turnaroundHours: number;
  activeScholarship: string;
  entryIelts: string;
  nextIntake: string;
  highlights: string[];
};

const PARTNER_SCHOOLS: PartnerSchool[] = [
  {
    id: 'apc',
    name: 'Australian Pacific College (APC)',
    rto: '45123',
    cricos: '03812M',
    states: ['NSW', 'VIC', 'QLD'],
    sectors: ['ELICOS', 'VET Business', 'VET IT'],
    campuses: ['Sydney CBD', 'Manly Beach', 'Melbourne', 'Brisbane', 'Gold Coast'],
    coursesCount: 18,
    commissionRate: 22,
    commissionTier: '22% Preferred Partner',
    turnaroundHours: 24,
    activeScholarship: 'Up to 20% Off ELICOS & VET Diplomas',
    entryIelts: 'IELTS 5.5 (or Internal Placement Test)',
    nextIntake: '14 Jul 2026 & Weekly Monday ELICOS',
    highlights: ['Weekly Monday ELICOS Intakes', 'No Material Fee Promo', '24h Offer Turnaround'],
  },
  {
    id: 'greenwich',
    name: 'Greenwich English & Management College',
    rto: '91153',
    cricos: '02672K',
    states: ['NSW', 'VIC', 'QLD', 'WA'],
    sectors: ['ELICOS', 'VET Business', 'Higher Ed Pathways'],
    campuses: ['Sydney Pitt St', 'Melbourne Spencer St', 'Brisbane', 'Perth'],
    coursesCount: 22,
    commissionRate: 20,
    commissionTier: '20% Tier-1 Agency',
    turnaroundHours: 48,
    activeScholarship: '$1,500 Regional Campus Bursary',
    entryIelts: 'IELTS 5.5 / PTE 42 Equivalent',
    nextIntake: '03 Aug 2026',
    highlights: ['Cambridge Exam Testing Center', 'Evening & Weekend Timetables', 'Pathway to Torrens Uni'],
  },
  {
    id: 'ilsc',
    name: 'ILSC & Greystone College Australia',
    rto: '31564',
    cricos: '02137M',
    states: ['NSW', 'VIC', 'QLD', 'SA'],
    sectors: ['ELICOS', 'VET Business', 'VET IT'],
    campuses: ['Sydney', 'Melbourne', 'Brisbane', 'Adelaide'],
    coursesCount: 15,
    commissionRate: 20,
    commissionTier: '20% Standard Agency',
    turnaroundHours: 24,
    activeScholarship: 'Free Enrolment Fee ($250 Value)',
    entryIelts: 'IELTS 5.5 / Duolingo 95',
    nextIntake: '07 Sep 2026',
    highlights: ['Adelaide Regional Visa Bonus Points', 'Co-op Internship Placements'],
  },
];

export default function PartnerSchoolsPortalPage() {
  const { toast } = useToast();
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'commission' | 'courses' | 'sla'>('commission');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedSchool, setInspectedSchool] = useState<PartnerSchool | null>(null);

  const filteredSchools = PARTNER_SCHOOLS.filter((school) => {
    const matchesState = selectedState === 'All' || school.states.includes(selectedState);
    const matchesSector = selectedSector === 'All' || school.sectors.includes(selectedSector);
    const matchesSearch =
      school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.cricos.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesSector && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'commission') return b.commissionRate - a.commissionRate;
    if (sortBy === 'courses') return b.coursesCount - a.coursesCount;
    return a.turnaroundHours - b.turnaroundHours;
  });

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="info">CRICOS Verified Directory</Badge>
              <span className="text-xs text-slate-400">Direct PRISMS Integration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Partner Institutions &amp; Campuses
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Explore accredited Australian RTOs, compare live scholarships, and inspect commission &amp; intake terms.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link to="/courses">
              <Button variant="secondary">
                <BookOpen className="w-4 h-4" />
                Browse All Courses
              </Button>
            </Link>
            <Link to="/quotes">
              <Button>
                Build Student Quote
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Multi-Option Filter & Sort Bar */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {/* State Filter */}
            <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-xl">
              {['All', 'NSW', 'VIC', 'QLD', 'WA', 'SA'].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedState(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedState === st
                      ? 'bg-white text-blue-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {st === 'All' ? 'All States' : st}
                </button>
              ))}
            </div>

            {/* Sector Select */}
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700"
            >
              <option value="All">Sector: All Streams</option>
              <option value="ELICOS">ELICOS English</option>
              <option value="VET Business">VET Business &amp; Leadership</option>
              <option value="VET IT">VET Information Tech</option>
              <option value="Higher Ed Pathways">Higher Ed Pathways</option>
            </select>

            {/* Sort By Select */}
            <div className="inline-flex items-center gap-1.5 h-9 rounded-xl border border-slate-200 bg-white px-3">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'commission' | 'courses' | 'sla')}
                className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none"
              >
                <option value="commission">Sort: Highest Commission</option>
                <option value="courses">Sort: Most CRICOS Courses</option>
                <option value="sla">Sort: Fastest Offer SLA</option>
              </select>
            </div>
          </div>

          <div className="relative w-full xl:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search provider or CRICOS code..."
              className="w-full h-9 bg-white border border-slate-200 rounded-xl pl-9 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>

        {/* School Cards */}
        <div className="grid grid-cols-1 gap-6">
          {filteredSchools.map((school) => (
            <Card key={school.id} className="p-6 hover:border-blue-300 transition-all">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                      {school.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-lg font-bold text-slate-900">{school.name}</h2>
                        <Badge variant="success">CRICOS {school.cricos}</Badge>
                        <Badge variant="default">RTO #{school.rto}</Badge>
                        <Badge variant="info">{school.turnaroundHours}h Offer SLA</Badge>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        Campuses: {school.campuses.join(' • ')}
                      </p>
                    </div>
                  </div>

                  {/* Promo Banner */}
                  <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-900">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Active Scholarship: {school.activeScholarship}</span>
                    </div>
                    <Badge variant="warning">{school.commissionTier}</Badge>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {school.highlights.map((h) => (
                      <span
                        key={h}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
                  <div className="text-left lg:text-right">
                    <span className="text-2xl font-bold text-slate-900">{school.coursesCount}</span>
                    <p className="text-xs text-slate-500">CRICOS Courses</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setInspectedSchool(school)}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Inspect School
                    </Button>
                    <Link to="/quotes">
                      <Button size="sm">Quote Student</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Slide-Over Institution Deep-Dive Drawer */}
        {inspectedSchool && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end">
            <div className="w-full max-w-lg bg-white h-full shadow-2xl border-l border-slate-200 p-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="success">CRICOS {inspectedSchool.cricos}</Badge>
                      <Badge variant="default">RTO #{inspectedSchool.rto}</Badge>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mt-1.5">
                      {inspectedSchool.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setInspectedSchool(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                  <div>
                    <span className="text-slate-400 block">Agency Commission</span>
                    <span className="font-bold text-emerald-700">
                      {inspectedSchool.commissionTier}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Offer Turnaround</span>
                    <span className="font-bold text-slate-900">
                      {inspectedSchool.turnaroundHours} Hours SLA
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">English Entry Rule</span>
                    <span className="font-semibold text-slate-800">
                      {inspectedSchool.entryIelts}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Next Major Intake</span>
                    <span className="font-semibold text-blue-700">
                      {inspectedSchool.nextIntake}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Approved Australian Campuses
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {inspectedSchool.campuses.map((c) => (
                      <span
                        key={c}
                        className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <Button
                  variant="secondary"
                  onClick={() =>
                    toast(`Downloaded ${inspectedSchool.name} 2026 Agent Fact Sheet`, 'success')
                  }
                >
                  Download Agent Fact Sheet
                </Button>
                <Link to="/quotes">
                  <Button>Build Quote for School</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
