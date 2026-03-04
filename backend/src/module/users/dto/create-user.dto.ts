import z from 'zod';

export const createUserSchema = z.object({
  username: z
    .string({
      error: 'Nome é obrigatório',
    })
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres'),

  password: z
    .string({
      error: 'Password é obrigatório',
    })
    .min(6, 'Password deve ter no mínimo 6 caracteres')
    .regex(/[A-Z]/, 'Password deve conter pelo menos uma letra maiúscula')
    .regex(/[0-9]/, 'Password deve conter pelo menos um número'),

  role: z.enum(['Admin', 'User']).default('User').optional(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
