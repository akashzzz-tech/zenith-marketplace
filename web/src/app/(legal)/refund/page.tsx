import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl font-black text-primary mb-2">Escrow, Refund & Cancellation Policy</h1>
        <p className="text-xs text-slate-500 mb-6">Last updated: September 2026 • LEGAL REVIEW REQUIRED</p>

        <Card className="p-6 space-y-4 text-sm text-slate-700 leading-relaxed">
          <p><strong>1. Escrow Protection:</strong> Funds deposited for milestone projects remain in escrow until the client reviews and approves the submitted deliverable.</p>
          <p><strong>2. Mutual Cancellation:</strong> If both parties agree to terminate a milestone before work is accepted, funds are credited or returned according to our double-entry ledger rules.</p>
          <p><strong>3. Over-Refund Prevention:</strong> In compliance with financial audit controls, refund totals can never exceed original captured milestone deposits.</p>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
