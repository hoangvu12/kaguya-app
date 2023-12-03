import { atomWithMMKV } from '@/core/storage';
import type { Index } from '@/types';

export type IndexWithUrl = Index & { url: string };

export const indexListAtom = atomWithMMKV<IndexWithUrl[]>('indexList', []);
