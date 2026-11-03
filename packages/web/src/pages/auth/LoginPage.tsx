'use client';

import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Alert, AlertDescription } from '../../components/ui/Alert';
import {
  Building2,
  School,
  Eye,
  EyeOff,
  ShieldCheck,
  Globe,
  GraduationCap,
  Mail,
  Lock,
  ArrowLeft,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  KeyRound,
} from 'lucide-react';

type PortalRole = 'agent' | 'school';

export default function LoginPage() {
  const navigate = useNavigate();
  const [portalRole, setPortalRole] = useState<PortalRole>('agent');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Forgot password inline flow
  const [forgotMode, setForgotMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const isAgent = portalRole === 'agent';

  const performLogin = (targetEmail: string, role: PortalRole) => {
    const userRole = role === 'agent' ? 'AGENCY_COUNSELOR' : 'SCHOOL_ADMIN';
    const fullName = role === 'agent' ? 'Sarah Chen' : 'Dr. Yuki Tanaka';
    const tenantName =
      role === 'agent' ? 'StudyMATE Global Agency' : 'Sydney International College';
    localStorage.setItem(
      'auth_user',
      JSON.stringify({
        user: { email: targetEmail, fullName },
        tenant: { slug: 'aus-edu-platform', name: tenantName },
        role: userRole,
      }),
    );
    navigate(role === 'agent' ? '/agent/dashboard' : '/school-admin/dashboard', {
      replace: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError('Please enter both your email address and password.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid work email address.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);
    performLogin(trimmedEmail, portalRole);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!resetEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resetEmail.trim())) {
      setError('Please enter a valid email address to receive a reset link.');
      return;
    }
    setResetSent(true);
  };

  const fillDemo = (role: PortalRole) => {
    setError('');
    setPortalRole(role);
    setEmail(role === 'agent' ? 'agent@ause.edu' : 'school@ause.edu');
    setPassword('demo1234');
  };

  const quickDemoLogin = (role: PortalRole) => {
    const demoEmail = role === 'agent' ? 'agent@ause.edu' : 'school@ause.edu';
    performLogin(demoEmail, role);
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

      {/* Left Panel — Role-Aware Branding & Social Proof (Desktop) */}
      <div
        className={`hidden lg:flex lg:w-[48%] xl:w-1/2 relative overflow-hidden p-12 xl:p-16 flex-col justify-between transition-colors duration-500 ${
          isAgent
            ? 'bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-950'
            : 'bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-950'
        }`}
      >
        {/* Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className={`absolute top-[8%] right-[8%] w-96 h-96 rounded-full blur-3xl transition-colors duration-500 ${
              isAgent ? 'bg-blue-400/20' : 'bg-emerald-400/20'
            }`}
          />
          <div
            className={`absolute bottom-[8%] left-[5%] w-[28rem] h-[28rem] rounded-full blur-3xl transition-colors duration-500 ${
              isAgent ? 'bg-indigo-400/15' : 'bg-teal-400/15'
            }`}
          />
        </div>

        {/* Top Bar: Brand + Back to Website */}
        <div className="relative z-10 flex items-center justify-between">
          <NavLink
            to="/"
            style={{ textDecoration: 'none' }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white">
                AusEdu Connect
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/15 text-white/90 border border-white/20">
                {isAgent ? 'Agent Workspace' : 'Provider Workspace'}
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

        {/* Center Value Proposition */}
        <div className="relative z-10 max-w-lg my-auto py-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-semibold mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {isAgent
              ? 'Trusted by 9,000+ Education Counselors'
              : '52+ CRICOS-Verified Australian Providers'}
          </div>

          <h1 className="text-3xl xl:text-4xl font-extrabold text-white mb-4 leading-tight tracking-tight">
            {isAgent
              ? 'Manage your student pipeline & generate instant quotes'
              : 'Manage your school intakes, promos & compliance docs'}
          </h1>
          <p className="text-white/80 text-base leading-relaxed mb-8">
            {isAgent
              ? 'Compare verified Australian schools, apply regional nationality promotions automatically, and track every student from initial quote to visa grant.'
              : 'Publish ELICOS and VET courses, configure targeted nationality promotions, and collaborate with pre-vetted global education agencies.'}
          </p>

          <div className="space-y-3.5">
            {(isAgent
              ? [
                  {
                    icon: Globe,
                    title: 'Instant Package & OSHC Quote Builder',
                    desc: 'Calculate tuition, material fees, and regional promos in seconds',
                  },
                  {
                    icon: ShieldCheck,
                    title: 'End-to-End Student Pipeline Tracking',
                    desc: 'Monitor offers, CoEs, deposits, and agency commissions seamlessly',
                  },
                  {
                    icon: Building2,
                    title: 'Direct CRICOS Provider Catalog',
                    desc: 'Access real-time course intakes, campus photos, and entry rules',
                  },
                ]
              : [
                  {
                    icon: School,
                    title: 'Dynamic Regional & Nationality Promos',
                    desc: 'Launch targeted weekly rates for LATAM, SE Asia, Europe, and more',
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Automated ASQA & CRICOS Compliance',
                    desc: 'Centralized VET provider agreements and document audit scores',
                  },
                  {
                    icon: Globe,
                    title: 'Verified Global Agency Distribution',
                    desc: 'Receive complete, pre-screened student applications ready for CoE',
                  },
                ]
            ).map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs"
              >
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/15 mt-0.5">
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-white/70 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Metrics */}
        <div className="relative z-10 grid grid-cols-3 gap-4 pt-6 border-t border-white/15 text-white">
          <div>
            <p className="text-2xl font-extrabold">52+</p>
            <p className="text-xs text-white/70">Partner Schools</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold">1,240+</p>
            <p className="text-xs text-white/70">CRICOS Courses</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold">99.9%</p>
            <p className="text-xs text-white/70">Compliance SLA</p>
          </div>
        </div>
      </div>

      {/* Right Panel — Auth Card */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-10">
        <div className="w-full max-w-[440px]">
          {/* Auth Mode Tabs (Sign In vs Create Account) */}
          <div className="grid grid-cols-2 p-1 mb-5 bg-slate-200/70 rounded-xl border border-slate-200">
            <NavLink
              to="/login"
              style={{ textDecoration: 'none' }}
              className="text-center py-2 rounded-lg text-xs font-bold bg-white text-slate-900 shadow-2xs"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              style={{ textDecoration: 'none' }}
              className="text-center py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Create Account
            </NavLink>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-900/5 p-6 sm:p-8">
            {forgotMode ? (
              /* ── Forgot Password Flow ── */
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setForgotMode(false);
                    setResetSent(false);
                    setError('');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-4 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </button>

                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
                  <KeyRound className="w-5 h-5 text-blue-600" />
                </div>

                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Reset your password
                </h2>
                <p className="text-sm text-slate-500 mt-1 mb-5">
                  Enter the work email associated with your account and we&apos;ll send a password recovery link.
                </p>

                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {resetSent ? (
                  <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-center space-y-3">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <div>
                      <p className="text-sm font-bold text-emerald-900">
                        Recovery link sent!
                      </p>
                      <p className="text-xs text-emerald-700 mt-1">
                        We&apos;ve sent password reset instructions to{' '}
                        <span className="font-semibold">{resetEmail}</span>.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setForgotMode(false);
                        setResetSent(false);
                      }}
                      className="w-full h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Return to Sign In
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleResetSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="reset-email"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        Work Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="reset-email"
                          type="email"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          placeholder="you@organization.edu"
                          className="flex h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                    >
                      Send Recovery Link
                    </button>
                  </form>
                )}
              </div>
            ) : (
              /* ── Standard Sign In Flow ── */
              <>
                <div className="mb-5">
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Welcome back
                  </h1>
                  <p className="text-sm text-slate-500 mt-1">
                    Choose your workspace and sign in to continue
                  </p>

                  {/* Role Selector Cards */}
                  <div className="grid grid-cols-2 gap-2.5 mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setPortalRole('agent');
                        setError('');
                      }}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                        isAgent
                          ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-600/15'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isAgent
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-500'
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
                          Agent Portal
                        </span>
                        <span className="block text-[10px] text-slate-500 truncate">
                          Agency / Counselor
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPortalRole('school');
                        setError('');
                      }}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                        !isAgent
                          ? 'border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-600/15'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          !isAgent
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-500'
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
                          School Admin
                        </span>
                        <span className="block text-[10px] text-slate-500 truncate">
                          Provider / RTO
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Work Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={
                          isAgent ? 'agent@ause.edu' : 'school@ause.edu'
                        }
                        className={`flex h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                          isAgent
                            ? 'focus:ring-blue-500/20 focus:border-blue-600'
                            : 'focus:ring-emerald-500/20 focus:border-emerald-600'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="password"
                        className="block text-xs font-semibold text-slate-700"
                      >
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setForgotMode(true);
                          setResetEmail(email);
                          setError('');
                        }}
                        className={`text-xs font-semibold hover:underline cursor-pointer ${
                          isAgent ? 'text-blue-600' : 'text-emerald-600'
                        }`}
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className={`flex h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                          isAgent
                            ? 'focus:ring-blue-500/20 focus:border-blue-600'
                            : 'focus:ring-emerald-500/20 focus:border-emerald-600'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-xs text-slate-600">
                        Keep me signed in for 30 days
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full h-11 rounded-xl text-sm font-semibold text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                      isAgent
                        ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
                        : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Signing in…
                      </>
                    ) : (
                      <>
                        Sign In to {isAgent ? 'Agent Portal' : 'School Admin'}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Instant Demo Section — Clean & Non-Overflowing */}
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Sparkles
                          className={`w-3.5 h-3.5 ${
                            isAgent ? 'text-blue-600' : 'text-emerald-600'
                          }`}
                        />
                        <span className="text-xs font-bold text-slate-800">
                          Quick Demo Access
                        </span>
                      </div>
                      <button
                        onClick={() => fillDemo(portalRole)}
                        type="button"
                        className={`text-xs font-semibold hover:underline cursor-pointer ${
                          isAgent ? 'text-blue-600' : 'text-emerald-600'
                        }`}
                      >
                        Auto-fill form
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200/80 text-xs">
                      <span className="text-slate-500">Credentials:</span>
                      <code className="font-mono text-slate-700 font-medium">
                        {isAgent ? 'agent@ause.edu' : 'school@ause.edu'} / demo1234
                      </code>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => quickDemoLogin('agent')}
                        className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80 hover:bg-blue-100/80 transition-colors cursor-pointer"
                      >
                        <Building2 className="w-3.5 h-3.5" /> Demo Agent
                      </button>
                      <button
                        type="button"
                        onClick={() => quickDemoLogin('school')}
                        className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 hover:bg-emerald-100/80 transition-colors cursor-pointer"
                      >
                        <School className="w-3.5 h-3.5" /> Demo School
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-5 text-center text-xs sm:text-sm text-slate-600">
                  Don&apos;t have an account yet?{' '}
                  <NavLink
                    to="/signup"
                    className={`font-semibold hover:underline ${
                      isAgent ? 'text-blue-600' : 'text-emerald-600'
                    }`}
                  >
                    Create Partner Account
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
