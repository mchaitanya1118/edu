import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Building2,
  ShieldCheck,
  Clock,
  Percent,
  GraduationCap,
  Download,
  Share2,
  FileCheck,
  Award,
  Compass,
  LayoutGrid,
  List,
  GitCompare,
  Check,
  ExternalLink,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

export type PartnerSchool = {
  id: string;
  name: string;
  shortCode: string;
  logoBg: string;
  rto: string;
  cricos: string;
  providerType: 'Private VET & ELICOS' | 'University & Higher Ed' | 'Dual Sector Institute' | 'Public TAFE';
  states: string[];
  sectors: string[];
  campuses: { name: string; state: string; isRegional: boolean; regionalCategory?: string }[];
  coursesCount: number;
  commissionRate: number; // Base %
  tier1Rate: number; // Tier 1 %
  platinumRate: number; // Platinum %
  commissionTier: string;
  turnaroundHours: number;
  activeScholarship: string;
  scholarshipValue: string;
  minWeeklyTuition: number;
  entryIelts: string;
  nextIntake: string;
  timetables: string[];
  coProcessing: 'Instant / Same-Day' | '24 Hours' | '48 Hours';
  highlights: string[];
  regionalVisaPoints: boolean;
  contactEmail: string;
  featured?: boolean;
};

