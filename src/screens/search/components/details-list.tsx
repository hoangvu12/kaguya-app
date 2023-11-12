import { FlashList } from '@shopify/flash-list';
import React from 'react';

import { type FragmentType, useFragment } from '@/gql';
import { View } from '@/ui';

import { DetailsCardFragment } from './details-card';
import DetailsCard from './details-card';

interface DetailsListProps {
  mediaList: readonly FragmentType<typeof DetailsCardFragment>[];
  onLoadMore: () => void;
}

const DetailsList: React.FC<DetailsListProps> = ({ mediaList, onLoadMore }) => {
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
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.05}
      ListFooterComponentStyle={{ paddingBottom: 300 }}
      ItemSeparatorComponent={() => <View className="my-2" />}
    />
  );
};

export default DetailsList;
