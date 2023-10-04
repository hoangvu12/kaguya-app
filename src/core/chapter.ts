import { z } from 'zod';

export const ChapterSchema = z.object({
  number: z.string(),
  id: z.string(),
  title: z.string().optional(),
  extra: z.record(z.any()).optional(),
  section: z.string().optional(),
});
