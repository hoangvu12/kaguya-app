import type { VariablesOf } from '@graphql-typed-document-node/core';
import { useQuery } from '@tanstack/react-query';

import { graphql } from '@/gql';
import { MediaListSort, MediaListStatus, MediaType } from '@/gql/graphql';
import anilistClient from '@/services/anilist';
import { getWatchedEpisodes } from '@/storage/episode';
import { getProvider } from '@/storage/provider';

const document = graphql(`
  query WatchedList($id_in: [Int], $perPage: Int = 10, $page: Int = 1) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }

      media(id_in: $id_in) {
        id
        ...WatchCard
        ...CardMedia
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
    $perPage: Int = 10
    $page: Int = 1
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }

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
          ...CardMedia
        }
      }
    }
  }
`);

const getMedia = async (variables: VariablesOf<typeof document>) => {
  return anilistClient.request(document, variables);
};

const getAuthMedia = async (variables: VariablesOf<typeof authDocument>) => {
  return anilistClient.request(authDocument, variables);
};

export const useWatched = (limit = 15) => {
  return useQuery(['watched-list', limit], async () => {
    const provider = getProvider('anilist');

    const watchedEpisodes = getWatchedEpisodes(limit);

    const shouldUseAnilistData = !!provider?.data?.id;

    if (!shouldUseAnilistData) {
      const mediaIds = watchedEpisodes.map(
        (watchedEpisode) => watchedEpisode.mediaId
      );

      const anilistMedia = await getMedia({
        id_in: mediaIds,
        perPage: limit || 500,
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
      perPage: limit || 500,
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
};
