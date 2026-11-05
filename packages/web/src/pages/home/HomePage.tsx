import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Building2,
  GraduationCap,
  FileText,
  Shield,
  Users,
  Globe,
  CheckCircle2,
  ArrowRight,
  Star,
  BookOpen,
  CalendarDays,
  TrendingUp,
  School,
  Eye,
  EyeOff,
  Lock,
  Sparkles,
  MapPin,
  Calculator,
  ShieldCheck,
  Zap,
  Award,
  ChevronRight,
  ChevronDown,
  Layers,
  Check,
  ArrowUpRight,
  BadgePercent,
  Clock,
  FileCheck2,
  HelpCircle,
  Briefcase,
  Search,
} from 'lucide-react';
import { useAuth, PortalRoleType } from '../../lib/auth';

type CourseOption = {
  id: string;
  title: string;
  stream: string;
  cricos: string;
  provider: string;
  weeklyRate: number;
  promoWeeklyRate: number;
  promoBadge: string;
  materialFee: number;
  enrolmentFee: number;
  defaultWeeks: number;
};

const SIMULATOR_COURSES: CourseOption[] = [
  {
    id: 'elicos',
    title: 'General English (ELICOS Intensive)',
    stream: 'ELICOS English',
    cricos: '098412B',
    provider: 'Australian Pacific College',
    weeklyRate: 350,
    promoWeeklyRate: 280,
    promoBadge: '20% Q3 Scholarship',
    materialFee: 0,
    enrolmentFee: 200,
    defaultWeeks: 20,
  },
  {
    id: 'ielts-prep',
    title: 'IELTS & Cambridge C1 Exam Preparation',
    stream: 'ELICOS English',
    cricos: '099140M',
    provider: 'Greenwich English College',
    weeklyRate: 370,
    promoWeeklyRate: 295,
    promoBadge: '$75/wk Fee Reduction',
    materialFee: 100,
    enrolmentFee: 200,
    defaultWeeks: 20,
  },
  {
    id: 'leadership',
    title: 'Diploma of Leadership & Management (BSB50420)',
    stream: 'VET Business & Management',
    cricos: '104112A',
    provider: 'Australian Pacific College',
    weeklyRate: 160,
    promoWeeklyRate: 130,
    promoBadge: '$1,560 Regional Bursary',
    materialFee: 0,
    enrolmentFee: 200,
    defaultWeeks: 52,
  },
  {
    id: 'marketing',
    title: 'Certificate IV in Marketing & Communication (BSB40820)',
    stream: 'VET Business & Management',
    cricos: '105881E',
    provider: 'Australian Pacific College',
    weeklyRate: 155,
    promoWeeklyRate: 125,
    promoBadge: '$1,200 Tuition Waiver',
    materialFee: 0,
    enrolmentFee: 200,
    defaultWeeks: 40,
  },
  {
    id: 'project-mgmt',
    title: 'Diploma of Project Management (BSB50820)',
    stream: 'VET Business & Management',
    cricos: '104992K',
    provider: 'ILSC Greystone College',
    weeklyRate: 165,
    promoWeeklyRate: 135,
    promoBadge: 'Free Enrolment + Bursary',
    materialFee: 150,
    enrolmentFee: 0,
    defaultWeeks: 52,
  },
  {
    id: 'it',
    title: 'Advanced Diploma of Information Technology (ICT60220)',
    stream: 'VET IT & Cyber Security',
    cricos: '108721M',
    provider: 'Greenwich College Australia',
    weeklyRate: 200,
    promoWeeklyRate: 170,
    promoBadge: '15% STEM Pathway Grant',
    materialFee: 150,
    enrolmentFee: 250,
    defaultWeeks: 52,
  },
  {
    id: 'hospitality',
    title: 'Diploma of Hospitality Management (SIT50422)',
    stream: 'Hospitality & Culinary',
    cricos: '109884B',
    provider: 'Australian Pacific College',
    weeklyRate: 185,
    promoWeeklyRate: 150,
    promoBadge: 'Paid Industry Placement',
    materialFee: 250,
    enrolmentFee: 200,
    defaultWeeks: 52,
  },
];

