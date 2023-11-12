import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

import { graphql } from '@/gql';
import { useGraphQL } from '@/hooks/use-graphql';
import type { RootStackParamList } from '@/navigation/types';
import {
  ActivityIndicator,
  Button,
  FocusAwareStatusBar,
  ScrollView,
  Text,
  View,
} from '@/ui';
import colors from '@/ui/theme/colors';

import Header from './components/header';
import EpisodeScreen from './screens/episode-screen/screen';
import InfoScreen from './screens/info-screen/screen';

const document = graphql(`
  query InfoDetailsScreen($id: Int) {
    Media(id: $id) {
      ...DetailsHeaderMedia
      ...InfoScreenMedia
      ...UseAnimeEpisode
    }
  }
`);

type Props = NativeStackScreenProps<RootStackParamList, 'AnimeDetails'>;

export const AnimeDetailsScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = React.useState<'details' | 'episodes'>(
    'details'
  );

  const handleChangeTab = (tab: 'details' | 'episodes') => () => {
    setActiveTab(tab);
  };

  React.useEffect(() => {
    const parent = navigation.getParent();

    parent?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });

    // @ts-ignore
    const animeParent = navigation.getParent('anime-navigator');

    animeParent?.setOptions({
      header: () => null,
    });

    return () => {
      parent?.setOptions({
        tabBarStyle: undefined,
      });
    };
  }, [navigation]);

  const mediaId = route.params?.mediaId ?? 0;

  const { data, isLoading } = useGraphQL(document, { id: mediaId });

  const anime = data?.Media;

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color={colors.primary[500]} size={48} />
      </View>
    );
  }

  if (!anime) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Something went wrong</Text>
      </View>
    );
  }

  return (
    <>
      <FocusAwareStatusBar />

      <ScrollView stickyHeaderIndices={[1]}>
        <Header media={anime} />

        <View className="flex flex-row space-x-2 bg-thunder-950 p-4">
          <Button
            onPress={handleChangeTab('details')}
            className={twMerge(
              'flex-1 bg-thunder-900/60',
              activeTab === 'details' ? 'bg-primary-500' : 'bg-thunder-900/60'
            )}
          >
            <Text className="text-center">Details</Text>
          </Button>

          <Button
            onPress={handleChangeTab('episodes')}
            className={twMerge(
              'flex-1 bg-thunder-900/60',
              activeTab === 'episodes' ? 'bg-primary-500' : 'bg-thunder-900/60'
            )}
          >
            <Text className="text-center">Episodes</Text>
          </Button>
        </View>

        <View className="px-4">
          {activeTab === 'details' && <InfoScreen media={anime} />}
          {activeTab === 'episodes' && <EpisodeScreen media={anime} />}
        </View>
      </ScrollView>
    </>
  );
};
