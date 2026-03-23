import { z } from 'zod';

export const createAppointmentPaymentSchema = z.object({
  paymentType: z.enum(['Cash', 'Card', 'Pix']),
  amount: z.coerce.number().min(0.01, 'O valor deve ser maior que zero'),
});

export type CreateAppointmentPaymentDto = z.infer<typeof createAppointmentPaymentSchema>;

export const appointmentPaymentParamSchema = z.object({
  appointmentId: z.uuid('Deve ser um UUID válido de agendamento'),
});

export type AppointmentPaymentParamDto = z.infer<typeof appointmentPaymentParamSchema>;
