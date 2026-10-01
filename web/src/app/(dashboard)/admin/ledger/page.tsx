'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';

export default function AdminLedgerPage() {
  const ledgerEntries = [
    {
      id: 'tx_01',
      date: '2026-09-29 14:15:00',
      account: 'CLIENT_CASH',
      debitCents: 517500,
      creditCents: 0,
      description: 'Client funded milestone escrow + 3.5% service fee ($175)',
    },
    {
      id: 'tx_02',
      date: '2026-09-29 14:15:00',
      account: 'ESCROW_HOLD',
      debitCents: 0,
      creditCents: 500000,
      description: 'Held in non-custodial milestone escrow',
    },
    {
      id: 'tx_03',
      date: '2026-09-29 14:15:00',
      account: 'PLATFORM_FEE_REVENUE',
      debitCents: 0,
      creditCents: 17500,
      description: 'ZENITH Client Service Fee (3.5%)',
    },
    {
      id: 'tx_04',
      date: '2026-10-01 09:30:00',
      account: 'ESCROW_HOLD',
      debitCents: 150000,
      creditCents: 0,
      description: 'Milestone 1 release upon client approval',
    },
    {
      id: 'tx_05',
      date: '2026-10-01 09:30:00',
      account: 'PRO_PAYOUT',
      debitCents: 0,
      creditCents: 138000,
      description: 'Net professional payout (after 8% platform fee)',
    },
    {
      id: 'tx_06',
      date: '2026-10-01 09:30:00',
      account: 'PLATFORM_FEE_REVENUE',
      debitCents: 0,
      creditCents: 12000,
      description: 'ZENITH Professional Intermediary Fee (8%)',
    }
  ];

  const totalDebits = ledgerEntries.reduce((s, e) => s + e.debitCents, 0);
  const totalCredits = ledgerEntries.reduce((s, e) => s + e.creditCents, 0);
  const isBalanced = totalDebits === totalCredits;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Immutable Financial Ledger</h1>
          <p className="text-xs text-slate-500 mt-1">
            Double-entry accounting records with zero floating-point arithmetic. Permanent audit trail.
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
          isBalanced ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
        }`}>
          {isBalanced ? '✓ LEDGER BALANCED' : '✕ BALANCING ERROR'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-slate-50">
          <span className="text-xs text-slate-500 block mb-1">Total Journal Debits</span>
          <span className="text-xl font-black text-slate-800">{formatCurrency(totalDebits)}</span>
        </Card>
        <Card className="p-4 bg-slate-50">
          <span className="text-xs text-slate-500 block mb-1">Total Journal Credits</span>
          <span className="text-xl font-black text-slate-800">{formatCurrency(totalCredits)}</span>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-bold text-primary text-sm mb-3">Journal Entries (Append-Only)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="pb-2">Timestamp</th>
                <th className="pb-2">Account</th>
                <th className="pb-2 text-right">Debit ($)</th>
                <th className="pb-2 text-right">Credit ($)</th>
                <th className="pb-2 pl-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ledgerEntries.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50">
                  <td className="py-2.5 text-slate-400 font-mono text-[11px]">{e.date}</td>
                  <td className="py-2.5 font-bold text-slate-700">{e.account}</td>
                  <td className="py-2.5 text-right font-mono font-semibold text-emerald-700">
                    {e.debitCents > 0 ? formatCurrency(e.debitCents) : '-'}
                  </td>
                  <td className="py-2.5 text-right font-mono font-semibold text-primary">
                    {e.creditCents > 0 ? formatCurrency(e.creditCents) : '-'}
                  </td>
                  <td className="py-2.5 pl-4 text-slate-600">{e.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
