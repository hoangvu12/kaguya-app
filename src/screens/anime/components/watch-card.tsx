import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { styled } from 'nativewind';
import React from 'react';

import type { FragmentType } from '@/gql';
import { graphql, useFragment } from '@/gql';
import { addAlpha, colors, Image, Text, View } from '@/ui';
import Pressable from '@/ui/core/pressable';
import MediaUnitStats from '@/ui/media-unit-stats';

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
    ...MediaUnitStatsMedia
  }
`);

interface WatchCardProps {
  media: FragmentType<typeof WatchCardFragment>;
  watchedData: {
    thumbnail?: string;
    number: string | number;
    title?: string;
  };
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
              watchedData?.thumbnail ||
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
      </Pressable>

      <Pressable onPress={handleNavigate} android_ripple={null}>
        <Text variant="sm" className="mt-1" numberOfLines={1}>
          {media?.title?.userPreferred}
        </Text>

        <MediaUnitStats media={media} />
      </Pressable>
    </View>
  );
};

export default WatchCard;
