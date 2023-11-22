import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { ArrowLeft } from 'lucide-react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { twMerge } from 'tailwind-merge';

import { graphql } from '@/gql';
import { useGraphQL } from '@/hooks/use-graphql';
import DetailsCard from '@/screens/search/components/details-card';
import { ActivityIndicator, Button, groupBy, Text, View } from '@/ui';
import Pressable from '@/ui/core/pressable';
import colors from '@/ui/theme/colors';

dayjs.extend(duration);
dayjs.extend(localizedFormat);

const document = graphql(`
  query AiringScheduleScreen($airingAt_greater: Int, $airingAt_lesser: Int) {
    Page(page: 1, perPage: 50) {
      airingSchedules(
        airingAt_greater: $airingAt_greater
        airingAt_lesser: $airingAt_lesser
        sort: [TIME_DESC]
      ) {
        airingAt
        media {
          id
          isAdult
          ...DetailsCard
        }
      }
    }
  }
`);

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const tabBarStyle = {
  backgroundColor: colors.thunder[900],
  borderTopWidth: 0,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  height: 64,
};

const AiringScheduleScreen = () => {
  const today = useMemo(() => dayjs(), []);
  const flatListRef = React.useRef<FlatList<Dayjs>>(null);

  const [activeDay, setActiveDay] = useState<Dayjs>(today);

  const isFirstLoad = React.useRef(true);

  const navigation = useNavigation();

  const airingAt_greater = useMemo(
    () => activeDay.startOf('day').unix(),
    [activeDay]
  );
  const airingAt_lesser = useMemo(
    () => activeDay.endOf('day').unix(),
    [activeDay]
  );

  const days = useMemo(() => {
    const today = dayjs();

    const days: dayjs.Dayjs[] = [];

    for (let i = 0; i < 14; i++) {
      days.push(today.add(i, 'day'));
    }

    return days;
  }, []);

  const { data: schedules, isLoading } = useGraphQL(document, {
    airingAt_greater,
    airingAt_lesser,
  });

  const schedulesWithTime = useMemo(() => {
    if (!schedules?.Page?.airingSchedules?.length) return {};

    const airingSchedules = schedules.Page.airingSchedules.filter(Boolean);

    const schedulesWithTime = groupBy(airingSchedules, (schedule) => {
      return schedule.airingAt.toString();
    });

    return schedulesWithTime;
  }, [schedules]);

  const dayIndex = days.findIndex((day) => day.isSame(activeDay, 'date'));

  const handleMove = useCallback(async () => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;

      await new Promise((resolve) => setTimeout(resolve, 500));

      flatListRef.current?.scrollToIndex({
        index: dayIndex,
        animated: false,
        viewPosition: 0.55,
      });

      return;
    }

    flatListRef.current?.scrollToIndex({
      index: dayIndex,
      animated: true,
      viewPosition: 0.55,
    });
  }, [dayIndex]);

  useEffect(() => {
    handleMove();
  }, [handleMove]);

  useEffect(() => {
    const parent = navigation.getParent();

    parent?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });

    return () => {
      parent?.setOptions({
        tabBarStyle: tabBarStyle,
      });
    };
  }, [navigation]);

  return (
    <View className="flex-1 p-4">
      <View className="mb-4 flex flex-row items-center">
        <Button
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('AnimeHome');
            }
          }}
          className="mr-2 h-7 w-7 bg-transparent p-0"
        >
          <ArrowLeft size={28} color="white" />
        </Button>

        <Text className="text-2xl" weight="semibold">
          Airing schedule
        </Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={days}
        style={{ overflow: 'visible', flexGrow: 0 }}
        contentContainerStyle={{
          flexGrow: 0,
        }}
        initialScrollIndex={dayIndex}
        horizontal
        renderItem={({ item }) => {
          const day = item;

          return (
            <Pressable
              onPress={() => setActiveDay(day)}
              style={{
                aspectRatio: 2 / 1,
              }}
              className={twMerge(
                'w-40 rounded-md',
                day.isSame(activeDay, 'day')
                  ? 'bg-primary-500'
                  : 'bg-thunder-800'
              )}
            >
              <View
                className={twMerge(
                  'w-full h-full flex flex-col items-center justify-center rounded-md'
                )}
              >
                <Text className="text-sm font-medium text-gray-100">
                  {day.format('L')}
                </Text>
                <Text className="text-lg font-semibold">
                  {DAYS_OF_WEEK[day.day()]}
                </Text>
              </View>
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => <View className="w-4" />}
      />

      {isLoading ? (
        <ActivityIndicator
          size={48}
          color={colors.primary[500]}
          className="mt-16"
        />
      ) : (
        <View className="mt-4 flex-1">
          <FlashList
            estimatedItemSize={266}
            data={Object.entries(schedulesWithTime)}
            renderItem={({ item }) => {
              const [time, list] = item;

              const airingAt = Number(time);

              const day = dayjs.unix(airingAt);

              const isReleased = day.isBefore(dayjs());

              const nonAdultList = list.filter(
                (schedule) => !schedule.media?.isAdult
              );

              return (
                <View className="relative" key={time}>
                  <View className="my-2 ml-4 flex flex-row items-center">
                    <View
                      className={twMerge(
                        'absolute -left-4 h-1.5 w-1.5 rounded-full',
                        isReleased ? 'bg-primary-500' : 'bg-gray-600'
                      )}
                    />

                    <Text className="text-xl font-semibold text-gray-300">
                      {day.format('HH:mm')}
                    </Text>
                  </View>

                  <View className="relative">
                    <View className="ml-4 space-y-2">
                      {nonAdultList.map((schedule) => (
                        <View className="flex" key={schedule.media!.id}>
                          <DetailsCard media={schedule.media!} />
                        </View>
                      ))}
                    </View>

                    <View
                      className={twMerge(
                        'absolute translate-x-0.5 h-full w-0.5',
                        isReleased ? 'bg-primary-500' : 'bg-gray-600'
                      )}
                    />
                  </View>
                </View>
              );
            }}
            keyExtractor={(item) => item[0]}
            ListFooterComponentStyle={{
              paddingBottom: 64,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default AiringScheduleScreen;
