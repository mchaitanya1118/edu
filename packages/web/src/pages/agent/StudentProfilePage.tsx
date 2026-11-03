'use client';

import { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FileText, Users, BookOpen, Clock, Calendar, DollarSign, CheckCircle, MapPin, Globe, Star, ChevronRight, AlertTriangle } from 'lucide-react';

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
};

const studentPayments = [
  { label: 'Tuition Fee', value: 28800, dueDate: '15/12/2025', paid: false },
  { label: 'Material Fee', value: 720, dueDate: '15/12/2025', paid: false },
  { label: 'Reflection Fee', value: 0, dueDate: '15/12/2025', paid: false },
];

export default function StudentProfile() {
  const [student, setStudent] = useState(initialStudent);
  const [payments, setPayments] = useState(studentPayments);
  const [isEditing, setIsEditing] = useState(false);

  const handlePayment = (label: string) => {
    alert(`${label} payment processed`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white tracking-tight">Student Profile</h1>
        <Button variant="outline" size="sm"><FileText className="w-3.5 h-3.5" /> Download</Button>
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
                <Button variant="default" size="sm"><FileText className="w-3.5 h-3.5" /> Upload</Button>
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
                  <Button variant="ghost" size="sm" className="flex-1 justify-start text-left">
                    <span className="text-sm text-foreground">{student.addressLine1}</span>
                    {student.addressLine2 && <span className="text-xs text-white/40 block">{student.addressLine2}</span>}
                    <span className="text-xs text-white/40 block">{student.city}, {student.state} {student.postalCode}</span>
                  </Button>
                </div>
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-white/40 shrink-0" />
                  <Button variant="ghost" size="sm" className="flex-1 justify-start text-left">
                    <span className="text-sm text-foreground">+61 400 000 000</span>
                    <span className="text-xs text-white/40">Sydney, Australia</span>
                  </Button>
                </div>
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-white/40 shrink-0" />
                  <Button variant="ghost" size="sm" className="flex-1 justify-start text-left">
                    <span className="text-sm text-foreground">{student.email}</span>
                    <span className="text-xs text-white/40">{student.gender}</span>
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-5 border-border/70">
              <h3 className="text-base font-semibold text-foreground mb-3">Student ID</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <span className="text-sm text-white/50">Student ID</span>
                  <span className="text-sm font-medium text-foreground">{student.studentId}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <span className="text-sm text-white/50">Gender</span>
                  <span className="text-sm font-medium text-foreground">{student.gender}</span>
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
            <h3 className="text-base font-semibold text-foreground mb-4">Education Profile</h3>
            <div className="space-y-3">
              {[
                { course: 'SIT30816', name: 'Commercial Cookery Certificate III', date: '2025-2026', location: 'Sydney', type: 'VET' },
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

        <div className="space-y-5">
          <Card className="p-5 border-border/70">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-foreground">Student ID</h3>
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

          <Card className="p-5 border-border/70">
            <h3 className="text-base font-semibold text-foreground mb-3">Outline of Course</h3>
            <div className="space-y-3">
              {[
                { label: 'Duration', value: '12 months', icon: Clock, color: 'bg-indigo-500/10 text-indigo-400' },
                { label: 'Students', value: '52', icon: Users, color: 'bg-emerald-500/10 text-emerald-400' },
                { label: 'Contact', value: 'Online / On-campus', icon: MapPin, color: 'bg-amber-500/10 text-amber-400' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <div className={`w-8 h-8 rounded-lg ${s.color} flex items-center justify-center shrink-0`}>
                    <s.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{s.value}</span>
                </div>
              ))}
            </div>
          </Card>

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
    </div>
  );
}

function formatCurrency(n: number) {
  return '$' + Math.round(n).toLocaleString('en-AU');
}
