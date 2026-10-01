import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <section className="pt-16 pb-12 px-4 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-black text-primary mb-3">About ZENITH</h1>
        <p className="text-xl font-semibold text-secondary mb-4">“Experience That Works Remotely.”</p>
        <p className="text-slate-600 text-base max-w-2xl mx-auto leading-relaxed">
          ZENITH is an exclusive remote freelancing marketplace connecting retired industry leaders and professionals with 5+ years of verified experience to forward-looking companies.
        </p>
      </section>

      <section className="pb-16 px-4 max-w-5xl mx-auto w-full space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-emerald-200 bg-emerald-50/30">
            <h3 className="text-lg font-bold text-emerald-800 mb-3">What ZENITH IS</h3>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2"><span className="text-emerald-600 font-bold">✓</span> A facilitated discovery and matching platform for senior talent.</li>
              <li className="flex items-center gap-2"><span className="text-emerald-600 font-bold">✓</span> A credential verification engine verifying professional history.</li>
              <li className="flex items-center gap-2"><span className="text-emerald-600 font-bold">✓</span> A secure contract and milestone escrow workflow.</li>
              <li className="flex items-center gap-2"><span className="text-emerald-600 font-bold">✓</span> A dispute resolution and immutable financial ledger system.</li>
            </ul>
          </Card>

          <Card className="border-rose-200 bg-rose-50/30">
            <h3 className="text-lg font-bold text-rose-800 mb-3">What ZENITH IS NOT</h3>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2"><span className="text-rose-600 font-bold">✕</span> An employer or Employer of Record (EOR).</li>
              <li className="flex items-center gap-2"><span className="text-rose-600 font-bold">✕</span> A guarantor of jobs or guaranteed income for freelancers.</li>
              <li className="flex items-center gap-2"><span className="text-rose-600 font-bold">✕</span> A service provider performing client projects directly.</li>
              <li className="flex items-center gap-2"><span className="text-rose-600 font-bold">✕</span> A low-cost general freelance bidding site.</li>
            </ul>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
