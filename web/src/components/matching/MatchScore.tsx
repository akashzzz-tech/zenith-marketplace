import React from 'react';
import type { MatchScoreBreakdown } from '@/types';

interface MatchScoreProps {
  breakdown: MatchScoreBreakdown;
  compact?: boolean;
}

export function MatchScore({ breakdown, compact = false }: MatchScoreProps) {
  const { total, reasons } = breakdown;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 60) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-accent bg-accent/10 border-accent/20';
  };

  return (
    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
          ZENITH Match Rationale
        </span>
        <span className={`text-sm font-bold px-2 py-0.5 rounded-full border ${getScoreColor(total)}`}>
          {total}% Match
        </span>
      </div>

      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-3">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            total >= 80 ? 'bg-emerald-500' : total >= 60 ? 'bg-amber-500' : 'bg-slate-400'
          }`}
          style={{ width: `${total}%` }}
        />
      </div>

      {!compact && reasons.length > 0 && (
        <div className="space-y-1 mt-2">
          {reasons.map((r, i) => (
            <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>{r}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
