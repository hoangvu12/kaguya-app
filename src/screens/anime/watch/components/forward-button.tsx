import { useAtomValue } from 'jotai/react';
import React from 'react';

import { View } from '@/ui';
import SeekForwardIcon from '@/ui/icons/seek-forward';

import { currentTimeAtom, playerAtom } from '../store';
import Tappable from './tappable';

const ForwardButton = () => {
  const player = useAtomValue(playerAtom);
  const currentTime = useAtomValue(currentTimeAtom);

  const handleSeek = () => {
    player?.seek(currentTime + 10);
  };

  return (
    <Tappable onPress={handleSeek}>
      <View className="bg-transparent">
        <SeekForwardIcon className="h-12 w-12 text-white" />
      </View>
    </Tappable>
  );
};

export default ForwardButton;
