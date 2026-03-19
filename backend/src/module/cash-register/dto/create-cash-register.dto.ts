import { z } from 'zod';

export const createCashRegisterSchema = z.object({
  openBalance: z.coerce.number<Number>().min(0, 'Valor de abertura não pode ser negativo').default(0),
  notes: z.string().optional().nullable(),
});

export type CreateCashRegisterDto = z.infer<typeof createCashRegisterSchema>;

export const closeCashRegisterSchema = z.object({
  closeBalance: z.coerce.number<Number>().min(0, 'Valor de fechamento não pode ser negativo'),
  notes: z.string().optional().nullable(),
});

export type CloseCashRegisterDto = z.infer<typeof closeCashRegisterSchema>;
