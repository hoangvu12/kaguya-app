import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function Search(props: SvgProps) {
  return (
    <Svg viewBox="0 0 256 256" {...props}>
      <Path
        fill="currentColor"
        d="M229.66 218.34l-50.07-50.06a88.11 88.11 0 10-11.31 11.31l50.06 50.07a8 8 0 0011.32-11.32zM40 112a72 72 0 1172 72 72.08 72.08 0 01-72-72z"
      />
    </Svg>
  );
}
