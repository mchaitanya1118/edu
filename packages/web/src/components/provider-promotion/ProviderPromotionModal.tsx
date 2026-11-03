import * as React from 'react';
import { X, ChevronDown, Check, MapPin, Handshake, Calendar, Flag } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { Badge } from '../../components/ui/Badge';

// ── Types ───────────────────────────────────────────────────────────
type TabValue = 'region' | 'countries';

interface RegionOption {
  value: string;
  label: string;
  checked: boolean;
  emoji: string;
  default: boolean;
}

interface CountryOption {
  code: string;
  name: string;
  flag: string;
}

interface CourseOption {
  value: string;
  label: string;
}

// ── Static data ─────────────────────────────────────────────────────
const REGION_OPTIONS: RegionOption[] = [
  { value: 'latam', label: 'Latin America (LATAM)', checked: true, emoji: '🌎', default: false },
  { value: 'seAsia', label: 'South East Asia', checked: true, emoji: '🌏', default: false },
  { value: 'eastAsia', label: 'East Asia', checked: false, emoji: '🗾', default: false },
  { value: 'europe', label: 'Europe', checked: false, emoji: '🇪🇺', default: false },
  { value: 'southAsia', label: 'South Asia', checked: false, emoji: '🌏', default: false },
  { value: 'global', label: 'All Other Countries (Global Default)', checked: false, emoji: '🌐', default: true },
];

const ALL_COUNTRIES: CountryOption[] = [
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
];

const COURSE_OPTIONS: CourseOption[] = [
  { value: 'General English', label: 'General English' },
  { value: 'IELTS Preparation', label: 'IELTS Preparation' },
  { value: 'English for Academic Purposes', label: 'English for Academic Purposes' },
  { value: 'EAP Bridge to University', label: 'EAP Bridge to University' },
  { value: 'English for Teachers', label: 'English for Teachers' },
];

const PROMOTION_TYPES = [
  { value: 'discounted_weekly_rate', label: 'Discounted Weekly Rate ($/wk)' },
  { value: 'flat_weekly_rate', label: 'Flat Weekly Rate ($/wk)' },
  { value: 'per_hour_rate', label: 'Per Hour Rate ($/hr)' },
];

const INITIAL_VALUES = {
  promoTitle: 'Q1 LATAM & SE Asia Special',
  courseApplication: ['General English', 'IELTS Preparation'],
  promoType: 'discounted_weekly_rate',
  promoRate: '$240 AUD/wk',
  targetRegion: [true, true, false, false, false, false],
  selectedCountries: ['BR', 'CO', 'TH', 'VN'],
  enrolmentStart: '2026-01-05',
  enrolmentEnd: '2026-06-30',
  minimumDurationWeeks: '12',
};

