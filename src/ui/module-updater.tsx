import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import axios from 'axios';
import { useAtomValue } from 'jotai/react';
import React, { useCallback, useEffect, useRef } from 'react';
import { ToastAndroid } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import IndexSchema from '@/core/remote-index';
import useModules from '@/hooks/use-modules';
import RemoteModuleItem from '@/screens/module/screens/remote/components/remote-module-item';
import type { IndexWithUrl } from '@/screens/module/screens/remote/store';
import { indexListAtom } from '@/screens/module/screens/remote/store';
import type { Module } from '@/types';

import { Text, View } from './core';
import BottomSheet from './core/bottom-sheet';

interface ModuleWithUrl extends Module {
  url: string;
}

const ModuleUpdater = () => {
  const indexList = useAtomValue(indexListAtom);
  const { data: modules, isLoading } = useModules({ variables: null });
  const [updatedModules, setUpdatedModules] = React.useState<ModuleWithUrl[]>(
    []
  );

  const bottomSheetRef = useRef<BottomSheetModal | null>(null);

  const refreshIndex = useCallback(async (index: IndexWithUrl) => {
    try {
      const { data } = await axios.get(index.url);

      const validation = IndexSchema.safeParse(data);

      if (!validation.success) {
        return;
      }

      return validation.data;
    } catch (error) {
      if (error instanceof Error) {
        ToastAndroid.show(
          `Something went wrong when updating the index (${error.message})`,
          ToastAndroid.SHORT
        );
      }
    }
  }, []);

  const checkIndex = useCallback(
    async (modules: Module[]) => {
      if (!modules?.length) return;

      const updatedModules: ModuleWithUrl[] = [];

      for (const index of indexList) {
        const validationData = await refreshIndex(index);

        if (!validationData?.modules?.length) continue;

        for (const module of modules) {
          const indexModule = validationData.modules.find(
            (m) =>
              m.name === module.name &&
              m.info.author === module.info.author &&
              m.version !== module.version
          );

          if (!indexModule) continue;

          updatedModules.push(indexModule);
        }
      }

      if (!updatedModules.length) return;

      setUpdatedModules(updatedModules);

      bottomSheetRef.current?.present();
    },
    [indexList, refreshIndex]
  );

  useEffect(() => {
    if (isLoading) return;

    if (!modules?.length) return;

    checkIndex(modules);
  }, [checkIndex, isLoading, modules]);

  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={['80%']}>
      <View className="pb-12">
        <Text className="mb-4 text-xl" weight="bold">
          New module update available
        </Text>

        <FlatList
          data={updatedModules}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <RemoteModuleItem hasNewVersion hasInstalled module={item} />
            );
          }}
          ItemSeparatorComponent={() => <View className="h-2" />}
        />
      </View>
    </BottomSheet>
  );
};

export default ModuleUpdater;
