import { useNavigation } from '@react-navigation/native';
import { useAtomValue } from 'jotai/react';
import React from 'react';

import useScreenSize from '@/hooks/use-screen-size';
import EpisodeCard from '@/screens/anime/components/episode-card';
import EpisodeDetails from '@/screens/anime/components/episode-details';
import { Text, View } from '@/ui';

import { episodeChunkAtom, layoutModeAtom } from '../store';

const PADDING = 16;
const SPACE_BETWEEN = 4;

const EpisodeLayoutContainer: React.FC<{
  mediaId: number;
  progress: number | undefined;
}> = ({ mediaId, progress }) => {
  const layoutMode = useAtomValue(layoutModeAtom);
  const episodes = useAtomValue(episodeChunkAtom);
  const { width } = useScreenSize();

  const navigation = useNavigation();

  const handleNavigate = (episodeId: string) => {
    navigation.navigate('AnimeWatch', {
      episodeId,
      mediaId,
    });
  };

  const progressEpisode = episodes.find(
    (ep) => parseInt(ep.number, 10) === progress
  );

  return (
    <React.Fragment>
      {progressEpisode ? (
        <React.Fragment>
          <View>
            <Text className="mb-1">Continue watching:</Text>

            <EpisodeDetails
              onPress={() => {
                handleNavigate(progressEpisode.id);
              }}
              episode={progressEpisode}
            />
          </View>

          <View className="my-4 h-0.5 w-full bg-thunder-700" />
        </React.Fragment>
      ) : null}

      {layoutMode === 'details' ? (
        <View className="space-y-4">
          {episodes.map((episode) => (
            <EpisodeDetails
              onPress={() => {
                handleNavigate(episode.id);
              }}
              key={episode.id}
              episode={episode}
            />
          ))}
        </View>
      ) : null}

      {layoutMode === 'card' ? (
        <View className="flex flex-row flex-wrap justify-between">
          {episodes.map((episode, index) => (
            <View
              style={{
                width: width / 2 - PADDING - SPACE_BETWEEN,
                marginBottom:
                  index < episodes.length - 2 ? SPACE_BETWEEN * 2 : 0,
              }}
              key={episode.id}
            >
              <EpisodeCard
                onPress={() => {
                  handleNavigate(episode.id);
                }}
                episode={episode}
              />
            </View>
          ))}
        </View>
      ) : null}
    </React.Fragment>
  );
};

export default EpisodeLayoutContainer;
