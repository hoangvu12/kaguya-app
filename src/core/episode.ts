import { z } from 'zod';

export const EpisodeSchema = z.object({
  number: z.string(),
  id: z.string(),
  title: z.string().optional(),
  isFiller: z.boolean().optional(),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  extra: z.record(z.any()).optional(),
  section: z.string().optional(),
});
