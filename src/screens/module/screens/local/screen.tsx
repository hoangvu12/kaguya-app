import { useQueryClient } from '@tanstack/react-query';
import * as DocumentPicker from 'expo-document-picker';
import { UploadCloudIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { showMessage } from 'react-native-flash-message';

import useModules from '@/hooks/use-modules';
import type { Module } from '@/types';
import { Button, Text, View } from '@/ui';
import colors from '@/ui/theme/colors';
import { parseKModule, processKModule } from '@/utils/module';

import InstallableModule from './components/installable-module';

interface ModuleWithPath extends Module {
  path: string;
}

const LocalModuleScreen = () => {
  const [modules, setModules] = useState<ModuleWithPath[]>([]);
  const queryClient = useQueryClient();

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();

      if (result.canceled) return;

      const { uri } = result.assets[0];

      const { metadata, path } = await parseKModule(uri);

      setModules((prev) => [...prev, { ...metadata, path }]);
    } catch (error: any) {
      showMessage({ message: error.message, type: 'danger' });
    }
  };

  const handleInstall = async (module: ModuleWithPath) => {
    await processKModule(module.id, module.path);

    queryClient.invalidateQueries(useModules.getKey());

    showMessage({
      message: `Successfully installed module ${module.name}`,
      type: 'success',
    });
  };

  const handleRemove = async (module: ModuleWithPath) => {
    setModules((prev) =>
      prev.filter(
        (item) =>
          item.id !== module.id && item.info.author !== module.info.author
      )
    );
  };

  return (
    <>
      <Button
        className="flex h-40 w-full flex-col items-center justify-center bg-thunder-950"
        style={{
          borderWidth: 2,
          borderStyle: 'dashed',
          borderColor: colors.primary[300],
          borderTopColor: 'white',
          borderRadius: 1,
        }}
        onPress={handleUpload}
      >
        <UploadCloudIcon size={48} color={colors.primary[300]} />

        <Text variant="md" className="mt-1 text-primary-300">
          Upload your module
        </Text>
      </Button>

      {modules.length ? (
        <View className="mt-8">
          {modules.map((module) => (
            <InstallableModule
              onInstall={async () => {
                await handleInstall(module);

                handleRemove(module);
              }}
              onCancel={() => handleRemove(module)}
              module={module}
              key={module.id + module.info.author}
              logo={`${module.path}/logo.png`}
              className="bg-thunder-800"
            />
          ))}
        </View>
      ) : null}
    </>
  );
};

export default LocalModuleScreen;
