import { useQueryClient } from '@tanstack/react-query';
import * as FileSystem from 'expo-file-system';
import React from 'react';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

import { MODULE_DIR } from '@/constants';
import useModules from '@/hooks/use-modules';
import type { Module } from '@/types';
import { Button, Text, View } from '@/ui';
import type { ModuleItemProps } from '@/ui/module-item';
import ModuleItem from '@/ui/module-item';
import Sticker from '@/ui/sticker';

interface ModuleItemActionProps extends ModuleItemProps {}

const ModuleItemAction: React.FC<ModuleItemActionProps> = ({
  module,
  ...props
}) => {
  const [isModalVisible, setModalVisible] = React.useState(false);

  const queryClient = useQueryClient();

  const handleUninstallModule = async (uninstallModule: Module) => {
    const moduleDir = MODULE_DIR + `/${uninstallModule.id}`;

    await FileSystem.deleteAsync(moduleDir, { idempotent: true });

    Toast.show({
      type: 'success',
      text2: `Successfully uninstalled module ${uninstallModule.name}`,
    });
  };

  return (
    <React.Fragment>
      <ModuleItem
        module={module}
        onLongPress={() => {
          setModalVisible(true);
        }}
        className="bg-thunder-800"
        {...props}
      />

      <Modal isVisible={isModalVisible}>
        <View className="rounded-md bg-thunder-800 p-4">
          <Sticker name="begging" className="mx-auto mb-4 h-24 w-24" />

          <Text weight="semibold" variant="xl" className="mb-8 text-center">
            Are you sure you want to uninstall this module?
          </Text>

          <View className="flex items-center justify-end gap-2">
            <Button
              variant="primary"
              className="w-full"
              onPress={async () => {
                await handleUninstallModule(module);

                queryClient.invalidateQueries(useModules.getKey(), {
                  type: 'all',
                });

                setModalVisible(false);
              }}
            >
              <Text numberOfLines={1} weight="semibold">
                Yes, uninstall this module
              </Text>
            </Button>
            <Button
              className="w-full bg-gray-500"
              onPress={() => setModalVisible(false)}
            >
              <Text numberOfLines={1}>Cancel, keep this module</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
};

export default ModuleItemAction;
