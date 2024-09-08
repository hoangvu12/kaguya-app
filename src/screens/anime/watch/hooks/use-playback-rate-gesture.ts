import { useAtom, useSetAtom } from 'jotai/react';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

import {
  isFastForwardingAtom,
  playBackRateAtom,
  previousPlayBackRateAtom,
} from '../store';

const usePlaybackRateGesture = () => {
  const [playBackRate, setPlayBackRate] = useAtom(playBackRateAtom);
  const [previousPlayBackRate, setPreviousPlayBackRate] = useAtom(
    previousPlayBackRateAtom
  );

  const setIsFastForwarding = useSetAtom(isFastForwardingAtom);

  const onStart = () => {
    setPreviousPlayBackRate(playBackRate);
    setIsFastForwarding(true);
    setPlayBackRate(2);
  };

  const onEnd = () => {
    setPlayBackRate(previousPlayBackRate);
    setIsFastForwarding(false);
  };

  const playBackLongPress = Gesture.LongPress()
    .minDuration(500)
    .onStart(() => {
      runOnJS(onStart)();
    })
    .onEnd(() => {
      runOnJS(onEnd)();
    });

  return playBackLongPress;
};

export default usePlaybackRateGesture;
