import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useAtomValue } from 'jotai/react';
import React, { useMemo } from 'react';

import useScreenSize from '@/hooks/use-screen-size';
import EpisodeCard from '@/screens/anime/components/episode-card';
import EpisodeDetails from '@/screens/anime/components/episode-details';
import { getWatchedEpisode } from '@/storage/episode';
import { Text, View } from '@/ui';

import { episodeChunkAtom, isAscendingAtom, layoutModeAtom } from '../store';

const PADDING = 16;
const SPACE_BETWEEN = 4;

const EpisodeLayoutContainer: React.FC<{
  mediaId: number;
  progress: number | undefined;
  duration: number | undefined;
}> = ({ mediaId, progress, duration }) => {
  const layoutMode = useAtomValue(layoutModeAtom);
  const episodes = useAtomValue(episodeChunkAtom);
  const isAscending = useAtomValue(isAscendingAtom);

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

  const sortedEpisodes = useMemo(() => {
    if (isAscending) {
      return episodes.sort((a, b) => Number(a.number) - Number(b.number));
    }

    return episodes.sort((a, b) => Number(b.number) - Number(a.number));
  }, [episodes, isAscending]);

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
        <FlashList
          data={episodes}
          estimatedItemSize={161}
          renderItem={({ item: episode }) => {
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
          }}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View className="my-3" />}
        />
      ) : null}

      {layoutMode === 'card' ? (
        <FlashList
          data={sortedEpisodes}
          numColumns={2}
          renderItem={({ item: episode, index }) => {
            const episodeNumber = parseInt(episode.number, 10);

            return (
              <View
                style={{
                  width: width / 2 - SPACE_BETWEEN - PADDING,
                  marginLeft: index % 2 !== 0 ? SPACE_BETWEEN : 0,
                }}
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
          }}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View
              style={{
                margin: SPACE_BETWEEN,
              }}
            />
          )}
          estimatedItemSize={130}
        />
      ) : null}
    </React.Fragment>
  );
};

export default EpisodeLayoutContainer;
