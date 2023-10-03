import { CheckIcon, XIcon } from 'lucide-react-native';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { Module } from '@/types';
import { Button, View } from '@/ui';
import type { ModuleItemProps } from '@/ui/module-item';
import ModuleItem from '@/ui/module-item';

interface InstallableModuleProps extends ModuleItemProps {
  onInstall?: () => Promise<void>;
  onCancel?: () => void;
  module: Module;
  className?: string;
}

const InstallableModule: React.FC<InstallableModuleProps> = ({
  onCancel,
  onInstall,
  module,
  className,
  ...moduleItemProps
}) => {
  return (
    <View key={module.id + module.info.author}>
      <ModuleItem
        module={module}
        className={twMerge('mb-4', className)}
        {...moduleItemProps}
      />

      <View className="flex flex-row items-center justify-end gap-2">
        <Button onPress={onInstall}>
          <CheckIcon size={20} color="white" />
        </Button>

        <Button onPress={onCancel} className="bg-gray-600">
          <XIcon size={20} color="white" />
        </Button>
      </View>
    </View>
  );
};

export default InstallableModule;
