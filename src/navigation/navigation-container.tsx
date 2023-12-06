import { NavigationContainer as RNNavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useThemeConfig } from './use-theme-config';

const appPrefix = Linking.createURL('/');

const linking = {
  prefixes: [appPrefix, 'https://anilist.co/'],
  config: {
    screens: {
      Tab: {
        screens: {
          Anime: {
            screens: {
              AnimeHome: '*',
            },
          },
          Settings: {
            path: 'settings',
          },
        },
      },
      AnimeDetails: {
        path: 'anime/:mediaId/:slug',
      },
    },
  },
};

export const NavigationContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const theme = useThemeConfig();

  return (
    <SafeAreaProvider>
      {/* @ts-expect-error */}
      <RNNavigationContainer linking={linking} theme={theme}>
        {children}
      </RNNavigationContainer>
    </SafeAreaProvider>
  );
};
