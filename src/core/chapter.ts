import { z } from 'zod';

export const ChapterSchema = z.object({
  number: z.string(),
  id: z.string(),
  title: z.string().nullable().optional(),
  extra: z.record(z.any()).nullable().optional(),
  section: z.string().nullable().optional(),
});
