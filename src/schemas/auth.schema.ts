import { z } from 'zod';

export const authResponseSchema = z.object({
  token: z.string(),
});

export const authErrorResponseSchema = z.object({
  reason: z.string(),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;

export type AuthErrorResponse = z.infer<typeof authErrorResponseSchema>;
