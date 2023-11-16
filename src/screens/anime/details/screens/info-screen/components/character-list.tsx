/* eslint-disable react-hooks/rules-of-hooks */
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import type { ViewProps } from 'react-native';

import type { FragmentType } from '@/gql';
import { graphql, useFragment } from '@/gql';
import { Text, View } from '@/ui';
import CharacterCard, { CharacterCardFragment } from '@/ui/character-card';

export const CharacterListFragment = graphql(`
  fragment CharacterListMedia on CharacterConnection {
    edges {
      ...CharacterCard
      node {
        id
      }
      role
    }
  }
`);

interface CharacterListProps extends ViewProps {
  characters: FragmentType<typeof CharacterListFragment>;
}

const CharacterList: React.FC<CharacterListProps> = ({
  characters: charactersProps,
  className,
  ...props
}) => {
  const characterEdges = useFragment(
    CharacterListFragment,
    charactersProps
  ).edges?.filter(Boolean);

  if (!characterEdges?.length) return null;

  return (
    <View className={className} {...props}>
      <Text variant="xl" className="mb-2">
        Characters
      </Text>

      <FlashList
        estimatedItemSize={124}
        data={characterEdges}
        renderItem={({ item }) => <CharacterCard characterEdge={item} />}
        horizontal
        keyExtractor={(item) => {
          const character = useFragment(CharacterCardFragment, item);

          return character.node!.id.toString() + character.role;
        }}
        ItemSeparatorComponent={Spacer}
      />
    </View>
  );
};

const Spacer = () => {
  return <View className="mx-1.5" />;
};

export default CharacterList;