// ── Sub-components ──────────────────────────────────────────────────
const MultiSelect: React.FC<{
  label: string;
  options: CourseOption[];
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}> = ({ label, options, value, onChange, placeholder }) => {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      const target = e.target as Node;
      if (triggerRef.current && !triggerRef.current.contains(target) && !listRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open]);

  const selected = options.filter(o => value.includes(o.value));

  return (
    <div>
      <Label htmlFor="promo-course-application">Course Application</Label>
      <div className="relative">
        <button
          ref={triggerRef}
          id="promo-course-application"
          onClick={() => setOpen(v => !v)}
          className="flex h-10 min-w-[220px] w-full flex-wrap items-center justify-between gap-1 rounded-md border border-border bg-background px-3 py-2.5 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:border-primary"
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <div className="flex flex-wrap items-center gap-1">
            {selected.map(o => (
              <span key={o.value} className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-light text-primary text-xs font-medium border border-primary/20">
                <Check className="w-3 h-3 text-primary" />
                {o.label}
              </span>
            ))}
            {selected.length === 0 && <span className="text-muted text-xs">{placeholder || 'Select courses…'}</span>}
          </div>
          <ChevronDown className={`w-4 h-4 text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <ul
            ref={listRef}
            role="listbox"
            className="absolute z-50 top-12 left-0 mt-1 w-full min-w-[220px] max-h-64 overflow-auto rounded-md border border-border bg-background shadow-lg py-1"
          >
            {options.map(o => (
              <li
                key={o.value}
                className="flex items-center justify-between px-3 py-2 text-sm cursor-pointer hover:bg-primary-light/40"
                onClick={() => {
                  const next = value.includes(o.value)
                    ? value.filter(v => v !== o.value)
                    : [...value, o.value];
                  onChange(next);
                  setOpen(false);
                }}
              >
                <span className="flex items-center gap-2 text-foreground">
                  <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${value.includes(o.value) ? 'bg-primary border-primary text-primary' : 'border-border'}`}>
                    {value.includes(o.value) && <Check className="w-3 h-3" />}
                  </span>
                  {o.label}
                </span>
                {value.includes(o.value) && <Check className="w-4 h-4 text-primary" />}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const TabList: React.FC<{ value: TabValue; onChange: (v: TabValue) => void }> = ({ value, onChange }) => {
  const tabs: { value: TabValue; label: string }[] = [
    { value: 'region', label: 'By Region' },
    { value: 'countries', label: 'By Specific Countries' },
  ];
  return (
    <div className="flex divide-x divide-border">
      {tabs.map(t => (
        <button
          key={t.value}
          onClick={() => onChange(t.value)}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${value === t.value ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted hover:text-foreground hover:bg-muted/10'}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

const RegionCheckboxGrid: React.FC<{
  value: boolean[];
  onChange: (v: boolean[]) => void;
}> = ({ value, onChange }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {REGION_OPTIONS.map((r, i) => (
        <label
          key={r.value}
          className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-all ${r.default ? 'border-border bg-muted/5' : value[i] ? 'border-primary bg-primary-light/40' : 'border-border hover:border-border/70'}`}
          onClick={() => {
            const next = [...value];
            next[i] = !next[i];
            onChange(next);
          }}
        >
          <span className="text-base">{r.emoji}</span>
          <span className="text-sm text-foreground">{r.label}</span>
          {value[i] && <Check className="w-4 h-4 text-primary ml-auto shrink-0" />}
        </label>
      ))}
    </div>
  );
};

const PillPills: React.FC<{
  pills: string[];
  onChange: (codes: string[]) => void;
}> = ({ pills, onChange }) => {
  const [query, setQuery] = React.useState('');
  const [available, setAvailable] = React.useState<CountryOption[]>(ALL_COUNTRIES);

  const remove = (code: string) => onChange(pills.filter(c => c !== code));

  return (
    <div>
      <Label>Target Countries</Label>
      <div className="flex flex-wrap items-center gap-2">
        {pills.map(code => {
          const c = ALL_COUNTRIES.find(p => p.code === code)!;
          return (
            <Badge key={code} variant="secondary" className="gap-1.5">
              <span className="text-base leading-none">{c.flag}</span>
              <span className="text-xs font-medium text-foreground">{c.name}</span>
              <button
                type="button"
                onClick={() => remove(code)}
                className="hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                aria-label={`Remove ${c.name}`}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          );
        })}
        <Input
          placeholder="Search country…"
          value={query}
          onChange={(e) => {
            const q = e.target.value;
            setQuery(q);
            setAvailable(
              ALL_COUNTRIES.filter(c => c.name.toLowerCase().includes(q.toLowerCase()) || c.code.toLowerCase().includes(q.toLowerCase())),
            );
          }}
          className="h-8 w-40 text-xs pl-7"
          list="country-search-options"
        />
        <datalist id="country-search-options">
          {available.map(c => <option key={c.code} value={`${c.flag} ${c.name} (${c.code})`} />)}
        </datalist>
        {available.length > 0 && (
          <button
            type="button"
            onClick={() => {
              const c = available[0];
              if (!pills.includes(c.code)) onChange([...pills, c.code]);
              setQuery('');
              setAvailable(ALL_COUNTRIES);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-border bg-background hover:bg-muted/10 transition-colors"
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
            Add {available[0].name}
          </button>
        )}
      </div>
      <p className="mt-1.5 text-[11px] text-muted leading-relaxed">
        Only agents searching with these student nationalities will view this promotional rate.
      </p>
    </div>
  );
};

// ── Main component ──────────────────────────────────────────────────
export default function ProviderPromotionModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [tab, setTab] = React.useState<TabValue>('region');
  const [region, setRegion] = React.useState<boolean[]>(INITIAL_VALUES.targetRegion);
  const [countries, setCountries] = React.useState<string[]>(INITIAL_VALUES.selectedCountries);
  const [courseApplication, setCourseApplication] = React.useState<string[]>(INITIAL_VALUES.courseApplication);
  const [promoType, setPromoType] = React.useState<string>(INITIAL_VALUES.promoType);
  const [promoRate, setPromoRate] = React.useState<string>(INITIAL_VALUES.promoRate);
  const [promoTitle, setPromoTitle] = React.useState<string>(INITIAL_VALUES.promoTitle);
  const [enrolmentStart, setEnrolmentStart] = React.useState<string>(INITIAL_VALUES.enrolmentStart);
  const [enrolmentEnd, setEnrolmentEnd] = React.useState<string>(INITIAL_VALUES.enrolmentEnd);
  const [minimumDuration, setMinimumDuration] = React.useState<string>(INITIAL_VALUES.minimumDurationWeeks);

  React.useEffect(() => {
    if (!open) {
      setTab('region');
      setRegion(INITIAL_VALUES.targetRegion);
      setCountries(INITIAL_VALUES.selectedCountries);
      setCourseApplication(INITIAL_VALUES.courseApplication);
      setPromoType(INITIAL_VALUES.promoType);
      setPromoRate(INITIAL_VALUES.promoRate);
      setPromoTitle(INITIAL_VALUES.promoTitle);
      setEnrolmentStart(INITIAL_VALUES.enrolmentStart);
      setEnrolmentEnd(INITIAL_VALUES.enrolmentEnd);
      setMinimumDuration(INITIAL_VALUES.minimumDurationWeeks);
    }
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Modal panel ── */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="w-full max-w-3xl max-h-[92vh] overflow-hidden rounded-2xl shadow-2xl bg-card border border-border/80 pointer-events-auto flex flex-col"
          style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-background shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Handshake className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground leading-tight">Create Course Promotion</h2>
                <p className="text-xs text-muted mt-0.5">Set promotional weekly rates and country-specific eligibility.</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted/10 text-muted hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-88px)]">
            <div className="space-y-6">
              {/* Section 1: Promotion General Info */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">Promotion General Info</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="promo-title">Promo Title</Label>
                    <Input id="promo-title" value={promoTitle} onChange={(e) => setPromoTitle(e.target.value)} placeholder="Enter promo title" />
                  </div>

                  <MultiSelect
                    label="Course Application"
                    options={COURSE_OPTIONS}
                    value={courseApplication}
                    onChange={setCourseApplication}
                    placeholder="Select course(s)…"
                  />

                  <div>
                    <Label htmlFor="promo-type">Promo Type</Label>
                    <select
                      id="promo-type"
                      value={promoType}
                      onChange={(e) => setPromoType(e.target.value)}
                      className="w-full h-10 rounded-md border border-border bg-background px-3 py-2.5 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:border-primary"
                    >
                      {PROMOTION_TYPES.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="promo-rate">Promotional Rate</Label>
                    <div className="flex flex-wrap items-center gap-3">
                      <Input
                        id="promo-rate"
                        value={promoRate}
                        onChange={(e) => setPromoRate(e.target.value)}
                        placeholder="Enter promotional rate"
                      />
                      <span className="text-xs text-muted self-center">(Standard rate: $350 AUD/wk)</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: Target Student Nationality — highlighted box */}
              <section className="border border-primary/20 bg-primary-light/30 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Flag className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">Target Student Nationality</h3>
                </div>

                <div className="mb-3">
                  <TabList value={tab} onChange={setTab} />
                </div>

                <div>
                  <h4 className="text-[11px] font-semibold text-primary uppercase tracking-wider mb-3">Region Checkboxes</h4>
                  <RegionCheckboxGrid value={region} onChange={setRegion} />
                </div>

                <PillPills pills={countries} onChange={setCountries} />
              </section>

              {/* Section 3: Validity & Duration Rules */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">Validity &amp; Duration Rules</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="enrol-start">Enrolment Window — Start</Label>
                    <Input id="enrol-start" type="date" value={enrolmentStart} onChange={(e) => setEnrolmentStart(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="enrol-end">Enrolment Window — End</Label>
                    <Input id="enrol-end" type="date" value={enrolmentEnd} onChange={(e) => setEnrolmentEnd(e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="min-duration">Minimum Duration</Label>
                    <div className="flex flex-wrap items-center gap-3">
                      <Input
                        id="min-duration"
                        type="number"
                        min={1}
                        value={minimumDuration}
                        onChange={(e) => setMinimumDuration(e.target.value)}
                      />
                      <span className="text-sm text-muted self-center">Weeks</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-background shrink-0">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="default">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
              Publish Promotion
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
