import type { z } from 'zod';

import type { ChapterSchema } from '@/core/chapter';
import type { EpisodeSchema } from '@/core/episode';
import type { FileUrlSchema } from '@/core/file-url';
import type { FontSchema } from '@/core/font';
import type { ModuleSchema } from '@/core/module';
import type IndexSchema from '@/core/remote-index';
import type { SearchResultSchema } from '@/core/search-result';
import type { SubtitleSchema } from '@/core/subtitle';
import type { TimestampSchema } from '@/core/timestamp';
import type { VideoSchema } from '@/core/video';
import type { VideoContainerSchema } from '@/core/video-container';
import type { VideoServerSchema } from '@/core/video-server';

export type Module = z.infer<typeof ModuleSchema>;
export type Episode = z.infer<typeof EpisodeSchema>;
export type Chapter = z.infer<typeof ChapterSchema>;
export type Font = z.infer<typeof FontSchema>;
export type SearchResult = z.infer<typeof SearchResultSchema>;
export type Subtitle = z.infer<typeof SubtitleSchema>;
export type FileUrl = z.infer<typeof FileUrlSchema>;
export type VideoContainer = z.infer<typeof VideoContainerSchema>;
export type VideoServer = z.infer<typeof VideoServerSchema>;
export type Video = z.infer<typeof VideoSchema>;
export type Timestamp = z.infer<typeof TimestampSchema>;
export type Index = z.infer<typeof IndexSchema>;
