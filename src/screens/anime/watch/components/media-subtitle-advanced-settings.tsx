import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Settings2Icon } from 'lucide-react-native';
import React, { useRef } from 'react';

import { Text, View } from '@/ui';

import SettingsBottomSheet from './settings-bottom-sheet';
import MediaSubtitleBackgroundColor from './subtitle-settings/media-subtitle-background-color';
import MediaSubtitleBackgroundOpacity from './subtitle-settings/media-subtitle-background-opacity';
import MediaSubtitleColor from './subtitle-settings/media-subtitle-color';
import MediaSubtitleOpacity from './subtitle-settings/media-subtitle-opacity';
import MediaSubtitleReset from './subtitle-settings/media-subtitle-reset';
import MediaSubtitleSize from './subtitle-settings/media-subtitle-size';
import Tappable from './tappable';

const MediaSubtitleAdvancedSettings = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  return (
    <React.Fragment>
      <Tappable onPress={() => bottomSheetRef.current?.present()}>
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center px-4 py-2">
            <Settings2Icon
              size={24}
              color="white"
              className="h-6 w-6 text-white"
            />

            <Text variant="lg" weight="semibold" className="ml-2">
              Subtitle settings
            </Text>
          </View>
        </View>
      </Tappable>

      <SettingsBottomSheet
        canGoBack
        goBackTitle="Subtitles"
        ref={bottomSheetRef}
      >
        <View className="pb-16">
          <MediaSubtitleSize />
          <MediaSubtitleColor />
          <MediaSubtitleOpacity />
          <MediaSubtitleBackgroundColor />
          <MediaSubtitleBackgroundOpacity />

          <MediaSubtitleReset />
        </View>
      </SettingsBottomSheet>
    </React.Fragment>
  );
};

export default MediaSubtitleAdvancedSettings;
