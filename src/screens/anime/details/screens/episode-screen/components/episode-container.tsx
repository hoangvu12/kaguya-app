import { useHydrateAtoms } from 'jotai/utils';
import React from 'react';

import type { Episode } from '@/types';
import type { Media } from '@/types/anilist';
import { View } from '@/ui';

import { mediaAtom } from '../store';
import EpisodeChunkSelector from './episode-chunk-selector';
import EpisodeLayoutContainer from './episode-layout-container';
import EpisodeLayoutSelector from './episode-layout-selector';
import EpisodeSectionSelector from './episode-section-selector';

interface EpisodeContainerProps {
  episodes: Episode[];
  media: Media;
}

const EpisodeContainer: React.FC<EpisodeContainerProps> = ({
  episodes,
  media,
}) => {
  useHydrateAtoms([[mediaAtom, media]]);

  return (
    <View>
      <EpisodeSectionSelector episodes={episodes} />
      <EpisodeLayoutSelector />
      <EpisodeChunkSelector />
      <EpisodeLayoutContainer />
    </View>
  );
};

export default EpisodeContainer;
