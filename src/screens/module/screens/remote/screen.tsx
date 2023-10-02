import React from 'react';

import { Text, View } from '@/ui';
import Sticker from '@/ui/sticker';

const RemoteModuleScreen = () => {
  return (
    <View className="flex w-full items-center">
      <Sticker name="persevere" className="h-24 w-24" />

      <Text variant="lg" className="mt-4">
        Coming soon...
      </Text>
    </View>
  );
};

export default RemoteModuleScreen;
