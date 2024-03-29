import { z } from 'zod';

export const createProductDTOSchema = z.object({
    nome: z.string(),
    descricao: z.string(),
    price: z.number().nonnegative(),
});

export type CreateProductDTO = z.infer<typeof createProductDTOSchema>;
