import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerProfessionalSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  eligibility: z.enum(['RETIRED', 'EXPERIENCED']),
  fullName: z.string().min(2),
});

export const registerClientSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  companyName: z.string().min(2),
  industry: z.string(),
});
