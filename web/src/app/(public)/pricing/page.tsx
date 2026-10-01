import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <section className="pt-16 pb-12 px-4 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-black text-primary mb-3">Transparent Marketplace Fees</h1>
        <p className="text-slate-600 text-base max-w-2xl mx-auto">
          ZENITH charges an honest, disclosed service fee to power identity verification, matching infrastructure, milestone escrow, and continuous dispute support.
        </p>
      </section>

      <section className="pb-16 px-4 max-w-5xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <Card className="border-secondary/40">
            <span className="text-xs font-bold text-secondary uppercase tracking-wider block mb-1">For Clients</span>
            <h3 className="text-3xl font-extrabold text-primary mb-2">3.5%</h3>
            <p className="text-xs text-slate-500 mb-4">Service & Payment Processing Fee</p>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Applied on funded project milestones to cover verified payment gateway processing, anti-fraud controls, and milestone escrow security.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl text-xs space-y-1 text-slate-600 border border-slate-200">
              <span className="font-bold text-primary block mb-1">Example:</span>
              <div>Milestone contract: $1,000.00</div>
              <div>Client Service Fee (3.5%): $35.00</div>
              <div className="font-bold text-slate-800 pt-1 border-t border-slate-200">Total Funded into Escrow: $1,035.00</div>
            </div>
          </Card>

          <Card className="border-primary/30">
            <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">For Professionals</span>
            <h3 className="text-3xl font-extrabold text-primary mb-2">8.0%</h3>
            <p className="text-xs text-slate-500 mb-4">Marketplace Intermediary Fee</p>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Deducted from released milestone earnings to cover credential verification, automated matching, and contract administration.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl text-xs space-y-1 text-slate-600 border border-slate-200">
              <span className="font-bold text-primary block mb-1">Example:</span>
              <div>Client Milestone Amount: $1,000.00</div>
              <div>ZENITH Platform Fee (8%): $80.00</div>
              <div className="font-bold text-emerald-700 pt-1 border-t border-slate-200">Net Professional Payout: $920.00</div>
            </div>
          </Card>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-xs text-slate-500 space-y-2 leading-relaxed">
          <p><strong>LEGAL REVIEW & COMPLIANCE REQUIRED:</strong> Fee percentages are subject to jurisdiction-specific payment gateway charges, local sales taxes (such as VAT or GST where applicable), and withholding taxes.</p>
          <p>ZENITH is an intermediary marketplace and does not act as an employer, bank, or currency conversion agent. All financial records are permanently preserved in our immutable double-entry ledger.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
