import { useAtom } from 'jotai/react';
import { ChevronDown } from 'lucide-react-native';
import React from 'react';

import { Text } from '@/ui';
import Pressable from '@/ui/core/pressable';
import Select from '@/ui/core/select';

import { countryAtom, MediaCountry } from '../store';

const countryOptions = [
  {
    label: 'China',
    value: MediaCountry.China,
  },
  {
    label: 'South Korea',
    value: MediaCountry.South_Korea,
  },
  {
    label: 'Japan',
    value: MediaCountry.Japan,
  },
  {
    label: 'Taiwan',
    value: MediaCountry.Taiwan,
  },
];

const countryValueToOption = (value: MediaCountry | undefined) => {
  if (value === undefined) return undefined;

  return countryOptions.find((option) => option.value === value);
};

const CountrySelector = () => {
  const [country, setCountry] = useAtom(countryAtom);

  return (
    <Select
      selectedOption={countryValueToOption(country)}
      onSelect={(option) => {
        setCountry(option.value);
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
      placeholder="Country"
      options={countryOptions}
      snapPoints={['80%']}
    />
  );
};

export default CountrySelector;
