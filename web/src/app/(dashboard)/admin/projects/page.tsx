'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';

export default function AdminProjectModerationPage() {
  const [projects, setProjects] = useState([
    {
      id: 'p_mod_1',
      title: 'Structural Integrity Review for Subsea Pipeline',
      client: 'DeepOcean Infrastructure Ltd',
      category: 'Mechanical Engineering',
      minExp: 15,
      budgetCents: 1200000,
      submittedDate: '3 hours ago',
      status: 'pending_review' as 'pending_review' | 'published' | 'rejected',
      flaggedTerms: [],
    },
    {
      id: 'p_mod_2',
      title: 'Cloud Infrastructure Migration & Multi-Region Failover',
      client: 'ScaleNext SaaS',
      category: 'Software Engineering',
      minExp: 8,
      budgetCents: 750000,
      submittedDate: '6 hours ago',
      status: 'pending_review' as 'pending_review' | 'published' | 'rejected',
      flaggedTerms: [],
    }
  ]);

  const handleModeration = (id: string, newStatus: 'published' | 'rejected') => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-primary">Project Moderation Queue</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review new client project postings for legal compliance, appropriate technical scoping, and anti-fraud safety.
        </p>
      </div>

      <div className="space-y-4">
        {projects.map((p) => (
          <Card key={p.id} className="p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-primary text-base">{p.title}</h3>
                  <Badge variant="outline" size="sm">{p.category}</Badge>
                </div>
                <p className="text-xs text-slate-500">
                  Posted by <strong>{p.client}</strong> • Submitted {p.submittedDate}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs font-semibold text-slate-700">
                  <span>Required: {p.minExp}+ YOE or Retired</span>
                  <span>•</span>
                  <span>Budget: {formatCurrency(p.budgetCents)}</span>
                </div>
              </div>

              <div>
                {p.status === 'published' && <Badge variant="success">✓ Approved & Published</Badge>}
                {p.status === 'rejected' && <Badge variant="error">✕ Rejected</Badge>}
                {p.status === 'pending_review' && <Badge variant="warning">Awaiting Review</Badge>}
              </div>
            </div>

            {p.status === 'pending_review' && (
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleModeration(p.id, 'rejected')}
                >
                  Reject Project
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleModeration(p.id, 'published')}
                >
                  Approve & Publish to Board
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
