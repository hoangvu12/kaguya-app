import { StackActions, useNavigation } from '@react-navigation/native';
import React from 'react';

import type { FragmentType } from '@/gql';
import { graphql, useFragment } from '@/gql';

import type { ImgProps } from './core';
import { Image, Text, TouchableOpacity, View } from './core';
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
    ...MediaUnitStatsMedia
  }
`);

interface CardProps extends Partial<ImgProps> {
  media: FragmentType<typeof CardFragment>;
  shouldReplaceScreen?: boolean;
  endSlot?: React.ReactNode;
  containerProps?: React.ComponentPropsWithoutRef<typeof TouchableOpacity>;
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
    <TouchableOpacity
      onPress={handlePress}
      className="w-28"
      {...containerProps}
    >
      <View className="mb-1.5 aspect-[2/3] w-full rounded-md">
        <Image
          source={{
            uri: media?.coverImage?.large!,
          }}
          className="h-full w-full rounded-md"
          contentFit="cover"
          {...props}
        />
      </View>

      <Text numberOfLines={2} variant="md" weight="medium">
        {media?.title?.userPreferred}
      </Text>

      <MediaUnitStats media={media} className="mt-1" />

      {endSlot}
    </TouchableOpacity>
  );
};
