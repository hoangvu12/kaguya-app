import React from 'react';

import { ScrollView, Text, View } from '@/ui';

import AccountSettings from './components/account-settings';
import AppSettings from './components/app-settings';
import PlayerSettings from './components/player-settings';
import StorageSettings from './components/storage-settings';

const SettingsScreen = () => {
  return (
    <ScrollView className="px-4 pt-4">
      <Text weight="semibold" className="mt-4 text-3xl">
        Settings
      </Text>

      <View className="mt-8 mb-16">
        <View className="mb-8">
          <AppSettings />
        </View>

        <View className="mb-8">
          <AccountSettings />
        </View>

        <View className="mb-8">
          <PlayerSettings />
        </View>

        <View>
          <StorageSettings />
        </View>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
