import React from 'react';
import { Sidebar, type NavItem } from '@/components/layout/Sidebar';

export default function ClientDashboardLayout({ children }: { children: React.ReactNode }) {
  const navItems: NavItem[] = [
    { label: 'Overview', href: '/client', icon: '📊' },
    { label: 'Post a Project', href: '/projects/new', icon: '➕' },
    { label: 'My Projects', href: '/client/projects', icon: '📁', badge: 3 },
    { label: 'Search Talent', href: '/professionals', icon: '🔍' },
    { label: 'Proposals Received', href: '/client/proposals', icon: '📥', badge: 4 },
    { label: 'Contracts & Escrow', href: '/client/contracts', icon: '💼', badge: 1 },
    { label: 'Messages', href: '/client/messages', icon: '💬' },
    { label: 'Company Profile', href: '/client/profile', icon: '🏢' },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar items={navItems} userRoleTitle="Client Portal" />
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        {children}
      </main>
    </div>
  );
}
