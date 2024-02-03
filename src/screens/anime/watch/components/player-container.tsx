import { useAtom, useAtomValue, useSetAtom } from 'jotai/react';
import React, { useEffect } from 'react';
import Modal from 'react-native-modal';

import { shouldAskForSyncingAtom } from '@/screens/settings/store';
import type { VideoServer } from '@/types';
import { ActivityIndicator, Button, colors, Text, View } from '@/ui';

import useLoadVideoContainer from '../hooks/use-load-video-container';
import {
  mediaIdAtom,
  shouldNotSyncListAtom,
  shouldSyncListAtom,
  timestampsAtom,
} from '../store';
import MediaOverlay from './media-overlay';
import MediaPlayer from './media-player';
import MediaSubtitle from './media-subtitle';

interface PlayerContainerProps {
  videoServer?: VideoServer;
  isServerLoading?: boolean;
}

const PlayerContainer: React.FC<PlayerContainerProps> = ({
  videoServer,
  isServerLoading,
}) => {
  const { data: container, isLoading } = useLoadVideoContainer(videoServer);
  const [shouldSyncList, setShouldSyncList] = useAtom(shouldSyncListAtom);
  const [shouldNotSyncList, setShouldNotSyncList] = useAtom(
    shouldNotSyncListAtom
  );

  const mediaId = useAtomValue(mediaIdAtom);
  const [shouldAskForSyncing, setShouldAskForSyncing] = React.useState(() => {
    return (
      !shouldSyncList.includes(mediaId.anilistId) &&
      !shouldNotSyncList.includes(mediaId.anilistId)
    );
  });

  const shouldAskForSyncingSetting = useAtomValue(shouldAskForSyncingAtom);

  const setTimestamps = useSetAtom(timestampsAtom);

  useEffect(() => {
    if (!container?.timestamps?.length) {
      setTimestamps([]);

      return;
    }

    setTimestamps(container.timestamps);
  }, [container, setTimestamps]);

  useEffect(() => {
    const shouldAsk =
      !shouldSyncList.includes(mediaId.anilistId) &&
      !shouldNotSyncList.includes(mediaId.anilistId);

    setShouldAskForSyncing(shouldAsk);
  }, [mediaId.anilistId, shouldNotSyncList, shouldSyncList]);

  if (shouldAskForSyncing && shouldAskForSyncingSetting) {
    return (
      <Modal isVisible={true}>
        <View className="absolute inset-0 flex items-center justify-center">
          <View className="w-96 rounded-md bg-thunder-800 p-4">
            <Text weight="semibold" variant="xl" className="mb-8 text-center">
              Do you want to sync your progress?
            </Text>

            <View className="flex flex-row items-center justify-end gap-2">
              <Button
                variant="primary"
                className="flex-1"
                onPress={async () => {
                  setShouldSyncList((prev) => [...prev, mediaId.anilistId]);
                  setShouldAskForSyncing(false);
                }}
              >
                <Text numberOfLines={1} weight="semibold">
                  Yes
                </Text>
              </Button>
              <Button
                className="flex-1 bg-gray-500"
                onPress={() => {
                  setShouldNotSyncList((prev) => [...prev, mediaId.anilistId]);
                  setShouldAskForSyncing(false);
                }}
              >
                <Text numberOfLines={1}>No</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <React.Fragment>
      {isLoading || isServerLoading ? (
        <View className="absolute z-10 flex h-full w-full items-center justify-center whitespace-pre-wrap">
          <ActivityIndicator size={48} color={colors.primary[500]} />

          <Text className="mt-2 text-center font-semibold text-gray-300">
            {isLoading ? 'Loading video...' : 'Loading server...'}
          </Text>
        </View>
      ) : null}

      <MediaOverlay />

      {container?.videos?.length && !isLoading ? (
        <MediaPlayer
          shouldSync={
            shouldAskForSyncingSetting
              ? shouldSyncList.includes(mediaId.anilistId)
              : true
          }
          videos={container.videos}
        />
      ) : null}

      {container?.subtitles?.length ? (
        <MediaSubtitle
          fonts={container.fonts?.map((font) => font.file.url) || []}
          subtitles={container.subtitles}
        />
      ) : null}
    </React.Fragment>
  );
};

export default PlayerContainer;
