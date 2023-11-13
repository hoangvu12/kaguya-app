import { z } from 'zod';

import type { FragmentType } from '@/gql';
import { graphql, useFragment } from '@/gql';
import useWebViewData from '@/hooks/use-webview-data';

const AnimeIdSchema = z.object({
  data: z.string(),
  extraData: z.record(z.string()).optional(),
});

export const useAnimeIdFragment = graphql(`
  fragment UseAnimeId on Media {
    id
    title {
      english
      native
      romaji
      userPreferred
    }
  }
`);

const useAnimeId = (mediaFragment: FragmentType<typeof useAnimeIdFragment>) => {
  const media = useFragment(useAnimeIdFragment, mediaFragment);

  return useWebViewData(
    ['animeId', media.id],
    async (webview) => {
      const rawAnimeId = await webview.sendMessage<{
        data: string;
        extraData: Record<string, string>;
      }>('anime.getId', {
        media,
      });

      const validation = AnimeIdSchema.safeParse(rawAnimeId);

      if (!validation.success) {
        console.warn(validation.error, rawAnimeId);

        return null;
      }

      return validation.data;
    },
    { retry: 0 }
  );
};

export default useAnimeId;
