import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';

export default function DisputePolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl font-black text-primary mb-2">Dispute Resolution Policy</h1>
        <p className="text-xs text-slate-500 mb-6">Last updated: September 2026 • LEGAL REVIEW REQUIRED</p>

        <Card className="p-6 space-y-4 text-sm text-slate-700 leading-relaxed">
          <p><strong>1. Formal Dispute Filing:</strong> If a deliverable cannot be reconciled between the client and professional, either party may trigger a formal dispute state on the contract milestone.</p>
          <p><strong>2. Evidence Vault:</strong> Contracts, initial scope agreements, communication transcripts on ZENITH, and submitted files are compiled for administrative review.</p>
          <p><strong>3. Human Review & Decision:</strong> An assigned arbitration administrator reviews the evidence and issues a binding resolution (full payout, refund, or percentage split), which updates the double-entry financial ledger.</p>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
