import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { ScrollView } from 'react-native';

import useModuleLinking from '@/hooks/use-module-linking';
import { Button, FocusAwareStatusBar, Text, View } from '@/ui';
import { BannerList } from '@/ui/banner-card';

import AiringTodayList from './components/airing-today-list';
import GenreList from './components/genre-list';
import PopularThisSeason from './components/popular-this-season';
import UpcomingNextSeason from './components/upcoming-next-season';
import WatchedList from './components/watched-list';

export const AnimeHomeScreen = () => {
  useModuleLinking();

  const navigation = useNavigation();

  return (
    <>
      <FocusAwareStatusBar />

      <ScrollView horizontal={false} nestedScrollEnabled>
        <BannerList />

        <View className="flex-1 space-y-4 p-4">
          <WatchedList />

          <View className="w-full space-y-2">
            <Text variant="lg">Genres</Text>

            <GenreList />
          </View>

          <View className="w-full space-y-2">
            <View className="flex flex-row items-center justify-between">
              <Text variant="lg">Airing today</Text>

              <Button
                onPress={() => {
                  navigation.navigate('AiringSchedule');
                }}
                className="bg-transparent p-0"
              >
                <Text className="text-gray-300" variant="sm">
                  See more
                </Text>
              </Button>
            </View>

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
