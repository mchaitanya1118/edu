import React, { useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  Plus,
  Sparkles,
  CheckCircle2,
  Download,
  X,
  Copy,
  CreditCard,
  Search,
  DollarSign,
  Globe,
  FileCheck,
  Building2,
  Calendar,
  Send,
  Eye,
  ArrowUpRight,
  ShieldCheck,
  Printer,
  ChevronRight,
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

export type QuoteItem = {
  id: string;
  studentName: string;
  studentEmail: string;
  nationality: string;
  provider: string;
  cricosCode: string;
  course: string;
  campus: string;
  weeks: number;
  standardTuition: number;
  promoDiscount: number;
  materialFee: number;
  enrolmentFee: number;
  status: 'Sent to Student' | 'Accepted & Paid' | 'Draft' | 'Offer Issued';
  createdAt: string;
  intakeDate: string;
};

const INITIAL_QUOTES: QuoteItem[] = [
  {
    id: 'QT-2026-881',
    studentName: 'Mateo Silva',
    studentEmail: 'mateo.silva@gmail.com',
    nationality: 'Colombia',
    provider: 'Australian Pacific College',
    cricosCode: '104112A',
    course: 'Diploma of Leadership & Management',
    campus: 'Sydney CBD',
    weeks: 52,
    standardTuition: 8000,
    promoDiscount: 1200,
    materialFee: 0,
    enrolmentFee: 200,
    status: 'Accepted & Paid',
    createdAt: '02 Nov 2026',
    intakeDate: '14 Jul 2026',
  },
  {
    id: 'QT-2026-882',
    studentName: 'Yuki Tanaka',
    studentEmail: 'yuki.tanaka@yahoo.co.jp',
    nationality: 'Japan',
    provider: 'Greenwich English College',
    cricosCode: '098412B',
    course: 'General English (ELICOS)',
    campus: 'Melbourne',
    weeks: 20,
    standardTuition: 7000,
    promoDiscount: 1400,
    materialFee: 200,
    enrolmentFee: 250,
    status: 'Sent to Student',
    createdAt: '03 Nov 2026',
    intakeDate: 'Weekly Monday',
  },
  {
    id: 'QT-2026-883',
    studentName: 'Camila Rojas',
    studentEmail: 'camila.rojas@hotmail.com',
    nationality: 'Chile',
    provider: 'Australian Pacific College',
    cricosCode: '105881E',
    course: 'Cert IV in Marketing & Communication',
    campus: 'Brisbane',
    weeks: 40,
    standardTuition: 7600,
    promoDiscount: 1200,
    materialFee: 150,
    enrolmentFee: 200,
    status: 'Offer Issued',
    createdAt: '01 Nov 2026',
    intakeDate: '14 Jul 2026',
  },
  {
    id: 'QT-2026-884',
    studentName: 'Arjun Mehta',
    studentEmail: 'arjun.mehta@outlook.com',
    nationality: 'India',
    provider: 'ILSC Greystone College',
    cricosCode: '108721M',
    course: 'Advanced Diploma of IT (Cloud Systems)',
    campus: 'Sydney George St',
    weeks: 52,
    standardTuition: 10400,
    promoDiscount: 1200,
    materialFee: 0,
    enrolmentFee: 250,
    status: 'Sent to Student',
    createdAt: '30 Oct 2026',
    intakeDate: '07 Sep 2026',
  },
];

const FX_RATES: Record<string, { symbol: string; mult: number }> = {
  AUD: { symbol: 'A$', mult: 1 },
  USD: { symbol: 'US$', mult: 0.66 },
  EUR: { symbol: '€', mult: 0.61 },
  BRL: { symbol: 'R$', mult: 3.78 },
  JPY: { symbol: '¥', mult: 101.4 },
};

export default function QuotesPage() {
  const { toast } = useToast();
  const [quotes, setQuotes] = useState<QuoteItem[]>(INITIAL_QUOTES);
  const [selectedQuote, setSelectedQuote] = useState<QuoteItem | null>(INITIAL_QUOTES[0]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [currency, setCurrency] = useState<'AUD' | 'USD' | 'EUR' | 'BRL' | 'JPY'>('AUD');
  const [paymentPlan, setPaymentPlan] = useState<'upfront' | 'instalment'>('instalment');
  const [showNewModal, setShowNewModal] = useState(false);
  const [showOfferPreview, setShowOfferPreview] = useState(false);

  // New Quote Form
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [nationality, setNationality] = useState('Brazil');
  const [provider, setProvider] = useState('Australian Pacific College');
  const [course, setCourse] = useState('Diploma of Leadership & Management');
  const [campus, setCampus] = useState('Sydney CBD');
  const [weeks, setWeeks] = useState('52');
  const [standardTuition, setStandardTuition] = useState('8000');
  const [promoDiscount, setPromoDiscount] = useState('1200');

  const formatMoney = (audAmount: number) => {
    const fx = FX_RATES[currency];
    const converted = Math.round(audAmount * fx.mult);
    return `${fx.symbol}${converted.toLocaleString()} ${currency}`;
  };

  const handleCreateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;

    const created: QuoteItem = {
      id: `QT-2026-${Math.floor(890 + Math.random() * 99)}`,
      studentName,
      studentEmail: studentEmail || 'student@globaledu.com',
      nationality,
      provider,
      cricosCode: '104112A',
      course,
      campus,
      weeks: Number(weeks) || 52,
      standardTuition: Number(standardTuition) || 8000,
      promoDiscount: Number(promoDiscount) || 1200,
      materialFee: 0,
      enrolmentFee: 200,
      status: 'Sent to Student',
      createdAt: 'Just now',
      intakeDate: '14 Jul 2026',
    };

    setQuotes([created, ...quotes]);
    setSelectedQuote(created);
    setStudentName('');
    setStudentEmail('');
    setShowNewModal(false);
    toast(`Promotional quote ${created.id} generated and emailed to ${created.studentName}`, 'success');
  };

  const handleDuplicateQuote = (q: QuoteItem) => {
    const copy: QuoteItem = {
      ...q,
      id: `QT-2026-${Math.floor(900 + Math.random() * 99)}`,
      studentName: `${q.studentName} (Copy)`,
      status: 'Sent to Student',
      createdAt: 'Just now',
    };
    setQuotes([copy, ...quotes]);
    setSelectedQuote(copy);
    toast(`Duplicated quote as ${copy.id}`, 'info');
  };

  const handleConvertOffer = (id: string) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: 'Accepted & Paid' } : q))
    );
    if (selectedQuote?.id === id) {
      setSelectedQuote({ ...selectedQuote, status: 'Accepted & Paid' });
    }
    toast('Quote converted to Official Letter of Offer & sent to Admissions', 'success');
  };

  const filteredQuotes = quotes.filter((q) => {
    const matchesStatus = statusFilter === 'All' || q.status === statusFilter;
    const matchesSearch =
      q.studentName.toLowerCase().includes(search.toLowerCase()) ||
      q.course.toLowerCase().includes(search.toLowerCase()) ||
      q.id.toLowerCase().includes(search.toLowerCase()) ||
      q.provider.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalQuotedValue = quotes.reduce(
    (sum, q) => sum + (q.standardTuition - q.promoDiscount + q.materialFee + q.enrolmentFee),
    0
  );
  const totalScholarshipsGranted = quotes.reduce((sum, q) => sum + q.promoDiscount, 0);

  return (
    <AppLayout>
      <div className="space-y-7 pb-12">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="success">Auto-Scholarship Pricing Engine</Badge>
              <span className="text-xs text-slate-400">Multi-Currency &amp; Instalment Calculator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Student Tuition Quotes &amp; Letters of Offer
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Calculate itemized Australian CRICOS fees, compare FX rates, schedule tuition instalments, and issue formal Letters of Offer.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Multi-Currency Switcher */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {(['AUD', 'USD', 'EUR', 'BRL', 'JPY'] as const).map((cur) => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currency === cur
                      ? 'bg-white text-blue-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>

            <Button size="sm" onClick={() => setShowNewModal(true)} className="gap-1.5 text-xs">
              <Plus className="w-3.5 h-3.5" />
              Build Student Quote
            </Button>
          </div>
        </div>

        {/* 4 Financial & Conversion KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4.5 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Total Quotation Volume</span>
              <DollarSign className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900">{formatMoney(totalQuotedValue)}</p>
            <span className="text-[11px] text-blue-600 font-medium">{quotes.length} Generated Quotes</span>
          </Card>

          <Card className="p-4.5 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Scholarships Granted</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-extrabold text-emerald-700">{formatMoney(totalScholarshipsGranted)}</p>
            <span className="text-[11px] text-emerald-600 font-medium">Avg {formatMoney(1300)} per student</span>
          </Card>

          <Card className="p-4.5 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Accepted &amp; Paid CoEs</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900">
              {quotes.filter((q) => q.status === 'Accepted & Paid').length} Enrolled
            </p>
            <span className="text-[11px] text-purple-700 font-medium">100% PRISMS CoE Lodged</span>
          </Card>

          <Card className="p-4.5 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Offer Turnaround SLA</span>
              <FileCheck className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900">24 Hours</p>
            <span className="text-[11px] text-slate-500 font-medium">Express Provider Queue</span>
          </Card>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-1.5 w-full sm:w-auto flex-wrap">
            {['All', 'Accepted & Paid', 'Sent to Student', 'Offer Issued'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === st
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search candidate, course or quote ref..."
              className="w-full h-8 bg-slate-50 hover:bg-white border border-slate-200 rounded-lg pl-8 pr-3 text-xs text-slate-900 focus:outline-none focus:border-blue-600 transition-all"
            />
          </div>
        </div>

        {/* Main 2-Column Section: Quotes Ledger + Itemized Financial Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Quotes Table */}
          <Card className="lg:col-span-2 p-0 overflow-hidden border border-slate-200 shadow-2xs">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white">
              <h2 className="text-sm font-bold text-slate-900">Candidate Quotations Ledger</h2>
              <span className="text-xs text-slate-500">{filteredQuotes.length} quotes</span>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredQuotes.map((q) => {
                const netTotal =
                  q.standardTuition - q.promoDiscount + q.materialFee + q.enrolmentFee;
                const isSelected = selectedQuote?.id === q.id;
                return (
                  <div
                    key={q.id}
                    onClick={() => setSelectedQuote(q)}
                    className={`p-4 sm:p-5 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isSelected ? 'bg-blue-50/70 border-l-4 border-l-blue-600' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {q.id}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">{q.studentName}</h3>
                        <span className="text-[11px] font-semibold text-slate-500">({q.nationality})</span>
                        <Badge
                          variant={
                            q.status === 'Accepted & Paid'
                              ? 'success'
                              : q.status === 'Offer Issued'
                              ? 'purple'
                              : 'info'
                          }
                          className="text-[10px]"
                        >
                          {q.status}
                        </Badge>
                      </div>
                      <p className="text-xs font-semibold text-slate-700">
                        {q.course} •{' '}
                        <span className="text-slate-500 font-normal">
                          {q.campus} ({q.weeks} wks)
                        </span>
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {q.provider} • CRICOS {q.cricosCode} • Intake: {q.intakeDate}
                      </p>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <p className="text-base font-extrabold text-slate-900">{formatMoney(netTotal)}</p>
                      <p className="text-xs text-emerald-600 font-bold">
                        -{formatMoney(q.promoDiscount)} scholarship
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Right Column: Interactive Itemized Financial Inspector */}
          {selectedQuote && (
            <Card className="p-5 sm:p-6 flex flex-col justify-between space-y-5 border border-slate-200 shadow-2xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-600">
                      {selectedQuote.id}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {selectedQuote.studentName}
                    </h3>
                    <p className="text-[11px] text-slate-500">{selectedQuote.studentEmail} • {selectedQuote.nationality}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDuplicateQuote(selectedQuote)}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                    title="Clone Quote"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Clone
                  </button>
                </div>

                {/* Payment Plan Switcher */}
                <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setPaymentPlan('instalment')}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      paymentPlan === 'instalment'
                        ? 'bg-white text-blue-700 shadow-2xs'
                        : 'text-slate-600'
                    }`}
                  >
                    Term Instalments (3x)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentPlan('upfront')}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      paymentPlan === 'upfront'
                        ? 'bg-white text-emerald-700 shadow-2xs'
                        : 'text-slate-600'
                    }`}
                  >
                    Upfront (-5% Waiver)
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <p className="text-xs font-bold text-slate-900">{selectedQuote.course}</p>
                  <p className="text-[11px] text-slate-500">
                    {selectedQuote.provider} — {selectedQuote.campus} ({selectedQuote.weeks} Weeks)
                  </p>
                </div>

                {(() => {
                  const baseNet =
                    selectedQuote.standardTuition -
                    selectedQuote.promoDiscount +
                    selectedQuote.materialFee +
                    selectedQuote.enrolmentFee;
                  const upfrontBonus = paymentPlan === 'upfront' ? Math.round(baseNet * 0.05) : 0;
                  const finalPayable = baseNet - upfrontBonus;
                  const coeDeposit =
                    paymentPlan === 'instalment' ? Math.round(finalPayable * 0.35) : finalPayable;

                  return (
                    <div className="space-y-2 text-xs pt-1">
                      <div className="flex justify-between text-slate-600">
                        <span>Standard CRICOS Tuition:</span>
                        <span className="font-semibold text-slate-900">
                          {formatMoney(selectedQuote.standardTuition)}
                        </span>
                      </div>
                      <div className="flex justify-between text-emerald-700 font-semibold">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          Scholarship Grant:
                        </span>
                        <span>-{formatMoney(selectedQuote.promoDiscount)}</span>
                      </div>
                      {upfrontBonus > 0 && (
                        <div className="flex justify-between text-emerald-700 font-semibold">
                          <span>Upfront Settlement (5%):</span>
                          <span>-{formatMoney(upfrontBonus)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-slate-600">
                        <span>Enrolment &amp; Material:</span>
                        <span>
                          {formatMoney(selectedQuote.enrolmentFee + selectedQuote.materialFee)}
                        </span>
                      </div>

                      <div className="pt-2.5 border-t border-slate-200 flex items-baseline justify-between">
                        <span className="text-sm font-bold text-slate-900">Net Payable Package:</span>
                        <span className="text-lg font-extrabold text-blue-600">
                          {formatMoney(finalPayable)}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 flex items-center justify-between">
                        <span className="font-semibold text-blue-950 text-xs">
                          Deposit for PRISMS CoE:
                        </span>
                        <span className="font-extrabold text-blue-700 text-sm">{formatMoney(coeDeposit)}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <Button
                  className="w-full text-xs font-bold"
                  onClick={() => setShowOfferPreview(true)}
                >
                  <Eye className="w-3.5 h-3.5" />
                  Preview Formal Letter of Offer
                </Button>

                {selectedQuote.status !== 'Accepted & Paid' && (
                  <Button
                    variant="secondary"
                    className="w-full text-xs font-semibold"
                    onClick={() => handleConvertOffer(selectedQuote.id)}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Accept Offer &amp; Generate PRISMS CoE
                  </Button>
                )}

                <Button
                  variant="secondary"
                  className="w-full text-xs font-semibold"
                  onClick={() =>
                    toast(
                      `Dispatched Flywire payment checkout link to ${selectedQuote.studentEmail}`,
                      'success'
                    )
                  }
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  Send Flywire / Stripe Payment Link
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Modal: Build New Quote */}
        {showNewModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="w-full max-w-lg p-6 space-y-4 bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Generate Student Tuition Quote</h3>
                <button
                  onClick={() => setShowNewModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateQuote} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Student Full Name</label>
                  <Input
                    placeholder="e.g. Lucas Ferrari"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Student Email</label>
                    <Input
                      type="email"
                      placeholder="lucas@gmail.com"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Nationality</label>
                    <select
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className="w-full h-9 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
                    >
                      <option value="Brazil">Brazil</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Japan">Japan</option>
                      <option value="India">India</option>
                      <option value="Spain">Spain</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Education Provider</label>
                    <select
                      value={provider}
                      onChange={(e) => setProvider(e.target.value)}
                      className="w-full h-9 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
                    >
                      <option value="Australian Pacific College">Australian Pacific College</option>
                      <option value="Greenwich English College">Greenwich English College</option>
                      <option value="ILSC Greystone College">ILSC Greystone College</option>
                      <option value="Lexis Training">Lexis Training</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Campus</label>
                    <Input
                      value={campus}
                      onChange={(e) => setCampus(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">CRICOS Course</label>
                  <Input
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Duration (Wks)</label>
                    <Input
                      type="number"
                      value={weeks}
                      onChange={(e) => setWeeks(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Standard Tuition</label>
                    <Input
                      type="number"
                      value={standardTuition}
                      onChange={(e) => setStandardTuition(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Scholarship Grant</label>
                    <Input
                      type="number"
                      value={promoDiscount}
                      onChange={(e) => setPromoDiscount(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <Button type="button" variant="secondary" onClick={() => setShowNewModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Generate Quote &amp; Email</Button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {/* Modal: Official Formal Letter of Offer Preview */}
        {showOfferPreview && selectedQuote && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col justify-between">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Formal Letter of Offer &amp; Acceptance Agreement
                  </h3>
                </div>
                <button
                  onClick={() => setShowOfferPreview(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 font-sans leading-relaxed">
                {/* School Header */}
                <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">{selectedQuote.provider}</h2>
                    <p className="text-[11px] text-slate-500">CRICOS Provider Code: {selectedQuote.cricosCode} • Registered RTO #45123</p>
                    <p className="text-[11px] text-slate-500">Campus: {selectedQuote.campus}, Australia</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-blue-700 block text-xs">{selectedQuote.id}</span>
                    <span className="text-[10px] text-slate-400">Date: {selectedQuote.createdAt}</span>
                  </div>
                </div>

                {/* Candidate Particulars */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block text-xs">Student Information:</span>
                  <p>Name: <strong>{selectedQuote.studentName}</strong> | Nationality: <strong>{selectedQuote.nationality}</strong></p>
                  <p>Email: <strong>{selectedQuote.studentEmail}</strong> | Visa Stream: <strong>Student Subclass 500</strong></p>
                </div>

                {/* Offer Details */}
                <div className="space-y-2">
                  <span className="font-bold text-slate-900 block text-xs">Course Offer Particulars:</span>
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-lg border border-slate-200 bg-white">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Course Title</span>
                      <strong className="text-slate-900">{selectedQuote.course}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Intake Commencement</span>
                      <strong className="text-blue-700">{selectedQuote.intakeDate}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Course Duration</span>
                      <strong className="text-slate-900">{selectedQuote.weeks} Academic Weeks</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Tuition Settlement</span>
                      <strong className="text-emerald-700">{formatMoney(selectedQuote.standardTuition - selectedQuote.promoDiscount)} Net</strong>
                    </div>
                  </div>
                </div>

                {/* ESOS Statutory Assurance */}
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 text-[11px] space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Australian Education Services for Overseas Students (ESOS) Act 2000</span>
                  </div>
                  <p className="text-emerald-900">
                    This document constitutes a binding Written Agreement upon receipt of the PRISMS CoE initial deposit. Tuition Protection Service (TPS) coverage applies.
                  </p>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => toast(`Printed Letter of Offer for ${selectedQuote.studentName}`, 'success')}
                  className="text-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / Save PDF
                </Button>
                <Button size="sm" onClick={() => setShowOfferPreview(false)}>
                  Close Preview
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
