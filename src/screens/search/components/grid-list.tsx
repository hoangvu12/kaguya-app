import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import type { Media } from '@/types/anilist';
import { ScrollView, View, WIDTH } from '@/ui';
import { Card } from '@/ui/card';

interface GridListProps {
  mediaList: Media[];
}

const SPACE_BETWEEN = 32;
const CONTAINER_PADDING = 16;
const LIST_PADDING = 16;

const GridList: React.FC<GridListProps> = ({ mediaList }) => {
  return (
    <ScrollView horizontal={true}>
      <View
        className="flex w-full flex-1 items-center justify-center"
        style={{ marginLeft: LIST_PADDING }}
      >
        <FlatList
          numColumns={2}
          data={mediaList}
          renderItem={({ item, index }) => (
            <View
              style={{
                width:
                  WIDTH / 2 -
                  CONTAINER_PADDING -
                  LIST_PADDING -
                  SPACE_BETWEEN / 2,
                marginLeft: index % 2 !== 0 ? SPACE_BETWEEN : 0,
                marginBottom: SPACE_BETWEEN,
              }}
            >
              <Card media={item} containerProps={{ className: 'w-full' }} />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ScrollView>
  );
};

export default GridList;
