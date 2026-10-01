import { NextRequest, NextResponse } from 'next/server';
import { getPaymentProvider } from '@/lib/payments';
import { LedgerService } from '@/lib/payments/ledgerService';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature =
      req.headers.get('stripe-signature') ||
      req.headers.get('x-razorpay-signature') ||
      'sandbox_sig';

    const provider = getPaymentProvider();
    const validation = await provider.validateWebhook(rawBody, signature);

    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Invalid webhook signature', details: validation.error },
        { status: 400 }
      );
    }

    const { eventType, payload } = validation;
    const supabase = await createClient();

    // 1. Payment Authorized / Captured
    if (eventType === 'payment_intent.succeeded' || eventType === 'payment.captured') {
      const paymentIntentId = payload.id;
      const metadata = payload.metadata || {};
      const { contractId, milestoneId } = metadata;

      if (contractId && milestoneId) {
        // Update milestone state in DB
        await supabase
          .from('milestones')
          .update({ payment_state: 'captured' })
          .eq('id', milestoneId);

        // Record double-entry ledger event
        await LedgerService.recordMilestoneEscrowFunded({
          transactionGroupId: `tx_${Date.now()}_${paymentIntentId}`,
          contractId,
          milestoneId,
          amountCents: payload.amount || 100000,
          platformFeeCents: Math.round((payload.amount || 100000) * 0.035),
          currency: (payload.currency || 'USD').toUpperCase(),
        });
      }
    }

    // 2. Transfer / Payout Succeeded
    if (eventType === 'transfer.created' || eventType === 'payout.paid') {
      const metadata = payload.metadata || {};
      const { milestoneId } = metadata;

      if (milestoneId) {
        await supabase
          .from('milestones')
          .update({ payment_state: 'paid_out', status: 'approved' })
          .eq('id', milestoneId);
      }
    }

    // Record raw payment event in payment_events table for audit
    await supabase.from('payment_events').insert({
      payment_id: payload.id || 'ext_event',
      event_type: eventType,
      provider_event_id: payload.id || null,
      previous_state: 'authorized',
      new_state: 'captured',
      payload,
    });

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Internal webhook error', message: error.message },
      { status: 500 }
    );
  }
}
