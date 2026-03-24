import { z } from 'zod';
import { createDemandSchema } from './create-demand.dto';

export const updateDemandSchema = createDemandSchema.partial();

export type UpdateDemandDto = z.infer<typeof updateDemandSchema>;
