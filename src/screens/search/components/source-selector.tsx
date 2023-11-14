import { useAtom } from 'jotai/react';
import { ChevronDown } from 'lucide-react-native';
import React from 'react';

import { MediaSource } from '@/gql/graphql';
import { Text } from '@/ui';
import Pressable from '@/ui/core/pressable';
import Select from '@/ui/core/select';

import { sourceAtom } from '../store';

const sourceOptions = [
  { label: 'Original', value: MediaSource.Original },
  { label: 'Manga', value: MediaSource.Manga },
  { label: 'Light Novel', value: MediaSource.LightNovel },
  { label: 'Visual Novel', value: MediaSource.VisualNovel },
  { label: 'Video Game', value: MediaSource.VideoGame },
  { label: 'Other', value: MediaSource.Other },
  { label: 'Novel', value: MediaSource.Novel },
  { label: 'Doujinshi', value: MediaSource.Doujinshi },
  { label: 'Anime', value: MediaSource.Anime },
  { label: 'Web Novel', value: MediaSource.WebNovel },
  { label: 'Live Action', value: MediaSource.LiveAction },
  { label: 'Game', value: MediaSource.Game },
  { label: 'Comic', value: MediaSource.Comic },
  { label: 'Multimedia Project', value: MediaSource.MultimediaProject },
  { label: 'Picture Book', value: MediaSource.PictureBook },
];

const sourceValueToOption = (value: MediaSource | undefined) => {
  if (value === undefined) return undefined;

  return sourceOptions.find((option) => option.value === value);
};

const SourceSelector = () => {
  const [source, setSource] = useAtom(sourceAtom);

  return (
    <Select
      selectedOption={sourceValueToOption(source)}
      onSelect={(option) => {
        setSource(option.value);
      }}
      trigger={({ selectedOption, openBottomSheet, placeholder }) => {
        return (
          <Pressable
            onPress={openBottomSheet}
            className="flex flex-row items-center justify-between rounded-md bg-thunder-700 p-2"
          >
            <Text weight="semibold" onPress={openBottomSheet}>
              {selectedOption?.label || placeholder}
            </Text>

            <ChevronDown size={18} color="white" />
          </Pressable>
        );
      }}
      placeholder="Source"
      options={sourceOptions}
      snapPoints={['80%']}
    />
  );
};

export default SourceSelector;
