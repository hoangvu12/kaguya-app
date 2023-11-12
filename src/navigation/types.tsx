import type { RouteProp as NRouteProp } from '@react-navigation/native';

import type { AnimeParamsList } from './anime-navigator';

export type RootStackParamList = AnimeParamsList;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RouteProp<T extends keyof RootStackParamList> = NRouteProp<
  RootStackParamList,
  T
>;
