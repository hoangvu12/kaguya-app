import React from 'react';

import type { StaffEdge } from '@/types/anilist';

import { Image, Text, TouchableOpacity, View } from './core';

interface StaffCardProps {
  staffEdge: StaffEdge;
}

const StaffCard: React.FC<StaffCardProps> = ({ staffEdge }) => {
  return (
    <TouchableOpacity className="w-28">
      <View className="mb-1.5 aspect-[2/3] w-full rounded-md">
        <Image
          source={{ uri: staffEdge.node.image.large }}
          className="h-full w-full rounded-md"
          contentFit="cover"
        />
      </View>

      <Text variant="md" numberOfLines={1} weight="semibold">
        {staffEdge.node.name.userPreferred}
      </Text>

      <Text variant="xs" numberOfLines={1} className="text-gray-400">
        {staffEdge.role}
      </Text>
    </TouchableOpacity>
  );
};

export default StaffCard;
