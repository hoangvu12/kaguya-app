import { useAtomValue, useSetAtom } from 'jotai/react';
import { styled } from 'nativewind';
import React, { useEffect, useMemo } from 'react';
import { TextInput } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import { Text, View } from '@/ui';

import {
  currentTimeAtom,
  durationAtom,
  isOverlayVisibleAtom,
  isSlidingAtom,
  pausedAtom,
  playableDurationAtom,
  playerAtom,
  timestampsAtom,
} from '../store';
import FastForwardButton from './fast-forward-button';

Animated.addWhitelistedNativeProps({ text: true });

export function formatTime(seconds: string | number) {
  'worklet';

  seconds = seconds.toString();
  let minutes = Math.floor(Number(seconds) / 60).toString();
  let hours = '';

  if (Number(minutes) > 59) {
    hours = Math.floor(Number(minutes) / 60).toString();
    hours = Number(hours) >= 10 ? hours : `0${hours}`;
    minutes = (Number(minutes) - Number(hours) * 60).toString();
    minutes = Number(minutes) >= 10 ? minutes : `0${minutes}`;
  }

  seconds = Math.floor(Number(seconds) % 60).toString();
  seconds = Number(seconds) >= 10 ? seconds : '0' + seconds;

  if (hours) {
    return `${hours}:${minutes}:${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

const STextInput = styled(TextInput);

const AnimatedTextInput = Animated.createAnimatedComponent(STextInput);

const TOUCH_SLOP = 10;
const ACTIVEOFFSETX = [-5, 5];
const THUMB_SIZE = 16;

const AnimatedView = styled(Animated.View);

const MediaSlider = () => {
  const [containerWidth, setContainerWidth] = React.useState(0);

  const currentTime = useAtomValue(currentTimeAtom);
  const duration = useAtomValue(durationAtom);
  const player = useAtomValue(playerAtom);
  const setPaused = useSetAtom(pausedAtom);
  const playableDuration = useAtomValue(playableDurationAtom);
  const setIsSliding = useSetAtom(isSlidingAtom);
  const setOverlayVisible = useSetAtom(isOverlayVisibleAtom);
  const timestamps = useAtomValue(timestampsAtom);

  const animateValue = useSharedValue(0);
  const shouldSync = useSharedValue(true);

  const timestamp = useMemo(() => {
    if (!timestamps?.length) return null;

    return timestamps.find(
      (timestamp) =>
        currentTime >= timestamp.startTime && currentTime <= timestamp.endTime
    );
  }, [currentTime, timestamps]);

  const seek = (value: number) => {
    const seekTime = value * duration;

    player?.seek(seekTime);
  };

  const delayUpdateSync = (shouldSyncValue: boolean) => {
    setTimeout(() => {
      shouldSync.value = shouldSyncValue;
    }, 200);
  };

  const gesture = Gesture.Pan()
    .hitSlop(TOUCH_SLOP)
    .maxPointers(1)
    .minPointers(1)
    .activeOffsetX(ACTIVEOFFSETX)
    .onBegin((e) => {
      runOnJS(setOverlayVisible)(true);

      runOnJS(setPaused)(true);

      shouldSync.value = false;

      const value = e.x / containerWidth;

      animateValue.value = value;
    })
    .onUpdate((e) => {
      runOnJS(setOverlayVisible)(true);
      runOnJS(setIsSliding)(true);

      const value = e.x / containerWidth;

      animateValue.value = value;
    })
    .onFinalize((e) => {
      runOnJS(setOverlayVisible)(false);

      runOnJS(seek)(e.x / containerWidth);

      runOnJS(setIsSliding)(false);
      runOnJS(setPaused)(false);
      runOnJS(delayUpdateSync)(true);
    });

  useEffect(() => {
    if (!shouldSync.value) return;

    animateValue.value = currentTime / duration;
  }, [animateValue, currentTime, duration, shouldSync]);

  const text = useDerivedValue(() => {
    return formatTime((animateValue.value || 0) * duration);
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value,
    } as any;
  });

  const trackStyles = useAnimatedStyle(() => {
    return {
      width: `${animateValue.value * 100}%`,
    };
  });

  const thumbStyles = useAnimatedStyle(() => {
    return {
      left: `${animateValue.value * 100}%`,
    };
  });

  return (
    <View className="absolute bottom-0 z-50 w-full px-4">
      <View className="flex flex-row items-center gap-0.5">
        <AnimatedTextInput
          underlineColorAndroid="transparent"
          editable={false}
          value={text.value}
          style={{
            textAlignVertical: 'bottom',
            marginTop: 16,
          }}
          className="h-6 p-0 font-outfit-medium text-base font-semibold text-white"
          {...{ animatedProps }}
        />

        <Text> / </Text>

        <Text className="text-gray-300">{formatTime(duration)}</Text>
        {timestamp ? (
          <React.Fragment>
            <Text> • </Text>
            <Text>{timestamp.type}</Text>
          </React.Fragment>
        ) : null}
      </View>

      <GestureDetector gesture={gesture}>
        <View
          onLayout={({ nativeEvent }) => {
            setContainerWidth(nativeEvent.layout.width);
          }}
          className="relative flex h-12 w-full justify-center"
        >
          <AnimatedView
            className="absolute z-20 h-1 rounded-md bg-primary-500"
            style={trackStyles}
          />

          <AnimatedView
            className="absolute z-20 rounded-full bg-primary-500"
            style={[
              thumbStyles,
              {
                width: THUMB_SIZE,
                height: THUMB_SIZE,
                transform: [
                  {
                    translateX: -THUMB_SIZE / 2,
                  },
                ],
              },
            ]}
          />

          {timestamps?.map((timestamp) => {
            const left = timestamp.startTime / duration;
            const width = (timestamp.endTime - timestamp.startTime) / duration;

            return (
              <View
                key={timestamp.type}
                className="absolute z-20 h-1 rounded-md bg-primary-500"
                style={[
                  {
                    width: `${width * 100}%`,
                    left: `${left * 100}%`,
                  },
                ]}
              />
            );
          })}

          <View
            className="absolute z-10 h-1 rounded-md bg-gray-300/60"
            style={{ width: `${(playableDuration / duration) * 100}%` }}
          />

          <View className="absolute z-0 h-1 w-full rounded-md bg-gray-400/60" />
        </View>
      </GestureDetector>

      {!timestamp ? <FastForwardButton /> : null}
    </View>
  );
};

export default MediaSlider;
