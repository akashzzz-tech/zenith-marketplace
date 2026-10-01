'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';

export default function ClientDashboardPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Client Operations Dashboard</h1>
          <p className="text-slate-500 text-sm">Manage projects, review senior candidate proposals, and approve milestones.</p>
        </div>
        <Link
          href="/projects/new"
          className="bg-secondary text-primary font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-secondary/90 transition-all shadow-sm"
        >
          + Post a Remote Project
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <span className="text-xs text-slate-500 block mb-1">Active Projects</span>
          <span className="text-2xl font-black text-primary">2</span>
        </Card>
        <Card className="p-4">
          <span className="text-xs text-slate-500 block mb-1">Proposals to Review</span>
          <span className="text-2xl font-black text-secondary">4</span>
        </Card>
        <Card className="p-4">
          <span className="text-xs text-slate-500 block mb-1">Active Contracts</span>
          <span className="text-2xl font-black text-primary">1</span>
        </Card>
        <Card className="p-4">
          <span className="text-xs text-slate-500 block mb-1">Total Disbursed</span>
          <span className="text-2xl font-black text-emerald-700">{formatCurrency(680000)}</span>
        </Card>
      </div>

      <Card>
        <h3 className="font-bold text-primary text-base mb-3">Pending Deliverable Approval</h3>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="font-bold text-slate-800 text-sm block">Subsea Pressure Boundary Calculations</span>
            <span className="text-xs text-slate-500">Submitted by: Dr. Arthur Vance • Milestone Escrow: {formatCurrency(250000)}</span>
          </div>
          <div className="flex gap-2">
            <button className="bg-white border border-slate-300 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-100">
              Inspect Files
            </button>
            <button className="bg-emerald-600 text-white text-xs font-semibold px-4 py-1.5 rounded-lg hover:bg-emerald-700">
              Approve & Release Funds
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
