'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function AdminVerificationQueuePage() {
  const [candidates, setCandidates] = useState([
    {
      id: 'v1',
      name: 'Dr. Arthur Vance',
      email: 'a.vance@structural-dynamics.org',
      eligibilityRoute: 'Route A: Retired Professional',
      yearsExperience: 32,
      industry: 'Civil & Structural Engineering',
      specialization: 'Seismic Dynamics & Deep Foundations',
      documents: ['bechtel_executive_decree.pdf', 'pe_license_ncees.pdf'],
      submissionDate: '2 hours ago',
      status: 'pending' as 'pending' | 'verified' | 'rejected' | 'more_info',
    },
    {
      id: 'v2',
      name: 'Elena Rostova',
      email: 'elena.rostova@cloudarch.de',
      eligibilityRoute: 'Route B: 5+ Years Experience',
      yearsExperience: 14,
      industry: 'Software Engineering',
      specialization: 'High-Throughput Distributed Systems',
      documents: ['siemens_tenure_record.pdf', 'cns_kubernetes_cert.pdf'],
      submissionDate: '5 hours ago',
      status: 'pending' as 'pending' | 'verified' | 'rejected' | 'more_info',
    },
    {
      id: 'v3',
      name: 'Marcus Brody',
      email: 'm.brody@gmail.com',
      eligibilityRoute: 'Route B: 5+ Years Experience',
      yearsExperience: 2, // Ineligible under 5 YOE rule!
      industry: 'Software Engineering',
      specialization: 'Junior Web Dev',
      documents: ['university_diploma_2024.pdf'],
      submissionDate: '1 day ago',
      status: 'pending' as 'pending' | 'verified' | 'rejected' | 'more_info',
    }
  ]);

  const handleAction = (id: string, newStatus: 'verified' | 'rejected' | 'more_info') => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-primary">Professional Verification Queue</h1>
        <p className="text-xs text-slate-500 mt-1">
          Evaluate submitted career evidence against Route A (Retired) and Route B (5+ YOE) rules. Private documents must never be made public.
        </p>
      </div>

      <div className="space-y-4">
        {candidates.map((c) => (
          <Card key={c.id} className="p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-primary text-base">{c.name}</h3>
                  <Badge variant={c.eligibilityRoute.includes('Route A') ? 'secondary' : 'default'} size="sm">
                    {c.eligibilityRoute}
                  </Badge>
                  {c.yearsExperience < 5 && !c.eligibilityRoute.includes('Route A') && (
                    <Badge variant="error" size="sm">⚠️ Under 5 YOE Barrier</Badge>
                  )}
                </div>
                <p className="text-xs text-slate-500">{c.email} • Submitted {c.submissionDate}</p>
                <p className="text-xs font-semibold text-slate-700 mt-1">
                  {c.specialization} ({c.industry}) — <strong>{c.yearsExperience} Years Total Tenure</strong>
                </p>
              </div>

              <div>
                {c.status === 'verified' && <Badge variant="success">✓ Approved & Verified</Badge>}
                {c.status === 'rejected' && <Badge variant="error">✕ Ineligible / Rejected</Badge>}
                {c.status === 'more_info' && <Badge variant="warning">⏳ More Info Requested</Badge>}
                {c.status === 'pending' && <Badge variant="outline">Awaiting Review</Badge>}
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mb-4 text-xs">
              <span className="font-bold text-slate-700 block mb-1">Attached Verification Evidence (Encrypted Vault):</span>
              <div className="flex flex-wrap gap-2">
                {c.documents.map((doc, idx) => (
                  <span key={idx} className="bg-white border border-slate-300 px-2.5 py-1 rounded text-slate-700 font-mono">
                    🔒 {doc}
                  </span>
                ))}
              </div>
            </div>

            {c.status === 'pending' && (
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAction(c.id, 'more_info')}
                >
                  Request More Evidence
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleAction(c.id, 'rejected')}
                >
                  Reject Application
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleAction(c.id, 'verified')}
                >
                  Approve & Issue Verified Badge
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
