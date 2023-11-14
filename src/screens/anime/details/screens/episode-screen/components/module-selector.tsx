import { useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai/react';
import { PlusIcon } from 'lucide-react-native';
import { styled } from 'nativewind';
import React, { useRef } from 'react';

import useModules from '@/hooks/use-modules';
import { currentModuleIdAtom } from '@/store';
import type { Module } from '@/types';
import { ActivityIndicator, Button, Text, View } from '@/ui';
import type { ItemProps, SelectRef, TriggerProps } from '@/ui/core/select';
import Select from '@/ui/core/select';
import ModuleItem from '@/ui/module-item';
import colors from '@/ui/theme/colors';

const SPlusIcon = styled(PlusIcon);

const ModuleSelector = () => {
  const [currentModuleId, setCurrentModuleId] = useAtom(currentModuleIdAtom);

  const selectRef = useRef<SelectRef>(null);

  const navigation = useNavigation();

  const { data: modules, isLoading } = useModules({ variables: null });

  const currentModule = modules?.find(
    (module) => module.id === currentModuleId
  );

  if (isLoading) {
    return (
      <View className="flex items-center justify-center">
        <ActivityIndicator color={colors.primary[300]} size={48} />
      </View>
    );
  }

  if (!modules?.length) {
    return (
      <Text variant="lg" className="mt-4 text-center text-white">
        You haven't installed any modules yet.
      </Text>
    );
  }

  return (
    <Select
      ref={selectRef}
      trigger={Trigger}
      onSelect={(option) => {
        console.log(option.value);

        setCurrentModuleId(option.value.id);
      }}
      placeholder="Select a module"
      options={modules.map((module) => ({ label: module.name, value: module }))}
      selectedOption={
        !currentModule
          ? undefined
          : { label: currentModule.name, value: currentModule }
      }
      option={ModuleOption}
      endOptionSlot={
        <AddModuleOption
          onPress={() => {
            // @ts-ignore
            navigation.getParent('tab-navigator')?.navigate('Module');

            selectRef.current?.closeMenu();
          }}
        />
      }
      snapPoints={['80%']}
    />
  );
};

const ModuleOption: React.FC<
  Pick<ItemProps<Module>, 'option' | 'closeBottomSheet' | 'onPress'>
> = ({ option, closeBottomSheet, onPress }) => {
  return (
    <ModuleItem
      onPress={() => {
        closeBottomSheet();
        onPress();
      }}
      module={option.value}
      key={option.value.id}
      className="bg-thunder-700"
    />
  );
};

interface AddModuleOptionProps {
  onPress?: () => void;
}

const AddModuleOption: React.FC<AddModuleOptionProps> = ({ onPress }) => {
  return (
    <Button
      onPress={onPress}
      className="mt-2 flex items-center justify-start bg-thunder-700"
    >
      <SPlusIcon className="mr-4" size={20} color={colors.white} />

      <View>
        <Text variant="md" weight="semibold">
          Add new modules
        </Text>
      </View>
    </Button>
  );
};

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
