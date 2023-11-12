import React, { useCallback } from 'react';
import type {
  CollapsibleProps,
  MaterialTabBarProps,
} from 'react-native-collapsible-tab-view';
import {
  MaterialTabBar,
  Tabs as RNCTabs,
} from 'react-native-collapsible-tab-view';

import colors from '../theme/colors';

const contentContainerStyle = {
  backgroundColor: colors.thunder[950],
  width: '100%',
};

const tabStyle = {
  flex: 1,
  zIndex: 10,
} as const;

const labelStyle = {
  textTransform: 'capitalize',
  zIndex: 10,
  fontSize: 16,
  fontWeight: 600,
} as const;

const indicatorStyle = {
  backgroundColor: colors.thunder[900],
  height: '100%',
  borderRadius: 6,
  zIndex: 0,
} as const;

const style = {
  paddingHorizontal: 16,
  marginTop: 16,
} as const;

const headerContainerStyle = {
  backgroundColor: colors.thunder[950],
} as const;

const Tabs = (props: CollapsibleProps) => {
  const renderTabBar = useCallback(
    (tabBarProps: MaterialTabBarProps<string>) => (
      <MaterialTabBar
        {...tabBarProps}
        keepActiveTabCentered
        // @ts-expect-error
        contentContainerStyle={contentContainerStyle}
        tabStyle={tabStyle}
        labelStyle={labelStyle}
        indicatorStyle={indicatorStyle}
        scrollEnabled={true}
        activeColor={colors.primary[300]}
        inactiveColor={'white'}
        style={style}
      />
    ),
    []
  );

  return (
    <RNCTabs.Container
      headerContainerStyle={headerContainerStyle}
      snapThreshold={null}
      renderTabBar={renderTabBar}
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
