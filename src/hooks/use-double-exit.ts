import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';

const useDoubleExit = () => {
  const backCount = useRef(0);

  const navigation = useNavigation();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (navigation.canGoBack()) return;

        backCount.current += 1;

        if (backCount.current === 1) {
          ToastAndroid.show(
            'Press back again to exit the app',
            ToastAndroid.SHORT
          );

          setTimeout(() => {
            backCount.current = 0;
          }, 2000);
        } else if (backCount.current === 2) {
          BackHandler.exitApp();
        }

        return true;
      }
    );
    return () => backHandler.remove();
  }, [navigation]);
};

export default useDoubleExit;
