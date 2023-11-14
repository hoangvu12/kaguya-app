import { useAtomValue } from 'jotai/react';

import { VideoContainerSchema } from '@/core/video-container';
import useWebViewData from '@/hooks/use-webview-data';
import type { VideoServer } from '@/types';
import { showErrorMessage } from '@/utils';

import { currentEpisodeAtom } from '../store';

const useLoadVideoContainer = (server?: VideoServer) => {
  const currentEpisode = useAtomValue(currentEpisodeAtom);

  return useWebViewData(
    ['videoContainer', currentEpisode?.id, server?.name],
    async (webview) => {
      if (!server?.name) {
        return {
          videos: [],
        };
      }

      const nonValidatedContainer = await webview.sendMessage(
        'anime.loadVideoContainer',
        server
      );

      const validation = VideoContainerSchema.safeParse(nonValidatedContainer);

      if (!validation.success) {
        showErrorMessage(
          `Couldn't load video container (${validation.error.message})`
        );

        return {
          videos: [],
        };
      }

      return validation.data;
    },
    {
      enabled: !!currentEpisode?.id,
    }
  );
};

export default useLoadVideoContainer;
