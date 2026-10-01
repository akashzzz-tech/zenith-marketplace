'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ProjectCard } from '@/components/project/ProjectCard';

export default function ProjectsPage() {
  const [search, setSearch] = useState('');

  const mockProjects = [
    {
      id: 'p1',
      title: 'Seismic Stability Review for High-Rise Commercial Foundation',
      companyName: 'Apex Urban Developments',
      category: 'Civil Engineering',
      industry: 'Construction & Real Estate',
      minYearsExperience: 10,
      budgetMinCents: 800000,
      budgetMaxCents: 1500000,
      isHourly: false,
      expectedDuration: '1 Month',
      requiredSkills: ['Seismic Analysis', 'Geotechnical Review', 'ETABS', 'PE License'],
      proposalCount: 4
    },
    {
      id: 'p2',
      title: 'Architectural Overhaul of Financial Ledger Microservices',
      companyName: 'FinNova Technologies',
      category: 'Software Engineering',
      industry: 'Fintech',
      minYearsExperience: 8,
      budgetMinCents: 9000,
      budgetMaxCents: 13000,
      isHourly: true,
      expectedDuration: '3-6 Months',
      requiredSkills: ['Go', 'PostgreSQL', 'Double-Entry Accounting', 'Distributed Tracing'],
      proposalCount: 7
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-primary mb-2">Explore Remote Projects</h1>
          <p className="text-slate-600 text-sm">
            Opportunities posted by vetted companies seeking verified senior & retired expertise.
          </p>
        </div>

        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Search projects by keyword, skill, or discipline..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockProjects.map((proj) => (
            <ProjectCard key={proj.id} {...proj} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
