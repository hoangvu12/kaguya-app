import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useAtom, useAtomValue, useSetAtom } from 'jotai/react';
import { atom } from 'jotai/vanilla';
import { FastForwardIcon, MinusIcon, PlusIcon } from 'lucide-react-native';
import { styled } from 'nativewind';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { Button, Text, View } from '@/ui';
import BottomSheet from '@/ui/core/bottom-sheet';
import Input from '@/ui/core/input';
import colors from '@/ui/theme/colors';

import useScreenSize from '../hooks/use-screen-size';
import { currentTimeAtom, fastForwardAtom, playerAtom } from '../store';
import Tappable from './tappable';

const clamp = (value: number, lowerBound: number, upperBound: number) => {
  'worklet';

  return Math.min(Math.max(lowerBound, value), upperBound);
};

const bottomSheetAtom = atom({ show: () => {}, hide: () => {} });

const FastForwardButton = () => {
  const fastForward = useAtomValue(fastForwardAtom);
  const player = useAtomValue(playerAtom);
  const currentTime = useAtomValue(currentTimeAtom);
  const bottomSheet = useAtomValue(bottomSheetAtom);

  return (
    <View className="absolute right-4 bottom-12 z-50">
      <Tappable
        onPress={() => {
          player?.seek(currentTime + fastForward);
        }}
        onLongPress={() => {
          bottomSheet.show();
        }}
      >
        <View className="flex flex-row items-center justify-center rounded-3xl border border-primary-200 p-4">
          <Text className="mr-2 text-primary-300" weight="semibold">
            + {fastForward}
          </Text>

          <FastForwardIcon
            size={24}
            color={colors.primary[300]}
            fill={colors.primary[300]}
          />
        </View>
      </Tappable>

      <EditBottomSheet />
    </View>
  );
};

const EditBottomSheet = memo(() => {
  const [fastForward, setFastForward] = useAtom(fastForwardAtom);
  const [localFastForward, setLocalFastForward] = useState(
    fastForward.toString() || '90'
  );
  const setBottomSheet = useSetAtom(bottomSheetAtom);
  const screenSize = useScreenSize();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    setBottomSheet({
      hide: () => {
        bottomSheetRef.current?.close();
      },

      show: () => {
        bottomSheetRef.current?.present();
      },
    });
  }, [setBottomSheet]);

  useEffect(() => {
    setLocalFastForward(fastForward.toString());
  }, [fastForward]);

  return (
    <BottomSheet
      containerStyle={{
        marginHorizontal: screenSize.width * 0.1,
      }}
      snapPoints={['50%']}
      ref={bottomSheetRef}
    >
      <Text className="mb-4">
        Change your fast forward duration here. This will be saved for future
      </Text>

      <View className="flex flex-row items-center">
        <Input
          value={localFastForward.toString()}
          onChange={(e) => {
            const text = e.nativeEvent.text;

            setLocalFastForward(text);
          }}
          onBlur={() => {
            setFastForward(parseInt(localFastForward, 10));
          }}
          keyboardType="numeric"
          className="mr-2 w-24"
        />

        <Button
          variant="outline"
          onPress={() => {
            setFastForward(fastForward + 1);
          }}
          className="mr-2"
        >
          <PlusIcon size={24} color="white" />
        </Button>
        <Button
          variant="outline"
          onPress={() => {
            setFastForward(fastForward - 1);
          }}
        >
          <MinusIcon size={24} color="white" />
        </Button>

        <FastForwardSlider />
      </View>
    </BottomSheet>
  );
});

const MAX_FAST_FORWARD = 120;
const AnimatedView = styled(Animated.View);

const FastForwardSlider = memo(() => {
  const [fastForward, setFastForward] = useAtom(fastForwardAtom);
  const animateValue = useSharedValue(fastForward / MAX_FAST_FORWARD);
  const [containerWidth, setContainerWidth] = useState(0);

  const gesture = Gesture.Pan()
    .onStart((e) => {
      const x = e.x;

      animateValue.value = x / containerWidth;
    })
    .onUpdate((e) => {
      const x = e.x;

      animateValue.value = x / containerWidth;
    })
    .onFinalize((e) => {
      const x = e.x;

      const value = x / containerWidth;

      runOnJS(setFastForward)(
        clamp(Math.round(value * MAX_FAST_FORWARD), 0, MAX_FAST_FORWARD)
      );
    });

  useEffect(() => {
    let updateValue = fastForward / MAX_FAST_FORWARD;

    if (updateValue > 1) {
      updateValue = 1;
    } else if (updateValue < 0) {
      updateValue = 0;
    }

    animateValue.value = updateValue;
  }, [animateValue, fastForward]);

  const styles = useAnimatedStyle(() => {
    return {
      width: `${animateValue.value * 100}%`,
    };
  });

  return (
    <View
      onLayout={(event) => {
        setContainerWidth(event.nativeEvent.layout.width);
      }}
      className="relative ml-2 flex h-full grow flex-row items-center rounded-md border border-neutral-400"
    >
      <GestureDetector gesture={gesture}>
        <AnimatedView
          className="absolute left-0 h-full overflow-hidden rounded-md bg-primary-500"
          style={styles}
        />
      </GestureDetector>
      <Text className="absolute left-4 text-gray-300">0</Text>
      <Text className="absolute right-4 text-gray-300">{MAX_FAST_FORWARD}</Text>
    </View>
  );
});

export default React.memo(FastForwardButton);
