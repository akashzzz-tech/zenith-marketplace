import type {
  IPaymentProvider,
  EscrowPaymentParams,
  EscrowPaymentResult,
  PayoutParams,
  PayoutResult,
  RefundParams,
  RefundResult,
  WebhookValidationResult,
} from './types';

export class SandboxPaymentProvider implements IPaymentProvider {
  name = 'sandbox' as const;

  async createEscrowPayment(params: EscrowPaymentParams): Promise<EscrowPaymentResult> {
    // Deterministic simulation
    const mockProviderId = `sandbox_pay_${Date.now()}_${params.idempotencyKey.slice(0, 8)}`;
    return {
      paymentId: `pay_${Date.now()}`,
      providerPaymentId: mockProviderId,
      clientSecret: `sandbox_secret_${mockProviderId}`,
      state: 'authorized',
      amountCents: params.amountCents,
      currency: params.currency,
    };
  }

  async confirmEscrowPayment(providerPaymentId: string) {
    return {
      state: 'captured' as const,
      capturedAt: new Date(),
    };
  }

  async releaseEscrowPayout(params: PayoutParams): Promise<PayoutResult> {
    return {
      payoutId: `payout_${Date.now()}`,
      providerPayoutId: `sandbox_po_${Date.now()}_${params.idempotencyKey.slice(0, 8)}`,
      state: 'paid_out',
      amountCents: params.amountCents,
      currency: params.currency,
    };
  }

  async issueRefund(params: RefundParams): Promise<RefundResult> {
    return {
      refundId: `refund_${Date.now()}`,
      providerRefundId: `sandbox_ref_${Date.now()}_${params.idempotencyKey.slice(0, 8)}`,
      state: 'refunded',
      amountCents: params.amountCents,
    };
  }

  async validateWebhook(rawBody: string | Buffer, signature: string): Promise<WebhookValidationResult> {
    try {
      const payload = typeof rawBody === 'string' ? JSON.parse(rawBody) : JSON.parse(rawBody.toString());
      return {
        isValid: true,
        eventType: payload.type || 'payment.authorized',
        payload,
      };
    } catch (e: any) {
      return { isValid: false, eventType: 'unknown', payload: null, error: e.message };
    }
  }
}
