import { z } from 'zod';

export const appointmentSessionParamSchema = z.object({
  appointmentId: z.uuid('Deve ser um UUID válido de agendamento'),
});

export type AppointmentSessionParamDto = z.infer<typeof appointmentSessionParamSchema>;
