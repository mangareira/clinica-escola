import { z } from 'zod';

export const createServiceSchema = z.object({
  type: z.string().min(1, 'Tipo de serviço é obrigatório'),
  price: z.coerce.number().positive('Preço deve ser maior que zero').min(0.01, 'Preço deve ser maior que zero'),
});

export type CreateServiceDto = z.infer<typeof createServiceSchema>;
