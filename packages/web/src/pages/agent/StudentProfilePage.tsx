'use client';

import { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
  FileText,
  Users,
  BookOpen,
  Clock,
  Calendar,
  DollarSign,
  CheckCircle,
  MapPin,
  Globe,
  Star,
  ChevronRight,
  AlertTriangle,
  Sparkles,
  CreditCard,
  Download,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';
import { DocumentViewerModal, ViewableDocument } from '../../components/documents/DocumentViewerModal';

const initialStudent = {
  id: 'STU-001',
  studentId: 'STU-001',
  fullName: 'Sarah M.',
  gender: 'Female',
  nationalities: 'Australia, Singapore',
  citizenship: '🇦🇺 AU',
  profilePicture: null,
  countryCode: 'AU',
  profileStatus: 'In Progress',
  contactNumber: '+61 400 000 000',
  dateOfBirth: '30/03/2001',
  email: 'sarah@example.com',
  profilePictureOrigin: 'camera',
  timeZone: 'Sydney, Australia',
  address: 'Sydney CBD, NSW, Australia',
  countryState: 'New South Wales',
  countryCity: 'Sydney',
  state: 'NSW',
  city: 'Sydney',
  postalCode: '2000',
  addressLine1: '123 George St',
  addressLine2: '',
  schoolCountry: 'Australia',
  citizenshipCountry: 'AU',
  countryCodeNumber: 2,
  citizenshipCountryCode: '+61',
  streetName: 'George St',
  townCity: 'Sydney',
  stateProvince: 'NSW',
  country: 'Australia',
  countryCodeISO: 'AU',
  genderIdentity: 'Female',
  hasAddress: true,
  hasTfn: false,
  hasBankAccount: false,
  tuitionFee: 28800,
  commissionRate: 22,
  commissionTier: 'Preferred Tier 1',
  commissionAmount: 6336,
  commissionStatus: 'Available for Payout',
  agreementRef: 'APC-2026-T1-AGY',
  rctiNumber: 'RCTI-2026-088',
};

const studentPayments = [
  { label: 'Tuition Fee', value: 28800, dueDate: '15/12/2025', paid: true },
  { label: 'Material Fee', value: 720, dueDate: '15/12/2025', paid: true },
  { label: 'Reflection Fee', value: 0, dueDate: '15/12/2025', paid: false },
];

export default function StudentProfile() {
  const { toast } = useToast();
  const [student, setStudent] = useState(initialStudent);
  const [payments, setPayments] = useState(studentPayments);
  const [isEditing, setIsEditing] = useState(false);
  const [commissionClaimed, setCommissionClaimed] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<ViewableDocument | null>(null);

  const handlePayment = (label: string) => {
    toast(`${label} payment status refreshed`, 'info');
  };

  const handleClaimCommission = () => {
    setCommissionClaimed(true);
    setStudent((prev) => ({ ...prev, commissionStatus: 'Disbursed' }));
    toast(
      `Commission payout of A$${(student.commissionAmount / 2).toLocaleString()} AUD processed for ${student.fullName}. RCTI generated.`,
      'success'
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white tracking-tight">Student Profile</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setViewingDoc({
                name: `${student.fullName.replace(/\s+/g, '_')}_Summary_Passport.pdf`,
                docType: 'Passport Bio Page & CoE Verification',
                studentName: student.fullName,
                status: 'Verified',
                size: '2.1 MB',
                uploadedAt: 'Today',
              })
            }
            className="text-xs gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-blue-400" /> View Document
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast(`Downloaded student summary for ${student.fullName}`, 'success')}
          >
            <FileText className="w-3.5 h-3.5" /> Download Summary
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <Card className="p-5 border-border/70">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/10 border border-indigo-500/15 flex items-center justify-center">
                  <span className="text-2xl font-bold text-indigo-400">{student.fullName.charAt(0)}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{student.fullName}</h2>
                  <p className="text-sm text-white/50">{student.gender}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="default" className="text-[10px]">{student.profileStatus}</Badge>
                    <Badge variant="secondary" className="text-[10px]">Updated: today</Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => toast('Uploaded new compliance document', 'success')}
                >
                  <FileText className="w-3.5 h-3.5" /> Upload
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-xl bg-white/5">
                <p className="text-xs text-white/40 mb-0.5">Student ID</p>
                <p className="text-sm font-medium text-foreground">{student.studentId}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5">
                <p className="text-xs text-white/40 mb-0.5">Gender</p>
                <p className="text-sm font-medium text-foreground">{student.gender}</p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-5 border-border/70">
              <h3 className="text-base font-semibold text-foreground mb-3">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-white/40 shrink-0" />
                  <div className="text-left">
                    <span className="text-sm text-foreground block">{student.addressLine1}</span>
                    <span className="text-xs text-white/40 block">
                      {student.city}, {student.state} {student.postalCode}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-white/40 shrink-0" />
                  <div className="text-left">
                    <span className="text-sm text-foreground block">{student.contactNumber}</span>
                    <span className="text-xs text-white/40 block">Sydney, Australia</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-white/40 shrink-0" />
                  <div className="text-left">
                    <span className="text-sm text-foreground block">{student.email}</span>
                    <span className="text-xs text-white/40 block">{student.gender}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-5 border-border/70">
              <h3 className="text-base font-semibold text-foreground mb-3">Student Demographics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <span className="text-sm text-white/50">Student ID</span>
                  <span className="text-sm font-medium text-foreground">{student.studentId}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <span className="text-sm text-white/50">Nationalities</span>
                  <span className="text-sm font-medium text-foreground">{student.nationalities}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <span className="text-sm text-white/50">Country</span>
                  <span className="text-sm font-medium text-foreground">{student.country}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <span className="text-sm text-white/50">State</span>
                  <span className="text-sm font-medium text-foreground">{student.state}</span>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-5 border-border/70">
            <h3 className="text-base font-semibold text-foreground mb-4">Enrolled Course</h3>
            <div className="space-y-3">
              {[
                {
                  course: 'SIT30816',
                  name: 'Commercial Cookery Certificate III',
                  date: '2025-2026',
                  location: 'Sydney CBD Campus',
                  type: 'CRICOS VET',
                },
              ].map((e, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{e.course}</p>
                    <p className="text-xs text-white/40 truncate">{e.name}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white/30">
                    <span>{e.date}</span>
                    <span>{e.location}</span>
                    <Badge variant="secondary" className="text-[9px]">{e.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Sidebar: Fees, Outline & Agent Commission */}
        <div className="space-y-5">
          {/* Agent Commission from this Student */}
          <Card className="p-5 border-emerald-500/40 bg-gradient-to-br from-emerald-950/20 via-slate-900/40 to-slate-900/60 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h3 className="text-base font-bold text-emerald-400">Agent Commission</h3>
              </div>
              <Badge variant="success" className="text-[10px] bg-emerald-500/20 text-emerald-300 border-emerald-500/40">
                {student.commissionRate}% Tier
              </Badge>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-white/60">
                <span>Tuition Base:</span>
                <span className="font-mono text-white font-medium">{formatCurrency(student.tuitionFee)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Agreement Ref:</span>
                <span className="font-mono text-white font-medium">{student.agreementRef}</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between items-baseline">
                <span className="font-semibold text-white">Gross Commission:</span>
                <span className="font-mono font-bold text-base text-emerald-400">
                  {formatCurrency(student.commissionAmount)} AUD
                </span>
              </div>
            </div>

            {/* Milestones */}
            <div className="pt-2 border-t border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                <div>
                  <span className="font-medium text-white block">Milestone 1: Deposit Clearance (50%)</span>
                  <span className="text-[10px] text-emerald-400">Disbursed • {formatCurrency(student.commissionAmount / 2)}</span>
                </div>
                <Badge variant="success" className="text-[9px]">Paid</Badge>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                <div>
                  <span className="font-medium text-white block">Milestone 2: Census Date Clearance (50%)</span>
                  <span className="text-[10px] text-white/50">
                    {commissionClaimed ? 'Disbursed' : 'Available for Payout'} • {formatCurrency(student.commissionAmount / 2)}
                  </span>
                </div>
                <Badge variant={commissionClaimed ? 'success' : 'purple'} className="text-[9px]">
                  {commissionClaimed ? 'Paid' : 'Ready'}
                </Badge>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              {!commissionClaimed ? (
                <Button
                  onClick={handleClaimCommission}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  Claim Payout ({formatCurrency(student.commissionAmount / 2)})
                </Button>
              ) : (
                <div className="text-center py-1 text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> All Milestones Settled
                </div>
              )}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setViewingDoc({
                      name: `${student.rctiNumber}.pdf`,
                      docType: 'Recipient Created Tax Invoice (RCTI)',
                      studentName: student.fullName,
                      status: 'Verified',
                      size: '1.4 MB',
                      uploadedAt: 'Today',
                    })
                  }
                  className="flex-1 text-xs gap-1"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-400" /> View RCTI
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast(`Downloaded ${student.rctiNumber} (.pdf)`, 'success')}
                  className="flex-1 text-xs gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </Button>
              </div>
            </div>
          </Card>

          {/* Student Tuition Due */}
          <Card className="p-5 border-border/70">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-foreground">Tuition &amp; Fees</h3>
              <FileText className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="space-y-2.5">
              <div className="flex justify-between">
                <span className="text-xs text-white/50">Tuition Fee</span>
                <span className="text-sm font-medium text-foreground">{formatCurrency(28800)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-white/50">Material Fee</span>
                <span className="text-sm font-medium text-foreground">{formatCurrency(720)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-white/50">Reflection Fee</span>
                <span className="text-sm font-medium text-foreground">{formatCurrency(0)}</span>
              </div>
              <div className="border-t border-white/10 pt-2.5 flex justify-between">
                <span className="text-xs font-semibold text-foreground">Total Due</span>
                <span className="text-sm font-bold text-foreground">{formatCurrency(29520)}</span>
              </div>
            </div>
          </Card>

          {/* Payments */}
          <Card className="p-5 border-border/70">
            <h3 className="text-base font-semibold text-foreground mb-3">Payments</h3>
            <div className="space-y-2.5">
              {payments.map((p, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <div>
                    <p className="text-sm text-foreground">{p.label}</p>
                    <p className="text-[11px] text-white/30">Due: {p.dueDate}</p>
                  </div>
                  <Button variant={p.paid ? 'outline' : 'default'} size="sm" className="gap-1.5" onClick={() => handlePayment(p.label)}>
                    <CheckCircle className="w-3 h-3" />
                    {p.paid ? 'Paid' : 'Pay Now'}
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Uploaded Document Viewer Modal */}
      {viewingDoc && (
        <DocumentViewerModal
          document={viewingDoc}
          onClose={() => setViewingDoc(null)}
        />
      )}
    </div>
  );
}

function formatCurrency(n: number) {
  return '$' + Math.round(n).toLocaleString('en-AU');
}
