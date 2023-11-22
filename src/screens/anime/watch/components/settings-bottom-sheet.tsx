import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import {
  BottomSheetBackdrop,
  type BottomSheetModal,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { useSetAtom } from 'jotai/react';
import { ChevronLeft } from 'lucide-react-native';
import React, { useCallback } from 'react';

import { Button, Text, View } from '@/ui';
import type { BottomSheetProps } from '@/ui/core/bottom-sheet';
import BottomSheet from '@/ui/core/bottom-sheet';

import useScreenSize from '../hooks/use-screen-size';
import { pausedAtom } from '../store';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface SettingsBottomSheetProps
  extends PartialBy<BottomSheetProps, 'snapPoints' | 'children'> {
  canGoBack?: boolean;
  goBackTitle?: string;
}

const SettingsBottomSheet = React.forwardRef<
  BottomSheetModal,
  React.PropsWithChildren<SettingsBottomSheetProps>
>(
  (
    {
      containerStyle,
      canGoBack: shouldGoBack,
      goBackTitle = 'Settings',
      ...props
    },
    ref
  ) => {
    const setPaused = useSetAtom(pausedAtom);

    const screenSize = useScreenSize();
    const { dismiss, dismissAll } = useBottomSheetModal();

    const renderBackdrop = useCallback(
      (backdropProps: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...backdropProps}
          enableTouchThrough={false}
          pressBehavior="collapse"
          opacity={0.6}
          disappearsOnIndex={-1}
          onPress={() => {
            dismissAll();
            setPaused(false);
          }}
        />
      ),
      [dismissAll, setPaused]
    );

    return (
      <BottomSheet
        ref={ref}
        containerStyle={{
          marginHorizontal: screenSize.width * 0.2,
          // @ts-ignore
          ...containerStyle,
        }}
        snapPoints={['80%']}
        handleComponent={() => (
          <View className="relative flex h-12 w-full flex-row items-center justify-center">
            {shouldGoBack ? (
              <Button
                onPress={() => dismiss()}
                className="absolute left-6 bg-transparent p-0"
              >
                <ChevronLeft size={32} color="white" />

                {goBackTitle && <Text>{goBackTitle}</Text>}
              </Button>
            ) : null}

            <View className="h-2 w-12 rounded-full bg-thunder-400" />
          </View>
        )}
        backdropComponent={renderBackdrop}
        {...props}
      >
        {props.children}
      </BottomSheet>
    );
  }
);

export default SettingsBottomSheet;
