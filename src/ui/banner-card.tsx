import { LinearGradient } from 'expo-linear-gradient';
import { styled } from 'nativewind';
import React from 'react';

import type { Media } from '@/types/anilist';

import { addAlpha } from '../utils';
import type { ImgProps } from './core';
import { Button, Image, Text, View } from './core';
import AutoImage from './core/auto-image';
import { Play as PlayIcon } from './icons/play';
import { colors } from './theme';

interface BannerCardProps extends ImgProps {
  media: Media;
  showInfo?: boolean;
}

const SLinearGradient = styled(LinearGradient);
const SPlayIcon = styled(PlayIcon);

const linearGradientColors = [
  '#00000000',
  addAlpha(colors.thunder[950], 0.6),
  addAlpha(colors.thunder[950], 1),
];

export const BannerCard = ({ media, showInfo = true }: BannerCardProps) => {
  return (
    <View className="relative h-full w-full rounded-md">
      <Image
        source={{
          uri: media.bannerImage,
          headers: {
            referer: 'https://anilist.co',
          },
        }}
        className="h-full w-full rounded-md object-cover"
      />

      <SLinearGradient
        colors={linearGradientColors}
        className="absolute inset-0 flex flex-row items-end rounded-md"
      >
        {showInfo && (
          <View className="w-full p-4">
            <AutoImage
              source={{
                uri: 'https://www.themoviedb.org/t/p/original/3JqKLnwoGAE8nK7YfESzmzn8qDG.png',
              }}
              className="mb-4 w-3/4"
            />

            <Text
              weight="semibold"
              variant="xl"
              numberOfLines={1}
              className="mb-1"
            >
              {media.title.userPreferred}
            </Text>

            <View className="flex flex-row">
              <Button
                leftIcon={<SPlayIcon className="h-6 w-6 text-white" />}
                variant="primary"
              >
                <Text>Watch now</Text>
              </Button>
            </View>
          </View>
        )}
      </SLinearGradient>
    </View>
  );
};
