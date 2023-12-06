import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSetAtom } from 'jotai/react';
import React, { useEffect } from 'react';

import { graphql } from '@/gql';
import { useGraphQL } from '@/hooks/use-graphql';
import type { RootStackParamList } from '@/navigation/types';
import { ActivityIndicator, Text, View } from '@/ui';
import colors from '@/ui/theme/colors';

import MediaContainer from './components/media-container';
import { mediaTitleAtom } from './store';

type Props = NativeStackScreenProps<RootStackParamList, 'AnimeWatch'>;

const document = graphql(`
  query AnimeWatchScreenQuery($mediaId: Int!) {
    Media(id: $mediaId) {
      title {
        userPreferred
      }
      isAdult
      idMal
      ...UseAnimeEpisode
    }
  }
`);

export const AnimeWatchScreen: React.FC<Props> = ({ route }) => {
  const params = route.params;
  const setMediaTitle = useSetAtom(mediaTitleAtom);

  const { mediaId, episodeId } = params;

  const { data: media, isLoading: mediaIsLoading } = useGraphQL(document, {
    mediaId,
  });

  useEffect(() => {
    if (media?.Media?.title?.userPreferred) {
      setMediaTitle(media.Media.title.userPreferred);
    }
  }, [media?.Media?.title?.userPreferred, setMediaTitle]);

  if (mediaIsLoading) {
    return (
      <View className="flex h-full w-full flex-1 items-center justify-center">
        <ActivityIndicator color={colors.primary[500]} size={48} />
      </View>
    );
  }

  if (!media?.Media) {
    return <Text>Cannot load anime data...</Text>;
  }

  return (
    <MediaContainer
      malId={media.Media.idMal || undefined}
      currentEpisodeId={episodeId}
      mediaFragment={media.Media}
      anilistId={mediaId}
      isAdult={media.Media.isAdult || false}
    />
  );
};
