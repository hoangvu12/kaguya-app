import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React, { useMemo } from 'react';

import useScreenSize from '@/hooks/use-screen-size';
import { useWatched } from '@/hooks/use-watched';
import { getWatchedEpisodes } from '@/storage/episode';
import { Button, Text, View } from '@/ui';
import Skeleton, { SkeletonItem } from '@/ui/core/skeleton';

import WatchCard, { WATCH_CARD_WIDTH } from './watch-card';

const SPACE_BETWEEN = 8;

const WatchedList = () => {
  const watchedEpisodes = useMemo(getWatchedEpisodes, []);

  const { data, isLoading } = useWatched(15);

  const navigation = useNavigation();

  if (!watchedEpisodes.length) return null;

  return (
    <View className="w-full">
      <View className="flex flex-row items-center justify-between">
        <Text variant="lg" className="mb-1">
          Recently watched
        </Text>

        <Button
          onPress={() => {
            navigation.navigate('RecentlyWatched');
          }}
          className="bg-transparent p-0"
        >
          <Text className="text-gray-300" variant="sm">
            See more
          </Text>
        </Button>
      </View>

      {isLoading ? (
        <WatchedListSkeleton />
      ) : data?.length ? (
        <FlashList
          estimatedItemSize={168}
          data={data}
          horizontal
          renderItem={({ item }) => (
            <WatchCard media={item.media} watchedData={item.watchedData} />
          )}
          keyExtractor={(item) =>
            item.media.id.toString() + '+' + item.watchedData.number
          }
          ItemSeparatorComponent={() => <View className="w-2" />}
        />
      ) : (
        <Text className="text-center">You haven't watched anything yet?</Text>
      )}
    </View>
  );
};

export function WatchedListSkeleton() {
  const { width } = useScreenSize();
  const numberOfItems = Math.floor(width / (WATCH_CARD_WIDTH - SPACE_BETWEEN));
  const skeletonItems = Array.from({ length: numberOfItems }).map((_, i) => i);

  return (
    <Skeleton className="flex flex-row items-center">
      {skeletonItems.map((_, i) => (
        <SkeletonItem
          key={i}
          style={{
            aspectRatio: 16 / 9,
            width: WATCH_CARD_WIDTH,
            marginLeft: i !== 0 ? SPACE_BETWEEN : 0,
          }}
        />
      ))}
    </Skeleton>
  );
}

export default WatchedList;
