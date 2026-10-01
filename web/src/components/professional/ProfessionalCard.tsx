import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { VerificationStatusBadge } from '@/components/verification/VerificationStatus';
import { formatCurrency } from '@/lib/utils';
import type { VerificationStatus } from '@/types';

export interface ProfessionalCardProps {
  id: string;
  name: string;
  title: string;
  industry: string;
  yearsExperience: number;
  isRetired: boolean;
  country: string;
  hourlyRateCents: number;
  verificationStatus: VerificationStatus;
  topSkills: string[];
  bioSnippet?: string;
}

export function ProfessionalCard({
  id,
  name,
  title,
  industry,
  yearsExperience,
  isRetired,
  country,
  hourlyRateCents,
  verificationStatus,
  topSkills,
  bioSnippet,
}: ProfessionalCardProps) {
  return (
    <Card className="flex flex-col justify-between hover:border-secondary/40 transition-all">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <Avatar name={name} size="lg" />
            <div>
              <h4 className="font-bold text-primary text-base leading-tight hover:text-secondary transition-colors">
                <Link href={`/professionals/${id}`}>{name}</Link>
              </h4>
              <p className="text-xs text-accent font-medium mt-0.5">{title}</p>
              <p className="text-xs text-slate-500 mt-0.5">📍 {country}</p>
            </div>
          </div>
          <VerificationStatusBadge status={verificationStatus} size="sm" />
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {isRetired ? (
            <Badge variant="secondary" size="sm">
              🎖️ Retired Veteran
            </Badge>
          ) : (
            <Badge variant="default" size="sm">
              🏆 {yearsExperience}+ YOE
            </Badge>
          )}
          <Badge variant="outline" size="sm">{industry}</Badge>
        </div>

        {bioSnippet && (
          <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {bioSnippet}
          </p>
        )}

        <div className="flex flex-wrap gap-1 mb-4">
          {topSkills.slice(0, 4).map((skill, i) => (
            <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
              {skill}
            </span>
          ))}
          {topSkills.length > 4 && (
            <span className="text-[11px] text-slate-400 self-center">
              +{topSkills.length - 4} more
            </span>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-500 block">Rate</span>
          <span className="text-sm font-bold text-emerald-700">
            {formatCurrency(hourlyRateCents)}/hr
          </span>
        </div>
        <Link
          href={`/professionals/${id}`}
          className="text-xs font-semibold bg-primary text-white hover:bg-primary/90 px-3 py-1.5 rounded-lg transition-colors"
        >
          View Profile
        </Link>
      </div>
    </Card>
  );
}
