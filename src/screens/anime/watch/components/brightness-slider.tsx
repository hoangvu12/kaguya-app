import * as Brightness from 'expo-brightness';
import { useSetAtom } from 'jotai/react';
import { SunIcon } from 'lucide-react-native';
import { styled } from 'nativewind';
import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { HEIGHT, View } from '@/ui';

import { brightnessSliderAtom } from '../store';

const HEIGHT_PERCENT = 0.7;

const AnimatedView = styled(Animated.View);

const BrightnessSlider = () => {
  const [sliderHeight, setSliderHeight] = React.useState(
    HEIGHT * HEIGHT_PERCENT
  );

  const setBrightnessSlider = useSetAtom(brightnessSliderAtom);
  const [bridgeBrightness, setBridgeBrightness] = React.useState(0);

  const animateValue = useSharedValue(0);
  const opacityValue = useSharedValue(0);

  useEffect(() => {
    const handleScreenChange = ({ screen }: any) => {
      setSliderHeight(screen.height * HEIGHT_PERCENT);
    };

    const sub = Dimensions.addEventListener('change', handleScreenChange);

    setSliderHeight(Dimensions.get('screen').height * HEIGHT_PERCENT);

    return () => {
      sub.remove();
    };
  }, []);

  useEffect(() => {
    Brightness.getBrightnessAsync().then((value) => {
      setBridgeBrightness(value);
    });
  }, []);

  useEffect(() => {
    Brightness.setBrightnessAsync(bridgeBrightness);
  }, [bridgeBrightness]);

  useEffect(() => {
    setBrightnessSlider({
      show: () => {
        'worklet';

        opacityValue.value = withTiming(1, { duration: 100 });
      },
      hide: () => {
        'worklet';

        opacityValue.value = withDelay(300, withTiming(0, { duration: 200 }));
      },
      setAnimationValue: (value: number) => {
        'worklet';

        animateValue.value = value;
      },
      setBrightness: (value) => {
        setBridgeBrightness(value);
      },
      getHeight: () => {
        'worklet';

        return sliderHeight;
      },
      getBrightness: () => {
        'worklet';

        return bridgeBrightness;
      },
    });
  }, [
    animateValue,
    bridgeBrightness,
    opacityValue,
    setBrightnessSlider,
    sliderHeight,
  ]);

  const sliderContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: opacityValue.value,
    };
  });

  const sliderStyles = useAnimatedStyle(() => {
    return {
      height: `${animateValue.value * 100}%`,
    };
  });

  return (
    <AnimatedView
      className="absolute right-4 top-1/2 z-50 flex w-12 items-center justify-end rounded-full bg-black/60 p-2"
      style={[
        {
          height: sliderHeight,
          transform: [{ translateY: -(sliderHeight / 2) }],
        },
        sliderContainerStyles,
      ]}
    >
      <View className="relative w-full flex-1">
        <View className="absolute top-0 h-full w-full rounded-full bg-primary-500/40" />

        <AnimatedView
          className="absolute bottom-0 w-full rounded-full bg-primary-500"
          style={sliderStyles}
        />
      </View>

      <View className="mt-2">
        <SunIcon size={24} color="white" />
      </View>
    </AnimatedView>
  );
};

export default React.memo(BrightnessSlider);
