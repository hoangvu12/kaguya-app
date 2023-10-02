import React from 'react';

import { FocusAwareStatusBar } from '@/ui';
import Tabs from '@/ui/core/tabs';

import InstalledModuleScreen from './screens/installed/screen';
import LocalModuleScreen from './screens/local/screen';
import RemoteModuleScreen from './screens/remote/screen';

const ModuleScreen = () => {
  return (
    <React.Fragment>
      <FocusAwareStatusBar />

      <Tabs>
        <Tabs.Tab name="InstalledModule" label="Installed">
          <Tabs.ScrollView
            style={{ paddingHorizontal: 16, paddingVertical: 16 }}
          >
            <InstalledModuleScreen />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="RemoteModule" label="Remote">
          <Tabs.ScrollView
            style={{ paddingHorizontal: 16, paddingVertical: 16 }}
          >
            <RemoteModuleScreen />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="LocalModule" label="Local">
          <Tabs.ScrollView
            style={{ paddingHorizontal: 16, paddingVertical: 16 }}
          >
            <LocalModuleScreen />
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs>
    </React.Fragment>
  );
};

export default ModuleScreen;
