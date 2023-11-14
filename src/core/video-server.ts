import { z } from 'zod';

export const VideoServerSchema = z.object({
  name: z.string(),
  extraData: z.record(z.any()).nullable().optional(),
});
