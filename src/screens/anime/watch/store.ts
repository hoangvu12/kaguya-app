import { atom } from 'jotai/vanilla';
import type RNVideo from 'react-native-video';

import { atomWithMMKV } from '@/core/storage';
import type { Timestamp } from '@/types';
import {
  type Episode,
  type Subtitle,
  type Video,
  type VideoServer,
} from '@/types';

export const playerAtom = atom<RNVideo | null>(null);
export const isOverlayVisibleAtom = atom(true);
export const currentTimeAtom = atom(0);
export const durationAtom = atom(0);
export const pausedAtom = atom(false);
export const isBufferingAtom = atom(false);
export const playableDurationAtom = atom(0);
export const localCurrentTimeAtom = atom(0);
export const isSlidingAtom = atom(false);
export const isFastForwardingAtom = atom(false);

export const seekingIndicatorAtom = atom({
  showLeft: () => {},
  showRight: () => {},
});

export const playBackRateAtom = atom(1);
export const previousPlayBackRateAtom = atom(1);
export const volumeAtom = atom(1);

export const volumeSliderAtom = atom<{
  show: () => void;
  hide: () => void;
  getHeight: () => number;
  setVolume: (volume: number) => void;
  setAnimationValue: (value: number) => void;
  getVolume: () => number;
}>({
  show: () => {},
  hide: () => {},
  getHeight: () => {
    return 0;
  },
  setVolume: () => {},
  setAnimationValue: () => {},
  getVolume: () => {
    return 0;
  },
});

export const brightnessSliderAtom = atom<{
  show: () => void;
  hide: () => void;
  getHeight: () => number;
  setBrightness: (brightness: number) => void;
  setAnimationValue: (value: number) => void;
  getBrightness: () => number;
}>({
  show: () => {},
  hide: () => {},
  getHeight: () => {
    return 0;
  },
  setBrightness: () => {},
  setAnimationValue: () => {},
  getBrightness: () => {
    return 0;
  },
});

export const fastForwardAtom = atomWithMMKV('video__fast_forward', 90);

export const sourceListAtom = atom<Video[]>([]);
export const currentSourceAtom = atom<Video | undefined>(undefined);

export const qualityListAtom = atom<string[]>([]);
export const currentQualityAtom = atom<string | undefined>(undefined);

export const videoSizeAtom = atom({
  width: 0,
  height: 0,
});

export const subtitleListAtom = atom<Subtitle[]>([]);
export const currentSubtitleAtom = atom<Subtitle | null>(null);

export const DEFAULT_FONT_COLOR = 'rgb(255, 255, 255)';
export const DEFAULT_FONT_SIZE = 24;
export const DEFAULT_FONT_OPACITY = 1;
export const DEFAULT_BACKGROUND_COLOR = 'rgb(0, 0, 0)';
export const DEFAULT_BACKGROUND_OPACITY = 0.75;

export const subtitleFontSizeAtom = atomWithMMKV<number>(
  'subtitle__font_size',
  DEFAULT_FONT_SIZE
);
export const subtitleFontColorAtom = atomWithMMKV<string>(
  'subtitle__font_color',
  DEFAULT_FONT_COLOR
);
export const subtitleFontOpacityAtom = atomWithMMKV<number>(
  'subtitle__font_opacity',
  DEFAULT_FONT_OPACITY
);

export const subtitleBackgroundColor = atomWithMMKV<string>(
  'subtitle__background_color',
  DEFAULT_BACKGROUND_COLOR
);
export const subtitleBackgroundOpacityAtom = atomWithMMKV<number>(
  'subtitle__background_opacity',
  DEFAULT_BACKGROUND_OPACITY
);

export const currentServerAtom = atom<VideoServer | undefined>(undefined);
export const serversAtom = atom<VideoServer[]>([]);

export const currentEpisodeAtom = atom<Episode | undefined>(undefined);
export const episodesAtom = atom<Episode[]>([]);

export const mediaTitleAtom = atom('');

export const sectionEpisodesAtom = atom<Episode[]>([]);

export const mediaIdAtom = atom<{
  anilistId: number;
  malId: number | undefined;
}>({
  anilistId: 0,
  malId: 0,
});
export const isAdultAtom = atom(false);

export const timestampsAtom = atom<Timestamp[]>([]);

export const shouldSyncListAtom = atomWithMMKV<number[]>('sync_list', []);
export const shouldNotSyncListAtom = atomWithMMKV<number[]>(
  'not_sync_list',
  []
);

export const playerResizeMode = atomWithMMKV<'stretch' | 'contain' | 'cover'>(
  'player__resize_mode',
  'contain'
);
