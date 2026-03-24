import { z } from 'zod';
import { createServiceSchema } from './create-service.dto';

export const updateServiceSchema = createServiceSchema.partial();

export type UpdateServiceDto = z.infer<typeof updateServiceSchema>;
