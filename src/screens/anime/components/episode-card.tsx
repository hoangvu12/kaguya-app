import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { Episode } from '@/types';
import type { ButtonProps } from '@/ui';
import { addAlpha, Button, Image, Text, View } from '@/ui';
import Pressable from '@/ui/core/pressable';
import colors from '@/ui/theme/colors';

interface EpisodeCardProps extends Omit<ButtonProps, 'children'> {
  episode: Episode;
  shouldHighlight?: boolean;
  progressPercentage?: number;
}

const rippleColor = addAlpha(colors.thunder[900], 0.26);

const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episode,
  className,
  shouldHighlight = false,
  onPress,
  progressPercentage,
  ...buttonProps
}) => {
  return (
    <Button
      android_ripple={null}
      className={twMerge(
        'flex flex-col items-start justify-center rounded-md bg-transparent p-0',
        className
      )}
      onPress={onPress}
      {...buttonProps}
    >
      <Pressable
        onPress={onPress}
        android_ripple={{ color: rippleColor, foreground: true }}
        className="relative"
      >
        <Image
          className="aspect-video w-full rounded-md"
          source={{
            uri: episode.thumbnail!,
          }}
          key={episode.thumbnail}
        />

        {progressPercentage && progressPercentage > 0 ? (
          <View
            style={{
              width: `${progressPercentage * 100}%`,
            }}
            className="absolute bottom-0 h-0.5 rounded-md bg-primary-500"
          />
        ) : null}
      </Pressable>

      <View className="mt-1">
        <Text
          variant="sm"
          weight="semibold"
          className={twMerge(shouldHighlight && 'text-primary-300')}
          numberOfLines={2}
        >
          {episode.title ? (
            <React.Fragment>
              <Text
                weight="bold"
                className={twMerge(shouldHighlight && 'text-primary-300')}
              >
                {episode.number}.
              </Text>

              <Text
                weight="normal"
                className={twMerge(shouldHighlight && 'text-primary-300')}
              >
                {' '}
                {episode.title}
              </Text>
            </React.Fragment>
          ) : (
            `Episode ${episode.number}`
          )}
        </Text>
      </View>
    </Button>
  );
};

export default EpisodeCard;
