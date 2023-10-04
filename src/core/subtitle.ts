import { z } from 'zod';

import { FileUrlSchema } from './file-url';

export enum SubtitleFormat {
  VTT = 'vtt',
  ASS = 'ass',
  SRT = 'srt',
}

export const SubtitleFormatSchema = z.nativeEnum(SubtitleFormat);

export const SubtitleSchema = z.object({
  language: z.string(),
  file: FileUrlSchema,
  format: SubtitleFormatSchema,
});
