import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Else, If, Then } from 'react-if';

import { useFragment } from '@/gql';
import useScreenSize from '@/hooks/use-screen-size';
import { useWatched } from '@/hooks/use-watched';
import { ActivityIndicator, Text, View } from '@/ui';
import { Card, CardFragment } from '@/ui/card';
import RefreshControl from '@/ui/core/refresh-control';
import colors from '@/ui/theme/colors';

const SPACE_BETWEEN = 32;
const CONTAINER_PADDING = 16;
const LIST_PADDING = 16;

const RecentlyWatchedScreen = () => {
  const { width } = useScreenSize();

  const { data, isLoading, refetch, isRefetching } = useWatched(0);

  return (
    <View className="h-full w-full flex-1 p-4" style={{ flex: 1 }}>
      <Text className="mb-4 text-2xl" weight="semibold">
        Recently watched
      </Text>

      <If condition={isLoading || isRefetching}>
        <Then>
          <ActivityIndicator size={48} color={colors.primary[500]} />
        </Then>

        <Else>
          <If condition={!data?.length}>
            <Then>
              <Text className="text-center">You haven't watched anything.</Text>
            </Then>
          </If>

          <Else>
            <View
              style={{
                marginLeft: LIST_PADDING / 2 + SPACE_BETWEEN / 2,
                flex: 1,
              }}
            >
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
                          index % 2 !== 0
                            ? SPACE_BETWEEN - LIST_PADDING * 2
                            : 0,
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
                refreshControl={
                  <RefreshControl
                    refreshing={isRefetching}
                    onRefresh={refetch}
                  />
                }
                estimatedItemSize={294}
                keyExtractor={(item) =>
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  useFragment(CardFragment, item.media).id.toString()
                }
              />
            </View>
          </Else>
        </Else>
      </If>
    </View>
  );
};

export default RecentlyWatchedScreen;
