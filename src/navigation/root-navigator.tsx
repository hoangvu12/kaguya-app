import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import WebViewProvider from '@/contexts/webview';
import AiringScheduleScreen from '@/screens/anime/airing-schedule/screen';
import { AnimeDetailsScreen } from '@/screens/anime/details/screen';
import RecentlyWatchedScreen from '@/screens/anime/recently-watched/screen';
import { AnimeWatchScreen } from '@/screens/anime/watch/screen';
import Updater from '@/ui/updater';

import { NavigationContainer } from './navigation-container';
import { TabNavigator } from './tab-navigator';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: Infinity,
    },
  },
});

export type RootParamList = {
  Tab: undefined;
  AnimeDetails: {
    mediaId: number;
    tab?: 'details' | 'episodes';
  };
  AnimeWatch: {
    mediaId: number;
    episodeId: string;
  };

  AiringSchedule: undefined;
  RecentlyWatched: undefined;
};

const Stack = createNativeStackNavigator<RootParamList>();

export const Root = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        orientation: 'portrait',
      }}
    >
      <Stack.Group>
        <Stack.Screen name="Tab" component={TabNavigator} />

        <Stack.Screen name="AnimeDetails" component={AnimeDetailsScreen} />

        <Stack.Screen
          options={{ orientation: 'landscape' }}
          name="AnimeWatch"
          component={AnimeWatchScreen}
        />

        <Stack.Screen name="AiringSchedule" component={AiringScheduleScreen} />
        <Stack.Screen
          name="RecentlyWatched"
          component={RecentlyWatchedScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WebViewProvider>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <Root />
            <Updater />
          </NavigationContainer>
        </BottomSheetModalProvider>
      </WebViewProvider>
    </QueryClientProvider>
  );
};
