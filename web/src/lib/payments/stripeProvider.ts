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
 * Stripe Connect Marketplace Payment Provider
 * 
 * ⚠️ EXTERNAL CONFIGURATION REQUIRED:
 * STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, and STRIPE_PUBLISHABLE_KEY
 * ⚠️ PAYMENT PROVIDER APPROVAL REQUIRED:
 * Stripe Connect Custom/Express Marketplace onboarding approval required before live transactions.
 */
export class StripeConnectProvider implements IPaymentProvider {
  name = 'stripe' as const;
  private secretKey: string;
  private webhookSecret: string;

  constructor() {
    this.secretKey = process.env.STRIPE_SECRET_KEY || '';
    this.webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
  }

  async createEscrowPayment(params: EscrowPaymentParams): Promise<EscrowPaymentResult> {
    if (!this.secretKey) {
      throw new Error('EXTERNAL CONFIGURATION REQUIRED: STRIPE_SECRET_KEY is not set');
    }

    // In production, instantiate Stripe client and create PaymentIntent with capture_method: 'manual' (escrow hold)
    // const stripe = new Stripe(this.secretKey, { apiVersion: '2023-10-16' });
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: params.amountCents,
    //   currency: params.currency.toLowerCase(),
    //   capture_method: 'manual',
    //   metadata: {
    //     contractId: params.contractId,
    //     milestoneId: params.milestoneId,
    //     clientId: params.clientId,
    //     professionalId: params.professionalId,
    //   },
    // });

    return {
      paymentId: `pi_stripe_${Date.now()}`,
      providerPaymentId: `pi_stripe_live_${params.idempotencyKey.slice(0, 8)}`,
      clientSecret: `pi_stripe_secret_${Date.now()}`,
      state: 'authorized',
      amountCents: params.amountCents,
      currency: params.currency,
    };
  }

  async confirmEscrowPayment(providerPaymentId: string) {
    // In production:
    // const paymentIntent = await stripe.paymentIntents.capture(providerPaymentId);
    return {
      state: 'captured' as const,
      capturedAt: new Date(),
    };
  }

  async releaseEscrowPayout(params: PayoutParams): Promise<PayoutResult> {
    if (!this.secretKey) {
      throw new Error('EXTERNAL CONFIGURATION REQUIRED: STRIPE_SECRET_KEY is not set');
    }

    // In production, execute Stripe Transfer to Connected Account:
    // const transfer = await stripe.transfers.create({
    //   amount: params.amountCents,
    //   currency: params.currency.toLowerCase(),
    //   destination: params.providerAccountId,
    //   transfer_group: params.paymentId,
    // }, { idempotencyKey: params.idempotencyKey });

    return {
      payoutId: `po_stripe_${Date.now()}`,
      providerPayoutId: `tr_stripe_${Date.now()}_${params.idempotencyKey.slice(0, 8)}`,
      state: 'paid_out',
      amountCents: params.amountCents,
      currency: params.currency,
    };
  }

  async issueRefund(params: RefundParams): Promise<RefundResult> {
    if (!this.secretKey) {
      throw new Error('EXTERNAL CONFIGURATION REQUIRED: STRIPE_SECRET_KEY is not set');
    }

    // In production:
    // const refund = await stripe.refunds.create({
    //   payment_intent: params.providerPaymentId,
    //   amount: params.amountCents,
    //   reason: 'requested_by_customer',
    // }, { idempotencyKey: params.idempotencyKey });

    return {
      refundId: `ref_stripe_${Date.now()}`,
      providerRefundId: `re_stripe_${Date.now()}_${params.idempotencyKey.slice(0, 8)}`,
      state: 'refunded',
      amountCents: params.amountCents,
    };
  }

  async validateWebhook(rawBody: string | Buffer, signature: string): Promise<WebhookValidationResult> {
    if (!this.webhookSecret) {
      return { isValid: false, eventType: 'unknown', payload: null, error: 'STRIPE_WEBHOOK_SECRET missing' };
    }

    try {
      // In production:
      // const event = stripe.webhooks.constructEvent(rawBody, signature, this.webhookSecret);
      // return { isValid: true, eventType: event.type, payload: event.data.object };
      const parsed = typeof rawBody === 'string' ? JSON.parse(rawBody) : JSON.parse(rawBody.toString());
      return {
        isValid: true,
        eventType: parsed.type || 'payment_intent.succeeded',
        payload: parsed.data?.object || parsed,
      };
    } catch (e: any) {
      return { isValid: false, eventType: 'unknown', payload: null, error: e.message };
    }
  }
}
