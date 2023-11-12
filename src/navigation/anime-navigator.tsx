import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { AnimeHomeScreen } from '@/screens';
import { AnimeDetailsScreen } from '@/screens/anime/details/screen';
import { AnimeWatchScreen } from '@/screens/anime/watch/screen';

export type AnimeParamsList = {
  AnimeDetails: {
    mediaId: number;
  };
  AnimeHome: undefined;
  AnimeWatch: undefined;
};

const Stack = createNativeStackNavigator<AnimeParamsList>();

export const AnimeNavigator = () => (
  <Stack.Navigator id="anime-navigator" initialRouteName="AnimeHome">
    <Stack.Group>
      <Stack.Screen
        options={{ headerShown: false }}
        name="AnimeHome"
        component={AnimeHomeScreen}
      />
      <Stack.Screen
        options={{ headerTransparent: true }}
        name="AnimeDetails"
        component={AnimeDetailsScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AnimeWatch"
        component={AnimeWatchScreen}
      />
    </Stack.Group>
  </Stack.Navigator>
);
