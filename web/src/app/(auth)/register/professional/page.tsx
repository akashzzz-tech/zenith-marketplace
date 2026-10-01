'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { createClient } from '@/lib/supabase/client';

export default function RegisterProfessional() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    eligibilityRoute: 'five_plus_years' as 'retired_professional' | 'five_plus_years',
    yearsOfExperience: 5,
    professionalTitle: '',
    industry: 'Software Engineering',
    specialization: '',
    hourlyRate: 75,
    country: 'United States',
    timeZone: 'UTC-5 (EST)',
    bio: '',
    skills: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (step === 1) {
      if (!formData.email || !formData.password) {
        setError('Email and password are required');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (formData.eligibilityRoute === 'five_plus_years' && formData.yearsOfExperience < 5) {
        setError('Under Route B, a minimum of 5 years of verifiable experience is required.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!formData.fullName || !formData.professionalTitle || !formData.specialization) {
        setError('Please fill in all required professional fields.');
        return;
      }
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            role: 'professional',
          },
        },
      });

      if (authError) throw authError;

      // Upon signup, the database triggers create the profile and professional_profile
      router.push('/pro');
    } catch (err: any) {
      setError(err?.message || 'Failed to complete registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 flex items-center justify-center">
      <div className="max-w-xl w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-black text-primary tracking-tight">
            ZENITH
          </Link>
          <h1 className="text-2xl font-bold text-primary mt-2">Professional Onboarding</h1>
          <p className="text-xs text-slate-500 mt-1">
            Exclusive to Retired Professionals & Specialists with 5+ Years Experience
          </p>

          {/* Stepper Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 1 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'
              }`}
            >
              1
            </span>
            <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-primary' : 'bg-slate-200'}`} />
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 2 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'
              }`}
            >
              2
            </span>
            <div className={`w-8 h-0.5 ${step >= 3 ? 'bg-primary' : 'bg-slate-200'}`} />
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 3 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'
              }`}
            >
              3
            </span>
          </div>
        </div>

        <Card className="p-8">
          {error && (
            <div className="mb-6 p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleNext}>
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-primary mb-2">Step 1: Account Credentials</h3>
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Password (min 8 characters)"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <Button type="submit" className="w-full mt-4">
                  Continue to Eligibility Selection →
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h3 className="text-base font-bold text-primary mb-1">Step 2: Eligibility Route</h3>
                <p className="text-xs text-slate-500 mb-4">
                  Select the qualification route matching your career background. Manual documentation review follows.
                </p>

                <div
                  onClick={() => setFormData((p) => ({ ...p, eligibilityRoute: 'retired_professional' }))}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.eligibilityRoute === 'retired_professional'
                      ? 'border-secondary bg-secondary/10'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-primary text-sm">Route A: Retired Professional</span>
                    <Badge variant="secondary" size="sm">Route A</Badge>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    You have retired from professional employment/engineering/leadership and can demonstrate relevant career mastery.
                  </p>
                </div>

                <div
                  onClick={() => setFormData((p) => ({ ...p, eligibilityRoute: 'five_plus_years' }))}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.eligibilityRoute === 'five_plus_years'
                      ? 'border-primary bg-primary/5'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-primary text-sm">Route B: 5+ Years Experience</span>
                    <Badge variant="default" size="sm">Route B</Badge>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    You possess 5 or more years of verifiable active tenure in your discipline. Fresh graduates & junior applicants are not eligible.
                  </p>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Total Years of Relevant Experience
                  </label>
                  <input
                    type="number"
                    min={formData.eligibilityRoute === 'five_plus_years' ? 5 : 0}
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg p-2 text-sm"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button type="submit" className="flex-1">
                    Next: Profile Details →
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-primary mb-1">Step 3: Professional Profile</h3>
                <Input
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Professional Title (e.g., Principal Mechanical Engineer)"
                  name="professionalTitle"
                  value={formData.professionalTitle}
                  onChange={handleChange}
                  required
                />
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Industry</label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg p-2 text-sm"
                  >
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Data Science & AI">Data Science & AI</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Project Management">Project Management</option>
                    <option value="Technical Consulting">Technical Consulting</option>
                  </select>
                </div>
                <Input
                  label="Primary Specialization (e.g., CAD / SolidWorks / Structural FEA)"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Hourly Rate ($ USD)"
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex gap-3 pt-3">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                    Back
                  </Button>
                  <Button type="submit" loading={loading} className="flex-1">
                    Complete & Enter Dashboard
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
}
