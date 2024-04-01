import { z } from 'zod';

export const uploadProductImageSchema = z.object({
    id: z.string().min(1),
    imageName: z.string().min(1),
});

export type UploadProductImageDTO = z.infer<typeof uploadProductImageSchema>;
