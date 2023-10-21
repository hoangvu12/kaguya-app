import { useAtom } from 'jotai/react';
import { useRef } from 'react';
import { Gesture } from 'react-native-gesture-handler';

import { isOverlayVisibleAtom } from '../store';

const useOverlayGesture = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useAtom(isOverlayVisibleAtom);
  let closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const overlaySingleTap = Gesture.Tap()
    .onEnd((_event, success) => {
      if (success) {
        if (closeTimeout.current) {
          clearTimeout(closeTimeout.current);
        }

        if (isOverlayVisible) {
          setIsOverlayVisible(false);

          return;
        }

        setIsOverlayVisible(true);

        closeTimeout.current = setTimeout(() => {
          setIsOverlayVisible(false);
        }, 2000);
      }
    })
    .runOnJS(true);

  return overlaySingleTap;
};

export default useOverlayGesture;
