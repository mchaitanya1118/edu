import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  UserPlus,
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Building2,
} from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useToast } from '../../components/ui/Toast';

interface CountryOption {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

const COUNTRIES: CountryOption[] = [
  { code: 'CN', name: 'China', flag: '🇨🇳', dialCode: '+86' },
  { code: 'IN', name: 'India', flag: '🇮🇳', dialCode: '+91' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', dialCode: '+55' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', dialCode: '+57' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', dialCode: '+81' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', dialCode: '+82' },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵', dialCode: '+977' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', dialCode: '+63' },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼', dialCode: '+886' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', dialCode: '+84' },
];

export default function QuickAddStudentPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[1]); // India
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [targetIntake, setTargetIntake] = useState('jul2026');
  const [targetCourse, setTargetCourse] = useState('Diploma of Leadership and Management');
  const [hasEnglishTest, setHasEnglishTest] = useState(true);
  const [hasFundsEvidenced, setHasFundsEvidenced] = useState(true);

  const handleSubmit = (e: React.FormEvent, proceedToApplication = false) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) {
      toast('Please enter first name, last name, and student email.', 'error');
      return;
    }

    const fullName = `${firstName} ${lastName}`;
    toast(`Candidate ${fullName} added successfully to your pipeline!`, 'success');

    if (proceedToApplication) {
      navigate('/agent/application-form');
    } else {
      navigate('/agent/pipeline');
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-4xl mx-auto pb-16">
        {/* Header & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Link to="/agent/dashboard" className="hover:text-blue-600 transition-colors">Agent Hub</Link>
              <span>/</span>
              <Link to="/agent/pipeline" className="hover:text-blue-600 transition-colors">Pipeline</Link>
              <span>/</span>
              <span className="text-slate-900 font-medium">Quick Add Student</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Register International Lead
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Fast intake onboarding for Genuine Student (GS) pre-assessment and quote generation.
                </p>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            className="gap-1.5 text-xs text-slate-600 border-slate-300 hover:bg-slate-50"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Button>
        </div>

        {/* Form Container */}
        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
          <Card className="p-6 sm:p-8 bg-white border border-slate-200 shadow-2xs rounded-2xl space-y-6">
            {/* Candidate Identity */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 mb-4">
                1. Candidate Identity &amp; Contact Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first-name" className="block text-xs font-bold text-slate-700 mb-1.5">
                    First / Given Name <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    id="first-name"
                    type="text"
                    required
                    placeholder="e.g. Wei or Priya"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-10 rounded-xl border-slate-200 text-sm font-medium"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Last / Family Name <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    id="last-name"
                    type="text"
                    required
                    placeholder="e.g. Chen or Sharma"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-10 rounded-xl border-slate-200 text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Passport / Citizenship Country
                  </label>
                  <select
                    value={selectedCountry.code}
                    onChange={(e) => {
                      const found = COUNTRIES.find((c) => c.code === e.target.value);
                      if (found) setSelectedCountry(found);
                    }}
                    className="w-full h-10 px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white text-slate-900 font-medium cursor-pointer"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="student-email" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Student Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <Input
                      id="student-email"
                      type="email"
                      required
                      placeholder="student@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10 pl-10 rounded-xl border-slate-200 text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="phone-number" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Phone / WhatsApp Number
                </label>
                <div className="flex gap-2">
                  <div className="h-10 px-3 flex items-center bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shrink-0">
                    {selectedCountry.flag} {selectedCountry.dialCode}
                  </div>
                  <div className="relative flex-1">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <Input
                      id="phone-number"
                      type="tel"
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-10 pl-10 rounded-xl border-slate-200 text-sm font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Target Study Plan */}
            <div className="pt-2">
              <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 mb-4">
                2. Target Course &amp; Intake
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Target Intake</label>
                  <select
                    value={targetIntake}
                    onChange={(e) => setTargetIntake(e.target.value)}
                    className="w-full h-10 px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white text-slate-900 font-medium cursor-pointer"
                  >
                    <option value="jul2026">July 2026 (Trimester 3) — Fast Track</option>
                    <option value="oct2026">October 2026 (Trimester 4)</option>
                    <option value="jan2027">January 2027 (Trimester 1)</option>
                    <option value="apr2027">April 2027 (Trimester 2)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Preferred CRICOS Course</label>
                  <select
                    value={targetCourse}
                    onChange={(e) => setTargetCourse(e.target.value)}
                    className="w-full h-10 px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white text-slate-900 font-medium cursor-pointer"
                  >
                    <option value="Diploma of Leadership and Management">Diploma of Leadership and Management (APC)</option>
                    <option value="General English">General English (Sydney Int College)</option>
                    <option value="Commercial Cookery Cert III">Commercial Cookery Cert III</option>
                    <option value="Diploma of Information Technology">Diploma of Information Technology</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Genuine Student Pre-Screening */}
            <div className="pt-2">
              <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 mb-4">
                3. Genuine Student (GS) Pre-Screening
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between cursor-pointer hover:border-blue-400 transition-all">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className={`w-4 h-4 ${hasEnglishTest ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span className="text-xs font-semibold text-slate-800">English Proficiency Verified (IELTS/PTE ≥ 5.5)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasEnglishTest}
                    onChange={(e) => setHasEnglishTest(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </label>

                <label className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between cursor-pointer hover:border-blue-400 transition-all">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className={`w-4 h-4 ${hasFundsEvidenced ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span className="text-xs font-semibold text-slate-800">Financial Capacity Evidenced (Living A$29.7k)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasFundsEvidenced}
                    onChange={(e) => setHasFundsEvidenced(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto text-xs text-slate-500 hover:text-slate-900"
              >
                Cancel
              </Button>

              <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full sm:w-auto text-xs font-bold border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Save &amp; Add to Pipeline
                </Button>
                <Button
                  type="button"
                  onClick={(e) => handleSubmit(e, true)}
                  className="w-full sm:w-auto text-xs font-bold gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20"
                >
                  Save &amp; Open Full Application
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </form>
      </div>
    </AppLayout>
  );
}
