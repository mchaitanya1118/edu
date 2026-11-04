import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Tag,
  Users,
  Building2,
  ArrowUpRight,
  Search,
  Filter,
  Check,
  Globe,
  SlidersHorizontal,
  Flame,
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

export type PromoCampaign = {
  id: string;
  title: string;
  provider: string;
  discountType: string;
  discountPercentage?: number;
  fixedDollarDiscount?: number;
  eligibleRegions: string;
  campuses: string;
  validUntil: string;
  activeQuotesCount: number;
  status: 'Active' | 'Scheduled' | 'Expired';
  highlightTag: string;
};

const INITIAL_PROMOS: PromoCampaign[] = [
  {
    id: 'PRM-201',
    title: 'Q3 ELICOS 20% Offshore & Onshore Scholarship',
    provider: 'Australian Pacific College',
    discountType: '20% Tuition Reduction ($280/wk)',
    discountPercentage: 20,
    eligibleRegions: 'LATAM, Europe, Japan & South Korea',
    campuses: 'Sydney CBD, Melbourne, Brisbane',
    validUntil: '31 Dec 2026',
    activeQuotesCount: 64,
    status: 'Active',
    highlightTag: 'Most Popular',
  },
  {
    id: 'PRM-202',
    title: 'VET Business & Leadership $1,200 Bursary',
    provider: 'Australian Pacific College',
    discountType: '$1,200 Fee Waiver + $0 Material Fee',
    fixedDollarDiscount: 1200,
    eligibleRegions: 'All International Passports',
    campuses: 'All Campuses (Sydney, Melbourne, Brisbane, Gold Coast)',
    validUntil: '30 Nov 2026',
    activeQuotesCount: 41,
    status: 'Active',
    highlightTag: 'High Visa Conversion',
  },
  {
    id: 'PRM-203',
    title: 'Perth & Gold Coast Regional Migration Relocation Grant',
    provider: 'Greenwich College Australia',
    discountType: '15% Tuition Grant + Free Enrolment',
    discountPercentage: 15,
    eligibleRegions: 'Global Onshore Visa Extensions & Pathways',
    campuses: 'Perth & Gold Coast',
    validUntil: '31 Jan 2027',
    activeQuotesCount: 29,
    status: 'Active',
    highlightTag: 'Regional +5 Points',
  },
  {
    id: 'PRM-204',
    title: 'IT & Cloud Computing Launch Grant',
    provider: 'ILSC Greystone College Australia',
    discountType: '$1,500 Direct Course Grant + Free Placement',
    fixedDollarDiscount: 1500,
    eligibleRegions: 'South Asia, SE Asia & Latin America',
    campuses: 'Melbourne Bourke St & Sydney George St',
    validUntil: '15 Oct 2026',
    activeQuotesCount: 18,
    status: 'Active',
    highlightTag: 'Industry In-Demand',
  },
];

