import { z } from 'zod';

export const createDemandSchema = z.object({
  name: z.string().min(1, 'Nome da demanda é obrigatório'),
  specialtyId: z.uuid('Deve ser um UUID válido').optional(),
});

export type CreateDemandDto = z.infer<typeof createDemandSchema>;
