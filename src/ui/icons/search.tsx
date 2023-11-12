import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Circle, Path } from 'react-native-svg';

export function Search(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-search"
      {...props}
    >
      <Circle cx={11} cy={11} r={8} />
      <Path d="M21 21l-4.3-4.3" />
    </Svg>
  );
}
