import React from 'react';
import type {
  GestureStateChangeEvent,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import useBrightnessGesture from '../hooks/use-brightness-gesture';
import useOverlayGesture from '../hooks/use-overlay-gesture';
import usePlaybackRateGesture from '../hooks/use-playback-rate-gesture';
import useSeekingGesture from '../hooks/use-seeking-gesture';
import useVolumeGesture from '../hooks/use-volume-gesture';

interface DoubleTapProps {
  onSingleTap?: (
    event: GestureStateChangeEvent<TapGestureHandlerEventPayload>
  ) => void;
  onDoubleTap?: (
    event: GestureStateChangeEvent<TapGestureHandlerEventPayload>
  ) => void;
}

const GestureHandler: React.FC<React.PropsWithChildren<DoubleTapProps>> = ({
  children,
}) => {
  const overlaySingleTap = useOverlayGesture();
  const seekingDoubleTap = useSeekingGesture();

  const volumePan = useVolumeGesture();
  const playBackLongPress = usePlaybackRateGesture();
  const brightnessPan = useBrightnessGesture();

  const pans = Gesture.Simultaneous(volumePan, brightnessPan);

  const taps = Gesture.Exclusive(
    playBackLongPress,
    pans,
    seekingDoubleTap,
    overlaySingleTap
  );

  return <GestureDetector gesture={taps}>{children}</GestureDetector>;
};

export default GestureHandler;
