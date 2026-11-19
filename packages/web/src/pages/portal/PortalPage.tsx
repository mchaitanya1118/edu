import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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
  Building,
  Briefcase,
  Layers,
  Globe,
  Phone,
  Mail,
  ArrowRight,
  FileText,
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
  educationGroupId?: string;
  educationGroupName?: string;
  educationGroupAsx?: string;
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
    educationGroupId: 'apc-group',
    educationGroupName: 'APC Education Group',
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
    educationGroupId: 'nexted-group',
    educationGroupName: 'NextEd Group Limited',
    educationGroupAsx: 'ASX: NXD',
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
    educationGroupId: 'ilsc-group',
    educationGroupName: 'ILSC Education Group',
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
    educationGroupId: 'lexis-group',
    educationGroupName: 'Lexis Education Group',
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
    educationGroupId: 'kaplan-group',
    educationGroupName: 'Kaplan Australia & New Zealand',
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
    educationGroupId: 'torrens-group',
    educationGroupName: 'Strategic Education / Torrens Network',
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
    educationGroupId: 'tafe-group',
    educationGroupName: 'TAFE NSW Network',
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
    educationGroupId: 'neh-group',
    educationGroupName: 'National Education Holdings (NEH)',
  },
];

export type ConstituentCollege = {
  id: string;
  name: string;
  shortCode: string;
  cricos: string;
  rto: string;
  providerType: string;
  states: string[];
  campusesCount: number;
  highlightCourse: string;
  minWeeklyTuition: number;
  commissionRate: number;
};

export type ArticulatedPathway = {
  id: string;
  title: string;
  leadCollege: string;
  destinationCollege: string;
  qualification: string;
  durationWeeks: number;
  packagedCoEEligible: boolean;
  creditExemption: string;
  description: string;
};

export type EducationGroupItem = {
  id: string;
  code: string;
  name: string;
  tradingName: string;
  abn: string;
  acn?: string;
  asxCode?: string;
  logoBg: string;
  headOffice: string;
  headOfficeCity: string;
  headOfficeState: string;
  website: string;
  groupCeo: string;
  headOfAdmissions: string;
  contactEmail: string;
  contactPhone: string;
  overview: string;
  collegeCount: number;
  totalCampuses: number;
  totalCourses: number;
  states: string[];
  masterCommissionTerms: {
    singleContractCoverage: boolean;
    baseRate: number;
    tier1Rate: number;
    platinumRate: number;
    summary: string;
    crossSellingBonus: string;
    paymentCycle: string;
  };
  constituentColleges: ConstituentCollege[];
  pathways: ArticulatedPathway[];
  governance: {
    asqaRiskTier: 'Low Risk (Tier 1)' | 'Medium Risk (Tier 2)';
    teqsaAccredited: boolean;
    esosPrismsIntegrated: boolean;
    ombudsmanComplianceScore: number;
    yearEstablished: number;
    regulatoryScope: string;
  };
  highlights: string[];
};

