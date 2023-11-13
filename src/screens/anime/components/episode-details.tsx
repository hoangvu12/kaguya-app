import React, { useState } from 'react';
import { Else, If, Then } from 'react-if';
import { twMerge } from 'tailwind-merge';

import type { Episode } from '@/types';
import type { ButtonProps } from '@/ui';
import { Button, Image, Text, View } from '@/ui';

interface EpisodeDetailsProps extends ButtonProps {
  episode: Episode;
}

const EpisodeDetails: React.FC<EpisodeDetailsProps> = ({
  episode,
  className,
  onLongPress,
  ...props
}) => {
  const [shouldExpandDescription, setShouldExpandDescription] = useState(false);

  return (
    <Button
      className={twMerge(
        'flex flex-col items-start rounded-md bg-thunder-900 p-0',
        className
      )}
      onLongPress={(e) => {
        onLongPress?.(e);

        setShouldExpandDescription((prev) => !prev);
      }}
      {...props}
    >
      <View className="flex flex-row items-start justify-start gap-1">
        <Image
          className="aspect-video w-5/12 rounded-md object-cover"
          source={{
            uri: episode.thumbnail,
          }}
          key={episode.thumbnail}
        />

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
      </View>

      {episode.description && (
        <View className="pb-2">
          <Text
            numberOfLines={!shouldExpandDescription ? 2 : 0}
            variant="md"
            className="mt-1 px-3 text-gray-300"
          >
            {episode.description}
          </Text>
        </View>
      )}
    </Button>
  );
};

export default EpisodeDetails;
