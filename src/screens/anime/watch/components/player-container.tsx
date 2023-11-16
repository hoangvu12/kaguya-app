import React from 'react';

import type { VideoServer } from '@/types';
import { ActivityIndicator, colors, View } from '@/ui';

import useLoadVideoContainer from '../hooks/use-load-video-container';
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

  return (
    <React.Fragment>
      {isLoading || isServerLoading ? (
        <View className="absolute z-10 flex h-full w-full items-center justify-center whitespace-pre-wrap">
          <ActivityIndicator size={48} color={colors.primary[500]} />
        </View>
      ) : null}

      <MediaOverlay />

      {container?.videos?.length && !isLoading ? (
        <MediaPlayer videos={container.videos} />
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
