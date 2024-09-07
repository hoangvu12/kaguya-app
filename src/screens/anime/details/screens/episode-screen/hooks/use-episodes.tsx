import Toast from 'react-native-toast-message';
import { z } from 'zod';

import { EpisodeSchema } from '@/core/episode';
import { type FragmentType, graphql, useFragment } from '@/gql';
import useWebViewData from '@/hooks/use-webview-data';
import { getEpisodeInfo } from '@/metadata/tmdb';

import useAnimeId from './use-anime-id';

type Episode = z.infer<typeof EpisodeSchema>;

export const useAnimeEpisodeFragment = graphql(`
  fragment UseAnimeEpisode on Media {
    ...UseAnimeId
    id
    bannerImage
    coverImage {
      large
      extraLarge
    }
    startDate {
      year
      month
      day
    }
    episodes
    format
    title {
      english
      userPreferred
    }
  }
`);

const useEpisodes = (
  mediaFragment: FragmentType<typeof useAnimeEpisodeFragment>,
  onStatusChange?: (change: { isError: boolean; status: string }) => void
) => {
  const media = useFragment(useAnimeEpisodeFragment, mediaFragment);

  const { data: animeId, isLoading: isAnimeIdLoading } = useAnimeId(media);

  const queryKey = ['episodes', media.id];

  if (animeId?.data) {
    queryKey.push(animeId.data);
  }

  const episodes = useWebViewData(
    queryKey,
    async (webview) => {
      onStatusChange?.({ isError: false, status: 'Loading anime id' });

      if (!animeId?.data) {
        if (isAnimeIdLoading) {
          onStatusChange?.({ isError: false, status: 'Loading anime id' });
        } else {
          onStatusChange?.({ isError: true, status: 'Cannot find anime id' });
        }

        return [];
      }

      const nonValidatedEpisodesPromise = webview.sendMessage<Episode[]>(
        'anime.getEpisodes',
        {
          animeId: animeId?.data,
          extraData: animeId?.extraData,
        }
      );

      onStatusChange?.({
        isError: false,
        status: 'Loading episodes',
      });

      const metadataEpisodesPromise = getEpisodeInfo(media);

      const [nonValidatedEpisodesResult, metadataEpisodesResult] =
        await Promise.allSettled([
          nonValidatedEpisodesPromise,
          metadataEpisodesPromise,
        ]);

      if (nonValidatedEpisodesResult.status === 'rejected') {
        onStatusChange?.({
          isError: true,
          status: 'Cannot find episodes',
        });

        return [];
      }

      const validation = z
        .array(EpisodeSchema)
        .safeParse(nonValidatedEpisodesResult.value);

      if (!validation.success) {
        onStatusChange?.({
          isError: true,
          status: 'Cannot find episodes',
        });

        return [];
      }

      const metadataEpisodes =
        metadataEpisodesResult.status === 'fulfilled'
          ? metadataEpisodesResult.value
          : [];
      const sourceEpisodes = validation.data;

      const episodes = sourceEpisodes.map((sourceEpisode) => {
        const metadataEpisode = !metadataEpisodes?.length
          ? null
          : metadataEpisodes.find(
              (metadataEpisode) =>
                metadataEpisode.episodeNumber ===
                parseInt(sourceEpisode.number, 10)
            );

        return {
          ...sourceEpisode,
          thumbnail:
            sourceEpisode.thumbnail ||
            metadataEpisode?.image ||
            media.bannerImage ||
            media.coverImage?.large ||
            undefined,
          title: sourceEpisode.title || metadataEpisode?.title,
          description:
            sourceEpisode.description || metadataEpisode?.description,
          isFiller: sourceEpisode.isFiller,
        };
      });

      return episodes.sort((episodeA, episodeB) => {
        return parseInt(episodeB.number, 10) - parseInt(episodeA.number, 10);
      });
    },

    {
      onError: (err: any) => {
        Toast.show({
          type: 'error',
          text1: 'Cannot find episodes',
          text2: err,
        });
      },
      retry: 0,

      // For some reason, when calling useEpisodes in watch screen, it will return empty episodes
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  return {
    ...episodes,
    isLoading: isAnimeIdLoading || episodes.isLoading,
  };
};

export default useEpisodes;
