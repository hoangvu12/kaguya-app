import { FlashList } from '@shopify/flash-list';
import React from 'react';
import type { FlatListProps } from 'react-native';

import type { FragmentType } from '@/gql';
import useScreenSize from '@/hooks/use-screen-size';

import type { CardFragment } from './card';
import { Card, CARD_WIDTH } from './card';
import { View } from './core';
import Skeleton, { SkeletonItem } from './core/skeleton';

interface CardSwiperProps
  extends Partial<FlatListProps<FragmentType<typeof CardFragment>>> {
  data: FragmentType<typeof CardFragment>[];
}

export default function CardSwiper({ data, ...props }: CardSwiperProps) {
  return (
    <FlashList
      data={data}
      estimatedItemSize={120}
      // @ts-expect-error
      renderItem={({ item }) => <Card media={item} />}
      horizontal
      ItemSeparatorComponent={Spacer}
      {...props}
    />
  );
}

const SPACE_BETWEEN = 8;

export function CardSwiperSkeleton() {
  const { width } = useScreenSize();
  const numberOfItems = Math.floor(width / (CARD_WIDTH - SPACE_BETWEEN));
  const skeletonItems = Array.from({ length: numberOfItems }).map((_, i) => i);

  return (
    <Skeleton className="flex flex-row items-center">
      {skeletonItems.map((_, i) => (
        <SkeletonItem
          key={i}
          style={{
            aspectRatio: 2 / 3,
            width: CARD_WIDTH,
            marginLeft: i !== 0 ? SPACE_BETWEEN : 0,
          }}
        />
      ))}
    </Skeleton>
  );
}

const Spacer = () => <View className="mx-1" />;
