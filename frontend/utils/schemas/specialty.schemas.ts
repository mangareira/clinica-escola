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
  demands: z.array(demandSchema).nullable(),
});

export type Demand = z.infer<typeof demandSchema>;
export type Specialty = z.infer<typeof specialtySchema>;



export const createDemandSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "O nome da demanda é obrigatório"),
  specialtyId: z.string().nullable().optional(),
});

export const createSpecialtySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "O nome da especialidade é obrigatório"),
  serviceId: z.string().nullable().optional(),
  demands: z.array(createDemandSchema).optional(),
});
export const editServiceSchema = z.object({
  id: z.string(),
  type: z.string().min(1, "O tipo é obrigatório"),
  price: z.coerce.number().min(0, "O valor não pode ser negativo"),
  specialties: z.array(createSpecialtySchema).nullable(),
});

export type CreateDemandFormValues = z.infer<typeof createDemandSchema>;
export type CreateSpecialtyFormValues = z.infer<typeof createSpecialtySchema>;
export type EditServiceFormValues = z.infer<typeof editServiceSchema>;
