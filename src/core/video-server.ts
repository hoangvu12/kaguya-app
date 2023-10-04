import { z } from 'zod';

export const VideoServerSchema = z.object({
  name: z.string(),
  embed: z.string(),
  extraData: z.record(z.any()).optional(),
});
