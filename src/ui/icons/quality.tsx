import { styled } from 'nativewind';
import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

function QualityIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M14.75 16.5h1.5V15H17q.425 0 .713-.288T18 14v-4q0-.425-.288-.713T17 9h-3q-.425 0-.713.288T13 10v4q0 .425.288.713T14 15h.75v1.5zM6 15h1.5v-2h2v2H11V9H9.5v2.5h-2V9H6v6zm8.5-1.5v-3h2v3h-2zM4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4zm0-2h16V6H4v12zm0 0V6v12z"
      />
    </Svg>
  );
}

export default styled(QualityIcon);
