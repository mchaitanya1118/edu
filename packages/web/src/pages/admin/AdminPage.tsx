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
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

type TenantSchool = {
  id: string;
  name: string;
  rtoCode: string;
  cricosCode: string;
  campuses: string[];
  coursesCount: number;
  activePromos: number;
  complianceScore: number;
  status: 'Verified' | 'Audit Pending' | 'Suspended';
};

type StaffMember = {
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
    rtoCode: '45123',
    cricosCode: '03812M',
    campuses: ['Sydney CBD', 'Melbourne', 'Brisbane'],
    coursesCount: 12,
    activePromos: 4,
    complianceScore: 98,
    status: 'Verified',
  },
  {
    id: 'SCH-02',
    name: 'Greenwich College Australia',
    rtoCode: '91153',
    cricosCode: '02672K',
    campuses: ['Sydney', 'Melbourne', 'Gold Coast', 'Perth'],
    coursesCount: 16,
    activePromos: 5,
    complianceScore: 96,
    status: 'Verified',
  },
  {
    id: 'SCH-03',
    name: 'ILSC Business & English College',
    rtoCode: '31564',
    cricosCode: '02137M',
    campuses: ['Brisbane', 'Sydney', 'Adelaide'],
    coursesCount: 9,
    activePromos: 2,
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
    organization: 'EduConnect HQ',
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
    capability: 'Launch Provider Promotional Scholarships',
    category: 'Pricing',
    superAdmin: true,
    schoolAdmin: true,
    agent: false,
  },
  {
    capability: 'Generate Student Tuition Quotes & Offers',
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
    capability: 'Upload Student Visa & Passport Artifacts',
    category: 'Compliance',
    superAdmin: true,
    schoolAdmin: true,
    agent: true,
  },
  {
    capability: 'Onboard New RTO / CRICOS Tenant',
    category: 'Governance',
    superAdmin: true,
    schoolAdmin: false,
    agent: false,
  },
];

