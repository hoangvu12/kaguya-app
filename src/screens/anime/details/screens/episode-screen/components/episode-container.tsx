import { useAtomValue, useSetAtom } from 'jotai/react';
import React, { useEffect, useMemo } from 'react';
import { Else, If, Then } from 'react-if';

import { type FragmentType, graphql, useFragment } from '@/gql';
import { getWatchedEpisode } from '@/storage/episode';
import { currentModuleIdAtom } from '@/store';
import { ActivityIndicator, colors, Text, View } from '@/ui';

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

  const { data, isLoading } = useEpisodes(media);
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
      return media.mediaListEntry?.progress || undefined;
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
      </View>

      {currentModuleId ? (
        <If condition={isLoading}>
          <Then>
            <View>
              <ActivityIndicator color={colors.primary[500]} size={48} />
            </View>
          </Then>

          <Else>
            <If condition={!data?.length}>
              <Then>
                <Text className="text-center">
                  There are no episodes for this anime
                </Text>
              </Then>

              <Else>
                <EpisodeSectionSelector episodes={data!} />
                <EpisodeChunkSelector />
                <EpisodeLayoutContainer
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
