import { styled } from 'nativewind';
import React from 'react';
import { Switch as RNSwitch } from 'react-native';

import colors from '../theme/colors';

const SSwitch = styled(RNSwitch);

type SwitchProps = React.ComponentProps<typeof SSwitch>;

const Switch: React.FC<SwitchProps> = (props) => {
  return (
    <SSwitch
      trackColor={{ false: colors.neutral[600], true: colors.primary[500] }}
      thumbColor={'white'}
      {...props}
    />
  );
};

export default Switch;
