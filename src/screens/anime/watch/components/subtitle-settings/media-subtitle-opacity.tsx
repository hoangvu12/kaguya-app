import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useAtom } from 'jotai/react';
import { CheckIcon, PaletteIcon } from 'lucide-react-native';
import React, { useRef } from 'react';

import { Text, TouchableOpacity, View } from '@/ui';

import { subtitleFontOpacityAtom } from '../../store';
import SettingsBottomSheet from '../settings-bottom-sheet';
import Tappable from '../tappable';

const opacityList = [0, 0.25, 0.5, 0.75, 1];

const MediaSubtitleOpacity = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [fontOpacity, setFontOpacity] = useAtom(subtitleFontOpacityAtom);

  return (
    <React.Fragment>
      <Tappable onPress={() => bottomSheetRef.current?.present()}>
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center px-4 py-2">
            <PaletteIcon
              size={24}
              color="white"
              className="h-6 w-6 text-white"
            />

            <Text variant="lg" weight="semibold" className="ml-2">
              Font opacity
            </Text>

            <Text className="ml-4 h-1.5 w-1.5 rounded-full bg-thunder-400" />

            <Text variant="lg" className="ml-4 text-gray-300">
              {fontOpacity * 100 + '%'}
            </Text>
          </View>
        </View>
      </Tappable>

      <SettingsBottomSheet
        canGoBack
        goBackTitle="Subtitles settings"
        ref={bottomSheetRef}
      >
        <View className="pb-16">
          {opacityList.map((opacity) => (
            <TouchableOpacity
              key={opacity}
              onPress={() => {
                setFontOpacity(opacity);
              }}
              className="flex flex-row items-center justify-between px-4 py-2"
            >
              <Text variant="lg" weight="semibold" className="ml-2">
                {opacity * 100 + '%'}
              </Text>

              {opacity === fontOpacity && <CheckIcon size={24} color="white" />}
            </TouchableOpacity>
          ))}
        </View>
      </SettingsBottomSheet>
    </React.Fragment>
  );
};

export default MediaSubtitleOpacity;
