import { z } from 'zod';

export const professionalProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  professionalTitle: z.string().min(3, 'Professional title is required (e.g. Principal Mechanical Engineer)'),
  eligibilityRoute: z.enum(['retired_professional', 'five_plus_years'], {
    required_error: 'Select your verified eligibility track',
  }),
  yearsOfExperience: z.coerce.number().min(0).refine((val) => val >= 5, {
    message: 'Must have at least 5 years of verified professional experience, or apply via Retired route',
  }),
  industry: z.string().min(2, 'Select your primary industry'),
  specialization: z.string().min(2, 'Primary specialization is required'),
  hourlyRate: z.coerce.number().min(15, 'Minimum hourly rate is $15/hr'),
  country: z.string().min(2, 'Country is required'),
  timeZone: z.string().min(2, 'Timezone is required'),
  bio: z.string().min(50, 'Provide a comprehensive bio highlighting your career achievements (min 50 characters)'),
  skills: z.array(z.string()).min(2, 'Specify at least 2 primary skills'),
});

export const clientProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  companyName: z.string().min(2, 'Company or organization name is required'),
  jobTitle: z.string().min(2, 'Your role/title in the organization is required'),
  industry: z.string().min(2, 'Company industry is required'),
  companySize: z.string().min(1, 'Select company size'),
  website: z.string().url('Enter a valid URL').optional().or(z.literal('')),
  country: z.string().min(2, 'Country is required'),
  description: z.string().min(20, 'Company description must be at least 20 characters'),
});
