import React, { useEffect } from 'react';
import type { ViewProps } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { twMerge } from 'tailwind-merge';

import { View } from './view';
export interface SkeletonProps extends ViewProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <View className={twMerge(className)} {...props}>
      {props.children}
    </View>
  );
};

interface SkeletonItemProps extends Animated.AnimateProps<ViewProps> {
  container?: boolean;
  className?: string;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const SkeletonItem: React.FC<SkeletonItemProps> = ({
  container,
  style,
  ...props
}) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (container) return;

    progress.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.linear }),
      0,
      true
    );
  }, [container, progress]);

  const styles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.2)']
    );

    return {
      backgroundColor,
    };
  });

  return <AnimatedView style={[styles, style]} {...props} />;
};

export default Skeleton;
