import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { SettingsIcon } from 'lucide-react-native';
import React, { useRef } from 'react';

import { View } from '@/ui';
import colors from '@/ui/theme/colors';

import MediaPlayBackSettings from './media-playback-settings';
import MediaQualitySettings from './media-quality-settings';
import MediaSubtitleSettings from './media-subtitle-settings';
import SettingsBottomSheet from './settings-bottom-sheet';
import Tappable from './tappable';

const MediaSettings = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  return (
    <View>
      <Tappable
        onPress={() => {
          bottomSheetRef.current?.present();
        }}
      >
        <View className="ml-auto bg-transparent p-0">
          <SettingsIcon size={28} color={colors.white} />
        </View>
      </Tappable>

      <SettingsBottomSheet ref={bottomSheetRef}>
        <MediaQualitySettings />
        <MediaPlayBackSettings />
        <MediaSubtitleSettings />
      </SettingsBottomSheet>
    </View>
  );
};

export default MediaSettings;
