import { z } from 'zod';

export const FileUrlSchema = z.object({
  url: z.string(),
  headers: z.record(z.string()).optional(),
});
