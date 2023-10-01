import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function Anime(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M15.414 5h5.594c.548 0 .992.445.992 1v14c0 .552-.455 1-.992 1H2.992A.994.994 0 012 20V6c0-.552.455-1 .992-1h5.594L6.05 2.465 7.464 1.05 11.414 5h1.172l3.95-3.95 1.414 1.415L15.414 5zM4 7v12h16V7H4z"
      />
    </Svg>
  );
}
