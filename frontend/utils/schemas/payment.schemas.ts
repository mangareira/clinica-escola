import { z } from 'zod';

export const paymentFormSchema = z.object({
  amount: z
    .number()
    .min(0, 'O valor não pode ser negativo')
    .positive('O valor deve ser positivo'),
  paymentType: z.enum(['Cash', 'Card', 'Pix'], {
    error: () => ({ message: 'Selecione um método de pagamento' }),
  }),
});

export type PaymentFormValues = z.infer<typeof paymentFormSchema>;
