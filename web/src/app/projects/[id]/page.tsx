'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MatchScore } from '@/components/matching/MatchScore';
import { Modal } from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import { formatCurrency } from '@/lib/utils';

export default function ProjectDetailPage() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [proposedPrice, setProposedPrice] = useState(4500);
  const [estimatedDays, setEstimatedDays] = useState(30);
  const [submitted, setSubmitted] = useState(false);

  // Mock project detail
  const project = {
    id: 'p1',
    title: 'Seismic Stability Review for High-Rise Commercial Foundation',
    companyName: 'Apex Urban Developments',
    category: 'Civil & Structural Engineering',
    industry: 'Commercial Real Estate',
    minYearsExperience: 10,
    budgetMinCents: 400000,
    budgetMaxCents: 600000,
    isHourly: false,
    expectedDuration: '1 to 2 Months',
    timeZoneRequirement: 'UTC-5 (EST) with 3hr overlap',
    remoteRequirement: 'Fully Remote',
    confidentialityRequired: true,
    description: `Apex Urban Developments requires an experienced structural engineer or retired chief engineer to perform independent seismic analysis and foundation verification for a 42-story commercial tower.
    
Scope of Work:
1. Independent review of geotechnical soil-structure interaction reports.
2. Verification of ETABS 3D finite element nonlinear response spectrum models.
3. Review of pile cap reinforcement and diaphragm transfer slab calculations.
4. Formal engineering certification memorandum of structural adequacy under local seismic codes.`,
    skills: ['Seismic Analysis', 'ETABS', 'Foundation Engineering', 'AASHTO / IBC Code', 'PE License'],
    milestones: [
      { title: 'Geotechnical & Soil Model Review', amountCents: 150000, deadline: 'Day 10' },
      { title: 'Nonlinear Dynamic Model Cross-Verification', amountCents: 200000, deadline: 'Day 25' },
      { title: 'Final Structural Review Memorandum & Sign-off', amountCents: 150000, deadline: 'Day 40' },
    ]
  };

  // Mock match score breakdown for logged-in professional
  const matchBreakdown = {
    skills: 32,
    experience: 25,
    industry: 15,
    timezone: 14,
    rate: 9,
    total: 95,
    reasons: [
      '32 Years Experience meets the 10+ YOE requirement',
      'Retired Chief Structural Engineer background',
      'Core overlap in ETABS, Seismic Modeling & Foundation Engineering',
      'Available during required UTC-5 working hours',
      'Rate proposal fits within client budget window'
    ]
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setIsApplyModalOpen(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-10 w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" size="sm">{project.category}</Badge>
                <Badge variant="secondary" size="sm">Requires {project.minYearsExperience}+ YOE or Retired</Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-primary leading-tight mb-2">
                {project.title}
              </h1>
              <p className="text-sm text-slate-500">
                Posted by <strong>{project.companyName}</strong> • Industry: {project.industry}
              </p>
            </div>

            <Card className="p-6">
              <h3 className="font-bold text-primary text-base mb-3">Project Scope & Specifications</h3>
              <div className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                {project.description}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-primary text-base mb-3">Proposed Project Milestones</h3>
              <div className="space-y-3">
                {project.milestones.map((m, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <span className="font-bold text-primary text-sm block">{m.title}</span>
                      <span className="text-xs text-slate-500">Target Delivery: {m.deadline}</span>
                    </div>
                    <span className="text-sm font-bold text-emerald-700">
                      {formatCurrency(m.amountCents)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 text-center">
              <span className="text-xs text-slate-500 block mb-1">Fixed Milestone Budget</span>
              <span className="text-2xl font-black text-emerald-700 block mb-4">
                {formatCurrency(project.budgetMinCents)} – {formatCurrency(project.budgetMaxCents)}
              </span>

              <Button
                onClick={() => setIsApplyModalOpen(true)}
                className="w-full py-3 font-bold text-sm mb-3"
              >
                Submit Proposal
              </Button>
              <p className="text-[11px] text-slate-400">
                Escrow protected • Direct client intermediary contract
              </p>
            </Card>

            {/* Transparent Match Score Card */}
            <MatchScore breakdown={matchBreakdown} />

            <Card className="p-5 text-xs space-y-2 text-slate-600">
              <span className="font-bold text-primary block text-sm mb-1">Requirements Snapshot</span>
              <div>⏱ <strong>Duration:</strong> {project.expectedDuration}</div>
              <div>📍 <strong>Location:</strong> {project.remoteRequirement}</div>
              <div>🌐 <strong>Timezone:</strong> {project.timeZoneRequirement}</div>
              <div>🔒 <strong>Confidentiality:</strong> Non-Disclosure Agreement Required</div>
            </Card>
          </div>
        </div>
      </main>

      {/* Proposal Modal */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title="Submit Proposal to Client"
        description="Detail your relevant background and proposed milestone execution."
      >
        {submitted ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl text-center">
            ✓ Proposal submitted successfully! The client will review your verified profile.
          </div>
        ) : (
          <form onSubmit={handleApply} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Proposed Total ($ USD)"
                type="number"
                value={proposedPrice}
                onChange={(e) => setProposedPrice(Number(e.target.value))}
                required
              />
              <Input
                label="Estimated Timeline (Days)"
                type="number"
                value={estimatedDays}
                onChange={(e) => setEstimatedDays(Number(e.target.value))}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Cover Letter & Relevant Project Experience
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={5}
                placeholder="Highlight your previous engineering leadership, similar high-rise foundations analyzed, or specific methodology..."
                className="w-full border border-slate-300 rounded-lg p-2.5 text-xs"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Send Proposal & Milestones →
            </Button>
          </form>
        )}
      </Modal>

      <Footer />
    </div>
  );
}
