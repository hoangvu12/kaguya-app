import type { RouteProp as NRouteProp } from '@react-navigation/native';

import type { AnimeParamsList } from './anime-navigator';
import type { RootParamList } from './root-navigator';
import type { TabParamList } from './tab-navigator';

export type RootStackParamList = AnimeParamsList & TabParamList & RootParamList;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RouteProp<T extends keyof RootStackParamList> = NRouteProp<
  RootStackParamList,
  T
>;
