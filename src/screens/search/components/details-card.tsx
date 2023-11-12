import { HeartIcon, SmileIcon } from 'lucide-react-native';
import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import { formatNumberToAbbreviated } from '@/core';
import type { Media } from '@/types/anilist';
import { Text, View } from '@/ui';
import { PlainCard } from '@/ui/plain-card';

interface DetailsCardProps {
  media: Media;
}

const DetailsCard: React.FC<DetailsCardProps> = ({ media }) => {
  return (
    <TouchableOpacity>
      <View className="flex flex-row rounded-md bg-thunder-900">
        <PlainCard className="w-20" media={media} />
        <View className="flex-1 p-2">
          <Text numberOfLines={2} weight="semibold" variant="md">
            {media.title.userPreferred}
          </Text>
          <View className="mt-0.5 flex flex-row items-center space-x-2">
            <View className="flex flex-row items-center">
              <SmileIcon size={20} color="#22c55e" />
              <Text className="ml-1" variant="md">
                {media.averageScore}%
              </Text>
            </View>
            <View className="flex flex-row items-center">
              <HeartIcon size={20} fill="#ef4444" color="#ef4444" />
              <Text className="ml-1" variant="md">
                {formatNumberToAbbreviated(media.favourites)}
              </Text>
            </View>
          </View>
          <View className="mt-1">
            <FlatList
              contentContainerStyle={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              data={media.genres}
              renderItem={({ item: genre }) => (
                <Text weight="normal" variant="md">
                  {genre}
                </Text>
              )}
              keyExtractor={(item) => item}
              horizontal
              ItemSeparatorComponent={() => (
                <Text className="mx-1 text-gray-300">-</Text>
              )}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DetailsCard;
