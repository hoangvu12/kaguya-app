import {
  type BottomSheetModal,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { useAtom, useAtomValue } from 'jotai/react';
import { CheckIcon } from 'lucide-react-native';
import React, { useRef } from 'react';

import { Text, View } from '@/ui';
import Pressable from '@/ui/core/pressable';
import SubtitleIcon from '@/ui/icons/subtitle';

import { currentSubtitleAtom, subtitleListAtom } from '../store';
import MediaSubtitleAdvancedSettings from './media-subtitle-advanced-settings';
import SettingsBottomSheet from './settings-bottom-sheet';
import Tappable from './tappable';

const MediaSubtitleSettings = () => {
  const [currentSubtitle, setCurrentSubtitle] = useAtom(currentSubtitleAtom);
  const subtitles = useAtomValue(subtitleListAtom);

  const { dismissAll } = useBottomSheetModal();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  return (
    <React.Fragment>
      <Tappable onPress={() => bottomSheetRef.current?.present()}>
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center px-4 py-2">
            <SubtitleIcon className="h-8 w-8 text-white" />

            <Text variant="lg" weight="semibold" className="ml-2">
              Subtitles
            </Text>

            <Text className="ml-4 h-1.5 w-1.5 rounded-full bg-thunder-400" />

            <Text variant="lg" className="ml-4 text-gray-300">
              {currentSubtitle?.language || 'Off'}
            </Text>
          </View>
        </View>
      </Tappable>

      <SettingsBottomSheet canGoBack ref={bottomSheetRef}>
        <View className="pb-16">
          <MediaSubtitleAdvancedSettings />

          <Pressable
            onPress={() => {
              setCurrentSubtitle(null);

              dismissAll();
            }}
            className="flex flex-row items-center justify-between px-4 py-2"
          >
            <Text variant="lg" weight="semibold" className="ml-2">
              Off
            </Text>

            {!currentSubtitle && <CheckIcon size={24} color="white" />}
          </Pressable>

          {subtitles.map((subtitle) => (
            <Pressable
              key={subtitle.language}
              onPress={() => {
                setCurrentSubtitle(subtitle);

                dismissAll();
              }}
              className="flex flex-row items-center justify-between px-4 py-2"
            >
              <Text variant="lg" weight="semibold" className="ml-2">
                {subtitle.language}
              </Text>

              {subtitle.language === currentSubtitle?.language && (
                <CheckIcon size={24} color="white" />
              )}
            </Pressable>
          ))}
        </View>
      </SettingsBottomSheet>
    </React.Fragment>
  );
};

export default MediaSubtitleSettings;
