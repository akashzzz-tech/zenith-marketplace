'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';

interface MilestoneItem {
  id: string;
  title: string;
  amountCents: number;
  status: 'pending' | 'submitted' | 'approved' | 'disputed' | 'cancelled';
  paymentState: string;
  deliverableNotes: string | null;
}

export default function ClientContractDetailPage() {
  const [milestones, setMilestones] = useState<MilestoneItem[]>([
    {
      id: 'm1',
      title: 'Geotechnical Soil-Structure Model Review',
      amountCents: 150000,
      status: 'approved',
      paymentState: 'PAID_OUT',
      deliverableNotes: 'Calculations report and site verification memorandum attached.',
    },
    {
      id: 'm2',
      title: 'Nonlinear Dynamic Model Cross-Verification',
      amountCents: 200000,
      status: 'submitted',
      paymentState: 'FUNDS_HELD_IN_ESCROW',
      deliverableNotes: 'Completed ETABS verification files and response spectrum curves uploaded.',
    },
    {
      id: 'm3',
      title: 'Final Structural Review Memorandum & Sign-off',
      amountCents: 150000,
      status: 'pending',
      paymentState: 'AWAITING_FUNDING',
      deliverableNotes: null,
    },
  ]);

  const [approvedSuccess, setApprovedSuccess] = useState(false);
  const [disputeModal, setDisputeModal] = useState(false);

  const handleApproveAndRelease = (milestoneId: string) => {
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === milestoneId ? { ...m, status: 'approved' as const, paymentState: 'PAID_OUT' } : m
      )
    );
    setApprovedSuccess(true);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-black">Contract #ZEN-C8492</h1>
            <Badge variant="success">Active Contract</Badge>
          </div>
          <p className="text-xs text-black/60">
            Professional: <strong>Dr. Arthur Vance (Retired Chief Engineer)</strong> • Total Escrow: {formatCurrency(500000)}
          </p>
        </div>
        <Link
          href="/client/messages?recipient=pro_vance"
          className="bg-white border border-black/10 text-black text-xs font-semibold px-4 py-2 rounded-lg hover:border-cobaltDeep hover:text-cobaltDeep transition-all"
        >
          Open Project Messages
        </Link>
      </div>

      {approvedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
          ✓ Milestone 2 approved! Funds released from escrow to Dr. Arthur Vance. Double-entry ledger records finalized.
        </div>
      )}

      {disputeModal && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex justify-between items-center">
          <span>Dispute arbitration notice initiated with platform compliance. An admin will review evidence.</span>
          <button onClick={() => setDisputeModal(false)} className="underline font-semibold ml-2">Dismiss</button>
        </div>
      )}

      <Card className="p-6 border-black/10">
        <h3 className="font-bold text-black text-base mb-4">Milestone Escrow Workflow</h3>

        <div className="space-y-4">
          {milestones.map((m, idx) => (
            <div key={m.id} className="p-4 rounded-xl border border-black/10 bg-black/[0.02] space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-black text-sm">Milestone {idx + 1}: {m.title}</span>
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
                  <span className="text-xs text-black/50 mt-0.5 block">
                    Escrow State: <strong>{m.paymentState}</strong>
                  </span>
                </div>
                <span className="text-sm font-bold text-emerald-700">{formatCurrency(m.amountCents)}</span>
              </div>

              {m.deliverableNotes && (
                <div className="p-3 bg-white border border-black/10 rounded-lg text-xs">
                  <span className="font-semibold text-black/80 block mb-0.5">Professional Deliverable Submission:</span>
                  <p className="text-black/60">{m.deliverableNotes}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-black/10">
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
