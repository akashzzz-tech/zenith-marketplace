import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';

export default function ForClients() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <section className="pt-16 pb-12 px-4 max-w-5xl mx-auto text-center">
        <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          Senior-Level Remote Expertise
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-primary mt-4 mb-4">
          Hire Experienced Professionals & Engineers Remotely
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
          Skip sift-through of entry-level resumes. Connect with verified senior practitioners and retired engineering veterans with 5 to 35+ years of real-world tenure.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/projects/new"
            className="bg-secondary text-primary hover:bg-secondary/90 px-8 py-3.5 rounded-xl font-bold text-base transition-all shadow-md"
          >
            Post a Project
          </Link>
          <Link
            href="/professionals"
            className="bg-primary text-white hover:bg-primary/90 px-6 py-3.5 rounded-xl font-semibold text-base transition-all"
          >
            Search Verified Talent
          </Link>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-slate-200 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          <Card>
            <h4 className="font-bold text-primary text-base mb-2">Zero Entry-Level Noise</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every professional on ZENITH has completed manual credential verification or proven retired senior status.
            </p>
          </Card>
          <Card>
            <h4 className="font-bold text-primary text-base mb-2">Milestone Escrow</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              You maintain full control over disbursements. Money is released only when you inspect and approve submitted deliverables.
            </p>
          </Card>
          <Card>
            <h4 className="font-bold text-primary text-base mb-2">Transparent Match Scoring</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our algorithm breaks down compatibility across skills, years of experience, sector familiarity, and timezone overlap.
            </p>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
