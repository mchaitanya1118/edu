import React, { useState } from 'react';
import {
  X,
  DollarSign,
  Percent,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  Clock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useToast } from '../ui/Toast';

export type CourseCommissionConfig = {
  courseId: string;
  courseName: string;
  cricosCode: string;
  provider: string;
  tuitionFee: number;
  commissionRate: number; // default base percentage, e.g. 22
  tier1Rate?: number; // preferred tier percentage, e.g. 25
  platinumRate?: number; // high-volume percentage, e.g. 28
  basis: 'Net Tuition' | 'Gross Standard Tuition' | 'Fixed AUD per Student';
  schedule: '50% CoE / 50% Census' | '100% on Census Date' | 'Trimester Pro-Rata';
  intakeBonusPercent: number; // e.g. 3
  agreementRef: string;
  notes?: string;
};

interface CourseCommissionEditorModalProps {
  config: CourseCommissionConfig | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: CourseCommissionConfig) => void;
}

export function CourseCommissionEditorModal({
  config,
  isOpen,
  onClose,
  onSave,
}: CourseCommissionEditorModalProps) {
  const { toast } = useToast();

  if (!isOpen || !config) return null;

  const [rate, setRate] = useState<number>(config.commissionRate);
  const [tier1Rate, setTier1Rate] = useState<number>(config.tier1Rate || rate + 3);
  const [platinumRate, setPlatinumRate] = useState<number>(config.platinumRate || rate + 6);
  const [basis, setBasis] = useState<CourseCommissionConfig['basis']>(config.basis || 'Net Tuition');
  const [schedule, setSchedule] = useState<CourseCommissionConfig['schedule']>(
    config.schedule || '50% CoE / 50% Census'
  );
  const [intakeBonus, setIntakeBonus] = useState<number>(config.intakeBonusPercent || 0);
  const [agreementRef, setAgreementRef] = useState<string>(config.agreementRef || `SCH-${config.cricosCode}-2026`);
  const [notes, setNotes] = useState<string>(
    config.notes || 'Commission paid in AUD. Subject to ESOS Act Standard 4 and census date attendance.'
  );

  // Calculations
  const calculatedBaseComm = Math.round((config.tuitionFee * rate) / 100);
  const calculatedTier1Comm = Math.round((config.tuitionFee * tier1Rate) / 100);
  const calculatedPlatComm = Math.round((config.tuitionFee * platinumRate) / 100);
  const milestone1 = Math.round(calculatedBaseComm / 2);
  const milestone2 = calculatedBaseComm - milestone1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: CourseCommissionConfig = {
      ...config,
      commissionRate: rate,
      tier1Rate,
      platinumRate,
      basis,
      schedule,
      intakeBonusPercent: intakeBonus,
      agreementRef,
      notes,
    };
    onSave(updated);
    toast(
      `Updated commission structure for ${config.courseName} to ${rate}% (Preferred: ${tier1Rate}%). Synced to all agent quote builders.`,
      'success'
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <Card className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <Badge variant="purple" className="text-[10px]">
                ESOS Standard 4 Commission Setting
              </Badge>
              <span className="text-xs font-mono text-slate-400">CRICOS {config.cricosCode}</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Edit Course Commission Schedule
            </h2>
            <p className="text-xs text-slate-400">
              {config.courseName} • {config.provider}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
          {/* Course Summary Banner */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Tuition Fee Basis</span>
              <span className="text-base font-bold text-slate-900 font-mono">
                A${config.tuitionFee.toLocaleString()} AUD
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Base Commission</span>
              <span className="text-base font-bold text-emerald-700 font-mono">{rate}%</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Agreement Code</span>
              <span className="font-mono text-slate-700">{agreementRef}</span>
            </div>
          </div>

          {/* Rate Sliders and Inputs */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Percent className="w-3.5 h-3.5 text-blue-600" />
              Agency Commission Tiers for this Course
            </h3>

            {/* Default Base Commission */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-bold text-slate-900 text-sm block">Standard Agency Commission Rate</label>
                  <p className="text-[11px] text-slate-500">Base percentage applied to all accredited education agencies</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-bold font-mono text-blue-700">{rate}%</span>
                </div>
              </div>
              <input
                type="range"
                min="10"
                max="35"
                step="1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>10% (Introductory)</span>
                <span>20% (Standard VET)</span>
                <span>25% (ELICOS Benchmark)</span>
                <span>35% (High Incentive)</span>
              </div>
            </div>

            {/* Tier 1 & Platinum Rates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800">Preferred Tier-1 Agency Rate</label>
                  <span className="font-bold font-mono text-emerald-700 text-sm">{tier1Rate}%</span>
                </div>
                <p className="text-[10px] text-slate-500">For agencies delivering &gt;5 enrolments annually</p>
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="number"
                    min={rate}
                    max="40"
                    value={tier1Rate}
                    onChange={(e) => setTier1Rate(Number(e.target.value))}
                    className="w-20 h-8 px-2 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                  <span className="text-[11px] text-slate-500 font-mono">+A${calculatedTier1Comm.toLocaleString()} per student</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800">Platinum Volume Partner Rate</label>
                  <span className="font-bold font-mono text-purple-700 text-sm">{platinumRate}%</span>
                </div>
                <p className="text-[10px] text-slate-500">For strategic high-volume global partner chains</p>
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="number"
                    min={tier1Rate}
                    max="45"
                    value={platinumRate}
                    onChange={(e) => setPlatinumRate(Number(e.target.value))}
                    className="w-20 h-8 px-2 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                  <span className="text-[11px] text-slate-500 font-mono">+A${calculatedPlatComm.toLocaleString()} per student</span>
                </div>
              </div>
            </div>
          </div>

          {/* Basis and Disbursement Milestone Schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Commission Calculation Basis</label>
              <select
                value={basis}
                onChange={(e) => setBasis(e.target.value as any)}
                className="w-full h-9 bg-slate-50 border border-slate-200 rounded-xl px-3 text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-600"
              >
                <option value="Net Tuition">Net Tuition (After Bursaries / Scholarships)</option>
                <option value="Gross Standard Tuition">Gross Standard Tuition (Pre-Scholarship)</option>
                <option value="Fixed AUD per Student">Fixed AUD Amount per Student Head</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Milestone Payout Release</label>
              <select
                value={schedule}
                onChange={(e) => setSchedule(e.target.value as any)}
                className="w-full h-9 bg-slate-50 border border-slate-200 rounded-xl px-3 text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-600"
              >
                <option value="50% CoE / 50% Census">50% on Initial CoE Clearance / 50% on Census Date</option>
                <option value="100% on Census Date">100% Post-Census Date Settlement</option>
                <option value="Trimester Pro-Rata">Trimester Pro-Rata (33% / 33% / 34%)</option>
              </select>
            </div>
          </div>

          {/* Promotional Intake Boost */}
          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="font-bold text-amber-950">Promotional Intake Bonus (+%)</span>
              </div>
              <span className="font-mono font-bold text-amber-800">+{intakeBonus}%</span>
            </div>
            <p className="text-[11px] text-amber-900/80 leading-relaxed">
              Temporarily boost agent commission for upcoming intakes (e.g. July or October 2026) to drive recruitment volume.
            </p>
            <div className="flex items-center gap-2">
              {[0, 2, 3, 5].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setIntakeBonus(b)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    intakeBonus === b
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-100/50'
                  }`}
                >
                  {b === 0 ? 'No Bonus' : `+${b}% Bonus`}
                </button>
              ))}
            </div>
          </div>

          {/* Live Calculation Preview Box */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 border border-emerald-300 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Live Agent Earnings Preview per Student
              </span>
              <Badge variant="success">{rate}% Base Tier</Badge>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2.5 rounded-lg bg-white/80 border border-emerald-200">
                <span className="text-[10px] text-slate-500 block">Standard Agency ({rate}%)</span>
                <span className="font-mono font-bold text-sm text-emerald-700">
                  A${calculatedBaseComm.toLocaleString()} AUD
                </span>
                <span className="text-[9px] text-slate-400 block mt-0.5">
                  Deposit: A${milestone1} • Census: A${milestone2}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-white/80 border border-emerald-200">
                <span className="text-[10px] text-slate-500 block">Tier-1 Partner ({tier1Rate}%)</span>
                <span className="font-mono font-bold text-sm text-blue-700">
                  A${calculatedTier1Comm.toLocaleString()} AUD
                </span>
                <span className="text-[9px] text-slate-400 block mt-0.5">
                  +A${(calculatedTier1Comm - calculatedBaseComm).toLocaleString()} Tier Boost
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-white/80 border border-emerald-200">
                <span className="text-[10px] text-slate-500 block">Platinum Volume ({platinumRate}%)</span>
                <span className="font-mono font-bold text-sm text-purple-700">
                  A${calculatedPlatComm.toLocaleString()} AUD
                </span>
                <span className="text-[9px] text-slate-400 block mt-0.5">
                  +A${(calculatedPlatComm - calculatedBaseComm).toLocaleString()} Volume Boost
                </span>
              </div>
            </div>
          </div>

          {/* Agreement Reference & Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Contract / Agreement Ref</label>
              <input
                type="text"
                value={agreementRef}
                onChange={(e) => setAgreementRef(e.target.value)}
                className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Compliance Notes</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Save &amp; Publish Commission to Agencies
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
