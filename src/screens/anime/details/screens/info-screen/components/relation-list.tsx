import React from 'react';
import type { ViewProps } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import type { MediaConnection } from '@/types/anilist';
import { Text, View } from '@/ui';
import { Card } from '@/ui/card';

interface RelationListProps extends ViewProps {
  relations: MediaConnection;
}

const RelationList: React.FC<RelationListProps> = ({
  relations,
  className,
  ...props
}) => {
  return (
    <View className={className} {...props}>
      <Text variant="xl" className="mb-2">
        Relations
      </Text>

      <FlatList
        data={relations.edges}
        renderItem={({ item }) => (
          <Card
            media={item.node}
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
        keyExtractor={(item) => item.node.id.toString()}
        ItemSeparatorComponent={Spacer}
      />
    </View>
  );
};

const Spacer = () => {
  return <View className="mx-1.5" />;
};

export default RelationList;
