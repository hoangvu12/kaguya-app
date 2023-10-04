import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ComponentType } from 'react';
import * as React from 'react';
import type { SvgProps } from 'react-native-svg';

import { AnimeHomeScreen } from '@/screens/anime/screen';
import ModuleScreen from '@/screens/module/screen';
import {
  Anime as AnimeIcon,
  colors,
  Manga as MangaIcon,
  Settings as SettingsIcon,
} from '@/ui';
import { BoxIcon } from '@/ui/icons/box';

import { AnimeNavigator } from './anime-navigator';

type TabParamList = {
  Anime: undefined;
  Settings: undefined;
  Manga: undefined;
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
  Manga: (props: SvgProps) => <MangaIcon {...props} />,
  Settings: (props: SvgProps) => <SettingsIcon {...props} />,
  Module: (props: SvgProps) => <BoxIcon {...props} />,
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
    name: 'Manga',
    component: AnimeHomeScreen,
    label: 'Manga',
  },
  {
    name: 'Module',
    component: ModuleScreen,
    label: 'Module',
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

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor: colors.thunder[400],

        tabBarIcon: ({ color }) => <BarIcon name={route.name} color={color} />,
        tabBarActiveTintColor: colors.primary[400],
        tabBarStyle: {
          backgroundColor: colors.thunder[900],
          borderTopWidth: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 64,
        },
        tabBarShowLabel: false,
      })}
      initialRouteName="Module"
      id="tab-navigator"
    >
      <Tab.Group
        screenOptions={{
          // header,
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
