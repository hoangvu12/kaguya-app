import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { ImgProps } from './core';
import { Image } from './core';

interface PlainCardProps extends Partial<ImgProps> {
  coverImage: string;
}

export const PlainCard = ({
  coverImage,
  className,
  ...props
}: PlainCardProps) => {
  return (
    <Image
      source={{
        uri: coverImage,
      }}
      key={coverImage}
      className={twMerge('aspect-[2/3] rounded-md', className)}
      contentFit="cover"
      {...props}
    />
  );
};
