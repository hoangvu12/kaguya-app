import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { AnimeHomeScreen } from '@/screens';
import { AnimeDetailsScreen } from '@/screens/anime/details/screen';
import { AnimeWatchScreen } from '@/screens/anime/watch/screen';

const Stack = createNativeStackNavigator();

export const AnimeNavigator = () => (
  <Stack.Navigator id="anime-navigator" initialRouteName="Home">
    <Stack.Group>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={AnimeHomeScreen}
      />
      <Stack.Screen
        options={{ headerTransparent: true }}
        name="Details"
        component={AnimeDetailsScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Watch"
        component={AnimeWatchScreen}
      />
    </Stack.Group>
  </Stack.Navigator>
);
