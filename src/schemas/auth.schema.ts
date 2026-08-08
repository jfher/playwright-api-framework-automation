import { z } from 'zod';

export const authResponseSchema = z.object({
  token: z.string(),
});

export const authErrorSchema = z.object({
  reason: z.string(),
});
