import * as React from 'react';
import { ScrollView } from 'react-native';

import useModuleLinking from '@/hooks/use-module-linking';
import { FocusAwareStatusBar, Text, View } from '@/ui';
import { BannerList } from '@/ui/banner-card';

import AiringTodayList from './components/airing-today-list';
import GenreList from './components/genre-list';
import PopularThisSeason from './components/popular-this-season';
import UpcomingNextSeason from './components/upcoming-next-season';

export const AnimeHomeScreen = () => {
  useModuleLinking();

  return (
    <>
      <FocusAwareStatusBar />

      <ScrollView horizontal={false} nestedScrollEnabled>
        <BannerList />

        <View className="flex-1 space-y-4 p-4">
          <View className="w-full space-y-2">
            <Text variant="lg">Genres</Text>

            <GenreList />
          </View>

          <View className="w-full space-y-2">
            <Text variant="lg">Airing today</Text>

            <AiringTodayList />
          </View>

          <View className="w-full space-y-2">
            <Text variant="lg">Popular this season</Text>

            <PopularThisSeason />
          </View>

          <View className="w-full space-y-2">
            <Text variant="lg">Upcoming next season</Text>

            <UpcomingNextSeason />
          </View>
        </View>
      </ScrollView>
    </>
  );
};
