import React from 'react';
import type { FlatListProps } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import type { Media } from '@/types/anilist';

import { Card } from './card';
import { View } from './core';

interface CardSwiperProps extends Partial<FlatListProps<Media>> {
  data: Media[];
}

export default function CardSwiper({ data, ...props }: CardSwiperProps) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Card media={item} />}
      horizontal
      ItemSeparatorComponent={Spacer}
      {...props}
    />
  );
}

const Spacer = () => <View className="mx-2" />;
