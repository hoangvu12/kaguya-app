import { z } from 'zod';

export const SearchResultSchema = z.object({
  id: z.string(),
  title: z.string(),
  thumbnail: z.string(),
  extra: z.record(z.any()).optional(),
});
