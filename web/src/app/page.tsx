import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function Home() {
  const categories = [
    { title: 'Software Engineering', icon: '💻', count: 'Cloud, Systems, Architecture' },
    { title: 'Mechanical Engineering', icon: '⚙️', count: 'CAD, FEA, Product Design' },
    { title: 'Civil & Structural Engineering', icon: '🏗️', count: 'BIM, Infrastructure, Urban' },
    { title: 'Data Science & AI/ML', icon: '📊', count: 'Analytics, Machine Learning, MLOps' },
    { title: 'Cybersecurity', icon: '🛡️', count: 'Audits, Compliance, DevSecOps' },
    { title: 'Business & Project Consulting', icon: '📈', count: 'PMP, Agile, Operations, Strategy' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-secondary/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 md:px-8 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-secondary/15 border border-secondary/30 text-primary px-3.5 py-1 rounded-full text-xs font-semibold mb-6">
          <span>⭐️ Exclusive to Retired & 5+ YOE Professionals</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-primary tracking-tight leading-tight mb-6">
          ZENITH
        </h1>
        <p className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
          Experienced Talent. Remote Opportunities.
        </p>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
          ZENITH connects companies, startups, and institutions with verified retired professionals and industry specialists with 5+ years of relevant experience for remote project-based engagements.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/professionals"
            className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90 px-7 py-3.5 rounded-xl font-bold text-base shadow-md hover:shadow-lg transition-all"
          >
            Find Experienced Talent
          </Link>
          <Link
            href="/projects"
            className="w-full sm:w-auto bg-secondary text-primary hover:bg-secondary/90 px-7 py-3.5 rounded-xl font-bold text-base shadow-md hover:shadow-lg transition-all"
          >
            Explore Remote Projects
          </Link>
          <Link
            href="/for-professionals"
            className="w-full sm:w-auto bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 px-7 py-3.5 rounded-xl font-semibold text-base transition-all"
          >
            Join as a Professional
          </Link>
        </div>

        {/* Honest Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-4xl mx-auto text-left">
          <div>
            <span className="block text-2xl font-black text-primary">5+ Yrs</span>
            <span className="text-xs text-slate-500 font-medium">Minimum Experience Barrier</span>
          </div>
          <div>
            <span className="block text-2xl font-black text-primary">100%</span>
            <span className="text-xs text-slate-500 font-medium">Pre-Vetted Credentials</span>
          </div>
          <div>
            <span className="block text-2xl font-black text-primary">Escrow</span>
            <span className="text-xs text-slate-500 font-medium">Milestone-Protected Payments</span>
          </div>
          <div>
            <span className="block text-2xl font-black text-primary">Direct</span>
            <span className="text-xs text-slate-500 font-medium">Independent Contractor Status</span>
          </div>
        </div>
      </section>

      {/* Two Eligibility Tracks Section */}
      <section className="py-16 bg-white border-y border-slate-200 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-primary mb-3">
              Strict Eligibility Standards
            </h2>
            <p className="text-slate-600 text-base">
              ZENITH service providers must satisfy at least one of these two rigorous eligibility routes before becoming publicly available for hire.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-secondary/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-secondary text-primary font-bold text-xs px-3 py-1 rounded-bl-lg">
                Route A
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Retired Professional</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                A person retired from professional employment, engineering, medicine, leadership, or business who can demonstrate career mastery.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> Continue applying your decades of knowledge on your schedule
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> Flexible remote consulting and high-impact advisory projects
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> Full control over accepted milestones and hourly rates
                </li>
              </ul>
            </Card>

            <Card className="border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-white font-bold text-xs px-3 py-1 rounded-bl-lg">
                Route B
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">5+ Years Experienced Professional</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Practitioners with verifiable professional tenure in technical, engineering, scientific, or managerial fields. Fresh graduates and junior talent are not eligible.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> Work alongside verified peers in an exclusive, noise-free marketplace
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> Access companies looking specifically for seniority and reliability
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> Transparent matching engine shows exactly why you are matched
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-primary mb-2">Specialized Disciplines</h2>
            <p className="text-slate-600">Explore vetted experienced professionals across critical industries.</p>
          </div>
          <Link href="/categories" className="text-sm font-bold text-primary hover:text-secondary mt-2 md:mt-0">
            View All 25+ Disciplines →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((c, i) => (
            <div key={i} className="p-5 bg-white rounded-xl border border-slate-200 hover:border-primary/40 transition-all flex items-start gap-4">
              <span className="text-3xl">{c.icon}</span>
              <div>
                <h4 className="font-bold text-primary text-base mb-1">{c.title}</h4>
                <p className="text-xs text-slate-500">{c.count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-slate-50 border-t border-slate-200 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-primary mb-3">Transparent 3-Step Intermediary Model</h2>
            <p className="text-slate-600 text-sm">
              ZENITH facilitates connections, contracts, and secure payments. The actual work is performed directly by the independent professional for the client.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
              <span className="w-10 h-10 rounded-full bg-primary text-white font-bold inline-flex items-center justify-center mb-4">1</span>
              <h3 className="font-bold text-primary text-lg mb-2">Scope & Match</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clients post projects with concrete experience requirements. Our matching engine pairs projects with verified specialists.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
              <span className="w-10 h-10 rounded-full bg-secondary text-primary font-bold inline-flex items-center justify-center mb-4">2</span>
              <h3 className="font-bold text-primary text-lg mb-2">Contract & Escrow</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Agree on milestones. The client funds milestones into secure escrow before work begins. Zero upfront payout risk for either party.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
              <span className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold inline-flex items-center justify-center mb-4">3</span>
              <h3 className="font-bold text-primary text-lg mb-2">Approve & Release</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The professional submits milestone deliverables. Upon client inspection and sign-off, funds are released immediately via ledger entries.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
