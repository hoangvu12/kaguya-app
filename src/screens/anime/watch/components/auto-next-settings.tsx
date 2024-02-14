import { useAtom } from 'jotai/react';
import { ToggleLeft } from 'lucide-react-native';
import React from 'react';

import { shouldAutoNextEpisodeAtom } from '@/screens/settings/store';
import { Text, View } from '@/ui';
import Switch from '@/ui/core/switch';

const AutoNextSettings = () => {
  const [shouldAutoNextEpisode, setShouldAutoNextEpisode] = useAtom(
    shouldAutoNextEpisodeAtom
  );

  return (
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-row items-center px-4 py-2">
        <ToggleLeft size={32} color="white" className="h-8 w-8 text-white" />

        <Text variant="lg" weight="semibold" className="ml-2">
          Automatically next episode
        </Text>

        <Text className="ml-4 h-1.5 w-1.5 rounded-full bg-thunder-400" />

        <Switch
          value={shouldAutoNextEpisode}
          onValueChange={setShouldAutoNextEpisode}
        />
      </View>
    </View>
  );
};

export default AutoNextSettings;
