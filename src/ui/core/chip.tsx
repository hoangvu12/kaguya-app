import React from 'react';
import type { ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { View } from './view';

interface ChipProps extends ViewProps {}

const Chip = ({ className, ...props }: React.PropsWithChildren<ChipProps>) => {
  return (
    <View
      className={twMerge('rounded-full bg-thunder-900 px-3 py-2', className)}
      {...props}
    >
      {props.children}
    </View>
  );
};

export default Chip;
