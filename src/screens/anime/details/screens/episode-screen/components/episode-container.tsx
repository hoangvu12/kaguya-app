import { useSetAtom } from 'jotai/react';
import React, { useEffect } from 'react';

import type { FragmentType } from '@/gql';
import { ActivityIndicator, colors, View } from '@/ui';

import type { useAnimeEpisodeFragment } from '../hooks/use-episodes';
import useEpisodes from '../hooks/use-episodes';
import { episodeChunkAtom, sectionEpisodesAtom } from '../store';
import EpisodeChunkSelector from './episode-chunk-selector';
import EpisodeLayoutContainer from './episode-layout-container';
import EpisodeLayoutSelector from './episode-layout-selector';
import EpisodeSectionSelector from './episode-section-selector';

interface EpisodeContainerProps {
  media: FragmentType<typeof useAnimeEpisodeFragment>;
}

const EpisodeContainer: React.FC<EpisodeContainerProps> = ({
  media: mediaFragment,
}) => {
  const { data, isLoading } = useEpisodes(mediaFragment);
  const setSectionEpisodes = useSetAtom(sectionEpisodesAtom);
  const setEpisodeChunk = useSetAtom(episodeChunkAtom);

  useEffect(() => {
    // Reset episodes when loading
    if (isLoading) {
      setSectionEpisodes([]);
      setEpisodeChunk([]);
    }
  }, [isLoading, setEpisodeChunk, setSectionEpisodes]);

  if (isLoading || !data) {
    return (
      <View className="mt-8">
        <ActivityIndicator color={colors.primary[500]} size={48} />
      </View>
    );
  }

  return (
    <View>
      <EpisodeSectionSelector episodes={data} />
      <EpisodeLayoutSelector />
      <EpisodeChunkSelector />
      <EpisodeLayoutContainer />
    </View>
  );
};

export default EpisodeContainer;
