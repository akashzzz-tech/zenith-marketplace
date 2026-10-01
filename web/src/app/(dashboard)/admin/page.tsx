'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Marketplace Administration</h1>
          <p className="text-slate-500 text-sm">Real-time verification queues, ledger integrity, and dispute arbitration.</p>
        </div>
        <Badge variant="secondary" size="md">Super Admin Session</Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 border-amber-200 bg-amber-50/20">
          <span className="text-xs text-amber-800 font-semibold block mb-1">Pending Verifications</span>
          <span className="text-2xl font-black text-amber-900">3</span>
        </Card>
        <Card className="p-4 border-blue-200 bg-blue-50/20">
          <span className="text-xs text-blue-800 font-semibold block mb-1">Projects Pending Review</span>
          <span className="text-2xl font-black text-blue-900">2</span>
        </Card>
        <Card className="p-4 border-emerald-200 bg-emerald-50/20">
          <span className="text-xs text-emerald-800 font-semibold block mb-1">Total Escrow Volume</span>
          <span className="text-2xl font-black text-emerald-700">{formatCurrency(14500000)}</span>
        </Card>
        <Card className="p-4 border-rose-200 bg-rose-50/20">
          <span className="text-xs text-rose-800 font-semibold block mb-1">Active Disputes</span>
          <span className="text-2xl font-black text-rose-900">0</span>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-primary text-base">Quick Action Queues</h3>
          <Link href="/admin/verification" className="text-xs font-semibold text-secondary hover:underline">
            View All Pending Verifications →
          </Link>
        </div>
        <div className="space-y-3">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 text-sm block">Dr. Arthur Vance (Route A: Retired Professional)</span>
              <span className="text-xs text-slate-500">Submitted Bechtel VP tenure proof & PE license • 32 YOE</span>
            </div>
            <Link
              href="/admin/verification"
              className="bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-primary/90"
            >
              Review Dossier
            </Link>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 text-sm block">Elena Rostova (Route B: 5+ YOE)</span>
              <span className="text-xs text-slate-500">Submitted Siemens Distributed Systems Lead tenure records • 14 YOE</span>
            </div>
            <Link
              href="/admin/verification"
              className="bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-primary/90"
            >
              Review Dossier
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
