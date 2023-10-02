import React from 'react';
import type { CollapsibleProps } from 'react-native-collapsible-tab-view';
import {
  MaterialTabBar,
  Tabs as RNCTabs,
} from 'react-native-collapsible-tab-view';

import colors from '../theme/colors';

const Tabs = (props: CollapsibleProps) => {
  return (
    <RNCTabs.Container
      headerContainerStyle={{
        backgroundColor: colors.thunder[950],
      }}
      snapThreshold={0.3}
      renderTabBar={(tabBarProps) => (
        <MaterialTabBar
          {...tabBarProps}
          keepActiveTabCentered
          contentContainerStyle={{
            backgroundColor: colors.thunder[950],
            width: '100%',
          }}
          tabStyle={{
            flex: 1,
            zIndex: 10,
          }}
          labelStyle={{
            textTransform: 'capitalize',
            zIndex: 10,
            fontSize: 16,
            fontWeight: 600,
          }}
          indicatorStyle={{
            backgroundColor: colors.thunder[900],
            height: '100%',
            borderRadius: 6,
            zIndex: 0,
          }}
          scrollEnabled={true}
          activeColor={colors.primary[300]}
          inactiveColor={'white'}
          style={{ paddingHorizontal: 16, marginTop: 16 }}
        />
      )}
      {...props}
    />
  );
};

Tabs.Tab = RNCTabs.Tab;
Tabs.ScrollView = RNCTabs.ScrollView;
Tabs.FlatList = RNCTabs.FlatList;
Tabs.SectionList = RNCTabs.SectionList;
Tabs.FlashList = RNCTabs.FlashList;
Tabs.Lazy = RNCTabs.Lazy;
Tabs.MasonryFlashList = RNCTabs.MasonryFlashList;

export default Tabs;
