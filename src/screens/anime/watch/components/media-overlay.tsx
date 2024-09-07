import { useAtomValue } from 'jotai/react';
import { styled } from 'nativewind';
import React, { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { View } from '@/ui';

import { isOverlayVisibleAtom } from '../store';
import BrightnessSlider from './brightness-slider';
import BufferingIndicator from './buffering-indicator';
import GestureHandler from './gesture-handler';
import MediaControls from './media-controls';
import MediaFastForwardIndicator from './media-fast-forward-indicator';
import MediaSeekingGesture from './media-seeking-gesture';
import MediaSlider from './media-slider';
import MediaTop from './media-top';
import SkipTimestampButton from './skip-timestamp-button';
import VolumeSlider from './volume-slider';

const AnimatedView = styled(Animated.View);

const MediaOverlay = () => {
  const isOverlayVisible = useAtomValue(isOverlayVisibleAtom);
  const animateValue = useSharedValue(0);

  useEffect(() => {
    animateValue.value = withTiming(isOverlayVisible ? 1 : 0, {
      duration: 200,
      easing: Easing.linear,
    });
  }, [animateValue, isOverlayVisible]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: animateValue.value,
    };
  });

  return (
    <React.Fragment>
      <GestureHandler>
        <View className="absolute z-20 h-full w-full">
          <AnimatedView
            style={[animatedStyles]}
            className="absolute z-20 h-full w-full bg-black/60"
            pointerEvents={isOverlayVisible ? 'auto' : 'none'}
          >
            <MediaTop />
            <MediaControls />
            <MediaSlider />
          </AnimatedView>
        </View>
      </GestureHandler>

      <MediaFastForwardIndicator />
      <SkipTimestampButton />
      <MediaSeekingGesture />
      <VolumeSlider />
      <BrightnessSlider />
      <BufferingIndicator />
    </React.Fragment>
  );
};

export default MediaOverlay;