export default function ProviderPromoPage() {
  const { toast } = useToast();
  const [promos, setPromos] = useState<PromoCampaign[]>(INITIAL_PROMOS);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  // New campaign state
  const [title, setTitle] = useState('');
  const [provider, setProvider] = useState('Australian Pacific College');
  const [discountType, setDiscountType] = useState('20% Tuition Reduction');
  const [regions, setRegions] = useState('LATAM, Europe & SE Asia');
  const [campuses, setCampuses] = useState('Sydney CBD, Melbourne, Brisbane');
  const [validUntil, setValidUntil] = useState('31 Dec 2026');

  const filteredPromos = promos.filter((p) => {
    const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.provider.toLowerCase().includes(search.toLowerCase()) ||
      p.eligibleRegions.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalQuotesUsingPromos = promos.reduce((sum, p) => sum + p.activeQuotesCount, 0);

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const created: PromoCampaign = {
      id: `PRM-${Math.floor(210 + Math.random() * 90)}`,
      title,
      provider,
      discountType,
      eligibleRegions: regions,
      campuses,
      validUntil,
      activeQuotesCount: 1,
      status: 'Active',
      highlightTag: 'New Launch',
    };

    setPromos([created, ...promos]);
    setTitle('');
    setShowModal(false);
    toast('Scholarship campaign broadcasted to all partner education agencies', 'success');
  };

  return (
    <AppLayout>
      <div className="space-y-7 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="warning">Agency Syndication Live</Badge>
              <span className="text-xs text-slate-400">Auto-Applied in Quote Generator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Promotional Scholarships &amp; Pricing Rules
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Publish and broadcast targeted tuition waivers, regional bursaries, and scholarship grants across your registered agent network.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link to="/quotes">
              <Button variant="secondary" size="sm">
                View Generated Quotes
              </Button>
            </Link>
            <Button size="sm" onClick={() => setShowModal(true)}>
              <Plus className="w-4 h-4" />
              Launch New Scholarship
            </Button>
          </div>
        </div>

        {/* 4 Summary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Active Campaigns</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900">{promos.length} Live</p>
            <span className="text-[11px] text-emerald-600 font-medium">Broadcasted to 42+ agencies</span>
          </Card>

          <Card className="p-4 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Student Quotes Utilizing</span>
              <Tag className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900">{totalQuotesUsingPromos} Quotes</p>
            <span className="text-[11px] text-blue-600 font-medium">+18 this past week</span>
          </Card>

          <Card className="p-4 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Average Student Benefit</span>
              <Percent className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900">A$1,350</p>
            <span className="text-[11px] text-slate-500 font-medium">Tuition reduction per student</span>
          </Card>

          <Card className="p-4 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Conversion Impact</span>
              <Flame className="w-4 h-4 text-rose-500" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900">+34%</p>
            <span className="text-[11px] text-emerald-600 font-medium">Higher Offer-to-CoE uptake</span>
          </Card>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            {['All', 'Active', 'Scheduled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {status === 'All' ? 'All Campaigns' : status}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search scholarship or country..."
              className="w-full h-8 bg-slate-50 hover:bg-white border border-slate-200 rounded-lg pl-8 pr-3 text-xs text-slate-900 focus:outline-none focus:border-blue-600 transition-all"
            />
          </div>
        </div>

        {/* Campaigns List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredPromos.map((promo) => (
            <Card
              key={promo.id}
              className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5 hover:border-blue-300 transition-all border border-slate-200 shadow-2xs"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                    {promo.id}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{promo.title}</h3>
                  <Badge variant="success" className="text-[10px]">
                    {promo.status}
                  </Badge>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {promo.highlightTag}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm font-bold text-emerald-700">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{promo.discountType}</span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
                  <span className="flex items-center gap-1 font-medium text-slate-700">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    {promo.provider}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    Markets: {promo.eligibleRegions}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {promo.campuses}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Valid to {promo.validUntil}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between lg:justify-end gap-5 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <div className="text-left lg:text-right">
                  <span className="text-xl font-extrabold text-slate-900">{promo.activeQuotesCount}</span>
                  <p className="text-[11px] text-slate-500">Quotes Using Promo</p>
                </div>

                <div className="flex items-center gap-2">
                  <Link to="/quotes">
                    <Button variant="secondary" size="sm" className="text-xs">
                      Generate Quote
                    </Button>
                  </Link>
                  <button
                    onClick={() => {
                      setPromos((prev) => prev.filter((p) => p.id !== promo.id));
                      toast('Scholarship archived', 'info');
                    }}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Archive Campaign"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Modal: Launch New Scholarship Campaign */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="w-full max-w-lg p-6 space-y-5 bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h3 className="text-base font-bold text-slate-900">Broadcast Provider Scholarship</h3>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreatePromo} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Scholarship Title</label>
                  <Input
                    placeholder="e.g. Q4 2026 Latin America & Europe 20% Bursary"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Provider Institution</label>
                  <select
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    className="w-full h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
                  >
                    <option value="Australian Pacific College">Australian Pacific College</option>
                    <option value="Greenwich English & Management College">Greenwich English &amp; Management College</option>
                    <option value="ILSC & Greystone College">ILSC &amp; Greystone College</option>
                    <option value="Lexis English & Lexis Training">Lexis English &amp; Lexis Training</option>
                    <option value="Kaplan Business School">Kaplan Business School</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Discount Structure</label>
                    <Input
                      value={discountType}
                      onChange={(e) => setDiscountType(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Expiry / Valid Date</label>
                    <Input
                      value={validUntil}
                      onChange={(e) => setValidUntil(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Eligible Nationality / Passport Regions</label>
                  <Input
                    value={regions}
                    onChange={(e) => setRegions(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Eligible Campuses</label>
                  <Input
                    value={campuses}
                    onChange={(e) => setCampuses(e.target.value)}
                    required
                  />
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px]">
                  <strong>Syndication notice:</strong> Saving will immediately syndicate this pricing rule across all partner agent accounts and auto-apply it when agents generate course quotes.
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Broadcast Scholarship</Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
