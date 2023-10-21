import { styled } from 'nativewind';
import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

function PauseIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M8.667 6.667A.667.667 0 008 7.333v17.334c0 .368.298.666.667.666h4a.667.667 0 00.666-.666V7.333a.667.667 0 00-.666-.666h-4zM19.333 6.667a.667.667 0 00-.666.666v17.334c0 .368.298.666.666.666h4a.667.667 0 00.667-.666V7.333a.667.667 0 00-.667-.666h-4z"
        fill="currentColor"
      />
    </Svg>
  );
}

export default styled(PauseIcon);
