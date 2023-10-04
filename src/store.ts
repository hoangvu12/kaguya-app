import { atomWithMMKV } from './core/storage';

export const currentModuleIdAtom = atomWithMMKV<string | null>(
  'module_id',
  null
);
