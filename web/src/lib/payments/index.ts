import type { IPaymentProvider } from './types';
import { StripeConnectProvider } from './stripeProvider';
import { RazorpayMarketplaceProvider } from './razorpayProvider';
import { SandboxPaymentProvider } from './sandboxProvider';

export * from './types';
export * from './ledgerService';
export * from './sandboxProvider';
export * from './stripeProvider';
export * from './razorpayProvider';

/**
 * Returns the configured payment provider instance.
 * Defaults to SandboxPaymentProvider if keys are absent or during local development.
 */
export function getPaymentProvider(): IPaymentProvider {
  const provider = process.env.PAYMENT_PROVIDER?.toLowerCase() || 'sandbox';

  if (provider === 'stripe' && process.env.STRIPE_SECRET_KEY) {
    return new StripeConnectProvider();
  }

  if (provider === 'razorpay' && process.env.RAZORPAY_KEY_ID) {
    return new RazorpayMarketplaceProvider();
  }

  return new SandboxPaymentProvider();
}
