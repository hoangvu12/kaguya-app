import { z } from 'zod';

export const EpisodeSchema = z.object({
  number: z.string(),
  id: z.string(),
  title: z.string().nullable().optional(),
  isFiller: z.boolean().nullable().optional(),
  description: z.string().nullable().optional(),
  thumbnail: z.string().nullable().optional(),
  extra: z.record(z.any()).nullable().optional(),
  section: z.string().nullable().optional(),
});
