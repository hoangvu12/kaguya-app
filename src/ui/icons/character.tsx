import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function Character(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12 13q-1.65 0-2.825-1.175T8 9V5.5q0-.625.438-1.063T9.5 4q.375 0 .713.175t.537.5q.2-.325.537-.5T12 4q.375 0 .713.175t.537.5q.2-.325.537-.5T14.5 4q.625 0 1.063.438T16 5.5V9q0 1.65-1.175 2.825T12 13zm-6 8q-.825 0-1.413-.588T4 19v-.8q0-.85.438-1.563T5.6 15.55q1.55-.775 3.15-1.163T12 14q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 18.2v.8q0 .825-.588 1.413T18 21H6z"
      />
    </Svg>
  );
}
