import { useAtom } from 'jotai/react';
import { ChevronDown } from 'lucide-react-native';
import React from 'react';

import { MediaType } from '@/types/anilist';
import { Text, View } from '@/ui';
import Pressable from '@/ui/core/pressable';
import Select from '@/ui/core/select';

import { mediaTypeAtom } from '../store';

const mediaTypeOptions = [
  { label: 'Anime', value: MediaType.Anime },
  { label: 'Manga', value: MediaType.Manga },
];

const mediaTypeValueToOption = (value: MediaType) => {
  return mediaTypeOptions.find((option) => option.value === value);
};

const MediaTypeSelector = () => {
  const [mediaType, setMediaType] = useAtom(mediaTypeAtom);

  return (
    <View className="flex flex-row items-center">
      <Text className="mr-2 text-2xl" weight="semibold">
        Search
      </Text>

      <Select
        options={mediaTypeOptions}
        selectedOption={mediaTypeValueToOption(mediaType)}
        trigger={({ selectedOption, openBottomSheet }) => {
          return (
            <Pressable
              onPress={openBottomSheet}
              className="flex flex-row items-center rounded-md bg-thunder-800 p-2"
            >
              <Text
                className="mr-1 text-2xl"
                weight="semibold"
                onPress={openBottomSheet}
              >
                {selectedOption?.label}
              </Text>

              <ChevronDown size={24} color="white" />
            </Pressable>
          );
        }}
        onSelect={(option) => {
          setMediaType(option.value);
        }}
      />
    </View>
  );
};

export default MediaTypeSelector;
