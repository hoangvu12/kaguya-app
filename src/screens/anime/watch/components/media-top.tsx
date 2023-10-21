import { useAtomValue } from 'jotai/react';
import { ChevronLeftIcon } from 'lucide-react-native';
import React from 'react';

import { Button, Text, View } from '@/ui';
import colors from '@/ui/theme/colors';

import { isSlidingAtom, videoSizeAtom } from '../store';
import MediaSettings from './media-settings';
import MediaSlidingIndicator from './media-sliding-indicator';
import MediaToggleSubtitle from './media-toggle-subtitle';

const MediaTop = () => {
  const isSliding = useAtomValue(isSlidingAtom);
  const videoSize = useAtomValue(videoSizeAtom);

  return (
    <React.Fragment>
      {!isSliding ? (
        <View className="absolute left-0 top-0 flex w-full flex-row justify-between p-4">
          <View className="flex w-2/3 flex-row">
            <Button className="mr-2 items-start bg-transparent p-0">
              <ChevronLeftIcon size={32} color={colors.white} />
            </Button>

            <View>
              <Text weight="semibold" variant="md" numberOfLines={1}>
                Zom 100: Zombie ni Naru Made ni Shitai 100 no Koto
              </Text>

              <Text variant="sm" className="text-gray-300">
                Episode 1
              </Text>
            </View>
          </View>

          <View>
            <View className="flex flex-row items-center justify-end gap-2">
              <View>
                <MediaToggleSubtitle />
              </View>

              <View>
                <MediaSettings />
              </View>
            </View>

            <View className="mt-3 flex items-end text-right">
              <Text className="text-gray-300" variant="md" numberOfLines={1}>
                Server name
              </Text>

              <Text variant="md" weight="semibold">
                Source name
              </Text>

              {videoSize.width && videoSize.height ? (
                <Text className="text-gray-300" variant="sm">
                  {videoSize.width}x{videoSize.height}
                </Text>
              ) : null}
            </View>
          </View>
        </View>
      ) : (
        <MediaSlidingIndicator />
      )}
    </React.Fragment>
  );
};

export default MediaTop;
