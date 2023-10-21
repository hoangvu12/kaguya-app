import { styled } from 'nativewind';
import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

function SubtitleIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M2 20V4h20v16H2zm2-2h16V6H4v12zm0 0V6v12zm2-2h8v-2H6v2zm10 0h2v-2h-2v2zM6 12h2v-2H6v2zm4 0h8v-2h-8v2z"
      />
    </Svg>
  );
}

export default styled(SubtitleIcon);
