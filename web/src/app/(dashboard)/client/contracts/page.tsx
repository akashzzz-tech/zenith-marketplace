'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';

export default function ClientContractsPage() {
  const contracts = [
    {
      id: 'c1',
      title: 'Seismic Dynamics & Deep Foundation Review',
      professionalName: 'Dr. Arthur Vance (Retired Chief Engineer)',
      totalAmountCents: 500000,
      status: 'active' as const,
      activeMilestone: 'Milestone 2: Nonlinear Dynamic Cross-Verification',
      activeMilestoneAmount: 200000,
      escrowState: 'FUNDS_HELD_IN_ESCROW',
      deadline: 'In 4 days',
    },
    {
      id: 'c2',
      title: 'Distributed Event-Driven Ledger Architecture',
      professionalName: 'Elena Rostova (14 YOE)',
      totalAmountCents: 850000,
      status: 'completed' as const,
      activeMilestone: 'All 3 Milestones Delivered & Approved',
      activeMilestoneAmount: 0,
      escrowState: 'DISBURSED',
      deadline: 'Completed Sep 15',
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Contracts & Escrow Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track funded milestones, deliverable submissions, and authorized payout releases.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {contracts.map((c) => (
          <Card key={c.id} className="p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-primary text-base">
                    <Link href={`/client/contracts/${c.id}`}>{c.title}</Link>
                  </h3>
                  <Badge variant={c.status === 'active' ? 'success' : 'default'} size="sm">
                    {c.status.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600">With {c.professionalName}</p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 block">Total Contract Value</span>
                <span className="text-lg font-black text-emerald-700">{formatCurrency(c.totalAmountCents)}</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs mb-4">
              <div>
                <span className="font-semibold text-slate-800 block">{c.activeMilestone}</span>
                <span className="text-slate-500">Status: {c.escrowState}</span>
              </div>
              <span className="text-slate-500 font-medium">{c.deadline}</span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Link
                href={`/client/contracts/${c.id}`}
                className="bg-primary text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-primary/90"
              >
                Manage Milestones & Escrow →
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
