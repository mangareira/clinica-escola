import { z } from 'zod';

export const createCashTransactionSchema = z.object({
  type: z.enum(['Payment', 'Withdrawal', 'Adjustment']),
  paymentType: z.enum(['Cash', 'Card', 'Pix']),
  amount: z.coerce.number().min(0.01, 'O valor deve ser maior que zero'),
  notes: z.string().optional().nullable(),
});

export type CreateCashTransactionDto = z.infer<typeof createCashTransactionSchema>;
