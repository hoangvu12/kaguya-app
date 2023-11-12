import { useAtomValue } from 'jotai/react';
import React from 'react';

import EpisodeCard from '@/screens/anime/components/episode-card';
import EpisodeDetails from '@/screens/anime/components/episode-details';
import { Text, View, WIDTH } from '@/ui';

import { episodeChunkAtom, layoutModeAtom } from '../store';

const PADDING = 16;
const SPACE_BETWEEN = 4;

const EpisodeLayoutContainer = () => {
  const layoutMode = useAtomValue(layoutModeAtom);
  const episodes = useAtomValue(episodeChunkAtom);

  return (
    <React.Fragment>
      {!episodes?.length && (
        <Text className="text-center">
          There are no episodes available for this anime.
        </Text>
      )}

      {layoutMode === 'details' && (
        <View className="space-y-4">
          {episodes.map((episode) => (
            <EpisodeDetails key={episode.id} episode={episode} />
          ))}
        </View>
      )}

      {layoutMode === 'card' && (
        <View className="flex flex-row flex-wrap justify-between">
          {episodes.map((episode, index) => (
            <View
              style={{
                width: WIDTH / 2 - PADDING - SPACE_BETWEEN,
                marginBottom:
                  index < episodes.length - 2 ? SPACE_BETWEEN * 2 : 0,
              }}
              key={episode.id}
            >
              <EpisodeCard episode={episode} />
            </View>
          ))}
        </View>
      )}
    </React.Fragment>
  );
};

export default EpisodeLayoutContainer;
