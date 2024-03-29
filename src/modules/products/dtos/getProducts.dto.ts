import { z } from 'zod';

export const getProductsSchema = z.object({
    name: z.string(),
    description: z.string(),
    order_by: z.string(),
    order: z.string(),
});

export type GetProductsDTO = z.infer<typeof getProductsSchema>;
