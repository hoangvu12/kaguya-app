import { useAtomValue } from 'jotai/react';
import React from 'react';

import { ActivityIndicator } from '@/ui';

import { isBufferingAtom, isOverlayVisibleAtom } from '../store';

const INDICATOR_SIZE = 80;

const BufferingIndicator = () => {
  const isBuffering = useAtomValue(isBufferingAtom);
  const isOverlayVisible = useAtomValue(isOverlayVisibleAtom);

  if (!isBuffering || isOverlayVisible) return null;

  return (
    <ActivityIndicator
      size={INDICATOR_SIZE}
      color="white"
      className="absolute top-1/2 left-1/2 z-50"
      style={{
        transform: [
          {
            translateX: -INDICATOR_SIZE / 2,
          },
          {
            translateY: -INDICATOR_SIZE / 2,
          },
        ],
      }}
    />
  );
};

export default BufferingIndicator;
