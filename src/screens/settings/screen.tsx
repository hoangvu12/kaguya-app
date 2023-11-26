import React from 'react';

import { Text, View } from '@/ui';

import AccountSettings from './components/account-settings';
import AppSettings from './components/app-settings';
import PlayerSettings from './components/player-settings';

const SettingsScreen = () => {
  return (
    <View className="p-8">
      <Text weight="semibold" className="mt-8 text-3xl">
        Settings
      </Text>

      <View className="mt-4 space-y-8">
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
