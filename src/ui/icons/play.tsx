import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function Play(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path fill="currentColor" d="M8 5v14l11-7z" />
    </Svg>
  );
}
