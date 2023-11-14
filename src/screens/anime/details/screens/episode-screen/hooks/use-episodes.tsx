import Toast from 'react-native-toast-message';
import { z } from 'zod';

import { EpisodeSchema } from '@/core/episode';
import { type FragmentType, graphql, useFragment } from '@/gql';
import useWebViewData from '@/hooks/use-webview-data';
import { getContentMetadata } from '@/metadata/anify';

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
      console.log('use-episodes-anime-id', data?.data);

      if (!data?.data) {
        return [];
      }

      const nonValidatedEpisodes = await webview.sendMessage<Episode[]>(
        'anime.getEpisodes',
        {
          animeId: data?.data,
          extraData: data?.extraData,
        }
      );

      const validation = z.array(EpisodeSchema).safeParse(nonValidatedEpisodes);

      if (!validation.success) {
        console.log("Couldn't load video servers", validation.error);

        Toast.show({
          type: 'error',
          text1: 'Cannot find episodes',
          text2: validation.error.message,
        });

        return [];
      }

      const sourceEpisodes = validation.data;

      const metadataEpisodes = await getContentMetadata(media.id);

      const episodes = sourceEpisodes.map((sourceEpisode) => {
        const metadataEpisode = metadataEpisodes.find(
          (metadataEpisode) =>
            metadataEpisode.number === parseInt(sourceEpisode.number, 10)
        );

        return {
          ...sourceEpisode,
          thumbnail:
            sourceEpisode.thumbnail ||
            metadataEpisode?.img ||
            media.bannerImage ||
            media.coverImage?.large ||
            undefined,
          title: sourceEpisode.title || metadataEpisode?.title,
          description:
            sourceEpisode.description || metadataEpisode?.description,
          isFiller: sourceEpisode.isFiller || metadataEpisode?.isFiller,
        };
      });

      return episodes;
    },

    {
      onError: (error) => {
        console.log('useEpisodes', error);
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
