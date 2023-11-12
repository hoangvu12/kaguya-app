import { selectAtom } from 'jotai/utils';
import { atom } from 'jotai/vanilla';

import type { Episode } from '@/types';
import { chunk } from '@/utils';

export const MAX_EPISODES_PER_CHUNK = 24;

export const sectionEpisodesAtom = atom<Episode[]>([]);
export const episodeChunksAtom = selectAtom(sectionEpisodesAtom, (episodes) => {
  if (!episodes.length) return [];

  return chunk(episodes, MAX_EPISODES_PER_CHUNK);
});

export const episodeChunkAtom = atom<Episode[]>([]);

export const layoutModeAtom = atom<'details' | 'card'>('details');
