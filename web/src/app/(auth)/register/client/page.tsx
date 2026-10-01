'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { createClient } from '@/lib/supabase/client';

export default function RegisterClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    companyName: '',
    jobTitle: '',
    industry: 'Software & Technology',
    companySize: '11-50 employees',
    country: 'United States',
    website: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            role: 'client',
            company_name: formData.companyName,
          },
        },
      });

      if (authError) throw authError;

      router.push('/client');
    } catch (err: any) {
      setError(err?.message || 'Failed to complete client registration');
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
          <h1 className="text-2xl font-bold text-primary mt-2">Client / Company Registration</h1>
          <p className="text-xs text-slate-500 mt-1">
            Hire verified senior specialists & retired engineering experts for remote projects
          </p>
        </div>

        <Card className="p-8">
          {error && (
            <div className="mb-6 p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-base font-bold text-primary">Company & Representative Details</h3>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Your Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <Input
                label="Your Job Title / Role"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Company / Entity Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company Size</label>
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm"
                >
                  <option value="1-10 employees">1–10 employees</option>
                  <option value="11-50 employees">11–50 employees</option>
                  <option value="51-200 employees">51–200 employees</option>
                  <option value="201-1000 employees">201–1,000 employees</option>
                  <option value="1000+ employees">1,000+ employees</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Company Website (optional)"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://company.com"
              />
              <Input
                label="Country / Headquarter"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>

            <div className="pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Account Security
              </h4>
              <Input
                label="Work Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Password"
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
              </div>
            </div>

            <Button type="submit" loading={loading} className="w-full mt-4">
              Create Client Account & Post Projects →
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
