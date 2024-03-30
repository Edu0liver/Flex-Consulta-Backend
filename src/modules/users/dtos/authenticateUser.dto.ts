import { z } from 'zod';

export const authenticateUserSchema = z.object({
    email: z.string().min(1),
    password: z.string().min(1),
});

export type AuthenticateUserDTO = z.infer<typeof authenticateUserSchema>;
