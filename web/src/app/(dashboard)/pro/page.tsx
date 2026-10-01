'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { VerificationStatusBadge } from '@/components/verification/VerificationStatus';
import { formatCurrency } from '@/lib/utils';

export default function ProDashboardPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Professional Dashboard</h1>
          <p className="text-slate-500 text-sm">Welcome back. Review contract milestones and project invitations.</p>
        </div>
        <div className="flex items-center gap-2">
          <VerificationStatusBadge status="verified" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <span className="text-xs text-slate-500 block mb-1">Active Contracts</span>
          <span className="text-2xl font-black text-primary">1</span>
        </Card>
        <Card className="p-4">
          <span className="text-xs text-slate-500 block mb-1">Open Proposals</span>
          <span className="text-2xl font-black text-primary">2</span>
        </Card>
        <Card className="p-4">
          <span className="text-xs text-slate-500 block mb-1">Pending Invitations</span>
          <span className="text-2xl font-black text-secondary">1</span>
        </Card>
        <Card className="p-4">
          <span className="text-xs text-slate-500 block mb-1">Total Earned</span>
          <span className="text-2xl font-black text-emerald-700">{formatCurrency(450000)}</span>
        </Card>
      </div>

      {/* Active Milestone Card */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <Badge variant="default" size="sm">Current Active Milestone</Badge>
          <span className="text-xs text-slate-400">Due in 5 days</span>
        </div>
        <h3 className="font-bold text-primary text-base mb-1">
          Milestone 2: Thermal Dissipation Prototype Modeling
        </h3>
        <p className="text-xs text-slate-600 mb-4">
          Contract with AeroTurbine Corp — Escrow Funded: <strong>{formatCurrency(220000)}</strong>
        </p>
        <div className="flex justify-between items-center pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-500">Status: In Progress</span>
          <button className="bg-primary text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-primary/90">
            Submit Deliverable
          </button>
        </div>
      </Card>
    </div>
  );
}
