'use client';

import { useState } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { Plus, FileText, X, MapPin, Clock, Calendar, Save, Download, User, Globe, Building2, ArrowLeft, Star, Shield, CreditCard, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';

interface Course {
  code: string;
  name: string;
  category: string;
  duration: string;
  pricePerWeek: number;
  campusAndPathway: string;
  provider: string;
  campusAddress: string;
  providerType: string;
  country: string;
  isoCountry: string;
  priceStandard: number;
  durationMin: number;
  durationMax: number;
}

const courseDetails: Record<string, Course> = {
  'SIT30816': {
    code: 'SIT30816',
    name: 'Commercial Cookery Certificate III',
    category: 'VET',
    duration: '12 months',
    pricePerWeek: 550,
    campusAndPathway: 'Sydney Central Campus',
    provider: 'Sydney International College (Before Accreditation)',
    campusAddress: 'Sydney, Australia',
    providerType: 'Government RTO',
    country: 'Australia',
    isoCountry: 'AU',
    priceStandard: 550,
    durationMin: 12,
    durationMax: 24,
  },
  'SIT50022': {
    code: 'SIT50022',
    name: 'Diploma of Hospitality Management',
    category: 'VET',
    duration: '18 months',
    pricePerWeek: 680,
    campusAndPathway: 'Brisbane Campus',
    provider: 'Brisbane Education Hub',
    campusAddress: 'Brisbane, Australia',
    providerType: 'Government RTO',
    country: 'Australia',
    isoCountry: 'AU',
    priceStandard: 680,
    durationMin: 12,
    durationMax: 24,
  },
  'C2': {
    code: 'C2',
    name: 'Collins Academy – VET Course',
    category: 'ELICOS',
    duration: '24 weeks',
    pricePerWeek: 450,
    campusAndPathway: 'Collins Academy',
    provider: 'Nikkles Education Services',
    campusAddress: 'Brisbane, Australia',
    providerType: 'Private RTO',
    country: 'Australia',
    isoCountry: 'AU',
    priceStandard: 450,
    durationMin: 12,
    durationMax: 24,
  },
};

const studentProfiles = [
  { id: 'SP1', name: 'Maria Santos', nationality: 'BRA', email: 'maria.santos@email.com', enrolled: '12 wks', usedQuota: 1, school: 'Sydney International College' },
  { id: 'SP2', name: 'James Chen', nationality: 'CHN', email: 'james.chen@email.com', enrolled: '12 wks', usedQuota: 2, school: 'Melbourne Academy' },
];

const mockCourses = [courseDetails['SIT30816'], courseDetails['SIT50022']] as Course[];

const defaultTuition = courseDetails['SIT30816']?.pricePerWeek ?? 550;

export default function QuoteDrawer() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [campus, setCampus] = useState(courseDetails['SIT30816']?.campusAndPathway ?? 'Sydney International College');
  const [pricePerWeek, setPricePerWeek] = useState<number>(defaultTuition);
  const [tuitionPrice, setTuitionPrice] = useState<number>(defaultTuition);
  const [duration, setDuration] = useState(12);
  const [enrolled, setEnrolled] = useState(1);
  const [student, setStudent] = useState({ name: '', nationality: '', email: '', enrolled: '12 wks', usedQuota: 0, school: campus, applyOfferLetter: false });
  const [promotions, setPromotions] = useState<{ promoName: string; selected: boolean }[]>([
    { promoName: 'Q1 LATAM & SE Asia Special', selected: true },
    { promoName: 'Standard Rate', selected: false },
  ]);
  const [comment, setComment] = useState('');
  const [activeTab, setActiveTab] = useState<'course' | 'student' | 'promo'>('course');
  const [showAddCourse, setShowAddCourse] = useState(false);

  const totalGross = tuitionPrice * duration;
  const enrollmentPrice = 250;
  const material = 72;
  const appliedPromotion = -760;
  const totalNet = totalGross + enrollmentPrice + material + appliedPromotion;

  const handleSaveQuote = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}><ArrowLeft className="w-3.5 h-3.5" /> Back</Button>
        <div className="flex-1" />
        <NavLink to="/agent/quotes" style={{ textDecoration: 'none' }}>
          <Button variant="outline" size="sm"><FileText className="w-3.5 h-3.5" /> My Quotes List</Button>
        </NavLink>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-5">
          <Card className="p-5 border-border/70">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Course Detail</h2>
              <Badge variant="default" className="text-[11px]">1 course · 12 weeks</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-white/40 mb-0.5">Course Code</p>
                <p className="text-sm font-medium text-foreground">SIT30816</p>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-0.5">Course Name</p>
                <p className="text-sm font-medium text-foreground">Commercial Cookery Certificate III</p>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-0.5">Category</p>
                <Badge variant="default" className="text-[10px]">VET</Badge>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-0.5">Duration</p>
                <p className="text-sm font-medium text-foreground">12 months</p>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-0.5">Price per Week</p>
                <p className="text-sm font-medium text-foreground">$550/wk</p>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-0.5">Provider</p>
                <p className="text-sm font-medium text-foreground">Nikkles Education Services</p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2.5 mb-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-semibold text-foreground">Tuition Summary</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-white/50">Tuition Fee</span>
                  <span className="text-sm font-medium text-foreground">{formatCurrency(tuitionPrice)}/wk × {duration} wks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-white/50">Enrolment Fee</span>
                  <span className="text-sm text-foreground">{formatCurrency(enrollmentPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-white/50">Material Fee</span>
                  <span className="text-sm text-foreground">{formatCurrency(material)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-white/50">Applied Promotion</span>
                  <span className="text-sm text-white/50">{formatCurrency(-appliedPromotion)}</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between">
                  <span className="text-xs font-semibold text-foreground">Total Gross</span>
                  <span className="text-sm font-bold text-foreground">{formatCurrency(totalGross)}</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between">
                  <span className="text-xs font-semibold text-foreground">Total Net</span>
                  <span className="text-lg font-bold text-indigo-400">{formatCurrency(totalNet)}</span>
                </div>
              </div>
            </Card>
          </div>

          {showAddCourse && (
            <Card className="p-5 border-indigo-500/30 bg-indigo-500/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">+ Add Another Course / Package Pathway</h3>
                <button onClick={() => setShowAddCourse(false)} className="p-1.5 rounded-lg hover:bg-white/5 text-white/40">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-white/40 mb-0.5">Course</p>
                  <select className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm">
                    <option>SIT30816 – Commercial Cookery Cert III</option>
                    <option>SIT50022 – Hospitality Diploma</option>
                    <option>C2 – Collins Academy VET Course</option>
                  </select>
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-0.5">Duration (weeks)</p>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setDuration((d) => Math.max(1, d - 1))}>-</Button>
                    <span className="text-sm font-medium text-foreground w-12 text-center">{duration} weeks</span>
                    <Button variant="ghost" size="sm" onClick={() => setDuration((d) => Math.min(24, d + 1))}>+</Button>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-0.5">Weekly Price</p>
                  <Input type="number" value={tuitionPrice} onChange={(e) => setTuitionPrice(Number(e.target.value))} className="bg-white/5 border-border/70" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-white/40 mb-2">Pricing</p>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="addCourse" className="rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500/20" />
                  <label htmlFor="addCourse" className="text-sm text-foreground">Apply standard rate ($350/wk) instead of promo rate</label>
                </div>
              </div>
            </Card>
          )}

          <Button variant="default" size="sm" className="w-full" onClick={() => setShowAddCourse(true)}>
            <Plus className="w-3.5 h-3.5" /> + Add Another Course / Package Pathway
          </Button>
        </div>

        <div className="space-y-5">
          <Card className="p-5 border-border/70">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-400" /> Student Information
            </h3>
            <div className="space-y-3">
              <Input placeholder="Student full name" value={student.name} onChange={(e) => setStudent({ ...student, name: e.target.value })} className="bg-white/5 border-border/70" />
              <div>
                <label className="text-xs text-white/50 mb-1 block">Nationality</label>
                <select className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm">
                  <option value="">Select nationality</option>
                  <option value="BRA">Brazil 🇧🇷</option>
                  <option value="CHN">China 🇨🇳</option>
                  <option value="IDN">Indonesia 🇮🇩</option>
                </select>
              </div>
              <Input placeholder="Email" type="email" value={student.email} onChange={(e) => setStudent({ ...student, email: e.target.value })} className="bg-white/5 border-border/70" />
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Outcome</label>
                  <Badge variant="warning" className="text-[11px]">Study completed - rejection</Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                  {duration} {duration === 1 ? 'week' : 'weeks'}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5 border-border/70">
            <h3 className="text-sm font-semibold text-foreground mb-3">Financial Summary</h3>
            <div className="space-y-2.5">
              <div className="flex justify-between rounded-xl bg-white/5 px-3.5 py-2.5">
                <span className="text-xs text-white/50">Tuition Fee</span>
                <span className="text-sm font-medium text-foreground">{formatCurrency(tuitionPrice)}/wk × {duration} wks = {formatCurrency(totalGross)}</span>
              </div>
              <div className="flex justify-between rounded-xl bg-white/5 px-3.5 py-2.5">
                <span className="text-xs text-white/50">Enrolment Fee</span>
                <span className="text-sm text-foreground">{formatCurrency(enrollmentPrice)}</span>
              </div>
              <div className="flex justify-between rounded-xl bg-white/5 px-3.5 py-2.5">
                <span className="text-xs text-white/50">Material Fee</span>
                <span className="text-sm text-foreground">{formatCurrency(material)}</span>
              </div>
              <div className="flex justify-between rounded-xl bg-indigo-500/5 px-3.5 py-2.5">
                <span className="text-xs text-indigo-400">Applied Promotion</span>
                <span className="text-sm text-indigo-400">-{formatCurrency(-appliedPromotion)}</span>
              </div>
              <div className="border-t border-white/10 pt-2.5 flex justify-between">
                <span className="text-xs font-semibold text-foreground">Total Net Package Cost</span>
                <span className="text-lg font-bold text-indigo-400">{formatCurrency(totalNet)}</span>
              </div>
            </div>
          </Card>

          <div className="flex gap-2">
            <Button variant="default" size="lg" className="flex-1 gap-2" onClick={handleSaveQuote}>
              <Save className="w-4 h-4" /> {saved ? 'Saved ✓' : 'Save Quote'}
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/agent/documents')}>
              <Download className="w-4 h-4" /> Save as PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatCurrency(n: number) {
  return '$' + Math.round(n).toLocaleString('en-AU');
}
