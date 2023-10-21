import { styled } from 'nativewind';
import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Text, View } from '@/ui';

const AnimatedValue = styled(Animated.View);

const SLIDER_WIDTH = 32;
const THUMB_SIZE = 10;

const MediaSlidingIndicator = () => {
  const animateValue = useSharedValue(0);

  useEffect(() => {
    animateValue.value = withRepeat(
      withTiming(1, { duration: 700 }),
      Infinity,
      true
    );
  }, [animateValue]);

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: animateValue.value * SLIDER_WIDTH - THUMB_SIZE / 2 },
      ],
    };
  });

  return (
    <View className="w-full gap-2 p-4">
      <View className="flex flex-row items-center justify-center">
        <View className="relative flex flex-row items-center">
          <View
            className="absolute h-1 rounded-md bg-white text-white"
            style={{ width: SLIDER_WIDTH }}
          />
          <AnimatedValue
            className="absolute rounded-full bg-white"
            style={[style, { width: 10, height: 10 }]}
          />
        </View>

        <Text className="ml-12">Drag to seek</Text>
      </View>
    </View>
  );
};

export default MediaSlidingIndicator;
