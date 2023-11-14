import React from 'react';

import type { FragmentType } from '@/gql';
import { graphql, useFragment } from '@/gql';

import { Image, Text, View } from './core';
import Pressable from './core/pressable';

export const CharacterCardFragment = graphql(`
  fragment CharacterCard on CharacterEdge {
    node {
      id
      name {
        userPreferred
      }
      image {
        large
      }
    }
    role
  }
`);

interface CharacterCardProps {
  characterEdge: FragmentType<typeof CharacterCardFragment>;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  characterEdge: characterEdgeProps,
}) => {
  const characterEdge = useFragment(CharacterCardFragment, characterEdgeProps);

  const node = characterEdge?.node;

  return (
    <View className="w-28">
      <Pressable className="mb-1.5 aspect-[2/3] w-full rounded-md">
        <Image
          source={{ uri: node!.image!.large! }}
          className="h-full w-full rounded-md"
          contentFit="cover"
          key={node!.image!.large!}
        />
      </Pressable>

      <Pressable>
        <Text numberOfLines={1} variant="md" weight="semibold">
          {node!.name!.userPreferred}
        </Text>

        <Text
          numberOfLines={1}
          variant="xs"
          className="capitalize text-gray-400"
        >
          {characterEdge.role!}
        </Text>
      </Pressable>
    </View>
  );
};

export default CharacterCard;
