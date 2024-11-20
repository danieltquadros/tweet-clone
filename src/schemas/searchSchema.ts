import { z } from 'zod';

export const searchSchema = z.object({
  q: z
    .string({ message: 'fill in the search field' })
    .min(3, 'search must be at least two characters long'),
  page: z.coerce.number().min(0).optional(),
});
