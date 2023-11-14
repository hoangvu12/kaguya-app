import { useAtom } from 'jotai/react';
import { ChevronDown } from 'lucide-react-native';
import React from 'react';

import { MediaSeason } from '@/types/anilist';
import { Text } from '@/ui';
import Pressable from '@/ui/core/pressable';
import Select from '@/ui/core/select';

import { seasonAtom } from '../store';

const seasonOptions = [
  {
    label: 'Winter',
    value: MediaSeason.Winter,
  },
  {
    label: 'Spring',
    value: MediaSeason.Spring,
  },
  {
    label: 'Summer',
    value: MediaSeason.Summer,
  },
  {
    label: 'Fall',
    value: MediaSeason.Fall,
  },
];

const seasonValueToOption = (value: MediaSeason | undefined) => {
  if (value === undefined) return undefined;

  return seasonOptions.find((option) => option.value === value);
};

const SeasonSelector = () => {
  const [season, setSeason] = useAtom(seasonAtom);

  return (
    <Select
      selectedOption={seasonValueToOption(season)}
      onSelect={(option) => {
        setSeason(option.value);
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
      placeholder="Season"
      options={seasonOptions}
      snapPoints={['80%']}
    />
  );
};

export default SeasonSelector;
