import React, { useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  ShieldCheck,
  Building2,
  Users,
  Plus,
  Check,
  X,
  Search,
  Lock,
  Activity,
  Globe,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  Sliders,
  Server,
  Database,
  FileCheck,
  Clock,
  Sparkles,
  ArrowUpRight,
  Filter,
  RefreshCw,
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

export type TenantSchool = {
  id: string;
  name: string;
  shortCode: string;
  rtoCode: string;
  cricosCode: string;
  campuses: string[];
  coursesCount: number;
  activePromos: number;
  complianceScore: number;
  status: 'Verified' | 'Audit Pending' | 'Suspended';
};

export type StaffMember = {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: 'Super Admin' | 'School Admin' | 'Senior Agent' | 'Compliance Auditor';
  mfaEnabled: boolean;
  lastActive: string;
  status: 'Active' | 'Suspended';
};

const INITIAL_SCHOOLS: TenantSchool[] = [
  {
    id: 'SCH-01',
    name: 'Australian Pacific College (APC)',
    shortCode: 'APC',
    rtoCode: '45123',
    cricosCode: '03812M',
    campuses: ['Sydney CBD', 'Manly', 'Melbourne', 'Brisbane', 'Gold Coast'],
    coursesCount: 24,
    activePromos: 4,
    complianceScore: 98,
    status: 'Verified',
  },
  {
    id: 'SCH-02',
    name: 'Greenwich English & Management College',
    shortCode: 'GRW',
    rtoCode: '91153',
    cricosCode: '02672K',
    campuses: ['Sydney Pitt St', 'Melbourne', 'Brisbane', 'Perth'],
    coursesCount: 28,
    activePromos: 5,
    complianceScore: 96,
    status: 'Verified',
  },
  {
    id: 'SCH-03',
    name: 'ILSC & Greystone College Australia',
    shortCode: 'ILSC',
    rtoCode: '31564',
    cricosCode: '02137M',
    campuses: ['Brisbane', 'Sydney', 'Melbourne', 'Adelaide'],
    coursesCount: 19,
    activePromos: 2,
    complianceScore: 94,
    status: 'Verified',
  },
  {
    id: 'SCH-04',
    name: 'Lexis English & Lexis Training',
    shortCode: 'LEX',
    rtoCode: '41178',
    cricosCode: '01632D',
    campuses: ['Noosa', 'Byron Bay', 'Perth', 'Brisbane', 'Sydney'],
    coursesCount: 16,
    activePromos: 3,
    complianceScore: 89,
    status: 'Audit Pending',
  },
];

const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'USR-01',
    name: 'Sarah Jenkins',
    email: 's.jenkins@apc.edu.au',
    organization: 'Australian Pacific College',
    role: 'School Admin',
    mfaEnabled: true,
    lastActive: '2 mins ago',
    status: 'Active',
  },
  {
    id: 'USR-02',
    name: 'David Chen',
    email: 'david.chen@globalpathways.co',
    organization: 'Global Pathways Agency',
    role: 'Senior Agent',
    mfaEnabled: true,
    lastActive: '14 mins ago',
    status: 'Active',
  },
  {
    id: 'USR-03',
    name: 'Elena Rostova',
    email: 'e.rostova@educonnect.au',
    organization: 'EduConnect Platform HQ',
    role: 'Super Admin',
    mfaEnabled: true,
    lastActive: 'Online now',
    status: 'Active',
  },
  {
    id: 'USR-04',
    name: 'Marcus Vance',
    email: 'm.vance@ilsc.edu.au',
    organization: 'ILSC Business College',
    role: 'Compliance Auditor',
    mfaEnabled: false,
    lastActive: '1 day ago',
    status: 'Active',
  },
];

const INITIAL_PERMISSIONS = [
  {
    capability: 'Publish & Edit CRICOS Courses',
    category: 'Catalog',
    superAdmin: true,
    schoolAdmin: true,
    agent: false,
  },
  {
    capability: 'Edit Per-Course Agent Commission Rates',
    category: 'Finance',
    superAdmin: true,
    schoolAdmin: true,
    agent: false,
  },
  {
    capability: 'Launch Provider Promotional Scholarships',
    category: 'Pricing',
    superAdmin: true,
    schoolAdmin: true,
    agent: false,
  },
  {
    capability: 'Generate Multi-Currency Tuition Quotes',
    category: 'Sales',
    superAdmin: true,
    schoolAdmin: true,
    agent: true,
  },
  {
    capability: 'Approve PRISMS CoE & GTE Clearance',
    category: 'Compliance',
    superAdmin: true,
    schoolAdmin: true,
    agent: false,
  },
  {
    capability: 'Upload Student Visa & Passport Documents',
    category: 'Compliance',
    superAdmin: true,
    schoolAdmin: true,
    agent: true,
  },
  {
    capability: 'Onboard New RTO / CRICOS Tenant Institute',
    category: 'Governance',
    superAdmin: true,
    schoolAdmin: false,
    agent: false,
  },
];

