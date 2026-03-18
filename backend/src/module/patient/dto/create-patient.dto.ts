import z from 'zod';

export const createPatientSchema = z.object({
  name: z.string().min(1),
  phone: z.string().nullable(),
  type: z.enum(['Employee', 'External', 'Exempt']),
});

export type CreatePatientDto = z.infer<typeof createPatientSchema>;