export const EDUCATION_GROUPS: EducationGroupItem[] = [
  {
    id: 'nexted-group',
    code: 'NEXTED',
    name: 'NextEd Group Limited',
    tradingName: 'NextEd Group',
    abn: '43 105 012 066',
    acn: '105 012 066',
    asxCode: 'ASX: NXD',
    logoBg: 'bg-emerald-700',
    headOffice: 'Level 2, 432-434 Kent Street',
    headOfficeCity: 'Sydney',
    headOfficeState: 'NSW',
    website: 'https://nexted.com.au',
    groupCeo: 'Glenn Elith',
    headOfAdmissions: 'Sarah Jenkins',
    contactEmail: 'admissions@nexted.com.au',
    contactPhone: '+61 2 8355 3800',
    overview:
      'NextEd Group Limited (ASX: NXD) is one of Australia’s largest ASX-listed education providers, delivering ELICOS English, VET Diplomas, IT, and Healthcare qualifications across nationwide metro and regional campuses.',
    collegeCount: 4,
    totalCampuses: 9,
    totalCourses: 54,
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA'],
    masterCommissionTerms: {
      singleContractCoverage: true,
      baseRate: 20,
      tier1Rate: 24,
      platinumRate: 26,
      summary: '1 Unified Master Agency Agreement covers Greenwich English, Management, and Celtic Training.',
      crossSellingBonus: '+2% bonus commission when bundling ELICOS with VET Management CoEs.',
      paymentCycle: 'CoE Confirmation + Census Date (Net 14 Days)',
    },
    constituentColleges: [
      {
        id: 'greenwich',
        name: 'Greenwich English College',
        shortCode: 'GRW-ENG',
        cricos: '02672K',
        rto: '91153',
        providerType: 'Private ELICOS Institute',
        states: ['NSW', 'VIC', 'QLD', 'WA'],
        campusesCount: 4,
        highlightCourse: 'Cambridge Preparation & IELTS Intensive',
        minWeeklyTuition: 290,
        commissionRate: 24,
      },
      {
        id: 'greenwich-mgmt',
        name: 'Greenwich Management College',
        shortCode: 'GRW-VET',
        cricos: '02672K',
        rto: '91153',
        providerType: 'Private VET Provider',
        states: ['NSW', 'VIC', 'QLD', 'WA'],
        campusesCount: 4,
        highlightCourse: 'Advanced Diploma of Program Management',
        minWeeklyTuition: 310,
        commissionRate: 22,
      },
      {
        id: 'celtic-training',
        name: 'Celtic Training & Nursing',
        shortCode: 'CELTIC',
        cricos: '03991J',
        rto: '41108',
        providerType: 'Accredited Healthcare RTO',
        states: ['SA', 'NSW'],
        campusesCount: 2,
        highlightCourse: 'Diploma of Nursing (HLT54121)',
        minWeeklyTuition: 360,
        commissionRate: 20,
      },
      {
        id: 'gostudy',
        name: 'Go Study Australia (International Network)',
        shortCode: 'GO-STUDY',
        cricos: 'N/A (Agency Advisory)',
        rto: 'N/A',
        providerType: 'Corporate Advisory & Placement Desk',
        states: ['NSW', 'VIC', 'QLD', 'WA', 'SA'],
        campusesCount: 5,
        highlightCourse: 'Direct Onshore Support & Visa Guidance',
        minWeeklyTuition: 0,
        commissionRate: 0,
      },
    ],
    pathways: [
      {
        id: 'pwy-nxt-1',
        title: 'ELICOS to VET Management Fast-Track',
        leadCollege: 'Greenwich English College',
        destinationCollege: 'Greenwich Management College',
        qualification: 'Diploma of Leadership & Management',
        durationWeeks: 52,
        packagedCoEEligible: true,
        creditExemption: 'Direct entry without official IELTS exam upon Level 4 completion',
        description:
          'Single packaged student visa (Subclass 500) application with combined CoE issuance and single upfront deposit.',
      },
      {
        id: 'pwy-nxt-2',
        title: 'Greenwich Advanced Diploma to University Degree Articulation',
        leadCollege: 'Greenwich Management College',
        destinationCollege: 'Torrens University & CQU',
        qualification: 'Bachelor of Business / Bachelor of Commerce',
        durationWeeks: 104,
        packagedCoEEligible: true,
        creditExemption: '8 courses (1 full academic year) advanced standing credit transfer',
        description:
          'Graduates transition directly into 2nd year of accredited Australian University Bachelor programs.',
      },
    ],
    governance: {
      asqaRiskTier: 'Low Risk (Tier 1)',
      teqsaAccredited: true,
      esosPrismsIntegrated: true,
      ombudsmanComplianceScore: 99.4,
      yearEstablished: 2003,
      regulatoryScope: 'ASQA RTO 91153 • CRICOS 02672K • ASX Listed (NXD)',
    },
    highlights: [
      'Single Master Agency Agreement for all 4 member organizations',
      'Unified Admissions Desk with 24-hour turnaround on packaged CoEs',
      'Cross-campus transfer flexibility between Sydney, Melbourne, Brisbane & Perth',
    ],
  },
  {
    id: 'apc-group',
    code: 'APC_GROUP',
    name: 'APC Education Group',
    tradingName: 'APC Group Australia',
    abn: '74 069 985 876',
    acn: '069 985 876',
    logoBg: 'bg-blue-700',
    headOffice: 'Level 4, 189 Kent Street',
    headOfficeCity: 'Sydney',
    headOfficeState: 'NSW',
    website: 'https://apc.edu.au',
    groupCeo: 'David O’Connor',
    headOfAdmissions: 'Marcus Vance',
    contactEmail: 'groups@apc.edu.au',
    contactPhone: '+61 2 9251 7000',
    overview:
      'APC Education Group operates Australian Pacific College and English Unlimited, offering seamless articulated vocational, design, tech, and English pathways across NSW, Victoria, and Queensland.',
    collegeCount: 3,
    totalCampuses: 6,
    totalCourses: 38,
    states: ['NSW', 'VIC', 'QLD'],
    masterCommissionTerms: {
      singleContractCoverage: true,
      baseRate: 22,
      tier1Rate: 25,
      platinumRate: 28,
      summary: 'Master Representation Agreement encompasses APC (VET & Design) and English Unlimited (ELICOS).',
      crossSellingBonus: '+3% commission override on 2-year packaged enrolments.',
      paymentCycle: '50% upon CoE issuance, 50% on course census date',
    },
    constituentColleges: [
      {
        id: 'apc',
        name: 'Australian Pacific College (APC)',
        shortCode: 'APC',
        cricos: '03812M',
        rto: '45123',
        providerType: 'Dual Sector Institute',
        states: ['NSW', 'VIC', 'QLD'],
        campusesCount: 5,
        highlightCourse: 'Diploma of IT & Cybersecurity',
        minWeeklyTuition: 280,
        commissionRate: 22,
      },
      {
        id: 'english-unlimited',
        name: 'English Unlimited (EU)',
        shortCode: 'EU',
        cricos: '02446A',
        rto: '90813',
        providerType: 'ELICOS College',
        states: ['NSW', 'VIC', 'QLD'],
        campusesCount: 4,
        highlightCourse: 'General English & Everyday Communication',
        minWeeklyTuition: 270,
        commissionRate: 25,
      },
      {
        id: 'dth-australia',
        name: 'Design & Tech Hub (DTH)',
        shortCode: 'DTH',
        cricos: '03812M',
        rto: '45123',
        providerType: 'Creative Tech Academy',
        states: ['NSW', 'VIC'],
        campusesCount: 2,
        highlightCourse: 'Diploma of Graphic & UX Design',
        minWeeklyTuition: 300,
        commissionRate: 23,
      },
    ],
    pathways: [
      {
        id: 'pwy-apc-1',
        title: 'EU Intensive English to APC Diploma of IT',
        leadCollege: 'English Unlimited (EU)',
        destinationCollege: 'Australian Pacific College (APC)',
        qualification: 'Diploma of Information Technology',
        durationWeeks: 48,
        packagedCoEEligible: true,
        creditExemption: 'Free English placement testing replaces formal IELTS exam',
        description: 'Instant same-day combined offer letter and joint PRISMS CoE.',
      },
      {
        id: 'pwy-apc-2',
        title: 'APC Advanced Diploma to Australian University Bachelor',
        leadCollege: 'Australian Pacific College (APC)',
        destinationCollege: 'CQU & Torrens University',
        qualification: 'Bachelor of Information Technology',
        durationWeeks: 104,
        packagedCoEEligible: true,
        creditExemption: '12 units (1.5 years) credit transfer towards 3-year Bachelor',
        description: 'Significant cost savings with VET pathway into University degree completion.',
      },
    ],
    governance: {
      asqaRiskTier: 'Low Risk (Tier 1)',
      teqsaAccredited: false,
      esosPrismsIntegrated: true,
      ombudsmanComplianceScore: 98.7,
      yearEstablished: 1994,
      regulatoryScope: 'ASQA RTO #45123 • CRICOS #03812M / #02446A',
    },
    highlights: [
      'Over 30 years continuous operating history in Sydney, Melbourne & Brisbane',
      'Category 2 Regional campus on the Gold Coast granting +5 Visa Points',
      'Joint Master Agreement simplifies agent contracts into one legal document',
    ],
  },
  {
    id: 'ilsc-group',
    code: 'ILSC_GROUP',
    name: 'ILSC Education Group',
    tradingName: 'ILSC & Greystone College Australia',
    abn: '91 142 841 021',
    logoBg: 'bg-indigo-700',
    headOffice: '540 George Street',
    headOfficeCity: 'Sydney',
    headOfficeState: 'NSW',
    website: 'https://ilsc.com',
    groupCeo: 'Nadine Baladi',
    headOfAdmissions: 'Liam Chen',
    contactEmail: 'admissions-australia@ilsceducation.com',
    contactPhone: '+61 2 9247 1744',
    overview:
      'ILSC Education Group unites ILSC Language Schools and Greystone College, recognized globally for experiential language education, vocational training, and work-integrated Co-op programs.',
    collegeCount: 2,
    totalCampuses: 4,
    totalCourses: 32,
    states: ['NSW', 'VIC', 'QLD', 'SA'],
    masterCommissionTerms: {
      singleContractCoverage: true,
      baseRate: 20,
      tier1Rate: 23,
      platinumRate: 25,
      summary: 'Global Master Agency Agreement across all Australian and international branches.',
      crossSellingBonus: 'Free student registration on Greystone when progressing from 24+ weeks ILSC.',
      paymentCycle: 'Census Date + 10 Business Days',
    },
    constituentColleges: [
      {
        id: 'ilsc-language',
        name: 'ILSC Language Schools Australia',
        shortCode: 'ILSC',
        cricos: '02137M',
        rto: '31564',
        providerType: 'Private ELICOS Institute',
        states: ['NSW', 'VIC', 'QLD', 'SA'],
        campusesCount: 4,
        highlightCourse: 'English for Academic Purposes (EAP)',
        minWeeklyTuition: 300,
        commissionRate: 20,
      },
      {
        id: 'greystone-college',
        name: 'Greystone College Australia',
        shortCode: 'GREYSTONE',
        cricos: '02137M',
        rto: '31564',
        providerType: 'Private VET College',
        states: ['NSW', 'VIC', 'QLD', 'SA'],
        campusesCount: 4,
        highlightCourse: 'Diploma of Business with Co-op Internship',
        minWeeklyTuition: 290,
        commissionRate: 22,
      },
    ],
    pathways: [
      {
        id: 'pwy-ilsc-1',
        title: 'EAP to Greystone Co-op Business & Tech',
        leadCollege: 'ILSC Language Schools Australia',
        destinationCollege: 'Greystone College Australia',
        qualification: 'Diploma of International Business',
        durationWeeks: 64,
        packagedCoEEligible: true,
        creditExemption: 'Direct entry from ILSC Intermediate 4 level',
        description: 'Comprehensive packaged pathway with 24-week paid Australian industry Co-op practicum.',
      },
    ],
    governance: {
      asqaRiskTier: 'Low Risk (Tier 1)',
      teqsaAccredited: false,
      esosPrismsIntegrated: true,
      ombudsmanComplianceScore: 99.1,
      yearEstablished: 1991,
      regulatoryScope: 'ASQA RTO 31564 • CRICOS 02137M • NEAS Quality Endorsed',
    },
    highlights: [
      'Adelaide Regional Campus providing Category 2 regional migration benefits',
      'Paid Co-op placements in Australian tech, marketing, and hospitality businesses',
      'Cross-transfer between Australia, Canada, and India campuses',
    ],
  },
  {
    id: 'kaplan-group',
    code: 'KAPLAN_GROUP',
    name: 'Kaplan Australia & New Zealand',
    tradingName: 'Kaplan Higher Education Group',
    abn: '86 099 224 448',
    logoBg: 'bg-purple-700',
    headOffice: 'Level 8, 400 George Street',
    headOfficeCity: 'Sydney',
    headOfficeState: 'NSW',
    website: 'https://kaplan.edu.au',
    groupCeo: 'Rob Reagan',
    headOfAdmissions: 'Clare Hastings',
    contactEmail: 'admissions@kbs.edu.au',
    contactPhone: '+61 2 8248 6758',
    overview:
      'Kaplan Australia operates premier higher education and language institutions, including Kaplan Business School (TEQSA accredited Australian degrees) and Kaplan International Languages.',
    collegeCount: 3,
    totalCampuses: 6,
    totalCourses: 42,
    states: ['NSW', 'VIC', 'QLD', 'SA', 'WA'],
    masterCommissionTerms: {
      singleContractCoverage: true,
      baseRate: 18,
      tier1Rate: 22,
      platinumRate: 25,
      summary: 'TEQSA Higher Education Master Contract covering Undergraduate, Postgraduate, and Language branches.',
      crossSellingBonus: '$1,000 agency incentive on each completed Master degree enrolment.',
      paymentCycle: 'Trimester Census Date + 14 Days',
    },
    constituentColleges: [
      {
        id: 'kbs',
        name: 'Kaplan Business School Australia (KBS)',
        shortCode: 'KBS',
        cricos: '02426B',
        rto: 'PRV12094',
        providerType: 'University & Higher Ed',
        states: ['NSW', 'VIC', 'QLD', 'SA', 'WA'],
        campusesCount: 5,
        highlightCourse: 'Master of Business Administration (MBA)',
        minWeeklyTuition: 380,
        commissionRate: 18,
      },
      {
        id: 'kaplan-languages',
        name: 'Kaplan International Languages',
        shortCode: 'KAP-ENG',
        cricos: '01160E',
        rto: 'N/A',
        providerType: 'Higher Ed English Pathway',
        states: ['NSW', 'VIC', 'QLD', 'WA'],
        campusesCount: 4,
        highlightCourse: 'English for Academic Purposes (KITE Pathway)',
        minWeeklyTuition: 330,
        commissionRate: 22,
      },
      {
        id: 'murdoch-pathways',
        name: 'Murdoch University Pathways / Kaplan',
        shortCode: 'MURDOCH-KAP',
        cricos: '03127E',
        rto: 'PRV12094',
        providerType: 'Higher Ed Foundation College',
        states: ['WA'],
        campusesCount: 1,
        highlightCourse: 'Higher Education Diploma of Business & IT',
        minWeeklyTuition: 390,
        commissionRate: 18,
      },
    ],
    pathways: [
      {
        id: 'pwy-kap-1',
        title: 'Kaplan English to KBS Bachelor & Master Direct Entry',
        leadCollege: 'Kaplan International Languages',
        destinationCollege: 'Kaplan Business School Australia (KBS)',
        qualification: 'Bachelor of Business / MBA',
        durationWeeks: 104,
        packagedCoEEligible: true,
        creditExemption: 'Direct entry via KITE placement testing without external English tests',
        description: 'Subclass 500 Higher Education sector visa with full Post-Study Work Visa rights.',
      },
    ],
    governance: {
      asqaRiskTier: 'Low Risk (Tier 1)',
      teqsaAccredited: true,
      esosPrismsIntegrated: true,
      ombudsmanComplianceScore: 99.8,
      yearEstablished: 1938,
      regulatoryScope: 'TEQSA Higher Education Provider PRV12094 • CRICOS 02426B',
    },
    highlights: [
      'Subclass 485 Post-Study Work Visa rights across Bachelor & Master degree alumni',
      'Tier 1 Low-Risk national provider status facilitating streamlined visa processing',
      'Career Central recognized with #1 Graduate Employment Satisfaction in Australia',
    ],
  },
  {
    id: 'torrens-group',
    code: 'TORRENS_GROUP',
    name: 'Strategic Education / Torrens University Network',
    tradingName: 'Torrens Education Network',
    abn: '99 154 937 005',
    logoBg: 'bg-rose-700',
    headOffice: '46-52 Mountain Street, Ultimo',
    headOfficeCity: 'Sydney',
    headOfficeState: 'NSW',
    website: 'https://torrens.edu.au',
    groupCeo: 'Linda Brown',
    headOfAdmissions: 'Fiona Gallacher',
    contactEmail: 'international.admissions@torrens.edu.au',
    contactPhone: '+61 1300 575 803',
    overview:
      'Strategic Education Inc. operates Torrens University Australia alongside world-renowned institutes: Billy Blue College of Design, Blue Mountains International Hotel Management School (BMIHMS), and Media Design School.',
    collegeCount: 4,
    totalCampuses: 8,
    totalCourses: 72,
    states: ['NSW', 'VIC', 'QLD', 'SA'],
    masterCommissionTerms: {
      singleContractCoverage: true,
      baseRate: 18,
      tier1Rate: 20,
      platinumRate: 22,
      summary: 'Master University Representation Agreement covering Business, Design, Hospitality & Health faculties.',
      crossSellingBonus: 'Up to $2,500 bonus per cohort for agencies placing 10+ students annually.',
      paymentCycle: 'Census Date + 14 Days',
    },
    constituentColleges: [
      {
        id: 'torrens',
        name: 'Torrens University Australia',
        shortCode: 'TUA',
        cricos: '03389E',
        rto: 'PRV12209',
        providerType: 'University & Higher Ed',
        states: ['NSW', 'VIC', 'QLD', 'SA'],
        campusesCount: 5,
        highlightCourse: 'Bachelor of Commerce & Master of Global Project Management',
        minWeeklyTuition: 420,
        commissionRate: 18,
      },
      {
        id: 'billy-blue',
        name: 'Billy Blue College of Design',
        shortCode: 'BILLY-BLUE',
        cricos: '03389E',
        rto: 'PRV12209',
        providerType: 'Design & Creative Academy',
        states: ['NSW', 'VIC', 'QLD'],
        campusesCount: 3,
        highlightCourse: 'Bachelor of 3D Design & Animation',
        minWeeklyTuition: 440,
        commissionRate: 18,
      },
      {
        id: 'bmihms',
        name: 'Blue Mountains International Hotel Management School',
        shortCode: 'BMIHMS',
        cricos: '03389E',
        rto: 'PRV12209',
        providerType: 'Hospitality Institute',
        states: ['NSW'],
        campusesCount: 2,
        highlightCourse: 'Bachelor of Business (International Hotel & Resort Management)',
        minWeeklyTuition: 460,
        commissionRate: 18,
      },
    ],
    pathways: [
      {
        id: 'pwy-tor-1',
        title: 'Billy Blue Diploma to Torrens University Bachelor Degree',
        leadCollege: 'Billy Blue College of Design',
        destinationCollege: 'Torrens University Australia',
        qualification: 'Bachelor of Design (UX & Web Development)',
        durationWeeks: 104,
        packagedCoEEligible: true,
        creditExemption: '100% full 1-year academic credit transition into 2nd year Bachelor',
        description: 'Direct progression pathway with studio-based design portfolio assessment.',
      },
    ],
    governance: {
      asqaRiskTier: 'Low Risk (Tier 1)',
      teqsaAccredited: true,
      esosPrismsIntegrated: true,
      ombudsmanComplianceScore: 99.5,
      yearEstablished: 2013,
      regulatoryScope: 'TEQSA Registered Australian University PRV12209 • CRICOS 03389E',
    },
    highlights: [
      'Australia’s fastest-growing international university with industry-integrated learning',
      'Blue Mountains campus recognized #1 Hospitality School in Asia-Pacific',
      'Direct streamlined university visa processing with high grant rates worldwide',
    ],
  },
  {
    id: 'lexis-group',
    code: 'LEXIS_GROUP',
    name: 'Lexis Education Group',
    tradingName: 'Lexis Group Australia',
    abn: '62 108 554 119',
    logoBg: 'bg-amber-700',
    headOffice: '60 Noosa Drive',
    headOfficeCity: 'Noosa Heads',
    headOfficeState: 'QLD',
    website: 'https://lexisenglish.com',
    groupCeo: 'Ian Pratt',
    headOfAdmissions: 'Brooke Bennett',
    contactEmail: 'registrations@lexisgroup.com',
    contactPhone: '+61 7 5447 4448',
    overview:
      'Lexis Education Group offers iconic coastal and metro study experiences across Noosa, Byron Bay, Perth, Brisbane, and Sydney, pairing ELICOS with hospitality, beauty, and business training.',
    collegeCount: 2,
    totalCampuses: 5,
    totalCourses: 22,
    states: ['QLD', 'NSW', 'WA'],
    masterCommissionTerms: {
      singleContractCoverage: true,
      baseRate: 25,
      tier1Rate: 28,
      platinumRate: 30,
      summary: 'Combined representation agreement offering top-tier Australian ELICOS and VET commission rates.',
      crossSellingBonus: 'Extra $500 bonus for packaging Noosa or Byron Bay with Perth campus.',
      paymentCycle: 'Instant / Same-Day CoE & Net 7 Days',
    },
    constituentColleges: [
      {
        id: 'lexis-english',
        name: 'Lexis English Australia',
        shortCode: 'LEXIS-ENG',
        cricos: '01632D',
        rto: '41178',
        providerType: 'Private ELICOS Institute',
        states: ['QLD', 'NSW', 'WA'],
        campusesCount: 5,
        highlightCourse: 'Cambridge Certificate in Advanced English (CAE)',
        minWeeklyTuition: 260,
        commissionRate: 25,
      },
      {
        id: 'lexis-training',
        name: 'Lexis Training Australia',
        shortCode: 'LEXIS-VET',
        cricos: '01632D',
        rto: '41178',
        providerType: 'Private VET Provider',
        states: ['QLD', 'NSW', 'WA'],
        campusesCount: 4,
        highlightCourse: 'Certificate IV in Commercial Cookery',
        minWeeklyTuition: 275,
        commissionRate: 24,
      },
    ],
    pathways: [
      {
        id: 'pwy-lex-1',
        title: 'Coastal English to Vocational Hospitality Pathway',
        leadCollege: 'Lexis English Australia',
        destinationCollege: 'Lexis Training Australia',
        qualification: 'Diploma of Hospitality Management',
        durationWeeks: 78,
        packagedCoEEligible: true,
        creditExemption: 'Direct entry into Commercial Cookery without IELTS exam',
        description: 'Category 3 Regional study experience with maximum regional migration visa points.',
      },
    ],
    governance: {
      asqaRiskTier: 'Low Risk (Tier 1)',
      teqsaAccredited: false,
      esosPrismsIntegrated: true,
      ombudsmanComplianceScore: 98.9,
      yearEstablished: 2004,
      regulatoryScope: 'ASQA RTO #41178 • CRICOS #01632D • English Australia Member',
    },
    highlights: [
      'Highest base commission rates in the sector (25% - 30%)',
      'Exclusive beachside campuses in Byron Bay & Noosa with Category 3 regional points',
      'Instant CoE issuance capability under 12 hours',
    ],
  },
  {
    id: 'tafe-group',
    code: 'TAFE_GROUP',
    name: 'TAFE NSW Network',
    tradingName: 'TAFE NSW International',
    abn: '39 238 428 584',
    logoBg: 'bg-red-800',
    headOffice: '19 Mary Ann Street, Ultimo',
    headOfficeCity: 'Sydney',
    headOfficeState: 'NSW',
    website: 'https://tafensw.edu.au',
    groupCeo: 'Stephen Brady',
    headOfAdmissions: 'Patricia Alvarez',
    contactEmail: 'tafensw.international@tafensw.edu.au',
    contactPhone: '+61 2 9217 4000',
    overview:
      'TAFE NSW is the government public vocational education and training authority for New South Wales, encompassing over 130 campus facilities across Sydney metro and regional NSW.',
    collegeCount: 5,
    totalCampuses: 18,
    totalCourses: 120,
    states: ['NSW'],
    masterCommissionTerms: {
      singleContractCoverage: true,
      baseRate: 15,
      tier1Rate: 18,
      platinumRate: 20,
      summary: 'NSW Government statutory agency agreement covering all regional and metropolitan institutes.',
      crossSellingBonus: 'Government regional scholarship allocations up to $2,000 per student.',
      paymentCycle: 'NSW Treasury Census Schedule (Net 30 Days)',
    },
    constituentColleges: [
      {
        id: 'tafe-sydney',
        name: 'TAFE NSW Sydney Metro (Ultimo & Randwick)',
        shortCode: 'TAFE-SYD',
        cricos: '00591E',
        rto: '90003',
        providerType: 'Public TAFE',
        states: ['NSW'],
        campusesCount: 6,
        highlightCourse: 'Diploma of Information Technology (Cybersecurity)',
        minWeeklyTuition: 320,
        commissionRate: 15,
      },
      {
        id: 'tafe-hunter',
        name: 'TAFE NSW Hunter & Central Coast',
        shortCode: 'TAFE-HUNTER',
        cricos: '00591E',
        rto: '90003',
        providerType: 'Public Regional TAFE',
        states: ['NSW'],
        campusesCount: 5,
        highlightCourse: 'Diploma of Nursing (HLT54121)',
        minWeeklyTuition: 330,
        commissionRate: 16,
      },
      {
        id: 'tafe-illawarra',
        name: 'TAFE NSW Illawarra & South Coast',
        shortCode: 'TAFE-ILLA',
        cricos: '00591E',
        rto: '90003',
        providerType: 'Public Regional TAFE',
        states: ['NSW'],
        campusesCount: 4,
        highlightCourse: 'Certificate IV in Commercial Cookery',
        minWeeklyTuition: 320,
        commissionRate: 15,
      },
    ],
    pathways: [
      {
        id: 'pwy-tafe-1',
        title: 'TAFE NSW Diploma to UTS & Western Sydney University Degree',
        leadCollege: 'TAFE NSW Sydney Metro',
        destinationCollege: 'University of Technology Sydney (UTS)',
        qualification: 'Bachelor of Science in Information Technology',
        durationWeeks: 104,
        packagedCoEEligible: true,
        creditExemption: '1.5 years credit transfer granted for completed TAFE Diploma',
        description: 'Guaranteed government-backed articulation to NSW universities.',
      },
    ],
    governance: {
      asqaRiskTier: 'Low Risk (Tier 1)',
      teqsaAccredited: true,
      esosPrismsIntegrated: true,
      ombudsmanComplianceScore: 100,
      yearEstablished: 1891,
      regulatoryScope: 'NSW Government Public Statutory Provider • CRICOS 00591E • ASQA 90003',
    },
    highlights: [
      'Largest public vocational provider in the Southern Hemisphere',
      'Government credentials and industry-grade training workshops',
      'Direct formal university articulation agreements across NSW institutions',
    ],
  },
  {
    id: 'neh-group',
    code: 'NEH_GROUP',
    name: 'National Education Holdings (NEH)',
    tradingName: 'National Education Group',
    abn: '52 619 402 119',
    logoBg: 'bg-cyan-800',
    headOffice: 'Level 5, 399 Lonsdale Street',
    headOfficeCity: 'Melbourne',
    headOfficeState: 'VIC',
    website: 'https://anc.vic.edu.au',
    groupCeo: 'Rajiv Sharma',
    headOfAdmissions: 'Priya Mehra',
    contactEmail: 'corporate@neh.edu.au',
    contactPhone: '+61 3 9642 0550',
    overview:
      'National Education Holdings operates Australian National College (ANC) and National Institute of Technology, focusing on high-demand vocational fields in business, hospitality, and cloud networking.',
    collegeCount: 2,
    totalCampuses: 3,
    totalCourses: 20,
    states: ['VIC', 'NSW'],
    masterCommissionTerms: {
      singleContractCoverage: true,
      baseRate: 22,
      tier1Rate: 25,
      platinumRate: 28,
      summary: 'Consolidated representation agreement with monthly commission payouts.',
      crossSellingBonus: 'Flexible monthly CoE payment installments for students.',
      paymentCycle: 'Monthly Net 10 Days',
    },
    constituentColleges: [
      {
        id: 'anc',
        name: 'Australian National College (ANC)',
        shortCode: 'ANC',
        cricos: '03310J',
        rto: '40847',
        providerType: 'Private VET & ELICOS',
        states: ['VIC', 'NSW'],
        campusesCount: 2,
        highlightCourse: 'Diploma of Business',
        minWeeklyTuition: 220,
        commissionRate: 22,
      },
      {
        id: 'nit-australia',
        name: 'National Institute of Technology (NIT)',
        shortCode: 'NIT',
        cricos: '03310J',
        rto: '40847',
        providerType: 'Vocational IT College',
        states: ['VIC'],
        campusesCount: 1,
        highlightCourse: 'Advanced Diploma of Cloud Architecture',
        minWeeklyTuition: 240,
        commissionRate: 23,
      },
    ],
    pathways: [
      {
        id: 'pwy-neh-1',
        title: 'ANC Diploma to Federation University Degree',
        leadCollege: 'Australian National College (ANC)',
        destinationCollege: 'Federation University Australia',
        qualification: 'Bachelor of Business',
        durationWeeks: 104,
        packagedCoEEligible: true,
        creditExemption: '1 year credit transfer into Bachelor program',
        description: 'Regional migration pathways available via Federation University campuses.',
      },
    ],
    governance: {
      asqaRiskTier: 'Low Risk (Tier 1)',
      teqsaAccredited: false,
      esosPrismsIntegrated: true,
      ombudsmanComplianceScore: 98.2,
      yearEstablished: 2008,
      regulatoryScope: 'ASQA RTO #40847 • CRICOS #03310J',
    },
    highlights: [
      'Most accessible weekly fee structures in Melbourne & Sydney ($220/wk)',
      'High visa grant record in Southeast Asia and Latin America',
      'Unified agency agreement covering all vocational certificate & diploma tracks',
    ],
  },
];

export default function PartnerSchoolsPortalPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Filters
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [regionalOnly, setRegionalOnly] = useState<boolean>(false);
  const [minCommission, setMinCommission] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'commission' | 'courses' | 'sla' | 'tuition'>('commission');
  const initialView = searchParams.get('view') === 'groups' ? 'groups' : 'grid';
  const [viewMode, setViewMode] = useState<'grid' | 'table' | 'by-state' | 'groups'>(initialView);

  // Modals, Education Groups & Comparison State
  const [inspectedSchool, setInspectedSchool] = useState<PartnerSchool | null>(null);
  const [activeDossierTab, setActiveDossierTab] = useState<'overview' | 'courses' | 'commissions' | 'admissions'>('overview');
  const [selectedGroup, setSelectedGroup] = useState<EducationGroupItem | null>(null);
  const [activeGroupTab, setActiveGroupTab] = useState<'colleges' | 'master-agreement' | 'pathways' | 'governance'>('colleges');
  const [groupSearchQuery, setGroupSearchQuery] = useState('');
  const [comparedSchoolIds, setComparedSchoolIds] = useState<string[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  // Filtered Education Groups
  const filteredGroups = useMemo(() => {
    return EDUCATION_GROUPS.filter((group) => {
      const matchesState = selectedState === 'All' || group.states.includes(selectedState);
      const q = (groupSearchQuery || searchQuery).toLowerCase().trim();
      const matchesSearch =
        !q ||
        group.name.toLowerCase().includes(q) ||
        (group.tradingName && group.tradingName.toLowerCase().includes(q)) ||
        (group.asxCode && group.asxCode.toLowerCase().includes(q)) ||
        (group.abn && group.abn.includes(q)) ||
        group.constituentColleges.some(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.cricos.toLowerCase().includes(q) ||
            c.rto.toLowerCase().includes(q) ||
            c.highlightCourse.toLowerCase().includes(q)
        );
      return matchesState && matchesSearch;
    });
  }, [selectedState, groupSearchQuery, searchQuery]);

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
              <button
                onClick={() => setViewMode('groups')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'groups' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                By Education Group
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-700">
                  {EDUCATION_GROUPS.length}
                </span>
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

                    {/* Education Group Affiliation Pill */}
                    {school.educationGroupName && (
                      <div className="mb-2.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const grp = EDUCATION_GROUPS.find((g) => g.id === school.educationGroupId);
                            if (grp) {
                              setSelectedGroup(grp);
                              setActiveGroupTab('colleges');
                            }
                          }}
                          className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-slate-700 hover:text-blue-700 bg-slate-50 hover:bg-blue-50/80 px-2.5 py-1 rounded-lg transition-colors border border-slate-200/80 cursor-pointer text-left w-full group/holding"
                          title="Click to view parent holding Education Group & master terms"
                        >
                          <Building className="w-3 h-3 text-blue-600 shrink-0 group-hover/holding:scale-110 transition-transform" />
                          <span className="truncate">Group: <strong className="text-slate-900 group-hover/holding:text-blue-700">{school.educationGroupName}</strong></span>
                          {school.educationGroupAsx && (
                            <span className="ml-auto text-[9px] font-mono px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 font-bold shrink-0">
                              {school.educationGroupAsx}
                            </span>
                          )}
                        </button>
                      </div>
                    )}

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
                            {s.educationGroupName && (
                              <button
                                type="button"
                                onClick={() => {
                                  const grp = EDUCATION_GROUPS.find((g) => g.id === s.educationGroupId);
                                  if (grp) {
                                    setSelectedGroup(grp);
                                    setActiveGroupTab('colleges');
                                  }
                                }}
                                className="inline-flex items-center gap-1 text-[10px] font-medium text-blue-700 hover:text-blue-900 bg-blue-50 px-1.5 py-0.5 rounded mt-0.5 cursor-pointer"
                                title="View Education Group"
                              >
                                <Building className="w-2.5 h-2.5" />
                                {s.educationGroupName}
                              </button>
                            )}
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
        {/* VIEW MODE 4: BY AUSTRALIAN EDUCATION GROUP (HOLDING ENTITIES)             */}
        {/* ========================================================================= */}
        {viewMode === 'groups' && (
          <div className="space-y-6">
            {/* Domain Context Explainer Banner */}
            <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-7 shadow-sm border border-slate-800">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
                    <Building2 className="w-3.5 h-3.5" />
                    Australian International Education Domain • Parent Holding Corporate Entities
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Education Groups (Multi-College Parent Holding Entities)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    In the Australian international education industry, an <strong>Education Group</strong> is a parent holding company that owns, acquires, and operates multiple distinct colleges (providers) under a single corporate entity. Each subsidiary college retains its own independent <strong>CRICOS code</strong>, <strong>RTO code</strong>, and campuses, while sharing unified enterprise governance, <strong>Master Agency Agreements</strong>, and in-group articulated study pathways.
                  </p>
                </div>

                <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 text-xs border border-white/15">
                    <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Single Master Agency Agreement</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 text-xs border border-white/15">
                    <GitCompare className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Pre-Packaged In-Group CoEs</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 text-xs border border-white/15">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Consolidated ASQA / TEQSA Risk</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Group Filter & Search Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 px-1">
              <span>
                Showing <strong>{filteredGroups.length}</strong> Education Groups operating{' '}
                <strong>{filteredGroups.reduce((acc, g) => acc + g.constituentColleges.length, 0)}</strong> member colleges across Australia.
              </span>
              <span className="text-slate-400 hidden sm:inline">
                Click any group card to review Master Representation terms &amp; articulated pathways.
              </span>
            </div>

            {/* Grid of Education Groups */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredGroups.map((group) => {
                return (
                  <Card
                    key={group.id}
                    className="p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-200 border-2 border-slate-200/90 hover:border-blue-400 bg-white"
                  >
                    <div className="space-y-4">
                      {/* Header: Logo, Name, ASX / ABN, Risk Tier */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3.5">
                          <div
                            className={`w-13 h-13 rounded-2xl ${group.logoBg} text-white font-black flex items-center justify-center text-sm shadow-md shrink-0`}
                          >
                            {group.code.substring(0, 3)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                                {group.name}
                              </h3>
                              {group.asxCode && (
                                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                                  {group.asxCode}
                                </span>
                              )}
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                                ABN {group.abn}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                              Trading as: <strong className="text-slate-700">{group.tradingName}</strong> • Head Office: {group.headOfficeCity}, {group.headOfficeState}
                            </p>
                          </div>
                        </div>

                        <Badge variant="success" className="text-[10px] py-1 shrink-0">
                          {group.governance.asqaRiskTier}
                        </Badge>
                      </div>

                      {/* Brief Overview */}
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {group.overview}
                      </p>

                      {/* Aggregate Metrics Strip */}
                      <div className="grid grid-cols-4 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-center">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">Colleges</span>
                          <span className="text-sm font-extrabold text-slate-900">{group.collegeCount}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">Campuses</span>
                          <span className="text-sm font-extrabold text-slate-900">{group.totalCampuses}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">CRICOS Courses</span>
                          <span className="text-sm font-extrabold text-blue-700">{group.totalCourses}+</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">Coverage</span>
                          <span className="text-xs font-bold text-slate-700">{group.states.join(', ')}</span>
                        </div>
                      </div>

                      {/* Master Commission Terms Highlight Box */}
                      <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
                          <span className="flex items-center gap-1.5">
                            <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                            Unified Master Agency Agreement
                          </span>
                          <span className="font-mono text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded text-[11px]">
                            {group.masterCommissionTerms.baseRate}% – {group.masterCommissionTerms.platinumRate}%
                          </span>
                        </div>
                        <p className="text-[11px] text-emerald-900 leading-snug">
                          {group.masterCommissionTerms.summary}
                        </p>
                        <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-800 font-medium">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>{group.masterCommissionTerms.crossSellingBonus}</span>
                        </div>
                      </div>

                      {/* Constituent Member Colleges Badges */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          <span>Constituent Member Colleges ({group.constituentColleges.length}):</span>
                          <span className="text-[10px] font-normal lowercase text-slate-400">individual cricos registrations</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {group.constituentColleges.map((college) => (
                            <div
                              key={college.id}
                              className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/40 border border-slate-200/80 transition-colors"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-slate-900 text-xs truncate max-w-[170px]" title={college.name}>
                                  {college.name}
                                </span>
                                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-200 text-slate-800">
                                  {college.shortCode}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                                <span>CRICOS {college.cricos}</span>
                                <span>RTO #{college.rto}</span>
                              </div>
                              <div className="text-[10px] text-slate-600 truncate mt-1">
                                {college.highlightCourse}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Articulated Pathways Preview */}
                      {group.pathways.length > 0 && (
                        <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200/80 space-y-1 text-xs">
                          <div className="flex items-center gap-1.5 font-bold text-blue-950 text-[11px]">
                            <GitCompare className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>In-Group Articulated Pathway: {group.pathways[0].title}</span>
                          </div>
                          <p className="text-[11px] text-blue-900 line-clamp-1">
                            {group.pathways[0].leadCollege} → {group.pathways[0].destinationCollege} ({group.pathways[0].creditExemption})
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center gap-2.5 pt-4 mt-4 border-t border-slate-100">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setSelectedGroup(group);
                          setActiveGroupTab('master-agreement');
                        }}
                        className="flex-1 text-xs font-semibold"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Master Terms
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedGroup(group);
                          setActiveGroupTab('colleges');
                        }}
                        className="flex-1 text-xs font-semibold"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Inspect Group Dossier
                        <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
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
        {/* SLIDE-OVER EDUCATION GROUP DEEP-DIVE DOSSIER DRAWER                       */}
        {/* ========================================================================= */}
        {selectedGroup && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-hidden">
              {/* Drawer Top Header */}
              <div className="p-6 border-b border-slate-100 bg-slate-50/70">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl ${selectedGroup.logoBg} text-white font-black text-sm flex items-center justify-center shadow-md`}
                    >
                      {selectedGroup.code.substring(0, 3)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-lg font-bold text-slate-900">{selectedGroup.name}</h2>
                        {selectedGroup.asxCode && (
                          <Badge variant="success" className="text-[10px] py-0.5">
                            {selectedGroup.asxCode}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="default">ABN {selectedGroup.abn}</Badge>
                        <span className="text-xs text-slate-500 font-medium">
                          {selectedGroup.collegeCount} Constituent Colleges • {selectedGroup.totalCampuses} Campuses
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedGroup(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Tab switcher inside group dossier */}
                <div className="flex items-center gap-1 mt-6 border-b border-slate-200 overflow-x-auto">
                  <button
                    onClick={() => setActiveGroupTab('colleges')}
                    className={`pb-2.5 px-3 text-xs font-bold transition-all cursor-pointer border-b-2 whitespace-nowrap ${
                      activeGroupTab === 'colleges'
                        ? 'border-blue-600 text-blue-700'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Constituent Colleges ({selectedGroup.constituentColleges.length})
                  </button>
                  <button
                    onClick={() => setActiveGroupTab('master-agreement')}
                    className={`pb-2.5 px-3 text-xs font-bold transition-all cursor-pointer border-b-2 whitespace-nowrap ${
                      activeGroupTab === 'master-agreement'
                        ? 'border-blue-600 text-blue-700'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Master Agency Agreement
                  </button>
                  <button
                    onClick={() => setActiveGroupTab('pathways')}
                    className={`pb-2.5 px-3 text-xs font-bold transition-all cursor-pointer border-b-2 whitespace-nowrap ${
                      activeGroupTab === 'pathways'
                        ? 'border-blue-600 text-blue-700'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    In-Group Pathways ({selectedGroup.pathways.length})
                  </button>
                  <button
                    onClick={() => setActiveGroupTab('governance')}
                    className={`pb-2.5 px-3 text-xs font-bold transition-all cursor-pointer border-b-2 whitespace-nowrap ${
                      activeGroupTab === 'governance'
                        ? 'border-blue-600 text-blue-700'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Corporate Governance
                  </button>
                </div>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-600">
                {/* TAB 1: CONSTITUENT COLLEGES */}
                {activeGroupTab === 'colleges' && (
                  <div className="space-y-4">
                    <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-blue-950 space-y-1">
                      <div className="flex items-center gap-2 font-bold text-xs">
                        <Building2 className="w-4 h-4 text-blue-600" />
                        <span>Corporate Multi-College Operating Architecture</span>
                      </div>
                      <p className="text-[11px] text-blue-900 leading-relaxed">
                        Under Australian ESOS regulation, each member college maintains its own distinct CRICOS registration number, ASQA/TEQSA approval scope, and accredited qualifications, while operating under the central administrative governance of {selectedGroup.name}.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {selectedGroup.constituentColleges.map((college) => (
                        <div
                          key={college.id}
                          className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-all space-y-3 shadow-2xs"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900 text-sm">{college.name}</span>
                                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                                  {college.shortCode}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono mt-0.5">
                                <span>CRICOS: <strong className="text-slate-800">{college.cricos}</strong></span>
                                <span>•</span>
                                <span>RTO/PRV: <strong className="text-slate-800">{college.rto}</strong></span>
                              </div>
                            </div>
                            <Badge variant="default" className="text-[10px]">
                              {college.providerType}
                            </Badge>
                          </div>

                          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                              Flagship Specialization:
                            </span>
                            <span className="text-xs font-semibold text-slate-900">
                              {college.highlightCourse}
                            </span>
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-center pt-1 text-[11px]">
                            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                              <span className="text-slate-400 block text-[10px]">Tuition From</span>
                              <span className="font-bold text-slate-900">
                                {college.minWeeklyTuition > 0 ? `A$${college.minWeeklyTuition}/wk` : 'Custom Scope'}
                              </span>
                            </div>
                            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                              <span className="text-slate-400 block text-[10px]">Base Commission</span>
                              <span className="font-bold text-emerald-700">
                                {college.commissionRate > 0 ? `${college.commissionRate}%` : 'Standard'}
                              </span>
                            </div>
                            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                              <span className="text-slate-400 block text-[10px]">Campuses</span>
                              <span className="font-bold text-blue-700">{college.campusesCount} Facilities</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                            <span className="text-[11px] text-slate-500">
                              States: <strong className="text-slate-700">{college.states.join(', ')}</strong>
                            </span>
                            <div className="flex items-center gap-2">
                              <Link to="/courses">
                                <Button variant="secondary" size="sm" className="h-7 text-xs px-2.5">
                                  Courses
                                </Button>
                              </Link>
                              <Link to="/quotes">
                                <Button size="sm" className="h-7 text-xs px-2.5">
                                  Quote
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 2: MASTER AGENCY AGREEMENT */}
                {activeGroupTab === 'master-agreement' && (
                  <div className="space-y-5">
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-emerald-950 text-sm">
                        <FileCheck className="w-4 h-4 text-emerald-600" />
                        <span>Single Master Representation Guarantee</span>
                      </div>
                      <p className="text-xs text-emerald-900 leading-relaxed">
                        Under {selectedGroup.name}&apos;s Master Agency Agreement, your agency signs <strong>one single corporate agreement</strong> that legally authorizes representation across all {selectedGroup.collegeCount} constituent member colleges without duplicate onboarding, reference vetting, or secondary contracts.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                      <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                        Master Commission Schedule
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">Base Rate</span>
                          <span className="text-lg font-black text-emerald-700">{selectedGroup.masterCommissionTerms.baseRate}%</span>
                          <span className="text-[10px] text-slate-500 block">Default Tier</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">Tier-1 Volume</span>
                          <span className="text-lg font-black text-blue-700">{selectedGroup.masterCommissionTerms.tier1Rate}%</span>
                          <span className="text-[10px] text-slate-500 block">5+ Enrolments/yr</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">Platinum Rate</span>
                          <span className="text-lg font-black text-purple-700">{selectedGroup.masterCommissionTerms.platinumRate}%</span>
                          <span className="text-[10px] text-slate-500 block">20+ Enrolments/yr</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-950 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-xs">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          <span>Cross-Selling &amp; Packaging Override Bonus</span>
                        </div>
                        <p className="text-[11px] text-amber-900">
                          {selectedGroup.masterCommissionTerms.crossSellingBonus}
                        </p>
                      </div>

                      <div className="text-[11px] text-slate-500 space-y-1 pt-1">
                        <div>
                          <strong>Settlement Schedule:</strong> {selectedGroup.masterCommissionTerms.paymentCycle}
                        </div>
                        <div>
                          <strong>Contract Terms:</strong> Continuous 3-year term with automatic annual PRISMS review.
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                      <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                        Australian Compliance &amp; Standard 4 Protection
                      </h4>
                      <ul className="space-y-1.5 text-[11px] text-slate-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>National Code 2018 Standard 4 compliance verified with transparent PRISMS agent listing.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Consolidated student tuition protection service (TPS) coverage under Australian Education Services for Overseas Students (ESOS) Act.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Single central invoice settlement portal: all member college commission claims routed through one finance desk.</span>
                        </li>
                      </ul>
                    </div>

                    <Button
                      variant="secondary"
                      onClick={() =>
                        toast(
                          `Master Agency Representation Agreement (.PDF) dispatched to your registered agency email`,
                          'success'
                        )
                      }
                      className="w-full text-xs font-bold h-9"
                    >
                      <Download className="w-3.5 h-3.5 mr-1" />
                      Download Master Agreement Contract Template (.PDF)
                    </Button>
                  </div>
                )}

                {/* TAB 3: IN-GROUP PATHWAYS */}
                {activeGroupTab === 'pathways' && (
                  <div className="space-y-4">
                    <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-950 space-y-1">
                      <div className="flex items-center gap-2 font-bold text-xs">
                        <GitCompare className="w-4 h-4 text-indigo-600" />
                        <span>Seamless Packaged CoE Issuance Under Single Visa</span>
                      </div>
                      <p className="text-[11px] text-indigo-900 leading-relaxed">
                        Member colleges within {selectedGroup.name} provide pre-articulated study pathways. International students can be issued combined, concurrent PRISMS CoEs enabling them to apply for a single Australian Student Visa (Subclass 500) spanning multiple successive qualifications.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {selectedGroup.pathways.map((pwy) => (
                        <div
                          key={pwy.id}
                          className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 shadow-2xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 text-sm">{pwy.title}</span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                              <Check className="w-3 h-3 text-emerald-600" />
                              Packaged CoE Eligible
                            </span>
                          </div>

                          {/* Pathway visual flow */}
                          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between gap-2 text-xs">
                            <div className="flex-1">
                              <span className="text-[10px] text-slate-400 font-bold block uppercase">Step 1 • Lead College</span>
                              <span className="font-bold text-slate-900">{pwy.leadCollege}</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-blue-600 shrink-0" />
                            <div className="flex-1 text-right">
                              <span className="text-[10px] text-slate-400 font-bold block uppercase">Step 2 • Destination</span>
                              <span className="font-bold text-blue-700">{pwy.destinationCollege}</span>
                            </div>
                          </div>

                          <div className="space-y-1.5 text-[11px]">
                            <div>
                              <strong className="text-slate-700">Target Qualification:</strong> {pwy.qualification}
                            </div>
                            <div>
                              <strong className="text-slate-700">Total Program Duration:</strong> {pwy.durationWeeks} Weeks
                            </div>
                            <div>
                              <strong className="text-slate-700">Credit Exemption &amp; Prerequisites:</strong>{' '}
                              <span className="text-emerald-800 font-semibold">{pwy.creditExemption}</span>
                            </div>
                            <p className="text-slate-500 pt-1 leading-relaxed">
                              {pwy.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 4: CORPORATE GOVERNANCE */}
                {activeGroupTab === 'governance' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                      <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                        Corporate Legal Entity Registration
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-[11px]">
                        <div>
                          <span className="text-slate-400 block">Corporate Name</span>
                          <span className="font-semibold text-slate-900">{selectedGroup.name}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Australian Business Number</span>
                          <span className="font-mono font-semibold text-slate-900">{selectedGroup.abn}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Australian Company Number</span>
                          <span className="font-mono font-semibold text-slate-900">{selectedGroup.acn || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">ASX Ticker Code</span>
                          <span className="font-mono font-bold text-emerald-700">{selectedGroup.asxCode || 'Private Company'}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-slate-400 block">Head Office Address</span>
                          <span className="font-semibold text-slate-900">
                            {selectedGroup.headOffice}, {selectedGroup.headOfficeCity} {selectedGroup.headOfficeState} Australia
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                      <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                        Regulatory Risk &amp; Compliance Profile
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-[11px]">
                        <div>
                          <span className="text-slate-400 block">ASQA / TEQSA Risk Tier</span>
                          <span className="font-bold text-emerald-700">{selectedGroup.governance.asqaRiskTier}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">PRISMS System Status</span>
                          <span className="font-bold text-blue-700">Direct API Integration</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Ombudsman Compliance Score</span>
                          <span className="font-bold text-slate-900">{selectedGroup.governance.ombudsmanComplianceScore}%</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Year Established</span>
                          <span className="font-bold text-slate-900">{selectedGroup.governance.yearEstablished}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-slate-400 block">Regulatory Scope</span>
                          <span className="font-mono text-slate-700">{selectedGroup.governance.regulatoryScope}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                      <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                        Corporate Executive Admissions Desk
                      </h4>
                      <div className="space-y-2 text-[11px]">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Group Chief Executive Officer (CEO):</span>
                          <span className="font-bold text-slate-900">{selectedGroup.groupCeo}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Head of International Admissions:</span>
                          <span className="font-bold text-slate-900">{selectedGroup.headOfAdmissions}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Corporate Email:</span>
                          <a href={`mailto:${selectedGroup.contactEmail}`} className="font-semibold text-blue-600 hover:underline">
                            {selectedGroup.contactEmail}
                          </a>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Direct Phone:</span>
                          <span className="font-mono font-semibold text-slate-800">{selectedGroup.contactPhone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Bottom Actions */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedGroup(null)}
                  className="text-xs"
                >
                  Close Dossier
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      toast(`Initiated direct contact request with ${selectedGroup.name} Admissions Desk`, 'success');
                    }}
                    className="text-xs font-semibold"
                  >
                    <Mail className="w-3.5 h-3.5 mr-1" />
                    Contact Admissions
                  </Button>
                  <Link to="/quotes">
                    <Button size="sm" className="text-xs font-bold">
                      Quote Group Member
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
