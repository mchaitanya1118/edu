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
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

type QuoteItem = {
  id: string;
  studentName: string;
  studentEmail: string;
  provider: string;
  course: string;
  campus: string;
  weeks: number;
  standardTuition: number;
  promoDiscount: number;
  materialFee: number;
  enrolmentFee: number;
  status: 'Sent to Student' | 'Accepted & Paid' | 'Draft' | 'Offer Issued';
  createdAt: string;
};

const INITIAL_QUOTES: QuoteItem[] = [
  {
    id: 'QT-2026-881',
    studentName: 'Mateo Silva',
    studentEmail: 'mateo.silva@gmail.com',
    provider: 'Australian Pacific College',
    course: 'Diploma of Leadership & Management',
    campus: 'Sydney CBD',
    weeks: 52,
    standardTuition: 8000,
    promoDiscount: 1200,
    materialFee: 0,
    enrolmentFee: 200,
    status: 'Accepted & Paid',
    createdAt: '02 Nov 2026',
  },
  {
    id: 'QT-2026-882',
    studentName: 'Yuki Tanaka',
    studentEmail: 'yuki.tanaka@yahoo.co.jp',
    provider: 'Greenwich English College',
    course: 'General English (ELICOS)',
    campus: 'Melbourne',
    weeks: 20,
    standardTuition: 7000,
    promoDiscount: 1400,
    materialFee: 200,
    enrolmentFee: 250,
    status: 'Sent to Student',
    createdAt: '03 Nov 2026',
  },
  {
    id: 'QT-2026-883',
    studentName: 'Camila Rojas',
    studentEmail: 'camila.rojas@hotmail.com',
    provider: 'Australian Pacific College',
    course: 'Cert IV in Marketing & Communication',
    campus: 'Brisbane',
    weeks: 40,
    standardTuition: 7600,
    promoDiscount: 1200,
    materialFee: 150,
    enrolmentFee: 200,
    status: 'Offer Issued',
    createdAt: '01 Nov 2026',
  },
];

const FX_RATES: Record<string, { symbol: string; mult: number }> = {
  AUD: { symbol: 'A$', mult: 1 },
  USD: { symbol: 'US$', mult: 0.66 },
  BRL: { symbol: 'R$', mult: 3.78 },
  JPY: { symbol: '¥', mult: 101.4 },
};

