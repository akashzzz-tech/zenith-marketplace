import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDate } from '@/lib/utils';

export interface ProjectCardProps {
  id: string;
  title: string;
  companyName: string;
  category: string;
  industry: string;
  minYearsExperience: number;
  budgetMinCents: number;
  budgetMaxCents: number;
  isHourly: boolean;
  expectedDuration: string;
  deadline?: string | null;
  requiredSkills: string[];
  proposalCount?: number;
}

export function ProjectCard({
  id,
  title,
  companyName,
  category,
  minYearsExperience,
  budgetMinCents,
  budgetMaxCents,
  isHourly,
  expectedDuration,
  deadline,
  requiredSkills,
  proposalCount = 0,
}: ProjectCardProps) {
  return (
    <Card className="flex flex-col justify-between hover:border-primary/40 transition-all">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge variant="outline" size="sm">{category}</Badge>
          <span className="text-xs text-slate-400">
            {proposalCount} {proposalCount === 1 ? 'applicant' : 'applicants'}
          </span>
        </div>

        <h4 className="font-bold text-primary text-lg mb-1 leading-snug hover:text-secondary transition-colors">
          <Link href={`/projects/${id}`}>{title}</Link>
        </h4>
        <p className="text-xs text-slate-500 mb-3">By {companyName}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <Badge variant="secondary" size="sm">
            Requires {minYearsExperience}+ YOE or Retired
          </Badge>
          <Badge variant="default" size="sm">⏱ {expectedDuration}</Badge>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {requiredSkills.slice(0, 5).map((skill, i) => (
            <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-500 block">
            {isHourly ? 'Hourly Budget' : 'Fixed Milestone Budget'}
          </span>
          <span className="text-sm font-bold text-emerald-700">
            {formatCurrency(budgetMinCents)} – {formatCurrency(budgetMaxCents)}
            {isHourly ? '/hr' : ''}
          </span>
        </div>
        <Link
          href={`/projects/${id}`}
          className="text-xs font-semibold bg-secondary text-primary hover:bg-secondary/90 px-3.5 py-1.5 rounded-lg transition-colors font-semibold"
        >
          View & Apply
        </Link>
      </div>
    </Card>
  );
}
