import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { VerificationStatusBadge } from '@/components/verification/VerificationStatus';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

export default async function ProfessionalProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Mock public profile data
  const pro = {
    id,
    name: 'Dr. Arthur Vance, PE',
    title: 'Retired Chief Structural Engineer (32 YOE)',
    industry: 'Civil & Structural Engineering',
    specialization: 'Seismic Dynamics & High-Consequence Foundations',
    yearsExperience: 32,
    isRetired: true,
    country: 'United States',
    timeZone: 'UTC-5 (EST)',
    hourlyRateCents: 12500,
    verificationStatus: 'verified' as const,
    bio: `Retired Vice President of Infrastructure Engineering at Bechtel Corp. Over 32 years directing high-consequence civil projects across North America, East Asia, and the Middle East. Specialized in nonlinear structural dynamics, deep foundation pile integrity, and forensic structural investigations.

Now exclusively available for remote consulting, technical peer reviews, third-party code verification, and high-level architectural advisement.`,
    skills: ['Seismic Dynamics', 'Foundation Engineering', 'AASHTO Code', 'ETABS', 'Forensic Engineering', 'Structural Retrofitting', 'Quality Assurance'],
    experience: [
      { role: 'VP of Infrastructure Engineering', org: 'Bechtel Corporation', period: '2004 - 2022 (Retired)', desc: 'Led engineering audit teams for $500M+ international civil developments.' },
      { role: 'Principal Structural Lead', org: 'Arup', period: '1992 - 2004', desc: 'Designed seismic damping systems for high-rise commercial structures.' }
    ],
    education: [
      { degree: 'Ph.D. in Structural Engineering', school: 'University of California, Berkeley' },
      { degree: 'B.S. in Civil Engineering', school: 'Purdue University' }
    ],
    certifications: [
      { name: 'Licensed Professional Engineer (PE) - Structural', org: 'NCEES' },
      { name: 'Seismic Evaluation Specialist', org: 'ASCE' }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-10 w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Avatar name={pro.name} size="xl" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-black text-primary">{pro.name}</h1>
                    <VerificationStatusBadge status={pro.verificationStatus} />
                  </div>
                  <p className="text-sm font-semibold text-slate-700">{pro.title}</p>
                  <p className="text-xs text-slate-500 mt-1">📍 {pro.country} • {pro.timeZone}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                <Badge variant="secondary">🎖️ Retired Professional Route</Badge>
                <Badge variant="default">32+ Years Career Mastery</Badge>
                <Badge variant="outline">{pro.industry}</Badge>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-primary text-base mb-3">About & Professional Background</h3>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {pro.bio}
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-primary text-base mb-4">Past Career Roles & Experience</h3>
              <div className="space-y-4">
                {pro.experience.map((exp, i) => (
                  <div key={i} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-primary text-sm">{exp.role}</h4>
                      <span className="text-xs text-slate-400">{exp.period}</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-600 block mb-1">{exp.org}</span>
                    <p className="text-xs text-slate-500">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-bold text-primary text-base mb-3">Education</h3>
                <div className="space-y-2">
                  {pro.education.map((edu, i) => (
                    <div key={i}>
                      <span className="font-semibold text-slate-800 text-xs block">{edu.degree}</span>
                      <span className="text-xs text-slate-500">{edu.school}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-primary text-base mb-3">Verified Licenses</h3>
                <div className="space-y-2">
                  {pro.certifications.map((cert, i) => (
                    <div key={i}>
                      <span className="font-semibold text-slate-800 text-xs block">{cert.name}</span>
                      <span className="text-xs text-slate-500">{cert.org}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Sidebar Action */}
          <div className="space-y-6">
            <Card className="p-6 text-center">
              <span className="text-xs text-slate-500 block mb-1">Hourly Consultation Rate</span>
              <span className="text-3xl font-black text-emerald-700 block mb-4">
                {formatCurrency(pro.hourlyRateCents)}/hr
              </span>

              <Link
                href={`/client/contracts/new?proId=${pro.id}`}
                className="w-full inline-block bg-primary text-white hover:bg-primary/90 font-bold text-sm py-3 rounded-xl mb-3 transition-colors"
              >
                Hire / Make Contract Offer
              </Link>
              <Link
                href={`/client/messages?recipient=${pro.id}`}
                className="w-full inline-block bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-sm py-2.5 rounded-xl transition-colors"
              >
                Send Message
              </Link>
            </Card>

            <Card className="p-6">
              <h4 className="font-bold text-primary text-sm mb-3">Core Technical Skills</h4>
              <div className="flex flex-wrap gap-1.5">
                {pro.skills.map((skill, i) => (
                  <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
