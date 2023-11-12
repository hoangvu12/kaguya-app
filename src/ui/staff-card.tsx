import React from 'react';

import type { FragmentType } from '@/gql';
import { graphql, useFragment } from '@/gql';

import { Image, Text, TouchableOpacity, View } from './core';

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
    <TouchableOpacity className="w-28">
      <View className="mb-1.5 aspect-[2/3] w-full rounded-md">
        <Image
          source={{ uri: node!.image!.large! }}
          className="h-full w-full rounded-md"
          contentFit="cover"
        />
      </View>

      <Text variant="md" numberOfLines={1} weight="semibold">
        {node!.name!.userPreferred}
      </Text>

      <Text variant="xs" numberOfLines={1} className="text-gray-400">
        {staffEdge.role!}
      </Text>
    </TouchableOpacity>
  );
};

export default StaffCard;