export const PARTNER_SCHOOLS: PartnerSchool[] = [
  {
    id: 'apc',
    name: 'Australian Pacific College (APC)',
    shortCode: 'APC',
    logoBg: 'bg-blue-600',
    rto: '45123',
    cricos: '03812M',
    providerType: 'Dual Sector Institute',
    states: ['NSW', 'VIC', 'QLD'],
    sectors: ['ELICOS', 'VET Business', 'VET IT', 'Hospitality & Design'],
    campuses: [
      { name: 'Sydney CBD (Kent St)', state: 'NSW', isRegional: false },
      { name: 'Manly Beach', state: 'NSW', isRegional: false },
      { name: 'Melbourne (Lonsdale St)', state: 'VIC', isRegional: false },
      { name: 'Brisbane (Creek St)', state: 'QLD', isRegional: false },
      { name: 'Gold Coast (Surfers Paradise)', state: 'QLD', isRegional: true, regionalCategory: 'Category 2' },
    ],
    coursesCount: 24,
    commissionRate: 22,
    tier1Rate: 25,
    platinumRate: 28,
    commissionTier: '22% Base • 25% Preferred Tier-1',
    turnaroundHours: 24,
    activeScholarship: 'Up to 20% Off ELICOS & VET Diplomas',
    scholarshipValue: 'Save up to A$1,400',
    minWeeklyTuition: 280,
    entryIelts: 'IELTS 5.5 or APC Placement Test (Free)',
    nextIntake: '14 Jul 2026 & Weekly Monday ELICOS',
    timetables: ['Morning (8:30am - 1:00pm)', 'Evening (4:30pm - 9:00pm)', 'Weekend Intensive'],
    coProcessing: '24 Hours',
    highlights: ['Weekly Monday ELICOS intakes', 'Zero material fee promo in Gold Coast', 'Direct pathway to Torrens & CQU'],
    regionalVisaPoints: true,
    contactEmail: 'admissions@apc.edu.au',
    featured: true,
  },
  {
    id: 'greenwich',
    name: 'Greenwich English & Management College',
    shortCode: 'GRW',
    logoBg: 'bg-emerald-600',
    rto: '91153',
    cricos: '02672K',
    providerType: 'Private VET & ELICOS',
    states: ['NSW', 'VIC', 'QLD', 'WA'],
    sectors: ['ELICOS', 'VET Business', 'Higher Ed Pathways'],
    campuses: [
      { name: 'Sydney Pitt St', state: 'NSW', isRegional: false },
      { name: 'Melbourne Spencer St', state: 'VIC', isRegional: false },
      { name: 'Brisbane CBD', state: 'QLD', isRegional: false },
      { name: 'Perth (St Georges Tce)', state: 'WA', isRegional: true, regionalCategory: 'Category 2' },
    ],
    coursesCount: 28,
    commissionRate: 20,
    tier1Rate: 24,
    platinumRate: 26,
    commissionTier: '20% Base • 24% Tier-1 Agency',
    turnaroundHours: 24,
    activeScholarship: 'A$1,500 Perth & Regional Campus Bursary',
    scholarshipValue: 'A$1,500 Grant',
    minWeeklyTuition: 290,
    entryIelts: 'IELTS 5.5 / PTE 42 or Greenwich Free Test',
    nextIntake: '03 Aug 2026',
    timetables: ['Day Session', 'Evening Session', 'Hybrid 2-Day Timetable'],
    coProcessing: 'Instant / Same-Day',
    highlights: ['Cambridge Official Testing Centre', 'Evening schedules for working students', '5 Extra Points for Perth Regional'],
    regionalVisaPoints: true,
    contactEmail: 'agents@greenwichcollege.edu.au',
    featured: true,
  },
  {
    id: 'ilsc',
    name: 'ILSC & Greystone College Australia',
    shortCode: 'ILSC',
    logoBg: 'bg-indigo-600',
    rto: '31564',
    cricos: '02137M',
    providerType: 'Private VET & ELICOS',
    states: ['NSW', 'VIC', 'QLD', 'SA'],
    sectors: ['ELICOS', 'VET Business', 'VET IT'],
    campuses: [
      { name: 'Sydney George St', state: 'NSW', isRegional: false },
      { name: 'Melbourne Bourke St', state: 'VIC', isRegional: false },
      { name: 'Brisbane Adelaide St', state: 'QLD', isRegional: false },
      { name: 'Adelaide (Currie St)', state: 'SA', isRegional: true, regionalCategory: 'Category 2' },
    ],
    coursesCount: 19,
    commissionRate: 20,
    tier1Rate: 23,
    platinumRate: 25,
    commissionTier: '20% Base Agency • 23% Preferred',
    turnaroundHours: 24,
    activeScholarship: 'Free Enrolment Fee + $200 Material Waiver',
    scholarshipValue: 'A$450 Value',
    minWeeklyTuition: 300,
    entryIelts: 'IELTS 5.5 / Duolingo 95',
    nextIntake: '07 Sep 2026',
    timetables: ['Full-Time Daytime', 'Evening & Friday Masterclasses'],
    coProcessing: '24 Hours',
    highlights: ['Adelaide regional visa bonus points', 'Co-op corporate internship program', 'Global transfer between campuses'],
    regionalVisaPoints: true,
    contactEmail: 'admissions-australia@ilsceducation.com',
    featured: false,
  },
  {
    id: 'lexis',
    name: 'Lexis English & Lexis Training',
    shortCode: 'LEX',
    logoBg: 'bg-amber-600',
    rto: '41178',
    cricos: '01632D',
    providerType: 'Private VET & ELICOS',
    states: ['NSW', 'QLD', 'WA'],
    sectors: ['ELICOS', 'Hospitality & Design', 'VET Business'],
    campuses: [
      { name: 'Noosa Sunshine Coast', state: 'QLD', isRegional: true, regionalCategory: 'Category 3' },
      { name: 'Byron Bay', state: 'NSW', isRegional: true, regionalCategory: 'Category 3' },
      { name: 'Perth Scarborough Beach', state: 'WA', isRegional: true, regionalCategory: 'Category 2' },
      { name: 'Brisbane CBD', state: 'QLD', isRegional: false },
      { name: 'Sydney Manly', state: 'NSW', isRegional: false },
    ],
    coursesCount: 16,
    commissionRate: 25,
    tier1Rate: 28,
    platinumRate: 30,
    commissionTier: '25% Base • 28% Regional Champion',
    turnaroundHours: 12,
    activeScholarship: 'Coastal Lifestyle Bursary: 25% Off ELICOS',
    scholarshipValue: 'Save A$85/week',
    minWeeklyTuition: 260,
    entryIelts: 'IELTS 5.0 (VET) / Placement Test',
    nextIntake: 'Weekly Monday Starts',
    timetables: ['Morning Coastal Routine', 'Evening Timetable'],
    coProcessing: 'Instant / Same-Day',
    highlights: ['Highest ELICOS commission (25%-30%)', 'Prime beach locations with lifestyle appeal', 'Category 3 regional visa points in Noosa & Byron'],
    regionalVisaPoints: true,
    contactEmail: 'registrations@lexisenglish.com',
    featured: true,
  },
  {
    id: 'kbs',
    name: 'Kaplan Business School Australia (KBS)',
    shortCode: 'KBS',
    logoBg: 'bg-purple-600',
    rto: 'Higher Ed PRV12094',
    cricos: '02426B',
    providerType: 'University & Higher Ed',
    states: ['NSW', 'VIC', 'QLD', 'SA', 'WA'],
    sectors: ['Higher Ed Pathways', 'VET Business', 'VET IT'],
    campuses: [
      { name: 'Sydney Rocks', state: 'NSW', isRegional: false },
      { name: 'Melbourne Docklands', state: 'VIC', isRegional: false },
      { name: 'Brisbane Queen St', state: 'QLD', isRegional: false },
      { name: 'Adelaide Pulteney St', state: 'SA', isRegional: true, regionalCategory: 'Category 2' },
      { name: 'Perth West', state: 'WA', isRegional: true, regionalCategory: 'Category 2' },
    ],
    coursesCount: 32,
    commissionRate: 18,
    tier1Rate: 22,
    platinumRate: 25,
    commissionTier: '18% Degree Base • 22% Volume Tier-1',
    turnaroundHours: 48,
    activeScholarship: 'High Achievers 30% Bachelor & Master Scholarship',
    scholarshipValue: 'Up to A$8,200/yr',
    minWeeklyTuition: 380,
    entryIelts: 'IELTS 6.0 (Undergrad) / 6.5 (Postgrad)',
    nextIntake: '13 Jul 2026 (Trimester 2)',
    timetables: ['Weekday Lectures', 'Evening Trimesters', 'Accelerated Tri-Semester'],
    coProcessing: '48 Hours',
    highlights: ['TEQSA Accredited Australian Degrees', 'Post-Study Work Visa (Subclass 485) eligible', 'Career Central 94% graduate employment'],
    regionalVisaPoints: true,
    contactEmail: 'admissions@kbs.edu.au',
    featured: false,
  },
  {
    id: 'torrens',
    name: 'Torrens University Australia & Billy Blue',
    shortCode: 'TUA',
    logoBg: 'bg-rose-600',
    rto: 'Higher Ed PRV12209',
    cricos: '03389E',
    providerType: 'University & Higher Ed',
    states: ['NSW', 'VIC', 'QLD', 'SA'],
    sectors: ['Higher Ed Pathways', 'Hospitality & Design', 'VET IT', 'VET Business'],
    campuses: [
      { name: 'Sydney Surry Hills & Ultimo', state: 'NSW', isRegional: false },
      { name: 'Melbourne Flinders St', state: 'VIC', isRegional: false },
      { name: 'Brisbane Fortitude Valley', state: 'QLD', isRegional: false },
      { name: 'Adelaide Wakefield St', state: 'SA', isRegional: true, regionalCategory: 'Category 2' },
    ],
    coursesCount: 45,
    commissionRate: 18,
    tier1Rate: 20,
    platinumRate: 22,
    commissionTier: '18% Higher Ed Base • 20% Partner',
    turnaroundHours: 48,
    activeScholarship: 'Blue Sky International 25% Scholarship',
    scholarshipValue: 'Up to A$7,500/yr',
    minWeeklyTuition: 420,
    entryIelts: 'IELTS 6.0 - 6.5 / TOEFL / PTE',
    nextIntake: '21 Sep 2026',
    timetables: ['Flexible Day & Online blended', 'Studio Workshops (Design)'],
    coProcessing: '48 Hours',
    highlights: ['Billy Blue College of Design famous alumni', 'Blue Mountains International Hotel School', 'Fast-tracked Bachelor degrees'],
    regionalVisaPoints: true,
    contactEmail: 'international.admissions@torrens.edu.au',
    featured: false,
  },
  {
    id: 'tafensw',
    name: 'TAFE NSW International',
    shortCode: 'TAFE',
    logoBg: 'bg-red-700',
    rto: '90003',
    cricos: '00591E',
    providerType: 'Public TAFE',
    states: ['NSW'],
    sectors: ['VET IT', 'Hospitality & Design', 'VET Business', 'Higher Ed Pathways'],
    campuses: [
      { name: 'Sydney Ultimo', state: 'NSW', isRegional: false },
      { name: 'North Sydney St Leonards', state: 'NSW', isRegional: false },
      { name: 'Newcastle Hunter', state: 'NSW', isRegional: true, regionalCategory: 'Category 2' },
      { name: 'Wollongong Illawarra', state: 'NSW', isRegional: true, regionalCategory: 'Category 2' },
    ],
    coursesCount: 65,
    commissionRate: 15,
    tier1Rate: 18,
    platinumRate: 20,
    commissionTier: '15% Government Base • 18% Tier-1',
    turnaroundHours: 72,
    activeScholarship: 'NSW Regional Skills Bursary A$2,000',
    scholarshipValue: 'A$2,000 Bursary',
    minWeeklyTuition: 320,
    entryIelts: 'IELTS 5.5 / Academic Pathway',
    nextIntake: '20 Jul 2026 (Semester 2)',
    timetables: ['Standard Term Time (20h/wk)'],
    coProcessing: '48 Hours',
    highlights: ['Government Public Provider credential', 'State-of-the-art commercial kitchens & labs', 'Newcastle & Wollongong regional migration bonus'],
    regionalVisaPoints: true,
    contactEmail: 'tafensw.international@tafensw.edu.au',
    featured: false,
  },
  {
    id: 'anc',
    name: 'Australian National College (ANC)',
    shortCode: 'ANC',
    logoBg: 'bg-cyan-700',
    rto: '40847',
    cricos: '03310J',
    providerType: 'Private VET & ELICOS',
    states: ['VIC', 'NSW'],
    sectors: ['VET Business', 'VET IT', 'Hospitality & Design'],
    campuses: [
      { name: 'Melbourne CBD (Queen St)', state: 'VIC', isRegional: false },
      { name: 'Sydney Haymarket', state: 'NSW', isRegional: false },
    ],
    coursesCount: 14,
    commissionRate: 22,
    tier1Rate: 25,
    platinumRate: 28,
    commissionTier: '22% Base • 25% Preferred Tier-1',
    turnaroundHours: 24,
    activeScholarship: 'Early Bird Term Fee Waiver ($800)',
    scholarshipValue: 'A$800 Waiver',
    minWeeklyTuition: 220,
    entryIelts: 'IELTS 5.5 / Internal Assessment',
    nextIntake: '14 Jul 2026 & Monthly',
    timetables: ['Flexible 2-Day Timetable', 'Weekend Classes'],
    coProcessing: '24 Hours',
    highlights: ['Most affordable weekly rate ($220/wk)', 'High visa grant rate in LATAM & SE Asia', 'Free monthly CoE installments'],
    regionalVisaPoints: false,
    contactEmail: 'info@anc.vic.edu.au',
    featured: false,
  },
];

