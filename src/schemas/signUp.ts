import { z } from 'zod';

export const signUpSchema = z.object({
  name: z
    .string({ message: 'name is required' })
    .min(2, 'name must be at least two characters long'),
  email: z.string({ message: 'e-mail is required' }).email('invalid e-mail'),
  password: z
    .string({ message: 'password is required' })
    .min(4, 'password must be at least four characters long'),
});
