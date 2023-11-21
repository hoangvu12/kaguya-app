import { FlashList } from '@shopify/flash-list';
import React from 'react';

import { useFragment } from '@/gql';
import useScreenSize from '@/hooks/use-screen-size';
import { useWatched } from '@/hooks/use-watched';
import { ActivityIndicator, Text, View } from '@/ui';
import { Card, CardFragment } from '@/ui/card';
import colors from '@/ui/theme/colors';

const SPACE_BETWEEN = 32;
const CONTAINER_PADDING = 16;
const LIST_PADDING = 16;

const RecentlyWatchedScreen = () => {
  const { width } = useScreenSize();

  const { data, isLoading } = useWatched(0);

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={48} color={colors.primary[500]} />
      </View>
    );

  if (!data?.length) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-center">You haven't watched anything yet?</Text>
      </View>
    );
  }

  return (
    <View
      className="h-full w-full flex-1 p-4"
      style={{ marginLeft: LIST_PADDING, flex: 1 }}
    >
      <Text className="mb-8 text-3xl" weight="semibold">
        Recently watched
      </Text>

      <FlashList
        numColumns={2}
        data={data}
        renderItem={({ item, index }) => {
          return (
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
              <Card
                media={item.media}
                containerProps={{ className: 'w-full' }}
              />
            </View>
          );
        }}
        estimatedItemSize={294}
        keyExtractor={(item) =>
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useFragment(CardFragment, item.media).id.toString()
        }
      />
    </View>
  );
};

export default RecentlyWatchedScreen;
