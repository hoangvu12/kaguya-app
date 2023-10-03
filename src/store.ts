import { atomWithMMKV } from './core/storage';

export const currentModuleId = atomWithMMKV<string | null>('module_id', null);
