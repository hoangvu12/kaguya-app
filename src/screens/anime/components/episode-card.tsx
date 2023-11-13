import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { Episode } from '@/types';
import type { ButtonProps } from '@/ui';
import { Button, Image, Text, View } from '@/ui';

interface EpisodeCardProps extends ButtonProps {
  episode: Episode;
  shouldHighlight?: boolean;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episode,
  className,
  shouldHighlight = false,
  ...buttonProps
}) => {
  return (
    <Button
      className={twMerge(
        'flex flex-col items-start justify-center rounded-md bg-transparent p-0',
        className
      )}
      {...buttonProps}
    >
      <Image
        className="aspect-video w-full rounded-md"
        source={{
          uri: episode.thumbnail,
        }}
        key={episode.thumbnail}
      />

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
