import { z } from 'zod';

import { FileUrlSchema } from './file-url';

export enum VideoFormat {
  CONTAINER = 'container',
  HLS = 'hls',
  DASH = 'dash',
}

export const VideoFormatSchema = z.nativeEnum(VideoFormat);

export const VideoSchema = z.object({
  quality: z.string().nullable().optional(),
  format: VideoFormatSchema.optional(),
  file: FileUrlSchema,
});
