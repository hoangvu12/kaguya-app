import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, HeartIcon, SmileIcon } from 'lucide-react-native';
import { styled } from 'nativewind';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { formatNumberToAbbreviated } from '@/core';
import type { FragmentType } from '@/gql';
import { graphql, useFragment } from '@/gql';
import { Banner } from '@/screens/search/components/banner';
import { Button, Text, View } from '@/ui';
import { Dot } from '@/ui/core/dot-list';
import { PlainCard } from '@/ui/plain-card';
import colors from '@/ui/theme/colors';
import { addAlpha } from '@/utils';

import AddToList from './add-to-list';
import NextEpisodeCountdown from './next-episode-countdown';

const SLinearGradient = styled(LinearGradient);

const linearGradientColors = [
  addAlpha(colors.thunder[950], 0.6),
  addAlpha(colors.thunder[950], 0.2),
  '#00000000',
];

const SHeartIcon = styled(HeartIcon);
const SSmileIcon = styled(SmileIcon);

export const DetailsHeaderFragment = graphql(`
  fragment DetailsHeaderMedia on Media {
    id
    title {
      userPreferred
    }
    bannerImage
    genres
    favourites
    averageScore
    seasonYear
    nextAiringEpisode {
      airingAt
      episode
    }
    coverImage {
      large
    }
  }
`);

interface HeaderProps {
  media: FragmentType<typeof DetailsHeaderFragment>;
}

const Header: React.FC<HeaderProps> = ({ media: mediaProps }) => {
  const navigation = useNavigation();

  if (!mediaProps) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const media = useFragment(DetailsHeaderFragment, mediaProps);

  if (!media) return null;

  return (
    <View className="mb-2 bg-thunder-950">
      <View className="relative h-48 w-full">
        <Banner bannerImage={media.bannerImage!} />

        <SLinearGradient
          colors={linearGradientColors}
          className="absolute top-0 h-20 w-full"
        >
          <Button
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('AnimeHome');
              }
            }}
            className="left-4 top-4 h-7 w-7 bg-transparent p-0"
          >
            <ArrowLeft size={28} color="white" />
          </Button>
        </SLinearGradient>
      </View>

      <View className="-mt-4 flex flex-row space-x-4 px-4">
        <PlainCard
          coverImage={media!.coverImage!.large!}
          className="aspect-[2/3] w-24"
        />

        <View className="flex-1">
          <Text variant="lg" weight="semibold" className="mb-1">
            {media!.title!.userPreferred}
          </Text>

          <View className="mb-2">
            <FlatList
              contentContainerStyle={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              data={media.genres?.filter(Boolean)}
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
                {formatNumberToAbbreviated(media.favourites ?? 0)}
              </Text>
            </View>

            <View className="flex flex-row items-center space-x-1">
              <SSmileIcon className="inline-block h-4 w-4 text-green-500" />

              <Text className="inline-block text-white">
                {media.averageScore ?? 0 + '%'}
              </Text>
            </View>

            <View className="h-1.5 w-1.5 rounded-full bg-thunder-700" />

            <Text>{media.seasonYear}</Text>
          </View>

          {media.nextAiringEpisode?.episode ? (
            <View className="mt-2">
              <NextEpisodeCountdown
                episode={media.nextAiringEpisode.episode}
                time={media.nextAiringEpisode.airingAt!}
              />
            </View>
          ) : null}
        </View>
      </View>

      <View className="px-4">
        <AddToList mediaId={media.id} />
      </View>
    </View>
  );
};

const Spacer = () => <Dot className="mx-1 self-center" />;

export default Header;
