import { styled } from 'nativewind';
import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

function PlayIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M10.667 6.655a.667.667 0 011.063-.536l12.647 9.344c.36.267.36.806 0 1.073L11.73 25.88a.667.667 0 01-1.063-.536V6.655z"
        fill="currentColor"
      />
    </Svg>
  );
}

export default styled(PlayIcon);
