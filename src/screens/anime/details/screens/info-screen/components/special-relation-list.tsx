import { StackActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import type { ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { FragmentType } from '@/gql';
import { graphql, useFragment } from '@/gql';
import { MediaRelation } from '@/gql/graphql';
import { Button, Image, Text, View } from '@/ui';

export const SpecialRelationListFragment = graphql(`
  fragment SpecialRelationListMedia on MediaEdge {
    relationType
    node {
      id
      bannerImage
      coverImage {
        large
      }
    }
  }
`);

interface RelationListProps extends ViewProps {
  relations: FragmentType<typeof SpecialRelationListFragment>[];
}

const SpecialRelationList: React.FC<RelationListProps> = ({
  relations: relationsProps,
  className,
  ...props
}) => {
  const relations = useFragment(SpecialRelationListFragment, relationsProps);

  const navigation = useNavigation();

  const specialRelations = relations
    .filter(
      (relationEdge) =>
        relationEdge.relationType === MediaRelation.Prequel ||
        relationEdge.relationType === MediaRelation.Sequel
    )
    .filter(Boolean);

  if (specialRelations.length === 0) return null;

  const handleNavigate = (mediaId: number) => {
    navigation.dispatch(
      StackActions.replace('AnimeDetails', {
        mediaId,
      })
    );
  };

  return (
    <View
      className={twMerge(
        'flex flex-row items-center justify-center gap-2',
        className
      )}
      {...props}
    >
      {specialRelations.map((relationEdge) => {
        if (!relationEdge.node) return null;

        return (
          <Button
            onPress={() => {
              handleNavigate(relationEdge.node!.id);
            }}
            key={relationEdge.node.id}
            className="relative max-w-[240px] grow overflow-hidden px-8 py-3"
          >
            <Image
              source={
                relationEdge.node.bannerImage ||
                relationEdge.node.coverImage?.large
              }
              className="absolute inset-0"
              key={
                relationEdge.node.bannerImage ||
                relationEdge.node.coverImage?.large
              }
            />

            <View className="absolute inset-0 bg-black/60" />

            <View className="relative">
              <Text variant="xl">
                {relationEdge.relationType === MediaRelation.Prequel
                  ? 'Prequel'
                  : 'Sequel'}
              </Text>

              <View className="absolute -bottom-1 h-0.5 w-full bg-primary-300" />
            </View>
          </Button>
        );
      })}
    </View>
  );
};

export default SpecialRelationList;
