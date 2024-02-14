import { MMKV } from 'react-native-mmkv';
import { z } from 'zod';

import { EpisodeSchema } from '@/core/episode';
import type { Episode } from '@/types';
import { createParseJSONSchema } from '@/utils/zod';

const episodeKey = 'episode';

const storage = new MMKV();

export const WatchedEpisodeSchema = z.object({
  episode: EpisodeSchema,
  time: z.number(),
  mediaId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const parseJSON = createParseJSONSchema(
  z.object({
    watchedEpisodes: z.array(WatchedEpisodeSchema),
  })
);

export type WatchedEpisode = z.infer<typeof WatchedEpisodeSchema>;

export function getWatchedEpisodes(limit?: number): WatchedEpisode[] {
  try {
    const data = storage.getString(episodeKey);

    if (!data) return [];

    const parsedData = parseJSON.safeParse(data);

    if (!parsedData.success) return [];

    if (!parsedData?.data?.watchedEpisodes?.length) return [];

    const watchedEpisodes: WatchedEpisode[] =
      parsedData.data.watchedEpisodes.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

    if (limit) {
      return watchedEpisodes.slice(0, limit);
    }

    return watchedEpisodes;
  } catch (err) {
    console.error('Failed to get watched episodes', err);

    return [];
  }
}

export function markEpisodeAsWatched({
  episode,
  time,
  mediaId,
}: {
  episode: Episode;
  time: number;
  mediaId: number;
}) {
  const watchedEpisodes = getWatchedEpisodes();

  const watchedEpisode = watchedEpisodes?.find(
    (watchedEpisode) => watchedEpisode.mediaId === mediaId
  );

  if (watchedEpisode) {
    watchedEpisode.time = time;
    watchedEpisode.episode = episode;
    watchedEpisode.updatedAt = new Date();
  } else {
    watchedEpisodes.push({
      episode,
      time,
      mediaId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  saveWatchedEpisodes(watchedEpisodes);
}

export function saveWatchedEpisodes(watchedEpisodes: WatchedEpisode[]) {
  let existData = storage.getString(episodeKey);

  if (!existData) {
    storage.set(episodeKey, JSON.stringify({ watchedEpisodes }));

    return;
  }

  try {
    const parsedData = parseJSON.safeParse(existData);

    if (!parsedData.success) return;

    parsedData.data.watchedEpisodes = watchedEpisodes;

    storage.set(episodeKey, JSON.stringify(parsedData.data));
  } catch (err) {
    console.error('save watched episodes', err);
  }
}

export function getWatchedEpisode(mediaId: number): WatchedEpisode | undefined {
  const watchedEpisodes = getWatchedEpisodes();

  return watchedEpisodes.find(
    (watchedEpisode) => watchedEpisode.mediaId === mediaId
  );
}

export const clearWatchedEpisodes = () => {
  storage.delete(episodeKey);
};
