import React from 'react';

import type { CharacterEdge } from '@/types/anilist';

import { Image, Text, TouchableOpacity, View } from './core';

interface CharacterCardProps {
  characterEdge: CharacterEdge;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ characterEdge }) => {
  return (
    <TouchableOpacity className="w-28">
      <View className="mb-1.5 aspect-[2/3] w-full rounded-md">
        <Image
          source={{ uri: characterEdge.node.image.large }}
          className="h-full w-full rounded-md"
          contentFit="cover"
        />
      </View>

      <Text numberOfLines={1} variant="md" weight="semibold">
        {characterEdge.node.name.userPreferred}
      </Text>

      <Text numberOfLines={1} variant="xs" className="capitalize text-gray-400">
        {characterEdge.role}
      </Text>
    </TouchableOpacity>
  );
};

export default CharacterCard;
