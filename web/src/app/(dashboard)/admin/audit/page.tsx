'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';

export default function AdminAuditLogsPage() {
  const auditLogs = [
    {
      id: 'aud_1',
      timestamp: '2026-10-01 14:32:10',
      actor: 'super_admin@zenith.work',
      action: 'APPROVE_VERIFICATION',
      resource: 'professional_profiles/pro_vance',
      ip: '192.168.1.104',
      details: 'Approved Dr. Arthur Vance under Route A (Retired Professional). Verified Bechtel tenure docs.',
    },
    {
      id: 'aud_2',
      timestamp: '2026-10-01 11:20:45',
      actor: 'system_escrow_worker',
      action: 'RELEASE_ESCROW_PAYOUT',
      resource: 'milestones/m_8492',
      ip: 'internal_worker',
      details: 'Executed payout transfer of $2,000.00 following client milestone approval. Double-entry ledger journal balanced.',
    },
    {
      id: 'aud_3',
      timestamp: '2026-09-30 16:15:02',
      actor: 'compliance_admin@zenith.work',
      action: 'PROJECT_MODERATION_PUBLISH',
      resource: 'projects/p_8492',
      ip: '192.168.1.108',
      details: 'Approved client project "Seismic Stability Review for High-Rise Foundation". NDA requirement verified.',
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-primary">Immutable System Audit Trail</h1>
        <p className="text-xs text-slate-500 mt-1">
          Cryptographically auditable record of all administrative rulings, credential verifications, and financial events.
        </p>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="pb-2">Timestamp</th>
                <th className="pb-2">Actor</th>
                <th className="pb-2">Action</th>
                <th className="pb-2">Resource</th>
                <th className="pb-2">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-2.5 text-slate-400 font-mono text-[11px] whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-2.5 font-bold text-slate-700 whitespace-nowrap">{log.actor}</td>
                  <td className="py-2.5 font-mono text-primary font-semibold whitespace-nowrap">{log.action}</td>
                  <td className="py-2.5 text-slate-500 font-mono text-[11px] whitespace-nowrap">{log.resource}</td>
                  <td className="py-2.5 text-slate-600 leading-normal">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
