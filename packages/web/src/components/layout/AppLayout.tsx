import React, { useState, useContext, createContext } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  Sparkles,
  LogOut,
  Search,
  Bell,
  Building2,
  ShieldCheck,
  Kanban,
  FileCheck,
  ChevronRight,
  ChevronDown,
  Plus,
  Command,
  Menu,
  X,
  ArrowUpRight,
  Globe,
  CheckCircle2,
  Bot,
  Download,
  Calendar,
  DollarSign,
  Sliders,
  Zap,
} from 'lucide-react';
import { useAuth, PortalRoleType } from '../../lib/auth';
import { useToast } from '../ui/Toast';

const AppLayoutNestedContext = createContext(false);

type NavItem = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  badge?: string;
  section?: string;
};

const QUICK_SEARCH_ROUTES = [
  { label: 'School Admin Executive Overview', href: '/school-admin/dashboard', tag: 'School' },
  { label: 'ASQA & CRICOS Compliance Vault', href: '/school-admin/documents', tag: 'Compliance' },
  { label: 'Platform Governance & RBAC Matrix', href: '/admin', tag: 'Admin' },
  { label: 'Partner CRICOS Institutions Directory', href: '/portal', tag: 'Directory' },
  { label: 'CRICOS Courses & Scholarship Pricing', href: '/courses', tag: 'Catalog' },
  { label: 'Provider Promotions & Scholarships', href: '/provider-promo', tag: 'Promos' },
  { label: 'Student Tuition Quotes & Offers', href: '/quotes', tag: 'Finance' },
  { label: 'Agent Commission Ledger & Payouts', href: '/agent/commissions', tag: 'Finance' },
  { label: 'International Students CRM', href: '/students', tag: 'CRM' },
  { label: 'Agent Recruitment Hub', href: '/agent/dashboard', tag: 'Agent' },
  { label: 'Student Kanban Pipeline', href: '/agent/pipeline', tag: 'Pipeline' },
];

const CURRENCIES = [
  { code: 'AUD', symbol: 'A$', rate: '1.00', label: 'Australian Dollar (Default)' },
  { code: 'USD', symbol: 'US$', rate: '0.66', label: 'US Dollar' },
  { code: 'EUR', symbol: '€', rate: '0.61', label: 'Euro' },
  { code: 'BRL', symbol: 'R$', rate: '3.78', label: 'Brazilian Real' },
  { code: 'JPY', symbol: '¥', rate: '101.4', label: 'Japanese Yen' },
  { code: 'INR', symbol: '₹', rate: '55.4', label: 'Indian Rupee' },
];

