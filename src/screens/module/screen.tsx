import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Button, FocusAwareStatusBar, ScrollView, Text, View } from '@/ui';

import InstalledModuleScreen from './screens/installed/screen';
import LocalModuleScreen from './screens/local/screen';
import RemoteModuleScreen from './screens/remote/screen';

const ModuleScreen = () => {
  const [currentTab, setCurrentTab] = React.useState<
    'installed' | 'remote' | 'local'
  >('installed');

  return (
    <React.Fragment>
      <FocusAwareStatusBar />

      <View className="flex flex-row gap-1 p-4">
        <Button
          className={twMerge(
            'grow',
            currentTab !== 'installed' ? 'bg-thunder-900' : 'bg-primary-500'
          )}
          onPress={() => setCurrentTab('installed')}
        >
          <Text>Installed</Text>
        </Button>
        <Button
          className={twMerge(
            'grow',
            currentTab !== 'remote' ? 'bg-thunder-900' : 'bg-primary-500'
          )}
          onPress={() => setCurrentTab('remote')}
        >
          <Text>Remote</Text>
        </Button>
        <Button
          className={twMerge(
            'grow',
            currentTab !== 'local' ? 'bg-thunder-900' : 'bg-primary-500'
          )}
          onPress={() => setCurrentTab('local')}
        >
          <Text>Local</Text>
        </Button>
      </View>

      <ScrollView className="p-4">
        {currentTab === 'installed' && <InstalledModuleScreen />}
        {currentTab === 'remote' && <RemoteModuleScreen />}
        {currentTab === 'local' && <LocalModuleScreen />}
      </ScrollView>
    </React.Fragment>
  );
};

export default ModuleScreen;
