import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';

export default function FAQPage() {
  const faqs = [
    {
      category: 'Eligibility & Verification',
      items: [
        { q: 'Who can join as a service provider on ZENITH?', a: 'Only retired professionals who can demonstrate relevant career experience OR practitioners with 5+ years of verified professional experience. Fresh graduates and junior practitioners are not eligible.' },
        { q: 'How does verification work?', a: 'Professionals submit documentation such as employment records, certificates, degrees, or retired executive credentials. Our review team verifies records before the profile is made publicly searchable.' },
        { q: 'Are private documents displayed on my public profile?', a: 'Never. Verification documents are encrypted and kept in secure private storage accessible only to compliance administrators.' }
      ]
    },
    {
      category: 'Contracts & Payments',
      items: [
        { q: 'How do milestone payments work?', a: 'Clients fund each project milestone into escrow via our authorized payment provider. Money is held securely until the client inspects and approves the submitted deliverable.' },
        { q: 'Does ZENITH guarantee income?', a: 'No. ZENITH is an intermediary marketplace. The work is performed independently by the professional for the client.' },
        { q: 'What fees are charged?', a: 'Clients pay a 3.5% transaction/processing fee on funded milestones. Professionals have an 8% intermediary fee deducted from released milestone earnings.' }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <section className="pt-16 pb-12 px-4 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-black text-primary mb-3">Frequently Asked Questions</h1>
        <p className="text-slate-600 text-base max-w-2xl mx-auto">
          Everything you need to know about ZENITH eligibility, verification, milestones, and dispute resolution.
        </p>
      </section>

      <section className="pb-16 px-4 max-w-4xl mx-auto w-full space-y-8">
        {faqs.map((f, i) => (
          <div key={i}>
            <h3 className="text-lg font-bold text-primary mb-4">{f.category}</h3>
            <div className="space-y-3">
              {f.items.map((item, idx) => (
                <Card key={idx} className="p-5">
                  <h4 className="font-bold text-primary text-sm mb-1">{item.q}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.a}</p>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
