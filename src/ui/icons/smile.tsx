import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function Smile(props: SvgProps) {
  return (
    <Svg viewBox="0 0 256 256" {...props}>
      <Path
        fill="currentColor"
        d="M128 24a104 104 0 10104 104A104.11 104.11 0 00128 24zm0 192a88 88 0 1188-88 88.1 88.1 0 01-88 88zM80 108a12 12 0 1112 12 12 12 0 01-12-12zm96 0a12 12 0 11-12-12 12 12 0 0112 12zm-1.07 48c-10.29 17.79-27.4 28-46.93 28s-36.63-10.2-46.92-28a8 8 0 1113.84-8c7.47 12.91 19.21 20 33.08 20s25.61-7.1 33.07-20a8 8 0 0113.86 8z"
      />
    </Svg>
  );
}
