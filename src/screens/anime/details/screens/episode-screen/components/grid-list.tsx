import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import useScreenSize from '@/hooks/use-screen-size';
import type { SearchResult } from '@/types';
import { Image, ScrollView, Text, View } from '@/ui';
import Pressable from '@/ui/core/pressable';

interface GridListProps {
  searchResults: SearchResult[];
  onSelect?: (searchResult: SearchResult) => void;
}

const SPACE_BETWEEN = 32;
const CONTAINER_PADDING = 16;
const LIST_PADDING = 16;

const GridList: React.FC<GridListProps> = ({ searchResults, onSelect }) => {
  const { width } = useScreenSize();

  return (
    <ScrollView horizontal={true}>
      <View
        className="flex w-full flex-1 items-center justify-center pb-32"
        style={{ marginLeft: LIST_PADDING }}
      >
        <FlatList
          numColumns={2}
          data={searchResults}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => {
                onSelect?.(item);
              }}
              style={{
                width:
                  width / 2 -
                  CONTAINER_PADDING -
                  LIST_PADDING -
                  SPACE_BETWEEN / 2,
                marginLeft: index % 2 !== 0 ? SPACE_BETWEEN : 0,
                marginBottom: SPACE_BETWEEN,
              }}
            >
              <View className="w-full" style={{ aspectRatio: 2 / 3 }}>
                <Image
                  source={{ uri: item.thumbnail }}
                  className="h-full w-full rounded-md"
                  contentFit="cover"
                  key={item.thumbnail}
                />
              </View>

              <Text className="mt-1">{item.title}</Text>
            </Pressable>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ScrollView>
  );
};

export default GridList;
