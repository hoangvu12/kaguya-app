import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { styled } from 'nativewind';
import React from 'react';
import { useHeaderMeasurements } from 'react-native-collapsible-tab-view';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import colors from '@/ui/theme/colors';

const AnimatedView = styled(Animated.View);
const AnimatedText = styled(Animated.Text);
const SArrowLeft = styled(ArrowLeft);

const HEADER_HEIGHT = 56;
const DEFAULT_COLLAPSE_HEADER_HEIGHT = 300;

interface Props {
  title: string;
}

const UpdateHeader: React.FC<Props> = ({ title }) => {
  const { top, height } = useHeaderMeasurements();
  const navigation = useNavigation();

  const headerStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        top.value,
        [
          (height.value || DEFAULT_COLLAPSE_HEADER_HEIGHT) * (3 / 7) * -1,
          (height.value || DEFAULT_COLLAPSE_HEADER_HEIGHT) * (2 / 3) * -1,
        ],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      ),
      height: HEADER_HEIGHT,
      backgroundColor: colors.thunder[900],
    }),
    [top, height]
  );

  const textStyle = useAnimatedStyle(() => {
    const beginValue =
      (height.value || DEFAULT_COLLAPSE_HEADER_HEIGHT) * (4 / 7) * -1;
    const endValue =
      (height.value || DEFAULT_COLLAPSE_HEADER_HEIGHT) * (3 / 4) * -1;

    return {
      transform: [
        {
          translateY: interpolate(
            top.value,
            [beginValue, endValue],
            [HEADER_HEIGHT, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          ),
        },
      ],
      opacity: interpolate(top.value, [beginValue, endValue], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }),
    };
  }, [top, height]);

  React.useLayoutEffect(() => {
    // @ts-ignore
    const parent = navigation.getParent('anime-navigator');

    parent?.setOptions({
      header: () => (
        <AnimatedView
          className="flex flex-row items-center overflow-hidden"
          style={headerStyle}
        >
          <AnimatedView
            className="flex flex-row items-center p-2 px-4"
            style={textStyle}
          >
            <SArrowLeft size={24} className="mr-2" color="white" />

            <AnimatedText
              className="w-5/6 text-base text-white"
              numberOfLines={1}
            >
              {title}
            </AnimatedText>
          </AnimatedView>
        </AnimatedView>
      ),
    });
  }, [headerStyle, textStyle, navigation, title]);

  return null;
};

export default UpdateHeader;
