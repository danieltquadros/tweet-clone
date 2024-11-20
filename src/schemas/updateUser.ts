import { link } from 'fs';
import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, 'name must be at least two characters long')
    .optional(),
  bio: z.string().optional(),
  link: z.string().url('invalid url').optional(),
});
