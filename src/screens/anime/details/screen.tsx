import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, PlusCircle } from 'lucide-react-native';
import { styled } from 'nativewind';
import * as React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { formatNumberToAbbreviated } from '@/core';
import anime from '@/mock_data/anime_details.json';
import {
  addAlpha,
  BannerCard,
  Button,
  FocusAwareStatusBar,
  Text,
  View,
} from '@/ui';
import { Dot } from '@/ui/core/dot-list';
import Tabs from '@/ui/core/tabs';
import { Heart as HeartIcon, Smile as SmileIcon } from '@/ui/icons';
import { PlainCard } from '@/ui/plain-card';
import colors from '@/ui/theme/colors';

import NextEpisodeCountdown from './components/next-episode-countdown';
import UpdateHeader from './components/update-header';
import EpisodeScreen from './screens/episode-screen/screen';
import InfoScreen from './screens/info-screen/screen';

const SHeartIcon = styled(HeartIcon);
const SSmileIcon = styled(SmileIcon);
const PlusCircleIcon = styled(PlusCircle);

const SLinearGradient = styled(LinearGradient);

const linearGradientColors = [
  addAlpha(colors.thunder[950], 0.6),
  addAlpha(colors.thunder[950], 0.2),
  '#00000000',
];

export const AnimeDetailsScreen = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    const parent = navigation.getParent();

    parent?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });

    return () => {
      parent?.setOptions({
        tabBarStyle: undefined,
      });
    };
  }, [navigation]);

  const Header = React.useCallback(
    () => (
      <View className="mb-2 bg-thunder-950">
        <View className="relative h-48 w-full">
          <BannerCard media={anime} showInfo={false} />

          <SLinearGradient
            colors={linearGradientColors}
            className="absolute top-0 h-20 w-full"
          >
            <Button className="left-4 top-4 h-7 w-7 bg-transparent p-0">
              <ArrowLeft size={28} color="white" />
            </Button>
          </SLinearGradient>
        </View>

        <View className="-mt-4 flex flex-row space-x-4 px-4">
          <PlainCard media={anime} className="aspect-[2/3] w-24" />

          <View className="flex-1">
            <Text variant="lg" weight="semibold" className="mb-1">
              {anime.title.userPreferred}
            </Text>
            <View className="mb-2">
              <FlatList
                data={anime.genres}
                renderItem={({ item: genre }) => (
                  <Text variant="sm">{genre}</Text>
                )}
                keyExtractor={(item) => item}
                horizontal
                ItemSeparatorComponent={Spacer}
              />
            </View>
            <View className="flex flex-row items-center space-x-2">
              <View className="flex flex-row items-center space-x-1">
                <SHeartIcon className="inline-block h-4 w-4 text-red-400" />

                <Text className="inline-block text-white">
                  {formatNumberToAbbreviated(anime.favourites)}
                </Text>
              </View>

              <View className="flex flex-row items-center space-x-1">
                <SSmileIcon className="inline-block h-4 w-4 text-green-500" />

                <Text className="inline-block text-white">
                  {anime.averageScore + '%'}
                </Text>
              </View>

              <View className="h-1.5 w-1.5 rounded-full bg-thunder-700" />

              <Text>{anime.seasonYear}</Text>
            </View>

            <View className="mt-2">
              <NextEpisodeCountdown episode={1} time={1696597200} />
            </View>
          </View>
        </View>

        <Button className="mx-4 mt-8 flex flex-row items-center bg-primary-500 py-3">
          <PlusCircleIcon size={24} color="white" className="mr-2" />

          <Text variant="md">Add to list</Text>
        </Button>
      </View>
    ),
    []
  );

  return (
    <>
      <FocusAwareStatusBar />

      <Tabs renderHeader={Header}>
        <Tabs.Tab name="Info">
          <Tabs.ScrollView
            style={{ paddingHorizontal: 16, paddingVertical: 16 }}
          >
            <UpdateHeader title={anime.title.userPreferred} />

            <InfoScreen media={anime} />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="Episodes">
          <Tabs.ScrollView
            style={{ paddingHorizontal: 16, paddingVertical: 16 }}
          >
            <UpdateHeader title={anime.title.userPreferred} />

            <EpisodeScreen />
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs>
    </>
  );
};

const Spacer = () => <Dot className="mx-0.5" />;
