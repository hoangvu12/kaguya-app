import { StackActions, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { styled } from 'nativewind';
import React, { useCallback, useMemo } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { twMerge } from 'tailwind-merge';

import type { FragmentType } from '@/gql';
import { graphql, useFragment } from '@/gql';
import { useGraphQL } from '@/hooks/use-graphql';

import { addAlpha } from '../utils';
import { Image, Text, View } from './core';
import Pressable from './core/pressable';
import Skeleton, { SkeletonItem } from './core/skeleton';
import MediaUnitStats from './media-unit-stats';
import { colors, WIDTH } from './theme';

const BannerCardFragment = graphql(`
  fragment BannerCardMedia on Media {
    id
    title {
      userPreferred
    }
    bannerImage
    genres
    ...MediaUnitStatsMedia
  }
`);

type MediaFragment = FragmentType<typeof BannerCardFragment>;

const document = graphql(`
  query BannerCard {
    Page(page: 1, perPage: 10) {
      media(type: ANIME, sort: [TRENDING_DESC, POPULARITY_DESC]) {
        ...BannerCardMedia
      }
    }
  }
`);

const SLinearGradient = styled(LinearGradient);

const linearGradientColors = [
  '#00000000',
  addAlpha(colors.thunder[950], 0.6),
  addAlpha(colors.thunder[950], 0.95),
];

const CAROUSEL_HEIGHT = 208;

export const BannerList = () => {
  const { data, isLoading } = useGraphQL(document);

  const renderItem = useCallback(({ item }: { item: MediaFragment }) => {
    return <BannerItem media={item} />;
  }, []);

  const mediaList = useMemo(() => {
    if (!data?.Page?.media) return [];

    return data.Page.media.filter(Boolean);
  }, [data?.Page?.media]);

  if (isLoading) {
    return (
      <Skeleton className="px-4">
        <SkeletonItem style={{ height: CAROUSEL_HEIGHT }} className="w-full" />
      </Skeleton>
    );
  }

  if (!mediaList?.length) {
    return <Text>No data</Text>;
  }

  return (
    <Carousel
      loop
      autoPlay
      autoPlayInterval={3000}
      height={CAROUSEL_HEIGHT}
      width={WIDTH}
      data={mediaList!}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 50,
      }}
      windowSize={4}
      renderItem={renderItem}
    />
  );
};

const BannerItem = React.memo(
  ({ media: mediaProps }: { media: MediaFragment }) => {
    const media = useFragment(BannerCardFragment, mediaProps);
    const navigation = useNavigation();

    const handlePress = () => {
      if (!media?.id) return console.warn('No media id');

      navigation.dispatch(
        StackActions.replace('AnimeDetails', {
          mediaId: media.id,
        })
      );
    };

    return (
      <Pressable
        onPress={handlePress}
        className="relative h-full w-full rounded-md"
      >
        <View className="h-full w-full">
          <Image
            source={{
              uri: media.bannerImage!,
            }}
            style={{
              borderRadius: 6,
              width: '100%',
              height: '100%',
            }}
            contentFit="cover"
            key={media.bannerImage!}
          />
        </View>

        <SLinearGradient
          colors={linearGradientColors}
          className="absolute inset-0 flex flex-row items-end rounded-md"
        >
          <View className="w-full p-4">
            <MediaUnitStats media={media} className="mt-1" />

            <Text
              weight="semibold"
              variant="xl"
              numberOfLines={1}
              className="mb-1"
            >
              {media?.title?.userPreferred}
            </Text>

            <View className="flex flex-row items-center">
              {media.genres!.slice(0, 4).map((genre, index) => {
                const isLast =
                  index === media.genres!.length - 1 || index === 3;

                return (
                  <React.Fragment key={genre}>
                    <Text weight="normal" variant="md">
                      {genre}
                    </Text>

                    {!isLast && (
                      <Text className={twMerge(!isLast && 'mx-0.5')}>-</Text>
                    )}
                  </React.Fragment>
                );
              })}
            </View>
          </View>
        </SLinearGradient>
      </Pressable>
    );
  }
);
