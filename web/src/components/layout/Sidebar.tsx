'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string | number;
}

interface SidebarProps {
  items: NavItem[];
  userRoleTitle: string;
}

export function Sidebar({ items, userRoleTitle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen p-5 flex flex-col justify-between">
      <div>
        <div className="mb-6">
          <Link href="/" className="text-2xl font-black text-primary tracking-tight">
            ZENITH
          </Link>
          <span className="block text-[11px] font-semibold text-secondary uppercase tracking-wider mt-0.5">
            {userRoleTitle}
          </span>
        </div>

        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-primary"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full font-semibold",
                      isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <Link
          href="/"
          className="text-xs text-slate-500 hover:text-primary flex items-center gap-1.5 transition-colors"
        >
          <span>←</span> Back to Public Site
        </Link>
      </div>
    </aside>
  );
}
