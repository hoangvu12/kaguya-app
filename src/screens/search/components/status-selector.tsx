import { useAtom } from 'jotai/react';
import { ChevronDown } from 'lucide-react-native';
import React from 'react';

import { MediaStatus } from '@/types/anilist';
import { Text, TouchableOpacity } from '@/ui';
import Select from '@/ui/core/select';

import { statusAtom } from '../store';

const statusOptions = [
  {
    label: 'Releasing',
    value: MediaStatus.Releasing,
  },
  {
    label: 'Finished',
    value: MediaStatus.Finished,
  },
  {
    label: 'Not Yet Released',
    value: MediaStatus.Not_yet_released,
  },
  {
    label: 'Hiatus',
    value: MediaStatus.Hiatus,
  },
  {
    label: 'Cancelled',
    value: MediaStatus.Cancelled,
  },
];

const statusValueToOption = (value: MediaStatus | undefined) => {
  if (value === undefined) return undefined;

  return statusOptions.find((option) => option.value === value);
};

const StatusSelector = () => {
  const [status, setStatus] = useAtom(statusAtom);

  return (
    <Select
      selectedOption={statusValueToOption(status)}
      onSelect={(option) => {
        setStatus(option.value);
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
      placeholder="Status"
      options={statusOptions}
      snapPoints={['80%']}
    />
  );
};

export default StatusSelector;
