import React from 'react';

import type { FragmentType } from '@/gql';
import { ActivityIndicator, View } from '@/ui';
import colors from '@/ui/theme/colors';

import type { useAnimeEpisodeFragment } from '../../details/screens/episode-screen/hooks/use-episodes';
import useEpisodes from '../../details/screens/episode-screen/hooks/use-episodes';
import EpisodesContainer from './episodes-container';
import ErrorMessage from './error-message';

interface MediaContainerProps {
  mediaFragment: FragmentType<typeof useAnimeEpisodeFragment>;
  currentEpisodeId: string;
}

const MediaContainer: React.FC<MediaContainerProps> = ({
  mediaFragment,
  currentEpisodeId,
}) => {
  const { data, isLoading } = useEpisodes(mediaFragment);

  if (isLoading) {
    return (
      <View className="flex h-full w-full flex-1 items-center justify-center">
        <ActivityIndicator color={colors.primary[500]} size={48} />
      </View>
    );
  }

  if (!data?.length) {
    return <ErrorMessage message="Cannot find episodes. Please try again" />;
  }

  return (
    <EpisodesContainer currentEpisodeId={currentEpisodeId} episodes={data} />
  );
};

export default MediaContainer;
