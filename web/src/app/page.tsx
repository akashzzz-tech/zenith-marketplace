import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';

export default function Home() {
  const categories = [
    { title: 'Software Engineering', icon: '💻', desc: 'Cloud, Systems, Architecture' },
    { title: 'Mechanical Engineering', icon: '⚙️', desc: 'CAD, FEA, Product Design' },
    { title: 'Civil & Structural Engineering', icon: '🏗️', desc: 'BIM, Infrastructure, Urban' },
    { title: 'Data Science & AI/ML', icon: '📊', desc: 'Analytics, Machine Learning, MLOps' },
    { title: 'Cybersecurity', icon: '🛡️', desc: 'Audits, Compliance, DevSecOps' },
    { title: 'Business & Project Consulting', icon: '📈', desc: 'PMP, Agile, Operations, Strategy' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-cobaltDeep/20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 md:px-8 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-cobaltDeep/10 border border-cobaltDeep/20 text-cobaltDeep px-4 py-1.5 rounded-full text-xs font-semibold mb-8 tracking-wide">
          <span>⭐ Exclusive to Retired & 5+ YOE Professionals</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-black tracking-tight leading-none mb-4">
          ZENITH
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-cobaltDeep mb-4">
          Experienced Talent. Remote Opportunities.
        </p>
        <p className="text-base md:text-lg text-black/60 max-w-3xl mx-auto leading-relaxed mb-10">
          ZENITH connects companies, startups, and institutions with verified retired professionals and industry specialists with 5+ years of relevant experience for remote project-based engagements.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/professionals"
            className="w-full sm:w-auto bg-cobaltDeep text-white hover:bg-cobaltDeep/90 px-8 py-3.5 rounded-lg font-bold text-base shadow-lg shadow-cobaltDeep/20 hover:shadow-xl transition-all"
          >
            Find Experienced Talent
          </Link>
          <Link
            href="/projects"
            className="w-full sm:w-auto bg-black text-white hover:bg-black/90 px-8 py-3.5 rounded-lg font-bold text-base shadow-lg hover:shadow-xl transition-all"
          >
            Explore Remote Projects
          </Link>
          <Link
            href="/for-professionals"
            className="w-full sm:w-auto bg-white border-2 border-black/10 text-black hover:border-cobaltDeep hover:text-cobaltDeep px-8 py-3.5 rounded-lg font-semibold text-base transition-all"
          >
            Join as a Professional
          </Link>
        </div>

        {/* Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-black rounded-2xl max-w-4xl mx-auto text-left">
          <div>
            <span className="block text-2xl font-black text-white">5+ Yrs</span>
            <span className="text-xs text-white/50 font-medium">Minimum Experience Barrier</span>
          </div>
          <div>
            <span className="block text-2xl font-black text-white">100%</span>
            <span className="text-xs text-white/50 font-medium">Pre-Vetted Credentials</span>
          </div>
          <div>
            <span className="block text-2xl font-black text-white">Escrow</span>
            <span className="text-xs text-white/50 font-medium">Milestone-Protected Payments</span>
          </div>
          <div>
            <span className="block text-2xl font-black text-white">Direct</span>
            <span className="text-xs text-white/50 font-medium">Independent Contractor Status</span>
          </div>
        </div>
      </section>

      {/* Two Eligibility Tracks */}
      <section className="py-20 bg-black/[0.02] border-y border-black/5 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-black mb-3">
              Strict Eligibility Standards
            </h2>
            <p className="text-black/50 text-base">
              ZENITH service providers must satisfy at least one of these two rigorous eligibility routes before becoming publicly available for hire.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-cobaltDeep/30 relative overflow-hidden bg-white">
              <div className="absolute top-0 right-0 bg-cobaltDeep text-white font-bold text-xs px-4 py-1.5 rounded-bl-xl">
                Route A
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Retired Professional</h3>
              <p className="text-black/50 text-sm leading-relaxed mb-4">
                A person retired from professional employment, engineering, medicine, leadership, or business who can demonstrate career mastery.
              </p>
              <ul className="space-y-2 text-sm text-black/70">
                <li className="flex items-center gap-2">
                  <span className="text-cobaltDeep font-bold">✓</span> Continue applying your decades of knowledge on your schedule
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cobaltDeep font-bold">✓</span> Flexible remote consulting and high-impact advisory projects
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cobaltDeep font-bold">✓</span> Full control over accepted milestones and hourly rates
                </li>
              </ul>
            </Card>

            <Card className="border-black/10 relative overflow-hidden bg-white">
              <div className="absolute top-0 right-0 bg-black text-white font-bold text-xs px-4 py-1.5 rounded-bl-xl">
                Route B
              </div>
              <h3 className="text-xl font-bold text-black mb-2">5+ Years Experienced Professional</h3>
              <p className="text-black/50 text-sm leading-relaxed mb-4">
                Practitioners with verifiable professional tenure in technical, engineering, scientific, or managerial fields. Fresh graduates and junior talent are not eligible.
              </p>
              <ul className="space-y-2 text-sm text-black/70">
                <li className="flex items-center gap-2">
                  <span className="text-cobaltDeep font-bold">✓</span> Work alongside verified peers in an exclusive, noise-free marketplace
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cobaltDeep font-bold">✓</span> Access companies looking specifically for seniority and reliability
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cobaltDeep font-bold">✓</span> Transparent matching engine shows exactly why you are matched
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-black mb-2">Specialized Disciplines</h2>
            <p className="text-black/50">Explore vetted experienced professionals across critical industries.</p>
          </div>
          <Link href="/categories" className="text-sm font-bold text-cobaltDeep hover:text-cobaltDeep/80 mt-2 md:mt-0 transition-colors">
            View All 25+ Disciplines →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((c, i) => (
            <div key={i} className="p-6 bg-white rounded-xl border border-black/5 hover:border-cobaltDeep/40 hover:shadow-lg transition-all flex items-start gap-4">
              <span className="text-3xl">{c.icon}</span>
              <div>
                <h4 className="font-bold text-black text-base mb-1">{c.title}</h4>
                <p className="text-xs text-black/40">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-black text-white px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-white mb-3">Transparent 3-Step Intermediary Model</h2>
            <p className="text-white/50 text-sm">
              ZENITH facilitates connections, contracts, and secure payments. The actual work is performed directly by the independent professional for the client.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center">
              <span className="w-12 h-12 rounded-full bg-cobaltDeep text-white font-bold text-lg inline-flex items-center justify-center mb-5">1</span>
              <h3 className="font-bold text-white text-lg mb-3">Scope & Match</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Clients post projects with concrete experience requirements. Our matching engine pairs projects with verified specialists.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center">
              <span className="w-12 h-12 rounded-full bg-secondary text-black font-bold text-lg inline-flex items-center justify-center mb-5">2</span>
              <h3 className="font-bold text-white text-lg mb-3">Contract & Escrow</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Agree on milestones. The client funds milestones into secure escrow before work begins. Zero upfront payout risk for either party.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center">
              <span className="w-12 h-12 rounded-full bg-success text-white font-bold text-lg inline-flex items-center justify-center mb-5">3</span>
              <h3 className="font-bold text-white text-lg mb-3">Approve & Release</h3>
              <p className="text-sm text-white/50 leading-relaxed">
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
