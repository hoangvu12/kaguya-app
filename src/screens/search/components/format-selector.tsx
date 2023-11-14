import { useAtom, useAtomValue } from 'jotai/react';
import { ChevronDown } from 'lucide-react-native';
import React from 'react';

import { MediaFormat, MediaType } from '@/gql/graphql';
import { Text } from '@/ui';
import Pressable from '@/ui/core/pressable';
import Select from '@/ui/core/select';

import { formatAtom, mediaTypeAtom } from '../store';

const animeFormatOptions = [
  {
    label: 'TV Show',
    value: MediaFormat.Tv,
  },
  {
    label: 'Movie',
    value: MediaFormat.Movie,
  },
  {
    label: 'TV Short',
    value: MediaFormat.TvShort,
  },
  {
    label: 'Special',
    value: MediaFormat.Special,
  },
  {
    label: 'OVA',
    value: MediaFormat.Ova,
  },
  {
    label: 'ONA',
    value: MediaFormat.Ona,
  },
  {
    label: 'Music',
    value: MediaFormat.Music,
  },
];

const mangaFormatOptions = [
  {
    label: 'Manga',
    value: MediaFormat.Manga,
  },
  {
    label: 'Novel',
    value: MediaFormat.Novel,
  },
  {
    label: 'One Shot',
    value: MediaFormat.OneShot,
  },
];

const formatValueToOption = (value: MediaFormat | undefined) => {
  if (value === undefined) return undefined;

  return animeFormatOptions.find((option) => option.value === value);
};

const FormatSelector = () => {
  const [format, setFormat] = useAtom(formatAtom);
  const mediaType = useAtomValue(mediaTypeAtom);

  return (
    <Select
      selectedOption={formatValueToOption(format)}
      onSelect={(option) => {
        setFormat(option.value);
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
      placeholder="Format"
      options={
        mediaType === MediaType.Anime ? animeFormatOptions : mangaFormatOptions
      }
      snapPoints={['80%']}
    />
  );
};

export default FormatSelector;
