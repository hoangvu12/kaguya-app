import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useAtom } from 'jotai/react';
import { CheckIcon, PaletteIcon } from 'lucide-react-native';
import React, { useRef } from 'react';

import { Text, View } from '@/ui';
import Pressable from '@/ui/core/pressable';

import { subtitleFontColorAtom } from '../../store';
import SettingsBottomSheet from '../settings-bottom-sheet';
import Tappable from '../tappable';

const colors = [
  {
    label: 'White',
    value: 'rgb(255, 255, 255)',
  },
  {
    label: 'Yellow',
    value: 'rgb(255, 255, 0)',
  },
  {
    label: 'Green',
    value: 'rgb(0, 255, 0)',
  },
  {
    label: 'Cyan',
    value: 'rgb(0, 255, 255)',
  },
  {
    label: 'Blue',
    value: 'rgb(0, 0, 255)',
  },
  {
    label: 'Magenta',
    value: 'rgb(255, 0, 255)',
  },
  {
    label: 'Black',
    value: 'rgb(0, 0, 0)',
  },
];

const MediaSubtitleColor = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [fontColor, setFontColor] = useAtom(subtitleFontColorAtom);

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
              Font color
            </Text>

            <Text className="ml-4 h-1.5 w-1.5 rounded-full bg-thunder-400" />

            <Text variant="lg" className="ml-4 text-gray-300">
              {colors.find((color) => color.value === fontColor)?.label}
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
          {colors.map((color) => (
            <Pressable
              key={color.value}
              onPress={() => {
                setFontColor(color.value);
              }}
              className="flex flex-row items-center justify-between px-4 py-2"
            >
              <Text variant="lg" weight="semibold" className="ml-2">
                {color.label}
              </Text>

              {fontColor === color.value ? (
                <CheckIcon size={24} color="white" />
              ) : null}
            </Pressable>
          ))}
        </View>
      </SettingsBottomSheet>
    </React.Fragment>
  );
};

export default MediaSubtitleColor;
