import { z } from 'zod';

import { FontSchema } from './font';
import { SubtitleSchema } from './subtitle';
import { TimestampSchema } from './timestamp';
import { VideoSchema } from './video';

export const VideoContainerSchema = z.object({
  videos: z.array(VideoSchema),
  subtitles: z.array(SubtitleSchema).nullable().optional(),
  fonts: z.array(FontSchema).nullable().optional(),
  timestamps: z.array(TimestampSchema).nullable().optional(),
});
