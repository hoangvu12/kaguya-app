/* eslint-disable react-hooks/rules-of-hooks */
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import type { ViewProps } from 'react-native';

import type { FragmentType } from '@/gql';
import { graphql, useFragment } from '@/gql';
import { Text, View } from '@/ui';
import { Card, CardFragment } from '@/ui/card';

export const RelationListFragment = graphql(`
  fragment RelationListMedia on MediaEdge {
    relationType
    node {
      ...CardMedia
    }
  }
`);

interface RelationListProps extends ViewProps {
  relations: FragmentType<typeof RelationListFragment>[];
}

const RelationList: React.FC<RelationListProps> = ({
  relations: relationsProps,
  className,
  ...props
}) => {
  const relations = useFragment(RelationListFragment, relationsProps).filter(
    Boolean
  );

  if (!relations?.length) return null;

  return (
    <View className={className} {...props}>
      <Text variant="xl" className="mb-2">
        Relations
      </Text>

      <FlashList
        estimatedItemSize={112}
        data={relations}
        renderItem={({ item }) => (
          <Card
            shouldReplaceScreen
            media={item.node!}
            endSlot={
              <Text
                numberOfLines={1}
                variant="xs"
                className="capitalize text-gray-400"
              >
                {item.relationType}
              </Text>
            }
          />
        )}
        horizontal
        keyExtractor={(item) =>
          useFragment(CardFragment, item.node!).id.toString()
        }
        ItemSeparatorComponent={Spacer}
      />
    </View>
  );
};

const Spacer = () => {
  return <View className="mx-1.5" />;
};

export default RelationList;
