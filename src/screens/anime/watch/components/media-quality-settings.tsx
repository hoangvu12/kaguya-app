import {
  type BottomSheetModal,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { useAtom, useAtomValue } from 'jotai/react';
import { CheckIcon } from 'lucide-react-native';
import React, { useRef } from 'react';

import { Text, TouchableOpacity, View } from '@/ui';
import QualityIcon from '@/ui/icons/quality';

import { currentQualityAtom, qualityListAtom } from '../store';
import SettingsBottomSheet from './settings-bottom-sheet';
import Tappable from './tappable';

const MediaQualitySettings = () => {
  const [currentQualiy, setCurrentQuality] = useAtom(currentQualityAtom);
  const qualityList = useAtomValue(qualityListAtom);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { dismissAll } = useBottomSheetModal();

  if (!qualityList.length) return null;

  return (
    <React.Fragment>
      <Tappable onPress={() => bottomSheetRef.current?.present()}>
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center px-4 py-2">
            <QualityIcon className="h-8 w-8 text-white" />

            <Text variant="lg" weight="semibold" className="ml-2">
              Quality
            </Text>

            <Text className="ml-4 h-1.5 w-1.5 rounded-full bg-thunder-400" />

            <Text variant="lg" className="ml-4 text-gray-300">
              {currentQualiy}
            </Text>
          </View>
        </View>
      </Tappable>

      <SettingsBottomSheet canGoBack ref={bottomSheetRef}>
        <View className="pb-16">
          {qualityList.map((quality, index) => (
            <TouchableOpacity
              key={`${currentQualiy} + ${index}`}
              onPress={() => {
                setCurrentQuality(quality);

                dismissAll();
              }}
              className="flex flex-row items-center justify-between px-4"
            >
              <Text variant="lg" weight="semibold" className="ml-2 py-2">
                {quality}
              </Text>

              {quality === currentQualiy && (
                <CheckIcon size={24} color="white" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </SettingsBottomSheet>
    </React.Fragment>
  );
};

export default MediaQualitySettings;
