import React, { useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  Sparkles,
  Plus,
  Calendar,
  MapPin,
  Percent,
  CheckCircle2,
  X,
  Trash2,
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

type PromoCampaign = {
  id: string;
  title: string;
  provider: string;
  discountType: string;
  eligibleRegions: string;
  campuses: string;
  validUntil: string;
  activeQuotesCount: number;
  status: 'Active' | 'Scheduled';
};

const INITIAL_PROMOS: PromoCampaign[] = [
  {
    id: 'PRM-201',
    title: 'Q3 ELICOS 20% Offshore & Onshore Scholarship',
    provider: 'Australian Pacific College',
    discountType: '20% Tuition Reduction ($280/wk)',
    eligibleRegions: 'LATAM, Europe, Japan & South Korea',
    campuses: 'Sydney CBD, Melbourne, Brisbane',
    validUntil: '31 Dec 2026',
    activeQuotesCount: 64,
    status: 'Active',
  },
  {
    id: 'PRM-202',
    title: 'VET Business & Leadership $1,200 Bursary',
    provider: 'Australian Pacific College',
    discountType: '$1,200 Fee Waiver + $0 Material Fee',
    eligibleRegions: 'All International Passports',
    campuses: 'All Campuses',
    validUntil: '30 Nov 2026',
    activeQuotesCount: 41,
    status: 'Active',
  },
  {
    id: 'PRM-203',
    title: 'Regional Campus Relocation Grant',
    provider: 'Greenwich College Australia',
    discountType: '15% Tuition Grant + Free Enrolment',
    eligibleRegions: 'Global Onshore Visa Extensions',
    campuses: 'Perth & Gold Coast',
    validUntil: '31 Jan 2027',
    activeQuotesCount: 19,
    status: 'Active',
  },
];

export default function ProviderPromoPage() {
  const { toast } = useToast();
  const [promos, setPromos] = useState<PromoCampaign[]>(INITIAL_PROMOS);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [discountType, setDiscountType] = useState('20% Tuition Scholarship');
  const [regions, setRegions] = useState('All International Markets');

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const created: PromoCampaign = {
      id: `PRM-${Math.floor(210 + Math.random() * 90)}`,
      title,
      provider: 'Australian Pacific College',
      discountType,
      eligibleRegions: regions,
      campuses: 'Sydney CBD, Melbourne, Brisbane',
      validUntil: '31 Dec 2026',
      activeQuotesCount: 1,
      status: 'Active',
    };
    setPromos([created, ...promos]);
    setTitle('');
    setShowModal(false);
    toast('Scholarship campaign broadcasted to all 42 partner agencies', 'success');
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="warning">Real-Time Agency Syndication</Badge>
              <span className="text-xs text-slate-400">Auto-Applied in Quote Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Provider Promotions & Scholarship Campaigns
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Launch targeted tuition waivers, regional bursaries, and material fee discounts across your partner agency network.
            </p>
          </div>

          <Button onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4" />
            Launch New Scholarship
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {promos.map((promo) => (
            <Card
              key={promo.id}
              className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-blue-300 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                    {promo.id}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">{promo.title}</h2>
                  <Badge variant="success">{promo.status}</Badge>
                </div>

                <p className="text-sm font-semibold text-emerald-700 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  {promo.discountType}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span>Provider: <strong className="text-slate-700">{promo.provider}</strong></span>
                  <span>•</span>
                  <span>Markets: {promo.eligibleRegions}</span>
                  <span>•</span>
                  <span>Campuses: {promo.campuses}</span>
                  <span>•</span>
                  <span>Valid until {promo.validUntil}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <span className="text-xl font-bold text-slate-900">{promo.activeQuotesCount}</span>
                  <p className="text-[11px] text-slate-500">Quotes Using Promo</p>
                </div>
                <button
                  onClick={() => {
                    setPromos((prev) => prev.filter((p) => p.id !== promo.id));
                    toast('Promotion archived', 'info');
                  }}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                  title="Archive Promo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Launch Provider Scholarship</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleCreatePromo} className="space-y-4">
                <Input
                  label="Campaign Title"
                  placeholder="e.g. Q4 Summer ELICOS 25% Bursary"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <Input
                  label="Discount Rule"
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value)}
                  required
                />
                <Input
                  label="Eligible Student Passport Regions"
                  value={regions}
                  onChange={(e) => setRegions(e.target.value)}
                />
                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Broadcast to Agencies</Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
