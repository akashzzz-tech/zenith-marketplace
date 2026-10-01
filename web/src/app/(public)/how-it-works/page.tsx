import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <section className="pt-16 pb-12 px-4 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-black text-primary mb-3">How ZENITH Works</h1>
        <p className="text-slate-600 text-base max-w-2xl mx-auto">
          A disciplined, verified marketplace connecting senior talent with companies for remote freelance projects.
        </p>
      </section>

      <section className="pb-16 px-4 max-w-5xl mx-auto w-full space-y-12">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <span>👤</span> For Experienced & Retired Professionals
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <span className="text-xs font-bold text-secondary">Step 1</span>
              <h4 className="font-bold text-primary mt-1 mb-2 text-sm">Register Account</h4>
              <p className="text-xs text-slate-600">Create your account with email verification and role profile details.</p>
            </Card>
            <Card>
              <span className="text-xs font-bold text-secondary">Step 2</span>
              <h4 className="font-bold text-primary mt-1 mb-2 text-sm">Eligibility Verification</h4>
              <p className="text-xs text-slate-600">Submit proof of retirement or 5+ years of verified professional experience.</p>
            </Card>
            <Card>
              <span className="text-xs font-bold text-secondary">Step 3</span>
              <h4 className="font-bold text-primary mt-1 mb-2 text-sm">Review & Match</h4>
              <p className="text-xs text-slate-600">Browse projects or receive invitations with transparent compatibility scores.</p>
            </Card>
            <Card>
              <span className="text-xs font-bold text-secondary">Step 4</span>
              <h4 className="font-bold text-primary mt-1 mb-2 text-sm">Milestone Delivery</h4>
              <p className="text-xs text-slate-600">Deliver work against funded escrow milestones and receive automated payouts.</p>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <span>🏢</span> For Companies & Clients
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <span className="text-xs font-bold text-primary">Step 1</span>
              <h4 className="font-bold text-primary mt-1 mb-2 text-sm">Post Remote Project</h4>
              <p className="text-xs text-slate-600">Define requirements, technical scope, budget, and required years of experience.</p>
            </Card>
            <Card>
              <span className="text-xs font-bold text-primary">Step 2</span>
              <h4 className="font-bold text-primary mt-1 mb-2 text-sm">Select & Offer</h4>
              <p className="text-xs text-slate-600">Evaluate scored proposals or directly invite vetted professionals.</p>
            </Card>
            <Card>
              <span className="text-xs font-bold text-primary">Step 3</span>
              <h4 className="font-bold text-primary mt-1 mb-2 text-sm">Fund Escrow</h4>
              <p className="text-xs text-slate-600">Deposit milestone funds securely via authorized payment provider.</p>
            </Card>
            <Card>
              <span className="text-xs font-bold text-primary">Step 4</span>
              <h4 className="font-bold text-primary mt-1 mb-2 text-sm">Approve Work</h4>
              <p className="text-xs text-slate-600">Inspect submitted code, blueprints, or documents before releasing payment.</p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