const AUDIT_LOGS = [
  {
    id: 'LOG-891',
    event: 'PRISMS CoE Issued: COE-26-904122 for Mateo Silva',
    actor: 'Sarah Jenkins (APC)',
    role: 'School Admin',
    ip: '106.192.14.88 (Sydney, AU)',
    time: '8 mins ago',
    severity: 'info',
  },
  {
    id: 'LOG-890',
    event: 'Commission Rate Updated: 25% on General English (098412B)',
    actor: 'Elena Rostova (HQ)',
    role: 'Super Admin',
    ip: '110.33.20.12 (Melbourne, AU)',
    time: '24 mins ago',
    severity: 'warning',
  },
  {
    id: 'LOG-889',
    event: 'Scholarship Campaign Syndicated: Q3 20% Off ELICOS',
    actor: 'Sarah Jenkins (APC)',
    role: 'School Admin',
    ip: '106.192.14.88 (Sydney, AU)',
    time: '1 hour ago',
    severity: 'info',
  },
  {
    id: 'LOG-888',
    event: 'GTE Financial Artifacts Verified for Camila Rojas',
    actor: 'David Chen (Agency)',
    role: 'Senior Agent',
    ip: '201.88.19.45 (São Paulo, BR)',
    time: '2 hours ago',
    severity: 'info',
  },
  {
    id: 'LOG-887',
    event: 'Failed 2FA Login Challenge Blocked (3 attempts)',
    actor: 'Unknown (Security Guard)',
    role: 'System Guard',
    ip: '45.142.122.90 (Tor Exit)',
    time: '4 hours ago',
    severity: 'alert',
  },
];

