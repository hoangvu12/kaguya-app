import { FlashList } from '@shopify/flash-list';
import React from 'react';

import { type FragmentType, useFragment } from '@/gql';
import useScreenSize from '@/hooks/use-screen-size';
import { View } from '@/ui';
import { Card, CARD_WIDTH, CardFragment } from '@/ui/card';
import RefreshControl from '@/ui/core/refresh-control';

interface GridListProps {
  mediaList: readonly FragmentType<typeof CardFragment>[];
  onLoadMore: () => void;
  refetch: () => void;
  isRefetching: boolean;
}

const SPACE_BETWEEN = 32;
const CONTAINER_PADDING = 16;
const LIST_PADDING = 16;
const CARD_HEIGHT = CARD_WIDTH * (3 / 2);
const CARD_TITLE_HEIGHT = 60;

const GridList: React.FC<GridListProps> = ({
  mediaList,
  onLoadMore,
  isRefetching,
  refetch,
}) => {
  const { width } = useScreenSize();

  return (
    <View
      className="h-full w-full flex-1"
      style={{ marginLeft: LIST_PADDING, flex: 1 }}
    >
      <FlashList
        numColumns={2}
        data={mediaList}
        renderItem={({ item, index }) => (
          <View
            style={{
              width:
                width / 2 -
                CONTAINER_PADDING -
                LIST_PADDING -
                SPACE_BETWEEN / 2,
              marginLeft:
                index % 2 !== 0 ? SPACE_BETWEEN - LIST_PADDING * 2 : 0,
              marginBottom: SPACE_BETWEEN,
            }}
          >
            <Card media={item} containerProps={{ className: 'w-full' }} />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        estimatedItemSize={294}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.05}
        ListFooterComponentStyle={{
          paddingBottom: CARD_HEIGHT + CARD_TITLE_HEIGHT,
        }}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        keyExtractor={(item) => useFragment(CardFragment, item).id.toString()}
      />
    </View>
  );
};

export default GridList;
