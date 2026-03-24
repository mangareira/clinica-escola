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

export const createServiceSchema = z.object({
  type: z.string().min(1, "O tipo é obrigatório"),
  price: z.coerce.number<number>().min(0, "O valor não pode ser negativo"),
})

export type CreateServiceFormValues = z.infer<typeof createServiceSchema>

export type Service = z.infer<typeof serviceSchema>;
