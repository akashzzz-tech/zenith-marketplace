export interface SafetyScanResult {
  isSafe: boolean;
  flagReason: string | null;
  sanitizedContent: string;
  severity: 'low' | 'medium' | 'high' | 'critical' | 'none';
}

export class MessageSafetyFilter {
  // Regex rules
  private static phoneRegex = /(\+?\d{1,4}[\s.-]?)?(\(\d{2,4}\)[\s.-]?)?\d{3,5}[\s.-]?\d{3,5}/g;
  private static emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  private static credentialsRegex = /(password|otp|one[- ]time[- ]password|cvv|pin|banking pin|secret code)/i;
  private static paymentBypassKeywords = [
    'paypal',
    'zelle',
    'venmo',
    'cashapp',
    'crypto',
    'bitcoin',
    'usdt',
    'wire transfer',
    'bank transfer',
    'direct payment',
    'pay me outside',
    'pay outside',
    'western union',
    'paytm',
    'google pay directly',
  ];

  static scanMessage(content: string): SafetyScanResult {
    // 1. Critical: Requesting credentials
    if (this.credentialsRegex.test(content)) {
      return {
        isSafe: false,
        flagReason: 'SECURITY WARNING: Requesting or sharing passwords, OTPs, CVVs, or PINs is strictly prohibited.',
        sanitizedContent: '[MESSAGE BLOCKED: Sensitive credential request detected]',
        severity: 'critical',
      };
    }

    // 2. High: Payment bypass attempts
    const lower = content.toLowerCase();
    for (const keyword of this.paymentBypassKeywords) {
      if (lower.includes(keyword)) {
        return {
          isSafe: false,
          flagReason: `POLICY VIOLATION: Off-platform payment mention detected ("${keyword}"). All milestone payments must flow through ZENITH escrow.`,
          sanitizedContent: content,
          severity: 'high',
        };
      }
    }

    // 3. Medium: Direct contact sharing prior to contract
    if (this.phoneRegex.test(content)) {
      return {
        isSafe: false,
        flagReason: 'SAFETY NOTICE: Phone number sharing detected. Maintain communications inside ZENITH for contract & dispute protection.',
        sanitizedContent: content,
        severity: 'medium',
      };
    }

    if (this.emailRegex.test(content)) {
      return {
        isSafe: false,
        flagReason: 'SAFETY NOTICE: External email address detected. All project records should remain on-platform.',
        sanitizedContent: content,
        severity: 'medium',
      };
    }

    return {
      isSafe: true,
      flagReason: null,
      sanitizedContent: content,
      severity: 'none',
    };
  }
}
