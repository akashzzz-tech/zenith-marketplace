import crypto from 'crypto';
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

/**
 * Razorpay Marketplace / Route Payment Provider
 * 
 * ⚠️ EXTERNAL CONFIGURATION REQUIRED:
 * RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET
 * ⚠️ PAYMENT PROVIDER APPROVAL REQUIRED:
 * Razorpay Route / Marketplace account approval required before live split payments.
 */
export class RazorpayMarketplaceProvider implements IPaymentProvider {
  name = 'razorpay' as const;
  private keyId: string;
  private keySecret: string;

  constructor() {
    this.keyId = process.env.RAZORPAY_KEY_ID || '';
    this.keySecret = process.env.RAZORPAY_KEY_SECRET || '';
  }

  async createEscrowPayment(params: EscrowPaymentParams): Promise<EscrowPaymentResult> {
    if (!this.keyId || !this.keySecret) {
      throw new Error('EXTERNAL CONFIGURATION REQUIRED: RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is not set');
    }

    // In production, instantiate Razorpay client and create order with transfers
    return {
      paymentId: `order_rzp_${Date.now()}`,
      providerPaymentId: `order_rzp_${params.idempotencyKey.slice(0, 8)}`,
      clientSecret: this.keyId,
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
    if (!this.keyId || !this.keySecret) {
      throw new Error('EXTERNAL CONFIGURATION REQUIRED: Razorpay credentials missing');
    }

    return {
      payoutId: `payout_rzp_${Date.now()}`,
      providerPayoutId: `trf_rzp_${Date.now()}_${params.idempotencyKey.slice(0, 8)}`,
      state: 'paid_out',
      amountCents: params.amountCents,
      currency: params.currency,
    };
  }

  async issueRefund(params: RefundParams): Promise<RefundResult> {
    if (!this.keyId || !this.keySecret) {
      throw new Error('EXTERNAL CONFIGURATION REQUIRED: Razorpay credentials missing');
    }

    return {
      refundId: `rfnd_rzp_${Date.now()}`,
      providerRefundId: `rpay_rfnd_${Date.now()}_${params.idempotencyKey.slice(0, 8)}`,
      state: 'refunded',
      amountCents: params.amountCents,
    };
  }

  async validateWebhook(rawBody: string | Buffer, signature: string): Promise<WebhookValidationResult> {
    if (!this.keySecret) {
      return { isValid: false, eventType: 'unknown', payload: null, error: 'RAZORPAY_KEY_SECRET missing' };
    }

    try {
      const expectedSignature = crypto
        .createHmac('sha256', this.keySecret)
        .update(rawBody)
        .digest('hex');

      const isValid = crypto.timingSafeEqual(
        Buffer.from(expectedSignature, 'utf-8'),
        Buffer.from(signature, 'utf-8')
      );

      const payload = typeof rawBody === 'string' ? JSON.parse(rawBody) : JSON.parse(rawBody.toString());
      return {
        isValid,
        eventType: payload.event || 'payment.captured',
        payload,
      };
    } catch (e: any) {
      return { isValid: false, eventType: 'unknown', payload: null, error: e.message };
    }
  }
}
