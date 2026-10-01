'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function AdminFraudFlagsPage() {
  const [flags, setFlags] = useState([
    {
      id: 'ff_1',
      user: 'Anonymous Client Account #8391',
      flagType: 'payment_bypass_attempt',
      riskLevel: 'high' as const,
      description: 'Chat message flagged by MessageSafetyFilter for external payment solicitation: "Can we handle the remaining $3,000 via PayPal wire?"',
      detectedAt: '1 hour ago',
      resolved: false,
    },
    {
      id: 'ff_2',
      user: 'Candidate Profile #2910',
      flagType: 'fake_experience_alert',
      riskLevel: 'critical' as const,
      description: 'Duplicate employment history certificate detected matching previously rejected applicant hash.',
      detectedAt: '4 hours ago',
      resolved: false,
    }
  ]);

  const handleResolve = (id: string) => {
    setFlags((prev) =>
      prev.map((f) => (f.id === id ? { ...f, resolved: true } : f))
    );
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-primary">Fraud & Safety Sentinel</h1>
        <p className="text-xs text-slate-500 mt-1">
          Automated threat detection, payment bypass monitoring, duplicate credential alerts, and credential phishing defense.
        </p>
      </div>

      <div className="space-y-4">
        {flags.map((f) => (
          <Card key={f.id} className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-primary text-base">{f.user}</h3>
                  <Badge variant={f.riskLevel === 'critical' ? 'error' : 'warning'} size="sm">
                    {f.riskLevel.toUpperCase()} RISK
                  </Badge>
                  <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {f.flagType}
                  </span>
                </div>
                <span className="text-xs text-slate-400">Triggered {f.detectedAt}</span>
              </div>
              {f.resolved ? (
                <Badge variant="success">✓ Resolved</Badge>
              ) : (
                <Badge variant="error">Active Alert</Badge>
              )}
            </div>

            <p className="text-xs text-slate-700 bg-rose-50/50 border border-rose-100 p-3 rounded-lg mb-4 leading-relaxed">
              {f.description}
            </p>

            {!f.resolved && (
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <Button variant="danger" size="sm">
                  Suspend User Account
                </Button>
                <Button size="sm" onClick={() => handleResolve(f.id)}>
                  Dismiss / Mark Resolved
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
