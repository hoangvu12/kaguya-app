import { useSetAtom } from 'jotai/react';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

import { playBackRateAtom } from '../store';

const usePlaybackRateGesture = () => {
  const setPlayBackRate = useSetAtom(playBackRateAtom);

  const playBackLongPress = Gesture.LongPress()
    .minDuration(500)
    .onStart((_event) => {
      runOnJS(setPlayBackRate)(2);
    })
    .onEnd((_event) => {
      runOnJS(setPlayBackRate)(1);
    });

  return playBackLongPress;
};

export default usePlaybackRateGesture;
