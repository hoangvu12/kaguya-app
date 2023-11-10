import React from 'react';

import type { FragmentType } from '@/gql';
import { graphql, useFragment } from '@/gql';

import type { ImgProps } from './core';
import { Image, Text, TouchableOpacity, View } from './core';
import MediaUnitStats from './media-unit-stats';

export const CardFragment = graphql(`
  fragment CardMedia on Media {
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
  endSlot?: React.ReactNode;
  containerProps?: React.ComponentPropsWithoutRef<typeof TouchableOpacity>;
}

export const CARD_WIDTH = 112;

export const Card = ({
  media: mediaProps,
  endSlot,
  containerProps,
  ...props
}: CardProps) => {
  const media = useFragment(CardFragment, mediaProps);

  return (
    <TouchableOpacity className="w-28" {...containerProps}>
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
