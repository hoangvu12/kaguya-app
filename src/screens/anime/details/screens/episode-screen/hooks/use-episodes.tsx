import { showMessage } from 'react-native-flash-message';
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

  return useWebViewData(
    ['episodes', media.id],
    async (webview) => {
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
        console.error(validation.error);

        showMessage({
          type: 'danger',
          message: `Cannot find episodes (${validation.error.flatten()})`,
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
    { enabled: !isAnimeIdLoading }
  );
};

export default useEpisodes;
