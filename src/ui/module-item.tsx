import { HistoryIcon, UserIcon } from 'lucide-react-native';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { Module } from '@/types';
import { getModuleFilePath } from '@/utils/module';

import type { ButtonProps } from './core';
import { Button, Image, Text, View } from './core';

export interface ModuleItemProps extends ButtonProps {
  module: Module;
  onPress?: () => void;
  className?: string;
  logo?: string;
}

const ModuleItem: React.FC<ModuleItemProps> = ({
  onPress,
  module,
  className,
  logo = getModuleFilePath(module.id, 'logo.png'),
  ...props
}) => {
  return (
    <Button
      className={twMerge(
        'flex flex-row items-start justify-between rounded-md',
        className
      )}
      key={module.id}
      onPress={onPress}
      {...props}
    >
      <View className="flex flex-row items-center justify-start">
        <Image source={logo} className="h-5 w-5" />

        <View className="ml-4">
          <Text variant="md" weight="semibold">
            {module.name}
          </Text>

          <Text variant="sm" weight="normal">
            {module.languages.slice(0, 2).join(', ')}
          </Text>

          <Text variant="xs" weight="normal" className="text-gray-300">
            {module.info.description}
          </Text>
        </View>
      </View>

      <View>
        <View className="flex flex-row items-center">
          <View className="mr-1">
            <UserIcon size={14} color="white" />
          </View>

          <Text variant="sm" weight="normal">
            {module.info.author}
          </Text>
        </View>

        <View className="flex flex-row items-center">
          <View className="mr-1">
            <HistoryIcon size={14} color="white" />
          </View>

          <Text variant="sm" weight="normal">
            {module.version}
          </Text>
        </View>
      </View>
    </Button>
  );
};

export default ModuleItem;