export default function AdminGovernancePage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'schools' | 'staff' | 'rbac' | 'audit'>('schools');
  const [schools, setSchools] = useState<TenantSchool[]>(INITIAL_SCHOOLS);
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [permissions, setPermissions] = useState(INITIAL_PERMISSIONS);
  const [search, setSearch] = useState('');

  // Modals
  const [showAddSchool, setShowAddSchool] = useState(false);
  const [newSchoolName, setNewSchoolName] = useState('');
  const [newRto, setNewRto] = useState('');
  const [newCricos, setNewCricos] = useState('');

  const [showInviteStaff, setShowInviteStaff] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteOrg, setInviteOrg] = useState('Australian Pacific College');
  const [inviteRole, setInviteRole] = useState<StaffMember['role']>('School Admin');

  const handleToggleSchoolStatus = (id: string) => {
    setSchools((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: s.status === 'Verified' ? 'Audit Pending' : 'Verified',
              complianceScore: s.status === 'Verified' ? 88 : 98,
            }
          : s
      )
    );
    toast('Institution CRICOS compliance status updated', 'success');
  };

  const handleCreateSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchoolName.trim()) return;
    const created: TenantSchool = {
      id: `SCH-0${schools.length + 1}`,
      name: newSchoolName,
      shortCode: newSchoolName.slice(0, 3).toUpperCase(),
      rtoCode: newRto || '45990',
      cricosCode: newCricos || '04011B',
      campuses: ['Sydney CBD', 'Melbourne'],
      coursesCount: 6,
      activePromos: 1,
      complianceScore: 100,
      status: 'Verified',
    };
    setSchools([created, ...schools]);
    setNewSchoolName('');
    setNewRto('');
    setNewCricos('');
    setShowAddSchool(false);
    toast(`${created.name} onboarded to multi-tenant platform`, 'success');
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim()) return;
    const created: StaffMember = {
      id: `USR-0${staff.length + 1}`,
      name: inviteName,
      email: inviteEmail,
      organization: inviteOrg,
      role: inviteRole,
      mfaEnabled: true,
      lastActive: 'Invited just now',
      status: 'Active',
    };
    setStaff([created, ...staff]);
    setInviteName('');
    setInviteEmail('');
    setShowInviteStaff(false);
    toast(`Platform credentials & access link dispatched to ${created.email}`, 'success');
  };

  const togglePermission = (idx: number, key: 'schoolAdmin' | 'agent') => {
    setPermissions((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, [key]: !p[key] } : p))
    );
    toast('RBAC permission policy updated across live tenant sessions', 'info');
  };

  return (
    <AppLayout>
      <div className="space-y-7 pb-12">
        {/* Top Control Plane Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="purple">Multi-Tenant Control Plane</Badge>
              <span className="text-xs text-slate-400 font-mono">ISO-27001 &amp; PRISMS Synced</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Platform Governance, Tenants &amp; RBAC Control
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Provision CRICOS education providers, manage partner recruitment agencies, and enforce zero-trust role-based access policies.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button variant="secondary" size="sm" onClick={() => setShowInviteStaff(true)} className="gap-1.5 text-xs">
              <Users className="w-3.5 h-3.5" />
              Invite Admin / Agent
            </Button>
            <Button size="sm" onClick={() => setShowAddSchool(true)} className="gap-1.5 text-xs">
              <Plus className="w-3.5 h-3.5" />
              Onboard CRICOS School
            </Button>
          </div>
        </div>

        {/* 4 Governance KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Verified RTO Tenants
              </span>
              <Building2 className="w-4.5 h-4.5 text-blue-600" />
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{schools.length}</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                18 Campuses
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Active Australian CRICOS providers</p>
          </Card>

          <Card className="p-5 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Active Portal Users
              </span>
              <Users className="w-4.5 h-4.5 text-indigo-600" />
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{staff.length + 42}</span>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                42 Agencies
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">96% enforcing hardware 2FA / Passkey</p>
          </Card>

          <Card className="p-5 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                ASQA Compliance Score
              </span>
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-600" />
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700">96.8%</span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                Audit Ready
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">ESOS National Code 2018 verified</p>
          </Card>

          <Card className="p-5 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                RBAC Security Policy
              </span>
              <KeyRound className="w-4.5 h-4.5 text-purple-600" />
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-purple-700">3 Roles</span>
              <span className="text-xs font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full">
                Zero-Trust
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Super Admin, School Admin &amp; Agent</p>
          </Card>
        </div>

        {/* Tab Controls & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl w-fit">
            <button
              onClick={() => setActiveTab('schools')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'schools'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              Partner Schools ({schools.length})
            </button>
            <button
              onClick={() => setActiveTab('staff')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'staff'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              Staff &amp; Agencies ({staff.length})
            </button>
            <button
              onClick={() => setActiveTab('rbac')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'rbac'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-purple-600" />
              RBAC Policy Matrix
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'audit'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              Audit Trail
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter tenants, staff or logs..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 shadow-2xs"
            />
          </div>
        </div>

        {/* TAB 1: Partner Schools Directory */}
        {activeTab === 'schools' && (
          <div className="grid grid-cols-1 gap-4">
            {schools
              .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.cricosCode.includes(search))
              .map((school) => (
                <Card
                  key={school.id}
                  className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5 hover:border-blue-300 transition-all border border-slate-200 shadow-2xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {school.id}
                      </span>
                      <h3 className="text-base font-bold text-slate-900">{school.name}</h3>
                      <Badge variant={school.status === 'Verified' ? 'success' : 'warning'}>
                        {school.status}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                      <span>
                        RTO Code: <strong className="font-mono text-slate-900">{school.rtoCode}</strong>
                      </span>
                      <span>•</span>
                      <span>
                        CRICOS: <strong className="font-mono text-slate-900">{school.cricosCode}</strong>
                      </span>
                      <span>•</span>
                      <span>Campuses: {school.campuses.join(', ')}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between lg:justify-end gap-6 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    <div className="flex items-center gap-5 text-center">
                      <div>
                        <p className="text-lg font-extrabold text-slate-900">{school.coursesCount}</p>
                        <p className="text-[11px] text-slate-500">Courses</p>
                      </div>
                      <div>
                        <p className="text-lg font-extrabold text-emerald-700">{school.activePromos}</p>
                        <p className="text-[11px] text-slate-500">Promos</p>
                      </div>
                      <div>
                        <p className="text-lg font-extrabold text-blue-700">{school.complianceScore}%</p>
                        <p className="text-[11px] text-slate-500">ASQA Score</p>
                      </div>
                    </div>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleToggleSchoolStatus(school.id)}
                      className="text-xs"
                    >
                      {school.status === 'Verified' ? 'Trigger ASQA Audit' : 'Approve CRICOS'}
                    </Button>
                  </div>
                </Card>
              ))}
          </div>
        )}

        {/* TAB 2: Staff & Agencies */}
        {activeTab === 'staff' && (
          <Card className="p-0 overflow-hidden border border-slate-200 shadow-2xs">
            <div className="divide-y divide-slate-100">
              {staff
                .filter(
                  (u) =>
                    u.name.toLowerCase().includes(search.toLowerCase()) ||
                    u.organization.toLowerCase().includes(search.toLowerCase())
                )
                .map((member) => (
                  <div
                    key={member.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center border border-blue-200 shrink-0">
                        {member.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-slate-900">{member.name}</p>
                          <Badge
                            variant={
                              member.role === 'Super Admin'
                                ? 'purple'
                                : member.role === 'School Admin'
                                ? 'success'
                                : 'info'
                            }
                            className="text-[10px]"
                          >
                            {member.role}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {member.email} • <span className="text-slate-700 font-medium">{member.organization}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                          member.mfaEnabled
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {member.mfaEnabled ? '2FA Active' : 'MFA Pending'}
                      </span>
                      <span className="text-xs text-slate-400">{member.lastActive}</span>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        )}

        {/* TAB 3: Interactive RBAC Matrix */}
        {activeTab === 'rbac' && (
          <Card className="p-0 overflow-hidden border border-slate-200 shadow-2xs">
            <div className="p-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Interactive Role-Based Access Control (RBAC) Matrix
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click any School Admin or Partner Agent toggle below to update live portal capabilities instantly.
                </p>
              </div>
              <Badge variant="success">Enforced via JWT Guard</Badge>
            </div>

            <div className="divide-y divide-slate-100">
              {permissions.map((perm, idx) => (
                <div
                  key={perm.capability}
                  className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {perm.category}
                    </span>
                    <p className="text-sm font-semibold text-slate-900 mt-1">{perm.capability}</p>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">Super Admin:</span>
                      <span className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => togglePermission(idx, 'schoolAdmin')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                        perm.schoolAdmin
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {perm.schoolAdmin ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <X className="w-3.5 h-3.5" />}
                      School Admin
                    </button>

                    <button
                      type="button"
                      onClick={() => togglePermission(idx, 'agent')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                        perm.agent
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {perm.agent ? <Check className="w-3.5 h-3.5 text-blue-600" /> : <X className="w-3.5 h-3.5" />}
                      Partner Agent
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* TAB 4: Audit Trail */}
        {activeTab === 'audit' && (
          <Card className="p-0 overflow-hidden border border-slate-200 shadow-2xs">
            <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Platform Security &amp; Compliance Audit Trail</h3>
                <p className="text-xs text-slate-500 mt-0.5">Real-time immutable log of admissions, CoE issuances, and policy alterations.</p>
              </div>
              <Badge variant="default">Append-Only Feed</Badge>
            </div>

            <div className="divide-y divide-slate-100">
              {AUDIT_LOGS.map((log) => (
                <div key={log.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {log.id}
                      </span>
                      <span className="text-xs font-bold text-slate-900">{log.event}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>Actor: <strong className="text-slate-700">{log.actor}</strong> ({log.role})</span>
                      <span>•</span>
                      <span>IP: {log.ip}</span>
                    </div>
                  </div>

                  <span className="text-xs text-slate-400 shrink-0">{log.time}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Modal: Onboard School */}
        {showAddSchool && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-6 space-y-5 bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Onboard CRICOS Provider</h3>
                <button
                  onClick={() => setShowAddSchool(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleCreateSchool} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Institution Legal Name</label>
                  <Input
                    placeholder="e.g. Melbourne English & Technology Institute"
                    value={newSchoolName}
                    onChange={(e) => setNewSchoolName(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">RTO Provider Code</label>
                    <Input
                      placeholder="e.g. 45123"
                      value={newRto}
                      onChange={(e) => setNewRto(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">CRICOS Registration #</label>
                    <Input
                      placeholder="e.g. 03812M"
                      value={newCricos}
                      onChange={(e) => setNewCricos(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <Button type="button" variant="secondary" onClick={() => setShowAddSchool(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Verify &amp; Provision</Button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {/* Modal: Invite Staff */}
        {showInviteStaff && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-6 space-y-5 bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Provision User Access</h3>
                <button
                  onClick={() => setShowInviteStaff(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleInviteSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                  <Input
                    placeholder="e.g. Liam Gallagher"
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Business Email</label>
                  <Input
                    type="email"
                    placeholder="e.g. liam@agency.com.au"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Organization</label>
                    <Input
                      value={inviteOrg}
                      onChange={(e) => setInviteOrg(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Assigned Role</label>
                    <select
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value as any)}
                      className="w-full h-9 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
                    >
                      <option value="School Admin">School Admin</option>
                      <option value="Senior Agent">Senior Agent</option>
                      <option value="Compliance Auditor">Compliance Auditor</option>
                      <option value="Super Admin">Super Admin</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <Button type="button" variant="secondary" onClick={() => setShowInviteStaff(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Dispatch Credentials</Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
