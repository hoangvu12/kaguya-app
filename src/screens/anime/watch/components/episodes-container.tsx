import { useSetAtom } from 'jotai/react';
import React, { useEffect, useMemo } from 'react';

import type { Episode } from '@/types';

import { currentEpisodeAtom, episodesAtom } from '../store';
import ServersContainer from './servers-container';

interface EpisodesContainerProps {
  episodes: Episode[];
  currentEpisodeId: string;
}

const EpisodesContainer: React.FC<EpisodesContainerProps> = ({
  currentEpisodeId,
  episodes,
}) => {
  const setEpisodes = useSetAtom(episodesAtom);
  const setCurrentEpisode = useSetAtom(currentEpisodeAtom);

  const episode = useMemo(() => {
    const episode = episodes.find((episode) => episode.id === currentEpisodeId);

    return episode || episodes[0];
  }, [currentEpisodeId, episodes]);

  useEffect(() => {
    setEpisodes(episodes);

    setCurrentEpisode(episode);
  }, [episode, episodes, setCurrentEpisode, setEpisodes]);

  return <ServersContainer currentEpisode={episode} />;
};

export default EpisodesContainer;
