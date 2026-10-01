'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState([
    {
      id: 'disp_101',
      contractId: 'ZEN-C8492',
      title: 'Disputed Foundation Calculations Sign-off',
      client: 'Apex Urban Developments',
      professional: 'Dr. Arthur Vance (Retired)',
      amountCents: 200000,
      reason: 'Client requested out-of-scope soil borings re-analysis without milestone adjustment.',
      status: 'under_review' as 'under_review' | 'resolved_split' | 'resolved_payout',
      evidenceItems: ['initial_scope_agreement.pdf', 'chat_transcripts_sep28.log', 'etabs_models.zip'],
    }
  ]);

  const handleResolve = (id: string, resolution: 'resolved_split' | 'resolved_payout') => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: resolution } : d))
    );
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-primary">Dispute Arbitration Vault</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review evidence, communication logs, and initial contracts to issue binding rulings and ledger adjustments.
        </p>
      </div>

      <div className="space-y-4">
        {disputes.map((d) => (
          <Card key={d.id} className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-primary text-base">{d.title}</h3>
                  <Badge variant="warning">{d.status.toUpperCase()}</Badge>
                </div>
                <span className="text-xs text-slate-500">
                  Contract #{d.contractId} • Disputed Escrow Amount: <strong>{formatCurrency(d.amountCents)}</strong>
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 mb-4 leading-relaxed">
              <strong>Dispute Narrative:</strong> {d.reason}
            </p>

            <div className="mb-4">
              <span className="text-xs font-bold text-slate-700 block mb-1">Arbitration Evidence Vault:</span>
              <div className="flex flex-wrap gap-2 text-xs">
                {d.evidenceItems.map((e, idx) => (
                  <span key={idx} className="bg-white border border-slate-300 px-2.5 py-1 rounded text-slate-600 font-mono">
                    📁 {e}
                  </span>
                ))}
              </div>
            </div>

            {d.status === 'under_review' ? (
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleResolve(d.id, 'resolved_split')}
                >
                  Arbitrate 50/50 Split ($1,000 Refund / $1,000 Payout)
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleResolve(d.id, 'resolved_payout')}
                >
                  Rule in Favor of Professional (Release Full Escrow)
                </Button>
              </div>
            ) : (
              <div className="pt-2 border-t border-slate-100 text-xs font-bold text-emerald-700">
                ✓ Ruling executed and updated in immutable financial ledger.
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
