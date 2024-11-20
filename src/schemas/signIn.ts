import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string({ message: 'e-mail is required' }).email('invalid e-mail'),
  password: z
    .string({ message: 'password is required' })
    .min(4, 'password must be at least four characters long'),
});
