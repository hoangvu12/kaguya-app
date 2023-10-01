import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function VoiceActor(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19c0-2.21-2.686-4-6-4s-6 1.79-6 4M16.828 5.172a3.999 3.999 0 010 5.657M19 3a7.07 7.07 0 010 10M9 12a4 4 0 110-8 4 4 0 010 8z"
      />
    </Svg>
  );
}
