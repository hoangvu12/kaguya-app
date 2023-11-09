import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import type { Media } from '@/types/anilist';
import { ScrollView, View, WIDTH } from '@/ui';

import DetailsCard from './details-card';

interface DetailsListProps {
  mediaList: Media[];
}

const CONTAINER_PADDING = 16;

const DetailsList: React.FC<DetailsListProps> = ({ mediaList }) => {
  return (
    <ScrollView horizontal>
      {/* 
        Using scrollview cause the view can be scrolling horizontal
        Using another view with a fixed width fix this
      */}

      <View
        style={{
          width: WIDTH - CONTAINER_PADDING * 2,
        }}
        className="pb-16"
      >
        <FlatList
          data={mediaList}
          renderItem={({ item }) => <DetailsCard media={item} />}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View className="my-2" />}
        />
      </View>
    </ScrollView>
  );
};

export default DetailsList;
