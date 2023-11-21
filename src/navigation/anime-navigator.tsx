import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { AnimeHomeScreen } from '@/screens';
import AiringScheduleScreen from '@/screens/anime/airing-schedule/screen';
import { AnimeDetailsScreen } from '@/screens/anime/details/screen';
import RecentlyWatchedScreen from '@/screens/anime/recently-watched/screen';
import { AnimeWatchScreen } from '@/screens/anime/watch/screen';

export type AnimeParamsList = {
  AnimeDetails: {
    mediaId: number;
    tab?: 'details' | 'episodes';
  };
  AnimeHome: undefined;
  AnimeWatch: {
    mediaId: number;
    episodeId: string;
  };
  AiringSchedule: undefined;
  RecentlyWatched: undefined;
};

const Stack = createNativeStackNavigator<AnimeParamsList>();

export const AnimeNavigator = () => (
  <Stack.Navigator id="anime-navigator" initialRouteName="AnimeHome">
    <Stack.Group
      screenOptions={{ animation: 'slide_from_right', orientation: 'portrait' }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="AnimeHome"
        component={AnimeHomeScreen}
      />
      <Stack.Screen
        options={{ header: () => null }}
        name="AnimeDetails"
        component={AnimeDetailsScreen}
      />
      <Stack.Screen
        options={{ headerShown: false, orientation: 'landscape' }}
        name="AnimeWatch"
        component={AnimeWatchScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AiringSchedule"
        component={AiringScheduleScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="RecentlyWatched"
        component={RecentlyWatchedScreen}
      />
    </Stack.Group>
  </Stack.Navigator>
);
