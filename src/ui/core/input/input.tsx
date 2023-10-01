import { styled } from 'nativewind';
import * as React from 'react';
import type { TextInput, TextInputProps } from 'react-native';
import { StyleSheet } from 'react-native';
import { TextInput as NTextInput } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { isRTL } from '@/core';

import colors from '../../theme/colors';
import { Text } from '../text';
import { View } from '../view';

const STextInput = styled(NTextInput);

export interface NInputProps extends TextInputProps {
  label?: string;
  disabled?: boolean;
  error?: string;
  containerClassName?: string;
}

export const Input = React.forwardRef<TextInput, NInputProps>((props, ref) => {
  const { label, error, containerClassName, className, ...inputProps } = props;

  return (
    <View className={containerClassName}>
      {label && (
        <Text
          variant="md"
          className={error ? 'text-danger-600' : 'text-charcoal-100'}
        >
          {label}
        </Text>
      )}
      <STextInput
        testID="STextInput"
        ref={ref}
        placeholderTextColor={colors.neutral[400]}
        className={twMerge('px-3 py-2 text-white bg-charcoal-850', className)}
        {...inputProps}
        style={StyleSheet.flatten([
          { writingDirection: isRTL ? 'rtl' : 'ltr' },
        ])}
      />
      {error && <Text variant="error">{error}</Text>}
    </View>
  );
});
