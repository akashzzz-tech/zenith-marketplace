'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { createClient } from '@/lib/supabase/client';

export default function PostProjectPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Software Engineering',
    industry: 'Technology & Cloud',
    description: '',
    minYearsExperience: 5,
    isHourly: false,
    budgetMin: 3000,
    budgetMax: 6000,
    currency: 'USD',
    expectedDuration: '1 to 3 months',
    remoteRequirement: 'Fully Remote',
    timeZoneRequirement: 'Any Timezone with 3hr Overlap',
    confidentialityRequired: true,
    skills: 'TypeScript, Next.js, PostgreSQL, Distributed Systems',
    milestones: [
      { title: 'System Architecture & Schema Design', amount: 1500, deadlineDays: 14 },
      { title: 'Core Implementation & Integration', amount: 3000, deadlineDays: 45 },
      { title: 'Testing, Auditing & Final Handover', amount: 1500, deadlineDays: 60 },
    ],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMilestoneChange = (index: number, field: string, value: any) => {
    setFormData((prev) => {
      const updated = [...prev.milestones];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, milestones: updated };
    });
  };

  const addMilestone = () => {
    setFormData((prev) => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        { title: `Milestone ${prev.milestones.length + 1}`, amount: 1000, deadlineDays: 30 },
      ],
    }));
  };

  const removeMilestone = (index: number) => {
    if (formData.milestones.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (isDraft = false) => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      // If user isn't logged in, redirect to login with callback
      if (!user) {
        router.push('/login?redirect=/post-project');
        return;
      }

      // Project insertion
      const { data, error: insertError } = await supabase.from('projects').insert({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        industry: formData.industry,
        min_years_experience: Number(formData.minYearsExperience),
        budget_min_cents: Math.round(Number(formData.budgetMin) * 100),
        budget_max_cents: Math.round(Number(formData.budgetMax) * 100),
        currency: formData.currency,
        is_hourly: formData.isHourly,
        expected_duration: formData.expectedDuration,
        remote_requirement: formData.remoteRequirement,
        time_zone_requirement: formData.timeZoneRequirement,
        confidentiality_required: formData.confidentialityRequired,
        status: isDraft ? 'draft' : 'pending_review',
      }).select().single();

      if (insertError) throw insertError;

      router.push(`/projects/${data?.id || ''}?posted=true`);
    } catch (err: any) {
      setError(err?.message || 'Failed to submit project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12 w-full flex-1">
        <div className="mb-8 text-center">
          <Badge variant="secondary" size="md">Client Project Posting Wizard</Badge>
          <h1 className="text-3xl md:text-4xl font-black text-primary mt-2">Post a Remote Project</h1>
          <p className="text-slate-600 text-sm mt-1">
            Specify requirements to match with verified retired specialists and 5+ YOE professionals.
          </p>

          {/* Stepper */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {['Scope & Title', 'Experience & Skills', 'Budget & Milestones', 'Review & Post'].map((label, idx) => (
              <React.Fragment key={idx}>
                <div
                  onClick={() => setStep(idx + 1)}
                  className={`cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                    step === idx + 1
                      ? 'bg-primary text-white shadow-sm'
                      : step > idx + 1
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  <span>{step > idx + 1 ? '✓' : idx + 1}</span>
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {idx < 3 && <div className="w-4 h-0.5 bg-slate-300" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
            {error}
          </div>
        )}

        <Card className="p-8">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-primary">Step 1: Project Scope & Fundamentals</h3>
              
              <Input
                label="Project Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Lead Avionics Firmware Verification & Fault Analysis"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Discipline / Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm"
                  >
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil & Structural">Civil & Structural</option>
                    <option value="Data Science & AI">Data Science & AI</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Industrial & Manufacturing">Industrial & Manufacturing</option>
                    <option value="Aerospace & Automotive">Aerospace & Automotive</option>
                    <option value="Project Management">Project Management</option>
                    <option value="Technical Consulting">Technical Consulting</option>
                  </select>
                </div>
                <Input
                  label="Industry Vertical"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="e.g. Aerospace, Defense, Healthcare Tech"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Detailed Project Description & Scope
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Describe your technical objectives, deliverables, existing systems, and expectations..."
                  className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => setStep(2)}>
                  Next: Experience & Skills →
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-primary">Step 2: Experience & Seniority Requirements</h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Minimum Experience Threshold (Years)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={5}
                    max={30}
                    step={1}
                    name="minYearsExperience"
                    value={formData.minYearsExperience}
                    onChange={handleChange}
                    className="flex-1 accent-primary"
                  />
                  <span className="text-sm font-bold text-primary px-3 py-1 bg-slate-100 rounded-lg border border-slate-200">
                    {formData.minYearsExperience}+ Years
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Under ZENITH rules, junior candidates below 5 YOE are automatically excluded. Retired veterans with mastery are always welcome to apply.
                </p>
              </div>

              <Input
                label="Required Skills (comma separated)"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g. SolidWorks, FEA, Thermal Modeling, ISO 13485"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Expected Duration"
                  name="expectedDuration"
                  value={formData.expectedDuration}
                  onChange={handleChange}
                  placeholder="e.g. 2 months, 6 months"
                />
                <Input
                  label="Timezone Overlap Requirement"
                  name="timeZoneRequirement"
                  value={formData.timeZoneRequirement}
                  onChange={handleChange}
                  placeholder="e.g. UTC-5 with 4hr daily overlap"
                />
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="confidentialityRequired"
                    checked={formData.confidentialityRequired}
                    onChange={handleChange}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-xs font-semibold text-slate-800">
                    Strict Confidentiality & NDA Acceptance Required Prior to Kickoff
                  </span>
                </label>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(1)}>← Back</Button>
                <Button onClick={() => setStep(3)}>Next: Budget & Milestones →</Button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-primary">Step 3: Budget & Escrow Milestones</h3>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, isHourly: false }))}
                  className={`flex-1 py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                    !formData.isHourly
                      ? 'border-primary bg-primary text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Fixed Milestone Budget (Recommended)
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, isHourly: true }))}
                  className={`flex-1 py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                    formData.isHourly
                      ? 'border-primary bg-primary text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Hourly Rate Budget
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label={formData.isHourly ? "Min Hourly ($/hr)" : "Min Budget ($ USD)"}
                  type="number"
                  name="budgetMin"
                  value={formData.budgetMin}
                  onChange={handleChange}
                  required
                />
                <Input
                  label={formData.isHourly ? "Max Hourly ($/hr)" : "Max Budget ($ USD)"}
                  type="number"
                  name="budgetMax"
                  value={formData.budgetMax}
                  onChange={handleChange}
                  required
                />
              </div>

              {!formData.isHourly && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Proposed Project Milestones
                    </span>
                    <button
                      type="button"
                      onClick={addMilestone}
                      className="text-xs font-semibold text-secondary hover:underline"
                    >
                      + Add Milestone
                    </button>
                  </div>

                  {formData.milestones.map((m, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-primary">Milestone {idx + 1}</span>
                        {formData.milestones.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMilestone(idx)}
                            className="text-xs text-rose-600 hover:underline"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={m.title}
                          onChange={(e) => handleMilestoneChange(idx, 'title', e.target.value)}
                          placeholder="Milestone Title / Deliverable"
                          className="md:col-span-2 text-xs border border-slate-300 rounded-lg p-2"
                        />
                        <input
                          type="number"
                          value={m.amount}
                          onChange={(e) => handleMilestoneChange(idx, 'amount', Number(e.target.value))}
                          placeholder="Amount ($)"
                          className="text-xs border border-slate-300 rounded-lg p-2 font-semibold"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(2)}>← Back</Button>
                <Button onClick={() => setStep(4)}>Next: Review & Confirm →</Button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-primary">Step 4: Review Project Details</h3>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Title:</span>
                  <span className="font-bold text-primary">{formData.title || 'Untitled Project'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Discipline & Industry:</span>
                  <span className="font-semibold">{formData.category} • {formData.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Required Experience:</span>
                  <span className="font-bold text-secondary">{formData.minYearsExperience}+ YOE or Retired</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Budget Range:</span>
                  <span className="font-bold text-emerald-700">
                    ${formData.budgetMin} – ${formData.budgetMax} {formData.isHourly ? '/hr' : 'Total'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Milestones Defined:</span>
                  <span>{formData.milestones.length} milestones</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 leading-normal">
                <strong>Platform Review Notice:</strong> Once submitted, our moderation team inspects project scopes to ensure compliance with legal safe harbor standards and confidentiality regulations before public publication.
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(3)}>← Back</Button>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => handleSubmit(true)} loading={loading}>
                    Save Draft
                  </Button>
                  <Button onClick={() => handleSubmit(false)} loading={loading}>
                    Submit Project for Review 🚀
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      </main>

      <Footer />
    </div>
  );
}
