import { useAtom, useSetAtom } from 'jotai/react';
import { Volume2Icon } from 'lucide-react-native';
import { styled } from 'nativewind';
import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import useScreenSize from '@/hooks/use-screen-size';
import { View } from '@/ui';

import { volumeAtom, volumeSliderAtom } from '../store';

const HEIGHT_PERCENT = 0.7;

const AnimatedView = styled(Animated.View);

const VolumeSlider = () => {
  const { height } = useScreenSize();

  const [sliderHeight, setSliderHeight] = React.useState(
    height * HEIGHT_PERCENT
  );

  const [volume, setVolume] = useAtom(volumeAtom);
  const setVolumeSlider = useSetAtom(volumeSliderAtom);

  const animateValue = useSharedValue(1);
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
    animateValue.value = volume;
  }, [animateValue, volume]);

  useEffect(() => {
    setVolumeSlider({
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
      setVolume: (value) => {
        setVolume(value);
      },
      getHeight: () => {
        'worklet';

        return sliderHeight;
      },
      getVolume: () => {
        'worklet';

        return volume;
      },
    });
  }, [
    animateValue,
    opacityValue,
    setVolume,
    setVolumeSlider,
    sliderHeight,
    volume,
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
      className="absolute left-4 top-1/2 z-50 flex w-12 items-center justify-end rounded-full bg-black/60 p-2"
      style={[
        {
          height: sliderHeight,
          transform: [{ translateY: -(sliderHeight / 2) }],
        },
        sliderContainerStyles,
      ]}
    >
      <View className="relative w-full flex-1 overflow-hidden rounded-full">
        <View className="absolute top-0 h-full w-full rounded-full bg-primary-500/40" />

        <AnimatedView
          className="absolute bottom-0 w-full rounded-full bg-primary-500"
          style={sliderStyles}
        />
      </View>

      <View className="mt-2">
        <Volume2Icon size={24} color="white" />
      </View>
    </AnimatedView>
  );
};

export default React.memo(VolumeSlider);
