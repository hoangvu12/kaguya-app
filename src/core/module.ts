import { z } from 'zod';

export const ModuleSchema = z.object({
  id: z.string(),
  name: z.string(),
  version: z.string(),
  languages: z.array(z.string()),
  info: z.object({
    author: z.string(),
    description: z.string(),
  }),
  type: z.enum(['anime', 'manga']),
});
