import React, { useMemo } from 'react';

import { type Media, MediaType } from '@/types/anilist';

import type { ImgProps } from './core';
import { Image, Text, TouchableOpacity, View } from './core';

interface CardProps extends Partial<ImgProps> {
  media: Media;
  endSlot?: React.ReactNode;
  containerProps?: React.ComponentPropsWithoutRef<typeof TouchableOpacity>;
}

export const Card = ({
  media,
  endSlot,
  containerProps,
  ...props
}: CardProps) => {
  const releasedEpisode = useMemo(() => {
    if (media.type === MediaType.Anime) {
      if (media.nextAiringEpisode?.episode - 1 > 1) {
        return media.nextAiringEpisode.episode - 1;
      }
    }

    return null;
  }, [media.nextAiringEpisode?.episode, media.type]);

  const totalMediaUnit = useMemo(() => {
    if (media.type === MediaType.Anime) {
      return media.episodes ?? '??';
    }

    if (media.type === MediaType.Manga) {
      return media.chapters ?? '??';
    }

    return null;
  }, [media.chapters, media.episodes, media.type]);

  return (
    <TouchableOpacity className="w-28" {...containerProps}>
      <View className="mb-1.5 aspect-[2/3] w-full rounded-md">
        <Image
          source={{
            uri: media.coverImage.large,
          }}
          className="h-full w-full rounded-md"
          contentFit="cover"
          {...props}
        />
      </View>

      <Text numberOfLines={2} variant="md" weight="medium">
        {media.title?.userPreferred}
      </Text>

      <Text className="mt-1 space-x-2">
        {media.mediaListEntry?.progress && (
          <Text variant="sm" weight="normal" className="text-primary-300">
            {media.mediaListEntry.progress}
          </Text>
        )}

        <Text variant="sm" weight="normal" className="text-gray-300">
          {media.mediaListEntry?.progress && ' | '}
          {releasedEpisode || totalMediaUnit} {'| '}
        </Text>

        {totalMediaUnit && (
          <Text variant="sm" weight="normal" className="text-gray-300">
            {totalMediaUnit}
          </Text>
        )}
      </Text>

      {endSlot}
    </TouchableOpacity>
  );
};
