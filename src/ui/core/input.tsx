import { styled } from 'nativewind';
import React from 'react';
import type { TextInputProps } from 'react-native';
import { TextInput as RNTextInput } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface InputProps extends TextInputProps {
  className?: string;
}

const TextInput = styled(RNTextInput);

const Input: React.FC<InputProps> = ({
  className,
  onFocus,
  onBlur,
  ...props
}) => {
  return (
    <TextInput
      className={twMerge(
        'h-10 px-4 text-white border border-neutral-400 rounded-md',
        className
      )}
      onFocus={(e) => {
        onFocus && onFocus(e);
      }}
      onBlur={(e) => {
        onBlur && onBlur(e);
      }}
      {...props}
    />
  );
};

export default Input;
