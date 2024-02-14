import { useAtom, useAtomValue } from 'jotai/react';
import { MinusIcon, PlusIcon } from 'lucide-react-native';
import React, { memo, useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { Button, Text, View } from '@/ui';
import Switch from '@/ui/core/switch';

import {
  shouldAskForSyncingAtom,
  shouldAutoNextEpisodeAtom,
  shouldSyncAdultAtom,
  syncPercentageAtom,
} from '../store';

const PlayerSettings = () => {
  const [shouldAskForSyncing, setShouldAskForSyncing] = useAtom(
    shouldAskForSyncingAtom
  );
  const [shouldSyncAdult, setShouldSyncAdult] = useAtom(shouldSyncAdultAtom);
  const [shouldAutoNextEpisode, setShouldAutoNextEpisode] = useAtom(
    shouldAutoNextEpisodeAtom
  );
  const syncPercentage = useAtomValue(syncPercentageAtom);

  return (
    <View>
      <Text className="mb-2 text-xl" weight="medium">
        Player
      </Text>

      <View className="w-full space-y-4">
        <View className="flex w-full flex-row items-center justify-between">
          <View className="w-5/6">
            <Text weight="normal">Should ask for syncing</Text>
            <Text weight="light" className="text-gray-200">
              Ask for syncing before playing any media
            </Text>
          </View>

          <View>
            <Switch
              value={shouldAskForSyncing}
              onValueChange={setShouldAskForSyncing}
            />
          </View>
        </View>
        <View className="flex flex-row items-center justify-between">
          <View className="w-5/6">
            <Text weight="normal">Should sync adult</Text>
            <Text weight="light" className="text-gray-200">
              Allow syncing adult content
            </Text>
          </View>

          <Switch value={shouldSyncAdult} onValueChange={setShouldSyncAdult} />
        </View>
        <View className="flex flex-row items-center justify-between">
          <View className="w-5/6">
            <Text weight="normal">Should auto next episode</Text>
            <Text weight="light" className="text-gray-200">
              Automatically play the next episode once the video ends
            </Text>
          </View>

          <Switch
            value={shouldAutoNextEpisode}
            onValueChange={setShouldAutoNextEpisode}
          />
        </View>
        <View>
          <View className="mb-2 w-full">
            <Text weight="normal">
              Sync percentage ({Math.floor(syncPercentage * 100)}%)
            </Text>
            <Text weight="light" className="text-gray-300">
              Sync once the player progress reaches this percentage
            </Text>
          </View>

          <SyncPercentageSlider />
        </View>
      </View>
    </View>
  );
};

const AnimatedView = Animated.createAnimatedComponent(View);

const clamp = (value: number, lowerBound: number, upperBound: number) => {
  'worklet';

  return Math.min(Math.max(lowerBound, value), upperBound);
};

export const SyncPercentageSlider = memo(() => {
  const [syncPercentage, setSyncPercentage] = useAtom(syncPercentageAtom);
  const animateValue = useSharedValue(syncPercentage);
  const [containerWidth, setContainerWidth] = useState(0);

  const gesture = Gesture.Pan()
    .onStart((e) => {
      const x = e.x;

      animateValue.value = clamp(x / containerWidth, 0, 1);
    })
    .onUpdate((e) => {
      const x = e.x;

      animateValue.value = clamp(x / containerWidth, 0, 1);
    })
    .onFinalize((e) => {
      const x = e.x;

      const value = x / containerWidth;

      runOnJS(setSyncPercentage)(clamp(value, 0, 1));
    });

  const styles = useAnimatedStyle(() => {
    return {
      width: `${animateValue.value * 100}%`,
    };
  });

  return (
    <View className="flex flex-row">
      <GestureDetector gesture={gesture}>
        <View
          onLayout={(event) => {
            setContainerWidth(event.nativeEvent.layout.width);
          }}
          className="relative flex h-10 grow flex-row items-center rounded-md border border-neutral-400"
        >
          <AnimatedView
            className="absolute left-0 h-full overflow-hidden rounded-md bg-primary-500"
            style={styles}
          />
          <Text className="absolute left-4 z-10 text-gray-300">0%</Text>
          <Text className="absolute right-4 z-10 text-gray-300">100%</Text>
        </View>
      </GestureDetector>

      <Button
        variant="outline"
        onPress={() => {
          setSyncPercentage(syncPercentage + 0.01);
        }}
        className="mx-1 p-1"
      >
        <PlusIcon size={24} color="white" />
      </Button>

      <Button
        variant="outline"
        className="p-1"
        onPress={() => {
          setSyncPercentage(syncPercentage - 0.01);
        }}
      >
        <MinusIcon size={24} color="white" />
      </Button>
    </View>
  );
});

export default PlayerSettings;
