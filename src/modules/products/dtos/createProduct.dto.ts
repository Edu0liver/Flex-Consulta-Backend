import { z } from 'zod';

export const createProductSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().nonnegative(),
});

export type CreateProductDTO = z.infer<typeof createProductSchema>;
