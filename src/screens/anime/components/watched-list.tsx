import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import React, { useMemo } from 'react';

import { graphql } from '@/gql';
import useScreenSize from '@/hooks/use-screen-size';
import { getWatchedEpisodes } from '@/storage/episode';
import { Text, View } from '@/ui';
import Skeleton, { SkeletonItem } from '@/ui/core/skeleton';

import WatchCard, { WATCH_CARD_WIDTH } from './watch-card';

const document = graphql(`
  query WatchedList($id_in: [Int]) {
    Page(page: 1, perPage: 10) {
      media(id_in: $id_in) {
        id
        ...WatchCard
      }
    }
  }
`);

const SPACE_BETWEEN = 8;

const WatchedList = () => {
  const watchedEpisodes = useMemo(getWatchedEpisodes, []);

  const { data, isLoading } = useQuery(['watched-list'], async () => {
    const mediaIds = watchedEpisodes.map((episode) => episode.mediaId);

    if (!mediaIds.length) return [];

    const data = await request('https://graphql.anilist.co', document, {
      id_in: mediaIds,
    });

    if (!data?.Page?.media) return [];

    return watchedEpisodes
      .map((episode) => {
        const media = data.Page!.media!.find(
          (media) => media?.id === episode.mediaId
        );

        if (!media) return null;

        return {
          media,
          episode,
        };
      })
      .filter(Boolean);
  });

  if (!watchedEpisodes.length) return null;

  return (
    <View className="w-full">
      <Text variant="lg" className="mb-1">
        Recently watched
      </Text>

      {isLoading ? (
        <WatchedListSkeleton />
      ) : data?.length ? (
        <FlashList
          estimatedItemSize={158}
          data={data}
          horizontal
          renderItem={({ item }) => (
            <WatchCard media={item.media} watchedData={item.episode} />
          )}
          keyExtractor={(item) =>
            item.media.id.toString() + '+' + item.episode.episode.id
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
