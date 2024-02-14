import React from 'react';

import { Text, View } from '@/ui';

import AccountSettings from './components/account-settings';
import AppSettings from './components/app-settings';
import PlayerSettings from './components/player-settings';

const SettingsScreen = () => {
  return (
    <View className="p-4">
      <Text weight="semibold" className="mt-4 text-3xl">
        Settings
      </Text>

      <View className="mt-8 space-y-8">
        <View>
          <AppSettings />
        </View>

        <View>
          <AccountSettings />
        </View>

        <View>
          <PlayerSettings />
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;
