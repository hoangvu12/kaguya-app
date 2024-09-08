import { useAtomValue, useSetAtom } from 'jotai/react';
import { LockIcon } from 'lucide-react-native';
import React from 'react';

import { Button, Text, View } from '@/ui';

import { isLockedAtom, isOverlayVisibleAtom } from '../store';

const UnlockFloatButton = () => {
  const setIsLocked = useSetAtom(isLockedAtom);
  const isOverlayVisible = useAtomValue(isOverlayVisibleAtom);

  if (!isOverlayVisible) return null;

  return (
    <View className="absolute bottom-16 z-10 flex w-full items-center justify-center">
      <Button className="bg-thunder-900" onPress={() => setIsLocked(false)}>
        <LockIcon size={24} color="white" />

        <Text className="ml-1">Unlock</Text>
      </Button>
    </View>
  );
};

export default UnlockFloatButton;
