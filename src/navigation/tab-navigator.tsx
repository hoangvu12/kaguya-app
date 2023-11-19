import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ComponentType } from 'react';
import * as React from 'react';
import type { SvgProps } from 'react-native-svg';

import type {
  MediaFormat,
  MediaSeason,
  MediaSort,
  MediaSource,
  MediaStatus,
  MediaType,
} from '@/gql/graphql';
import ModuleScreen from '@/screens/module/screen';
import SearchScreen from '@/screens/search/screen';
import SettingsScreen from '@/screens/settings/screen';

import type { MediaCountry } from '@/screens/search/store';

import { Anime as AnimeIcon, colors, Settings as SettingsIcon } from '@/ui';
import { BoxIcon } from '@/ui/icons/box';
import { Search } from '@/ui/icons/search';

import { AnimeNavigator } from './anime-navigator';

export type TabParamList = {
  Anime: undefined;
  Settings: undefined;
  Search: {
    keyword?: string;
    mediaType?: MediaType;
    sort?: MediaSort;
    genres?: string[];
    year?: number;
    season?: MediaSeason;
    format?: MediaFormat;
    country?: MediaCountry;
    tags?: string[];
    status?: MediaStatus;
    source?: MediaSource;
  };
  Module: undefined;
};

type TabType = {
  name: keyof TabParamList;
  component: ComponentType<any>;
  label: string;
};

type TabIconsType = {
  [key in keyof TabParamList]: (props: SvgProps) => JSX.Element;
};

const Tab = createBottomTabNavigator<TabParamList>();

const tabsIcons: TabIconsType = {
  Anime: (props: SvgProps) => <AnimeIcon {...props} />,
  Settings: (props: SvgProps) => <SettingsIcon {...props} />,
  Module: (props: SvgProps) => <BoxIcon {...props} />,
  Search: (props: SvgProps) => <Search {...props} />,
};

export type TabList<T extends keyof TabParamList> = {
  navigation: NativeStackNavigationProp<TabParamList, T>;
  route: RouteProp<TabParamList, T>;
};

const tabs: TabType[] = [
  {
    name: 'Anime',
    component: AnimeNavigator,
    label: 'Anime',
  },

  {
    name: 'Module',
    component: ModuleScreen,
    label: 'Module',
  },
  {
    name: 'Search',
    component: SearchScreen,
    label: 'Search',
  },
  {
    name: 'Settings',
    component: SettingsScreen,
    label: 'Settings',
  },
];

type BarIconType = {
  name: keyof TabParamList;
  color: string;
};

const BarIcon = ({ color, name, ...reset }: BarIconType) => {
  const Icon = tabsIcons[name];
  return <Icon color={color} {...reset} />;
};

export const tabBarStyle = {
  backgroundColor: colors.thunder[900],
  borderTopWidth: 0,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  height: 64,
};

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor: colors.thunder[400],

        tabBarIcon: ({ color }) => <BarIcon name={route.name} color={color} />,
        tabBarActiveTintColor: colors.primary[400],
        tabBarStyle,
        tabBarShowLabel: false,
      })}
      initialRouteName="Anime"
      id="tab-navigator"
    >
      <Tab.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        {tabs.map(({ name, component, label }) => {
          return (
            <Tab.Screen
              key={name}
              name={name}
              component={component}
              options={{
                title: label,
                tabBarTestID: `${name}-tab`,
              }}
            />
          );
        })}
      </Tab.Group>
    </Tab.Navigator>
  );
};
