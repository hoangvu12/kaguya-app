import React from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { TouchableOpacity } from '@/ui';

interface TappableProps {
  onPress?: () => void;
  onLongPress?: () => void;
  children: React.ReactNode;
}

const Tappable: React.FC<TappableProps> = ({
  onPress,
  onLongPress,
  children,
}) => {
  const tap = Gesture.Tap()
    .onStart(() => {
      onPress?.();
    })
    .runOnJS(true);

  const longPress = Gesture.LongPress()
    .onStart(() => {
      onLongPress?.();
    })
    .runOnJS(true);

  const gesture = Gesture.Exclusive(longPress, tap);

  return (
    <GestureDetector gesture={gesture}>
      <TouchableOpacity>{children}</TouchableOpacity>
    </GestureDetector>
  );
};

export default Tappable;
