import React from 'react';

import type { VideoContainer } from '@/types';

import MediaOverlay from './media-overlay';
import MediaPlayer from './media-player';
import MediaSubtitle from './media-subtitle';

interface MediaContainerProps {
  container: VideoContainer;
}

const MediaContainer: React.FC<MediaContainerProps> = ({ container }) => {
  return (
    <React.Fragment>
      <MediaOverlay />

      <MediaPlayer videos={container.videos} />

      {container.subtitles?.length && (
        <MediaSubtitle subtitles={container.subtitles} />
      )}
    </React.Fragment>
  );
};

export default MediaContainer;
