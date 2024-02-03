import { useAtomValue, useSetAtom } from 'jotai/react';
import { RotateCwIcon } from 'lucide-react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { Else, If, Then } from 'react-if';

import { type FragmentType, graphql, useFragment } from '@/gql';
import { getWatchedEpisode } from '@/storage/episode';
import { currentModuleIdAtom } from '@/store';
import { ActivityIndicator, colors, Text, View } from '@/ui';
import Pressable from '@/ui/core/pressable';

import useEpisodes from '../hooks/use-episodes';
import { episodeChunkAtom, sectionEpisodesAtom } from '../store';
import EpisodeChunkSelector from './episode-chunk-selector';
import EpisodeLayoutContainer from './episode-layout-container';
import EpisodeLayoutSelector from './episode-layout-selector';
import EpisodeSectionSelector from './episode-section-selector';
import WrongTitle from './wrong-title';

export const EpisodeContainerFragment = graphql(`
  fragment EpisodeContainer on Media {
    id
    mediaListEntry {
      progress
    }
    duration
    ...WrongTitle
    ...UseAnimeEpisode
  }
`);

interface EpisodeContainerProps {
  media: FragmentType<typeof EpisodeContainerFragment>;
}

const EpisodeContainer: React.FC<EpisodeContainerProps> = ({
  media: mediaFragment,
}) => {
  const media = useFragment(EpisodeContainerFragment, mediaFragment);
  const currentModuleId = useAtomValue(currentModuleIdAtom);
  const [episodeFetchingStatus, setEpisodeFetchingStatus] = useState<{
    isError: boolean;
    status: string;
  }>({ isError: false, status: '' });

  const { data, isLoading, isRefetching, refetch } = useEpisodes(
    media,
    setEpisodeFetchingStatus
  );
  const setSectionEpisodes = useSetAtom(sectionEpisodesAtom);
  const setEpisodeChunk = useSetAtom(episodeChunkAtom);

  const watchedEp = getWatchedEpisode(media.id);

  useEffect(() => {
    // Reset episodes when loading
    if (isLoading) {
      setSectionEpisodes([]);
      setEpisodeChunk([]);
    }
  }, [isLoading, setEpisodeChunk, setSectionEpisodes]);

  const progress = useMemo(() => {
    const hasAniListProgress =
      media.mediaListEntry?.progress !== null &&
      media.mediaListEntry?.progress !== undefined;
    const hasLocalProgress = watchedEp !== null && watchedEp !== undefined;

    if (!hasAniListProgress && !hasLocalProgress) {
      return undefined;
    }

    if (!hasAniListProgress) {
      const number = parseInt(watchedEp?.episode.number ?? '0', 10);

      return isNaN(number) ? undefined : number;
    }

    if (!hasLocalProgress) {
      return media.mediaListEntry?.progress! + 1;
    }

    const localProgress = parseInt(watchedEp?.episode.number ?? '0', 10);

    // +1 because we want to start from the next episode
    const anilistProgress = media.mediaListEntry?.progress! + 1;

    return Math.max(localProgress!, anilistProgress);
  }, [media.mediaListEntry?.progress, watchedEp]);

  return (
    <View>
      <View className="flex flex-row justify-end space-x-2">
        <View>
          <WrongTitle media={media} />
        </View>

        <View>
          <EpisodeLayoutSelector />
        </View>

        <Pressable
          onPress={() => {
            refetch();
          }}
        >
          <RotateCwIcon size={24} color="white" />
        </Pressable>
      </View>

      {currentModuleId ? (
        <If condition={isLoading || isRefetching}>
          <Then>
            <View className="mt-8">
              <ActivityIndicator color={colors.primary[500]} size={48} />

              {!episodeFetchingStatus.isError && (
                <Text className="mt-2 text-center font-semibold text-gray-300">
                  {episodeFetchingStatus.status}
                </Text>
              )}
            </View>
          </Then>

          <Else>
            <If condition={!data?.length}>
              <Then>
                {episodeFetchingStatus.isError && (
                  <Text className="text-center">
                    {episodeFetchingStatus.status}
                  </Text>
                )}
              </Then>

              <Else>
                <EpisodeSectionSelector episodes={data!} />
                <EpisodeChunkSelector />
                <EpisodeLayoutContainer
                  duration={media.duration || undefined}
                  mediaId={media.id}
                  progress={progress}
                />
              </Else>
            </If>
          </Else>
        </If>
      ) : null}
    </View>
  );
};

export default EpisodeContainer;
