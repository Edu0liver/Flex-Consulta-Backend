import { z } from 'zod';

export const updateProductSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().nonnegative().optional(),
    imageName: z.string().optional(),
});

export type UpdateProductDTO = z.infer<typeof updateProductSchema>;
