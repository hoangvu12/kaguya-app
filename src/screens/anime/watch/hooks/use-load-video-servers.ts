import Toast from 'react-native-toast-message';
import { z } from 'zod';

import { VideoServerSchema } from '@/core/video-server';
import useWebViewData from '@/hooks/use-webview-data';
import { showErrorMessage } from '@/utils';

const useLoadVideoServers = (
  episodeId: string,
  extraData?: Record<string, string>
) => {
  return useWebViewData(
    ['videoServers', episodeId],
    async (webview) => {
      if (!episodeId) {
        return [];
      }

      const nonValidatedServers = await webview.sendMessage(
        'anime.loadVideoServers',
        {
          episodeId,
          extraData,
        }
      );

      const validation = z
        .array(VideoServerSchema)
        .safeParse(nonValidatedServers);

      if (!validation.success) {
        showErrorMessage(
          `Couldn't load video servers (${validation.error.message})`
        );

        return [];
      }

      return validation.data;
    },
    {
      onError: (err: any) => {
        Toast.show({
          type: 'error',
          text1: 'Cannot load video servers',
          text2: err,
        });
      },
    }
  );
};

export default useLoadVideoServers;
