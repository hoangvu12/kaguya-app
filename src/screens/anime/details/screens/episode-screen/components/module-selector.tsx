import { PlusIcon } from 'lucide-react-native';
import { styled } from 'nativewind';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { Module } from '@/types';
import { Button, Image, Text, View } from '@/ui';
import type { ItemProps, SelectOption, TriggerProps } from '@/ui/core/select';
import Select from '@/ui/core/select';
import colors from '@/ui/theme/colors';

const modules: Module[] = [
  {
    name: 'AniWave',
    id: 'aniwave',
    languages: ['English'],
    isNSFW: false,
    logo: 'https://s2.bunnycdn.ru/assets/sites/aniwave/logo3.png',
  },
  {
    name: 'Bilibili',
    id: 'bilibili',
    languages: ['Tiếng Việt', 'English'],
    isNSFW: false,
    logo: 'https://p.bstarstatic.com/fe-static/deps/bilibili_tv.ico',
  },
];

const SPlusIcon = styled(PlusIcon);

const ModuleSelector = () => {
  const [selectedModule, setSelectedModule] = React.useState<
    Module | undefined
  >();

  return (
    <Select
      trigger={Trigger}
      onSelect={(option) => {
        setSelectedModule(option.value);
      }}
      placeholder="Select a module"
      options={modules.map((module) => ({ label: module.name, value: module }))}
      selectedOption={
        !selectedModule?.name
          ? undefined
          : { label: selectedModule.name, value: selectedModule }
      }
      option={ModuleOption}
      endOptionSlot={<AddModuleOption />}
      snapPoints={['80%']}
    />
  );
};

interface ModuleItemProps {
  option: SelectOption<Module>;
  onPress: () => void;
  className?: string;
}

const ModuleItem: React.FC<ModuleItemProps> = ({
  onPress,
  option,
  className,
}) => {
  return (
    <Button
      className={twMerge(
        'flex w-full items-center justify-start bg-thunder-700',
        className
      )}
      key={option.value.id}
      onPress={onPress}
    >
      <Image source={option.value.logo} className="mr-4 h-5 w-5" />

      <View>
        <Text variant="md" weight="semibold">
          {option.label}
        </Text>

        <Text variant="sm" weight="normal">
          {option.value.languages.join(', ')}
        </Text>
      </View>
    </Button>
  );
};

const ModuleOption: React.FC<
  Pick<ItemProps<Module>, 'option' | 'closeBottomSheet'>
> = ({ option, closeBottomSheet }) => {
  return <ModuleItem onPress={closeBottomSheet} option={option} />;
};

const AddModuleOption: React.FC = () => (
  <Button className="mt-2 flex items-center justify-start bg-thunder-700">
    <SPlusIcon className="mr-4" size={20} color={colors.white} />

    <View>
      <Text variant="md" weight="semibold">
        Add new modules
      </Text>
    </View>
  </Button>
);

const Trigger: React.FC<TriggerProps<Module>> = ({
  openBottomSheet,
  selectedOption,
  placeholder,
}) => {
  if (selectedOption) {
    return (
      <ModuleItem
        onPress={openBottomSheet}
        className="bg-thunder-900"
        option={selectedOption}
      />
    );
  }

  return (
    <Button
      className="w-full bg-thunder-900 px-4 py-3"
      onPress={openBottomSheet}
    >
      <Text>{placeholder || 'Select a module'}</Text>
    </Button>
  );
};

export default ModuleSelector;
