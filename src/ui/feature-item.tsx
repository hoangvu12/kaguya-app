import React from 'react';
import type { ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { Button } from './core';

interface FeatureItemProps extends ViewProps {
  leftIcon?: React.ReactNode;
  to: string;
  title: string;
}

export const FeatureItem = ({
  leftIcon,
  title,
  className,
  ...viewProps
}: FeatureItemProps) => {
  return (
    <Button
      label={title}
      leftIcon={leftIcon}
      className={twMerge(
        'flex flex-row items-center bg-thunder-900 rounded-xl',
        className
      )}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ gap: 8 }}
      labelProps={{ numberOfLines: 1, variant: 'sm' }}
      {...viewProps}
    />
  );
};
