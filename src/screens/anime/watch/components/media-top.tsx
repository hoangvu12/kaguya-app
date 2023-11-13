import { useNavigation } from '@react-navigation/native';
import { useAtomValue } from 'jotai/react';
import { ChevronLeftIcon } from 'lucide-react-native';
import React from 'react';

import { currentModuleIdAtom } from '@/store';
import { Button, Text, View } from '@/ui';
import colors from '@/ui/theme/colors';

import {
  currentEpisodeAtom,
  currentServerAtom,
  isSlidingAtom,
  mediaTitleAtom,
  videoSizeAtom,
} from '../store';
import EpisodesButton from './episodes-button';
import MediaSettings from './media-settings';
import MediaSlidingIndicator from './media-sliding-indicator';
import MediaToggleSubtitle from './media-toggle-subtitle';

const MediaTop = () => {
  const isSliding = useAtomValue(isSlidingAtom);
  const videoSize = useAtomValue(videoSizeAtom);
  const currentModuleId = useAtomValue(currentModuleIdAtom);
  const currentServer = useAtomValue(currentServerAtom);
  const currentEpisode = useAtomValue(currentEpisodeAtom);
  const mediaTitle = useAtomValue(mediaTitleAtom);

  const navigation = useNavigation();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('AnimeHome');
    }
  };

  return (
    <React.Fragment>
      {!isSliding ? (
        <View className="absolute left-0 top-0 flex w-full flex-row justify-between p-4">
          <View className="flex w-2/3 flex-row">
            <Button
              onPress={handleGoBack}
              className="mr-2 items-start bg-transparent p-0"
            >
              <ChevronLeftIcon size={32} color={colors.white} />
            </Button>

            <View>
              {currentEpisode && (
                <Text weight="semibold" variant="md" numberOfLines={1}>
                  Episode {currentEpisode?.number}
                  {currentEpisode?.title ? `: ${currentEpisode.title}` : ''}
                </Text>
              )}

              {mediaTitle && (
                <Text variant="sm" className="text-gray-300">
                  {mediaTitle}
                </Text>
              )}
            </View>
          </View>

          <View>
            <View className="flex flex-row items-center justify-end gap-2">
              <View>
                <EpisodesButton />
              </View>

              <View>
                <MediaToggleSubtitle />
              </View>

              <View>
                <MediaSettings />
              </View>
            </View>

            <View className="mt-3 flex items-end text-right">
              {currentServer?.name && (
                <Text className="text-gray-300" variant="md" numberOfLines={1}>
                  {currentServer.name}
                </Text>
              )}

              {currentModuleId && (
                <Text variant="md" weight="semibold" className="uppercase">
                  {currentModuleId}
                </Text>
              )}

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
