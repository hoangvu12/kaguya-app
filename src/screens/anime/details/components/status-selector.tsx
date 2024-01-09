import { ChevronDown } from 'lucide-react-native';
import React from 'react';

import { MediaListStatus } from '@/gql/graphql';
import { Text } from '@/ui';
import Pressable from '@/ui/core/pressable';
import Select from '@/ui/core/select';

const statusOptions = [
  {
    label: 'Current',
    value: MediaListStatus.Current,
  },
  {
    label: 'Planning',
    value: MediaListStatus.Planning,
  },
  {
    label: 'Completed',
    value: MediaListStatus.Completed,
  },
  {
    label: 'Dropped',
    value: MediaListStatus.Dropped,
  },
  {
    label: 'Paused',
    value: MediaListStatus.Paused,
  },
  {
    label: 'Repeating',
    value: MediaListStatus.Repeating,
  },
];

const statusValueToOption = (value: MediaListStatus | undefined) => {
  if (!value) return undefined;

  return statusOptions.find((option) => option.value === value);
};

interface StatusSelectorProps {
  onStatusChange?: (status: MediaListStatus) => void;
  status: MediaListStatus | undefined;
}

const StatusSelector: React.FC<StatusSelectorProps> = ({
  status,
  onStatusChange,
}) => {
  return (
    <Select
      placeholder="Status"
      snapPoints={['80%']}
      onSelect={(option) => {
        onStatusChange?.(option.value);
      }}
      options={statusOptions}
      selectedOption={statusValueToOption(status)}
      trigger={({ selectedOption, openBottomSheet, placeholder }) => {
        return (
          <Pressable
            onPress={openBottomSheet}
            className="flex w-full flex-row items-center justify-between rounded-lg border-2 border-thunder-500 px-3 py-2"
          >
            <Text className="ml-2 text-base">
              {selectedOption?.label || placeholder}
            </Text>

            <ChevronDown size={18} color="white" />
          </Pressable>
        );
      }}
    />
  );
};

export default StatusSelector;
