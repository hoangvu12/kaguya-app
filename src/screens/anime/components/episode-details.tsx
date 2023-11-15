import React, { useState } from 'react';
import { Else, If, Then } from 'react-if';
import { twMerge } from 'tailwind-merge';

import type { Episode } from '@/types';
import type { ButtonProps } from '@/ui';
import { addAlpha, Button, Image, Text, View } from '@/ui';
import Pressable from '@/ui/core/pressable';
import colors from '@/ui/theme/colors';

interface EpisodeDetailsProps extends Omit<ButtonProps, 'children'> {
  episode: Episode;
}

const rippleColor = addAlpha(colors.thunder[900], 0.26);

const EpisodeDetails: React.FC<EpisodeDetailsProps> = ({
  episode,
  className,
  onLongPress,
  onPress,
  ...props
}) => {
  const [shouldExpandDescription, setShouldExpandDescription] = useState(false);

  return (
    <Button
      android_ripple={null}
      className={twMerge(
        'flex flex-col items-start rounded-md bg-thunder-900 p-0',
        className
      )}
      onLongPress={(e) => {
        onLongPress?.(e);

        setShouldExpandDescription((prev) => !prev);
      }}
      onPress={onPress}
      {...props}
    >
      <Pressable
        android_ripple={{ color: rippleColor, foreground: true }}
        onPress={onPress}
        className="flex flex-row items-start justify-start bg-thunder-900"
      >
        <View className="mr-1 aspect-video w-5/12">
          <Image
            className="h-full w-full rounded-md object-cover"
            source={{
              uri: episode.thumbnail || '',
            }}
            key={episode.thumbnail}
          />
        </View>

        <View className="flex-1 p-2">
          <If condition={episode.title}>
            <Then>
              <Text variant="sm" className="text-gray-300" numberOfLines={1}>
                Episode {episode.number}
              </Text>

              <Text variant="md" weight="semibold" numberOfLines={2}>
                {episode.title || 'Episode ' + episode.number}
              </Text>
            </Then>

            <Else>
              <Text variant="md" weight="semibold" numberOfLines={2}>
                Episode {episode.number}
              </Text>
            </Else>
          </If>
        </View>
      </Pressable>

      {episode.description ? (
        <View className="pb-2">
          <Text
            numberOfLines={!shouldExpandDescription ? 2 : 0}
            variant="md"
            className="mt-1 px-3 text-gray-300"
          >
            {episode.description}
          </Text>
        </View>
      ) : null}
    </Button>
  );
};

export default EpisodeDetails;
