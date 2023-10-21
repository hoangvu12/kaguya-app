import { useAtomValue, useSetAtom } from 'jotai/react';
import { styled } from 'nativewind';
import React, { useEffect } from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { View } from '@/ui';
import SeekBackwardIcon from '@/ui/icons/seek-backward';
import SeekForwardIcon from '@/ui/icons/seek-forward';

import { currentTimeAtom, playerAtom, seekingIndicatorAtom } from '../store';

const AnimatedView = styled(Animated.View);

const MediaSeekingGesture = () => {
  const setHandleSeeking = useSetAtom(seekingIndicatorAtom);
  const indicatorLeftAnimateValue = useSharedValue(0);
  const indicatorRightAnimateValue = useSharedValue(0);
  const player = useAtomValue(playerAtom);
  const currentTime = useAtomValue(currentTimeAtom);

  useEffect(() => {
    setHandleSeeking({
      showLeft: () => {
        indicatorLeftAnimateValue.value = withSequence(
          withTiming(1, { duration: 100 }),

          withDelay(300, withTiming(0, { duration: 100 }))
        );

        player?.seek(currentTime - 10);
      },

      showRight: () => {
        indicatorRightAnimateValue.value = withSequence(
          withTiming(1, { duration: 100 }),
          withDelay(300, withTiming(0, { duration: 100 }))
        );

        player?.seek(currentTime + 10);
      },
    });
  }, [
    currentTime,
    indicatorLeftAnimateValue,
    indicatorRightAnimateValue,
    player,
    setHandleSeeking,
  ]);

  const animIndicatorLeftStyle = useAnimatedStyle(() => {
    return {
      opacity: indicatorLeftAnimateValue.value,
    };
  });

  const animIconLeftStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      indicatorLeftAnimateValue.value,
      [0, 1],
      [0, -45]
    );

    return {
      transform: [
        {
          rotate: `${rotate}deg`,
        },
      ],
    };
  });

  const animIconRightStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      indicatorRightAnimateValue.value,
      [0, 1],
      [0, 45]
    );

    return {
      transform: [
        {
          rotate: `${rotate}deg`,
        },
      ],
    };
  });

  const animIndicatorRightStyle = useAnimatedStyle(() => {
    return {
      opacity: indicatorRightAnimateValue.value,
    };
  });

  return (
    <View
      className="absolute inset-0 z-50 flex h-full w-full flex-row items-center justify-between"
      pointerEvents="none"
    >
      <AnimatedView
        className="absolute z-50 flex h-full w-1/2 items-center justify-center bg-black/40"
        style={[animIndicatorLeftStyle]}
      >
        <AnimatedView
          style={animIconLeftStyle}
          className="h-16 w-16 text-white"
        >
          <SeekBackwardIcon className="h-16 w-16 text-white" />
        </AnimatedView>
      </AnimatedView>

      <AnimatedView
        className="absolute right-0 z-50 flex h-full w-1/2 items-center justify-center bg-black/40"
        style={[animIndicatorRightStyle]}
      >
        <AnimatedView
          style={animIconRightStyle}
          className="h-16 w-16 text-white"
        >
          <SeekForwardIcon className="h-16 w-16 text-white" />
        </AnimatedView>
      </AnimatedView>
    </View>
  );
};

export default MediaSeekingGesture;
