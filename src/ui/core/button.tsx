import React from 'react';
import type {
  ActivityIndicatorProps,
  TouchableOpacityProps,
} from 'react-native';
import { twMerge } from 'tailwind-merge';

import { ActivityIndicator } from './activity-indicator';
import { TouchableOpacity } from './touchable-opacity';

type Variant = {
  container: string;
  label: string;
  indicator: string;
};
type VariantName = 'defaults' | 'primary' | 'outline' | 'secondary';
type BVariant = {
  [key in VariantName]: Variant;
};

export const buttonVariants: BVariant = {
  defaults: {
    container: 'flex flex-row items-center justify-center rounded-md px-4 py-2',
    label: 'text-[16px] font-medium text-white',
    indicator: 'text-white h-[30px]',
  },
  primary: {
    container: 'bg-primary-500',
    label: 'text-white',
    indicator: 'text-white',
  },
  secondary: {
    container: 'bg-primary-600',
    label: 'text-secondary-600',
    indicator: 'text-white',
  },
  outline: {
    container: 'text-white border border-neutral-400',
    label: 'text-white',
    indicator: 'text-white',
  },
};

interface Props extends TouchableOpacityProps {
  variant?: VariantName;
  loading?: boolean;
  indicatorClassName?: string;
  leftIcon?: React.ReactNode;
  loadingProps?: ActivityIndicatorProps;
}

export const Button = ({
  loading = false,
  variant = 'primary',
  disabled = false,
  className,
  indicatorClassName,
  leftIcon,
  loadingProps,
  ...props
}: Props) => {
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      className={twMerge(
        buttonVariants.defaults.container,
        buttonVariants[variant].container,
        disabled ? 'opacity-50' : '',
        className
      )}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ gap: 4 }}
      {...props}
    >
      {!loading && leftIcon && leftIcon}

      {loading ? (
        <ActivityIndicator
          size="small"
          className={twMerge(
            buttonVariants.defaults.indicator,
            buttonVariants[variant].indicator,
            indicatorClassName
          )}
          {...loadingProps}
        />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};
