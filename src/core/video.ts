import { z } from 'zod';

import { FileUrlSchema } from './file-url';
import { VideoFormatSchema } from './video-container';

export const VideoSchema = z.object({
  quality: z.string().optional(),
  format: VideoFormatSchema.optional(),
  file: FileUrlSchema,
});
