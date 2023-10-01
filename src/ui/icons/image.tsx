import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function ImageIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21H5zm1-8.425l3.3-3.3q.3-.3.7-.3t.7.3l3.3 3.3 3.3-3.3q.3-.3.7-.3t.7.3l.3.3V5H5v6.575l1 1zM5 19h14v-6.6l-1-1-3.3 3.3q-.3.3-.7.3t-.7-.3L10 11.4l-3.3 3.3q-.3.3-.7.3t-.7-.3l-.3-.3V19zm0 0v-6.6 2V5v14z"
      />
    </Svg>
  );
}
