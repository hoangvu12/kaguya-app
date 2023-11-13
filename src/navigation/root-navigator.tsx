import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import WebViewProvider from '@/contexts/webview';

import { NavigationContainer } from './navigation-container';
import { TabNavigator } from './tab-navigator';
const Stack = createNativeStackNavigator();

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

export const Root = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: 'none',
      }}
    >
      <Stack.Group>
        <Stack.Screen name="App" component={TabNavigator} />
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
          </NavigationContainer>
        </BottomSheetModalProvider>
      </WebViewProvider>
    </QueryClientProvider>
  );
};
