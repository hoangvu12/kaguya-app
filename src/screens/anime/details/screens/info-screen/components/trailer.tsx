import React from 'react';
import type { ViewProps } from 'react-native';
import type { YoutubeIframeProps } from 'react-native-youtube-iframe';
import YoutubePlayer from 'react-native-youtube-iframe';
import { twMerge } from 'tailwind-merge';

import { Text, View, WIDTH } from '@/ui';

interface TrailerProps extends ViewProps {
  youtubeId: string;
  youtubeProps?: YoutubeIframeProps;
}

const PADDING = 16;

const Trailer: React.FC<TrailerProps> = ({
  youtubeId,
  youtubeProps,
  className,
  ...props
}) => {
  return (
    <View className={twMerge(className)} {...props}>
      <Text variant="xl" className="mb-2">
        Trailer
      </Text>

      <View className="overflow-hidden rounded-md">
        <YoutubePlayer
          height={(WIDTH - PADDING * 2) * (9 / 16)}
          videoId={youtubeId}
          {...youtubeProps}
        />
      </View>
    </View>
  );
};

export default Trailer;
