import React, { useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { FileText, Upload, CheckCircle2, Clock } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

const INITIAL_STUDENT_DOCS = [
  {
    id: 'SD-01',
    student: 'Mateo Silva',
    docType: 'Passport Bio Page & Colombian National ID',
    file: 'Mateo_Silva_Passport_2026.pdf',
    status: 'Verified',
    updated: '2 hours ago',
  },
  {
    id: 'SD-02',
    student: 'Mateo Silva',
    docType: 'Genuine Student (GST / GTE) Statement',
    file: 'Mateo_Silva_GS_Statement_Signed.pdf',
    status: 'Verified',
    updated: '1 day ago',
  },
  {
    id: 'SD-03',
    student: 'Yuki Tanaka',
    docType: 'IELTS Academic 6.5 Certificate',
    file: 'Yuki_Tanaka_IELTS_TRF.pdf',
    status: 'Pending Review',
    updated: '3 hours ago',
  },
];

export default function AgentDocumentsPage() {
  const { toast } = useToast();
  const [docs, setDocs] = useState(INITIAL_STUDENT_DOCS);

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge variant="info">Subclass 500 Visa Checklist</Badge>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Student Visa & Admissions Document Vault
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Upload student passports, English test scores, OSHC policies, and Genuine Student statements.
            </p>
          </div>
          <Button
            onClick={() => {
              setDocs([
                {
                  id: `SD-0${docs.length + 1}`,
                  student: 'Camila Rojas',
                  docType: 'Passport & OSHC Policy Certificate',
                  file: 'Camila_Rojas_OSHC_Bupa.pdf',
                  status: 'Verified',
                  updated: 'Just now',
                },
                ...docs,
              ]);
              toast('Student document uploaded and shared with Provider Admissions', 'success');
            }}
          >
            <Upload className="w-4 h-4" />
            Upload Student Document
          </Button>
        </div>

        <Card className="p-0 overflow-hidden">
          <div className="divide-y divide-slate-100">
            {docs.map((d) => (
              <div
                key={d.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{d.file}</h3>
                      <Badge variant={d.status === 'Verified' ? 'success' : 'warning'}>
                        {d.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Student: <strong>{d.student}</strong> • {d.docType}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Uploaded {d.updated}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
