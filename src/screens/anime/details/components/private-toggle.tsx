import React from 'react';

import { Text, View } from '@/ui';
import Switch from '@/ui/core/switch';

interface PrivateToggleProps {
  isPrivate: boolean;
  onPrivateChange?: (isPrivate: boolean) => void;
}

const PrivateToggle: React.FC<PrivateToggleProps> = ({
  isPrivate,
  onPrivateChange,
}) => {
  return (
    <View className="flex flex-row items-center justify-between">
      <Text>Private?</Text>

      <Switch onValueChange={onPrivateChange} value={isPrivate} />
    </View>
  );
};

export default React.memo(PrivateToggle);
