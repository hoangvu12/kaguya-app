import type { VariablesOf } from '@graphql-typed-document-node/core';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';

import { graphql } from '@/gql';
import { MediaListSort, MediaListStatus, MediaType } from '@/gql/graphql';
import useScreenSize from '@/hooks/use-screen-size';
import anilistClient from '@/services/anilist';
import { getWatchedEpisodes } from '@/storage/episode';
import { getProvider } from '@/storage/provider';
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

const authDocument = graphql(`
  query AuthWatchedList(
    $userId: Int
    $userName: String
    $status_in: [MediaListStatus]
    $type: MediaType
    $sort: [MediaListSort]
  ) {
    Page(page: 1, perPage: 10) {
      mediaList(
        userId: $userId
        userName: $userName
        status_in: $status_in
        type: $type
        sort: $sort
      ) {
        progress
        media {
          id
          ...WatchCard
        }
      }
    }
  }
`);

const SPACE_BETWEEN = 8;

const getMedia = async (variables: VariablesOf<typeof document>) => {
  return anilistClient.request(document, variables);
};

const getAuthMedia = async (variables: VariablesOf<typeof authDocument>) => {
  return anilistClient.request(authDocument, variables);
};

// What the fuck I just wrote?
const WatchedList = () => {
  const watchedEpisodes = useMemo(getWatchedEpisodes, []);

  const { data, isLoading } = useQuery(['watched-list'], async () => {
    const provider = getProvider('anilist');

    const shouldUseAnilistData = !!provider?.data?.id;

    if (!shouldUseAnilistData) {
      const mediaIds = watchedEpisodes.map(
        (watchedEpisode) => watchedEpisode.mediaId
      );

      const anilistMedia = await getMedia({
        id_in: mediaIds,
      });

      if (!anilistMedia?.Page?.media) return [];

      return watchedEpisodes
        .map((episode) => {
          const media = anilistMedia.Page!.media!.find(
            (media) => media?.id === episode.mediaId
          );

          if (!media) return null;

          return {
            media,
            watchedData: {
              number: episode.episode?.number,
              title: episode.episode?.title || undefined,
              thumbnail: episode.episode?.thumbnail || undefined,
            },
          };
        })
        .filter(Boolean);
    }

    const watchingList = await getAuthMedia({
      userId: provider.data.id as number,
      userName: provider.data.name,
      status_in: [MediaListStatus.Current],
      type: MediaType.Anime,
      sort: [MediaListSort.UpdatedTimeDesc],
    });

    if (!watchingList?.Page?.mediaList) return [];

    return watchingList.Page.mediaList
      .filter(Boolean)
      .map((entry) => {
        if (!entry.media) return null;

        const watchedEpisode = watchedEpisodes.find(
          (watchedEpisode) => watchedEpisode.mediaId === entry.media!.id
        );

        if (!watchedEpisode)
          return {
            media: entry.media,
            watchedData: {
              number: entry.progress || 0,
              title: undefined,
              thumbnail: undefined,
            },
          };

        if (
          parseInt(watchedEpisode.episode?.number!, 10) >= (entry.progress || 0)
        ) {
          return {
            media: entry.media,
            watchedData: {
              number: watchedEpisode.episode?.number,
              title: watchedEpisode.episode?.title || undefined,
              thumbnail: watchedEpisode.episode?.thumbnail || undefined,
            },
          };
        }

        return {
          media: entry.media,
          watchedData: {
            title: undefined,
            thumbnail: undefined,
            number: entry.progress || 0,
          },
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
