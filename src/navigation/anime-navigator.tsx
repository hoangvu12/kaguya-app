import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { AnimeHomeScreen } from '@/screens';
import { AnimeDetailsScreen } from '@/screens/anime/details/screen';

const Stack = createNativeStackNavigator();

export const AnimeNavigator = () => (
  <Stack.Navigator
    id="anime-navigator"
    initialRouteName="Details"
    screenOptions={{ headerTransparent: true }}
  >
    <Stack.Group>
      <Stack.Screen name="Home" component={AnimeHomeScreen} />
      <Stack.Screen name="Details" component={AnimeDetailsScreen} />
    </Stack.Group>
  </Stack.Navigator>
);
