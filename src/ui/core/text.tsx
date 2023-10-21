// In Text.tsx
import { styled } from 'nativewind';
import React from 'react';
import type { TextProps as RNTextProps } from 'react-native';
import { Text as NNText } from 'react-native';
import { twMerge } from 'tailwind-merge';

const SText = styled(NNText);

const fontWeights = {
  thin: 'font-outfit-thin',
  extralight: 'font-outfit-extralight',
  light: 'font-outfit-light',
  normal: 'font-outfit-regular',
  medium: 'font-outfit-medium',
  semibold: 'font-outfit-semibold',
  bold: 'font-outfit-bold',
  extrabold: 'font-outfit-extrabold',
  black: 'font-outfit-black',
};

export interface TextProps extends RNTextProps {
  variant?: keyof typeof textVariants;
  className?: string;
  weight?: keyof typeof fontWeights;
}

export const textVariants = {
  defaults: 'text-base text-white font-outfit-medium font-semibold',
  xl: 'text-xl',
  lg: 'text-lg',
  md: 'text-base',
  sm: 'text-sm',
  xs: 'text-xs',
  error: 'text-red-300',
};

export const Text = ({
  variant = 'md',
  className = '',
  children,
  weight = 'medium',
  ...props
}: React.PropsWithChildren<TextProps>) => {
  return (
    <SText
      className={twMerge(
        textVariants.defaults,
        textVariants[variant],
        fontWeights[weight],
        className
      )}
      {...props}
    >
      {children}
    </SText>
  );
};
