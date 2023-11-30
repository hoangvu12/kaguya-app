import { FlashList } from '@shopify/flash-list';
import React from 'react';

import { type FragmentType, useFragment } from '@/gql';
import { View } from '@/ui';
import RefreshControl from '@/ui/core/refresh-control';

import { DetailsCardFragment } from './details-card';
import DetailsCard from './details-card';

interface DetailsListProps {
  mediaList: readonly FragmentType<typeof DetailsCardFragment>[];
  onLoadMore: () => void;
  refetch: () => void;
  isRefetching: boolean;
}

const DetailsList: React.FC<DetailsListProps> = ({
  mediaList,
  onLoadMore,
  isRefetching,
  refetch,
}) => {
  return (
    <FlashList
      data={mediaList}
      estimatedItemSize={136}
      renderItem={({ item }) => <DetailsCard media={item} />}
      keyExtractor={(item) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const media = useFragment(DetailsCardFragment, item);

        return media.id.toString();
      }}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.05}
      ListFooterComponentStyle={{ paddingBottom: 300 }}
      ItemSeparatorComponent={() => <View className="my-2" />}
    />
  );
};

export default DetailsList;
