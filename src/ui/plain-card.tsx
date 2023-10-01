import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { Media } from '@/types/anilist';

import type { ImgProps } from './core';
import { Image } from './core';

interface PlainCardProps extends Partial<ImgProps> {
  media: Media;
}

export const PlainCard = ({ media, className, ...props }: PlainCardProps) => {
  return (
    <Image
      source={{
        uri: media.coverImage.large,
      }}
      className={twMerge('aspect-[2/3] rounded-md', className)}
      contentFit="cover"
      {...props}
    />
  );
};
