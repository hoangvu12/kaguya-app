import React from 'react';
import { Else, If, Then } from 'react-if';

import { ActivityIndicator, Text, View } from '@/ui';
import Sticker from '@/ui/sticker';
import colors from '@/ui/theme/colors';

import ModuleItemAction from './components/module-item-action';
import useModules from './hooks/use-modules';

const InstalledModuleScreen = () => {
  const { data, isLoading } = useModules({ variables: null });

  if (isLoading) {
    return (
      <View className="flex items-center justify-center">
        <ActivityIndicator color={colors.primary[300]} size={48} />
      </View>
    );
  }

  return (
    <If condition={data?.length}>
      <Then>
        <View>
          {data?.map((module) => (
            <ModuleItemAction module={module} key={module.id} />
          ))}
        </View>
      </Then>

      <Else>
        <View className="flex w-full items-center">
          <Sticker name="shocked" className="h-24 w-24" />
          <Text variant="lg" className="mt-4 text-white">
            You haven't installed any modules yet.
          </Text>
        </View>
      </Else>
    </If>
  );
};

export default InstalledModuleScreen;
