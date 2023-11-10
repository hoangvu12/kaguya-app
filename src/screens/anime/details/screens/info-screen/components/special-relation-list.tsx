import React from 'react';
import type { ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { type MediaConnection, MediaRelation } from '@/types/anilist';
import { Button, Image, Text, View } from '@/ui';

interface RelationListProps extends ViewProps {
  relations: MediaConnection;
}

const SpecialRelationList: React.FC<RelationListProps> = ({
  relations,
  className,
  ...props
}) => {
  const specialRelations = relations.edges.filter(
    (edge) =>
      edge.relationType === MediaRelation.Prequel ||
      edge.relationType === MediaRelation.Sequel
  );

  if (specialRelations.length === 0) return null;

  return (
    <View
      className={twMerge(
        'flex flex-row items-center justify-center gap-2',
        className
      )}
      {...props}
    >
      {specialRelations.map((edge) => (
        <Button
          key={edge.node.id}
          className="relative max-w-[240px] grow overflow-hidden px-8 py-3"
        >
          <Image
            source={edge.node.bannerImage || edge.node.coverImage.large}
            className="absolute inset-0"
          />

          <View className="absolute inset-0 bg-black/60" />

          <View className="relative">
            <Text variant="xl">
              {edge.relationType === MediaRelation.Prequel
                ? 'Prequel'
                : 'Sequel'}
            </Text>

            <View className="absolute -bottom-1 h-0.5 w-full bg-primary-300" />
          </View>
        </Button>
      ))}
    </View>
  );
};

export default SpecialRelationList;
