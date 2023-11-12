import { atom } from 'jotai/vanilla';

import { atomWithMMKV } from './core/storage';

export const currentModuleIdAtom = atomWithMMKV<string | null>(
  'module_id',
  null
);
export const isScriptLoadedAtom = atom(false);
