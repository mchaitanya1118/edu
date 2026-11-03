'use client';

import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '../../components/ui/Alert';
import {
  Building2,
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  School,
  GraduationCap,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'agent' | 'school'>('agent');
  const [fullName, setFullName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isAgent = role === 'agent';

  // Password strength calculation (0 to 4)
  const getPasswordStrength = (pwd: string): { score: number; label: string; color: string } => {
    if (!pwd) return { score: 0, label: 'Min. 8 characters', color: 'bg-slate-200' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd) || /[^A-Za-z0-9]/.test(pwd)) score++;
    const clamped = Math.max(1, Math.min(4, score));
    const map: Record<number, { label: string; color: string }> = {
      1: { label: 'Weak', color: 'bg-red-500' },
      2: { label: 'Fair', color: 'bg-amber-500' },
      3: { label: 'Good', color: 'bg-blue-500' },
      4: { label: 'Strong', color: 'bg-emerald-500' },
    };
    return { score: clamped, ...map[clamped] };
  };

  const pwdStrength = getPasswordStrength(password);

  const handleEnterPortal = (targetRole: 'agent' | 'school' = role) => {
    const userRole = targetRole === 'agent' ? 'AGENCY_COUNSELOR' : 'SCHOOL_ADMIN';
    const defaultEmail = targetRole === 'agent' ? 'agent@ause.edu' : 'school@ause.edu';
    const defaultOrg =
      targetRole === 'agent' ? 'StudyMATE Global Agency' : 'Sydney International College';

    localStorage.setItem(
      'auth_user',
      JSON.stringify({
        user: {
          email: email.trim() || defaultEmail,
          fullName: fullName.trim() || (targetRole === 'agent' ? 'Sarah Chen' : 'Dr. Yuki Tanaka'),
        },
        tenant: {
          slug: 'aus-edu-platform',
          name: orgName.trim() || defaultOrg,
        },
        role: userRole,
      }),
    );
    navigate(targetRole === 'agent' ? '/agent/dashboard' : '/school-admin/dashboard', {
      replace: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid work email address.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (!agreedTerms) {
      setError('Please accept the Terms of Service and Privacy Policy to continue.');
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 text-slate-900">
      {/* Mobile Top Header */}
      <header className="lg:hidden flex items-center justify-between px-4 py-3.5 bg-white border-b border-slate-200/80 sticky top-0 z-30">
        <NavLink
          to="/"
          style={{ textDecoration: 'none' }}
          className="flex items-center gap-2.5"
        >
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-xs transition-colors ${
              isAgent ? 'bg-blue-600' : 'bg-emerald-600'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900 text-base tracking-tight">
            AusEdu Connect
          </span>
        </NavLink>
        <NavLink
          to="/"
          style={{ textDecoration: 'none' }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200/70 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Website
        </NavLink>
      </header>

      {/* Left Panel — Role-Aware Pitch (Desktop) */}
      <div
        className={`hidden lg:flex lg:w-[48%] xl:w-1/2 relative overflow-hidden p-12 xl:p-16 flex-col justify-between transition-colors duration-500 ${
          isAgent
            ? 'bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-950'
            : 'bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-950'
        }`}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className={`absolute top-10 left-10 w-80 h-80 rounded-full blur-3xl transition-colors duration-500 ${
              isAgent ? 'bg-blue-400/20' : 'bg-emerald-400/20'
            }`}
          />
          <div
            className={`absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl transition-colors duration-500 ${
              isAgent ? 'bg-indigo-400/15' : 'bg-teal-400/15'
            }`}
          />
        </div>

        {/* Top Bar */}
        <div className="relative z-10 flex items-center justify-between">
          <NavLink
            to="/"
            style={{ textDecoration: 'none' }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-lg tracking-tight">
                AusEdu Connect
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/15 text-white/90 border border-white/20">
                {isAgent ? 'Agent Network' : 'School Partner'}
              </span>
            </div>
          </NavLink>

          <NavLink
            to="/"
            style={{ textDecoration: 'none' }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/15 hover:bg-white/20 backdrop-blur-sm transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Website
          </NavLink>
        </div>

        {/* Center Pitch */}
        <div className="relative z-10 max-w-lg my-auto py-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-semibold mb-5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            {isAgent
              ? 'Free for Accredited Education Agencies'
              : 'Direct CRICOS & RTO Provider Onboarding'}
          </div>

          <h1 className="text-3xl xl:text-4xl font-extrabold text-white mb-4 leading-tight tracking-tight">
            {isAgent
              ? 'Join Our Global Education Agent Network'
              : 'Join Our Verified Australian School Partnership'}
          </h1>
          <p className="text-white/80 text-base mb-8 leading-relaxed">
            {isAgent
              ? 'Access verified Australian schools and CRICOS courses. Generate instant student quotes, unlock regional nationality promos, and grow your agency revenue.'
              : 'Publish your course catalog and regional promotions, streamline ASQA/CRICOS document compliance, and receive pre-qualified applications from global agents.'}
          </p>

          <div className="space-y-3.5">
            {(isAgent
              ? [
                  {
                    title: '52+ Verified Australian Providers',
                    desc: 'Browse ELICOS, VET, and Higher Ed courses with live weekly pricing',
                  },
                  {
                    title: 'Instant Package & OSHC Quote Engine',
                    desc: 'Calculate tuition, material fees, deposits, and regional promos in seconds',
                  },
                  {
                    title: 'Transparent Commission & Pipeline CRM',
                    desc: 'Track student offers, visa outcomes, and agency payouts end to end',
                  },
                ]
              : [
                  {
                    title: 'Complete Course & Intake Publishing',
                    desc: 'Manage flexible weekly ELICOS intakes and fixed VET/Higher Ed blocks',
                  },
                  {
                    title: 'Targeted Nationality Promotions',
                    desc: 'Create custom promotional rates by region or passport nationality',
                  },
                  {
                    title: 'Compliance & Document Dashboard',
                    desc: 'Track provider agreements, checklists, and agent compliance scores',
                  },
                ]
            ).map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs"
              >
                <CheckCircle2 className="w-5 h-5 mt-0.5 text-emerald-400 shrink-0" />
                <div>
                  <p className="font-semibold text-white text-sm">{f.title}</p>
                  <p className="text-xs text-white/70 mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Trust Line */}
        <div className="relative z-10 pt-6 border-t border-white/15 flex items-center justify-between text-white/75 text-xs font-medium">
          <span>Trusted by 9,000+ education professionals</span>
          <span>100% CRICOS &amp; ASQA Aligned</span>
        </div>
      </div>

      {/* Right Panel — Form or Confirmation */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-10">
        <div className="w-full max-w-[440px]">
          {/* Auth Mode Tabs (Sign In vs Create Account) */}
          <div className="grid grid-cols-2 p-1 mb-5 bg-slate-200/70 rounded-xl border border-slate-200">
            <NavLink
              to="/login"
              style={{ textDecoration: 'none' }}
              className="text-center py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              style={{ textDecoration: 'none' }}
              className="text-center py-2 rounded-lg text-xs font-bold bg-white text-slate-900 shadow-2xs"
            >
              Create Account
            </NavLink>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-900/5 p-6 sm:p-8">
            {submitted ? (
              /* ── Account Created Confirmation ── */
              <div className="text-center py-2">
                <div
                  className={`mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                    isAgent
                      ? 'bg-blue-50 border border-blue-100 text-blue-600'
                      : 'bg-emerald-50 border border-emerald-100 text-emerald-600'
                  }`}
                >
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                    isAgent
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  {isAgent ? 'Agent Workspace Ready' : 'School Admin Workspace Ready'}
                </span>

                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Welcome aboard, {fullName.trim() || 'Partner'}!
                </h2>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Your {isAgent ? 'Education Agent' : 'School Administrator'} account for{' '}
                  <span className="font-semibold text-slate-800">
                    {orgName.trim() || (isAgent ? 'your agency' : 'your institution')}
                  </span>{' '}
                  has been created.
                </p>

                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => handleEnterPortal(role)}
                    className={`w-full h-11 rounded-xl text-white text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                      isAgent
                        ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
                        : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                    }`}
                  >
                    Launch {isAgent ? 'Agent Portal' : 'School Admin Portal'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <NavLink
                    to="/login"
                    style={{ textDecoration: 'none' }}
                    className="block w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition-colors"
                  >
                    Go to Sign In
                  </NavLink>
                </div>
              </div>
            ) : (
              /* ── Registration Form ── */
              <>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {isAgent ? 'Create Agent Account' : 'Create School Account'}
                </h2>
                <p className="text-slate-500 text-sm mt-1 mb-4">
                  Select your organization type and complete your profile
                </p>

                {/* Role Selector */}
                <div className="grid grid-cols-2 gap-2.5 mb-5">
                  <button
                    type="button"
                    onClick={() => {
                      setRole('agent');
                      setError('');
                    }}
                    className={`flex items-center gap-2.5 rounded-xl border-2 p-3 transition-all text-left cursor-pointer ${
                      isAgent
                        ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-600/15'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isAgent ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span
                        className={`block text-xs font-bold truncate ${
                          isAgent ? 'text-blue-800' : 'text-slate-700'
                        }`}
                      >
                        Agent
                      </span>
                      <span className="block text-[10px] text-slate-500 truncate">
                        Agency / Counselor
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setRole('school');
                      setError('');
                    }}
                    className={`flex items-center gap-2.5 rounded-xl border-2 p-3 transition-all text-left cursor-pointer ${
                      !isAgent
                        ? 'border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-600/15'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        !isAgent ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <School className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span
                        className={`block text-xs font-bold truncate ${
                          !isAgent ? 'text-emerald-800' : 'text-slate-700'
                        }`}
                      >
                        School
                      </span>
                      <span className="block text-[10px] text-slate-500 truncate">
                        Provider / RTO
                      </span>
                    </div>
                  </button>
                </div>

                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form className="space-y-3.5" onSubmit={handleSubmit} noValidate>
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        id="fullName"
                        placeholder={isAgent ? 'e.g. Sarah Chen' : 'e.g. Dr. Yuki Tanaka'}
                        className={`flex h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                          isAgent
                            ? 'focus:ring-blue-500/20 focus:border-blue-600'
                            : 'focus:ring-emerald-500/20 focus:border-emerald-600'
                        }`}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Organization / Agency / School Name */}
                  <div>
                    <label
                      htmlFor="orgName"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      {isAgent ? 'Agency / Organization Name' : 'School / Institution Name'}
                    </label>
                    <div className="relative">
                      {isAgent ? (
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      ) : (
                        <School className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      )}
                      <input
                        id="orgName"
                        placeholder={
                          isAgent
                            ? 'e.g. StudyMATE Global Agency'
                            : 'e.g. Sydney International College'
                        }
                        className={`flex h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                          isAgent
                            ? 'focus:ring-blue-500/20 focus:border-blue-600'
                            : 'focus:ring-emerald-500/20 focus:border-emerald-600'
                        }`}
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Work Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Work Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        id="email"
                        type="email"
                        placeholder="you@organization.edu"
                        className={`flex h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                          isAgent
                            ? 'focus:ring-blue-500/20 focus:border-blue-600'
                            : 'focus:ring-emerald-500/20 focus:border-emerald-600'
                        }`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Password + Strength Meter */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="password"
                        className="block text-xs font-semibold text-slate-700"
                      >
                        Password
                      </label>
                      <span className="text-[11px] font-medium text-slate-500">
                        {pwdStrength.label}
                      </span>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password (8+ chars)"
                        minLength={8}
                        className={`flex h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                          isAgent
                            ? 'focus:ring-blue-500/20 focus:border-blue-600'
                            : 'focus:ring-emerald-500/20 focus:border-emerald-600'
                        }`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {/* 4-bar strength indicator */}
                    <div className="grid grid-cols-4 gap-1.5 mt-2">
                      {[1, 2, 3, 4].map((bar) => (
                        <div
                          key={bar}
                          className={`h-1 rounded-full transition-colors ${
                            pwdStrength.score >= bar ? pwdStrength.color : 'bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Terms checkbox */}
                  <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      className="mt-0.5 w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs text-slate-500 leading-relaxed">
                      I agree to the{' '}
                      <span className="font-semibold text-slate-700">Terms of Service</span>,{' '}
                      <span className="font-semibold text-slate-700">Privacy Policy</span>, and{' '}
                      <span className="font-semibold text-slate-700">CRICOS Partner Code</span>.
                    </span>
                  </label>

                  {/* Submit */}
                  <button
                    type="submit"
                    className={`w-full h-11 rounded-xl text-sm font-semibold text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                      isAgent
                        ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
                        : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                    }`}
                  >
                    Create {isAgent ? 'Agent' : 'School'} Account
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Instant Demo Shortcut */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-500">Want to explore first?</span>
                  <button
                    type="button"
                    onClick={() => handleEnterPortal(role)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200/80 text-slate-800 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Try Instant {isAgent ? 'Agent' : 'School'} Demo
                  </button>
                </div>

                <div className="mt-4 text-center text-xs sm:text-sm text-slate-600">
                  Already have an account?{' '}
                  <NavLink
                    to="/login"
                    className={`font-semibold hover:underline ${
                      isAgent ? 'text-blue-600' : 'text-emerald-600'
                    }`}
                  >
                    Sign In
                  </NavLink>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
