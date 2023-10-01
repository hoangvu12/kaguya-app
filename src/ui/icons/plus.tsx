import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function Plus(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M11 13H6q-.425 0-.713-.288T5 12q0-.425.288-.713T6 11h5V6q0-.425.288-.713T12 5q.425 0 .713.288T13 6v5h5q.425 0 .713.288T19 12q0 .425-.288.713T18 13h-5v5q0 .425-.288.713T12 19q-.425 0-.713-.288T11 18v-5z"
      />
    </Svg>
  );
}
