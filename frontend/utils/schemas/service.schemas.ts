import { z } from "zod";
import { specialtySchema } from "./specialty.schemas";

export const serviceSchema = z.object({
  id: z.string(),
  type: z.string(),
  price: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  specialties: z.array(specialtySchema).optional(),
});

export type Service = z.infer<typeof serviceSchema>;
