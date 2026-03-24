import { z } from 'zod';
import { createSpecialtySchema } from './create-specialty.dto';

export const updateSpecialtySchema = createSpecialtySchema.partial();

export type UpdateSpecialtyDto = z.infer<typeof updateSpecialtySchema>;
