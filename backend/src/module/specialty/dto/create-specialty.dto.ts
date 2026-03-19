import { z } from 'zod';

export const createSpecialtySchema = z.object({
  name: z.string().min(1, 'Nome da especialidade é obrigatório'),
  serviceId: z.uuid('Deve ser um UUID válido').optional(),
});

export type CreateSpecialtyDto = z.infer<typeof createSpecialtySchema>;
