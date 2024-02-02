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
  mediaFragment: FragmentType<typeof useAnimeEpisodeFragment>
) => {
  const media = useFragment(useAnimeEpisodeFragment, mediaFragment);

  const { data, isLoading: isAnimeIdLoading } = useAnimeId(media);

  const queryKey = ['episodes', media.id];

  if (data?.data) {
    queryKey.push(data.data);
  }

  const episodes = useWebViewData(
    queryKey,
    async (webview) => {
      if (!data?.data) {
        return [];
      }

      const nonValidatedEpisodesPromise = webview.sendMessage<Episode[]>(
        'anime.getEpisodes',
        {
          animeId: data?.data,
          extraData: data?.extraData,
        }
      );

      const metadataEpisodesPromise = getEpisodeInfo(media);

      const [nonValidatedEpisodesResult, metadataEpisodesResult] =
        await Promise.allSettled([
          nonValidatedEpisodesPromise,
          metadataEpisodesPromise,
        ]);

      if (nonValidatedEpisodesResult.status === 'rejected') {
        return [];
      }

      const validation = z
        .array(EpisodeSchema)
        .safeParse(nonValidatedEpisodesResult.value);

      if (!validation.success) {
        Toast.show({
          type: 'error',
          text1: 'Cannot find episodes',
          text2: validation.error.message,
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

      console.log('episodes', episodes);

      return episodes;
    },

    {
      onError: (err: any) => {
        Toast.show({
          type: 'error',
          text1: 'Cannot find episodes',
          text2: err,
        });
      },
      enabled: !isAnimeIdLoading,
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
