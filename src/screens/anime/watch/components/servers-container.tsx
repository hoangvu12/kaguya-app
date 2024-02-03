import { useAtom, useSetAtom } from 'jotai/react';
import React, { useEffect } from 'react';

import type { Episode } from '@/types';

import useLoadVideoServers from '../hooks/use-load-video-servers';
import { currentServerAtom, serversAtom } from '../store';
import ErrorMessage from './error-message';
import PlayerContainer from './player-container';

interface ServersContainerProps {
  currentEpisode: Episode;
}

const ServersContainer: React.FC<ServersContainerProps> = ({
  currentEpisode,
}) => {
  const setServers = useSetAtom(serversAtom);
  const [currentServer, setCurrentServer] = useAtom(currentServerAtom);

  const {
    data: videoServers,
    isLoading: videoServersLoading,
    refetch,
  } = useLoadVideoServers(currentEpisode.id, currentEpisode.extra || undefined);

  useEffect(() => {
    if (!videoServers?.length) {
      setCurrentServer(undefined);

      return;
    }

    setServers(videoServers);

    setCurrentServer(videoServers[0]);
  }, [setCurrentServer, setServers, videoServers, videoServersLoading]);

  if (!videoServers?.length && !videoServersLoading)
    return (
      <ErrorMessage
        onRetry={refetch}
        message="Cannot find video servers. Please try again"
      />
    );

  return (
    <PlayerContainer
      isServerLoading={videoServersLoading}
      videoServer={currentServer}
    />
  );
};

export default ServersContainer;
