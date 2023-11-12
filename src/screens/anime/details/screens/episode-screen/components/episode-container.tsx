import { useSetAtom } from 'jotai/react';
import React, { useEffect } from 'react';
import { Else, If, Then } from 'react-if';

import { type FragmentType, graphql, useFragment } from '@/gql';
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

  const { data, isLoading } = useEpisodes(media);
  const setSectionEpisodes = useSetAtom(sectionEpisodesAtom);
  const setEpisodeChunk = useSetAtom(episodeChunkAtom);

  useEffect(() => {
    // Reset episodes when loading
    if (isLoading) {
      setSectionEpisodes([]);
      setEpisodeChunk([]);
    }
  }, [isLoading, setEpisodeChunk, setSectionEpisodes]);

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
              <EpisodeLayoutContainer />
            </Else>
          </If>
        </Else>
      </If>
    </View>
  );
};

export default EpisodeContainer;
