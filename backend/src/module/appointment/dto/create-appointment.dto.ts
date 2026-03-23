import { z } from 'zod';

export const createAppointmentSchema = z.object({
  patientId: z.uuid('Deve ser um UUID válido').optional().nullable(),
  serviceId: z.uuid('Deve ser um UUID válido'),
  specialtyId: z.uuid('Deve ser um UUID válido').optional().nullable(),
  demandId: z.uuid('Deve ser um UUID válido').optional().nullable(),
  dateTime: z.coerce.date<Date>(),
  status: z.enum(['Waiting', 'Confirmed', 'CheckIn', 'Completed', 'Canceled']).default('Waiting'),
  recurringDays: z.any().optional().nullable(),
  patientTypeJustification: z.string().optional().nullable(),
});

export type CreateAppointmentDto = z.infer<typeof createAppointmentSchema>;

export const updateAppointmentStatusSchema = z.object({
  status: z.enum(['Waiting', 'Confirmed', 'CheckIn', 'Completed', 'Canceled']),
});

export type UpdateAppointmentStatusDto = z.infer<typeof updateAppointmentStatusSchema>;
