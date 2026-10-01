import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { MatchScoreBreakdown } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(cents: number, currency: string = 'USD'): string {
  const amount = Math.floor(cents) / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(d);
}

export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(d);
}

export function getInitials(name: string): string {
  if (!name) return 'ZP';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function generateMatchScore(
  pro: {
    skills: string[];
    yearsOfExperience: number;
    isRetired: boolean;
    industry: string;
    timeZone: string;
    hourlyRateCents: number;
  },
  project: {
    requiredSkills: string[];
    minYearsExperience: number;
    industry: string;
    timeZone?: string;
    budgetMaxCents: number;
    isHourly: boolean;
  }
): MatchScoreBreakdown {
  const reasons: string[] = [];
  
  // 1. Skills match (35%)
  const matchedSkills = pro.skills.filter(s =>
    project.requiredSkills.some(rs => rs.toLowerCase() === s.toLowerCase())
  );
  const skillRatio = project.requiredSkills.length > 0
    ? matchedSkills.length / project.requiredSkills.length
    : 1;
  const skillScore = Math.round(skillRatio * 35);
  if (matchedSkills.length > 0) {
    reasons.push(`${matchedSkills.length} matching core skills (${matchedSkills.slice(0, 3).join(', ')})`);
  }

  // 2. Experience match (25%)
  let expScore = 0;
  if (pro.isRetired) {
    expScore = 25;
    reasons.push("Retired veteran with career mastery");
  } else if (pro.yearsOfExperience >= project.minYearsExperience) {
    expScore = 25;
    reasons.push(`${pro.yearsOfExperience}+ years experience exceeds required ${project.minYearsExperience} yrs`);
  } else {
    expScore = Math.round((pro.yearsOfExperience / project.minYearsExperience) * 20);
  }

  // 3. Industry fit (15%)
  let indScore = 0;
  if (pro.industry.toLowerCase() === project.industry.toLowerCase()) {
    indScore = 15;
    reasons.push(`Direct ${pro.industry} sector background`);
  } else {
    indScore = 7;
  }

  // 4. Time zone alignment (15%)
  let tzScore = 12; // default reasonable overlap
  if (project.timeZone && pro.timeZone.toLowerCase() === project.timeZone.toLowerCase()) {
    tzScore = 15;
    reasons.push("Direct timezone match");
  } else {
    reasons.push("Available during required remote hours");
  }

  // 5. Rate / Budget fit (10%)
  let rateScore = 10;
  if (project.isHourly && pro.hourlyRateCents > project.budgetMaxCents) {
    rateScore = Math.max(0, Math.round(10 - ((pro.hourlyRateCents - project.budgetMaxCents) / project.budgetMaxCents) * 10));
  } else {
    reasons.push("Rate fits within budgeted range");
  }

  const total = Math.min(100, skillScore + expScore + indScore + tzScore + rateScore);

  return {
    skills: skillScore,
    experience: expScore,
    industry: indScore,
    timezone: tzScore,
    rate: rateScore,
    total,
    reasons,
  };
}
