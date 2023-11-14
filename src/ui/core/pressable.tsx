import { styled } from 'nativewind';
import type { ComponentPropsWithoutRef } from 'react';
import React from 'react';
import { Pressable as NPressable } from 'react-native';

import { addAlpha } from '../../utils';
import colors from '../theme/colors';

const StyledPressable = styled(NPressable);

const rippleColor = addAlpha(colors.thunder[800], 0.26);

const Pressable: React.FC<ComponentPropsWithoutRef<typeof StyledPressable>> = (
  props
) => {
  return (
    <StyledPressable
      android_ripple={{ color: rippleColor, foreground: true }}
      {...props}
    >
      {props.children}
    </StyledPressable>
  );
};

export default Pressable;
