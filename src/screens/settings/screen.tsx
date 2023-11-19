import React from 'react';

import { Text, View } from '@/ui';

import AccountSettings from './components/account-settings';

const SettingsScreen = () => {
  return (
    <View className="p-8">
      <Text weight="semibold" className="mt-8 text-3xl">
        Settings
      </Text>

      <View className="mt-4">
        <AccountSettings />
      </View>
    </View>
  );
};

export default SettingsScreen;
