import React from 'react';

import type { FragmentType } from '@/gql';
import { View } from '@/ui';

import EpisodeContainer from './components/episode-container';
import ModuleSelector from './components/module-selector';
import type { useAnimeEpisodeFragment } from './hooks/use-episodes';

interface EpisodeScreenProps {
  media: FragmentType<typeof useAnimeEpisodeFragment>;
}

const EpisodeScreen: React.FC<EpisodeScreenProps> = ({ media }) => {
  return (
    <View className="mb-16">
      <ModuleSelector />

      <View className="mt-4">
        <EpisodeContainer media={media} />
      </View>
    </View>
  );
};

export default React.memo(EpisodeScreen);
