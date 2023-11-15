import 'react-native-gesture-handler';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import type { ToastConfig } from 'react-native-toast-message';
import Toast, { ErrorToast, SuccessToast } from 'react-native-toast-message';

import { RootNavigator } from '@/navigation';

import colors from './ui/theme/colors';

const toastConfig: ToastConfig = {
  /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
  success: (props) => (
    <SuccessToast
      {...props}
      contentContainerStyle={{ backgroundColor: colors.thunder[900] }}
      text1Style={{
        fontSize: 17,
        fontWeight: '500',
        color: 'white',
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: '400',
        color: 'white',
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
        fontWeight: '500',
        color: 'white',
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: '400',
        color: 'white',
      }}
      contentContainerStyle={{ backgroundColor: colors.thunder[900] }}
    />
  ),
};

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();

      setAppIsReady(true);
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Hide the splash screen
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView
      onLayout={onLayoutRootView}
      style={styles.container}
    >
      <BottomSheetModalProvider>
        <RootNavigator />
        <Toast config={toastConfig} />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
