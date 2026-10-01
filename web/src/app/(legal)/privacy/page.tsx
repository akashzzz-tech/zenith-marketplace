import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl font-black text-primary mb-2">Privacy & Data Protection Policy</h1>
        <p className="text-xs text-slate-500 mb-6">Last updated: September 2026 • LEGAL REVIEW REQUIRED</p>

        <Card className="p-6 space-y-4 text-sm text-slate-700 leading-relaxed">
          <p><strong>1. Non-Public Verification Documents:</strong> Identity cards, proof of retirement, degree certificates, and previous employment documents uploaded for eligibility verification are stored in isolated, private storage buckets with strict Row Level Security. They are never rendered on public profiles.</p>
          <p><strong>2. Information Collection:</strong> We collect professional profile details, communication logs, and project metadata solely to operate our discovery and contract intermediary services.</p>
          <p><strong>3. Payment Information:</strong> ZENITH never stores bank passwords, CVVs, or full payment card numbers. All financial transactions are tokenized via approved payment gateway partners.</p>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
