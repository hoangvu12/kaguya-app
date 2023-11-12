import { LinearGradient } from 'expo-linear-gradient';
import { styled } from 'nativewind';
import React from 'react';
import { View } from 'react-native';

import type { ImgProps } from '@/ui';
import { colors, Image } from '@/ui';
import { addAlpha } from '@/utils';

interface BannerProps extends ImgProps {
  bannerImage: string;
}

const SLinearGradient = styled(LinearGradient);

const linearGradientColors = [
  '#00000000',
  addAlpha(colors.thunder[950], 0.6),
  addAlpha(colors.thunder[950], 1),
];

export const Banner = ({ bannerImage }: BannerProps) => {
  return (
    <View className="relative h-full w-screen rounded-md">
      <Image
        source={{
          uri: bannerImage,
          headers: {
            referer: 'https://anilist.co',
          },
        }}
        className="h-full w-full rounded-md object-cover"
      />

      <SLinearGradient
        colors={linearGradientColors}
        className="absolute inset-0 flex flex-row items-end rounded-md"
      />
    </View>
  );
};
