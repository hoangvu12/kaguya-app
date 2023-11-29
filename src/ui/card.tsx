import { StackActions, useNavigation } from '@react-navigation/native';
import { StarIcon } from 'lucide-react-native';
import React from 'react';

import type { FragmentType } from '@/gql';
import { graphql, useFragment } from '@/gql';

import type { ImgProps } from './core';
import { Image, Text, View } from './core';
import Pressable from './core/pressable';
import MediaUnitStats from './media-unit-stats';

export const CardFragment = graphql(`
  fragment CardMedia on Media {
    id
    title {
      userPreferred
    }
    coverImage {
      large
    }
    averageScore
    ...MediaUnitStatsMedia
  }
`);

interface CardProps extends Partial<ImgProps> {
  media: FragmentType<typeof CardFragment>;
  shouldReplaceScreen?: boolean;
  endSlot?: React.ReactNode;
  containerProps?: React.ComponentPropsWithoutRef<typeof View>;
}

export const CARD_WIDTH = 112;

export const Card = ({
  media: mediaProps,
  endSlot,
  shouldReplaceScreen,
  containerProps,
  ...props
}: CardProps) => {
  const media = useFragment(CardFragment, mediaProps);

  const navigation = useNavigation();

  const handlePress = () => {
    if (!media?.id) return console.warn('No media id');

    if (shouldReplaceScreen) {
      navigation.dispatch(
        StackActions.replace('AnimeDetails', {
          mediaId: media.id,
        })
      );
    } else {
      navigation.navigate('AnimeDetails', { mediaId: media.id });
    }
  };

  return (
    <View className="relative w-28" {...containerProps}>
      <Pressable
        onPress={handlePress}
        className="mb-1.5 aspect-[2/3] w-full rounded-md"
      >
        <Image
          source={{
            uri: media?.coverImage?.large!,
          }}
          className="h-full w-full rounded-md"
          contentFit="cover"
          key={media?.coverImage?.large!}
          {...props}
        />
      </Pressable>

      <Pressable android_ripple={null} onPress={handlePress}>
        <Text numberOfLines={2} variant="md" weight="medium">
          {media?.title?.userPreferred}
        </Text>

        <MediaUnitStats media={media} className="mt-1" />

        {endSlot}
      </Pressable>

      {media?.averageScore && (
        <View className="absolute right-1 top-1 flex flex-row items-center rounded-full bg-thunder-600 px-3 py-1">
          <StarIcon size={14} color="#eab308" fill="#eab308" />

          <Text variant="sm" weight="medium" className="ml-1 text-white">
            {media?.averageScore / 10}
          </Text>
        </View>
      )}
    </View>
  );
};
