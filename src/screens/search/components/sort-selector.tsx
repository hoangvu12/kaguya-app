import { useAtom } from 'jotai/react';
import { ArrowDownZAIcon } from 'lucide-react-native';
import React from 'react';

import { MediaSort } from '@/gql/graphql';
import { Text } from '@/ui';
import Pressable from '@/ui/core/pressable';
import Select from '@/ui/core/select';

import { sortAtom } from '../store';

const mediaSortOptions = [
  {
    label: 'Popularity',
    value: MediaSort.PopularityDesc,
  },
  {
    label: 'Average Score',
    value: MediaSort.ScoreDesc,
  },
  {
    label: 'Trending',
    value: MediaSort.TrendingDesc,
  },
  {
    label: 'Favourites',
    value: MediaSort.FavouritesDesc,
  },
  {
    label: 'Date Added',
    value: MediaSort.IdDesc,
  },
  {
    label: 'Release Date',
    value: MediaSort.StartDateDesc,
  },
];

const mediaSortValueToOption = (value: MediaSort) => {
  return mediaSortOptions.find((option) => option.value === value);
};

const SortSelector = () => {
  const [sort, setSort] = useAtom(sortAtom);

  return (
    <Select
      snapPoints={['80%']}
      onSelect={(option) => {
        setSort(option.value);
      }}
      options={mediaSortOptions}
      selectedOption={mediaSortValueToOption(sort)}
      trigger={({ selectedOption, openBottomSheet, placeholder }) => {
        return (
          <Pressable
            onPress={openBottomSheet}
            className="flex flex-row items-center"
          >
            <ArrowDownZAIcon size={20} color="white" />

            <Text className="ml-2 text-base">
              {selectedOption?.label || placeholder}
            </Text>
          </Pressable>
        );
      }}
    />
  );
};

export default SortSelector;
