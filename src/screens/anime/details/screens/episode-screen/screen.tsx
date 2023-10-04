import React from 'react';

import episodes from '@/mock_data/episodes.json';
import type { Media } from '@/types/anilist';
import { View } from '@/ui';

import EpisodeContainer from './components/episode-container';
import ModuleSelector from './components/module-selector';

interface EpisodeScreenProps {
  media: Media;
}

const EpisodeScreen: React.FC<EpisodeScreenProps> = ({ media }) => {
  return (
    <View className="mb-16">
      <ModuleSelector />

      <View className="mt-4">
        <EpisodeContainer episodes={episodes} media={media} />
      </View>
    </View>
  );
};

export default EpisodeScreen;
