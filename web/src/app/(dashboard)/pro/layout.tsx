import React from 'react';
import { Sidebar, type NavItem } from '@/components/layout/Sidebar';

export default function ProDashboardLayout({ children }: { children: React.ReactNode }) {
  const navItems: NavItem[] = [
    { label: 'Overview', href: '/pro', icon: '📊' },
    { label: 'Explore Projects', href: '/projects', icon: '🔍' },
    { label: 'My Applications', href: '/pro/applications', icon: '📄', badge: 2 },
    { label: 'Invitations', href: '/pro/invitations', icon: '✉️', badge: 1 },
    { label: 'Active Contracts', href: '/pro/contracts', icon: '💼', badge: 1 },
    { label: 'Earnings & Payouts', href: '/pro/earnings', icon: '💳' },
    { label: 'Messages', href: '/pro/messages', icon: '💬' },
    { label: 'Verification & Profile', href: '/pro/profile', icon: '🛡️' },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar items={navItems} userRoleTitle="Professional Portal" />
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        {children}
      </main>
    </div>
  );
}
