import { useAtomValue } from 'jotai/react';
import React from 'react';

import { View } from '@/ui';

import { isSlidingAtom } from '../store';
import BackwardButton from './backward-button';
import ForwardButton from './forward-button';
import PlayPauseButton from './play-pause-button';

const MediaControls = () => {
  const isSliding = useAtomValue(isSlidingAtom);

  if (isSliding) return null;

  return (
    <View className="absolute flex h-full w-full items-center justify-center opacity-100">
      <View className="flex flex-row items-center">
        <BackwardButton />
        <PlayPauseButton />
        <ForwardButton />
      </View>
    </View>
  );
};

export default React.memo(MediaControls);
