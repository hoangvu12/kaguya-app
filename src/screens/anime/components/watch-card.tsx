import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { styled } from 'nativewind';
import React from 'react';

import type { FragmentType } from '@/gql';
import { graphql, useFragment } from '@/gql';
import type { WatchedEpisode } from '@/storage/episode';
import { addAlpha, colors, Image, Text, View } from '@/ui';
import Pressable from '@/ui/core/pressable';

export const WatchCardFragment = graphql(`
  fragment WatchCard on Media {
    id
    title {
      userPreferred
    }
    coverImage {
      large
    }
    bannerImage
  }
`);

interface WatchCardProps {
  media: FragmentType<typeof WatchCardFragment>;
  watchedData: WatchedEpisode;
}

const linearGradientColors = [
  '#00000000',
  addAlpha(colors.thunder[950], 0.4),
  addAlpha(colors.thunder[950], 0.8),
];

const SLinearGradient = styled(LinearGradient);

export const WATCH_CARD_WIDTH = 160;

const WatchCard: React.FC<WatchCardProps> = ({
  media: mediaFragment,
  watchedData,
}) => {
  const media = useFragment(WatchCardFragment, mediaFragment);

  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('AnimeDetails', {
      mediaId: media.id,
      tab: 'episodes',
    });
  };

  return (
    <View style={{ width: WATCH_CARD_WIDTH }}>
      <Pressable onPress={handleNavigate} className="relative">
        <Image
          source={{
            uri:
              watchedData?.episode?.thumbnail ||
              media?.bannerImage ||
              media?.coverImage?.large!,
          }}
          contentFit="cover"
          className="aspect-video w-full rounded-md"
        />

        <SLinearGradient
          colors={linearGradientColors}
          className="absolute inset-0"
        />

        <View className="gap-1,5 absolute bottom-1.5 left-1.5 flex flex-row items-center gap-1.5">
          <Text variant="sm" numberOfLines={1}>
            {watchedData?.episode?.number}
          </Text>

          <View className="h-1.5 w-1.5 rounded-full bg-thunder-400" />

          {watchedData?.episode?.title && (
            <Text variant="sm" numberOfLines={1}>
              {watchedData.episode.title}
            </Text>
          )}
        </View>
      </Pressable>

      <Pressable onPress={handleNavigate} android_ripple={null}>
        <Text variant="sm" className="mt-1" numberOfLines={2}>
          {media?.title?.userPreferred}
        </Text>
      </Pressable>
    </View>
  );
};

export default WatchCard;
