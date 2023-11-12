import { ArrowDownZAIcon } from 'lucide-react-native';
import React from 'react';

import { MediaSort } from '@/types/anilist';
import { Text, TouchableOpacity } from '@/ui';
import Select from '@/ui/core/select';

const mediaSortOptions = [
  {
    label: 'Popularity',
    value: MediaSort.Popularity_desc,
  },
  {
    label: 'Average Score',
    value: MediaSort.Score_desc,
  },
  {
    label: 'Trending',
    value: MediaSort.Trending_desc,
  },
  {
    label: 'Favourites',
    value: MediaSort.Favourites_desc,
  },
  {
    label: 'Date Added',
    value: MediaSort.Id_desc,
  },
  {
    label: 'Release Date',
    value: MediaSort.Start_date_desc,
  },
];

const mediaSortValueToOption = (value: MediaSort) => {
  return mediaSortOptions.find((option) => option.value === value);
};

const SortSelector = () => {
  return (
    <Select
      snapPoints={['80%']}
      options={mediaSortOptions}
      selectedOption={mediaSortValueToOption(MediaSort.Popularity_desc)}
      trigger={({ selectedOption, openBottomSheet, placeholder }) => {
        return (
          <TouchableOpacity
            onPress={openBottomSheet}
            className="flex flex-row items-center"
          >
            <ArrowDownZAIcon size={20} color="white" />

            <Text className="ml-2 text-base">
              {selectedOption?.label || placeholder}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default SortSelector;
