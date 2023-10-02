import { PlusIcon } from 'lucide-react-native';
import { styled } from 'nativewind';
import React, { useEffect } from 'react';

import { useWebView } from '@/contexts/webview';
import searchCode from '@/mock_data/module/search';
import type { Module } from '@/types';
import { Button, Text, View } from '@/ui';
import type { ItemProps, TriggerProps } from '@/ui/core/select';
import Select from '@/ui/core/select';
import ModuleItem from '@/ui/module-item';
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

  const { sendMessage, isLoaded } = useWebView();

  useEffect(() => {
    if (!isLoaded) return;

    (async () => {
      const searchResults = await sendMessage(
        'get-search-results',
        searchCode,
        {
          query: 'One Piece',
        }
      );

      console.log(searchResults);
    })();
  }, [sendMessage, isLoaded]);

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

const ModuleOption: React.FC<
  Pick<ItemProps<Module>, 'option' | 'closeBottomSheet'>
> = ({ option, closeBottomSheet }) => {
  return (
    <ModuleItem
      onPress={closeBottomSheet}
      module={option.value}
      key={option.value.id}
    />
  );
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
        module={selectedOption.value}
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
