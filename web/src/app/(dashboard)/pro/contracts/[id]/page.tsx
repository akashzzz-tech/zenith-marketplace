'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { formatCurrency } from '@/lib/utils';

export default function ProContractDetailPage() {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const contract = {
    id: 'c1',
    title: 'Seismic Stability Review for High-Rise Commercial Foundation',
    clientName: 'Apex Urban Developments',
    totalAmountCents: 500000,
    currentMilestone: {
      id: 'm2',
      title: 'Milestone 2: Nonlinear Dynamic Model Cross-Verification',
      amountCents: 200000,
      escrowState: 'FUNDS_HELD_IN_ESCROW',
      deadline: 'In 4 days',
    }
  };

  const handleSubmitDeliverable = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setIsSubmitModalOpen(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">{contract.title}</h1>
          <p className="text-xs text-slate-500 mt-1">
            Client: <strong>{contract.clientName}</strong> • Contract Value: {formatCurrency(contract.totalAmountCents)}
          </p>
        </div>
        <Badge variant="success">Active Engagement</Badge>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary">Current Milestone In Progress</Badge>
          <span className="text-xs text-slate-400 font-medium">Due {contract.currentMilestone.deadline}</span>
        </div>

        <h3 className="font-bold text-primary text-base mb-1">{contract.currentMilestone.title}</h3>
        <p className="text-xs text-slate-600 mb-4">
          Escrow Status: <strong className="text-emerald-700">Funds Verified in Escrow ({formatCurrency(contract.currentMilestone.amountCents)})</strong>
        </p>

        <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl text-xs text-emerald-900 mb-6">
          <strong>Escrow Guarantee:</strong> Client funds are secured in non-custodial milestone hold. Once you submit and the client signs off, payout is automatically disbursed.
        </div>

        <div className="flex justify-end">
          <Button onClick={() => setIsSubmitModalOpen(true)}>
            Submit Milestone Deliverable & Notes →
          </Button>
        </div>
      </Card>

      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Submit Milestone Deliverables"
        description="Provide links, files, or notes detailing the completed technical deliverable."
      >
        {submitted ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl text-center">
            ✓ Deliverable submitted to client for inspection!
          </div>
        ) : (
          <form onSubmit={handleSubmitDeliverable} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Deliverable Notes & Summary
              </label>
              <textarea
                value={submissionNotes}
                onChange={(e) => setSubmissionNotes(e.target.value)}
                rows={5}
                placeholder="Explain the work completed, findings, attached files, or calculation summaries..."
                className="w-full border border-slate-300 rounded-lg p-2.5 text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Attach Files (PDF, ZIP, CAD - Max 50MB)
              </label>
              <input type="file" className="w-full border border-slate-300 rounded-lg p-2 text-xs" />
            </div>

            <Button type="submit" className="w-full">
              Submit for Client Review & Sign-Off
            </Button>
          </form>
        )}
      </Modal>
    </div>
  );
}
