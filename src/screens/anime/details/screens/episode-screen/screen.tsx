import React from 'react';

import type { FragmentType } from '@/gql';
import { View } from '@/ui';

import type { EpisodeContainerFragment } from './components/episode-container';
import EpisodeContainer from './components/episode-container';
import ModuleSelector from './components/module-selector';

interface EpisodeScreenProps {
  media: FragmentType<typeof EpisodeContainerFragment>;
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
