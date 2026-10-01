import { createClient } from '@/lib/supabase/server';

export interface LedgerTransactionItem {
  account: 'CLIENT_CASH' | 'ESCROW_HOLD' | 'PRO_RECEIVABLE' | 'PRO_PAYOUT' | 'PLATFORM_FEE_REVENUE' | 'REFUND_LIABILITY';
  debitCents: number;
  creditCents: number;
  description: string;
}

export class LedgerService {
  /**
   * Records a balanced double-entry transaction.
   * Total debits MUST equal total credits.
   */
  static async recordTransaction(params: {
    transactionGroupId: string;
    contractId?: string;
    milestoneId?: string;
    currency: string;
    entries: LedgerTransactionItem[];
  }) {
    const totalDebits = params.entries.reduce((sum, e) => sum + e.debitCents, 0);
    const totalCredits = params.entries.reduce((sum, e) => sum + e.creditCents, 0);

    if (totalDebits !== totalCredits) {
      throw new Error(
        `Ledger integrity violation: Debits (${totalDebits}) do not equal Credits (${totalCredits})`
      );
    }

    const supabase = await createClient();
    const rows = params.entries.map((entry) => ({
      transaction_group_id: params.transactionGroupId,
      contract_id: params.contractId || null,
      milestone_id: params.milestoneId || null,
      account_id: entry.account,
      entry_type: entry.account,
      debit_cents: entry.debitCents,
      credit_cents: entry.creditCents,
      currency: params.currency,
      description: entry.description,
    }));

    const { error } = await supabase.from('ledger_entries').insert(rows);
    if (error) {
      throw new Error(`Failed to persist immutable ledger entries: ${error.message}`);
    }

    return { success: true, transactionGroupId: params.transactionGroupId };
  }

  /**
   * Helper: Record Milestone Escrow Funding
   * Client pays into Escrow:
   *   Debit:  CLIENT_CASH
   *   Credit: ESCROW_HOLD
   */
  static async recordMilestoneEscrowFunded(params: {
    transactionGroupId: string;
    contractId: string;
    milestoneId: string;
    amountCents: number;
    platformFeeCents: number;
    currency: string;
  }) {
    const totalDeposit = params.amountCents + params.platformFeeCents;
    return this.recordTransaction({
      transactionGroupId: params.transactionGroupId,
      contractId: params.contractId,
      milestoneId: params.milestoneId,
      currency: params.currency,
      entries: [
        {
          account: 'CLIENT_CASH',
          debitCents: totalDeposit,
          creditCents: 0,
          description: `Client funded milestone escrow with platform processing fee`,
        },
        {
          account: 'ESCROW_HOLD',
          debitCents: 0,
          creditCents: params.amountCents,
          description: `Held in non-custodial milestone escrow`,
        },
        {
          account: 'PLATFORM_FEE_REVENUE',
          debitCents: 0,
          creditCents: params.platformFeeCents,
          description: `ZENITH Client service fee (3.5%)`,
        },
      ],
    });
  }

  /**
   * Helper: Record Milestone Approval & Professional Payout
   * Release from Escrow to Professional:
   *   Debit:  ESCROW_HOLD
   *   Credit: PRO_PAYOUT (net earnings)
   *   Credit: PLATFORM_FEE_REVENUE (professional fee)
   */
  static async recordMilestoneApprovedAndPaid(params: {
    transactionGroupId: string;
    contractId: string;
    milestoneId: string;
    escrowAmountCents: number;
    proFeeCents: number;
    proEarningsCents: number;
    currency: string;
  }) {
    return this.recordTransaction({
      transactionGroupId: params.transactionGroupId,
      contractId: params.contractId,
      milestoneId: params.milestoneId,
      currency: params.currency,
      entries: [
        {
          account: 'ESCROW_HOLD',
          debitCents: params.escrowAmountCents,
          creditCents: 0,
          description: `Escrow release upon milestone deliverable client sign-off`,
        },
        {
          account: 'PRO_PAYOUT',
          debitCents: 0,
          creditCents: params.proEarningsCents,
          description: `Net earnings transferred to verified professional bank account`,
        },
        {
          account: 'PLATFORM_FEE_REVENUE',
          debitCents: 0,
          creditCents: params.proFeeCents,
          description: `ZENITH Professional intermediary fee (8%)`,
        },
      ],
    });
  }
}
