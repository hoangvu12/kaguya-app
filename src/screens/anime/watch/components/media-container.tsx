import { useSetAtom } from 'jotai/react';
import React, { useEffect, useState } from 'react';

import type { FragmentType } from '@/gql';
import { ActivityIndicator, Text, View } from '@/ui';
import colors from '@/ui/theme/colors';

import type { useAnimeEpisodeFragment } from '../../details/screens/episode-screen/hooks/use-episodes';
import useEpisodes from '../../details/screens/episode-screen/hooks/use-episodes';
import { isAdultAtom, mediaIdAtom } from '../store';
import EpisodesContainer from './episodes-container';
import ErrorMessage from './error-message';

interface MediaContainerProps {
  mediaFragment: FragmentType<typeof useAnimeEpisodeFragment>;
  currentEpisodeId: string;
  anilistId: number;
  malId: number | undefined;
  isAdult: boolean;
}

const MediaContainer: React.FC<MediaContainerProps> = ({
  mediaFragment,
  currentEpisodeId,
  anilistId,
  malId,
  isAdult,
}) => {
  const setMediaId = useSetAtom(mediaIdAtom);
  const setIsAdult = useSetAtom(isAdultAtom);

  const [episodeFetchingStatus, setEpisodeFetchingStatus] = useState<{
    isError: boolean;
    status: string;
  }>({ isError: false, status: '' });

  useEffect(() => {
    setMediaId({
      anilistId,
      malId,
    });
  }, [setMediaId, anilistId, malId]);

  useEffect(() => {
    setIsAdult(isAdult);
  }, [setIsAdult, isAdult]);

  const { data, isLoading, refetch } = useEpisodes(
    mediaFragment,
    setEpisodeFetchingStatus
  );

  if (isLoading) {
    return (
      <View className="flex h-full w-full flex-1 items-center justify-center">
        <ActivityIndicator color={colors.primary[500]} size={48} />

        {!episodeFetchingStatus.isError && (
          <Text className="mt-2 text-center font-semibold text-gray-300">
            {episodeFetchingStatus.status}
          </Text>
        )}
      </View>
    );
  }

  if (!data?.length) {
    return (
      <ErrorMessage
        onRetry={refetch}
        message="Cannot find episodes. Please try again"
      />
    );
  }

  return (
    <EpisodesContainer currentEpisodeId={currentEpisodeId} episodes={data} />
  );
};

export default MediaContainer;
