import {
  type BottomSheetModal,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { useAtom } from 'jotai/react';
import { CheckIcon, GaugeIcon } from 'lucide-react-native';
import React, { useRef } from 'react';

import { Text, TouchableOpacity, View } from '@/ui';

import { playBackRateAtom } from '../store';
import SettingsBottomSheet from './settings-bottom-sheet';
import Tappable from './tappable';

const playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

const MediaPlayBackSettings = () => {
  const [playbackRate, setPlayBackRate] = useAtom(playBackRateAtom);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { dismissAll } = useBottomSheetModal();

  return (
    <React.Fragment>
      <Tappable onPress={() => bottomSheetRef.current?.present()}>
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center px-4 py-2">
            <GaugeIcon size={32} color="white" className="h-8 w-8 text-white" />

            <Text variant="lg" weight="semibold" className="ml-2">
              Playback rate
            </Text>

            <Text className="ml-4 h-1.5 w-1.5 rounded-full bg-thunder-400" />

            <Text variant="lg" className="ml-4 text-gray-300">
              {playbackRate}x
            </Text>
          </View>
        </View>
      </Tappable>

      <SettingsBottomSheet canGoBack ref={bottomSheetRef}>
        <View className="pb-16">
          {playbackRates.map((rate) => (
            <TouchableOpacity
              key={rate}
              onPress={() => {
                setPlayBackRate(rate);

                dismissAll();
              }}
              className="flex flex-row items-center justify-between px-4 py-2"
            >
              <Text variant="lg" weight="semibold" className="ml-2">
                {rate}x
              </Text>

              {rate === playbackRate && <CheckIcon size={24} color="white" />}
            </TouchableOpacity>
          ))}
        </View>
      </SettingsBottomSheet>
    </React.Fragment>
  );
};

export default MediaPlayBackSettings;
