import dayjs from 'dayjs';
import { useAtom } from 'jotai/react';
import { ChevronDown } from 'lucide-react-native';
import React from 'react';

import { Text, TouchableOpacity } from '@/ui';
import Select from '@/ui/core/select';

import { yearAtom } from '../store';

const START_YEAR = 1940;
const CURRENT_YEAR = dayjs().year();

const SEASON_YEARS = new Array(CURRENT_YEAR + 1 - START_YEAR)
  .fill(null)
  .map((_, index) => START_YEAR + index)
  .sort((a, b) => b - a);

const seasonYearOptions = SEASON_YEARS.map((year) => ({
  label: year.toString(),
  value: year,
}));

const seasonYearValueToOption = (value: number | undefined) => {
  if (value === undefined) return undefined;

  return seasonYearOptions.find((option) => option.value === value);
};

const YearSelector = () => {
  const [year, setYear] = useAtom(yearAtom);

  return (
    <Select
      selectedOption={seasonYearValueToOption(year)}
      onSelect={(option) => {
        setYear(option.value);
      }}
      trigger={({ selectedOption, openBottomSheet, placeholder }) => {
        return (
          <TouchableOpacity
            onPress={openBottomSheet}
            className="flex flex-row items-center justify-between rounded-md bg-thunder-700 p-2"
          >
            <Text weight="semibold" onPress={openBottomSheet}>
              {selectedOption?.label || placeholder}
            </Text>

            <ChevronDown size={18} color="white" />
          </TouchableOpacity>
        );
      }}
      placeholder="Year"
      options={seasonYearOptions}
      snapPoints={['80%']}
    />
  );
};

export default YearSelector;