export function AppLayout({ children }: { children?: React.ReactNode }) {
  const isAlreadyInsideLayout = useContext(AppLayoutNestedContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, switchRole } = useAuth();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [quickCreateOpen, setQuickCreateOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [copilotPromptResult, setCopilotPromptResult] = useState<string | null>(null);

  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
  const [selectedIntake, setSelectedIntake] = useState('Q3 • Jul 2026');
  const [unreadCount, setUnreadCount] = useState(3);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (isAlreadyInsideLayout) {
    return <>{children ?? <Outlet />}</>;
  }

  const agentNav: NavItem[] = [
    { section: 'Recruitment', icon: LayoutDashboard, label: 'Agent Hub', href: '/agent/dashboard' },
    { section: 'Recruitment', icon: Kanban, label: 'Student Pipeline', href: '/agent/pipeline', badge: '5' },
    { section: 'Recruitment', icon: Users, label: 'Students CRM', href: '/students' },
    { section: 'Finance & Earnings', icon: DollarSign, label: 'Commission Ledger', href: '/agent/commissions', badge: 'A$24.8k' },
    { section: 'Catalog & Pricing', icon: BookOpen, label: 'Courses & Pricing', href: '/courses' },
    { section: 'Catalog & Pricing', icon: FileText, label: 'Quotes & Offers', href: '/quotes', badge: '3' },
    { section: 'Catalog & Pricing', icon: Building2, label: 'Partner Schools', href: '/portal' },
    { section: 'Compliance', icon: FileCheck, label: 'Document Vault', href: '/agent/documents' },
  ];

  const schoolAdminNav: NavItem[] = [
    { section: 'Campus Operations', icon: LayoutDashboard, label: 'Executive Overview', href: '/school-admin/dashboard' },
    { section: 'Campus Operations', icon: BookOpen, label: 'CRICOS Courses', href: '/courses', badge: '12' },
    { section: 'Campus Operations', icon: Sparkles, label: 'Promos & Scholarships', href: '/provider-promo', badge: 'Live' },
    { section: 'Admissions & Finance', icon: Users, label: 'Enrolments & CoEs', href: '/students', badge: '4' },
    { section: 'Admissions & Finance', icon: FileText, label: 'Quotes & Invoices', href: '/quotes' },
    { section: 'Governance', icon: FileCheck, label: 'ASQA Compliance', href: '/school-admin/documents', badge: 'Audit' },
    { section: 'Governance', icon: ShieldCheck, label: 'Staff & RBAC', href: '/admin' },
  ];

  const superAdminNav: NavItem[] = [
    { section: 'Platform Control', icon: ShieldCheck, label: 'Governance & RBAC', href: '/admin', badge: 'Core' },
    { section: 'Platform Control', icon: Building2, label: 'Partner Institutions', href: '/portal', badge: '3' },
    { section: 'Portals Preview', icon: LayoutDashboard, label: 'School Admin View', href: '/school-admin/dashboard' },
    { section: 'Portals Preview', icon: Kanban, label: 'Agent Hub View', href: '/agent/dashboard' },
    { section: 'Global Directory', icon: BookOpen, label: 'All CRICOS Courses', href: '/courses' },
    { section: 'Global Directory', icon: Sparkles, label: 'Global Promotions', href: '/provider-promo' },
    { section: 'Global Directory', icon: Users, label: 'All Students', href: '/students' },
    { section: 'Global Directory', icon: FileText, label: 'Global Quotes Ledger', href: '/quotes' },
  ];

  const currentRole: PortalRoleType = user?.role || 'school_admin';

  const currentNav =
    currentRole === 'school_admin'
      ? schoolAdminNav
      : currentRole === 'super_admin'
      ? superAdminNav
      : agentNav;

  const groupedNav = currentNav.reduce<Record<string, NavItem[]>>((acc, item) => {
    const group = item.section || 'General';
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});

  const roleMetaMap: Record<
    PortalRoleType,
    { label: string; sub: string; badgeBg: string; dot: string; accentGrad: string }
  > = {
    school_admin: {
      label: 'Provider Portal',
      sub: 'RTO #45123 • CRICOS 03812M',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-500',
      accentGrad: 'from-emerald-600 to-teal-600',
    },
    super_admin: {
      label: 'Platform Governance',
      sub: 'Multi-Tenant Root Control',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      dot: 'bg-indigo-500',
      accentGrad: 'from-indigo-600 to-blue-600',
    },
    agent: {
      label: 'Agency Workspace',
      sub: 'Global Recruitment Partner',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      dot: 'bg-blue-500',
      accentGrad: 'from-blue-600 to-indigo-600',
    },
  };

  const roleMeta = roleMetaMap[currentRole];

  const activeNavItem = currentNav.find(
    (item) => location.pathname === item.href || location.pathname.startsWith(item.href + '/')
  );

  const filteredSearchRoutes = QUICK_SEARCH_ROUTES.filter(
    (r) =>
      r.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tag.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 6);

  return (
    <AppLayoutNestedContext.Provider value={true}>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans antialiased">
        {/* Mobile Sidebar Backdrop */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Left Sidebar */}
        <aside
          className={`w-72 bg-white border-r border-slate-200/90 flex flex-col fixed h-full z-50 transition-transform duration-200 lg:translate-x-0 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Brand Header */}
          <div className="h-16 px-5 flex items-center justify-between border-b border-slate-100">
            <Link to="/" className="flex items-center gap-3 group">
              <div
                className={`w-9 h-9 rounded-xl bg-gradient-to-br ${roleMeta.accentGrad} flex items-center justify-center text-white font-bold text-base shadow-xs`}
              >
                E
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold tracking-tight text-slate-900">
                    AusEdu Connect
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                    AU
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-none mt-0.5">
                  CRICOS &amp; RTO Operating System
                </p>
              </div>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Active Workspace Context Card */}
          <div className="px-4 pt-4 pb-2">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${roleMeta.badgeBg}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${roleMeta.dot}`} />
                  {roleMeta.label}
                </span>
                <Globe className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <p className="text-xs font-bold text-slate-900 truncate">
                {user?.organization || 'Australian Pacific College'}
              </p>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">{roleMeta.sub}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-3 space-y-5 overflow-y-auto">
            {Object.entries(groupedNav).map(([section, items]) => (
              <div key={section}>
                <div className="px-3 mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {section}
                </div>
                <div className="space-y-1">
                  {items.map((item) => {
                    const isActive =
                      location.pathname === item.href ||
                      (item.href !== '/' && location.pathname.startsWith(item.href + '/'));
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <item.icon
                            className={`w-4 h-4 shrink-0 transition-colors ${
                              isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : item.badge === 'Live' || item.badge === 'Core'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Instant Demo Role Switcher */}
          <div className="p-3 mx-3 mb-2 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Switch Portal View
              </span>
              <span className="text-[10px] font-semibold text-blue-600">Interactive Demo</span>
            </div>
            <div className="grid grid-cols-3 gap-1 bg-slate-200/70 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => {
                  switchRole('agent');
                  navigate('/agent/dashboard');
                }}
                className={`py-1.5 text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                  currentRole === 'agent'
                    ? 'bg-white text-blue-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Agent
              </button>
              <button
                type="button"
                onClick={() => {
                  switchRole('school_admin');
                  navigate('/school-admin/dashboard');
                }}
                className={`py-1.5 text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                  currentRole === 'school_admin'
                    ? 'bg-white text-emerald-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                School
              </button>
              <button
                type="button"
                onClick={() => {
                  switchRole('super_admin');
                  navigate('/admin');
                }}
                className={`py-1.5 text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                  currentRole === 'super_admin'
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* User Footer */}
          <div className="p-3 border-t border-slate-200/80 bg-white">
            <div className="flex items-center justify-between gap-2 px-2 py-1.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-9 h-9 rounded-full bg-gradient-to-tr ${roleMeta.accentGrad} flex items-center justify-center text-xs font-bold text-white shrink-0`}
                >
                  {user?.avatar || 'YT'}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {user?.name || 'Dr. Yuki Tanaka'}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {user?.email || 'school@ause.edu'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                title="Sign Out"
                className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-72 flex flex-col min-w-0">
          {/* Feature-Rich Top Command Navbar */}
          <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-3 sticky top-0 z-30">
            {/* Left: Mobile Trigger + Contextual Breadcrumb + Active Intake Selector */}
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 shrink-0 cursor-pointer"
                aria-label="Open menu"
              >
                <Menu className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <span
                  className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border shrink-0 ${roleMeta.badgeBg}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${roleMeta.dot}`} />
                  {roleMeta.label}
                </span>
                <ChevronRight className="hidden sm:block w-4 h-4 text-slate-300 shrink-0" />
                <span className="font-bold text-xs sm:text-sm md:text-base text-slate-900 truncate">
                  {activeNavItem?.label || 'Executive Workspace'}
                </span>
              </div>

              {/* Intake Cohort Selector Pill */}
              <div className="hidden 2xl:flex items-center gap-1.5 ml-2 pl-3 border-l border-slate-200">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={selectedIntake}
                  onChange={(e) => {
                    setSelectedIntake(e.target.value);
                    toast(`Switched active intake window to ${e.target.value}`, 'info');
                  }}
                  className="bg-slate-100 hover:bg-slate-200/70 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200/80 focus:outline-none cursor-pointer"
                >
                  <option value="Q3 • Jul 2026">Intake: Q3 • Jul 2026</option>
                  <option value="Q3 • Aug 2026">Intake: Q3 • Aug 2026</option>
                  <option value="Q4 • Sep 2026">Intake: Q4 • Sep 2026</option>
                  <option value="Q1 • Jan 2027">Intake: Q1 • Jan 2027</option>
                </select>
              </div>
            </div>

            {/* Right: Command Search + Currency FX + Role Switcher + AI Copilot + Quick Create + Notifications + Profile */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Interactive Quick-Jump Search Bar */}
              <div className="relative w-28 xs:w-36 sm:w-48 md:w-56">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setSearchOpen(true)}
                  onBlur={() => setTimeout(() => setSearchOpen(false), 180)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchOpen(true);
                  }}
                  placeholder="Search..."
                  className="w-full h-8.5 sm:h-9 bg-slate-100/80 border border-slate-200/90 rounded-xl pl-7 sm:pl-8 pr-2 sm:pr-10 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all"
                />
                <span className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded-md px-1.5 py-0.5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Command className="w-2.5 h-2.5" />K
                </span>

                {searchOpen && (
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50">
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Quick Navigation
                    </div>
                    <div className="space-y-0.5 mt-1">
                      {filteredSearchRoutes.map((route) => (
                        <button
                          key={route.href}
                          type="button"
                          onMouseDown={() => {
                            navigate(route.href);
                            setSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer text-left"
                        >
                          <span className="truncate">{route.label}</span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-500 shrink-0 ml-2">
                            {route.tag}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Currency & FX Switcher Dropdown */}
              <div className="relative hidden md:block">
                <button
                  type="button"
                  onClick={() => {
                    setCurrencyOpen(!currencyOpen);
                    setQuickCreateOpen(false);
                    setNotifOpen(false);
                  }}
                  className="h-9 px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 inline-flex items-center gap-1 transition-colors cursor-pointer"
                  title="Switch Display Currency"
                >
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  {selectedCurrency.code}
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {currencyOpen && (
                  <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50">
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Live FX Tuition Display
                    </div>
                    <div className="space-y-0.5 mt-1">
                      {CURRENCIES.map((cur) => (
                        <button
                          key={cur.code}
                          type="button"
                          onClick={() => {
                            setSelectedCurrency(cur);
                            setCurrencyOpen(false);
                            toast(
                              `Display currency set to ${cur.code} (1 AUD = ${cur.rate} ${cur.code})`,
                              'info'
                            );
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                            selectedCurrency.code === cur.code
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>
                            {cur.symbol} {cur.code} — {cur.label.split(' (')[0]}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">{cur.rate}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Top-Bar Quick Role Switcher (Desktop) */}
              <div className="hidden xl:flex items-center gap-0.5 p-1 rounded-xl bg-slate-100 border border-slate-200/80">
                <button
                  type="button"
                  onClick={() => {
                    switchRole('agent');
                    navigate('/agent/dashboard');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    currentRole === 'agent'
                      ? 'bg-white text-blue-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Agent
                </button>
                <button
                  type="button"
                  onClick={() => {
                    switchRole('school_admin');
                    navigate('/school-admin/dashboard');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    currentRole === 'school_admin'
                      ? 'bg-white text-emerald-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  School
                </button>
                <button
                  type="button"
                  onClick={() => {
                    switchRole('super_admin');
                    navigate('/admin');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    currentRole === 'super_admin'
                      ? 'bg-white text-indigo-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Admin
                </button>
              </div>

              {/* AI Compliance & Admissions Copilot Button */}
              <button
                type="button"
                onClick={() => setCopilotOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 text-xs font-bold transition-colors cursor-pointer"
                title="Open AI Admissions & ASQA Copilot"
              >
                <Bot className="w-3.5 h-3.5 text-indigo-600" />
                AI Copilot
              </button>

              {/* Multi-Action Quick Create Menu */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setQuickCreateOpen(!quickCreateOpen);
                    setCurrencyOpen(false);
                    setNotifOpen(false);
                  }}
                  className="inline-flex items-center justify-center gap-1.5 h-8.5 sm:h-9 px-2.5 sm:px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Quick Action</span>
                  <ChevronDown className="w-3 h-3 opacity-80 hidden sm:inline" />
                </button>

                {quickCreateOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50">
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Create or Export
                    </div>
                    <div className="space-y-0.5 mt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setQuickCreateOpen(false);
                          navigate('/quotes');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer text-left"
                      >
                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                        New Student Tuition Quote
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setQuickCreateOpen(false);
                          navigate('/students');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer text-left"
                      >
                        <Users className="w-3.5 h-3.5 text-emerald-600" />
                        Register International Student
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setQuickCreateOpen(false);
                          navigate('/provider-promo');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer text-left"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        Launch Scholarship Promo
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setQuickCreateOpen(false);
                          navigate('/school-admin/documents');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer text-left"
                      >
                        <FileCheck className="w-3.5 h-3.5 text-indigo-600" />
                        Upload ASQA Audit Artifact
                      </button>
                      <div className="my-1 border-t border-slate-100" />
                      <button
                        type="button"
                        onClick={() => {
                          setQuickCreateOpen(false);
                          toast('Exported PRISMS CoE & Tuition Ledger CSV', 'success');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer text-left"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-500" />
                        Export PRISMS &amp; CSV Report
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Notifications Button + Popover */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setNotifOpen(!notifOpen);
                    setQuickCreateOpen(false);
                    setCurrencyOpen(false);
                  }}
                  className="relative h-9 w-9 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center transition-colors cursor-pointer"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5 ring-2 ring-white" />
                  )}
                </button>

                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-slate-200 shadow-xl p-4 z-50 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <span className="text-xs font-bold text-slate-900">
                        Live Portal Notifications ({unreadCount})
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setUnreadCount(0);
                          setNotifOpen(false);
                        }}
                        className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer"
                      >
                        Mark all read
                      </button>
                    </div>
                    <div className="space-y-2.5 text-xs">
                      <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/70">
                        <p className="font-bold text-slate-900 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          PRISMS CoE #9041 Dispatched
                        </p>
                        <p className="text-slate-600 mt-0.5">
                          Mateo Silva (Diploma of Leadership) approved for Sydney CBD.
                        </p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/70">
                        <p className="font-bold text-slate-900">New 20% ELICOS Scholarship Live</p>
                        <p className="text-slate-600 mt-0.5">
                          Australian Pacific College updated Q3/Q4 offshore rates.
                        </p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                        <p className="font-bold text-slate-900">ASQA Scope Audit Verified</p>
                        <p className="text-slate-500 mt-0.5">
                          RTO #45123 compliance score updated to 98.4%.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Avatar Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className={`h-9 w-9 rounded-xl bg-gradient-to-tr ${roleMeta.accentGrad} flex items-center justify-center text-xs font-bold text-white shadow-2xs cursor-pointer`}
                  title="Workspace Profile & Settings"
                >
                  {user?.avatar || 'YT'}
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">
                        {user?.name || 'Dr. Yuki Tanaka'}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {user?.organization || 'Australian Pacific College'}
                      </p>
                    </div>
                    <div className="py-1 space-y-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          navigate('/admin');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer text-left"
                      >
                        <Sliders className="w-3.5 h-3.5 text-slate-400" />
                        RBAC &amp; Tenant Settings
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer text-left"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                        Public Marketing Website
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          logout();
                          navigate('/login');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 cursor-pointer text-left"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Page Workspace */}
          <main className="flex-1 p-3.5 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto min-w-0">
            {children ?? <Outlet />}
          </main>
        </div>

        {/* Slide-Over AI Compliance & Admissions Copilot Drawer */}
        {copilotOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end">
            <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between p-6 overflow-y-auto">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        AusEdu AI Admissions Copilot
                      </h3>
                      <p className="text-xs text-slate-500">
                        Automated ASQA, GTE/GST &amp; Scholarship Intelligence
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCopilotOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    1-Click Intelligent Workflows
                  </p>
                  {[
                    {
                      title: 'Run ASQA & ESOS Compliance Pre-Audit',
                      desc: 'Scan RTO #45123 documents for missing signatures or expiring scopes',
                      result:
                        '✅ ASQA Audit Scan Complete: 98.4% Ready. 5 of 6 core artifacts verified. Action item: Brisbane Campus Lease Addendum requires council occupancy signature before 15 Nov 2026.',
                    },
                    {
                      title: 'Evaluate Student Genuine Student (GS) Risk',
                      desc: 'Check Subclass 500 financial capacity & study gap alignment',
                      result:
                        '✅ GS / GTE Assessment (Mateo Silva — Colombia): Low Risk (94/100). Financial sponsor verified ($42,000 AUD deposit proof), BSB50420 Diploma aligns with prior hospitality management role.',
                    },
                    {
                      title: 'Optimize Q3/Q4 Scholarship Conversion',
                      desc: 'Analyze agency quote acceptance rates across NSW, VIC & QLD',
                      result:
                        '📈 Pricing Insight: 20% ELICOS waiver ($280/wk) increased LATAM & Japan quote acceptance from 51% to 68% over the last 30 days. Recommend extending $0 Material Fee to Melbourne campus.',
                    },
                  ].map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setCopilotPromptResult(item.result)}
                      className="w-full text-left p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 transition-all cursor-pointer space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{item.title}</span>
                        <Zap className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      </div>
                      <p className="text-[11px] text-slate-500">{item.desc}</p>
                    </button>
                  ))}
                </div>

                {copilotPromptResult && (
                  <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                        AI Copilot Analysis Output
                      </span>
                      <span className="text-[10px] text-emerald-400 font-semibold">● Verified</span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-200">{copilotPromptResult}</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>Powered by AusEdu Compliance Engine</span>
                <button
                  type="button"
                  onClick={() => setCopilotOpen(false)}
                  className="font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayoutNestedContext.Provider>
  );
}

export default AppLayout;
