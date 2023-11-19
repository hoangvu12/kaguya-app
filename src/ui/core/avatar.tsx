import type { ImageProps } from 'expo-image';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Image } from './image';

interface AvatarProps extends ImageProps {}

const Avatar: React.FC<AvatarProps> = ({ className, ...props }) => {
  return <Image className={twMerge('rounded-full', className)} {...props} />;
};

export default Avatar;