export default function PartnerSchoolsPortalPage() {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Filters
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [regionalOnly, setRegionalOnly] = useState<boolean>(false);
  const [minCommission, setMinCommission] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'commission' | 'courses' | 'sla' | 'tuition'>('commission');
  const [viewMode, setViewMode] = useState<'grid' | 'table' | 'by-state'>('grid');

  // Modals & Comparison State
  const [inspectedSchool, setInspectedSchool] = useState<PartnerSchool | null>(null);
  const [activeDossierTab, setActiveDossierTab] = useState<'overview' | 'courses' | 'commissions' | 'admissions'>('overview');
  const [comparedSchoolIds, setComparedSchoolIds] = useState<string[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  // Derived filtered & sorted list
  const filteredSchools = useMemo(() => {
    return PARTNER_SCHOOLS.filter((school) => {
      const matchesState = selectedState === 'All' || school.states.includes(selectedState);
      const matchesSector = selectedSector === 'All' || school.sectors.includes(selectedSector);
      const matchesType = selectedType === 'All' || school.providerType === selectedType;
      const matchesRegional = !regionalOnly || school.regionalVisaPoints;
      const matchesCommission = school.commissionRate >= minCommission;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        school.name.toLowerCase().includes(q) ||
        school.cricos.toLowerCase().includes(q) ||
        school.rto.toLowerCase().includes(q) ||
        school.campuses.some((c) => c.name.toLowerCase().includes(q) || c.state.toLowerCase().includes(q));

      return matchesState && matchesSector && matchesType && matchesRegional && matchesCommission && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'commission') return b.commissionRate - a.commissionRate;
      if (sortBy === 'courses') return b.coursesCount - a.coursesCount;
      if (sortBy === 'sla') return a.turnaroundHours - b.turnaroundHours;
      if (sortBy === 'tuition') return a.minWeeklyTuition - b.minWeeklyTuition;
      return 0;
    });
  }, [selectedState, selectedSector, selectedType, regionalOnly, minCommission, searchQuery, sortBy]);

  // Handle comparison toggle
  const toggleCompare = (id: string) => {
    if (comparedSchoolIds.includes(id)) {
      setComparedSchoolIds((prev) => prev.filter((item) => item !== id));
    } else {
      if (comparedSchoolIds.length >= 3) {
        toast('You can compare a maximum of 3 institutions simultaneously', 'error');
        return;
      }
      setComparedSchoolIds((prev) => [...prev, id]);
      toast('Added to comparison deck', 'success');
    }
  };

  const comparedSchools = useMemo(() => {
    return PARTNER_SCHOOLS.filter((s) => comparedSchoolIds.includes(s.id));
  }, [comparedSchoolIds]);

  // Aggregate stats
  const totalCampuses = useMemo(() => {
    return PARTNER_SCHOOLS.reduce((acc, s) => acc + s.campuses.length, 0);
  }, []);

  const totalCourses = useMemo(() => {
    return PARTNER_SCHOOLS.reduce((acc, s) => acc + s.coursesCount, 0);
  }, []);

  return (
    <AppLayout>
      <div className="space-y-7 pb-12">
        {/* Top Breadcrumb & Live CRICOS Status Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">AusEdu Connect</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-blue-600 font-medium">CRICOS Institutions &amp; Partner Campuses</span>
            <span className="hidden sm:inline-block text-slate-300">•</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium text-[11px] border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Direct PRISMS &amp; National Code 2018 Compliant
            </span>
          </div>

          <div className="flex items-center gap-2">
            {comparedSchoolIds.length > 0 && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCompareModalOpen(true)}
                className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 font-bold"
              >
                <GitCompare className="w-3.5 h-3.5" />
                Compare ({comparedSchoolIds.length}/3)
              </Button>
            )}
            <Link to="/courses">
              <Button variant="secondary" size="sm">
                <BookOpen className="w-3.5 h-3.5" />
                CRICOS Courses
              </Button>
            </Link>
            <Link to="/quotes">
              <Button size="sm">
                <Sparkles className="w-3.5 h-3.5" />
                Build Student Quote
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Section & Quick KPI Metrics */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-blue-200 border border-white/10">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              Australian Partner Institution Network
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Verified CRICOS Providers, Live Scholarships &amp; Agency Commissions
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              Inspect accredited Australian universities, TAFEs, and private VET colleges. Compare contracted agent commission rates, offer turnaround times, regional migration bonus points, and active tuition waivers.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-white/10">
            <div className="p-3 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10">
              <span className="text-xs text-slate-400 block font-medium">Accredited RTOs</span>
              <span className="text-xl sm:text-2xl font-extrabold text-white">{PARTNER_SCHOOLS.length} Providers</span>
              <span className="text-[11px] text-emerald-400 block mt-0.5">100% PRISMS Active</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10">
              <span className="text-xs text-slate-400 block font-medium">Nationwide Campuses</span>
              <span className="text-xl sm:text-2xl font-extrabold text-white">{totalCampuses} Locations</span>
              <span className="text-[11px] text-blue-300 block mt-0.5">NSW, VIC, QLD, WA, SA</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10">
              <span className="text-xs text-slate-400 block font-medium">Max Agency Commission</span>
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-400">Up to 30%</span>
              <span className="text-[11px] text-slate-300 block mt-0.5">ELICOS &amp; VET Streams</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10">
              <span className="text-xs text-slate-400 block font-medium">Fast-Track Offer SLA</span>
              <span className="text-xl sm:text-2xl font-extrabold text-amber-300">12h – 24h</span>
              <span className="text-[11px] text-slate-300 block mt-0.5">Express CoE Processing</span>
            </div>
          </div>
        </div>

        {/* Filter, Search & View Controls */}
        <div className="space-y-3.5 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          {/* Row 1: Search & Major Selects */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by school name, CRICOS code, RTO #, or city (e.g., APC, 03812M, Gold Coast, Perth)..."
                className="w-full h-10 bg-slate-50 hover:bg-white border border-slate-200 rounded-xl pl-10 pr-4 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-end sm:self-auto">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Grid Cards
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'table' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                Comparison Matrix
              </button>
              <button
                onClick={() => setViewMode('by-state')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'by-state' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                By State / City
              </button>
            </div>
          </div>

          {/* Row 2: State Filter Pills, Sector, Provider Type, and Sort */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            {/* State Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">States:</span>
              {['All', 'NSW', 'VIC', 'QLD', 'WA', 'SA'].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedState(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedState === st
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {st === 'All' ? 'All Australia' : st}
                </button>
              ))}
            </div>

            {/* Selects: Sector, Provider Type, Sort */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Sector Dropdown */}
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-600"
              >
                <option value="All">All Course Sectors</option>
                <option value="ELICOS">ELICOS English</option>
                <option value="VET Business">VET Business &amp; Leadership</option>
                <option value="VET IT">VET Information Technology</option>
                <option value="Hospitality & Design">Hospitality &amp; Design</option>
                <option value="Higher Ed Pathways">Higher Ed Pathways</option>
              </select>

              {/* Provider Type */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-600"
              >
                <option value="All">All Provider Types</option>
                <option value="Private VET & ELICOS">Private VET &amp; ELICOS</option>
                <option value="University & Higher Ed">University &amp; Higher Ed</option>
                <option value="Dual Sector Institute">Dual Sector Institute</option>
                <option value="Public TAFE">Public TAFE</option>
              </select>

              {/* Regional Only Toggle */}
              <button
                type="button"
                onClick={() => setRegionalOnly(!regionalOnly)}
                className={`h-8 px-2.5 rounded-lg border text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  regionalOnly
                    ? 'bg-amber-500 text-white border-amber-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                Regional Visa Points
              </button>

              {/* Sort By Dropdown */}
              <div className="inline-flex items-center gap-1.5 h-8 rounded-lg border border-slate-200 bg-white px-2.5">
                <SlidersHorizontal className="w-3 h-3 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none"
                >
                  <option value="commission">Sort: Highest Commission</option>
                  <option value="sla">Sort: Fastest Offer SLA</option>
                  <option value="courses">Sort: Most Courses</option>
                  <option value="tuition">Sort: Lowest Tuition Rate</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count & Active Filters Indicator */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing <strong className="text-slate-900">{filteredSchools.length}</strong> of{' '}
            {PARTNER_SCHOOLS.length} verified Australian education providers
          </span>
          {(selectedState !== 'All' || selectedSector !== 'All' || selectedType !== 'All' || regionalOnly || searchQuery) && (
            <button
              onClick={() => {
                setSelectedState('All');
                setSelectedSector('All');
                setSelectedType('All');
                setRegionalOnly(false);
                setSearchQuery('');
              }}
              className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer underline"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* ========================================================================= */}
        {/* VIEW MODE 1: GRID CARDS                                                    */}
        {/* ========================================================================= */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSchools.map((school) => {
              const isCompared = comparedSchoolIds.includes(school.id);
              return (
                <Card
                  key={school.id}
                  className={`p-5 flex flex-col justify-between hover:shadow-lg transition-all duration-200 border-2 ${
                    isCompared ? 'border-blue-500 bg-blue-50/15' : 'border-slate-200/90 hover:border-blue-300'
                  }`}
                >
                  <div>
                    {/* Header: Logo, Name, CRICOS and Comparison Checkbox */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-xl ${school.logoBg} text-white font-extrabold flex items-center justify-center text-sm shadow-md shrink-0`}
                        >
                          {school.shortCode}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-1">
                            {school.name}
                          </h3>
                          <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                              CRICOS {school.cricos}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-500">
                              RTO #{school.rto}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Compare Checkbox */}
                      <button
                        type="button"
                        onClick={() => toggleCompare(school.id)}
                        title={isCompared ? 'Remove from comparison' : 'Add to comparison'}
                        className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer shrink-0 ${
                          isCompared
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <GitCompare className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Provider Type & SLA Badges */}
                    <div className="flex items-center gap-1.5 flex-wrap mb-3">
                      <Badge variant="default" className="text-[10px] py-0.5">
                        {school.providerType}
                      </Badge>
                      <Badge variant="info" className="text-[10px] py-0.5">
                        <Clock className="w-3 h-3 mr-1 inline" />
                        {school.turnaroundHours}h Offer SLA
                      </Badge>
                      {school.regionalVisaPoints && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                          <Compass className="w-2.5 h-2.5" />
                          +5 Regional Pts
                        </span>
                      )}
                    </div>

                    {/* Active Scholarship Card */}
                    <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/70 mb-3 space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-bold text-amber-950">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          {school.scholarshipValue}
                        </span>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-amber-200/60 text-amber-900">
                          Live Promo
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-900 line-clamp-1">{school.activeScholarship}</p>
                    </div>

                    {/* Commission Box */}
                    <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 mb-3 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-emerald-950 flex items-center gap-1">
                          <Percent className="w-3 h-3 text-emerald-600" />
                          Contracted Base Commission:
                        </span>
                        <span className="font-mono text-sm font-extrabold text-emerald-800">
                          {school.commissionRate}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-emerald-200/40">
                        <span>Tier-1 Partner: <strong className="text-slate-800 font-mono">{school.tier1Rate}%</strong></span>
                        <span>Platinum Volume: <strong className="text-slate-800 font-mono">{school.platinumRate}%</strong></span>
                      </div>
                    </div>

                    {/* Approved Campuses Pills */}
                    <div className="space-y-1.5 mb-3">
                      <span className="text-[11px] font-semibold text-slate-500 block">
                        Campuses ({school.campuses.length}):
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {school.campuses.map((c) => (
                          <span
                            key={c.name}
                            className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                              c.isRegional
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            <MapPin className="w-2.5 h-2.5 mr-0.5 text-slate-400" />
                            {c.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Highlights bullet points */}
                    <div className="space-y-1 mb-4">
                      {school.highlights.slice(0, 2).map((h) => (
                        <div key={h} className="flex items-center gap-1.5 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action Buttons */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setInspectedSchool(school);
                        setActiveDossierTab('overview');
                      }}
                      className="flex-1 text-xs font-semibold"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Inspect Dossier
                    </Button>
                    <Link to="/quotes" className="flex-1">
                      <Button size="sm" className="w-full text-xs font-semibold">
                        Quote Student
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW MODE 2: COMPARISON MATRIX TABLE                                       */}
        {/* ========================================================================= */}
        {viewMode === 'table' && (
          <Card className="overflow-hidden border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Provider / CRICOS</th>
                    <th className="py-3 px-4">Sector &amp; Type</th>
                    <th className="py-3 px-4 text-center">Agency Commission</th>
                    <th className="py-3 px-4 text-center">Offer SLA</th>
                    <th className="py-3 px-4 text-center">Min Weekly</th>
                    <th className="py-3 px-4">Campuses</th>
                    <th className="py-3 px-4">Active Scholarship</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredSchools.map((s) => (
                    <tr key={s.id} className="hover:bg-blue-50/20 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-lg ${s.logoBg} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                            {s.shortCode}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{s.name}</span>
                            <span className="text-[11px] font-mono text-slate-500">CRICOS {s.cricos} • RTO #{s.rto}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        <div>{s.providerType}</div>
                        <span className="text-[10px] text-slate-400">{s.sectors.slice(0, 2).join(', ')}</span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md inline-block">
                          {s.commissionRate}% Base
                        </span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">{s.tier1Rate}% Tier-1</span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                          <Clock className="w-3 h-3 text-blue-500" />
                          {s.turnaroundHours}h
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-slate-900">
                        A${s.minWeeklyTuition}/wk
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {s.campuses.slice(0, 3).map((c) => (
                            <span key={c.name} className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">
                              {c.name.split(' ')[0]}
                            </span>
                          ))}
                          {s.campuses.length > 3 && (
                            <span className="text-[10px] text-blue-600 font-semibold">+{s.campuses.length - 3} more</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-amber-900 font-semibold max-w-xs truncate">
                        {s.activeScholarship}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              setInspectedSchool(s);
                              setActiveDossierTab('overview');
                            }}
                            className="h-7 text-xs px-2.5"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Link to="/quotes">
                            <Button size="sm" className="h-7 text-xs px-2.5">
                              Quote
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* ========================================================================= */}
        {/* VIEW MODE 3: BY AUSTRALIAN STATE / CITY EXPLORER                          */}
        {/* ========================================================================= */}
        {viewMode === 'by-state' && (
          <div className="space-y-6">
            {['NSW', 'VIC', 'QLD', 'WA', 'SA'].map((stateCode) => {
              const stateSchools = filteredSchools.filter((s) => s.states.includes(stateCode));
              if (stateSchools.length === 0) return null;

              const stateFullName: Record<string, string> = {
                NSW: 'New South Wales (Sydney, Manly, Newcastle, Wollongong, Byron Bay)',
                VIC: 'Victoria (Melbourne CBD, Spencer St, Docklands)',
                QLD: 'Queensland (Brisbane, Gold Coast, Sunshine Coast, Noosa)',
                WA: 'Western Australia (Perth, Scarborough Beach)',
                SA: 'South Australia (Adelaide CBD)',
              };

              return (
                <div key={stateCode} className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                        {stateCode}
                      </span>
                      <h2 className="text-base font-bold text-slate-900">
                        {stateFullName[stateCode] || stateCode}
                      </h2>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      {stateSchools.length} Institutions Operating in {stateCode}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stateSchools.map((school) => {
                      const stateCampuses = school.campuses.filter((c) => c.state === stateCode);
                      return (
                        <Card key={school.id} className="p-4 hover:border-blue-300 transition-all">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-slate-900 text-sm">{school.name}</span>
                            <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              {school.commissionRate}%
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mb-2">CRICOS {school.cricos} • {school.providerType}</p>
                          <div className="space-y-1 mb-3">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Campuses in {stateCode}:</span>
                            <div className="flex flex-wrap gap-1">
                              {stateCampuses.map((c) => (
                                <span
                                  key={c.name}
                                  className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                                    c.isRegional ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-700'
                                  }`}
                                >
                                  {c.name} {c.isRegional && '★ Regional'}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                            <span className="text-xs text-amber-900 font-semibold truncate max-w-[170px]">
                              {school.scholarshipValue}
                            </span>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => {
                                setInspectedSchool(school);
                                setActiveDossierTab('overview');
                              }}
                              className="h-7 text-xs px-2"
                            >
                              Details
                            </Button>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SLIDE-OVER INSTITUTION DEEP-DIVE DOSSIER DRAWER                            */}
        {/* ========================================================================= */}
        {inspectedSchool && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-hidden">
              {/* Drawer Top Header */}
              <div className="p-6 border-b border-slate-100 bg-slate-50/70">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${inspectedSchool.logoBg} text-white font-extrabold text-base flex items-center justify-center shadow-md`}>
                      {inspectedSchool.shortCode}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">{inspectedSchool.name}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="success">CRICOS {inspectedSchool.cricos}</Badge>
                        <Badge variant="default">RTO #{inspectedSchool.rto}</Badge>
                        <span className="text-xs text-slate-500 font-medium">{inspectedSchool.providerType}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setInspectedSchool(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Tab switcher inside dossier */}
                <div className="flex items-center gap-1 mt-6 border-b border-slate-200">
                  <button
                    onClick={() => setActiveDossierTab('overview')}
                    className={`pb-2.5 px-3 text-xs font-bold transition-all cursor-pointer border-b-2 ${
                      activeDossierTab === 'overview'
                        ? 'border-blue-600 text-blue-700'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Overview &amp; Campuses
                  </button>
                  <button
                    onClick={() => setActiveDossierTab('commissions')}
                    className={`pb-2.5 px-3 text-xs font-bold transition-all cursor-pointer border-b-2 ${
                      activeDossierTab === 'commissions'
                        ? 'border-blue-600 text-blue-700'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Commission Schedule
                  </button>
                  <button
                    onClick={() => setActiveDossierTab('admissions')}
                    className={`pb-2.5 px-3 text-xs font-bold transition-all cursor-pointer border-b-2 ${
                      activeDossierTab === 'admissions'
                        ? 'border-blue-600 text-blue-700'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Admissions &amp; PRISMS SLA
                  </button>
                </div>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-600">
                {activeDossierTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Key Quick Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                        <span className="text-[11px] text-slate-400 block font-medium">Weekly Tuition</span>
                        <span className="text-base font-bold text-slate-900">From A${inspectedSchool.minWeeklyTuition}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                        <span className="text-[11px] text-slate-400 block font-medium">CRICOS Courses</span>
                        <span className="text-base font-bold text-slate-900">{inspectedSchool.coursesCount} Programs</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                        <span className="text-[11px] text-slate-400 block font-medium">Offer Turnaround</span>
                        <span className="text-base font-bold text-blue-700">{inspectedSchool.turnaroundHours}h SLA</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                        <span className="text-[11px] text-slate-400 block font-medium">Base Commission</span>
                        <span className="text-base font-bold text-emerald-700">{inspectedSchool.commissionRate}%</span>
                      </div>
                    </div>

                    {/* Active Scholarship Alert */}
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                      <div className="flex items-center gap-2 font-bold text-amber-950">
                        <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Active Campaign: {inspectedSchool.activeScholarship}</span>
                      </div>
                      <p className="text-amber-900 leading-relaxed">
                        Automatic grant applied to all qualifying onshore and offshore visa applicants for the Q3 / Q4 2026 intakes.
                      </p>
                    </div>

                    {/* Campuses Detail with Regional Visa Status */}
                    <div className="space-y-2.5">
                      <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                        Approved CRICOS Campuses &amp; Regional Migration Points
                      </h4>
                      <div className="space-y-2">
                        {inspectedSchool.campuses.map((c) => (
                          <div
                            key={c.name}
                            className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                              <div>
                                <span className="font-bold text-slate-900 block">{c.name}</span>
                                <span className="text-[11px] text-slate-500">State: {c.state}</span>
                              </div>
                            </div>
                            {c.isRegional ? (
                              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                                ★ {c.regionalCategory || 'Regional Category'} (+5 Pts)
                              </span>
                            ) : (
                              <span className="text-[11px] text-slate-400">Metro Campus</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Highlights */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                        Key Institutional Strengths
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {inspectedSchool.highlights.map((h) => (
                          <div key={h} className="p-2.5 rounded-lg bg-slate-50 flex items-center gap-2 text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeDossierTab === 'commissions' && (
                  <div className="space-y-5">
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                      <h4 className="font-bold text-emerald-950 text-sm">Agency Commission Structure</h4>
                      <p className="text-emerald-900 leading-relaxed text-xs">
                        Commissions are disbursed in AUD according to the written International Education Agency Agreement under ESOS National Code 2018 Standard 4.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-4 rounded-xl border border-slate-200 bg-white text-center">
                        <span className="text-slate-400 font-medium block">Base Commission</span>
                        <span className="text-2xl font-mono font-bold text-emerald-700 block mt-1">
                          {inspectedSchool.commissionRate}%
                        </span>
                        <span className="text-[11px] text-slate-500 mt-1 block">1-4 enrolments/yr</span>
                      </div>
                      <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 text-center">
                        <span className="text-blue-600 font-medium block">Preferred Tier-1</span>
                        <span className="text-2xl font-mono font-bold text-blue-700 block mt-1">
                          {inspectedSchool.tier1Rate}%
                        </span>
                        <span className="text-[11px] text-blue-600 mt-1 block">5-14 enrolments/yr</span>
                      </div>
                      <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 text-center">
                        <span className="text-amber-800 font-medium block">Platinum Volume</span>
                        <span className="text-2xl font-mono font-bold text-amber-900 block mt-1">
                          {inspectedSchool.platinumRate}%
                        </span>
                        <span className="text-[11px] text-amber-700 mt-1 block">15+ enrolments/yr</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                      <span className="font-bold text-slate-900 block">Disbursement Milestones:</span>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                          <span className="font-semibold text-slate-800">Tranche 1 (50%)</span>
                          <span className="text-slate-600">Payable within 14 days of PRISMS CoE Confirmation</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                          <span className="font-semibold text-slate-800">Tranche 2 (50%)</span>
                          <span className="text-slate-600">Payable after Term census date &amp; course commencement</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeDossierTab === 'admissions' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                      <span className="font-bold text-slate-900 block">English Language Proficiency Standards</span>
                      <p className="text-slate-700">{inspectedSchool.entryIelts}</p>
                      <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900">
                        <strong>Placement Test:</strong> Free internal English placement testing is available online for immediate qualification without an official IELTS test.
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                      <span className="font-bold text-slate-900 block">Offer &amp; CoE Processing SLA</span>
                      <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                        <span>Letter of Offer Turnaround:</span>
                        <strong className="text-blue-700">{inspectedSchool.turnaroundHours} Hours</strong>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                        <span>PRISMS CoE Dispatch:</span>
                        <strong className="text-emerald-700">{inspectedSchool.coProcessing}</strong>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                      <span className="font-bold text-slate-900 block">Class Timetables &amp; Shifts</span>
                      <div className="flex flex-wrap gap-2">
                        {inspectedSchool.timetables.map((t) => (
                          <span key={t} className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Bottom Actions */}
              <div className="p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                <Button
                  variant="secondary"
                  onClick={() => toast(`Fact sheet & brochure downloaded for ${inspectedSchool.name}`, 'success')}
                  className="text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Agency Kit
                </Button>
                <div className="flex items-center gap-2">
                  <Link to="/courses">
                    <Button variant="secondary" className="text-xs">
                      View Courses
                    </Button>
                  </Link>
                  <Link to="/quotes">
                    <Button className="text-xs font-bold">
                      Quote Student
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL: SIDE-BY-SIDE INSTITUTION COMPARISON (UP TO 3)                       */}
        {/* ========================================================================= */}
        {compareModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col justify-between">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <GitCompare className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-bold text-slate-900">
                    Side-by-Side Provider Comparison ({comparedSchools.length})
                  </h3>
                </div>
                <button
                  onClick={() => setCompareModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6">
                {comparedSchools.length === 0 ? (
                  <p className="text-center text-slate-400 py-12">No institutions selected for comparison.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {comparedSchools.map((s) => (
                      <div key={s.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-4">
                        <div className="flex items-center justify-between">
                          <span className={`w-8 h-8 rounded-lg ${s.logoBg} text-white font-bold flex items-center justify-center text-xs`}>
                            {s.shortCode}
                          </span>
                          <button
                            onClick={() => toggleCompare(s.id)}
                            className="text-xs text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{s.name}</h4>
                          <span className="text-[11px] font-mono text-slate-500">CRICOS {s.cricos}</span>
                        </div>

                        <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                          <div>
                            <span className="text-slate-400 block">Base Commission:</span>
                            <span className="font-mono font-bold text-emerald-700 text-base">{s.commissionRate}%</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Offer Turnaround:</span>
                            <span className="font-semibold text-slate-800">{s.turnaroundHours} Hours SLA</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Starting Tuition:</span>
                            <span className="font-bold text-slate-900">A${s.minWeeklyTuition}/wk</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Regional Points:</span>
                            <span className="font-semibold text-amber-900">
                              {s.regionalVisaPoints ? 'Yes (+5 Points)' : 'Metro Only'}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Active Promotion:</span>
                            <span className="font-semibold text-amber-800 text-[11px]">{s.activeScholarship}</span>
                          </div>
                        </div>

                        <Link to="/quotes" className="block pt-2">
                          <Button size="sm" className="w-full text-xs">
                            Quote This School
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setComparedSchoolIds([])}
                  className="text-xs text-slate-600"
                >
                  Clear All Comparisons
                </Button>
                <Button size="sm" onClick={() => setCompareModalOpen(false)}>
                  Close Comparison
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
