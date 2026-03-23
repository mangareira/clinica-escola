import { z } from "zod";

export const demandSchema = z.object({
  id: z.string(),
  name: z.string(),
  specialtyId: z.string().nullable(),
});

export const specialtySchema = z.object({
  id: z.string(),
  name: z.string(),
  serviceId: z.string().nullable(),
  demands: z.array(demandSchema).optional(),
});

export type Demand = z.infer<typeof demandSchema>;
export type Specialty = z.infer<typeof specialtySchema>;
