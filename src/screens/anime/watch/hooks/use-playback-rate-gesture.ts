import { useSetAtom } from 'jotai/react';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

import { isFastForwardingAtom, playBackRateAtom } from '../store';

const usePlaybackRateGesture = () => {
  const setPlayBackRate = useSetAtom(playBackRateAtom);
  const setIsFastForwarding = useSetAtom(isFastForwardingAtom);

  const playBackLongPress = Gesture.LongPress()
    .minDuration(500)
    .onStart((_event) => {
      runOnJS(setPlayBackRate)(2);
      runOnJS(setIsFastForwarding)(true);
    })
    .onEnd((_event) => {
      runOnJS(setPlayBackRate)(1);
      runOnJS(setIsFastForwarding)(false);
    });

  return playBackLongPress;
};

export default usePlaybackRateGesture;
