import { styled } from 'nativewind';
import React from 'react';
import type { RefreshControlProps } from 'react-native';
import { RefreshControl as RNRefreshControl } from 'react-native-gesture-handler';

import colors from '../theme/colors';

const SRefreshControl = styled(RNRefreshControl);

const RefreshControl = (props: RefreshControlProps) => {
  return (
    <SRefreshControl
      colors={[colors.primary[300]]}
      progressBackgroundColor={colors.thunder[800]}
      {...props}
    />
  );
};

export default RefreshControl;
