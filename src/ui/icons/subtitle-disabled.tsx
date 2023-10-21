import { styled } from 'nativewind';
import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

function SubtitleDisabledIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4l2 2H4v12h11.15l-2-2H7q-.425 0-.713-.288T6 15q0-.425.288-.713T7 14h4.15l-9.8-9.85q-.275-.275-.288-.688t.288-.712q.275-.275.7-.275t.7.275l18.5 18.5q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275L17.15 20H4zm17.75-1.1L20 17.15V6H8.85l-2-2H20q.825 0 1.413.588T22 6v11.9q0 .275-.05.525t-.2.475zm-6.9-6.9l-2-2H17q.425 0 .713.288T18 11q0 .425-.288.713T17 12h-2.15zm-.425-.425zm-4.85.85zM7 12q-.425 0-.713-.288T6 11q0-.425.288-.713T7 10q.425 0 .713.288T8 11q0 .425-.288.713T7 12z"
      />
    </Svg>
  );
}

export default styled(SubtitleDisabledIcon);