export default function QuotesPage() {
  const { toast } = useToast();
  const [quotes, setQuotes] = useState<QuoteItem[]>(INITIAL_QUOTES);
  const [selectedQuote, setSelectedQuote] = useState<QuoteItem | null>(INITIAL_QUOTES[0]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [currency, setCurrency] = useState<'AUD' | 'USD' | 'BRL' | 'JPY'>('AUD');
  const [paymentPlan, setPaymentPlan] = useState<'upfront' | 'instalment'>('instalment');
  const [showNewModal, setShowNewModal] = useState(false);

  // New Quote Form
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [course, setCourse] = useState('Diploma of Leadership & Management');
  const [campus, setCampus] = useState('Sydney CBD');
  const [weeks, setWeeks] = useState('52');

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
      provider: 'Australian Pacific College',
      course,
      campus,
      weeks: Number(weeks) || 52,
      standardTuition: 8000,
      promoDiscount: 1200,
      materialFee: 0,
      enrolmentFee: 200,
      status: 'Sent to Student',
      createdAt: 'Just now',
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

  const filteredQuotes =
    statusFilter === 'All' ? quotes : quotes.filter((q) => q.status === statusFilter);

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header with Currency & Payment Options */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="success">Auto-Scholarship Pricing Engine</Badge>
              <span className="text-xs text-slate-400">Multi-Currency &amp; Instalment Ready</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Student Tuition Quotes &amp; Letters of Offer
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Calculate itemized tuition, preview international FX rates, configure instalment schedules, and issue formal Letters of Offer.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Currency Switcher */}
            <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-xl">
              {(['AUD', 'USD', 'BRL', 'JPY'] as const).map((cur) => (
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

            <Button onClick={() => setShowNewModal(true)}>
              <Plus className="w-4 h-4" />
              Create Student Quote
            </Button>
          </div>
        </div>

        {/* Status Filter Bar */}
        <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-xl w-fit flex-wrap">
          {['All', 'Accepted & Paid', 'Sent to Student', 'Offer Issued'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Main Split View: Quotes Table + Live Quote Breakdown Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-0 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Quotes &amp; Offers Ledger</h2>
              <span className="text-xs text-slate-500">{filteredQuotes.length} quotes shown</span>
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
                    className={`p-5 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isSelected ? 'bg-blue-50/60' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {q.id}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">{q.studentName}</h3>
                        <Badge
                          variant={
                            q.status === 'Accepted & Paid'
                              ? 'success'
                              : q.status === 'Offer Issued'
                              ? 'purple'
                              : 'info'
                          }
                        >
                          {q.status}
                        </Badge>
                      </div>
                      <p className="text-xs font-medium text-slate-700">
                        {q.course} •{' '}
                        <span className="text-slate-500">
                          {q.campus} ({q.weeks} wks)
                        </span>
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {q.provider} • Created {q.createdAt}
                      </p>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <p className="text-base font-bold text-slate-900">{formatMoney(netTotal)}</p>
                      <p className="text-xs text-emerald-600 font-semibold">
                        Saved {formatMoney(q.promoDiscount)} promo
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Right Column: Itemized Financial Breakdown + Payment Plan Toggle */}
          {selectedQuote && (
            <Card className="p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-600">
                      {selectedQuote.id}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      {selectedQuote.studentName}
                    </h3>
                    <p className="text-xs text-slate-500">{selectedQuote.studentEmail}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDuplicateQuote(selectedQuote)}
                    className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                    title="Clone Quote"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Clone
                  </button>
                </div>

                {/* Payment Schedule Option Switcher */}
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
                    3-Term Instalments
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
                    Upfront (-5% Bonus)
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <p className="text-xs font-bold text-slate-900">{selectedQuote.course}</p>
                  <p className="text-xs text-slate-500">
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
                    <div className="space-y-2.5 text-xs pt-1">
                      <div className="flex justify-between text-slate-600">
                        <span>Standard CRICOS Tuition</span>
                        <span className="font-semibold text-slate-900">
                          {formatMoney(selectedQuote.standardTuition)}
                        </span>
                      </div>
                      <div className="flex justify-between text-emerald-700 font-semibold">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          Provider Scholarship
                        </span>
                        <span>-{formatMoney(selectedQuote.promoDiscount)}</span>
                      </div>
                      {upfrontBonus > 0 && (
                        <div className="flex justify-between text-emerald-700 font-semibold">
                          <span>Upfront Settlement Bonus (5%)</span>
                          <span>-{formatMoney(upfrontBonus)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-slate-600">
                        <span>Enrolment &amp; Material Fees</span>
                        <span>
                          {formatMoney(selectedQuote.enrolmentFee + selectedQuote.materialFee)}
                        </span>
                      </div>

                      <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between">
                        <span className="text-sm font-bold text-slate-900">Net Total Package</span>
                        <span className="text-xl font-bold text-blue-600">
                          {formatMoney(finalPayable)}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/70 flex items-center justify-between">
                        <span className="font-semibold text-blue-900">
                          Initial Deposit for PRISMS CoE:
                        </span>
                        <span className="font-bold text-blue-700">{formatMoney(coeDeposit)}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                {selectedQuote.status !== 'Accepted & Paid' && (
                  <Button
                    className="w-full"
                    onClick={() => handleConvertOffer(selectedQuote.id)}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Approve &amp; Issue Letter of Offer
                  </Button>
                )}
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() =>
                    toast(
                      `Dispatched Flywire & Stripe Escrow link to ${selectedQuote.studentEmail}`,
                      'success'
                    )
                  }
                >
                  <CreditCard className="w-4 h-4" />
                  Send Flywire / Stripe Payment Link
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() =>
                    toast(`Downloaded PDF Quote for ${selectedQuote.studentName}`, 'info')
                  }
                >
                  <Download className="w-4 h-4" />
                  Download Branded PDF Quote
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Modal: New Quote */}
        {showNewModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Build Promotional Student Quote</h3>
                <button
                  onClick={() => setShowNewModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateQuote} className="space-y-4">
                <Input
                  label="Student Full Name"
                  placeholder="e.g. Lucas Fernandez"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
                <Input
                  label="Student Email"
                  type="email"
                  placeholder="lucas@email.com"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  required
                />
                <Input
                  label="CRICOS Course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Campus"
                    value={campus}
                    onChange={(e) => setCampus(e.target.value)}
                  />
                  <Input
                    label="Duration (Weeks)"
                    type="number"
                    value={weeks}
                    onChange={(e) => setWeeks(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="secondary" onClick={() => setShowNewModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Generate Quote</Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
