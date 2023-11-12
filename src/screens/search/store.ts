import { atom } from 'jotai/vanilla';

import type {
  MediaFormat,
  MediaSeason,
  MediaSource,
  MediaStatus,
} from '@/gql/graphql';
import { MediaSort, MediaType } from '@/gql/graphql';

export enum MediaCountry {
  China = 'CN',
  Japan = 'JP',
  South_Korea = 'KR',
  Taiwan = 'TW',
}

export const yearAtom = atom<number | undefined>(undefined);
export const seasonAtom = atom<MediaSeason | undefined>(undefined);
export const formatAtom = atom<MediaFormat | undefined>(undefined);
export const countryAtom = atom<MediaCountry | undefined>(undefined);
export const genresAtom = atom<string[]>([]);
export const tagsAtom = atom<string[]>([]);
export const keywordAtom = atom<string>('');
export const layoutAtom = atom<'grid' | 'details'>('grid');
export const sortAtom = atom<MediaSort>(MediaSort.TrendingDesc);
export const mediaTypeAtom = atom<MediaType>(MediaType.Anime);
export const statusAtom = atom<MediaStatus | undefined>(undefined);
export const sourceAtom = atom<MediaSource | undefined>(undefined);
