import { useAtom, useAtomValue } from 'jotai/react';
import React from 'react';

import { ActivityIndicator, View } from '@/ui';
import PauseIcon from '@/ui/icons/pause';
import PlayIcon from '@/ui/icons/play';

import { isBufferingAtom, pausedAtom } from '../store';
import Tappable from './tappable';

const PlayPauseButton = () => {
  const isBuffering = useAtomValue(isBufferingAtom);
  const [isPaused, setIsPaused] = useAtom(pausedAtom);

  const handlePlayPause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <React.Fragment>
      {isBuffering ? (
        <ActivityIndicator size={80} color="white" className="mx-12" />
      ) : (
        <Tappable onPress={handlePlayPause}>
          <View className="mx-12 h-20 w-20">
            {isPaused ? (
              <PlayIcon className="h-20 w-20 text-white" />
            ) : (
              <PauseIcon className="h-20 w-20 text-white" />
            )}
          </View>
        </Tappable>
      )}
    </React.Fragment>
  );
};

export default React.memo(PlayPauseButton);
