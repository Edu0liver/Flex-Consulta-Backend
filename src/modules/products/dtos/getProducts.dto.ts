import { z } from 'zod';

export const getProductsSchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    order_by: z.string().optional(),
    order: z.string().optional(),
    page: z.string().min(1),
    size: z.string().min(1),
});

export type GetProductsDTO = z.infer<typeof getProductsSchema>;
