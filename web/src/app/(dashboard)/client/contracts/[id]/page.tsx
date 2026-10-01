'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';

export default function ClientContractDetailPage() {
  const [milestones, setMilestones] = useState([
    {
      id: 'm1',
      title: 'Geotechnical Soil-Structure Model Review',
      amountCents: 150000,
      status: 'approved' as const,
      paymentState: 'PAID_OUT',
      deliverableNotes: 'Calculations report and site verification memorandum attached.',
    },
    {
      id: 'm2',
      title: 'Nonlinear Dynamic Model Cross-Verification',
      amountCents: 200000,
      status: 'submitted' as const, // Ready for client inspection & sign-off
      paymentState: 'FUNDS_HELD_IN_ESCROW',
      deliverableNotes: 'Completed ETABS verification files and response spectrum curves uploaded.',
    },
    {
      id: 'm3',
      title: 'Final Structural Review Memorandum & Sign-off',
      amountCents: 150000,
      status: 'pending' as const,
      paymentState: 'AWAITING_FUNDING',
      deliverableNotes: null,
    },
  ]);

  const [approvedSuccess, setApprovedSuccess] = useState(false);
  const [disputeModal, setDisputeModal] = useState(false);

  const handleApproveAndRelease = (milestoneId: string) => {
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === milestoneId ? { ...m, status: 'approved', paymentState: 'PAID_OUT' } : m
      )
    );
    setApprovedSuccess(true);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-primary">Contract #ZEN-C8492</h1>
            <Badge variant="success">Active Contract</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Professional: <strong>Dr. Arthur Vance (Retired Chief Engineer)</strong> • Total Escrow: {formatCurrency(500000)}
          </p>
        </div>
        <Link
          href="/client/messages?recipient=pro_vance"
          className="bg-white border border-slate-300 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg hover:bg-slate-50"
        >
          Open Project Messages
        </Link>
      </div>

      {approvedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
          ✓ Milestone 2 approved! Funds released from escrow to Dr. Arthur Vance. Double-entry ledger records finalized.
        </div>
      )}

      <Card className="p-6">
        <h3 className="font-bold text-primary text-base mb-4">Milestone Escrow Workflow</h3>

        <div className="space-y-4">
          {milestones.map((m, idx) => (
            <div key={m.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary text-sm">Milestone {idx + 1}: {m.title}</span>
                    <Badge
                      variant={
                        m.status === 'approved'
                          ? 'success'
                          : m.status === 'submitted'
                          ? 'warning'
                          : 'outline'
                      }
                      size="sm"
                    >
                      {m.status.toUpperCase()}
                    </Badge>
                  </div>
                  <span className="text-xs text-slate-500 mt-0.5 block">
                    Escrow State: <strong>{m.paymentState}</strong>
                  </span>
                </div>
                <span className="text-sm font-bold text-emerald-700">{formatCurrency(m.amountCents)}</span>
              </div>

              {m.deliverableNotes && (
                <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs">
                  <span className="font-semibold text-slate-700 block mb-0.5">Professional Deliverable Submission:</span>
                  <p className="text-slate-600">{m.deliverableNotes}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/60">
                {m.status === 'submitted' && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDisputeModal(true)}
                    >
                      Request Revision / Raise Dispute
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleApproveAndRelease(m.id)}
                    >
                      Approve Deliverable & Release {formatCurrency(m.amountCents)}
                    </Button>
                  </>
                )}

                {m.status === 'pending' && (
                  <Button size="sm" variant="secondary">
                    Deposit Escrow Funds ({formatCurrency(m.amountCents)})
                  </Button>
                )}

                {m.status === 'approved' && (
                  <span className="text-xs text-emerald-700 font-semibold">
                    ✓ Completed & Disbursed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
