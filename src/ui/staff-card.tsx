import React from 'react';

import type { FragmentType } from '@/gql';
import { graphql, useFragment } from '@/gql';

import { Image, Text, View } from './core';
import Pressable from './core/pressable';

export const StaffCardFragment = graphql(`
  fragment StaffCard on StaffEdge {
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

interface StaffCardProps {
  staffEdge: FragmentType<typeof StaffCardFragment>;
}

const StaffCard: React.FC<StaffCardProps> = ({ staffEdge: staffEdgeProps }) => {
  const staffEdge = useFragment(StaffCardFragment, staffEdgeProps);

  const node = staffEdge?.node;

  if (!node) return null;

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
        <Text variant="md" numberOfLines={1} weight="semibold">
          {node!.name!.userPreferred}
        </Text>

        <Text variant="xs" numberOfLines={1} className="text-gray-400">
          {staffEdge.role!}
        </Text>
      </Pressable>
    </View>
  );
};

export default StaffCard;
