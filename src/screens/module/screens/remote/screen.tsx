import { useAtomValue } from 'jotai/react';
import React from 'react';

import { View } from '@/ui';

import AddIndex from './components/add-index';
import IndexItem from './components/index-item';
import { indexListAtom } from './store';

const RemoteModuleScreen = () => {
  const indexList = useAtomValue(indexListAtom);

  return (
    <View className="flex w-full items-center space-y-2">
      {indexList.map((repo) => (
        <IndexItem index={repo} key={repo.author + repo.name} />
      ))}

      <AddIndex />
    </View>
  );
};

export default RemoteModuleScreen;
