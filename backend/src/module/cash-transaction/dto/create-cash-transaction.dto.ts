import { z } from 'zod';

export const createCashTransactionSchema = z.object({
  type: z.enum(['Payment', 'Withdrawal', 'Adjustment'], {
    error: 'O tipo da transação é obrigatório',
  }),
  paymentType: z.enum(['Cash', 'Card', 'Pix'], {
    error: 'A forma de pagamento é obrigatória',
  }),
  amount: z.coerce.number().min(0.01, 'O valor deve ser maior que zero'),
  notes: z.string().optional().nullable(),
});

export type CreateCashTransactionDto = z.infer<typeof createCashTransactionSchema>;
