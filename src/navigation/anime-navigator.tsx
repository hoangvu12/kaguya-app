import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { AnimeHomeScreen } from '@/screens';

export type AnimeParamsList = {
  AnimeHome: undefined;
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
    </Stack.Group>
  </Stack.Navigator>
);
