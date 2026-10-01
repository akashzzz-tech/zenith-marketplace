import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface HireData {
  title: string;
  badge: string;
  headline: string;
  subheadline: string;
  whyHire: string[];
  sampleRoles: string[];
}

const HIRE_CONFIG: Record<string, HireData> = {
  'retired-engineers': {
    title: 'Hire Retired Engineers',
    badge: 'Senior Career Mastery',
    headline: 'Access Decades of Engineering Wisdom for Critical Projects',
    subheadline: 'Connect with verified retired chief engineers, technical directors, and principal specialists for remote design audits, structural peer reviews, and forensic consulting.',
    whyHire: [
      'Unmatched depth of high-consequence failure analysis',
      'Knowledge of international codes (AASHTO, ASME, IEEE, ISO)',
      'Fractional availability without executive overhead',
      'Zero entry-level learning curve on complex systems',
    ],
    sampleRoles: ['Retired Chief Structural Engineer', 'Principal Aerospace Metallurgist', 'Former VP of Subsea Engineering', 'Chief Quality Auditor'],
  },
  'experienced-engineers': {
    title: 'Hire 5+ Year Engineers',
    badge: 'Verified Senior Practitioners',
    headline: 'High-Impact Remote Engineers with Verifiable Industry Tenure',
    subheadline: 'Eliminate junior resumes. Hire verified mechanical, civil, electrical, and systems engineers with a minimum of 5 years of verified professional tenure.',
    whyHire: [
      'Strict 5+ year minimum experience qualification barrier',
      'Full milestone escrow protection prior to deliverable acceptance',
      'Transparent match scoring showing skills and timezone fit',
      'Independent contractor agreements with clear IP assignment',
    ],
    sampleRoles: ['Senior Thermal Systems Engineer', 'CAD / SolidWorks Design Specialist', 'BIM Manager & Structural Lead', 'Embedded Hardware Architect'],
  },
  'data-scientists': {
    title: 'Hire Experienced Data Scientists & AI Specialists',
    badge: 'Verified AI / ML Practitioners',
    headline: 'Production-Grade Machine Learning & Statistical Modeling',
    subheadline: 'Engage seasoned data scientists with proven records building real-world inference pipelines, LLM fine-tuning architectures, and predictive analytics systems.',
    whyHire: [
      'Production ML experience beyond tutorial notebooks',
      'Advanced statistical testing and causal inference',
      'Data security & privacy compliance built into deliverables',
      'Direct client communication with technical practitioners',
    ],
    sampleRoles: ['Staff Machine Learning Engineer', 'Principal Quantitative Modeler', 'Computer Vision Specialist', 'MLOps Infrastructure Architect'],
  },
  'software-architects': {
    title: 'Hire Experienced Software Engineers & Architects',
    badge: 'Enterprise Architecture',
    headline: 'Battle-Tested Software Engineers for High-Scale Systems',
    subheadline: 'Contract verified principal developers and systems architects with 5 to 20+ years of distributed systems and cloud engineering tenure.',
    whyHire: [
      'Proven mastery of concurrency, low-latency, and distributed fault tolerance',
      'Strict NDA and clean IP ownership on all code deliverables',
      'Milestone-gated release of funds upon code inspection',
      'Zero agency markup — transparent marketplace fee',
    ],
    sampleRoles: ['Principal Distributed Systems Architect', 'Senior Go / Rust Systems Engineer', 'Cloud Security & DevOps Lead', 'Database Internals Specialist'],
  },
  'project-managers': {
    title: 'Hire Experienced Project Managers',
    badge: 'Certified PMP & Agile Leads',
    headline: 'Deliver Complex Technical Engagements On Time and On Budget',
    subheadline: 'Deploy veteran technical project managers, certified Scrum coaches, and risk managers to lead distributed engineering programs.',
    whyHire: [
      'Certified PMP / Agile practitioners with multi-million dollar portfolio history',
      'Stakeholder alignment and cross-functional coordination',
      'Proactive bottleneck removal and delivery cadence tracking',
      'Flexible fractional or full-engagement contracts',
    ],
    sampleRoles: ['PMP Program Director', 'Enterprise Agile Coach', 'Technical Product Operations Lead', 'Infrastructure Delivery Manager'],
  },
};

export default async function HirePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = HIRE_CONFIG[slug];

  if (!config) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <section className="pt-16 pb-12 px-4 max-w-5xl mx-auto text-center">
        <Badge variant="secondary" size="md" className="mb-4">
          {config.badge}
        </Badge>
        <h1 className="text-3xl md:text-5xl font-black text-primary leading-tight mb-4">
          {config.headline}
        </h1>
        <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
          {config.subheadline}
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/post-project"
            className="bg-secondary text-primary hover:bg-secondary/90 font-bold px-8 py-3.5 rounded-xl text-sm transition-all shadow-md"
          >
            Post a Remote Project →
          </Link>
          <Link
            href="/professionals"
            className="bg-primary text-white hover:bg-primary/90 font-semibold px-6 py-3.5 rounded-xl text-sm transition-all"
          >
            Browse Verified Specialists
          </Link>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-slate-200 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="font-bold text-primary text-lg mb-3">Why Companies Choose ZENITH</h3>
            <div className="space-y-3">
              {config.whyHire.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-slate-50 border-slate-200">
            <h3 className="font-bold text-primary text-lg mb-3">Sample Verified Specialties</h3>
            <div className="space-y-2">
              {config.sampleRoles.map((role, idx) => (
                <div key={idx} className="p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800">
                  {role}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
