import { useAtomValue } from 'jotai/react';
import { FastForwardIcon } from 'lucide-react-native';
import React from 'react';

import { Text, View } from '@/ui';

import { isFastForwardingAtom } from '../store';

const MediaFastForwardIndicator = () => {
  const [containerWidth, setContainerWidth] = React.useState(0);
  const isFastForwarding = useAtomValue(isFastForwardingAtom);

  return (
    <View
      onLayout={(event) => {
        setContainerWidth(event.nativeEvent.layout.width);
      }}
      className="absolute top-2 z-50 flex flex-row items-center justify-center self-start rounded-md bg-black/60 px-2 py-1"
      style={{
        left: '50%',
        transform: [{ translateX: -containerWidth / 2 }],
        opacity: isFastForwarding ? 1 : 0,
      }}
    >
      <Text className="mr-1 text-white">2x</Text>

      <FastForwardIcon size={16} color="white" />
    </View>
  );
};

export default MediaFastForwardIndicator;