export default function AdminGovernancePage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'schools' | 'staff' | 'rbac'>('schools');
  const [schools, setSchools] = useState<TenantSchool[]>(INITIAL_SCHOOLS);
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [permissions, setPermissions] = useState(INITIAL_PERMISSIONS);
  const [search, setSearch] = useState('');

  // Modal states
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
    toast('Institution CRICOS verification status updated', 'success');
  };

  const handleCreateSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchoolName.trim()) return;
    const created: TenantSchool = {
      id: `SCH-0${schools.length + 1}`,
      name: newSchoolName,
      rtoCode: newRto || '45990',
      cricosCode: newCricos || '04011B',
      campuses: ['Sydney CBD'],
      coursesCount: 4,
      activePromos: 1,
      complianceScore: 100,
      status: 'Verified',
    };
    setSchools([created, ...schools]);
    setNewSchoolName('');
    setNewRto('');
    setNewCricos('');
    setShowAddSchool(false);
    toast(`${created.name} onboarded to platform`, 'success');
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
    toast(`Access invitation sent to ${created.email}`, 'success');
  };

  const togglePermission = (idx: number, key: 'schoolAdmin' | 'agent') => {
    setPermissions((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, [key]: !p[key] } : p))
    );
    toast('RBAC permission policy updated across active sessions', 'info');
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Top Governance Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="purple">Multi-Tenant Control Plane</Badge>
              <span className="text-xs text-slate-400 font-mono">ISO-27001 & PRISMS Synced</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Platform Governance, Tenants & RBAC
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Provision CRICOS educational institutions, manage agency & provider accounts, and enforce role-based access policies.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button variant="secondary" onClick={() => setShowInviteStaff(true)}>
              <Users className="w-4 h-4" />
              Invite Admin / Agent
            </Button>
            <Button onClick={() => setShowAddSchool(true)}>
              <Plus className="w-4 h-4" />
              Onboard CRICOS School
            </Button>
          </div>
        </div>

        {/* 4 Governance Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Verified RTO Tenants
              </span>
              <Building2 className="w-4.5 h-4.5 text-blue-600" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-slate-900">{schools.length}</span>
              <Badge variant="success">10 Campuses</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">Active Australian CRICOS providers</p>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Active Portal Users
              </span>
              <Users className="w-4.5 h-4.5 text-indigo-600" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-slate-900">{staff.length + 38}</span>
              <Badge variant="info">42 Agencies</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">94% enforcing hardware 2FA / SSO</p>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                ASQA Audit Score
              </span>
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-600" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-slate-900">96.4%</span>
              <Badge variant="success">Compliant</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">ESOS National Code 2018 verified</p>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                RBAC Policy Matrix
              </span>
              <KeyRound className="w-4.5 h-4.5 text-amber-600" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-slate-900">3 Roles</span>
              <Badge variant="purple">Zero-Trust</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">Super Admin, School Admin & Agent</p>
          </Card>
        </div>

        {/* Interactive Workspace Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl w-fit">
            <button
              onClick={() => setActiveTab('schools')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'schools'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Partner Schools ({schools.length})
            </button>
            <button
              onClick={() => setActiveTab('staff')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'staff'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Staff & Agencies ({staff.length})
            </button>
            <button
              onClick={() => setActiveTab('rbac')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'rbac'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              RBAC Permissions Matrix
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter tenants or staff..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>

        {/* TAB 1: Partner Schools Directory */}
        {activeTab === 'schools' && (
          <div className="grid grid-cols-1 gap-4">
            {schools
              .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
              .map((school) => (
                <Card
                  key={school.id}
                  className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-blue-300 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {school.id}
                      </span>
                      <h3 className="text-base font-bold text-slate-900">{school.name}</h3>
                      <Badge variant={school.status === 'Verified' ? 'success' : 'warning'}>
                        {school.status}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
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

                  <div className="flex flex-wrap items-center gap-6 shrink-0">
                    <div className="flex items-center gap-5 text-center">
                      <div>
                        <p className="text-lg font-bold text-slate-900">{school.coursesCount}</p>
                        <p className="text-[11px] text-slate-500">Courses</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-emerald-700">{school.activePromos}</p>
                        <p className="text-[11px] text-slate-500">Promos</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-blue-700">{school.complianceScore}%</p>
                        <p className="text-[11px] text-slate-500">ASQA Score</p>
                      </div>
                    </div>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleToggleSchoolStatus(school.id)}
                    >
                      {school.status === 'Verified' ? 'Trigger Audit' : 'Approve CRICOS'}
                    </Button>
                  </div>
                </Card>
              ))}
          </div>
        )}

        {/* TAB 2: Staff & Agencies */}
        {activeTab === 'staff' && (
          <Card className="p-0 overflow-hidden">
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
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center border border-blue-200">
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
                          >
                            {member.role}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500">
                          {member.email} • <span className="text-slate-700 font-medium">{member.organization}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-lg border ${
                          member.mfaEnabled
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {member.mfaEnabled ? '2FA Verified' : 'MFA Pending'}
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
          <Card className="p-0 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Interactive Role-Based Access Control (RBAC) Matrix
                </h3>
                <p className="text-xs text-slate-500">
                  Click any School Admin or Partner Agent toggle below to update live portal capabilities.
                </p>
              </div>
              <Badge variant="success">Enforced via JWT Guard</Badge>
            </div>

            <div className="divide-y divide-slate-100">
              {permissions.map((perm, idx) => (
                <div
                  key={perm.capability}
                  className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {perm.category}
                    </span>
                    <p className="text-sm font-semibold text-slate-900 mt-1">{perm.capability}</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>Super Admin</span>
                      <span className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => togglePermission(idx, 'schoolAdmin')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                        perm.schoolAdmin
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}
                    >
                      {perm.schoolAdmin ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      School Admin
                    </button>

                    <button
                      type="button"
                      onClick={() => togglePermission(idx, 'agent')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                        perm.agent
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}
                    >
                      {perm.agent ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      Partner Agent
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Modal: Onboard School */}
        {showAddSchool && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Onboard CRICOS Provider</h3>
                <button
                  onClick={() => setShowAddSchool(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleCreateSchool} className="space-y-4">
                <Input
                  label="Institution Legal Name"
                  placeholder="e.g. Sydney Institute of Business & Technology"
                  value={newSchoolName}
                  onChange={(e) => setNewSchoolName(e.target.value)}
                  required
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="ASQA RTO Code"
                    placeholder="e.g. 45123"
                    value={newRto}
                    onChange={(e) => setNewRto(e.target.value)}
                    required
                  />
                  <Input
                    label="CRICOS Provider Code"
                    placeholder="e.g. 03812M"
                    value={newCricos}
                    onChange={(e) => setNewCricos(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="secondary" onClick={() => setShowAddSchool(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Provision Tenant</Button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {/* Modal: Invite Staff */}
        {showInviteStaff && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Invite Portal User</h3>
                <button
                  onClick={() => setShowInviteStaff(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleInviteSubmit} className="space-y-4">
                <Input
                  label="Full Name"
                  placeholder="e.g. Liam O'Connor"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  required
                />
                <Input
                  label="Work Email"
                  type="email"
                  placeholder="liam@college.edu.au"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                />
                <Input
                  label="Organization / School"
                  value={inviteOrg}
                  onChange={(e) => setInviteOrg(e.target.value)}
                />
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Assigned Role
                  </label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as StaffMember['role'])}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900"
                  >
                    <option value="School Admin">School Admin</option>
                    <option value="Senior Agent">Senior Agent</option>
                    <option value="Compliance Auditor">Compliance Auditor</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="secondary" onClick={() => setShowInviteStaff(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Send Invite</Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
