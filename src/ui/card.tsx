import React from 'react';

import type { Media } from '@/types/anilist';

import type { ImgProps } from './core';
import { Image, Text, TouchableOpacity, View } from './core';

interface CardProps extends Partial<ImgProps> {
  media: Media;
  endSlot?: React.ReactNode;
}

export const Card = ({ media, endSlot }: CardProps) => {
  return (
    <TouchableOpacity className="w-28">
      <View className="mb-1.5 aspect-[2/3] w-full rounded-md">
        <Image
          source={{
            uri: media.coverImage.large,
          }}
          className="h-full w-full rounded-md"
          contentFit="cover"
        />
      </View>

      <Text numberOfLines={1} variant="md" weight="semibold">
        {media.title?.userPreferred}
      </Text>

      {endSlot}
    </TouchableOpacity>
  );
};
