import { atomWithMMKV } from '@/core/storage';

export const shouldAskForSyncingAtom = atomWithMMKV(
  'player_settings__should-ask-for-syncing',
  true
);
export const shouldSyncAdultAtom = atomWithMMKV(
  'player_settings__should-sync-adult',
  false
);
export const syncPercentageAtom = atomWithMMKV(
  'player_settings__sync-percentage',
  0.75
);

export const resumePlaybackOffsetAtom = atomWithMMKV(
  'player_settings__resume-playback-offset',
  0
);

export const shouldAutoNextEpisodeAtom = atomWithMMKV(
  'player_settings__should-auto-next-episode',
  true
);
