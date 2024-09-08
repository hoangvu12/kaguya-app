import { useAtomValue } from 'jotai/react';
import React from 'react';

import { Text, View } from '@/ui';

import useTimestamps from '../hooks/use-timestamps';
import { currentTimeAtom, playerAtom, timestampsAtom } from '../store';
import Tappable from './tappable';

const SkipTimestampButton = () => {
  useTimestamps();

  const timestamps = useAtomValue(timestampsAtom);
  const currentTime = useAtomValue(currentTimeAtom);
  const player = useAtomValue(playerAtom);

  if (!timestamps?.length) return null;

  const timestamp = timestamps.find(
    (timestamp) =>
      timestamp.startTime <= currentTime && timestamp.endTime >= currentTime
  );

  if (!timestamp) return null;

  return (
    <View className="absolute right-4 bottom-12 z-50">
      <Tappable
        onPress={() => {
          player?.seek(timestamp.endTime);
        }}
      >
        <Text
          className="rounded-3xl bg-thunder-800 p-4 text-primary-300"
          weight="semibold"
        >
          Skip {timestamp.type}
        </Text>
      </Tappable>
    </View>
  );
};

export default SkipTimestampButton;
