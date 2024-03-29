import { z } from 'zod';

export const getProductsSchema = z.object({
    nome: z.string(),
    descricao: z.string(),
    order_by: z.string(),
    order: z.string(),
});

export type GetProductsDTO = z.infer<typeof getProductsSchema>;
