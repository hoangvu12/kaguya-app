import { useAtomValue } from 'jotai/react';
import { Gesture } from 'react-native-gesture-handler';

import { seekingIndicatorAtom } from '../store';
import useScreenSize from './use-screen-size';

const useSeekingGesture = () => {
  const seekingIndicator = useAtomValue(seekingIndicatorAtom);
  const screenSize = useScreenSize();

  const seekingDoubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((_event, success) => {
      if (success) {
        const { x } = _event;
        if (x / screenSize.width < 0.4) {
          seekingIndicator.showLeft();
        } else if (x / screenSize.width > 0.6) {
          seekingIndicator.showRight();
        }
      }
    })
    .runOnJS(true);

  return seekingDoubleTap;
};

export default useSeekingGesture;
