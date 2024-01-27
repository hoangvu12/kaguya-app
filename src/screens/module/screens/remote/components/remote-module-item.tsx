import { useQueryClient } from '@tanstack/react-query';
import * as FileSystem from 'expo-file-system';
import { ArrowDownToLine, Check } from 'lucide-react-native';
import React from 'react';
import Toast from 'react-native-toast-message';

import useModules from '@/hooks/use-modules';
import type { Module } from '@/types';
import { ActivityIndicator, Button, View } from '@/ui';
import ModuleItem from '@/ui/module-item';
import { parseKModule, processKModule } from '@/utils/module';

interface RemoteModuleItemProps {
  hasInstalled?: boolean;
  module: Module & { url: string };
  hasNewVersion?: boolean;
}

const RemoteModuleItem: React.FC<RemoteModuleItemProps> = ({
  hasInstalled,
  module,
  hasNewVersion,
}) => {
  const [isInstalling, setInstalling] = React.useState(false);

  const queryClient = useQueryClient();

  const install = async () => {
    try {
      if (hasInstalled) return;

      setInstalling(true);

      const downloadPath = `${FileSystem.cacheDirectory}${module.name}.kmodule`;

      await FileSystem.downloadAsync(module.url, downloadPath);

      const { path } = await parseKModule(downloadPath);

      await processKModule(module.id, path);

      queryClient.invalidateQueries(useModules.getKey(), { type: 'all' });

      Toast.show({
        text2: `Successfully installed module ${module.name}`,
        type: 'success',
      });

      setInstalling(false);
    } catch (error: any) {
      Toast.show({ text1: 'Error', type: 'error', text2: error.message });

      setInstalling(false);
    }
  };

  return (
    <View className="relative flex flex-row items-center gap-4 bg-thunder-700">
      <ModuleItem className="grow bg-thunder-700" module={module} />

      <Button onPress={install} className="shrink-0 bg-transparent p-3">
        {hasInstalled && !hasNewVersion ? (
          <Check size={24} color="white" />
        ) : isInstalling ? (
          <ActivityIndicator size={24} color="white" />
        ) : (
          <ArrowDownToLine size={24} color="white" />
        )}
      </Button>

      {hasNewVersion && (
        <View className="absolute right-2 top-2 h-3 w-3 rounded-full bg-red-500" />
      )}
    </View>
  );
};

export default RemoteModuleItem;
