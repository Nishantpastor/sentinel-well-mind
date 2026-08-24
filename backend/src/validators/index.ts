import { z } from "zod";

export const loginSchema = z.object({
  serviceId: z.string().min(1, "Service ID is required"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["personnel", "welfare", "commander", "admin"]).optional(),
});

export const checkInSchema = z.object({
  stress: z.number().min(1).max(10),
  sleep: z.number().min(1).max(5),
  energy: z.number().min(1).max(5),
  workload: z.number().min(1).max(5),
  mood: z.string().optional(),
});

export const assessmentSchema = z.object({
  stress: z.number().min(1).max(10).optional(),
  sleep: z.number().min(1).max(5).optional(),
  energy: z.number().min(1).max(5).optional(),
  workload: z.string().or(z.number()).optional(),
  exhaustion: z.string().optional(),
  balance: z.string().optional(),
  support: z.enum(["yes", "no"]).optional(),
});

export const createInterventionSchema = z.object({
  personnelId: z.string().min(1, "Personnel ID is required"),
  type: z.string().min(1, "Intervention type is required"),
  officer: z.string().optional(),
  date: z.string().optional(),
  status: z.enum(["Pending", "In Progress", "Completed", "Follow-up Required"]).default("In Progress"),
  followUp: z.string().optional(),
  restricted: z.boolean().default(true),
  notes: z.string().optional(),
});

export const updateConsentSchema = z.object({
  wellnessData: z.boolean().optional(),
  optionalData: z.boolean().optional(),
  analyticsParticipation: z.boolean().optional(),
  biometricData: z.boolean().optional(), // Must remain false or rejected in prototype
});
