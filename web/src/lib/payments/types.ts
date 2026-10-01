import type { PaymentState } from '@/types';

export interface EscrowPaymentParams {
  contractId: string;
  milestoneId: string;
  clientId: string;
  professionalId: string;
  amountCents: number;
  currency: string;
  idempotencyKey: string;
  metadata?: Record<string, string>;
}

export interface EscrowPaymentResult {
  paymentId: string;
  providerPaymentId: string;
  clientSecret?: string;
  state: PaymentState;
  amountCents: number;
  currency: string;
}

export interface PayoutParams {
  paymentId: string;
  professionalId: string;
  providerAccountId: string;
  amountCents: number;
  currency: string;
  idempotencyKey: string;
}

export interface PayoutResult {
  payoutId: string;
  providerPayoutId: string;
  state: PaymentState;
  amountCents: number;
  currency: string;
}

export interface RefundParams {
  paymentId: string;
  providerPaymentId: string;
  amountCents: number;
  reason: string;
  idempotencyKey: string;
}

export interface RefundResult {
  refundId: string;
  providerRefundId: string;
  state: PaymentState;
  amountCents: number;
}

export interface WebhookValidationResult {
  isValid: boolean;
  eventType: string;
  payload: any;
  error?: string;
}

export interface IPaymentProvider {
  name: 'stripe' | 'razorpay' | 'sandbox';
  createEscrowPayment(params: EscrowPaymentParams): Promise<EscrowPaymentResult>;
  confirmEscrowPayment(providerPaymentId: string): Promise<{ state: PaymentState; capturedAt: Date }>;
  releaseEscrowPayout(params: PayoutParams): Promise<PayoutResult>;
  issueRefund(params: RefundParams): Promise<RefundResult>;
  validateWebhook(rawBody: string | Buffer, signature: string): Promise<WebhookValidationResult>;
}
