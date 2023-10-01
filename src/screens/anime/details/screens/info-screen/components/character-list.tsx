import React from 'react';
import type { ViewProps } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import type { CharacterConnection } from '@/types/anilist';
import { Text, View } from '@/ui';
import CharacterCard from '@/ui/character-card';

interface CharacterListProps extends ViewProps {
  characters: CharacterConnection;
}

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  className,
  ...props
}) => {
  return (
    <View className={className} {...props}>
      <Text variant="xl" className="mb-2">
        Characters
      </Text>

      <FlatList
        data={characters.edges}
        renderItem={({ item }) => <CharacterCard characterEdge={item} />}
        horizontal
        keyExtractor={(item) => item.node.id.toString() + item.role}
        ItemSeparatorComponent={Spacer}
      />
    </View>
  );
};

const Spacer = () => {
  return <View className="mx-1.5" />;
};

export default CharacterList;
