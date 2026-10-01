import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(10),
  description: z.string().min(50),
  budget: z.number().positive(),
  experienceRequired: z.number().min(5),
});

export const updateProjectSchema = createProjectSchema.partial();

export const proposalSchema = z.object({
  coverLetter: z.string().min(100),
  rate: z.number().positive(),
});
