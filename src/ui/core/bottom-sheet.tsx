import type {
  BottomSheetBackdropProps,
  BottomSheetProps as LBottomSheetProps,
} from '@gorhom/bottom-sheet';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { styled } from 'nativewind';
import React, { useCallback } from 'react';
import type { ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

import colors from '../theme/colors';

export interface BottomSheetProps extends LBottomSheetProps {
  containerViewProps?: Omit<ViewProps, 'className'>;
  containerViewClassName?: string;
  useScrollView?: boolean;
}

const SBottomSheetScrollView = styled(BottomSheetScrollView);

const BottomSheet = React.forwardRef<BottomSheetModal, BottomSheetProps>(
  (
    {
      containerViewProps,
      containerViewClassName,
      handleStyle,
      handleIndicatorStyle,
      backgroundStyle,
      useScrollView = true,
      ...props
    },
    ref
  ) => {
    const renderBackdrop = useCallback(
      (backdropProps: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...backdropProps}
          enableTouchThrough={false}
          pressBehavior={'close'}
          opacity={0.6}
          disappearsOnIndex={-1}
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        handleStyle={{
          backgroundColor: colors.thunder[900],
          borderRadius: 12,
          // @ts-ignore
          ...handleStyle,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.thunder[400],
          // @ts-ignore
          ...handleIndicatorStyle,
        }}
        backgroundStyle={{
          backgroundColor: colors.thunder[900],
          // @ts-ignore
          ...backgroundStyle,
        }}
        ref={ref}
        backdropComponent={renderBackdrop}
        {...props}
      >
        {useScrollView ? (
          // @ts-ignore just a type error when upgrading
          <SBottomSheetScrollView
            className={twMerge('p-4 rounded-xl', containerViewClassName)}
            {...containerViewProps}
          >
            {typeof props.children === 'function'
              ? props.children()
              : props.children}
          </SBottomSheetScrollView>
        ) : typeof props.children === 'function' ? (
          props.children()
        ) : (
          props.children
        )}
      </BottomSheetModal>
    );
  }
);

export default BottomSheet;
