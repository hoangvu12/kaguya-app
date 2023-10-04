import { z } from 'zod';

export const TimestampSchema = z.object({
  type: z.string(),
  startTime: z.number(),
  endTime: z.number(),
});
