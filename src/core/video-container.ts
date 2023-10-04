import { z } from 'zod';

import { FontSchema } from './font';
import { SubtitleSchema } from './subtitle';
import { TimestampSchema } from './timestamp';
import { VideoSchema } from './video';

export enum VideoFormat {
  CONTAINER = 'container',
  HLS = 'hls',
  DASH = 'dash',
}

export const VideoFormatSchema = z.nativeEnum(VideoFormat);

export const VideoContainerSchema = z.object({
  videos: z.array(VideoSchema),
  subtitles: z.array(SubtitleSchema).optional(),
  fonts: z.array(FontSchema).optional(),
  timestamps: z.array(TimestampSchema).optional(),
});
