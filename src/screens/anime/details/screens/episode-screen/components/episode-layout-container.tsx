import { useNavigation } from '@react-navigation/native';
import { useAtomValue } from 'jotai/react';
import React, { useMemo } from 'react';

import useScreenSize from '@/hooks/use-screen-size';
import EpisodeCard from '@/screens/anime/components/episode-card';
import EpisodeDetails from '@/screens/anime/components/episode-details';
import { getWatchedEpisode } from '@/storage/episode';
import { Text, View } from '@/ui';

import { episodeChunkAtom, layoutModeAtom } from '../store';

const PADDING = 16;
const SPACE_BETWEEN = 4;

const EpisodeLayoutContainer: React.FC<{
  mediaId: number;
  progress: number | undefined;
  duration: number | undefined;
}> = ({ mediaId, progress, duration }) => {
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

  const watchedEp = useMemo(() => {
    return getWatchedEpisode(mediaId);
  }, [mediaId]);

  const progressEpisode = episodes.find(
    (ep) => parseInt(ep.number, 10) === progress
  );

  const progressPercentage = useMemo(() => {
    if (parseInt(watchedEp?.episode.number ?? '0', 10) !== progress)
      return undefined;

    if (!watchedEp?.time || !duration) return undefined;

    const durationInSeconds = duration * 60;

    return watchedEp.time / durationInSeconds;
  }, [duration, progress, watchedEp?.episode?.number, watchedEp?.time]);

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
              progressPercentage={progressPercentage}
            />
          </View>

          <View className="my-4 h-0.5 w-full bg-thunder-700" />
        </React.Fragment>
      ) : null}

      {layoutMode === 'details' ? (
        <View className="space-y-4">
          {episodes.map((episode) => {
            const episodeNumber = parseInt(episode.number, 10);

            return (
              <EpisodeDetails
                onPress={() => {
                  handleNavigate(episode.id);
                }}
                key={episode.id}
                episode={episode}
                progressPercentage={
                  episodeNumber === progress
                    ? progressPercentage
                    : episodeNumber < (progress || 0)
                    ? 1
                    : undefined
                }
              />
            );
          })}
        </View>
      ) : null}

      {layoutMode === 'card' ? (
        <View className="flex flex-row flex-wrap justify-between">
          {episodes.map((episode, index) => {
            const episodeNumber = parseInt(episode.number, 10);

            return (
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
                  progressPercentage={
                    episodeNumber === progress
                      ? progressPercentage
                      : episodeNumber < (progress || 0)
                      ? 1
                      : undefined
                  }
                />
              </View>
            );
          })}
        </View>
      ) : null}
    </React.Fragment>
  );
};

export default EpisodeLayoutContainer;
