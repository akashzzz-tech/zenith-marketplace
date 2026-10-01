import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';

export default function ForProfessionals() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <section className="pt-16 pb-12 px-4 max-w-5xl mx-auto text-center">
        <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/15 px-3 py-1 rounded-full border border-secondary/30">
          Independent Remote Opportunities
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-primary mt-4 mb-4">
          “Your Experience Still Matters.”
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
          Join an exclusive global community designed specifically for retired specialists and seasoned professionals with 5+ years of verified industry tenure.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/register/professional"
            className="bg-primary text-white hover:bg-primary/90 px-8 py-3.5 rounded-xl font-bold text-base transition-all"
          >
            Apply for Verification
          </Link>
          <Link
            href="/how-it-works"
            className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-3.5 rounded-xl font-semibold text-base transition-all"
          >
            How Verification Works
          </Link>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-slate-200 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <Card>
            <h3 className="text-xl font-bold text-primary mb-3">Why Professionals Choose ZENITH</h3>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>No Price-Racing to the Bottom:</strong> Clients on ZENITH hire specifically for high-level expertise, not minimum-wage bidding.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Escrow Protection:</strong> Milestones are funded in advance by clients before you spend a single hour on deliverables.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Transparent Match Scoring:</strong> See the exact technical and operational reasons why clients receive your profile.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Independent Contractor Status:</strong> You maintain total control over your availability, rates, and engagement agreements.</span>
              </li>
            </ul>
          </Card>

          <Card className="bg-slate-50 border-slate-200">
            <h3 className="text-xl font-bold text-primary mb-3">Eligibility Notice & Transparency</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              To preserve our premium marketplace standard, every applicant must submit verifiable career documentation (employment records, professional licenses, past project evidence, or retirement credentials).
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 leading-normal">
              <strong>Intermediary Disclosure:</strong> ZENITH does not guarantee employment or continuous income. We provide the infrastructure for discovery, matching, milestone escrow, and payouts.
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
