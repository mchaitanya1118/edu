import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { X, FileText, Download, Clock, Calendar, DollarSign, ShieldCheck, Users, ChevronRight, CheckCircle2 } from 'lucide-react';

interface StudentOption {
  id: string;
  name: string;
  country: string;
  flag: string;
}

const mockStudents: StudentOption[] = [
  { id: 's16', name: 'Mei Lin Chen', country: 'Taiwan', flag: '🇹🇼' },
  { id: 's4', name: 'Fatima Al-Rashid', country: 'Saudi Arabia', flag: '🇸🇦' },
  { id: 's3', name: 'Thiago Oliveira', country: 'Brazil', flag: '🇧🇷' },
  { id: 's5', name: 'Aiko Tanaka', country: 'Japan', flag: '🇯🇵' },
];

type TimetablePref = 'morning' | 'afternoon' | 'evening';

export default function QuoteBuilder() {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState<StudentOption>(mockStudents[0]);
  const [enrolWeeks, setEnrolWeeks] = useState<number>(20);
  const [startDate, setStartDate] = useState<string>('2027-01-15');
  const [timetablePref, setTimetablePref] = useState<TimetablePref>('morning');
  const [includeOSHC, setIncludeOSHC] = useState<boolean>(true);
  const [oshsType, setOshsType] = useState<'single' | 'family'>('single');

  // Financial calculations
  const tuitionPerWeek = 380;
  const materialFeePerWeek = 6;
  const enrolmentFee = 250;
  const oshsWeeklySingle = 3.50;
  const oshsWeeklyFamily = 7.00;
  const depositRate = 0.28; // 28% of total package

  const promoThreshold = 20;
  const freeWeeks = enrolWeeks >= promoThreshold ? enrolWeeks - promoThreshold : 0;
  const billableWeeks = Math.max(freeWeeks === 0 ? enrolWeeks : promoThreshold, enrolWeeks - freeWeeks);
  const hasPromo = freeWeeks > 0;

  const tuitionCost = billableWeeks * tuitionPerWeek;
  const materialCost = enrolWeeks * materialFeePerWeek;
  const oshsCost = includeOSHC ? (oshsType === 'single' ? oshsWeeklySingle : oshsWeeklyFamily) * enrolWeeks : 0;
  const totalPackageValue = tuitionCost + enrolmentFee + materialCost + oshsCost;
  const initialDeposit = totalPackageValue * depositRate;
  const balanceDue = totalPackageValue - initialDeposit;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) navigate(-1); }}>
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        {/* Header Bar */}
        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
                <DollarSign className="w-4.5 h-4.5 text-blue-700" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">Generate Student Quote</h2>
                <p className="text-xs text-gray-500 mt-0.5">General English · Sydney International College · CRICOS 03456A</p>
              </div>
            </div>
            <NavLink to="/agent/course-details" className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
              <X className="w-5 h-5" />
            </NavLink>
          </div>
        </div>

        {/* Body — 2 Column Layout */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 p-6">
            {/* Left Column — Parameters (3 cols) */}
            <div className="lg:col-span-3 space-y-5">
              {/* Select Student */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Select Student</label>
                <select
                  value={selectedStudent.id}
                  onChange={(e) => {
                    const found = mockStudents.find(s => s.id === e.target.value);
                    if (found) setSelectedStudent(found);
                  }}
                  className="w-full h-10 px-3 py-2.5 text-sm border border-[#E2E8F0] rounded-lg bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 transition-all appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m7 15 5 5 5-5'/%3E%3Cpath d='m7 9 5-5 5 5'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', paddingRight: '36px' }}
                >
                  {mockStudents.map(s => (
                    <option key={s.id} value={s.id}>{s.flag} {s.name} ({s.country})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Enrolment Duration */}
                <div>
                  <label htmlFor="enrol-weeks" className="block text-sm font-semibold text-gray-700 mb-1.5">Enrolment Duration (Weeks)</label>
                  <Input
                    id="enrol-weeks"
                    type="number"
                    min={1}
                    max={104}
                    value={enrolWeeks}
                    onChange={(e) => setEnrolWeeks(Math.max(1, parseInt(e.target.value) || 1))}
                    className="rounded-lg border-[#E2E8F0] bg-white text-slate-900 text-sm"
                  />
                </div>

                {/* Target Start Date */}
                <div>
                  <label htmlFor="start-date" className="block text-sm font-semibold text-gray-700 mb-1.5">Target Start Date</label>
                  <Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="rounded-lg border-[#E2E8F0] bg-white text-slate-900 text-sm"
                  />
                </div>
              </div>

              {/* Timetable Preference — Radio Buttons */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Timetable Preference</label>
                <div className="flex gap-3">
                  {([
                    { key: 'morning' as TimetablePref, label: 'Morning', time: '08:15 – 12:35', emoji: '☀️' },
                    { key: 'afternoon' as TimetablePref, label: 'Afternoon', time: '01:00 – 05:20', emoji: '⛅' },
                    { key: 'evening' as TimetablePref, label: 'Evening', time: '05:05 – 09:35', emoji: '🌙' },
                  ]).map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => setTimetablePref(opt.key)}
                      className={`flex-1 flex flex-col items-center gap-1.5 px-3 py-3 rounded-lg border-2 transition-all text-center ${
                        timetablePref === opt.key
                          ? 'border-blue-500 bg-blue-50 shadow-sm shadow-blue-100'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <span className="text-base">{opt.emoji}</span>
                      <span className={`text-xs font-semibold ${timetablePref === opt.key ? 'text-blue-700' : 'text-gray-600'}`}>{opt.label}</span>
                      <span className="text-[10px] text-gray-400">{opt.time}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* OSHC Toggle */}
              <div className="bg-sky-50/60 border border-sky-100 rounded-xl px-4 py-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-sky-600" />
                    <span className="text-sm font-semibold text-gray-700">Overseas Student Health Cover (OSHC)</span>
                  </div>
                  <button
                    onClick={() => setIncludeOSHC(!includeOSHC)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${includeOSHC ? 'bg-blue-600' : 'bg-gray-300'}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${includeOSHC ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
                {includeOSHC && (
                  <div className="flex items-center gap-3 pl-6">
                    <span className="text-[11px] text-gray-500">Cover Type:</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setOshsType('single')}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                          oshsType === 'single'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-600 border-gray-200'
                        }`}
                      >
                        Single
                      </button>
                      <button
                        onClick={() => setOshsType('family')}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                          oshsType === 'family'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-600 border-gray-200'
                        }`}
                      >
                        Family
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column — Financial Calculation Summary (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              {/* Promotion Callout */}
              {hasPromo && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-start gap-2.5">
                  <span className="text-base leading-none">🎉</span>
                  <div>
                    <p className="text-xs font-semibold text-emerald-700">Promotion Applied!</p>
                    <p className="text-[11px] text-emerald-600 mt-0.5">“Enrol 20+ wks, get 4 wks free” — Student pays for {billableWeeks} weeks.</p>
                  </div>
                </div>
              )}

              {!hasPromo && enrolWeeks >= 12 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-amber-700">Enrol <strong>{promoThreshold - enrolWeeks} more weeks</strong> to unlock “Get weeks free” promotion.</p>
                </div>
              )}

              {/* Cost Summary Table */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-4 py-2.5 bg-gray-100/80 border-b border-gray-200 flex items-center gap-2">
                  <DollarSign className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Cost Breakdown</span>
                </div>
                <div className="px-4 py-3 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Tuition</span>
                    <span className="text-gray-400 text-[11px]">{billableWeeks} wks × ${tuitionPerWeek}/wk</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-medium text-gray-800">
                    <span>Tuition Subtotal</span>
                    <span>${tuitionCost.toLocaleString()}</span>
                  </div>
                  <div className="h-px bg-gray-200 my-1" />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Enrolment Fee</span>
                    <span>${enrolmentFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Material Fee</span>
                    <span className="text-gray-400 text-[11px]">{enrolWeeks} wks × ${materialFeePerWeek}/wk</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-medium text-gray-800">
                    <span>Material Subtotal</span>
                    <span>${materialCost.toLocaleString()}</span>
                  </div>
                  {includeOSHC && (
                    <>
                      <div className="h-px bg-gray-200 my-1" />
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> OSHC ({oshsType})
                        </span>
                        <span className="text-gray-400 text-[11px]">{enrolWeeks} wks</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-medium text-gray-800">
                        <span>OSHC Total</span>
                        <span>${Math.round(oshsCost).toLocaleString()}</span>
                      </div>
                    </>
                  )}
                  <div className="h-px bg-gray-300 my-2" />
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-base font-bold text-gray-900">Total Package Value</span>
                    <span className="text-base font-bold text-gray-900">${totalPackageValue.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Deposit & Schedule Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 bg-blue-100/80 border-b border-blue-200 flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Payment Schedule</span>
                </div>
                <div className="px-4 py-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm text-gray-700">Initial Deposit Due Now</span>
                    </div>
                    <span className="text-base font-bold text-blue-700">${Math.round(initialDeposit).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      <span className="text-sm text-gray-700">Balance Due On Intake</span>
                    </div>
                    <span className="text-base font-bold text-blue-700">${Math.round(balanceDue).toLocaleString()}</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-blue-200 flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-[11px] text-blue-600">Deposit covers ~{Math.round(depositRate * 100)}% of total package</span>
                  </div>
                </div>
              </div>

              {/* Selected student summary mini-card */}
              <div className="bg-gray-50 rounded-lg border border-gray-200 px-3 py-2.5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm">
                  {selectedStudent.flag}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{selectedStudent.name}</p>
                  <p className="text-[11px] text-gray-400">{selectedStudent.country} · Start {new Date(startDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200 bg-gray-50/80 flex items-center justify-between">
          {/* Left */}
          <div>
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-1.5 text-gray-600">
              Save Draft
            </Button>
          </div>
          {/* Right */}
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              title="Export PDF Quote"
            >
              <Download className="w-4 h-4" />
              Export PDF
            </button>
            <Button size="sm" className="gap-1.5 shadow-md shadow-blue-600/20">
              Save & Add to Student Pipeline
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
