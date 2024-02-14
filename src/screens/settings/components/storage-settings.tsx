import { TrashIcon } from 'lucide-react-native';
import React from 'react';
import { ToastAndroid } from 'react-native';

import { clearWatchedEpisodes } from '@/storage/episode';
import { clearMappings } from '@/storage/media-id';
import { Button, Text, View } from '@/ui';

const StorageSettings = () => {
  const handleClearRecentlyData = () => {
    clearWatchedEpisodes();

    ToastAndroid.show('Cleared cache successfully', ToastAndroid.SHORT);
  };

  const handleClearMappingData = () => {
    clearMappings();

    ToastAndroid.show('Cleared cache successfully', ToastAndroid.SHORT);
  };

  return (
    <View>
      <Text className="mb-2 text-xl" weight="medium">
        Storage
      </Text>

      <View className="w-full space-y-4">
        <View className="flex w-full flex-row items-center justify-between">
          <View className="w-4/6">
            <Text weight="normal">Clear watched/read cache</Text>
            <Text weight="light" className="text-gray-200">
              Storing your recently episodes or chapters.
            </Text>
          </View>

          <Button onPress={handleClearRecentlyData}>
            <TrashIcon size={24} color="white" />
          </Button>
        </View>

        <View className="flex flex-row items-center justify-between">
          <View className="w-4/6">
            <Text weight="normal">Clear mapping cache</Text>
            <Text weight="light" className="text-gray-200">
              Storing mapping between module's media ID and AniList ID.
            </Text>
          </View>

          <Button onPress={handleClearMappingData}>
            <TrashIcon size={24} color="white" />
          </Button>
        </View>
      </View>
    </View>
  );
};

export default StorageSettings;
