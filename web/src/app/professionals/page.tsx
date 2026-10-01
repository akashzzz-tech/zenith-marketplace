'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ProfessionalCard } from '@/components/professional/ProfessionalCard';

export default function ProfessionalsPage() {
  const [search, setSearch] = useState('');
  const [filterExp, setFilterExp] = useState('all');

  const mockPros = [
    {
      id: '1',
      name: 'Dr. Arthur Vance',
      title: 'Retired Chief Structural Engineer (32 YOE)',
      industry: 'Civil Engineering',
      yearsExperience: 32,
      isRetired: true,
      country: 'United States',
      hourlyRateCents: 12500,
      verificationStatus: 'verified' as const,
      topSkills: ['Structural Dynamics', 'Seismic Retrofit', 'AASHTO Code', 'BIM'],
      bioSnippet: 'Former VP of Infrastructure at Bechtel. Available for high-consequence civil reviews, foundation audits, and forensic engineering consultations.'
    },
    {
      id: '2',
      name: 'Elena Rostova',
      title: 'Principal Distributed Systems Architect (14 YOE)',
      industry: 'Software Engineering',
      yearsExperience: 14,
      isRetired: false,
      country: 'Germany',
      hourlyRateCents: 11000,
      verificationStatus: 'verified' as const,
      topSkills: ['Go', 'Kubernetes', 'High-Throughput Kafka', 'Rust'],
      bioSnippet: 'Ex-Siemens tech lead specializing in fault-tolerant event-driven pipelines and low-latency microservice architectures.'
    },
    {
      id: '3',
      name: 'Michael Chen, PE',
      title: 'Senior Mechanical Design Specialist (18 YOE)',
      industry: 'Mechanical Engineering',
      yearsExperience: 18,
      isRetired: false,
      country: 'Canada',
      hourlyRateCents: 9500,
      verificationStatus: 'verified' as const,
      topSkills: ['SolidWorks', 'ANSYS FEA', 'Injection Molding', 'DFM'],
      bioSnippet: 'Over 18 years taking complex hardware from prototype CAD through mass tooling and precision manufacturing.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-primary mb-2">Find Experienced Talent</h1>
          <p className="text-slate-600 text-sm">
            Search verified professionals with 5+ years of experience and retired industry leaders.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by skill, industry, or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={filterExp}
            onChange={(e) => setFilterExp(e.target.value)}
            className="bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-700"
          >
            <option value="all">All Experience Levels</option>
            <option value="retired">Retired Professionals</option>
            <option value="10plus">10+ Years Experience</option>
            <option value="5plus">5+ Years Experience</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockPros.map((pro) => (
            <ProfessionalCard key={pro.id} {...pro} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
