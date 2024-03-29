import { z } from 'zod';

export const getProductsSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    order_by: z.string().optional(),
    order: z.string().optional(),
    page: z.string().optional(),
    size: z.string().optional(),
});

export type GetProductsDTO = z.infer<typeof getProductsSchema>;
