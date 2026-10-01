import React from 'react';
import { Badge } from '@/components/ui/Badge';
import type { VerificationStatus as VStatus } from '@/types';

interface VerificationStatusProps {
  status: VStatus;
  size?: 'sm' | 'md';
}

export function VerificationStatusBadge({ status, size = 'md' }: VerificationStatusProps) {
  switch (status) {
    case 'verified':
      return (
        <Badge variant="success" size={size}>
          <span>✓</span> Verified Expert
        </Badge>
      );
    case 'pending':
    case 'under_review':
      return (
        <Badge variant="warning" size={size}>
          <span>⏳</span> Review in Progress
        </Badge>
      );
    case 'more_info_required':
      return (
        <Badge variant="warning" size={size}>
          <span>⚠️</span> Action Required
        </Badge>
      );
    case 'rejected':
      return (
        <Badge variant="error" size={size}>
          <span>✕</span> Ineligible
        </Badge>
      );
    case 'suspended':
      return (
        <Badge variant="error" size={size}>
          <span>⛔</span> Suspended
        </Badge>
      );
    case 'unverified':
    default:
      return (
        <Badge variant="outline" size={size}>
          <span>○</span> Unverified
        </Badge>
      );
  }
}
