import React from 'react';
import { Sidebar, type NavItem } from '@/components/layout/Sidebar';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const navItems: NavItem[] = [
    { label: 'Admin Overview', href: '/admin', icon: '🏛️' },
    { label: 'Verification Queue', href: '/admin/verification', icon: '🛡️', badge: 3 },
    { label: 'Project Moderation', href: '/admin/projects', icon: '📁', badge: 2 },
    { label: 'Financial Ledger', href: '/admin/ledger', icon: '💳' },
    { label: 'Dispute Arbitration', href: '/admin/disputes', icon: '⚖️' },
    { label: 'Fraud & Safety Flags', href: '/admin/fraud', icon: '🚩' },
    { label: 'Audit Logs', href: '/admin/audit', icon: '📜' },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar items={navItems} userRoleTitle="Admin Console (MFA Required)" />
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        {children}
      </main>
    </div>
  );
}