const FEATURED_PROVIDERS = [
  {
    name: 'Australian Pacific College (APC)',
    rto: '45123',
    cricos: '03812M',
    states: ['NSW', 'VIC', 'QLD'],
    campuses: 'Sydney CBD • Manly • Melbourne • Brisbane • Gold Coast',
    scholarship: '20% Off ELICOS + $0 Material Fee',
    coursesCount: 18,
    turnaround: '24h Offer SLA',
    commission: '22% Preferred Tier',
    visaRate: '98.9% Visa Grant',
    nextIntake: 'Nov 2026 / Feb 2027',
    popularStreams: ['ELICOS English', 'Diploma of Leadership', 'Marketing BSB40820'],
    accent: 'from-blue-600 to-indigo-600',
  },
  {
    name: 'Greenwich English & Management College',
    rto: '91153',
    cricos: '02672K',
    states: ['NSW', 'VIC', 'QLD', 'WA'],
    campuses: 'Sydney • Melbourne • Brisbane • Perth • Gold Coast',
    scholarship: '$1,500 Onshore & Regional Campus Grant',
    coursesCount: 22,
    turnaround: '48h Offer SLA',
    commission: '20% Tier-1 Partner',
    visaRate: '98.4% Visa Grant',
    nextIntake: 'Monthly Intakes (Dec 2026)',
    popularStreams: ['IELTS Preparation', 'Cambridge C1/C2', 'Project Management'],
    accent: 'from-emerald-600 to-teal-600',
  },
  {
    name: 'ILSC & Greystone College Australia',
    rto: '31564',
    cricos: '02137M',
    states: ['NSW', 'VIC', 'QLD', 'SA'],
    campuses: 'Sydney • Melbourne • Brisbane • Adelaide',
    scholarship: 'Free Enrolment ($250 Value) + Co-op Placement',
    coursesCount: 15,
    turnaround: '24h Offer SLA',
    commission: '20% Tier-1 Partner',
    visaRate: '99.1% Visa Grant',
    nextIntake: 'Every Monday for ELICOS • VET Terms',
    popularStreams: ['General English', 'Hospitality SIT50422', 'Digital Marketing'],
    accent: 'from-indigo-600 to-violet-600',
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { switchRole } = useAuth();

  const [audience, setAudience] = useState<'agent' | 'school' | 'admin'>('agent');
  const [revealedCommissions, setRevealedCommissions] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Interactive Quote Simulator state
  const [selectedCourseId, setSelectedCourseId] = useState<string>('elicos');
  const [selectedCity, setSelectedCity] = useState<string>('Sydney CBD');
  const [weeks, setWeeks] = useState<number>(20);
  const [includeOshc, setIncludeOshc] = useState<boolean>(true);
  const [simCurrency, setSimCurrency] = useState<'AUD' | 'USD' | 'BRL' | 'JPY'>('AUD');
  const [simPaymentPlan, setSimPaymentPlan] = useState<'instalment' | 'upfront'>('instalment');
  const [stateFilter, setStateFilter] = useState<string>('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const fxMap = {
    AUD: { sym: 'A$', rate: 1 },
    USD: { sym: 'US$', rate: 0.66 },
    BRL: { sym: 'R$', rate: 3.78 },
    JPY: { sym: '¥', rate: 101.4 },
  }[simCurrency];

  const fmtSimMoney = (aud: number) =>
    `${fxMap.sym}${Math.round(aud * fxMap.rate).toLocaleString()} ${simCurrency}`;

  const activeCourse =
    SIMULATOR_COURSES.find((c) => c.id === selectedCourseId) || SIMULATOR_COURSES[0];

  const standardTuition = activeCourse.weeklyRate * weeks;
  const promoTuition = activeCourse.promoWeeklyRate * weeks;
  const scholarshipSavings = standardTuition - promoTuition;
  const oshcCost = includeOshc ? Math.round(weeks * 14) : 0;
  const basePackage =
    promoTuition + activeCourse.materialFee + activeCourse.enrolmentFee + oshcCost;
  const upfrontDiscount = simPaymentPlan === 'upfront' ? Math.round(basePackage * 0.05) : 0;
  const netPayable = basePackage - upfrontDiscount;

  const launchDemoPortal = (role: PortalRoleType, path: string) => {
    switchRole(role);
    navigate(path);
  };

  const filteredProviders =
    stateFilter === 'All'
      ? FEATURED_PROVIDERS
      : FEATURED_PROVIDERS.filter((p) => p.states.includes(stateFilter));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Sticky Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-2.5 group shrink-0"
            style={{ textDecoration: 'none' }}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-xs shadow-blue-600/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight whitespace-nowrap">
                AusEdu Connect
              </span>
              <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80">
                CRICOS OS
              </span>
            </div>
          </NavLink>

          {/* Center Pill Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-100/90 border border-slate-200/70">
            {[
              { label: 'Quote Simulator', href: '#simulator' },
              { label: 'Partner Schools', href: '#providers' },
              { label: 'Features', href: '#features' },
              { label: 'Accreditations', href: '#accreditations' },
              { label: 'How It Works', href: '#how-it-works' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-2xs transition-all whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Actions: Quick Portal Switcher + Auth CTAs */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200/70">
              <button
                type="button"
                onClick={() => launchDemoPortal('agent', '/agent/dashboard')}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-700 hover:text-blue-700 hover:bg-white hover:shadow-2xs transition-all cursor-pointer whitespace-nowrap"
                title="Open Live Agent Portal Demo"
              >
                Agent Demo
              </button>
              <button
                type="button"
                onClick={() => launchDemoPortal('school_admin', '/school-admin/dashboard')}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-white hover:shadow-2xs transition-all cursor-pointer whitespace-nowrap"
                title="Open Live School Admin Demo"
              >
                School Demo
              </button>
            </div>

            <NavLink
              to="/login"
              style={{ textDecoration: 'none' }}
              className="hidden sm:inline-flex items-center justify-center px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all whitespace-nowrap"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              style={{ textDecoration: 'none' }}
              className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xs shadow-blue-600/20 whitespace-nowrap"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
            </NavLink>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileNavOpen ? <ChevronDown className="w-4 h-4 rotate-180 transition-transform" /> : <Layers className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileNavOpen && (
          <div className="lg:hidden border-t border-slate-200/80 bg-white px-4 py-4 space-y-3 shadow-lg">
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Quote Simulator', href: '#simulator' },
                { label: 'Partner Schools', href: '#providers' },
                { label: 'Features', href: '#features' },
                { label: 'Accreditations', href: '#accreditations' },
                { label: 'How It Works', href: '#how-it-works' },
                { label: 'Testimonials', href: '#testimonials' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
              <NavLink
                to="/login"
                onClick={() => setMobileNavOpen(false)}
                className="py-2.5 px-3 rounded-xl text-xs font-bold text-center bg-slate-100 text-slate-800 hover:bg-slate-200"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                onClick={() => setMobileNavOpen(false)}
                className="py-2.5 px-3 rounded-xl text-xs font-bold text-center bg-blue-600 text-white hover:bg-blue-700"
              >
                Create Account
              </NavLink>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
              <button
                type="button"
                onClick={() => launchDemoPortal('agent', '/agent/dashboard')}
                className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 cursor-pointer text-center"
              >
                Agent Demo
              </button>
              <button
                type="button"
                onClick={() => launchDemoPortal('school_admin', '/school-admin/dashboard')}
                className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-pointer text-center"
              >
                School Demo
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section with Interactive Quote & Scholarship Simulator (Viewport-Optimized) */}
      <section
        id="simulator"
        className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/20 to-slate-50 min-h-0 lg:min-h-[calc(100vh-4rem)] flex items-center py-6 sm:py-10 lg:py-4 border-b border-slate-200/80"
      >
        {/* Subtle Ambient Background Grid */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 right-1/4 w-[480px] h-[480px] rounded-full bg-blue-100/40 blur-3xl" />
          <div className="absolute top-1/2 -left-20 w-[380px] h-[380px] rounded-full bg-emerald-100/30 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
            {/* Left 7 Columns: Role-Aware Value Proposition & Instant Demo Launchers */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-3.5 lg:space-y-4 text-center lg:text-left">
              {/* Status Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[11px] font-bold text-slate-800">
                  ESOS National Code 2018 &amp; PRISMS Ready
                </span>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                  v2.4 Release
                </span>
              </div>

              {/* Dynamic Audience Selector */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1 p-1 rounded-xl bg-slate-200/70 border border-slate-200 w-full sm:w-fit mx-auto lg:mx-0">
                <button
                  type="button"
                  onClick={() => setAudience('agent')}
                  className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    audience === 'agent'
                      ? 'bg-white text-blue-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                  <span>For Agencies</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAudience('school')}
                  className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    audience === 'school'
                      ? 'bg-white text-emerald-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <School className="w-3.5 h-3.5 shrink-0" />
                  <span>For CRICOS Colleges</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAudience('admin')}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    audience === 'admin'
                      ? 'bg-white text-indigo-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>Multi-Tenant Governance</span>
                </button>
              </div>

              {/* Headline */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[34px] xl:text-[40px] font-extrabold tracking-tight text-slate-900 leading-[1.15] break-words">
                {audience === 'agent' && (
                  <>
                    Quote Australian CRICOS Courses &amp;{' '}
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Close Visas 3× Faster
                    </span>
                  </>
                )}
                {audience === 'school' && (
                  <>
                    Fill Campus Intakes &amp; Automate{' '}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      ASQA &amp; PRISMS CoEs
                    </span>
                  </>
                )}
                {audience === 'admin' && (
                  <>
                    Enterprise Control Plane for{' '}
                    <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                      Multi-Campus RTO Networks
                    </span>
                  </>
                )}
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {audience === 'agent' &&
                  'Compare 52+ verified Australian schools, auto-apply regional nationality scholarships, bundle Subclass 500 OSHC cover, and issue branded student Letters of Offer in under 30 seconds.'}
                {audience === 'school' &&
                  'Broadcast targeted tuition scholarships to 9,000+ global counselors, monitor real-time campus seat capacity across Sydney, Melbourne & Brisbane, and manage ASQA audit artifacts in one vault.'}
                {audience === 'admin' &&
                  'Provision CRICOS provider tenants, enforce zero-trust Role-Based Access Control (RBAC) across agencies and admissions officers, and maintain 100% ESOS National Code audit readiness.'}
              </p>

              {/* Feature Checkmarks */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1.5 text-xs font-semibold text-slate-700">
                {(audience === 'agent'
                  ? [
                      'Auto-Applied Regional Scholarships',
                      'Instant Branded PDF Quotes',
                      'Transparent 22% Commission Ledger',
                    ]
                  : audience === 'school'
                  ? [
                      '1-Click PRISMS CoE Dispatch',
                      'Live Campus Cap Utilization',
                      'ASQA Scope & TAS Compliance Vault',
                    ]
                  : [
                      'Multi-RTO Tenant Provisioning',
                      'Interactive RBAC Policy Matrix',
                      'ISO-27001 & GDPR Encrypted Vault',
                    ]
                ).map((feat) => (
                  <span key={feat} className="inline-flex items-center gap-1.5">
                    <CheckCircle2
                      className={`w-3.5 h-3.5 shrink-0 ${
                        audience === 'school'
                          ? 'text-emerald-600'
                          : audience === 'admin'
                          ? 'text-indigo-600'
                          : 'text-blue-600'
                      }`}
                    />
                    {feat}
                  </span>
                ))}
              </div>

              {/* Primary CTAs + 1-Click Live Workspace Jumpers */}
              <div className="pt-1 space-y-2.5">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 w-full sm:w-auto">
                  <NavLink to="/signup" style={{ textDecoration: 'none' }} className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white rounded-xl bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20 cursor-pointer">
                      Create Partner Account
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </NavLink>

                  <button
                    type="button"
                    onClick={() =>
                      launchDemoPortal(
                        audience === 'school'
                          ? 'school_admin'
                          : audience === 'admin'
                          ? 'super_admin'
                          : 'agent',
                        audience === 'school'
                          ? '/school-admin/dashboard'
                          : audience === 'admin'
                          ? '/admin'
                          : '/agent/dashboard'
                      )
                    }
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-800 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition-all shadow-2xs cursor-pointer"
                  >
                    <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>
                      Launch Live{' '}
                      {audience === 'school'
                        ? 'School Admin'
                        : audience === 'admin'
                        ? 'Platform Admin'
                        : 'Agent'}{' '}
                      Workspace
                    </span>
                  </button>
                </div>

                {/* Direct 3-Portal Quick Bar */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-400">1-Click Live Demos:</span>
                  <button
                    type="button"
                    onClick={() => launchDemoPortal('agent', '/agent/dashboard')}
                    className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    Agent Hub →
                  </button>
                  <button
                    type="button"
                    onClick={() => launchDemoPortal('school_admin', '/school-admin/dashboard')}
                    className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold hover:bg-emerald-100 transition-colors cursor-pointer"
                  >
                    School Admin →
                  </button>
                  <button
                    type="button"
                    onClick={() => launchDemoPortal('super_admin', '/admin')}
                    className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-semibold hover:bg-indigo-100 transition-colors cursor-pointer"
                  >
                    Governance &amp; RBAC →
                  </button>
                </div>
              </div>

              {/* Executive Metrics Strip */}
              <div className="pt-3 border-t border-slate-200/80 grid grid-cols-3 gap-2 sm:gap-3 max-w-md mx-auto lg:mx-0 text-center sm:text-left">
                <div>
                  <p className="text-lg sm:text-2xl font-extrabold text-slate-900">52+</p>
                  <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 leading-tight">CRICOS Colleges</p>
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-extrabold text-slate-900">1,240+</p>
                  <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 leading-tight">Accredited Courses</p>
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-extrabold text-emerald-600">$142M+</p>
                  <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 leading-tight">Tuition Quoted</p>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Live Interactive Australian Tuition & Scholarship Calculator */}
            <div className="lg:col-span-5 xl:col-span-5 relative w-full max-w-xl mx-auto lg:max-w-none">
              {/* Ambient Glow Backdrop */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-emerald-500/10 rounded-3xl blur-xl opacity-60 pointer-events-none" />

              <div className="relative bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-900/5 overflow-hidden">
                {/* Calculator Header Bar — Daylight First Aesthetic */}
                <div className="bg-gradient-to-b from-slate-50 to-white px-3.5 py-3 sm:px-5 sm:py-3.5 border-b border-slate-200/80">
                  <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live PRISMS Quote Engine
                    </div>

                    {/* Currency Selector Pills */}
                    <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-lg border border-slate-200/70">
                      {(['AUD', 'USD', 'BRL', 'JPY'] as const).map((cur) => (
                        <button
                          key={cur}
                          type="button"
                          onClick={() => setSimCurrency(cur)}
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                            simCurrency === cur
                              ? 'bg-blue-600 text-white shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                          }`}
                        >
                          {cur}
                        </button>
                      ))}
                    </div>
                  </div>

                  <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                    CRICOS Tuition &amp; Scholarship Calculator
                  </h2>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Itemized Australian fees, regional discounts &amp; student visa deposits
                  </p>
                </div>

                {/* Calculator Body Controls */}
                <div className="p-3.5 sm:p-4 space-y-2.5">
                  {/* 1. Accredited CRICOS Program Dropdown */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label
                        htmlFor="cricos-program-select"
                        className="block text-[10px] font-bold uppercase tracking-wider text-slate-500"
                      >
                        1. Accredited CRICOS Program
                      </label>
                      <span className="text-[10px] font-bold text-blue-600">
                        {SIMULATOR_COURSES.length} Streams
                      </span>
                    </div>

                    <div className="relative">
                      <select
                        id="cricos-program-select"
                        value={selectedCourseId}
                        onChange={(e) => {
                          const found = SIMULATOR_COURSES.find((c) => c.id === e.target.value);
                          setSelectedCourseId(e.target.value);
                          if (found) setWeeks(found.defaultWeeks);
                        }}
                        className="w-full h-9 appearance-none rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white pl-3 pr-8 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer"
                      >
                        {['ELICOS English', 'VET Business & Management', 'VET IT & Cyber Security', 'Hospitality & Culinary'].map(
                          (streamGroup) => (
                            <optgroup key={streamGroup} label={streamGroup}>
                              {SIMULATOR_COURSES.filter((c) => c.stream === streamGroup).map(
                                (course) => (
                                  <option key={course.id} value={course.id}>
                                    {course.title} — CRICOS {course.cricos} ({course.promoBadge})
                                  </option>
                                )
                              )}
                            </optgroup>
                          )
                        )}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Compact Dynamic Metadata Bar */}
                    <div className="mt-1.5 px-2.5 py-1.5 rounded-lg bg-blue-50/80 border border-blue-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-xs">
                      <div className="min-w-0 flex items-center gap-1.5 truncate">
                        <span className="font-bold text-slate-900 truncate">
                          {activeCourse.provider}
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-mono text-blue-700 shrink-0 font-semibold">
                          CRICOS {activeCourse.cricos}
                        </span>
                      </div>
                      <div className="shrink-0 flex items-center gap-1.5 self-end sm:self-auto">
                        <span className="text-emerald-700 font-bold text-xs">
                          ${activeCourse.promoWeeklyRate}/wk
                        </span>
                        <span className="line-through text-slate-400 text-[10px]">
                          (${activeCourse.weeklyRate})
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200/80">
                          {activeCourse.promoBadge.split(' ')[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 2. Campus City & 3. Study Duration — Rendered in One Single Row */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label
                        htmlFor="campus-city-select"
                        className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1"
                      >
                        2. Campus Location
                      </label>
                      <div className="relative">
                        <select
                          id="campus-city-select"
                          value={selectedCity}
                          onChange={(e) => setSelectedCity(e.target.value)}
                          className="w-full h-8.5 appearance-none rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white pl-7 pr-7 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                        >
                          <option value="Sydney CBD">Sydney (NSW)</option>
                          <option value="Melbourne">Melbourne (VIC)</option>
                          <option value="Brisbane">Brisbane (QLD)</option>
                          <option value="Perth Regional">Perth (WA)</option>
                          <option value="Adelaide Regional">Adelaide (SA)</option>
                        </select>
                        <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        3. Duration ({weeks}w)
                      </label>
                      <div className="grid grid-cols-4 gap-0.5 bg-slate-100/90 p-0.5 rounded-lg border border-slate-200/60 h-8.5">
                        {[12, 20, 40, 52].map((w) => (
                          <button
                            key={w}
                            type="button"
                            onClick={() => setWeeks(w)}
                            className={`rounded text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                              weeks === w
                                ? 'bg-white text-blue-700 shadow-2xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            {w}w
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Payment Schedule & OSHC Controls — In One Row */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Payment Plan Toggle */}
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        4. Payment Schedule
                      </span>
                      <div className="grid grid-cols-2 gap-0.5 bg-slate-100/90 p-0.5 rounded-lg border border-slate-200/60 h-8.5">
                        <button
                          type="button"
                          onClick={() => setSimPaymentPlan('instalment')}
                          className={`rounded text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                            simPaymentPlan === 'instalment'
                              ? 'bg-white text-blue-700 shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Instalment
                        </button>
                        <button
                          type="button"
                          onClick={() => setSimPaymentPlan('upfront')}
                          className={`rounded text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center justify-center whitespace-nowrap px-1 ${
                            simPaymentPlan === 'upfront'
                              ? 'bg-white text-emerald-700 shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Upfront (-5%)
                        </button>
                      </div>
                    </div>

                    {/* OSHC Health Cover Toggle */}
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        5. Subclass 500 OSHC
                      </span>
                      <button
                        type="button"
                        onClick={() => setIncludeOshc(!includeOshc)}
                        className={`w-full h-8.5 px-2.5 rounded-lg border flex items-center justify-between transition-all cursor-pointer ${
                          includeOshc
                            ? 'bg-emerald-50/70 border-emerald-200/90 text-emerald-900'
                            : 'bg-slate-50/70 border-slate-200 text-slate-600'
                        }`}
                      >
                        <span className="text-[11px] sm:text-xs font-bold">
                          {includeOshc ? `OSHC (+$${weeks * 14})` : 'No OSHC'}
                        </span>
                        <div
                          className={`w-7 h-4 rounded-full transition-colors relative flex items-center px-0.5 ${
                            includeOshc ? 'bg-emerald-600' : 'bg-slate-300'
                          }`}
                        >
                          <div
                            className={`w-3 h-3 rounded-full bg-white shadow-2xs transition-transform transform ${
                              includeOshc ? 'translate-x-3' : 'translate-x-0'
                            }`}
                          />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Harmonious Daylight Itemized Calculation Card */}
                  <div className="rounded-xl bg-slate-50/90 border border-slate-200/90 p-3 sm:p-3.5 shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Standard Tuition ({weeks}w × ${activeCourse.weeklyRate})</span>
                      <span className="line-through text-slate-400 font-medium">{fmtSimMoney(standardTuition)}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-emerald-700 font-semibold">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        Scholarship Savings ({activeCourse.promoBadge})
                      </span>
                      <span className="font-bold">-{fmtSimMoney(scholarshipSavings)}</span>
                    </div>

                    {upfrontDiscount > 0 && (
                      <div className="flex items-center justify-between text-[11px] text-emerald-700 font-semibold">
                        <span>Upfront Settlement Bonus (5%)</span>
                        <span className="font-bold">-{fmtSimMoney(upfrontDiscount)}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-slate-600">
                      <span>Fees &amp; OSHC Cover</span>
                      <span className="font-medium text-slate-800">
                        {fmtSimMoney(activeCourse.enrolmentFee + activeCourse.materialFee + oshcCost)}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                          Net Student Package ({selectedCity.split(' ')[0]})
                        </span>
                        <span className="text-[10px] text-emerald-700 font-medium">
                          {activeCourse.materialFee === 0 ? '$0 Material Fee Waived' : 'Materials Included'}
                        </span>
                      </div>
                      <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        {fmtSimMoney(netPayable)}
                      </span>
                    </div>

                    {/* CoE Initial Deposit Callout */}
                    <div className="pt-1.5 border-t border-blue-100 flex flex-wrap items-center justify-between gap-1 bg-blue-50/90 -mx-1 px-3 py-1.5 rounded-lg border border-blue-200/80">
                      <span className="text-[11px] font-bold text-blue-900 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        Initial CoE Deposit (Subclass 500):
                      </span>
                      <span className="text-xs sm:text-sm font-black text-blue-700">
                        {fmtSimMoney(
                          simPaymentPlan === 'instalment' ? Math.round(netPayable * 0.35) : netPayable
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Primary Action Button */}
                  <button
                    type="button"
                    onClick={() => launchDemoPortal('agent', '/quotes')}
                    className="w-full h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 hover:shadow-lg transition-all cursor-pointer"
                  >
                    Open Quote in Portal &amp; Issue Offer
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <p className="text-center text-[10px] text-slate-400">
                    🔒 Synced with CRICOS #03812M • Australian ESOS National Code 2018
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured CRICOS Institutions & Live Scholarships Directory */}
      <section id="providers" className="py-20 sm:py-28 bg-slate-50/60 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200/80 mb-3 shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Direct CRICOS &amp; ASQA National Registry Sync
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Featured Australian Partner Institutions
              </h2>
              <p className="text-base text-slate-600 mt-2 max-w-2xl">
                Verified RTO &amp; CRICOS providers with live 2026 tuition scholarships, pre-allocated campus seat caps, and instant Letter of Offer dispatch.
              </p>
            </div>

            {/* State Filter Pills & Counter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
              <span className="text-xs font-semibold text-slate-500">
                Showing <strong className="text-slate-900">{filteredProviders.length}</strong> of 52 verified colleges
              </span>
              <div className="flex flex-wrap items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200/90 shadow-2xs w-full sm:w-auto">
                {['All', 'NSW', 'VIC', 'QLD', 'WA', 'SA'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStateFilter(st)}
                    className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                      stateFilter === st
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {st === 'All' ? 'All' : st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProviders.map((prov) => (
              <div
                key={prov.cricos}
                className="group relative rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle Top Accent Glow on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-5">
                  {/* Provider Header: Logo badge, CRICOS & RTO badges */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${prov.accent} text-white font-extrabold text-base flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform`}
                      >
                        {prov.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 mb-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          PRISMS Active
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug line-clamp-1">
                          {prov.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* CRICOS & RTO Code Tags */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200/60">
                      CRICOS {prov.cricos}
                    </span>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/60">
                      RTO #{prov.rto}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-1 rounded-lg bg-slate-50 text-slate-600 border border-slate-200/60">
                      {prov.coursesCount} Accredited Courses
                    </span>
                  </div>

                  {/* Campuses Strip */}
                  <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      Campus Locations
                    </p>
                    <p className="text-xs font-medium text-slate-700 leading-relaxed">
                      {prov.campuses}
                    </p>
                  </div>

                  {/* Active Scholarship Card */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50/90 via-orange-50/40 to-amber-50/70 border border-amber-200/90 shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="w-5 h-5 rounded-md bg-amber-500/15 text-amber-700 flex items-center justify-center shrink-0">
                          <Sparkles className="w-3 h-3" />
                        </span>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-950 truncate">
                          2026 Scholarship
                        </span>
                      </div>
                      <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-200 px-2 py-0.5 rounded-full shadow-2xs">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                        Auto-Applied
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug pl-0.5">
                      {prov.scholarship}
                    </p>
                  </div>

                  {/* Key SLA & Performance Metrics */}
                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">
                        Admissions SLA
                      </span>
                      <span className="font-bold text-slate-900 flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        {prov.turnaround}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">
                        Visa Grant Rate
                      </span>
                      <span className="font-bold text-emerald-700 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        {prov.visaRate}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">
                        Commission Tier
                      </span>
                      <span className="font-bold text-blue-700 flex items-center gap-1">
                        <BadgePercent className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        {prov.commission}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">
                        Next Intake
                      </span>
                      <span className="font-bold text-slate-900 flex items-center gap-1 truncate" title={prov.nextIntake}>
                        <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        {prov.nextIntake.split('(')[0].trim()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 mt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2">
                  <button
                    type="button"
                    onClick={() => launchDemoPortal('agent', '/portal')}
                    className="w-full sm:flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors text-center cursor-pointer"
                  >
                    View TAS &amp; Scope
                  </button>
                  <button
                    type="button"
                    onClick={() => launchDemoPortal('agent', '/quotes')}
                    className="w-full sm:flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all flex items-center justify-center gap-1 shadow-xs shadow-blue-600/20 cursor-pointer"
                  >
                    Instant Quote <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Section Bottom Marketplace Callout Banner */}
          <div className="mt-12 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/60 flex items-center justify-center shrink-0 text-blue-600 mx-auto sm:mx-0">
                <School className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Are you an accredited Australian CRICOS Provider or RTO?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Broadcast your courses, scholarships, and campus seat capacity directly to 9,000+ verified global recruitment agencies.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <NavLink to="/signup" style={{ textDecoration: 'none' }} className="w-full sm:w-auto">
                <span className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xs cursor-pointer">
                  List Your Institution <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </NavLink>
              <NavLink to="/portal" style={{ textDecoration: 'none' }} className="w-full sm:w-auto">
                <span className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer">
                  Browse All 52 Colleges
                </span>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Recognized by Leading Bodies (Preserving exact data-testid attributes) */}
      <section
        id="accreditations"
        className="relative py-20 sm:py-24 bg-white border-b border-slate-200/80"
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 rounded-full px-4 py-1.5 mb-3 border border-blue-200/80 shadow-2xs">
              <Shield className="w-3.5 h-3.5" />
              Trusted Australian Governance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Recognised by Leading Australian Bodies
            </h2>
            <p className="text-base text-slate-600 mt-2 max-w-2xl mx-auto">
              AusEdu Connect architecture is engineered strictly to comply with Australian ESOS National Code 2018, ASQA Standards for RTOs, and PRISMS API protocols.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {[
              {
                name: 'ELICOS',
                sub: 'National Standards',
                icon: School,
                badge: 'English ELT',
                bg: 'bg-blue-50 text-blue-600 border-blue-100',
              },
              {
                name: 'VET Australia',
                sub: 'NRT Approved',
                icon: GraduationCap,
                badge: 'Vocational AQF',
                bg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
              },
              {
                name: 'ASQA',
                sub: 'RTO Compliance',
                icon: Shield,
                badge: 'Regulator Ready',
                bg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
              },
              {
                name: 'Education Agency',
                sub: 'ESOS Code 2018',
                icon: Building2,
                badge: 'Standard 4 Agent',
                bg: 'bg-amber-50 text-amber-600 border-amber-100',
              },
              {
                name: 'Study Australia',
                sub: 'PRISMS Ready',
                icon: Globe,
                badge: 'CoE Direct Sync',
                bg: 'bg-cyan-50 text-cyan-600 border-cyan-100',
              },
            ].map(({ name, sub, icon: Icon, badge, bg }, i) => (
              <div
                key={i}
                className="group relative flex flex-col items-center justify-between rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:border-blue-300 hover:bg-white p-6 shadow-2xs hover:shadow-lg transition-all duration-300"
                data-testid={`accreditation-${i}`}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div
                    className={`w-14 h-14 rounded-2xl ${bg} border flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">{name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 w-full text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white group-hover:bg-blue-50 group-hover:text-blue-700 px-2 py-0.5 rounded-full border border-slate-200/80 transition-colors">
                    {badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features Grid */}
      <section id="features" className="py-20 sm:py-28 bg-slate-50/60 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-200/80 mb-3 shadow-2xs">
              <Layers className="w-3.5 h-3.5" />
              Unified 3-Portal Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Australian Education Leaders Choose AusEdu Connect
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-2">
              Purpose-built for Australian CRICOS providers, global recruitment agencies, and multi-tenant compliance auditors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: '50+ Verified CRICOS Schools',
                tag: 'Institution Directory',
                desc: 'Access pre-verified Australian institutions offering ELICOS, VET diplomas, and higher education pathways across Sydney, Melbourne, Brisbane, Perth, and Adelaide.',
                metric: '52 Active RTOs',
                color: 'blue',
              },
              {
                icon: BookOpen,
                title: '1,240+ Accredited Courses',
                tag: 'Live Scope & TAS',
                desc: 'Browse weekly tuition fees, material fee waivers, intake calendars, entry requirements, and Training & Assessment Strategy (TAS) brochures in one live catalog.',
                metric: 'Real-Time Pricing',
                color: 'indigo',
              },
              {
                icon: FileText,
                title: '30-Second Promotional Quotes',
                tag: 'Sales & Offer Engine',
                desc: 'Automatically apply nationality scholarships, bundle Subclass 500 OSHC health cover, and issue branded student Letters of Offer with itemized AUD deposits.',
                metric: '3× Faster Visas',
                color: 'emerald',
              },
              {
                icon: Users,
                title: 'Agency Commission Ledger',
                tag: 'Finance & Payouts',
                desc: 'Transparent commission dashboard showing 20%–25% preferred tier payouts, escrow settlements, and bonus volume tiers per semester intake.',
                metric: '20%–25% Preferred Tier',
                color: 'amber',
                sensitive: true,
              },
              {
                icon: ShieldCheck,
                title: 'ASQA & ESOS Compliance Vault',
                tag: 'Auditor Ready',
                desc: 'Maintain 98%+ audit readiness with centralized RTO scope certificates, campus fire safety reports, agent agreements, and GTE/GST document verification.',
                metric: '98%+ Audit Score',
                color: 'purple',
              },
              {
                icon: CalendarDays,
                title: 'Kanban Admissions & PRISMS CoE',
                tag: 'Intake Operations',
                desc: 'Track every student from initial quote to signed offer, tuition payment, PRISMS Confirmation of Enrolment issuance, and Subclass 500 visa grant.',
                metric: '1-Click CoE Dispatch',
                color: 'teal',
              },
            ].map((f, i) => {
              const isSensitive = f.sensitive;
              const isRevealed = isSensitive ? revealedCommissions : true;
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 p-7 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Top Row: Tag, Icon, and Sensitive Reveal Toggle */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-2xs">
                          <f.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60">
                            {f.tag}
                          </span>
                        </div>
                      </div>

                      {isSensitive && (
                        <button
                          type="button"
                          onClick={() => setRevealedCommissions(!revealedCommissions)}
                          className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200/80 transition-colors cursor-pointer"
                          aria-label={
                            revealedCommissions
                              ? 'Hide commission details'
                              : 'Show commission details'
                          }
                        >
                          {revealedCommissions ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                          {!revealedCommissions ? 'Reveal Tier' : 'Hide'}
                        </button>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {f.title}
                      </h3>
                      {isSensitive && !revealedCommissions ? (
                        <div className="flex items-center gap-2 mt-3 py-3 px-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                          <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                          <span className="text-xs text-slate-500 italic">
                            Commission rates are confidential — click Reveal to inspect agency tier schedules.
                          </span>
                        </div>
                      ) : (
                        <p className="text-sm text-slate-600 leading-relaxed mt-2">
                          {f.desc}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Pill */}
                  <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-500">Capability Highlight:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                      {f.metric}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works — 4-Step Connected Pipeline */}
      <section
        id="how-it-works"
        className="py-20 sm:py-28 bg-white border-b border-slate-200/80"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200/80 mb-3 shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Streamlined Student Intake Cycle
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              From Inquiry to PRISMS CoE in 4 Steps
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-2">
              Replace disorganized spreadsheets, expired price sheets, and lengthy email loops with a single unified admissions workflow.
            </p>
          </div>

          <div className="relative">
            {/* Desktop Connecting Bar */}
            <div className="hidden lg:block absolute top-12 left-12 right-12 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 rounded-full z-0 opacity-20" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                {
                  step: '01',
                  title: 'Build Promotional Quote',
                  desc: 'Select Australian campus & accredited CRICOS stream. Regional discounts, fee waivers, and OSHC bundle automatically.',
                  icon: Calculator,
                  preview: 'Quote #Q-8412 • A$280/wk (Saved $1,560)',
                  badge: 'Step 1: Agency Hub',
                },
                {
                  step: '02',
                  title: 'Upload GTE & Passport',
                  desc: 'Attach student passport bio-page, IELTS/PTE score, and Genuine Student (GS) compliance docs in the encrypted vault.',
                  icon: FileCheck2,
                  preview: 'Passport + GTE Verified (Level 1)',
                  badge: 'Step 2: Doc Verification',
                },
                {
                  step: '03',
                  title: 'Provider Issues CoE',
                  desc: 'School Admissions reviews the pre-screened file, checks campus seat caps, and dispatches the PRISMS CoE in 1 click.',
                  icon: School,
                  preview: 'PRISMS CoE #03812M-2026 Issued',
                  badge: 'Step 3: School Admin',
                },
                {
                  step: '04',
                  title: 'Visa Grant & Payout',
                  desc: 'Student lodges their Subclass 500 visa with CoE while agency commission settles automatically via integrated escrow.',
                  icon: Award,
                  preview: 'Visa Granted • 22% Commission Settled',
                  badge: 'Step 4: Visa & Commission',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-slate-50/70 hover:bg-white rounded-3xl border border-slate-200/90 hover:border-blue-300 p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Step Number & Icon Circle */}
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white text-base font-extrabold shadow-md shadow-blue-600/25 group-hover:scale-105 transition-transform">
                        {item.step}
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 shadow-2xs">
                        <item.icon className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block mb-1">
                        {item.badge}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Micro Artifact Preview Badge */}
                  <div className="mt-6 pt-4 border-t border-slate-200/70">
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-[11px] font-semibold text-slate-700 flex items-center gap-2 shadow-2xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{item.preview}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 sm:py-28 bg-slate-50/60 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200/80 mb-3 shadow-2xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              Verified Industry Social Proof
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Trusted by Australian Education Leaders
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-2">
              See why top Australian agencies and CRICOS colleges run their daily admissions on AusEdu Connect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: 'Managing Director • StudyMATE Global (Sydney & Guangzhou)',
                badge: 'Verified Agency Partner',
                text: 'The live PRISMS scholarship quote engine saves our counselors 12+ hours every week. Students receive accurate itemized AUD quotes with OSHC in seconds, leading to a 40% jump in confirmed enrolments.',
                stars: 5,
                impact: '12+ Hours Saved / Week',
                avatarBg: 'from-blue-600 to-indigo-600',
              },
              {
                name: 'Dr. Yuki Tanaka',
                role: 'Director of Admissions • Australian Pacific College',
                badge: 'CRICOS Provider Admissions',
                text: 'Having our ASQA compliance artifacts, campus seat capacity caps, and PRISMS CoE queue in one centralized portal transformed our intake operations. We issue offers in under 24 hours.',
                stars: 5,
                impact: '3× Faster CoE Dispatch',
                avatarBg: 'from-emerald-600 to-teal-600',
              },
              {
                name: 'James Thompson',
                role: 'Senior MARA & Education Consultant (Melbourne CBD)',
                badge: 'Registered MARA Agent #14892',
                text: 'Comparing regional bursaries across Sydney, Melbourne, and Adelaide campuses in real time has doubled our onshore visa extension conversions. The commission ledger is 100% transparent.',
                stars: 5,
                impact: '+140% Intake Conversion',
                avatarBg: 'from-indigo-600 to-violet-600',
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      {Array.from({ length: t.stars }).map((_, si) => (
                        <Star key={si} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                      {t.impact}
                    </span>
                  </div>

                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>

                <div className="pt-5 border-t border-slate-100 flex items-center gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${t.avatarBg} flex items-center justify-center text-white font-bold text-sm shadow-xs`}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm text-slate-900 truncate">{t.name}</p>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{t.role}</p>
                    <span className="text-[10px] font-semibold text-blue-600 block mt-0.5">
                      ✓ {t.badge}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200/80 mb-3 shadow-2xs">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Answered Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Everything Australian education agencies, colleges, and compliance officers need to know.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How are regional CRICOS scholarships applied to student quotes?',
                a: 'When an education counselor selects a student passport nationality and Australian campus city, AusEdu Connect automatically applies eligible ELICOS weekly discounts, VET bursaries, and material fee waivers published by the CRICOS provider. The calculations reflect directly on the student’s Letter of Offer.',
              },
              {
                q: 'Does the platform integrate with PRISMS and ASQA compliance audits?',
                a: 'Yes. School Admins can verify Genuine Student (GS) documentation, monitor real-time campus seat capacity against ASQA caps, and dispatch PRISMS Confirmation of Enrolments (CoEs) directly from the admissions queue. All audit logs adhere to ESOS National Code 2018 standards.',
              },
              {
                q: 'Can students pay in their local currency or by instalments?',
                a: 'Yes. Quotes support live FX previews across AUD, USD, EUR, BRL, JPY, and INR. Counselors can configure 3-term instalment schedules or upfront settlement bonuses (e.g., 5% discount) settled via Flywire and Stripe Escrow.',
              },
              {
                q: 'How are agency commissions calculated and paid out?',
                a: 'Commissions range from 20% to 25% based on provider tier agreements. Once tuition payment is verified and the student commences study, commission invoices are automatically reconciled and settled via bank transfer with automated RCTI statements.',
              },
              {
                q: 'Can our institution upload custom TAS brochures and GTE entry criteria?',
                a: 'Yes. School Admins have dedicated access to the Accreditation Document Vault where they can upload Training & Assessment Strategy (TAS) documents, course brochures, campus fire safety compliance, and specific English language criteria.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  openFaq === idx
                    ? 'bg-blue-50/40 border-blue-300 shadow-sm'
                    : 'bg-white border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        openFaq === idx
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100/80">
                    <p className="pl-9">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Help Center CTA */}
          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500">
              Have specific questions about PRISMS API integration or institutional onboarding?{' '}
              <NavLink to="/login" className="text-blue-600 font-bold hover:underline">
                Contact our Australian Compliance Team →
              </NavLink>
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Executive CTA Banner */}
      <section className="relative py-20 sm:py-24 overflow-hidden bg-slate-900 text-white">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-7">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wide">
            <Award className="w-4 h-4 text-amber-400" />
            Instant Access to Agency, School Admin &amp; Governance Portals
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Ready to Modernise Your Australian Education Workflow?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Join 9,000+ global counselors and 52+ CRICOS institutions quoting, verifying GTE documents, and issuing PRISMS CoEs on AusEdu Connect.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 w-full max-w-md sm:max-w-none mx-auto">
            <NavLink to="/signup" style={{ textDecoration: 'none' }} className="w-full sm:w-auto">
              <span className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer">
                Create Free Partner Account
                <ArrowRight className="w-4 h-4" />
              </span>
            </NavLink>
            <button
              type="button"
              onClick={() => launchDemoPortal('school_admin', '/school-admin/dashboard')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
            >
              Launch School Admin Demo
            </button>
            <button
              type="button"
              onClick={() => launchDemoPortal('agent', '/agent/dashboard')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm px-6 py-3.5 rounded-xl backdrop-blur-xs transition-all cursor-pointer"
            >
              Launch Agency Hub Demo
            </button>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ESOS National Code 2018 Compliant
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              Zero Credit Card Required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              Instant 1-Click Interactive Demos
            </span>
          </div>
        </div>
      </section>

      {/* Modern Daylight Footer */}
      <footer className="border-t border-slate-200 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold text-slate-900 mb-3.5 text-xs sm:text-sm uppercase tracking-wider">
                Live Workspaces
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                <li>
                  <button
                    type="button"
                    onClick={() => launchDemoPortal('agent', '/agent/dashboard')}
                    className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                  >
                    Agency Recruitment Hub
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => launchDemoPortal('school_admin', '/school-admin/dashboard')}
                    className="hover:text-emerald-600 transition-colors cursor-pointer text-left"
                  >
                    School Admin Command Center
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => launchDemoPortal('super_admin', '/admin')}
                    className="hover:text-indigo-600 transition-colors cursor-pointer text-left"
                  >
                    Platform Governance &amp; RBAC
                  </button>
                </li>
                <li>
                  <NavLink to="/quotes" className="hover:text-blue-600 transition-colors">
                    PRISMS Quote Simulator
                  </NavLink>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-3.5 text-xs sm:text-sm uppercase tracking-wider">
                Catalog &amp; Programs
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                <li>
                  <NavLink to="/portal" className="hover:text-blue-600 transition-colors">
                    Partner CRICOS Colleges (52)
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/courses" className="hover:text-blue-600 transition-colors">
                    ELICOS &amp; VET Course Directory
                  </NavLink>
                </li>
                <li>
                  <a href="#providers" className="hover:text-blue-600 transition-colors">
                    Regional Scholarship Finder
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-blue-600 transition-colors">
                    Subclass 500 OSHC Bundling
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-3.5 text-xs sm:text-sm uppercase tracking-wider">
                Australian Compliance
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                <li>
                  <a href="#accreditations" className="hover:text-blue-600 transition-colors">
                    ASQA Standards for RTOs 2015
                  </a>
                </li>
                <li>
                  <NavLink to="/school-admin/documents" className="hover:text-blue-600 transition-colors">
                    Accreditation Document Vault
                  </NavLink>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-blue-600 transition-colors">
                    PRISMS CoE Workflow Protocol
                  </a>
                </li>
                <li>
                  <a href="#accreditations" className="hover:text-blue-600 transition-colors">
                    ESOS National Code 2018 (Std 4)
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-3.5 text-xs sm:text-sm uppercase tracking-wider">
                System &amp; Portals
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                <li>
                  <NavLink to="/login" className="hover:text-blue-600 transition-colors font-semibold">
                    Sign In to Portal →
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup" className="hover:text-blue-600 transition-colors font-semibold">
                    Register Institution or Agency →
                  </NavLink>
                </li>
                <li className="pt-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[11px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    PRISMS Gateway v2.4 Online
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-slate-800">
                AusEdu Connect &copy; 2026 — Australian International Education Operating System
              </span>
            </div>
            <p className="text-xs text-slate-500 text-center sm:text-right">
              Compliant with ESOS Act 2000, National Code 2018 &amp; ASQA Standards for RTOs 2015.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
